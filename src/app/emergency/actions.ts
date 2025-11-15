// src/app/emergency/actions.ts
'use server'

// 👉 NOTE: এখনো DB বা bKash আসল ইন্টেগ্রেশন করিনি,
// শুধু EmergencyBooking / MatchingStatus component গুলো যেন
// error ছাড়াই কাজ করে সেই জন্য mock/stub action দিচ্ছি।

// Emergency session create করার basic mock
export async function createEmergencySession(params: {
    subject: string
    level: string
    problemType: string
    description?: string
}) {
    console.log('createEmergencySession called with:', params)

    // future: এখানে DB তে session create + payment init হবে
    return {
        success: true,
        sessionId: 'demo-session-' + Date.now().toString(),
        status: 'matching',       // UI এখন এই status ব্যবহার করতে পারবে
        etaSeconds: 120,          // ধরলাম ২ মিনিট ETA
    }
}

// Matching status চেক করার basic mock
export async function checkMatchingStatus(sessionId: string) {
    console.log('checkMatchingStatus called for:', sessionId)

    // future: এখানে আসল matching logic / DB lookup হবে
    return {
        status: 'matched',        // 'matching' | 'matched' | 'failed' ইত্যাদি হতে পারে
        expertName: 'Demo Expert',
        expertSubject: 'গণিত',
        etaSeconds: 30,
    }
}

// Refund process করার basic mock
export async function processRefund(sessionId: string) {
    console.log('processRefund called for:', sessionId)

    // future: এখানে আসল bKash refund API call + DB update হবে
    return {
        success: true,
        message: 'Refund processed (demo)',
    }
}
