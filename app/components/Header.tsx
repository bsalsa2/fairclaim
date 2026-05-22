import { Plane, Menu } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 group-hover:shadow-glow transition-all">
              <Plane className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800">
                FareDip
              </span>
              <span className="text-xs font-semibold text-primary-500">Smart Flight Deals</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8">
            <Link href="/#flights" className="text-slate-600 hover:text-primary-600 font-medium transition-colors relative group">
              Flights
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link href="/#hotels" className="text-slate-600 hover:text-primary-600 font-medium transition-colors relative group">
              Hotels
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link href="/#deals" className="text-slate-600 hover:text-primary-600 font-medium transition-colors relative group">
              Hot Deals
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 group-hover:w-full transition-all duration-300" />
            </Link>
          </nav>

          {/* CTA + Mobile Menu */}
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden sm:block bg-gradient-to-r from-primary-500 to-primary-600 hover:shadow-glow text-white font-semibold py-2 px-6 rounded-lg transition-all">
              Sign In
            </Link>
            <button className="md:hidden text-slate-600 hover:text-primary-600">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

