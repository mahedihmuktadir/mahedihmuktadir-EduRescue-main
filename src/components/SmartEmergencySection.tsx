// src/components/SmartEmergencySection.tsx
export default function SmartEmergencySection({ userPlan = 'free' }) {
    const freeUserLimits = {
        dailySessions: 2,
        usedToday: 1,
        remaining: 1
    };

    const paidBenefits = [
        "অসীম ইমার্জেন্সি সেশন",
        "প্রায়োরিটি এক্সপার্ট এক্সেস",
        "ইন্সট্যান্ট আন্সার গ্যারান্টি",
        "এড-ফ্রি এক্সপেরিয়েন্স"
    ];

    return (
        <div className="bg-gradient-to-br from-red-500 to-pink-600 text-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🚨</span>
                </div>

                <h3 className="text-xl font-bold mb-2">স্মার্ট ইমার্জেন্সি হেল্প</h3>

                {/* Free User Limits */}
                {userPlan === 'free' && (
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mb-4">
                        <div className="flex justify-between items-center text-sm">
                            <span>আজকের ব্যালেন্স:</span>
                            <span className="font-bold">{freeUserLimits.remaining} / {freeUserLimits.dailySessions} সেশন</span>
                        </div>
                        <div className="w-full bg-white/30 rounded-full h-2 mt-2">
                            <div
                                className="bg-green-400 h-2 rounded-full"
                                style={{ width: `${(freeUserLimits.remaining / freeUserLimits.dailySessions) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                <p className="text-red-100 mb-4">
                    {userPlan === 'free'
                        ? "৫-মিনিট এক্সপার্ট কানেকশন • ৳৯৯/সেশন"
                        : "প্রায়োরিটি এক্সেস • ২-মিনিট রেসপন্স"
                    }
                </p>

                <button className="w-full bg-white text-red-600 py-3 px-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition transform hover:scale-105 mb-3">
                    {userPlan === 'free' ? "🚨 এখনই সাহায্য নিন (৳৯৯)" : "🚨 প্রায়োরিটি হেল্প নিন"}
                </button>

                {/* Smart Paywall Preview */}
                {userPlan === 'free' && (
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm">প্রিমিয়াম সুবিধা:</span>
                            <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition">
                                ৳৯৯৯/মাস
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            {paidBenefits.map((benefit, index) => (
                                <div key={index} className="flex items-center">
                                    <span className="text-green-400 mr-1">✓</span>
                                    {benefit}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Watch Ad for Credit */}
                {userPlan === 'free' && freeUserLimits.remaining === 0 && (
                    <button className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-yellow-600 transition mt-3 flex items-center justify-center">
                        <span className="mr-2">📺</span>
                        এড দেখে ১ সেশন ফ্রি পান
                    </button>
                )}
            </div>
        </div>
    );
}