'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, FileSearch, Compass, HardHat, ShieldCheck } from 'lucide-react';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const ProcessSection = () => {
  const steps: ProcessStep[] = [
    {
      number: '01',
      title: 'REUNIÓN INICIAL',
      description: 'Conocemos tu idea, necesidades y presupuesto.',
      icon: <Users size={20} strokeWidth={1.5} />,
    },
    {
      number: '02',
      title: 'EVALUACIÓN Y PRESUPUESTO',
      description: 'Analizamos el proyecto y entregamos una propuesta detallada.',
      icon: <FileSearch size={20} strokeWidth={1.5} />,
    },
    {
      number: '03',
      title: 'DISEÑO Y PLANIFICACIÓN',
      description: 'Desarrollamos el diseño y planificamos cada etapa.',
      icon: <Compass size={20} strokeWidth={1.5} />,
    },
    {
      number: '04',
      title: 'CONSTRUCCIÓN',
      description: 'Ejecutamos con precisión, cumpliendo plazos y estándares.',
      icon: <HardHat size={20} strokeWidth={1.5} />,
    },
    {
      number: '05',
      title: 'ENTREGA FINAL',
      description: 'Revisamos cada detalle y entregamos un resultado impecable.',
      icon: <ShieldCheck size={20} strokeWidth={1.5} />,
    },
  ];

  return (
    <section
      id="proceso"
      className="bg-[#1a1916] text-cream section-padding border-t border-border"
    >
      <div className="container-base flex flex-col xl:flex-row gap-12 xl:gap-16">
        
        {/* TITULO SECCION LATERAL */}
        <div className="w-full xl:w-1/4 shrink-0 space-y-4">
          <span className="text-label text-sand font-bold block">NUESTRO PROCESO</span>
          <h2 className="font-heading text-4xl lg:text-5xl font-extrabold text-cream tracking-wide uppercase leading-[0.9]">
            UN PROCESO CLARO Y ORDENADO.
          </h2>
          <span className="accent-line" />
        </div>

        {/* TIMELINE FLUIDO HORIZONTAL */}
        <div className="w-full xl:w-3/4 flex flex-col md:flex-row md:justify-between gap-8 relative">
          
          {/* Línea horizontal conectora detrás (solo en desktop/tablet) */}
          <div className="hidden md:block absolute top-[52px] left-[5%] right-[5%] h-[1px] bg-border-light z-0" />

          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex-1 flex flex-col items-center md:items-start text-center md:text-left relative z-10 space-y-4 group"
            >
              {/* Círculo indicador con número e ícono */}
              <div className="flex items-center gap-4">
                {/* Contenedor del Icono */}
                <div className="w-12 h-12 border border-border bg-[#1a1916] text-sand flex items-center justify-center rounded-none group-hover:border-sand group-hover:text-cream transition-all duration-300">
                  {step.icon}
                </div>
                
                {/* Número */}
                <span className="font-heading text-xs font-bold text-cream/60 tracking-widest block uppercase">
                  {step.number}
                </span>
              </div>

              {/* Contenido descriptivo */}
              <div className="space-y-1">
                <h3 className="font-heading text-sm font-extrabold text-cream tracking-wider uppercase group-hover:text-sand transition-colors duration-200">
                  {step.title}
                </h3>
                <p className="text-[11px] text-cream/50 uppercase tracking-wide leading-relaxed max-w-[180px]">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default ProcessSection;
