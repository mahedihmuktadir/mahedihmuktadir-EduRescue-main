// src/components/emergency/EthicalGuidelines.tsx
export default function EthicalGuidelines() {
    return (
        <div className="bg-white rounded-2xl border border-red-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <span className="text-red-500 mr-2">⚖️</span>
                একাডেমিক সততা নীতি
            </h3>

            <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                    <span className="text-green-500 mt-0.5">✅</span>
                    <span>
                        <strong>শিখন ফোকাস:</strong> এক্সপার্টরা ধারণা বুঝিয়ে দেবেন, সরাসরি উত্তর দেবেন না
                    </span>
                </div>

                <div className="flex items-start space-x-2">
                    <span className="text-green-500 mt-0.5">✅</span>
                    <span>
                        <strong>স্টেপ বাই স্টেপ:</strong> সমস্যা সমাধানের পদ্ধতি শেখানো হবে
                    </span>
                </div>

                <div className="flex items-start space-x-2">
                    <span className="text-red-500 mt-0.5">❌</span>
                    <span>
                        <strong>নো চিটিং:</strong> লাইভ এক্সাম বা টেস্টে সাহায্য করা হয় না
                    </span>
                </div>

                <div className="flex items-start space-x-2">
                    <span className="text-red-500 mt-0.5">❌</span>
                    <span>
                        <strong>নো ডিরেক্ট আন্সার:</strong> সম্পূর্ণ অ্যাসাইনমেন্ট করা হয় না
                    </span>
                </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs text-blue-700 text-center">
                    <strong>আমাদের লক্ষ্য:</strong> আপনাকে স্বাবলম্বী learner হিসেবে গড়ে তোলা,
                    শুধু উত্তর দেওয়া নয়
                </p>
            </div>
        </div>
    );
}