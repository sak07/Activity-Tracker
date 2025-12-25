"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useState } from 'react';
import { clsx } from 'clsx';

export default function Navbar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { href: '/', label: 'Dashboard' },
        { href: '/activities', label: 'Activities' },
        { href: '/users', label: 'Users' },
    ];

    return (
        <div className="sticky top-4 z-50 px-4 sm:px-6 lg:px-8">
            <nav className="glass rounded-2xl transition-all duration-300 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center gap-8">
                            <div className="flex-shrink-0 flex items-center">
                                <Link href="/" className="flex items-center gap-2 group">
                                    <div className="p-2 bg-gray-100 rounded-xl group-hover:scale-105 transition-transform duration-200">
                                        <Activity className="h-6 w-6 text-indigo-600" />
                                    </div>
                                    <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent tracking-tight">
                                        ActivityTracker
                                    </span>
                                </Link>
                            </div>
                            <div className="hidden sm:flex sm:space-x-1">
                                {navLinks.map((link) => {
                                    const isActive = pathname === link.href;
                                    return (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className={clsx(
                                                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                                                isActive
                                                    ? "bg-gray-100 text-indigo-600 shadow-sm"
                                                    : "hover:bg-gray-50 hover:text-black"
                                            )}
                                        >
                                            {link.label}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <ThemeToggle />
                            <div className="sm:hidden">
                                <button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    className="p-2 rounded-md text-gray-800 hover:bg-gray-100 transition-colors"
                                >
                                    {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMobileMenuOpen && (
                    <div className="sm:hidden border-t border-theme">
                        <div className="pt-2 pb-4 space-y-1 px-4">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={clsx(
                                            "block px-4 py-3 rounded-xl text-base font-medium transition-colors",
                                            isActive
                                                ? "bg-gray-100 text-indigo-600"
                                                : "hover:bg-gray-50 hover:text-black"
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
}
