'use client';

import React from 'react';
import { useUser } from '@/context/UserContext';
import { Trophy, Medal, Crown } from 'lucide-react';
import Card from '@/components/ui/Card';

const LeaderboardClient = ({ initialUsers }: { initialUsers: any[] }) => {
    const { user } = useUser();

    // Merge current user into leaderboard
    const users = React.useMemo(() => {
        let currentList = [...initialUsers];

        if (user) {
            // Check if user is already in list (for demo purposes, we might replace the placeholder)
            const exists = currentList.find(u => u.highlight);
            if (exists) {
                // Replace placeholder "User Name (You)" with actual user data
                currentList = currentList.map(u =>
                    u.highlight ? { ...u, name: user.name, xp: user.xp.toLocaleString(), rank: 0 } : u // Rank 0 temp to resort
                );
            } else {
                // Add user
                currentList.push({
                    rank: 0,
                    name: user.name,
                    xp: user.xp.toLocaleString(),
                    country: "🏳️", // specific flag or default
                    highlight: true
                });
            }
        }

        // Re-sort based on XP (numeric)
        // Note: XP in data.ts is string "15,420", in Context it's number
        return currentList.sort((a, b) => {
            const xpA = typeof a.xp === 'string' ? parseInt(a.xp.replace(/,/g, '')) : a.xp;
            const xpB = typeof b.xp === 'string' ? parseInt(b.xp.replace(/,/g, '')) : b.xp;
            return xpB - xpA;
        }).map((u, i) => ({ ...u, rank: i + 1 }));

    }, [initialUsers, user]);

    const getRankIcon = (rank: number) => {
        if (rank === 1) return <Crown size={24} className="text-yellow-400 fill-yellow-400 drop-shadow-glow" />;
        if (rank === 2) return <Medal size={24} className="text-gray-300 fill-gray-300" />;
        if (rank === 3) return <Medal size={24} className="text-amber-600 fill-amber-600" />;
        return <span className="font-mono font-bold text-decode-text-muted">#{rank}</span>;
    };

    return (
        <Card className="border-white/5" color="bg-decode-surface/50" noPadding>
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 text-xs font-bold text-decode-text-muted uppercase tracking-widest bg-white/5">
                <div className="col-span-2 text-center">Rank</div>
                <div className="col-span-6 md:col-span-7">User</div>
                <div className="col-span-4 md:col-span-3 text-right">XP Gained</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-white/5">
                {users.length > 0 ? (
                    users.map((u: any) => (
                        <div
                            key={u.rank}
                            className={`
                                grid grid-cols-12 gap-4 px-6 py-4 items-center transition-all duration-200
                                hover:bg-white/5 border-l-4 border-transparent hover:border-white/10
                                ${user && u.name === user.name ? 'bg-white/5 border-l-decode-accent' : ''}
                            `}
                        >
                            <div className="col-span-2 flex justify-center items-center">
                                {getRankIcon(u.rank)}
                            </div>
                            <div className="col-span-6 md:col-span-7 flex items-center space-x-4">
                                <div className={`
                                    w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-inner
                                    ${u.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-amber-600 text-white ring-2 ring-yellow-400/50' :
                                        (user && u.name === user.name ? 'bg-decode-primary text-white' : 'bg-white/10 text-decode-text-secondary')}
                                `}>
                                    {u.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                    <p className={`font-bold truncate ${user && u.name === user.name ? 'text-decode-accent' : 'text-white'}`}>
                                        {u.name} {user && u.name === user.name && '(You)'}
                                    </p>
                                    <p className="text-xs text-decode-text-muted flex items-center gap-1">
                                        <span>{u.country || 'Global'}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="col-span-4 md:col-span-3 text-right">
                                <span className="font-mono font-bold text-lg text-decode-success">
                                    {u.xp}
                                </span>
                                <span className="text-xs text-decode-text-muted ml-1">XP</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10 text-decode-text-muted">
                        No active players yet. Be the first!
                    </div>
                )}
            </div>
        </Card>
    );
};

export default LeaderboardClient;
