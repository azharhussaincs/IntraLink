'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ReportingPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!storedUser || !token || storedUser === 'undefined') {
      router.push('/auth/login');
      return;
    }
    
    const parsedUser = JSON.parse(storedUser);
    const authorizedRoles = ['ADMIN', 'SUPER_USER', 'TEAM_LEAD'];
    
    if (!authorizedRoles.includes(parsedUser.role)) {
      router.push('/dashboard');
      return;
    }
    
    setUser(parsedUser);
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
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Organization Reports</h2>
          <div className="flex space-x-3">
             <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">Submit New Report</button>
             <Link href="/dashboard" className="text-sm text-indigo-600 hover:underline flex items-center">Back to Dashboard</Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
              <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-2">Total Active Users</h3>
              <p className="text-3xl font-bold">1</p>
           </div>
           <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
              <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-2">Reports Submitted (Today)</h3>
              <p className="text-3xl font-bold">0</p>
           </div>
           <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
              <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-2">Pending Approvals</h3>
              <p className="text-3xl font-bold">0</p>
           </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="p-4 border-b dark:border-zinc-800">
             <h3 className="font-bold">Recent Status Updates</h3>
          </div>
          <div className="p-12 text-center text-zinc-500">
             <p>No reports found for the current period.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
