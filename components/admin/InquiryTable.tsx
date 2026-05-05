"use client"
import React, { useState } from 'react';
import { Inquiry } from '@/types';
import { Mail, MessageCircle, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function InquiryTable({ inquiries: initial }: { inquiries: Inquiry[] }) {
  const [inquiries, setInquiries] = useState(initial);
  const [expanded, setExpanded] = useState<string | null>(null);

  const markRead = async (id: string) => {
    await fetch(`/api/inquiries/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ is_read: true }) });
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, is_read: true } : i));
  };

  if (inquiries.length === 0) return (
    <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
      <p className="text-4xl mb-4">📬</p>
      <p className="text-gray-400">No inquiries yet. They'll appear here when clients contact you.</p>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="divide-y divide-gray-50">
        {inquiries.map(inq => (
          <div key={inq.id} className={`${!inq.is_read ? 'bg-gold/5' : ''}`}>
            <div className="px-6 py-4 flex items-center gap-4">
              <div className="flex-shrink-0">
                {!inq.is_read && <span className="w-2.5 h-2.5 bg-gold rounded-full block" />}
                {inq.is_read && <span className="w-2.5 h-2.5 bg-gray-200 rounded-full block" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <p className="font-medium text-gray-900">{inq.full_name}</p>
                  <span className="text-xs text-gray-400">{inq.country}</span>
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{inq.breed_interest}</span>
                  {inq.pet_name && <span className="text-xs bg-gold/10 text-gold px-2 py-0.5 rounded-full">{inq.pet_name}</span>}
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  {inq.email} · {inq.whatsapp} · {inq.created_at ? formatDistanceToNow(new Date(inq.created_at), { addSuffix: true }) : ''}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <a href={`mailto:${inq.email}?subject=Re: Your inquiry at Paws & Heritage`}
                  className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition" title="Send email">
                  <Mail size={16} />
                </a>
                <a href={`https://wa.me/${inq.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi ${inq.full_name}, thanks for your inquiry at Paws & Heritage!`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 transition" title="WhatsApp">
                  <MessageCircle size={16} />
                </a>
                {!inq.is_read && (
                  <button onClick={() => markRead(inq.id!)}
                    className="p-2 rounded-lg text-gray-400 hover:text-gold hover:bg-gold/10 transition" title="Mark as read">
                    <Check size={16} />
                  </button>
                )}
                <button onClick={() => setExpanded(expanded === inq.id ? null : inq.id!)}
                  className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition">
                  {expanded === inq.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>
            </div>
            {expanded === inq.id && inq.message && (
              <div className="px-6 pb-4 ml-6">
                <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 leading-relaxed border-l-2 border-gold/30">
                  {inq.message}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
