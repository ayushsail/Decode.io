'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import NextLink from 'next/link';
import { Play, RotateCcw, CheckCircle, ArrowLeft, Terminal } from 'lucide-react';
import { PUZZLES } from '../../data';
import { useUser } from '@/context/UserContext';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export default function PuzzleDetail() {
    const params = useParams();
    const router = useRouter();
    const { completePuzzle } = useUser();
    const [code, setCode] = useState("");
    const [output, setOutput] = useState<string | null>(null);

    const puzzle = PUZZLES.find(p => p.id === params.id);

    useEffect(() => {
        if (puzzle) {
            setCode(puzzle.starterCode);
        }
    }, [puzzle]);

    if (!puzzle) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <h2 className="text-3xl font-bold mb-4 text-white">Challenge Not Found</h2>
                <NextLink href="/puzzles">
                    <Button variant="ghost">Back to Library</Button>
                </NextLink>
            </div>
        );
    }

    const handleRun = () => {
        setOutput("Compiling with gcc 12.2.0...\nRunning tests...\n> Test Case 1: Passed ✅\n> Test Case 2: Passed ✅\n> Execution time: 12ms");
    };

    const handleSubmit = () => {
        if (!puzzle) return;

        setOutput("Submitting solution...\n> Compiling...\n> All cases passed! 🎉\n> Memory Usage: 0.4MB\n> Runtime: 2ms\n> XP Awarded: " + puzzle.xp);
        completePuzzle(puzzle.id, puzzle.xp);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)]">
            {/* Header */}
            <div className="flex items-center space-x-4 mb-6">
                <NextLink href="/puzzles" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition text-decode-text-secondary hover:text-white">
                    <ArrowLeft size={20} />
                </NextLink>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">{puzzle.title}</h1>
                    <div className="flex items-center space-x-3 text-sm mt-1">
                        <Badge variant={puzzle.difficulty === 'Hard' ? 'error' : 'warning'}>{puzzle.difficulty}</Badge>
                        <Badge variant="outline">{puzzle.category}</Badge>
                        <span className="text-decode-text-muted font-mono">+ {puzzle.xp} XP</span>
                    </div>
                </div>
            </div>

            {/* Split Screen */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">

                {/* Left: Problem Description - Uses standard surface */}
                <div className="bg-decode-surface/50 rounded-2xl border border-white/5 p-6 overflow-y-auto backdrop-blur-sm shadow-premium flex flex-col">
                    <h3 className="text-lg font-bold mb-4 border-b border-white/5 pb-2 text-white">Description</h3>
                    <p className="text-decode-text-secondary leading-relaxed mb-8">
                        {puzzle.description}
                    </p>

                    <h3 className="text-lg font-bold mb-3 text-white">Examples</h3>
                    <div className="space-y-4">
                        {puzzle.examples.map((ex, i) => (
                            <div key={i} className="bg-black/40 rounded-xl p-4 font-mono text-sm border border-white/5 relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-1 h-full bg-decode-accent/20 group-hover:bg-decode-accent transition-colors"></div>
                                <div className="mb-2"><span className="text-decode-text-muted">Input:</span> <span className="text-white">{ex.input}</span></div>
                                <div><span className="text-decode-text-muted">Output:</span> <span className="text-decode-success">{ex.output}</span></div>
                            </div>
                        ))}
                        {puzzle.examples.length === 0 && <p className="text-decode-text-muted italic">No examples provided.</p>}
                    </div>
                </div>

                {/* Right: Code Editor - Darker background for contrast */}
                <div className="flex flex-col bg-[#0d1117] rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative">
                    {/* Editor Header */}
                    <div className="bg-decode-surface px-4 py-2 flex items-center justify-between border-b border-white/5">
                        <div className="flex items-center gap-2 text-xs text-decode-text-muted uppercase tracking-widest font-bold">
                            <Terminal size={14} />
                            <span>C (GCC 12.2.0)</span>
                        </div>
                        <div className="flex space-x-2">
                            <Button size="sm" variant="ghost" className="!p-1.5 h-auto text-decode-text-muted" onClick={() => setCode(puzzle.starterCode)} title="Reset Code">
                                <RotateCcw size={14} />
                            </Button>
                        </div>
                    </div>

                    {/* Editor Area (Mock) */}
                    <textarea
                        className="flex-1 w-full bg-[#0d1117] text-decode-text-primary font-mono p-4 text-sm focus:outline-none resize-none leading-relaxed"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        spellCheck={false}
                    />

                    {/* Console / Output */}
                    {output && (
                        <div className="h-40 bg-[#0d1117] border-t border-white/10 p-4 font-mono text-sm overflow-y-auto relative">
                            <div className="absolute top-2 right-2 text-[10px] text-decode-text-muted uppercase tracking-wider">Terminal Output</div>
                            <pre className="text-decode-success/90 whitespace-pre-wrap">{output}</pre>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="p-4 bg-decode-surface/50 border-t border-white/5 flex justify-end space-x-3 backdrop-blur-sm">
                        <Button variant="secondary" size="md" onClick={handleRun} className="border-decode-success/20 hover:border-decode-success/40 text-decode-success hover:text-decode-success hover:bg-decode-success/10">
                            <Play size={16} className="mr-2" />
                            Run Code
                        </Button>

                        <Button variant="primary" size="md" onClick={handleSubmit} className="shadow-lg shadow-decode-primary/20">
                            <CheckCircle size={16} className="mr-2" />
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
