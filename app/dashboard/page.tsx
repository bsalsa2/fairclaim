'use client';

import { useEffect, useState } from 'react';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardStats from '../components/DashboardStats';
import BookedFlightsSection from '../components/BookedFlightsSection';
import TrackedFlightsSection from '../components/TrackedFlightsSection';
import { ChevronDown } from 'lucide-react';

interface FlightData {
  stats: {
    fareDips: number;
    totalSavings: number;
    bookedFlightsCount: number;
    trackedFlightsCount: number;
  };
  booked: Array<{
    id: string;
    flightDate: string;
    route: string;
    airline: string;
    originalPrice: number;
    currentPrice: number;
    savings: number;
    status: string;
  }>;
  tracked: Array<{
    id: string;
    flightDate: string;
    route: string;
    airline: string;
    originalPrice: number;
    currentPrice: number;
    latestPriceDrop: number;
  }>;
}

export default function DashboardPage() {
  const [data, setData] = useState<FlightData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/flights');
        const flightData = await response.json();
        setData(flightData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">My Flights</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <span>📊 #72</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span>👥 N/A</span>
                </div>
                <button className="border border-green-600 text-green-600 hover:bg-green-50 font-bold py-2 px-4 rounded-lg transition-colors">
                  🎁 Refer Friends
                </button>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading your flights...</p>
            </div>
          ) : data ? (
            <>
              {/* Stats */}
              <DashboardStats
                fareDips={data.stats.fareDips}
                totalSavings={data.stats.totalSavings}
              />

              {/* Booked Flights */}
              <BookedFlightsSection flights={data.booked} />

              {/* Tracked Flights */}
              <TrackedFlightsSection flights={data.tracked} />

              {/* Past Flights */}
              <div>
                <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
                  <ChevronDown className="w-5 h-5" />
                  <h2 className="text-xl font-bold text-gray-900">Past Flights</h2>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">Failed to load flights</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
