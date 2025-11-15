// src/components/TestChatButton.tsx - Create this file
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TestChatButton() {
    const [sessionId, setSessionId] = useState('emergency_test_session_123');

    const testSessions = [
        { id: 'emergency_test_session_123', name: 'Emergency Test Session' },
        { id: 'math_session_456', name: 'Math Help Session' },
        { id: 'physics_session_789', name: 'Physics Help Session' }
    ];

    return (
        <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-xl border border-blue-200 z-50 max-w-xs">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                <span className="text-green-500 mr-2">🧪</span>
                Chat Test Panel
            </h3>

            <div className="space-y-3">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Session ID:
                    </label>
                    <input
                        type="text"
                        value={sessionId}
                        onChange={(e) => setSessionId(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm"
                        placeholder="Enter session ID"
                    />
                </div>

                <div className="space-y-2">
                    <p className="text-xs text-gray-600 font-medium">Quick Sessions:</p>
                    {testSessions.map((session) => (
                        <button
                            key={session.id}
                            onClick={() => setSessionId(session.id)}
                            className={`w-full text-left p-2 rounded text-sm ${sessionId === session.id
                                ? 'bg-blue-100 border border-blue-300'
                                : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                        >
                            {session.name}
                        </button>
                    ))}
                </div>

                <Link
                    href={`/chat/${sessionId}`}
                    className="block w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-center py-2 rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-105"
                >
                    🚀 Test Chat Page
                </Link>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                    Development Mode • Localhost Only
                </p>
            </div>
        </div>
    );
}