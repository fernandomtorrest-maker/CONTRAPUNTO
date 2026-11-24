'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ClipboardCheck, Building2, Briefcase, FileText, Menu, X, ArrowUpRight } from 'lucide-react';

export default function HeaderSesion2() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0F0E0C]/85 backdrop-blur-xl border-b border-amber-500/20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO CONTRAPUNTO */}
          <Link href="/contrapunto-sesion-2" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-amber-800 p-[1px] shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-all">
              <div className="w-full h-full bg-[#0F0E0C] rounded-[11px] flex items-center justify-center">
                <Building2 className="w-5 h-5 text-amber-400 group-hover:rotate-6 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-heading text-lg font-bold tracking-widest text-cream">
                  CONTRAPUNTO
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  SESIÓN 2
                </span>
              </div>
              <span className="text-[10px] font-mono tracking-wider text-amber-400/80 uppercase">
                Arquitectura & Edificación
              </span>
            </div>
          </Link>

          {/* NAVEGACIÓN PRINCIPAL (DESKTOP) */}
          <nav className="hidden md:flex items-center gap-1 bg-black/40 p-1.5 rounded-full border border-white/10">
            <a
              href="#pilares"
              className="px-4 py-2 rounded-full text-xs font-mono text-neutral-300 hover:text-amber-400 hover:bg-amber-500/10 transition-all flex items-center gap-2"
            >
              <Building2 className="w-3.5 h-3.5 text-amber-400" /> Pilares
            </a>
            <a
              href="#calculadora"
              className="px-4 py-2 rounded-full text-xs font-mono text-neutral-300 hover:text-amber-400 hover:bg-amber-500/10 transition-all flex items-center gap-2"
            >
              <Briefcase className="w-3.5 h-3.5 text-amber-400" /> Calculadora m²
            </a>
            <a
              href="#cotizador-ia"
              className="px-4 py-2 rounded-full text-xs font-mono text-neutral-300 hover:text-amber-400 hover:bg-amber-500/10 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Cotizador IA
            </a>
            <a
              href="#checklist-ito"
              className="px-4 py-2 rounded-full text-xs font-mono text-neutral-300 hover:text-amber-400 hover:bg-amber-500/10 transition-all flex items-center gap-2"
            >
              <ClipboardCheck className="w-3.5 h-3.5 text-amber-400" /> Checklist ITO
            </a>
            <a
              href="#portafolio"
              className="px-4 py-2 rounded-full text-xs font-mono text-neutral-300 hover:text-amber-400 hover:bg-amber-500/10 transition-all flex items-center gap-2"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" /> Portafolio
            </a>
          </nav>

          {/* BOTÓN CTA DIRECCIÓN */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#cotizador-ia"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-carbon font-mono font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full shadow-lg shadow-amber-500/25 transition-all flex items-center gap-2 hover:scale-105"
            >
              <Sparkles className="w-4 h-4 fill-carbon" />
              Probar IA
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-stone-900 border border-white/10 text-neutral-300"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0F0E0C] border-b border-amber-500/20 px-4 pt-2 pb-6 space-y-3">
          <a
            href="#pilares"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-sm font-mono text-neutral-300 hover:bg-amber-500/10 hover:text-amber-400"
          >
            Pilares Estratégicos
          </a>
          <a
            href="#calculadora"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-sm font-mono text-neutral-300 hover:bg-amber-500/10 hover:text-amber-400"
          >
            Calculadora de Metraje
          </a>
          <a
            href="#cotizador-ia"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-sm font-mono text-neutral-300 hover:bg-amber-500/10 hover:text-amber-400"
          >
            Cotizador Supremo IA
          </a>
          <a
            href="#checklist-ito"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-sm font-mono text-neutral-300 hover:bg-amber-500/10 hover:text-amber-400"
          >
            Checklist Supremo ITO
          </a>
          <a
            href="#portafolio"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-sm font-mono text-neutral-300 hover:bg-amber-500/10 hover:text-amber-400"
          >
            Portafolio de Obras
          </a>
        </div>
      )}
    </header>
  );
}
