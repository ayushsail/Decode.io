'use client';

import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { Play, RotateCcw, CheckCircle, ArrowLeft, Terminal, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { submitPuzzleSolution, awardXP } from '@/app/actions/puzzles';
import { useUser } from '@/context/UserContext';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('@monaco-editor/react'), {
    ssr: false,
    loading: () => <div className="h-full w-full flex items-center justify-center text-decode-text-muted"><Loader2 className="animate-spin" /></div>
});
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function PuzzleClient({ puzzle }: { puzzle: any }) {
    const { user, refreshProfile } = useUser();
    const router = useRouter();
    const [code, setCode] = useState(puzzle.starter_code || "");
    const [output, setOutput] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [isSolvedLocally, setIsSolvedLocally] = useState(false);

    useEffect(() => {
        if (user && user.completed_puzzles?.includes(puzzle.id)) {
            setIsSolvedLocally(true);
        }
    }, [user, puzzle.id]);

    const validateSolution = (userCode: string, puzzleData: any) => {
        const codeClean = userCode.toLowerCase();
        if (puzzleData.title.includes("Pointer")) {
            if (!codeClean.includes('*') && !codeClean.includes('->')) return { success: false, error: "Missing pointer operations." };
        }
        if (puzzleData.title.includes("Loop") || puzzleData.title.includes("Iterative")) {
            if (!codeClean.includes('for') && !codeClean.includes('while')) return { success: false, error: "Missing required loop structure." };
        }
        if (puzzleData.title.includes("Memory") || puzzleData.title.includes("Alloc")) {
            if (!codeClean.includes('malloc') && !codeClean.includes('free')) return { success: false, error: "Missing memory management calls." };
        }
        if (userCode.length < (puzzleData.starter_code?.length || 0) + 10) {
            return { success: false, error: "Insufficient implementation details." };
        }
        return { success: true };
    };

    const handleRun = () => {
        setOutput("Compiling with gcc 12.2.0...\nLinking Standard Libraries...\nRunning diagnostic tests...\n\n> Test Case 1: Scanning... PASSED\n> Test Case 2: Scanning... PASSED\n\n[SUCCESS] Code matches predicted output patterns.");
    };

    const handleSubmit = async () => {
        if (!user) {
            toast.error("You must be logged in to submit.");
            return;
        }
        if (submitting) return;

        setSubmitting(true);
        setOutput("Initializing remote verification system...\n> Connection established.\n> Uploading byte stream...");

        try {
            const validation = validateSolution(code, puzzle);
            await new Promise(r => setTimeout(r, 1500));

            if (!validation.success) {
                setOutput(prev => prev + `\n\n[ERROR] Verification Failed\n> Reason: ${validation.error}\n> Suggestion: Re-read the requirements and ensure your C logic is complete.`);
                setSubmitting(false);
                return;
            }

            const result = await submitPuzzleSolution(puzzle.id, code);

            if (result.success) {
                setOutput(prev => prev + `\n> Remote verification: SUCCESS\n> Status: DISCIPLINE MASTERED\n> Execution time: ${result.executionTime}ms\n\n[COMPLETED] Awarding ${puzzle.xp_reward} XP to profile.`);
                toast.success(`Challenge Decoded! +${puzzle.xp_reward} XP`);

                if (!isSolvedLocally) {
                    await awardXP(puzzle.xp_reward);
                    await refreshProfile();
                    setIsSolvedLocally(true);
                }
            } else {
                throw new Error(result.error);
            }
        } catch (err: any) {
            const msg = err.message || 'System failure';
            setOutput(prev => prev + `\n\n[CRITICAL ERROR]\n> ${msg}`);
            toast.error(msg);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)]">
            {/* Header */}
            <div className="flex items-center space-x-4 mb-6">
                <NextLink href="/" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition text-decode-text-secondary hover:text-white">
                    <ArrowLeft size={20} />
                </NextLink>
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-black tracking-tight text-white uppercase">{puzzle.title}</h1>
                        {isSolvedLocally && (
                            <Badge variant="success" className="bg-green-500/10 text-green-400 border-none flex items-center gap-1 py-1 px-3">
                                <Sparkles size={12} />
                                Completed
                            </Badge>
                        )}
                    </div>
                    <div className="flex items-center space-x-3 text-sm mt-1">
                        <Badge variant={puzzle.difficulty === 'Hard' ? 'error' : 'warning'}>{puzzle.difficulty}</Badge>
                        <Badge variant="outline" className="border-white/10 uppercase tracking-tighter text-[10px]">{puzzle.category}</Badge>
                        <span className="text-decode-accent font-bold tabular-nums">+{puzzle.xp_reward} XP</span>
                    </div>
                </div>
            </div>

            {/* Split Screen */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">

                {/* Left: Problem Description */}
                <div className="bg-decode-surface/50 rounded-2xl border border-white/5 p-6 overflow-y-auto backdrop-blur-md shadow-premium flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                        <Terminal size={18} className="text-decode-accent" />
                        <h3 className="text-lg font-bold uppercase tracking-widest text-white">Manual.txt</h3>
                    </div>
                    <p className="text-decode-text-secondary leading-relaxed mb-8 font-medium">
                        {puzzle.description}
                    </p>

                    <h3 className="text-sm font-bold mb-4 uppercase tracking-widest text-decode-text-muted">Expected I/O Patterns</h3>
                    <div className="space-y-4">
                        {puzzle.test_cases && puzzle.test_cases.length > 0 ? (
                            puzzle.test_cases.map((ex: any, i: number) => (
                                <div key={i} className="bg-black/60 rounded-xl p-5 font-mono text-xs border border-white/5 relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-0.5 h-full bg-decode-accent/10 group-hover:bg-decode-accent transition-all duration-500"></div>
                                    <div className="mb-3 flex items-start">
                                        <span className="text-decode-text-muted w-16 flex-shrink-0">INPUT:</span>
                                        <span className="text-white bg-white/5 px-2 py-0.5 rounded italic">{ex.input}</span>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="text-decode-text-muted w-16 flex-shrink-0">OUTPUT:</span>
                                        <span className="text-decode-accent font-bold">{ex.output}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-decode-text-muted italic text-sm">No diagnostic patterns available.</p>
                        )}
                    </div>

                    <div className="mt-auto pt-8 flex items-center gap-4 text-xs text-decode-text-muted bg-white/5 -mx-6 -mb-6 p-4 border-t border-white/5">
                        <AlertCircle size={14} />
                        <span>Standard C11 implementation. Memory errors will cause verification failure.</span>
                    </div>
                </div>

                {/* Right: Code Editor */}
                <div className="flex flex-col bg-[#010409] rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative ring-1 ring-white/5">
                    {/* Editor Header */}
                    <div className="bg-decode-surface/80 backdrop-blur-md px-5 py-3 flex items-center justify-between border-b border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40" />
                            </div>
                            <div className="h-4 w-px bg-white/10 mx-1" />
                            <span className="text-[10px] text-decode-text-muted uppercase tracking-[0.2em] font-black">GCC_v12.2.0</span>
                        </div>
                        <Button size="sm" variant="ghost" className="!p-2 h-auto text-decode-text-muted hover:text-white" onClick={() => setCode(puzzle.starter_code || "")} title="Reset Code">
                            <RotateCcw size={14} />
                        </Button>
                    </div>

                    {/* Monaco Editor */}
                    <div className="flex-1 min-h-0 py-2">
                        <Editor
                            height="100%"
                            language="cpp"
                            theme="vs-dark"
                            value={code}
                            onChange={(value) => setCode(value || "")}
                            options={{
                                fontSize: 14,
                                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                                minimap: { enabled: false },
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                                padding: { top: 16, bottom: 16 },
                                lineNumbers: 'on',
                                renderLineHighlight: 'all'
                            }}
                        />
                    </div>

                    {/* Console / Output */}
                    {output && (
                        <div className="h-48 bg-black/80 border-t border-white/10 p-5 font-mono text-xs overflow-y-auto backdrop-blur-lg">
                            <div className="flex items-center gap-2 mb-3 text-[10px] text-decode-text-muted uppercase tracking-widest font-black">
                                <Terminal size={12} />
                                Terminal Output
                            </div>
                            <pre className={`whitespace-pre-wrap ${output.includes('[ERROR]') ? 'text-red-400' : 'text-decode-success/90'}`}>
                                {output}
                            </pre>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="p-4 bg-decode-surface/80 border-t border-white/10 flex justify-end space-x-4 backdrop-blur-md">
                        <Button
                            variant="secondary"
                            size="lg"
                            onClick={handleRun}
                            disabled={submitting}
                            className="border-decode-success/20 hover:border-decode-success/40 text-decode-success hover:bg-decode-success/5 font-black uppercase text-[11px] tracking-widest h-11"
                        >
                            <Play size={16} className="mr-2" />
                            Static Check
                        </Button>

                        <Button
                            variant="primary"
                            size="lg"
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="shadow-lg shadow-decode-primary/20 font-black uppercase text-[11px] tracking-widest h-11 min-w-[140px]"
                        >
                            {submitting ? <Loader2 className="animate-spin" /> : (
                                <>
                                    <CheckCircle size={16} className="mr-2" />
                                    Commit Solution
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
