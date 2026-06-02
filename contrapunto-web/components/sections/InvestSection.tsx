'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

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
              FLIPPING INMOBILIARIO.
            </h2>
            <span className="accent-line" />
            <p className="text-[11px] text-cream/50 uppercase tracking-widest leading-relaxed pt-2 max-w-[280px]">
              Participa en proyectos de inversión seleccionados, con análisis, gestión y ejecución profesional.
            </p>
          </div>

          <div className="pt-4">
            <Link href="/inversiones/flipping">
              <Button variant="outline" size="sm">
                Conoce Más
              </Button>
            </Link>
          </div>
        </div>

        {/* CONTENEDOR DE INVERSIÓN (CARD GRANDE - FLIPPING INMOBILIARIO) */}
        <div className="w-full xl:w-3/4">
          
          {/* CARD: FLIPPING INMOBILIARIO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="border border-border p-8 md:p-12 bg-stone-dark flex flex-col justify-between space-y-8 relative overflow-hidden group min-h-[300px]"
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
                <p className="text-xs text-cream/70 uppercase tracking-widest leading-relaxed max-w-2xl">
                  Compramos propiedades estratégicamente seleccionadas con alto potencial, las renovamos con diseño y construcción de calidad Contrapunto, y las vendemos en el menor plazo generando altas rentabilidades.
                </p>
                <p className="text-[11px] text-sand/60 font-semibold uppercase tracking-wider">
                  Rentabilidad respaldada por nuestro oficio en construcción y arquitectura.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <Link href="/inversiones/flipping" className="inline-flex">
                <button className="text-[10px] text-cream/60 hover:text-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-sand focus-visible:outline-offset-2 font-bold tracking-widest uppercase transition-colors flex items-center gap-2 cursor-pointer" aria-label="Ver proyectos de flipping inmobiliario">
                  Más Información <span>→</span>
                </button>
              </Link>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default InvestSection;
