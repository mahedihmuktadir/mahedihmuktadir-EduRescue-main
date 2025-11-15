// src/app/student/page.tsx - FINAL UPDATED VERSION
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import DailyRescueRoutine from '@/components/DailyRescueRoutine';
import StudyAnalytics from '@/components/StudyAnalytics';
import SmartEmergencySection from '@/components/SmartEmergencySection';
import BottomNavigation from '@/components/BottomNavigation';
import ExamCountdownBar from '@/components/ExamCountdownBar';

export default async function StudentDashboardPage() {
    const session = await getServerSession(authOptions as any)

    // লগইন না থাকলে → সাইন-ইন + redirect=/student
    if (!session?.user) {
        redirect('/auth/signin?redirect=/student')
    }

    // role guard: শুধু student ঢুকতে পারবে
    const role = String((session.user as any).role || 'student').toLowerCase()
    if (role !== 'student') {
        redirect('/auth/redirect')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Premium Navigation - UPDATED WITH RESOURCES LINK & PLAN BADGE */}
            <nav className="bg-white/80 backdrop-blur-md border-b border-blue-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-lg font-bold text-xl">
                                🚀 EduRescue Pro
                            </div>
                            <div className="ml-4 flex items-center space-x-6">
                                <span className="text-gray-700 font-semibold">প্রিমিয়াম ড্যাশবোর্ড</span>

                                {/* ✅ NEW: Resources Link in Navbar */}
                                <Link href="/resources" className="text-gray-600 hover:text-blue-600 transition font-medium flex items-center">
                                    <span className="mr-1">📚</span> রিসোর্স
                                </Link>

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

                            {/* User Profile - UPDATED WITH PLAN BADGE */}
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                                    {session.user?.name?.charAt(0) || 'U'}
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900">
                                        {session.user?.name || 'স্টুডেন্ট'}
                                    </p>
                                    {/* ✅ NEW: Plan Badge */}
                                    <div className="flex items-center space-x-1 mt-1">
                                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                            Free Plan
                                        </span>
                                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                                            সক্রিয়
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Dashboard Content */}
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="space-y-6">

                    {/* Welcome Section with Stats */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Welcome Card */}
                        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">
                                        স্বাগতম, {session.user?.name || 'প্রিয় শিক্ষার্থী'}! 👋
                                    </h1>
                                    <p className="text-gray-600 mt-2">
                                        আপনার প্রিমিয়াম লার্নিং জার্নি এখান থেকে শুরু হোক
                                    </p>
                                </div>
                                <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-3 rounded-xl">
                                    <span className="text-2xl">🚀</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">মোট সেশন</p>
                                    <p className="text-2xl font-bold text-gray-900">৪৭</p>
                                </div>
                                <div className="bg-blue-100 p-3 rounded-lg">
                                    <span className="text-blue-600 text-xl">📚</span>
                                </div>
                            </div>
                            <div className="mt-2">
                                <p className="text-xs text-green-600 font-medium">
                                    +১২% গত মাসের তুলনায়
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">শিক্ষা সময়</p>
                                    <p className="text-2xl font-bold text-gray-900">৩২ ঘণ্টা</p>
                                </div>
                                <div className="bg-green-100 p-3 rounded-lg">
                                    <span className="text-green-600 text-xl">⏱️</span>
                                </div>
                            </div>
                            <div className="mt-2">
                                <p className="text-xs text-green-600 font-medium">
                                    +৮ ঘণ্টা গত মাসে
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ✅ NEW: Subscription Summary Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                                <span className="text-xl mr-2">📦</span>
                                আপনার সাবস্ক্রিপশন স্ট্যাটাস
                            </h3>
                            <div className="flex space-x-2">
                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                    Free
                                </span>
                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                    সক্রিয়
                                </span>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">আপনার প্ল্যান প্রোগ্রেস</span>
                                <span className="font-semibold">২৫% সম্পূর্ণ</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" style={{ width: '25%' }} />
                            </div>
                        </div>

                        {/* Features List */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="flex items-center space-x-2">
                                <span className="text-green-500">✅</span>
                                <span className="text-sm text-gray-700">বেসিক AI এক্সেস</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-green-500">✅</span>
                                <span className="text-sm text-gray-700">সীমিত সেশন</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-400">🔒</span>
                                <span className="text-sm text-gray-500">প্রিমিয়াম AI</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-400">🔒</span>
                                <span className="text-sm text-gray-500">অসীম সেশন</span>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-700">পরবর্তী স্তর:</p>
                                <p className="text-green-600 font-semibold">Subject Subscription - ৳১,৫০০/মাস</p>
                            </div>
                            <Link
                                href="/pricing"
                                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-md transition transform hover:scale-105 flex items-center"
                            >
                                <span className="mr-2">🚀</span>
                                আপগ্রেড করুন
                            </Link>
                        </div>
                    </div>

                    {/* Emergency Help & Quick Actions */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Emergency Help - Premium Version */}
                        <div className="bg-gradient-to-br from-red-500 to-pink-600 text-white rounded-2xl shadow-lg p-6">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🚨</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">প্রিমিয়াম ইমার্জেন্সি হেল্প</h3>
                                <p className="text-red-100 mb-4">
                                    প্রায়োরিটি এক্সেস • ২-মিনিট রেসপন্স • ভিআইপি সাপোর্ট
                                </p>
                                <button className="w-full bg-white text-red-600 py-3 px-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition transform hover:scale-105">
                                    🚨 ইমার্জেন্সি হেল্প শুরু করুন
                                </button>
                                <div className="mt-3 flex justify-center space-x-4 text-sm">
                                    <span className="flex items-center">
                                        <span className="w-2 h-2 bg-green-400 rounded-full mr-1" />
                                        ১৫+ এক্সপার্ট অ্যাভেইলেবল
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions - UPDATED WITH RESOURCES & UPGRADE BUTTONS */}
                        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                ⚡ দ্রুত একশন
                            </h3>
                            <div className="space-y-3">
                                <Link
                                    href="/sessions/book"
                                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center"
                                >
                                    <span className="mr-2">📅</span>
                                    নতুন সেশন বুক করুন
                                </Link>

                                <Link
                                    href="/chat"
                                    className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition font-semibold flex items-center justify-center"
                                >
                                    <span className="mr-2">💬</span>
                                    লাইভ চ্যাট শুরু করুন
                                </Link>

                                <Link
                                    href="/student/ai"
                                    className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition font-semibold flex items-center justify-center"
                                >
                                    <span className="mr-2">🤖</span>
                                    এআই অ্যাসিসটেন্ট
                                </Link>

                                {/* ✅ NEW: Upgrade Button */}
                                <Link
                                    href="/pricing"
                                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 px-4 rounded-lg hover:from-yellow-600 hover:to-orange-600 transition font-semibold flex items-center justify-center transform hover:scale-105"
                                >
                                    <span className="mr-2">💎</span>
                                    প্ল্যান আপগ্রেড করুন
                                </Link>
                            </div>
                        </div>

                        {/* AI Learning Assistant Card */}
                        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-2xl shadow-lg p-6">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🤖</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">এআই লার্নিং অ্যাসিসটেন্ট</h3>
                                <p className="text-purple-100 mb-4">
                                    আপনার ব্যক্তিগত এআই টিউটর প্রস্তুত
                                </p>
                                <button className="w-full bg-white text-purple-600 py-3 px-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition">
                                    🎯 এআই হেল্প নিন
                                </button>
                                <div className="mt-3 text-sm text-purple-200">
                                    ২৪/৭ উপলব্ধ • ইন্সট্যান্ট রেসপন্স
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Learning Analytics & Progress */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Progress Analytics */}
                        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    📈 লার্নিং প্রোগ্রেস
                                </h3>
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                    +১৫% উন্নতি
                                </span>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>গণিত</span>
                                        <span>৮৫%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>ইংরেজি</span>
                                        <span>৭২%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '72%' }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>পদার্থবিজ্ঞান</span>
                                        <span>৬৮%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '68%' }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Upcoming Sessions */}
                        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                🗓️ আসন্ন সেশন
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                                            MS
                                        </div>
                                        <div className="ml-3">
                                            <p className="font-medium text-gray-900">মাহেদি স্যার</p>
                                            <p className="text-sm text-gray-600">গণিত - বীজগণিত</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-900">আজ, ৪:০০ PM</p>
                                        <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">৩০ মিনিট</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                                            RS
                                        </div>
                                        <div className="ml-3">
                                            <p className="font-medium text-gray-900">রিয়া ম্যাডাম</p>
                                            <p className="text-sm text-gray-600">ইংরেজি - গ্রামার</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-900">বৃহস্পতিবার, ৬:০০ PM</p>
                                        <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">৬০ মিনিট</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Premium Features Grid */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl shadow-lg p-6 text-white">
                        <h3 className="text-xl font-bold mb-6 text-center">
                            💎 আপনার প্রিমিয়াম সুবিধাসমূহ
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                                <div className="text-2xl mb-2">🚨</div>
                                <h4 className="font-semibold">অসীম ইমার্জেন্সি হেল্প</h4>
                                <p className="text-blue-100 text-sm mt-1">২-মিনিট রেসপন্স</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                                <div className="text-2xl mb-2">🤖</div>
                                <h4 className="font-semibold">এআই লার্নিং অ্যাসিসটেন্ট</h4>
                                <p className="text-blue-100 text-sm mt-1">২৪/৭ উপলব্ধ</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                                <div className="text-2xl mb-2">📊</div>
                                <h4 className="font-semibold">এডভান্সড অ্যানালিটিক্স</h4>
                                <p className="text-blue-100 text-sm mt-1">ডিটেইল্ড রিপোর্ট</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                                <div className="text-2xl mb-2">⭐</div>
                                <h4 className="font-semibold">ভিআইপি সাপোর্ট</h4>
                                <p className="text-blue-100 text-sm mt-1">প্রায়োরিটি হেল্প</p>
                            </div>
                        </div>
                    </div>

                    {/* Upcoming Features Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                                    <span className="text-2xl mr-3">🔮</span>
                                    আসছে খুব শীঘ্রই...
                                </h3>
                                <p className="text-gray-600 mt-1">আমরা আপনার লার্নিং এক্সপেরিয়েন্স আরও উন্নত করছি</p>
                            </div>
                            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                🚀 Development Progress
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Feature 1 - Highest Priority */}
                            <div className="border-2 border-blue-200 rounded-xl p-4 hover:border-blue-300 transition group bg-blue-50/50">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white mr-3">
                                            👥
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">রিয়েল-টাইম কলাবোরেশন</h4>
                                            <p className="text-xs text-gray-600">লাইভ হোয়াইটবোর্ড & কোডিং</p>
                                        </div>
                                    </div>
                                    <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                                        🔥 High Priority
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                                    <span>এস্টিমেটেড: ডিসেম্বর ২০২৪</span>
                                    <span className="font-semibold">৮০% সম্পূর্ণ</span>
                                </div>
                                <div className="w-full bg-blue-200 rounded-full h-2">
                                    <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: '80%' }}></div>
                                </div>
                            </div>

                            {/* Feature 2 - Medium Priority */}
                            <div className="border border-gray-200 rounded-xl p-4 hover:border-green-300 transition group bg-white">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white mr-3">
                                            🤖
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">এডভান্সড এআই ফিচারস</h4>
                                            <p className="text-xs text-gray-600">স্মার্ট লার্নিং অ্যাসিসটেন্ট</p>
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
                        </div>
                    </div>

                    {/* Study Groups, Analytics & Tools */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* 👥 Study Groups Section */}
                        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">👥 স্টাডি গ্রুপস</h3>
                                <button className="text-blue-600 text-sm font-medium hover:text-blue-800">
                                    + নতুন গ্রুপ
                                </button>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                                            G1
                                        </div>
                                        <div className="ml-3">
                                            <p className="font-medium text-gray-900">গণিত মাস্টারি</p>
                                            <p className="text-sm text-gray-600">সদস্য: ১২ জন • সক্রিয়</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">লাইভ</span>
                                        <p className="text-xs text-gray-500 mt-1">৫ মিনিট আগে</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                                            G2
                                        </div>
                                        <div className="ml-3">
                                            <p className="font-medium text-gray-900">ইংরেজি গ্রামার</p>
                                            <p className="text-sm text-gray-600">সদস্য: ৮ জন • আজ ৮:০০ PM</p>
                                        </div>
                                    </div>
                                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition">
                                        জয়েন
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* 📊 Detailed Analytics Link */}
                        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">📈 লার্নিং অ্যানালিটিক্স</h3>
                                <Link
                                    href="/analytics/detailed"
                                    className="text-blue-600 text-sm font-medium hover:text-blue-800 flex items-center"
                                >
                                    বিস্তারিত দেখুন <span className="ml-1">→</span>
                                </Link>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>গণিত</span>
                                        <span className="flex items-center">
                                            ৮৫%
                                            <span className="text-green-600 ml-1">↑</span>
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            className="bg-green-600 h-3 rounded-full transition-all duration-500"
                                            style={{ width: '85%' }}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">গত সপ্তাহে ১০% উন্নতি</p>
                                </div>

                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>ইংরেজি</span>
                                        <span className="flex items-center">
                                            ৭২%
                                            <span className="text-green-600 ml-1">↑</span>
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                                            style={{ width: '72%' }}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">গত সপ্তাহে ৫% উন্নতি</p>
                                </div>
                            </div>
                        </div>

                        {/* 🔧 Advanced Tools Panel */}
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-lg font-semibold mb-4 text-center">🔧 অ্যাডভান্সড টুলস</h3>

                            <div className="grid grid-cols-2 gap-3">
                                <button className="bg-white/10 hover:bg-white/20 p-4 rounded-xl transition text-center backdrop-blur-sm">
                                    <span className="block text-2xl mb-2">📝</span>
                                    <span className="text-sm font-medium">স্মার্ট নোটস</span>
                                    <span className="text-xs text-gray-300 block mt-1">AI সহায়তা</span>
                                </button>

                                <button className="bg-white/10 hover:bg-white/20 p-4 rounded-xl transition text-center backdrop-blur-sm">
                                    <span className="block text-2xl mb-2">🎯</span>
                                    <span className="text-sm font-medium">কুইজ মেকার</span>
                                    <span className="text-xs text-gray-300 block mt-1">স্বয়ংক্রিয়</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity & Quick Resources */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Recent Activity */}
                        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                📝 সাম্প্রতিক এক্টিভিটি
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white mr-3">
                                        ✓
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">গণিত সেশন সম্পন্ন</p>
                                        <p className="text-sm text-gray-600">মাহেদি স্যারের সাথে • ৩০ মিনিট</p>
                                    </div>
                                    <span className="ml-auto text-sm text-gray-500">২ ঘণ্টা আগে</span>
                                </div>

                                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white mr-3">
                                        ⭐
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">৫-স্টার রেটিং দিয়েছেন</p>
                                        <p className="text-sm text-gray-600">রিয়া ম্যাডামকে • ইংরেজি সেশন</p>
                                    </div>
                                    <span className="ml-auto text-sm text-gray-500">১ দিন আগে</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Resources */}
                        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                📚 দ্রুত রিসোর্সেস
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                <button className="bg-blue-50 hover:bg-blue-100 py-3 px-4 rounded-lg transition text-center">
                                    <span className="block text-xl mb-1">📊</span>
                                    <span className="text-sm font-medium">গণিত ফর্মুলা</span>
                                </button>
                                <button className="bg-green-50 hover:bg-green-100 py-3 px-4 rounded-lg transition text-center">
                                    <span className="block text-xl mb-1">🔬</span>
                                    <span className="text-sm font-medium">সায়েন্স নোটস</span>
                                </button>
                                <button className="bg-purple-50 hover:bg-purple-100 py-3 px-4 rounded-lg transition text-center">
                                    <span className="block text-xl mb-1">📝</span>
                                    <span className="text-sm font-medium">গ্রামার গাইড</span>
                                </button>
                                <button className="bg-red-50 hover:bg-red-100 py-3 px-4 rounded-lg transition text-center">
                                    <span className="block text-xl mb-1">🎯</span>
                                    <span className="text-sm font-medium">এক্সাম টিপস</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Achievement & Rewards */}
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl shadow-lg p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold mb-2">🏆 আপনার অ্যাচিভমেন্ট</h3>
                                <p className="text-yellow-100">আপনি ৭টি ব্যাজ অর্জন করেছেন!</p>
                            </div>
                            <div className="flex space-x-2">
                                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                                    <span className="text-xl">⭐</span>
                                </div>
                                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                                    <span className="text-xl">🚀</span>
                                </div>
                                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                                    <span className="text-xl">🎯</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}