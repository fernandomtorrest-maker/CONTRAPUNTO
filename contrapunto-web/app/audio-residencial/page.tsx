import React from 'react';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import AudioResidencialSection from '@/components/sections/AudioResidencialSection';

export const metadata = {
  title: 'Sistemas de Audio Residencial | Constructora Contrapunto',
  description: 'Diseño y calibración de sistemas de sonido de alta fidelidad integrados con la arquitectura de tu hogar. Terrazas, salas de cine y multi-room invisible.',
};

export default function AudioResidencialPage() {
  return (
    <div className="relative min-h-screen bg-[#0f0e0c] text-cream overflow-hidden selection:bg-sand selection:text-carbon font-body">
      {/* Navbar */}
      <Navbar />

      {/* Main Wrapper with Top Padding to clear fixed navbar */}
      <main className="pt-24 min-h-screen relative z-10">
        <AudioResidencialSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
