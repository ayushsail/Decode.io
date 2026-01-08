'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

type User = {
    id?: string;
    name: string;
    email: string;
    xp: number;
    level: number;
    completedPuzzles: string[]; // This would ideally be fetched from 'submissions' table
};

type UserContextType = {
    user: User | null;
    updateUser: (updates: Partial<User>) => void;
    completePuzzle: (puzzleId: string, xpReward: number) => void;
    login: () => void; // Simple mock or redirect
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        const getUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                // Fetch profile
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();

                if (profile) {
                    setUser({
                        id: session.user.id,
                        name: profile.full_name || profile.username || session.user.email?.split('@')[0] || 'User',
                        email: session.user.email || '',
                        xp: profile.xp || 0,
                        level: profile.level || 1,
                        completedPuzzles: [] // TODO: Fetch from submissions
                    });
                }
            }
        };

        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                getUser(); // Refresh profile
            } else {
                setUser(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const updateUser = async (updates: Partial<User>) => {
        if (!user || !user.id) return;
        // Optimistic update
        setUser(prev => prev ? ({ ...prev, ...updates }) : null);

        // Push to DB
        // const { error } = await supabase.from('profiles').update({ ... }).eq('id', user.id);
    };

    const completePuzzle = (puzzleId: string, xpReward: number) => {
        if (!user) return;
        // This is now mostly handled by the server action 'submitPuzzleSolution' which inserts to DB.
        // We just update local state to reflect XP change immediately if needed.
        setUser(prev => prev ? ({
            ...prev,
            xp: prev.xp + xpReward,
            completedPuzzles: [...prev.completedPuzzles, puzzleId]
        }) : null);
    };

    const login = async () => {
        router.push('/login');
    };

    return (
        <UserContext.Provider value={{ user, updateUser, completePuzzle, login }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
