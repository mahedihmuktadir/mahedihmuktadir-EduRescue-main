// src/app/api/dev/seed/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt"; // ⬅️ নতুন ইমপোর্ট

export const runtime = "nodejs";

async function makeHash() {
    return bcrypt.hash("password", 10); // dev only
}

// bcrypt("password") — 10 rounds (pre-hashed)
const PASSWORD_HASH =
    "$2b$10$2reZ0b4kYjbL8HZOw8r9ye27P2khxbYqVwFh6X8OaI5a7ZV7kZ3p6";

function assertDev() {
    if (process.env.NODE_ENV === "production") {
        throw new Error("Seeding disabled in production");
    }
}

function assertSecret(req: Request) {
    const key = req.headers.get("x-seed-key");
    const server = process.env.SEED_SECRET;
    if (!server || key !== server) {
        throw new Error("Unauthorized: x-seed-key mismatch");
    }
}

export async function POST(req: Request) {
    try {
        assertDev();
        assertSecret(req);

        const HASH = await makeHash();

        const student = await prisma.user.upsert({
            where: { email: "student@edurescue.com" },
            update: { name: "EduRescue Student", role: "STUDENT", passwordHash: HASH },
            create: { email: "student@edurescue.com", name: "EduRescue Student", role: "STUDENT", passwordHash: HASH },
        });

        const expert = await prisma.user.upsert({
            where: { email: "expert@edurescue.com" },
            update: { name: "EduRescue Expert", role: "EXPERT", passwordHash: HASH },
            create: { email: "expert@edurescue.com", name: "EduRescue Expert", role: "EXPERT", passwordHash: HASH },
        });

        const admin = await prisma.user.upsert({
            where: { email: "admin@edurescue.com" },
            update: { name: "EduRescue Admin", role: "ADMIN", passwordHash: HASH },
            create: { email: "admin@edurescue.com", name: "EduRescue Admin", role: "ADMIN", passwordHash: HASH },
        });

        return NextResponse.json({ ok: true, message: "Seed completed", users: [student.email, expert.email, admin.email] });
    } catch (e: any) {
        console.error("SEED ERROR:", e);
        return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 400 });
    }
}
