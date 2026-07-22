import React from 'react';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import InspeccionTecnicaSection from '@/components/sections/InspeccionTecnicaSection';

export const metadata = {
  title: 'Inspección Técnica de Propiedades | Constructora Contrapunto',
  description: 'Inspección técnica de propiedades (ITO) pre-entrega, propiedades usadas e informes diagnósticos por Diego Stankovsky.',
};

export default function InspeccionTecnicaPage() {
  return (
    <div className="relative min-h-screen bg-[#0f0e0c] text-cream overflow-hidden selection:bg-sand selection:text-carbon font-body">
      {/* Navbar */}
      <Navbar />

      {/* Main Wrapper with Top Padding to clear fixed navbar */}
      <main className="pt-24 min-h-screen relative z-10">
        <InspeccionTecnicaSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
