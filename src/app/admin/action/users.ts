// src/app/admin/actions/users.ts
'use server'

import { revalidatePath } from 'next/cache'

// Mock user data - Replace with actual database calls
const mockUsers = [
    {
        id: '1',
        name: 'মাহেদি হাসান',
        email: 'mahedi@edurescue.com',
        role: 'student',
        status: 'active',
        joinDate: '২০২৪-০১-১৫',
        subscription: 'প্রিমিয়াম',
        sessions: 47
    },
    {
        id: '2',
        name: 'রিয়া ইসলাম',
        email: 'riya@edurescue.com',
        role: 'expert',
        status: 'active',
        joinDate: '২০২৪-০১-১০',
        specialization: 'গণিত',
        rating: 4.8
    },
    {
        id: '3',
        name: 'আরিফ আহমেদ',
        email: 'arif@edurescue.com',
        role: 'student',
        status: 'inactive',
        joinDate: '২০২৪-০১-২০',
        subscription: 'ফ্রি',
        sessions: 12
    }
]

export async function getUsers() {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    return {
        success: true,
        data: mockUsers,
        total: mockUsers.length,
        active: mockUsers.filter(user => user.status === 'active').length
    }
}

export async function getUserById(id: string) {
    const user = mockUsers.find(u => u.id === id)

    if (!user) {
        return { success: false, error: 'User not found' }
    }

    return { success: true, data: user }
}

export async function updateUser(id: string, updates: any) {
    // In real app, update in database
    const userIndex = mockUsers.findIndex(u => u.id === id)

    if (userIndex === -1) {
        return { success: false, error: 'User not found' }
    }

    mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates }

    revalidatePath('/admin/users')
    return { success: true, data: mockUsers[userIndex] }
}

export async function deleteUser(id: string) {
    // In real app, delete from database
    const userIndex = mockUsers.findIndex(u => u.id === id)

    if (userIndex === -1) {
        return { success: false, error: 'User not found' }
    }

    mockUsers.splice(userIndex, 1)

    revalidatePath('/admin/users')
    return { success: true, message: 'User deleted successfully' }
}

export async function createUser(userData: any) {
    // In real app, create in database
    const newUser = {
        id: String(mockUsers.length + 1),
        ...userData,
        joinDate: new Date().toISOString().split('T')[0],
        status: 'active'
    }

    mockUsers.push(newUser)

    revalidatePath('/admin/users')
    return { success: true, data: newUser }
}