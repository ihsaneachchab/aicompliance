# Module d'Analyse de Conformité ISO 9001/9000

Ce module fournit un système complet d'analyse de conformité pour les documents d'entreprise basé sur les normes ISO 9001:2015 et ISO 9000:2015.

## 🎯 Fonctionnalités

- **Extraction automatique**: Support PDF et DOCX avec détection intelligente des sections
- **Analyse RAG**: Utilise un système de Retrieval-Augmented Generation avec ChromaDB et Groq LLM
- **Analyse de conformité**: Vérifie automatiquement la conformité avec les clauses ISO
- **Findings détaillés**: Génère des rapports avec points conformes/non-conformes et recommandations
- **Historique**: Sauvegarde automatique dans MongoDB

## 📁 Structure

```
conformity/
├── __init__.py                 # Exports du module
├── schemas.py                  # Schémas Pydantic
├── document_extractor.py       # Extraction PDF/DOCX
├── document_processor.py       # Chunking des documents ISO
├── vectorstore_manager.py      # Gestionnaire ChromaDB
├── rag_system.py              # Système RAG
├── conformity_analyzer.py     # Analyseur de conformité
├── router.py                  # Endpoints FastAPI
└── iso/                       # Documents ISO (PDFs)
    ├── ISO_9001_V_2015_Fr.pdf
    └── ISO 9000v2015.pdf
```

## 🚀 Démarrage Rapide

### 1. Indexer les documents ISO (obligatoire)

```bash
curl -X POST http://localhost:8000/api/conformity/index-iso
```

Cette commande:
- Lit les PDFs ISO dans le dossier `iso/`
- Crée des chunks intelligents
- Génère des embeddings
- Stocke dans ChromaDB

### 2. Analyser un document

```python
import requests

# Préparer le fichier
files = {'file': open('mon_document.pdf', 'rb')}
data = {
    'document_type': 'procedure',
    'process_iso': '7.5'  # Clause ISO concernée
}

# Envoyer la requête
response = requests.post(
    'http://localhost:8000/api/conformity/analyze',
    files=files,
    data=data
)

result = response.json()
print(f"Score: {result['score']}/100")
print(f"Status: {result['status']}")
```

## 📊 Endpoints API

### `POST /api/conformity/analyze`
Analyser un document uploadé

**Paramètres:**
- `file`: Fichier PDF ou DOCX
- `document_type`: Type de document (procedure, formulaire, manuel, etc.)
- `process_iso`: Clause ISO concernée (ex: "4.4", "7.5")

**Réponse:**
```json
{
  "score": 85,
  "status": "Conforme",
  "conform_items": 8,
  "warning_items": 2,
  "non_conform_items": 1,
  "findings": [
    {
      "title": "Conforme - Informations documentées",
      "description": "Le document contient les informations requises...",
      "severity": "success",
      "clause": "§ 7.5"
    }
  ]
}
```

### `POST /api/conformity/index-iso`
Indexer les documents ISO dans ChromaDB

### `GET /api/conformity/history?limit=10`
Récupérer l'historique des analyses

### `GET /api/conformity/stats`
Obtenir les statistiques d'analyse

### `GET /api/conformity/status`
Vérifier le statut du service

## 🔧 Configuration

Les paramètres sont définis dans `core/config.py`:

```python
# Chemins
ISO_DOCS_DIR = "modules/conformity/iso"
UPLOADS_DIR = "data/uploads"
VECTORSTORE_DIR = "vectorstore/chroma_db"

# Groq LLM
GROQ_MODEL = "llama-3.3-70b-versatile"
GROQ_TEMPERATURE = 0.1

# Embeddings
EMBEDDING_MODEL = "sentence-transformers/paraphrase-multilingual-mpnet-base-v2"

# Chunking
CHUNK_SIZE = 800
CHUNK_OVERLAP = 200

# Retrieval
TOP_K_RESULTS = 5
```

## 🧪 Tests

```bash
# Tester l'extraction de documents
python -c "from modules.conformity import extract_document; print(extract_document('test.pdf'))"

# Tester le statut du service
curl http://localhost:8000/api/conformity/status
```

## 📝 Dépendances

- `langchain` - Framework RAG
- `langchain-groq` - Intégration Groq LLM
- `chromadb` - Base de données vectorielle
- `sentence-transformers` - Embeddings multilingues
- `pdfplumber`, `pypdf2` - Extraction PDF
- `python-docx` - Extraction DOCX

## 🐛 Dépannage

**Erreur: "Vectorstore non initialisé"**
→ Exécutez `/api/conformity/index-iso` d'abord

**Erreur: "GROQ_API_KEY non configurée"**
→ Vérifiez que la clé est dans le fichier `.env`

**L'analyse est lente**
→ Normal au premier appel (chargement du modèle d'embeddings)

## 📚 Ressources

- [Documentation LangChain](https://python.langchain.com/)
- [ChromaDB Docs](https://docs.trychroma.com/)
- [Groq API](https://console.groq.com/)
