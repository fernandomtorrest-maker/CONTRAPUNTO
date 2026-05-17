'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

interface HeroSectionProps {
  onQuoteOpen: () => void;
}

export const HeroSection = ({ onQuoteOpen }: HeroSectionProps) => {
  return (
    <section
      id="inicio"
      className="relative w-full h-screen min-h-[600px] flex items-center overflow-hidden bg-carbon"
    >
      {/* IMAGEN DE FONDO ULTRA HD CON TRATAMIENTO OSCURO */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1920&q=80")',
        }}
      />
      
      {/* OVERLAY DE GRADIENTE OSCURO MÁS TEXTURA SUAVE */}
      <div className="absolute inset-0 bg-gradient-hero z-0 opacity-95" />
      <div className="absolute inset-0 bg-carbon/25 backdrop-blur-[1px] z-0" />

      {/* CONTENIDO PRINCIPAL */}
      <div className="container-base relative z-10 w-full flex flex-col md:flex-row md:items-center md:justify-between">
        
        {/* TEXTOS Y BOTONES */}
        <div className="max-w-3xl space-y-8">
          <div className="space-y-3">
            {/* Tagline */}
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-label inline-flex items-center gap-2"
            >
              <span>DISEÑO</span>
              <span className="w-1.5 h-1.5 rounded-full bg-sand" />
              <span>CONSTRUCCIÓN</span>
              <span className="w-1.5 h-1.5 rounded-full bg-sand" />
              <span>OFICIO</span>
            </motion.span>
            
            {/* Título Principal de Impacto */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-hero text-cream uppercase leading-[0.85] font-extrabold"
            >
              CONSTRUIMOS <br />
              ESPACIOS CON <br />
              <span className="text-sand">CARÁCTER.</span>
            </motion.h1>
          </div>

          {/* Subtítulo Descriptivo */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xs md:text-sm uppercase tracking-widest text-cream/70 max-w-lg leading-relaxed font-medium"
          >
            Proyectos a medida, construidos con precisión, materiales nobles y atención en cada detalle.
          </motion.p>

          {/* Botones de Acción */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 pt-2"
          >
            <Button variant="primary" size="lg" onClick={onQuoteOpen}>
              Cotizar Proyecto
            </Button>
            <a href="#proyectos">
              <Button variant="outline" size="lg" className="w-full">
                Ver Proyectos
              </Button>
            </a>
          </motion.div>
        </div>

        {/* INDICADOR DE SLIDES / DECORATIVO A LA DERECHA */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="hidden md:flex flex-col gap-6 items-end shrink-0 border-r border-cream/10 pr-6 py-4"
        >
          <div className="group cursor-pointer text-right">
            <span className="font-heading text-xs font-bold text-sand tracking-widest block transition-colors group-hover:text-cream">01</span>
            <span className="w-8 h-[1px] bg-sand inline-block mt-1" />
          </div>
          <div className="group cursor-pointer text-right opacity-40 hover:opacity-100 transition-opacity">
            <span className="font-heading text-xs font-bold text-cream tracking-widest block">02</span>
            <span className="w-4 h-[1px] bg-cream inline-block mt-1 transition-all group-hover:w-8" />
          </div>
          <div className="group cursor-pointer text-right opacity-40 hover:opacity-100 transition-opacity">
            <span className="font-heading text-xs font-bold text-cream tracking-widest block">03</span>
            <span className="w-4 h-[1px] bg-cream inline-block mt-1 transition-all group-hover:w-8" />
          </div>
        </motion.div>

      </div>

      {/* Flecha hacia abajo decorativa */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce hidden md:block">
        <a href="#servicios" className="text-cream/30 hover:text-sand transition-colors" aria-label="Desplazarse hacia abajo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19,12 12,19 5,12" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
