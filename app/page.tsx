import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PetGrid from '@/components/PetGrid';
import Testimonials from '@/components/Testimonials';
import InstagramFeed from '@/components/InstagramFeed';
import FAQ from '@/components/FAQ';
import InquiryForm from '@/components/InquiryForm';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ExitPopup from '@/components/ExitPopup';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { Pet } from '@/types';

export const revalidate = 60;

async function getPets(): Promise<Pet[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('pets')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  } catch {
    return [];
  }
}

export default async function Home() {
  const pets = await getPets();
  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <Hero />
      <section id="pets" className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="font-display text-4xl font-semibold text-center mb-4 text-gray-900">Our Available Pets</h2>
        <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">Every pet is health-tested, vaccinated, and raised with love in our family home.</p>
        <PetGrid pets={pets} />
      </section>
      <Testimonials />
      <InstagramFeed />
      <FAQ />
      <section id="contact" className="py-20 px-4 max-w-3xl mx-auto">
        <h2 className="font-display text-4xl font-semibold text-center mb-4 text-gray-900">Get in Touch</h2>
        <p className="text-center text-gray-500 mb-12">Interested in one of our pets or want to join the waiting list?</p>
        <InquiryForm />
      </section>
      <Footer />
      <WhatsAppButton />
      <ExitPopup />
    </main>
  );
}
