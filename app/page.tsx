'use client';

import React from 'react';
import NextLink from 'next/link';
import { Puzzle, ArrowRight, Activity, Flame } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function Home() {
  return (
    <>
      <header className="mb-14 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-0">
        <div>
          <h2 className="text-4xl md:text-6xl font-bold mb-3 tracking-tight text-white drop-shadow-md">Welcome back</h2>
          <p className="text-lg text-decode-text-secondary font-medium tracking-wide">Master C programming, one pointer at a time.</p>
        </div>
        <div className="hidden lg:block text-right">
          <p className="text-sm text-decode-text-muted uppercase tracking-widest font-bold mb-1">Current Streak</p>
          <div className="flex items-center justify-end space-x-2">
            <p className="text-3xl font-bold text-decode-accent drop-shadow-glow tabular-nums">12 Days</p>
            <Flame className="text-orange-500 fill-orange-500 animate-pulse" size={28} />
          </div>
        </div>
      </header>

      {/* Split Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 min-h-[500px]">
        {/* Solve Section */}
        <Card title="Daily Challenge" color="bg-decode-surface" className="border border-white/5 relative overflow-hidden group">
          {/* Background Image Effect */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://ih1.redbubble.net/image.417270929.1303/flat,750x,075,f-pad,750x1000,f8f8f8.jpg')] bg-cover bg-center pointer-events-none mix-blend-overlay"></div>

          <div className="flex-1 flex flex-col justify-center items-center p-8 relative z-10">
            <div className="w-32 h-32 rounded-3xl bg-decode-primary/10 flex items-center justify-center mb-8 shadow-inner ring-1 ring-white/10 backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
              <Puzzle size={64} className="text-decode-primary" strokeWidth={1.5} />
            </div>
            <h4 className="text-2xl font-bold mb-3 tracking-wide text-white">Pointer Arithmetic</h4>
            <p className="text-center text-decode-text-secondary mb-10 max-w-xs leading-relaxed font-medium">
              Solve today's C challenge involving complex memory manipulation.
            </p>
            <NextLink href="/puzzles/1" className='w-full max-w-xs'>
              <Button fullWidth size="lg" variant="primary" className="shadow-glow">
                Start Solving
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </NextLink>
          </div>
        </Card>

        {/* Categories Section */}
        <Card title="Quick Practice" color="bg-decode-surface" className="border border-white/5">
          <div className="flex-1 flex flex-col space-y-4">
            {[
              { name: 'Memory Management', icon: '🧠', color: 'text-green-400' },
              { name: 'Pointers & Arrays', icon: '➡️', color: 'text-red-400' },
              { name: 'Structs & Unions', icon: '🏗️', color: 'text-blue-400' },
              { name: 'Bitwise Operations', icon: 'binary', color: 'text-cyan-400' }
            ].map((item, i) => (
              <NextLink href="/puzzles" key={i} className="group/item flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 hover:translate-x-1 transition-all cursor-pointer border border-white/5 hover:border-white/10">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl opacity-80">{item.icon}</span>
                  <span className="font-semibold text-lg text-decode-text-primary group-hover/item:text-white transition-colors tracking-wide">{item.name}</span>
                </div>
                <ArrowRight size={20} className="text-decode-text-muted group-hover/item:text-decode-accent opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all" />
              </NextLink>
            ))}

            <div className="mt-auto pt-6">
              <NextLink href="/puzzles" className="w-full">
                <Button variant="ghost" fullWidth>View All Categories</Button>
              </NextLink>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
