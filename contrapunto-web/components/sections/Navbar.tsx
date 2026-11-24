'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';

interface SubServiceItem {
  title: string;
  description: string;
  href: string;
  badge?: string;
}

const serviceSublinks: SubServiceItem[] = [
  {
    title: 'Tarifario & Partidas Express',
    description: 'Valores de mercado para instalaciones, pisos, climatización, gasfitería y armado.',
    href: '/servicios',
    badge: 'Nuevo'
  },
  {
    title: 'Obras & Remodelaciones',
    description: 'Construcción llave en mano, ampliaciones, quinchos y arquitectura a medida.',
    href: '/#servicios'
  },
  {
    title: 'Mantenimiento Integral',
    description: 'Planes preventivos y correctivos para edificios, condominios y empresas.',
    href: '/mantenimiento'
  },
  {
    title: 'Inspección Técnica (ITO)',
    description: 'Revisión minuciosa de calidad y fallas normativas para recepción de inmuebles.',
    href: '/inspeccion-tecnica'
  }
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setIsServicesDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsServicesDropdownOpen(false);
    }, 200);
  };

  const mainNavLinks = [
    { label: 'Inicio', href: '/' },
    // El ítem 'Servicios' se renderiza con su menú desplegable
    { label: 'Proyectos', href: '/#proyectos' },
    { label: 'Catálogo', href: '/catalogo' },
    { label: 'Concepto', href: '/#concepto-arquitectonico' },
    { label: 'Nosotros', href: '/#nosotros' },
    { label: 'Contacto', href: '/#contacto' },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 w-full z-40 transition-all duration-300 border-b',
          isScrolled
            ? 'bg-carbon/95 backdrop-blur-md py-3 border-border shadow-xl shadow-black/40'
            : 'bg-transparent py-5 border-transparent'
        )}
      >
        <div className="container-base flex items-center justify-between">

          {/* LOGO CORPORATIVO */}
          <Link href="/" className="flex items-center gap-3 group focus-sand">
            <div className="relative w-28 h-16 md:w-32 md:h-18 transition-transform duration-300 group-hover:scale-[1.02]">
              <Image
                src="/logo.png"
                alt="Constructora Contrapunto"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* MENÚ DESKTOP ESPACIOSO Y HOLGADO */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link
              href="/"
              className="text-[10px] lg:text-xs font-bold text-cream/80 hover:text-sand tracking-widest uppercase transition-colors whitespace-nowrap focus-sand"
            >
              Inicio
            </Link>

            {/* MENÚ DESPLEGABLE SERVICIOS */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                className="flex items-center gap-1.5 text-[10px] lg:text-xs font-bold text-cream/80 hover:text-sand tracking-widest uppercase transition-colors whitespace-nowrap focus-sand group outline-none py-2"
                aria-expanded={isServicesDropdownOpen}
              >
                <span>Servicios</span>
                <ChevronDown
                  className={cn(
                    'w-3.5 h-3.5 transition-transform duration-200 group-hover:text-sand',
                    isServicesDropdownOpen && 'rotate-180 text-sand'
                  )}
                />
              </button>

              {/* DROPDOWN FLOTANTE */}
              <AnimatePresence>
                {isServicesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 lg:w-96 bg-[#141210]/95 backdrop-blur-xl border border-white/15 rounded-xl shadow-2xl p-3 z-50 space-y-1"
                  >
                    {serviceSublinks.map((sublink) => (
                      <Link
                        key={sublink.title}
                        href={sublink.href}
                        onClick={() => setIsServicesDropdownOpen(false)}
                        className="group flex flex-col p-3 rounded-lg hover:bg-white/[0.05] border border-transparent hover:border-white/10 transition-all text-left"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-heading text-xs font-bold uppercase text-white group-hover:text-sand tracking-wider transition-colors flex items-center gap-1.5">
                            {sublink.title}
                            <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-sand" />
                          </span>
                          {sublink.badge && (
                            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 bg-sand/20 text-sand border border-sand/30 rounded-full">
                              {sublink.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-cream/60 leading-snug mt-1 group-hover:text-cream/80 transition-colors">
                          {sublink.description}
                        </p>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* RESTO DE ENLACES PRINCIPALES */}
            {mainNavLinks.slice(1).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[10px] lg:text-xs font-bold text-cream/80 hover:text-sand tracking-widest uppercase transition-colors whitespace-nowrap focus-sand"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* BOTÓN DE ACCIÓN DESKTOP */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/#inversiones">
              <Button
                size="sm"
                className="bg-sand text-carbon hover:bg-[#a38b72] font-bold tracking-widest uppercase text-[10px] whitespace-nowrap"
              >
                Invierte
              </Button>
            </Link>
            <Link href="/cotizar">
              <Button variant="outline" size="sm" className="whitespace-nowrap font-bold tracking-widest uppercase text-[10px]">
                Cotizar Proyecto
              </Button>
            </Link>
          </div>

          {/* BOTÓN MENÚ MÓVIL */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-cream p-1.5 focus:outline-none"
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* MENÚ MÓVIL PANTALLA COMPLETA */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-carbon pt-24 px-6 md:hidden flex flex-col justify-between pb-12 overflow-y-auto"
          >
            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-heading text-lg font-bold text-cream hover:text-sand uppercase tracking-wider py-2.5 border-b border-border transition-colors"
              >
                Inicio
              </Link>

              {/* Subservicios en Móvil */}
              <div className="py-2 border-b border-border space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-sand/80 block px-1">
                  Servicios Contrapunto
                </span>
                <div className="grid grid-cols-1 gap-1 pl-2">
                  {serviceSublinks.map((sub) => (
                    <Link
                      key={sub.title}
                      href={sub.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-sm font-semibold text-cream/90 hover:text-sand py-1.5 flex items-center justify-between"
                    >
                      <span>{sub.title}</span>
                      {sub.badge && (
                        <span className="text-[9px] px-2 py-0.5 bg-sand/20 text-sand rounded-full">
                          {sub.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>

              {mainNavLinks.slice(1).map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-heading text-lg font-bold text-cream hover:text-sand uppercase tracking-wider py-2.5 border-b border-border transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="space-y-4 pt-6">
              <Link href="/#inversiones" className="block w-full" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  className="w-full text-center bg-sand text-carbon hover:bg-[#a38b72] font-bold tracking-widest uppercase text-[10px]"
                >
                  Invierte con Contrapunto
                </Button>
              </Link>
              <Link href="/cotizar" className="block w-full" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full text-center"
                >
                  Cotizar Proyecto
                </Button>
              </Link>
              <p className="text-[10px] text-cream/60 text-center uppercase tracking-widest">
                Constructora Contrapunto © 2026
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
