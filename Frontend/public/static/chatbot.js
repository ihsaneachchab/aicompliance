// Chatbot Application
class ChatbotApp {
    constructor() {
        // Dynamically determine backend URL based on how the user access the frontend
        const backendHost = window.location.hostname === '127.0.0.1' ? '127.0.0.1' : 'localhost';
        // FIX: Point to the main backend proxy (port 8000) which handles auth and forwarding
        this.apiBaseUrl = `http://${backendHost}:8000/api/chatbot`;

        console.log('Chatbot initialized with apiBaseUrl:', this.apiBaseUrl);

        this.currentConversationId = null;
        this.conversations = [];
        this.settings = {
            model: 'llama-3.1-8b-instant',
            temperature: 0.2
        };
        this.token = this.getAuthToken();
        this.init();
    }

    getAuthToken() {
        // Get token from localStorage (set by main app)
        return localStorage.getItem('access_token') || localStorage.getItem('token') || '';
    }

    async init() {
        this.setupEventListeners();
        await this.loadConversations();
        this.loadSettings();
    }

    setupEventListeners() {
        // New conversation buttons
        document.getElementById('newConversationBtn').addEventListener('click', () => this.createConversation());
        document.getElementById('welcomeNewConvoBtn').addEventListener('click', () => this.createConversation());

        // Message form
        document.getElementById('messageForm').addEventListener('submit', (e) => this.handleSendMessage(e));
        document.getElementById('messageInput').addEventListener('keydown', (e) => this.handleKeyDown(e));

        // Auto-resize textarea
        document.getElementById('messageInput').addEventListener('input', (e) => this.autoResizeTextarea(e.target));

        // Settings
        // Settings (Persistent Sidebar - Listeners for controls only)
        // document.getElementById('settingsBtn') removed from UI
        // document.getElementById('closeSettingsBtn') removed from UI

        const modelSelect = document.getElementById('modelSelect');
        if (modelSelect) modelSelect.addEventListener('change', (e) => this.updateSetting('model', e.target.value));

        const tempSlider = document.getElementById('temperatureSlider');
        if (tempSlider) {
            tempSlider.addEventListener('input', (e) => {
                document.getElementById('temperatureValue').textContent = e.target.value;
                this.updateSetting('temperature', parseFloat(e.target.value));
            });
        }

        // Documents
        // Check if documentsBtn exists (renamed/conditional)
        const documentsBtn = document.getElementById('documentsBtn');
        if (documentsBtn) {
            documentsBtn.addEventListener('click', () => this.togglePanel('documents'));
        }

        const closeDocumentsBtn = document.getElementById('closeDocumentsBtn');
        if (closeDocumentsBtn) {
            closeDocumentsBtn.addEventListener('click', () => this.closePanel('documents'));
        }

        // Attach File Logic (Input Bar)
        const attachBtn = document.getElementById('attachBtn');
        const attachInput = document.getElementById('attachInput');

        if (attachBtn && attachInput) {
            attachBtn.addEventListener('click', () => {
                // Determine scope: if no conversation, create one first or warn? 
                // Creating one automatically is better UX, but let's stick to warning or conversation scope if exists.
                if (!this.currentConversationId) {
                    // Option: Create conversation automatically?
                    // For now, warn as per existing logic, or better: create one.
                    // Let's create one if none exists to emulate ChatGPT smooth flow.
                    this.createConversation().then(() => {
                        attachInput.click();
                    });
                } else {
                    attachInput.click();
                }
            });

            attachInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    this.uploadDocument(e.target.files[0], 'conversation');
                    // Reset input
                    attachInput.value = '';
                }
            });
        }

        // Remove old header upload button listener if it exists (it was removed from HTML)
        const oldUploadBtn = document.getElementById('uploadBtn');
        if (oldUploadBtn) {
            oldUploadBtn.addEventListener('click', () => {
                const documentsPanel = document.getElementById('documentsPanel');
                if (documentsPanel.style.display === 'none') {
                    this.togglePanel('documents');
                }
            });
        }

        // Document tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // Upload zones
        this.setupUploadZone('uploadZoneConvo', 'fileInputConvo', 'conversation');
        this.setupUploadZone('uploadZoneGlobal', 'fileInputGlobal', 'global');
    }

    setupUploadZone(zoneId, inputId, scope) {
        const zone = document.getElementById(zoneId);
        const input = document.getElementById(inputId);

        if (!zone || !input) return; // Safety check

        zone.addEventListener('click', () => input.click());

        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.style.borderColor = '#667eea';
        });

        zone.addEventListener('dragleave', () => {
            zone.style.borderColor = '#D1D5DB';
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.style.borderColor = '#D1D5DB';
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.uploadDocument(files[0], scope);
            }
        });

        input.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.uploadDocument(e.target.files[0], scope);
            }
        });
    }

    autoResizeTextarea(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 150) + 'px';
    }

    handleKeyDown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            document.getElementById('messageForm').dispatchEvent(new Event('submit'));
        }
    }

    togglePanel(panel) {
        const documentsOverlay = document.getElementById('documentsOverlay');

        if (panel === 'documents') {
            const isVisible = documentsOverlay.style.display !== 'none';
            documentsOverlay.style.display = isVisible ? 'none' : 'flex';
            if (!isVisible) {
                this.loadDocuments();
            }
        } else if (panel === 'settings') {
            // Settings are now persistent in the right sidebar, no toggle needed unless we add mobile logic
            console.log('Settings panel is persistent');
        }
    }

    closePanel(panel) {
        if (panel === 'documents') {
            document.getElementById('documentsOverlay').style.display = 'none';
        }
        // Settings close button can be removed or just do nothing if strictly persistent
    }

    switchTab(tab) {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tab);
        });
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.toggle('active', content.id === tab + 'Docs');
        });
    }

    loadSettings() {
        const saved = localStorage.getItem('chatbotSettings');
        if (saved) {
            this.settings = JSON.parse(saved);
            document.getElementById('modelSelect').value = this.settings.model;
            document.getElementById('temperatureSlider').value = this.settings.temperature;
            document.getElementById('temperatureValue').textContent = this.settings.temperature;
        }
    }

    updateSetting(key, value) {
        this.settings[key] = value;
        localStorage.setItem('chatbotSettings', JSON.stringify(this.settings));
    }

    async loadConversations() {
        try {
            console.log(`Loading conversations from ${this.apiBaseUrl}/conversations...`);
            const response = await fetch(`${this.apiBaseUrl}/conversations`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to load conversations: ${response.status} ${errorText}`);
            }

            const data = await response.json();
            console.log('Conversations loaded:', data);
            this.conversations = data.conversations || [];
            this.renderConversations();
        } catch (error) {
            console.error('CRITICAL Error loading conversations:', error);
            this.showToast(`Erreur chargement: ${error.message}`, 'error');
        }
    }

    renderConversations() {
        const list = document.getElementById('conversationsList');

        if (this.conversations.length === 0) {
            list.innerHTML = '<div style="padding: 1rem; text-align: center; color: #9CA3AF; font-size: 0.875rem;">Aucune conversation</div>';
            return;
        }

        list.innerHTML = this.conversations.map((convoId, index) => `
            <div class="conversation-item ${convoId === this.currentConversationId ? 'active' : ''}" 
                 onclick="window.app.selectConversation('${convoId}')">
                <div class="conversation-item-header">
                    <div class="conversation-item-title">Conversation ${index + 1}</div>
                    <div class="conversation-item-time">${new Date().toLocaleDateString()}</div>
                </div>
                <div class="conversation-item-preview">${convoId.substring(0, 20)}...</div>
            </div>
        `).join('');
    }

    async createConversation() {
        this.showLoading(true);
        try {
            console.log(`Creating conversation at ${this.apiBaseUrl}/conversations...`);
            const response = await fetch(`${this.apiBaseUrl}/conversations`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            }).catch(err => {
                console.error('Fetch error:', err);
                throw new Error(`Erreur réseau (vérifiez que le backend sur port 8001 tourne): ${err.message}`);
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Erreur API: ${response.status} ${errorText}`);
            }

            const data = await response.json();
            console.log('Conversation created:', data);

            if (!data.convo_id) {
                throw new Error('L\'API n\'a pas renvoyé d\'ID de conversation (convo_id)');
            }

            this.conversations.push(data.convo_id);
            this.selectConversation(data.convo_id);
            this.renderConversations();
            this.showToast('Nouvelle conversation créée', 'success');
        } catch (error) {
            console.error('CRITICAL Error creating conversation:', error);
            alert(`Erreur critique: ${error.message}`); // Visible alert as fallback
            this.showToast(`Erreur: ${error.message}`, 'error');
        } finally {
            this.showLoading(false);
        }
    }

    async selectConversation(convoId) {
        this.currentConversationId = convoId;
        this.renderConversations();

        // Show chat interface
        document.getElementById('welcomeScreen').style.display = 'none';
        document.getElementById('chatInterface').style.display = 'flex';

        // Load conversation history
        await this.loadHistory();
    }

    async loadHistory() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/conversations/${this.currentConversationId}/history`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });

            if (!response.ok) throw new Error('Failed to load history');

            const data = await response.json();
            this.renderMessages(data.history || []);
        } catch (error) {
            console.error('Error loading history:', error);
            this.showToast('Erreur lors du chargement de l\'historique', 'error');
        }
    }

    renderMessages(messages) {
        const container = document.getElementById('messagesInner');

        if (messages.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 3rem; color: #9CA3AF;">
                    <i class="fas fa-comments" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <p>Commencez la conversation en posant une question sur ISO 9001</p>
                </div>
            `;
            return;
        }

        container.innerHTML = messages.map(msg => this.createMessageHTML(msg)).join('');
        this.scrollToBottom();
    }

    createMessageHTML(message) {
        const isUser = message.role === 'user';
        const avatar = isUser ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
        const author = isUser ? 'Vous' : 'Assistant';
        const time = new Date(message.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

        let citationsHTML = '';
        if (message.citations && message.citations.length > 0) {
            citationsHTML = `
                <div class="message-citations">
                    <div class="citations-header">
                        <i class="fas fa-quote-left"></i>
                        <span>Sources (${message.citations.length})</span>
                    </div>
                    ${message.citations.map(citation => `
                        <div class="citation-card">
                            <div class="citation-source">
                                <i class="fas fa-file-alt"></i>
                                ${citation.source}
                            </div>
                            <div class="citation-text">${citation.doc.substring(0, 150)}...</div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        return `
            <div class="message ${isUser ? 'user' : 'assistant'}">
                <div class="message-avatar">${avatar}</div>
                <div class="message-content">
                    <div class="message-header">
                        <span class="message-author">${author}</span>
                        <span class="message-time">${time}</span>
                    </div>
                    <div class="message-text">${message.content}</div>
                    ${citationsHTML}
                </div>
            </div>
        `;
    }

    async handleSendMessage(e) {
        e.preventDefault();

        if (!this.currentConversationId) {
            this.showToast('Veuillez créer ou sélectionner une conversation', 'error');
            return;
        }

        const input = document.getElementById('messageInput');
        const message = input.value.trim();

        if (!message) return;

        // Add user message to UI
        const userMessage = {
            role: 'user',
            content: message,
            timestamp: new Date().toISOString()
        };
        this.appendMessage(userMessage);

        // Clear input
        input.value = '';
        input.style.height = 'auto';

        // Show typing indicator
        this.showTypingIndicator();

        try {
            console.log(`Sending message to ${this.apiBaseUrl}/conversations/${this.currentConversationId}/ask...`);
            const response = await fetch(`${this.apiBaseUrl}/conversations/${this.currentConversationId}/ask`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    settings: this.settings
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to send message: ${response.status} ${errorText}`);
            }

            const data = await response.json();
            console.log('Response received:', data);

            // Remove typing indicator
            this.hideTypingIndicator();

            // Add assistant response
            const assistantMessage = {
                role: 'assistant',
                content: data.answer,
                citations: data.citations,
                timestamp: new Date().toISOString()
            };
            this.appendMessage(assistantMessage);

        } catch (error) {
            console.error('CRITICAL Error sending message:', error);
            this.hideTypingIndicator();
            this.showToast(`Erreur envoi: ${error.message}`, 'error');
        }
    }

    appendMessage(message) {
        const container = document.getElementById('messagesInner');

        // Remove empty state if present
        if (container.querySelector('i.fa-comments')) {
            container.innerHTML = '';
        }

        container.insertAdjacentHTML('beforeend', this.createMessageHTML(message));
        this.scrollToBottom();
    }

    showTypingIndicator() {
        const container = document.getElementById('messagesInner');
        container.insertAdjacentHTML('beforeend', `
            <div class="message assistant typing-indicator-message">
                <div class="message-avatar"><i class="fas fa-robot"></i></div>
                <div class="message-content">
                    <div class="typing-indicator">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                </div>
            </div>
        `);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const indicator = document.querySelector('.typing-indicator-message');
        if (indicator) indicator.remove();
    }

    scrollToBottom() {
        const container = document.getElementById('messagesContainer');
        container.scrollTop = container.scrollHeight;
    }

    async uploadDocument(file, scope) {
        if (!this.currentConversationId && scope === 'conversation') {
            this.showToast('Veuillez créer une conversation d\'abord', 'error');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        const url = scope === 'conversation'
            ? `${this.apiBaseUrl}/conversations/${this.currentConversationId}/documents`
            : `${this.apiBaseUrl}/documents/global`;

        this.showLoading(true);
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                },
                body: formData
            });

            if (!response.ok) throw new Error('Failed to upload document');

            const data = await response.json();
            this.showToast(`Document uploadé avec succès (${data.chunks_added} chunks)`, 'success');
            this.loadDocuments();
        } catch (error) {
            console.error('Error uploading document:', error);
            this.showToast('Erreur lors de l\'upload du document', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    async loadDocuments() {
        if (!this.currentConversationId) return;

        try {
            // Load conversation documents
            const convoResponse = await fetch(`${this.apiBaseUrl}/conversations/${this.currentConversationId}/documents`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });

            if (convoResponse.ok) {
                const convoData = await convoResponse.json();
                this.renderDocuments(convoData.documents || [], 'convoDocsList');
            }

            // Load global documents
            const globalResponse = await fetch(`${this.apiBaseUrl}/documents/global`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });

            if (globalResponse.ok) {
                const globalData = await globalResponse.json();
                this.renderDocuments(globalData.documents || [], 'globalDocsList');
            }
        } catch (error) {
            console.error('Error loading documents:', error);
        }
    }

    renderDocuments(documents, containerId) {
        const container = document.getElementById(containerId);

        if (documents.length === 0) {
            container.innerHTML = '<div style="text-align: center; color: #9CA3AF; font-size: 0.875rem; padding: 1rem;">Aucun document</div>';
            return;
        }

        container.innerHTML = documents.map(doc => `
            <div class="document-item">
                <div class="document-info">
                    <div class="document-icon">
                        <i class="fas fa-file-pdf"></i>
                    </div>
                    <div class="document-name">${doc}</div>
                </div>
                <div class="document-actions">
                    <button class="btn-icon-small" onclick="window.app.deleteDocument('${doc}')" title="Supprimer">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    async deleteDocument(filename) {
        if (!confirm(`Supprimer le document "${filename}" ?`)) return;

        this.showLoading(true);
        try {
            const response = await fetch(`${this.apiBaseUrl}/conversations/${this.currentConversationId}/documents/${filename}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });

            if (!response.ok) throw new Error('Failed to delete document');

            this.showToast('Document supprimé', 'success');
            this.loadDocuments();
        } catch (error) {
            console.error('Error deleting document:', error);
            this.showToast('Erreur lors de la suppression', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    showLoading(show) {
        document.getElementById('loadingOverlay').style.display = show ? 'flex' : 'none';
    }

    showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            info: 'fa-info-circle'
        };

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas ${icons[type]} toast-icon"></i>
            <div class="toast-message">${message}</div>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'toastSlideIn 0.3s ease-out reverse';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.app = new ChatbotApp();
    });
} else {
    window.app = new ChatbotApp();
}
