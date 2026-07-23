import React from 'react';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import CotizadorItoSection from '@/components/sections/CotizadorItoSection';

export const metadata = {
  title: 'Cotizador de Inspección Técnica (ITO) | Constructora Contrapunto',
  description: 'Calcula tu presupuesto estimado para inspección técnica de propiedades (casas nuevas, usadas e ITO terreno) por Diego Stankovsky.',
};

export default function CotizadorItoPage() {
  return (
    <div className="relative min-h-screen bg-[#0f0e0c] text-cream overflow-hidden selection:bg-sand selection:text-carbon font-body">
      {/* Navbar */}
      <Navbar />

      {/* Main Wrapper with Top Padding */}
      <main className="pt-24 min-h-screen relative z-10">
        <CotizadorItoSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
