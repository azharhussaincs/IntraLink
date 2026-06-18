'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  Search, 
  Upload, 
  FileText, 
  Image as ImageIcon, 
  File, 
  MoreHorizontal, 
  Download, 
  Trash2, 
  Grid, 
  List,
  FolderOpen
} from 'lucide-react';

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
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">File Explorer</h1>
            <p className="text-sm text-zinc-500">Securely store and share organization documents on LAN.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-all shadow-lg shadow-indigo-600/20">
            <Upload size={18} />
            <span>Upload Files</span>
          </button>
        </div>

        {/* File Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
           {[
             { label: 'Documents', count: '0', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/10' },
             { label: 'Images', count: '0', icon: ImageIcon, color: 'text-rose-600', bg: 'bg-rose-50 dark:bg-rose-900/10' },
             { label: 'Media', count: '0', icon: File, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/10' },
             { label: 'Used Storage', count: '0 GB', icon: FolderOpen, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/10' },
           ].map((item, i) => (
             <div key={i} className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center gap-4">
                <div className={`${item.bg} ${item.color} h-10 w-10 rounded-lg flex items-center justify-center`}>
                  <item.icon size={20} />
                </div>
                <div>
                   <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none">{item.label}</p>
                   <p className="text-lg font-bold mt-0.5">{item.count}</p>
                </div>
             </div>
           ))}
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col min-h-[500px]">
          {/* File Toolbar */}
          <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
               <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                 <input 
                   type="text" 
                   placeholder="Search files..." 
                   className="h-9 w-full sm:w-64 bg-zinc-100 dark:bg-zinc-800 rounded-lg pl-10 pr-4 text-sm focus:outline-none"
                 />
               </div>
            </div>
            <div className="flex items-center gap-2">
               <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
                  <button className="h-7 w-7 flex items-center justify-center rounded-md bg-white dark:bg-zinc-700 shadow-sm text-indigo-600 transition-all"><List size={16} /></button>
                  <button className="h-7 w-7 flex items-center justify-center rounded-md text-zinc-500"><Grid size={16} /></button>
               </div>
               <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 mx-1"></div>
               <button className="text-xs font-bold text-zinc-500 uppercase tracking-wider hover:text-indigo-600 transition-colors">Select Multiple</button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-zinc-100 dark:border-zinc-800 text-[10px] uppercase text-zinc-400 font-bold tracking-widest">
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Size</th>
                  <th className="px-6 py-4">Last Modified</th>
                  <th className="px-6 py-4">Shared With</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800/50">
                 <tr className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                    <td colSpan={5} className="px-6 py-24 text-center">
                       <div className="flex flex-col items-center max-w-xs mx-auto">
                          <div className="h-20 w-20 bg-zinc-50 dark:bg-zinc-800/50 rounded-3xl flex items-center justify-center text-zinc-200 dark:text-zinc-700 mb-4 transition-transform group-hover:scale-110">
                             <FolderOpen size={40} />
                          </div>
                          <h3 className="text-lg font-bold">No files uploaded yet</h3>
                          <p className="text-sm text-zinc-500 mt-1">Start by uploading a document or media file to share it with your organization.</p>
                          <button className="mt-6 px-6 py-2 rounded-xl bg-indigo-600 text-white text-sm font-bold shadow-lg shadow-indigo-600/20">Upload Now</button>
                       </div>
                    </td>
                 </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-auto p-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/20">
             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs text-zinc-500">Storage Integrity Check: <span className="text-emerald-500 font-bold">SHA-256 Verified</span></p>
                <div className="flex items-center gap-4">
                   <div className="w-32 h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 w-[2%]"></div>
                   </div>
                   <p className="text-xs text-zinc-500 font-medium">0% of server storage used</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
