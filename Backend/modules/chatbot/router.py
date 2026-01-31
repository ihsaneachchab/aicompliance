from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Optional, List
from pydantic import BaseModel
import httpx
from core.config import settings
from modules.auth.router import get_current_user, get_current_user_or_demo

router = APIRouter(tags=["Chatbot"])
security = HTTPBearer()

# Cache pour le token de l'API du chatbot
_chatbot_token_cache = None

async def get_chatbot_auth_token() -> str:
    """Obtient un token d'authentification pour l'API du chatbot"""
    global _chatbot_token_cache
    
    # Si on a des credentials configurés, s'authentifier
    if settings.CHATBOT_API_USERNAME and settings.CHATBOT_API_PASSWORD:
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.post(
                    f"{settings.CHATBOT_API_BASE_URL}/auth/token",
                    data={
                        "username": settings.CHATBOT_API_USERNAME,
                        "password": settings.CHATBOT_API_PASSWORD
                    },
                    headers={"Content-Type": "application/x-www-form-urlencoded"}
                )
                if response.status_code == 200:
                    data = response.json()
                    _chatbot_token_cache = data.get("access_token")
                    return _chatbot_token_cache
        except Exception as e:
            print(f"Warning: Could not authenticate with chatbot API: {e}")
    
    # Fallback: utiliser un token par défaut ou l'email de l'utilisateur
    return "demo_token"  # L'API du chatbot peut accepter ce token en mode développement

class ChatSettings(BaseModel):
    model: str = "llama-3.3-70b-versatile"
    temperature: float = 0.2

class AskQuestionRequest(BaseModel):
    message: str
    settings: Optional[ChatSettings] = ChatSettings()

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

@router.post("/chatbot/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Simplified chatbot endpoint that accepts a message and returns a response"""
    try:
        token = await get_chatbot_auth_token()
        headers = {
            "Authorization": f"Bearer {token}"
        }
        
        # Create a conversation first
        async with httpx.AsyncClient(timeout=settings.CHATBOT_API_TIMEOUT) as client:
            # Create conversation
            try:
                conv_response = await client.post(
                    f"{settings.CHATBOT_API_BASE_URL}/conversations/",
                    headers=headers,
                    json={}
                )
                conv_response.raise_for_status()
                convo_id = conv_response.json().get("convo_id")
                
                if not convo_id:
                    raise HTTPException(
                        status_code=500, 
                        detail="Failed to create conversation: no convo_id returned"
                    )
            except httpx.ConnectError:
                raise HTTPException(
                    status_code=503,
                    detail=f"Cannot connect to chatbot API at {settings.CHATBOT_API_BASE_URL}. Please ensure the chatbot API is running."
                )
            except httpx.HTTPStatusError as e:
                raise HTTPException(
                    status_code=e.response.status_code,
                    detail=f"Error creating conversation: {e.response.text}"
                )
            
            # Ask question
            payload = {
                "message": request.message,
                "settings": {
                    "model": "llama-3.1-8b-instant",
                    "temperature": 0.2
                }
            }
            
            try:
                ask_response = await client.post(
                    f"{settings.CHATBOT_API_BASE_URL}/conversations/{convo_id}/ask",
                    headers=headers,
                    json=payload
                )
                ask_response.raise_for_status()
                result = ask_response.json()
                
                # Extract answer from response
                answer = result.get("answer", "")
                if not answer:
                    raise HTTPException(
                        status_code=500,
                        detail="Chatbot API returned empty answer"
                    )
                return ChatResponse(response=answer)
            except httpx.HTTPStatusError as e:
                raise HTTPException(
                    status_code=e.response.status_code,
                    detail=f"Error asking question: {e.response.text}"
                )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )

@router.get("/chatbot/status")
async def chatbot_status():
    """Vérifie le statut de l'API du chatbot"""
    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            # Tester l'endpoint /api/v1/health du chatbot
            response = await client.get(f"{settings.CHATBOT_API_BASE_URL}/health", follow_redirects=True)
            if response.status_code == 200:
                return {"status": "connected", "chatbot_api": "online"}
            else:
                return {"status": "error", "chatbot_api": "unavailable"}
    except Exception as e:
        return {"status": "error", "chatbot_api": "unavailable", "error": str(e)}

# Endpoints de test SANS authentification
@router.post("/chatbot/test/conversations")
async def test_create_conversation():
    """Crée une nouvelle conversation (TEST - sans authentification)"""
    try:
        token = await get_chatbot_auth_token()
        headers = {
            "Authorization": f"Bearer {token}"
        }
        
        async with httpx.AsyncClient(timeout=settings.CHATBOT_API_TIMEOUT) as client:
            response = await client.post(
                f"{settings.CHATBOT_API_BASE_URL}/conversations/",
                headers=headers,
                json={}
            )
            response.raise_for_status()
            return response.json()
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=e.response.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/chatbot/test/conversations/{convo_id}/ask")
async def test_ask_question(
    convo_id: str,
    request: AskQuestionRequest
):
    """Pose une question au chatbot RAG (TEST - sans authentification)"""
    try:
        headers = {
            "Authorization": "Bearer test_user"
        }
        
        payload = {
            "message": request.message,
            "settings": {
                "model": request.settings.model if request.settings else "llama-3.1-8b-instant",
                "temperature": request.settings.temperature if request.settings else 0.2
            }
        }
        
        async with httpx.AsyncClient(timeout=settings.CHATBOT_API_TIMEOUT) as client:
            response = await client.post(
                f"{settings.CHATBOT_API_BASE_URL}/conversations/{convo_id}/ask",
                headers=headers,
                json=payload
            )
            response.raise_for_status()
            return response.json()
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=e.response.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/chatbot/test/conversations/{convo_id}/history")
async def test_get_conversation_history(convo_id: str):
    """Récupère l'historique d'une conversation (TEST - sans authentification)"""
    try:
        headers = {
            "Authorization": "Bearer test_user"
        }
        
        async with httpx.AsyncClient(timeout=settings.CHATBOT_API_TIMEOUT) as client:
            response = await client.get(
                f"{settings.CHATBOT_API_BASE_URL}/conversations/{convo_id}/history",
                headers=headers
            )
            response.raise_for_status()
            return response.json()
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=e.response.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/chatbot/conversations")
async def create_conversation(
    current_user: dict = Depends(get_current_user_or_demo)
):
    """Crée une nouvelle conversation"""
    try:
        token = await get_chatbot_auth_token()
        headers = {
            "Authorization": f"Bearer {token}"
        }
        
        async with httpx.AsyncClient(timeout=settings.CHATBOT_API_TIMEOUT) as client:
            try:
                response = await client.post(
                    f"{settings.CHATBOT_API_BASE_URL}/conversations/",
                    headers=headers,
                    json={}
                )
                response.raise_for_status()
                return response.json()
            except httpx.ConnectError:
                raise HTTPException(
                    status_code=503,
                    detail=f"Cannot connect to chatbot API at {settings.CHATBOT_API_BASE_URL}. Please ensure the chatbot API is running."
                )
            except httpx.TimeoutException:
                raise HTTPException(
                    status_code=504,
                    detail="Chatbot API request timed out. Please try again later."
                )
    except HTTPException:
        raise
    except httpx.HTTPStatusError as e:
        error_detail = e.response.text if e.response else str(e)
        raise HTTPException(
            status_code=e.response.status_code if e.response else 500,
            detail=f"Chatbot API error: {error_detail}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )

@router.get("/chatbot/conversations")
async def list_conversations(
    current_user: dict = Depends(get_current_user_or_demo)
):
    """Liste toutes les conversations de l'utilisateur"""
    try:
        token = await get_chatbot_auth_token()
        headers = {
            "Authorization": f"Bearer {token}"
        }
        
        async with httpx.AsyncClient(timeout=settings.CHATBOT_API_TIMEOUT) as client:
            response = await client.get(
                f"{settings.CHATBOT_API_BASE_URL}/conversations/",
                headers=headers
            )
            response.raise_for_status()
            return response.json()
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=e.response.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/chatbot/conversations/{convo_id}/history")
async def get_conversation_history(
    convo_id: str,
    current_user: dict = Depends(get_current_user_or_demo)
):
    """Récupère l'historique d'une conversation"""
    try:
        token = await get_chatbot_auth_token()
        headers = {
            "Authorization": f"Bearer {token}"
        }
        
        async with httpx.AsyncClient(timeout=settings.CHATBOT_API_TIMEOUT) as client:
            response = await client.get(
                f"{settings.CHATBOT_API_BASE_URL}/conversations/{convo_id}/history",
                headers=headers
            )
            response.raise_for_status()
            return response.json()
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=e.response.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/chatbot/conversations/{convo_id}/ask")
async def ask_question(
    convo_id: str,
    request: AskQuestionRequest,
    current_user: dict = Depends(get_current_user_or_demo)
):
    """Pose une question au chatbot RAG"""
    try:
        token = await get_chatbot_auth_token()
        headers = {
            "Authorization": f"Bearer {token}"
        }
        
        payload = {
            "message": request.message,
            "settings": {
                "model": request.settings.model if request.settings else "llama-3.3-70b-versatile",
                "temperature": request.settings.temperature if request.settings else 0.2
            }
        }
        
        async with httpx.AsyncClient(timeout=settings.CHATBOT_API_TIMEOUT) as client:
            try:
                response = await client.post(
                    f"{settings.CHATBOT_API_BASE_URL}/conversations/{convo_id}/ask",
                    headers=headers,
                    json=payload
                )
                response.raise_for_status()
                return response.json()
            except httpx.ConnectError:
                raise HTTPException(
                    status_code=503,
                    detail=f"Cannot connect to chatbot API at {settings.CHATBOT_API_BASE_URL}. Please ensure the chatbot API is running."
                )
            except httpx.TimeoutException:
                raise HTTPException(
                    status_code=504,
                    detail="Chatbot API request timed out. Please try again later."
                )
    except HTTPException:
        raise
    except httpx.HTTPStatusError as e:
        error_detail = e.response.text if e.response else str(e)
        raise HTTPException(
            status_code=e.response.status_code if e.response else 500,
            detail=f"Chatbot API error: {error_detail}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )

@router.post("/chatbot/conversations/{convo_id}/documents")
async def upload_conversation_document(
    convo_id: str,
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user_or_demo)
):
    """Upload un document pour une conversation spécifique"""
    try:
        token = await get_chatbot_auth_token()
        headers = {
            "Authorization": f"Bearer {token}"
        }
        
        file_content = await file.read()
        files = {"file": (file.filename, file_content, file.content_type)}
        
        async with httpx.AsyncClient(timeout=settings.CHATBOT_API_TIMEOUT) as client:
            response = await client.post(
                f"{settings.CHATBOT_API_BASE_URL}/conversations/{convo_id}/documents",
                headers=headers,
                files=files
            )
            response.raise_for_status()
            return response.json()
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=e.response.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/chatbot/documents/global")
async def upload_global_document(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user_or_demo)
):
    """Upload un document dans la base de connaissances globale"""
    try:
        token = await get_chatbot_auth_token()
        headers = {
            "Authorization": f"Bearer {token}"
        }
        
        file_content = await file.read()
        files = {"file": (file.filename, file_content, file.content_type)}
        
        async with httpx.AsyncClient(timeout=settings.CHATBOT_API_TIMEOUT) as client:
            response = await client.post(
                f"{settings.CHATBOT_API_BASE_URL}/conversations/documents/global",
                headers=headers,
                files=files
            )
            response.raise_for_status()
            return response.json()
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=e.response.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/chatbot/conversations/{convo_id}/documents")
async def list_conversation_documents(
    convo_id: str,
    current_user: dict = Depends(get_current_user_or_demo)
):
    """Liste les documents d'une conversation"""
    try:
        token = await get_chatbot_auth_token()
        headers = {
            "Authorization": f"Bearer {token}"
        }
        
        async with httpx.AsyncClient(timeout=settings.CHATBOT_API_TIMEOUT) as client:
            response = await client.get(
                f"{settings.CHATBOT_API_BASE_URL}/conversations/{convo_id}/documents",
                headers=headers
            )
            response.raise_for_status()
            return response.json()
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=e.response.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/chatbot/documents/global")
async def list_global_documents(
    current_user: dict = Depends(get_current_user_or_demo)
):
    """Liste les documents de la base de connaissances globale"""
    try:
        token = await get_chatbot_auth_token()
        headers = {
            "Authorization": f"Bearer {token}"
        }
        
        async with httpx.AsyncClient(timeout=settings.CHATBOT_API_TIMEOUT) as client:
            response = await client.get(
                f"{settings.CHATBOT_API_BASE_URL}/conversations/documents/global",
                headers=headers
            )
            response.raise_for_status()
            return response.json()
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=e.response.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/chatbot/conversations/{convo_id}/documents/{filename}")
async def delete_document(
    convo_id: str,
    filename: str,
    current_user: dict = Depends(get_current_user_or_demo)
):
    """Supprime un document d'une conversation"""
    try:
        token = await get_chatbot_auth_token()
        headers = {
            "Authorization": f"Bearer {token}"
        }
        
        async with httpx.AsyncClient(timeout=settings.CHATBOT_API_TIMEOUT) as client:
            response = await client.delete(
                f"{settings.CHATBOT_API_BASE_URL}/conversations/{convo_id}/documents/{filename}",
                headers=headers
            )
            response.raise_for_status()
            return response.json()
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=e.response.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

import os
print("[DEBUG] GROQ_API_KEY =", os.getenv("GROQ_API_KEY"))
