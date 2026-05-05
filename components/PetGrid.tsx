"use client"
import React, { useState, useRef } from 'react';
import { Pet } from '@/types';
import PetCard from './PetCard';
import PetModal from './PetModal';

const FILTERS = ['All', 'Maine Coon', 'Cocker Spaniel', 'Available', 'Reserved'];

export default function PetGrid({ pets }: { pets: Pet[] }) {
  const [filter, setFilter] = useState('All');
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const formRef = useRef<HTMLElement | null>(null);

  const filtered = pets.filter(pet => {
    if (filter === 'All') return true;
    if (filter === 'Maine Coon') return pet.breed === 'maine_coon';
    if (filter === 'Cocker Spaniel') return pet.breed === 'cocker_spaniel';
    if (filter === 'Available') return pet.status === 'available';
    if (filter === 'Reserved') return pet.status === 'reserved';
    return true;
  });

  const handleInquire = (petName: string) => {
    setSelectedPet(null);
    const form = document.getElementById('contact');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const input = document.getElementById('pet_name_field') as HTMLInputElement;
        if (input) input.value = petName;
      }, 600);
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition-all ${
              filter === f
                ? 'bg-gold text-white border-gold'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gold hover:text-gold'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-4">🐾</p>
          <p className="text-lg">No pets found for this filter.</p>
          <p className="text-sm mt-2">Join the waiting list below to be notified when new pets arrive.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(pet => (
            <PetCard
              key={pet.id}
              pet={pet}
              onClick={() => setSelectedPet(pet)}
              onInquire={handleInquire}
            />
          ))}
        </div>
      )}

      {selectedPet && (
        <PetModal
          pet={selectedPet}
          onClose={() => setSelectedPet(null)}
          onInquire={handleInquire}
        />
      )}
    </>
  );
}
