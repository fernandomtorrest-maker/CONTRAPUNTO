import React from 'react';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import AsesoriaEsteticaSection from '@/components/sections/AsesoriaEsteticaSection';

export const metadata = {
  title: 'Asesoría Estética | Constructora Contrapunto',
  description: 'Interiorismo, curaduría de arte, diseño de iluminación y coordinación de paletas de materiales nobles diseñados por Gonzalo Gálvez.',
};

export default function AsesoriaEsteticaPage() {
  return (
    <div className="relative min-h-screen bg-[#0f0e0c] text-cream overflow-hidden selection:bg-sand selection:text-carbon font-body">
      {/* Navbar */}
      <Navbar />

      {/* Main Wrapper with Top Padding to clear fixed navbar */}
      <main className="pt-24 min-h-screen relative z-10">
        <AsesoriaEsteticaSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
