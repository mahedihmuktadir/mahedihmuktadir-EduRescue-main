'use client'

import Link from 'next/link'

export default function SessionHistoryPage() {
    const sessions = [
        { id: 1, expert: 'মাহেদি স্যার', subject: 'গণিত', date: '২০২৪-০৩-১৫', duration: '১ ঘণ্টা', status: 'সম্পন্ন', rating: '4.5' },
        { id: 2, expert: 'রিয়া ম্যাডাম', subject: 'ইংরেজি', date: '২০২৪-০৩-১০', duration: '৪৫ মিনিট', status: 'সম্পন্ন', rating: '4.8' },
        { id: 3, expert: 'আহমেদ স্যার', subject: 'পদার্থবিজ্ঞান', date: '২০২৪-০৩-০৫', duration: '২ ঘণ্টা', status: 'সম্পন্ন', rating: '4.2' }
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/dashboard" className="bg-green-600 text-white p-2 rounded-lg font-bold text-xl">
                                EduRescue
                            </Link>
                            <span className="ml-4 text-gray-700 font-semibold">সেশন হিস্ট্রি</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/dashboard"
                                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition text-sm"
                            >
                                ড্যাশবোর্ড
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-sm border">
                    <div className="px-6 py-8">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-900">📊 সেশন হিস্ট্রি</h1>
                            <p className="text-gray-600 mt-2">আপনার পূর্বের সকল সেশনের বিবরণ</p>
                        </div>

                        <div className="space-y-4">
                            {sessions.map((session) => (
                                <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-semibold">
                                            {session.expert.charAt(0)}
                                        </div>
                                        <div className="ml-4">
                                            <p className="font-medium text-gray-900">{session.expert}</p>
                                            <p className="text-sm text-gray-600">{session.subject} • {session.date} • {session.duration}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                            {session.status}
                                        </span>
                                        <p className="text-sm font-medium text-gray-900 mt-1">⭐ {session.rating}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Empty State */}
                        {sessions.length === 0 && (
                            <div className="text-center py-12">
                                <span className="text-6xl">📝</span>
                                <p className="text-gray-500 mt-4">কোনো সেশন নেই</p>
                                <p className="text-sm text-gray-400">আপনার প্রথম সেশন বুক করুন</p>
                                <Link
                                    href="/sessions/book"
                                    className="inline-block mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                                >
                                    সেশন বুক করুন
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}