// src/app/student/ai/actions/toolSolveAssignment.ts
'use server';

import { generateAIResponse } from './generateAIResponse';
import { ChatMessage } from '../components/ChatUI';

export async function toolSolveAssignment(
    previousMessages: ChatMessage[],
    userMessage: string
): Promise<string> {
    return generateAIResponse(previousMessages, userMessage, 'assignment');
}