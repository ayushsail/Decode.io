'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type User = {
    id?: string;
    name: string;
    email: string;
    xp: number;
    level: number;
    completedPuzzles: string[];
};

type UserContextType = {
    user: User | null;
    isLoading: boolean;
    updateUser: (updates: Partial<User>) => void;
    completePuzzle: (puzzleId: string, xpReward: number) => void;
    login: (email: string, name?: string) => void;
    logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Load from localStorage on mount
        const saved = localStorage.getItem('decode-app-user');
        if (saved) {
            try {
                setUser(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to load user data", e);
            }
        }
        setIsLoading(false);
    }, []);

    // Persist user changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('decode-app-user', JSON.stringify(user));
        } else if (!isLoading) {
            localStorage.removeItem('decode-app-user');
        }
    }, [user, isLoading]);

    const updateUser = (updates: Partial<User>) => {
        if (!user) return;
        setUser(prev => prev ? ({ ...prev, ...updates }) : null);
    };

    const completePuzzle = (puzzleId: string, xpReward: number) => {
        if (!user) return;
        if (user.completedPuzzles.includes(puzzleId)) return;

        setUser(prev => prev ? ({
            ...prev,
            xp: prev.xp + xpReward,
            completedPuzzles: [...prev.completedPuzzles, puzzleId]
        }) : null);
    };

    const login = (email: string, name?: string) => {
        const newUser: User = {
            id: 'local-' + Date.now(),
            name: name || email.split('@')[0],
            email: email,
            xp: 0,
            level: 1,
            completedPuzzles: []
        };
        setUser(newUser);
        router.push('/');
    };

    const logout = () => {
        setUser(null);
        router.push('/login');
    };

    return (
        <UserContext.Provider value={{ user, isLoading, updateUser, completePuzzle, login, logout }}>
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
