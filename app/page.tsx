import React from 'react';
import { getPuzzles } from './actions/puzzles';
import DashboardClient from './DashboardClient';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const puzzles = await getPuzzles();

  return (
    <ProtectedRoute>
      <DashboardClient puzzles={puzzles} />
    </ProtectedRoute>
  );
}
