'use client';

import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Award, FileCheck2, Building2 } from 'lucide-react';

export default function HeroSesion2() {
  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-[#0F0E0C]">
      {/* GLOW DE FONDO METÁLICO Y PATRÓN DE GRID DE ARQUITECTURA */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-500/15 via-[#0F0E0C] to-[#0F0E0C] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* INSIGNIA SUPERIOR (PROMPT 3: COPYWRITING & PROPUESTA DE VALOR) */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-900/90 border border-amber-500/30 shadow-lg shadow-amber-500/10 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />
            <span className="text-xs font-mono text-amber-300 font-semibold uppercase tracking-widest">
              Constructora Contrapunto &bull; Sesión 2 (Prometheus AI)
            </span>
          </div>
        </div>

        {/* TITULAR Y SUBTITULAR PRINCIPAL (PROMPT 3) */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold text-cream tracking-tight leading-[1.1]">
            Arquitectura & Edificación de{' '}
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent underline decoration-amber-500/40 underline-offset-8">
              Alta Precisión
            </span>
          </h1>

          <p className="text-base sm:text-xl text-neutral-300 font-body leading-relaxed max-w-3xl mx-auto font-light">
            Transformamos visión en obras maestras residenciales y corporativas. Combinamos diseño con materiales nobles, gestión transparente de costos con <strong className="text-amber-300 font-normal">IA de última generación</strong> e <strong className="text-amber-300 font-normal">inspección técnica de nivel supremo</strong>.
          </p>

          {/* BOTONES DE ACCIÓN PRINCIPALES */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#cotizador-ia"
              className="w-full sm:w-auto bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-carbon font-mono font-bold text-sm uppercase tracking-widest px-8 py-4 rounded-2xl shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-3 group hover:scale-105"
            >
              <Sparkles className="w-5 h-5 fill-carbon group-hover:rotate-12 transition-transform" />
              Cotizar con IA Instantáneo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#checklist-ito"
              className="w-full sm:w-auto bg-stone-900/80 hover:bg-stone-800 text-cream font-mono font-semibold text-sm uppercase tracking-wider px-8 py-4 rounded-2xl border border-amber-500/30 hover:border-amber-400 transition-all flex items-center justify-center gap-3 backdrop-blur-md"
            >
              <FileCheck2 className="w-5 h-5 text-amber-400" />
              Ver Caso Real Jofré 107
            </a>
          </div>
        </div>

        {/* METRICAS DE AUTORIDAD Y PROOF (PROMPT 3) */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          
          <div className="bg-[#181614]/80 backdrop-blur-md p-6 rounded-2xl border border-amber-500/20 shadow-xl space-y-2 hover:border-amber-500/40 transition-all">
            <div className="flex items-center gap-3 text-amber-400">
              <Building2 className="w-6 h-6" />
              <span className="font-heading text-2xl sm:text-3xl font-bold text-cream">+25</span>
            </div>
            <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
              Obras Ejecutadas en Santiago
            </p>
          </div>

          <div className="bg-[#181614]/80 backdrop-blur-md p-6 rounded-2xl border border-amber-500/20 shadow-xl space-y-2 hover:border-amber-500/40 transition-all">
            <div className="flex items-center gap-3 text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
              <span className="font-heading text-2xl sm:text-3xl font-bold text-cream">100%</span>
            </div>
            <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
              Precisión en Auditoría ITO
            </p>
          </div>

          <div className="bg-[#181614]/80 backdrop-blur-md p-6 rounded-2xl border border-amber-500/20 shadow-xl space-y-2 hover:border-amber-500/40 transition-all">
            <div className="flex items-center gap-3 text-amber-400">
              <FileCheck2 className="w-6 h-6" />
              <span className="font-heading text-xl sm:text-2xl font-bold text-cream">$1.99M CLP</span>
            </div>
            <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
              Expediente Jofré 107 Auditado
            </p>
          </div>

          <div className="bg-[#181614]/80 backdrop-blur-md p-6 rounded-2xl border border-amber-500/20 shadow-xl space-y-2 hover:border-amber-500/40 transition-all">
            <div className="flex items-center gap-3 text-amber-400">
              <Award className="w-6 h-6" />
              <span className="font-heading text-2xl sm:text-3xl font-bold text-cream">0%</span>
            </div>
            <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
              Desviación Presupuestaria
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
