import SearchBar from './SearchBar';
import { Sparkles, TrendingDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-32">
      {/* Background gradient with animation */}
      <div className="absolute inset-0 bg-hero-gradient opacity-10" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float animation-delay-2000" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="flex justify-center mb-8 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full border border-primary-200">
            <Sparkles className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-semibold text-primary-600">✨ Save up to $500 on your next flight</span>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center mb-16 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <h1 className="text-6xl md:text-7xl font-black mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-primary-600 to-slate-900">
              Find Cheap Flights
            </span>
            <br />
            <span className="text-4xl md:text-5xl text-primary-600">Instantly & Effortlessly</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Track price drops, get notified of the best deals, and never overpay for flights again. Join thousands of travelers saving hundreds every month.
          </p>
        </div>

        {/* Social Proof */}
        <div className="flex justify-center gap-12 mb-12 text-center text-slate-600 flex-wrap">
          <div>
            <p className="text-2xl font-black text-primary-600">50K+</p>
            <p className="text-sm">Active Users</p>
          </div>
          <div>
            <p className="text-2xl font-black text-primary-600">$2M+</p>
            <p className="text-sm">Saved by Users</p>
          </div>
          <div className="flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-primary-600" />
            <div>
              <p className="text-2xl font-black text-primary-600">24/7</p>
              <p className="text-sm">Price Tracking</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-6xl mx-auto animate-slide-up" style={{ animationDelay: '200ms' }}>
          <SearchBar />
        </div>
      </div>
    </section>
  );
}
