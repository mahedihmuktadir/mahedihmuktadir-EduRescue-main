// src/app/student/ai/components/MessageBubble.tsx
interface MessageBubbleProps {
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
}

export default function MessageBubble({ role, content, timestamp }: MessageBubbleProps) {
    const isUser = role === 'user';

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start space-x-2 max-w-[80%] ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isUser
                        ? 'bg-green-500 text-white'
                        : 'bg-indigo-500 text-white'
                    }`}>
                    {isUser ? '👤' : '🤖'}
                </div>

                {/* Message Content */}
                <div className={`rounded-2xl px-4 py-3 ${isUser
                        ? 'bg-green-100 text-green-900 rounded-br-none'
                        : 'bg-indigo-100 text-indigo-900 rounded-bl-none'
                    }`}>
                    <p className="whitespace-pre-wrap">{content}</p>
                    <p className={`text-xs mt-2 ${isUser ? 'text-green-700' : 'text-indigo-700'
                        }`}>
                        {timestamp}
                    </p>
                </div>
            </div>
        </div>
    );
}