// src/components/StudyAnalytics.tsx
export default function StudyAnalytics() {
    const studyData = [
        { day: 'সোম', minutes: 45, emergency: 1 },
        { day: 'মঙ্গল', minutes: 60, emergency: 0 },
        { day: 'বুধ', minutes: 30, emergency: 2 },
        { day: 'বৃহস্পতি', minutes: 90, emergency: 1 },
        { day: 'শুক্র', minutes: 20, emergency: 0 },
        { day: 'শনি', minutes: 75, emergency: 1 },
        { day: 'রবি', minutes: 0, emergency: 0 }
    ];

    const examPressure = {
        level: "Increasing Pressure",
        daysLeft: 32,
        message: "এসএসসি এক্সাম - ৩২ দিন বাকি",
        recommendation: "প্রতিদিন ২ ঘন্টা গণিত অনুশীলন করুন"
    };

    const getPressureColor = (level: string) => {
        switch (level) {
            case 'Low pressure': return 'bg-green-100 text-green-800';
            case 'Increasing pressure': return 'bg-yellow-100 text-yellow-800';
            case 'High pressure': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Study Heatmap */}
            <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="text-xl mr-2">📊</span>
                    স্টাডি হিটম্যাপ
                </h3>
                <div className="grid grid-cols-7 gap-1 mb-4">
                    {studyData.map((day, index) => (
                        <div key={index} className="text-center">
                            <div className={`h-8 rounded mb-1 ${day.minutes === 0 ? 'bg-gray-200' :
                                    day.minutes < 30 ? 'bg-green-300' :
                                        day.minutes < 60 ? 'bg-green-500' : 'bg-green-700'
                                }`}></div>
                            <div className="text-xs text-gray-600">{day.day}</div>
                            <div className="text-xs text-gray-500">{day.minutes}মি</div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                    <span>কম স্টাডি</span>
                    <span>মাঝারি</span>
                    <span>ব্যাস্ত দিন</span>
                </div>
            </div>

            {/* Exam Pressure Meter */}
            <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="text-xl mr-2">🎯</span>
                    এক্সাম প্রেশার মিটার
                </h3>

                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${getPressureColor(examPressure.level)}`}>
                    {examPressure.level}
                </div>

                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <div className="text-center mb-3">
                        <div className="text-2xl font-bold text-blue-600">{examPressure.daysLeft} দিন</div>
                        <div className="text-sm text-blue-800">{examPressure.message}</div>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-red-600 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${100 - (examPressure.daysLeft / 90 * 100)}%` }}
                        ></div>
                    </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-sm text-green-800 font-medium">🤖 AI সুপারিশ:</p>
                    <p className="text-green-700 text-sm mt-1">{examPressure.recommendation}</p>
                </div>
            </div>
        </div>
    );
}