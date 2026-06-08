'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

const team: TeamMember[] = [
  {
    id: 'nicole-marchant',
    name: 'Nicole Marchant',
    role: 'Gerente Comercial',
    image: '/images/equipo/nicole_marchant.png',
  },
  {
    id: 'fernando-torres',
    name: 'Fernando Torres',
    role: 'Jefe de Proyectos',
    image: '/images/equipo/fernando_torres.png',
  },
  {
    id: 'diego-stankovsky',
    name: 'Diego Stankovsky',
    role: 'Inspector Técnico de Obras',
    image: '/images/equipo/diego_stankovsky.png',
  },
  {
    id: 'matias-torres',
    name: 'Matias Torres',
    role: 'Psicologo Organizacional',
    image: '/images/equipo/matias_torres.png',
  },
  {
    id: 'simon-plaza',
    name: 'Simon Plaza Manzo',
    role: 'Diseñador de Sistemas de Audio Residencial',
    image: '/images/equipo/simon_plaza.png',
  }
];

export const NosotrosSection = () => {
  return (
    <section id="nosotros" className="bg-carbon text-cream section-padding border-t border-white/5 relative overflow-hidden">
      {/* Elemento gráfico de fondo */}
      <div className="absolute left-0 top-1/4 w-96 h-96 bg-sand/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-base space-y-16 relative z-10">
        
        {/* CABECERA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <span className="text-label text-sand font-bold block uppercase tracking-widest">
              Quiénes Somos
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-wide uppercase leading-none">
              NUESTRO EQUIPO
            </h2>
            <span className="accent-line !bg-sand" />
            <p className="text-xs uppercase tracking-wider text-cream/70 leading-relaxed font-semibold pt-2">
              Conoce a los profesionales detrás de Constructora Contrapunto, comprometidos con la excelencia y la ejecución de cada proyecto.
            </p>
          </div>
        </div>

        {/* GRID DE EQUIPO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group flex flex-col items-center text-center space-y-4"
            >
              <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-white/5 border border-white/10 group-hover:border-sand/40 transition-colors duration-300 shadow-lg">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                  className={`object-cover transition-transform duration-700 group-hover:scale-105 grayscale ${
                    member.id !== 'simon-plaza' ? 'group-hover:grayscale-0' : ''
                  }`}
                />
                {/* Degradado inferior sutil */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-carbon/80 to-transparent pointer-events-none" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-extrabold text-cream uppercase tracking-wider transition-colors group-hover:text-sand">
                  {member.name}
                </h3>
                <p className="text-[10px] text-sand/80 font-bold uppercase tracking-widest mt-1">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default NosotrosSection;
