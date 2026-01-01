'use client';

import React from 'react';
import Link from 'next/link';
import { CATEGORIES, PUZZLES } from '../data';

const Puzzles = () => {
    return (
        <div className="space-y-8">
            <header>
                <h2 className="text-4xl font-bold mb-2 tracking-tight text-white/95 drop-shadow-md">Puzzles Library</h2>
                <p className="text-blue-200/80 font-medium tracking-wide">Browse our collection of coding challenges.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {CATEGORIES.map((cat, i) => (
                    <div key={i} className="bg-decode-blue-2/50 rounded-2xl p-6 border border-white/5 hover:border-white/20 transition-all hover:bg-decode-blue-2 cursor-pointer group shadow-sm hover:shadow-premium">
                        <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                            <span className="text-xl">{cat.icon}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-1 tracking-wide">{cat.name}</h3>
                        <p className="text-sm text-blue-200">{cat.count} Challenges</p>
                    </div>
                ))}
            </div>

            <h3 className="text-2xl font-bold mt-12 mb-6 tracking-wide drop-shadow-sm">Recent Challenges</h3>
            <div className="space-y-4">
                {PUZZLES.map((puzzle) => (
                    <div key={puzzle.id} className="bg-black/20 p-6 rounded-2xl flex items-center justify-between border border-white/5 shadow-sm hover:shadow-md transition-all">
                        <div>
                            <h4 className="font-bold text-lg tracking-wide">{puzzle.title}</h4>
                            <p className="text-sm text-gray-400">{puzzle.difficulty} • {puzzle.category} • {puzzle.xp} XP</p>
                        </div>
                        <Link href={`/puzzles/${puzzle.id}`}>
                            <button className="px-6 py-2 bg-decode-blue-3 rounded-xl hover:bg-white hover:text-decode-blue-1 transition font-semibold shadow-md hover:shadow-lg">
                                Solve
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Puzzles;
