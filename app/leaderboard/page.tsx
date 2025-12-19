'use client';

import React from 'react';

const Leaderboard = () => {
    const users = [
        { rank: 1, name: "Alex Chen", xp: "15,420", country: "🇺🇸" },
        { rank: 2, name: "Maria Garcia", xp: "14,850", country: "🇪🇸" },
        { rank: 3, name: "Yuki Tanaka", xp: "14,200", country: "🇯🇵" },
        { rank: 4, name: "Sarah Jones", xp: "13,900", country: "🇬🇧" },
        { rank: 5, name: "User Name (You)", xp: "12,100", country: "🇨🇦", highlight: true },
    ];

    return (
        <div className="max-w-4xl mx-auto">
            <header className="mb-10 text-center">
                <h2 className="text-4xl font-bold mb-2 tracking-tight text-white/95 drop-shadow-md">Global Leaderboard</h2>
                <p className="text-blue-200/80 font-medium tracking-wide">Top solvers this week.</p>
            </header>

            <div className="bg-decode-blue-2/30 rounded-3xl border border-white/10 overflow-hidden backdrop-blur-sm shadow-premium">
                <div className="grid grid-cols-12 gap-4 p-6 border-b border-white/10 text-sm font-bold text-blue-300 uppercase tracking-widest">
                    <div className="col-span-2 text-center">Rank</div>
                    <div className="col-span-6">User</div>
                    <div className="col-span-4 text-right">XP Gained</div>
                </div>

                {users.map((user) => (
                    <div key={user.rank} className={`grid grid-cols-12 gap-4 p-6 items-center ${user.highlight ? 'bg-cyan-500/10 border-l-4 border-decode-accent' : 'hover:bg-white/5 border-l-4 border-transparent'} transition-colors`}>
                        <div className="col-span-2 text-center font-bold text-xl">
                            {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : user.rank === 3 ? '🥉' : `#${user.rank}`}
                        </div>
                        <div className="col-span-6 flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold">
                                {user.name.charAt(0)}
                            </div>
                            <div>
                                <p className={`font-bold ${user.highlight ? 'text-decode-accent' : 'text-white'}`}>{user.name}</p>
                                <p className="text-xs text-gray-400">{user.country}</p>
                            </div>
                        </div>
                        <div className="col-span-4 text-right font-mono text-lg text-green-400 drop-shadow-sm">
                            {user.xp} XP
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Leaderboard;
