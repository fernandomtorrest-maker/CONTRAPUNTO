'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Eye, 
  Grid, 
  BookOpen,
  ZoomIn,
  X 
} from 'lucide-react';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';

// Generate list of 24 pages
const totalPages = 24;
const catalogPages = Array.from({ length: totalPages }, (_, i) => ({
  pageNumber: i + 1,
  src: `/images/catalogo/page_${i + 1}.webp`
}));

export default function CatalogoPage() {
  const [currentPageIdx, setCurrentPageIdx] = useState(0);
  const [viewMode, setViewMode] = useState<'reader' | 'grid'>('reader');
  const [isZoomed, setIsZoomed] = useState(false);

  const nextPage = () => {
    setCurrentPageIdx((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPageIdx((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <div className="relative min-h-screen bg-[#0f0e0c] text-cream overflow-hidden selection:bg-sand selection:text-carbon font-body">
      {/* Navbar */}
      <Navbar />

      {/* HEADER HERO */}
      <section className="relative pt-32 pb-12 border-b border-white/5 bg-[#0f0e0c]">
        <div className="container-base max-w-7xl px-6 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-4">
              <span className="text-xs font-bold text-sand uppercase tracking-[0.2em] block">
                DISEÑO, CONSTRUCCIÓN Y OFICIO.
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase text-white tracking-tight leading-none">
                CATÁLOGO<br />DE DISEÑOS.
              </h1>
              <p className="text-sm text-cream/70 leading-relaxed max-w-lg">
                Explora el catálogo "Partituras para Habitar" con nuestra filosofía de diseño,
                nuestras obras y composiciones arquitectónicas.
              </p>
            </div>

            {/* Acciones de Cabecera */}
            <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
              {/* Selector de Vista */}
              <div className="flex bg-[#161512] border border-white/10 p-1 rounded-lg">
                <button
                  onClick={() => setViewMode('reader')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-colors ${
                    viewMode === 'reader'
                      ? 'bg-sand text-carbon'
                      : 'text-cream/60 hover:text-white'
                  }`}
                >
                  <BookOpen size={14} /> Modo Lector
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-sand text-carbon'
                      : 'text-cream/60 hover:text-white'
                  }`}
                >
                  <Grid size={14} /> Vista Mosaico
                </button>
              </div>

              {/* Descargar PDF */}
              <a
                href="/images/Catalogo 1 Contrapunto.pdf"
                download="Catalogo 1 Contrapunto.pdf"
                className="flex items-center gap-2 px-5 py-3 border border-sand/40 hover:bg-sand hover:text-carbon text-sand text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded-lg cursor-pointer"
              >
                <Download size={14} /> Descargar PDF (12 MB)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENIDO PRINCIPAL */}
      <section className="py-12 bg-[#0c0c0a] min-h-[60vh] flex items-center justify-center">
        <div className="container-base max-w-6xl px-6 md:px-8 w-full">
          
          {/* MODO LECTOR */}
          {viewMode === 'reader' && (
            <div className="flex flex-col items-center gap-8">
              
              {/* Contenedor del Libro */}
              <div className="relative w-full max-w-xl aspect-[1191/1685] bg-[#12110e] border border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-black/80 flex items-center justify-center group select-none">
                
                {/* Página en visualización */}
                <div 
                  className="relative w-full h-full cursor-zoom-in"
                  onClick={() => setIsZoomed(true)}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPageIdx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={catalogPages[currentPageIdx].src}
                        alt={`Catálogo - Página ${currentPageIdx + 1}`}
                        fill
                        priority
                        className="object-contain"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Botones de Navegación Lateral (Desktop Hover) */}
                <button
                  onClick={prevPage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 border border-white/10 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 cursor-pointer shadow-lg"
                  aria-label="Página anterior"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={nextPage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 border border-white/10 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 cursor-pointer shadow-lg"
                  aria-label="Siguiente página"
                >
                  <ChevronRight size={22} />
                </button>

                {/* Overlay Zoom Indicator on hover */}
                <div 
                  className="absolute bottom-4 right-4 bg-black/75 border border-white/10 p-2.5 rounded-full text-sand opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-lg hover:scale-105"
                  onClick={() => setIsZoomed(true)}
                >
                  <ZoomIn size={16} />
                </div>
              </div>

              {/* Barra de Control Inferior */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-xl justify-between border-t border-white/5 pt-4">
                {/* Indicador de Página */}
                <div className="text-xs uppercase tracking-widest font-bold text-cream/60">
                  Página <span className="text-sand font-extrabold">{currentPageIdx + 1}</span> de {totalPages}
                </div>

                {/* Controles del Lector */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={prevPage}
                    className="px-4 py-2 border border-white/15 hover:bg-[#161512] hover:text-white rounded-md text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Anterior
                  </button>
                  <button
                    onClick={nextPage}
                    className="px-4 py-2 border border-white/15 hover:bg-[#161512] hover:text-white rounded-md text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Siguiente
                  </button>
                </div>
              </div>

              {/* Tira de Miniaturas Rápidas */}
              <div className="w-full max-w-3xl flex gap-2.5 overflow-x-auto py-2.5 scrollbar-thin scrollbar-thumb-white/10">
                {catalogPages.map((page, idx) => (
                  <button
                    key={page.pageNumber}
                    onClick={() => setCurrentPageIdx(idx)}
                    className={`relative w-14 aspect-[1191/1685] rounded border-2 overflow-hidden transition-all shrink-0 cursor-pointer ${
                      currentPageIdx === idx 
                        ? 'border-sand scale-105 ring-2 ring-sand/20' 
                        : 'border-transparent opacity-50 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={page.src}
                      alt={`Miniatura ${page.pageNumber}`}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

            </div>
          )}

          {/* MODO MOSAICO (GRID) */}
          {viewMode === 'grid' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
            >
              {catalogPages.map((page, idx) => (
                <div
                  key={page.pageNumber}
                  onClick={() => {
                    setCurrentPageIdx(idx);
                    setViewMode('reader');
                  }}
                  className="group flex flex-col bg-[#12110e] border border-border/40 hover:border-sand/40 transition-all duration-300 rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-black/60 relative"
                >
                  {/* Imagen Miniatura */}
                  <div className="relative aspect-[1191/1685] w-full overflow-hidden bg-stone-dark">
                    <Image
                      src={page.src}
                      alt={`Catálogo - Página ${page.pageNumber}`}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 15vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-103"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-carbon/60 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="bg-sand text-carbon font-extrabold text-[9px] uppercase tracking-widest px-3 py-2 rounded shadow-xl flex items-center gap-1">
                        <Eye size={12} /> Lector
                      </span>
                    </div>
                  </div>

                  {/* Detalle inferior */}
                  <div className="p-3 text-center border-t border-border/20">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-cream/50">
                      Página {page.pageNumber}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

        </div>
      </section>

      {/* LIGHTBOX ZOOM MODAL */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 z-50 bg-black/98 flex flex-col justify-between p-4 sm:p-6 backdrop-blur-md cursor-zoom-out"
          >
            {/* Header del modal */}
            <div className="flex justify-between items-center w-full max-w-4xl mx-auto py-2 z-10">
              <span className="text-[10px] font-extrabold text-sand uppercase tracking-[0.2em]">
                Catálogo de Diseños — Ampliado
              </span>
              
              <button
                onClick={() => setIsZoomed(false)}
                className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-cream/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                aria-label="Cerrar vista ampliada"
              >
                <X size={20} />
              </button>
            </div>

            {/* Imagen Ampliada */}
            <div className="relative w-full max-w-4xl mx-auto aspect-[1191/1685] max-h-[82vh] flex items-center justify-center my-auto">
              <div 
                className="relative w-full h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={catalogPages[currentPageIdx].src}
                  alt={`Página Ampliada ${currentPageIdx + 1}`}
                  fill
                  priority
                  className="object-contain"
                />

                {/* Controles de Lado a Lado */}
                <button
                  onClick={(e) => { e.stopPropagation(); prevPage(); }}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/95 border border-white/15 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextPage(); }}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/95 border border-white/15 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>

            {/* Footer del Modal */}
            <div className="text-center pb-2 z-10">
              <span className="text-xs uppercase tracking-widest font-bold text-cream/60">
                Página <span className="text-sand font-extrabold">{currentPageIdx + 1}</span> de {totalPages}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </div>
  );
}
