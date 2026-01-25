import React from 'react';
import { getPuzzleById } from '@/app/actions/puzzles';
import PuzzleClient from './PuzzleClient';
import { notFound } from 'next/navigation';

export default async function PuzzleDetail({ params }: { params: { id: string } }) {
    // Resolve params if it's a promise (Next.js 15+ convention, but 16 might be standard)
    // Safe to treat as object in this setup or await if needed.
    const { id } = await params;
    const puzzle = await getPuzzleById(id);

    if (!puzzle) {
        notFound();
    }

    return <PuzzleClient puzzle={puzzle} />;
}
