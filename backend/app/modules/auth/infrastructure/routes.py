from typing import Annotated, Any

from fastapi import APIRouter, Depends, HTTPException, Response
from fastapi.security import OAuth2PasswordRequestForm

from app.modules.deps import CurrentUser, SessionDep
from app.modules.auth.domain import service

from app.modules.auth.domain.models import NewPassword, Token
from app.modules.user.infrastructure import repository as user_repository

from app.modules.user.domain.models import UserCreate, UserPublic
from app.core.config import settings
from app.core.models import Message

from app.modules.email.domain.service import (
    generate_new_account_email,
    generate_password_reset_token,
    generate_reset_password_email,
    send_email,
    verify_password_reset_token,
)


router = APIRouter()


@router.post("/login")
def login(
    response: Response,
    session: SessionDep,
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> UserPublic:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    user = service.authenticate_user(
        session=session, email=form_data.username, password=form_data.password
    )

    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    elif not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")

    access_token = service.create_access_token_for_user(user_id=user.id, role=user.role)

    if settings.ENVIRONMENT == "production":
        response.set_cookie(
            key="access_token",
            value=access_token,
            max_age=3600,
            expires=3600,
            httponly=True,
            secure=True,
            samesite="none",
            domain=".tms-applications.com",
        )
    else:
        response.set_cookie(
            key="access_token",
            value=access_token,
            max_age=3600,
            expires=3600,
            httponly=True,
            secure=False,
            samesite="lax",
        )

    return user


@router.post("/login/access-token")
def login_access_token(
    session: SessionDep,
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:
    """
    OAuth2 compatible token login, get an access token for future requests
    """

    user = service.authenticate_user(
        session=session, email=form_data.username, password=form_data.password
    )
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    elif not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")

    access_token = service.create_access_token_for_user(user_id=user.id, role=user.role)

    return Token(access_token=access_token)


@router.post("/login/test-token", response_model=UserPublic)
def test_token(current_user: CurrentUser) -> Any:
    """
    Test access token
    """
    return current_user


@router.post("/logout")
def logout(response: Response):
    """
    Logout the user by removing the access_token cookie.
    """

    if settings.ENVIRONMENT == "production":
        response.delete_cookie(
            key="access_token",
            httponly=True,
            secure=True,
            samesite="none",
            domain=".tms-applications.com",
        )
    else:
        response.delete_cookie(
            key="access_token",
            httponly=True,
            secure=False,
            samesite="lax",
        )

    return Message(message="Successfully logged out.")


@router.post(
    "/register",
    response_model=UserPublic,
)
def create_account(response: Response, session: SessionDep, user_in: UserCreate) -> Any:
    """
    Create an Account
    """
    user = user_repository.get_user_by_email(session=session, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system.",
        )

    user = user_repository.create_user(session=session, user_in=user_in)
    if settings.emails_enabled and user_in.email:
        email_data = generate_new_account_email(
            email_to=user_in.email,
            firstName=user_in.last_name,
            lastName=user_in.first_name,
        )
        send_email(
            email_to=user_in.email,
            subject=email_data.subject,
            html_content=email_data.html_content,
        )

    access_token = service.create_access_token_for_user(user_id=user.id, role=user.role)

    if settings.ENVIRONMENT == "production":
        response.set_cookie(
            key="access_token",
            value=access_token,
            max_age=3600,
            expires=3600,
            httponly=True,
            secure=True,
            samesite="none",
            domain=".tms-applications.com",
        )
    else:
        response.set_cookie(
            key="access_token",
            value=access_token,
            max_age=3600,
            expires=3600,
            httponly=True,
            secure=False,
            samesite="lax",
        )

    return user


@router.post("/password-recovery/{email}")
def recover_password(email: str, session: SessionDep) -> Message:
    """
    Password Recovery
    """
    user = user_repository.get_user_by_email(session=session, email=email)

    if not user:
        raise HTTPException(
            status_code=404,
            detail="The user with this email does not exist in the system.",
        )
    password_reset_token = generate_password_reset_token(email=email)
    email_data = generate_reset_password_email(
        first_name=user.first_name, token=password_reset_token
    )
    send_email(
        email_to=user.email,
        subject=email_data.subject,
        html_content=email_data.html_content,
    )
    return Message(message="Password recovery email sent")


@router.post("/reset-password/")
def reset_password(session: SessionDep, body: NewPassword) -> Message:
    """
    Reset password
    """
    email = verify_password_reset_token(token=body.token)
    if not email:
        raise HTTPException(status_code=400, detail="Invalid token")
    user = user_repository.get_user_by_email(session=session, email=email)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="The user with this email does not exist in the system.",
        )
    elif not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")

    user_repository.update_me_password(
        session=session, current_user=user, new_password=body.password
    )

    return Message(message="Password updated successfully")
