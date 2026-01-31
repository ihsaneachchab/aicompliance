"""
Module de traitement et chunking des documents ISO pour le vector store
"""
import logging
from pathlib import Path
from typing import List, Dict, Optional
from dataclasses import dataclass

import pdfplumber
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document

from core.config import settings

logger = logging.getLogger(__name__)


@dataclass
class ProcessedChunk:
    """Chunk de document traité avec métadonnées"""
    content: str
    metadata: Dict
    chunk_id: str


class DocumentProcessor:
    """Processeur de documents ISO avec chunking intelligent"""
    
    def __init__(self, chunk_size: int = None, chunk_overlap: int = None):
        self.chunk_size = chunk_size or settings.CHUNK_SIZE
        self.chunk_overlap = chunk_overlap or settings.CHUNK_OVERLAP
        
        # Text splitter pour le chunking
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=self.chunk_size,
            chunk_overlap=self.chunk_overlap,
            length_function=len,
            separators=["\n\n", "\n", ". ", " ", ""]
        )
    
    def process_pdf(self, pdf_path: Path, source_name: str) -> List[Document]:
        """
        Traiter un PDF ISO et le découper en chunks
        
        Args:
            pdf_path: Chemin vers le PDF
            source_name: Nom de la source (ex: "ISO_9001_2015")
        
        Returns:
            Liste de Documents LangChain
        """
        logger.info(f"Traitement du PDF: {pdf_path}")
        
        documents = []
        
        try:
            with pdfplumber.open(pdf_path) as pdf:
                for page_num, page in enumerate(pdf.pages, 1):
                    text = page.extract_text()
                    
                    if not text or len(text.strip()) < 50:
                        continue
                    
                    # Nettoyer le texte
                    text = self._clean_text(text)
                    
                    # Détecter les sections (numéros de clause ISO)
                    section_info = self._extract_section_info(text)
                    
                    # Créer les chunks pour cette page
                    chunks = self.text_splitter.split_text(text)
                    
                    for i, chunk in enumerate(chunks):
                        metadata = {
                            'source': source_name,
                            'page': page_num,
                            'chunk_index': i,
                            'total_chunks': len(chunks),
                            **section_info
                        }
                        
                        doc = Document(
                            page_content=chunk,
                            metadata=metadata
                        )
                        documents.append(doc)
            
            logger.info(f"✓ {len(documents)} chunks créés depuis {pdf_path.name}")
            return documents
            
        except Exception as e:
            logger.error(f"Erreur lors du traitement du PDF: {e}")
            raise
    
    def _clean_text(self, text: str) -> str:
        """Nettoyer le texte extrait"""
        # Supprimer les sauts de ligne multiples
        text = '\n'.join(line.strip() for line in text.split('\n') if line.strip())
        
        # Supprimer les caractères spéciaux problématiques
        text = text.replace('\x00', '')
        
        return text
    
    def _extract_section_info(self, text: str) -> Dict:
        """
        Extraire les informations de section (numéro de clause, titre)
        
        Returns:
            Dict avec section_number et section_title
        """
        import re
        
        # Pattern pour détecter les clauses ISO (ex: "4.1", "7.5.3")
        clause_pattern = r'(\d+(?:\.\d+)*)\s+([A-ZÀÂÄÉÈÊËÏÎÔÙÛÜ][^\n]{10,100})'
        
        match = re.search(clause_pattern, text[:500])  # Chercher dans les 500 premiers caractères
        
        if match:
            return {
                'section_number': match.group(1),
                'section_title': match.group(2).strip()
            }
        
        return {
            'section_number': 'N/A',
            'section_title': 'N/A'
        }
    
    def process_multiple_pdfs(self, pdf_paths: List[Path]) -> List[Document]:
        """
        Traiter plusieurs PDFs
        
        Args:
            pdf_paths: Liste des chemins vers les PDFs
        
        Returns:
            Liste combinée de Documents
        """
        all_documents = []
        
        for pdf_path in pdf_paths:
            source_name = pdf_path.stem  # Nom du fichier sans extension
            documents = self.process_pdf(pdf_path, source_name)
            all_documents.extend(documents)
        
        logger.info(f"✓ Total: {len(all_documents)} chunks depuis {len(pdf_paths)} PDFs")
        return all_documents
