"use client"
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Pet } from '@/types';
import { X, Upload, Loader2 } from 'lucide-react';

interface Props { pet: Pet | null; onClose: () => void; }

export default function PetFormModal({ pet, onClose }: Props) {
  const isEdit = !!pet;
  const [form, setForm] = useState({
    name: pet?.name || '',
    breed: pet?.breed || 'cocker_spaniel',
    age_weeks: pet?.age_weeks?.toString() || '',
    gender: pet?.gender || 'female',
    color: pet?.color || '',
    price_usd: pet?.price_usd?.toString() || '',
    status: pet?.status || 'available',
    description: pet?.description || '',
    image_url: pet?.image_url || '',
    is_featured: pet?.is_featured || false,
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }));

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const data = await res.json();
    if (data.url) set('image_url', data.url);
    else setError('Image upload failed. Try again.');
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    const url = isEdit ? `/api/pets/${pet!.id}` : '/api/pets';
    const method = isEdit ? 'PATCH' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    if (!res.ok) { const d = await res.json(); setError(d.error || 'Save failed'); setSaving(false); return; }
    onClose();
  };

  const inputClass = "w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold text-sm bg-white";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto z-10" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">{isEdit ? 'Edit Pet' : 'Add New Pet'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Pet Photo</label>
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden flex items-center justify-center flex-shrink-0">
                {form.image_url ? <Image src={form.image_url} alt="preview" width={64} height={64} className="w-full h-full object-cover" /> : <span className="text-2xl">🐾</span>}
              </div>
              <button type="button" onClick={() => fileRef.current?.click()}
                className="flex items-center gap-2 text-sm px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition text-gray-600 disabled:opacity-50"
                disabled={uploading}>
                {uploading ? <><Loader2 size={14} className="animate-spin" />Uploading...</> : <><Upload size={14} />Upload Photo</>}
              </button>
              <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleImage} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Name *</label>
              <input required value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Caramel Biscuit" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Breed *</label>
              <select required value={form.breed} onChange={e => set('breed', e.target.value)} className={inputClass}>
                <option value="cocker_spaniel">Cocker Spaniel</option>
                <option value="maine_coon">Maine Coon</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Status *</label>
              <select required value={form.status} onChange={e => set('status', e.target.value)} className={inputClass}>
                <option value="available">Available</option>
                <option value="reserved">Reserved</option>
                <option value="sold">Sold</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Age (weeks) *</label>
              <input required type="number" min={1} value={form.age_weeks} onChange={e => set('age_weeks', e.target.value)} placeholder="8" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Gender *</label>
              <select required value={form.gender} onChange={e => set('gender', e.target.value)} className={inputClass}>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Color *</label>
              <input required value={form.color} onChange={e => set('color', e.target.value)} placeholder="e.g. Golden" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Price (USD) *</label>
              <input required type="number" min={0} value={form.price_usd} onChange={e => set('price_usd', e.target.value)} placeholder="1200" className={inputClass} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Description</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3} placeholder="Describe the pet's personality and traits..." className={`${inputClass} resize-none`} />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="featured" checked={form.is_featured} onChange={e => set('is_featured', e.target.checked)} className="rounded" />
            <label htmlFor="featured" className="text-sm text-gray-600">Feature this pet on the homepage</label>
          </div>
          {error && <p className="text-red-600 text-sm bg-red-50 rounded-xl p-3">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving}
              className="flex-1 bg-gold text-white py-3 rounded-xl font-medium hover:bg-gold/90 transition flex items-center justify-center gap-2 disabled:opacity-70">
              {saving ? <><Loader2 size={16} className="animate-spin" />Saving...</> : isEdit ? 'Save Changes' : 'Add Pet'}
            </button>
            <button type="button" onClick={onClose} className="px-5 py-3 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
