"""
Système RAG spécialisé pour ISO 9001/9000
"""
from typing import List, Dict, Optional
from langchain_groq import ChatGroq
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from langchain_core.documents import Document
import logging

from core.config import settings

logger = logging.getLogger(__name__)


class ISO9001RAGSystem:
    """Système RAG spécialisé pour ISO 9001/9000"""

    def __init__(self, 
                 groq_api_key: str,
                 vectorstore_manager,
                 model_name: str = None,
                 temperature: float = None):

        self.vectorstore_manager = vectorstore_manager
        
        model_name = model_name or settings.GROQ_MODEL
        temperature = temperature or settings.GROQ_TEMPERATURE

        # Initialiser le LLM Groq
        logger.info(f"Initialisation du modèle Groq: {model_name}")
        self.llm = ChatGroq(
            groq_api_key=groq_api_key,
            model_name=model_name,
            temperature=temperature,
            max_tokens=settings.GROQ_MAX_TOKENS
        )

        # Template de prompt spécialisé ISO
        self.prompt_template = self._create_prompt_template()

        # Chaîne QA
        self.qa_chain = None

    def _create_prompt_template(self) -> PromptTemplate:
        """Créer un template de prompt spécialisé pour ISO 9001"""
        template = """Tu es un expert en systèmes de management de la qualité ISO 9001:2015 et ISO 9000:2015. 
Ton rôle est d'aider les utilisateurs à comprendre et appliquer ces normes.

CONTEXTE PERTINENT:
{context}

QUESTION: {question}

INSTRUCTIONS:
1. Réponds en français de manière claire et structurée
2. Base ta réponse UNIQUEMENT sur le contexte fourni des normes ISO 9001 et ISO 9000
3. Cite les sections pertinentes (ex: "Selon la section 4.1 de l'ISO 9001...")
4. Si la réponse n'est pas dans le contexte, dis-le clairement
5. Utilise une terminologie précise conforme aux normes ISO
6. Structure ta réponse avec des paragraphes et listes si nécessaire
7. Ajoute des exemples pratiques quand c'est pertinent

RÉPONSE:"""

        return PromptTemplate(
            template=template,
            input_variables=["context", "question"]
        )

    def initialize_qa_chain(self, search_kwargs: Optional[dict] = None):
        """Initialiser la chaîne de questions-réponses"""
        if search_kwargs is None:
            search_kwargs = {'k': settings.TOP_K_RESULTS}

        retriever = self.vectorstore_manager.as_retriever(
            search_kwargs=search_kwargs
        )

        self.qa_chain = RetrievalQA.from_chain_type(
            llm=self.llm,
            chain_type="stuff",
            retriever=retriever,
            return_source_documents=True,
            chain_type_kwargs={"prompt": self.prompt_template}
        )

        logger.info("✓ Chaîne QA initialisée")

    def ask(self, question: str, return_sources: bool = True) -> Dict:
        """Poser une question au système RAG"""
        if not self.qa_chain:
            self.initialize_qa_chain()

        try:
            logger.info(f"Question: {question}")

            # Obtenir la réponse
            result = self.qa_chain.invoke({"query": question})

            response = {
                'question': question,
                'answer': result['result'],
                'sources': []
            }

            # Ajouter les sources si demandé
            if return_sources and 'source_documents' in result:
                response['sources'] = self._format_sources(
                    result['source_documents']
                )

            logger.info("✓ Réponse générée")
            return response

        except Exception as e:
            logger.error(f"Erreur lors de la génération de la réponse: {e}")
            return {
                'question': question,
                'answer': f"Erreur: {str(e)}",
                'sources': []
            }

    def _format_sources(self, documents: List[Document]) -> List[Dict]:
        """Formatter les documents sources pour l'affichage"""
        sources = []
        for i, doc in enumerate(documents, 1):
            source_info = {
                'rank': i,
                'source': doc.metadata.get('source', 'Unknown'),
                'page': doc.metadata.get('page', 'N/A'),
                'section': doc.metadata.get('section_number', 'N/A'),
                'section_title': doc.metadata.get('section_title', 'N/A'),
                'content_preview': doc.page_content[:200] + "..." 
                                  if len(doc.page_content) > 200 
                                  else doc.page_content
            }
            sources.append(source_info)
        
        return sources

    def search_documents(self, query: str, k: int = None) -> List[Dict]:
        """
        Rechercher des documents pertinents sans générer de réponse
        
        Args:
            query: Requête de recherche
            k: Nombre de résultats
        
        Returns:
            Liste de documents avec scores
        """
        k = k or settings.TOP_K_RESULTS
        
        try:
            results = self.vectorstore_manager.similarity_search_with_score(
                query=query,
                k=k
            )
            
            formatted_results = []
            for doc, score in results:
                formatted_results.append({
                    'content': doc.page_content,
                    'score': float(score),
                    'metadata': doc.metadata
                })
            
            return formatted_results
            
        except Exception as e:
            logger.error(f"Erreur lors de la recherche: {e}")
            return []
