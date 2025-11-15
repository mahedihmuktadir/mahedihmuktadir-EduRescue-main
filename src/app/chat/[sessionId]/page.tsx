// src/app/chat/[sessionId]/page.tsx - COMPLETE UPDATED VERSION
'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

// Updated Message Types - EduRescue Model
type MessageType = 'text' | 'file' | 'system' | 'whiteboard' | 'code' | 'audio' | 'image'

interface Message {
    id: string
    text: string
    sender: 'student' | 'expert'
    timestamp: Date
    type: MessageType
}

interface SessionContext {
    level: 'SSC' | 'HSC' | 'University' | 'Admission' | 'Other'
    subject: string
    emergency: boolean
}

export default function ChatPage() {
    const params = useParams()
    const sessionId = params.sessionId as string
    const [messages, setMessages] = useState<Message[]>([])
    const [newMessage, setNewMessage] = useState('')
    const [isConnected, setIsConnected] = useState(false)
    const [expertInfo, setExpertInfo] = useState({
        name: 'মাহেদি স্যার',
        subject: 'গণিত - বীজগণিত',
        rating: '৪.৯',
        status: 'অনলাইন'
    })

    // Session Context - EduRescue Model
    const [sessionContext, setSessionContext] = useState<SessionContext>({
        level: 'HSC',
        subject: 'গণিত',
        emergency: true
    })

    const messagesEndRef = useRef<HTMLDivElement>(null)

    // Mock initial messages - Updated with new types
    useEffect(() => {
        const initialMessages: Message[] = [
            {
                id: '1',
                text: 'স্বাগতম! আমি মাহেদি স্যার। কিভাবে帮助你 পারি?',
                sender: 'expert',
                timestamp: new Date(Date.now() - 300000),
                type: 'text'
            },
            {
                id: '2',
                text: 'স্যার, বীজগণিতের এই সমস্যাটি বুঝতে পারছি না - (a+b)² = a² + 2ab + b² এই সূত্রটি কিভাবে প্রমাণ করব?',
                sender: 'student',
                timestamp: new Date(Date.now() - 240000),
                type: 'text'
            },
            {
                id: '3',
                text: 'চমৎকার প্রশ্ন! নিচের স্টেপগুলো ফলো করুন:\n\n১. প্রথমে (a+b)² = (a+b)(a+b) লিখুন\n২. এবার গুণ করুন: a(a+b) + b(a+b)\n৩. সমাধান করুন: a² + ab + ab + b²\n৪. 最后一步: a² + 2ab + b²',
                sender: 'expert',
                timestamp: new Date(Date.now() - 120000),
                type: 'text'
            },
            {
                id: '4',
                text: 'সেশন শুরু হয়েছে - ইমার্জেন্সি গণিত হেল্প',
                sender: 'expert',
                timestamp: new Date(Date.now() - 300000),
                type: 'system'
            }
        ]
        setMessages(initialMessages)
        setIsConnected(true)
    }, [])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const sendMessage = () => {
        if (!newMessage.trim()) return

        const message: Message = {
            id: Date.now().toString(),
            text: newMessage,
            sender: 'student',
            timestamp: new Date(),
            type: 'text'
        }

        setMessages(prev => [...prev, message])
        setNewMessage('')

        // Auto-reply simulation
        setTimeout(() => {
            const autoReply: Message = {
                id: (Date.now() + 1).toString(),
                text: 'আপনার বার্তাটি বুঝতে পেরেছি। আরও বিস্তারিতভাবে ব্যাখ্যা করতে চান?',
                sender: 'expert',
                timestamp: new Date(),
                type: 'text'
            }
            setMessages(prev => [...prev, autoReply])
        }, 2000)
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header - EXACTLY LIKE DASHBOARD */}
            <nav className="bg-white/80 backdrop-blur-md border-b border-blue-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/student" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-lg font-bold text-xl">
                                🚀 EduRescue Pro
                            </Link>
                            <div className="ml-4 flex items-center space-x-6">
                                <span className="text-gray-700 font-semibold">লাইভ সেশন</span>
                                <div className="flex space-x-1">
                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                        💎 প্রিমিয়াম
                                    </span>
                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                                        {isConnected ? 'সক্রিয়' : 'সংযোগ বিচ্ছিন্ন'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Expert Info */}
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-900">{expertInfo.name}</p>
                                <p className="text-xs text-gray-500">{expertInfo.subject} • রেটিং: {expertInfo.rating}</p>
                            </div>
                            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                                MS
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Session Status Bar - Your Style */}
            <div className="bg-white/80 backdrop-blur-md border-b border-blue-200">
                <div className="max-w-4xl mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                <span className="text-sm text-gray-700">সেশন সক্রিয়</span>
                            </div>
                            <div className="text-sm text-gray-600">
                                সময়: <span className="font-mono">২৫:৪৭</span>
                            </div>
                            <div className="text-sm text-gray-600">
                                লেভেল: <span className="font-medium">{sessionContext.level}</span>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                                📁 ফাইল শেয়ার
                            </button>
                            <button disabled className="bg-gray-400 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed">
                                📝 হোয়াইটবোর্ড
                            </button>
                            <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition">
                                ❌ সেশন শেষ
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 🔒 Academic Honesty Banner - NEW ADDITION */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg mx-4 mt-4 p-3 max-w-4xl mx-auto">
                <div className="flex items-center">
                    <span className="text-yellow-600 mr-2">❗</span>
                    <p className="text-yellow-800 text-sm">
                        EduRescue exam proxy বা প্রশ্নফাঁস করে না। আমরা শুধু ধারণা ও সমাধান বুঝিয়ে দেই।
                    </p>
                </div>
            </div>

            {/* Main Chat Area - Your Dashboard Pattern */}
            <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">

                    {/* Messages Container */}
                    <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-gray-50">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.sender === 'student' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[70%] rounded-2xl p-4 ${message.sender === 'student'
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none'
                                        : message.type === 'system'
                                            ? 'bg-gray-200 text-gray-700 text-center w-full max-w-full'
                                            : 'bg-white border border-blue-200 text-gray-800 rounded-bl-none'
                                        }`}
                                >
                                    {/* Message Header */}
                                    {message.type !== 'system' && (
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-medium opacity-80">
                                                {message.sender === 'expert' ? expertInfo.name : 'আপনি'}
                                            </span>
                                            <span className="text-xs opacity-70">
                                                {message.timestamp.toLocaleTimeString('bn-BD', {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </span>
                                        </div>
                                    )}

                                    {/* Message Text */}
                                    <div className={`text-sm whitespace-pre-wrap ${message.type === 'system' ? 'text-center' : ''
                                        }`}>
                                        {message.text}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area - Your Style */}
                    <div className="border-t border-blue-200 bg-white p-4">
                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <textarea
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="আপনার বার্তা লিখুন... (Enter চাপলে পাঠানো হবে)"
                                    className="w-full border border-blue-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                    rows={3}
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <button
                                    onClick={sendMessage}
                                    disabled={!newMessage.trim()}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                                >
                                    <span className="mr-2">📤</span>
                                    পাঠান
                                </button>
                                <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition text-sm">
                                    😊 ইমোজি
                                </button>
                            </div>
                        </div>

                        {/* Quick Actions - Exactly like your dashboard */}
                        <div className="flex space-x-2 mt-3">
                            <button className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-sm hover:bg-blue-100 transition">
                                📊 ফর্মুলা
                            </button>
                            <button className="bg-green-50 text-green-600 px-3 py-1 rounded-lg text-sm hover:bg-green-100 transition">
                                🔢 গণিত সমস্যা
                            </button>
                            <button className="bg-purple-50 text-purple-600 px-3 py-1 rounded-lg text-sm hover:bg-purple-100 transition">
                                📝 নোট শেয়ার
                            </button>
                        </div>
                    </div>
                </div>

                {/* 🛠️ Tools Section - Current vs Upcoming */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {/* Available Tools */}
                    <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <span className="text-green-600 mr-2">✅</span>
                            বর্তমান টুলস
                        </h3>
                        <div className="space-y-3">
                            <button className="w-full bg-green-50 text-green-600 py-3 px-4 rounded-lg hover:bg-green-100 transition font-medium flex items-center justify-center">
                                <span className="mr-2">💬</span>
                                টেক্সট চ্যাট
                            </button>
                            <button className="w-full bg-green-50 text-green-600 py-3 px-4 rounded-lg hover:bg-green-100 transition font-medium flex items-center justify-center">
                                <span className="mr-2">📁</span>
                                ফাইল শেয়ার (PDF/Image)
                            </button>
                            <button className="w-full bg-green-50 text-green-600 py-3 px-4 rounded-lg hover:bg-green-100 transition font-medium flex items-center justify-center">
                                <span className="mr-2">⏱️</span>
                                সেশন টাইমার
                            </button>
                        </div>
                    </div>

                    {/* Coming Soon Tools */}
                    <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <span className="text-blue-600 mr-2">🚀</span>
                            শীঘ্রই আসছে
                        </h3>
                        <div className="space-y-3">
                            <button disabled className="w-full bg-gray-100 text-gray-400 py-3 px-4 rounded-lg font-medium flex items-center justify-center cursor-not-allowed">
                                <span className="mr-2">📋</span>
                                হোয়াইটবোর্ড
                                <span className="ml-2 bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">শীঘ্রই</span>
                            </button>
                            <button disabled className="w-full bg-gray-100 text-gray-400 py-3 px-4 rounded-lg font-medium flex items-center justify-center cursor-not-allowed">
                                <span className="mr-2">🎥</span>
                                ভিডিও কল
                                <span className="ml-2 bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">শীঘ্রই</span>
                            </button>
                            <button disabled className="w-full bg-gray-100 text-gray-400 py-3 px-4 rounded-lg font-medium flex items-center justify-center cursor-not-allowed">
                                <span className="mr-2">💾</span>
                                সেশন রেকর্ডিং
                                <span className="ml-2 bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">শীঘ্রই</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* 🔮 Upcoming Chat Features Section - NEW ADDITION */}
                <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6 mt-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 flex items-center">
                                <span className="text-2xl mr-3">🔮</span>
                                আসছে খুব শীঘ্রই...
                            </h3>
                            <p className="text-gray-600 mt-1">আমরা আপনার Chat Experience আরও উন্নত করছি</p>
                        </div>
                        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            🚀 Development Progress
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Feature 1 - High Priority */}
                        <div className="border-2 border-blue-200 rounded-xl p-4 hover:border-blue-300 transition group bg-blue-50/50">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white mr-3">
                                        📋
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">ইন্টারেক্টিভ হোয়াইটবোর্ড</h4>
                                        <p className="text-xs text-gray-600">রিয়েল-টাইম ড্রয়িং & এনোটেশন</p>
                                    </div>
                                </div>
                                <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                                    🔥 High Priority
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                                <span>এস্টিমেটেড: ডিসেম্বর ২০২৪</span>
                                <span className="font-semibold">৬৫% সম্পূর্ণ</span>
                            </div>
                            <div className="w-full bg-blue-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: '65%' }}></div>
                            </div>
                        </div>

                        {/* Feature 2 - Medium Priority */}
                        <div className="border border-gray-200 rounded-xl p-4 hover:border-green-300 transition group bg-white">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white mr-3">
                                        💾
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">সেশন রেকর্ডিং</h4>
                                        <p className="text-xs text-gray-600">পরে রিভিশনের জন্য সেভ করুন</p>
                                    </div>
                                </div>
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                    Development
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                                <span>এস্টিমেটেড: জানুয়ারি ২০২৫</span>
                                <span className="font-semibold">৪০% সম্পূর্ণ</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-600 h-2 rounded-full transition-all duration-500" style={{ width: '40%' }}></div>
                            </div>
                        </div>

                        {/* Feature 3 - Planning Stage */}
                        <div className="border border-gray-200 rounded-xl p-4 hover:border-purple-300 transition group bg-white">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white mr-3">
                                        🎥
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">ভিডিও কল ইন্টিগ্রেশন</h4>
                                        <p className="text-xs text-gray-600">ফেস-টু-ফেস লার্নিং</p>
                                    </div>
                                </div>
                                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                                    Planning
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                                <span>এস্টিমেটেড: ফেব্রুয়ারি ২০২৫</span>
                                <span className="font-semibold">২৫% সম্পূর্ণ</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-purple-600 h-2 rounded-full transition-all duration-500" style={{ width: '25%' }}></div>
                            </div>
                        </div>

                        {/* Feature 4 - Research Stage */}
                        <div className="border border-gray-200 rounded-xl p-4 hover:border-red-300 transition group bg-white">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center text-white mr-3">
                                        🤖
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">এআই লার্নিং অ্যাসিসটেন্ট</h4>
                                        <p className="text-xs text-gray-600">রিয়েল-টাইম এআই হেল্প</p>
                                    </div>
                                </div>
                                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                                    Research
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                                <span>এস্টিমেটেড: মার্চ ২০২৫</span>
                                <span className="font-semibold">১৫% সম্পূর্ণ</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-red-600 h-2 rounded-full transition-all duration-500" style={{ width: '15%' }}></div>
                            </div>
                        </div>
                    </div>

                    {/* User Voting Section - EXTRA FEATURE */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-900">🗳️ কোন Chat Featureটি আপনি সবচেয়ে বেশি চান?</p>
                                <p className="text-sm text-gray-600">আমাদের Development Priority সেট করতে ভোট দিন</p>
                            </div>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium flex items-center">
                                <span className="mr-2">📊</span>
                                ভোট দিন
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}