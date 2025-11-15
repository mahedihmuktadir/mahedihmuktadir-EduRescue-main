// src/components/emergency/MatchingStatus.tsx
'use client';

import { useState, useEffect } from 'react';
import { checkMatchingStatus, processRefund } from '@/app/emergency/actions';

interface MatchingStatusProps {
    session: any;
    onComplete: (success: boolean) => void;
    onCancel: () => void;
}

export default function MatchingStatus({ session, onComplete, onCancel }: MatchingStatusProps) {
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
    const [queuePosition, setQueuePosition] = useState<number | null>(null);
    const [expert, setExpert] = useState<any>(null);
    const [status, setStatus] = useState<'searching' | 'extended' | 'matched' | 'failed'>('searching');
    const [refundProcessed, setRefundProcessed] = useState(false);

    useEffect(() => {
        // Countdown timer
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleTimeUp();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        // Check matching status every 10 seconds
        const matchingInterval = setInterval(() => {
            checkMatchingStatus(session.id).then(result => {
                if (result.success) {
                    if (result.matched && result.expert) {
                        setExpert(result.expert);
                        setStatus('matched');
                        clearInterval(matchingInterval);
                        setTimeout(() => onComplete(true), 2000);
                    } else {
                        setQueuePosition(result.queuePosition || null);
                        if (timeLeft <= 120 && status === 'searching') {
                            setStatus('extended');
                        }
                    }
                }
            });
        }, 10000);

        return () => {
            clearInterval(timer);
            clearInterval(matchingInterval);
        };
    }, [session.id, timeLeft, status, onComplete]);

    const handleTimeUp = async () => {
        if (!expert && !refundProcessed) {
            setStatus('failed');
            // Auto-process refund
            const refundResult = await processRefund(session.id, 'no_expert');
            if (refundResult.success) {
                setRefundProcessed(true);
                setTimeout(() => onComplete(false), 3000);
            }
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const getStatusColor = () => {
        switch (status) {
            case 'searching': return 'text-blue-600';
            case 'extended': return 'text-yellow-600';
            case 'matched': return 'text-green-600';
            case 'failed': return 'text-red-600';
            default: return 'text-blue-600';
        }
    };

    const getStatusText = () => {
        switch (status) {
            case 'searching': return 'এক্সপার্ট খুঁজছি...';
            case 'extended': return 'এক্সপার্ট সার্চ এক্সটেন্ড করা হয়েছে';
            case 'matched': return 'এক্সপার্ট পাওয়া গেছে!';
            case 'failed': return 'কোনো এক্সপার্ট পাওয়া যায়নি';
            default: return 'এক্সপার্ট খুঁজছি...';
        }
    };

    if (status === 'matched' && expert) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                        ✅
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">এক্সপার্ট পাওয়া গেছে!</h1>

                    <div className="bg-green-50 rounded-xl p-4 mb-6">
                        <div className="flex items-center space-x-3 mb-3">
                            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                                {expert.name.charAt(0)}
                            </div>
                            <div className="text-left">
                                <h3 className="font-semibold text-gray-900">{expert.name}</h3>
                                <p className="text-sm text-gray-600">রেটিং: {expert.rating}/5</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600">
                            গড় রেসপন্স টাইম: {expert.responseTime} সেকেন্ড
                        </p>
                    </div>

                    <div className="animate-pulse text-green-600 font-semibold mb-6">
                        চ্যাট সেশন শুরু হচ্ছে...
                    </div>
                </div>
            </div>
        );
    }

    if (status === 'failed') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                        ⚠️
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">দুঃখিত!</h1>
                    <p className="text-gray-600 mb-4">
                        বর্তমানে কোনো এক্সপার্ট available নেই। আমরা আপনার payment automatically refund process করেছি।
                    </p>

                    {refundProcessed && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                            <p className="text-sm text-green-700">
                                ✅ Refund initiated: ৳{session.paymentAmount} will be returned within 2 hours.
                            </p>
                        </div>
                    )}

                    <div className="space-y-3">
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition"
                        >
                            🔄 আবার চেষ্টা করুন
                        </button>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="w-full bg-gray-500 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition"
                        >
                            🏠 হোমপেজে ফিরে যান
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <nav className="bg-white/80 backdrop-blur-md border-b border-blue-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-lg font-bold text-xl">
                                🔍 ম্যাচিং
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-lg border border-blue-200 p-8 text-center">
                    {/* Animated Search Icon */}
                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <div className="text-4xl animate-bounce">🔍</div>
                    </div>

                    {/* Status */}
                    <h1 className={`text-3xl font-bold mb-4 ${getStatusColor()}`}>
                        {getStatusText()}
                    </h1>

                    {/* Countdown Timer */}
                    <div className="text-6xl font-bold text-blue-600 mb-6">
                        {formatTime(timeLeft)}
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                        <div
                            className="bg-blue-600 h-3 rounded-full transition-all duration-1000"
                            style={{ width: `${((300 - timeLeft) / 300) * 100}%` }}
                        ></div>
                    </div>

                    {/* Queue Information */}
                    {queuePosition && (
                        <div className="bg-blue-50 rounded-xl p-4 mb-6">
                            <p className="text-blue-700 font-semibold">
                                🎯 আপনার turn: #{queuePosition} in queue
                            </p>
                            <p className="text-sm text-blue-600 mt-1">
                                Estimated wait: ~{Math.ceil(timeLeft / 60)} minutes
                            </p>
                        </div>
                    )}

                    {/* Extended Search Notice */}
                    {status === 'extended' && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                            <p className="text-yellow-700 font-semibold">
                                ⏳ সার্চ এক্সটেন্ড করা হয়েছে
                            </p>
                            <p className="text-sm text-yellow-600 mt-1">
                                আমরা আরও ২ মিনিট এক্সপার্ট খুঁজছি। না পেলে auto-refund।
                            </p>
                        </div>
                    )}

                    {/* Guarantee Notice */}
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                        <p className="text-green-700 font-semibold">
                            🛡️ ৫ মিনিটের মধ্যে এক্সপার্ট না পেলে ফুল রিফান্ড
                        </p>
                    </div>

                    {/* Cancel Option */}
                    <button
                        onClick={onCancel}
                        className="text-red-600 hover:text-red-700 font-semibold transition"
                    >
                        ❌ বাতিল করুন এবং refund নিন
                    </button>
                </div>
            </div>
        </div>
    );
}