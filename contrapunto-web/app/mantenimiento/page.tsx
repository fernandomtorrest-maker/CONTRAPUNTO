import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import MantenimientoSection from '@/components/sections/MantenimientoSection';

export const metadata: Metadata = {
  title: 'Mantenimiento Integral de Edificios, Condominios & Empresas | Constructora Contrapunto',
  description: 'Servicio profesional de mantenimiento técnico preventivo y correctivo para edificios habitacionales, condominios, oficinas corporativas y empresas en Chile. Cumplimiento Ley 21.442 de Copropiedad.',
  keywords: [
    'Mantenimiento de edificios Chile',
    'Mantención de condominios Santiago',
    'Facilities Management Chile',
    'Ley 21.442 copropiedad inmobiliaria',
    'Mantención sala de bombas edificio',
    'Pintura de fachadas condominios',
    'Mantención preventiva tableros eléctricos',
    'Diego Stankovsky ITO'
  ]
};

export default function MantenimientoPage() {
  return (
    <div className="relative min-h-screen bg-[#0f0e0c] text-cream overflow-hidden selection:bg-sand selection:text-carbon font-body">
      <Navbar />
      <main className="pt-20 min-h-screen relative z-10">
        <MantenimientoSection />
      </main>
      <Footer />
    </div>
  );
}
