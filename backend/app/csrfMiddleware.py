# middlewares.py
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse
from fastapi import Request
from itsdangerous import URLSafeTimedSerializer
import secrets
from app.core.config import settings

TOKEN_NAME = "csrf_token"
CSRF_COOKIE_NAME = "csrftoken"
TOKEN_MAX_AGE = 3600  # 1 hour

serializer = URLSafeTimedSerializer(settings.SECRET_KEY, salt=settings.CSRF_SALT)


def generate_csrf_token():
    raw_token = secrets.token_urlsafe(32)
    return serializer.dumps(raw_token)


def verify_csrf_token(token: str):
    try:
        serializer.loads(token, max_age=settings.CSRF_TOKEN_EXPIRE_MINUTES)
        return True
    except Exception:
        return False


class CSRFMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        if request.method in ("GET", "OPTIONS", "HEAD"):
            # If there's no token cookie, set one
            if CSRF_COOKIE_NAME not in request.cookies:
                token = generate_csrf_token()
                response = await call_next(request)
                response.set_cookie(
                    key=CSRF_COOKIE_NAME,
                    value=token,
                    httponly=True,
                    secure=False,
                    samesite="strict",
                )
                return response
            else:
                return await call_next(request)
        else:
            # Mutating methods - verify token
            csrf_token_cookie = request.cookies.get(CSRF_COOKIE_NAME)
            csrf_token_header = request.headers.get("X-CSRF-Token")

            if not csrf_token_header or not csrf_token_cookie:
                return JSONResponse(
                    content={"detail": "CSRF token missing."}, status_code=403
                )

            if csrf_token_cookie == csrf_token_header and verify_csrf_token(
                csrf_token_cookie
            ):
                return await call_next(request)
            else:
                return JSONResponse(
                    content={"detail": "Invalid CSRF token."}, status_code=403
                )
