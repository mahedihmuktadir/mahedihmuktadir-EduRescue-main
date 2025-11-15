// src/app/resources/my-library/page.tsx - MVP Version
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function MyLibraryPage() {
    const session = await getServerSession(authOptions as any)

    if (!session?.user) {
        redirect('/auth/signin?redirect=/resources/my-library')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Same Navigation as Resources Page */}

            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="space-y-6">

                    {/* Header */}
                    <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                                    <span className="text-2xl mr-3">📚</span>
                                    আমার লাইব্রেরি
                                </h1>
                                <p className="text-gray-600 mt-1">আপনার সেভ করা সব রিসোর্স একসাথে</p>
                            </div>
                            <div className="flex space-x-3">
                                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                                    <option>সব বিষয়</option>
                                    <option>গণিত</option>
                                    <option>ইংরেজি</option>
                                </select>
                                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                                    <option>সম্প্রতি যোগ করা</option>
                                    <option>সবচেয়ে ব্যবহৃত</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Empty State - যখন কোনো রিসোর্স সেভ করা থাকবে না */}
                    <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-12 text-center">
                        <div className="text-6xl mb-4">📚</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">আপনার লাইব্রেরি খালি</h3>
                        <p className="text-gray-600 mb-6">রিসোর্স লাইব্রেরি থেকে রিসোর্স সেভ করুন</p>
                        <Link
                            href="/resources"
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition inline-flex items-center"
                        >
                            <span className="mr-2">🔍</span>
                            রিসোর্স ব্রাউজ করুন
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    )
}