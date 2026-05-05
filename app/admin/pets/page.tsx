"use client"
import React, { useState, useEffect } from 'react';
import { Pet } from '@/types';
import PetTable from '@/components/admin/PetTable';
import PetFormModal from '@/components/admin/PetFormModal';
import { Plus } from 'lucide-react';

export default function AdminPets() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);

  const fetchPets = async () => {
    setLoading(true);
    const res = await fetch('/api/pets');
    const data = await res.json();
    setPets(data.pets || []);
    setLoading(false);
  };

  useEffect(() => { fetchPets(); }, []);

  const handleEdit = (pet: Pet) => { setEditingPet(pet); setModalOpen(true); };
  const handleAdd = () => { setEditingPet(null); setModalOpen(true); };
  const handleClose = () => { setModalOpen(false); setEditingPet(null); fetchPets(); };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-semibold text-gray-900">Manage Pets</h1>
          <p className="text-gray-500 mt-1">Add, edit, or remove pets from your listings.</p>
        </div>
        <button onClick={handleAdd}
          className="flex items-center gap-2 bg-gold text-white px-5 py-2.5 rounded-xl font-medium hover:bg-gold/90 transition">
          <Plus size={18} /> Add New Pet
        </button>
      </div>
      {loading ? (
        <div className="text-center py-20 text-gray-400">Loading pets...</div>
      ) : (
        <PetTable pets={pets} onEdit={handleEdit} onDelete={fetchPets} />
      )}
      {modalOpen && <PetFormModal pet={editingPet} onClose={handleClose} />}
    </div>
  );
}
