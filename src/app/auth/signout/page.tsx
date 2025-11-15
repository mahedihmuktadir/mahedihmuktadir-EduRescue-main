'use client'

import { useEffect } from 'react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function SignOutPage() {
    const router = useRouter()

    useEffect(() => {
        const performSignOut = async () => {
            await signOut({ redirect: false })
            router.push('/')
        }

        performSignOut()
    }, [router])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">সাইন আউট হচ্ছে...</p>
            </div>
        </div>
    )
}