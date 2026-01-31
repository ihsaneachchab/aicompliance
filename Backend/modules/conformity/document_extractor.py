"""
Module d'extraction et de segmentation intelligente des documents d'entreprise
"""
import os
import re
import logging
from pathlib import Path
from typing import List, Dict, Optional
from dataclasses import dataclass, field
from enum import Enum

import pdfplumber
from docx import Document as DocxDocument

logger = logging.getLogger(__name__)


class SectionType(Enum):
    """Types de sections détectées"""
    HEADER = "header"
    TITLE = "title"
    SUBTITLE = "subtitle"
    PARAGRAPH = "paragraph"
    LIST_ITEM = "list_item"
    TABLE = "table"
    UNKNOWN = "unknown"


@dataclass
class DocumentSection:
    """Représente une section du document"""
    title: str
    content: str
    section_type: SectionType = SectionType.UNKNOWN
    level: int = 0  # Niveau hiérarchique (1=titre principal, 2=sous-titre, etc.)
    page_number: Optional[int] = None
    metadata: Dict = field(default_factory=dict)


class DocumentExtractor:
    """Extracteur de documents avec segmentation intelligente"""
    
    # Patterns pour détecter les titres et sections
    TITLE_PATTERNS = [
        r'^(\d+\.)+\s+[A-ZÀÂÄÉÈÊËÏÎÔÙÛÜ]',  # 1.2.3 TITRE
        r'^[A-ZÀÂÄÉÈÊËÏÎÔÙÛÜ\s]{3,}$',  # TITRE EN MAJUSCULES
        r'^(Chapitre|Section|Article|Annexe)\s+\d+',  # Chapitre 1, Section 2, etc.
    ]
    
    def __init__(self):
        self.sections: List[DocumentSection] = []
    
    def extract_from_pdf(self, file_path: Path) -> List[DocumentSection]:
        """Extraire le contenu d'un PDF"""
        logger.info(f"Extraction PDF: {file_path}")
        
        try:
            sections = []
            current_section = None
            
            with pdfplumber.open(file_path) as pdf:
                for page_num, page in enumerate(pdf.pages, 1):
                    text = page.extract_text()
                    
                    if not text:
                        continue
                    
                    # Découper en lignes
                    lines = text.split('\n')
                    
                    for line in lines:
                        line = line.strip()
                        if not line:
                            continue
                        
                        # Détecter si c'est un titre
                        is_title, level = self._is_title(line)
                        
                        if is_title:
                            # Sauvegarder la section précédente
                            if current_section and current_section.content:
                                sections.append(current_section)
                            
                            # Créer une nouvelle section
                            current_section = DocumentSection(
                                title=line,
                                content="",
                                section_type=SectionType.TITLE,
                                level=level,
                                page_number=page_num
                            )
                        else:
                            # Ajouter au contenu de la section courante
                            if current_section:
                                current_section.content += line + " "
                            else:
                                # Créer une section par défaut si pas de titre
                                current_section = DocumentSection(
                                    title=f"Page {page_num}",
                                    content=line + " ",
                                    page_number=page_num
                                )
            
            # Ajouter la dernière section
            if current_section and current_section.content:
                sections.append(current_section)
            
            logger.info(f"✓ {len(sections)} sections extraites du PDF")
            return sections
            
        except Exception as e:
            logger.error(f"Erreur lors de l'extraction PDF: {e}")
            raise
    
    def extract_from_docx(self, file_path: Path) -> List[DocumentSection]:
        """Extraire le contenu d'un document Word"""
        logger.info(f"Extraction DOCX: {file_path}")
        
        try:
            sections = []
            doc = DocxDocument(file_path)
            current_section = None
            
            for para in doc.paragraphs:
                text = para.text.strip()
                
                if not text:
                    continue
                
                # Détecter le style du paragraphe
                style_name = para.style.name.lower() if para.style else ""
                
                # Les titres dans Word ont souvent des styles "Heading"
                is_heading = 'heading' in style_name or 'titre' in style_name
                
                if is_heading or self._is_title(text)[0]:
                    # Sauvegarder la section précédente
                    if current_section and current_section.content:
                        sections.append(current_section)
                    
                    # Extraire le niveau du heading
                    level = 1
                    if 'heading' in style_name:
                        try:
                            level = int(re.search(r'\d+', style_name).group())
                        except:
                            level = 1
                    
                    # Créer une nouvelle section
                    current_section = DocumentSection(
                        title=text,
                        content="",
                        section_type=SectionType.TITLE,
                        level=level
                    )
                else:
                    # Ajouter au contenu de la section courante
                    if current_section:
                        current_section.content += text + " "
                    else:
                        # Créer une section par défaut
                        current_section = DocumentSection(
                            title="Introduction",
                            content=text + " "
                        )
            
            # Ajouter la dernière section
            if current_section and current_section.content:
                sections.append(current_section)
            
            logger.info(f"✓ {len(sections)} sections extraites du DOCX")
            return sections
            
        except Exception as e:
            logger.error(f"Erreur lors de l'extraction DOCX: {e}")
            raise
    
    def extract_from_excel(self, file_path: Path) -> List[DocumentSection]:
        """Extraire le contenu d'un fichier Excel"""
        logger.info(f"Extraction Excel: {file_path}")
        
        try:
            import pandas as pd
            sections = []
            
            # Lire toutes les feuilles
            excel_file = pd.ExcelFile(file_path)
            for sheet_name in excel_file.sheet_names:
                df = excel_file.parse(sheet_name)
                
                if df.empty:
                    continue
                
                # Convertir le DataFrame en texte structuré
                content = f"Feuille: {sheet_name}\n"
                
                # Colonnes
                content += "Colonnes: " + ", ".join([str(c) for c in df.columns]) + "\n\n"
                
                # Quelques lignes d'aperçu ou tout si c'est petit
                content += "Contenu:\n"
                # Pour les formulaires, on s'intéresse surtout aux en-têtes et à la structure
                # On va prendre les noms des colonnes et les premières lignes de données
                # pour que le LLM comprenne ce qui est collecté.
                content += df.head(20).to_string(index=False)
                
                sections.append(DocumentSection(
                    title=f"Feuille Excel: {sheet_name}",
                    content=content,
                    section_type=SectionType.TABLE
                ))
            
            logger.info(f"✓ {len(sections)} feuilles extraites de l'Excel")
            return sections
            
        except Exception as e:
            logger.error(f"Erreur lors de l'extraction Excel: {e}")
            raise

    def extract(self, file_path: Path) -> List[DocumentSection]:
        """Extraire le contenu d'un document (auto-détection du format)"""
        file_path = Path(file_path)
        
        if not file_path.exists():
            raise FileNotFoundError(f"Fichier non trouvé: {file_path}")
        
        extension = file_path.suffix.lower()
        
        if extension == '.pdf':
            return self.extract_from_pdf(file_path)
        elif extension in ['.docx', '.doc']:
            return self.extract_from_docx(file_path)
        elif extension in ['.xlsx', '.xls']:
            return self.extract_from_excel(file_path)
        else:
            raise ValueError(f"Format de fichier non supporté: {extension}")
    
    def _is_title(self, text: str) -> tuple[bool, int]:
        """
        Détecter si une ligne est un titre
        
        Returns:
            (is_title, level): Tuple indiquant si c'est un titre et son niveau
        """
        # Vérifier les patterns de titre
        for pattern in self.TITLE_PATTERNS:
            if re.match(pattern, text):
                # Déterminer le niveau basé sur la numérotation
                level_match = re.match(r'^(\d+\.)+', text)
                if level_match:
                    level = level_match.group().count('.')
                    return True, level
                return True, 1
        
        # Vérifier si tout en majuscules et court (probable titre)
        if text.isupper() and len(text) < 100 and len(text.split()) <= 10:
            return True, 1
        
        return False, 0
    
    def merge_small_sections(self, sections: List[DocumentSection], 
                           min_words: int = 20) -> List[DocumentSection]:
        """
        Fusionner les sections trop petites avec la section précédente
        
        Args:
            sections: Liste des sections
            min_words: Nombre minimum de mots pour une section
        
        Returns:
            Liste des sections fusionnées
        """
        if not sections:
            return []
        
        merged = [sections[0]]
        
        for section in sections[1:]:
            word_count = len(section.content.split())
            
            if word_count < min_words and merged:
                # Fusionner avec la section précédente
                merged[-1].content += " " + section.content
            else:
                merged.append(section)
        
        logger.info(f"Sections fusionnées: {len(sections)} → {len(merged)}")
        return merged


def extract_document(file_path: Path) -> List[DocumentSection]:
    """
    Fonction utilitaire pour extraire un document
    
    Args:
        file_path: Chemin vers le document
    
    Returns:
        Liste des sections extraites
    """
    extractor = DocumentExtractor()
    sections = extractor.extract(file_path)
    sections = extractor.merge_small_sections(sections)
    return sections
