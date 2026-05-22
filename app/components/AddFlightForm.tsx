'use client';

import { useState } from 'react';
import { Plus, Plane, TrendingDown, Zap, Award, Mail, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface Flight {
  id: string;
  confirmationCode: string;
  passengerName: string;
  airline: string;
  route: string;
  originalPrice: number;
  currentPrice: number;
  savings: number;
  departureDate: string;
  status: 'tracking' | 'price_dropped' | 'refaring_pending' | 'refared';
  emailNotifications: boolean;
  airlineContacted: string[];
  refundStatus: 'pending' | 'approved' | 'received' | 'none';
  refundAmount: number;
}

export default function AddFlightForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [passengerName, setPassengerName] = useState('');
  const [airline, setAirline] = useState('');
  const [route, setRoute] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!confirmationCode || !passengerName || !airline || !originalPrice) {
      alert('Please fill in all fields');
      setLoading(false);
      return;
    }

    const newFlight: Flight = {
      id: `flg-${Date.now()}`,
      confirmationCode: confirmationCode.toUpperCase(),
      passengerName,
      airline,
      route,
      originalPrice: parseFloat(originalPrice),
      currentPrice: parseFloat(originalPrice) * 0.93,
      savings: parseFloat(originalPrice) * 0.07,
      departureDate,
      status: 'price_dropped',
      emailNotifications,
      airlineContacted: [],
      refundStatus: 'none',
      refundAmount: 0,
    };

    setFlights([newFlight, ...flights]);
    setConfirmationCode('');
    setPassengerName('');
    setAirline('');
    setRoute('');
    setOriginalPrice('');
    setDepartureDate('');
    setIsOpen(false);
    setLoading(false);
  };

  const handleApproveRefare = (flightId: string) => {
    setFlights(
      flights.map((flight) =>
        flight.id === flightId
          ? {
              ...flight,
              status: 'refaring_pending',
              refundStatus: 'pending',
              airlineContacted: [...flight.airlineContacted, flight.airline],
            }
          : flight
      )
    );

    setTimeout(() => {
      setFlights(
        flights.map((flight) =>
          flight.id === flightId
            ? {
                ...flight,
                status: 'refared',
                refundStatus: 'received',
                refundAmount: flight.savings,
              }
            : flight
        )
      );
    }, 2000);
  };

  const totalSavings = flights.reduce((sum, f) => sum + f.refundAmount, 0);
  const totalPricedDrops = flights.filter((f) => f.savings > 0).length;
  const successfulRefares = flights.filter((f) => f.refundStatus === 'received').length;

  return (
    <div className="space-y-12">
      {/* Hero Stats Section */}
      <div className="relative">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Total Refunds */}
          <div className="group">
            <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Zap className="w-8 h-8 text-emerald-100" />
                </div>
                <span className="text-3xl">💰</span>
              </div>
              <p className="text-emerald-100 text-sm font-semibold mb-2 uppercase tracking-wider">Total Refunds</p>
              <p className="text-5xl font-black mb-2">${totalSavings.toFixed(2)}</p>
              <p className="text-emerald-100 text-xs">Real money back in your pocket</p>
            </div>
          </div>

          {/* Price Drops */}
          <div className="group">
            <div className="bg-gradient-to-br from-blue-500 via-primary-600 to-cyan-600 rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <TrendingDown className="w-8 h-8 text-blue-100" />
                </div>
                <span className="text-3xl">📉</span>
              </div>
              <p className="text-blue-100 text-sm font-semibold mb-2 uppercase tracking-wider">Price Drops Found</p>
              <p className="text-5xl font-black mb-2">{totalPricedDrops}</p>
              <p className="text-blue-100 text-xs">Flights with better prices</p>
            </div>
          </div>

          {/* Successful Refares */}
          <div className="group">
            <div className="bg-gradient-to-br from-purple-500 via-pink-600 to-rose-600 rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <CheckCircle className="w-8 h-8 text-purple-100" />
                </div>
                <span className="text-3xl">✅</span>
              </div>
              <p className="text-purple-100 text-sm font-semibold mb-2 uppercase tracking-wider">Successful Refares</p>
              <p className="text-5xl font-black mb-2">{successfulRefares}</p>
              <p className="text-purple-100 text-xs">Completed and received</p>
            </div>
          </div>

          {/* Flights Tracking */}
          <div className="group">
            <div className="bg-gradient-to-br from-orange-500 via-amber-600 to-yellow-600 rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Plane className="w-8 h-8 text-orange-100" />
                </div>
                <span className="text-3xl">🎯</span>
              </div>
              <p className="text-orange-100 text-sm font-semibold mb-2 uppercase tracking-wider">Active Tracking</p>
              <p className="text-5xl font-black mb-2">{flights.length}</p>
              <p className="text-orange-100 text-xs">Flights being monitored</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Flight Section */}
      {!isOpen && (
        <div className="relative">
          <button
            onClick={() => setIsOpen(true)}
            className="w-full relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-primary-400 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            <div className="relative bg-white rounded-3xl px-8 py-12 flex items-center justify-center gap-4 group-hover:bg-slate-50 transition-all">
              <Plus className="w-8 h-8 text-primary-600 group-hover:scale-125 transition-transform" />
              <span className="text-2xl font-black text-slate-900">Add a Flight to Track</span>
            </div>
          </button>
        </div>
      )}

      {/* Form */}
      {isOpen && (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 p-12 shadow-2xl">
          <h2 className="text-4xl font-black text-slate-900 mb-2">Track Your Flight</h2>
          <p className="text-slate-600 mb-8">Enter your booking details and we'll monitor the price for you</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
                Confirmation Code
              </label>
              <input
                type="text"
                placeholder="ABC123XYZ"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
                className="w-full px-5 py-4 text-lg border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all placeholder-slate-400"
                required
              />
              <p className="text-xs text-slate-500 mt-2">From your booking confirmation email</p>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
                Passenger Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={passengerName}
                onChange={(e) => setPassengerName(e.target.value)}
                className="w-full px-5 py-4 text-lg border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all placeholder-slate-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
                Airline
              </label>
              <select
                value={airline}
                onChange={(e) => setAirline(e.target.value)}
                className="w-full px-5 py-4 text-lg border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all"
                required
              >
                <option value="">Select airline</option>
                <option value="United">✈️ United Airlines</option>
                <option value="Delta">✈️ Delta Air Lines</option>
                <option value="American">✈️ American Airlines</option>
                <option value="Southwest">✈️ Southwest Airlines</option>
                <option value="JetBlue">✈️ JetBlue Airways</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
                Route
              </label>
              <input
                type="text"
                placeholder="NYC → LAX"
                value={route}
                onChange={(e) => setRoute(e.target.value)}
                className="w-full px-5 py-4 text-lg border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all placeholder-slate-400"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
                Original Price
              </label>
              <div className="relative">
                <span className="absolute left-5 top-4 text-2xl font-bold text-primary-600">$</span>
                <input
                  type="number"
                  step="0.01"
                  placeholder="299.99"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  className="w-full pl-10 pr-5 py-4 text-lg border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all placeholder-slate-400"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
                Departure Date
              </label>
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="w-full px-5 py-4 text-lg border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all"
                required
              />
            </div>
          </div>

          {/* Email Notification */}
          <div className="bg-gradient-to-r from-blue-50 to-primary-50 border-2 border-blue-200 rounded-2xl p-6 mb-8 flex items-center gap-4">
            <Mail className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <label className="flex items-center gap-3 cursor-pointer flex-1">
              <input type="checkbox" checked={emailNotifications} onChange={(e) => setEmailNotifications(e.target.checked)} className="w-5 h-5 accent-blue-600" />
              <div>
                <p className="font-bold text-slate-900">Get Email Alerts</p>
                <p className="text-xs text-slate-600">We'll notify you instantly when the price drops</p>
              </div>
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-black py-4 px-6 rounded-2xl transition-all disabled:opacity-50 text-lg shadow-lg hover:shadow-xl"
            >
              {loading ? 'Adding Flight...' : 'Add Flight & Start Tracking'}
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-8 py-4 border-2 border-slate-300 text-slate-700 font-bold rounded-2xl hover:bg-slate-100 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Tracked Flights */}
      {flights.length > 0 && (
        <div>
          <h2 className="text-3xl font-black text-slate-900 mb-8">Tracked Flights</h2>
          <div className="space-y-6">
            {flights.map((flight) => (
              <div key={flight.id} className="group bg-white rounded-3xl border-2 border-slate-200 p-8 hover:border-primary-300 hover:shadow-2xl transition-all">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                  {/* Left Side */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">✈️</span>
                      <div>
                        <p className="text-xs font-bold text-primary-600 uppercase tracking-wider">
                          {flight.confirmationCode}
                        </p>
                        <p className="text-2xl font-black text-slate-900">{flight.route || `${flight.airline} Flight`}</p>
                        <p className="text-sm text-slate-600">{flight.passengerName}</p>
                      </div>
                    </div>

                    {/* Status Badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {flight.status === 'price_dropped' && (
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 font-bold rounded-full text-sm">
                          <AlertCircle className="w-5 h-5" />
                          Price Dropped! 🔥
                        </span>
                      )}
                      {flight.status === 'refaring_pending' && (
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 font-bold rounded-full text-sm animate-pulse">
                          <Clock className="w-5 h-5" />
                          Contacting Airline...
                        </span>
                      )}
                      {flight.status === 'refared' && (
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 font-bold rounded-full text-sm">
                          <CheckCircle className="w-5 h-5" />
                          Refund Received! ✅
                        </span>
                      )}
                      {flight.emailNotifications && (
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 font-bold rounded-full text-sm">
                          📧 Alerts On
                        </span>
                      )}
                    </div>

                    {/* Price Info */}
                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <p className="text-xs font-bold text-slate-600 uppercase">Original</p>
                        <p className="text-2xl font-black text-slate-900">${flight.originalPrice.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-600 uppercase">Current</p>
                        <p className="text-2xl font-black text-slate-900">${flight.currentPrice.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-emerald-600 uppercase">Savings</p>
                        <p className="text-2xl font-black text-emerald-600">${flight.savings.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Action */}
                  <div className="flex flex-col items-stretch gap-4 lg:w-64">
                    {flight.status === 'price_dropped' && flight.refundStatus === 'none' && (
                      <button
                        onClick={() => handleApproveRefare(flight.id)}
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black py-4 px-6 rounded-2xl transition-all shadow-lg hover:shadow-xl text-lg"
                      >
                        Approve Refare 🚀
                      </button>
                    )}
                    {flight.status === 'refaring_pending' && (
                      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 text-center">
                        <p className="text-sm font-bold text-yellow-700 animate-pulse">Contacting {flight.airline}...</p>
                      </div>
                    )}
                    {flight.status === 'refared' && (
                      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-2xl p-6 text-center">
                        <p className="text-xs font-bold text-emerald-700 mb-2">✅ Refund Received</p>
                        <p className="text-4xl font-black text-emerald-600">${flight.refundAmount.toFixed(2)}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
