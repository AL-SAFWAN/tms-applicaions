from fastapi import APIRouter

# from app.api.v1 import utils
from app.api.v1.auth import routes as auth
from app.api.v1.item import routes as items
from app.api.v1.user import routes as users

api_router = APIRouter()
api_router.include_router(auth.router, tags=["login"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(items.router, prefix="/items", tags=["items"])
# api_router.include_router(utils.router, prefix="/utils", tags=["utils"])
