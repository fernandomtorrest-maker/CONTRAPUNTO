'use client';

import React, { useState } from 'react';
import { Sliders, Calculator, Calendar, ArrowRight, ShieldAlert } from 'lucide-react';

export default function CalculadoraMetrajeSesion2() {
  const [metraje, setMetraje] = useState<number>(45);
  const [tipoProyecto, setTipoProyecto] = useState<'ito' | 'remodelacion' | 'obra_nueva' | 'quincho'>('remodelacion');

  // Multiplicadores por m² (Valores estimados reales de construcción 2026 en Chile)
  const tarifas = {
    ito: { clpPerM2: 28500, ufPerM2: 0.73, daysFactor: 0.2, label: 'Inspección & Diagnóstico ITO', icon: '🔍' },
    remodelacion: { clpPerM2: 380000, ufPerM2: 9.74, daysFactor: 0.8, label: 'Remodelación Integral Premium', icon: '🎨' },
    obra_nueva: { clpPerM2: 890000, ufPerM2: 22.82, daysFactor: 1.5, label: 'Construcción Casa Desde Cero', icon: '🏛️' },
    quincho: { clpPerM2: 520000, ufPerM2: 13.33, daysFactor: 0.6, label: 'Quincho & Espacio Exterior', icon: '🪵' },
  };

  const configActual = tarifas[tipoProyecto];
  const costoTotalClp = Math.round(metraje * configActual.clpPerM2);
  const costoTotalUf = (metraje * configActual.ufPerM2).toFixed(1);
  const diasEstimados = Math.max(5, Math.round(metraje * configActual.daysFactor));

  return (
    <section id="calculadora" className="py-24 bg-[#0F0E0C] relative border-t border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ENCABEZADO DE SECCIÓN */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30">
            Microinteracción Viva &bull; Prompt 4
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-cream tracking-tight">
            Calculadora Instantánea de{' '}
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
              Metraje & Presupuesto
            </span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base font-body">
            Ajusta los metros cuadrados (`m²`) y el tipo de obra para visualizar en tiempo real una estimación de inversión y plazos.
          </p>
        </div>

        {/* CONTENEDOR PRINCIPAL INTERACTIVO */}
        <div className="bg-[#181614] rounded-3xl p-6 sm:p-10 border border-amber-500/20 shadow-2xl max-w-4xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* COLUMNA IZQUIERDA: CONTROLES */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* TIPO DE PROYECTO */}
              <div className="space-y-3">
                <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                  1. Selecciona el Tipo de Obra:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(Object.keys(tarifas) as Array<keyof typeof tarifas>).map((key) => {
                    const active = tipoProyecto === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setTipoProyecto(key)}
                        className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                          active
                            ? 'bg-amber-500/15 border-amber-500 text-cream shadow-lg shadow-amber-500/10'
                            : 'bg-stone-900 border-white/5 text-neutral-400 hover:border-amber-500/30 hover:text-cream'
                        }`}
                      >
                        <span className="text-xl">{tarifas[key].icon}</span>
                        <span className="text-xs font-mono font-semibold line-clamp-1">
                          {tarifas[key].label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SLIDER DE METRAJE */}
              <div className="space-y-4 bg-stone-900/60 p-6 rounded-2xl border border-white/5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-amber-400" />
                    2. Metraje del Inmueble (`m²`):
                  </label>
                  <span className="font-mono text-2xl font-bold text-amber-400 bg-amber-500/10 px-4 py-1 rounded-xl border border-amber-500/30">
                    {metraje} m²
                  </span>
                </div>

                <input
                  type="range"
                  min="10"
                  max="350"
                  step="5"
                  value={metraje}
                  onChange={(e) => setMetraje(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-stone-800 rounded-lg"
                />

                <div className="flex justify-between text-[11px] font-mono text-neutral-500">
                  <span>10 m² (Pequeno)</span>
                  <span>150 m² (Medio)</span>
                  <span>350 m² (Extenso)</span>
                </div>
              </div>

            </div>

            {/* COLUMNA DERECHA: RESULTADO EN VIVO */}
            <div className="lg:col-span-5 bg-gradient-to-b from-stone-900 to-[#14120F] p-6 sm:p-8 rounded-2xl border border-amber-500/30 space-y-6 text-center shadow-xl">
              
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400/80 block">
                  Presupuesto Estimado Vivo
                </span>
                <div className="font-heading text-3xl sm:text-4xl font-extrabold text-cream">
                  ${costoTotalClp.toLocaleString('es-CL')} <span className="text-xs font-mono text-amber-400 font-normal">CLP</span>
                </div>
                <div className="text-sm font-mono text-neutral-400 font-semibold">
                  ~ {costoTotalUf} UF <span className="text-[10px] text-neutral-500">(UF de referencia)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 text-left">
                <div className="bg-stone-950 p-3 rounded-xl border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-amber-400" /> Plazo Estimado
                  </span>
                  <span className="font-mono text-sm font-bold text-cream">
                    {diasEstimados} días hábiles
                  </span>
                </div>

                <div className="bg-stone-950 p-3 rounded-xl border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase flex items-center gap-1">
                    <Calculator className="w-3 h-3 text-amber-400" /> Tarifa Promedio
                  </span>
                  <span className="font-mono text-xs font-bold text-amber-300">
                    ${configActual.clpPerM2.toLocaleString('es-CL')} / m²
                  </span>
                </div>
              </div>

              <a
                href="#cotizador-ia"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-carbon font-mono font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
              >
                Llevar a Cotizador IA
                <ArrowRight className="w-4 h-4" />
              </a>

              <p className="text-[10px] font-mono text-neutral-500 flex items-center justify-center gap-1">
                <ShieldAlert className="w-3 h-3 text-amber-500" /> Valores sujetos a inspección técnica final.
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
