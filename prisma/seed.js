// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

function slugify(str) {
    return String(str)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
}

async function main() {
    const passwordHash = await bcrypt.hash("password", 10);

    // --- Users ---
    const student = await prisma.user.upsert({
        where: { email: "student@edurescue.com" },
        update: {},
        create: {
            email: "student@edurescue.com",
            name: "Demo Student",
            role: "STUDENT",
            password: passwordHash,
        },
    });

    const expert = await prisma.user.upsert({
        where: { email: "expert@edurescue.com" },
        update: {},
        create: {
            email: "expert@edurescue.com",
            name: "Demo Expert",
            role: "EXPERT",
            password: passwordHash,
        },
    });

    const admin = await prisma.user.upsert({
        where: { email: "admin@edurescue.com" },
        update: {},
        create: {
            email: "admin@edurescue.com",
            name: "Demo Admin",
            role: "ADMIN",
            password: passwordHash,
        },
    });

    // --- Courses (authored by expert) ---
    const rawCourses = [
        { title: "Algebra Rescue: Crash Help", price: 0, published: true, description: "Instant support for algebra panic." },
        { title: "Physics SOS: Quick Concepts", price: 0, published: true, description: "Rapid concept rescue for physics." },
        { title: "Chemistry Lab Basics", price: 199, published: true, description: "Safety, basics, and quick lab math." },
        { title: "English Writing Fix", price: 99, published: true, description: "Grammar, clarity, and exam tips." },
        { title: "Programming 101: JS Faststart", price: 0, published: true, description: "First steps into JavaScript." },
        { title: "Biology Diagrams in 30 min", price: 149, published: true, description: "Fast diagram practice set." },
        { title: "Secret Draft Course (Unpub)", price: 0, published: false, description: "Work in progress…" },
        { title: "Premium Exam Strategy", price: 299, published: false, description: "Deep dive strategy pack." },
    ];

    const courses = [];
    for (const c of rawCourses) {
        const course = await prisma.course.upsert({
            where: { slug: slugify(c.title) },
            update: {},
            create: {
                title: c.title,
                slug: slugify(c.title),
                description: c.description,
                price: c.price,
                published: c.published,
                authorId: expert.id,
            },
        });
        courses.push(course);
    }

    // --- Enrollment (student enrolls 2 published courses) ---
    const published = courses.filter((c) => c.published);

    for (const c of published.slice(0, 2)) {
        await prisma.enrollment.upsert({
            where: { userId_courseId: { userId: student.id, courseId: c.id } },
            update: {},
            create: {
                userId: student.id,
                courseId: c.id,
                status: "ENROLLED",
            },
        });
    }

    console.log("✅ Seed complete.");
    console.log(`Users: student, expert, admin`);
    console.log(`Courses: ${courses.length} (${published.length} published)`);
}

main()
    .catch((e) => {
        console.error("Seed error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
