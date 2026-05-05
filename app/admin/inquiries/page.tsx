import { supabaseAdmin } from '@/lib/supabaseAdmin';
import InquiryTable from '@/components/admin/InquiryTable';
import { Inquiry } from '@/types';

async function getInquiries(): Promise<Inquiry[]> {
  const { data } = await supabaseAdmin.from('inquiries').select('*').order('created_at', { ascending: false });
  return data || [];
}

export default async function AdminInquiries() {
  const inquiries = await getInquiries();
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-gray-900">Inquiries</h1>
        <p className="text-gray-500 mt-1">All client inquiries and waiting list signups.</p>
      </div>
      <InquiryTable inquiries={inquiries} />
    </div>
  );
}
