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
                bg-decode-surface/90 border border-white/10 rounded-full backdrop-blur-xl
                shadow-2xl transition-all duration-300 px-6 py-2 flex items-center gap-6">
                <NavItem Mobile href="/" active={isActive('/')} label="Home" icon={<Home size={24} strokeWidth={2.5} />} />
                <NavItem Mobile href="/puzzles" active={isActive('/puzzles')} label="Puzzles" icon={<Puzzle size={24} strokeWidth={2.5} />} />
                <NavItem Mobile href="/leaderboard" active={isActive('/leaderboard')} label="Leaderboard" icon={<Trophy size={24} strokeWidth={2.5} />} />
                <NavItem Mobile href="/settings" active={isActive('/settings')} label="Settings" icon={<Settings size={24} strokeWidth={2.5} />} />
            </nav>

            {/* DESKTOP: Full Sidebar */}
            <aside className="hidden md:flex fixed top-0 left-0 h-screen w-72 bg-decode-bg/50 backdrop-blur-md border-r border-white/5 flex-col py-8 z-40">
                {/* Logo */}
                <div className="px-8 mb-12">
                    <h1 className="text-2xl font-bold tracking-tight text-white drop-shadow-md whitespace-nowrap font-mono">
                        DeCode<span className="text-decode-accent">.io</span>
                    </h1>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 space-y-2">
                    <NavItem href="/" active={isActive('/')} label="Home" icon={<Home size={20} />} />
                    <NavItem href="/puzzles" active={isActive('/puzzles')} label="Puzzles" icon={<Puzzle size={20} />} />
                    <NavItem href="/leaderboard" active={isActive('/leaderboard')} label="Leaderboard" icon={<Trophy size={20} />} />
                    <NavItem href="/settings" active={isActive('/settings')} label="Settings" icon={<Settings size={20} />} />
                </nav>

                {/* User Profile */}
                <div className="px-6 mt-auto mb-6">
                    {user ? (
                        <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition cursor-pointer border border-white/5 group relative overflow-hidden">
                            <div className="w-10 h-10 rounded-full bg-decode-primary flex items-center justify-center font-bold text-lg text-shadow-glow ring-2 ring-transparent group-hover:ring-white/20 transition-all shrink-0">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="overflow-hidden relative z-10">
                                <p className="text-sm font-semibold truncate text-decode-text-primary group-hover:text-white transition-colors">{user.name}</p>
                                <p className="text-xs text-decode-text-muted group-hover:text-decode-text-secondary">Level {user.level} Solver</p>
                            </div>
                        </div>
                    ) : (
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                            <p className="text-sm text-decode-text-secondary mb-2">Join the Revolution</p>
                            <button className="w-full py-2 bg-decode-primary text-decode-bg font-bold rounded-lg hover:bg-decode-accent transition-colors text-sm shadow-glow">
                                Sign In / Sign Up
                            </button>
                        </div>
                    )}
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
            ${active ? 'text-decode-accent' : 'text-decode-text-muted hover:text-white'}
            `}
            >
                {active && (
                    <div className="absolute -top-3 w-1 h-1 bg-decode-accent rounded-full shadow-glow"></div>
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
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden
            ${active ? 'text-white' : 'text-decode-text-secondary hover:text-white hover:bg-white/5'}
            `}
        >
            {active && (
                <div className="absolute inset-0 bg-decode-accent/5 border-l-2 border-decode-accent"></div>
            )}
            <div className={`relative z-10 transition-colors ${active ? 'text-decode-accent' : 'group-hover:text-decode-accent'}`}>
                {icon}
            </div>
            <span className={`text-[14px] font-medium tracking-wide relative z-10 ${active ? 'text-white' : ''}`}>
                {label}
            </span>
        </Link>
    );
};

export default Sidebar;
