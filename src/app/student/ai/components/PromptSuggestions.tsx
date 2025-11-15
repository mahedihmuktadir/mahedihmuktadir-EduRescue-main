// src/app/student/ai/components/PromptSuggestions.tsx
'use client';

interface PromptSuggestionsProps {
    onSuggestionClick: (text: string) => void;
}

export default function PromptSuggestions({ onSuggestionClick }: PromptSuggestionsProps) {
    const suggestions = [
        'গণিত সমস্যা বুঝতে পারছি না',
        'ইংরেজি গ্রামার help লাগবে',
        'Exam preparation plan বানাও',
        'বিজ্ঞান ল্যাব রিপোর্ট করতে সাহায্য করুন'
    ];

    return (
        <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
                <button
                    key={index}
                    onClick={() => onSuggestionClick(suggestion)}
                    className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition text-nowrap"
                >
                    {suggestion}
                </button>
            ))}
        </div>
    );
}