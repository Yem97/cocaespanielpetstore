"use client"
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'Are your pets health tested?', a: 'Yes. Every pet is examined by a licensed veterinarian before leaving our home. All pets are fully vaccinated, dewormed, microchipped, and come with a written health certificate. We also provide a 2-year genetic health guarantee.' },
  { q: 'How does international shipping work?', a: 'We ship worldwide using trusted, IATA-certified pet nanny services. We handle all export documentation, health certificates, and customs paperwork. Pets travel in climate-controlled, airline-approved carriers and are never placed in cargo holds.' },
  { q: 'How do I reserve a pet?', a: 'To reserve a pet, send us an inquiry using the form on this page. If you are approved, we require a 30% non-refundable deposit to hold the pet. The balance is due before shipping.' },
  { q: 'Are your pets AKC or TICA registered?', a: 'Yes. All our Cocker Spaniels are American Kennel Club (AKC) registered and our Maine Coons are The International Cat Association (TICA) registered. All registration papers are transferred to the new owner.' },
  { q: 'How does the waiting list work?', a: 'If no pet is currently available, you can join our waiting list for the next litter. We typically have litters every 3-4 months. You will be notified by email and WhatsApp as soon as a new litter is born.' },
  { q: 'Do you ship to my country?', a: 'We ship to 18+ countries including the USA, Canada, UK, Australia, France, Germany, UAE, and more. Contact us to confirm availability for your specific country as regulations vary.' },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="font-display text-4xl font-semibold text-center mb-4 text-gray-900">Frequently Asked Questions</h2>
        <p className="text-center text-gray-500 mb-12">Everything you need to know before bringing a pet home.</p>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left font-medium text-gray-800 hover:bg-gray-50 transition"
              >
                <span>{faq.q}</span>
                <ChevronDown size={18} className={`text-gray-400 transition-transform flex-shrink-0 ml-4 ${open === i ? 'rotate-180' : ''}`} />
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                  <p className="pt-4">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
