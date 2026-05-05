"use client"
import React, { useState, useId } from 'react';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export default function InquiryForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const id = useId();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const form = e.currentTarget;
    const data = {
      full_name: (form.elements.namedItem('full_name') as HTMLInputElement).value,
      country: (form.elements.namedItem('country') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      whatsapp: (form.elements.namedItem('whatsapp') as HTMLInputElement).value,
      breed_interest: (form.elements.namedItem('breed_interest') as HTMLSelectElement).value,
      pet_name: (form.elements.namedItem('pet_name') as HTMLInputElement).value || null,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };
    try {
      const res = await fetch('/api/inquiries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!res.ok) { const j = await res.json(); throw new Error(j.error || 'Something went wrong'); }
      setStatus('success');
      form.reset();
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold bg-white text-gray-900 placeholder-gray-400 transition";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      {status === 'success' ? (
        <div className="text-center py-8">
          <CheckCircle className="mx-auto mb-4 text-green-500" size={48} />
          <h3 className="font-display text-2xl font-semibold mb-2 text-gray-900">Thank you!</h3>
          <p className="text-gray-500">We've received your inquiry and will get back to you within 24 hours.</p>
          <button onClick={() => setStatus('idle')} className="mt-6 text-gold hover:underline text-sm">Send another inquiry</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass} htmlFor={`${id}-name`}>Full Name *</label>
              <input id={`${id}-name`} name="full_name" type="text" required placeholder="Jane Smith" className={inputClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor={`${id}-country`}>Country *</label>
              <input id={`${id}-country`} name="country" type="text" required placeholder="United States" className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass} htmlFor={`${id}-email`}>Email Address *</label>
              <input id={`${id}-email`} name="email" type="email" required placeholder="jane@email.com" className={inputClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor={`${id}-whatsapp`}>WhatsApp Number *</label>
              <input id={`${id}-whatsapp`} name="whatsapp" type="tel" required placeholder="+1 555 000 0000" className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass} htmlFor={`${id}-breed`}>Breed Interested In *</label>
            <select id={`${id}-breed`} name="breed_interest" required className={inputClass}>
              <option value="">Select a breed...</option>
              <option value="Maine Coon">Maine Coon</option>
              <option value="Cocker Spaniel">Cocker Spaniel</option>
              <option value="Both">Both</option>
              <option value="Next Litter Waitlist">Join Next Litter Waitlist</option>
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="pet_name_field">Specific Pet (optional)</label>
            <input id="pet_name_field" name="pet_name" type="text" placeholder="Leave blank if joining the waiting list" className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor={`${id}-message`}>Message</label>
            <textarea id={`${id}-message`} name="message" rows={4} placeholder="Tell us a little about yourself and your home environment..." className={`${inputClass} resize-none`} />
          </div>
          {status === 'error' && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 rounded-xl p-4 text-sm">
              <AlertCircle size={16} /> <span>{errorMsg}</span>
            </div>
          )}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-gold text-white py-4 rounded-xl font-medium text-base hover:bg-gold/90 transition flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {status === 'loading' ? <><Loader2 size={18} className="animate-spin" /> Sending...</> : 'Send Inquiry'}
          </button>
        </form>
      )}
    </div>
  );
}
