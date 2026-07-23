'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ClipboardCheck, ShieldCheck, Home, FileText, MessageSquare, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface InspectionService {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}

const inspectionServices: InspectionService[] = [
  {
    id: 'pre-entrega',
    title: 'Inspección Pre-Entrega',
    description: 'Revisión exhaustiva e imparcial de propiedades nuevas (casas o departamentos) antes de firmar el acta de recepción final con la inmobiliaria o constructora.',
    icon: <ClipboardCheck className="h-6 w-6 text-sand" />,
    features: [
      'Revisión detallada de terminaciones (pintura, cerámicos y pisadura)',
      'Pruebas de presión de agua, desagües y funcionamiento sanitario',
      'Verificación del cuadro eléctrico, enchufes y tierras de protección',
      'Elaboración de lista de observaciones técnicas (Snag List) oficial'
    ]
  },
  {
    id: 'propiedades-usadas',
    title: 'Inspección Propiedades Usadas',
    description: 'Evaluación preventiva de viviendas usadas previas a la compra o arriendo para identificar vicios ocultos, daños estructurales o instalaciones deficientes.',
    icon: <Home className="h-6 w-6 text-sand" />,
    features: [
      'Detección de humedades, filtraciones y hongos no visibles',
      'Evaluación de la estructura, techumbres, vigas y fisuras en muros',
      'Verificación del estado de empalmes de gas, electricidad y alcantarillado',
      'Estimación de costos de reparación pre-compra para negociación'
    ]
  },
  {
    id: 'ito-obras',
    title: 'Inspección Técnica de Obras (ITO)',
    description: 'Supervisión continua o por hitos en terrenos de edificación y remodelaciones para asegurar el cumplimiento estricto de especificaciones técnicas y normativas.',
    icon: <ShieldCheck className="h-6 w-6 text-sand" />,
    features: [
      'Control de avance físico e insumos constructivos en terreno',
      'Supervisión de apego a planos de arquitectura e ingeniería',
      'Control de calidad en hormigonados, enfierraduras y aislaciones',
      'Informes periódicos de estado de obra para mandantes'
    ]
  },
  {
    id: 'informes-peritajes',
    title: 'Informes Técnicos & Diagnósticos',
    description: 'Informes periciales detallados con respaldo fotográfico de alta resolución para requerimientos legales, reclamos de garantía decenal o disputas de obra.',
    icon: <FileText className="h-6 w-6 text-sand" />,
    features: [
      'Registro fotográfico de alta precisión y planimetría de fallas',
      'Fundamentación técnica respaldada en la Ley General de Urbanismo',
      'Recomendaciones de solución definitiva y materiales a emplear',
      'Documento digital listo para presentar a inmobiliarias o tribunales'
    ]
  }
];

export const InspeccionTecnicaSection = () => {
  return (
    <section
      id="inspeccion-tecnica"
      className="bg-[#0f0e0c] text-cream section-padding border-t border-border relative overflow-hidden"
    >
      {/* Fondos degradados sutiles */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-sand/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-1/4 bottom-1/4 w-80 h-80 bg-stone/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-base flex flex-col xl:flex-row gap-12 xl:gap-16 relative z-10">
        
        {/* PANEL INFORMATIVO LATERAL */}
        <div className="w-full xl:w-1/4 shrink-0 flex flex-col justify-between items-start space-y-8">
          <div className="space-y-6">
            <span className="text-label text-sand font-bold block uppercase tracking-widest">
              CONTROL DE CALIDAD & DIAGNÓSTICO
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-cream tracking-wide uppercase leading-[0.95]">
              Inspección Técnica de Propiedades
            </h2>
            <span className="accent-line !bg-sand" />
            <p className="text-xs uppercase tracking-wider text-cream/70 leading-relaxed font-semibold pt-2">
              Asegura tu inversión inmobiliaria con revisiones profesionales y diagnósticos precisos en terreno, liderados por nuestro Inspector Técnico de Obras, <span className="text-sand">Diego Stankovsky</span>.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row xl:flex-col gap-4 w-full">
            <Link href="/cotizador-ito" className="w-full">
              <Button className="w-full bg-sand text-carbon hover:bg-[#a38b72] font-bold tracking-widest uppercase text-xs py-4 cursor-pointer">
                Cotizar Inspección Técnica
              </Button>
            </Link>
            <a
              href="https://wa.me/56966974560?text=Hola%20Contrapunto!%20Tengo%20dudas%20sobre%20la%20Inspecci%C3%B3n%20T%C3%A9cnica%20de%20mi%20propiedad."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 border border-white/10 hover:border-sand/40 hover:bg-white/[0.02] text-cream hover:text-sand py-3 px-6 rounded-md font-bold uppercase tracking-widest text-[10px] transition-all"
            >
              <MessageSquare className="h-4 w-4" />
              Consultar por WhatsApp
            </a>
          </div>
        </div>

        {/* DETALLE DE ESPECIALIDADES */}
        <div className="w-full xl:w-3/4 flex flex-col space-y-12">
          
          {/* Card Destacada Banner Rediseñada */}
          <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-stone-900 group min-h-[320px] md:min-h-[380px] flex flex-col justify-between p-6 sm:p-8 md:p-10">
            {/* Imagen de Fondo Arquitectónica HD */}
            <Image
              src="/images/inspeccion/banner_inspeccion_hero.jpg"
              alt="Inspección Técnica de Propiedades - Constructora Contrapunto"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-40"
              priority
            />
            
            {/* Gradient Overlays para Máxima Legibilidad */}
            <div className="absolute inset-0 bg-gradient-to-r from-carbon via-carbon/85 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-carbon/40" />

            {/* Contenido Principal con Glassmorphism */}
            <div className="relative z-10 max-w-xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand/15 border border-sand/30 text-sand text-[10px] sm:text-xs font-mono tracking-widest uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-sand" />
                RESPALDO & RIGUROSIDAD TÉCNICA
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-cream uppercase tracking-wide leading-tight">
                Protegemos tu patrimonio antes de recibir o comprar
              </h3>

              <p className="text-xs sm:text-sm text-cream/80 leading-relaxed font-light">
                Revisamos hasta el último detalle técnico en estructuras, terminaciones, instalaciones sanitarias y eléctricas para garantizar que recibas una propiedad en óptimas condiciones.
              </p>

              {/* Puntos destacados / Métricas en la tarjeta */}
              <div className="pt-2 flex flex-wrap items-center gap-3 text-[11px] font-mono text-sand/90">
                <span className="flex items-center gap-1.5 bg-carbon/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                  ✓ 100% Imparcial
                </span>
                <span className="flex items-center gap-1.5 bg-carbon/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                  ✓ +50 Puntos de Revisión
                </span>
                <span className="flex items-center gap-1.5 bg-carbon/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                  ✓ Informe Digital 24h
                </span>
              </div>
            </div>

            {/* Badge de Diego Stankovsky en la esquina inferior */}
            <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3 bg-carbon/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 shadow-lg">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-sand/40 shrink-0">
                  <Image
                    src="/images/equipo/diego_stankovsky.png"
                    alt="Diego Stankovsky"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <span className="block text-xs font-bold text-cream uppercase tracking-wider">Diego Stankovsky</span>
                  <span className="block text-[10px] text-sand font-mono uppercase tracking-widest">Inspector Técnico de Obras (ITO)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Grid de Servicios de Inspección */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {inspectionServices.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="group border border-white/10 hover:border-sand/30 bg-stone-dark/40 hover:bg-stone-dark/70 rounded-2xl p-6 md:p-8 flex flex-col justify-between space-y-6 transition-all duration-300 shadow-xl"
              >
                <div className="space-y-4">
                  {/* Icono */}
                  <div className="h-10 w-10 border border-white/10 flex items-center justify-center bg-carbon/80 rounded-lg shadow-md">
                    {service.icon}
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-heading text-2xl font-extrabold text-cream uppercase tracking-wider group-hover:text-sand transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed font-light">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Lista de características */}
                <ul className="space-y-2 border-t border-white/5 pt-4">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sand" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

        </div>

      </div>

      {/* SECCIÓN INFORMATIVA DE GARANTÍA */}
      <div className="container-base mt-20 pt-12 border-t border-white/10 relative z-10">
        <div className="bg-sand/10 border border-sand/20 rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-8 w-8 text-sand shrink-0 mt-1" />
            <div className="space-y-1">
              <h4 className="font-heading text-lg font-bold text-cream uppercase tracking-wider">
                ¿Sabías que una propiedad puede presentar hasta 50 observaciones no visibles a simple vista?
              </h4>
              <p className="text-xs text-neutral-300 font-light leading-relaxed">
                Nuestras inspecciones previenen gastos inesperados de reparación y aseguran que la inmobiliaria cumpla con todas sus obligaciones de postventa antes de firmar.
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/56966974560?text=Hola%20Diego!%20Me%20gustar%C3%ADa%20agendar%20una%20Inspecci%C3%B3n%20T%C3%A9cnica%20de%20mi%20propiedad."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-sand text-carbon font-bold px-6 py-3 rounded-lg text-xs uppercase tracking-widest hover:bg-[#a38b72] transition-colors"
          >
            Agendar con Diego
          </a>
        </div>
      </div>

      {/* SECCIÓN DE GALERÍA: DIEGO EN ACCIÓN */}
      <div className="container-base mt-24 pt-16 border-t border-white/10 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="space-y-3">
            <span className="text-label text-sand font-bold block uppercase tracking-widest">
              Diego en Acción
            </span>
            <h3 className="font-heading text-3xl md:text-4xl font-extrabold uppercase text-cream tracking-wider">
              Inspecciones Técnicas en Terreno
            </h3>
            <span className="accent-line !bg-sand" />
          </div>
          <p className="text-xs text-neutral-400 max-w-md font-light leading-relaxed uppercase tracking-wider">
            Fotografías de Diego Stankovsky realizando evaluaciones técnicas minuciosas en terreno, medición de humedad, revisión de estructuras y cuadros eléctricos.
          </p>
        </div>

        {/* GRID DE GALERÍA DIEGO EN ACCIÓN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              src: '/images/inspeccion/diego_terreno_1.webp',
              alt: 'Diego Stankovsky en evaluación de terminaciones',
              title: 'Evaluación de terminaciones',
              desc: 'Inspección minuciosa en terreno para verificar la calidad de acabados, marcos, puertas, muros y revestimientos en departamentos y casas.'
            },
            {
              src: '/images/inspeccion/diego_terreno_2.webp',
              alt: 'Diego Stankovsky inspeccionando tableros eléctricos y estructuras',
              title: 'Inspección de Redes & Cuadros Eléctricos',
              desc: 'Revisión de tableros eléctricos, instalaciones, continuidad de tierra y estructuras superiores antes de la entrega final del inmueble.'
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="group flex flex-col bg-stone-dark/30 border border-white/5 rounded-xl overflow-hidden shadow-lg hover:border-sand/20 transition-all duration-300"
            >
              <div className="relative aspect-[3/2] overflow-hidden bg-carbon/40">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-carbon/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none" />
              </div>
              <div className="p-5 space-y-2">
                <h4 className="font-heading text-lg font-bold text-cream uppercase tracking-wider group-hover:text-sand transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InspeccionTecnicaSection;
