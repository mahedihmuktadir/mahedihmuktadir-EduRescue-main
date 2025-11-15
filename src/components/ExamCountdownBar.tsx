// src/components/ExamCountdownBar.tsx
export default function ExamCountdownBar() {
    const exams = [
        { name: "এসএসসি", days: 32, color: "bg-red-500" },
        { name: "এইচএসসি", days: 64, color: "bg-blue-500" },
        { name: "ভর্তি পরীক্ষা", days: 45, color: "bg-green-500" }
    ];

    const nearestExam = exams[0]; // Get nearest exam

    return (
        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-2 px-4 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
                <div className="flex items-center mb-2 sm:mb-0">
                    <span className="text-lg mr-2">⏰</span>
                    <span className="font-semibold">{nearestExam.name} এক্সাম:</span>
                    <span className="ml-2 font-bold">{nearestExam.days} দিন বাকি</span>
                </div>

                <div className="flex items-center space-x-4 text-sm">
                    <span>বুস্টার প্ল্যান (২৮% ছাড়)</span>
                    <button className="bg-white text-red-600 px-3 py-1 rounded-lg font-semibold hover:bg-gray-100 transition">
                        এখনই কিনুন
                    </button>
                </div>
            </div>
        </div>
    );
}