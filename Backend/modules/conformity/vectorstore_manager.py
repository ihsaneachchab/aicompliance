"""
Gestionnaire ChromaDB pour le stockage et la recherche vectorielle
"""
import logging
from pathlib import Path
from typing import List, Dict, Optional

import chromadb
from chromadb.config import Settings as ChromaSettings
from sentence_transformers import SentenceTransformer
from langchain_core.documents import Document
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings

from core.config import settings

logger = logging.getLogger(__name__)


class VectorStoreManager:
    """Gestionnaire de la base de données vectorielle ChromaDB"""
    
    def __init__(self, persist_directory: Path = None, collection_name: str = None):
        self.persist_directory = persist_directory or settings.VECTORSTORE_DIR
        self.collection_name = collection_name or settings.COLLECTION_NAME
        
        # Créer le répertoire si nécessaire
        self.persist_directory.mkdir(parents=True, exist_ok=True)
        
        # Initialiser les embeddings
        logger.info(f"Chargement du modèle d'embeddings: {settings.EMBEDDING_MODEL}")
        self.embeddings = HuggingFaceEmbeddings(
            model_name=settings.EMBEDDING_MODEL,
            model_kwargs={'device': 'cpu'},
            encode_kwargs={'normalize_embeddings': True}
        )
        
        self.vectorstore: Optional[Chroma] = None
        self._initialized = False
    
    def initialize(self, documents: List[Document] = None) -> None:
        """
        Initialiser ou charger le vectorstore
        
        Args:
            documents: Documents à indexer (si création)
        """
        try:
            if documents:
                logger.info(f"Création du vectorstore avec {len(documents)} documents...")
                self.vectorstore = Chroma.from_documents(
                    documents=documents,
                    embedding=self.embeddings,
                    collection_name=self.collection_name,
                    persist_directory=str(self.persist_directory)
                )
                logger.info("✓ Vectorstore créé et persisté")
            else:
                logger.info("Chargement du vectorstore existant...")
                self.vectorstore = Chroma(
                    collection_name=self.collection_name,
                    embedding_function=self.embeddings,
                    persist_directory=str(self.persist_directory)
                )
                logger.info("✓ Vectorstore chargé")
            
            self._initialized = True
            
        except Exception as e:
            logger.error(f"Erreur lors de l'initialisation du vectorstore: {e}")
            raise
    
    def add_documents(self, documents: List[Document]) -> None:
        """
        Ajouter des documents au vectorstore
        
        Args:
            documents: Documents à ajouter
        """
        if not self._initialized:
            raise RuntimeError("Vectorstore non initialisé. Appelez initialize() d'abord.")
        
        logger.info(f"Ajout de {len(documents)} documents...")
        self.vectorstore.add_documents(documents)
        logger.info("✓ Documents ajoutés")
    
    def similarity_search(self, query: str, k: int = None, 
                         filter_dict: Dict = None) -> List[Document]:
        """
        Recherche par similarité
        
        Args:
            query: Requête de recherche
            k: Nombre de résultats à retourner
            filter_dict: Filtres sur les métadonnées
        
        Returns:
            Liste de documents pertinents
        """
        if not self._initialized:
            raise RuntimeError("Vectorstore non initialisé")
        
        k = k or settings.TOP_K_RESULTS
        
        try:
            results = self.vectorstore.similarity_search(
                query=query,
                k=k,
                filter=filter_dict
            )
            return results
        except Exception as e:
            logger.error(f"Erreur lors de la recherche: {e}")
            return []
    
    def similarity_search_with_score(self, query: str, k: int = None) -> List[tuple]:
        """
        Recherche par similarité avec scores
        
        Args:
            query: Requête de recherche
            k: Nombre de résultats
        
        Returns:
            Liste de tuples (Document, score)
        """
        if not self._initialized:
            raise RuntimeError("Vectorstore non initialisé")
        
        k = k or settings.TOP_K_RESULTS
        
        try:
            results = self.vectorstore.similarity_search_with_score(
                query=query,
                k=k
            )
            return results
        except Exception as e:
            logger.error(f"Erreur lors de la recherche: {e}")
            return []
    
    def as_retriever(self, search_kwargs: Dict = None):
        """
        Obtenir un retriever pour LangChain
        
        Args:
            search_kwargs: Arguments de recherche
        
        Returns:
            Retriever LangChain
        """
        if not self._initialized:
            raise RuntimeError("Vectorstore non initialisé")
        
        search_kwargs = search_kwargs or {'k': settings.TOP_K_RESULTS}
        return self.vectorstore.as_retriever(search_kwargs=search_kwargs)
    
    def get_collection_stats(self) -> Dict:
        """
        Obtenir les statistiques de la collection
        
        Returns:
            Dict avec les statistiques
        """
        if not self._initialized:
            return {
                'initialized': False,
                'document_count': 0
            }
        
        try:
            # Accéder à la collection ChromaDB sous-jacente
            collection = self.vectorstore._collection
            count = collection.count()
            
            return {
                'initialized': True,
                'document_count': count,
                'collection_name': self.collection_name,
                'persist_directory': str(self.persist_directory)
            }
        except Exception as e:
            logger.error(f"Erreur lors de la récupération des stats: {e}")
            return {
                'initialized': True,
                'document_count': 0,
                'error': str(e)
            }
    
    def delete_collection(self) -> None:
        """Supprimer la collection (pour réindexation)"""
        try:
            if self.vectorstore:
                self.vectorstore._client.delete_collection(self.collection_name)
                logger.info(f"✓ Collection '{self.collection_name}' supprimée")
                self._initialized = False
        except Exception as e:
            logger.error(f"Erreur lors de la suppression: {e}")
            raise
    
    def is_initialized(self) -> bool:
        """Vérifier si le vectorstore est initialisé"""
        return self._initialized
