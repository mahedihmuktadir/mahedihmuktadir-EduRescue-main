// src/app/emergency/page.tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import EmergencyBookingClient from '@/components/emergency/EmergencyBooking';

export default async function EmergencyPage() {
    const session = await getServerSession(authOptions);

    /*if (!session) {
        redirect('/auth/signin?redirect=/emergency');
    }

    if (session.user.role !== 'student') {
        redirect('/auth/redirect');
    }*/

    return <EmergencyBookingClient session={session} />;
}