import clientPromise from './mongodb'
import { User, UserSchema } from '@/models/User'
import { Session, SessionSchema } from '@/models/Session'

export async function connectToDatabase() {
    try {
        const client = await clientPromise
        const db = client.db('edurescue')
        return db
    } catch (error) {
        console.error('Database connection error:', error)
        throw new Error('Database connection failed')
    }
}

export async function createUser(userData: Partial<User>) {
    const db = await connectToDatabase()
    const users = db.collection('users')

    const newUser = {
        ...userData,
        isOnline: false,
        lastActive: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
    }

    const result = await users.insertOne(newUser)
    return result
}

export async function findUserByEmail(email: string) {
    const db = await connectToDatabase()
    const users = db.collection('users')
    return await users.findOne({ email })
}

export async function createSession(sessionData: Partial<Session>) {
    const db = await connectToDatabase()
    const sessions = db.collection('sessions')

    const newSession = {
        ...sessionData,
        status: 'pending',
        paymentStatus: 'pending',
        chatMessages: [],
        createdAt: new Date(),
        updatedAt: new Date()
    }

    const result = await sessions.insertOne(newSession)
    return result
}

export async function getUserSessions(userId: string) {
    const db = await connectToDatabase()
    const sessions = db.collection('sessions')
    return await sessions.find({
        $or: [{ studentId: userId }, { expertId: userId }]
    }).sort({ createdAt: -1 }).toArray()
}