'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Users, 
  Files, 
  BarChart3, 
  UserPlus, 
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Search,
  Bell,
  User as UserIcon,
  Menu,
  X,
  Sun,
  Moon
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Helper for class names if lib/utils doesn't exist yet
// const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

interface SidebarProps {
  user: any;
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}

export function Sidebar({ user, isCollapsed, setIsCollapsed, mobileOpen, setMobileOpen }: SidebarProps) {
  const pathname = usePathname();
  
  const isAdmin = user?.role === 'ADMIN';
  const isSuperUser = user?.role === 'SUPER_USER';
  const isTeamLead = user?.role === 'TEAM_LEAD';
  const canManageUsers = isAdmin || isTeamLead;

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Messages', href: '/dashboard/chat', icon: MessageSquare },
    { name: 'Groups', href: '/dashboard/groups', icon: Users },
    { name: 'Files', href: '/dashboard/files', icon: Files },
  ];

  if (isAdmin || isSuperUser || isTeamLead) {
    navItems.push({ name: 'Reports', href: '/dashboard/reporting', icon: BarChart3 });
  }

  if (canManageUsers) {
    navItems.push({ name: 'Users', href: '/dashboard/users', icon: UserPlus });
  }

  navItems.push({ name: 'Settings', href: '/dashboard/settings', icon: Settings });

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden" 
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 transition-all duration-300 ease-in-out lg:static",
        isCollapsed ? "w-20" : "w-64",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex h-16 items-center justify-between px-6 border-b border-zinc-200 dark:border-zinc-800">
          {!isCollapsed && (
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              CipherLink
            </span>
          )}
          {isCollapsed && (
             <span className="text-xl font-bold text-indigo-600 mx-auto">C</span>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex items-center justify-center h-8 w-8 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500"
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
          <button 
            onClick={() => setMobileOpen(false)}
            className="lg:hidden h-8 w-8 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                pathname === item.href
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400"
                  : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-200"
              )}
            >
              <item.icon size={20} className={cn(pathname === item.href ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-500")} />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
          <button 
             onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/auth/login';
             }}
             className={cn(
               "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/10 transition-all",
               isCollapsed && "justify-center"
             )}
          >
            <LogOut size={20} />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

interface HeaderProps {
  user: any;
  setMobileOpen: (v: boolean) => void;
}

export function Header({ user, setMobileOpen }: HeaderProps) {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

  React.useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      setTheme('light');
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-zinc-200 bg-white/80 px-4 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80 lg:px-8">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setMobileOpen(true)}
          className="lg:hidden h-10 w-10 flex items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-500"
        >
          <Menu size={20} />
        </button>
        
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
          <input 
            type="text" 
            placeholder="Search everything..." 
            className="h-10 w-64 rounded-full border border-zinc-200 bg-zinc-50 pl-10 pr-4 text-sm focus:border-indigo-500 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button 
          onClick={toggleTheme}
          className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        
        <button className="relative h-10 w-10 flex items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500">
          <Bell size={20} />
          <span className="absolute right-2.5 top-2.5 flex h-2 w-2 rounded-full bg-indigo-600"></span>
        </button>

        <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-800 mx-1"></div>

        <div className="flex items-center gap-3 pl-1">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{user?.fullName || user?.username}</p>
            <p className="text-xs text-zinc-500">{user?.role}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
            {(user?.fullName?.[0] || user?.username?.[0] || 'U').toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
}
