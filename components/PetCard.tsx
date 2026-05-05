"use client"
import React from 'react';
import Image from 'next/image';
import { Pet } from '@/types';

interface PetCardProps {
  pet: Pet;
  onInquire: (petName: string) => void;
  onClick: () => void;
}

export default function PetCard({ pet, onInquire, onClick }: PetCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'reserved': return 'bg-orange-100 text-orange-800';
      case 'sold': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleInquire = (e: React.MouseEvent) => {
    e.stopPropagation();
    onInquire(pet.name);
  };

  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100 flex flex-col"
    >
      <div className="relative h-64 w-full overflow-hidden">
        {pet.image_url ? (
          <Image 
            src={pet.image_url} 
            alt={pet.name} 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">No image</div>
        )}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider shadow-sm ${getStatusColor(pet.status)}`}>
            {pet.status}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display text-2xl font-semibold text-gray-900">{pet.name}</h3>
          <span className="font-medium text-gold bg-gold/10 px-2 py-1 rounded text-sm">${pet.price_usd}</span>
        </div>
        
        <p className="text-sm text-gray-500 capitalize mb-4">
          {pet.breed.replace('_', ' ')} • {pet.gender} • {pet.age_weeks} weeks
        </p>
        
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          {pet.status === 'available' ? (
            <p className="text-xs font-semibold text-red-500">Only 1 left!</p>
          ) : (
            <p className="text-xs text-gray-400">Not available</p>
          )}
          
          <button 
            onClick={handleInquire}
            disabled={pet.status === 'sold'}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${pet.status === 'available' ? 'bg-forest text-white hover:bg-forest/90' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
          >
            Inquire Now
          </button>
        </div>
      </div>
    </div>
  );
}
