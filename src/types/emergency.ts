// src/types/emergency.ts
export interface EmergencySession {
    id: string;
    studentId: string;
    expertId?: string;
    subject: string;
    urgency: 'low' | 'medium' | 'high';
    status: 'searching' | 'matched' | 'failed' | 'completed';
    createdAt: Date;
    matchedAt?: Date;
    failedAt?: Date;
    estimatedWaitTime: number; // in seconds
    queuePosition?: number;
    paymentStatus: 'pending' | 'pre_auth' | 'completed' | 'refunded';
    paymentAmount: number;
    refundReason?: 'no_expert' | 'technical' | 'student_cancel';
}

export interface Expert {
    id: string;
    name: string;
    subjects: string[];
    rating: number;
    responseTime: number; // average in seconds
    isOnline: boolean;
    currentSessions: number;
}

export interface MatchingResult {
    success: boolean;
    expert?: Expert;
    estimatedWaitTime: number;
    queuePosition?: number;
    sessionId: string;
}