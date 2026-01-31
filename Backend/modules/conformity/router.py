"""
Router FastAPI pour l'analyse de conformité ISO 9001
"""
import logging
import shutil
from pathlib import Path
from datetime import datetime
from typing import Optional

from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Depends
from fastapi.responses import JSONResponse
from motor.motor_asyncio import AsyncIOMotorDatabase

from core.config import settings
from core.database import get_database
from .schemas import (
    AnalysisRequest, ConformityResult, Finding, FindingSeverity,
    DocumentType, IndexStatus, AnalysisHistory, NonConformity, NCStatus
)
from .document_extractor import extract_document
from .document_processor import DocumentProcessor
from .vectorstore_manager import VectorStoreManager
from .rag_system import ISO9001RAGSystem
from .conformity_analyzer import ConformityAnalyzer
from .mock_storage import MockStorage

from langchain_groq import ChatGroq

logger = logging.getLogger(__name__)

router = APIRouter(tags=["Conformity"])

# Variables globales pour les instances (singleton pattern)
_vectorstore_manager: Optional[VectorStoreManager] = None
_rag_system: Optional[ISO9001RAGSystem] = None
_llm: Optional[ChatGroq] = None
_mock_storage: Optional[MockStorage] = None


def get_mock_storage() -> MockStorage:
    """Obtenir l'instance de stockage simulé"""
    global _mock_storage
    if _mock_storage is None:
        mock_path = settings.BASE_DIR / "data" / "mock_db.json"
        _mock_storage = MockStorage(mock_path)
    return _mock_storage


def get_vectorstore_manager() -> VectorStoreManager:
    """Obtenir ou créer le gestionnaire de vectorstore"""
    global _vectorstore_manager
    
    if _vectorstore_manager is None:
        _vectorstore_manager = VectorStoreManager()
        
        # Essayer de charger le vectorstore existant
        try:
            _vectorstore_manager.initialize()
            logger.info("Vectorstore charge")
        except Exception as e:
            logger.warning(f"Vectorstore non disponible: {e}")
    
    return _vectorstore_manager


def get_rag_system() -> ISO9001RAGSystem:
    """Obtenir ou créer le système RAG"""
    global _rag_system
    
    if _rag_system is None:
        if not settings.ANALYSIS_GROQ_API_KEY:
            raise HTTPException(status_code=500, detail="ANALYSIS_GROQ_API_KEY non configurée")
        
        vectorstore = get_vectorstore_manager()
        _rag_system = ISO9001RAGSystem(
            groq_api_key=settings.ANALYSIS_GROQ_API_KEY,
            vectorstore_manager=vectorstore
        )
        logger.info("Systeme RAG initialise")
    
    return _rag_system


def get_llm() -> ChatGroq:
    """Obtenir ou créer le LLM Groq"""
    global _llm
    
    if _llm is None:
        if not settings.ANALYSIS_GROQ_API_KEY:
            raise HTTPException(status_code=500, detail="ANALYSIS_GROQ_API_KEY non configurée")
        
        _llm = ChatGroq(
            groq_api_key=settings.ANALYSIS_GROQ_API_KEY,
            model_name=settings.GROQ_MODEL,
            temperature=settings.GROQ_TEMPERATURE,
            max_tokens=settings.GROQ_MAX_TOKENS
        )
        logger.info("LLM Groq initialise")
    
    return _llm


@router.get("/conformity/status")
async def conformity_status():
    """Vérifier le statut du service d'analyse"""
    try:
        vectorstore = get_vectorstore_manager()
        stats = vectorstore.get_collection_stats()
        
        return {
            "status": "ready",
            "vectorstore_initialized": stats.get('initialized', False),
            "document_count": stats.get('document_count', 0),
            "groq_api_configured": bool(settings.GROQ_API_KEY)
        }
    except Exception as e:
        return {
            "status": "error",
            "error": str(e),
            "groq_api_configured": bool(settings.GROQ_API_KEY)
        }


@router.post("/conformity/index-iso")
async def index_iso_documents():
    """Indexer les documents ISO dans le vectorstore"""
    try:
        logger.info("Début de l'indexation des documents ISO...")
        
        # Vérifier que les PDFs ISO existent
        iso_docs_dir = settings.ISO_DOCS_DIR
        pdf_files = list(iso_docs_dir.glob("*.pdf"))
        
        if not pdf_files:
            raise HTTPException(
                status_code=404,
                detail=f"Aucun PDF trouvé dans {iso_docs_dir}"
            )
        
        logger.info(f"Trouvé {len(pdf_files)} fichiers PDF")
        
        # Traiter les PDFs
        processor = DocumentProcessor()
        documents = processor.process_multiple_pdfs(pdf_files)
        
        logger.info(f"Créé {len(documents)} chunks")
        
        # Créer ou réinitialiser le vectorstore
        vectorstore = VectorStoreManager()
        
        # Supprimer l'ancienne collection si elle existe
        try:
            vectorstore.delete_collection()
        except:
            pass
        
        # Initialiser avec les nouveaux documents
        vectorstore.initialize(documents=documents)
        
        # Mettre à jour la référence globale
        global _vectorstore_manager
        _vectorstore_manager = vectorstore
        
        # Réinitialiser le RAG system
        global _rag_system
        _rag_system = None
        
        return {
            "success": True,
            "message": "Documents ISO indexés avec succès",
            "document_count": len(documents),
            "pdf_files": [f.name for f in pdf_files]
        }
        
    except Exception as e:
        logger.error(f"Erreur lors de l'indexation: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/conformity/analyze")
async def analyze_document(
    file: UploadFile = File(...),
    document_type: str = Form(...),
    process_iso: str = Form(...),
    doc_reference: Optional[str] = Form(None)
):
    """Analyser un document uploadé"""
    try:
        logger.info(f"Analyse du document: {file.filename}")
        
        # Vérifier que le vectorstore est initialisé
        vectorstore = get_vectorstore_manager()
        if not vectorstore.is_initialized():
            raise HTTPException(
                status_code=503,
                detail="Système non initialisé. Veuillez d'abord indexer les documents ISO via /conformity/index-iso"
            )
        
        # Sauvegarder le fichier uploadé
        upload_path = settings.UPLOADS_DIR / file.filename
        upload_path.parent.mkdir(parents=True, exist_ok=True)
        
        with open(upload_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        logger.info(f"Fichier sauvegardé: {upload_path}")
        
        # Extraire le contenu du document
        sections = extract_document(upload_path)
        logger.info(f"Extrait {len(sections)} sections")
        
        if not sections:
            raise HTTPException(
                status_code=400,
                detail="Impossible d'extraire du texte de ce document. Assurez-vous qu'il ne s'agit pas d'une image scannée (OCR requis) ou d'un fichier protégé."
            )
        
        # Initialiser les systèmes d'analyse
        rag_system = get_rag_system()
        llm = get_llm()
        
        # Créer l'analyseur
        analyzer = ConformityAnalyzer(llm=llm, rag_system=rag_system)
        
        # Analyser le document
        result = await analyzer.analyze_document(sections, process_iso, document_type)
        
        # Créer le résultat de conformité
        conformity_result = ConformityResult(
            score=result['score'],
            status=result['status'],
            conform_items=result['conform_items'],
            warning_items=result['warning_items'],
            non_conform_items=result['non_conform_items'],
            findings=result['findings'],
            document_name=file.filename,
            document_type=DocumentType(document_type),
            process_iso=process_iso,
            analysis_date=datetime.now()
        )
        
        
        # Sauvegarder dans MongoDB ou MockStorage
        try:
            history_data = AnalysisHistory(
                document_name=file.filename,
                document_type=DocumentType(document_type),
                process_iso=process_iso,
                score=result['score'],
                status=result['status'],
                conform_items=result['conform_items'],
                warning_items=result['warning_items'],
                non_conform_items=result['non_conform_items'],
                findings=result['findings'],
                analysis_date=datetime.now()
            )
            
            if settings.DEMO_MODE:
                mock_storage = get_mock_storage()
                analysis_id = mock_storage.save_analysis(history_data.dict(by_alias=True, exclude={'id'}))
                logger.info(f"Analyse sauvegardee dans MockStorage avec ID: {analysis_id}")
            else:
                db = await get_database()
                inserted = await db.analysis_history.insert_one(history_data.dict(by_alias=True, exclude={'id'}))
                analysis_id = str(inserted.inserted_id)
                logger.info(f"Analyse sauvegardee dans MongoDB avec ID: {analysis_id}")
            
            # Créer des Non-Conformités pour les findings de type DANGER
            nc_count = 0
            for finding in result['findings']:
                if finding.severity == FindingSeverity.DANGER:
                    nc = NonConformity(
                        title=finding.title,
                        description=finding.description,
                        status=NCStatus.IDENTIFIE,
                        severity="Critical",  # Mappage vers le format frontend
                        clause=finding.clause,
                        document_ref=doc_reference or file.filename,
                        analysis_id=analysis_id
                    )
                    
                    if settings.DEMO_MODE:
                        get_mock_storage().save_nc(nc.dict(by_alias=True, exclude={'id'}))
                    else:
                        await db.non_conformities.insert_one(nc.dict(by_alias=True, exclude={'id'}))
                    nc_count += 1
            if nc_count > 0:
                logger.info(f"{nc_count} non-conformités créées")
                
        except Exception as e:
            logger.warning(f"Erreur lors de la sauvegarde: {e}")
        
        logger.info("ℹ️ Analyse terminée")
        
        
        # Nettoyer le fichier uploadé
        try:
            upload_path.unlink()
        except:
            pass
        
        return conformity_result
        
    except Exception as e:
        logger.error(f"Erreur lors de l'analyse: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/conformity/history")
async def get_analysis_history(
    limit: int = 10,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Récupérer l'historique des analyses"""
    try:
        if settings.DEMO_MODE:
            mock_storage = get_mock_storage()
            history = mock_storage.get_history(limit)
            return {"history": history}
            
        cursor = db.analysis_history.find().sort("analysis_date", -1).limit(limit)
        history = await cursor.to_list(length=limit)
        
        # Convertir ObjectId en string
        for item in history:
            item['_id'] = str(item['_id'])
        
        return {"history": history}
        
    except Exception as e:
        logger.error(f"Erreur lors de la récupération de l'historique: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/conformity/stats")
async def get_stats(db: AsyncIOMotorDatabase = Depends(get_database)):
    """Obtenir les statistiques d'analyse"""
    try:
        if settings.DEMO_MODE:
            mock_storage = get_mock_storage()
            return mock_storage.get_stats()

        # Compter le total d'analyses
        total_analyses = await db.analysis_history.count_documents({})
        
        # Calculer le score moyen
        pipeline = [
            {"$group": {"_id": None, "avg_score": {"$avg": "$score"}}}
        ]
        result = await db.analysis_history.aggregate(pipeline).to_list(length=1)
        avg_score = int(result[0]['avg_score']) if result else 0
        
        # Compter les analyses de cette semaine
        from datetime import timedelta
        week_ago = datetime.now() - timedelta(days=7)
        week_count = await db.analysis_history.count_documents({
            "analysis_date": {"$gte": week_ago}
        })
        
        return {
            "total_analyses": total_analyses,
            "average_score": avg_score,
            "this_week": week_count
        }
        
    except Exception as e:
        logger.error(f"Erreur lors de la récupération des stats: {e}")
        return {
            "total_analyses": 0,
            "average_score": 0,
            "this_week": 0
        }


@router.get("/conformity/non-conformities")
async def get_non_conformities(
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Récupérer la liste des non-conformités"""
    try:
        if settings.DEMO_MODE:
            mock_storage = get_mock_storage()
            ncs = mock_storage.get_ncs()
            return {"non_conformities": ncs}

        cursor = db.non_conformities.find().sort("created_at", -1)
        ncs = await cursor.to_list(length=100)
        
        for nc in ncs:
            nc['_id'] = str(nc['_id'])
            
        return {"non_conformities": ncs}
    except Exception as e:
        logger.error(f"Erreur lors de la récupération des NC: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.patch("/conformity/non-conformities/{nc_id}")
async def update_nc_status(
    nc_id: str,
    status: str,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Mettre à jour le statut d'une non-conformité"""
    try:
        if settings.DEMO_MODE:
            mock_storage = get_mock_storage()
            success = mock_storage.update_nc_status(nc_id, status)
            if not success:
                raise HTTPException(status_code=404, detail="Non-conformité non trouvée")
            return {"success": True}

        from bson import ObjectId
        result = await db.non_conformities.update_one(
            {"_id": ObjectId(nc_id)},
            {"$set": {"status": status, "updated_at": datetime.now()}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Non-conformité non trouvée")
            
        return {"success": True}
    except Exception as e:
        logger.error(f"Erreur lors de la mise à jour de la NC: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/conformity/history/{analysis_id}")
async def delete_analysis(
    analysis_id: str,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Supprimer une analyse de l'historique"""
    try:
        if settings.DEMO_MODE:
            mock_storage = get_mock_storage()
            success = mock_storage.delete_analysis(analysis_id)
            if not success:
                raise HTTPException(status_code=404, detail="Analyse non trouvée")
            return {"success": True, "message": "Analyse supprimée"}

        from bson import ObjectId
        try:
            obj_id = ObjectId(analysis_id)
        except:
            raise HTTPException(status_code=400, detail="ID invalide")

        result = await db.analysis_history.delete_one({"_id": obj_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Analyse non trouvée")
            
        return {"success": True, "message": "Analyse supprimée"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Erreur lors de la suppression de l'analyse: {e}")
        raise HTTPException(status_code=500, detail=str(e))
