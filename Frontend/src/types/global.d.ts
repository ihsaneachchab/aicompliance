// src/types/global.d.ts

export interface User {
  id: string;
  email: string;
  username: string;
  full_name?: string;
  company?: string;
  phone?: string;
  role: string;
  is_active: boolean;
}

export interface AppStateType {
  currentUser: User | null;
  currentPage: string;
  chatHistory: any[];
  analysisResults: any | null;
  generatedDocuments: any[];
}

export interface UtilsType {
  saveToStorage: (key: string, value: any) => void;
  loadFromStorage: (key: string) => any | null;
  formatDate: (date: Date | string | number) => string;
  generateId: () => string;
  showNotification: (
    message: string,
    type?: "success" | "error" | "warning" | "info"
  ) => void;
}

export interface AuthType {
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<any>;
  logout: () => void;
  getCurrentUser: () => User | null;
  isAuthenticated: () => boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
}

export interface ChatBotType {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  init: () => void;
  createConversation: () => Conversation;
  sendMessage: (message: string) => Promise<ChatMessage>;
  generateResponse: (message: string) => Promise<string>;
}

export interface ComplianceAnalysisType {
  analyzeDocument: (file: File, metadata: any) => Promise<any>;
  downloadReport: (analysis: any) => void;
}

export interface DocumentGenerationType {
  generateDocument: (params: any) => Promise<any>;
  getTemplateContent: (params: any) => string;
  exportDocument: (doc: any, format: string) => void;
}

declare global {
  interface Window {
    AppState: AppStateType;
    Utils: UtilsType;
    Auth: AuthType;
    ChatBot: ChatBotType;
    ComplianceAnalysis: ComplianceAnalysisType;
    DocumentGeneration: DocumentGenerationType;
    VITE_API_URL?: string;
  }

  const AppState: AppStateType;
  const Utils: UtilsType;
  const Auth: AuthType;
  const ChatBot: ChatBotType;
  const ComplianceAnalysis: ComplianceAnalysisType;
  const DocumentGeneration: DocumentGenerationType;
}

export {};