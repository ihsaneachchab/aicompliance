import asyncio
import sys
from pathlib import Path
from unittest.mock import MagicMock, AsyncMock

# Add project root to sys.path
sys.path.append(str(Path(__file__).parent.parent.parent))

from modules.conformity.conformity_analyzer import ConformityAnalyzer
from modules.conformity.document_extractor import DocumentSection

async def test_form_prompt():
    print("Testing Form Analysis Prompt Logic...")
    
    # Mock LLM and RAG
    mock_llm = MagicMock()
    mock_llm.ainvoke = AsyncMock()
    mock_llm.ainvoke.return_value.content = '{"status": "conforme", "conformity_score": 100, "conformity_elements": ["Test"], "non_conformities": [], "recommendations": []}'
    
    mock_rag = MagicMock()
    mock_rag.ask.return_value = {'answer': 'Exigences ISO test'}
    
    analyzer = ConformityAnalyzer(llm=mock_llm, rag_system=mock_rag)
    
    # Test case 1: Procedure
    sections = [DocumentSection(title="Procédure Test", content="Le manager doit approuver les achats.")]
    await analyzer.analyze_document(sections, "8.4", document_type="procedure")
    
    # Capture le prompt envoyé au LLM
    call_args = mock_llm.ainvoke.call_args[0][0]
    print("\n--- Prompt for Procedure ---")
    print(call_args[:500] + "...")
    assert "C'est une PROCÉDURE" in call_args
    
    # Test case 2: Formulaire
    mock_llm.ainvoke.reset_mock()
    sections = [DocumentSection(title="Formulaire Test", content="Champ: Nom du fournisseur, Date, Signature.")]
    await analyzer.analyze_document(sections, "8.4", document_type="formulaire")
    
    call_args = mock_llm.ainvoke.call_args[0][0]
    print("\n--- Prompt for Formulaire ---")
    print(call_args[:500] + "...")
    assert "C'est un FORMULAIRE" in call_args
    assert "Vérifie si les champs, colonnes et espaces de saisie" in call_args

    print("\n[SUCCESS] Verification successful: The analyzer uses correctly adapted prompts for different document types.")

if __name__ == "__main__":
    asyncio.run(test_form_prompt())
