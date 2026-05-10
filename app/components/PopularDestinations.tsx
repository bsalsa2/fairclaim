import { ArrowRight } from 'lucide-react';

interface Destination {
  id: string;
  city: string;
  country: string;
  startingPrice: number;
  image: string;
}

const destinations: Destination[] = [
  {
    id: '1',
    city: 'New York',
    country: 'USA',
    startingPrice: 89,
    image: 'bg-gradient-to-br from-blue-400 to-blue-600',
  },
  {
    id: '2',
    city: 'London',
    country: 'UK',
    startingPrice: 120,
    image: 'bg-gradient-to-br from-red-400 to-red-600',
  },
  {
    id: '3',
    city: 'Paris',
    country: 'France',
    startingPrice: 110,
    image: 'bg-gradient-to-br from-purple-400 to-purple-600',
  },
  {
    id: '4',
    city: 'Tokyo',
    country: 'Japan',
    startingPrice: 450,
    image: 'bg-gradient-to-br from-pink-400 to-pink-600',
  },
  {
    id: '5',
    city: 'Dubai',
    country: 'UAE',
    startingPrice: 200,
    image: 'bg-gradient-to-br from-amber-400 to-amber-600',
  },
  {
    id: '6',
    city: 'Sydney',
    country: 'Australia',
    startingPrice: 520,
    image: 'bg-gradient-to-br from-cyan-400 to-cyan-600',
  },
];

export default function PopularDestinations() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Popular Destinations</h2>
        <p className="text-gray-600 mb-12">Explore these trending destinations with unbeatable prices</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              className="group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className={`${dest.image} h-48 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all" />
              </div>
              <div className="bg-white p-5">
                <h3 className="text-xl font-bold text-gray-900">{dest.city}</h3>
                <p className="text-gray-600 text-sm mb-4">{dest.country}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Starting from</p>
                    <p className="text-2xl font-bold text-blue-600">${dest.startingPrice}</p>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
