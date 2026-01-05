'use client';

import React from 'react';
import { useUser } from '@/context/UserContext';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { User, Mail, Bell, Eye, Moon, Monitor } from 'lucide-react';

const Settings = () => {
    const { user, updateUser } = useUser();
    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <header>
                <h2 className="text-4xl font-bold mb-2 tracking-tight text-white drop-shadow-md">Account Settings</h2>
                <p className="text-decode-text-secondary font-medium tracking-wide">Manage your profile and workstation preferences.</p>
            </header>

            <div className="space-y-6">
                <Section title="Profile Information">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-8">
                        <div className="relative group cursor-pointer">
                            <div className="w-24 h-24 rounded-full bg-decode-primary flex items-center justify-center text-4xl font-bold ring-4 ring-decode-bg shadow-glow transition-transform group-hover:scale-105">
                                {user.name.charAt(0)}
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                                <span className="text-xs font-bold text-white">Edit</span>
                            </div>
                        </div>
                        <div className="flex-1 space-y-2">
                            <h3 className="text-xl font-bold text-white">{user.name}</h3>
                            <p className="text-sm text-decode-text-muted">Level {user.level} Solver • {user.email}</p>
                            <div className="pt-2">
                                <Button size="sm" variant="secondary" className="mr-3">Change Avatar</Button>
                                <Button size="sm" variant="ghost" className="text-decode-error hover:text-decode-error hover:bg-decode-error/10">Delete Account</Button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Display Name"
                            defaultValue={user.name}
                            onChange={(e) => updateUser({ name: e.target.value })}
                            icon={<User size={18} />}
                        />
                        <Input
                            label="Email Address"
                            defaultValue={user.email}
                            onChange={(e) => updateUser({ email: e.target.value })}
                            icon={<Mail size={18} />}
                        />
                    </div>
                </Section>

                <Section title="Preferences">
                    <div className="space-y-1">
                        <ToggleRow
                            label="Email Notifications"
                            description="Receive updates about new daily challenges."
                            icon={<Bell size={20} />}
                            active={true}
                        />
                        <ToggleRow
                            label="Public Profile"
                            description="Allow other users to see your progress on the leaderboard."
                            icon={<Eye size={20} />}
                            active={true}
                        />
                        <ToggleRow
                            label="Dark Mode"
                            description="System default is currently active."
                            icon={<Moon size={20} />}
                            active={true}
                            disabled
                        />
                        <ToggleRow
                            label="Animation Effects"
                            description="Enable glassmorphism and motion effects."
                            icon={<Monitor size={20} />}
                            active={true}
                        />
                    </div>
                </Section>
            </div>
        </div>
    );
};

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <Card title={title} className="border-white/5" color="bg-decode-surface/50">
        {children}
    </Card>
);

const ToggleRow = ({ label, description, icon, active, disabled }: { label: string, description: string, icon: React.ReactNode, active: boolean, disabled?: boolean }) => (
    <div className={`
        flex items-center justify-between p-4 rounded-xl transition-colors
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/5 cursor-pointer group'}
    `}>
        <div className="flex items-center gap-4">
            <div className="text-decode-text-muted group-hover:text-decode-text-primary transition-colors">
                {icon}
            </div>
            <div>
                <p className="font-semibold text-decode-text-primary">{label}</p>
                <p className="text-xs text-decode-text-muted">{description}</p>
            </div>
        </div>

        {/* Animated Toggle */}
        <div className={`
            w-11 h-6 rounded-full relative transition-colors duration-300
            ${active ? 'bg-decode-success' : 'bg-white/10'}
        `}>
            <div className={`
                absolute top-1 bottom-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm
                ${active ? 'right-1' : 'left-1'}
            `}></div>
        </div>
    </div>
);

export default Settings;
