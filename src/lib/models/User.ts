import { ObjectId } from 'mongodb'

export interface User {
    _id?: ObjectId
    name: string
    email: string
    password: string
    role: 'student' | 'expert' | 'admin'
    phone?: string
    grade?: string
    subjects?: string[]
    bio?: string
    avatar?: string
    isOnline: boolean
    lastActive: Date
    createdAt: Date
    updatedAt: Date
}

export const UserSchema = {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'expert', 'admin'], default: 'student' },
    phone: { type: String },
    grade: { type: String },
    subjects: { type: [String] },
    bio: { type: String },
    avatar: { type: String },
    isOnline: { type: Boolean, default: false },
    lastActive: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}