"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { Loader2, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) { setError('Invalid email or password.'); setLoading(false); return; }
    router.push('/admin');
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-semibold text-gray-900 mb-1">Paws & Heritage</h1>
          <p className="text-gray-500 text-sm">Admin Dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
              placeholder="admin@pawsandheritage.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold text-sm" />
          </div>
          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 rounded-xl p-3 text-sm">
              <AlertCircle size={15} />{error}
            </div>
          )}
          <button type="submit" disabled={loading}
            className="w-full bg-gold text-white py-3 rounded-xl font-medium hover:bg-gold/90 transition flex items-center justify-center gap-2 disabled:opacity-70">
            {loading ? <><Loader2 size={16} className="animate-spin" />Signing in...</> : 'Sign In'}
          </button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-6">Access restricted to authorized breeders only.</p>
      </div>
    </div>
  );
}
