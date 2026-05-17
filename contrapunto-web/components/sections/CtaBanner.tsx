'use client';

import React from 'react';
import { MessageSquare, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface CtaBannerProps {
  onQuoteOpen: () => void;
}

export const CtaBanner = ({ onQuoteOpen }: CtaBannerProps) => {
  return (
    <section className="relative bg-carbon text-cream py-20 md:py-24 border-t border-border overflow-hidden">
      {/* Imagen de fondo arquitectónica de lujo con opacidad baja */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 z-0 scale-105"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80")',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/80 to-carbon z-0" />

      <div className="container-base relative z-10 text-center max-w-3xl space-y-8">
        <div className="space-y-3">
          <span className="text-label text-sand font-bold">¿TIENES UN PROYECTO EN MENTE?</span>
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-cream tracking-wide uppercase leading-none">
            Hablemos y hagámoslo realidad.
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="primary"
            size="lg"
            onClick={onQuoteOpen}
            className="w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <span>Cotizar Proyecto</span>
            <ArrowRight size={14} />
          </Button>
          
          <a
            href="https://wa.me/56912345678"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto flex items-center justify-center gap-2 border-cream/20 hover:border-sand"
            >
              <MessageSquare size={16} strokeWidth={1.5} className="text-sand" />
              <span>Escríbenos por WhatsApp</span>
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
