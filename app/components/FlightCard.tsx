import { ArrowRight, Plane } from 'lucide-react';

interface FlightCardProps {
  airline: string;
  departTime: string;
  arrivalTime: string;
  departAirport: string;
  arrivalAirport: string;
  duration: string;
  stops: number | string;
  price: number;
  onViewDeal?: () => void;
}

export default function FlightCard({
  airline,
  departTime,
  arrivalTime,
  departAirport,
  arrivalAirport,
  duration,
  stops,
  price,
  onViewDeal,
}: FlightCardProps) {
  const stopsText = stops === 0 ? 'Non-stop' : `${stops} stop${stops !== 1 ? 's' : ''}`;

  return (
    <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Airline & Times */}
        <div className="flex items-start gap-6 flex-1">
          {/* Airline Logo Placeholder */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <Plane className="w-6 h-6 text-gray-600" />
            </div>
          </div>

          {/* Flight Details */}
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-2">{airline}</p>
            <div className="flex items-center gap-4">
              <div>
                <p className="text-2xl font-bold text-gray-900">{departTime}</p>
                <p className="text-sm text-gray-600">{departAirport}</p>
              </div>
              <div className="flex-1 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="flex-1 border-t-2 border-gray-300"></div>
                  <Plane className="w-4 h-4 text-gray-400 transform rotate-90" />
                  <div className="flex-1 border-t-2 border-gray-300"></div>
                </div>
                <p className="text-xs text-gray-500">{duration}</p>
                <p className="text-xs text-gray-500 font-medium">{stopsText}</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 text-right">{arrivalTime}</p>
                <p className="text-sm text-gray-600 text-right">{arrivalAirport}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Price & Button */}
        <div className="flex items-center gap-6 flex-shrink-0 border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 md:pl-6">
          <div className="text-right">
            <p className="text-sm text-gray-600 mb-1">From</p>
            <p className="text-3xl font-bold text-blue-600">${price}</p>
          </div>
          <button
            onClick={onViewDeal}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2 flex-shrink-0"
          >
            View Deal
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
