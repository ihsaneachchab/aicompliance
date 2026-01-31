from pydantic_settings import BaseSettings
from typing import Optional
from pathlib import Path
from dotenv import load_dotenv
import os

# Load .env file explicitly
env_path = Path(__file__).parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

class Settings(BaseSettings):
    PROJECT_NAME: str = "Unified AI Platform"
    DEMO_MODE: bool = True
    
    # Database
    MONGODB_URL: str = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
    DATABASE_NAME: str = "ai_platform_db"

    # Security
    SECRET_KEY: str = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7" # Change in production!
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # Email
    MAIL_USERNAME: str = "your_email@gmail.com"
    MAIL_PASSWORD: str = "your_password"
    MAIL_FROM: str = "your_email@gmail.com"
    MAIL_PORT: int = 587
    MAIL_SERVER: str = "smtp.gmail.com"
    MAIL_STARTTLS: bool = True
    MAIL_SSL_TLS: bool = False
    USE_CREDENTIALS: bool = True
    VALIDATE_CERTS: bool = True

    # Chatbot RAG API
    CHATBOT_API_BASE_URL: str = "http://127.0.0.1:8001/api/v1"
    CHATBOT_API_TIMEOUT: int = 60
    # Credentials pour l'API du chatbot (optionnel, pour auto-authentification)
    CHATBOT_API_USERNAME: Optional[str] = "admin@aicompliance.com"
    CHATBOT_API_PASSWORD: Optional[str] = "admin123"
    
    # Groq API (pour le chatbot RAG et analyse ISO)
    GROQ_API_KEY: Optional[str] = None
    ANALYSIS_GROQ_API_KEY: str = os.getenv("GROQ_API_KEY")
    
    # ISO 9001 Analysis System
    BASE_DIR: Path = Path(__file__).parent.parent
    ISO_DOCS_DIR: Path = BASE_DIR / "modules" / "conformity" / "iso"
    UPLOADS_DIR: Path = BASE_DIR / "data" / "uploads"
    VECTORSTORE_DIR: Path = BASE_DIR / "vectorstore" / "chroma_db"
    REPORTS_DIR: Path = BASE_DIR / "data" / "reports"
    
    # Groq Model Settings
    GROQ_MODEL: str = "llama-3.1-8b-instant"
    GROQ_TEMPERATURE: float = 0.1
    GROQ_MAX_TOKENS: int = 2048
    
    # Embeddings
    EMBEDDING_MODEL: str = "sentence-transformers/paraphrase-multilingual-mpnet-base-v2"
    EMBEDDING_DIMENSION: int = 768
    
    # ChromaDB
    COLLECTION_NAME: str = "iso_9001_knowledge"
    DISTANCE_METRIC: str = "cosine"
    
    # Chunking
    CHUNK_SIZE: int = 800
    CHUNK_OVERLAP: int = 200
    
    # Retrieval
    TOP_K_RESULTS: int = 5
    SIMILARITY_THRESHOLD: float = 0.7

    model_config = {
        "env_file": ".env",
        "extra": "ignore"
    }

settings = Settings()
# Config updated to use IPv4 for chatbot API
