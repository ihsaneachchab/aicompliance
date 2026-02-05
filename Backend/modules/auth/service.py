from fastapi import HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase
from core.security import get_password_hash, verify_password
from .models import UserCreate, UserInDB
from bson import ObjectId


async def get_user_by_username(db: AsyncIOMotorDatabase, username: str):
    user_doc = await db["users"].find_one({"username": username})
    if user_doc:
        return user_doc
    return None


async def get_user_by_email(db: AsyncIOMotorDatabase, email: str):
    user_doc = await db["users"].find_one({"email": email})
    if user_doc:
        return user_doc
    return None


async def create_user(db: AsyncIOMotorDatabase, user: UserCreate):
    # Check if username already exists
    existing_user = await get_user_by_username(db, user.username)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered"
        )
    
    # Check if email already exists
    existing_email = await get_user_by_email(db, user.email)
    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    hashed_password = get_password_hash(user.password)
    
    # Create user as active immediately
    user_data = user.dict()
    user_data['is_active'] = True
    
    user_in_db = UserInDB(
        **user_data,
        hashed_password=hashed_password,
    )
    
    new_user = await db["users"].insert_one(user_in_db.dict())
    created_user = await db["users"].find_one({"_id": new_user.inserted_id})
    return created_user


async def authenticate_user(db: AsyncIOMotorDatabase, username: str, password: str):
    user = await get_user_by_username(db, username)
    if not user:
        return False
    if not verify_password(password, user["hashed_password"]):
        return False
    return user