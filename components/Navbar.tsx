"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Pets', href: '#pets' },
    { name: 'About', href: '#faq' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        <Link href="/" className="font-display text-2xl font-bold text-gold tracking-wider">
          Paws & Heritage
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-sm font-medium text-gray-800 hover:text-gold transition-colors">
              {link.name}
            </Link>
          ))}
          <Link href="#pets" className="bg-gold text-white px-5 py-2.5 rounded hover:bg-yellow-600 transition-colors text-sm font-medium">
            View Puppies
          </Link>
        </nav>

        <button className="md:hidden text-gray-800" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-gray-800 font-medium py-2 border-b border-gray-100 last:border-0 hover:text-gold">
              {link.name}
            </Link>
          ))}
          <Link href="#pets" onClick={() => setMobileMenuOpen(false)} className="bg-gold text-white text-center px-4 py-3 rounded mt-2 font-medium">
            View Puppies
          </Link>
        </div>
      )}
    </header>
  );
}
