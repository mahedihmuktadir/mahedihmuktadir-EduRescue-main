// src/app/resources/page.tsx - MVP Version
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

// Mock data - পরে database থেকে replace হবে
const mockResources = [
    {
        id: '1',
        title: 'এসএসসি গণিত পাস্ট পেপার ২০২৪',
        subject: 'গণিত',
        level: 'SSC',
        type: 'Past Papers',
        board: 'NCTB',
        language: 'Bangla',
        year: 2024,
        description: '২০২৪ সালের এসএসসি গণিত বোর্ড প্রশ্ন ও সমাধান',
        downloadUrl: '#',
        averageRating: 4.5,
        totalRatings: 24
    },
    {
        id: '2',
        title: 'এইচএসসি পদার্থবিজ্ঞান নোটস',
        subject: 'পদার্থবিজ্ঞান',
        level: 'HSC',
        type: 'Notes',
        board: 'NCTB',
        language: 'Bangla',
        description: 'পদার্থবিজ্ঞানের সম্পূর্ণ সংক্ষিপ্ত নোটস',
        downloadUrl: '#',
        averageRating: 4.8,
        totalRatings: 18
    },
    {
        id: '3',
        title: 'ইংরেজি গ্রামার ভিডিও টিউটোরিয়াল',
        subject: 'ইংরেজি',
        level: 'HSC',
        type: 'Video',
        board: 'NCTB',
        language: 'Banglish',
        description: 'ইংরেজি গ্রামার সহজভাবে বুঝুন ভিডিওতে',
        downloadUrl: '#',
        averageRating: 4.7,
        totalRatings: 31
    }
]

export default async function ResourcesPage() {
    const session = await getServerSession(authOptions as any)

    if (!session?.user) {
        redirect('/auth/signin?redirect=/resources')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Premium Navigation - আপনার Dashboard Pattern অনুযায়ী */}
            <nav className="bg-white/80 backdrop-blur-md border-b border-blue-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/student" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-lg font-bold text-xl">
                                🚀 EduRescue Pro
                            </Link>
                            <div className="ml-4 flex items-center space-x-6">
                                <span className="text-gray-700 font-semibold">রিসোর্স লাইব্রেরি</span>
                                <div className="flex space-x-1">
                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                        💎 প্রিমিয়াম
                                    </span>
                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                                        নতুন
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <Link
                                href="/resources/my-library"
                                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition flex items-center"
                            >
                                <span className="mr-2">📚</span>
                                আমার লাইব্রেরি
                            </Link>

                            {/* User Profile */}
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                                    {session.user?.name?.charAt(0) || 'U'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="space-y-6">

                    {/* Hero Search Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
                        <div className="text-center mb-6">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                📚 EduRescue রিসোর্স লাইব্রেরি
                            </h1>
                            <p className="text-gray-600">
                                বাংলাদেশের প্রথম AI-Powered একাডেমিক রিসোর্স কালেকশন
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="রিসোর্স খুঁজুন... (গণিত, পদার্থবিজ্ঞান, ইংরেজি)"
                                    className="w-full p-4 pl-12 rounded-xl border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
                                    🔍
                                </span>
                            </div>
                        </div>

                        {/* Subject Chips */}
                        <div className="flex flex-wrap gap-2 justify-center mt-4">
                            {['গণিত', 'ইংরেজি', 'পদার্থবিজ্ঞান', 'রসায়ন', 'জীববিজ্ঞান', 'ব্যবসায় শিক্ষা'].map((subject) => (
                                <button
                                    key={subject}
                                    className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full hover:bg-blue-100 transition font-medium"
                                >
                                    {subject}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-4 text-center">
                            <div className="text-2xl mb-2">📚</div>
                            <p className="text-2xl font-bold text-gray-900">৫০০+</p>
                            <p className="text-gray-600 text-sm">রিসোর্স</p>
                        </div>
                        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-4 text-center">
                            <div className="text-2xl mb-2">⭐</div>
                            <p className="text-2xl font-bold text-gray-900">৪.৮</p>
                            <p className="text-gray-600 text-sm">গড় রেটিং</p>
                        </div>
                        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-4 text-center">
                            <div className="text-2xl mb-2">👥</div>
                            <p className="text-2xl font-bold text-gray-900">২,৫০০+</p>
                            <p className="text-gray-600 text-sm">ডাউনলোড</p>
                        </div>
                        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-4 text-center">
                            <div className="text-2xl mb-2">🎯</div>
                            <p className="text-2xl font-bold text-gray-900">১০০%</p>
                            <p className="text-gray-600 text-sm">এক্সপার্ট ভেরিফাইড</p>
                        </div>
                    </div>

                    {/* Browse by Subject */}
                    <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                            <span className="text-2xl mr-3">📁</span>
                            বিষয়ভিত্তিক ব্রাউজ করুন
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {[
                                { name: 'গণিত', icon: '📊', color: 'bg-blue-100 text-blue-600' },
                                { name: 'ইংরেজি', icon: '🔤', color: 'bg-green-100 text-green-600' },
                                { name: 'পদার্থবিজ্ঞান', icon: '🔬', color: 'bg-purple-100 text-purple-600' },
                                { name: 'রসায়ন', icon: '🧪', color: 'bg-red-100 text-red-600' },
                                { name: 'জীববিজ্ঞান', icon: '🌿', color: 'bg-emerald-100 text-emerald-600' },
                                { name: 'ব্যবসায় শিক্ষা', icon: '💼', color: 'bg-orange-100 text-orange-600' }
                            ].map((subject) => (
                                <Link
                                    key={subject.name}
                                    href={`/resources?subject=${subject.name}`}
                                    className={`${subject.color} p-4 rounded-xl text-center hover:shadow-md transition transform hover:scale-105`}
                                >
                                    <div className="text-2xl mb-2">{subject.icon}</div>
                                    <p className="font-medium">{subject.name}</p>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Recently Added Resources */}
                    <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center">
                                <span className="text-2xl mr-3">🆕</span>
                                সাম্প্রতিক রিসোর্স
                            </h2>
                            <Link
                                href="/resources?sort=newest"
                                className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                            >
                                সব দেখুন <span className="ml-1">→</span>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {mockResources.map((resource) => (
                                <div key={resource.id} className="bg-gray-50 rounded-xl border border-blue-200 p-4 hover:shadow-md transition">
                                    {/* Resource Header */}
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                                                    {resource.subject}
                                                </span>
                                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                                                    {resource.level}
                                                </span>
                                                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                                                    {resource.type}
                                                </span>
                                            </div>
                                        </div>
                                        <button className="text-gray-400 hover:text-yellow-500 transition">
                                            ⭐
                                        </button>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                        {resource.description}
                                    </p>

                                    {/* Rating & Actions */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-yellow-500">⭐</span>
                                            <span className="text-sm font-medium text-gray-700">
                                                {resource.averageRating} ({resource.totalRatings})
                                            </span>
                                        </div>

                                        <div className="flex space-x-2">
                                            <Link
                                                href={`/resources/${resource.id}`}
                                                className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition"
                                            >
                                                দেখুন
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top Rated This Week */}
                    <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                            <span className="text-2xl mr-3">⭐</span>
                            এই সপ্তাহের সেরা রিসোর্স
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {mockResources.slice(0, 2).map((resource) => (
                                <div key={resource.id} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                                    <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center text-white text-xl">
                                        ⭐
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                                        <p className="text-sm text-gray-600">{resource.subject} • {resource.level}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-yellow-600 font-bold">{resource.averageRating}</div>
                                        <div className="text-xs text-gray-500">{resource.totalRatings} রিভিউ</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 🔮 Upcoming Features Section - আপনার Dashboard Pattern অনুযায়ী */}
                    <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                                    <span className="text-2xl mr-3">🔮</span>
                                    আসছে খুব শীঘ্রই...
                                </h3>
                                <p className="text-gray-600 mt-1">আমরা আপনার রিসোর্স এক্সপেরিয়েন্স আরও উন্নত করছি</p>
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
                                            🤖
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">এআই-পাওয়ার্ড সার্চ</h4>
                                            <p className="text-xs text-gray-600">স্মার্ট রিসোর্স রিকমেন্ডেশন</p>
                                        </div>
                                    </div>
                                    <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                                        Phase 2
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                                    <span>এস্টিমেটেড: মার্চ ২০২৫</span>
                                    <span className="font-semibold">০% সম্পূর্ণ</span>
                                </div>
                                <div className="w-full bg-blue-200 rounded-full h-2">
                                    <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: '0%' }}></div>
                                </div>
                            </div>

                            {/* Feature 2 - Medium Priority */}
                            <div className="border border-gray-200 rounded-xl p-4 hover:border-green-300 transition group bg-white">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white mr-3">
                                            👥
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">কমিউনিটি কন্ট্রিবিউশন</h4>
                                            <p className="text-xs text-gray-600">স্টুডেন্টরা রিসোর্স শেয়ার করবে</p>
                                        </div>
                                    </div>
                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                        Phase 3
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                                    <span>এস্টিমেটেড: জুন ২০২৫</span>
                                    <span className="font-semibold">০% সম্পূর্ণ</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-green-600 h-2 rounded-full transition-all duration-500" style={{ width: '0%' }}></div>
                                </div>
                            </div>

                            {/* Feature 3 - Planning Stage */}
                            <div className="border border-gray-200 rounded-xl p-4 hover:border-purple-300 transition group bg-white">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white mr-3">
                                            📱
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">অফলাইন এক্সেস</h4>
                                            <p className="text-xs text-gray-600">ডাউনলোড করে রাখুন</p>
                                        </div>
                                    </div>
                                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                                        Phase 3
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                                    <span>এস্টিমেটেড: সেপ্টেম্বর ২০২৫</span>
                                    <span className="font-semibold">০% সম্পূর্ণ</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-purple-600 h-2 rounded-full transition-all duration-500" style={{ width: '0%' }}></div>
                                </div>
                            </div>

                            {/* Feature 4 - Research Stage */}
                            <div className="border border-gray-200 rounded-xl p-4 hover:border-red-300 transition group bg-white">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center text-white mr-3">
                                            🎮
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">গেমিফিকেশন</h4>
                                            <p className="text-xs text-gray-600">ব্যাজ ও রিওয়ার্ড সিস্টেম</p>
                                        </div>
                                    </div>
                                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                                        Research
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                                    <span>এস্টিমেটেড: ডিসেম্বর ২০২৫</span>
                                    <span className="font-semibold">০% সম্পূর্ণ</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-red-600 h-2 rounded-full transition-all duration-500" style={{ width: '0%' }}></div>
                                </div>
                            </div>
                        </div>

                        {/* User Voting Section */}
                        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900">🗳️ কোন ফিচারটি আপনি সবচেয়ে বেশি চান?</p>
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
        </div>
    )
}