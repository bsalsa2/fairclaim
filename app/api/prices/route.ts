import { NextRequest, NextResponse } from 'next/server';
import { updateFlightPrice, database, getUserById } from '@/lib/advanced-db';

export async function POST(request: NextRequest) {
  try {
    const userId = request.cookies.get('userId')?.value;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = getUserById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await request.json();
    const { bookingId, newPrice } = body;

    if (!bookingId || newPrice === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: bookingId, newPrice' },
        { status: 400 }
      );
    }

    if (newPrice < 0) {
      return NextResponse.json(
        { error: 'Price must be positive' },
        { status: 400 }
      );
    }

    const booking = database.bookings.get(bookingId);
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    if (booking.userId !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const updatedBooking = updateFlightPrice(bookingId, newPrice);

    if (!updatedBooking) {
      return NextResponse.json({ error: 'Failed to update price' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      booking: {
        id: updatedBooking.id,
        bookingReference: updatedBooking.bookingReference,
        originalPrice: updatedBooking.originalPrice,
        currentPrice: updatedBooking.currentPrice,
        totalSavings: Math.round(updatedBooking.totalSavings * 100) / 100,
        priceHistory: updatedBooking.priceHistory.slice(-5),
      },
      message: `Price updated to $${newPrice}. You saved $${Math.round(updatedBooking.totalSavings * 100) / 100}!`,
    });
  } catch (error) {
    console.error('Error updating price:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update price' },
      { status: 500 }
    );
  }
}
