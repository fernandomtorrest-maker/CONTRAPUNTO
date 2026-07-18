'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ServiceItem {
  number: string;
  title: string;
  description: string;
  iconSvg: React.ReactNode;
  href?: string;
}

export const ServicesSection = () => {
  const services: ServiceItem[] = [
    {
      number: '01',
      title: 'CONSTRUCCIÓN',
      description: 'Proyectos nuevos con estándares de calidad y terminaciones de alto nivel.',
      iconSvg: (
        <svg className="w-12 h-12 text-carbon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          {/* Sketchy outline house icon */}
          <path d="M3 21h18M5 21V10l7-6 7 6v11M9 21v-6h6v6" />
          <path d="M2 10l3-2.5m17 2.5l-3-2.5" />
          <line x1="12" y1="4" x2="12" y2="8" />
        </svg>
      ),
    },
    {
      number: '02',
      title: 'REMODELACIONES',
      description: 'Transformamos espacios existentes para mejorar su funcionalidad, diseño y valor.',
      iconSvg: (
        <svg className="w-12 h-12 text-carbon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          {/* Sketchy house with architectural grid/ruler */}
          <path d="M3 14V8l9-5 9 5v6" />
          <path d="M5 21v-4h14v4M12 3v18" />
          <path d="M2 21h20M7 11h10" />
        </svg>
      ),
    },
    {
      number: '03',
      title: 'QUINCHOS',
      description: 'Diseñamos y construimos espacios únicos para disfrutar y compartir todo el año.',
      iconSvg: (
        <svg className="w-12 h-12 text-carbon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          {/* Outdoors Quincho / structure */}
          <path d="M4 21V10h16v11" />
          <path d="M2 10l4-6h12l4 6" />
          <circle cx="12" cy="15" r="2" />
          <path d="M8 15h2m4 0h2" />
        </svg>
      ),
    },
    {
      number: '04',
      title: 'TINY HOUSES',
      description: 'Viviendas eficientes, modernas y personalizadas.',
      iconSvg: (
        <svg className="w-12 h-12 text-carbon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          {/* Compact modern small cabin */}
          <path d="M4 21V12l8-5 8 5v9H4z" />
          <path d="M2 12h20M8 16h3v5H8v-5z" />
          <circle cx="16" cy="15" r="1.5" />
        </svg>
      ),
    },
    {
      number: '05',
      title: 'MOBILIARIO',
      description: 'Diseño y fabricación de mobiliario a medida para complementar cada proyecto.',
      iconSvg: (
        <svg className="w-12 h-12 text-carbon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          {/* Modern interior chair sketch */}
          <path d="M7 4h10v8H7V4zM5 12h14v4H5v-4z" />
          <path d="M7 16v5M17 16v5M5 21h14" />
        </svg>
      ),
    },
    {
      number: '06',
      title: 'AUDIO RESIDENCIAL',
      description: 'Sistemas de sonido de alta fidelidad integrados con la arquitectura y diseño de tu hogar.',
      iconSvg: (
        <svg className="w-12 h-12 text-carbon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          {/* Sketchy speaker/audio design */}
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <circle cx="12" cy="8" r="2.5" />
          <circle cx="12" cy="15" r="4" />
          <line x1="12" y1="8" x2="12" y2="8.01" strokeWidth="2" />
          <line x1="12" y1="15" x2="12" y2="15.01" strokeWidth="2" />
        </svg>
      ),
      href: '/audio-residencial'
    }
  ];

  return (
    <section
      id="servicios"
      className="bg-[#dfd5c6] text-carbon section-padding border-t border-carbon/5"
    >
      <div className="container-base flex flex-col lg:flex-row gap-12 lg:gap-16">
        
        {/* TITULO SECCION LATERAL */}
        <div className="w-full lg:w-1/4 shrink-0 space-y-3">
          <span className="text-label text-carbon/50 font-bold block">¿QUÉ HACEMOS?</span>
          <h2 className="font-heading text-4xl lg:text-5xl font-extrabold text-carbon tracking-wide uppercase leading-[0.9]">
            SOLUCIONES CONSTRUIDAS A TU MEDIDA.
          </h2>
          <span className="accent-line !bg-carbon/40 mt-6" />
        </div>

        {/* GRID DE SERVICIOS */}
        <div className="w-full lg:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-8">
          {services.map((service, idx) => {
            const isClickable = !!service.href;
            
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col items-start space-y-6 group"
              >
                {isClickable ? (
                  <Link
                    href={service.href!}
                    className="flex flex-col items-start space-y-6 w-full cursor-pointer focus-sand outline-none"
                  >
                    {/* Icono + Acento */}
                    <div className="relative">
                      <div className="p-1 group-hover:scale-105 transition-transform duration-300">
                        {service.iconSvg}
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="space-y-2">
                      <h3 className="font-heading text-lg font-extrabold text-carbon tracking-wider uppercase group-hover:text-[#8d775f] transition-colors flex items-center gap-1.5">
                        {service.title}
                        <span className="text-sm font-light text-carbon/60 group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </h3>
                      <p className="text-[11px] text-carbon/70 font-medium leading-relaxed uppercase tracking-wider">
                        {service.description}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div className="flex flex-col items-start space-y-6 w-full">
                    {/* Icono + Acento */}
                    <div className="relative">
                      <div className="p-1">
                        {service.iconSvg}
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="space-y-2">
                      <h3 className="font-heading text-lg font-extrabold text-carbon tracking-wider uppercase">
                        {service.title}
                      </h3>
                      <p className="text-[11px] text-carbon/70 font-medium leading-relaxed uppercase tracking-wider">
                        {service.description}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
