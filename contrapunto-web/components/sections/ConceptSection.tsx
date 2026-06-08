'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ConceptSection = () => {
  const [activeVoice, setActiveVoice] = useState<'social' | 'privada' | 'articulacion'>('social');

  const voices = {
    social: {
      title: 'Voz A',
      character: 'Fluida, abierta, continua',
      spaces: 'Living, Comedor, Cocina',
      rule: 'Espacios conectados visual y físicamente. Pocos cortes, ritmo largo (menos muros, más continuidad).',
      bg: 'bg-sand/10 border-sand/30',
      textColor: 'text-sand',
    },
    articulacion: {
      title: 'Voz B',
      character: 'Bisagra, pausa musical',
      spaces: 'Pasillo habitable, Hall, Patio interior, Mueble fijo de recorrido',
      rule: 'Esta voz no domina, pero ordena el diálogo. Actúa como transición con sentido, no como pasillo muerto.',
      bg: 'bg-[#8d775f]/10 border-[#8d775f]/30',
      textColor: 'text-[#8d775f]',
    },
    privada: {
      title: 'Voz C',
      character: 'Rítmica, fragmentada, silenciosa',
      spaces: 'Dormitorio Principal, Dormitorios secundarios, Baños',
      rule: 'Autonomía. Repetición y métrica (módulos similares). Mayor control acústico y visual.',
      bg: 'bg-amber-500/10 border-amber-500/30',
      textColor: 'text-amber-500',
    },
  };

  return (
    <section
      id="concepto-arquitectonico"
      className="bg-carbon text-cream section-padding border-t border-white/5 relative overflow-hidden"
    >
      {/* Elemento gráfico de fondo */}
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-sand/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-base space-y-16 relative z-10">

        {/* CABECERA DE SECCIÓN */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-wide uppercase leading-tight text-sand">
              De la partitura al plano,<br />del plano a tu hogar
            </h2>
            <span className="accent-line !bg-sand" />
            <p className="text-xs uppercase tracking-wider text-cream/70 leading-relaxed font-semibold">
              La arquitectura y la música comparten una lógica profunda: ambas organizan relaciones.
              En música, el contrapunto no mezcla las voces: las coordina. Así diseñamos tu hogar.
            </p>
          </div>

          {/* BOTONES DE DOCUMENTACIÓN / ENLACES */}
          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 shrink-0 w-full md:w-auto">
            <a
              href="https://canva.link/oxbd7cly9eqcam2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-[10px] text-sand hover:text-sand-light uppercase tracking-widest font-bold border border-sand/30 hover:border-sand bg-sand/10 px-5 py-3.5 rounded-lg transition-all text-center"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z" />
              </svg>
              Catálogo de Obras
            </a>
          </div>
        </div>

        {/* CONTENIDO PRINCIPAL: LA METÁFORA DE LAS VOCES */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LADO IZQUIERDO: TABS DE VOCES */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-center lg:text-left text-cream/50 mb-4 lg:mb-6">
              Las 3 Líneas Melódicas del Hogar
            </h3>
            <div className="grid grid-cols-3 lg:flex lg:flex-col gap-3 lg:space-y-4">
              {(Object.keys(voices) as Array<keyof typeof voices>).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveVoice(key)}
                  className={`w-full text-center lg:text-left p-3 lg:p-6 rounded-xl border transition-all duration-300 flex flex-col items-center lg:items-start gap-1 lg:gap-2 ${activeVoice === key
                    ? `${voices[key].bg} shadow-md scale-[1.02]`
                    : 'border-white/5 hover:border-white/20 bg-white/[0.02]'
                    }`}
                >
                  <span className={`text-[8px] sm:text-[9px] lg:text-[10px] font-bold uppercase tracking-widest ${voices[key].textColor}`}>
                    {key === 'social' ? 'Voz A' : key === 'articulacion' ? 'Voz B' : 'Voz C'}
                  </span>
                  <h4 className="font-heading text-[10px] sm:text-sm lg:text-lg font-bold tracking-wide uppercase leading-none">
                    {key === 'social' ? 'Vida Social' : key === 'articulacion' ? 'Articulación' : 'Vida Privada'}
                  </h4>
                </button>
              ))}
            </div>
          </div>

          {/* LADO DERECHO: DETALLE DE VOZ SELECCIONADA */}
          <div className="lg:col-span-7 bg-white/[0.02] border border-white/5 p-6 lg:p-10 rounded-2xl min-h-[260px] lg:min-h-[320px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeVoice}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <span className={`text-[9px] lg:text-[10px] font-bold uppercase tracking-widest ${voices[activeVoice].textColor}`}>
                    {voices[activeVoice].title}
                  </span>
                  <h3 className="font-heading text-xl lg:text-3xl font-extrabold uppercase tracking-wide">
                    {activeVoice === 'social' ? 'Vida Social' : activeVoice === 'articulacion' ? 'Articulación' : 'Vida Privada'}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4 lg:gap-6 pt-4 border-t border-white/5">
                  <div className="space-y-1">
                    <span className="text-[9px] lg:text-[10px] text-cream/40 font-bold uppercase tracking-wider block">
                      Carácter / Ritmo
                    </span>
                    <p className="text-xs lg:text-sm font-semibold text-cream uppercase tracking-wide">
                      {voices[activeVoice].character}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] lg:text-[10px] text-cream/40 font-bold uppercase tracking-wider block">
                      Espacios Integrados
                    </span>
                    <p className="text-xs lg:text-sm font-semibold text-cream uppercase tracking-wide">
                      {voices[activeVoice].spaces}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <span className="text-[9px] lg:text-[10px] text-cream/40 font-bold uppercase tracking-wider block">
                    Regla Musical → Espacial
                  </span>
                  <p className="text-[10px] lg:text-xs text-cream/80 leading-relaxed uppercase tracking-wider font-semibold">
                    {voices[activeVoice].rule}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <p className="text-[9px] text-[#8d775f] font-bold uppercase tracking-widest mt-6 lg:mt-8">
              * El sentido de la vivienda emerge del diálogo armonioso entre ellas.
            </p>
          </div>

        </div>

        {/* SECCIÓN INFERIOR: LAS REGLAS DEL ACORDE */}
        <div className="pt-8 border-t border-white/5">
          <h3 className="text-xs font-bold uppercase tracking-widest text-center text-cream/50 mb-10">
            Las 3 Reglas que Forman el Acorde Arquitectónico
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/[0.01] border border-white/5 p-6 lg:p-8 rounded-xl space-y-3">
              <span className="text-3xl font-serif text-sand block">01</span>
              <h4 className="font-heading text-base font-extrabold uppercase tracking-wider">
                Independencia Funcional
              </h4>
              <p className="text-[10px] text-cream/60 leading-relaxed uppercase tracking-wider font-bold">
                Cada voz funciona sola. La zona privada puede cerrarse sin matar el dinamismo de la casa,
                y la zona social opera libremente sin invadir lo íntimo.
              </p>
            </div>

            <div className="bg-white/[0.01] border border-white/5 p-6 lg:p-8 rounded-xl space-y-3">
              <span className="text-3xl font-serif text-[#8d775f] block">02</span>
              <h4 className="font-heading text-base font-extrabold uppercase tracking-wider">
                Diferencia Formal
              </h4>
              <p className="text-[10px] text-cream/60 leading-relaxed uppercase tracking-wider font-bold">
                Cada línea se distingue visualmente: alturas de cielo diferenciadas, ritmos de ventanas distintos
                y materialidades contrastadas (ej. madera en área social, muros densos en área privada).
              </p>
            </div>

            <div className="bg-white/[0.01] border border-white/5 p-6 lg:p-8 rounded-xl space-y-3">
              <span className="text-3xl font-serif text-amber-500 block">03</span>
              <h4 className="font-heading text-base font-extrabold uppercase tracking-wider">
                Encuentros Conscientes
              </h4>
              <p className="text-[10px] text-cream/60 leading-relaxed uppercase tracking-wider font-bold">
                Los cruces de voces se acentúan deliberadamente a través de cambios de luz natural,
                transiciones de piso o elementos estructurales fijos como un mueble divisorio o un pilar de diseño.
              </p>
            </div>
          </div>
        </div>

        {/* SLOGAN FINAL */}
        <div className="text-center space-y-3 pt-6">
          <p className="font-heading text-lg sm:text-2xl lg:text-3xl font-extrabold uppercase tracking-widest text-[#8d775f] leading-normal">
            &ldquo;De la partitura al plano,<br />del plano a tu hogar&rdquo;
          </p>
          <p className="text-[10px] text-cream/50 uppercase tracking-widest font-semibold">
            Concepto de Composición y Distribución Exclusivo de Constructora Contrapunto
          </p>
        </div>

      </div>
    </section>
  );
};

export default ConceptSection;
