from fastapi import APIRouter

from app.modules.auth.infrastructure import routes as auth
from app.modules.user.infrastructure import routes as users
from app.modules.tickets.infrastructure import routers as tickets

api_router = APIRouter()
api_router.include_router(auth.router, tags=["Authentication"])
api_router.include_router(users.router, prefix="/users", tags=["Users"])
api_router.include_router(tickets.router, prefix="/tickets", tags=["Tickets"])
