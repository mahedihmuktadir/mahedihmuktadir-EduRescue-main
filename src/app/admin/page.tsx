import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function AdminPage() {
    const session = await getServerSession(authOptions);
    const role = session?.user?.role;

    if (role !== "ADMIN") {
        return (
            <main className="p-8">
                <h1 className="text-2xl font-semibold">403 — Forbidden</h1>
                <p className="text-sm text-gray-600 mt-2">Admin only.</p>
            </main>
        );
    }

    const [users, admins, experts] = await Promise.all([
        prisma.user.count(),
        prisma.user.count({ where: { role: "ADMIN" } }),
        prisma.user.count({ where: { role: "EXPERT" } }),
    ]);

    return (
        <main className="p-8 space-y-6">
            <h1 className="text-2xl font-semibold">Admin Panel</h1>
            <div className="grid gap-4 sm:grid-cols-3">
                <Stat label="Total Users" value={users} />
                <Stat label="Admins" value={admins} />
                <Stat label="Experts" value={experts} />
            </div>

            <section className="border rounded-xl p-4">
                <h2 className="font-medium mb-2">System</h2>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                    <li>Promote/Demote users (coming soon)</li>
                    <li>Site Settings (coming soon)</li>
                </ul>
            </section>
        </main>
    );
}

function Stat({ label, value }: { label: string; value: number }) {
    return (
        <div className="border rounded-xl p-4">
            <div className="text-sm text-gray-500">{label}</div>
            <div className="text-3xl font-bold">{value}</div>
        </div>
    );
}

<section className="border rounded-xl p-4">
    <h2 className="font-medium mb-2">Manage</h2>
    <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
        <li><a className="underline" href="/admin/users">Users (promote / demote)</a></li>
    </ul>
</section>
