import { NextRequest, NextResponse } from 'next/server';
import {
  getUserBookings,
  getUserStats,
  initializeAdvancedDemo,
  getUserById,
} from '@/lib/advanced-db';

// Initialize demo data on first request
let initialized = false;
if (!initialized) {
  initializeAdvancedDemo();
  initialized = true;
}

export async function GET(request: NextRequest) {
  try {
    const userId = request.cookies.get('userId')?.value || 'usr-demo';

    const user = getUserById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const bookings = getUserBookings(userId, 'active');
    const stats = getUserStats(userId);

    if (!stats) {
      return NextResponse.json({ error: 'User stats not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      },
      stats: {
        fareDips: stats.fareDips,
        totalSavings: Math.round(stats.totalSavings * 100) / 100,
        trackedFlights: stats.trackedFlights,
        nextFlightDate: stats.nextFlightDate,
      },
      booked: bookings.map((b) => ({
        id: b.id,
        bookingReference: b.bookingReference,
        originalPrice: b.originalPrice,
        currentPrice: b.currentPrice,
        savings: Math.round(b.totalSavings * 100) / 100,
        passengers: b.passengers,
        cabin: b.cabin,
        status: b.status,
        createdAt: b.createdAt.toISOString(),
        priceHistory: b.priceHistory.slice(-5),
      })),
      message: 'Flights data fetched successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching flights:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch flights' },
      { status: 500 }
    );
  }
}
