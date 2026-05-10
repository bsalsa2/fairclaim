import { NextRequest, NextResponse } from 'next/server';
import {
  getUserBookedFlights,
  getUserTrackedFlights,
  calculateUserStats,
  initializeDemoData,
} from '@/lib/db';

// Initialize demo data on first request
initializeDemoData();

export async function GET(request: NextRequest) {
  try {
    const userId = request.cookies.get('userId')?.value || 'user-1'; // Demo: use default user

    const bookedFlights = getUserBookedFlights(userId);
    const trackedFlights = getUserTrackedFlights(userId);
    const stats = calculateUserStats(userId);

    return NextResponse.json({
      stats,
      booked: bookedFlights.map((f) => ({
        id: f.id,
        flightDate: f.flightDate.toISOString(),
        route: f.route,
        airline: f.airline,
        originalPrice: f.originalPrice,
        currentPrice: f.currentPrice,
        savings: f.savings,
        status: f.status,
      })),
      tracked: trackedFlights.map((f) => ({
        id: f.id,
        flightDate: f.flightDate.toISOString(),
        route: f.route,
        airline: f.airline,
        originalPrice: f.originalPrice,
        currentPrice: f.currentPrice,
        latestPriceDrop: f.priceDrops[f.priceDrops.length - 1]?.price || f.originalPrice,
      })),
    });
  } catch (error) {
    console.error('Error fetching flights:', error);
    return NextResponse.json(
      { error: 'Failed to fetch flights' },
      { status: 500 }
    );
  }
}
