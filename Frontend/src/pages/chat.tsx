import { Layout } from '../layouts/layout'

export function ChatPage() {
  return (
    <Layout currentPage="chat">
      <div class="h-[calc(100vh-8rem)] flex gap-4">
        {/* Left sidebar - Conversation history */}
        <div class="w-64 bg-white rounded-xl shadow-card p-4 flex flex-col hidden lg:flex">
          <div class="mb-4">
            <button
              onclick="createNewConversation()"
              class="w-full btn btn-primary"
            >
              <i class="fas fa-plus mr-2"></i>
              Nouvelle conversation
            </button>
          </div>

          <div class="flex-1 overflow-y-auto space-y-2" id="conversationList">
            {/* Conversations will be loaded here */}
          </div>
        </div>

        {/* Main chat area */}
        <div class="flex-1 bg-white rounded-xl shadow-card flex flex-col">
          {/* Chat header */}
          <div class="border-b border-gray-200 p-4">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-xl font-bold text-gray-900">Chat Bot ISO 9001</h2>
                <p class="text-sm text-gray-500">Assistant intelligent pour vos questions sur les normes</p>
              </div>
              <div class="flex items-center space-x-2">
                <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                <span class="text-sm text-gray-600">En ligne</span>
              </div>
            </div>
          </div>

          {/* Messages area */}
          <div class="flex-1 overflow-y-auto p-6 space-y-4" id="messagesArea">
            {/* Welcome message */}
            <div class="flex justify-start">
              <div class="message-bubble message-bot max-w-2xl">
                <div class="flex items-start space-x-3">
                  <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-robot text-white text-sm"></i>
                  </div>
                  <div>
                    <p class="text-sm">
                      Bonjour ! 👋 Je suis votre assistant spécialisé en conformité ISO 9001:2015.
                    </p>
                    <p class="text-sm mt-2">
                      Je peux vous aider à :
                    </p>
                    <ul class="text-sm mt-2 space-y-1 list-disc list-inside">
                      <li>Comprendre les exigences des clauses ISO</li>
                      <li>Répondre à vos questions sur les processus</li>
                      <li>Vous guider dans la mise en conformité</li>
                    </ul>
                    <p class="text-sm mt-2">
                      Posez-moi votre question ! 😊
                    </p>
                    <span class="text-xs text-gray-400 mt-2 block">Maintenant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Input area */}
          <div class="border-t border-gray-200 p-4">
            <form id="chatForm" onsubmit="return sendMessage(event)" class="flex items-end space-x-3">
              <div class="flex-1">
                <textarea
                  id="messageInput"
                  rows="1"
                  class="w-full input-field resize-none"
                  placeholder="Posez votre question sur ISO 9001..."
                  onkeydown="handleKeyDown(event)"
                ></textarea>
              </div>
              <button
                type="submit"
                class="btn btn-primary px-6"
                id="sendButton"
              >
                <i class="fas fa-paper-plane"></i>
              </button>
            </form>
            <div class="mt-2 text-xs text-gray-500 flex items-center">
              <i class="fas fa-info-circle mr-1"></i>
              Appuyez sur Entrée pour envoyer, Shift+Entrée pour une nouvelle ligne
            </div>
          </div>
        </div>

        {/* Right sidebar - FAQ par clause ISO */}
        <div class="w-80 bg-white rounded-xl shadow-card p-4 hidden xl:block overflow-y-auto h-[calc(100vh-8rem)]">
          <h3 class="font-bold text-gray-900 mb-4 flex items-center">
            <i class="fas fa-question-circle text-blue-500 mr-2"></i>
            FAQ ISO 9001
          </h3>

          <div class="space-y-4">
            {/* Clause 4 - Contexte */}
            <div class="border-b border-gray-200 pb-4">
              <h4 class="font-semibold text-gray-900 mb-2 text-sm">§ 4 - Contexte de l'organisme</h4>
              <div class="space-y-2">
                <button
                  onclick="insertSuggestion('Comment identifier le contexte de mon organisme selon ISO 9001 § 4.1 ?')"
                  class="w-full text-left p-2 bg-gray-50 hover:bg-blue-50 rounded-lg text-xs transition-colors"
                >
                  <i class="fas fa-chevron-right text-blue-500 mr-1"></i>
                  Contexte de l'organisme (§ 4.1)
                </button>
                <button
                  onclick="insertSuggestion('Quelles sont les parties intéressées pertinentes selon § 4.2 ?')"
                  class="w-full text-left p-2 bg-gray-50 hover:bg-blue-50 rounded-lg text-xs transition-colors"
                >
                  <i class="fas fa-chevron-right text-blue-500 mr-1"></i>
                  Parties intéressées (§ 4.2)
                </button>
                <button
                  onclick="insertSuggestion('Comment définir le domaine d\\'application du SMQ § 4.3 ?')"
                  class="w-full text-left p-2 bg-gray-50 hover:bg-blue-50 rounded-lg text-xs transition-colors"
                >
                  <i class="fas fa-chevron-right text-blue-500 mr-1"></i>
                  Domaine d'application (§ 4.3)
                </button>
                <button
                  onclick="insertSuggestion('Quels sont les processus du SMQ requis par § 4.4 ?')"
                  class="w-full text-left p-2 bg-gray-50 hover:bg-blue-50 rounded-lg text-xs transition-colors"
                >
                  <i class="fas fa-chevron-right text-blue-500 mr-1"></i>
                  Système de management (§ 4.4)
                </button>
              </div>
            </div>

            {/* Clause 5 - Leadership */}
            <div class="border-b border-gray-200 pb-4">
              <h4 class="font-semibold text-gray-900 mb-2 text-sm">§ 5 - Leadership</h4>
              <div class="space-y-2">
                <button
                  onclick="insertSuggestion('Quel est le rôle de la direction dans le SMQ § 5.1 ?')"
                  class="w-full text-left p-2 bg-gray-50 hover:bg-blue-50 rounded-lg text-xs transition-colors"
                >
                  <i class="fas fa-chevron-right text-blue-500 mr-1"></i>
                  Leadership et engagement (§ 5.1)
                </button>
                <button
                  onclick="insertSuggestion('Comment établir la politique qualité selon § 5.2 ?')"
                  class="w-full text-left p-2 bg-gray-50 hover:bg-blue-50 rounded-lg text-xs transition-colors"
                >
                  <i class="fas fa-chevron-right text-blue-500 mr-1"></i>
                  Politique qualité (§ 5.2)
                </button>
                <button
                  onclick="insertSuggestion('Comment définir les rôles et responsabilités § 5.3 ?')"
                  class="w-full text-left p-2 bg-gray-50 hover:bg-blue-50 rounded-lg text-xs transition-colors"
                >
                  <i class="fas fa-chevron-right text-blue-500 mr-1"></i>
                  Rôles et responsabilités (§ 5.3)
                </button>
              </div>
            </div>

            {/* Clause 7 - Support */}
            <div class="border-b border-gray-200 pb-4">
              <h4 class="font-semibold text-gray-900 mb-2 text-sm">§ 7 - Support</h4>
              <div class="space-y-2">
                <button
                  onclick="insertSuggestion('Comment gérer les compétences selon § 7.2 ?')"
                  class="w-full text-left p-2 bg-gray-50 hover:bg-blue-50 rounded-lg text-xs transition-colors"
                >
                  <i class="fas fa-chevron-right text-blue-500 mr-1"></i>
                  Compétences (§ 7.2)
                </button>
                <button
                  onclick="insertSuggestion('Quelles sont les exigences pour les informations documentées § 7.5 ?')"
                  class="w-full text-left p-2 bg-gray-50 hover:bg-blue-50 rounded-lg text-xs transition-colors"
                >
                  <i class="fas fa-chevron-right text-blue-500 mr-1"></i>
                  Informations documentées (§ 7.5)
                </button>
              </div>
            </div>

            {/* Clause 8 - Réalisation */}
            <div class="border-b border-gray-200 pb-4">
              <h4 class="font-semibold text-gray-900 mb-2 text-sm">§ 8 - Réalisation</h4>
              <div class="space-y-2">
                <button
                  onclick="insertSuggestion('Comment maîtriser les processus externalisés § 8.4 ?')"
                  class="w-full text-left p-2 bg-gray-50 hover:bg-blue-50 rounded-lg text-xs transition-colors"
                >
                  <i class="fas fa-chevron-right text-blue-500 mr-1"></i>
                  Processus externalisés (§ 8.4)
                </button>
                <button
                  onclick="insertSuggestion('Quelle est la maîtrise de la production § 8.5 ?')"
                  class="w-full text-left p-2 bg-gray-50 hover:bg-blue-50 rounded-lg text-xs transition-colors"
                >
                  <i class="fas fa-chevron-right text-blue-500 mr-1"></i>
                  Production et services (§ 8.5)
                </button>
              </div>
            </div>

            {/* Clause 9 - Évaluation */}
            <div class="border-b border-gray-200 pb-4">
              <h4 class="font-semibold text-gray-900 mb-2 text-sm">§ 9 - Évaluation</h4>
              <div class="space-y-2">
                <button
                  onclick="insertSuggestion('Comment réaliser un audit interne selon § 9.2 ?')"
                  class="w-full text-left p-2 bg-gray-50 hover:bg-blue-50 rounded-lg text-xs transition-colors"
                >
                  <i class="fas fa-chevron-right text-blue-500 mr-1"></i>
                  Audit interne (§ 9.2)
                </button>
                <button
                  onclick="insertSuggestion('Comment conduire la revue de direction § 9.3 ?')"
                  class="w-full text-left p-2 bg-gray-50 hover:bg-blue-50 rounded-lg text-xs transition-colors"
                >
                  <i class="fas fa-chevron-right text-blue-500 mr-1"></i>
                  Revue de direction (§ 9.3)
                </button>
              </div>
            </div>

            {/* Clause 10 - Amélioration */}
            <div class="pb-4">
              <h4 class="font-semibold text-gray-900 mb-2 text-sm">§ 10 - Amélioration</h4>
              <div class="space-y-2">
                <button
                  onclick="insertSuggestion('Quelle est la différence entre action corrective et préventive § 10.2 ?')"
                  class="w-full text-left p-2 bg-gray-50 hover:bg-blue-50 rounded-lg text-xs transition-colors"
                >
                  <i class="fas fa-chevron-right text-blue-500 mr-1"></i>
                  Actions correctives (§ 10.2)
                </button>
                <button
                  onclick="insertSuggestion('Comment traiter les non-conformités selon § 10.2 ?')"
                  class="w-full text-left p-2 bg-gray-50 hover:bg-blue-50 rounded-lg text-xs transition-colors"
                >
                  <i class="fas fa-chevron-right text-blue-500 mr-1"></i>
                  Non-conformités (§ 10.2)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          let isTyping = false;

          // Load conversations
          function loadConversations() {
            ChatBot.init();
            const list = document.getElementById('conversationList');
            
            if (ChatBot.conversations.length === 0) {
              list.innerHTML = '<div class="text-sm text-gray-500 text-center py-4">Aucune conversation</div>';
              return;
            }

            list.innerHTML = ChatBot.conversations.map(conv => \`
              <div 
                onclick="loadConversation('\${conv.id}')" 
                class="p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors \${ChatBot.currentConversation?.id === conv.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''}"
              >
                <div class="text-sm font-medium text-gray-900 truncate">\${conv.title}</div>
                <div class="text-xs text-gray-500">\${new Date(conv.createdAt).toLocaleDateString('fr-FR')}</div>
              </div>
            \`).join('');
          }

          // Load a specific conversation
          function loadConversation(id) {
            const conv = ChatBot.conversations.find(c => c.id === id);
            if (conv) {
              ChatBot.currentConversation = conv;
              renderMessages();
              loadConversations();
            }
          }

          // Create new conversation
          function createNewConversation() {
            ChatBot.createConversation();
            renderMessages();
            loadConversations();
          }

          // Render messages
          function renderMessages() {
            const area = document.getElementById('messagesArea');
            
            if (!ChatBot.currentConversation || ChatBot.currentConversation.messages.length === 0) {
              area.innerHTML = \`
                <div class="flex justify-start">
                  <div class="message-bubble message-bot max-w-2xl">
                    <div class="flex items-start space-x-3">
                      <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <i class="fas fa-robot text-white text-sm"></i>
                      </div>
                      <div>
                        <p class="text-sm">Bonjour ! 👋 Je suis votre assistant spécialisé en conformité ISO 9001:2015.</p>
                        <p class="text-sm mt-2">Posez-moi votre question !</p>
                      </div>
                    </div>
                  </div>
                </div>
              \`;
              return;
            }

            area.innerHTML = ChatBot.currentConversation.messages.map(msg => {
              if (msg.role === 'user') {
                return \`
                  <div class="flex justify-end">
                    <div class="message-bubble message-user">
                      <p class="text-sm">\${msg.content}</p>
                      <span class="text-xs text-blue-100 mt-1 block">\${Utils.formatDate(msg.timestamp)}</span>
                    </div>
                  </div>
                \`;
              } else {
                return \`
                  <div class="flex justify-start">
                    <div class="message-bubble message-bot max-w-2xl">
                      <div class="flex items-start space-x-3">
                        <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <i class="fas fa-robot text-white text-sm"></i>
                        </div>
                        <div>
                          <p class="text-sm whitespace-pre-wrap">\${msg.content}</p>
                          <span class="text-xs text-gray-400 mt-2 block">\${Utils.formatDate(msg.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                \`;
              }
            }).join('');

            // Scroll to bottom
            area.scrollTop = area.scrollHeight;
          }

          // Send message
          async function sendMessage(event) {
            event.preventDefault();
            
            const input = document.getElementById('messageInput');
            const message = input.value.trim();
            
            if (!message || isTyping) return false;

            // Add user message to UI
            input.value = '';
            isTyping = true;

            // Show typing indicator
            const area = document.getElementById('messagesArea');
            const typingDiv = document.createElement('div');
            typingDiv.id = 'typingIndicator';
            typingDiv.className = 'flex justify-start';
            typingDiv.innerHTML = \`
              <div class="message-bubble message-bot">
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                  <div class="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style="animation-delay: 0.2s"></div>
                  <div class="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style="animation-delay: 0.4s"></div>
                </div>
              </div>
            \`;

            // Send message and get response
            try {
              await ChatBot.sendMessage(message);
              
              // Remove typing indicator
              const indicator = document.getElementById('typingIndicator');
              if (indicator) indicator.remove();
              
              // Re-render messages
              renderMessages();
              loadConversations();
            } catch (error) {
              console.error('Error sending message:', error);
              Utils.showNotification('Erreur lors de l\'envoi du message', 'error');
            } finally {
              isTyping = false;
            }

            return false;
          }

          // Handle keyboard shortcuts
          function handleKeyDown(event) {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault();
              sendMessage(event);
            }
          }

          // Insert suggestion
          function insertSuggestion(text) {
            document.getElementById('messageInput').value = text;
            document.getElementById('messageInput').focus();
          }

          // Clear chat
          function clearChat() {
            if (confirm('Voulez-vous vraiment effacer cette conversation ?')) {
              if (ChatBot.currentConversation) {
                ChatBot.currentConversation.messages = [];
                renderMessages();
                Utils.showNotification('Conversation effacée', 'success');
              }
            }
          }

          // Temperature slider
          document.getElementById('temperatureSlider').addEventListener('input', (e) => {
            const value = (e.target.value / 100).toFixed(1);
            document.getElementById('temperatureValue').textContent = value;
          });

          // Initialize
          loadConversations();
          renderMessages();
        `
      }} />
    </Layout>
  )
}
