import { TrendingDown, Zap, Zap as ZapIcon, HelpCircle, Sparkles } from 'lucide-react';

interface DashboardStatsProps {
  fareDips: number;
  totalSavings: number;
}

export default function DashboardStats({ fareDips, totalSavings }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Fare Dips */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200/50 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:border-primary-200/50 transition-all group">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-600 text-sm font-semibold uppercase tracking-wider">Fare Dips Found</h3>
          <div className="p-3 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg group-hover:shadow-glow transition-all">
            <TrendingDown className="w-5 h-5 text-white" />
          </div>
        </div>
        <p className="text-5xl font-black text-primary-600">{fareDips}</p>
        <p className="text-sm text-slate-500 mt-2">Great deals tracked</p>
      </div>

      {/* Total Savings */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/30 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:border-emerald-300/50 transition-all group">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-600 text-sm font-semibold uppercase tracking-wider">Total Savings</h3>
          <div className="p-3 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg group-hover:shadow-lg transition-all">
            <ZapIcon className="w-5 h-5 text-white" />
          </div>
        </div>
        <p className="text-5xl font-black text-emerald-600">${totalSavings.toFixed(2)}</p>
        <p className="text-sm text-slate-500 mt-2">Money saved on flights</p>
      </div>

      {/* Auto-Add Future Bookings */}
      <div className="bg-gradient-to-br from-primary-50 to-blue-50 border border-primary-200/30 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all group cursor-pointer">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-700 text-sm font-semibold flex items-center gap-2 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-primary-600" />
            Auto-Add Bookings
          </h3>
          <HelpCircle className="w-4 h-4 text-slate-400 hover:text-slate-600" />
        </div>
        <p className="text-slate-600 text-sm mb-4">Automatically track your future bookings</p>
        <button className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:shadow-glow text-white font-bold py-2 px-4 rounded-lg transition-all group-hover:translate-y-0.5">
          Enable Now →
        </button>
      </div>
    </div>
  );
}
