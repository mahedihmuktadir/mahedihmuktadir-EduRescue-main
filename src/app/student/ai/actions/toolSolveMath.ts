// src/app/student/ai/actions/toolSolveMath.ts
'use server';

import { generateAIResponse } from './generateAIResponse';
import { ChatMessage } from '../components/ChatUI';

export async function toolSolveMath(
    previousMessages: ChatMessage[],
    userMessage: string
): Promise<string> {
    return generateAIResponse(previousMessages, userMessage, 'math');
}