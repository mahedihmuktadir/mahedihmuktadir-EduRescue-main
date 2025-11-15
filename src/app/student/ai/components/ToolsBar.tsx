// src/app/student/ai/components/ToolsBar.tsx
'use client';

import { toolExplainConcept, toolSolveAssignment, toolSolveMath, toolStudyPlan } from '../actions';

interface ToolsBarProps {
    onToolSelect: (prompt: string) => void;
}

export default function ToolsBar({ onToolSelect }: ToolsBarProps) {
    const tools = [
        {
            icon: '💡',
            title: 'Explain Concept',
            description: 'কোনো কনসেপ্ট বুঝতে সমস্যা?',
            prompt: 'এই টপিকটা সহজ করে বুঝিয়ে দাও: ',
            action: toolExplainConcept
        },
        {
            icon: '📝',
            title: 'Solve Assignment',
            description: 'অ্যাসাইনমেন্ট সলভ করতে সাহায্য করুন',
            prompt: 'এই এসাইনমেন্টটা ধাপে ধাপে বুঝিয়ে দাও: ',
            action: toolSolveAssignment
        },
        {
            icon: '🧮',
            title: 'Solve Math Step-by-Step',
            description: 'গণিত সমস্যা স্টেপ বাই স্টেপ',
            prompt: 'এই গণিত সমস্যা Step-by-step সমাধান কর: ',
            action: toolSolveMath
        },
        {
            icon: '📚',
            title: 'Generate Study Plan',
            description: 'পার্সোনালাইজড স্টাডি প্ল্যান',
            prompt: 'আমার জন্য ৭ দিনের স্টাডি প্ল্যান বানাও: ',
            action: toolStudyPlan
        }
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {tools.map((tool, index) => (
                <button
                    key={index}
                    onClick={() => onToolSelect(tool.prompt)}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 hover:shadow-md hover:-translate-y-0.5 transition text-left"
                >
                    <div className="text-2xl mb-2">{tool.icon}</div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{tool.title}</h3>
                    <p className="text-xs text-gray-600">{tool.description}</p>
                </button>
            ))}
        </div>
    );
}