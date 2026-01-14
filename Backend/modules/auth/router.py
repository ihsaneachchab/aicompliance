from datetime import timedelta
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from motor.motor_asyncio import AsyncIOMotorDatabase

from core.database import get_database
from core.config import settings
from core.security import create_access_token
from .models import Token, UserCreate, UserResponse, TokenData
from .service import create_user, authenticate_user, get_user_by_username, verify_user_email

router = APIRouter(tags=["Authentication"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)], db: AsyncIOMotorDatabase = Depends(get_database)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
        
    user = await get_user_by_username(db, username=token_data.username)
    if user is None:
        raise credentials_exception
    
    # Convert _id to string for response model compatibility
    user["_id"] = str(user["_id"])
    return user

@router.post("/token", response_model=Token)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    print(f"DEBUG: Login attempt for user: {form_data.username}")
    try:
        user = await authenticate_user(db, form_data.username, form_data.password)
        if not user:
             print("DEBUG: User not found or password incorrect")
             raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        print("DEBUG: Login successful")
    except HTTPException as e:
        print(f"DEBUG: Login failed with HTTPException: {e.detail}")
        raise e
    except Exception as e:
        print(f"DEBUG: Unexpected error during login: {e}")
        raise e

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["username"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/signup", response_model=UserResponse)
async def register_user(user: UserCreate, db: AsyncIOMotorDatabase = Depends(get_database)):
    print(f"DEBUG: Received registration request for {user.email}") # Debug
    new_user = await create_user(db, user)
    new_user["_id"] = str(new_user["_id"])
    return new_user

@router.get("/verify/{token}")
async def verify_email(token: str, db: AsyncIOMotorDatabase = Depends(get_database)):
    success = await verify_user_email(db, token)
    if not success:
        raise HTTPException(status_code=400, detail="Invalid token")
    return {"message": "Email verified successfully"}

@router.get("/users/me", response_model=UserResponse)
async def read_users_me(current_user: Annotated[dict, Depends(get_current_user)]):
    return current_user
