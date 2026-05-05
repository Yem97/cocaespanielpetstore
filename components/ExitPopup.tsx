"use client"
import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export default function ExitPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('exit_popup_dismissed')) return;
    const handler = (e: MouseEvent) => { if (e.clientY < 10) setShow(true); };
    document.addEventListener('mouseleave', handler);
    return () => document.removeEventListener('mouseleave', handler);
  }, []);

  const dismiss = () => { setShow(false); sessionStorage.setItem('exit_popup_dismissed', '1'); };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={dismiss} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 z-10">
        <button onClick={dismiss} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={20} /></button>
        <div className="text-4xl text-center mb-4">🐾</div>
        <h3 className="font-display text-2xl font-semibold text-center text-gray-900 mb-2">Wait — don't miss out!</h3>
        <p className="text-gray-500 text-center text-sm mb-6">Join our waiting list and be the first to know when a new litter arrives.</p>
        {submitted ? (
          <p className="text-center text-green-600 font-medium">You're on the list! We'll be in touch. 🎉</p>
        ) : (
          <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="flex gap-2">
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold text-sm" />
            <button type="submit" className="bg-gold text-white px-5 py-3 rounded-xl font-medium text-sm hover:bg-gold/90 transition whitespace-nowrap">
              Join List
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
