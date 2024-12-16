import uuid
from typing import Any

from fastapi import APIRouter, Depends, HTTPException

from app.modules.deps import (
    CurrentUser,
    SessionDep,
    get_current_active_superuser,
)
from app.modules.user.infrastructure import repository
from app.modules.user.domain.models import (
    UpdatePassword,
    User,
    UserCreate,
    UserPublic,
    UserRegister,
    UserUpdate,
    UserUpdateMe,
)
from app.core.config import settings
from app.core.models import Message, RoleEnum

from app.modules.auth.domain import service as auth_service
from app.modules.email.domain.service import generate_new_account_email, send_email

router = APIRouter()


@router.get(
    "/",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=list[UserPublic],
)
def read_all_users(session: SessionDep, skip: int = 0, limit: int = 100) -> Any:
    """
    Retrieve all users
    """
    users = repository.get_all_users(session=session, skip=skip, limit=limit)
    return users


@router.get(
    "/info",
    dependencies=[Depends(get_current_active_superuser)],
    # response_model=list[dict[str, any]],
)
def read_users_stats(session: SessionDep) -> Any:
    """
    Retrieve users.
    """

    grouped_data, total_count = repository.get_users_stats(session=session)

    return {
        "data": grouped_data,
        "total_count": total_count,
    }


@router.post(
    "/",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=UserPublic,
)
def create_user(*, session: SessionDep, user_in: UserCreate) -> Any:
    """
    Create new user.
    """
    user = repository.get_user_by_email(session=session, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system.",
        )

    user = repository.create_user(session=session, user_in=user_in)
    if settings.emails_enabled and user_in.email:
        email_data = generate_new_account_email(
            email_to=user_in.email,
            firstName=user_in.first_name,
            lastName=user_in.last_name,
        )
        send_email(
            email_to=user_in.email,
            subject=email_data.subject,
            html_content=email_data.html_content,
        )
    return user


@router.patch("/me", response_model=UserPublic)
def update_user_me(
    *, session: SessionDep, user_in: UserUpdateMe, current_user: CurrentUser
) -> Any:
    """
    Update own user.
    """

    if user_in.email:
        existing_user = repository.get_user_by_email(
            session=session, email=user_in.email
        )
        if existing_user and existing_user.id != current_user.id:
            raise HTTPException(
                status_code=409, detail="User with this email already exists"
            )
    current_user = repository.update_me(
        session=session, user_in=user_in, current_user=current_user
    )
    return current_user


@router.patch("/me/password", response_model=Message)
def update_password_me(
    *, session: SessionDep, body: UpdatePassword, current_user: CurrentUser
) -> Any:
    """
    Update own password.
    """

    if not auth_service.verify_password(
        body.current_password, current_user.hashed_password
    ):
        raise HTTPException(status_code=400, detail="Incorrect password")
    if body.current_password == body.new_password:
        raise HTTPException(
            status_code=400,
            detail="New password cannot be the same as the current one",
        )
    repository.update_me_password(
        session=session, current_user=current_user, new_password=body.new_password
    )
    return Message(message="Password updated successfully")


@router.get("/me", response_model=UserPublic)
def read_user_me(current_user: CurrentUser) -> Any:
    """
    Get current user.
    """
    return current_user


@router.delete("/me", response_model=Message)
def delete_user_me(session: SessionDep, current_user: CurrentUser) -> Any:
    """
    Delete own user.
    """
    if current_user.role is RoleEnum.admin:
        raise HTTPException(
            status_code=403,
            detail="Admin users are not allowed to delete themselves",
        )
    repository.delete_me(session=session, current_user=current_user)
    return Message(message="User deleted successfully")


@router.post("/signup", response_model=UserPublic)
def register_user(session: SessionDep, user_in: UserRegister) -> Any:
    """
    Create new user without the need to be logged in.
    """
    user = repository.get_user_by_email(session=session, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system",
        )
    user = repository.create_user(session=session, user_in=user_in)
    return user


@router.get("/{user_id}", response_model=UserPublic)
def read_user_by_id(
    user_id: uuid.UUID, session: SessionDep, current_user: CurrentUser
) -> Any:
    """
    Get a specific user by id.
    """
    user = session.get(User, user_id)
    if user == current_user:
        return user
    if current_user.role is not RoleEnum.admin:
        raise HTTPException(
            status_code=403,
            detail="The user doesn't have enough privileges",
        )
    return user


@router.patch(
    "/{user_id}",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=UserPublic,
)
def update_user(
    *,
    session: SessionDep,
    user_id: uuid.UUID,
    user_in: UserUpdate,
    current_user: CurrentUser,
) -> Any:
    """
    Update a user.
    """
    db_user = session.get(User, user_id)
    if not db_user:
        raise HTTPException(
            status_code=404,
            detail="The user with this id does not exist in the system",
        )
    if user_in.email:
        existing_user = repository.get_user_by_email(
            session=session, email=user_in.email
        )
        if existing_user and existing_user.id != user_id:
            raise HTTPException(
                status_code=409, detail="User with this email already exists"
            )
    if current_user.role is RoleEnum.admin:
        if user_id == current_user.id and not user_in.is_active:
            raise HTTPException(
                status_code=409,
                detail="Admin users are not allow to deactivate themselves",
            )
    db_user = repository.update_user(session=session, db_user=db_user, user_in=user_in)
    return db_user


@router.delete("/{user_id}", dependencies=[Depends(get_current_active_superuser)])
def delete_user(
    session: SessionDep, current_user: CurrentUser, user_id: uuid.UUID
) -> Message:
    """
    Delete a user.
    """
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user == current_user:
        raise HTTPException(
            status_code=403,
            detail="Admin users are not allowed to delete themselves",
        )
    repository.delete_user(session=session, user=user)
    return Message(message="User deleted successfully")
