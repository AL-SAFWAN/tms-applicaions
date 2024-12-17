import uuid
from datetime import datetime
from enum import Enum
from typing import List, Optional

import sqlalchemy as sa
from pydantic import EmailStr
from sqlmodel import Field, Relationship, SQLModel
from sqlalchemy.orm import RelationshipProperty


class StatusEnum(str, Enum):
    open = "open"
    in_progress = "in_progress"
    resolved = "resolved"


class PriorityEnum(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"


# Generic message
class Message(SQLModel):
    message: str


class RoleEnum(str, Enum):
    requester = "requester"
    agent = "agent"
    admin = "admin"


# TODO remove user base here
class UserBase(SQLModel):
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    is_active: bool = True
    role: RoleEnum = Field(default=RoleEnum.requester, nullable=False)
    first_name: str | None = Field(default=None, max_length=255)
    last_name: str | None = Field(default=None, max_length=255)


class User(UserBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    hashed_password: str
    created_at: datetime | None = Field(
        default=None,
        sa_column=sa.Column(
            sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False
        ),
    )

    # A requester can create many tickets
    tickets_requested: List["Ticket"] = Relationship(
        sa_relationship=RelationshipProperty(
            "Ticket",
            back_populates="requester",
            foreign_keys="[Ticket.requester_id]",
            cascade="all, delete-orphan",
        ),
    )

    # A helpdesk agent can be assigned multiple tickets
    tickets_assigned: Optional[List["Ticket"]] = Relationship(
        sa_relationship=RelationshipProperty(
            "Ticket",
            back_populates="assigned_agent",
            foreign_keys="[Ticket.assigned_agent_id]",
        ),
    )

    # A user can make many comments
    comments: List["Comment"] = Relationship(
        back_populates="author", cascade_delete=True
    )


class Ticket(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True, index=True)
    title: str = Field(min_length=1, max_length=255)
    description: str = Field(max_length=255)
    status: StatusEnum = Field(default=StatusEnum.open, nullable=False)
    priority: PriorityEnum = Field(default=PriorityEnum.medium, nullable=False)

    created_at: datetime = Field(default_factory=datetime.utcnow)
    resolved_at: Optional[datetime] = Field(default=None)

    # Foreign keys
    requester_id: uuid.UUID = Field(
        foreign_key="user.id",
        ondelete="CASCADE",
        nullable=False,
    )
    assigned_agent_id: uuid.UUID | None = Field(
        default=None, foreign_key="user.id", ondelete="SET NULL"
    )

    # Relationships
    requester: "User" = Relationship(
        sa_relationship=RelationshipProperty(
            "User",
            back_populates="tickets_requested",
            foreign_keys="[Ticket.requester_id]",
        ),
        cascade_delete=True,
    )
    assigned_agent: Optional["User"] = Relationship(
        sa_relationship=RelationshipProperty(
            "User",
            back_populates="tickets_assigned",
            foreign_keys="[Ticket.assigned_agent_id]",
        )
    )
    comments: List["Comment"] = Relationship(
        back_populates="ticket", cascade_delete=True
    )


class Comment(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True, index=True)
    content: str = Field(max_length=255)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # Foreign keys
    ticket_id: int = Field(foreign_key="ticket.id")
    author_id: uuid.UUID = Field(foreign_key="user.id", ondelete="CASCADE")

    # Relationships
    ticket: "Ticket" = Relationship(back_populates="comments")
    author: "User" = Relationship(back_populates="comments")
