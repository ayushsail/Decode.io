'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Play, RotateCcw, CheckCircle, ArrowLeft } from 'lucide-react';
import { PUZZLES } from '../../data';
import { useUser } from '@/context/UserContext';


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
                <h2 className="text-3xl font-bold mb-4">Puzzle Not Found</h2>
                <Link href="/puzzles" className="text-decode-accent hover:underline">Back to Library</Link>
            </div>
        );
    }

    const handleRun = () => {
        setOutput("Running tests...\n> Test Case 1: Passed ✅\n> Test Case 2: Passed ✅\n> Execution time: 12ms");
    };

    const handleSubmit = () => {
        if (!puzzle) return;

        setOutput("Submitting solution...\n> All cases passed! 🎉\n> XP Awarded: " + puzzle.xp);
        completePuzzle(puzzle.id, puzzle.xp);

        // Optional: Redirect back to puzzles after delay
        // setTimeout(() => router.push('/puzzles'), 2000);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)]">
            {/* Header */}
            <div className="flex items-center space-x-4 mb-6">
                <Link href="/puzzles" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">{puzzle.title}</h1>
                    <div className="flex items-center space-x-3 text-sm mt-1">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold bg-white/10 ${puzzle.difficulty === 'Hard' ? 'text-red-400' : 'text-green-400'}`}>{puzzle.difficulty}</span>
                        <span className="text-gray-400">{puzzle.category}</span>
                    </div>
                </div>
            </div>

            {/* Split Screen */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">

                {/* Left: Problem Description */}
                <div className="bg-decode-blue-2/30 rounded-2xl border border-white/10 p-6 overflow-y-auto backdrop-blur-sm shadow-premium">
                    <h3 className="text-lg font-bold mb-4 border-b border-white/10 pb-2">Description</h3>
                    <p className="text-blue-100/80 leading-relaxed mb-6">
                        {puzzle.description}
                    </p>

                    <h3 className="text-lg font-bold mb-3">Examples</h3>
                    <div className="space-y-4">
                        {puzzle.examples.map((ex, i) => (
                            <div key={i} className="bg-black/20 rounded-lg p-4 font-mono text-sm border border-white/5">
                                <div className="mb-2"><span className="text-gray-400">Input:</span> <span className="text-white">{ex.input}</span></div>
                                <div><span className="text-gray-400">Output:</span> <span className="text-green-400">{ex.output}</span></div>
                            </div>
                        ))}
                        {puzzle.examples.length === 0 && <p className="text-gray-500 italic">No examples provided.</p>}
                    </div>
                </div>

                {/* Right: Code Editor */}
                <div className="flex flex-col bg-[#1e1e1e] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                    {/* Editor Header */}
                    <div className="bg-[#252526] px-4 py-2 flex items-center justify-between border-b border-white/5">
                        <div className="text-xs text-gray-400 uppercase tracking-widest font-bold">C (GCC 12.2.0)</div>
                        <div className="flex space-x-2">
                            <button onClick={() => setCode(puzzle.starterCode)} className="p-1.5 rounded hover:bg-white/10 transition text-gray-400 hover:text-white" title="Reset Code">
                                <RotateCcw size={14} />
                            </button>
                        </div>
                    </div>

                    {/* Editor Area (Mock) */}
                    <textarea
                        className="flex-1 w-full bg-[#1e1e1e] text-blue-100 font-mono p-4 text-sm focus:outline-none resize-none"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        spellCheck={false}
                    />

                    {/* Console / Output */}
                    {output && (
                        <div className="h-32 bg-black/40 border-t border-white/5 p-4 font-mono text-sm overflow-y-auto">
                            <pre className="text-green-300 whitespace-pre-wrap">{output}</pre>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="p-4 bg-[#252526] border-t border-white/5 flex justify-end space-x-3">
                        <button onClick={handleRun} className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-green-600/20 text-green-400 hover:bg-green-600/30 transition border border-green-500/20 font-semibold text-sm">
                            <Play size={16} />
                            <span>Run Code</span>
                        </button>
                        <button onClick={handleSubmit} className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-decode-accent/20 text-decode-accent hover:bg-decode-accent/30 transition border border-decode-accent/20 font-semibold text-sm shadow-[0_0_15px_-3px_rgba(34,211,238,0.3)]">
                            <CheckCircle size={16} />
                            <span>Submit</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
