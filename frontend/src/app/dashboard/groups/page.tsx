'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  Users as UsersIcon, 
  Plus, 
  Search, 
  MoreHorizontal, 
  MessageSquare, 
  Shield, 
  ArrowRight,
  Hash,
  Lock,
  Globe
} from 'lucide-react';

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
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Groups & Channels</h1>
            <p className="text-sm text-zinc-500">Collaborate with your team in secure, private department channels.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-all shadow-lg shadow-indigo-600/20">
            <Plus size={18} />
            <span>Create New Group</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Group Categories Sidebar */}
          <div className="space-y-6">
             <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 shadow-sm">
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search channels..." 
                    className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none"
                  />
                </div>
                
                <nav className="space-y-1">
                   <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2 px-2">Your Channels</p>
                   <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl transition-all">
                      <Hash size={18} />
                      <span>General</span>
                   </button>
                   <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl transition-all">
                      <Lock size={18} className="text-zinc-400" />
                      <span>Announcements</span>
                   </button>
                   <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl transition-all">
                      <Hash size={18} className="text-zinc-400" />
                      <span>Department Q1</span>
                   </button>
                </nav>
             </div>

             <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl p-5 text-white shadow-lg shadow-indigo-600/20">
                <h3 className="font-bold flex items-center gap-2 mb-2">
                   <Shield size={18} />
                   <span>Security Protocol</span>
                </h3>
                <p className="text-xs opacity-80 leading-relaxed">
                   All group communications are strictly limited to the organization's LAN and encrypted with AES-256-GCM.
                </p>
             </div>
          </div>

          {/* Group Content Area */}
          <div className="md:col-span-3 space-y-6">
             {/* General Channel Header Card */}
             <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
                <div className="flex items-start justify-between">
                   <div className="flex items-center gap-4">
                      <div className="h-16 w-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-indigo-600 text-2xl font-bold">
                         #G
                      </div>
                      <div>
                         <h2 className="text-xl font-bold">General Announcement</h2>
                         <p className="text-sm text-zinc-500">Official company-wide updates and critical announcements.</p>
                         <div className="flex items-center gap-4 mt-2">
                            <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                               <Globe size={12} /> Public to Organization
                            </span>
                            <span className="flex items-center gap-1 text-xs font-medium text-zinc-500">
                               <UsersIcon size={12} /> 1 Member Joined
                            </span>
                         </div>
                      </div>
                   </div>
                   <button className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 transition-all">
                      <MoreHorizontal size={20} />
                   </button>
                </div>
             </div>

             {/* Chat/Activity Feed Placeholder */}
             <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col min-h-[400px]">
                <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                   <div className="h-20 w-20 rounded-full bg-zinc-50 dark:bg-zinc-800/50 flex items-center justify-center text-zinc-200 dark:text-zinc-700 mb-4">
                      <MessageSquare size={40} />
                   </div>
                   <h3 className="text-lg font-bold">Start a discussion in #General</h3>
                   <p className="text-sm text-zinc-500 mt-1 max-w-sm mx-auto">
                      All messages sent here will be visible to everyone in the organization.
                   </p>
                   <button className="mt-6 flex items-center gap-2 px-6 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 text-sm font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all">
                      <span>Open Group Chat</span>
                      <ArrowRight size={16} />
                   </button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
