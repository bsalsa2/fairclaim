import { NextRequest, NextResponse } from 'next/server';
import { getUserById, createBooking } from '@/lib/advanced-db';

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

    return NextResponse.json({
      success: true,
      message: 'Bookings endpoint ready',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

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
    const { flightId, passengers, originalPrice } = body;

    if (!flightId || !passengers || !originalPrice) {
      return NextResponse.json(
        { error: 'Missing required fields: flightId, passengers, originalPrice' },
        { status: 400 }
      );
    }

    if (passengers < 1 || passengers > 9) {
      return NextResponse.json(
        { error: 'Passengers must be between 1 and 9' },
        { status: 400 }
      );
    }

    if (originalPrice < 0) {
      return NextResponse.json(
        { error: 'Price must be positive' },
        { status: 400 }
      );
    }

    const booking = createBooking(userId, flightId, passengers, originalPrice);

    return NextResponse.json(
      {
        success: true,
        booking: {
          id: booking.id,
          bookingReference: booking.bookingReference,
          originalPrice: booking.originalPrice,
          currentPrice: booking.currentPrice,
          passengers: booking.passengers,
          status: booking.status,
          createdAt: booking.createdAt,
        },
        message: 'Booking created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
