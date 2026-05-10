import { TrendingDown, Zap, HelpCircle } from 'lucide-react';

interface DashboardStatsProps {
  fareDips: number;
  totalSavings: number;
}

export default function DashboardStats({ fareDips, totalSavings }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Fare Dips */}
      <div className="border-l-4 border-blue-600 bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-gray-600 text-sm font-medium">Fare Dips to Date</h3>
          <TrendingDown className="w-5 h-5 text-blue-600" />
        </div>
        <p className="text-4xl font-bold text-gray-900">{fareDips}</p>
      </div>

      {/* Total Savings */}
      <div className="border-l-4 border-green-600 bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-gray-600 text-sm font-medium">Savings to Date</h3>
          <Zap className="w-5 h-5 text-green-600" />
        </div>
        <p className="text-4xl font-bold text-gray-900">${totalSavings.toFixed(2)}</p>
      </div>

      {/* Auto-Add Future Bookings */}
      <div className="border-l-4 border-orange-500 bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-gray-600 text-sm font-medium flex items-center gap-2">
            Auto-Add Future Bookings
            <HelpCircle className="w-4 h-4" />
          </h3>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors mt-2">
          Get Started →
        </button>
      </div>
    </div>
  );
}
