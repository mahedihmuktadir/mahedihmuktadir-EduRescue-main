// src/app/student/ai/actions/toolExplainConcept.ts
'use server';

import { generateAIResponse } from './generateAIResponse';
import { ChatMessage } from '../components/ChatUI';

export async function toolExplainConcept(
    previousMessages: ChatMessage[],
    userMessage: string
): Promise<string> {
    return generateAIResponse(previousMessages, userMessage, 'concept');
}