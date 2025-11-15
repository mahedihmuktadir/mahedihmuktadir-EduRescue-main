// src/components/DailyRescueRoutine.tsx
export default function DailyRescueRoutine() {
    const dailyTasks = [
        {
            id: 1,
            title: "২-মিনিট কুইক সলভ",
            description: "AI curated math problem",
            icon: "⚡",
            xp: 50,
            completed: false
        },
        {
            id: 2,
            title: "স্মার্ট রিভিশন",
            description: "গতকালের পড়া revision",
            icon: "📚",
            xp: 30,
            completed: false
        },
        {
            id: 3,
            title: "কমিউনিটি হেল্প",
            description: "১টি প্রশ্নের উত্তর দিন",
            icon: "👥",
            xp: 20,
            completed: false
        }
    ];

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <span className="text-xl mr-2">🔥</span>
                    আজকের রেসকিউ রুটিন
                </h3>
                <div className="flex items-center space-x-2">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                        🔥 ৭-দিন স্ট্রীক
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                        🪙 ১০০ কয়েন
                    </span>
                </div>
            </div>

            <div className="space-y-3">
                {dailyTasks.map((task) => (
                    <div key={task.id} className={`flex items-center justify-between p-3 rounded-lg border ${task.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                        }`}>
                        <div className="flex items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${task.completed ? 'bg-green-500' : 'bg-gray-300'
                                }`}>
                                <span className="text-white text-lg">{task.icon}</span>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">{task.title}</p>
                                <p className="text-sm text-gray-600">{task.description}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium">
                                +{task.xp} XP
                            </span>
                            {!task.completed && (
                                <button className="ml-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition">
                                    শুরু করুন
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Rescue Shield */}
            <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <span className="text-purple-600 text-lg mr-2">🛡️</span>
                        <div>
                            <p className="font-medium text-purple-900">রেসকিউ শিল্ড</p>
                            <p className="text-sm text-purple-700">স্ট্রীক না হারানোর গ্যারান্টি</p>
                        </div>
                    </div>
                    <button className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 transition">
                        সক্রিয় করুন
                    </button>
                </div>
            </div>
        </div>
    );
}