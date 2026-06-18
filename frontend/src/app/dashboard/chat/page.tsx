'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  Search, 
  MoreVertical, 
  Send, 
  Paperclip, 
  Smile, 
  Phone, 
  Video, 
  Info,
  User as UserIcon,
  Circle,
  MessageSquare
} from 'lucide-react';

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
    <DashboardLayout>
      <div className="flex h-[calc(100vh-140px)] bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        {/* Chat Sidebar */}
        <div className="w-full md:w-80 border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
          <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
            <h2 className="text-xl font-bold mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
              <input 
                type="text" 
                placeholder="Search conversations..." 
                className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
            <div className="p-4 space-y-1">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2 px-2">Recent Chats</p>
              <div className="flex flex-col items-center justify-center py-12 text-center px-4">
                <div className="h-12 w-12 rounded-full bg-zinc-50 dark:bg-zinc-800/50 flex items-center justify-center text-zinc-300 mb-3">
                  <MessageSquare size={24} />
                </div>
                <p className="text-xs text-zinc-500">No active conversations yet.</p>
                <button className="mt-4 text-xs font-bold text-indigo-600 hover:underline uppercase tracking-wider">Start New Chat</button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Chat Window */}
        <div className="hidden md:flex flex-1 flex-col bg-zinc-50/30 dark:bg-zinc-950/10">
          {/* Chat Header */}
          <div className="h-16 px-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-white dark:bg-zinc-900">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400">
                <UserIcon size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold">Select a conversation</h3>
                <div className="flex items-center gap-1.5">
                   <Circle size={8} className="fill-zinc-300 text-zinc-300" />
                   <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium">Offline</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400"><Phone size={18} /></button>
              <button className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400"><Video size={18} /></button>
              <button className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400"><Info size={18} /></button>
              <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800 mx-1"></div>
              <button className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400"><MoreVertical size={18} /></button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
             <div className="max-w-md">
                <div className="h-20 w-20 rounded-3xl bg-white dark:bg-zinc-900 shadow-xl flex items-center justify-center text-indigo-600 mx-auto mb-6 transform rotate-3">
                  <MessageSquare size={40} />
                </div>
                <h2 className="text-2xl font-bold mb-2">Your Conversations</h2>
                <p className="text-zinc-500">
                  Select a colleague from the sidebar to start a secure LAN-based chat. All communications are encrypted end-to-end.
                </p>
             </div>
          </div>

          {/* Message Input Area */}
          <div className="p-4 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex items-end gap-2 max-w-4xl mx-auto bg-zinc-100 dark:bg-zinc-800 rounded-2xl p-2">
              <button className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 transition-colors">
                <Paperclip size={20} />
              </button>
              <textarea 
                placeholder="Type a message..."
                rows={1}
                className="flex-1 bg-transparent border-none focus:ring-0 py-2.5 px-2 text-sm resize-none max-h-32 custom-scrollbar"
              />
              <button className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 transition-colors">
                <Smile size={20} />
              </button>
              <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all">
                <Send size={18} />
              </button>
            </div>
            <p className="text-[10px] text-center text-zinc-400 mt-2 uppercase tracking-widest font-medium">CipherLink Secure Messaging Protocol Active</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
