'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardSidebar from '../components/DashboardSidebar';
import { Plus, Plane, TrendingDown, CheckCircle, Award } from 'lucide-react';

interface Flight {
  id: string;
  bookingReference: string;
  originalPrice: number;
  currentPrice: number;
  savings: number;
  passengers: number;
  cabin: string;
  status: string;
}

interface Stats {
  fareDips: number;
  totalSavings: number;
  trackedFlights: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [flights, setFlights] = useState<Flight[]>([]);
  const [stats, setStats] = useState<Stats>({
    fareDips: 0,
    totalSavings: 0,
    trackedFlights: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load flights on mount
  useEffect(() => {
    const loadFlights = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/flights');

        if (res.status === 401) {
          // Not logged in, redirect
          router.push('/login');
          return;
        }

        if (!res.ok) {
          throw new Error('Failed to load flights');
        }

        const data = await res.json();
        if (data.success) {
          setFlights(data.booked || []);
          setStats(data.stats || {});
        }
      } catch (err) {
        console.error('Load flights error:', err);
        setError('Failed to load your flights');
      } finally {
        setLoading(false);
      }
    };

    loadFlights();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your flights...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex">
      <DashboardSidebar />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-blue-600 mb-2">
              Flight Price Tracker
            </h1>
            <p className="text-lg text-slate-600">
              Monitor your bookings and get alerts when prices drop
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            {/* Total Savings */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 text-white shadow-lg">
              <TrendingDown className="w-8 h-8 mb-4 opacity-80" />
              <p className="text-emerald-100 text-sm font-semibold uppercase mb-2">Total Savings</p>
              <p className="text-4xl font-black">${stats.totalSavings.toFixed(2)}</p>
            </div>

            {/* Price Drops */}
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl p-8 text-white shadow-lg">
              <Plane className="w-8 h-8 mb-4 opacity-80" />
              <p className="text-blue-100 text-sm font-semibold uppercase mb-2">Price Drops</p>
              <p className="text-4xl font-black">{stats.fareDips}</p>
            </div>

            {/* Tracked Flights */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-8 text-white shadow-lg">
              <CheckCircle className="w-8 h-8 mb-4 opacity-80" />
              <p className="text-purple-100 text-sm font-semibold uppercase mb-2">Tracked</p>
              <p className="text-4xl font-black">{stats.trackedFlights}</p>
            </div>

            {/* Success Rate */}
            <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-3xl p-8 text-white shadow-lg">
              <Award className="w-8 h-8 mb-4 opacity-80" />
              <p className="text-orange-100 text-sm font-semibold uppercase mb-2">Success</p>
              <p className="text-4xl font-black">98%</p>
            </div>
          </div>

          {/* Flights List */}
          {flights.length === 0 ? (
            <div className="text-center py-16">
              <Plane className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No flights tracked yet</h3>
              <p className="text-gray-600 mb-6">Start tracking your flights to get price alerts</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg">
                Add Your First Flight
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Flights</h2>
              <div className="space-y-4">
                {flights.map((flight) => (
                  <div key={flight.id} className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-bold text-blue-600">{flight.bookingReference}</p>
                        <p className="text-xl font-bold text-gray-900">{flight.passengers} passenger · {flight.cabin}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Original: <span className="line-through">${flight.originalPrice}</span></p>
                        <p className="text-xl font-bold text-gray-900">${flight.currentPrice}</p>
                        <p className="text-lg font-bold text-emerald-600">Save ${flight.savings.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
