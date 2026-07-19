import React from 'react';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import CotizadorSupremoSection from '@/components/sections/CotizadorSupremoSection';

export const metadata = {
  title: 'Cotizador Supremo | Constructora Contrapunto',
  description: 'Herramienta interna secreta de estimación presupuestaria por Análisis de Precios Unitarios (APU).',
};

export default function CotizadorSupremoPage() {
  return (
    <div className="relative min-h-screen bg-[#0f0e0c] text-cream overflow-hidden selection:bg-sand selection:text-carbon font-body">
      {/* Navbar */}
      <Navbar />

      {/* Main Wrapper with Top Padding to clear fixed navbar */}
      <main className="pt-24 min-h-screen relative z-10">
        <CotizadorSupremoSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
