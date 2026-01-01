from fastapi import HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase
from core.security import get_password_hash, verify_password
from .models import UserCreate, UserInDB
from .email import send_verification_email
import uuid

async def get_user_by_username(db: AsyncIOMotorDatabase, username: str):
    user_doc = await db["users"].find_one({"username": username})
    if user_doc:
        return user_doc
    return None

async def create_user(db: AsyncIOMotorDatabase, user: UserCreate):
    existing_user = await get_user_by_username(db, user.username)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered"
        )
    
    hashed_password = get_password_hash(user.password)
    verification_token = str(uuid.uuid4())
    
    # Force is_active to False on creation
    user_data = user.dict()
    user_data['is_active'] = False
    
    user_in_db = UserInDB(
        **user_data,
        hashed_password=hashed_password,
        verification_token=verification_token
    )
    
    new_user = await db["users"].insert_one(user_in_db.dict())
    
    # Send verification email
    try:
        await send_verification_email(user.email, verification_token)
    except Exception as e:
        print(f"Failed to send email: {e}")
        # In a real app we might want to rollback or queue this
    
    created_user = await db["users"].find_one({"_id": new_user.inserted_id})
    return created_user

async def verify_user_email(db: AsyncIOMotorDatabase, token: str):
    user = await db["users"].find_one({"verification_token": token})
    if not user:
        return False
    
    await db["users"].update_one(
        {"_id": user["_id"]},
        {"$set": {"is_active": True, "verification_token": None}}
    )
    return True

async def authenticate_user(db: AsyncIOMotorDatabase, username: str, password: str):
    user = await get_user_by_username(db, username)
    if not user:
        return False
    if not verify_password(password, user["hashed_password"]):
        return False
    if not user.get("is_active", False):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user. Please verify your email."
        )
    return user
