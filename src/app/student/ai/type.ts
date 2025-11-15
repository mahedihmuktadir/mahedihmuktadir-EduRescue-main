// src/app/student/ai/types.ts
export interface ChatMessage {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
}

export interface AIState {
    messages: ChatMessage[];
    isStreaming: boolean;
}

export type AIActionResponse = {
    success: boolean;
    message?: string;
    error?: string;
}