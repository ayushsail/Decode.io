'use client';

import React from 'react';
import NextLink from 'next/link';
import { CATEGORIES, PUZZLES } from '../data';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { ArrowRight, Star } from 'lucide-react';

const Puzzles = () => {
    return (
        <div className="space-y-10">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-4xl font-bold mb-2 tracking-tight text-white drop-shadow-md">Challenge Library</h2>
                    <p className="text-decode-text-secondary font-medium tracking-wide">Explore problems across {CATEGORIES.length} core C disciplines.</p>
                </div>
                {/* Optional filters could go here */}
            </header>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {CATEGORIES.map((cat, i) => (
                    <Card key={i} className="hover:border-decode-accent/30 transition-colors group cursor-pointer" color="bg-decode-surface" noPadding>
                        <div className="p-6 flex items-center space-x-4">
                            <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                                {cat.icon}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white group-hover:text-decode-accent transition-colors">{cat.name}</h3>
                                <p className="text-sm text-decode-text-muted">{cat.count} Challenges</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <section>
                <h3 className="text-2xl font-bold mb-6 tracking-wide flex items-center gap-2">
                    <Star className="text-decode-warning fill-decode-warning" size={24} />
                    Featured Challenges
                </h3>
                <div className="space-y-4">
                    {PUZZLES.map((puzzle) => (
                        <div key={puzzle.id} className="group relative bg-decode-surface border border-white/5 rounded-2xl p-6 hover:border-decode-accent/20 transition-all hover:shadow-glow flex flex-col md:flex-row gap-6 md:items-center">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <Badge variant={puzzle.difficulty === 'Hard' ? 'error' : 'warning'}>{puzzle.difficulty}</Badge>
                                    <Badge variant="outline">{puzzle.category}</Badge>
                                    <span className="text-xs text-decode-text-muted font-mono">+ {puzzle.xp} XP</span>
                                </div>
                                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-decode-accent transition-colors">{puzzle.title}</h4>
                                <p className="text-sm text-decode-text-secondary line-clamp-2 md:line-clamp-1">{puzzle.description}</p>
                            </div>

                            <div className="flex-shrink-0">
                                <NextLink href={`/puzzles/${puzzle.id}`}>
                                    <Button variant="primary" size="md" className="shadow-none">
                                        Solve Challenge
                                        <ArrowRight size={18} className="ml-2" />
                                    </Button>
                                </NextLink>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Puzzles;
