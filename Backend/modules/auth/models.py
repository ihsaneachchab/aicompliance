from typing import Optional
from pydantic import BaseModel, EmailStr, Field

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class UserBase(BaseModel):
    email: EmailStr
    username: str
    full_name: Optional[str] = None
    company: Optional[str] = None
    phone: Optional[str] = None
    referral_source: Optional[str] = None
    selected_service: Optional[str] = None
    terms_accepted: bool = False
    newsletter_accepted: bool = False
    is_active: bool = False

class UserCreate(UserBase):
    password: str

class UserInDB(UserBase):
    hashed_password: str
    verification_token: Optional[str] = None

class UserResponse(UserBase):
    id: str = Field(alias="_id") # Map Mongo _id to id

    class Config:
        populate_by_name = True
