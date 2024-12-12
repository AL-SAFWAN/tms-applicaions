from sqlmodel import Session

from app.api.v1.user.operations import get_user_by_email
from app.core.models import User
from app.core.security import verify_password


def authenticate(*, session: Session, email: str, password: str) -> User | None:
    db_user = get_user_by_email(session=session, email=email)
    if not db_user:
        return None
    if not verify_password(password, db_user.hashed_password):
        return None
    return db_user
