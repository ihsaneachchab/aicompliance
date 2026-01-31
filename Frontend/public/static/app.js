// État global de l'application
const AppState = {
  currentUser: null,
  currentPage: 'dashboard',
  chatHistory: [],
  analysisResults: null,
  generatedDocuments: []
};

// Utilitaires
const Utils = {
  // Sauvegarder dans localStorage
  saveToStorage: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Erreur de sauvegarde:', e);
    }
  },

  // Charger depuis localStorage
  loadFromStorage: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error('Erreur de chargement:', e);
      return null;
    }
  },

  // Formater une date
  formatDate: (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  // Générer un ID unique
  generateId: () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },

  // Afficher une notification
  showNotification: (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${type === 'success' ? 'bg-green-500' :
      type === 'error' ? 'bg-red-500' :
        type === 'warning' ? 'bg-yellow-500' :
          'bg-blue-500'
      } text-white`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
};

// Configuration
const API_URL = 'http://localhost:8000';

// Gestion de l'authentification
const Auth = {
  login: async (email, password) => {
    try {
      const formData = new FormData();
      formData.append('username', email); // FastAPI OAuth2 expects 'username', using email
      formData.append('password', password);

      const response = await fetch(`${API_URL}/auth/token`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      const token = data.access_token;

      // Store token
      localStorage.setItem('access_token', token);

      // Get User Profile
      const userResponse = await fetch(`${API_URL}/auth/users/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!userResponse.ok) {
        throw new Error('Failed to fetch user profile');
      }

      const user = await userResponse.json();

      // Adapt user object to frontend expectations if necessary
      user.role = 'Responsable Qualité'; // Default role for now

      AppState.currentUser = user;
      Utils.saveToStorage('currentUser', user);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  },

  register: async (userData) => {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: userData.email,
          username: userData.email, // Use email as username
          password: userData.password,
          full_name: userData.fullName,
          company: userData.company,
          phone: userData.phone,
          referral_source: userData.referral,
          selected_service: userData.selectedService,
          terms_accepted: userData.terms === 'on',
          newsletter_accepted: userData.newsletter === 'on'
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Registration failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  logout: () => {
    AppState.currentUser = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('access_token');
    window.location.href = '/login';
  },

  getCurrentUser: () => {
    if (!AppState.currentUser) {
      AppState.currentUser = Utils.loadFromStorage('currentUser');
    }
    return AppState.currentUser;
  },

  isAuthenticated: () => {
    return !!Auth.getCurrentUser();
  },

  demoLogin: async () => {
    try {
      // Appeler l'endpoint de démo
      const response = await fetch(`${API_URL}/auth/demo/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Demo login failed');
      }

      const data = await response.json();
      const token = data.access_token;
      const user = data.user || {
        email: "demo@example.com",
        username: "demo@example.com",
        full_name: "Utilisateur Démo",
        role: "Responsable Qualité",
        company: "Entreprise Démo",
        service: "iso9001"
      };

      // Store token and user
      localStorage.setItem('access_token', token);
      AppState.currentUser = user;
      Utils.saveToStorage('currentUser', user);

      return true;
    } catch (error) {
      console.error('Demo login error:', error);
      // En cas d'erreur, créer un utilisateur de démo local
      const demoUser = {
        email: "demo@example.com",
        username: "demo@example.com",
        name: "Utilisateur Démo",
        full_name: "Utilisateur Démo",
        role: "Responsable Qualité",
        company: "Entreprise Démo",
        service: "iso9001"
      };

      AppState.currentUser = demoUser;
      Utils.saveToStorage('currentUser', demoUser);
      localStorage.setItem('access_token', 'demo_token');

      return true;
    }
  }
};

// Gestion du Chat Bot avec API RAG
const ChatBot = {
  conversations: [],
  currentConversation: null,
  currentConvoId: null,
  settings: {
    model: 'llama-3.3-70b-versatile',
    temperature: 0.2
  },

  init: async () => {
    // Charger les conversations depuis le backend
    try {
      await ChatBot.loadConversations();
    } catch (error) {
      console.error('Error loading conversations:', error);
      // Fallback sur localStorage si l'API n'est pas disponible
      ChatBot.conversations = Utils.loadFromStorage('chatConversations') || [];
    }
  },

  getAuthHeaders: () => {
    const token = localStorage.getItem('access_token');
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    };
  },

  createConversation: async () => {
    // Correction : utiliser l'endpoint /api/chatbot/chat pour créer une conversation et envoyer le premier message
    try {
      // Créer une conversation en envoyant un message vide (ou initial)
      const response = await fetch(`${API_URL}/api/chatbot/chat`, {
        method: 'POST',
        headers: ChatBot.getAuthHeaders(),
        body: JSON.stringify({ message: '' })
      });

      if (!response.ok) {
        throw new Error('Failed to create conversation');
      }

      const data = await response.json();
      // Pas de convo_id dans la réponse, donc générer un id local
      const conversation = {
        id: Utils.generateId(),
        convo_id: 'local_' + Utils.generateId(),
        title: 'Nouvelle conversation',
        messages: [],
        createdAt: new Date().toISOString()
      };
      ChatBot.conversations.unshift(conversation);
      ChatBot.currentConversation = conversation;
      ChatBot.currentConvoId = conversation.convo_id;
      Utils.saveToStorage('chatConversations', ChatBot.conversations);
      return conversation;
    } catch (error) {
      console.log('Creating local conversation (API unavailable):', error.message);
      // Fallback: créer une conversation locale
      const conversation = {
        id: Utils.generateId(),
        convo_id: 'local_' + Utils.generateId(),
        title: 'Nouvelle conversation',
        messages: [],
        createdAt: new Date().toISOString()
      };
      ChatBot.conversations.unshift(conversation);
      ChatBot.currentConversation = conversation;
      ChatBot.currentConvoId = conversation.convo_id;
      Utils.saveToStorage('chatConversations', ChatBot.conversations);
      return conversation;
    }
  },

  loadConversations: async () => {
    // Correction : désactiver le chargement distant, utiliser uniquement le localStorage
    ChatBot.conversations = Utils.loadFromStorage('chatConversations') || [];
  },

  sendMessage: async (message, model = null, temperature = null) => {
    // Correction : envoyer le message à /api/chatbot/chat
    if (!ChatBot.currentConversation || !ChatBot.currentConvoId) {
      await ChatBot.createConversation();
    }
    try {
      const response = await fetch(`${API_URL}/api/chatbot/chat`, {
        method: 'POST',
        headers: ChatBot.getAuthHeaders(),
        body: JSON.stringify({
          message: message,
          settings: {
            model: model || ChatBot.settings.model,
            temperature: temperature !== null ? temperature : ChatBot.settings.temperature
          }
        })
      });
      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi du message');
      }
      const data = await response.json();
      // Ajouter la réponse à la conversation courante
      ChatBot.currentConversation.messages.push({
        role: 'user',
        content: message,
        timestamp: new Date().toISOString()
      });
      ChatBot.currentConversation.messages.push({
        role: 'assistant',
        content: data.response,
        timestamp: new Date().toISOString()
      });
      Utils.saveToStorage('chatConversations', ChatBot.conversations);
      return data.response;
    } catch (error) {
      throw new Error('L\'API du chatbot externe n\'est pas accessible. Veuillez démarrer l\'API du chatbot pour utiliser cette fonctionnalité.');
    }
  },

  loadConversationHistory: async (convoId) => {
    try {
      const response = await fetch(
        `${API_URL}/api/chatbot/conversations/${convoId}/history`,
        { headers: ChatBot.getAuthHeaders() }
      );

      if (!response.ok) {
        throw new Error('Failed to load conversation history');
      }

      const data = await response.json();
      return data.history || [];
    } catch (error) {
      console.error('Error loading conversation history:', error);
      return [];
    }
  },

  setConversation: (conversation) => {
    ChatBot.currentConversation = conversation;
    ChatBot.currentConvoId = conversation.convo_id || conversation.id;
  },

  updateSettings: (model, temperature) => {
    ChatBot.settings.model = model;
    ChatBot.settings.temperature = temperature;
  }
};

// Gestion de l'analyse de conformité
const ComplianceAnalysis = {
  analyzeDocument: async (file, metadata) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('document_type', metadata.documentType);
      formData.append('process_iso', metadata.processISO);
      if (metadata.docReference) {
        formData.append('doc_reference', metadata.docReference);
      }

      const token = localStorage.getItem('access_token');
      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_URL}/api/conformity/analyze`, {
        method: 'POST',
        headers: headers,
        body: formData
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Erreur lors de l\'analyse');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur d\'analyse:', error);
      throw error;
    }
  },

  downloadReport: (analysis) => {
    // Simulation de téléchargement (pourrait être implémenté avec l'API)
    Utils.showNotification('Rapport téléchargé avec succès', 'success');
  }
};

// Gestion de la génération de documents
const DocumentGeneration = {
  generateDocument: async (params) => {
    // Simulation de génération (en production, appeler l'API)
    await new Promise(resolve => setTimeout(resolve, 1500));

    const doc = {
      id: Utils.generateId(),
      type: params.documentType,
      process: params.process,
      title: `${params.documentType} - ${params.process}`,
      content: DocumentGeneration.getTemplateContent(params),
      createdAt: new Date().toISOString(),
      status: 'draft'
    };

    AppState.generatedDocuments.push(doc);
    return doc;
  },

  getTemplateContent: (params) => {
    // Template de base pour une procédure
    if (params.documentType === 'Procédure') {
      return `
# PROCÉDURE
## ${params.process}

### 1. OBJET
Cette procédure a pour objet de définir les modalités de ${params.process.toLowerCase()} conformément aux exigences de la norme ISO 9001:2015.

### 2. DOMAINE D'APPLICATION
Cette procédure s'applique à [À COMPLÉTER : périmètre d'application].

### 3. RESPONSABILITÉS
- **Responsable Qualité** : Validation de la procédure
- **${params.context?.role || 'Responsable du processus'}** : Application et suivi

### 4. PROCESSUS

#### 4.1 Étape 1 : Planification
[Description détaillée de l'étape de planification]

#### 4.2 Étape 2 : Réalisation
[Description détaillée de l'étape de réalisation]

#### 4.3 Étape 3 : Contrôle
[Description détaillée de l'étape de contrôle]

### 5. DOCUMENTS ASSOCIÉS
- Manuel Qualité
- [Autres documents de référence]

### 6. ENREGISTREMENTS
- Formulaire d'enregistrement [Réf]
- Rapport d'audit [Réf]

---
*Document généré automatiquement par IA Conformité*
*Date : ${new Date().toLocaleDateString('fr-FR')}*
      `.trim();
    }

    return 'Contenu du document généré...';
  },

  exportDocument: (doc, format) => {
    // Simulation d'export
    Utils.showNotification(`Document exporté en ${format.toUpperCase()}`, 'success');
  }
};

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  ChatBot.init();

  // Vérifier l'authentification pour les pages protégées
  // Mode démo : permet l'accès même sans authentification réelle
  const protectedPages = ['/dashboard', '/chat', '/analyse', '/generation', '/non-conformites', '/bibliotheque'];
  const currentPath = window.location.pathname;
  const isDemoMode = localStorage.getItem('access_token') === 'demo_token' ||
    (AppState.currentUser && AppState.currentUser.email === 'demo@example.com');

  if (protectedPages.some(page => currentPath.startsWith(page))) {
    if (!Auth.isAuthenticated() && !isDemoMode) {
      window.location.href = '/login';
    } else if (!Auth.isAuthenticated() && isDemoMode) {
      // Mode démo : créer un utilisateur de démo si nécessaire
      const demoUser = {
        email: "demo@example.com",
        username: "demo@example.com",
        name: "Utilisateur Démo",
        full_name: "Utilisateur Démo",
        role: "Responsable Qualité",
        company: "Entreprise Démo",
        service: "iso9001"
      };
      AppState.currentUser = demoUser;
      Utils.saveToStorage('currentUser', demoUser);
    }
  }
});

// Exposer les modules globalement pour utilisation dans les pages
window.AppState = AppState;
window.Utils = Utils;
window.Auth = Auth;
window.ChatBot = ChatBot;
window.ComplianceAnalysis = ComplianceAnalysis;
window.DocumentGeneration = DocumentGeneration;
