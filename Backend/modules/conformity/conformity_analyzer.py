"""
Module d'analyse de conformité ISO 9001/9000
Contient les agents d'analyse : Mappeur, Vérificateur, Scoreur
"""
import json
import logging
from typing import List, Dict, Optional
from dataclasses import dataclass, field, asdict
from enum import Enum

from langchain.prompts import PromptTemplate
from langchain_groq import ChatGroq

from .document_extractor import DocumentSection
from .schemas import Finding, FindingSeverity, ConformityStatus

logger = logging.getLogger(__name__)


class ISOClauseMapping:
    """Représente le mapping d'une section vers une clause ISO"""
    def __init__(self, clause_number: str, clause_title: str, relevance_score: float,
                 justification: str, iso_requirements: str, source_document: str):
        self.clause_number = clause_number
        self.clause_title = clause_title
        self.relevance_score = relevance_score
        self.justification = justification
        self.iso_requirements = iso_requirements
        self.source_document = source_document


class ConformityAnalyzer:
    """Analyseur de conformité complet avec agents"""
    
    # Mapping des clauses ISO 9001 principales
    ISO_9001_CLAUSE_MAP = {
        "4.4": {"title": "Système de management de la qualité et ses processus", "keywords": ["smq", "processus", "système", "management"]},
        "5.2": {"title": "Politique qualité", "keywords": ["politique", "qualité", "objectifs", "engagement"]},
        "7.5": {"title": "Informations documentées", "keywords": ["documents", "enregistrements", "procédures", "instructions", "formulaires"]},
        "8.4": {"title": "Maîtrise des processus externalisés", "keywords": ["fournisseurs", "sous-traitants", "achats", "prestataires", "externes"]},
        "8.5": {"title": "Production et prestation de service", "keywords": ["production", "fabrication", "assemblage", "prestation", "réalisation"]},
        "9.2": {"title": "Audit interne", "keywords": ["audit", "interne", "vérification", "évaluation", "conformité"]},
        "10.2": {"title": "Non-conformité et action corrective", "keywords": ["non-conformité", "action corrective", "correction", "nc", "traitement"]},
    }
    
    def __init__(self, llm: ChatGroq, rag_system):
        self.llm = llm
        self.rag_system = rag_system
    
    async def analyze_document(self, sections: List[DocumentSection], process_iso: str, document_type: str = "procedure") -> Dict:
        """
        Analyser un document complet en regroupant les sections pour optimiser les appels LLM.
        
        Args:
            sections: Sections du document
            process_iso: Clause ISO ciblée
        
        Returns:
            Résultat d'analyse complet
        """
        logger.info(f"Analyse de {len(sections)} sections pour la clause {process_iso}")
        
        # 1. Récupérer les exigences ISO UNE SEULE FOIS pour toute l'analyse
        iso_requirements = await self._fetch_iso_requirements(process_iso)
        clause_title = self.ISO_9001_CLAUSE_MAP.get(process_iso, {}).get("title", f"Clause {process_iso}")
        
        all_findings = []
        conform_count = 0
        warning_count = 0
        non_conform_count = 0
        
        # 2. Groupe les sections en "chunks" plus grands pour minimiser les appels API
        # On vise environ 3000-4000 caractères par appel LLM
        grouped_chunks = []
        current_chunk_content = ""
        current_chunk_titles = []
        
        for section in sections:
            # Si le chunk actuel + la nouvelle section dépasse la limite (approx 4000 chars)
            if len(current_chunk_content) + len(section.content) > 4000 and current_chunk_content:
                grouped_chunks.append({
                    "title": " & ".join(current_chunk_titles),
                    "content": current_chunk_content
                })
                current_chunk_content = ""
                current_chunk_titles = []
            
            current_chunk_content += f"\n\nSection: {section.title}\n{section.content}"
            current_chunk_titles.append(section.title)
            
        # Ajouter le dernier chunk
        if current_chunk_content:
            grouped_chunks.append({
                "title": " & ".join(current_chunk_titles),
                "content": current_chunk_content
            })
            
        logger.info(f"Sections regroupées en {len(grouped_chunks)} chunks d'analyse")
        
        # 3. Analyser chaque chunk
        for chunk in grouped_chunks:
            # Créer un mapping factice pour le chunk
            mapping = ISOClauseMapping(
                clause_number=process_iso,
                clause_title=clause_title,
                relevance_score=0.9,
                justification="Regroupement optimisé",
                iso_requirements=iso_requirements,
                source_document="ISO 9001:2015"
            )
            
            # Créer un objet DocumentSection temporaire pour le chunk
            chunk_section = DocumentSection(
                title=chunk['title'],
                content=chunk['content']
            )
            
            analysis = await self._verify_conformity(chunk_section, mapping, document_type)
            
            # Convertir en findings
            chunk_findings = self._convert_to_findings(analysis, mapping)
            all_findings.extend(chunk_findings)
            
            # Compter les statuts
            for finding in chunk_findings:
                if finding.severity == FindingSeverity.SUCCESS:
                    conform_count += 1
                elif finding.severity == FindingSeverity.WARNING:
                    warning_count += 1
                else:
                    non_conform_count += 1
        
        # Calculer le score global
        total_items = conform_count + warning_count + non_conform_count
        if total_items > 0:
            total_score = int((conform_count * 100 + warning_count * 50) / total_items)
        else:
            total_score = 0
        
        # Déterminer le statut
        if total_score >= 80:
            status = "Conforme"
        elif total_score >= 50:
            status = "Partiellement conforme"
        else:
            status = "Non conforme"
        
        return {
            "score": total_score,
            "status": status,
            "conform_items": conform_count,
            "warning_items": warning_count,
            "non_conform_items": non_conform_count,
            "findings": all_findings[:20]  # Limiter à 20 findings
        }
    
    def _map_section_to_clause(self, section: DocumentSection, target_clause: str) -> List[ISOClauseMapping]:
        """Mapper une section à une clause ISO"""
        
        # Si une clause cible est spécifiée, l'utiliser directement
        if target_clause in self.ISO_9001_CLAUSE_MAP:
            clause_info = self.ISO_9001_CLAUSE_MAP[target_clause]
            
            # Récupérer les exigences via RAG
            iso_requirements = self._fetch_iso_requirements(target_clause)
            
            mapping = ISOClauseMapping(
                clause_number=target_clause,
                clause_title=clause_info["title"],
                relevance_score=0.9,
                justification=f"Clause ciblée pour l'analyse",
                iso_requirements=iso_requirements,
                source_document="ISO 9001:2015"
            )
            
            return [mapping]
        
        return []
    
    async def _fetch_iso_requirements(self, clause_number: str) -> str:
        """Récupérer les exigences ISO via RAG"""
        try:
            query = f"Quelles sont les exigences de la clause {clause_number} de la norme ISO 9001:2015?"
            result = self.rag_system.ask(query, return_sources=True)
            return result['answer']
        except Exception as e:
            logger.warning(f"Impossible de récupérer les exigences pour {clause_number}: {e}")
            return f"Clause {clause_number}: Exigences non disponibles"
    
    async def _verify_conformity(self, section: DocumentSection, mapping: ISOClauseMapping, document_type: str = "procedure") -> Dict:
        """Vérifier la conformité d'une section"""
        
        # Adapter le prompt selon le type de document
        type_instructions = ""
        if document_type == "formulaire":
            type_instructions = """
C'est un FORMULAIRE/MODÈLE VIERGE.
TÂCHE SPÉCIFIQUE : 
1. Identifie les champs de saisie (lignes, cases, soulignés ____).
2. Vérifie si ces champs permettent de collecter TOUTES les preuves exigées par la clause ISO.
3. Si le document semble vide ou contient seulement des en-têtes: Signale-le comme "Non conforme" car il manque les champs de saisie.
4. SOIS INDULGENT sur la mise en forme, mais STRICT sur la présence des champs de données clés (Date, Signature, Données Techniques, etc.).
"""
        elif document_type == "enregistrement":
            type_instructions = """
C'est un ENREGISTREMENT (formulaire rempli). 
TÂCHE SPÉCIFIQUE : Vérifie que les données saisies constituent une preuve réelle de l'application du processus ISO.
"""
        else:
            type_instructions = """
C'est une PROCÉDURE ou un MANUEL. 
TÂCHE SPÉCIFIQUE : Vérifie que les instructions et responsabilités décrites répondent aux exigences de la clause ISO.
"""

        prompt_template = """Tu es un auditeur ISO 9001 expert. Analyse la conformité du document.

DOCUMENT À ANALYSER:
Type: {document_type}
Titre: {section_title}
Contenu: {section_content}

CLAUSE ISO CONCERNÉE:
Clause {clause_number}: {clause_title}

EXIGENCES ISO:
{iso_requirements}

INSTRUCTIONS D'ANALYSE:
{type_instructions}
Analyse si le contenu ci-dessus répond aux exigences de cette clause ISO. 
Sois précis et cite des éléments concrets.

RÉPONDS EN FORMAT JSON (sans markdown):
{{
  "status": "conforme|partiellement_conforme|non_conforme",
  "conformity_score": 0-100,
  "conformity_elements": ["Élément conforme 1", "Élément conforme 2"],
  "non_conformities": ["Non-conformité 1", "Non-conformité 2"],
  "recommendations": ["Recommandation 1", "Recommandation 2"]
}}"""
        
        try:
            # On accepte plus de contenu maintenant qu'on groupe
            section_content = section.content[:4000] if len(section.content) > 4000 else section.content
            iso_requirements = mapping.iso_requirements[:2000] if len(mapping.iso_requirements) > 2000 else mapping.iso_requirements
            
            prompt = prompt_template.format(
                document_type=document_type,
                type_instructions=type_instructions,
                section_title=section.title,
                section_content=section_content,
                clause_number=mapping.clause_number,
                clause_title=mapping.clause_title,
                iso_requirements=iso_requirements
            )
            
            response = await self.llm.ainvoke(prompt)
            content = response.content.strip()
            
            # Nettoyer le JSON
            if "```json" in content:
                content = content.split("```json")[1].split("```")[0].strip()
            elif "```" in content:
                content = content.split("```")[1].split("```")[0].strip()
            
            result = json.loads(content)
            result['clause_number'] = mapping.clause_number
            result['clause_title'] = mapping.clause_title
            
            return result
            
        except Exception as e:
            logger.error(f"Erreur lors de la vérification: {e}")
            return {
                "status": "non_conforme",
                "conformity_score": 0,
                "conformity_elements": [],
                "non_conformities": [f"Erreur d'analyse: {str(e)}"],
                "recommendations": [],
                "clause_number": mapping.clause_number,
                "clause_title": mapping.clause_title
            }
    
    def _convert_to_findings(self, analysis: Dict, mapping: ISOClauseMapping) -> List[Finding]:
        """Convertir une analyse en findings"""
        findings = []
        
        # Ajouter les éléments conformes
        for element in analysis.get('conformity_elements', []):
            findings.append(Finding(
                title=f"Conforme - {mapping.clause_title}",
                description=element,
                severity=FindingSeverity.SUCCESS,
                clause=f"§ {mapping.clause_number}",
                recommendations=[]
            ))
        
        # Ajouter les non-conformités
        for nc in analysis.get('non_conformities', []):
            findings.append(Finding(
                title=f"Non-conforme - {mapping.clause_title}",
                description=nc,
                severity=FindingSeverity.DANGER,
                clause=f"§ {mapping.clause_number}",
                recommendations=analysis.get('recommendations', [])
            ))
        
        # Si score moyen, ajouter un warning
        score = analysis.get('conformity_score', 0)
        if 50 <= score < 80 and not findings:
            findings.append(Finding(
                title=f"Attention - {mapping.clause_title}",
                description=f"Conformité partielle détectée (score: {score}%)",
                severity=FindingSeverity.WARNING,
                clause=f"§ {mapping.clause_number}",
                recommendations=analysis.get('recommendations', [])
            ))
        
        return findings
