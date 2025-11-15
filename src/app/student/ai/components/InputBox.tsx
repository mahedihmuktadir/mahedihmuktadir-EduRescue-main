// src/app/student/ai/components/InputBox.tsx
'use client';

import { useState } from 'react';

interface InputBoxProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: (message: string) => void;
    disabled: boolean;
    loading: boolean;
}

export default function InputBox({ value, onChange, onSubmit, disabled, loading }: InputBoxProps) {
    const [rows, setRows] = useState(1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (value.trim() && !loading) {
            onSubmit(value);
            setRows(1);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value);

        // Auto-grow logic
        const textareaLineHeight = 24;
        const minRows = 1;
        const maxRows = 4;

        const previousRows = e.target.rows;
        e.target.rows = minRows;

        const currentRows = Math.floor(e.target.scrollHeight / textareaLineHeight);

        if (currentRows === previousRows) {
            e.target.rows = currentRows;
        }

        if (currentRows >= maxRows) {
            e.target.rows = maxRows;
            e.target.scrollTop = e.target.scrollHeight;
        }

        setRows(currentRows < maxRows ? currentRows : maxRows);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex space-x-3">
                <div className="flex-1 relative">
                    <textarea
                        value={value}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder="আপনার প্রশ্ন লিখুন…"
                        rows={rows}
                        disabled={disabled}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                    />

                    {/* Future feature buttons - Disabled for now */}
                    <div className="absolute right-2 top-2 flex space-x-1">
                        <button
                            type="button"
                            disabled
                            className="p-1 text-gray-400 cursor-not-allowed text-sm"
                            title="Upload Image (Coming Soon)"
                        >
                            📷
                        </button>
                        <button
                            type="button"
                            disabled
                            className="p-1 text-gray-400 cursor-not-allowed text-sm"
                            title="Upload File (Coming Soon)"
                        >
                            📎
                        </button>
                        <button
                            type="button"
                            disabled
                            className="p-1 text-gray-400 cursor-not-allowed text-sm"
                            title="Voice Input (Coming Soon)"
                        >
                            🎙️
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={!value.trim() || loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center space-x-2"
                >
                    <span>🚀</span>
                    <span>Send</span>
                </button>
            </div>

            {!value.trim() && (
                <p className="text-xs text-gray-500 text-center">
                    আপনার প্রশ্ন লিখে Enter চাপুন অথবা Send বাটনে ক্লিক করুন
                </p>
            )}
        </form>
    );
}