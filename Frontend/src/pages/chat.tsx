import { Layout } from '../components/layout'

export function ChatPage() {
  return (
    <Layout currentPage="chat">
      {/* Inject Chatbot CSS */}
      <link rel="stylesheet" href="/static/chatbot.css?v=16" />
      <style dangerouslySetInnerHTML={{
        __html: `
        /* Overrides for integration */
        .chatbot-integration-wrapper {
            height: calc(100vh - 64px); /* Adjust based on Layout header height */
            display: flex;
            flex-direction: column;
            background: #f3f4f6; /* Match app background or keep gradient */
            overflow: hidden;
            border-radius: 0.5rem;
        }
        
        .chatbot-container {
            margin: 0;
            padding: 1rem;
            max-width: none;
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            background: transparent;
        }

        /* Hide the back link as we are in the dashboard */
        .back-link {
            display: none !important;
        }

        /* Adjust header to fit inside container */
        .chatbot-header {
            position: static; /* removed sticky */
            background: white;
            padding: 0.5rem 1rem;
            border-bottom: 1px solid #e5e7eb;
        }

        .header-content {
            padding: 0;
            max-width: none;
        }

        /* --- INLINED CRITICAL STYLES FOR SETTINGS VISIBILITY --- */
        
        /* Force Grid Layout on Large Screens */
        @media (min-width: 1024px) {
            .chatbot-container {
                display: grid !important;
                grid-template-columns: 260px minmax(350px, 1fr) 280px !important;
                gap: 1.5rem !important;
            }
            .right-sidebar {
                display: flex !important;
                width: auto !important;
                height: 100% !important;
                background: white;
                border: 1px solid #E5E7EB;
                border-radius: 1rem;
                flex-direction: column;
                overflow: hidden;
            }
        }

        /* Ensure Settings Panel Content looks good if external CSS fails */
        .panel-content { padding: 1rem; overflow-y: auto; flex: 1; }
        .setting-group { margin-bottom: 1.5rem; }
        .setting-group label { display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-weight: 500; font-size: 0.875rem; }
        .input-field { width: 100%; padding: 0.5rem; border: 1px solid #D1D5DB; border-radius: 0.5rem; box-sizing: border-box; }
        .slider { width: 100%; margin: 1rem 0 0.5rem; }
        .setting-info { margin-top: 1.5rem; padding: 1rem; background: #EFF6FF; border-radius: 0.75rem; display: flex; gap: 0.75rem; font-size: 0.825rem; color: #1E40AF; }
      `}} />

      <div className="chatbot-integration-wrapper">
        {/* Original Chatbot Header (adapted) */}
        <header className="chatbot-header">
          <div className="header-content">
            <div className="header-left">
              {/* Back link hidden via CSS */}
            </div>
            <div className="header-center">
              <div className="logo-container">
                <i className="fas fa-robot text-purple-600"></i>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">Assistant ISO 9001</h1>
              </div>
            </div>
            <div className="header-right">
              {/* Settings moved to chat interface */}
            </div>
          </div>
        </header>

        {/* Content Container */}
        <div className="chatbot-container">
          {/* Sidebar - Conversations */}
          <aside className="conversations-sidebar">
            <div className="sidebar-header">
              <h2><i className="fas fa-comments text-blue-500"></i> Conversations</h2>
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
                  <i className="fas fa-robot text-purple-500"></i>
                </div>
                <h2>Bienvenue sur votre Assistant ISO 9001</h2>
                <p>Créez une nouvelle conversation ou sélectionnez-en une existante pour commencer.</p>
                <button className="btn btn-primary btn-lg" id="welcomeNewConvoBtn">
                  <i className="fas fa-plus"></i> Créer une conversation
                </button>
              </div>
            </div>

            {/* Chat Interface */}
            <div className="chat-interface" id="chatInterface" style={{ display: 'none' }}>
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
                  <button className="btn-text" id="documentsBtn">
                    <i className="fas fa-file-alt"></i> Voir les documents
                  </button>
                  {/* Settings button removed as per request */}
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
                    {/* Hidden input for attachment */}
                    <input type="file" id="attachInput" style={{ display: 'none' }} />
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

          {/* Right Sidebar - ALWAYS VISIBLE SETTINGS */}
          <aside className="right-sidebar" id="rightSidebar">
            <div className="panel-header">
              <h3><i className="fas fa-cog text-gray-500"></i> Paramètres</h3>
            </div>
            <div className="panel-content">
              <div className="setting-group">
                <label htmlFor="modelSelect">Modèle LLM</label>
                <select id="modelSelect" className="input-field">
                  <option value="llama-3.1-8b-instant">Llama 3.1 8B (Rapide & Recommandé)</option>
                  <option value="llama-3.3-70b-versatile">Llama 3.3 70B (Plus précis, plus lent)</option>
                  <option value="mixtral-8x7b-32768">Mixtral 8x7B</option>
                </select>
              </div>
              <div className="setting-group">
                <label htmlFor="temperatureSlider">
                  Température: <span id="temperatureValue">0.2</span>
                </label>
                <input
                  type="range"
                  id="temperatureSlider"
                  min="0"
                  max="1"
                  step="0.1"
                  defaultValue="0.2"
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
          </aside>
        </div>

        {/* Documents Modal Overlay */}
        <div className="documents-overlay" id="documentsOverlay" style={{ display: 'none' }}>
          <div className="documents-modal">
            <div className="panel-header">
              <h3><i className="fas fa-file-alt text-blue-500"></i> Documents</h3>
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
        </div>
      </div>

      {/* Load Chatbot Script */}
      <script src="/static/chatbot.js?v=8"></script>
    </Layout>
  )
}
