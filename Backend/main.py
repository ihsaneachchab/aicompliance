from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.database import connect_to_mongo, close_mongo_connection
from core.config import settings
from modules.auth.router import router as auth_router
from modules.chatbot.router import router as chatbot_router
from modules.conformity.router import router as conformity_router
from modules.docgen.router import router as docgen_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()
    yield
    await close_mongo_connection()

app = FastAPI(
    title=settings.PROJECT_NAME,
    lifespan=lifespan
)

# CORS (Cross-Origin Resource Sharing)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", 
        "http://127.0.0.1:5173",
        "http://localhost:3000", 
        "http://127.0.0.1:3000",
        "http://localhost:8000",
        "http://127.0.0.1:8000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/auth")
app.include_router(chatbot_router, prefix="/api")
app.include_router(conformity_router, prefix="/api")
app.include_router(docgen_router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Unified AI Platform API"}
