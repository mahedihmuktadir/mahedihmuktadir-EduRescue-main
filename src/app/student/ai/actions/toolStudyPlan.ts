// src/app/student/ai/actions/toolStudyPlan.ts
'use server';

import { generateAIResponse } from './generateAIResponse';
import { ChatMessage } from '../components/ChatUI';

export async function toolStudyPlan(
    previousMessages: ChatMessage[],
    userMessage: string
): Promise<string> {
    return generateAIResponse(previousMessages, userMessage, 'plan');
}