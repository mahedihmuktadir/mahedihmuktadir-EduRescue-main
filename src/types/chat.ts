// src/types/chat.ts - Create this file if not exists
export enum MessageType {
    TEXT = 'text',
    SYSTEM = 'system',
    FILE = 'file'
}

export interface ChatMessage {
    _id: string;
    sessionId: string;
    senderId: string;
    senderType: 'student' | 'expert';
    senderName: string;
    type: MessageType;
    content: string;
    timestamp: Date;
    readBy: string[];
    status: 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
    moderationStatus: 'pending' | 'approved' | 'rejected';
    fileUrl?: string;
    fileName?: string;
    fileSize?: number;
    fileType?: string;
}

export interface MVPFeatures {
    messaging: boolean;
    fileSharing: boolean;
    typingIndicators: boolean;
    onlineStatus: boolean;
    sessionTimer: boolean;
    videoCalls: boolean;
    whiteboard: boolean;
    screenShare: boolean;
    voiceMessages: boolean;
}