// src/app/student/ai/page.tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AIChatClient from './AIChatClient'

export default async function AIPage() {
    const session = await getServerSession(authOptions as any)

    if (!session?.user) {
        redirect('/auth/signin?redirect=/student/ai')
    }

    const role = String((session.user as any).role || 'student').toLowerCase()
    if (role !== 'student') {
        redirect('/auth/redirect')
    }

    return <AIChatClient session={session} />
}