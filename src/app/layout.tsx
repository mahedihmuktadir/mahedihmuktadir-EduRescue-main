// src/app/layout.tsx - Update this file
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EduRescue - বাংলাদেশের প্রথম ২৪/৭ একাডেমিক ইমার্জেন্সি সার্ভিস',
  description: 'এক্কেবারে যেকোনো সময়, যেকোনো একাডেমিক সমস্যার সমাধান পেতে ৫-মিনিটের মধ্যে এক্সপার্ট হেল্প',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}