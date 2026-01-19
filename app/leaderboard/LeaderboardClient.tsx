'use client';

import React from 'react';
import { useUser } from '@/context/UserContext';
import { Trophy, Medal, Crown, User as UserIcon } from 'lucide-react';
import Card from '@/components/ui/Card';

const LeaderboardClient = ({ initialUsers }: { initialUsers: any[] }) => {
    const { user, supabaseUser } = useUser();

    // Merge current user into leaderboard
    const users = React.useMemo(() => {
        let currentList = [...initialUsers];

        if (user) {
            // Remove any placeholder "User Name (You)" if it exists
            currentList = currentList.filter(u => !u.highlight || u.id === user.id);

            // Check if user is already in list
            const userIndex = currentList.findIndex(u => u.username === user.username || u.name === user.full_name);

            const currentUserData = {
                rank: 0,
                name: user.full_name || user.username,
                xp: user.xp.toLocaleString(),
                country: "🏳️",
                highlight: true,
                id: user.id
            };

            if (userIndex !== -1) {
                currentList[userIndex] = { ...currentList[userIndex], ...currentUserData };
            } else {
                currentList.push(currentUserData);
            }
        }

        // Re-sort based on XP (numeric)
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
                    users.map((u: any, i: number) => {
                        const isMe = user && (u.id === user.id || u.name === (user.full_name || user.username));
                        return (
                            <div
                                key={i}
                                className={`
                                    grid grid-cols-12 gap-4 px-6 py-4 items-center transition-all duration-200
                                    hover:bg-white/5 border-l-4 border-transparent hover:border-white/10
                                    ${isMe ? 'bg-white/5 border-l-decode-accent' : ''}
                                `}
                            >
                                <div className="col-span-2 flex justify-center items-center">
                                    {getRankIcon(u.rank)}
                                </div>
                                <div className="col-span-6 md:col-span-7 flex items-center space-x-4">
                                    <div className={`
                                        w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-inner
                                        ${u.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-amber-600 text-white ring-2 ring-yellow-400/50' :
                                            (isMe ? 'bg-decode-primary text-white' : 'bg-white/10 text-decode-text-secondary')}
                                    `}>
                                        {u.avatar_url ? (
                                            <img src={u.avatar_url} alt={u.name} className="w-full h-full rounded-full object-cover" />
                                        ) : (
                                            u.name.charAt(0).toUpperCase()
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <p className={`font-bold truncate ${isMe ? 'text-decode-accent' : 'text-white'}`}>
                                            {u.name} {isMe && '(You)'}
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
                        );
                    })
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
