"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { Pet } from '@/types';
import { Pencil, Trash2 } from 'lucide-react';

interface Props { pets: Pet[]; onEdit: (pet: Pet) => void; onDelete: () => void; }

export default function PetTable({ pets, onEdit, onDelete }: Props) {
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (pet: Pet) => {
    if (!confirm(`Delete ${pet.name}? This cannot be undone.`)) return;
    setDeleting(pet.id);
    await fetch(`/api/pets/${pet.id}`, { method: 'DELETE' });
    setDeleting(null);
    onDelete();
  };

  const statusClass = (s: string) =>
    s === 'available' ? 'bg-green-100 text-green-700' : s === 'reserved' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600';

  if (pets.length === 0) return (
    <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
      <p className="text-4xl mb-4">🐾</p>
      <p className="text-gray-400">No pets yet. Add your first pet to get started.</p>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              {['Pet', 'Breed', 'Age', 'Gender', 'Price', 'Status', 'Actions'].map(h => (
                <th key={h} className="text-left px-5 py-3.5 text-xs font-medium text-gray-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {pets.map(pet => (
              <tr key={pet.id} className="hover:bg-gray-50 transition">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      {pet.image_url ? (
                        <Image src={pet.image_url} alt={pet.name} width={40} height={40} className="w-full h-full object-cover" />
                      ) : <div className="w-full h-full flex items-center justify-center text-lg">🐾</div>}
                    </div>
                    <span className="font-medium text-gray-900">{pet.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-gray-500 capitalize">{pet.breed.replace('_', ' ')}</td>
                <td className="px-5 py-4 text-gray-500">{pet.age_weeks}w</td>
                <td className="px-5 py-4 text-gray-500 capitalize">{pet.gender}</td>
                <td className="px-5 py-4 font-medium text-gray-800">${pet.price_usd}</td>
                <td className="px-5 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusClass(pet.status)}`}>{pet.status}</span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => onEdit(pet)} className="p-2 rounded-lg text-gray-400 hover:text-gold hover:bg-gold/10 transition">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => handleDelete(pet)} disabled={deleting === pet.id}
                      className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition disabled:opacity-50">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
