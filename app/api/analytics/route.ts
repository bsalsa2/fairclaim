import { NextRequest, NextResponse } from 'next/server';
import { getUserById, getUserBookings, getUserStats } from '@/lib/advanced-db';

export async function GET(request: NextRequest) {
  try {
    const userId = request.cookies.get('userId')?.value;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = getUserById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const bookings = getUserBookings(userId, 'active');
    const stats = getUserStats(userId);

    // Calculate trends
    const savingsByMonth = [0, 0, 0, 0, 0, 0]; // Last 6 months
    const fareDipsOverTime = [0, 0, 0, 0, 0, 0];

    bookings.forEach((booking) => {
      const monthsAgo = Math.floor(
        (new Date().getTime() - booking.createdAt.getTime()) / (1000 * 60 * 60 * 24 * 30)
      );

      if (monthsAgo < 6) {
        savingsByMonth[5 - monthsAgo] += booking.totalSavings;
        if (booking.totalSavings > 0) {
          fareDipsOverTime[5 - monthsAgo] += 1;
        }
      }
    });

    const avgSavingsPerBooking =
      bookings.length > 0 ? stats?.totalSavings! / bookings.length : 0;

    return NextResponse.json({
      success: true,
      analytics: {
        stats: {
          totalSavings: Math.round(stats?.totalSavings! * 100) / 100,
          fareDips: stats?.fareDips || 0,
          trackedFlights: stats?.trackedFlights || 0,
          avgSavingsPerBooking: Math.round(avgSavingsPerBooking * 100) / 100,
        },
        trends: {
          savingsByMonth,
          fareDipsOverTime,
        },
        topDestinations: bookings
          .slice(0, 5)
          .map((b) => ({
            bookingRef: b.bookingReference,
            savings: Math.round(b.totalSavings * 100) / 100,
            cabin: b.cabin,
          })),
      },
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
