"use client";

import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { createCourseAction } from "../actions/courses";

function PendingButton({ children, className }: { children: React.ReactNode; className?: string }) {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className={(className ?? "") + " disabled:opacity-60 disabled:cursor-not-allowed"}
            aria-busy={pending}
        >
            {pending ? "Creating..." : children}
        </button>
    );
}

export default function CreateCourseForm() {
    const initialState = { ok: false as boolean, error: "" as string | undefined };
    const [state, formAction] = useFormState(createCourseAction, initialState);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state?.ok && formRef.current) formRef.current.reset();
    }, [state?.ok]);

    return (
        <section className="border rounded-xl p-4">
            <h2 className="font-medium mb-3">Create a new course</h2>

            {state?.error && (
                <div className="mb-3 text-sm text-red-600 border border-red-200 bg-red-50 rounded px-3 py-2">
                    {state.error}
                </div>
            )}
            {state?.ok && (
                <div className="mb-3 text-sm text-green-700 border border-green-200 bg-green-50 rounded px-3 py-2">
                    Course created successfully.
                </div>
            )}

            <form ref={formRef} action={formAction} className="grid gap-3 max-w-xl">
                <input name="title" placeholder="Course title" className="border rounded-md p-2" required />
                <textarea name="description" placeholder="Short description (optional)" className="border rounded-md p-2 min-h-[90px]" />
                <div className="flex gap-2">
                    <PendingButton className="border rounded-md px-3 py-2 hover:bg-gray-50">Create</PendingButton>
                </div>
            </form>
        </section>
    );
}
