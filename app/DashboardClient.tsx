'use client';

import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { Puzzle, ArrowRight, Flame, CheckCircle2, Trophy } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { useUser } from '@/context/UserContext';

type Difficulty = 'Easy' | 'Medium' | 'Hard';

export default function DashboardClient({ puzzles }: { puzzles: any[] }) {
    const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('Easy');
    const { user } = useUser();

    // Group puzzles by difficulty
    const groupedPuzzles = {
        'Easy': puzzles.filter(p => p.difficulty === 'Easy'),
        'Medium': puzzles.filter(p => p.difficulty === 'Medium'),
        'Hard': puzzles.filter(p => p.difficulty === 'Hard'),
    };

    const currentPuzzles = groupedPuzzles[selectedDifficulty];
    const completedCount = user?.completed_puzzles?.length || 0;
    const totalPuzzles = puzzles.length || 30;

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight text-white drop-shadow-md">
                        Hacker Dashboard
                    </h2>
                    <p className="text-lg text-decode-text-secondary font-medium tracking-wide">
                        Solve C challenges and earn your rank in the matrix.
                    </p>
                </div>

                <Card color="bg-decode-surface/50" className="border-decode-accent/20 backdrop-blur-sm px-6 py-4 flex items-center gap-6">
                    <div className="text-right">
                        <p className="text-xs text-decode-text-muted uppercase tracking-widest font-extrabold mb-1">XP Points</p>
                        <p className="text-2xl font-black text-decode-accent tabular-nums">{user?.xp?.toLocaleString() || '0'}</p>
                    </div>
                    <div className="h-10 w-px bg-white/10" />
                    <div className="text-right">
                        <p className="text-xs text-decode-text-muted uppercase tracking-widest font-extrabold mb-1">Progress</p>
                        <div className="flex items-center gap-2">
                            <p className="text-2xl font-black text-white tabular-nums">{completedCount}<span className="text-decode-text-muted font-medium text-lg">/{totalPuzzles}</span></p>
                            <Trophy size={18} className="text-decode-warning" />
                        </div>
                    </div>
                </Card>
            </header>

            {/* Difficulty Tabs */}
            <div className="flex flex-wrap gap-4 p-1.5 bg-white/5 rounded-2xl w-fit border border-white/5">
                {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map((diff) => (
                    <button
                        key={diff}
                        onClick={() => setSelectedDifficulty(diff)}
                        className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 ${selectedDifficulty === diff
                                ? 'bg-decode-primary text-white shadow-glow'
                                : 'text-decode-text-muted hover:text-white hover:bg-white/5'
                            }`}
                    >
                        {diff}
                        <span className="ml-2 opacity-50 text-sm">{groupedPuzzles[diff].length}</span>
                    </button>
                ))}
            </div>

            {/* Puzzles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentPuzzles.length > 0 ? (
                    currentPuzzles.map((puzzle) => {
                        const isSolved = user?.completed_puzzles?.includes(puzzle.id);
                        return (
                            <NextLink href={`/puzzles/${puzzle.id}`} key={puzzle.id}>
                                <Card className={`group relative h-full border border-white/5 transition-all duration-500 hover:border-decode-accent/20 hover:translate-y-[-4px] hover:shadow-glow-sm cursor-pointer ${isSolved ? 'opacity-80' : ''}`} color="bg-decode-surface" noPadding>
                                    <div className="p-6 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-4">
                                            <Badge variant="outline" className="border-decode-accent/20 text-decode-accent">{puzzle.category}</Badge>
                                            {isSolved && (
                                                <Badge variant="success" className="bg-green-500/10 text-green-400 border-none flex items-center gap-1">
                                                    <CheckCircle2 size={12} />
                                                    Solved
                                                </Badge>
                                            )}
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-decode-accent transition-colors line-clamp-1">{puzzle.title}</h3>
                                        <p className="text-decode-text-secondary text-sm mb-6 line-clamp-2 flex-grow">{puzzle.description}</p>
                                        <div className="flex justify-between items-center mt-auto">
                                            <span className="text-xs font-mono text-decode-text-muted">+{puzzle.xp_reward} XP</span>
                                            <div className="flex items-center text-decode-accent font-bold text-sm transform transition-transform group-hover:translate-x-1">
                                                Initialize
                                                <ArrowRight size={16} className="ml-2" />
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </NextLink>
                        );
                    })
                ) : (
                    <div className="col-span-full py-20 text-center flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-decode-text-muted">
                            <Puzzle size={32} />
                        </div>
                        <p className="text-decode-text-muted text-lg font-medium">No challenges loaded in this sector.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
