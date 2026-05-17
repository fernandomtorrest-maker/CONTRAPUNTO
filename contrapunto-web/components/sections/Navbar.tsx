'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface NavbarProps {
  onQuoteOpen: () => void;
}

export const Navbar = ({ onQuoteOpen }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    { label: 'Inicio', href: '#inicio' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Proceso', href: '#proceso' },
    { label: 'Inversiones', href: '#inversiones' },
    { label: 'Testimonios', href: '#testimonios' },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 w-full z-40 transition-all duration-300 border-b',
          isScrolled
            ? 'bg-carbon/90 backdrop-blur-md py-4 border-border'
            : 'bg-transparent py-6 border-transparent'
        )}
      >
        <div className="container-base flex items-center justify-between">
          
          {/* LOGO VECTORIAL SVG */}
          <a href="#inicio" className="flex items-center gap-3 group focus-sand">
            {/* Isotipo: Tres barras verticales de la referencia */}
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-sand group-hover:text-cream transition-colors duration-300"
            >
              <rect x="3" y="10" width="3" height="12" fill="currentColor" />
              <rect x="9" y="4" width="3" height="18" fill="currentColor" />
              <rect x="15" y="8" width="3" height="14" fill="currentColor" />
              <rect x="21" y="12" width="3" height="10" fill="currentColor" />
            </svg>
            
            {/* Logotipo */}
            <div className="flex flex-col">
              <span className="font-heading text-lg font-extrabold text-cream tracking-widest leading-none">
                CONSTRUCTORA
              </span>
              <span className="font-heading text-[11px] font-bold text-sand tracking-[0.27em] leading-none mt-0.5 uppercase">
                Contrapunto
              </span>
            </div>
          </a>

          {/* MENÚ DESKTOP */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-semibold text-cream/70 hover:text-sand tracking-widest uppercase transition-colors focus-sand"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* BOTÓN DE ACCIÓN DESKTOP */}
          <div className="hidden md:block">
            <Button variant="outline" size="sm" onClick={onQuoteOpen}>
              Cotizar Proyecto
            </Button>
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
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-heading text-3xl font-bold text-cream hover:text-sand uppercase tracking-wider py-2 border-b border-border transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="space-y-4">
              <Button
                variant="primary"
                className="w-full text-center"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onQuoteOpen();
                }}
              >
                Cotizar Proyecto
              </Button>
              <p className="text-[10px] text-cream/40 text-center uppercase tracking-widest">
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
