import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function getAuthenticatedUser(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const token = request.headers.get('authorization')?.split(' ')[1];
  if (!token) {
    return null;
  }

  const { data } = await supabase.auth.getUser(token);
  return data.user;
}

export async function getOrCreateUser(
  supabase: any,
  authUser: any
) {
  if (!authUser?.id || !authUser?.email) {
    return null;
  }

  const { data: existingUser } = await supabase
    .from('users')
    .select('*')
    .eq('id', authUser.id)
    .single();

  if (existingUser) {
    return existingUser;
  }

  const { data: newUser, error } = await supabase
    .from('users')
    .insert([
      {
        id: authUser.id,
        email: authUser.email,
        name: authUser.user_metadata?.full_name || 'User',
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating user:', error);
    return null;
  }

  return newUser;
}
