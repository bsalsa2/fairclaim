'use client';

import DashboardSidebar from '../components/DashboardSidebar';
import AddFlightForm from '../components/AddFlightForm';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex">
      <DashboardSidebar />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-primary-600 mb-2">
              Flight Price Tracker
            </h1>
            <p className="text-lg text-slate-600">
              Add your flight bookings and let us automatically track prices and get you refunds when prices drop
            </p>
          </div>

          {/* Main Content */}
          <AddFlightForm />
        </div>
      </main>
    </div>
  );
}
