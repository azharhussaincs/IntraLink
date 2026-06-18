'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ChatPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!storedUser || !token || storedUser === 'undefined') {
      router.push('/auth/login');
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <nav className="border-b bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/dashboard" className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
            {process.env.NEXT_PUBLIC_APP_NAME || 'CipherLink'}
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {user.fullName || user.username} ({user.role})
            </span>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Direct Messages</h2>
          <Link href="/dashboard" className="text-sm text-indigo-600 hover:underline">Back to Dashboard</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[70vh]">
          <div className="md:col-span-1 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-column">
             <div className="p-4 border-b dark:border-zinc-800">
                <input type="text" placeholder="Search contacts..." className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-md px-3 py-2 text-sm" />
             </div>
             <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <p className="text-sm text-zinc-500 text-center mt-10">No recent conversations</p>
             </div>
          </div>
          
          <div className="md:col-span-3 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center p-12 text-center">
            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-4 text-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Select a contact to start chatting</h3>
            <p className="text-zinc-500 max-w-sm">All messages are end-to-end encrypted and stay within your local network.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
