import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type)) return NextResponse.json({ error: 'Only JPG, PNG, and WebP allowed' }, { status: 400 });
    if (file.size > 5 * 1024 * 1024) return NextResponse.json({ error: 'Max file size is 5MB' }, { status: 400 });

    const ext = file.name.split('.').pop();
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const buffer = await file.arrayBuffer();

    const { error } = await supabaseAdmin.storage.from('pet-images').upload(filename, buffer, { contentType: file.type });
    if (error) throw error;

    const { data: { publicUrl } } = supabaseAdmin.storage.from('pet-images').getPublicUrl(filename);
    return NextResponse.json({ url: publicUrl });
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
// import { NextRequest, NextResponse } from 'next/server';
// import { supabaseAdmin } from '@/lib/supabaseAdmin';
// import { createServerClient } from '@supabase/ssr';
// import { cookies } from 'next/headers';

// export async function POST(req: NextRequest) {
//   const cookieStore = cookies();
//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
//   );
//   const { data: { user } } = await supabase.auth.getUser();
//   if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

//   try {
//     const formData = await req.formData();
//     const file = formData.get('file') as File | null;
//     if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

//     const allowed = ['image/jpeg', 'image/png', 'image/webp'];
//     if (!allowed.includes(file.type)) return NextResponse.json({ error: 'Only JPG, PNG, and WebP files are allowed' }, { status: 400 });
//     if (file.size > 5 * 1024 * 1024) return NextResponse.json({ error: 'File size must be under 5MB' }, { status: 400 });

//     const ext = file.name.split('.').pop();
//     const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
//     const buffer = await file.arrayBuffer();

//     const { error } = await supabaseAdmin.storage.from('pet-images').upload(filename, buffer, { contentType: file.type, upsert: false });
//     if (error) throw error;

//     const { data: { publicUrl } } = supabaseAdmin.storage.from('pet-images').getPublicUrl(filename);
//     return NextResponse.json({ url: publicUrl });
//   } catch (err) {
//     console.error('Upload error:', err);
//     return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
//   }
// }
