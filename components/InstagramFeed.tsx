"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Instagram } from 'lucide-react';
import { InstagramPost } from '@/types';

const PLACEHOLDERS = ['🐶','🐱','🐾','🦮','😺','🐕'];

export default function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/instagram')
      .then(r => r.json())
      .then(data => { setPosts(data.posts || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Instagram size={22} className="text-gold" />
            <h2 className="font-display text-4xl font-semibold text-gray-900">Follow Our Journey</h2>
          </div>
          <p className="text-gray-500 text-center max-w-md">See our latest litters, happy families, and daily life — live on Instagram.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
          {loading
            ? Array(6).fill(0).map((_, i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded-xl animate-pulse" />
              ))
            : posts.length > 0
            ? posts.slice(0, 6).map(post => (
                <a key={post.id} href={post.permalink} target="_blank" rel="noopener noreferrer"
                  className="relative aspect-square rounded-xl overflow-hidden group block">
                  <Image src={post.media_url} alt={post.caption || 'Instagram post'} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="300px" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <p className="text-white text-xs text-center px-3 opacity-0 group-hover:opacity-100 transition-opacity line-clamp-3">{post.caption}</p>
                  </div>
                </a>
              ))
            : PLACEHOLDERS.map((emoji, i) => (
                <div key={i} className="aspect-square bg-white rounded-xl flex items-center justify-center text-5xl border border-gray-100">
                  {emoji}
                </div>
              ))
          }
        </div>
        <div className="text-center">
          <a
            href={`https://instagram.com/${process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || 'pawsandheritage'}`}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gold hover:text-gold transition"
          >
            <Instagram size={18} /> Follow us on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
