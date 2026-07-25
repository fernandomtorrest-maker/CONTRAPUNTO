import React from 'react';
import { Metadata } from 'next';
import { MantenimientoSection } from '@/components/sections/MantenimientoSection';

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
    <main className="pt-20">
      <MantenimientoSection />
    </main>
  );
}
