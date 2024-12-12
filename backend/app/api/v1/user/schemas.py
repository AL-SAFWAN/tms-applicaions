import uuid
from datetime import date, datetime

from pydantic import EmailStr
from sqlmodel import Field, SQLModel

from app.core.models import User as UserDB
from app.core.models import UserBase

User = UserDB


# Properties to receive via API on creation
class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=40)


class UserRegister(SQLModel):
    email: EmailStr = Field(max_length=255)
    password: str = Field(min_length=8, max_length=40)
    full_name: str | None = Field(default=None, max_length=255)


# Properties to receive via API on update, all are optional
class UserUpdate(UserBase):
    email: EmailStr | None = Field(default=None, max_length=255)  # type: ignore
    password: str | None = Field(default=None, min_length=8, max_length=40)


class UserUpdateMe(SQLModel):
    first_name: str | None = None
    last_name: str | None = None
    email: EmailStr | None = None
    weight: float | None = None
    height: str | None = None
    address: str | None = None
    date_of_birth: date | None = None
    # Emergency contact details
    emergency_contact_name: str | None = None
    emergency_contact_relationship: str | None = None
    emergency_contact_phone: str | None = None
    # Medical information
    allergies: str | None = None
    medications: str | None = None
    medical_conditions: str | None = None


class UpdatePassword(SQLModel):
    current_password: str = Field(min_length=8, max_length=40)
    new_password: str = Field(min_length=8, max_length=40)


# Properties to return via API, id is always required
class UserPublic(UserBase):
    id: uuid.UUID
    created_at: datetime


class UsersPublic(SQLModel):
    data: list[UserPublic]
    count: int
