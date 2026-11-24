'use client';

import React from 'react';
import { Building2, Sparkles, ClipboardCheck, Layers, Shield, ArrowRight } from 'lucide-react';

export default function PilaresSesion2() {
  const pilares = [
    {
      id: 'residencial',
      icon: Building2,
      tag: 'PILAR 1',
      title: 'Construcción Residencial de Lujo',
      subtitle: 'Casas a Medida, Quinchos & Obras de Alta Gama',
      description: 'Ejecución integral desde fundaciones hasta terminaciones finas. Materiales nobles (madera nativa, hormigón visto, acero corten) y estándares de aislamiento térmico superior.',
      highlights: ['Diseño arquitectónico personalizado', 'Estándares de aislamiento EIFS', 'Garantía extendida por ley'],
      ctaText: 'Explorar Casas Residenciales',
      link: '#portafolio',
    },
    {
      id: 'cotizador',
      icon: Sparkles,
      tag: 'PILAR 2',
      title: 'Cotizador Supremo IA',
      subtitle: 'Presupuestos Vivos por Lenguaje Natural',
      description: 'Ingresa la descripción de tu proyecto en español cotidiano y nuestro motor de IA genera el desglose instantáneo de APU, porcentaje de mano de obra vs materiales y total en CLP / UF.',
      highlights: ['Análisis en 3 segundos', 'Base de datos APU actualizada 2026', 'Exportación PDF con desglose'],
      ctaText: 'Probar Cotizador IA',
      link: '#cotizador-ia',
    },
    {
      id: 'ito',
      icon: ClipboardCheck,
      tag: 'PILAR 3',
      title: 'Inspección Técnica ITO & Diagnóstico',
      subtitle: 'Checklist Supremo & Reportes en Terreno',
      description: 'Auditoría detallada de obras, patologías de filtración en terrazas, humedades recurribles e inspecciones de pre-entrega. Generación oficial de dictamen firmado para copropiedades y clientes.',
      highlights: ['Matriz táctil de 3 estados', 'Carga instantánea Caso Jofré 107', 'Certificado PDF institucional'],
      ctaText: 'Ver Módulo de Inspección',
      link: '#checklist-ito',
    },
    {
      id: 'portafolio',
      icon: Layers,
      tag: 'PILAR 4',
      title: 'Portafolio de Excelencia Auditable',
      subtitle: 'Fichas Técnicas & Evidencia Fotográfica',
      description: 'Transparencia absoluta en cada metro cuadrado. Registro detallado de obras entregadas con fotos de avance, plazos cumplidos al 100% y métricas de satisfacción.',
      highlights: ['Auditoría fotográfica antes/después', 'Planos y detalles constructivos', 'Casos reales verificables'],
      ctaText: 'Ver Galería de Obras',
      link: '#portafolio',
    },
  ];

  return (
    <section id="pilares" className="py-24 bg-[#14120F] relative border-t border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ENCABEZADO DE SECCIÓN */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30">
            Arquitectura de Marca &bull; Prompt 1
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-cream tracking-tight">
            Los 4 Pilares Estratégicos de{' '}
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
              Constructora Contrapunto
            </span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base font-body">
            Una propuesta estructurada para clientes exigentes que buscan máxima solidez constructiva y tecnología de punta.
          </p>
        </div>

        {/* GRID DE PILARES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pilares.map((pilar) => {
            const IconComponent = pilar.icon;
            return (
              <div
                key={pilar.id}
                className="group relative bg-[#1C1917]/90 rounded-3xl p-8 border border-white/10 hover:border-amber-500/50 transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(217,119,6,0.15)] flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* ICONO Y TAG */}
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-carbon transition-all">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-400/80 bg-stone-900 px-3 py-1 rounded-full border border-white/5">
                      {pilar.tag}
                    </span>
                  </div>

                  {/* TITULOS */}
                  <div className="space-y-1">
                    <h3 className="font-heading text-2xl font-bold text-cream group-hover:text-amber-300 transition-colors">
                      {pilar.title}
                    </h3>
                    <p className="text-xs font-mono text-amber-400/90 font-medium">
                      {pilar.subtitle}
                    </p>
                  </div>

                  {/* DESCRIPCIÓN */}
                  <p className="text-sm text-neutral-300 font-body leading-relaxed">
                    {pilar.description}
                  </p>

                  {/* PUNTOS DESTACADOS */}
                  <ul className="space-y-2 pt-2 border-t border-white/5">
                    {pilar.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                        <Shield className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* BOTÓN CTA */}
                <div className="pt-8">
                  <a
                    href={pilar.link}
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors group/link"
                  >
                    <span>{pilar.ctaText}</span>
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
