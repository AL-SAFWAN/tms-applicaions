from datetime import datetime
from typing import Optional
from uuid import UUID
from sqlmodel import Field, SQLModel
from app.core.models import PriorityEnum, StatusEnum
from app.modules.user.domain.models import BasicUserPublic


class CommentBase(SQLModel):
    content: str = Field(..., max_length=255)


class CommentCreate(CommentBase):
    pass


class CommentUpdate(SQLModel):
    content: Optional[str] = Field(None, max_length=255)


class CommentPublic(CommentBase):
    id: int
    author: BasicUserPublic
    created_at: datetime


class TicketBase(SQLModel):
    title: str = Field(..., min_length=1, max_length=255)
    description: str = Field(..., max_length=255)
    priority: PriorityEnum = Field(default=PriorityEnum.medium)
    status: StatusEnum = Field(default=StatusEnum.open)


class TicketCreate(TicketBase):
    pass


class TicketUpdate(SQLModel):
    # All fields are optional since we're partially updating
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = Field(None, max_length=255)
    priority: Optional[PriorityEnum] = None
    status: Optional[StatusEnum] = None
    assigned_agent_id: Optional[UUID] = None
    resolved_at: Optional[datetime] = None


class TicketPublic(TicketBase):
    id: int
    created_at: datetime
    resolved_at: Optional[datetime] = None
    requester: Optional[BasicUserPublic] = None
    assigned_agent: Optional[BasicUserPublic] = None
