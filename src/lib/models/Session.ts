import { ObjectId } from 'mongodb'

export interface Session {
    _id?: ObjectId
    studentId: ObjectId
    expertId: ObjectId
    subject: string
    description: string
    urgency: 'low' | 'medium' | 'high'
    status: 'pending' | 'confirmed' | 'ongoing' | 'completed' | 'cancelled'
    scheduledAt: Date
    duration: number // in minutes
    price: number
    paymentStatus: 'pending' | 'paid' | 'failed'
    studentRating?: number
    studentReview?: string
    expertRating?: number
    expertReview?: string
    chatMessages: ChatMessage[]
    createdAt: Date
    updatedAt: Date
}

export interface ChatMessage {
    _id?: ObjectId
    senderId: ObjectId
    message: string
    messageType: 'text' | 'image' | 'file'
    timestamp: Date
    read: boolean
}

export const SessionSchema = {
    studentId: { type: ObjectId, required: true, ref: 'User' },
    expertId: { type: ObjectId, required: true, ref: 'User' },
    subject: { type: String, required: true },
    description: { type: String, required: true },
    urgency: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    status: { type: String, enum: ['pending', 'confirmed', 'ongoing', 'completed', 'cancelled'], default: 'pending' },
    scheduledAt: { type: Date, required: true },
    duration: { type: Number, default: 60 }, // 60 minutes default
    price: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    studentRating: { type: Number, min: 1, max: 5 },
    studentReview: { type: String },
    expertRating: { type: Number, min: 1, max: 5 },
    expertReview: { type: String },
    chatMessages: [{
        senderId: { type: ObjectId, required: true },
        message: { type: String, required: true },
        messageType: { type: String, enum: ['text', 'image', 'file'], default: 'text' },
        timestamp: { type: Date, default: Date.now },
        read: { type: Boolean, default: false }
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}