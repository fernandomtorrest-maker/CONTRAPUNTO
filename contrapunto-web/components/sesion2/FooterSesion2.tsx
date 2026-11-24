'use client';

import React from 'react';
import { Building2, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';

export default function FooterSesion2() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0F0E0C] border-t border-amber-500/20 pt-16 pb-12 text-neutral-400 font-mono text-xs relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* COLUMNA 1: MARCA */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-carbon font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="font-heading text-lg font-bold text-cream">
                CONTRAPUNTO
              </span>
            </div>
            <p className="text-neutral-400 font-body text-xs leading-relaxed">
              Constructora especialista en arquitectura de alta precisión, inspección técnica ITO y cotizaciones vivas con Inteligencia Artificial.
            </p>
          </div>

          {/* COLUMNA 2: ACCESOS RÁPIDOS */}
          <div className="space-y-3">
            <span className="text-amber-400 font-bold uppercase text-[11px] tracking-wider block">
              Módulos Sesión 2
            </span>
            <ul className="space-y-2 text-neutral-300">
              <li><a href="#pilares" className="hover:text-amber-300 transition-colors">&bull; Pilares Estratégicos</a></li>
              <li><a href="#calculadora" className="hover:text-amber-300 transition-colors">&bull; Calculadora de Metraje</a></li>
              <li><a href="#cotizador-ia" className="hover:text-amber-300 transition-colors">&bull; Cotizador Supremo IA</a></li>
              <li><a href="#checklist-ito" className="hover:text-amber-300 transition-colors">&bull; Checklist Supremo ITO</a></li>
              <li><a href="#portafolio" className="hover:text-amber-300 transition-colors">&bull; Portafolio de Obras</a></li>
            </ul>
          </div>

          {/* COLUMNA 3: DATOS DE CONTACTO */}
          <div className="space-y-3">
            <span className="text-amber-400 font-bold uppercase text-[11px] tracking-wider block">
              Contacto Directo
            </span>
            <ul className="space-y-2 text-neutral-300">
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                Santiago, Región Metropolitana, Chile
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                +56 9 8443 2190
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                contacto@constructoracontrapunto.cl
              </li>
            </ul>
          </div>

          {/* COLUMNA 4: CREDENCIAL DE SESIÓN */}
          <div className="space-y-3 bg-stone-900/80 p-4 rounded-2xl border border-white/5">
            <span className="text-amber-400 font-bold uppercase text-[10px] tracking-wider block">
              ⚡ Entorno de Sesión
            </span>
            <p className="text-[11px] text-neutral-300">
              Desarrollado en paralelo mediante la metodología de los <strong>7 Prompts Especializados de Claude AI</strong> (Sin alteraciones al sitio principal).
            </p>
            <span className="text-[10px] text-neutral-500 block">
              Conversación ID: 74e47fd5-c2ac-4239-8828-e80a04129d92
            </span>
          </div>

        </div>

        {/* BARRA INFERIOR */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            &copy; {new Date().getFullYear()} Constructora Contrapunto. Todos los derechos reservados.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
          >
            <span>Volver arriba</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
