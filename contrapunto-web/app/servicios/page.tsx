import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import ServiciosTarifarioSection from '@/components/sections/ServiciosTarifarioSection';

export const metadata: Metadata = {
  title: 'Catálogo de Servicios & Tarifario de Partidas | Constructora Contrapunto',
  description: 'Catálogo de servicios de instalación, terminaciones, pisos, pintura, climatización, gasfitería y armado con precios transparentes y garantía de constructora.',
  keywords: [
    'Instalación de cerámica Santiago Chile',
    'Instalación de porcelanato precio m2',
    'Instalación de piso vinílico SPC',
    'Pintura de casas y departamentos precio m2',
    'Instalación de calefón SEC Santiago',
    'Instalación aire acondicionado split',
    'Armado de muebles y clósets',
    'Tarifario de construcción Contrapunto',
    'Diego Stankovsky constructor'
  ]
};

export default function ServiciosPage() {
  return (
    <div className="relative min-h-screen bg-[#0f0e0c] text-cream overflow-hidden selection:bg-sand selection:text-carbon font-body">
      <Navbar />
      <main className="pt-20 min-h-screen relative z-10">
        <ServiciosTarifarioSection />
      </main>
      <Footer />
    </div>
  );
}
