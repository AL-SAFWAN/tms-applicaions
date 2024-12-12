import uuid
from datetime import date, datetime
from enum import Enum

import sqlalchemy as sa
from pydantic import EmailStr
from sqlmodel import Field, Relationship, SQLModel


class RoleEnum(str, Enum):
    student = "student"
    instructor = "instructor"
    admin = "admin"


# Shared properties from module schema
# MUST BE MAINTAINED
class UserBase(SQLModel):
    # User specific information
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    is_active: bool = True
    role: RoleEnum = Field(default=RoleEnum.student, nullable=False)
    first_name: str | None = Field(default=None, max_length=255)
    last_name: str | None = Field(default=None, max_length=255)
    belt_level: str | None = Field(default="White")
    award_level: str | None = Field(default="White")
    weight: float | None = Field(default=None)
    height: str | None = Field(default=None)
    address: str | None = Field(default=None)
    date_of_birth: date | None = Field(
        default=None, sa_column=sa.Column(sa.Date(), nullable=True)
    )

    # Emergency contact details
    emergency_contact_name: str | None = Field(default=None, max_length=255)
    emergency_contact_relationship: str | None = Field(default=None, max_length=50)
    emergency_contact_phone: str | None = Field(default=None, max_length=15)
    # Medical information
    allergies: str | None = Field(default="None", max_length=255)
    medications: str | None = Field(default="None", max_length=255)
    medical_conditions: str | None = Field(default="None", max_length=255)


class ItemBase(SQLModel):
    title: str = Field(min_length=1, max_length=255)
    description: str | None = Field(default=None, max_length=255)


# Database model, database table inferred from class name
class User(UserBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    hashed_password: str
    items: list["Item"] = Relationship(back_populates="owner", cascade_delete=True)
    created_at: datetime | None = Field(
        default=None,
        sa_column=sa.Column(
            sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False
        ),
    )


# Database model, database table inferred from class name
class Item(ItemBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    owner_id: uuid.UUID = Field(
        foreign_key="user.id", nullable=False, ondelete="CASCADE"
    )

    # relationship
    owner: User | None = Relationship(back_populates="items")


# Generic message
class Message(SQLModel):
    message: str
