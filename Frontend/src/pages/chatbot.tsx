export function ChatbotPage() {
  return (
    <html lang="fr">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Chatbot ISO 9001 - Assistant Intelligent</title>
        <link rel="stylesheet" href="/static/style.css?v=6" />
        <link rel="stylesheet" href="/static/chatbot.css?v=6" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="chatbot-body">
        {/* Header */}
        <header className="chatbot-header">
          <div className="header-content">
            <div className="header-left">
              <a href="/dashboard" className="back-link">
                <i className="fas fa-arrow-left"></i>
                <span>Retour au tableau de bord</span>
              </a>
            </div>
            <div className="header-center">
              <div className="logo-container">
                <i className="fas fa-robot"></i>
                <h1>Assistant ISO 9001</h1>
              </div>
            </div>
            <div className="header-right">
              <button className="btn-icon" id="settingsBtn" title="Paramètres">
                <i className="fas fa-cog"></i>
              </button>
            </div>
          </div>
        </header>

        <div className="chatbot-container">
          {/* Sidebar - Conversations */}
          <aside className="conversations-sidebar">
            <div className="sidebar-header">
              <h2><i class="fas fa-comments"></i> Conversations</h2>
              <button className="btn btn-primary btn-sm" id="newConversationBtn">
                <i className="fas fa-plus"></i> Nouvelle
              </button>
            </div>
            <div className="conversations-list" id="conversationsList">
              {/* Conversations will be loaded here */}
            </div>
          </aside>

          {/* Main Chat Area */}
          <main className="chat-main">
            {/* Welcome Screen */}
            <div className="welcome-screen" id="welcomeScreen">
              <div className="welcome-content">
                <div className="welcome-icon">
                  <i className="fas fa-robot"></i>
                </div>
                <h2>Bienvenue sur votre Assistant ISO 9001</h2>
                <p>Créez une nouvelle conversation ou sélectionnez-en une existante pour commencer.</p>
                <button className="btn btn-primary btn-lg" id="welcomeNewConvoBtn">
                  <i className="fas fa-plus"></i> Créer une conversation
                </button>
              </div>
            </div>

            {/* Chat Interface */}
            <div className="chat-interface" id="chatInterface" style="display: none;">
              {/* Chat Header */}
              <div className="chat-header">
                <div className="chat-header-info">
                  <h3 id="chatTitle">Conversation</h3>
                  <span className="status-indicator">
                    <span className="status-dot"></span>
                    <span id="statusText">En ligne</span>
                  </span>
                </div>
                <div className="chat-header-actions">
                  <button className="btn-icon" id="uploadBtn" title="Uploader un document">
                    <i className="fas fa-upload"></i>
                  </button>
                  <button className="btn-icon" id="documentsBtn" title="Voir les documents">
                    <i className="fas fa-file-alt"></i>
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="messages-container" id="messagesContainer">
                <div className="messages-inner" id="messagesInner">
                  {/* Messages will be loaded here */}
                </div>
              </div>

              {/* Input Area */}
              <div className="input-area">
                <form id="messageForm" className="message-form">
                  <div className="input-wrapper">
                    <textarea
                      id="messageInput"
                      placeholder="Posez votre question sur ISO 9001..."
                      rows={1}
                      maxLength={2000}
                    ></textarea>
                    <div className="input-actions">
                      <button type="button" className="btn-icon-small" id="attachBtn" title="Joindre un fichier">
                        <i className="fas fa-paperclip"></i>
                      </button>
                      <button type="submit" className="btn-send" id="sendBtn">
                        <i className="fas fa-paper-plane"></i>
                      </button>
                    </div>
                  </div>
                  <div className="input-hint">
                    <i className="fas fa-info-circle"></i>
                    <span>Entrée pour envoyer, Shift+Entrée pour nouvelle ligne</span>
                  </div>
                </form>
              </div>
            </div>
          </main>

          {/* Right Sidebar - Documents & Settings */}
          <aside className="right-sidebar" id="rightSidebar">
            {/* Documents Panel */}
            <div className="panel documents-panel" id="documentsPanel" style="display: none;">
              <div className="panel-header">
                <h3><i className="fas fa-file-alt"></i> Documents</h3>
                <button className="btn-icon-small" id="closeDocumentsBtn">
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="panel-content">
                <div className="documents-tabs">
                  <button className="tab-btn active" data-tab="conversation">Conversation</button>
                  <button className="tab-btn" data-tab="global">Global</button>
                </div>
                <div className="documents-content">
                  <div className="tab-content active" id="conversationDocs">
                    <div className="upload-zone" id="uploadZoneConvo">
                      <i className="fas fa-cloud-upload-alt"></i>
                      <p>Glissez un fichier ici ou cliquez pour uploader</p>
                      <input type="file" id="fileInputConvo" accept=".pdf,.txt,.doc,.docx" hidden />
                    </div>
                    <div className="documents-list" id="convoDocsList"></div>
                  </div>
                  <div className="tab-content" id="globalDocs">
                    <div className="upload-zone" id="uploadZoneGlobal">
                      <i className="fas fa-cloud-upload-alt"></i>
                      <p>Glissez un fichier ici ou cliquez pour uploader</p>
                      <input type="file" id="fileInputGlobal" accept=".pdf,.txt,.doc,.docx" hidden />
                    </div>
                    <div className="documents-list" id="globalDocsList"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings Panel */}
            <div className="panel settings-panel" id="settingsPanel" style="display: none;">
              <div className="panel-header">
                <h3><i className="fas fa-cog"></i> Paramètres</h3>
                <button className="btn-icon-small" id="closeSettingsBtn">
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="panel-content">
                <div className="setting-group">
                  <label for="modelSelect">Modèle LLM</label>
                  <select id="modelSelect" className="input-field">
                    <option value="llama-3.1-8b-instant">Llama 3.1 8B (Rapide & Recommandé)</option>
                    <option value="llama-3.3-70b-versatile">Llama 3.3 70B (Plus précis, plus lent)</option>
                    <option value="mixtral-8x7b-32768">Mixtral 8x7B</option>
                  </select>
                </div>
                <div className="setting-group">
                  <label for="temperatureSlider">
                    Température: <span id="temperatureValue">0.2</span>
                  </label>
                  <input
                    type="range"
                    id="temperatureSlider"
                    min="0"
                    max="1"
                    step="0.1"
                    value="0.2"
                    className="slider"
                  />
                  <div className="slider-labels">
                    <span>Précis</span>
                    <span>Créatif</span>
                  </div>
                </div>
                <div className="setting-info">
                  <i className="fas fa-info-circle"></i>
                  <p>Une température basse (0.1-0.3) donne des réponses plus précises et factuelles. Une température élevée (0.7-1.0) donne des réponses plus créatives.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Loading Overlay */}
        <div className="loading-overlay" id="loadingOverlay" style="display: none;">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Chargement...</p>
          </div>
        </div>

        {/* Toast Notifications */}
        <div className="toast-container" id="toastContainer"></div>

        <script src="/static/chatbot.js?v=6"></script>
      </body>
    </html>
  );
}
