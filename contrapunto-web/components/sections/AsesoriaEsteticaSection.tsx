'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Paintbrush, Sun, LayoutGrid, MessageSquare, Compass } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface AestheticService {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}

const aestheticServices: AestheticService[] = [
  {
    id: 'color-textura',
    title: 'Color & Texturas',
    description: 'Definición y coordinación de paletas de colores, texturas y materiales nobles (maderas, piedras, microcementos y metales) para dar coherencia visual y carácter a cada espacio.',
    icon: <Paintbrush className="h-6 w-6 text-sand" />,
    features: [
      'Definición de cartas de color personalizadas',
      'Selección de texturas de madera y piedra natural',
      'Coordinación de acabados y revestimientos finos',
      'Desarrollo de muestras físicas aplicadas en obra'
    ]
  },
  {
    id: 'iluminacion-atmosfera',
    title: 'Iluminación & Atmósfera',
    description: 'Diseño y distribución de escenas lumínicas decorativas y técnicas. Selección de lámparas y luminarias para realzar la volumetría y crear climas acogedores.',
    icon: <Sun className="h-6 w-6 text-sand" />,
    features: [
      'Cálculo de temperatura y flujo de luz (K)',
      'Selección de lámparas colgantes y apliqués exclusivos',
      'Diseño de iluminación indirecta y perimetral',
      'Planificación de escenarios lumínicos regulables'
    ]
  },
  {
    id: 'curaduria-styling',
    title: 'Curaduría & Art Styling',
    description: 'Selección de obras pictóricas, esculturas y objetos decorativos a medida. Composición y ambientación de rincones con alma y expresión artística.',
    icon: <Compass className="h-6 w-6 text-sand" />,
    features: [
      'Enlace directo con artistas nacionales independientes',
      'Búsqueda de piezas escultóricas y mobiliario de colección',
      'Ambientación textil (cortinajes, cojines y alfombras)',
      'Proyectos artísticos a medida de gran formato'
    ]
  },
  {
    id: 'coherencia-diseno',
    title: 'Coherencia Arquitectónica',
    description: 'Aseguramiento de la continuidad estilística entre revestimientos, carpinterías a medida, iluminación y mobiliario, logrando un lenguaje único y fluido.',
    icon: <LayoutGrid className="h-6 w-6 text-sand" />,
    features: [
      'Estudio de flujo y simetría de espacios interiores',
      'Armonización de pisos y acabados de muros',
      'Diseño y modulación de mobiliario en obra',
      'Supervisión estética minuciosa de terminaciones'
    ]
  }
];

export const AsesoriaEsteticaSection = () => {
  return (
    <section
      id="asesoria-estetica"
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
              DISEÑO & ACABADOS
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-cream tracking-wide uppercase leading-[0.95]">
              Asesoría Estética Integral
            </h2>
            <span className="accent-line !bg-sand" />
            <p className="text-xs uppercase tracking-wider text-cream/70 leading-relaxed font-semibold pt-2">
              Buscamos que cada rincón cuente una historia visual. Proyectos de interiorismo y curaduría de espacios con carácter, diseñados por nuestro especialista de diseño, <span className="text-sand">Gonzalo Gálvez</span>.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row xl:flex-col gap-4 w-full">
            <Link href="/cotizar" className="w-full sm:w-auto xl:w-full">
              <Button className="w-full bg-sand text-carbon hover:bg-[#a38b72] font-bold tracking-widest uppercase text-xs py-4">
                Cotizar Asesoría Estética
              </Button>
            </Link>
            <a
              href="https://wa.me/56966974560?text=Hola%20Contrapunto!%20Me%20interesa%20recibir%20asesor%C3%ADa%20est%C3%A9tica%20para%20mi%20proyecto."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto xl:w-full flex items-center justify-center gap-2 border border-white/10 hover:border-sand/40 hover:bg-white/[0.02] text-cream hover:text-sand py-3 px-6 rounded-md font-bold uppercase tracking-widest text-[10px] transition-all"
            >
              <MessageSquare className="h-4 w-4" />
              Escribir por WhatsApp
            </a>
          </div>
        </div>

        {/* DETALLE DE ESPECIALIDADES */}
        <div className="w-full xl:w-3/4 flex flex-col space-y-12">
          
          {/* Card Destacada Banner */}
          <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src="/images/estetica/estetica_cover.webp"
              alt="Muestrario de materiales y asesoría estética"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-carbon via-carbon/40 to-transparent" />
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 max-w-sm space-y-2 relative z-10">
              <h3 className="font-heading text-xl md:text-2xl font-extrabold text-cream uppercase tracking-wide">
                La Belleza en los Detalles
              </h3>
              <p className="text-[10px] md:text-xs text-neutral-300 leading-relaxed font-light">
                Coordinamos texturas nobles, acabados metálicos, maderas y textiles para consolidar la impronta de tu obra.
              </p>
            </div>
          </div>

          {/* Grid de Servicios Estéticos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aestheticServices.map((service, idx) => (
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

      {/* SECCIÓN DE GALERÍA: GONZALO EN ACCIÓN */}
      <div className="container-base mt-24 pt-16 border-t border-white/10 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="space-y-3">
            <span className="text-label text-sand font-bold block uppercase tracking-widest">
              Gonzalo en Acción
            </span>
            <h3 className="font-heading text-3xl md:text-4xl font-extrabold uppercase text-cream tracking-wider">
              Nuestra Asesoría en Terreno
            </h3>
            <span className="accent-line !bg-sand" />
          </div>
          <p className="text-xs text-neutral-400 max-w-md font-light leading-relaxed uppercase tracking-wider">
            Fotografías de Gonzalo Gálvez en terreno analizando muestras de materiales, inspeccionando combinaciones cromáticas y supervisando el styling espacial de obras.
          </p>
        </div>

        {/* GRID DE GALERÍA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              src: '/images/estetica/gonzalo_terreno_1.webp',
              alt: 'Evaluación de paletas de madera y acabados en obra',
              title: 'Evaluación de Materiales',
              desc: 'Inspección de la veta, textura y coloración de maderas nobles en combinación con acabados en obra.'
            },
            {
              src: '/images/estetica/gonzalo_terreno_2.webp',
              alt: 'Supervisión de iluminación y ambientación en salón',
              title: 'Curaduría & Iluminación',
              desc: 'Planificación espacial de la luz y el styling del living para realzar el arte y el diseño interior.'
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

export default AsesoriaEsteticaSection;
