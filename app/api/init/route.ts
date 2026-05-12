import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function POST(request: NextRequest) {
  try {
    // Create demo user
    const demoEmail = 'demo@example.com';
    const demoPassword = 'password123';

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', demoEmail)
      .single();

    if (existingUser) {
      return NextResponse.json({
        success: true,
        message: 'Demo user already exists',
        userId: existingUser.id,
      });
    }

    // Create demo user
    const { data: user, error: userError } = await supabase
      .from('users')
      .insert([
        {
          email: demoEmail,
          password_hash: hashPassword(demoPassword),
          name: 'Demo User',
        },
      ])
      .select()
      .single();

    if (userError || !user) {
      throw new Error(`Failed to create user: ${userError?.message}`);
    }

    // Create demo flights
    const { data: flights, error: flightsError } = await supabase
      .from('flights')
      .insert([
        {
          airline: 'United Airlines',
          airline_code: 'UA',
          flight_number: '1234',
          departure_airport: 'JFK',
          arrival_airport: 'LAX',
          departure_time: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          arrival_time: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000).toISOString(),
          duration: 300,
          stops: 0,
          status: 'active',
          cabin: 'economy',
        },
        {
          airline: 'Delta Air Lines',
          airline_code: 'DL',
          flight_number: '5678',
          departure_airport: 'ORD',
          arrival_airport: 'MIA',
          departure_time: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          arrival_time: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000).toISOString(),
          duration: 180,
          stops: 0,
          status: 'active',
          cabin: 'economy',
        },
      ])
      .select();

    if (flightsError || !flights) {
      throw new Error(`Failed to create flights: ${flightsError?.message}`);
    }

    // Create demo bookings
    const { error: bookingsError } = await supabase
      .from('bookings')
      .insert([
        {
          user_id: user.id,
          flight_id: flights[0].id,
          booking_reference: 'AB12CD',
          passenger_name: 'John Doe',
          passengers: 1,
          cabin: 'economy',
          original_price: 450.0,
          current_price: 380.0,
          total_savings: 70.0,
          status: 'active',
          refund_status: 'none',
          email_notifications: true,
        },
        {
          user_id: user.id,
          flight_id: flights[1].id,
          booking_reference: 'EF34GH',
          passenger_name: 'John Doe',
          passengers: 1,
          cabin: 'economy',
          original_price: 320.0,
          current_price: 265.0,
          total_savings: 55.0,
          status: 'active',
          refund_status: 'none',
          email_notifications: true,
        },
      ]);

    if (bookingsError) {
      throw new Error(`Failed to create bookings: ${bookingsError?.message}`);
    }

    return NextResponse.json({
      success: true,
      message: 'Demo data initialized successfully',
      userId: user.id,
      email: demoEmail,
      password: demoPassword,
    });
  } catch (error) {
    console.error('Init error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Initialization failed' },
      { status: 500 }
    );
  }
}
