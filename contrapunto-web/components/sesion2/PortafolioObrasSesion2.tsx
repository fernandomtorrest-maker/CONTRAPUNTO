'use client';

import React, { useState } from 'react';
import { CheckCircle2, Eye } from 'lucide-react';

interface Obra {
  id: string;
  categoria: 'residencial' | 'ito' | 'remodelacion';
  titulo: string;
  ubicacion: string;
  metraje: string;
  plazo: string;
  inversion: string;
  imagen: string;
  resumen: string;
  puntosClave: string[];
}

export default function PortafolioObrasSesion2() {
  const [categoriaActiva, setCategoriaActiva] = useState<'todas' | 'residencial' | 'ito' | 'remodelacion'>('todas');
  const [obraSeleccionada, setObraSeleccionada] = useState<Obra | null>(null);

  const obras: Obra[] = [
    {
      id: 'jofre-107',
      categoria: 'ito',
      titulo: 'Condominio Trinos de Santiago - Jofré 107',
      ubicacion: 'Santiago Centro, Región Metropolitana',
      metraje: '10 m² de terraza + cielos Depto 1901',
      plazo: '7 días hábiles',
      inversion: '$1.991.763 CLP con IVA',
      imagen: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=1200&auto=format&fit=crop',
      resumen: 'Inspección técnica de patología por infiltración recurrente de 3 años desde terraza Depto 2001 hacia recintos de Depto 1901. Expediente unificado ITO y reparación con membrana elastomérica cementicia.',
      puntosClave: ['Demolición y recontrapiso con 1.5% de pendiente', 'Impermeabilización de losa con prueba de estanqueidad 48h', 'Tratamiento anti-humedad y pintura de cielo Depto 1901'],
    },
    {
      id: 'pergola-pirque',
      categoria: 'residencial',
      titulo: 'Pérgola & Quincho Gourmet Pirque',
      ubicacion: 'Pirque, Región Metropolitana',
      metraje: '65 m²',
      plazo: '25 días hábiles',
      inversion: '18.500.000 CLP',
      imagen: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
      resumen: 'Construcción de quincho de alta gama con vigas de roble pellín, parrilla integrada de acero inox AISI 304, iluminación cálida LED y mesones de granito negro absoluto.',
      puntosClave: ['Estructura mixta acero-madera nativa', 'Cubiertas de granito natural hidrofugado', 'Iluminación escénica dimable en domótica'],
    },
    {
      id: 'depto-pedro-valdivia',
      categoria: 'remodelacion',
      titulo: 'Remodelación Integral Depto Pedro de Valdivia',
      ubicacion: 'Providencia, Santiago',
      metraje: '110 m²',
      plazo: '35 días hábiles',
      inversion: '32.400.000 CLP',
      imagen: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop',
      resumen: 'Renovación completa de departamento estilo loft: concepto abierto de cocina con mesón de Silestone, porcelanatos de gran formato (120x60) y actualización sanitaria.',
      puntosClave: ['Pisos de porcelanato rectificado antideslizante', 'Mobiliario en mdf hidrófugo con enchapado roble', 'Rediseño de red eléctrica con certificación SEC'],
    },
    {
      id: 'casa-lo-barnechea',
      categoria: 'residencial',
      titulo: 'Residencia Lo Barnechea - Arquitectura Noble',
      ubicacion: 'Lo Barnechea, Santiago',
      metraje: '320 m²',
      plazo: '7 meses',
      inversion: '125.000.000 CLP',
      imagen: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
      resumen: 'Edificación residencial de alta gama en hormigón visto y grandes ventanales termopanel de PVC negro. Enfoque en eficiencia energética bioclimática.',
      puntosClave: ['Aislamiento térmico exterior EIFS 80mm', 'Climatización por losa radiante geotérmica', 'Certificación de construcción sustentable'],
    },
  ];

  const obrasFiltradas = categoriaActiva === 'todas'
    ? obras
    : obras.filter((o) => o.categoria === categoriaActiva);

  return (
    <section id="portafolio" className="py-24 bg-[#14120F] relative border-t border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ENCABEZADO DE SECCIÓN */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30">
            Evidencia & Audibilidad &bull; Prompt 7
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-cream tracking-tight">
            Portafolio de Obras de{' '}
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
              Excelencia Constructiva
            </span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base font-body">
            Fichas técnicas auditadas con fotos de avance, metrajes reales y trazabilidad de entrega sin retrasos.
          </p>
        </div>

        {/* FILTROS POR CATEGORÍA */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-stone-900 border border-white/10 gap-2">
            {[
              { id: 'todas', label: 'Todas las Obras' },
              { id: 'ito', label: 'Inspección ITO & Reparaciones' },
              { id: 'residencial', label: 'Residencial de Lujo' },
              { id: 'remodelacion', label: 'Remodelaciones Integrales' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoriaActiva(cat.id as typeof categoriaActiva)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                  categoriaActiva === cat.id
                    ? 'bg-amber-500 text-carbon shadow-lg shadow-amber-500/20'
                    : 'text-neutral-400 hover:text-cream'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* GRID DE OBRAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {obrasFiltradas.map((obra) => (
            <div
              key={obra.id}
              className="group bg-[#1C1917] rounded-3xl overflow-hidden border border-white/10 hover:border-amber-500/40 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              {/* FOTO CON CAPA DE GRADIENTE */}
              <div className="relative h-64 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={obra.imagen}
                  alt={obra.titulo}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-transparent to-transparent" />
                
                <span className="absolute top-4 left-4 text-[10px] font-mono font-bold uppercase tracking-wider bg-stone-950/80 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full backdrop-blur-md">
                  {obra.categoria === 'ito' ? 'Inspección ITO' : obra.categoria === 'residencial' ? 'Residencial' : 'Remodelación'}
                </span>
              </div>

              {/* DETALLES DE LA OBRA */}
              <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-xs font-mono text-neutral-400">
                    📍 {obra.ubicacion}
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-cream group-hover:text-amber-300 transition-colors">
                    {obra.titulo}
                  </h3>
                  <p className="text-xs text-neutral-300 font-body leading-relaxed line-clamp-3">
                    {obra.resumen}
                  </p>
                </div>

                {/* DATO RÁPIDO */}
                <div className="grid grid-cols-2 gap-2 pt-4 border-t border-white/5 text-[11px] font-mono text-neutral-400">
                  <div>📏 Metraje: <strong className="text-cream">{obra.metraje}</strong></div>
                  <div>⏱️ Plazo: <strong className="text-cream">{obra.plazo}</strong></div>
                </div>

                <button
                  onClick={() => setObraSeleccionada(obra)}
                  className="w-full bg-stone-900 hover:bg-stone-800 text-amber-400 font-mono font-bold text-xs uppercase py-3 rounded-xl border border-amber-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Eye className="w-4 h-4" /> Ver Ficha Técnica Completa
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* MODAL DETALLE DE OBRA */}
        {obraSeleccionada && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#181614] rounded-3xl border border-amber-500/30 max-w-2xl w-full p-6 sm:p-8 space-y-6 relative shadow-2xl">
              
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">
                    Ficha Técnica de Expediente
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-cream">
                    {obraSeleccionada.titulo}
                  </h3>
                  <p className="text-xs font-mono text-neutral-400">
                    {obraSeleccionada.ubicacion}
                  </p>
                </div>
                
                <button
                  onClick={() => setObraSeleccionada(null)}
                  className="p-2 rounded-xl bg-stone-900 text-neutral-400 hover:text-cream text-xs font-mono border border-white/10"
                >
                  ✕ Cerrar
                </button>
              </div>

              <div className="space-y-3 text-xs font-body text-neutral-300">
                <p>{obraSeleccionada.resumen}</p>

                <div className="space-y-2 pt-2">
                  <span className="font-mono text-xs font-bold text-amber-400 block">
                    Puntos Clave de la Ejecución:
                  </span>
                  <ul className="space-y-1.5 font-mono text-[11px] text-neutral-300">
                    {obraSeleccionada.puntosClave.map((punto, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{punto}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setObraSeleccionada(null)}
                  className="bg-amber-500 text-carbon font-mono font-bold text-xs uppercase px-6 py-2.5 rounded-xl"
                >
                  Entendido
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
