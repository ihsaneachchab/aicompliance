from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Optional, List
from pydantic import BaseModel
import httpx
from core.config import settings
from modules.auth.router import get_current_user

router = APIRouter(tags=["Chatbot"])
security = HTTPBearer()

class ChatSettings(BaseModel):
    model: str = "llama-3.3-70b-versatile"
    temperature: float = 0.2

class AskQuestionRequest(BaseModel):
    message: str
    settings: Optional[ChatSettings] = ChatSettings()

@router.get("/chatbot/status")
async def chatbot_status():
    """Vérifie le statut de l'API du chatbot"""
    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
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
        headers = {
            "Authorization": "Bearer test_user"
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
                "model": request.settings.model if request.settings else "llama-3.3-70b-versatile",
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
    current_user: dict = Depends(get_current_user)
):
    """Crée une nouvelle conversation"""
    try:
        headers = {
            "Authorization": f"Bearer {current_user.get('email', 'default')}"
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

@router.get("/chatbot/conversations")
async def list_conversations(
    current_user: dict = Depends(get_current_user)
):
    """Liste toutes les conversations de l'utilisateur"""
    try:
        headers = {
            "Authorization": f"Bearer {current_user.get('email', 'default')}"
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
    current_user: dict = Depends(get_current_user)
):
    """Récupère l'historique d'une conversation"""
    try:
        headers = {
            "Authorization": f"Bearer {current_user.get('email', 'default')}"
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
    current_user: dict = Depends(get_current_user)
):
    """Pose une question au chatbot RAG"""
    try:
        headers = {
            "Authorization": f"Bearer {current_user.get('email', 'default')}"
        }
        
        payload = {
            "message": request.message,
            "settings": {
                "model": request.settings.model if request.settings else "llama-3.3-70b-versatile",
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

@router.post("/chatbot/conversations/{convo_id}/documents")
async def upload_conversation_document(
    convo_id: str,
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
    """Upload un document pour une conversation spécifique"""
    try:
        headers = {
            "Authorization": f"Bearer {current_user.get('email', 'default')}"
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
    current_user: dict = Depends(get_current_user)
):
    """Upload un document dans la base de connaissances globale"""
    try:
        headers = {
            "Authorization": f"Bearer {current_user.get('email', 'default')}"
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
    current_user: dict = Depends(get_current_user)
):
    """Liste les documents d'une conversation"""
    try:
        headers = {
            "Authorization": f"Bearer {current_user.get('email', 'default')}"
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
    current_user: dict = Depends(get_current_user)
):
    """Liste les documents de la base de connaissances globale"""
    try:
        headers = {
            "Authorization": f"Bearer {current_user.get('email', 'default')}"
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
    current_user: dict = Depends(get_current_user)
):
    """Supprime un document d'une conversation"""
    try:
        headers = {
            "Authorization": f"Bearer {current_user.get('email', 'default')}"
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
