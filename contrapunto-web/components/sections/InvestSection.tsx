'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const InvestSection = () => {
  return (
    <section
      id="inversiones"
      className="bg-[#0f0e0c] text-cream section-padding border-t border-border"
    >
      <div className="container-base flex flex-col xl:flex-row gap-12 xl:gap-16">
        
        {/* PANEL INTRODUCTORIO LATERAL */}
        <div className="w-full xl:w-1/4 shrink-0 flex flex-col justify-between items-start space-y-6">
          <div className="space-y-4">
            <span className="text-label text-sand font-bold block">INVIERTE CON CONTRAPUNTO.</span>
            <h2 className="font-heading text-4xl lg:text-5xl font-extrabold text-cream tracking-wide uppercase leading-[0.9]">
              FLIPPING & CROWDFUNDING INMOBILIARIO.
            </h2>
            <span className="accent-line" />
            <p className="text-[11px] text-cream/50 uppercase tracking-widest leading-relaxed pt-2 max-w-[280px]">
              Participa en proyectos inmobiliarios seleccionados, con análisis, gestión y ejecución profesional.
            </p>
          </div>

          <div className="pt-4">
            <Button variant="outline" size="sm">
              Conoce Más
            </Button>
          </div>
        </div>

        {/* CONTENEDORES DE INVERSIÓN (DOS CARDS GRANDES) */}
        <div className="w-full xl:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* CARD 1: FLIPPING INMOBILIARIO */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="border border-border p-8 md:p-12 bg-stone-dark flex flex-col justify-between space-y-8 relative overflow-hidden group"
          >
            {/* Fondo sutil */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--color-sand-muted),transparent)] opacity-[0.03] pointer-events-none" />

            <div className="space-y-6">
              {/* Icono */}
              <div className="w-12 h-12 border border-border flex items-center justify-center text-sand bg-[#0f0e0c]">
                <Building2 size={22} strokeWidth={1.5} />
              </div>

              {/* Títulos y textos */}
              <div className="space-y-3">
                <h3 className="font-heading text-2xl font-extrabold text-cream tracking-wider uppercase group-hover:text-sand transition-colors duration-200">
                  FLIPPING INMOBILIARIO
                </h3>
                <p className="text-xs text-cream/70 uppercase tracking-widest leading-relaxed">
                  Detectamos propiedades con potencial, las renovamos y maximizamos su valor.
                </p>
                <p className="text-[11px] text-sand/60 font-semibold uppercase tracking-wider">
                  Rentabilidad basada en experiencia y estrategia.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <button className="text-[10px] text-cream/60 hover:text-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-sand focus-visible:outline-offset-2 font-bold tracking-widest uppercase transition-colors flex items-center gap-2 cursor-pointer" aria-label="Ver proyectos de flipping inmobiliario">
                Ver Proyectos <span>→</span>
              </button>
            </div>
          </motion.div>

          {/* CARD 2: CROWDFUNDING INMOBILIARIO */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="border border-border p-8 md:p-12 bg-stone-dark flex flex-col justify-between space-y-8 relative overflow-hidden group"
          >
            {/* Fondo sutil */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--color-sand-muted),transparent)] opacity-[0.03] pointer-events-none" />

            <div className="space-y-6">
              {/* Icono */}
              <div className="w-12 h-12 border border-border flex items-center justify-center text-sand bg-[#0f0e0c]">
                <Users size={22} strokeWidth={1.5} />
              </div>

              {/* Títulos y textos */}
              <div className="space-y-3">
                <h3 className="font-heading text-2xl font-extrabold text-cream tracking-wider uppercase group-hover:text-sand transition-colors duration-200">
                  CROWDFUNDING INMOBILIARIO
                </h3>
                <p className="text-xs text-cream/70 uppercase tracking-widest leading-relaxed">
                  Invierte junto a otros en proyectos inmobiliarios cuidadosamente seleccionados.
                </p>
                <p className="text-[11px] text-sand/60 font-semibold uppercase tracking-wider">
                  Transparencia, diversificación y retornos atractivos.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <button className="text-[10px] text-cream/60 hover:text-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-sand focus-visible:outline-offset-2 font-bold tracking-widest uppercase transition-colors flex items-center gap-2 cursor-pointer" aria-label="Más información sobre crowdfunding inmobiliario">
                Más Información <span>→</span>
              </button>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default InvestSection;
