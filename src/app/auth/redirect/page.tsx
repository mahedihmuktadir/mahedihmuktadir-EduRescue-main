// src/app/auth/redirect/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

/** open-redirect ঠেকাতে: শুধু সাইটের ভেতরের path-ই allow */
function sanitizeRedirectPath(p?: string | null) {
    if (!p) return null;
    try {
        // absolute URL দিলে new URL ফেইল করবে না, তাই origin চেক দরকার—আমরা একদমই allow করবো না
        if (p.startsWith("http://") || p.startsWith("https://")) return null;
        if (!p.startsWith("/")) return null;
        // নিরাপত্তার জন্য কয়েকটা edge-case কেটে দেই
        if (p.startsWith("//") || p.includes("\\") || p.includes("\n")) return null;
        return p;
    } catch {
        return null;
    }
}

export const dynamic = "force-dynamic"; // কোনো caching নয়

export default async function PostLoginRedirect({
    searchParams,
}: {
    searchParams?: { redirect?: string };
}) {
    const session = await getServerSession(authOptions);

    // Logged-out user এলে সোজা সাইন-ইনে ফেরত
    if (!session?.user) {
        redirect("/auth/signin");
    }

    // 1) query ?redirect=/something থাকলে সেটাই
    const qp = sanitizeRedirectPath(searchParams?.redirect || null);
    if (qp) redirect(qp);

    // 2) নাহলে role অনুযায়ী পাঠাও
    // DB-তে আমরা "STUDENT" | "EXPERT" | "ADMIN" রাখছি—তবে lowercase থাকলেও হ্যান্ডেল করি
    const role = String((session.user as any).role || "STUDENT").toUpperCase();

    if (role === "ADMIN") redirect("/admin");
    if (role === "EXPERT") redirect("/expert");

    // default
    redirect("/student");
}
