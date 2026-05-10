import Link from 'next/link';
import Header from './components/Header';
import Hero from './components/Hero';
import PopularDestinations from './components/PopularDestinations';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <PopularDestinations />

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Have an existing account?</h2>
          <p className="text-lg mb-8 opacity-90">
            Sign in to view your booked flights and track price drops.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/login"
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="border-2 border-white text-white hover:bg-blue-700 font-bold py-3 px-8 rounded-lg transition-colors"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
