import React, { Suspense } from 'react';
import { getPuzzles } from './actions/puzzles';
import { getUserData } from './actions/user';
import DashboardClient from './DashboardClient';
import { redirect } from 'next/navigation';
import DashboardSkeleton from '@/components/skeletons/DashboardSkeleton';

export const revalidate = 3600; // Cache puzzles for 1 hour

async function DashboardContent() {
  // Parallel fetch for speed
  const [puzzles, userData] = await Promise.all([
    getPuzzles(),
    getUserData()
  ]);

  // if (!userData) {
  //   redirect('/login');
  // }

  return (
    <DashboardClient puzzles={puzzles} initialUser={userData} />
  );
}

export default function Home() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}
