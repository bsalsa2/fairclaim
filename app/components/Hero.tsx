import SearchBar from './SearchBar';

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-white pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Cheap Flights to <span className="text-blue-600">Anywhere</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find the best flight deals instantly. Compare prices across airlines and save big on your next trip.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-6xl mx-auto">
          <SearchBar />
        </div>
      </div>
    </section>
  );
}
