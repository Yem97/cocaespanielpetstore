import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  { name: 'Sarah Mitchell', country: 'United States 🇺🇸', breed: 'Cocker Spaniel', text: 'Our Cocker Spaniel arrived healthy, happy, and so well-socialized. The whole process was smooth and the team kept us updated every step of the way. Worth every penny!' },
  { name: 'James Okafor', country: 'Canada 🇨🇦', breed: 'Maine Coon', text: 'I was nervous about international shipping but they handled absolutely everything. Our Maine Coon arrived with all papers, fully vaccinated, and already litter trained. Incredible breeders.' },
  { name: 'Amara Thiaw', country: 'United Kingdom 🇬🇧', breed: 'Cocker Spaniel', text: 'The professionalism and genuine love for their dogs is evident from the first message. Our puppy is the most gentle, well-tempered dog. We could not be happier.' },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="font-display text-4xl font-semibold text-center mb-4 text-gray-900">Happy Families</h2>
        <p className="text-center text-gray-500 mb-14 max-w-xl mx-auto">Over 200 families worldwide have welcomed a Paws & Heritage pet into their home.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-cream rounded-2xl p-7 flex flex-col">
              <div className="flex gap-1 mb-4">
                {Array(5).fill(0).map((_, j) => <Star key={j} size={16} className="fill-gold text-gold" />)}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed flex-grow mb-6">"{t.text}"</p>
              <div className="border-t border-gray-200 pt-4">
                <p className="font-medium text-gray-900">{t.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{t.country} · {t.breed}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
