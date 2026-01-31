"""
Schémas Pydantic pour l'analyse de conformité ISO 9001
"""
from pydantic import BaseModel, Field
from typing import List, Optional
from enum import Enum
from datetime import datetime


class DocumentType(str, Enum):
    """Types de documents supportés"""
    PROCEDURE = "procedure"
    FORMULAIRE = "formulaire"
    ENREGISTREMENT = "enregistrement"
    MANUEL = "manuel"
    AUTRE = "autre"


class ConformityStatus(str, Enum):
    """Statuts de conformité"""
    CONFORME = "conforme"
    PARTIELLEMENT_CONFORME = "partiellement_conforme"
    NON_CONFORME = "non_conforme"
    NON_APPLICABLE = "non_applicable"


class FindingSeverity(str, Enum):
    """Niveaux de sévérité des findings"""
    SUCCESS = "success"
    WARNING = "warning"
    DANGER = "danger"


class Finding(BaseModel):
    """Détail d'un point de conformité/non-conformité"""
    title: str
    description: str
    severity: FindingSeverity
    clause: str
    recommendations: Optional[List[str]] = []


class AnalysisRequest(BaseModel):
    """Requête d'analyse de document"""
    document_type: DocumentType
    process_iso: str = Field(..., description="Clause ISO concernée (ex: 4.4, 7.5)")
    doc_reference: Optional[str] = None


class ConformityResult(BaseModel):
    """Résultat d'analyse de conformité"""
    score: int = Field(..., ge=0, le=100, description="Score de conformité sur 100")
    status: str
    conform_items: int = 0
    warning_items: int = 0
    non_conform_items: int = 0
    findings: List[Finding] = []
    analysis_date: datetime = Field(default_factory=datetime.now)
    document_name: str
    document_type: DocumentType
    process_iso: str


class AnalysisHistory(BaseModel):
    """Historique d'analyse pour MongoDB"""
    id: Optional[str] = Field(None, alias="_id")
    user_id: Optional[str] = None
    document_name: str
    document_type: DocumentType
    process_iso: str
    score: int
    status: str
    conform_items: int
    warning_items: int
    non_conform_items: int
    findings: List[Finding]
    analysis_date: datetime
    
    class Config:
        populate_by_name = True


class NCStatus(str, Enum):
    """Statuts des non-conformités"""
    IDENTIFIE = "Identifié"
    EN_COURS = "En Cours"
    RESOLU = "Résolu"
    VERIFIE = "Vérifié"


class NonConformity(BaseModel):
    """Modèle pour une non-conformité détectée"""
    id: Optional[str] = Field(None, alias="_id")
    title: str
    description: str
    status: NCStatus = NCStatus.IDENTIFIE
    severity: str  # Critical, Warning, Info (pour matcher le frontend)
    clause: str
    document_ref: Optional[str] = None
    analysis_id: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)
    responsible: Optional[str] = "À assigner"
    
    class Config:
        populate_by_name = True


class IndexStatus(BaseModel):
    """Statut de l'indexation des documents ISO"""
    indexed: bool
    document_count: int
    collection_name: str
    last_indexed: Optional[datetime] = None
