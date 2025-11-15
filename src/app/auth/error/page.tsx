'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function AuthErrorPage() {
    useEffect(() => {
        console.log('Auth error occurred')
    }, [])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <div className="mx-auto h-12 w-auto flex justify-center">
                        <div className="bg-red-600 text-white p-2 rounded-lg font-bold text-xl">
                            ⚠️
                        </div>
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Authentication Error
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        সাইন ইন প্রসেসে সমস্যা হয়েছে
                    </p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">
                                Authentication Failed
                            </h3>
                            <p className="text-sm text-red-700 mt-1">
                                দয়া করে আবার চেষ্টা করুন বা সাপোর্টে যোগাযোগ করুন
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <Link
                        href="/auth/signin"
                        className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition font-semibold block text-center"
                    >
                        সাইন ইন পেজে ফিরে যান
                    </Link>

                    <Link
                        href="/"
                        className="w-full bg-gray-600 text-white py-3 px-4 rounded-md hover:bg-gray-700 transition font-semibold block text-center"
                    >
                        হোম পেজে যান
                    </Link>
                </div>

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        সমস্যা চলতে থাকলে{' '}
                        <a href="mailto:support@edurescue.com" className="font-medium text-green-600 hover:text-green-500">
                            সাপোর্টে যোগাযোগ করুন
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}