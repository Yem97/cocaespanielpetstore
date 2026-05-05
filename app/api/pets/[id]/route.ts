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

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const { data, error } = await supabaseAdmin
      .from('pets')
      .update({ ...body, age_weeks: body.age_weeks ? Number(body.age_weeks) : undefined, price_usd: body.price_usd ? Number(body.price_usd) : undefined })
      .eq('id', params.id)
      .select().single();
    if (error) throw error;
    return NextResponse.json({ pet: data });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { data: pet } = await supabaseAdmin.from('pets').select('image_url').eq('id', params.id).single();
    if (pet?.image_url && pet.image_url.includes('supabase')) {
      const path = pet.image_url.split('/pet-images/')[1];
      if (path) await supabaseAdmin.storage.from('pet-images').remove([path]);
    }
    const { error } = await supabaseAdmin.from('pets').delete().eq('id', params.id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
