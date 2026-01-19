'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { User as SupabaseUser } from '@supabase/supabase-js';

type UserProfile = {
    id: string;
    username: string;
    full_name: string;
    avatar_url: string;
    xp: number;
    level: number;
    completed_puzzles: string[]; // We'll need to fetch this or derive from submissions
};

type UserContextType = {
    user: UserProfile | null;
    supabaseUser: SupabaseUser | null;
    isLoading: boolean;
    refreshProfile: () => Promise<void>;
    logout: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const supabase = createClient();

    const fetchProfile = async (uid: string) => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', uid)
            .single();

        if (error) {
            console.error('Error fetching profile:', error);
            return null;
        }

        // Also fetch completed puzzle IDs from submissions
        const { data: submissions } = await supabase
            .from('submissions')
            .select('puzzle_id')
            .eq('user_id', uid)
            .eq('status', 'Passed');

        const completed_puzzles = submissions ? submissions.map(s => s.puzzle_id) : [];

        return { ...data, completed_puzzles };
    };

    const refreshProfile = async () => {
        if (!supabaseUser) return;
        const profile = await fetchProfile(supabaseUser.id);
        setUser(profile);
    };

    useEffect(() => {
        const initializeAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSupabaseUser(session?.user ?? null);

            if (session?.user) {
                const profile = await fetchProfile(session.user.id);
                setUser(profile);
            }
            setIsLoading(false);
        };

        initializeAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            setSupabaseUser(session?.user ?? null);
            if (session?.user) {
                const profile = await fetchProfile(session.user.id);
                setUser(profile);
            } else {
                setUser(null);
            }
            setIsLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setSupabaseUser(null);
        router.push('/login');
    };

    return (
        <UserContext.Provider value={{ user, supabaseUser, isLoading, refreshProfile, logout }}>
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
