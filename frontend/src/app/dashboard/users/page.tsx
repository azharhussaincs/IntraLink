'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  UserPlus, 
  Search, 
  MoreHorizontal, 
  Edit2, 
  Trash2, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle,
  Mail,
  Phone,
  Briefcase,
  X,
  Filter
} from 'lucide-react';

export default function UserManagementPage() {
  const [user, setUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('');
  const [designation, setDesignation] = useState('');
  const [role, setRole] = useState('');
  const [managerId, setManagerId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!storedUser || !token) {
      router.push('/auth/login');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    const authorizedRoles = ['ADMIN', 'TEAM_LEAD'];
    
    if (!authorizedRoles.includes(parsedUser.role)) {
      router.push('/dashboard');
      return;
    }

    setUser(parsedUser);
    fetchUsers(token);
    
    // Set default role based on current user
    if (parsedUser.role === 'ADMIN') {
      setRole('SUPER_USER');
    } else if (parsedUser.role === 'TEAM_LEAD') {
      setRole('TEAM_MEMBER');
      setManagerId(parsedUser.id);
    }
  }, [router]);

  const fetchUsers = async (token: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (err) {
      console.error('Failed to fetch users', err);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          username, 
          password, 
          email, 
          role, 
          fullName, 
          phone, 
          department, 
          designation, 
          managerId 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create user');
      }

      setSuccess(`User ${username} created successfully!`);
      setUsername('');
      setPassword('');
      setFullName('');
      setEmail('');
      setPhone('');
      setDepartment('');
      setDesignation('');
      setIsModalOpen(false);
      fetchUsers(token!);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getAvailableRoles = () => {
    if (!user) return [];
    if (user.role === 'ADMIN') return ['SUPER_USER', 'TEAM_LEAD'];
    if (user.role === 'TEAM_LEAD') return ['TEAM_MANAGER', 'PROJECT_MANAGER', 'TEAM_MEMBER'];
    return [];
  };

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Member Directory</h1>
            <p className="text-sm text-zinc-500">Manage organization members and hierarchical permissions.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-all shadow-lg shadow-indigo-600/20"
          >
            <UserPlus size={18} />
            <span>Add New Member</span>
          </button>
        </div>

        {/* User Table Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search by name, role, dept..." 
                  className="h-9 w-full sm:w-80 bg-zinc-100 dark:bg-zinc-800 rounded-lg pl-10 pr-4 text-sm focus:outline-none"
                />
             </div>
             <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-zinc-500 uppercase tracking-widest hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-all">
                   <Filter size={14} /> Filter
                </button>
             </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-zinc-50/50 dark:bg-zinc-800/20 border-b border-zinc-100 dark:border-zinc-800 text-[10px] uppercase text-zinc-400 font-bold tracking-widest">
                  <th className="px-6 py-4">Identity</th>
                  <th className="px-6 py-4">Role & Dept</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800/50">
                {users.map((u) => (
                  <tr key={u.id} className="group hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 font-bold text-sm">
                          {(u.fullName?.[0] || u.username?.[0] || 'U').toUpperCase()}
                        </div>
                        <div className="min-w-0">
                           <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50 truncate">{u.fullName || 'No Name'}</p>
                           <p className="text-xs text-zinc-500 truncate">@{u.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex flex-col">
                          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{u.role}</span>
                          <span className="text-xs text-zinc-500 mt-0.5">{u.department || 'General'}</span>
                       </div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex flex-col gap-1">
                          {u.email && <div className="flex items-center gap-1.5 text-[11px] text-zinc-500"><Mail size={12} /> {u.email}</div>}
                          {u.phone && <div className="flex items-center gap-1.5 text-[11px] text-zinc-500"><Phone size={12} /> {u.phone}</div>}
                       </div>
                    </td>
                    <td className="px-6 py-4">
                       {u.isActive ? (
                         <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                            <CheckCircle2 size={12} /> Active
                         </span>
                       ) : (
                         <span className="flex items-center gap-1 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                            <XCircle size={12} /> Inactive
                         </span>
                       )}
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-indigo-600 transition-all"><Edit2 size={14} /></button>
                          <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 transition-all"><Trash2 size={14} /></button>
                          <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800 mx-1"></div>
                          <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 transition-all"><MoreHorizontal size={14} /></button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create User Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
             <div className="bg-white dark:bg-zinc-950 w-full max-w-2xl rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50">
                   <div>
                      <h2 className="text-xl font-bold">Add New Member</h2>
                      <p className="text-xs text-zinc-500">Onboard a new colleague to the CipherLink network.</p>
                   </div>
                   <button onClick={() => setIsModalOpen(false)} className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all">
                      <X size={20} />
                   </button>
                </div>

                <form className="p-6 space-y-6" onSubmit={handleCreateUser}>
                  {error && <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-bold rounded-xl flex items-center gap-2"><ShieldAlert size={14} /> {error}</div>}
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1">Username *</label>
                      <input 
                        required 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full h-11 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-sm focus:outline-none focus:border-indigo-500" 
                        placeholder="j_doe"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1">Password *</label>
                      <input 
                        type="password" 
                        required 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-11 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-sm focus:outline-none focus:border-indigo-500" 
                        placeholder="••••••••"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1">Full Name</label>
                      <input 
                        value={fullName} 
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full h-11 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-sm focus:outline-none focus:border-indigo-500" 
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1">Email</label>
                      <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-11 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-sm focus:outline-none focus:border-indigo-500" 
                        placeholder="john@org.lan"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1">Department</label>
                      <input 
                        value={department} 
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full h-11 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-sm focus:outline-none focus:border-indigo-500" 
                        placeholder="Engineering"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1">Role *</label>
                      <select 
                        required 
                        value={role} 
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full h-11 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-sm focus:outline-none focus:border-indigo-500"
                      >
                        {getAvailableRoles().map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1">Reports To (Manager)</label>
                      <select 
                        value={managerId} 
                        onChange={(e) => setManagerId(e.target.value)}
                        className="w-full h-11 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-sm focus:outline-none focus:border-indigo-500"
                      >
                        <option value="">No Manager (Top Level)</option>
                        {users.map(u => <option key={u.id} value={u.id}>{u.fullName || u.username} ({u.role})</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                     <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 rounded-xl text-sm font-bold text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all">Cancel</button>
                     <button 
                        type="submit" 
                        disabled={loading}
                        className="px-8 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-bold shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all disabled:opacity-50"
                     >
                        {loading ? 'Creating...' : 'Create Member'}
                     </button>
                  </div>
                </form>
             </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
