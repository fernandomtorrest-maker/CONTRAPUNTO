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
        '/images/testimonios/welemu_1.jpg',
        '/images/testimonios/welemu_2.jpg',
        '/images/testimonios/welemu_3.jpg',
      ],
    },
    {
      quote: 'Excelente Servicio los recomiendo!!! Son muy puntuales, dan buenas recomendaciones para la compra de materiales y otra cosa que también valoré mucho es que fueron muy detallistas, amé cómo dejaron mi segundo piso.',
      author: 'María Paz',
      location: 'Santiago',
      initials: 'MP',
      rating: 5,
      images: [
        '/images/testimonios/mariapaz_1.jpg',
      ],
    },
    {
      quote: 'El equipo se destaca por su responsabilidad, compromiso y enfoque en los objetivos. Además de mantener una comunicación constante entregando avances periódicos y cumplimos rigurosamente con los hitos y plazos establecidos.',
      author: 'Betsy Paulina',
      location: 'Santiago',
      initials: 'BP',
      rating: 5,
      images: [
        '/images/testimonios/betsy_1.jpg',
      ],
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
        </div>

        {/* GRID DE TESTIMONIOS */}
        <div className="w-full xl:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <TestimonialCard key={t.author} testimonial={t} delay={idx * 0.1} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;

