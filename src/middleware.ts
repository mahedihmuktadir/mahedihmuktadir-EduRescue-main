// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // যেসব path সবসময় public থাকবে:
    const publicPaths = [
        "/",                    // landing page
        "/auth/signin",
        "/auth/signup",
        "/sessions/emergency",  // ✅ emergency এখানে allow করলাম
    ];

    const isPublic = publicPaths.some(
        (p) => pathname === p || pathname.startsWith(p + "/")
    );

    if (isPublic) {
        // public route হলে কোনো auth check/redirect নয়
        return NextResponse.next();
    }

    // বাকি সব route এর জন্য auth check
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    // logged-in না হলে → signin + redirect query
    if (!token) {
        const url = new URL("/auth/signin", req.url);
        url.searchParams.set("redirect", pathname);
        return NextResponse.redirect(url);
    }

    // logged-in হলে normal চলবে
    return NextResponse.next();
}

// কোন কোন path এ middleware লাগবে
export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico).*)",
    ],
};
