'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  BarChart3, 
  TrendingUp, 
  Users as UsersIcon, 
  FileText, 
  Download, 
  Filter,
  Calendar,
  Activity,
  ArrowUpRight,
  PieChart,
  Target
} from 'lucide-react';

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
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Analytics & Intelligence</h1>
            <p className="text-sm text-zinc-500">Monitor organization productivity, communication trends, and storage metrics.</p>
          </div>
          <div className="flex items-center gap-2">
             <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm font-medium hover:bg-zinc-50 transition-all">
                <Calendar size={16} />
                <span>Last 30 Days</span>
             </button>
             <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-all shadow-lg shadow-indigo-600/20">
               <Download size={18} />
               <span>Export Report</span>
             </button>
          </div>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           {[
             { label: 'Avg. Daily Messages', value: '124', trend: '+12%', icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/10' },
             { label: 'Active Teams', value: '8', trend: '0%', icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/10' },
             { label: 'Files Exchanged', value: '2,481', trend: '+5.4%', icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/10' },
             { label: 'Server Uptime', value: '99.9%', trend: 'Stable', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/10' },
           ].map((stat, i) => (
             <div key={i} className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
                <div className="flex items-start justify-between">
                   <div className={`${stat.bg} ${stat.color} h-10 w-10 rounded-xl flex items-center justify-center`}>
                      <stat.icon size={20} />
                   </div>
                   <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${stat.trend.startsWith('+') ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'}`}>
                      {stat.trend}
                   </span>
                </div>
                <div className="mt-4">
                   <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{stat.label}</p>
                   <p className="text-2xl font-bold mt-0.5">{stat.value}</p>
                </div>
             </div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           {/* Productivity Chart Placeholder */}
           <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="font-bold flex items-center gap-2">
                    <BarChart3 size={18} className="text-indigo-600" />
                    <span>Productivity Trends</span>
                 </h3>
                 <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                    <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-indigo-600"></div> Messages</div>
                    <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-emerald-500"></div> Files</div>
                 </div>
              </div>
              <div className="h-64 flex items-end justify-between gap-2 px-2">
                 {[40, 60, 45, 90, 65, 80, 50, 70, 85, 40, 95, 60].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                       <div className="w-full bg-indigo-100 dark:bg-indigo-900/20 rounded-t-md relative overflow-hidden h-full">
                          <div 
                             className="absolute bottom-0 left-0 right-0 bg-indigo-600 transition-all duration-500 rounded-t-md group-hover:bg-indigo-500" 
                             style={{ height: `${h}%` }}
                          ></div>
                       </div>
                       <span className="text-[10px] text-zinc-400 font-bold">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
                    </div>
                 ))}
              </div>
           </div>

           {/* Distribution Placeholder */}
           <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
              <h3 className="font-bold flex items-center gap-2 mb-8">
                 <PieChart size={18} className="text-indigo-600" />
                 <span>Role Distribution</span>
              </h3>
              <div className="relative h-48 w-48 mx-auto mb-8">
                 {/* CSS Mock Pie Chart */}
                 <div className="absolute inset-0 rounded-full border-[16px] border-zinc-100 dark:border-zinc-800"></div>
                 <div className="absolute inset-0 rounded-full border-[16px] border-indigo-600 border-t-transparent border-r-transparent rotate-45"></div>
                 <div className="absolute inset-0 rounded-full border-[16px] border-emerald-500 border-l-transparent border-b-transparent border-t-transparent -rotate-12"></div>
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <p className="text-2xl font-bold">1</p>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase">Total Users</p>
                 </div>
              </div>
              <div className="space-y-3">
                 {[
                   { label: 'Admin', count: '1', color: 'bg-indigo-600' },
                   { label: 'Team Lead', count: '0', color: 'bg-emerald-500' },
                   { label: 'Members', count: '0', color: 'bg-zinc-200 dark:bg-zinc-700' },
                 ].map((item, i) => (
                   <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                         <div className={`h-2 w-2 rounded-full ${item.color}`}></div>
                         <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">{item.label}</span>
                      </div>
                      <span className="text-xs font-bold">{item.count}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Detailed Table Placeholder */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
           <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
              <h3 className="font-bold text-sm">Department Performance Index</h3>
              <button className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-1">
                 View All Departments <ArrowUpRight size={12} />
              </button>
           </div>
           <div className="p-12 text-center text-zinc-500">
              <div className="h-12 w-12 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl flex items-center justify-center mx-auto mb-4">
                 <Filter size={24} className="text-zinc-300" />
              </div>
              <p className="text-sm">No department data available for the selected period.</p>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
