'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

interface Project {
  title: string;
  category: string;
  imageUrl: string;
}

export const PortfolioSection = () => {
  const projects: Project[] = [
    {
      title: 'CASA ENTRE ÁRBOLES',
      category: 'Construcción',
      imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'COCINA LO BARNECHEA',
      category: 'Remodelación',
      imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'QUINCHO LA DEHESA',
      category: 'Quincho',
      imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'TINY HOUSE FUGA',
      category: 'Tiny House',
      imageUrl: 'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <section
      id="proyectos"
      className="bg-[#0f0e0c] text-cream section-padding border-t border-border"
    >
      <div className="container-base flex flex-col xl:flex-row gap-12 xl:gap-16">
        
        {/* TITULO Y DESCRIPCION LATERAL */}
        <div className="w-full xl:w-1/4 shrink-0 flex flex-col justify-between items-start space-y-8">
          <div className="space-y-4">
            <span className="text-label text-sand font-bold block">PROYECTOS DESTACADOS</span>
            <h2 className="font-heading text-4xl lg:text-5xl font-extrabold text-cream tracking-wide uppercase leading-[0.9]">
              IDEAS QUE TOMAN FORMA.
            </h2>
            <span className="accent-line" />
            <p className="text-[11px] text-cream/50 uppercase tracking-widest leading-relaxed max-w-[280px] pt-2">
              Conoce una selección de nuestros proyectos más recientes y destacados.
            </p>
          </div>

          <div className="pt-4 hidden xl:block">
            <Button variant="outline" size="sm">
              Ver Todos Los Proyectos
            </Button>
          </div>
        </div>

        {/* TARJETAS DE PROYECTOS */}
        <div className="w-full xl:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative h-[380px] overflow-hidden border border-border cursor-pointer flex flex-col justify-end bg-stone-dark"
            >
              {/* Imagen del proyecto */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url("${project.imageUrl}")` }}
              />
              
              {/* Capa de overlay negra que se aclara/oscurece */}
              <div className="absolute inset-0 bg-gradient-card opacity-80 group-hover:opacity-90 transition-opacity duration-300 z-10" />

              {/* Contenido de la tarjeta */}
              <div className="relative z-20 p-6 space-y-1">
                <p className="text-[10px] text-sand font-bold tracking-widest uppercase">
                  {project.category}
                </p>
                <h3 className="font-heading text-xl font-extrabold text-cream tracking-wide uppercase group-hover:text-sand transition-colors duration-200">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Botón visible solo en mobile */}
        <div className="w-full text-center pt-4 xl:hidden">
          <Button variant="outline" className="w-full">
            Ver Todos Los Proyectos
          </Button>
        </div>

      </div>
    </section>
  );
};

export default PortfolioSection;
