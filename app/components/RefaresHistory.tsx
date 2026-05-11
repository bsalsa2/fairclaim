'use client';

import { CheckCircle, Calendar, DollarSign, Building2 } from 'lucide-react';

interface Refare {
  id: string;
  confirmationCode: string;
  passengerName: string;
  airline: string;
  route: string;
  originalPrice: number;
  newPrice: number;
  refundAmount: number;
  refaredDate: string;
  refundReceivedDate: string;
  refundMethod: 'cash' | 'credit' | 'points';
  status: 'received' | 'pending';
}

const mockRefares: Refare[] = [
  {
    id: 'refare-1',
    confirmationCode: 'AB12CD',
    passengerName: 'John Doe',
    airline: 'United Airlines',
    route: 'JFK → LAX',
    originalPrice: 450.0,
    newPrice: 380.0,
    refundAmount: 70.0,
    refaredDate: '2024-05-05',
    refundReceivedDate: '2024-05-07',
    refundMethod: 'cash',
    status: 'received',
  },
  {
    id: 'refare-2',
    confirmationCode: 'EF34GH',
    passengerName: 'Jane Smith',
    airline: 'Delta Air Lines',
    route: 'ORD → MIA',
    originalPrice: 320.0,
    newPrice: 265.0,
    refundAmount: 55.0,
    refaredDate: '2024-04-28',
    refundReceivedDate: '2024-04-30',
    refundMethod: 'credit',
    status: 'received',
  },
  {
    id: 'refare-3',
    confirmationCode: 'IJ56KL',
    passengerName: 'John Doe',
    airline: 'Southwest Airlines',
    route: 'SFO → SEA',
    originalPrice: 280.0,
    newPrice: 240.0,
    refundAmount: 40.0,
    refaredDate: '2024-04-15',
    refundReceivedDate: '2024-04-17',
    refundMethod: 'points',
    status: 'received',
  },
];

export default function RefaresHistory() {
  const totalRefunded = mockRefares.reduce((sum, r) => sum + r.refundAmount, 0);
  const successRate = (mockRefares.filter((r) => r.status === 'received').length / mockRefares.length) * 100;

  const getRefundMethodColor = (method: string) => {
    switch (method) {
      case 'cash':
        return 'bg-emerald-100 text-emerald-700 border-emerald-300';
      case 'credit':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'points':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getRefundMethodLabel = (method: string) => {
    switch (method) {
      case 'cash':
        return '💰 Cash Refund';
      case 'credit':
        return '🎫 Flight Credit';
      case 'points':
        return '⭐ Airline Points';
      default:
        return method;
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-6 border border-emerald-200">
          <p className="text-sm font-semibold text-emerald-600 mb-2">Total Refunded</p>
          <p className="text-4xl font-black text-emerald-600">${totalRefunded.toFixed(2)}</p>
          <p className="text-xs text-emerald-500 mt-2">From {mockRefares.length} successful refares</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 border border-blue-200">
          <p className="text-sm font-semibold text-blue-600 mb-2">Success Rate</p>
          <p className="text-4xl font-black text-blue-600">{successRate.toFixed(0)}%</p>
          <p className="text-xs text-blue-500 mt-2">All refares successfully received</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-6 border border-purple-200">
          <p className="text-sm font-semibold text-purple-600 mb-2">Avg. Savings</p>
          <p className="text-4xl font-black text-purple-600">
            ${(totalRefunded / mockRefares.length).toFixed(0)}
          </p>
          <p className="text-xs text-purple-500 mt-2">Per refare</p>
        </div>
      </div>

      {/* History List */}
      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Refare History</h3>

        <div className="space-y-4">
          {mockRefares.map((refare) => (
            <div
              key={refare.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                {/* Flight Info */}
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-sm font-semibold text-slate-500 uppercase">{refare.confirmationCode}</p>
                        <div className="flex-1 flex items-center justify-end md:justify-start gap-2">
                          <CheckCircle className="w-5 h-5 text-emerald-600" />
                          <span className="text-xs font-bold text-emerald-600">Refund Received</span>
                        </div>
                      </div>
                      <p className="text-lg font-bold text-slate-900">{refare.route}</p>
                      <p className="text-sm text-slate-600">{refare.passengerName}</p>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-slate-600">Airline</p>
                      <p className="font-semibold text-slate-900">{refare.airline}</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Original Price</p>
                      <p className="font-semibold text-slate-900">${refare.originalPrice.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-slate-600">New Price</p>
                      <p className="font-semibold text-slate-900">${refare.newPrice.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Refund Method</p>
                      <span className={`text-xs font-bold px-2 py-1 rounded border ${getRefundMethodColor(refare.refundMethod)}`}>
                        {getRefundMethodLabel(refare.refundMethod)}
                      </span>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="flex gap-4 text-xs text-slate-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Refared: {new Date(refare.refaredDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      <span>Received: {new Date(refare.refundReceivedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Refund Amount */}
                <div className="md:text-right">
                  <p className="text-sm text-slate-600 mb-2">You Saved</p>
                  <p className="text-4xl font-black text-emerald-600">${refare.refundAmount.toFixed(2)}</p>
                  <p className="text-xs text-slate-500 mt-2">
                    {Math.round((refare.refundAmount / refare.originalPrice) * 100)}% discount
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 p-8">
        <h3 className="text-xl font-bold text-blue-900 mb-4">How Our Refaring Works</h3>
        <div className="space-y-3 text-sm text-blue-800">
          <div className="flex gap-3">
            <span className="font-bold text-blue-600 flex-shrink-0">1.</span>
            <p>You add your flight booking (confirmation code + name)</p>
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-blue-600 flex-shrink-0">2.</span>
            <p>We monitor the price 24/7 using real-time flight data</p>
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-blue-600 flex-shrink-0">3.</span>
            <p>When price drops, we send you an alert + approval request</p>
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-blue-600 flex-shrink-0">4.</span>
            <p>You approve the refare with one click</p>
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-blue-600 flex-shrink-0">5.</span>
            <p>We contact the airline and process your refund automatically</p>
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-blue-600 flex-shrink-0">6.</span>
            <p>Refund arrives as cash, credit, or points - you choose!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
