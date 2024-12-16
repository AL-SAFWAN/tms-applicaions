from fastapi import APIRouter

from app.modules.auth.infrastructure import routes as auth
from app.modules.item import routes as items
from app.modules.user.infrastructure import routes as users

api_router = APIRouter()
api_router.include_router(auth.router, tags=["auth"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(items.router, prefix="/items", tags=["items"])
