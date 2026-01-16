import React from 'react';
import { Trophy } from 'lucide-react';
import { USERS } from '@/app/data';
import LeaderboardClient from './LeaderboardClient';

export const dynamic = 'force-dynamic';

const Leaderboard = () => {
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
            </header>

            <LeaderboardClient initialUsers={USERS} />
        </div>
    );
};

export default Leaderboard;
