import React from 'react';
import { AdminStats } from '@/types';
import { PawPrint, CheckCircle, Clock, Mail, AlertCircle } from 'lucide-react';

export default function StatsCards({ stats }: { stats: AdminStats }) {
  const cards = [
    { label: 'Total Pets', value: stats.totalPets, icon: PawPrint, color: 'text-gold bg-gold/10' },
    { label: 'Available', value: stats.availableCount, icon: CheckCircle, color: 'text-green-600 bg-green-50' },
    { label: 'Reserved', value: stats.reservedCount, icon: Clock, color: 'text-orange-500 bg-orange-50' },
    { label: 'Total Inquiries', value: stats.totalInquiries, icon: Mail, color: 'text-blue-600 bg-blue-50' },
    { label: 'Unread', value: stats.unreadInquiries, icon: AlertCircle, color: 'text-red-500 bg-red-50' },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {cards.map(({ label, value, icon: Icon, color }) => (
        <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3 ${color}`}>
            <Icon size={18} />
          </div>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          <p className="text-xs text-gray-400 mt-0.5">{label}</p>
        </div>
      ))}
    </div>
  );
}
