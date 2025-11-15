// src/components/BottomNavigation.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNavigation() {
    const pathname = usePathname();

    const navItems = [
        { href: '/student', icon: '🏠', label: 'হোম', active: pathname === '/student' },
        { href: '/emergency', icon: '🚨', label: 'ইমার্জেন্সি', active: pathname === '/emergency' },
        { href: '/ai', icon: '🤖', label: 'এআই', active: pathname === '/ai' },
        { href: '/tasks', icon: '📝', label: 'টাস্ক', active: pathname === '/tasks' },
        { href: '/profile', icon: '👤', label: 'প্রোফাইল', active: pathname === '/profile' }
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
            <div className="flex justify-around items-center p-2">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex flex-col items-center p-2 rounded-lg transition ${item.active ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
                            }`}
                    >
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-xs mt-1">{item.label}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}