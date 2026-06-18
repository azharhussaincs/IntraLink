'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Lock, User as UserIcon, ArrowRight, ShieldAlert } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push('/dashboard');
      } else {
        setError(data.message || 'Invalid username or password');
      }
    } catch (err) {
      setError('Connection failed. Please ensure the server is running on the local network.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none opacity-20 dark:opacity-10">
         <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]"></div>
         <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-violet-500 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-[440px] z-10">
        <div className="text-center mb-8">
          <div className="h-16 w-16 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl flex items-center justify-center text-indigo-600 mx-auto mb-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
             <ShieldCheck size={36} />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2">CipherLink</h1>
          <p className="text-zinc-500 dark:text-zinc-400 font-medium">Enterprise Secure LAN Messenger</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-8 rounded-[32px] shadow-2xl shadow-indigo-500/10 border border-zinc-200/50 dark:border-zinc-800/50">
          <h2 className="text-xl font-bold mb-1">Welcome back</h2>
          <p className="text-sm text-zinc-500 mb-8">Please enter your organization credentials.</p>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-bold rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-1 duration-200">
                <ShieldAlert size={18} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest px-1">Username</label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input
                  type="text"
                  required
                  className="w-full h-14 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl pl-12 pr-4 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all"
                  placeholder="admin_name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest px-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input
                  type="password"
                  required
                  className="w-full h-14 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl pl-12 pr-4 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white animate-spin rounded-full"></div>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-zinc-100 dark:border-zinc-800 text-center">
            <p className="text-xs text-zinc-500">
              Access is restricted to authorized personnel only. 
            </p>
            <p className="text-xs text-indigo-600 font-bold mt-1 cursor-help hover:underline">
              Contact Administrator for Credentials
            </p>
          </div>
        </div>
        
        <div className="mt-8 flex items-center justify-center gap-4 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
           <span>Offline-First</span>
           <div className="h-1 w-1 bg-zinc-300 rounded-full"></div>
           <span>Zero Trust</span>
           <div className="h-1 w-1 bg-zinc-300 rounded-full"></div>
           <span>AES-256</span>
        </div>
      </div>
    </div>
  );
}
