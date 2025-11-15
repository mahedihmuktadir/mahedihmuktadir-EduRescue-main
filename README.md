🎨 EduRescue – What is it?

EduRescue হলো বাংলাদেশের শিক্ষার্থীদের জন্য প্রথম 24/7 Academic Emergency Platform,
যা ৫ মিনিটের মধ্যে expert সাহায্য পাওয়ার গ্যারান্টি দেয়।

প্ল্যাটফর্মের মূল উদ্দেশ্য:

“Atke gele… panic নয় — Rescue করো!”

🌟 Key Features
🆘 Emergency Help

5-minute expert connection

Image → question upload

Quick subject-based routing

Urgency-based expert priority

🤖 AI Study Assistant

Concept explanation (Bangla-friendly)

Board-exam style answers

Step-by-step math

MCQ → reasoning

Image OCR + explanation

📚 Smart Resource Library

Board → Class → Subject → Chapter

Notes, formula sheets, MCQs, PDFs

Save & bookmark system

📊 Learning Analytics

Daily/weekly study time

Performance graphs

Weakness detection

Goal tracking

Streak system

👥 Study Groups

Topic-wise active groups

Live discussions

Upcoming sessions

💬 Real-time Chat

Session chat

Attach image/PDF

Chat history

🧩 Tech Stack
Layer	Technologies
Frontend	Next.js 14, TypeScript, Tailwind CSS
Backend	Server Actions, Next.js API Routes
Auth	NextAuth (Credentials/OAuth Ready)
Database	Prisma ORM + PostgreSQL/SQLite
AI	OpenAI API
Deployment	Vercel
📁 Project Structure
src/
 └── app/
      ├── student/               # Main dashboard
      ├── student/ai/            # AI Assistant
      ├── sessions/book/         # Session booking
      ├── chat/                  # Live chat UI
      ├── resources/             # Resource library
      ├── analytics/             # Analytics dashboard
      ├── pricing/               # Pricing & plans
      ├── help/                  # Help center
      ├── terms/                 # Terms and conditions
      ├── privacy/               # Privacy policy
      ├── report/                # Issue report
      ├── api/                   # API routes
      └── layout.tsx             # Root layout

components/                      # Reusable UI components
lib/                             # Auth, DB, utils
prisma/                          # DB schema & migrations

⚙️ Installation & Setup
1️⃣ Clone the repo
git clone https://github.com/mahedihmuktadir/mahedihmuktadir-EduRescue-main.git
cd mahedihmuktadir-EduRescue-main

2️⃣ Install dependencies
npm install

3️⃣ Environment variables

Create .env:

DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
OPENAI_API_KEY="your-openai-key"


PostgreSQL example:

DATABASE_URL="postgresql://user:pass@localhost:5432/edurescue"

4️⃣ Prisma migrate
npx prisma migrate dev

5️⃣ Start dev server
npm run dev

🌐 Deploy to Vercel

Click to deploy:

📸 Screenshots (Add Later)
[Dashboard Screenshot Placeholder]
[AI Assistant Screenshot Placeholder]
[Emergency Screenshot Placeholder]


(আমি চাইলে তোমার UI থেকে ready PNG/JPG screenshots export করে দিতে পারবো)

🧭 Roadmap

 Real-time Expert Matching

 Smart MCQ Generator

 Model Test System

 Full Chat + Audio/Video Session

 Expert Dashboard

 Admin Panel

 Subscription Payments

 Mobile App (React Native)

🧑‍💻 Contributing

Pull requests welcome!

git checkout -b feature-name
git commit -m "Add: feature"
git push origin feature-name

📄 License

MIT License — Free to use with attribution.

❤️ Built for Bangladeshi Students

EduRescue তৈরি হয়েছে বাংলাদেশের প্রতিটি শিক্ষার্থীর জন্য
যারা পড়াশোনায় আটকে গেলে আর কারো কাছে যেতে পারে না।

EduRescue:

“Don’t panic. Just Rescue it!” 🇧🇩✨
