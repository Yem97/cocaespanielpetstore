"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';

export default function LoginPage() {
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
    if (err) { 
      setError('Invalid email or password.'); 
      setLoading(false); 
      return; 
    }
    router.push('/admin');
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FDF6EC', padding: '1rem' }}>
      <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', width: '100%', maxWidth: '380px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <h1 style={{ fontFamily: 'serif', fontSize: '24px', marginBottom: '4px', textAlign: 'center' }}>Paws & Heritage</h1>
        <p style={{ color: '#888', fontSize: '14px', textAlign: 'center', marginBottom: '1.5rem' }}>Admin Dashboard</p>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontSize: '13px', color: '#555', display: 'block', marginBottom: '6px' }}>Email</label>
            <input 
              type="email" required value={email} 
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@example.com"
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '13px', color: '#555', display: 'block', marginBottom: '6px' }}>Password</label>
            <input 
              type="password" required value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box' }}
            />
          </div>
          {error && <p style={{ color: '#dc2626', fontSize: '13px', marginBottom: '12px', background: '#fef2f2', padding: '10px', borderRadius: '8px' }}>{error}</p>}
          <button 
            type="submit" disabled={loading}
            style={{ width: '100%', background: '#B8860B', color: 'white', border: 'none', borderRadius: '10px', padding: '12px', fontSize: '15px', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
