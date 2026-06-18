'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!storedUser || !token || storedUser === 'undefined') {
      router.push('/auth/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchUsers(token);
    } catch (err) {
      console.error('Failed to parse user data', err);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      router.push('/auth/login');
    }
  }, [router]);

  const fetchUsers = async (token: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setAllUsers(data);
      }
    } catch (err) {
      console.error('Failed to fetch users', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/auth/login');
  };

  const getOrgTree = (managerId: string | null = null) => {
    return allUsers
      .filter(u => u.managerId === managerId || (!managerId && !u.managerId))
      .map(u => (
        <li key={u.id} className="ml-4 border-l pl-4 py-2">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-zinc-900 dark:text-zinc-100">{u.fullName || u.username}</span>
            <span className="text-xs bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-600 dark:text-zinc-400">{u.role}</span>
            <span className="text-xs text-zinc-500 italic">{u.department}</span>
          </div>
          {allUsers.some(sub => sub.managerId === u.id) && (
            <ul className="mt-2">
              {getOrgTree(u.id)}
            </ul>
          )}
        </li>
      ));
  };

  if (!user) return null;

  const isAdmin = user.role === 'ADMIN';
  const isSuperUser = user.role === 'SUPER_USER';
  const isTeamLead = user.role === 'TEAM_LEAD';
  const canManageUsers = isAdmin || isTeamLead;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <nav className="border-b bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
            {process.env.NEXT_PUBLIC_APP_NAME || 'CipherLink'}
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {user.fullName || user.username} ({user.role})
            </span>
            <button
              onClick={handleLogout}
              className="rounded-md bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <aside className="space-y-4">
            <div className="rounded-lg bg-white p-4 shadow dark:bg-zinc-900">
              <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-100">Menu</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/dashboard" className="text-indigo-600 dark:text-indigo-400 font-medium">Dashboard Overview</Link></li>
                <li><Link href="/dashboard/chat" className="text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400">Direct Messages</Link></li>
                <li><Link href="/dashboard/groups" className="text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400">Group Chats</Link></li>
                <li><Link href="/dashboard/files" className="text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400">File Manager</Link></li>
                {(isAdmin || isSuperUser || isTeamLead) && (
                  <li><Link href="/dashboard/reporting" className="text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400">Reports</Link></li>
                )}
                {canManageUsers && (
                  <li><Link href="/dashboard/users" className="text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400">Manage Users</Link></li>
                )}
              </ul>
            </div>
          </aside>

          <div className="md:col-span-3 space-y-6">
            <section className="rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Welcome, {user.fullName || user.username}!</h2>
              <p className="mt-1 text-zinc-600 dark:text-zinc-400">
                You are logged in as <span className="font-semibold text-indigo-600 dark:text-indigo-400">{user.role}</span>
                {user.department && <span> in the <span className="font-semibold">{user.department}</span> department.</span>}
              </p>
            </section>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <Link href="/dashboard/chat" className="rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500 transition-colors">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 flex items-center">
                  <span className="mr-2">💬</span> Messages
                </h3>
                <p className="mt-2 text-sm text-zinc-500">View and send direct messages.</p>
              </Link>
              <Link href="/dashboard/files" className="rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500 transition-colors">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 flex items-center">
                  <span className="mr-2">📂</span> Files
                </h3>
                <p className="mt-2 text-sm text-zinc-500">Share and manage organizational files.</p>
              </Link>
              <Link href="/dashboard/groups" className="rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500 transition-colors">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 flex items-center">
                  <span className="mr-2">👥</span> Groups
                </h3>
                <p className="mt-2 text-sm text-zinc-500">Manage and join project groups.</p>
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <p className="text-sm text-zinc-500">Unread Messages</p>
                <p className="text-2xl font-bold">0</p>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <p className="text-sm text-zinc-500">Active Tasks</p>
                <p className="text-2xl font-bold">0</p>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <p className="text-sm text-zinc-500">Storage Used</p>
                <p className="text-2xl font-bold">0 GB</p>
              </div>
            </div>

            <section className="rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <h3 className="text-lg font-bold mb-4 text-zinc-900 dark:text-zinc-50">Organization Structure</h3>
              <div className="overflow-x-auto">
                <ul className="list-none">
                  {allUsers.length === 0 ? (
                    <p className="text-sm text-zinc-500">Loading structure...</p>
                  ) : (
                    getOrgTree(null)
                  )}
                </ul>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
