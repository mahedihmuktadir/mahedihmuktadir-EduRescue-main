// src/components/chat/ChatContainer.tsx - Ensure this exists
'use client';

import { useState, useEffect, useRef } from 'react';
import { ChatMessage, ChatSession, MVPFeatures } from '@/types/chat';

interface ChatContainerProps {
    sessionId: string;
    user: any;
    enabledFeatures: MVPFeatures;
}

export default function ChatContainer({ sessionId, user, enabledFeatures }: ChatContainerProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        loadMockMessages();
        scrollToBottom();
    }, [sessionId]);

    const loadMockMessages = () => {
        const mockMessages: ChatMessage[] = [
            {
                _id: '1',
                sessionId,
                senderId: 'expert_1',
                senderType: 'expert',
                senderName: 'ড. আহসান হাবীব',
                type: 'text',
                content: 'স্বাগতম! আমি আপনার এআই লার্নিং অ্যাসিসটেন্ট। আজকে আমি আপনাকে কিভাবে সাহায্য করতে পারি?',
                timestamp: new Date(Date.now() - 300000),
                readBy: ['expert_1', user.id],
                status: 'read',
                moderationStatus: 'approved'
            },
            {
                _id: '2',
                sessionId,
                senderId: user.id,
                senderType: user.role as 'student' | 'expert',
                senderName: user.name || 'You',
                type: 'text',
                content: 'গণিতের একটি সমস্যা সমাধানে সাহায্য প্রয়োজন',
                timestamp: new Date(Date.now() - 120000),
                readBy: [user.id, 'expert_1'],
                status: 'read',
                moderationStatus: 'approved'
            },
            {
                _id: '3',
                sessionId,
                senderId: 'expert_1',
                senderType: 'expert',
                senderName: 'ড. আহসান হাবীব',
                type: 'text',
                content: 'অবশ্যই! কোন সমস্যাটি নিয়ে আপনি সাহায্য চাচ্ছেন? ধাপে ধাপে বুঝিয়ে বলুন।',
                timestamp: new Date(),
                readBy: ['expert_1'],
                status: 'delivered',
                moderationStatus: 'approved'
            }
        ];

        setMessages(mockMessages);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSendMessage = async (content: string, file?: File) => {
        const newMessage: ChatMessage = {
            _id: `msg_${Date.now()}`,
            sessionId,
            senderId: user.id,
            senderType: user.role as 'student' | 'expert',
            senderName: user.name || 'You',
            type: file ? 'file' : 'text',
            content: content.trim(),
            timestamp: new Date(),
            readBy: [user.id],
            status: 'sent',
            moderationStatus: 'approved',
            ...(file && {
                fileName: file.name,
                fileType: file.type.split('/')[0],
                fileSize: file.size
            })
        };

        setMessages(prev => [...prev, newMessage]);
        scrollToBottom();

        // Simulate expert response
        setTimeout(() => {
            const expertResponse: ChatMessage = {
                _id: `msg_${Date.now()}_expert`,
                sessionId,
                senderId: 'expert_1',
                senderType: 'expert',
                senderName: 'ড. আহসান হাবীব',
                type: 'text',
                content: getExpertResponse(content),
                timestamp: new Date(),
                readBy: ['expert_1'],
                status: 'delivered',
                moderationStatus: 'approved'
            };

            setMessages(prev => [...prev, expertResponse]);
            scrollToBottom();
        }, 2000);
    };

    const getExpertResponse = (userMessage: string): string => {
        const responses = [
            "এটি খুব ভাল প্রশ্ন! আমি ধাপে ধাপে বুঝিয়ে দিচ্ছি...",
            "আমি এই বিষয়টি পরিষ্কারভাবে ব্যাখ্যা করতে পারি। প্রথমে আমরা basic concept দিয়ে শুরু করি।",
            "এই সমস্যা সমাধানের জন্য multiple approach আছে। আমি সবচেয়ে effective approach শেখাবো।",
            "আপনার এই প্রশ্নটি খুবই important। আমি detailed explanation দিচ্ছি সাথে examples।"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    };

    return (
        <div className="h-screen flex flex-col bg-white">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                            {user.role === 'student' ? '🎓' : '👨‍🏫'}
                        </div>
                        <div>
                            <h2 className="font-semibold text-gray-900">ড. আহসান হাবীব - গণিত</h2>
                            <p className="text-sm text-gray-600">
                                {user.role === 'student' ? 'আপনার এক্সপার্ট' : 'আপনার শিক্ষার্থী'}
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">সেশন #{sessionId.slice(-8)}</p>
                        <p className="text-xs text-gray-600">🟢 অনলাইন</p>
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                <div className="space-y-4">
                    {messages.map((message) => (
                        <div
                            key={message._id}
                            className={`flex ${message.senderId === user.id ? 'justify-end' : 'justify-start'
                                }`}
                        >
                            <div
                                className={`max-w-[70%] rounded-2xl p-4 ${message.senderId === user.id
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none'
                                        : 'bg-white border border-gray-200 rounded-bl-none'
                                    }`}
                            >
                                <div className="flex items-center space-x-2 mb-1">
                                    {message.senderId !== user.id && (
                                        <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                            AI
                                        </div>
                                    )}
                                    <span className={`text-sm ${message.senderId === user.id ? 'text-blue-100' : 'text-gray-500'}`}>
                                        {message.senderId === user.id ? 'আপনি' : message.senderName}
                                    </span>
                                </div>
                                <p className="whitespace-pre-wrap">{message.content}</p>
                                <div className={`text-xs mt-2 ${message.senderId === user.id ? 'text-blue-200' : 'text-gray-500'}`}>
                                    {new Date(message.timestamp).toLocaleTimeString('bn-BD', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
                <div className="flex space-x-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="আপনার মেসেজ লিখুন..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleSendMessage((e.target as HTMLInputElement).value);
                                    (e.target as HTMLInputElement).value = '';
                                }
                            }}
                        />
                    </div>
                    <button
                        onClick={() => {
                            const input = document.querySelector('input');
                            if (input?.value) {
                                handleSendMessage(input.value);
                                input.value = '';
                            }
                        }}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition"
                    >
                        প্রেরণ
                    </button>
                </div>
            </div>
        </div>
    );
}