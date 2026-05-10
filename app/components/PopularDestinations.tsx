import { ArrowRight, Flame } from 'lucide-react';

interface Destination {
  id: string;
  city: string;
  country: string;
  startingPrice: number;
  savings: number;
  image: string;
}

const destinations: Destination[] = [
  {
    id: '1',
    city: 'New York',
    country: 'USA',
    startingPrice: 89,
    savings: 45,
    image: 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600',
  },
  {
    id: '2',
    city: 'London',
    country: 'UK',
    startingPrice: 120,
    savings: 62,
    image: 'bg-gradient-to-br from-red-400 via-red-500 to-red-600',
  },
  {
    id: '3',
    city: 'Paris',
    country: 'France',
    startingPrice: 110,
    savings: 58,
    image: 'bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600',
  },
  {
    id: '4',
    city: 'Tokyo',
    country: 'Japan',
    startingPrice: 450,
    savings: 120,
    image: 'bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600',
  },
  {
    id: '5',
    city: 'Dubai',
    country: 'UAE',
    startingPrice: 200,
    savings: 85,
    image: 'bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600',
  },
  {
    id: '6',
    city: 'Sydney',
    country: 'Australia',
    startingPrice: 520,
    savings: 210,
    image: 'bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-600',
  },
];

export default function PopularDestinations() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            🔥 Hot Deals to Top Destinations
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl">
            Discover the cheapest flights to trending destinations this month. Limited-time offers with massive savings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, idx) => (
            <div
              key={dest.id}
              className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 border border-slate-200/50"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {/* Image */}
              <div className={`${dest.image} h-56 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all" />

                {/* Sale Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                  <Flame className="w-4 h-4" />
                  Save ${dest.savings}
                </div>

                {/* Destination Name - Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all">
                  <p className="text-white text-sm font-semibold">Click to explore</p>
                </div>
              </div>

              {/* Content */}
              <div className="bg-white p-6 border-t border-slate-100">
                <h3 className="text-2xl font-black text-slate-900 mb-1">{dest.city}</h3>
                <p className="text-slate-500 text-sm font-semibold mb-4">{dest.country}</p>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Starting from
                    </p>
                    <p className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">
                      ${dest.startingPrice}
                    </p>
                  </div>
                  <button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:shadow-glow text-white p-3 rounded-xl transition-all group-hover:translate-x-1 group-hover:scale-110">
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
