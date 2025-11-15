import Link from "next/link";
import { enrollInCourse } from "../actions/enrollment";

type Course = {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    price: number | null;
    isEnrolled?: boolean;
};

export default function CourseCard({ course }: { course: Course }) {
    const isFree = !course.price || course.price === 0;

    return (
        <li className="border rounded-xl p-4 flex flex-col">
            <div className="flex-1">
                <h4 className="font-semibold">{course.title}</h4>
                {course.description && (
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{course.description}</p>
                )}
            </div>

            <div className="mt-3 flex items-center justify-between">
                <span className="text-xs px-2 py-1 rounded bg-gray-100">
                    {isFree ? "ফ্রি" : `৳ ${course.price}`}
                </span>

                <div className="flex items-center gap-2">
                    <Link href={`/courses/${course.slug}`} className="text-xs underline underline-offset-4">
                        Details
                    </Link>

                    {course.isEnrolled ? (
                        <Link
                            href="/student/my-courses"
                            className="text-xs px-2 py-1.5 rounded-lg border bg-gray-50"
                        >
                            Enrolled ✓
                        </Link>
                    ) : (
                        <form
                            action={async () => {
                                "use server";
                                await enrollInCourse(course.id);
                            }}
                        >
                            <button
                                type="submit"
                                className="text-xs px-2 py-1.5 rounded-lg border hover:bg-gray-50"
                            >
                                Enroll
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </li>
    );
}
