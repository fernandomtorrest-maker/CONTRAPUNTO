'use client';

import React from 'react';
import Navbar from '@/components/sections/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import ProcessSection from '@/components/sections/ProcessSection';
import InvestSection from '@/components/sections/InvestSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CtaBanner from '@/components/sections/CtaBanner';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-carbon overflow-hidden selection:bg-sand selection:text-carbon">
      
      {/* Barra de Navegación Sticky */}
      <Navbar />

      {/* Orquestación de Secciones Principales */}
      <main className="relative z-10">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Sección de Servicios */}
        <ServicesSection />

        {/* 3. Sección de Portafolio */}
        <PortfolioSection />

        {/* 4. Sección "Nuestro Proceso" */}
        <ProcessSection />

        {/* 5. Sección de Inversiones */}
        <InvestSection />

        {/* 6. Sección de Testimonios */}
        <TestimonialsSection />

        {/* 7. Banner Final de Acción */}
        <CtaBanner />
      </main>

      {/* Pie de Página */}
      <Footer />

      {/* Botón Flotante de WhatsApp para Conversaciones Rápidas */}
      <div className="fixed bottom-6 right-6 z-30 group">
        <a
          href="https://wa.me/56966974560"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 relative"
          aria-label="Contactar por WhatsApp"
        >
          {/* Icono de WhatsApp SVG */}
          <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
            <path d="M12.012 2C6.485 2 2 6.48 2 12.01c0 1.77.46 3.42 1.26 4.96L2 22l5.14-1.35c1.47.8 3.12 1.25 4.87 1.25 5.53 0 10.01-4.48 10.01-10.01C22.022 6.48 17.54 2 12.012 2zm6.75 13.96c-.28.78-1.37 1.4-1.89 1.48-.48.08-.94.07-2.92-.72-2.52-1.01-4.12-3.61-4.24-3.78-.13-.17-1-1.33-1-2.54 0-1.21.63-1.81.86-2.05.23-.24.5-.3.67-.3.17 0 .34.01.48.01.15 0 .35-.06.55.42.2.49.69 1.68.75 1.8.06.12.1.26.02.42-.08.17-.12.28-.25.43-.13.15-.27.33-.39.45-.13.12-.26.26-.11.52.15.26.67 1.11 1.43 1.79.98.88 1.81 1.15 2.07 1.28.26.13.41.11.56-.06.15-.17.65-.75.82-.99.17-.25.35-.2.58-.12.24.08 1.51.71 1.77.84.26.13.43.2.49.31.06.11.06.66-.22 1.44z" />
          </svg>
          {/* Tooltip Hover */}
          <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-carbon border border-border px-3 py-1.5 text-[9px] uppercase tracking-widest font-bold text-cream opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
            ¿Hablamos por WhatsApp?
          </span>
        </a>
      </div>

    </div>
  );
}
