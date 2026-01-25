import React from 'react';
import { getPuzzles } from './actions/puzzles';
import { getUserData } from './actions/user';
import DashboardClient from './DashboardClient';
import { redirect } from 'next/navigation';

export const revalidate = 3600; // Cache puzzles for 1 hour

export default async function Home() {
  // Parallel fetch for speed
  const [puzzles, userData] = await Promise.all([
    getPuzzles(),
    getUserData()
  ]);

  if (!userData) {
    redirect('/login');
  }

  return (
    <DashboardClient puzzles={puzzles} initialUser={userData} />
  );
}
