from datetime import timedelta
from typing import Annotated
from urllib.parse import unquote
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.responses import RedirectResponse
from jose import JWTError, jwt
from motor.motor_asyncio import AsyncIOMotorDatabase

from core.database import get_database
from core.config import settings
from core.security import create_access_token
from .models import Token, UserCreate, UserResponse, TokenData
from .service import create_user, authenticate_user, get_user_by_username

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
    print(f"DEBUG: Received registration request for {user.email}")
    new_user = await create_user(db, user)
    new_user["_id"] = str(new_user["_id"])
    return new_user

# @router.get("/verify/{token}")
# async def verify_email(token: str, db: AsyncIOMotorDatabase = Depends(get_database)):
#     """
#     Verify user email with the token from the verification link.
#     Redirects to login page with success or error parameters.
#     """
#     print(f"DEBUG ROUTE: Received token parameter: '{token}'")
#     print(f"DEBUG ROUTE: Token length: {len(token)}")
    
#     # Decode URL-encoded characters if any
#     decoded_token = unquote(token)
#     print(f"DEBUG ROUTE: Decoded token: '{decoded_token}'")
    
#     # Strip any whitespace
#     clean_token = decoded_token.strip()
#     print(f"DEBUG ROUTE: Clean token: '{clean_token}'")
    
#     try:
#         success = await verify_user_email(db, clean_token)
        
#         if not success:
#             print("DEBUG ROUTE: Verification failed, redirecting with error")
#             return RedirectResponse(
#                 url="http://localhost:5173/login?verified=false&error=invalid_token",
#                 status_code=303
#             )
        
#         print("DEBUG ROUTE: Verification successful, redirecting with success")
#         return RedirectResponse(
#             url="http://localhost:5173/login?verified=true",
#             status_code=303
#         )
    
#     except Exception as e:
#         print(f"DEBUG ROUTE: Exception during verification: {repr(e)}")
#         import traceback
#         traceback.print_exc()
#         return RedirectResponse(
#             url="http://localhost:5173/login?verified=false&error=server_error",
#             status_code=303
#         )

@router.get("/users/me", response_model=UserResponse)
async def read_users_me(current_user: Annotated[dict, Depends(get_current_user)]):
    return current_user

# # Optional: Add a debug endpoint to test token verification without redirect
# @router.get("/debug/verify/{token}")
# async def debug_verify_email(token: str, db: AsyncIOMotorDatabase = Depends(get_database)):
#     """Debug endpoint to test token verification without redirect"""
#     decoded_token = unquote(token)
#     clean_token = decoded_token.strip()
    
#     # Find user with this token
#     user = await db["users"].find_one({"verification_token": clean_token})
    
#     # Get all users with tokens for comparison
#     all_users_with_tokens = await db["users"].find(
#         {"verification_token": {"$exists": True, "$ne": None}}
#     ).to_list(length=10)
    
#     return {
#         "received_token": token,
#         "decoded_token": decoded_token,
#         "clean_token": clean_token,
#         "token_length": len(clean_token),
#         "user_found": user is not None,
#         "user_email": user.get("email") if user else None,
#         "user_is_active": user.get("is_active") if user else None,
#         "all_tokens_in_db": [
#             {
#                 "email": u.get("email"),
#                 "token": u.get("verification_token"),
#                 "is_active": u.get("is_active"),
#                 "matches": u.get("verification_token") == clean_token
#             }
#             for u in all_users_with_tokens
#         ]
#     }