"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// নতুন কোর্স তৈরি
export async function createCourseAction(data: FormData, userId: string) {
    const title = data.get("title")?.toString() || ""
    const description = data.get("description")?.toString() || ""
    if (!title) return { ok: false, error: "Title required" }

    await prisma.course.create({
        data: { title, description, authorId: userId },
    })
    revalidatePath("/expert")
    return { ok: true }
}

// প্রকাশ / আনপাবলিশ টগল
export async function togglePublish(courseId: string) {
    const course = await prisma.course.findUnique({ where: { id: courseId } })
    if (!course) return { ok: false, error: "Not found" }

    await prisma.course.update({
        where: { id: courseId },
        data: { published: !course.published },
    })
    revalidatePath("/expert")
    return { ok: true }
}

// কোর্স ডিলিট
export async function deleteCourse(courseId: string) {
    await prisma.course.delete({ where: { id: courseId } })
    revalidatePath("/expert")
    return { ok: true }
}
