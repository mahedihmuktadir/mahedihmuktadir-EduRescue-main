// src/app/chat/actions.ts
'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { ChatMessage, MessageType } from '@/types/chat';

// Mock database (in real app, use MongoDB)
let chatMessages: ChatMessage[] = [];
let userPresence: { [userId: string]: any } = {};

export async function sendMessage(
    sessionId: string,
    content: string,
    type: MessageType = MessageType.TEXT,
    fileData?: { name: string; url: string; size: number; type: string }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return { success: false, error: 'Authentication required', code: 'AUTH_REQUIRED' };
        }

        // Validate message content
        const validationResult = validateMessageContent(content, type, session.user.id);
        if (!validationResult.valid) {
            return {
                success: false,
                error: validationResult.reason,
                code: 'CONTENT_INVALID'
            };
        }

        // Check if session is active and user has access
        const sessionAccess = await verifySessionAccess(sessionId, session.user.id);
        if (!sessionAccess.valid) {
            return {
                success: false,
                error: sessionAccess.reason,
                code: 'SESSION_ACCESS_DENIED'
            };
        }

        // Create message object
        const message: ChatMessage = {
            _id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            sessionId,
            senderId: session.user.id,
            senderType: session.user.role as 'student' | 'expert',
            senderName: session.user.name || 'User',
            type,
            content: content.trim(),
            timestamp: new Date(),
            readBy: [session.user.id], // sender has read the message
            status: 'sent',
            moderationStatus: 'pending',

            // File data if applicable
            ...(fileData && {
                fileUrl: fileData.url,
                fileName: fileData.name,
                fileSize: fileData.size,
                fileType: fileData.type
            })
        };

        // Auto-moderation for ethical compliance
        const moderationResult = await moderateMessage(message);
        if (moderationResult.flagged) {
            message.isFlagged = true;
            message.flaggedReason = moderationResult.reason;
            message.moderationStatus = 'rejected';

            // Log moderation event
            await logModerationEvent(message, moderationResult);

            return {
                success: false,
                error: 'Message flagged by moderation system',
                code: 'CONTENT_FLAGGED',
                details: moderationResult
            };
        }

        // Save message to database (mock)
        chatMessages.push(message);

        // Update user presence (stop typing)
        updateUserTypingStatus(session.user.id, sessionId, false);

        // In real implementation, trigger real-time update via Socket.io/SSE
        await triggerRealTimeUpdate(sessionId, 'new_message', message);

        // Revalidate chat page
        revalidatePath(`/chat/${sessionId}`);

        return {
            success: true,
            message,
            messageId: message._id
        };

    } catch (error) {
        console.error('Error sending message:', error);
        return {
            success: false,
            error: 'Failed to send message',
            code: 'SEND_FAILED'
        };
    }
}

export async function getChatHistory(sessionId: string, limit: number = 50) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return { success: false, error: 'Authentication required' };
        }

        // Verify session access
        const sessionAccess = await verifySessionAccess(sessionId, session.user.id);
        if (!sessionAccess.valid) {
            return { success: false, error: 'Session access denied' };
        }

        // Get messages for this session (mock)
        const sessionMessages = chatMessages
            .filter(msg => msg.sessionId === sessionId)
            .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
            .slice(-limit);

        // Get session details
        const sessionInfo = await getSessionInfo(sessionId);

        // Update user presence (user is viewing chat)
        updateUserPresence(session.user.id, {
            isOnline: true,
            lastSeen: new Date(),
            currentSession: sessionId,
            deviceType: 'desktop' // Would detect from user agent
        });

        return {
            success: true,
            messages: sessionMessages,
            session: sessionInfo,
            hasMore: sessionMessages.length >= limit
        };

    } catch (error) {
        console.error('Error fetching chat history:', error);
        return { success: false, error: 'Failed to load messages' };
    }
}

export async function updateTypingStatus(
    sessionId: string,
    isTyping: boolean
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return { success: false, error: 'Authentication required' };
        }

        updateUserTypingStatus(session.user.id, sessionId, isTyping);

        // Trigger real-time update for typing indicator
        await triggerRealTimeUpdate(sessionId, 'typing_status', {
            userId: session.user.id,
            userName: session.user.name,
            isTyping,
            sessionId
        });

        return { success: true };

    } catch (error) {
        console.error('Error updating typing status:', error);
        return { success: false, error: 'Failed to update typing status' };
    }
}

export async function markMessagesAsRead(
    sessionId: string,
    messageIds: string[]
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return { success: false, error: 'Authentication required' };
        }

        // Update read status for messages
        chatMessages = chatMessages.map(msg => {
            if (messageIds.includes(msg._id) && !msg.readBy.includes(session.user.id)) {
                return {
                    ...msg,
                    readBy: [...msg.readBy, session.user.id],
                    status: msg.readBy.length >= 1 ? 'read' : 'delivered'
                };
            }
            return msg;
        });

        // Trigger real-time update for read receipts
        await triggerRealTimeUpdate(sessionId, 'read_receipt', {
            userId: session.user.id,
            messageIds,
            sessionId
        });

        return { success: true };

    } catch (error) {
        console.error('Error marking messages as read:', error);
        return { success: false, error: 'Failed to mark messages as read' };
    }
}

// Security & Moderation Helpers
function validateMessageContent(
    content: string,
    type: MessageType,
    userId: string
): { valid: boolean; reason?: string } {

    // Empty message check
    if (!content.trim() && type === MessageType.TEXT) {
        return { valid: false, reason: 'Message cannot be empty' };
    }

    // Length check
    if (content.length > 1000) {
        return { valid: false, reason: 'Message too long (max 1000 characters)' };
    }

    // Rate limiting (mock)
    const userMessageCount = chatMessages.filter(
        msg => msg.senderId === userId &&
            new Date(msg.timestamp).getTime() > Date.now() - 60000
    ).length;

    if (userMessageCount > 20) {
        return { valid: false, reason: 'Message rate limit exceeded' };
    }

    return { valid: true };
}

async function moderateMessage(message: ChatMessage): Promise<{
    flagged: boolean;
    reason?: string;
    severity?: 'low' | 'medium' | 'high';
}> {
    const prohibitedPatterns = [
        { pattern: /exam.*help|test.*answer/i, reason: 'Exam assistance request', severity: 'high' as const },
        { pattern: /do.*homework|complete.*assignment/i, reason: 'Homework completion request', severity: 'high' as const },
        { pattern: /send.*money|payment.*outside/i, reason: 'Payment outside platform', severity: 'critical' as const },
        { pattern: /personal.*contact|phone.*number/i, reason: 'Personal contact sharing', severity: 'medium' as const }
    ];

    for (const { pattern, reason, severity } of prohibitedPatterns) {
        if (pattern.test(message.content)) {
            return { flagged: true, reason, severity };
        }
    }

    return { flagged: false };
}

async function verifySessionAccess(sessionId: string, userId: string): Promise<{
    valid: boolean;
    reason?: string;
}> {
    // Mock session verification
    // In real app, check database for session ownership
    return { valid: true };
}

async function getSessionInfo(sessionId: string) {
    // Mock session info
    return {
        _id: sessionId,
        studentId: 'student_1',
        expertId: 'expert_1',
        studentName: 'Sample Student',
        expertName: 'Sample Expert',
        type: 'emergency',
        status: 'active',
        subject: 'Mathematics',
        urgency: 'high',
        startedAt: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
        duration: 30,
        timeRemaining: 20 * 60, // 20 minutes
        paymentStatus: 'paid',
        paymentAmount: 199,
        isRecorded: true,
        requiresModeration: true,
        trustScore: 85
    };
}

function updateUserTypingStatus(userId: string, sessionId: string, isTyping: boolean) {
    userPresence[userId] = {
        ...userPresence[userId],
        isTyping,
        typingIn: isTyping ? sessionId : undefined,
        lastTypingTime: isTyping ? new Date() : undefined
    };
}

function updateUserPresence(userId: string, updates: any) {
    userPresence[userId] = { ...userPresence[userId], ...updates };
}

async function triggerRealTimeUpdate(sessionId: string, event: string, data: any) {
    // In real implementation, this would send via Socket.io or SSE
    console.log(`Real-time event: ${event} for session ${sessionId}`, data);
}

async function logModerationEvent(message: ChatMessage, result: any) {
    console.log('Moderation event:', {
        messageId: message._id,
        sessionId: message.sessionId,
        senderId: message.senderId,
        content: message.content.substring(0, 100),
        result,
        timestamp: new Date()
    });
}