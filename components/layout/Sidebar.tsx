'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Puzzle, Trophy, Settings } from 'lucide-react';
import { useUser } from '@/context/UserContext';

const Sidebar = () => {
    const pathname = usePathname();
    const { user } = useUser();
    const isActive = (path: string) => pathname === path;

    return (
        <>
            {/* MOBILE: Bottom Floating Dock */}
            <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-auto z-50 
                bg-[#1a1f2e]/90 border border-white/10 rounded-full backdrop-blur-xl
                shadow-2xl transition-all duration-300 px-6 py-2 flex items-center gap-6">
                <NavItem Mobile href="/" active={isActive('/')} label="Home" icon={<Home size={24} strokeWidth={2.5} />} />
                <NavItem Mobile href="/puzzles" active={isActive('/puzzles')} label="Puzzles" icon={<Puzzle size={24} strokeWidth={2.5} />} />
                <NavItem Mobile href="/leaderboard" active={isActive('/leaderboard')} label="Leaderboard" icon={<Trophy size={24} strokeWidth={2.5} />} />
                <NavItem Mobile href="/settings" active={isActive('/settings')} label="Settings" icon={<Settings size={24} strokeWidth={2.5} />} />
            </nav>

            {/* DESKTOP: Full Sidebar */}
            <aside className="hidden md:flex fixed top-0 left-0 h-screen w-72 bg-[#1a1f2e] border-r border-white/5 flex-col py-8 z-40">
                {/* Logo */}
                <div className="px-8 mb-12">
                    <h1 className="text-[28px] font-bold tracking-tight text-white drop-shadow-md whitespace-nowrap">DeCode.io</h1>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 space-y-2">
                    <NavItem href="/" active={isActive('/')} label="Home" icon={<Home size={22} />} />
                    <NavItem href="/puzzles" active={isActive('/puzzles')} label="Puzzles" icon={<Puzzle size={22} />} />
                    <NavItem href="/leaderboard" active={isActive('/leaderboard')} label="Leaderboard" icon={<Trophy size={22} />} />
                    <NavItem href="/settings" active={isActive('/settings')} label="Settings" icon={<Settings size={22} />} />
                </nav>

                {/* User Profile */}
                <div className="px-6 mt-auto mb-6">
                    <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition cursor-pointer border border-white/5 group">
                        <div className="w-10 h-10 rounded-full bg-decode-blue-3 flex items-center justify-center font-bold text-lg text-shadow ring-2 ring-transparent group-hover:ring-white/20 transition-all shrink-0">
                            {user.name.charAt(0)}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-semibold truncate group-hover:text-white transition-colors">{user.name}</p>
                            <p className="text-xs text-blue-200/70">Level {user.level} Solver</p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

const NavItem = ({ href, active, label, icon, Mobile }: { href: string; active: boolean; label: string; icon: React.ReactNode, Mobile?: boolean }) => {

    if (Mobile) {
        return (
            <Link
                href={href}
                className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 group relative
            ${active ? 'text-decode-accent' : 'text-blue-200/50 hover:text-white'}
            `}
            >
                {active && (
                    <div className="absolute -top-3 w-1 h-1 bg-decode-accent rounded-full shadow-[0_0_10px_2px_rgba(34,211,238,0.5)]"></div>
                )}
                <div className={`transition-transform duration-200 ${active ? '-translate-y-1' : ''}`}>
                    {icon}
                </div>
            </Link>
        )
    }

    return (
        <Link
            href={href}
            className={`flex items-center space-x-3 px-6 py-3.5 rounded-xl transition-all duration-200 group relative overflow-hidden
            ${active ? 'text-white' : 'text-blue-200/60 hover:text-white hover:bg-white/5'}
            `}
        >
            {active && (
                <div className="absolute inset-0 bg-gradient-to-r from-decode-accent/10 to-transparent border-l-2 border-decode-accent"></div>
            )}
            <div className={`relative z-10 transition-colors ${active ? 'text-decode-accent' : 'group-hover:text-cyan-200'}`}>
                {icon}
            </div>
            <span className={`text-[15px] font-medium tracking-wide relative z-10 ${active ? 'text-white' : ''}`}>
                {label}
            </span>
        </Link>
    );
};

export default Sidebar;
