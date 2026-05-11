'use client';

import { useState } from 'react';
import { MapPin, Calendar, Users, Plane, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

type TripType = 'round' | 'oneway' | 'multicity';

export default function SearchBar() {
  const router = useRouter();
  const [tripType, setTripType] = useState<TripType>('round');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [cabin, setCabin] = useState('economy');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/results');
  };

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex gap-2 md:gap-4 mb-8 border-b border-slate-200">
        {[
          { id: 'round', label: 'Round Trip' },
          { id: 'oneway', label: 'One Way' },
          { id: 'multicity', label: 'Multi-city' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setTripType(tab.id as TripType)}
            className={`pb-4 px-1 font-semibold transition-all relative group ${
              tripType === tab.id ? 'text-primary-600' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
            <span
              className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 transition-all ${
                tripType === tab.id ? 'w-full' : 'w-0 group-hover:w-full'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-slate-200/50 backdrop-blur-sm hover:shadow-2xl transition-shadow"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Origin */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">From</label>
            <div className="relative group">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-primary-500" />
              <input
                type="text"
                placeholder="New York"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-slate-50 group-hover:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Destination */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">To</label>
            <div className="relative group">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-primary-500" />
              <input
                type="text"
                placeholder="Los Angeles"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-slate-50 group-hover:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Depart Date */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">Depart</label>
            <div className="relative group">
              <Calendar className="absolute left-3 top-3 w-5 h-5 text-primary-500" />
              <input
                type="date"
                value={departDate}
                onChange={(e) => setDepartDate(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-slate-50 group-hover:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Return Date */}
          {tripType === 'round' && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">Return</label>
              <div className="relative group">
                <Calendar className="absolute left-3 top-3 w-5 h-5 text-primary-500" />
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-slate-50 group-hover:bg-white transition-colors"
                />
              </div>
            </div>
          )}

          {/* Passengers & Cabin */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-slate-700 mb-3">Passengers</label>
              <div className="relative group">
                <Users className="absolute left-3 top-3 w-5 h-5 text-primary-500" />
                <input
                  type="number"
                  min="1"
                  max="9"
                  value={passengers}
                  onChange={(e) => setPassengers(parseInt(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-slate-50 group-hover:bg-white transition-colors"
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-slate-700 mb-3">Class</label>
              <select
                value={cabin}
                onChange={(e) => setCabin(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-slate-50 hover:bg-white transition-colors text-slate-900 font-medium"
              >
                <option value="economy">Economy</option>
                <option value="premium">Premium</option>
                <option value="business">Business</option>
                <option value="first">First Class</option>
              </select>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="mt-8 flex gap-4">
          <button
            type="submit"
            className="flex-1 md:flex-none bg-gradient-to-r from-primary-500 to-primary-600 hover:shadow-glow text-white font-bold py-3 px-8 rounded-xl transition-all flex items-center justify-center gap-2 group"
          >
            <Plane className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Search Flights
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </form>
    </div>
  );
}
