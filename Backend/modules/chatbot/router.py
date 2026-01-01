from fastapi import APIRouter

router = APIRouter(tags=["Chatbot"])

@router.get("/chatbot/status")
async def chatbot_status():
    return {"status": "Chatbot module ready for integration"}
