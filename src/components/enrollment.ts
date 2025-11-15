"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function enrollInCourse(courseId: string) {
    const session = await getServerSession(authOptions);
    if (!session?.user) redirect("/signin?redirect=/student");

    const userId = (session.user as any).id;
    const course = await prisma.course.findUnique({ where: { id: courseId }, select: { id: true, published: true } });
    if (!course || !course.published) return;

    const existing = await prisma.enrollment.findUnique({
        where: { userId_courseId: { userId, courseId } },
    });
    if (!existing) {
        await prisma.enrollment.create({ data: { userId, courseId, status: "ENROLLED" } });
    }

    revalidatePath("/student");
    revalidatePath("/student/my-courses");
}
