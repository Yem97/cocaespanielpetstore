"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Award, Heart, Globe2, Users } from 'lucide-react';

export default function Hero() {
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { icon: <Award className="w-5 h-5 text-gold" />, text: "AKC/TICA Registered" },
    { icon: <Heart className="w-5 h-5 text-gold" />, text: "Health Guaranteed" },
    { icon: <Globe2 className="w-5 h-5 text-gold" />, text: "Worldwide Shipping" },
    { icon: <Users className="w-5 h-5 text-gold" />, text: "200+ Happy Families" },
  ];

  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden min-h-[90vh] flex items-center">
        {/* Abstract shapes or background image could go here. Keeping it clean cream for now. */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-cream to-white"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-display text-forest mb-6 leading-tight max-w-4xl mx-auto">
            Find your perfect companion,<br className="hidden md:block"/> raised with <span className="italic text-gold">heritage & love.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            We are dedicated breeders of majestic Maine Coon cats and joyful Cocker Spaniel puppies, 
            focusing on health, temperament, and impeccable bloodlines.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="#pets" className="w-full sm:w-auto bg-gold text-white px-8 py-4 rounded font-medium hover:bg-yellow-600 transition-all transform hover:-translate-y-1">
              Meet Our Pets
            </Link>
            <Link href="#contact" className="w-full sm:w-auto border-2 border-forest text-forest px-8 py-3.5 rounded font-medium hover:bg-forest hover:text-white transition-all">
              Join Waiting List
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto border-t border-gray-200 pt-10">
            {features.map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className="bg-white p-3 rounded-full shadow-sm">{feature.icon}</div>
                <span className="text-sm font-medium text-gray-700">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Conversion Bar */}
      <div className={`fixed bottom-0 left-0 w-full bg-forest text-white py-4 px-4 z-40 transform transition-transform duration-500 flex justify-center items-center gap-6 shadow-2xl ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}`}>
        <p className="font-medium hidden sm:block">3 puppies available right now!</p>
        <Link href="#pets" className="bg-gold px-6 py-2 rounded text-sm font-semibold hover:bg-yellow-500 transition-colors">
          View Available Pets
        </Link>
      </div>
    </>
  );
}
