// src/components/emergency/PaymentFlow.tsx
'use client';

interface PaymentFlowProps {
    subject: string;
    urgency: 'low' | 'medium' | 'high';
    onConfirm: () => void;
    onBack: () => void;
    isLoading: boolean;
}

export default function PaymentFlow({ subject, urgency, onConfirm, onBack, isLoading }: PaymentFlowProps) {
    const getAmount = () => {
        switch (urgency) {
            case 'low': return 99;
            case 'medium': return 129;
            case 'high': return 199;
            default: return 99;
        }
    };

    const getUrgencyText = () => {
        switch (urgency) {
            case 'low': return 'সাধারণ';
            case 'medium': return 'জরুরি';
            case 'high': return 'অতি জরুরি';
            default: return 'সাধারণ';
        }
    };

    const subjectsMap: { [key: string]: string } = {
        'math': 'গণিত',
        'physics': 'পদার্থবিজ্ঞান',
        'chemistry': 'রসায়ন',
        'biology': 'জীববিজ্ঞান',
        'english': 'ইংরেজি',
        'programming': 'প্রোগ্রামিং'
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <nav className="bg-white/80 backdrop-blur-md border-b border-blue-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-lg font-bold text-xl">
                                💳 পেমেন্ট
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-lg border border-blue-200 p-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                        পেমেন্ট কনফার্মেশন
                    </h1>

                    {/* Order Summary */}
                    <div className="bg-gray-50 rounded-xl p-6 mb-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">অর্ডার সারাংশ</h2>

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">সেবা</span>
                                <span className="font-medium">ইমার্জেন্সি একাডেমিক হেল্প</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600">বিষয়</span>
                                <span className="font-medium">{subjectsMap[subject]}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600">জরুরিতার уровень</span>
                                <span className="font-medium">{getUrgencyText()}</span>
                            </div>

                            <div className="flex justify-between pt-3 border-t border-gray-200">
                                <span className="text-gray-600">সেশন সময়</span>
                                <span className="font-medium">৩০ মিনিট</span>
                            </div>

                            <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200">
                                <span>মোট পেমেন্ট</span>
                                <span className="text-green-600">৳{getAmount()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">পেমেন্ট মেথড</h3>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <button className="p-4 border-2 border-green-500 bg-green-50 rounded-xl text-center">
                                <div className="text-2xl mb-2">💰</div>
                                <div className="font-semibold text-green-700">bKash</div>
                            </button>

                            <button className="p-4 border-2 border-blue-500 bg-blue-50 rounded-xl text-center">
                                <div className="text-2xl mb-2">💳</div>
                                <div className="font-semibold text-blue-700">Nagad</div>
                            </button>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                            <button className="p-3 border border-gray-200 rounded-lg text-center">
                                <div className="text-sm">🚀</div>
                                <div className="text-xs text-gray-600">Rocket</div>
                            </button>

                            <button className="p-3 border border-gray-200 rounded-lg text-center">
                                <div className="text-sm">💳</div>
                                <div className="text-xs text-gray-600">কার্ড</div>
                            </button>

                            <button className="p-3 border border-gray-200 rounded-lg text-center">
                                <div className="text-sm">🏦</div>
                                <div className="text-xs text-gray-600">ব্যাংক</div>
                            </button>
                        </div>
                    </div>

                    {/* Guarantee Section */}
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl p-4 mb-6">
                        <h3 className="font-semibold mb-2 flex items-center">
                            <span className="mr-2">🛡️</span>
                            আমাদের গ্যারান্টি
                        </h3>
                        <ul className="text-sm space-y-1">
                            <li>✅ ৫ মিনিটের মধ্যে এক্সপার্ট না পেলে ফুল রিফান্ড</li>
                            <li>✅ সেশন不满意 হলে ফুল রিফান্ড</li>
                            <li>✅ ১০০% সুরক্ষিত পেমেন্ট</li>
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4">
                        <button
                            onClick={onBack}
                            disabled={isLoading}
                            className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-gray-600 transition disabled:opacity-50"
                        >
                            ↩️ ফিরে যান
                        </button>

                        <button
                            onClick={onConfirm}
                            disabled={isLoading}
                            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-xl font-bold hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    প্রসেসিং...
                                </>
                            ) : (
                                <>
                                    💳 ৳{getAmount()} পেমেন্ট করুন
                                </>
                            )}
                        </button>
                    </div>

                    {/* Security Notice */}
                    <div className="text-center mt-4">
                        <p className="text-xs text-gray-500">
                            🔒 আপনার পেমেন্ট তথ্য সম্পূর্ণ সুরক্ষিত। SSL এনক্রিপশন দ্বারা সুরক্ষিত।
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}