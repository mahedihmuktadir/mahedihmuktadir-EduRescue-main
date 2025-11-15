// src/app/student/ai/AIChatClient.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

interface AIChatClientProps {
    session: any
}

export default function AIChatClient({ session }: AIChatClientProps) {
    const [messages, setMessages] = useState([
        {
            id: '1',
            content: 'স্বাগতম! আমি আপনার এআই লার্নিং অ্যাসিসটেন্ট। আজকে আমি আপনাকে কিভাবে সাহায্য করতে পারি? যেকোনো একাডেমিক সমস্যা নিয়ে问我 করুন - গণিত, বিজ্ঞান, প্রোগ্রামিং, বা অন্য任何 বিষয়।',
            role: 'assistant',
            timestamp: new Date()
        }
    ])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim() || isLoading) return

        const userMessage = {
            id: Date.now().toString(),
            content: input.trim(),
            role: 'user',
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setInput('')
        setIsLoading(true)

        try {
            const assistantMessageId = (Date.now() + 1).toString()
            const assistantMessage = {
                id: assistantMessageId,
                content: '',
                role: 'assistant',
                timestamp: new Date()
            }

            setMessages(prev => [...prev, assistantMessage])

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: input.trim() }),
            })

            if (!response.ok) throw new Error('Failed to get response')

            const reader = response.body?.getReader()
            const decoder = new TextDecoder()

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read()
                    if (done) break

                    const chunk = decoder.decode(value)
                    setMessages(prev => prev.map(msg =>
                        msg.id === assistantMessageId
                            ? { ...msg, content: msg.content + chunk }
                            : msg
                    ))
                }
            }
        } catch (error) {
            console.error('Error:', error)
            setMessages(prev => prev.map(msg =>
                msg.id === (Date.now() + 1).toString()
                    ? { ...msg, content: 'দুঃখিত, কিছু একটা সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।' }
                    : msg
            ))
        } finally {
            setIsLoading(false)
        }
    }

    const quickActions = [
        { icon: '📝', text: 'গণিতের সমস্যা সমাধান', prompt: 'গণিতের এই সমস্যাটি সমাধান করুন: x² + 2x + 1 = 0' },
        { icon: '🔬', text: 'বিজ্ঞান কনসেপ্ট ব্যাখ্যা', prompt: 'নিউটনের গতি সূত্রগুলো বুঝিয়ে দিন' },
        { icon: '💻', text: 'কোডিং হেল্প', prompt: 'Python এ একটি simple calculator program怎么写?' },
        { icon: '📚', text: 'স্টাডি প্লান তৈরি', prompt: 'পদার্থবিজ্ঞানের জন্য একটি স্টাডি প্লান তৈরি করুন' },
        { icon: '✍️', text: 'অ্যাসাইনমেন্ট হেল্প', prompt: 'এই অ্যাসাইনমেন্টে সাহায্য করুন' },
        { icon: '🎯', text: 'এক্সাম প্রিপারেশন', prompt: 'এক্সামের জন্য কীভাবে প্রিপেয়ার হবো?' }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Premium Navigation - EXACT SAME AS DASHBOARD */}
            <nav className="bg-white/80 backdrop-blur-md border-b border-blue-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-lg font-bold text-xl">
                                🚀 EduRescue Pro
                            </div>
                            <div className="ml-4 flex items-center space-x-6">
                                <span className="text-gray-700 font-semibold">এআই লার্নিং অ্যাসিসটেন্ট</span>
                                <div className="flex space-x-1">
                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                        💎 প্রিমিয়াম
                                    </span>
                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                                        সক্রিয়
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            {/* Notification Bell */}
                            <button className="relative p-2 text-gray-600 hover:text-blue-600 transition">
                                <span className="text-xl">🔔</span>
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                            </button>

                            {/* User Profile */}
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                                    {session.user?.name?.charAt(0) || 'U'}
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900">
                                        {session.user?.name || 'স্টুডেন্ট'}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        💎 প্রিমিয়াম মেম্বার
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content - FOLLOWING DASHBOARD STRUCTURE */}
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="space-y-6">

                    {/* Welcome Section with Stats - DASHBOARD STYLE */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Welcome Card */}
                        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">
                                        স্বাগতম, {session.user?.name || 'প্রিয় শিক্ষার্থী'}! 🤖
                                    </h1>
                                    <p className="text-gray-600 mt-2">
                                        আপনার প্রিমিয়াম এআই লার্নিং অ্যাসিসটেন্ট প্রস্তুত। যেকোনো সময়, যেকোনো বিষয়ে জিজ্ঞাসা করুন।
                                    </p>
                                </div>
                                <div className="bg-gradient-to-r from-purple-400 to-blue-500 text-white p-3 rounded-xl">
                                    <span className="text-2xl">🚀</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats - DASHBOARD STYLE */}
                        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">আজকের কোয়েরি</p>
                                    <p className="text-2xl font-bold text-gray-900">১২</p>
                                </div>
                                <div className="bg-blue-100 p-3 rounded-lg">
                                    <span className="text-blue-600 text-xl">💬</span>
                                </div>
                            </div>
                            <div className="mt-2">
                                <p className="text-xs text-green-600 font-medium">
                                    +৫ গতকালের তুলনায়
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">সাশ্রয়ী সময়</p>
                                    <p className="text-2xl font-bold text-gray-900">২.৫ ঘণ্টা</p>
                                </div>
                                <div className="bg-green-100 p-3 rounded-lg">
                                    <span className="text-green-600 text-xl">⏱️</span>
                                </div>
                            </div>
                            <div className="mt-2">
                                <p className="text-xs text-green-600 font-medium">
                                    +১.২ ঘণ্টা গতকাল
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Main Chat Area & Quick Actions - DASHBOARD GRID STRUCTURE */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Quick Actions Sidebar - DASHBOARD STYLE */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Quick Actions Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    ⚡ দ্রুত একশন
                                </h3>
                                <div className="space-y-3">
                                    {quickActions.map((action, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setInput(action.prompt)}
                                            className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 flex items-center space-x-3"
                                        >
                                            <span className="text-xl">{action.icon}</span>
                                            <span className="text-gray-700 font-medium">{action.text}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* AI Features Card */}
                            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-2xl shadow-lg p-6">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl">🤖</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">এআই সুবিধাসমূহ</h3>
                                    <p className="text-purple-100 mb-4">
                                        আপনার প্রিমিয়াম এক্সেস
                                    </p>
                                    <div className="space-y-2 text-sm text-purple-200 text-left">
                                        <div className="flex items-center">
                                            <span className="mr-2">✅</span> ২৪/৭ ইন্সট্যান্ট হেল্প
                                        </div>
                                        <div className="flex items-center">
                                            <span className="mr-2">✅</span> সকল বিষয় কভার
                                        </div>
                                        <div className="flex items-center">
                                            <span className="mr-2">✅</span> স্টেপ বাই স্টেপ সমাধান
                                        </div>
                                        <div className="flex items-center">
                                            <span className="mr-2">✅</span> বাংলা ও ইংরেজি সাপোর্ট
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Chat Area - DASHBOARD CARD STYLE */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-2xl shadow-sm border border-blue-100 flex flex-col h-[600px]">
                                {/* Chat Header */}
                                <div className="border-b border-gray-200 p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                                AI
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">এআই লার্নিং অ্যাসিসটেন্ট</h3>
                                                <p className="text-sm text-green-600">🟢 অনলাইন - ২৪/৭ উপলব্ধ</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                                💎 প্রিমিয়াম
                                            </span>
                                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                                                সক্রিয়
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Messages Area */}
                                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[80%] rounded-2xl p-4 ${message.role === 'user'
                                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none'
                                                    : 'bg-gray-100 text-gray-900 rounded-bl-none border border-gray-200'
                                                    }`}
                                            >
                                                <div className="flex items-center space-x-2 mb-2">
                                                    {message.role === 'assistant' && (
                                                        <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                                            AI
                                                        </div>
                                                    )}
                                                    <span className={`text-sm ${message.role === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                                                        {message.role === 'user' ? 'আপনি' : 'এআই অ্যাসিসটেন্ট'}
                                                    </span>
                                                </div>
                                                <p className="whitespace-pre-wrap">{message.content}</p>
                                                <div className={`text-xs mt-2 ${message.role === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                                                    {message.timestamp.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {isLoading && (
                                        <div className="flex justify-start">
                                            <div className="bg-gray-100 text-gray-900 rounded-2xl rounded-bl-none p-4 max-w-[80%] border border-gray-200">
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                                        AI
                                                    </div>
                                                    <span className="text-gray-500 text-sm">এআই অ্যাসিসটেন্ট টাইপ করছে...</span>
                                                </div>
                                                <div className="flex space-x-1 mt-2">
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Input Area */}
                                <div className="border-t border-gray-200 p-6">
                                    <form onSubmit={handleSubmit} className="flex space-x-4">
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                value={input}
                                                onChange={(e) => setInput(e.target.value)}
                                                placeholder="আপনার প্রশ্নটি লিখুন... (যেমন: 'ক্যালকুলাসের fundamental theorem টি বুঝিয়ে দিন')"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                disabled={isLoading}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isLoading || !input.trim()}
                                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                                        >
                                            <span>{isLoading ? '⏳' : '🚀'}</span>
                                            <span>{isLoading ? 'পাঠানো...' : 'প্রেরণ করুন'}</span>
                                        </button>
                                    </form>
                                    <div className="flex justify-between items-center mt-3">
                                        <p className="text-sm text-gray-500">
                                            💎 প্রিমিয়াম ব্যবহারকারী হিসেবে আপনার আনলিমিটেড এক্সেস আছে
                                        </p>
                                        <div className="flex space-x-2">
                                            <button className="text-gray-500 hover:text-gray-700 text-sm flex items-center space-x-1">
                                                <span>📎</span>
                                                <span>অ্যাটাচ ফাইল</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Features Grid - DASHBOARD STYLE */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                                <div className="bg-white rounded-xl p-4 border border-blue-200 text-center">
                                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white text-lg mx-auto mb-3">
                                        🚀
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-1">তাৎক্ষণিক উত্তর</h4>
                                    <p className="text-sm text-gray-600">কোনো অপেক্ষা নেই, সাথে সাথে সমাধান</p>
                                </div>
                                <div className="bg-white rounded-xl p-4 border border-blue-200 text-center">
                                    <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white text-lg mx-auto mb-3">
                                        📚
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-1">সকল বিষয় কভার</h4>
                                    <p className="text-sm text-gray-600">স্কুল থেকে ইউনিভার্সিটি পর্যন্ত</p>
                                </div>
                                <div className="bg-white rounded-xl p-4 border border-blue-200 text-center">
                                    <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center text-white text-lg mx-auto mb-3">
                                        💡
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-1">স্মার্ট ব্যাখ্যা</h4>
                                    <p className="text-sm text-gray-600">বুঝতে সহজ ভাষায় ধাপে ধাপে</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Emergency Help & Premium Features - DASHBOARD STYLE */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Emergency Help Card */}
                        <div className="bg-gradient-to-br from-red-500 to-pink-600 text-white rounded-2xl shadow-lg p-6">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🚨</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">প্রিমিয়াম ইমার্জেন্সি হেল্প</h3>
                                <p className="text-red-100 mb-4">
                                    এআই দিয়ে সমাধান না পেলে? সাথে সাথে এক্সপার্টের সাহায্য নিন
                                </p>
                                <Link
                                    href="/sessions/emergency"
                                    className="w-full bg-white text-red-600 py-3 px-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition transform hover:scale-105 block text-center"
                                >
                                    🚨 ইমার্জেন্সি হেল্প শুরু করুন
                                </Link>
                                <div className="mt-3 flex justify-center space-x-4 text-sm">
                                    <span className="flex items-center">
                                        <span className="w-2 h-2 bg-green-400 rounded-full mr-1" />
                                        ১৫+ এক্সপার্ট অ্যাভেইলেবল
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Premium Features */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl shadow-lg p-6 text-white">
                            <h3 className="text-xl font-bold mb-6 text-center">
                                💎 আপনার প্রিমিয়াম এআই সুবিধাসমূহ
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                                    <div className="text-2xl mb-2">🚀</div>
                                    <h4 className="font-semibold">ইন্সট্যান্ট রেসপন্স</h4>
                                    <p className="text-blue-100 text-sm mt-1">কোনো অপেক্ষা নেই</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                                    <div className="text-2xl mb-2">📚</div>
                                    <h4 className="font-semibold">সকল বিষয়</h4>
                                    <p className="text-blue-100 text-sm mt-1">সম্পূর্ণ কভারেজ</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                                    <div className="text-2xl mb-2">💡</div>
                                    <h4 className="font-semibold">স্মার্ট সমাধান</h4>
                                    <p className="text-blue-100 text-sm mt-1">ধাপে ধাপে</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                                    <div className="text-2xl mb-2">⭐</div>
                                    <h4 className="font-semibold">প্রিমিয়াম সাপোর্ট</h4>
                                    <p className="text-blue-100 text-sm mt-1">২৪/৭ উপলব্ধ</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}