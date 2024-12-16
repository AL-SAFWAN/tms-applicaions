from sqlmodel import Session
from datetime import datetime, timedelta, timezone

from app.core.models import User
from app.core.security import pwd_context, ALGORITHM
from app.core.config import settings

from typing import Any
import jwt

from app.core.models import RoleEnum


def authenticate_user(*, session: Session, email: str, password: str) -> User | None:
    from app.modules.user.infrastructure.repository import get_user_by_email

    db_user = get_user_by_email(session=session, email=email)
    if not db_user:
        return None
    if not verify_password(password, db_user.hashed_password):
        return None
    return db_user


def create_access_token(
    subject: str | Any, role: RoleEnum, expires_delta: timedelta
) -> str:
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode = {"exp": expire, "sub": str(subject), "role": role.value}
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def create_access_token_for_user(user_id: str, role: str):
    """Create a JWT access token for the given user."""
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return create_access_token(user_id, role, expires_delta=access_token_expires)
