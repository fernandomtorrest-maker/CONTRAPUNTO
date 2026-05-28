'use client';

import React from 'react';
import { Phone, Mail, MapPin, Link } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-carbon text-cream/70 border-t border-border py-12 md:py-16">
      <div className="container-base space-y-12">
        
        {/* FILA SUPERIOR: Logo + Contacto + Redes */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-8 border-b border-border">
          
          {/* Logo Corporativo */}
          <div className="flex items-center gap-3">
            <div className="relative w-32 h-24">
              <img
                src="/logo.png"
                alt="Constructora Contrapunto"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Información de Contacto */}
          <div className="flex flex-col sm:flex-row gap-6 md:gap-8 text-xs uppercase tracking-wider font-semibold">
            <a
              href="tel:+56912345678"
              className="flex items-center gap-2.5 hover:text-sand transition-colors"
            >
              <Phone size={14} className="text-sand shrink-0" />
              <span>+56 9 1234 5678</span>
            </a>
            <a
              href="mailto:hola@constructoracontrapunto.cl"
              className="flex items-center gap-2.5 hover:text-sand transition-colors"
            >
              <Mail size={14} className="text-sand shrink-0" />
              <span className="lowercase">hola@constructoracontrapunto.cl</span>
            </a>
            <div className="flex items-center gap-2.5">
              <MapPin size={14} className="text-sand shrink-0" />
              <span>Santiago, Chile</span>
            </div>
          </div>

          {/* Redes Sociales */}
          <div className="flex gap-4">
            <a
              href="#"
              className="w-9 h-9 border border-border flex items-center justify-center text-cream/60 hover:text-sand hover:border-sand transition-all"
              aria-label="Instagram"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href="#"
              className="w-9 h-9 border border-border flex items-center justify-center text-cream/60 hover:text-sand hover:border-sand transition-all"
              aria-label="Facebook"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-9 h-9 border border-border flex items-center justify-center text-cream/60 hover:text-sand hover:border-sand transition-all"
              aria-label="Sitio Web"
            >
              <Link size={16} strokeWidth={1.5} />
            </a>
          </div>

        </div>

        {/* FILA INFERIOR: Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-cream/60">
          <p>© {new Date().getFullYear()} Constructora Contrapunto. Todos los derechos reservados.</p>
          <div className="flex gap-6 font-semibold">
            <a href="#" className="hover:text-sand transition-colors">Políticas de Privacidad</a>
            <a href="#" className="hover:text-sand transition-colors">Términos de Servicio</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
