'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FlightCard from '../components/FlightCard';
import FiltersSidebar from '../components/FiltersSidebar';

const mockFlights = [
  {
    id: '1',
    airline: 'Delta Airlines',
    departTime: '08:00 AM',
    arrivalTime: '12:30 PM',
    departAirport: 'JFK',
    arrivalAirport: 'LAX',
    duration: '5h 30m',
    stops: 0,
    price: 189,
  },
  {
    id: '2',
    airline: 'United Airlines',
    departTime: '10:45 AM',
    arrivalTime: '03:15 PM',
    departAirport: 'JFK',
    arrivalAirport: 'LAX',
    duration: '5h 30m',
    stops: 0,
    price: 205,
  },
  {
    id: '3',
    airline: 'American Airlines',
    departTime: '02:30 PM',
    arrivalTime: '08:45 PM',
    departAirport: 'JFK',
    arrivalAirport: 'LAX',
    duration: '6h 15m',
    stops: 1,
    price: 156,
  },
  {
    id: '4',
    airline: 'Southwest Airlines',
    departTime: '06:15 AM',
    arrivalTime: '01:00 PM',
    departAirport: 'JFK',
    arrivalAirport: 'LAX',
    duration: '6h 45m',
    stops: 1,
    price: 142,
  },
  {
    id: '5',
    airline: 'Lufthansa',
    departTime: '11:00 PM',
    arrivalTime: '09:30 AM',
    departAirport: 'JFK',
    arrivalAirport: 'LAX',
    duration: '7h 30m',
    stops: 2,
    price: 99,
  },
];

export default function Results() {
  const [filtersOpen, setFiltersOpen] = useState(true);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Search Refine Section */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">New York (JFK) → Los Angeles (LAX)</h2>
          <p className="text-gray-600">May 20, 2024 • 1 Passenger • Economy</p>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <FiltersSidebar isOpen={filtersOpen} onClose={() => setFiltersOpen(false)} />
          </div>

          {/* Flight Results */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {mockFlights.length} flights found
              </h3>
              <select className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Shortest Flight</option>
                <option>Earliest Departure</option>
              </select>
            </div>

            {/* Flight Cards */}
            <div className="space-y-4">
              {mockFlights.map((flight) => (
                <FlightCard
                  key={flight.id}
                  airline={flight.airline}
                  departTime={flight.departTime}
                  arrivalTime={flight.arrivalTime}
                  departAirport={flight.departAirport}
                  arrivalAirport={flight.arrivalAirport}
                  duration={flight.duration}
                  stops={flight.stops}
                  price={flight.price}
                  onViewDeal={() => alert(`Viewing deal for ${flight.airline}`)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
