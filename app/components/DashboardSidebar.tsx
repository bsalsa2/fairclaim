import { Plane, Bookmark, HelpCircle, User, PlusCircle, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function DashboardSidebar() {
  const handleLogout = () => {
    // Clear the cookie and redirect to home
    fetch('/api/auth/logout', { method: 'POST' })
      .then(() => {
        window.location.href = '/';
      });
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Plane className="w-6 h-6 text-blue-600" />
          <span className="font-bold text-lg text-gray-900">FareDip</span>
          <span className="text-blue-600 font-bold">X</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium"
        >
          <Bookmark className="w-5 h-5" />
          My Flights
        </Link>
        <Link
          href="/dashboard/refaring"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium"
        >
          <PlusCircle className="w-5 h-5" />
          Refaring
        </Link>
        <Link
          href="/dashboard/faq"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium"
        >
          <HelpCircle className="w-5 h-5" />
          FAQ
        </Link>
        <Link
          href="/dashboard/account"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium"
        >
          <User className="w-5 h-5" />
          My Account
        </Link>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
