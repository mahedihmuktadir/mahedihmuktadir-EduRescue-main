// src/components/emergency/EmergencyBooking.tsx
'use client';

import { useState } from 'react';
import { createEmergencySession } from '@/app/emergency/actions';
import MatchingStatus from './MatchingStatus';
import EthicalGuidelines from './EthicalGuidelines';
import PaymentFlow from './PaymentFlow';

interface EmergencyBookingClientProps {
    session: any;
}

export default function EmergencyBookingClient({ session }: EmergencyBookingClientProps) {
    const [step, setStep] = useState<'subject' | 'payment' | 'matching' | 'success' | 'failed'>('subject');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedUrgency, setSelectedUrgency] = useState<'low' | 'medium' | 'high'>('medium');
    const [currentSession, setCurrentSession] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    const subjects = [
        { id: 'math', name: 'গণিত', icon: '🧮' },
        { id: 'physics', name: 'পদার্থবিজ্ঞান', icon: '🔬' },
        { id: 'chemistry', name: 'রসায়ন', icon: '🧪' },
        { id: 'biology', name: 'জীববিজ্ঞান', icon: '🧬' },
        { id: 'english', name: 'ইংরেজি', icon: '📚' },
        { id: 'programming', name: 'প্রোগ্রামিং', icon: '💻' }
    ];

    const handleSubjectSelect = (subjectId: string) => {
        setSelectedSubject(subjectId);
        setStep('payment');
    };

    const handleStartEmergency = async () => {
        setIsLoading(true);

        const result = await createEmergencySession(selectedSubject, selectedUrgency);

        if (result.success) {
            setCurrentSession(result.session);
            setStep('matching');
        } else {
            // Handle error
            console.error(result.error);
        }

        setIsLoading(false);
    };

    const handleMatchingComplete = (success: boolean) => {
        setStep(success ? 'success' : 'failed');
    };

    if (step === 'subject') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100">
                {/* Navigation */}
                <nav className="bg-white/80 backdrop-blur-md border-b border-red-200 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-2 rounded-lg font-bold text-xl">
                                    🚨 ইমার্জেন্সি হেল্প
                                </div>
                                <div className="ml-4 flex items-center space-x-6">
                                    <span className="text-gray-700 font-semibold">দ্রুত এক্সপার্ট হেল্প</span>
                                    <div className="flex space-x-1">
                                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                            💎 প্রিমিয়াম
                                        </span>
                                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                                            জরুরি
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            🚨 ইমার্জেন্সি একাডেমিক হেল্প
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            ৫-মিনিটের মধ্যে একজন ভেরিফাইড এক্সপার্টের সাথে কানেক্ট হোন।
                            এক্সাম, অ্যাসাইনমেন্ট, বা যেকোনো জরুরি সমস্যার সমাধান পান এখনই।
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Subject Selection */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl shadow-lg border border-red-200 p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    কোন বিষয়ে সাহায্য প্রয়োজন?
                                </h2>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                                    {subjects.map((subject) => (
                                        <button
                                            key={subject.id}
                                            onClick={() => handleSubjectSelect(subject.id)}
                                            className={`p-4 rounded-xl border-2 transition-all duration-200 ${selectedSubject === subject.id
                                                    ? 'border-red-500 bg-red-50 transform scale-105'
                                                    : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
                                                }`}
                                        >
                                            <div className="text-2xl mb-2">{subject.icon}</div>
                                            <div className="font-semibold text-gray-900">{subject.name}</div>
                                        </button>
                                    ))}
                                </div>

                                {/* Urgency Selection */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        জরুরিতার уровень:
                                    </h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        <button
                                            onClick={() => setSelectedUrgency('low')}
                                            className={`p-3 rounded-lg border-2 transition-all ${selectedUrgency === 'low'
                                                    ? 'border-green-500 bg-green-50'
                                                    : 'border-gray-200 hover:border-green-300'
                                                }`}
                                        >
                                            <div className="text-lg">🟢</div>
                                            <div className="font-medium text-sm">সাধারণ</div>
                                            <div className="text-xs text-gray-600">৳৯৯</div>
                                        </button>

                                        <button
                                            onClick={() => setSelectedUrgency('medium')}
                                            className={`p-3 rounded-lg border-2 transition-all ${selectedUrgency === 'medium'
                                                    ? 'border-yellow-500 bg-yellow-50'
                                                    : 'border-gray-200 hover:border-yellow-300'
                                                }`}
                                        >
                                            <div className="text-lg">🟡</div>
                                            <div className="font-medium text-sm">জরুরি</div>
                                            <div className="text-xs text-gray-600">৳১২৯</div>
                                        </button>

                                        <button
                                            onClick={() => setSelectedUrgency('high')}
                                            className={`p-3 rounded-lg border-2 transition-all ${selectedUrgency === 'high'
                                                    ? 'border-red-500 bg-red-50'
                                                    : 'border-gray-200 hover:border-red-300'
                                                }`}
                                        >
                                            <div className="text-lg">🔴</div>
                                            <div className="font-medium text-sm">অতি জরুরি</div>
                                            <div className="text-xs text-gray-600">৳১৯৯</div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar - Features & Guidelines */}
                        <div className="space-y-6">
                            <EthicalGuidelines />

                            {/* Quick Stats */}
                            <div className="bg-white rounded-2xl border border-blue-200 p-6">
                                <h3 className="font-semibold text-gray-900 mb-4">📊 লাইভ স্ট্যাটস</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">সক্রিয় এক্সপার্ট</span>
                                        <span className="font-semibold text-green-600">৪৭ জন</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">গড় অপেক্ষার সময়</span>
                                        <span className="font-semibold text-blue-600">২ মিনিট</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">সেশন সাফল্যের হার</span>
                                        <span className="font-semibold text-purple-600">৯৫%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (step === 'payment') {
        return (
            <PaymentFlow
                subject={selectedSubject}
                urgency={selectedUrgency}
                onConfirm={handleStartEmergency}
                onBack={() => setStep('subject')}
                isLoading={isLoading}
            />
        );
    }

    if (step === 'matching' && currentSession) {
        return (
            <MatchingStatus
                session={currentSession}
                onComplete={handleMatchingComplete}
                onCancel={() => setStep('failed')}
            />
        );
    }

    if (step === 'success') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                        ✅
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">সফলভাবে কানেক্ট!</h1>
                    <p className="text-gray-600 mb-6">
                        আপনি একজন এক্সপার্টের সাথে সফলভাবে কানেক্ট হয়েছেন। এখনই চ্যাট শুরু করুন এবং আপনার সমস্যার সমাধান পান।
                    </p>
                    <button
                        onClick={() => window.location.href = '/chat'}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-xl font-bold text-lg hover:shadow-lg transition"
                    >
                        💬 চ্যাট শুরু করুন
                    </button>
                </div>
            </div>
        );
    }

    if (step === 'failed') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                        ⚠️
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">কোনো এক্সপার্ট পাওয়া যায়নি</h1>
                    <p className="text-gray-600 mb-4">
                        আমরা আন্তরিকভাবে দুঃখিত। বর্তমানে কোনো এক্সপার্ট available নেই। আপনার payment automatically refund process শুরু হয়েছে।
                    </p>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                        <p className="text-sm text-yellow-800">
                            💰 <strong>Refund Status:</strong> আপনার ৳{currentSession?.paymentAmount}
                            amount টি ২ ঘন্টার মধ্যে আপনার bKash/Nagad এ ফেরত দেওয়া হবে।
                        </p>
                    </div>
                    <div className="space-y-3">
                        <button
                            onClick={() => setStep('subject')}
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl font-bold hover:shadow-lg transition"
                        >
                            🔄 আবার চেষ্টা করুন
                        </button>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="w-full bg-gray-500 text-white py-3 px-4 rounded-xl font-bold hover:shadow-lg transition"
                        >
                            🏠 হোমপেজে ফিরে যান
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}