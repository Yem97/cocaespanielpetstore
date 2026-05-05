import { supabaseAdmin } from '@/lib/supabaseAdmin';
import StatsCards from '@/components/admin/StatsCards';
import { AdminStats, Inquiry } from '@/types';
import { formatDistanceToNow } from 'date-fns';

async function getStats(): Promise<{ stats: AdminStats; recentInquiries: Inquiry[] }> {
  const [petsRes, inquiriesRes] = await Promise.all([
    supabaseAdmin.from('pets').select('status'),
    supabaseAdmin.from('inquiries').select('*').order('created_at', { ascending: false }).limit(5),
  ]);
  const pets = petsRes.data || [];
  const inquiries = inquiriesRes.data || [];
  const allInquiries = await supabaseAdmin.from('inquiries').select('id, is_read');
  const all = allInquiries.data || [];
  return {
    stats: {
      totalPets: pets.length,
      availableCount: pets.filter(p => p.status === 'available').length,
      reservedCount: pets.filter(p => p.status === 'reserved').length,
      totalInquiries: all.length,
      unreadInquiries: all.filter(i => !i.is_read).length,
    },
    recentInquiries: inquiries,
  };
}

export default async function AdminDashboard() {
  const { stats, recentInquiries } = await getStats();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's what's happening with Paws & Heritage.</p>
      </div>
      <StatsCards stats={stats} />
      <div className="mt-10 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Recent Inquiries</h2>
          <a href="/admin/inquiries" className="text-gold text-sm hover:underline">View all →</a>
        </div>
        {recentInquiries.length === 0 ? (
          <p className="text-center text-gray-400 py-10 text-sm">No inquiries yet.</p>
        ) : (
          <div className="divide-y divide-gray-50">
            {recentInquiries.map((inq) => (
              <div key={inq.id} className="px-6 py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {!inq.is_read && <span className="w-2 h-2 bg-gold rounded-full flex-shrink-0" />}
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{inq.full_name}</p>
                    <p className="text-xs text-gray-400">{inq.country} · {inq.breed_interest}{inq.pet_name ? ` · ${inq.pet_name}` : ''}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 flex-shrink-0">
                  {formatDistanceToNow(new Date(inq.created_at!), { addSuffix: true })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
