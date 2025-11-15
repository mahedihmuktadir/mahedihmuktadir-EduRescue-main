// src/app/student/ai/actions/generateAIResponse.ts
'use server';

import { ChatMessage } from '../components/ChatUI';

export async function generateAIResponse(
    previousMessages: ChatMessage[],
    userMessage: string,
    mode: 'general' | 'concept' | 'assignment' | 'math' | 'plan' = 'general'
): Promise<string> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const lowerMessage = userMessage.toLowerCase();

    // Math detection
    const hasMath = /\d+[\s]*[\+\-\*\/\=\>\<]/.test(userMessage) ||
        lowerMessage.includes('math') ||
        lowerMessage.includes('গণিত') ||
        lowerMessage.includes('calculate');

    // Override mode if math is detected
    if (hasMath && mode === 'general') {
        mode = 'math';
    }

    switch (mode) {
        case 'concept':
            return generateConceptExplanation(userMessage);

        case 'assignment':
            return generateAssignmentSolution(userMessage);

        case 'math':
            return generateMathSolution(userMessage);

        case 'plan':
            return generateStudyPlan(userMessage);

        default:
            return generateGeneralResponse(userMessage);
    }
}

function generateConceptExplanation(message: string): string {
    const concepts = {
        physics: 'পদার্থবিজ্ঞানের এই কনসেপ্টটি খুবই গুরুত্বপূর্ণ। আমি সহজ উদাহরণ দিয়ে বুঝাচ্ছি:\n\n১. প্রথমে আমরা basic definition দেখি\n২. তারপর real-life example দিয়ে বুঝি\n৩. শেষে practice problem সলভ করি\n\nএই approach এ আপনি সহজে বুঝতে পারবেন।',
        math: 'গণিতের এই কনসেপ্টটি step-by-step এভাবে বুঝবেন:\n\nStep 1: Basic formula এবং theory\nStep 2: Simple example with solution\nStep 3: Advanced application\nStep 4: Practice problems\n\nএভাবে ধীরে ধীরে সবকিছু ক্লিয়ার হবে।',
        chemistry: 'রসায়নের এই reaction টি বুঝতে:\n\n• প্রথমে reactants এবং products চিনতে হবে\n• তারপর reaction mechanism বুঝতে হবে\n• শেষে real-life application দেখবেন\n\nএইভাবে পুরো concept টি ক্লিয়ার হবে।',
        biology: 'বায়োলজির এই topic টি বুঝতে diagram এবং example খুবই helpful। আমি step-by-step explain করছি...',
        programming: 'প্রোগ্রামিং এর এই concept টি বুঝতে code examples দিয়ে বুঝাচ্ছি। প্রথমে basic syntax, তারপর practical implementation।'
    };

    const defaultResponse = `এই concept টি আমি step-by-step বুঝিয়ে দিচ্ছি:\n\n১. Basic definition এবং importance\n২. Simple examples with explanation\n৩. Real-world applications\n৪. Common mistakes to avoid\n\nএইভাবে আপনি পুরোপুরি বুঝতে পারবেন। কোনো specific question থাকলে জানাবেন।`;

    if (message.includes('physics') || message.includes('পদার্থ')) return concepts.physics;
    if (message.includes('math') || message.includes('গণিত')) return concepts.math;
    if (message.includes('chemistry') || message.includes('রসায়ন')) return concepts.chemistry;
    if (message.includes('biology') || message.includes('বায়োলজি')) return concepts.biology;
    if (message.includes('programming') || message.includes('কোড')) return concepts.programming;

    return defaultResponse;
}

function generateAssignmentSolution(message: string): string {
    return `এই assignment টি step-by-step solve করব:\n\n📋 Assignment Structure:\n1. Understanding the problem\n2. Research and analysis\n3. Solution development\n4. Verification\n5. Final presentation\n\n🔍 Step 1: Problem Analysis\n- Requirements identification\n- Key concepts review\n\n💡 Step 2: Solution Approach\n- Methodology selection\n- Tools and techniques\n\n🛠️ Step 3: Implementation\n- Detailed step-by-step work\n- Calculations and reasoning\n\n✅ Step 4: Verification\n- Cross-checking answers\n- Quality assurance\n\nএই structure follow করে assignment complete করতে পারবেন। Specific requirement জানালে আরও help করতে পারি।`;
}

function generateMathSolution(message: string): string {
    return `এই গণিত সমস্যাটি step-by-step solve করছি:\n\n📝 Problem: ${message.slice(0, 50)}...\n\n🧮 Solution Steps:\n\nStep 1: সমস্যাটি carefully পড়ে বুঝে নিচ্ছি\nStep 2: Given data এবং what to find identify করছি\nStep 3: Relevant formula বা method select করছি\nStep 4: Calculation step-by-step করছি\nStep 5: Answer verify করছি\nStep 6: Final answer লিখছি\n\n🔢 Calculation:\nধরি, আমরা এইভাবে solve করব...\n\nStep 1: [First calculation step]\nStep 2: [Second calculation step]\nStep 3: [Third calculation step]\n\n✅ Final Answer: [Answer will be here]\n\nএই problem টির complete solution এই structure এ দিতে পারি। Specific calculation needed?`;
}

function generateStudyPlan(message: string): string {
    return `📚 আপনার জন্য ৭ দিনের স্টাডি প্ল্যান:\n\n🗓️ Day 1: Foundation Building\n• Basic concepts review\n• Key definitions and formulas\n• Simple practice problems\n\n🗓️ Day 2: Core Concepts\n• Main topics deep dive\n• Theory understanding\n• Conceptual clarity\n\n🗓️ Day 3: Practice Session\n• Problem solving\n• Application of concepts\n• Difficulty level: Medium\n\n🗓️ Day 4: Advanced Topics\n• Complex concepts\n• Advanced problems\n• Real-world applications\n\n🗓️ Day 5: Revision\n• All topics revision\n• Formula memorization\n• Quick review\n\n🗓️ Day 6: Mock Test\n• Full-length practice\n• Time management\n• Performance analysis\n\n🗓️ Day 7: Final Preparation\n• Weak areas focus\n• Last minute revision\n• Confidence building\n\n💡 ভবিষ্যতে আপনার প্রগেস ডেটা দেখে আরও স্মার্ট প্ল্যান সাজেস্ট করা হবে।\n\nএই plan customize করতে চাইলে জানাবেন।`;
}

function generateGeneralResponse(message: string): string {
    const responses = [
        `আপনার question টি খুব ভাল! আমি detailed explanation দিচ্ছি:\n\nপ্রথমে আমরা basic concept টা clear করি...\nতারপর examples দিয়ে বুঝি...\nসবশেষে practice করি।\n\nএই approach এ আপনি easily understand করতে পারবেন।`,

        `এই topic টি নিয়ে আমি step-by-step আলোচনা করছি:\n\n১. Introduction এবং importance\n২. Main concepts এবং definitions\n৩. Practical examples এবং applications\n৪. Common questions এবং solutions\n\nএইভাবে পুরো topic টি cover করা হবে।`,

        `Bangladeshi curriculum অনুযায়ী আমি explain করছি:\n\n• Theory part সহজ ভাষায়\n• Examples বাংলাদেশী context এ\n• Exam oriented preparation\n• Important questions focus\n\nএইভাবে আপনি এক্সামের জন্য well prepared হতে পারবেন।`,

        `আমি এই problem টি solve করতে help করছি:\n\nStep 1: Problem analysis\nStep 2: Solution approach\nStep 3: Detailed execution\nStep 4: Verification\nStep 5: Final answer\n\nপ্রতিটি step clearly explain করা হবে।`
    ];

    return responses[Math.floor(Math.random() * responses.length)];
}