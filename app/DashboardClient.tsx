'use client';

import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { Puzzle, ArrowRight, Flame, CheckCircle2, Trophy, Cpu, Layers, Brain, Terminal, ArrowRightLeft, Binary } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { useUser } from '@/context/UserContext';

type Difficulty = 'Easy' | 'Medium' | 'Hard';

export default function DashboardClient({ puzzles, initialUser }: { puzzles: any[], initialUser?: any }) {
    const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('Easy');
    const { user: contextUser } = useUser();

    // Prefer context user if available (updates), otherwise use initial server-side user
    const user = contextUser || initialUser;

    // Group puzzles by difficulty - Memoized for performance
    const groupedPuzzles = React.useMemo(() => ({
        'Easy': puzzles.filter(p => p.difficulty === 'Easy'),
        'Medium': puzzles.filter(p => p.difficulty === 'Medium'),
        'Hard': puzzles.filter(p => p.difficulty === 'Hard'),
    }), [puzzles]);

    const currentPuzzles = groupedPuzzles[selectedDifficulty];
    const completedCount = user?.completed_puzzles?.length || 0;
    const totalPuzzles = puzzles.length || 30;

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // Filter puzzles
    const filteredPuzzles = puzzles.filter(p => {
        const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
        const matchesDifficulty = selectedDifficulty ? p.difficulty === selectedDifficulty : true;
        return matchesCategory && matchesDifficulty;
    });

    const userXp = user?.xp || 0;

    const categories = [
        { id: 'Algorithms', name: 'Algorithms', icon: <Cpu size={24} />, color: 'text-green-400' },
        { id: 'Data Structures', name: 'Data Structures', icon: <Layers size={24} />, color: 'text-orange-400' },
        { id: 'Memory Management', name: 'Memory Management', icon: <Brain size={24} />, color: 'text-pink-400' },
        { id: 'System Programming', name: 'System Programming', icon: <Terminal size={24} />, color: 'text-blue-400' },
        { id: 'Pointers & Arrays', name: 'Pointers & Arrays', icon: <ArrowRightLeft size={24} />, color: 'text-cyan-400' },
        { id: 'Bit Manipulation', name: 'Bit Manipulation', icon: <Binary size={24} />, color: 'text-purple-400' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-8">
                <div>
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight text-white drop-shadow-md">
                        Challenge Library
                    </h2>
                    <p className="text-lg text-decode-text-secondary font-medium tracking-wide">
                        Explore problems across 6 core C disciplines.
                    </p>
                </div>

                <Card color="bg-decode-surface/50" className="border-decode-accent/20 backdrop-blur-sm px-6 py-4 flex items-center gap-6 shadow-lg shadow-decode-primary/5">
                    <div className="text-right">
                        <p className="text-xs text-decode-text-muted uppercase tracking-widest font-extrabold mb-1">XP Points</p>
                        <p className="text-2xl font-black text-decode-accent tabular-nums">{userXp.toLocaleString()}</p>
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

            {/* Category Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((cat) => {
                    const count = puzzles.filter(p => p.category === cat.id).length;
                    const isActive = selectedCategory === cat.id;
                    return (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(isActive ? null : cat.id)}
                            className={`
                                relative flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 text-left group
                                ${isActive
                                    ? 'bg-white/10 border-decode-accent/50 shadow-glow'
                                    : 'bg-decode-surface/50 border-white/5 hover:bg-white/5 hover:border-white/10'
                                }
                            `}
                        >
                            <div className={`p-3 rounded-xl bg-white/5 ${cat.color} ${isActive ? 'scale-110' : 'group-hover:scale-110'} transition-transform duration-300`}>
                                {cat.icon}
                            </div>
                            <div>
                                <h3 className={`font-bold text-lg ${isActive ? 'text-white' : 'text-decode-text-primary group-hover:text-white'} transition-colors`}>{cat.name}</h3>
                                <p className="text-sm text-decode-text-muted">{count} Challenges</p>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Difficulty Tabs & Results */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2 bg-white/5 p-1 rounded-xl">
                        {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map((diff) => (
                            <button
                                key={diff}
                                onClick={() => setSelectedDifficulty(diff)}
                                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${selectedDifficulty === diff
                                    ? 'bg-decode-surface shadow-sm text-white'
                                    : 'text-decode-text-muted hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {diff}
                            </button>
                        ))}
                    </div>
                    <p className="text-decode-text-muted font-medium">
                        Showing {filteredPuzzles.length} challenges
                    </p>
                </div>

                {/* Puzzles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPuzzles.length > 0 ? (
                        filteredPuzzles.map((puzzle) => {
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
                            <p className="text-decode-text-muted text-lg font-medium">No challenges found in this sector.</p>
                            <Button variant="ghost" className="mt-4" onClick={() => { setSelectedCategory(null); setSelectedDifficulty('Easy'); }}>Reset Filters</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
