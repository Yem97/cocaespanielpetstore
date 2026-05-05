"use client"
import React, { useEffect } from 'react';
import Image from 'next/image';
import { Pet } from '@/types';
import { X } from 'lucide-react';

interface Props { pet: Pet; onClose: () => void; onInquire: (name: string) => void; }

export default function PetModal({ pet, onClose, onInquire }: Props) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', handler); };
  }, [onClose]);

  const statusColor = pet.status === 'available' ? 'bg-green-100 text-green-800' : pet.status === 'reserved' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-600';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-20 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition">
          <X size={18} />
        </button>
        <div className="relative h-72 w-full rounded-t-2xl overflow-hidden">
          {pet.image_url ? (
            <Image src={pet.image_url} alt={pet.name} fill className="object-cover" sizes="672px" />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-6xl">🐾</div>
          )}
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h2 className="font-display text-3xl font-semibold text-gray-900">{pet.name}</h2>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${statusColor}`}>{pet.status}</span>
          </div>
          <p className="text-gray-500 capitalize mb-4">{pet.breed.replace('_', ' ')} • {pet.gender} • {pet.age_weeks} weeks old</p>
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[['Color', pet.color], ['Gender', pet.gender], ['Age', `${pet.age_weeks} weeks`], ['Price', `$${pet.price_usd}`]].map(([k, v]) => (
              <div key={k} className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{k}</p>
                <p className="font-medium text-gray-800 capitalize">{v}</p>
              </div>
            ))}
          </div>
          {pet.description && <p className="text-gray-600 text-sm leading-relaxed mb-6">{pet.description}</p>}
          <div className="flex gap-3">
            <button
              onClick={() => onInquire(pet.name)}
              disabled={pet.status === 'sold'}
              className="flex-1 bg-gold text-white py-3 rounded-xl font-medium hover:bg-gold/90 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {pet.status === 'sold' ? 'This pet has been sold' : 'Inquire About This Pet'}
            </button>
            <button onClick={onClose} className="px-5 py-3 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
