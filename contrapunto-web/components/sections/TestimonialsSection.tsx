'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Testimonial {
  quote: string;
  author: string;
  location: string;
  initials: string;
}

export const TestimonialsSection = () => {
  const testimonials: Testimonial[] = [
    {
      quote: 'Excelente experiencia de principio a fin. Cumplieron los plazos y el resultado superó nuestras expectativas.',
      author: 'María José L.',
      location: 'Lo Barnechea',
      initials: 'MJ',
    },
    {
      quote: 'Profesionales, detallistas y muy responsables. 100% recomendados para proyectos grandes o chicos.',
      author: 'Claudio R.',
      location: 'Las Condes',
      initials: 'CR',
    },
    {
      quote: 'El quincho quedó increíble, tal como lo soñamos. Gran equipo.',
      author: 'Camila y Andrés',
      location: 'Colina',
      initials: 'CA',
    },
  ];

  return (
    <section
      id="testimonios"
      className="bg-[#dfd5c6] text-carbon section-padding border-t border-carbon/5"
    >
      <div className="container-base flex flex-col xl:flex-row gap-12 xl:gap-16">
        
        {/* TITULO DE SECCION */}
        <div className="w-full xl:w-1/4 shrink-0 space-y-4">
          <span className="text-label text-carbon/50 font-bold block">TESTIMONIOS</span>
          <h2 className="font-heading text-4xl lg:text-5xl font-extrabold text-carbon tracking-wide uppercase leading-[0.9]">
            LO QUE DICEN NUESTROS CLIENTES.
          </h2>
          <span className="accent-line !bg-carbon/40" />
        </div>

        {/* GRID DE TESTIMONIOS */}
        <div className="w-full xl:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-cream/40 border border-carbon/10 p-8 flex flex-col justify-between space-y-8 hover:bg-cream/60 transition-colors duration-300"
            >
              {/* Cita */}
              <p className="text-xs uppercase tracking-wide font-medium text-carbon/80 leading-relaxed relative">
                <span className="text-2xl font-serif text-carbon/25 block leading-none -mb-2">“</span>
                {t.quote}
                <span className="text-2xl font-serif text-carbon/25 block leading-none text-right -mt-2">”</span>
              </p>

              {/* Autor Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-carbon/5">
                {/* Avatar redondo minimalista */}
                <div className="w-10 h-10 rounded-full bg-carbon/5 border border-carbon/10 flex items-center justify-center font-heading text-xs font-bold text-carbon shrink-0">
                  {t.initials}
                </div>
                <div>
                  <h4 className="font-heading text-sm font-extrabold text-carbon tracking-wider uppercase">
                    {t.author}
                  </h4>
                  <p className="text-[10px] text-carbon/50 uppercase tracking-widest font-semibold">
                    {t.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
