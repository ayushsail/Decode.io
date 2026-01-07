import React from 'react';
import Card from '@/components/ui/Card';
import { Trophy, Medal, Crown } from 'lucide-react';
import { getLeaderboard } from '@/app/actions/puzzles';

export const dynamic = 'force-dynamic';

const Leaderboard = async () => {
    const sortedUsers = await getLeaderboard();

    const getRankIcon = (rank: number) => {
        if (rank === 1) return <Crown size={24} className="text-yellow-400 fill-yellow-400 drop-shadow-glow" />;
        if (rank === 2) return <Medal size={24} className="text-gray-300 fill-gray-300" />;
        if (rank === 3) return <Medal size={24} className="text-amber-600 fill-amber-600" />;
        return <span className="font-mono font-bold text-decode-text-muted">#{rank}</span>;
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <header className="text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-bold mb-2 tracking-tight text-white drop-shadow-md flex items-center gap-3">
                        <Trophy className="text-decode-warning" size={32} />
                        Global Leaderboard
                    </h2>
                    <p className="text-decode-text-secondary font-medium tracking-wide">Top C programmers competing for system dominance.</p>
                </div>
                {/* User Stat Summary Card could go here */}
            </header>

            <Card className="border-white/5" color="bg-decode-surface/50" noPadding>
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 text-xs font-bold text-decode-text-muted uppercase tracking-widest bg-white/5">
                    <div className="col-span-2 text-center">Rank</div>
                    <div className="col-span-6 md:col-span-7">User</div>
                    <div className="col-span-4 md:col-span-3 text-right">XP Gained</div>
                </div>

                {/* Rows */}
                <div className="divide-y divide-white/5">
                    {sortedUsers.length > 0 ? (
                        sortedUsers.map((user: any) => (
                            <div
                                key={user.rank}
                                className={`
                                    grid grid-cols-12 gap-4 px-6 py-4 items-center transition-all duration-200
                                    hover:bg-white/5 border-l-4 border-transparent hover:border-white/10
                                `}
                            >
                                <div className="col-span-2 flex justify-center items-center">
                                    {getRankIcon(user.rank)}
                                </div>
                                <div className="col-span-6 md:col-span-7 flex items-center space-x-4">
                                    <div className={`
                                        w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-inner
                                        ${user.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-amber-600 text-white ring-2 ring-yellow-400/50' :
                                            'bg-white/10 text-decode-text-secondary'}
                                    `}>
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-bold truncate text-white">
                                            {user.name}
                                        </p>
                                        <p className="text-xs text-decode-text-muted flex items-center gap-1">
                                            <span>{user.country || 'Global'}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="col-span-4 md:col-span-3 text-right">
                                    <span className="font-mono font-bold text-lg text-decode-success">
                                        {user.xp}
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
        </div>
    );
};

export default Leaderboard;
