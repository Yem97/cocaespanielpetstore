import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { sendInquiryNotification, sendInquiryConfirmation } from '@/lib/resend';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { full_name, country, email, whatsapp, breed_interest, pet_name, message } = body;

    if (!full_name || !country || !email || !whatsapp || !breed_interest) {
      return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('inquiries')
      .insert({ full_name, country, email, whatsapp, breed_interest, pet_name: pet_name || null, message: message || null })
      .select()
      .single();

    if (error) throw error;

    await Promise.allSettled([
      sendInquiryNotification(data),
      sendInquiryConfirmation(data),
    ]);

    return NextResponse.json({ success: true, id: data.id });
  } catch (err) {
    console.error('Inquiry POST error:', err);
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}
