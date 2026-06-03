'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  ShieldCheck,
  LineChart,
  ArrowRight,
  CheckCircle2,
  Send,
  MessageCircle,
  TrendingUp,
  Clock,
  RotateCcw,
  Sliders
} from 'lucide-react';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import { Button } from '@/components/ui/Button';

export default function FlippingPage() {
  // Form states
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('contacto-flipping')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Dynamically load Behold widget script on mount
  useEffect(() => {
    const scriptId = 'behold-widget-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'module';
      script.src = 'https://w.behold.so/widget.js';
      document.head.appendChild(script);
    }
  }, []);

  const handleSendLead = async () => {
    if (!nombre || !telefono || !email) {
      alert('Por favor, ingresa tu Nombre, Teléfono y Email para poder contactarte.');
      return;
    }

    setEnviando(true);

    try {
      const response = await fetch('/api/send-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          telefono,
          email,
          proyecto: 'Flipping Inmobiliario',
          mensaje: mensaje,
          detalles: 'Interés directo en el modelo de inversión Flipping Inmobiliario.',
        }),
      });

      const data = await response.json();
      if (data.success) {
        setEnviado(true);
      } else {
        alert(`Error al procesar el envío: ${data.error || 'Intenta nuevamente.'}`);
      }
    } catch (err) {
      console.error(err);
      alert('Error de conexión con el servidor. Por favor, intenta de nuevo.');
    } finally {
      setEnviando(false);
    }
  };

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
            A través de nuestro modelo de Flipping Inmobiliario, te invitamos a ser parte de proyectos con alto potencial de rentabilidad, gestionados por expertos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={scrollToContact}
              className="w-full sm:w-auto px-8 py-4 font-bold flex items-center justify-center gap-3 bg-sand hover:bg-sand-light text-carbon rounded-md transition-colors"
            >
              Quiero Invertir <ArrowRight size={16} />
            </button>
            <a href="#detalles" onClick={(e) => {
              e.preventDefault();
              document.getElementById('detalles')?.scrollIntoView({ behavior: 'smooth' });
            }}>
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
              <button
                onClick={scrollToContact}
                className="px-6 py-3 border border-sand hover:bg-sand/10 text-sand text-xs font-bold uppercase tracking-wider rounded-md transition-colors"
              >
                Ver Proyectos de Flipping
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* COMPARATIVA DE INVERSIONES Y ESTUDIO DE CASO */}
      <section className="bg-[#0f0e0c] py-24 border-b border-border">
        <div className="container-base space-y-16">

          {/* Encabezado */}
          <div className="max-w-3xl">
            <span className="text-[10px] font-bold text-sand uppercase tracking-[0.25em] mb-2 block">Comparativa del Mercado</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold uppercase text-cream leading-tight">
              Comparativa real de rentabilidad <br />y tiempo de retorno en Chile
            </h2>
            <span className="accent-line mt-4" />
          </div>

          {/* Tabla Comparativa - Responsive Wrapper */}
          <div className="overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0">
            <table className="w-full min-w-[900px] border-collapse text-left text-xs text-cream/80">
              <thead>
                <tr className="border-b border-border/60">
                  <th className="py-4 pr-4 font-semibold text-neutral-400">Comparativa Real</th>
                  <th className="py-4 px-4 bg-[#8d775f]/15 border-x border-t border-sand/30 rounded-t-xl text-center text-sand font-bold">
                    REVALORIZACIÓN INMOBILIARIA<br />(CICLO CORTO)
                  </th>
                  <th className="py-4 px-4 text-center text-neutral-400 font-semibold">DEPÓSITO A PLAZO</th>
                  <th className="py-4 px-4 text-center text-neutral-400 font-semibold">ARRIENDO TRADICIONAL</th>
                  <th className="py-4 px-4 text-center text-neutral-400 font-semibold">FONDOS MUTUOS</th>
                  <th className="py-4 px-4 text-center text-neutral-400 font-semibold">ACCIONES / BOLSA</th>
                  <th className="py-4 px-4 text-center text-neutral-400 font-semibold">CRIPTOMONEDAS</th>
                  <th className="py-4 px-4 text-center text-neutral-400 font-semibold">TERRENOS (PLUSVALÍA)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {/* Rentabilidad Anual */}
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-4 pr-4 font-medium uppercase tracking-wider text-neutral-400 text-[10px]">Rentabilidad Anual</td>
                  <td className="py-4 px-4 bg-[#8d775f]/10 border-x border-sand/20 text-center font-extrabold text-sand text-sm">20% - 35%+</td>
                  <td className="py-4 px-4 text-center">3% - 6%</td>
                  <td className="py-4 px-4 text-center">4% - 8%</td>
                  <td className="py-4 px-4 text-center">4% - 8%</td>
                  <td className="py-4 px-4 text-center">8% - 15%</td>
                  <td className="py-4 px-4 text-center text-neutral-400">Muy Variable</td>
                  <td className="py-4 px-4 text-center">5% - 15%</td>
                </tr>
                {/* Tiempo para Recuperar */}
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-4 pr-4 font-medium uppercase tracking-wider text-neutral-400 text-[10px]">Retorno de Capital</td>
                  <td className="py-4 px-4 bg-[#8d775f]/10 border-x border-sand/20 text-center font-bold text-sand">4 - 12 Meses</td>
                  <td className="py-4 px-4 text-center">1 - 5 Años</td>
                  <td className="py-4 px-4 text-center">12 - 20 Años</td>
                  <td className="py-4 px-4 text-center">Largo Plazo</td>
                  <td className="py-4 px-4 text-center">Variable (3-10+ Años)</td>
                  <td className="py-4 px-4 text-center text-neutral-400">Variable</td>
                  <td className="py-4 px-4 text-center">5 - 15 Años</td>
                </tr>
                {/* Liquidez */}
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-4 pr-4 font-medium uppercase tracking-wider text-neutral-400 text-[10px]">Liquidez</td>
                  <td className="py-4 px-4 bg-[#8d775f]/10 border-x border-sand/20 text-center font-bold text-sand/90">Media</td>
                  <td className="py-4 px-4 text-center text-emerald-400 font-medium">Alta</td>
                  <td className="py-4 px-4 text-center text-rose-400 font-medium">Baja</td>
                  <td className="py-4 px-4 text-center text-emerald-400 font-medium">Alta</td>
                  <td className="py-4 px-4 text-center text-emerald-400 font-medium">Alta</td>
                  <td className="py-4 px-4 text-center text-emerald-400 font-medium">Alta</td>
                  <td className="py-4 px-4 text-center text-rose-500 font-medium">Muy Baja</td>
                </tr>
                {/* Control sobre Rentabilidad */}
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-4 pr-4 font-medium uppercase tracking-wider text-neutral-400 text-[10px]">Control Rentabilidad</td>
                  <td className="py-4 px-4 bg-[#8d775f]/10 border-x border-sand/20 text-center font-bold text-sand">Alto</td>
                  <td className="py-4 px-4 text-center text-neutral-500">Nulo</td>
                  <td className="py-4 px-4 text-center">Medio</td>
                  <td className="py-4 px-4 text-center text-neutral-500">Bajo</td>
                  <td className="py-4 px-4 text-center text-neutral-500">Bajo</td>
                  <td className="py-4 px-4 text-center text-neutral-500">Bajo</td>
                  <td className="py-4 px-4 text-center text-neutral-500">Bajo</td>
                </tr>
                {/* Activo Tangible */}
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-4 pr-4 font-medium uppercase tracking-wider text-neutral-400 text-[10px]">Activo Tangible</td>
                  <td className="py-4 px-4 bg-[#8d775f]/15 border-x border-b border-sand/20 rounded-b-xl text-center font-bold text-sand">Sí</td>
                  <td className="py-4 px-4 text-center text-neutral-500">No</td>
                  <td className="py-4 px-4 text-center">Sí</td>
                  <td className="py-4 px-4 text-center text-neutral-500">No</td>
                  <td className="py-4 px-4 text-center text-neutral-500">No</td>
                  <td className="py-4 px-4 text-center text-neutral-500">No</td>
                  <td className="py-4 px-4 text-center">Sí</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* EJEMPLO REAL DE INVERSIÓN */}
          <div className="space-y-8 pt-12 border-t border-border/40">
            <div className="text-center">
              <span className="text-[10px] font-bold text-sand uppercase tracking-[0.25em]">Estudio de Caso Práctico</span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold uppercase text-cream mt-1">
                Ejemplo: Inversión de $70.000.000
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Opción A */}
              <div className="border border-white/5 bg-[#12110e] p-8 rounded-2xl flex flex-col justify-between space-y-6">
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-sand mb-2">A) Depósito a Plazo</h4>
                  <div className="h-px bg-white/10 w-full my-3" />
                  <p className="text-[11px] text-cream/60 leading-relaxed mb-4">
                    Rentabilidad anual estimada del <span className="text-cream font-bold">5%</span>.
                  </p>
                  <div className="space-y-2">
                    <div className="text-[11px] text-cream/50">Después de 1 año:</div>
                    <div className="text-2xl font-extrabold text-cream">$70.000.000</div>
                    <div className="text-[11px] text-[#25D366] font-semibold">Ganancia: $3.600.000 (~$300.000/mes)</div>
                  </div>
                </div>
                <div className="space-y-1.5 pt-4 border-t border-white/5 text-[10px] text-rose-400">
                  <div className="flex items-center gap-2">
                    <span>✕</span> Sin control operativo
                  </div>
                  <div className="flex items-center gap-2">
                    <span>✕</span> Sin apalancamiento
                  </div>
                </div>
              </div>

              {/* Opción B */}
              <div className="border border-white/5 bg-[#12110e] p-8 rounded-2xl flex flex-col justify-between space-y-6">
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-sand mb-2">B) Arriendo Tradicional</h4>
                  <div className="h-px bg-white/10 w-full my-3" />
                  <p className="text-[11px] text-cream/60 leading-relaxed mb-4">
                    Rentabilidad anual del <span className="text-cream font-bold">5% - 7%</span>.
                  </p>
                  <div className="space-y-2">
                    <div className="text-[11px] text-cream/50">Tiempo para recuperar inversión:</div>
                    <div className="text-2xl font-extrabold text-cream">15 - 20 Años</div>
                  </div>
                </div>
                <div className="space-y-1.5 pt-4 border-t border-white/5 text-[10px] text-rose-400/80">
                  <div className="flex items-center gap-2">
                    <span>✕</span> Capital inmovilizado
                  </div>
                  <div className="flex items-center gap-2">
                    <span>✕</span> Riesgo de morosidad
                  </div>
                  <div className="flex items-center gap-2">
                    <span>✕</span> Vacancias y mantenciones
                  </div>
                  <div className="flex items-center gap-2">
                    <span>✕</span> Crecimiento lento
                  </div>
                </div>
              </div>

              {/* Opción C - Destacada */}
              <div className="relative rounded-2xl border border-sand/30 bg-[#1b1916] p-8 flex flex-col justify-between space-y-6 shadow-lg shadow-sand/5">
                <div className="absolute -top-3 right-6 bg-sand text-carbon text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
                  NUESTRO MODELO
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-sand mb-2">C) Revalorización Inmobiliaria</h4>
                  <div className="h-px bg-sand/20 w-full my-3" />

                  <div className="text-[10px] text-cream/70 mb-4 bg-black/30 p-3 rounded-lg border border-white/5 space-y-1.5">
                    <div className="flex justify-between"><span>Compra:</span> <span className="font-bold text-cream">$60.000.000</span></div>
                    <div className="flex justify-between text-sand"><span>Remodelación:</span> <span>+ $10.000.000</span></div>
                    <div className="h-px bg-white/10 my-1" />
                    <div className="flex justify-between text-emerald-400 font-bold"><span>Venta:</span> <span>= $95.000.000</span></div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 my-4">
                    <div>
                      <div className="text-[9px] uppercase tracking-wider text-cream/40">Inversión Total</div>
                      <div className="text-sm font-bold text-cream">$75.000.000</div>
                    </div>
                    <div>
                      <div className="text-[9px] uppercase tracking-wider text-cream/40">Utilidad Bruta</div>
                      <div className="text-sm font-bold text-sand">$20.000.000</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <div className="text-[9px] uppercase tracking-wider text-cream/40">Plazo del Proyecto</div>
                      <div className="text-sm font-bold text-cream">5 - 8 Meses</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[9px] uppercase tracking-wider text-sand/80 font-bold font-sans">Rentabilidad</div>
                      <div className="text-lg font-extrabold text-sand">26,7%</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-sand/20 bg-sand/5 -mx-8 -mb-8 p-5 rounded-b-2xl text-center">
                  <div className="text-xs font-bold text-sand uppercase tracking-wider">
                    2 Proyectos al Año = 53%+
                  </div>
                  <div className="text-[9px] text-cream/60 uppercase tracking-widest mt-0.5">
                    Rentabilidad Anualizada Aprox.
                  </div>
                </div>
            </div>
          </div>
          </div>


        </div>
      </section>

      {/* ¿POR QUÉ LA REVALORIZACIÓN INMOBILIARIA SUPERA A OTRAS INVERSIONES? */}
      <section className="bg-[#12110e] py-24 border-b border-border">
        <div className="container-base space-y-16">
          <div className="max-w-3xl">
            <span className="text-[10px] font-bold text-sand uppercase tracking-[0.25em] mb-2 block">Ventajas Clave</span>
            <h3 className="font-heading text-3xl sm:text-4xl font-extrabold uppercase text-cream leading-tight">
              ¿Por qué la revalorización inmobiliaria <br />
              <span className="text-sand">supera a otras inversiones?</span>
            </h3>
            <span className="accent-line mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 1 */}
            <div className="border border-border p-8 bg-[#0f0e0c] flex flex-col justify-between space-y-6 rounded-2xl hover:border-sand/40 transition-colors">
              <div className="w-10 h-10 border border-border flex items-center justify-center text-sand bg-[#12110e] rounded-lg">
                <TrendingUp size={18} />
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-cream">Retornos más altos</h4>
                <p className="text-[11px] text-cream/60 leading-relaxed">
                  Generamos rentabilidades de un <span className="text-sand font-bold">20% a 60%</span> por proyecto mediante la revalorización acelerada.
                </p>
              </div>
            </div>

            {/* 2 */}
            <div className="border border-border p-8 bg-[#0f0e0c] flex flex-col justify-between space-y-6 rounded-2xl hover:border-sand/40 transition-colors">
              <div className="w-10 h-10 border border-border flex items-center justify-center text-sand bg-[#12110e] rounded-lg">
                <Clock size={18} />
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-cream">Capital se recupera rápido</h4>
                <p className="text-[11px] text-cream/60 leading-relaxed">
                  Ciclos cortos de desarrollo que te permiten retornar tu inversión líquida en un plazo de <span className="text-sand font-bold">4 a 12 meses</span>.
                </p>
              </div>
            </div>

            {/* 3 */}
            <div className="border border-border p-8 bg-[#0f0e0c] flex flex-col justify-between space-y-6 rounded-2xl hover:border-sand/40 transition-colors">
              <div className="w-10 h-10 border border-border flex items-center justify-center text-sand bg-[#12110e] rounded-lg">
                <RotateCcw size={18} />
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-cream">Mayor rotación</h4>
                <p className="text-[11px] text-cream/60 leading-relaxed">
                  Posibilidad de reinversión continua mediante interés compuesto operativo para multiplicar los retornos anuales.
                </p>
              </div>
            </div>

            {/* 4 */}
            <div className="border border-border p-8 bg-[#0f0e0c] flex flex-col justify-between space-y-6 rounded-2xl hover:border-sand/40 transition-colors">
              <div className="w-10 h-10 border border-border flex items-center justify-center text-sand bg-[#12110e] rounded-lg">
                <Sliders size={18} />
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-cream">Control total sobre el resultado</h4>
                <p className="text-[11px] text-cream/60 leading-relaxed">
                  Gestión activa directa del diseño, construcción y comercialización por parte de nuestro equipo sin depender de terceros.
                </p>
              </div>
            </div>

            {/* 5 */}
            <div className="border border-border p-8 bg-[#0f0e0c] flex flex-col justify-between space-y-6 rounded-2xl hover:border-sand/40 transition-colors">
              <div className="w-10 h-10 border border-border flex items-center justify-center text-sand bg-[#12110e] rounded-lg">
                <LineChart size={18} />
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-cream">Apalancamiento y posibilidad de escalar</h4>
                <p className="text-[11px] text-cream/60 leading-relaxed">
                  Estructuración inteligente de proyectos que permite maximizar la capacidad de inversión y los retornos del capital.
                </p>
              </div>
            </div>

            {/* 6 */}
            <div className="border border-border p-8 bg-[#0f0e0c] flex flex-col justify-between space-y-6 rounded-2xl hover:border-sand/40 transition-colors">
              <div className="w-10 h-10 border border-border flex items-center justify-center text-sand bg-[#12110e] rounded-lg">
                <ShieldCheck size={18} />
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-cream">Activo tangible</h4>
                <p className="text-[11px] text-cream/60 leading-relaxed">
                  Tu capital está respaldado físicamente por un activo raíz real de alta plusvalía que brinda resguardo legal y financiero.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ASÍ FUNCIONA (EL PROCESO) */}
      <section className="bg-[#0f0e0c] py-24 border-b border-border">
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
      <section className="relative py-28 overflow-hidden bg-[#12110e] text-center">
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
            <button
              onClick={scrollToContact}
              className="px-10 py-5 font-extrabold flex items-center gap-3 bg-sand hover:bg-sand-light text-carbon rounded-md transition-colors mx-auto"
            >
              Quiero Invertir Ahora <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* FORMULARIO DE CONTACTO E INTEGRACIÓN DE LEADS */}
      <section id="contacto-flipping" className="bg-[#0f0e0c] pb-24 pt-8">
        <div className="container-base max-w-4xl px-6">
          <div className="rounded-[2rem] border border-white/10 bg-[#262626] p-10">
            <div className="mb-8 text-sm uppercase tracking-[0.25em] text-[#8d775f]">
              ¿Te interesa invertir?
            </div>
            <p className="mb-8 text-lg text-neutral-300">
              Contáctanos para recibir información personalizada y resolver todas tus dudas sobre Flipping Inmobiliario.
            </p>

            {/* Botón WhatsApp */}
            <a
              href={`https://wa.me/56966974560?text=${encodeURIComponent(
                'Hola Contrapunto! Me interesa obtener más información sobre el modelo de inversión de Flipping Inmobiliario.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-10 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#25D366] py-5 text-lg font-medium text-white transition-all duration-300 hover:bg-[#20bd5a]"
            >
              <MessageCircle className="h-6 w-6" />
              Escribir por WhatsApp
            </a>

            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-[#262626] px-4 text-sm text-neutral-500">o déjanos tus datos</span>
              </div>
            </div>

            {enviado ? (
              <div className="rounded-xl bg-[#25D366]/20 border border-[#25D366] p-5 text-center text-[#25D366] text-lg font-medium">
                ¡Gracias! Tus datos de interés en Flipping Inmobiliario fueron enviados exitosamente. Nos contactaremos a la brevedad.
              </div>
            ) : (
              <div className="space-y-4 text-white">
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#1b1b1b] px-5 py-4 outline-none transition-all focus:border-[#8d775f] text-white"
                  />
                  <input
                    type="tel"
                    placeholder="Tu teléfono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#1b1b1b] px-5 py-4 outline-none transition-all focus:border-[#8d775f] text-white"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Tu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#1b1b1b] px-5 py-4 outline-none transition-all focus:border-[#8d775f] text-white"
                />
                <textarea
                  placeholder="Cuéntanos sobre tu interés o monto aproximado a invertir (opcional)"
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  rows={4}
                  className="w-full resize-none rounded-xl border border-white/10 bg-[#1b1b1b] px-5 py-4 outline-none transition-all focus:border-[#8d775f] text-white"
                />

                <button
                  onClick={handleSendLead}
                  disabled={enviando}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#8d775f] py-4 text-lg font-medium transition-all duration-300 hover:bg-[#a58a6b] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                  {enviando ? 'Enviando...' : 'Enviar datos de contacto'}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
