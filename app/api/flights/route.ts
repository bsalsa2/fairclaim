import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const userId = request.cookies.get('userId')?.value;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    const { data: bookings, error: bookingsError } = await supabase
      .from('bookings')
      .select(`
        *,
        flight:flights(*)
      `)
      .eq('user_id', userId)
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (bookingsError) {
      throw bookingsError;
    }

    const totalSavings = bookings?.reduce((sum, b) => sum + (b.total_savings || 0), 0) || 0;
    const fareDips = bookings?.filter(b => b.total_savings > 0).length || 0;

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.created_at,
      },
      stats: {
        fareDips,
        totalSavings: Math.round(totalSavings * 100) / 100,
        trackedFlights: bookings?.length || 0,
        nextFlightDate: bookings?.[0]?.flight?.departure_time || null,
      },
      booked: (bookings || []).map((b) => ({
        id: b.id,
        bookingReference: b.booking_reference,
        originalPrice: b.original_price,
        currentPrice: b.current_price,
        savings: Math.round((b.total_savings || 0) * 100) / 100,
        passengers: b.passengers,
        cabin: b.cabin,
        status: b.status,
        createdAt: b.created_at,
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
