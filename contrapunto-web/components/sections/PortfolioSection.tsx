'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  mainImage: string;
  images: string[];
}

const projects: Project[] = [
  {
    id: 'welemu',
    title: 'Welemu Tiny Houses',
    category: 'ECOLODGE / TINY HOUSE',
    location: 'Valdivia, Chile',
    description: 'Complejo de cabinas modulares integradas de manera sostenible en el bosque nativo valdiviano.',
    mainImage: '/images/testimonios/welemu_holding/19.webp',
    images: [
      '/images/testimonios/welemu_holding/1.webp',
      '/images/testimonios/welemu_holding/2.webp',
      '/images/testimonios/welemu_holding/3.webp',
      '/images/testimonios/welemu_holding/4.webp',
      '/images/testimonios/welemu_holding/5.webp',
      '/images/testimonios/welemu_holding/7.webp',
      '/images/testimonios/welemu_holding/8.webp',
      '/images/testimonios/welemu_holding/9.webp',
      '/images/testimonios/welemu_holding/10.webp',
      '/images/testimonios/welemu_holding/13.mp4',
      '/images/testimonios/welemu_holding/14.webp',
      '/images/testimonios/welemu_holding/15.webp',
      '/images/testimonios/welemu_holding/16.webp',
      '/images/testimonios/welemu_holding/17.webp',
      '/images/testimonios/welemu_holding/18.webp',
      '/images/testimonios/welemu_holding/19.webp',
      '/images/testimonios/welemu_holding/20.webp',
      '/images/testimonios/welemu_holding/21.webp',
      '/images/testimonios/welemu_holding/22.webp',
    ]
  },
  {
    id: 'pedro-fontova',
    title: 'Remodelacion Pedro Fontova',
    category: 'FLIPPING INMOBILIARIO',
    location: 'Santiago, Chile',
    description: 'Diseño y remodelación completa de espacios residenciales con instalación de piso vinilico, revestimiento de escalera, pintura y detalles arquitectonicos.',
    mainImage: '/images/testimonios/pedro_fontova_opt/pedro_opt_10.webp',
    images: [
      '/images/testimonios/pedro_fontova_opt/pedro_opt_1.webp',
      '/images/testimonios/pedro_fontova_opt/pedro_opt_2.webp',
      '/images/testimonios/pedro_fontova_opt/pedro_opt_3.webp',
      '/images/testimonios/pedro_fontova_opt/pedro_opt_4.webp',
      '/images/testimonios/pedro_fontova_opt/pedro_opt_5.webp',
      '/images/testimonios/pedro_fontova_opt/pedro_opt_6.webp',
      '/images/testimonios/pedro_fontova_opt/pedro_opt_7.webp',
      '/images/testimonios/pedro_fontova_opt/pedro_opt_8.webp',
      '/images/testimonios/pedro_fontova_opt/pedro_opt_9.webp',
      '/images/testimonios/pedro_fontova_opt/pedro_opt_10.webp',
      '/images/testimonios/pedro_fontova_opt/pedro_opt_11.webp',
      '/images/testimonios/pedro_fontova_opt/pedro_opt_12.webp',
      '/images/testimonios/pedro_fontova_opt/pedro_opt_13.webp',
    ]
  },
  {
    id: 'cabanis-pirque',
    title: 'Remodelacion cabañas Pirque',
    category: 'REMODELACION',
    location: 'Pirque, Chile',
    description: 'Renovación completa y ampliación de cabañas rústicas integradas en el entorno campestre de Pirque.',
    mainImage: '/images/testimonios/pirque_opt/pirque_opt_1.webp',
    images: [
      '/images/testimonios/pirque_opt/pirque_opt_1.webp',
      '/images/testimonios/pirque_opt/pirque_opt_2.webp',
      '/images/testimonios/pirque_opt/pirque_opt_3.webp',
      '/images/testimonios/pirque_opt/pirque_opt_4.webp',
      '/images/testimonios/pirque_opt/pirque_opt_5.webp',
      '/images/testimonios/pirque_opt/pirque_opt_6.webp',
      '/images/testimonios/pirque_opt/pirque_opt_7.webp',
    ]
  }
];

export const PortfolioSection = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  const openLightbox = (project: Project) => {
    setActiveProject(project);
    setCurrentImgIdx(0);
  };

  const closeLightbox = () => {
    setActiveProject(null);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeProject) return;
    setCurrentImgIdx((prev) => (prev + 1) % activeProject.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeProject) return;
    setCurrentImgIdx((prev) => (prev - 1 + activeProject.images.length) % activeProject.images.length);
  };

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
              Explora una selección de nuestras obras e intervenciones más importantes, caracterizadas por su diseño premium y calidad de ejecución.
            </p>
          </div>

          <div className="pt-4 hidden xl:block">
            <a href="https://www.instagram.com/contrapuntoconstructora/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                Seguir en Instagram
              </Button>
            </a>
          </div>
        </div>

        {/* REJILLA DE PROYECTOS (3 COLUMNAS) */}
        <div className="w-full xl:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => openLightbox(project)}
                className="group flex flex-col bg-[#161512] border border-border/40 hover:border-sand/40 transition-all duration-300 rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-black/60"
              >
                {/* Contenedor de Imagen */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-dark">
                  <Image
                    src={project.mainImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Tag de Categoría */}
                  <span className="absolute top-4 left-4 bg-sand/90 text-carbon font-extrabold tracking-widest text-[9px] uppercase px-3 py-1 rounded">
                    {project.category}
                  </span>

                  {/* Cantidad de fotos (si tiene más de 1) */}
                  {project.images.length > 1 && (
                    <span className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-cream font-bold text-[9px] uppercase px-2.5 py-1 rounded flex items-center gap-1 border border-white/10">
                      <span>{project.images.length} fotos</span>
                    </span>
                  )}

                  {/* Overlay Hover */}
                  <div className="absolute inset-0 bg-carbon/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-sand text-carbon font-bold text-xs uppercase tracking-widest px-4 py-2.5 rounded shadow-xl flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <Eye size={14} /> Ver Galería
                    </span>
                  </div>
                </div>

                {/* Contenido de texto */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-[9px] text-sand/80 font-bold uppercase tracking-widest">
                      <MapPin size={10} className="shrink-0" />
                      <span>{project.location}</span>
                    </div>
                    <h3 className="font-heading text-base font-extrabold uppercase text-cream tracking-wide group-hover:text-sand transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-[11px] text-cream/60 leading-relaxed pt-1">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border/30 mt-4 flex justify-between items-center text-[10px] text-sand font-bold tracking-widest uppercase group-hover:text-sand-light transition-colors">
                    <span>Explorar detalles</span>
                    <span>→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Botón visible solo en mobile */}
        <div className="w-full text-center pt-4 xl:hidden">
          <a href="https://www.instagram.com/contrapuntoconstructora/" target="_blank" rel="noopener noreferrer" className="block w-full">
            <Button variant="outline" className="w-full">
              Seguir en Instagram
            </Button>
          </a>
        </div>

      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6 backdrop-blur-md cursor-zoom-out"
          >
            {/* Cabecera del Lightbox */}
            <div className="flex justify-between items-center w-full max-w-6xl mx-auto py-2 z-10">
              <div>
                <span className="text-[9px] font-extrabold text-sand uppercase tracking-[0.2em]">
                  {activeProject.category}
                </span>
                <h4 className="font-heading text-lg sm:text-xl font-extrabold text-cream uppercase tracking-wide">
                  {activeProject.title}
                </h4>
              </div>

              <button
                onClick={closeLightbox}
                className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-cream/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                aria-label="Cerrar galería"
              >
                <X size={20} />
              </button>
            </div>

            {/* Visualizador Principal de Imagen */}
            <div className="relative w-full max-w-4xl mx-auto aspect-[4/3] sm:aspect-[16/10] max-h-[70vh] flex items-center justify-center my-auto">
              <div
                className="relative w-full h-full overflow-hidden rounded-xl border border-white/5 bg-[#0a0a09]"
                onClick={(e) => e.stopPropagation()}
              >
                {activeProject.images[currentImgIdx].endsWith('.mp4') ? (
                  <video
                    src={activeProject.images[currentImgIdx]}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Image
                    src={activeProject.images[currentImgIdx]}
                    alt={`${activeProject.title} - Imagen ${currentImgIdx + 1}`}
                    fill
                    priority
                    className="object-contain"
                  />
                )}

                {/* Controles de navegación de imagen (si hay más de una) */}
                {activeProject.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/80 border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer"
                      aria-label="Imagen anterior"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/80 border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer"
                      aria-label="Siguiente imagen"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}

                {/* Contador de fotos en el visualizador */}
                {activeProject.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10 text-[10px] font-bold tracking-widest text-cream/90 uppercase">
                    {currentImgIdx + 1} / {activeProject.images.length}
                  </div>
                )}
              </div>
            </div>

            {/* Miniaturas de navegación (solo si hay más de 1 imagen) */}
            {activeProject.images.length > 1 && (
              <div
                className="w-full max-w-4xl mx-auto flex justify-center gap-2 overflow-x-auto py-4 z-10"
                onClick={(e) => e.stopPropagation()}
              >
                {activeProject.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImgIdx(idx)}
                    className={`relative w-16 h-12 rounded-md overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${currentImgIdx === idx ? 'border-sand scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                  >
                    {img.endsWith('.mp4') ? (
                      <div className="w-full h-full bg-[#161512] flex flex-col items-center justify-center text-sand text-[9px] font-bold uppercase gap-1">
                        <span className="text-[12px]">▶</span>
                        <span>Video</span>
                      </div>
                    ) : (
                      <Image
                        src={img}
                        alt={`Miniatura ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioSection;
