'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';

export const HeroSection = () => {
  return (
    <section
      id="inicio"
      className="relative w-full h-screen min-h-[600px] flex items-center overflow-hidden bg-carbon"
    >
      {/* IMAGEN DE FONDO ULTRA HD CON TRATAMIENTO OSCURO */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1920&q=80"
          alt="Constructora Contrapunto"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      
      {/* OVERLAY DE GRADIENTE OSCURO MÁS TEXTURA SUAVE */}
      <div className="absolute inset-0 bg-gradient-hero z-0 opacity-95" />
      <div className="absolute inset-0 bg-carbon/25 backdrop-blur-[1px] z-0" />

      {/* CONTENIDO PRINCIPAL */}
      <div className="container-base relative z-10 w-full flex flex-col md:flex-row md:items-center md:justify-between pt-44 md:pt-56">
        
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
            <Link href="/cotizar">
              <Button variant="primary" size="lg">
                Cotizar Proyecto
              </Button>
            </Link>
            <a href="#proyectos">
              <Button variant="outline" size="lg" className="w-full">
                Ver Proyectos
              </Button>
            </a>
          </motion.div>
        </div>

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
