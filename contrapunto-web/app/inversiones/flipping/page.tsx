'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  TrendingUp, 
  Users2, 
  ShieldCheck, 
  Search, 
  Paintbrush, 
  LineChart, 
  ArrowRight, 
  CheckCircle2,
  Calendar,
  Layers,
  Award
} from 'lucide-react';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import { Button } from '@/components/ui/Button';

export default function FlippingPage() {
  return (
    <div className="relative min-h-screen bg-[#0f0e0c] text-cream overflow-hidden selection:bg-sand selection:text-carbon">
      {/* Navbar */}
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* Background Image overlay with Dark Gradient */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=2000&auto=format&fit=crop')`,
              opacity: 0.15 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e0c] via-[#0f0e0c]/90 to-transparent" />
          <div className="absolute inset-0 bg-radial-gradient(circle_at_center, transparent 30%, #0f0e0c 80%)" />
        </div>

        <div className="container-base relative z-10 w-full text-center max-w-4xl px-6">
          <motion.span 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.35em] uppercase text-sand font-bold block mb-4"
          >
            Invierte con Contrapunto
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-wide uppercase text-cream leading-[1.0] mb-6"
          >
            Oportunidades reales.<br />
            Resultados concretos.<br />
            <span className="text-sand">Construyamos valor juntos.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-sm md:text-base text-cream/70 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            A través de nuestro modelo de Flipping Inmobiliario, te invitamos a ser parte de proyectos con alto potencial de rentabilidad, gestionados de principio a fin por expertos.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="https://wa.me/56966974560?text=Hola%20Contrapunto!%20Quiero%20mas%20informacion%20sobre%20Flipping%20Inmobiliario" target="_blank" rel="noopener noreferrer">
              <Button variant="primary" className="w-full sm:w-auto px-8 py-4 font-bold flex items-center justify-center gap-3">
                Quiero Invertir <ArrowRight size={16} />
              </Button>
            </a>
            <a href="#detalles">
              <Button variant="outline" className="w-full sm:w-auto px-8 py-4 font-bold">
                Conoce Más
              </Button>
            </a>
          </motion.div>
        </div>

        {/* Indicator Arrow */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/40">
          <span className="text-[9px] uppercase tracking-[0.25em]">Desplazar</span>
          <div className="w-[1px] h-12 bg-border relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-sand animate-bounce" />
          </div>
        </div>
      </section>

      {/* FLIPPING INMOBILIARIO DETALLE */}
      <section id="detalles" className="bg-[#12110e] border-y border-border py-24 relative">
        <div className="container-base grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Columna Izquierda: Imagen del proyecto */}
          <div className="lg:col-span-5 relative group">
            <div className="absolute -inset-1.5 bg-sand/10 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000" />
            <div className="relative overflow-hidden rounded-xl border border-border aspect-[4/5] bg-stone-dark">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop"
                alt="Proyecto Flipping"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Columna Derecha: Información de Flipping */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sand">
                <Building2 size={20} />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em]">Flipping Inmobiliario</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-cream leading-tight uppercase">
                Compramos, mejoramos <br />
                y multiplicamos el valor.
              </h2>
              <span className="accent-line" />
              <p className="text-sm text-cream/70 leading-relaxed max-w-2xl">
                Detectamos propiedades estratégicamente seleccionadas por su potencial de aumento de valor, las adquirimos por debajo de su valor comercial, las renovamos con nuestro equipo de arquitectura y construcción y las reintroducimos al mercado vendiéndolas en plazos cortos.
              </p>
            </div>

            {/* Listado de Beneficios */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="flex gap-4">
                <div className="text-sand shrink-0"><CheckCircle2 size={20} /></div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-cream mb-1">Compra Inteligente</h4>
                  <p className="text-[11px] text-cream/60 leading-relaxed">Adquisición a precios de remate o subvalorados por debajo del mercado.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-sand shrink-0"><CheckCircle2 size={20} /></div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-cream mb-1">Renovaciones de Alto Estándar</h4>
                  <p className="text-[11px] text-cream/60 leading-relaxed">Arquitectura óptima y diseño sofisticado que potencian el precio de venta final.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-sand shrink-0"><CheckCircle2 size={20} /></div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-cream mb-1">Venta Eficiente</h4>
                  <p className="text-[11px] text-cream/60 leading-relaxed">Comercialización ágil para recortar los costos de financiamiento del proyecto.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-sand shrink-0"><CheckCircle2 size={20} /></div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-cream mb-1">Retornos de Corto Plazo</h4>
                  <p className="text-[11px] text-cream/60 leading-relaxed">Inversiones activas de alta rotación para maximizar los ciclos de rentabilidad.</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border/60">
              <a href="https://wa.me/56966974560?text=Hola!%20Me%20interesa%20invertir%20en%20proyectos%20de%20Flipping%20Inmobiliario" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="font-bold uppercase tracking-wider text-xs">
                  Ver Proyectos de Flipping
                </Button>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* NUMEROS QUE RESPALDAN NUESTRO TRABAJO */}
      <section className="bg-[#0f0e0c] py-20 border-b border-border">
        <div className="container-base grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="flex flex-col justify-center lg:pr-6 border-b md:border-b-0 lg:border-r border-border pb-6 md:pb-0">
            <span className="text-[10px] font-bold text-sand uppercase tracking-[0.2em] mb-2 block">Experiencia que genera confianza</span>
            <h3 className="font-heading text-2xl lg:text-3xl font-extrabold uppercase leading-tight">
              Números que <br className="hidden lg:block"/>
              respaldan <br />
              nuestra gestión.
            </h3>
          </div>

          <div className="flex items-start gap-4 p-4">
            <div className="text-sand mt-1"><Layers size={24} /></div>
            <div>
              <div className="text-3xl lg:text-4xl font-extrabold text-sand leading-none mb-2">+25</div>
              <div className="text-xs font-bold uppercase tracking-wider text-cream mb-1">Proyectos desarrollados</div>
              <p className="text-[10px] text-cream/50 leading-relaxed">Experiencia sólida y comprobable en diseño y construcción.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4">
            <div className="text-sand mt-1"><TrendingUp size={24} /></div>
            <div>
              <div className="text-3xl lg:text-4xl font-extrabold text-sand leading-none mb-2">+18%</div>
              <div className="text-xs font-bold uppercase tracking-wider text-cream mb-1">Rentabilidad Promedio Anual</div>
              <p className="text-[10px] text-cream/50 leading-relaxed">Tasa de retorno histórica en nuestros proyectos inmobiliarios cerrados.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4">
            <div className="text-sand mt-1"><Award size={24} /></div>
            <div>
              <div className="text-3xl lg:text-4xl font-extrabold text-sand leading-none mb-2">100%</div>
              <div className="text-xs font-bold uppercase tracking-wider text-cream mb-1">Transparencia y Oficio</div>
              <p className="text-[10px] text-cream/50 leading-relaxed">Auditorías rigurosas y reportes periódicos para tu tranquilidad.</p>
            </div>
          </div>

        </div>
      </section>

      {/* POR QUÉ INVERTIR CON CONTRAPUNTO */}
      <section className="bg-[#12110e] py-24 border-b border-border">
        <div className="container-base space-y-16">
          <div className="max-w-2xl">
            <span className="text-[10px] font-bold text-sand uppercase tracking-[0.25em] mb-2 block">¿Por qué invertir con nosotros?</span>
            <h3 className="font-heading text-3xl sm:text-4xl font-extrabold uppercase text-cream leading-none">
              Gestionamos todo. <br />
              <span className="text-sand">Tú obtienes resultados.</span>
            </h3>
            <span className="accent-line mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 1 */}
            <div className="border border-border p-8 bg-[#0f0e0c] flex flex-col justify-between space-y-6">
              <div className="w-10 h-10 border border-border flex items-center justify-center text-sand bg-[#12110e]">
                <Search size={18} />
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-cream">Análisis y Selección</h4>
                <p className="text-[11px] text-cream/60 leading-relaxed">
                  Evaluamos decenas de opciones de propiedades para seleccionar únicamente aquellas con el mayor margen y retorno financiero proyectado.
                </p>
              </div>
            </div>

            {/* 2 */}
            <div className="border border-border p-8 bg-[#0f0e0c] flex flex-col justify-between space-y-6">
              <div className="w-10 h-10 border border-border flex items-center justify-center text-sand bg-[#12110e]">
                <Paintbrush size={18} />
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-cream">Diseño y Construcción</h4>
                <p className="text-[11px] text-cream/60 leading-relaxed">
                  Aplicamos todo nuestro conocimiento arquitectónico y calidad técnica en remodelaciones integrales de altísimo nivel estético.
                </p>
              </div>
            </div>

            {/* 3 */}
            <div className="border border-border p-8 bg-[#0f0e0c] flex flex-col justify-between space-y-6">
              <div className="w-10 h-10 border border-border flex items-center justify-center text-sand bg-[#12110e]">
                <LineChart size={18} />
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-cream">Gestión y Venta</h4>
                <p className="text-[11px] text-cream/60 leading-relaxed">
                  Supervisamos los plazos legales, la comercialización con brokers estratégicos y cerramos la venta con rapidez y efectividad.
                </p>
              </div>
            </div>

            {/* 4 */}
            <div className="border border-border p-8 bg-[#0f0e0c] flex flex-col justify-between space-y-6">
              <div className="w-10 h-10 border border-border flex items-center justify-center text-sand bg-[#12110e]">
                <ShieldCheck size={18} />
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-cream">Rentabilidad Clara</h4>
                <p className="text-[11px] text-cream/60 leading-relaxed">
                  Distribuimos los dividendos y utilidades de forma clara, predecible y bajo contratos de garantía legalmente certificados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ASÍ FUNCIONA (EL PROCESO) */}
      <section className="bg-[#0f0e0c] py-24">
        <div className="container-base space-y-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <span className="text-[10px] font-bold text-sand uppercase tracking-[0.25em] mb-2 block">Cómo Funciona</span>
              <h3 className="font-heading text-3xl sm:text-4xl font-extrabold uppercase text-cream">
                Un proceso claro y transparente.
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="relative p-6 border border-border bg-stone-dark flex flex-col space-y-4">
              <div className="text-5xl font-extrabold text-sand/10 font-heading">01</div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-sand">Detectamos la Oportunidad</h4>
              <p className="text-[11px] text-cream/60 leading-relaxed">
                Analizamos permanentemente oportunidades de mercado, localizando propiedades con precios sumamente competitivos o en desuso.
              </p>
            </div>

            <div className="relative p-6 border border-border bg-stone-dark flex flex-col space-y-4">
              <div className="text-5xl font-extrabold text-sand/10 font-heading">02</div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-sand">Estructuramos el Proyecto</h4>
              <p className="text-[11px] text-cream/60 leading-relaxed">
                Definimos el plan arquitectónico, los costos, el plan de obra detallado y los plazos comerciales estimados del Flipping.
              </p>
            </div>

            <div className="relative p-6 border border-border bg-stone-dark flex flex-col space-y-4">
              <div className="text-5xl font-extrabold text-sand/10 font-heading">03</div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-sand">Ejecutamos y Gestionamos</h4>
              <p className="text-[11px] text-cream/60 leading-relaxed">
                Remodelamos la propiedad con un equipo técnico especializado de Contrapunto, supervisando los acabados de nivel residencial premium.
              </p>
            </div>

            <div className="relative p-6 border border-border bg-stone-dark flex flex-col space-y-4">
              <div className="text-5xl font-extrabold text-sand/10 font-heading">04</div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-sand">Generamos el Retorno</h4>
              <p className="text-[11px] text-cream/60 leading-relaxed">
                Vendemos la propiedad en el menor plazo de corretaje y distribuimos las rentabilidades líquidas según la inversión de cada participante.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative py-28 overflow-hidden border-t border-border bg-[#12110e] text-center">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop')`,
              opacity: 0.05 
            }}
          />
        </div>
        
        <div className="container-base relative z-10 max-w-3xl space-y-8 px-6">
          <h3 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase text-cream tracking-wide leading-none">
            ¿Listo para invertir en proyectos <br />
            inmobiliarios con potencial real?
          </h3>
          <p className="text-xs uppercase tracking-widest text-cream/50 max-w-xl mx-auto leading-relaxed">
            Hablemos y construyamos tu próxima inversión con el respaldo y oficio técnico de Contrapunto.
          </p>
          <div>
            <a href="https://wa.me/56966974560?text=Hola!%20Quiero%20invertir%20en%20los%20proyectos%20de%20Flipping%20Inmobiliario" target="_blank" rel="noopener noreferrer" className="inline-flex">
              <Button variant="primary" className="px-10 py-5 font-extrabold flex items-center gap-3">
                Quiero Invertir Ahora <ArrowRight size={16} />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
