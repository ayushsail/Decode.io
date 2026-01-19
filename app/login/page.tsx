'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Mail, Lock, User, Terminal, Loader2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'react-hot-toast';

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');

    const router = useRouter();
    const supabase = createClient();

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isLogin) {
                // Real Login
                const { error: signInError } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (signInError) throw signInError;
                toast.success('Access Granted. Welcome back, agent.');
                router.push('/');
            } else {
                // Real Signup
                const { error: signUpError } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: fullName,
                        }
                    }
                });
                if (signUpError) throw signUpError;
                toast.success('Registration Initiated. Check your secure uplink (email).');
                setError('Registration successful! Please check your email for verification.');
                setLoading(false);
            }
        } catch (err: any) {
            const msg = err.message || 'An error occurred during authentication';
            setError(msg);
            toast.error(msg);
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
                                label="Full Name"
                                placeholder="Neo Anderson"
                                icon={<User size={18} />}
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
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
                            <div className={`p-3 border rounded-lg text-sm text-center ${error.includes('successful')
                                ? 'bg-green-500/10 border-green-500/20 text-green-400'
                                : 'bg-red-500/10 border-red-500/20 text-red-400'
                                }`}>
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
