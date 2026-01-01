'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
    name: string;
    email: string;
    xp: number;
    level: number;
    completedPuzzles: string[];
};

type UserContextType = {
    user: User;
    updateUser: (updates: Partial<User>) => void;
    completePuzzle: (puzzleId: string, xpReward: number) => void;
};

const defaultUser: User = {
    name: "User Name",
    email: "user@example.com",
    xp: 12100,
    level: 5,
    completedPuzzles: []
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User>(defaultUser);

    // Load from localStorage on mount (optional persistence)
    useEffect(() => {
        const saved = localStorage.getItem('decode-user');
        if (saved) {
            try {
                setUser(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to load user data", e);
            }
        }
    }, []);

    // Save to localStorage whenever user changes
    useEffect(() => {
        localStorage.setItem('decode-user', JSON.stringify(user));
    }, [user]);

    const updateUser = (updates: Partial<User>) => {
        setUser(prev => ({ ...prev, ...updates }));
    };

    const completePuzzle = (puzzleId: string, xpReward: number) => {
        if (user.completedPuzzles.includes(puzzleId)) return; // Already completed

        setUser(prev => ({
            ...prev,
            xp: prev.xp + xpReward,
            completedPuzzles: [...prev.completedPuzzles, puzzleId]
        }));
    };

    return (
        <UserContext.Provider value={{ user, updateUser, completePuzzle }}>
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
