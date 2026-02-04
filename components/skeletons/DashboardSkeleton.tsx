import React from 'react';

export default function DashboardSkeleton() {
    return (
        <div className="space-y-10 animate-pulse">
            {/* Header Section */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-4">
                    <div className="h-12 w-64 bg-white/10 rounded-xl"></div>
                    <div className="h-6 w-96 bg-white/5 rounded-lg"></div>
                </div>

                {/* Stats Card Skeleton */}
                <div className="w-full md:w-auto h-20 w-64 bg-decode-surface/50 border border-white/5 rounded-2xl p-6 flex items-center gap-6">
                    <div className="flex-1 space-y-2">
                        <div className="h-3 w-16 ml-auto bg-white/10 rounded"></div>
                        <div className="h-8 w-24 ml-auto bg-white/10 rounded"></div>
                    </div>
                    <div className="h-10 w-px bg-white/10"></div>
                    <div className="flex-1 space-y-2">
                        <div className="h-3 w-16 ml-auto bg-white/10 rounded"></div>
                        <div className="h-8 w-24 ml-auto bg-white/10 rounded"></div>
                    </div>
                </div>
            </header>

            {/* Category Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-24 bg-decode-surface/50 rounded-2xl border border-white/5 p-5 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-white/5"></div>
                        <div className="space-y-2">
                            <div className="h-5 w-32 bg-white/10 rounded"></div>
                            <div className="h-3 w-20 bg-white/5 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Difficulty Tabs & Grid Skeleton */}
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <div className="h-10 w-24 bg-white/10 rounded-lg"></div>
                        <div className="h-10 w-24 bg-white/5 rounded-lg"></div>
                        <div className="h-10 w-24 bg-white/5 rounded-lg"></div>
                    </div>
                    <div className="h-4 w-32 bg-white/5 rounded"></div>
                </div>
            </div>

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-64 bg-decode-surface rounded-2xl border border-white/5 p-6 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <div className="h-6 w-20 bg-white/10 rounded-full"></div>
                                {i % 3 === 0 && <div className="h-6 w-24 bg-green-500/10 rounded-full"></div>}
                            </div>
                            <div className="h-8 w-3/4 bg-white/10 rounded-lg mb-3"></div>
                            <div className="space-y-2">
                                <div className="h-4 w-full bg-white/5 rounded"></div>
                                <div className="h-4 w-5/6 bg-white/5 rounded"></div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mt-6">
                            <div className="h-4 w-16 bg-white/10 rounded"></div>
                            <div className="h-4 w-24 bg-decode-accent/20 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
