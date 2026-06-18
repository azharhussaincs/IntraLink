'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function GroupsPage() {
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
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Group Chats</h2>
          <div className="flex space-x-3">
             <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">Create New Group</button>
             <Link href="/dashboard" className="text-sm text-indigo-600 hover:underline flex items-center">Back to Dashboard</Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[70vh]">
          <div className="md:col-span-1 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col">
             <div className="p-4 border-b dark:border-zinc-800">
                <input type="text" placeholder="Search groups..." className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-md px-3 py-2 text-sm" />
             </div>
             <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-600 rounded">
                   <p className="text-sm font-bold text-indigo-900 dark:text-indigo-100">General Announcement</p>
                   <p className="text-xs text-zinc-500">Official company updates</p>
                </div>
                <p className="text-xs text-center text-zinc-500 pt-4">No other groups joined</p>
             </div>
          </div>
          
          <div className="md:col-span-3 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center p-12 text-center">
            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-4 text-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Select a group to start collaborating</h3>
            <p className="text-zinc-500 max-w-sm">Project groups and departments chats are managed by Team Leads and Admins.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
