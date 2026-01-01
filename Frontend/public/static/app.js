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
          full_name: userData.fullName
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
  }
};

// Gestion du Chat Bot
const ChatBot = {
  conversations: [],
  currentConversation: null,

  init: () => {
    ChatBot.conversations = Utils.loadFromStorage('chatConversations') || [];
  },

  createConversation: () => {
    const conversation = {
      id: Utils.generateId(),
      title: 'Nouvelle conversation',
      messages: [],
      createdAt: new Date().toISOString()
    };
    ChatBot.conversations.unshift(conversation);
    ChatBot.currentConversation = conversation;
    Utils.saveToStorage('chatConversations', ChatBot.conversations);
    return conversation;
  },

  sendMessage: async (message) => {
    if (!ChatBot.currentConversation) {
      ChatBot.createConversation();
    }

    // Ajouter le message de l'utilisateur
    const userMessage = {
      id: Utils.generateId(),
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };
    ChatBot.currentConversation.messages.push(userMessage);

    // Simuler une réponse du bot (en production, appeler une API)
    const botResponse = await ChatBot.generateResponse(message);
    const botMessage = {
      id: Utils.generateId(),
      role: 'assistant',
      content: botResponse,
      timestamp: new Date().toISOString()
    };
    ChatBot.currentConversation.messages.push(botMessage);

    // Mettre à jour le titre si c'est la première question
    if (ChatBot.currentConversation.messages.length === 2) {
      ChatBot.currentConversation.title = message.substring(0, 50) + '...';
    }

    Utils.saveToStorage('chatConversations', ChatBot.conversations);
    return botMessage;
  },

  generateResponse: async (message) => {
    // Simulation de réponse (en production, appeler GPT-4, Claude, etc.)
    await new Promise(resolve => setTimeout(resolve, 1000));

    const responses = {
      'action corrective': 'Selon la norme ISO 9001:2015 § 10.2, une **action corrective** est une action visant à éliminer la cause d\'une non-conformité détectée et à empêcher qu\'elle ne se reproduise.\n\nEn revanche, une **action préventive** (concept revu dans ISO 9001:2015) est intégrée dans l\'approche par les risques et vise à empêcher l\'apparition de non-conformités potentielles.\n\n**Exemple dans l\'industrie alimentaire :**\n- Action corrective : Suite à la détection de contamination bactérienne, mise en place d\'un nouveau protocole de nettoyage\n- Action préventive : Analyse HACCP pour identifier les points critiques avant qu\'un problème ne survienne',

      'default': 'Je suis un assistant spécialisé en conformité ISO 9001:2015. Je peux vous aider à :\n\n✓ Comprendre les exigences des différentes clauses ISO\n✓ Répondre à vos questions sur les processus de conformité\n✓ Vous guider dans la mise en place de votre système de management de la qualité\n\nN\'hésitez pas à me poser une question spécifique sur les normes ISO !'
    };

    // Recherche de mots-clés dans le message
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('action') && lowerMessage.includes('corrective')) {
      return responses['action corrective'];
    }

    return responses['default'];
  }
};

// Gestion de l'analyse de conformité
const ComplianceAnalysis = {
  analyzeDocument: async (file, metadata) => {
    // Simulation d'analyse (en production, envoyer au backend)
    await new Promise(resolve => setTimeout(resolve, 2000));

    const score = Math.floor(Math.random() * 30) + 70; // Score entre 70 et 100

    const result = {
      id: Utils.generateId(),
      fileName: file.name,
      fileSize: file.size,
      documentType: metadata.documentType,
      processISO: metadata.processISO,
      score: score,
      status: score >= 90 ? 'Conforme' : score >= 70 ? 'Attention' : 'Non-conforme',
      conformItems: Math.floor(score / 8),
      warningItems: Math.floor((100 - score) / 10),
      nonConformItems: Math.floor((100 - score) / 20),
      findings: [
        {
          id: 1,
          severity: 'success',
          clause: '§ 4.4 - Système de management',
          title: 'Structure documentaire conforme',
          description: 'La structure du document respecte les exigences de la clause 4.4.'
        },
        {
          id: 2,
          severity: 'warning',
          clause: '§ 8.4.1 - Évaluation fournisseurs',
          title: 'Critères d\'évaluation à préciser',
          description: 'Les critères d\'évaluation des fournisseurs pourraient être plus détaillés.'
        },
        {
          id: 3,
          severity: 'danger',
          clause: '§ 7.5 - Informations documentées',
          title: 'Enregistrements manquants',
          description: 'La mention des enregistrements requis n\'est pas présente dans le document.'
        }
      ],
      analyzedAt: new Date().toISOString()
    };

    AppState.analysisResults = result;
    return result;
  },

  downloadReport: (analysis) => {
    // Simulation de téléchargement
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
  const protectedPages = ['/dashboard', '/chat', '/analyse', '/generation', '/non-conformites', '/bibliotheque'];
  const currentPath = window.location.pathname;

  if (protectedPages.some(page => currentPath.startsWith(page))) {
    if (!Auth.isAuthenticated()) {
      window.location.href = '/login';
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
