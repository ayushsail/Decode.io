'use client';

import React from 'react';

import { useUser } from '@/context/UserContext';

const Settings = () => {
    const { user, updateUser } = useUser();
    return (
        <div className="max-w-2xl">
            <header className="mb-10">
                <h2 className="text-4xl font-bold mb-2 tracking-tight text-white/95 drop-shadow-md">Account Settings</h2>
                <p className="text-blue-200/80 font-medium tracking-wide">Manage your profile and preferences.</p>
            </header>

            <div className="space-y-6">
                <Section title="Profile Information">
                    <div className="flex items-center space-x-6 mb-6">
                        <div className="w-20 h-20 rounded-full bg-decode-blue-3 flex items-center justify-center text-3xl font-bold ring-4 ring-white/10">{user.name.charAt(0)}</div>
                        <button className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition text-sm font-semibold shadow-sm hover:shadow-md">Change Avatar</button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Display Name" defaultValue={user.name} onChange={(val) => updateUser({ name: val })} />
                        <Input label="Email" defaultValue={user.email} onChange={(val) => updateUser({ email: val })} />
                    </div>
                </Section>

                <Section title="Preferences">
                    <div className="flex items-center justify-between py-3 border-b border-white/5">
                        <span>Email Notifications</span>
                        <Toggle active />
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-white/5">
                        <span>Public Profile</span>
                        <Toggle active />
                    </div>
                    <div className="flex items-center justify-between py-3">
                        <span>Dark Mode</span>
                        <Toggle active disabled />
                    </div>
                </Section>
            </div>
        </div>
    );
};

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="bg-decode-blue-2/30 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-premium">
        <h3 className="text-xl font-bold mb-6 pb-2 border-b border-white/10 tracking-wide">{title}</h3>
        {children}
    </div>
);

const Input = ({ label, defaultValue, onChange }: { label: string, defaultValue: string, onChange?: (val: string) => void }) => (
    <div>
        <label className="block text-sm font-medium text-blue-200 mb-1">{label}</label>
        <input
            type="text"
            defaultValue={defaultValue}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-decode-accent/50 transition-colors"
        />
    </div>
);

const Toggle = ({ active, disabled }: { active?: boolean, disabled?: boolean }) => (
    <div className={`w-12 h-6 rounded-full relative ${active ? 'bg-cyan-600' : 'bg-gray-600'} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
        <div className={`absolute top-1 bottom-1 w-4 h-4 bg-white rounded-full transition-all ${active ? 'right-1' : 'left-1'}`}></div>
    </div>
);

export default Settings;
