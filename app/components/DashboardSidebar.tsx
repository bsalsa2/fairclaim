'use client';

import { Plane, Bookmark, HelpCircle, User, TrendingDown, LogOut, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardSidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    fetch('/api/auth/logout', { method: 'POST' }).then(() => {
      window.location.href = '/';
    });
  };

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 min-h-screen flex flex-col border-r border-slate-700/50">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700/30">
        <Link href="/dashboard" className="flex items-center gap-3 group cursor-pointer">
          <div className="p-2 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 group-hover:shadow-glow transition-all">
            <Plane className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-black text-white">FareDip</p>
            <p className="text-xs text-primary-300">Smart Travel</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <Link
          href="/dashboard"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
            isActive('/dashboard')
              ? 'bg-gradient-to-r from-primary-500/20 to-primary-600/20 text-primary-300 border border-primary-500/30'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Bookmark className="w-5 h-5" />
          My Flights
        </Link>
        <Link
          href="/dashboard/refaring"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
            isActive('/dashboard/refaring')
              ? 'bg-gradient-to-r from-primary-500/20 to-primary-600/20 text-primary-300 border border-primary-500/30'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <TrendingDown className="w-5 h-5" />
          Refaring
        </Link>
        <Link
          href="/dashboard/faq"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
            isActive('/dashboard/faq')
              ? 'bg-gradient-to-r from-primary-500/20 to-primary-600/20 text-primary-300 border border-primary-500/30'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <HelpCircle className="w-5 h-5" />
          FAQ
        </Link>
        <Link
          href="/dashboard/account"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
            isActive('/dashboard/account')
              ? 'bg-gradient-to-r from-primary-500/20 to-primary-600/20 text-primary-300 border border-primary-500/30'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <User className="w-5 h-5" />
          Account
        </Link>
      </nav>

      {/* Footer */}
      <div className="p-4 space-y-2 border-t border-slate-700/30">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/50 font-semibold transition-all">
          <Settings className="w-5 h-5" />
          Settings
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:text-red-300 hover:bg-red-950/30 font-semibold transition-all"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
