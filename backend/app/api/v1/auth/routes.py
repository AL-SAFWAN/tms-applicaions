from datetime import timedelta
from typing import Annotated, Any

from fastapi import APIRouter, Depends, HTTPException, Response
from fastapi.security import OAuth2PasswordRequestForm

from app.api.deps import CurrentUser, SessionDep
from app.api.v1.auth import operations
from app.api.v1.auth.schemas import NewPassword, Token
from app.api.v1.user import operations as user_operations
from app.api.v1.user.schemas import UserCreate, UserPublic
from app.core import security
from app.core.config import settings
from app.core.models import Message

# from fastapi.responses import HTMLResponse
from app.core.security import get_password_hash
from app.core.utils import (
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
    user = operations.authenticate(
        session=session, email=form_data.username, password=form_data.password
    )
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    elif not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        user.id, user.role, expires_delta=access_token_expires
    )
    # for development
    # response.set_cookie(
    #     key="access_token",
    #     value=access_token,
    #     max_age=3600,  # 1 hour
    #     expires=3600,  # 1 hour
    #     httponly=True,  # Prevent JavaScript access
    #     # local
    #     secure=False,  # Only for HTTPS
    #     samesite="lax",  # Adjust based on your needs
    # )

    # for production
    # if settings.ENVIRONMENT == "production":
    response.set_cookie(
        key="access_token",
        value=access_token,
        max_age=3600,  # 1 hour
        expires=3600,  # 1 hour
        httponly=True,  # Prevent JavaScript access
        secure=True,  # Required for HTTPS
        samesite="none",  # Required for cross-origin requests
        domain=".tms-applications.com",  # Set cookie for main domain
    )
    # else:
    #     response.set_cookie(
    #         key="access_token",
    #         value=access_token,
    #         max_age=3600,  # 1 hour
    #         expires=3600,  # 1 hour
    #         httponly=True,
    #         secure=False,  # For development over HTTP
    #         samesite="lax",
    #     )

    return user


@router.post("/login/access-token")
def login_access_token(
    response: Response,
    session: SessionDep,
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:
    """
    OAuth2 compatible token login, get an access token for future requests
    """

    user = operations.authenticate(
        session=session, email=form_data.username, password=form_data.password
    )
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    elif not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        user.id, user.role, expires_delta=access_token_expires
    )
    response.set_cookie(key="access_token", value=access_token)
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
    response.delete_cookie(
        key="access_token",
        # httponly=True,
        # secure=False,  # Set to True in production with HTTPS
        # samesite="lax",  # Should match the same settings used during login
        # path="/",  # Ensure the path matches where the cookie was set
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
    user = user_operations.get_user_by_email(session=session, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system.",
        )

    user = user_operations.create_user(session=session, user_create=user_in)
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
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        user.id, user.role, expires_delta=access_token_expires
    )
    response.set_cookie(key="access_token", value=access_token)
    return user


@router.post("/password-recovery/{email}")
def recover_password(email: str, session: SessionDep) -> Message:
    """
    Password Recovery
    """
    user = user_operations.get_user_by_email(session=session, email=email)

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
    user = user_operations.get_user_by_email(session=session, email=email)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="The user with this email does not exist in the system.",
        )
    elif not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    hashed_password = get_password_hash(password=body.password)
    user.hashed_password = hashed_password
    session.add(user)
    session.commit()
    session.refresh(user)
    return Message(message="Password updated successfully")


# @router.post(
#     "/password-recovery-html-content/{email}",
#     dependencies=[Depends(get_current_active_superuser)],
#     response_class=HTMLResponse,
# )
# def recover_password_html_content(email: str, session: SessionDep) -> Any:
#     """
#     HTML Content for Password Recovery
#     """
#     user = user_operations.get_user_by_email(session=session, email=email)

#     if not user:
#         raise HTTPException(
#             status_code=404,
#             detail="The user with this username does not exist in the system.",
#         )
#     password_reset_token = generate_password_reset_token(email=email)
#     email_data = generate_reset_password_email(
#         email_to=user.email, email=email, token=password_reset_token
#     )

#     return HTMLResponse(
#         content=email_data.html_content, headers={"subject:": email_data.subject}
#     )
