'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Volume2, Tv, Droplets, Sparkles, Music } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface AudioService {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  features: string[];
}

const audioServices: AudioService[] = [
  {
    id: 'terrazas-quinchos',
    title: 'Terrazas & Quinchos',
    description: 'Sistemas de audio exterior de alta definición y resistencia climática IP. Disfruta de un sonido envolvente y equilibrado al aire libre.',
    image: '/images/audio/audio_terrazas.webp',
    icon: <Volume2 className="h-6 w-6 text-sand" />,
    features: [
      'Resistencia IP66 a intemperie y rayos UV',
      'Altavoces mimetizados en madera o vigas',
      'Subwoofers enterrables de gran potencia',
      'Control de volumen independiente por zonas'
    ]
  },
  {
    id: 'hifi-cine',
    title: 'Cine en Casa & Hi-Fi',
    description: 'Salas de proyección dedicadas y audio estereofónico de la más alta fidelidad. Calibración acústica milimétrica para una inmersión absoluta.',
    image: '/images/audio/audio_hifi_cine.webp',
    icon: <Tv className="h-6 w-6 text-sand" />,
    features: [
      'Configuraciones Dolby Atmos y sonido envolvente',
      'Paneles de acondicionamiento acústico estético',
      'Calibración digital DSP según sala',
      'Equipos de alta gama con fidelidad audiófila'
    ]
  },
  {
    id: 'bano-spa',
    title: 'Zonas Húmedas & SPA',
    description: 'Altavoces empotrados resistentes a la humedad y el vapor. Convierte el cuarto de baño o jacuzzi en un santuario acústico de relajación.',
    image: '/images/audio/audio_bano.webp',
    icon: <Droplets className="h-6 w-6 text-sand" />,
    features: [
      'Resistencia al vapor, humedad y calor',
      'Diseño ultra-plano sin marco (invisibles)',
      'Instalación segura bajo normativa eléctrica',
      'Fácil conexión con dispositivos bluetooth'
    ]
  },
  {
    id: 'multiroom-invisible',
    title: 'Multi-room & Invisible',
    description: 'Sistemas centralizados para sonorizar toda la vivienda de forma oculta. Controla la música de cada habitación desde tu teléfono.',
    image: '/images/audio/audio_multiroom.webp',
    icon: <Sparkles className="h-6 w-6 text-sand" />,
    features: [
      'Altavoces 100% invisibles bajo yeso-cartón',
      'Control centralizado por App y teclados murales',
      'Zonificación para reproducir música distinta',
      'Integración con Spotify, Tidal y Apple Music'
    ]
  }
];

export const AudioResidencialSection = () => {
  return (
    <section
      id="audio-residencial"
      className="bg-[#0f0e0c] text-cream section-padding border-t border-border relative overflow-hidden"
    >
      {/* Fondo sutil de degradados */}
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-sand/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-1/3 top-1/3 w-72 h-72 bg-stone/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-base flex flex-col xl:flex-row gap-12 xl:gap-16 relative z-10">
        
        {/* PANEL INFORMATIVO LATERAL */}
        <div className="w-full xl:w-1/4 shrink-0 flex flex-col justify-between items-start space-y-8">
          <div className="space-y-6">
            <span className="text-label text-sand font-bold block uppercase tracking-widest">
              Audio de Alta Gama
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-cream tracking-wide uppercase leading-[0.95]">
              Sistemas de Audio Residencial
            </h2>
            <span className="accent-line !bg-sand" />
            <p className="text-xs uppercase tracking-wider text-cream/70 leading-relaxed font-semibold pt-2">
              Transformamos tu hogar en un escenario acústico perfecto. Soluciones integradas con la arquitectura, diseñadas por nuestro especialista del equipo, <span className="text-sand">Simon Plaza Manzo</span>.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row xl:flex-col gap-4 w-full">
            <Link href="/cotizar" className="w-full sm:w-auto xl:w-full">
              <Button className="w-full bg-sand text-carbon hover:bg-[#a38b72] font-bold tracking-widest uppercase text-xs py-4">
                Cotizar Asesoría de Audio
              </Button>
            </Link>
            <a
              href="https://wa.me/56966974560?text=Hola%20Contrapunto!%20Me%20interesa%20recibir%20asesor%C3%ADa%20sobre%20Sistemas%20de%20Audio%20Residencial."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto xl:w-full flex items-center justify-center gap-2 border border-white/10 hover:border-sand/40 hover:bg-white/[0.02] text-cream hover:text-sand py-3 px-6 rounded-md font-bold uppercase tracking-widest text-[10px] transition-all"
            >
              <Music className="h-4 w-4" />
              Escribir por WhatsApp
            </a>
          </div>
        </div>

        {/* CUADRÍCULA DE POSIBILIDADES */}
        <div className="w-full xl:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-8">
          {audioServices.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="group border border-white/10 hover:border-sand/30 bg-stone-dark/40 hover:bg-stone-dark/70 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl"
            >
              {/* Imagen de portada */}
              <div className="relative w-full aspect-[3/2] overflow-hidden border-b border-white/5">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                {/* Overlay de degradado */}
                <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/20 to-transparent opacity-60" />
                
                {/* Icono flotante */}
                <div className="absolute top-4 left-4 h-10 w-10 border border-white/10 flex items-center justify-center bg-carbon/80 rounded-lg backdrop-blur-sm">
                  {service.icon}
                </div>
              </div>

              {/* Contenido descriptivo */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <h3 className="font-heading text-2xl font-extrabold text-cream uppercase tracking-wider group-hover:text-sand transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed font-light">
                    {service.description}
                  </p>
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
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* SECCIÓN DE GALERÍA DE PROYECTOS / SIMON EN ACCIÓN */}
      <div className="container-base mt-24 pt-16 border-t border-white/10 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="space-y-3">
            <span className="text-label text-sand font-bold block uppercase tracking-widest">
              Simon Plaza en Acción
            </span>
            <h3 className="font-heading text-3xl md:text-4xl font-extrabold uppercase text-cream tracking-wider">
              Nuestras Instalaciones en Terreno
            </h3>
            <span className="accent-line !bg-sand" />
          </div>
          <p className="text-xs text-neutral-400 max-w-md font-light leading-relaxed uppercase tracking-wider">
            Fotografías de Simon Plaza Manzo ejecutando e integrando soluciones acústicas de alta fidelidad, conexionado estructurado y montaje de parlantes en terreno.
          </p>
        </div>

        {/* GRID DE GALERÍA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              src: '/images/audio/simon_trabajando_1.webp',
              alt: 'Conexionado de racks y amplificadores Hi-Fi',
              title: 'Conexionado & Racks',
              desc: 'Instalación y peinado estructurado de cableado en rack de sonido de alta fidelidad.'
            },
            {
              src: '/images/audio/simon_trabajando_2.webp',
              alt: 'Ajuste de amplificación valvular y sonido estéreo',
              title: 'Calibración Hi-Fi',
              desc: 'Sintonización de etapas de potencia valvulares integradas a columnas estéreo.'
            },
            {
              src: '/images/audio/simon_trabajando_3.webp',
              alt: 'Instalación de parlante empotrado de cielo',
              title: 'Montaje de Cielo',
              desc: 'Instalación y anclaje de altavoces de cielo con acoplamiento acústico empotrado.'
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
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
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

export default AudioResidencialSection;
