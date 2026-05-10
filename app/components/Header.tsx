import { Plane } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Plane className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Faredip Clone</span>
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="#flights" className="text-gray-700 hover:text-blue-600 font-medium">
              Flights
            </a>
            <a href="#hotels" className="text-gray-700 hover:text-blue-600 font-medium">
              Hotels
            </a>
            <a href="#support" className="text-gray-700 hover:text-blue-600 font-medium">
              Support
            </a>
          </nav>
          <button className="md:hidden text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
