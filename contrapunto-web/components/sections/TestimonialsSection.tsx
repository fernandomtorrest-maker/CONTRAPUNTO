'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Testimonial {
  quote: string;
  author: string;
  location: string;
  initials: string;
  rating: number;
  images?: string[];
}

const TestimonialCard = ({ testimonial, delay }: { testimonial: Testimonial; delay: number }) => {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const hasImages = testimonial.images && testimonial.images.length > 0;

  useEffect(() => {
    if (!hasImages || !testimonial.images) return;
    const interval = setInterval(() => {
      setCurrentImgIdx((prev) => (prev + 1) % (testimonial.images?.length || 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [hasImages, testimonial.images]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay }}
      className="bg-cream/40 border border-carbon/10 rounded-xl overflow-hidden flex flex-col justify-between hover:bg-cream/60 transition-all duration-300 shadow-sm hover:shadow-md"
    >
      <div>
        {/* GALERIA DEL PROYECTO */}
        {hasImages && testimonial.images && (
          <div className="relative w-full h-56 bg-carbon/5 overflow-hidden group">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImgIdx}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0"
              >
                <Image
                  src={testimonial.images[currentImgIdx]}
                  alt={`${testimonial.author} project view`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>
            </AnimatePresence>

            {/* Degradado superior */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

            {/* Puntos Indicadores */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {testimonial.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImgIdx(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    currentImgIdx === i ? 'bg-white w-3' : 'bg-white/50'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Badge de Proyecto */}
            <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-[10px] text-[#dfd5c6] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border border-white/10">
              Obra Realizada
            </span>
          </div>
        )}

        <div className="p-8 space-y-5">
          {/* ESTRELLAS GOOGLE */}
          <div className="flex items-center gap-1">
            {[...Array(testimonial.rating)].map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4 text-amber-500 fill-amber-500"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-[10px] text-carbon/40 font-bold uppercase tracking-wider ml-1">
              Google Review
            </span>
          </div>

          {/* CITA */}
          <p className="text-xs uppercase tracking-wide font-medium text-carbon/80 leading-relaxed relative">
            <span className="text-2xl font-serif text-carbon/25 block leading-none -mb-2">“</span>
            {testimonial.quote}
            <span className="text-2xl font-serif text-carbon/25 block leading-none text-right -mt-2">”</span>
          </p>
        </div>
      </div>

      {/* AUTOR INFO */}
      <div className="flex items-center gap-3 p-8 pt-4 border-t border-carbon/5 bg-carbon/5">
        <div className="w-10 h-10 rounded-full bg-carbon/10 border border-carbon/20 flex items-center justify-center font-heading text-xs font-bold text-carbon shrink-0">
          {testimonial.initials}
        </div>
        <div>
          <h4 className="font-heading text-sm font-extrabold text-carbon tracking-wider uppercase">
            {testimonial.author}
          </h4>
          <p className="text-[10px] text-carbon/50 uppercase tracking-widest font-semibold">
            {testimonial.location}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const TestimonialsSection = () => {
  const testimonials: Testimonial[] = [
    {
      quote: 'A finales del 2022 y durante el 2023, Constructora Contrapunto trabajó intensamente para dar vida a nuestro primer refugio en Welemu Tiny House y, posteriormente, nos apoyó en la habilitación de todo el complejo. Solo podemos expresar nuestro agradecimiento por su compromiso, calidad y responsabilidad. Estas cualidades, tan difíciles de encontrar juntas, marcaron una gran diferencia en nuestro proyecto. Recomendamos a Constructora Contrapunto totalmente.',
      author: 'Welemu Ecolodge',
      location: 'Valdivia',
      initials: 'WE',
      rating: 5,
      images: [
        '/images/testimonios/welemu_1.webp',
        '/images/testimonios/welemu_2.webp',
        '/images/testimonios/welemu_3.webp',
      ],
    },
    {
      quote: 'Excelente Servicio los recomiendo!!! Son muy puntuales, dan buenas recomendaciones para la compra de materiales y otra cosa que también valoré mucho es que fueron muy detallistas, amé cómo dejaron mi segundo piso.',
      author: 'María Paz',
      location: 'Santiago',
      initials: 'MP',
      rating: 5,
      images: [
        '/images/testimonios/mariapaz_1.webp',
      ],
    },
    {
      quote: 'El equipo se destaca por su responsabilidad, compromiso y enfoque en los objetivos. Además de mantener una comunicación constante entregando avances periódicos y cumplimos rigurosamente con los hitos y plazos establecidos.',
      author: 'Betsy Paulina',
      location: 'Santiago',
      initials: 'BP',
      rating: 5,
      images: [
        '/images/testimonios/betsy_1.webp',
      ],
    },
    {
      quote: '100% recomendable una empresa seria, responsable cumplieron con el proyecto en los plazos indicados, las terminaciones increíbles y lejos la mejor asesoría al momento de diseñar mi Hotel en el Sur de Chile.',
      author: 'Felipe Bustamante',
      location: 'Sur de Chile',
      initials: 'FB',
      rating: 5,
    },
    {
      quote: 'La mejor experiencia que he tenido en construcción!! Muy profesionales y dedicados en cuanto a construcción, presupuesto y cumplimiento de plazos. Recomiendo 100%.',
      author: 'Paola HV',
      location: 'Santiago',
      initials: 'PH',
      rating: 5,
    },
    {
      quote: 'Excelente servicio, muy comprometidos con sus proyectos',
      author: 'Carolina Alarcon',
      location: 'Santiago',
      initials: 'CA',
      rating: 5,
    },
    {
      quote: 'Excelente equipo, muy comprometidos y excelente trabajo',
      author: 'Angie Andrea Marchant Torres',
      location: 'Santiago',
      initials: 'AM',
      rating: 5,
    },
    {
      quote: 'Excelente servicio, muy profesional el equipo',
      author: 'rorro barz',
      location: 'Santiago',
      initials: 'RB',
      rating: 5,
    },
    {
      quote: 'Muy buenos equipos de trabajo especializados en distintas áreas',
      author: 'mc Idem Hip Hop Chileno',
      location: 'Santiago',
      initials: 'MI',
      rating: 5,
    },
    {
      quote: 'Excelente servicio ,Profecional en todo servicio',
      author: 'la fammily',
      location: 'Santiago',
      initials: 'LF',
      rating: 5,
    },
    {
      quote: 'Excelente servicio',
      author: 'Hanan Mussa',
      location: 'Santiago',
      initials: 'HM',
      rating: 5,
    },
  ];

  return (
    <section
      id="testimonios"
      className="bg-[#dfd5c6] text-carbon section-padding border-t border-carbon/5"
    >
      <div className="container-base flex flex-col xl:flex-row gap-12 xl:gap-16">
        
        {/* TITULO DE SECCION */}
        <div className="w-full xl:w-1/4 shrink-0 space-y-4">
          <span className="text-label text-carbon/50 font-bold block">TESTIMONIOS</span>
          <h2 className="font-heading text-4xl lg:text-5xl font-extrabold text-carbon tracking-wide uppercase leading-[0.9]">
            LO QUE DICEN NUESTROS CLIENTES.
          </h2>
          <span className="accent-line !bg-carbon/40" />
          <div className="pt-4 flex gap-2">
            <button
              onClick={() => {
                const carousel = document.getElementById('testimonials-carousel');
                if (carousel) carousel.scrollBy({ left: -carousel.clientWidth, behavior: 'smooth' });
              }}
              className="w-10 h-10 rounded-full border border-carbon/20 flex items-center justify-center hover:bg-carbon hover:text-[#dfd5c6] transition-colors"
              aria-label="Anterior"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button
              onClick={() => {
                const carousel = document.getElementById('testimonials-carousel');
                if (carousel) carousel.scrollBy({ left: carousel.clientWidth, behavior: 'smooth' });
              }}
              className="w-10 h-10 rounded-full border border-carbon/20 flex items-center justify-center hover:bg-carbon hover:text-[#dfd5c6] transition-colors"
              aria-label="Siguiente"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>

        {/* CARRUSEL DE TESTIMONIOS */}
        <div 
          id="testimonials-carousel"
          className="w-full xl:w-3/4 flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, pageIdx) => (
            <div key={pageIdx} className="w-full shrink-0 snap-center grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {testimonials.slice(pageIdx * 3, pageIdx * 3 + 3).map((t, idx) => (
                <TestimonialCard key={t.author} testimonial={t} delay={idx * 0.1} />
              ))}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;

