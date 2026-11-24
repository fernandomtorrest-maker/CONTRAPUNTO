import React from 'react';
import type { Metadata } from 'next';
import HeaderSesion2 from '@/components/sesion2/HeaderSesion2';
import HeroSesion2 from '@/components/sesion2/HeroSesion2';
import PilaresSesion2 from '@/components/sesion2/PilaresSesion2';
import CalculadoraMetrajeSesion2 from '@/components/sesion2/CalculadoraMetrajeSesion2';
import CotizadorIASesion2 from '@/components/sesion2/CotizadorIASesion2';
import ChecklistITOSesion2 from '@/components/sesion2/ChecklistITOSesion2';
import PortafolioObrasSesion2 from '@/components/sesion2/PortafolioObrasSesion2';
import FooterSesion2 from '@/components/sesion2/FooterSesion2';

export const metadata: Metadata = {
  title: 'Contrapunto Sesión 2 | Propuesta de Arquitectura & Edificación con IA (7 Prompts)',
  description: 'Página exclusiva local de propuesta "Contrapunto Sesión 2", desarrollada aplicando los 7 Prompts Especializados de Claude AI en paralelo.',
};

export default function ContrapuntoSesion2Page() {
  return (
    <main className="min-h-screen bg-[#0F0E0C] text-cream selection:bg-amber-500 selection:text-carbon font-body">
      {/* 1. Header con navegación glassmorphism */}
      <HeaderSesion2 />

      {/* 2. Hero Principal con Titular Persuasivo y Métricas */}
      <HeroSesion2 />

      {/* 3. Pilares Estratégicos (Prompt 1 & 2) */}
      <PilaresSesion2 />

      {/* 4. Microinteracción viva: Calculadora de Metraje (Prompt 4) */}
      <CalculadoraMetrajeSesion2 />

      {/* 5. Módulo Cotizador Supremo IA (Prompt 5) */}
      <CotizadorIASesion2 />

      {/* 6. Dashboard Inspección ITO & Checklist Supremo (Prompt 6) */}
      <ChecklistITOSesion2 />

      {/* 7. Portafolio de Obras Auditadas (Prompt 7) */}
      <PortafolioObrasSesion2 />

      {/* 8. Footer Corporativo Dark Luxe */}
      <FooterSesion2 />
    </main>
  );
}
