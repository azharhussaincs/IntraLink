'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function FilesPage() {
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
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">File Manager</h2>
          <div className="flex space-x-3">
             <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">Upload File</button>
             <Link href="/dashboard" className="text-sm text-indigo-600 hover:underline flex items-center">Back to Dashboard</Link>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 border-b dark:border-zinc-800 flex items-center justify-between">
             <div className="flex space-x-4 text-sm font-medium">
                <button className="text-indigo-600 dark:text-indigo-400">All Files</button>
                <button className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">Recent</button>
                <button className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">Shared with me</button>
             </div>
             <p className="text-xs text-zinc-500">Storage: 0 GB / Unlimited (LAN)</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b dark:border-zinc-800 text-xs uppercase text-zinc-500 font-bold">
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Size</th>
                  <th className="px-6 py-3">Modified</th>
                  <th className="px-6 py-3">Owner</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-zinc-800">
                 <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">
                       <div className="flex flex-col items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-2 opacity-20"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                          <p>No files found</p>
                          <button className="mt-2 text-indigo-600 hover:underline text-sm font-medium">Upload your first file</button>
                       </div>
                    </td>
                 </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
