'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { supabaseUser, isLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !supabaseUser) {
            router.push('/login');
        }
    }, [supabaseUser, isLoading, router]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    if (!supabaseUser) {
        return null;
    }

    return <>{children}</>;
}
