export type MessageRole = 'user' | 'assistant' | 'model';

export interface ChatMessage {
  role: MessageRole;
  content: string;
}

export interface GeminiPart {
  text: string;
}

export interface GeminiContent {
  role: 'user' | 'model';
  parts: GeminiPart[];
}

export type GeminiStatus = 'online' | 'error_auth' | 'error_quota' | 'error_model' | 'offline';

export interface GeminiResponse {
  content: string;
  status: GeminiStatus;
  errorDetail?: string;
}
