import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getOrCreateUser } from '@/lib/auth';

// OAuth callback handler - handles Supabase OAuth redirects
export async function GET(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const code = request.nextUrl.searchParams.get('code');
  const error = request.nextUrl.searchParams.get('error');

  if (error) {
    return NextResponse.redirect(new URL(`/login?error=${error}`, request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL('/login?error=no_code', request.url));
  }

  try {
    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError || !data.user) {
      console.error('Exchange error:', exchangeError);
      return NextResponse.redirect(new URL('/login?error=exchange_failed', request.url));
    }

    const user = await getOrCreateUser(supabase, data.user);
    if (!user) {
      return NextResponse.redirect(new URL('/login?error=user_creation_failed', request.url));
    }

    const response = NextResponse.redirect(new URL('/dashboard', request.url));

    // Set session cookie with the auth user ID
    response.cookies.set('userId', data.user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Callback error:', error);
    return NextResponse.redirect(new URL('/login?error=callback_failed', request.url));
  }
}
