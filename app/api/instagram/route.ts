import { NextResponse } from 'next/server';

const PLACEHOLDERS = [
  { id: '1', media_url: '', permalink: '#', caption: 'Our latest Maine Coon kitten — ready for her forever home! 🐱' },
  { id: '2', media_url: '', permalink: '#', caption: 'Playtime with our Cocker Spaniel puppies 🐶' },
  { id: '3', media_url: '', permalink: '#', caption: 'New litter announcement coming soon! Join the waiting list.' },
  { id: '4', media_url: '', permalink: '#', caption: 'Happy family update from Canada 🇨🇦' },
  { id: '5', media_url: '', permalink: '#', caption: 'Our breeding Maine Coon, Lady Elara 🌿' },
  { id: '6', media_url: '', permalink: '#', caption: 'Another happy delivery to the UK 🇬🇧' },
];

export async function GET() {
  const token = process.env.NEXT_PUBLIC_INSTAGRAM_TOKEN;
  if (!token) {
    return NextResponse.json({ posts: PLACEHOLDERS }, { headers: { 'Cache-Control': 's-maxage=3600' } });
  }
  try {
    const fields = 'id,media_url,permalink,caption';
    const url = `https://graph.instagram.com/me/media?fields=${fields}&limit=6&access_token=${token}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Instagram API error');
    const json = await res.json();
    return NextResponse.json({ posts: json.data || PLACEHOLDERS }, { headers: { 'Cache-Control': 's-maxage=3600' } });
  } catch {
    return NextResponse.json({ posts: PLACEHOLDERS }, { headers: { 'Cache-Control': 's-maxage=3600' } });
  }
}
