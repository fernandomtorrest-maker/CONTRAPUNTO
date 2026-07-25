'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';
// import { useChat } from '@/components/ChatContext';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const { openChat } = useChat();

  // Controlar el cambio de fondo de la barra de navegación al hacer scroll
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

  const navLinks = [
    { label: 'Inicio', href: '/' },
    { label: 'Servicios', href: '/#servicios' },
    { label: 'Mantenimiento', href: '/mantenimiento' },
    { label: 'Proyectos', href: '/#proyectos' },
    { label: 'Catálogo', href: '/catalogo' },
    { label: 'Nosotros', href: '/#nosotros' },
    { label: 'Concepto de diseño', href: '/#concepto-arquitectonico' },
    { label: 'Contacto', href: '/#contacto' },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 w-full z-40 transition-all duration-300 border-b',
          isScrolled
            ? 'bg-carbon/90 backdrop-blur-md py-3 border-border'
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

          {/* MENÚ DESKTOP */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            {navLinks.map((link) => (
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
                Invierte con Contrapunto
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
            className="fixed inset-0 z-30 bg-carbon pt-24 px-6 md:hidden flex flex-col justify-between pb-12"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-heading text-xl font-bold text-cream hover:text-sand uppercase tracking-wider py-3 border-b border-border transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="space-y-4">
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
