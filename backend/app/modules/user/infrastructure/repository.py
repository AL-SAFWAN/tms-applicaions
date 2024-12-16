from typing import Any

from sqlmodel import Session, select, col, delete, func, cast, Date

from app.core.models import Item
from app.modules.user.domain.models import (
    UserCreate,
    UserUpdate,
    UserUpdateMe,
    UserRegister,
)
from app.core.models import User

from datetime import datetime, timedelta, timezone


def get_all_users(*, session: Session, skip: int, limit: int) -> User:
    statement = select(User).offset(skip).limit(limit)
    users = session.exec(statement).all()
    return users


def get_users_stats(session: Session) -> Any:
    three_months_ago = datetime.now(timezone.utc) - timedelta(days=90)
    today = datetime.now(timezone.utc)

    # Generate a complete list of dates from 3 months ago to today
    date_range = [
        (three_months_ago + timedelta(days=i)).date()
        for i in range((today - three_months_ago).days + 1)
    ]

    # Query to get users grouped by date
    group_statement = (
        select(
            cast(User.created_at, Date).label("date"),
            func.count(User.id).label("users"),
        )
        .where(User.created_at >= three_months_ago)
        .group_by(cast(User.created_at, Date))
        .order_by(cast(User.created_at, Date))
    )

    grouped_results = session.exec(group_statement).all()

    # Transform query results into a dictionary for easy merging
    result_dict = {str(row.date): row.users for row in grouped_results}

    # Fill in missing dates with zero users
    grouped_data = [
        {"date": str(date), "users": result_dict.get(str(date), 0)}
        for date in date_range
    ]

    count_statement = select(func.count()).select_from(User)
    total_count = session.exec(count_statement).one()
    return grouped_data, total_count


def update_me(*, session: Session, user_in: UserUpdateMe, current_user: User) -> Any:
    user_data = user_in.model_dump(exclude_unset=True)
    current_user.sqlmodel_update(user_data)
    session.add(current_user)
    session.commit()
    session.refresh(current_user)
    return current_user


def update_me_password(
    *, session: Session, current_user: User, new_password: str
) -> Any:
    from app.modules.auth.domain.service import get_password_hash

    hashed_password = get_password_hash(new_password)
    current_user.hashed_password = hashed_password
    session.add(current_user)
    session.commit()


def delete_me(session: Session, current_user: User):
    statement = delete(Item).where(col(Item.owner_id) == current_user.id)
    session.exec(statement)  # type: ignore
    session.delete(current_user)
    session.commit()


def create_user(*, session: Session, user_in: UserRegister) -> User:
    from app.modules.auth.domain.service import get_password_hash

    user_create = UserCreate.model_validate(user_in)
    db_obj = User.model_validate(
        user_create,
        update={"hashed_password": get_password_hash(user_create.password)},
    )
    session.add(db_obj)
    session.commit()
    session.refresh(db_obj)
    return db_obj


def update_user(*, session: Session, db_user: User, user_in: UserUpdate) -> Any:
    from app.modules.auth.domain.service import get_password_hash

    user_data = user_in.model_dump(exclude_unset=True)
    extra_data = {}
    if "password" in user_data:
        password = user_data["password"]
        hashed_password = get_password_hash(password)
        extra_data["hashed_password"] = hashed_password
    db_user.sqlmodel_update(user_data, update=extra_data)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user


def get_user_by_email(*, session: Session, email: str) -> User | None:
    statement = select(User).where(User.email == email)
    session_user = session.exec(statement).first()
    return session_user


def delete_user(session: Session, user: User):
    statement = delete(Item).where(col(Item.owner_id) == user.id)
    session.exec(statement)  # type: ignore
    session.delete(user)
    session.commit()
