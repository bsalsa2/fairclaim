'use client';

import { useState } from 'react';
import { Plus, AlertCircle, Mail, CheckCircle, Clock } from 'lucide-react';

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
  priceHistory: { date: string; price: number }[];
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
      currentPrice: parseFloat(originalPrice) * 0.95, // Simulate price drop
      savings: parseFloat(originalPrice) * 0.05,
      departureDate,
      status: 'price_dropped',
      priceHistory: [
        { date: new Date().toLocaleDateString(), price: parseFloat(originalPrice) },
        { date: new Date(Date.now() - 86400000).toLocaleDateString(), price: parseFloat(originalPrice) * 0.95 },
      ],
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

    // Simulate refund received after 2 seconds
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
    <div className="space-y-8">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-6 border border-emerald-200/30">
          <p className="text-sm font-semibold text-emerald-600 mb-2">Total Refunds Received</p>
          <p className="text-4xl font-black text-emerald-600">${totalSavings.toFixed(2)}</p>
          <p className="text-xs text-emerald-500 mt-2">💰 Real money back</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 border border-blue-200/30">
          <p className="text-sm font-semibold text-blue-600 mb-2">Price Drops Found</p>
          <p className="text-4xl font-black text-blue-600">{totalPricedDrops}</p>
          <p className="text-xs text-blue-500 mt-2">📉 Flights tracked</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-6 border border-purple-200/30">
          <p className="text-sm font-semibold text-purple-600 mb-2">Successful Refares</p>
          <p className="text-4xl font-black text-purple-600">{successfulRefares}</p>
          <p className="text-xs text-purple-500 mt-2">✅ Completed</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl p-6 border border-orange-200/30">
          <p className="text-sm font-semibold text-orange-600 mb-2">Flights Tracking</p>
          <p className="text-4xl font-black text-orange-600">{flights.length}</p>
          <p className="text-xs text-orange-500 mt-2">🎯 Active tracking</p>
        </div>
      </div>

      {/* Add Flight Button */}
      <div>
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:shadow-glow text-white font-bold py-4 px-6 rounded-2xl transition-all flex items-center justify-center gap-3 text-lg"
          >
            <Plus className="w-6 h-6" />
            Add a Flight to Track
          </button>
        )}

        {isOpen && (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/50 p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Track Your Flight</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Confirmation Code</label>
                <input
                  type="text"
                  placeholder="e.g., ABC123XYZ"
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
                <p className="text-xs text-slate-500 mt-1">Found in your booking confirmation email</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Passenger Name</label>
                <input
                  type="text"
                  placeholder="e.g., John Doe"
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Airline</label>
                <select
                  value={airline}
                  onChange={(e) => setAirline(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                >
                  <option value="">Select airline</option>
                  <option value="United">United Airlines</option>
                  <option value="Delta">Delta Air Lines</option>
                  <option value="American">American Airlines</option>
                  <option value="Southwest">Southwest Airlines</option>
                  <option value="JetBlue">JetBlue Airways</option>
                  <option value="Alaska">Alaska Airlines</option>
                  <option value="Spirit">Spirit Airlines</option>
                  <option value="Frontier">Frontier Airlines</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Route</label>
                <input
                  type="text"
                  placeholder="e.g., NYC → LAX"
                  value={route}
                  onChange={(e) => setRoute(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Original Price</label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-slate-500 font-semibold">$</span>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="299.99"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Departure Date</label>
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <label className="flex items-center gap-3 cursor-pointer flex-1">
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium text-slate-700">
                  Send me email alerts when price drops (recommended)
                </span>
              </label>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 hover:shadow-glow text-white font-bold py-3 px-6 rounded-xl transition-all disabled:opacity-50"
              >
                {loading ? 'Adding...' : 'Add Flight & Start Tracking'}
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-6 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Tracked Flights */}
      {flights.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Your Tracked Flights</h3>

          <div className="space-y-4">
            {flights.map((flight) => (
              <div
                key={flight.id}
                className="bg-white rounded-2xl border border-slate-200/50 p-6 shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  {/* Flight Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-500 uppercase">
                          {flight.confirmationCode}
                        </p>
                        <p className="text-lg font-bold text-slate-900">{flight.route || `${flight.airline} Flight`}</p>
                        <p className="text-sm text-slate-600">{flight.passengerName}</p>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {flight.status === 'price_dropped' && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                          <AlertCircle className="w-4 h-4" />
                          Price Dropped!
                        </span>
                      )}
                      {flight.status === 'refaring_pending' && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">
                          <Clock className="w-4 h-4" />
                          Refaring in Progress
                        </span>
                      )}
                      {flight.status === 'refared' && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                          <CheckCircle className="w-4 h-4" />
                          Refund Received
                        </span>
                      )}
                      {flight.emailNotifications && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                          <Mail className="w-3 h-3" />
                          Alerts On
                        </span>
                      )}
                    </div>

                    {/* Price Info */}
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-slate-600">Original Price</p>
                        <p className="font-bold text-slate-900">${flight.originalPrice.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Current Price</p>
                        <p className="font-bold text-slate-900">${flight.currentPrice.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-slate-600">You Save</p>
                        <p className="font-bold text-emerald-600">${flight.savings.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex flex-col gap-2">
                    {flight.status === 'price_dropped' && flight.refundStatus === 'none' && (
                      <button
                        onClick={() => handleApproveRefare(flight.id)}
                        className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:shadow-glow text-white font-bold py-3 px-6 rounded-xl transition-all whitespace-nowrap"
                      >
                        Approve Refare
                      </button>
                    )}
                    {flight.status === 'refaring_pending' && (
                      <div className="text-center py-3">
                        <p className="text-sm font-semibold text-slate-600 animate-pulse">
                          Contacting {flight.airline}...
                        </p>
                      </div>
                    )}
                    {flight.status === 'refared' && (
                      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center">
                        <p className="text-xs font-semibold text-emerald-600 mb-1">Refund Received</p>
                        <p className="text-lg font-bold text-emerald-600">${flight.refundAmount.toFixed(2)}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Airlines Contacted */}
                {flight.airlineContacted.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <p className="text-xs font-semibold text-slate-600 mb-2">Airlines Contacted:</p>
                    <div className="flex gap-2 flex-wrap">
                      {flight.airlineContacted.map((airline, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                          ✓ {airline}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {flights.length === 0 && !isOpen && (
        <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
          <p className="text-slate-600 text-lg">No flights tracked yet</p>
          <p className="text-slate-500 text-sm">Add your first flight to start saving!</p>
        </div>
      )}
    </div>
  );
}
