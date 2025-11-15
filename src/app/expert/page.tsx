// src/app/page.tsx
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import CreateCourseForm from "./components/CreateCourseForm";
import { togglePublish, deleteCourse } from "./actions/courses";

export const revalidate = 0;

export default async function HomePage() {
    const session = await getServerSession(authOptions);
    return (
        <main className="p-8 space-y-4">
            <h1 className="text-2xl font-semibold">Welcome to EduRescue</h1>
            {session?.user ? (
                <div className="space-x-3">
                    <Link className="underline" href="/dashboard">Go to Dashboard</Link>
                    <Link className="underline" href="/expert">Expert Console</Link>
                    <Link className="underline" href="/admin">Admin Panel</Link>
                </div>
            ) : (
                <Link className="underline" href="/auth/signin">Sign in</Link>
            )}
        </main>
    );
}
