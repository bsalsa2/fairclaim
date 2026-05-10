'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface FiltersProps {
  onClose?: () => void;
  isOpen?: boolean;
}

export default function FiltersSidebar({ onClose, isOpen = true }: FiltersProps) {
  const [stops, setStops] = useState<string[]>([]);
  const [airlines, setAirlines] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const toggleStop = (stop: string) => {
    setStops((prev) =>
      prev.includes(stop) ? prev.filter((s) => s !== stop) : [...prev, stop]
    );
  };

  const toggleAirline = (airline: string) => {
    setAirlines((prev) =>
      prev.includes(airline)
        ? prev.filter((a) => a !== airline)
        : [...prev, airline]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 h-fit">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Filters</h3>
        <button onClick={onClose} className="md:hidden">
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Stops Filter */}
      <div className="mb-8">
        <h4 className="font-semibold text-gray-900 mb-4">Stops</h4>
        <div className="space-y-3">
          {['Non-stop', '1 Stop', '2+ Stops'].map((stop) => (
            <label key={stop} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={stops.includes(stop)}
                onChange={() => toggleStop(stop)}
                className="w-4 h-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">{stop}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Airlines Filter */}
      <div className="mb-8">
        <h4 className="font-semibold text-gray-900 mb-4">Airlines</h4>
        <div className="space-y-3">
          {['Delta', 'United', 'American', 'Southwest', 'Lufthansa'].map((airline) => (
            <label key={airline} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={airlines.includes(airline)}
                onChange={() => toggleAirline(airline)}
                className="w-4 h-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">{airline}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-8">
        <h4 className="font-semibold text-gray-900 mb-4">Price Range</h4>
        <div className="space-y-4">
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-700">${priceRange[0]}</span>
            <span className="text-gray-700">${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <button className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors">
        Reset Filters
      </button>
    </div>
  );
}
