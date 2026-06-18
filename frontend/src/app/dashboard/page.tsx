'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  MessageSquare, 
  Files, 
  Users as UsersIcon, 
  TrendingUp, 
  Clock, 
  ArrowRight,
  UserPlus,
  Plus,
  ChevronRight,
  Activity,
  ShieldCheck,
  Building2,
  Calendar
} from 'lucide-react';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

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

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getOrgTree = (managerId: string | null = null, depth = 0) => {
    return allUsers
      .filter(u => u.managerId === managerId || (!managerId && !u.managerId))
      .map(u => (
        <div key={u.id} className="space-y-2">
          <div 
            className="flex items-center gap-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 hover:border-indigo-500 transition-all group"
            style={{ marginLeft: `${depth * 24}px` }}
          >
            <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 font-bold text-xs">
              {(u.fullName?.[0] || u.username?.[0] || 'U').toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate text-zinc-900 dark:text-zinc-50">{u.fullName || u.username}</p>
              <p className="text-xs text-zinc-500 truncate">{u.designation || u.role}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[10px] bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded font-medium">
                {u.role}
              </span>
              <span className="text-[10px] text-zinc-400">{u.department}</span>
            </div>
          </div>
          {allUsers.some(sub => sub.managerId === u.id) && (
            <div className="relative">
               {/* Vertical line indicator */}
               <div className="absolute left-[15px] top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800" style={{ marginLeft: `${depth * 24}px` }}></div>
               {getOrgTree(u.id, depth + 1)}
            </div>
          )}
        </div>
      ));
  };

  if (!user) return null;

  const isAdmin = user.role === 'ADMIN';
  const isTeamLead = user.role === 'TEAM_LEAD';
  const canManageUsers = isAdmin || isTeamLead;

  const stats = [
    { label: 'Unread Messages', value: '0', icon: MessageSquare, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/10' },
    { label: 'Files Shared', value: '0', icon: Files, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/10' },
    { label: 'Active Users', value: String(allUsers.length || 1), icon: UsersIcon, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/10' },
    { label: 'Storage Used', value: '0 GB', icon: Activity, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/10' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto pb-12">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium mb-1">
              <Calendar size={16} />
              <span className="text-sm">{currentTime.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {getGreeting()}, {user.fullName || user.username}
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-1 max-w-2xl">
              Welcome back to CipherLink. Your organization's secure intranet communication hub is ready.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {canManageUsers && (
              <Link href="/dashboard/users" className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-all shadow-lg shadow-indigo-600/20">
                <UserPlus size={18} />
                <span>Add User</span>
              </Link>
            )}
            <Link href="/dashboard/groups" className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-sm font-medium rounded-lg transition-all shadow-sm">
              <Plus size={18} />
              <span>New Group</span>
            </Link>
          </div>
        </div>

        {/* User Info & Quick Stats Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white dark:bg-zinc-900 p-5 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
                <div className={`${stat.bg} ${stat.color} w-10 h-10 rounded-xl flex items-center justify-center mb-3`}>
                  <stat.icon size={20} />
                </div>
                <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-bold mt-1 text-zinc-900 dark:text-zinc-50">{stat.value}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-5 rounded-2xl shadow-lg shadow-indigo-600/20 text-white flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <ShieldCheck size={20} />
                <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded">Verified</span>
              </div>
              <p className="text-sm font-medium opacity-80 uppercase tracking-wider">Current Session</p>
              <p className="font-bold mt-1 truncate">{user.role}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs uppercase">
                {user.department?.[0] || 'D'}
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase opacity-70 leading-none">Department</p>
                <p className="text-xs font-bold truncate leading-tight mt-1">{user.department || 'Not Assigned'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Actions Grid */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <TrendingUp size={20} className="text-indigo-600" />
                  <span>Primary Workspaces</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/dashboard/chat" className="group p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/5 transition-all">
                  <div className="flex items-start justify-between">
                    <div className="h-12 w-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                      <MessageSquare size={24} />
                    </div>
                    <ChevronRight size={18} className="text-zinc-300 group-hover:text-indigo-500 transform group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-lg font-bold">Secure Messaging</h3>
                  <p className="text-sm text-zinc-500 mt-1">Real-time LAN-only communication with end-to-end encryption.</p>
                </Link>

                <Link href="/dashboard/files" className="group p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/5 transition-all">
                  <div className="flex items-start justify-between">
                    <div className="h-12 w-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
                      <Files size={24} />
                    </div>
                    <ChevronRight size={18} className="text-zinc-300 group-hover:text-indigo-500 transform group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-lg font-bold">File Explorer</h3>
                  <p className="text-sm text-zinc-500 mt-1">Manage and share documents. Optimized for files up to 50GB.</p>
                </Link>

                <Link href="/dashboard/groups" className="group p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/5 transition-all">
                  <div className="flex items-start justify-between">
                    <div className="h-12 w-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 mb-4 group-hover:scale-110 transition-transform">
                      <UsersIcon size={24} />
                    </div>
                    <ChevronRight size={18} className="text-zinc-300 group-hover:text-indigo-500 transform group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-lg font-bold">Department Groups</h3>
                  <p className="text-sm text-zinc-500 mt-1">Collaborate with your team in dedicated private group channels.</p>
                </Link>

                <Link href="/dashboard/reporting" className="group p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/5 transition-all">
                  <div className="flex items-start justify-between">
                    <div className="h-12 w-12 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-600 mb-4 group-hover:scale-110 transition-transform">
                      <TrendingUp size={24} />
                    </div>
                    <ChevronRight size={18} className="text-zinc-300 group-hover:text-indigo-500 transform group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-lg font-bold">Analytics & Reports</h3>
                  <p className="text-sm text-zinc-500 mt-1">View team productivity, file statistics, and system activity logs.</p>
                </Link>
              </div>
            </section>

            {/* Recent Activity Placeholder */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Clock size={20} className="text-indigo-600" />
                  <span>Recent Activity</span>
                </h2>
                <button className="text-xs font-bold text-indigo-600 uppercase tracking-wider hover:underline flex items-center gap-1">
                  View Full Audit <ArrowRight size={12} />
                </button>
              </div>
              <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                <div className="p-12 text-center">
                  <div className="h-16 w-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-400">
                     <Activity size={32} />
                  </div>
                  <h3 className="font-bold">No recent activities</h3>
                  <p className="text-sm text-zinc-500 mt-1">System activity and audit logs will appear here.</p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Org Structure */}
          <div className="space-y-6">
            <section className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Building2 size={20} className="text-indigo-600" />
                  <span>Organization</span>
                </h2>
              </div>
              
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {allUsers.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="h-10 w-10 border-2 border-indigo-600 border-t-transparent animate-spin rounded-full mb-4"></div>
                    <p className="text-sm text-zinc-500">Retrieving hierarchy...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {getOrgTree(null)}
                  </div>
                )}
              </div>
              
              <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl">
                   <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Network Status</p>
                   <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                      <p className="text-sm font-medium text-emerald-600">Enterprise LAN Online</p>
                   </div>
                   <p className="text-[10px] text-zinc-500 mt-1">Zero internet dependency active.</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
