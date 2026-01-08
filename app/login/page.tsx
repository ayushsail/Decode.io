'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Mail, Lock, User, Terminal, Loader2 } from 'lucide-react';

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState(''); // Only for signup

    const router = useRouter();
    const supabase = createClient();

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                router.push('/');
                router.refresh();
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            username: username, // Adding metadata to be picked up by trigger
                        },
                    },
                });
                if (error) throw error;
                // On success, maybe show message to check email if confirm enabled
                // For now, assume auto-confirm or successful creation
                router.push('/');
                router.refresh();
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-decode-surface border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow">
                        <Terminal size={32} className="text-decode-accent" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">{isLogin ? 'Welcome Back' : 'Join DeCode.io'}</h1>
                    <p className="text-decode-text-secondary">
                        {isLogin ? 'Enter your credentials to access the mainframe.' : 'Initialize your hacker profile.'}
                    </p>
                </div>

                <Card color="bg-decode-surface" className="border border-white/10 shadow-2xl backdrop-blur-xl">
                    <form onSubmit={handleAuth} className="space-y-6 p-2">

                        {!isLogin && (
                            <Input
                                label="Username"
                                placeholder="neo_101"
                                icon={<User size={18} />}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        )}

                        <Input
                            label="Email"
                            type="email"
                            placeholder="user@example.com"
                            icon={<Mail size={18} />}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            icon={<Lock size={18} />}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400 text-center">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            variant="primary"
                            fullWidth
                            size="lg"
                            disabled={loading}
                            className="mt-2 shadow-glow"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : (isLogin ? 'Authenticate' : 'Register Protocol')}
                        </Button>

                        <div className="text-center pt-2">
                            <button
                                type="button"
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-sm text-decode-text-muted hover:text-decode-accent transition-colors underline decoration-dotted underline-offset-4"
                            >
                                {isLogin ? "No account? Create one" : "Already have an account? Login"}
                            </button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
}
