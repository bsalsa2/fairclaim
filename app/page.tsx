'use client';

import Link from 'next/link';
import { Zap, TrendingDown, CheckCircle, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">
              ✈️ FareDip
            </div>
          </div>
          <Link
            href="/login"
            className="px-6 py-2 rounded-lg font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-primary-600 mb-6 leading-tight">
            Get Refunds When Flight Prices Drop
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            Add your flight booking. We monitor prices 24/7. When prices drop, we automatically refare and get you refunds as cash, credit, or points.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/login"
              className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-xl hover:shadow-lg transition-all transform hover:scale-105 flex items-center gap-2"
            >
              Sign In <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 bg-white border-2 border-slate-300 text-slate-900 font-bold rounded-xl hover:border-slate-400 transition-all"
            >
              View Demo
            </Link>
          </div>
        </div>

        {/* How It Works */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-lg transition-all">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-4">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Add Your Flight</h3>
            <p className="text-slate-600">Enter your confirmation code and passenger name. Takes 30 seconds.</p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-lg transition-all">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-4">
              <TrendingDown className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">We Monitor Prices</h3>
            <p className="text-slate-600">24/7 price tracking. Get instant alerts when prices drop.</p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-lg transition-all">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4">
              <CheckCircle className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Automatic Refund</h3>
            <p className="text-slate-600">One-click approval. We handle everything with the airline.</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 mb-24">
          <div className="text-center">
            <p className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">$2M+</p>
            <p className="text-slate-600 font-semibold mt-2">Refunds Processed</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">50K+</p>
            <p className="text-slate-600 font-semibold mt-2">Active Users</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">98%</p>
            <p className="text-slate-600 font-semibold mt-2">Success Rate</p>
          </div>
        </div>
      </section>
    </div>
  );
}
