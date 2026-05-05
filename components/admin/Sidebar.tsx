"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { LayoutDashboard, PawPrint, MessageSquare, LogOut, Menu, X } from 'lucide-react';

const links = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/pets', label: 'Manage Pets', icon: PawPrint },
  { href: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  }

  const NavContent = () => (
    <>
      <div className="px-6 py-6 border-b border-gray-100">
        <h2 className="font-display text-lg font-semibold text-gray-900">Paws & Heritage</h2>
        <p className="text-xs text-gray-400 mt-0.5">Breeder Admin</p>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${active ? 'bg-gold/10 text-gold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
              onClick={() => setMobileOpen(false)}>
              <Icon size={18} />{label}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-4 border-t border-gray-100">
        <a href="/" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-500 hover:bg-gray-50 transition mb-1">
          View Live Site ↗
        </a>
        <button onClick={signOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-500 hover:bg-red-50 transition">
          <LogOut size={18} /> Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-100 shadow-sm z-30">
        <NavContent />
      </aside>
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-gray-900">Admin</h2>
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-20 bg-black/40" onClick={() => setMobileOpen(false)}>
          <aside className="w-72 h-full bg-white flex flex-col shadow-xl pt-14" onClick={e => e.stopPropagation()}>
            <NavContent />
          </aside>
        </div>
      )}
      <div className="md:hidden h-14" />
    </>
  );
}
