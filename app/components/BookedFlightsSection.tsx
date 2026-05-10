import { ChevronDown, Plus } from 'lucide-react';

interface BookedFlight {
  id: string;
  flightDate: string;
  route: string;
  airline: string;
  originalPrice: number;
  currentPrice: number;
  savings: number;
  status: string;
}

interface BookedFlightsSectionProps {
  flights: BookedFlight[];
}

export default function BookedFlightsSection({ flights }: BookedFlightsSectionProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4 cursor-pointer hover:text-blue-600">
        <ChevronDown className="w-5 h-5" />
        <h2 className="text-xl font-bold text-gray-900">Booked Flights</h2>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {flights.length === 0 ? (
          <div className="p-8 text-center">
            <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-2 w-full py-3">
              <Plus className="w-5 h-5" />
              Add a flight you&apos;ve already booked
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Flight Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Route</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Airline</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Savings</th>
                </tr>
              </thead>
              <tbody>
                {flights.map((flight, idx) => (
                  <tr key={flight.id} className={idx !== flights.length - 1 ? 'border-b border-gray-200' : ''}>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {new Date(flight.flightDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {flight.route}
                      {flight.savings > 0 && (
                        <span className="ml-2 inline-block bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">
                          -${flight.savings.toFixed(2)}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{flight.airline}</td>
                    <td className="px-6 py-4 text-sm">
                      <select className="border border-gray-300 rounded px-2 py-1 bg-white text-gray-900">
                        <option>View options</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
