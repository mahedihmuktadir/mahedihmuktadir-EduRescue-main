// src/components/chat/MessageList.tsx
'use client';

import { useEffect, useRef } from 'react';
import { ChatMessage, MVPFeatures } from '@/types/chat';
import MessageBubble from './MessageBubble';

interface MessageListProps {
    messages: ChatMessage[];
    currentUser: any;
    onMessagesRead: (messageIds: string[]) => void;
    enabledFeatures: MVPFeatures;
    messagesEndRef: React.RefObject<HTMLDivElement>;
}

export default function MessageList({
    messages,
    currentUser,
    onMessagesRead,
    enabledFeatures,
    messagesEndRef
}: MessageListProps) {
    const listRef = useRef<HTMLDivElement>(null);
    const readMessagesRef = useRef<Set<string>>(new Set());

    useEffect(() => {
        scrollToBottom();
        markMessagesAsRead();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const markMessagesAsRead = () => {
        const unreadMessages = messages.filter(
            message =>
                message.senderId !== currentUser.id &&
                !message.readBy.includes(currentUser.id) &&
                !readMessagesRef.current.has(message._id)
        );

        if (unreadMessages.length > 0) {
            const messageIds = unreadMessages.map(msg => msg._id);
            onMessagesRead(messageIds);

            // Add to read set to avoid duplicate processing
            unreadMessages.forEach(msg => readMessagesRef.current.add(msg._id));
        }
    };

    const groupMessagesByDate = (messages: ChatMessage[]) => {
        const groups: { [key: string]: ChatMessage[] } = {};

        messages.forEach(message => {
            const date = new Date(message.timestamp).toDateString();
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(message);
        });

        return groups;
    };

    const formatDateHeader = (dateString: string) => {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return 'আজ';
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'গতকাল';
        } else {
            return date.toLocaleDateString('bn-BD', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    };

    const messageGroups = groupMessagesByDate(messages);

    return (
        <div ref={listRef} className="h-full overflow-y-auto bg-gray-50 p-4">
            {Object.entries(messageGroups).map(([date, dateMessages]) => (
                <div key={date} className="mb-6">
                    {/* Date Header */}
                    <div className="flex justify-center my-4">
                        <div className="bg-white border border-gray-200 rounded-full px-4 py-1 text-sm text-gray-600">
                            {formatDateHeader(date)}
                        </div>
                    </div>

                    {/* Messages for this date */}
                    <div className="space-y-3">
                        {dateMessages.map((message, index) => (
                            <MessageBubble
                                key={message._id}
                                message={message}
                                isOwnMessage={message.senderId === currentUser.id}
                                showAvatar={index === 0 || dateMessages[index - 1]?.senderId !== message.senderId}
                                enabledFeatures={enabledFeatures}
                            />
                        ))}
                    </div>
                </div>
            ))}

            {/* Empty State */}
            {messages.length === 0 && (
                <div className="h-full flex items-center justify-center">
                    <div className="text-center text-gray-500">
                        <div className="text-4xl mb-4">💬</div>
                        <p className="text-lg font-medium">কোনো মেসেজ নেই</p>
                        <p className="text-sm">আপনার কথোপকথন শুরু করুন</p>
                    </div>
                </div>
            )}

            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
        </div>
    );
}