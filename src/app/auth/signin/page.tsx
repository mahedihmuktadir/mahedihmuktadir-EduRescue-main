'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SignInPage() {
    const sp = useSearchParams();
    // optional redirect from query, e.g. /signin?redirect=/student/my-courses
    const redirectParam = sp.get('redirect') || '';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // NextAuth will handle navigation when redirect: true
    const callbackUrl = redirectParam
        ? `/auth/redirect?redirect=${encodeURIComponent(redirectParam)}`
        : '/auth/redirect';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await signIn('credentials', {
                email: email.trim().toLowerCase(),
                password: password.trim(),
                redirect: true,        // let NextAuth redirect automatically
                callbackUrl,           // role-based router lives here
            });

            // redirect:true হলে সাধারণত এখানে কন্ট্রোল ফেরে না;
            // error হলে res?.error আসতে পারে (কিছু অ্যাডাপ্টারে)
            if (res?.error) setError('Invalid credentials. Try: student@edurescue.com / password');
        } catch {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div>
                    <div className="mx-auto h-12 w-auto flex justify-center">
                        <div className="bg-green-600 text-white p-2 rounded-lg font-bold text-xl">
                            EduRescue
                        </div>
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        আপনার অ্যাকাউন্টে সাইন ইন করুন
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        অথবা{' '}
                        <Link href="/" className="font-medium text-green-600 hover:text-green-500">
                            মূল পাতায় ফিরে যান
                        </Link>
                    </p>
                </div>

                {/* Demo Credentials Banner */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M8.257 3.099a1 1 0 011.486 0l5.58 9.92A2 2 0 0113.58 17H4.42a2 2 0 01-1.743-3.98l5.58-9.92zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-8a1 1 0 00-1 1v3a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-yellow-800">ডেমো ক্রেডেনশিয়াল</h3>
                            <div className="mt-1 text-sm text-yellow-700">
                                <p>ইমেইল: <strong>student@edurescue.com</strong></p>
                                <p>পাসওয়ার্ড: <strong>password</strong></p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sign-in Form */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                            {error}
                        </div>
                    )}

                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">ইমেইল এড্রেস</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                placeholder="ইমেইল এড্রেস"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">পাসওয়ার্ড</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                placeholder="পাসওয়ার্ড"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center space-x-2 text-sm text-gray-900">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                            <span>আমাকে মনে রাখুন</span>
                        </label>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-green-600 hover:text-green-500">
                                পাসওয়ার্ড ভুলে গেছেন?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center">
                                    {/* fixed spinner svg (আগেরটা টাইপো ছিল) */}
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                        />
                                    </svg>
                                    সাইন ইন হচ্ছে...
                                </span>
                            ) : (
                                'সাইন ইন করুন'
                            )}
                        </button>
                    </div>

                    <div className="text-center">
                        <span className="text-sm text-gray-600">
                            অ্যাকাউন্ট নেই?{' '}
                            <Link href="/auth/signup" className="font-medium text-green-600 hover:text-green-500">
                                নিবন্ধন করুন
                            </Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}
