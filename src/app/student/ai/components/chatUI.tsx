// src/app/student/ai/components/ChatUI.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import ToolsBar from './ToolsBar';
import MessageBubble from './MessageBubble';
import PromptSuggestions from './PromptSuggestions';
import InputBox from './InputBox';
import { generateAIResponse } from '../actions/generateAIResponse';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

interface ChatUIProps {
  user: any;
}

export default function ChatUI({ user }: ChatUIProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'স্বাগতম! আমি EduRescue AI Assistant। আপনি কোন বিষয়ে সাহায্য চান? গণিত, বিজ্ঞান, প্রোগ্রামিং, বা অন্য কোনো একাডেমিক সমস্যা - আমি এখানে আছি আপনাকে সাহায্য করতে!',
      createdAt: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      createdAt: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Simulate API call delay
      const response = await generateAIResponse(messages, content.trim(), 'general');

      // Simulate streaming effect
      const assistantMessageId = (Date.now() + 1).toString();
      const assistantMessage: ChatMessage = {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
        createdAt: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMessage]);

      let index = 0;
      const interval = setInterval(() => {
        if (index < response.length) {
          setMessages(prev => prev.map(msg =>
            msg.id === assistantMessageId
              ? { ...msg, content: response.slice(0, index + 1) }
              : msg
          ));
          index++;
        } else {
          clearInterval(interval);
          setIsLoading(false);
        }
      }, 20);

    } catch (error) {
      console.error('Error:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'দুঃখিত, কিছু একটা সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।',
        createdAt: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  const handleToolSelect = (prompt: string) => {
    setInput(prompt);
  };

  const handleSuggestionClick = (text: string) => {
    setInput(text);
  };

  const clearConversation = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: 'কনভারসেশন ক্লিয়ার করা হয়েছে! আমি আবারো আপনার সাহায্যের জন্য প্রস্তুত।',
        createdAt: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Keep only last 20 messages
  const displayedMessages = messages.slice(-20);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 p-4 sm:p-6 sticky top-0 bg-white z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              AI
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">EduRescue Assistant</h1>
              <p className="text-sm text-green-600">🟢 Online • 24/7</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={clearConversation}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition"
            >
              Clear chat
            </button>
            {/* TODO: Future feature - Export as PDF */}
            <button
              disabled
              className="px-3 py-1 text-sm text-gray-400 bg-gray-100 rounded-lg cursor-not-allowed"
              title="Coming soon"
            >
              Export PDF
            </button>
          </div>
        </div>
      </div>

      {/* Tools Bar */}
      <div className="p-4 border-b border-gray-100">
        <ToolsBar onToolSelect={handleToolSelect} />
      </div>

      {/* Messages Area */}
      <div className="h-[420px] overflow-y-auto p-4 space-y-4">
        {displayedMessages.map((message) => (
          <MessageBubble
            key={message.id}
            role={message.role}
            content={message.content}
            timestamp={message.createdAt}
          />
        ))}

        {isLoading && (
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-indigo-500 rounded-full animate-pulse" />
            </div>
            <div className="bg-indigo-100 text-indigo-900 rounded-2xl rounded-bl-none px-4 py-3">
              <div className="flex items-center space-x-1">
                <span>EduRescue Assistant is thinking</span>
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Prompt Suggestions */}
      <div className="px-4 pt-2">
        <PromptSuggestions onSuggestionClick={handleSuggestionClick} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200">
        <InputBox
          value={input}
          onChange={setInput}
          onSubmit={handleSendMessage}
          disabled={isLoading}
          loading={isLoading}
        />
      </div>
    </div>
  );
}