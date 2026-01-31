"""
Script de test rapide pour le module d'analyse ISO 9001
"""
import sys
from pathlib import Path

# Ajouter le répertoire parent au path
sys.path.insert(0, str(Path(__file__).parent.parent.parent))

from core.config import settings

def test_configuration():
    """Tester la configuration"""
    print("=" * 60)
    print("TEST 1: Configuration")
    print("=" * 60)
    
    print(f"✓ GROQ_API_KEY configurée: {bool(settings.GROQ_API_KEY)}")
    print(f"✓ ISO_DOCS_DIR: {settings.ISO_DOCS_DIR}")
    print(f"✓ VECTORSTORE_DIR: {settings.VECTORSTORE_DIR}")
    print(f"✓ GROQ_MODEL: {settings.GROQ_MODEL}")
    print()

def test_iso_documents():
    """Vérifier que les documents ISO existent"""
    print("=" * 60)
    print("TEST 2: Documents ISO")
    print("=" * 60)
    
    iso_dir = settings.ISO_DOCS_DIR
    pdf_files = list(iso_dir.glob("*.pdf"))
    
    print(f"✓ Répertoire ISO: {iso_dir}")
    print(f"✓ Nombre de PDFs trouvés: {len(pdf_files)}")
    
    for pdf in pdf_files:
        size_mb = pdf.stat().st_size / (1024 * 1024)
        print(f"  - {pdf.name} ({size_mb:.1f} MB)")
    
    if len(pdf_files) == 0:
        print("⚠️  ATTENTION: Aucun PDF ISO trouvé!")
    print()

def test_imports():
    """Tester les imports des modules"""
    print("=" * 60)
    print("TEST 3: Imports des modules")
    print("=" * 60)
    
    try:
        from modules.conformity import (
            DocumentExtractor,
            DocumentProcessor,
            VectorStoreManager,
            ISO9001RAGSystem,
            ConformityAnalyzer
        )
        print("✓ Tous les modules importés avec succès")
    except ImportError as e:
        print(f"❌ Erreur d'import: {e}")
    print()

def test_dependencies():
    """Tester les dépendances critiques"""
    print("=" * 60)
    print("TEST 4: Dépendances")
    print("=" * 60)
    
    dependencies = [
        "langchain",
        "langchain_groq",
        "chromadb",
        "sentence_transformers",
        "pdfplumber",
        "docx"
    ]
    
    for dep in dependencies:
        try:
            __import__(dep)
            print(f"✓ {dep}")
        except ImportError:
            print(f"❌ {dep} - NON INSTALLÉ")
    print()

def test_document_extraction():
    """Tester l'extraction de documents"""
    print("=" * 60)
    print("TEST 5: Extraction de documents")
    print("=" * 60)
    
    try:
        from modules.conformity import DocumentExtractor
        
        extractor = DocumentExtractor()
        
        # Tester avec un PDF ISO
        iso_dir = settings.ISO_DOCS_DIR
        pdf_files = list(iso_dir.glob("*.pdf"))
        
        if pdf_files:
            test_pdf = pdf_files[0]
            print(f"Test d'extraction sur: {test_pdf.name}")
            
            sections = extractor.extract_from_pdf(test_pdf)
            print(f"✓ {len(sections)} sections extraites")
            
            if sections:
                print(f"  Première section: {sections[0].title[:50]}...")
        else:
            print("⚠️  Aucun PDF disponible pour le test")
            
    except Exception as e:
        print(f"❌ Erreur: {e}")
    print()

def main():
    """Exécuter tous les tests"""
    print("\n" + "=" * 60)
    print("TESTS DU MODULE D'ANALYSE ISO 9001")
    print("=" * 60 + "\n")
    
    test_configuration()
    test_iso_documents()
    test_imports()
    test_dependencies()
    test_document_extraction()
    
    print("=" * 60)
    print("TESTS TERMINÉS")
    print("=" * 60)
    print("\nProchaines étapes:")
    print("1. Démarrer le backend: uvicorn main:app --reload")
    print("2. Indexer les ISO: curl -X POST http://localhost:8000/api/conformity/index-iso")
    print("3. Tester l'analyse via le frontend: http://localhost:5173/analyse")
    print()

if __name__ == "__main__":
    main()
