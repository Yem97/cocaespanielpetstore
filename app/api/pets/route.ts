import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

async function getUser() {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
  );
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function GET() {
  const { data, error } = await supabaseAdmin.from('pets').select('*').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ pets: data });
}

export async function POST(req: NextRequest) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const { name, breed, age_weeks, gender, color, price_usd, status, description, image_url, is_featured } = body;
    if (!name || !breed || !age_weeks || !gender || !color || !price_usd) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const { data, error } = await supabaseAdmin
      .from('pets')
      .insert({ name, breed, age_weeks: Number(age_weeks), gender, color, price_usd: Number(price_usd), status: status || 'available', description, image_url, is_featured: is_featured || false })
      .select().single();
    if (error) throw error;
    return NextResponse.json({ pet: data }, { status: 201 });
  } catch (err) {
    console.error('Pet POST error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
