// src/lib/auth.ts
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
    debug: true,
    session: { strategy: "jwt" },
    pages: { signIn: "/auth/signin" },

    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const email = credentials?.email?.trim().toLowerCase();
                const password = credentials?.password?.trim();
                console.log("[auth] incoming", { email, hasPassword: !!password });

                if (!email || !password) return null;

                const user = await prisma.user.findUnique({
                    where: { email },
                    select: { id: true, email: true, name: true, password: true, role: true },
                });
                console.log("[auth] userFromDB", { found: !!user, hasHash: !!user?.password, head: user?.password?.slice(0, 4) });

                if (!user || !user.password) return null;

                let ok = false;
                try {
                    if (user.password.startsWith("$2")) {
                        ok = await bcrypt.compare(password, user.password);
                        console.log("[auth] bcrypt.compare =>", ok);
                    } else {
                        ok = user.password === password; // dev fallback
                        console.log("[auth] plain compare =>", ok);
                    }
                } catch (e) {
                    console.error("[auth] compare error", e);
                    ok = false;
                }
                if (!ok) return null;

                return {
                    id: user.id,
                    name: user.name ?? user.email,
                    email: user.email,
                    role: user.role || "STUDENT",
                } as any;
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = (user as any).id;
                token.role = (user as any).role || "STUDENT";
            }
            return token;
        },
        async session({ session, token }) {
            // token undefined হলে guard করো
            const t = token as any | undefined;
            if (session.user) {
                (session.user as any).id = t?.id ?? null;
                (session.user as any).role = t?.role ?? "STUDENT";
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            try {
                const u = new URL(url);
                if (u.origin === baseUrl) return url;
            } catch { }
            return baseUrl;
        },
    },
};
