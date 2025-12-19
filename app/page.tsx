'use client';

import React from 'react';
import { Link } from 'lucide-react'; // Wait, using Next Link
import NextLink from 'next/link';
import { Puzzle } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function Home() {
  return (
    <>
      <header className="mb-14 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-0">
        <div>
          <h2 className="text-4xl md:text-6xl font-bold mb-3 tracking-tight text-white/95 drop-shadow-md">Welcome back</h2>
          <p className="text-lg text-blue-200/80 font-medium tracking-wide">Choose your challenge for today.</p>
        </div>
        <div className="hidden lg:block text-right">
          <p className="text-sm text-blue-200/60 uppercase tracking-widest font-bold mb-1">Current Streak</p>
          <div className="flex items-center justify-end space-x-2">
            <p className="text-3xl font-bold text-decode-accent drop-shadow-lg tabular-nums">12 Days</p>
            <span className="text-2xl filter drop-shadow">🔥</span>
          </div>
        </div>
      </header>

      {/* Split Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 min-h-[500px]">
        {/* Solve Section */}
        <Card title="Solve" color="bg-decode-blue-2" accent="from-cyan-400/20 to-transparent">
          <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-10">
            <div className="w-36 h-36 rounded-3xl bg-black/20 flex items-center justify-center mb-8 shadow-inner ring-1 ring-white/10 backdrop-blur-sm group-hover:bg-black/30 transition-colors duration-500">
              <Puzzle size={72} strokeWidth={1.5} />
            </div>
            <h4 className="text-2xl font-bold mb-3 tracking-wide">Daily Challenge</h4>
            <p className="text-center text-blue-100/70 mb-10 max-w-xs leading-relaxed font-medium">Complete the daily logic puzzle to keep your streak alive.</p>
            <NextLink href="/puzzles" className='w-full text-center'>
              <Button fullWidth className="shadow-premium">Start Now</Button>
            </NextLink>
          </div>
        </Card>

        {/* Puzzles Section */}
        <Card title="Puzzles" color="bg-decode-blue-3" accent="from-blue-400/20 to-transparent">
          <div className="flex-1 flex flex-col p-4 md:p-8 space-y-4">
            {['Network Flow', 'Binary Search', 'Graph Theory', 'Dynamic Prog.'].map((item, i) => (
              <div key={i} className="group/item flex items-center justify-between p-5 rounded-2xl bg-black/20 hover:bg-black/30 hover:translate-x-1 transition-all cursor-pointer border border-white/5 hover:border-white/20 shadow-sm hover:shadow-md">
                <span className="font-semibold text-lg text-blue-50 group-hover/item:text-white transition-colors tracking-wide">{item}</span>
                <span className="opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all text-decode-accent">→</span>
              </div>
            ))}
            <NextLink href="/puzzles" className="mt-auto w-full md:w-auto inline-block text-center">
              <Button variant="ghost" fullWidth>View All Categories</Button>
            </NextLink>
          </div>
        </Card>
      </div>
    </>
  );
}
