'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Check, MessageSquare, Wrench, Building2, Home, Zap, Droplets, Paintbrush, Wind, ShieldAlert, Calendar, ClipboardCheck, ArrowRight, UserCheck, PhoneCall } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface PlanMantenimiento {
  id: string;
  name: string;
  badge?: string;
  isPopular?: boolean;
  priceClp: number; // Precio mensual base
  description: string;
  includedFeatures: string[];
}

const PROPERTY_TYPES = [
  {
    id: 'edificio',
    name: 'Edificios Habitacionales',
    sub: 'Comunidades & Copropiedad',
    icon: <Building2 className="w-6 h-6 text-sand" />,
    desc: 'Mantención preventiva según Ley 21.442, estanques de agua, fachadas, pasillos y tableros.'
  },
  {
    id: 'condominio',
    name: 'Condominios de Casas',
    sub: 'Barrios & Garitas de Acceso',
    icon: <Home className="w-6 h-6 text-sand" />,
    desc: 'Atención de portones, iluminación perimetral, salas de bombas y garitas de control.'
  },
  {
    id: 'corporativo',
    name: 'Edificios Corporativos',
    sub: 'Oficinas & Facilities Management',
    icon: <Wrench className="w-6 h-6 text-sand" />,
    desc: 'Continuidad operativa 100%, climatización (HVAC), tableros TDA/TDF y acabados de lujo.'
  },
  {
    id: 'empresa',
    name: 'Empresas & Bodegas',
    sub: 'Planta Industrial & Locales',
    icon: <ShieldCheck className="w-6 h-6 text-sand" />,
    desc: 'Reparación de losas, cubiertas, pintura industrial y readecuación de espacios comerciales.'
  }
];

const TECHNICAL_PILLARS = [
  {
    id: 'elec',
    icon: <Zap className="w-6 h-6 text-sand" />,
    title: '1. Electricidad & Iluminación SEC',
    items: [
      'Mantención de tableros eléctricos generales (TDA / TDF) y subtableros',
      'Reemplazo de luminarias LED, sensores de movimiento y luces de emergencia',
      'Verificación de tierras de protección e instrumental normativo SEC'
    ]
  },
  {
    id: 'hidro',
    icon: <Droplets className="w-6 h-6 text-sand" />,
    title: '2. Gasfitería & Redes Hidráulicas',
    items: [
      'Inspección y mantención de salas de bombas de agua e hidropack',
      'Detección de filtraciones en shafts, matrices y alcantarillado',
      'Limpieza e impermeabilización de estanques de agua potable'
    ]
  },
  {
    id: 'obras',
    icon: <Paintbrush className="w-6 h-6 text-sand" />,
    title: '3. Obras Civiles & Fachadas',
    items: [
      'Pintura de fachadas, pasillos comunes, subterráneos y estacionamientos',
      'Reparación de fisuras, estucos, muros dañados y cerrajería industrial',
      'Impermeabilización de losas de cubierta, terrazas y jardineras'
    ]
  },
  {
    id: 'hvac',
    icon: <Wind className="w-6 h-6 text-sand" />,
    title: '4. Climatización & Extracción',
    items: [
      'Mantención de equipos Split, Fan Coils y cortinas de aire',
      'Limpieza e inspección de extractores de subterráneo y shafts',
      'Revisiones periódicas de filtros y carga de refrigerante'
    ]
  },
  {
    id: 'emerg',
    icon: <ShieldAlert className="w-6 h-6 text-sand" />,
    title: '5. Redes de Emergencia & Seguridad',
    items: [
      'Revisión de red húmeda, red seca y gabinetes de mangueras',
      'Pruebas de estanqueidad y estandarización para inspección municipal',
      'Cumplimiento estricto de la Ley 21.442 de Copropiedad'
    ]
  }
];

const MAINTENANCE_PLANS: PlanMantenimiento[] = [
  {
    id: 'esencial',
    name: 'Plan Preventivo Esencial',
    priceClp: 280000,
    description: 'Ideal para oficinas pequeñas, locales comerciales o edificios de baja altura.',
    includedFeatures: [
      '1 Visita técnica presencial programada al mes con Pauta Checklist',
      'Inspección de iluminación común, redes sanitarias y tableros principales',
      'Informe Técnico Digital Mensual para la administración o gerencia',
      'Atención de urgencias correctivas con respuesta prioritaria',
      '10% de descuento en obras civiles o reparaciones adicionales'
    ]
  },
  {
    id: 'comunitario',
    name: 'Plan Comunitario & Corporativo',
    isPopular: true,
    badge: 'MÁS SOLICITADO',
    priceClp: 490000,
    description: 'Recomendado para condominios, edificios habitacionales y oficinas corporativas.',
    includedFeatures: [
      '2 Visitas técnicas presenciales programadas al mes',
      'Revisión preventiva de salas de bombas, iluminaciones y portones',
      'Atención Preferencial de Urgencias 24/7 (Respuesta < 3 hrs)',
      'Libro y Bitácora de Mantenciones Digital (Cumplimiento Ley 21.442)',
      '15% de descuento en pintura de fachadas y reparaciones mayores',
      'Asesoría técnica en reuniones con Comité de Administración'
    ]
  },
  {
    id: 'facility360',
    name: 'Plan Facility 360',
    badge: 'COBERTURA TOTAL',
    priceClp: 850000,
    description: 'Cobertura integral para grandes edificios, comunidades o parques empresariales.',
    includedFeatures: [
      '4 Visitas técnicas presenciales al mes (1 visita semanal)',
      'Asignación de Técnico de Cabecera para la propiedad',
      'Levantamiento técnico inicial completo de infraestructura sin costo',
      'Supervisión de equipos críticos (eléctrico, hidráulico, HVAC y obras)',
      'Gestión de garantías postventa y auditorías de infraestructura',
      'Atención de emergencias 24/7 sin costo de visitas adicionales'
    ]
  }
];

export const MantenimientoSection = () => {
  const [selectedProperty, setSelectedProperty] = useState<string>('edificio');
  const [formState, setFormState] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    propiedad: 'Edificio Habitacional',
    direccion: '',
    comentarios: ''
  });

  const [submitted, setSubmitted] = useState(false);

  // UF constante de referencia e IVA 19%
  const UF_VALUE = 38500;
  const IVA_FACTOR = 1.19;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hola Diego Stankovsky! Me interesa solicitar una Visita Técnica de Levantamiento Gratuita para Mantenimiento.\n\n` +
    `🏢 *Detalles:* \n` +
    `- Tipo Propiedad: ${formState.propiedad}\n` +
    `- Dirección/Ubicación: ${formState.direccion || 'Sin indicar'}\n` +
    `- Nombre Contacto: ${formState.nombre || 'Sin indicar'}\n` +
    `- Teléfono: ${formState.telefono || 'Sin indicar'}\n` +
    `- Comentarios: ${formState.comentarios || 'Ninguno'}`
  );

  return (
    <div className="py-12 sm:py-16 bg-[#0f0e0c] text-cream min-h-screen relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-sand/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-1/3 w-[500px] h-[500px] bg-stone-800/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container-base max-w-7xl mx-auto relative z-10 space-y-16">

        {/* HERO SECTION */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand/15 border border-sand/30 text-sand text-xs font-mono tracking-widest uppercase">
            <ShieldCheck className="w-4 h-4" />
            CUMPLIMIENTO LEY 21.442 DE COPROPIEDAD INMOBILIARIA
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-cream uppercase tracking-wide leading-tight">
            Mantenimiento Técnico Integral para Edificios & Empresas
          </h1>
          <p className="text-xs sm:text-base text-neutral-300 font-light leading-relaxed max-w-3xl mx-auto">
            Protegemos el valor de tu copropiedad e infraestructura con programas de <span className="text-sand font-bold">mantención preventiva mensual, atención de emergencias 24/7 y auditorías técnicas</span>. Respaldado por el equipo profesional e ITO de Constructora Contrapunto.
          </p>
          <div className="pt-2 flex flex-wrap justify-center items-center gap-4">
            <a
              href="#levantamiento"
              className="bg-sand text-carbon hover:bg-[#a38b72] px-6 py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors shadow-lg flex items-center gap-2"
            >
              <ClipboardCheck className="w-4 h-4" />
              Solicitar Levantamiento Gratuito en Terreno
            </a>
            <a
              href={`https://wa.me/56989531450?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 hover:border-sand/40 hover:bg-white/[0.04] text-cream hover:text-sand px-6 py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              Hablar con Diego Stankovsky
            </a>
          </div>
        </div>

        {/* 1. SEGMENTACIÓN DE CLIENTES (MERCADO OBJETIVO) */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-sand font-bold uppercase tracking-widest block">Sectores de Atencion</span>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold uppercase text-cream tracking-wide">
              ¿A quiénes prestamos servicio?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROPERTY_TYPES.map((prop) => (
              <motion.div
                key={prop.id}
                onClick={() => {
                  setSelectedProperty(prop.id);
                  setFormState({ ...formState, propiedad: prop.name });
                }}
                whileHover={{ y: -5 }}
                className={`cursor-pointer rounded-2xl p-6 border flex flex-col justify-between transition-all duration-300 ${
                  selectedProperty === prop.id
                    ? 'border-sand bg-stone-900/90 shadow-2xl ring-2 ring-sand/40'
                    : 'border-white/10 bg-stone-900/40 hover:border-white/30'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="p-3 rounded-xl bg-sand/10 border border-sand/20">
                      {prop.icon}
                    </div>
                    {selectedProperty === prop.id && (
                      <span className="text-[9px] font-bold font-mono uppercase bg-sand text-carbon px-2 py-0.5 rounded">
                        Seleccionado
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-cream uppercase tracking-wider">{prop.name}</h3>
                    <span className="text-[10px] text-sand font-mono uppercase tracking-widest block">{prop.sub}</span>
                  </div>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">
                    {prop.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 2. EJES TÉCNICOS DE COBERTURA */}
        <div className="space-y-8 bg-[#141210] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-mono text-sand font-bold uppercase tracking-widest block">Cobertura Tecnica 360</span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold uppercase text-cream tracking-wide">
              5 Especialidades de Mantenimiento Integral
            </h2>
            <p className="text-xs text-neutral-400 font-light">
              Pautas de inspección rigurosas a cargo de técnicos calificados y la supervisión de nuestro Inspector Técnico de Obras (ITO).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TECHNICAL_PILLARS.map((pillar) => (
              <div key={pillar.id} className="bg-carbon/70 border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-sand/15 border border-sand/30 shrink-0">
                    {pillar.icon}
                  </div>
                  <h3 className="font-heading text-base font-bold text-cream uppercase tracking-wider">{pillar.title}</h3>
                </div>
                <ul className="space-y-2 text-xs text-neutral-300 font-light border-t border-white/5 pt-3">
                  {pillar.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-snug">
                      <span className="text-sand shrink-0 mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 3. PLANES MENSUALES DE MANTENIMIENTO */}
        <div className="space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-mono text-sand font-bold uppercase tracking-widest block">Programas Continuos</span>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold uppercase text-cream tracking-wide">
              Planes Mensuales de Mantención Preventiva
            </h2>
            <p className="text-xs text-neutral-400 font-light">
              Evita fallas imprevistas, multas municipales y gastos extraordinarios con programas periódicos diseñados a la medida de tu inmueble.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MAINTENANCE_PLANS.map((plan) => {
              const priceWithIva = Math.round(plan.priceClp * IVA_FACTOR);
              const priceUf = priceWithIva / UF_VALUE;

              return (
                <motion.div
                  key={plan.id}
                  whileHover={{ y: -5 }}
                  className={`relative rounded-3xl p-6 sm:p-8 border flex flex-col justify-between transition-all duration-300 ${
                    plan.isPopular
                      ? 'border-sand bg-stone-900/90 shadow-2xl ring-2 ring-sand/40'
                      : 'border-white/10 bg-stone-900/40 hover:border-white/30'
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-sand text-carbon text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                      {plan.badge}
                    </div>
                  )}

                  <div className="space-y-4 pt-2">
                    <div>
                      <h3 className="font-heading text-xl font-bold text-cream uppercase tracking-wider">{plan.name}</h3>
                      <p className="text-xs text-neutral-400 font-light min-h-[36px] mt-1">{plan.description}</p>
                    </div>

                    <div className="pt-3 border-t border-white/10 space-y-1">
                      <div className="text-2xl font-mono font-bold text-sand">
                        ${priceWithIva.toLocaleString('es-CL')} <span className="text-xs font-normal text-cream/70">CLP / mes (IVA incl.)</span>
                      </div>
                      <div className="text-xs font-mono text-neutral-400">
                        ~ {priceUf.toFixed(2)} UF / mes
                      </div>
                    </div>

                    <ul className="space-y-2.5 pt-3 border-t border-white/5 text-xs text-neutral-300 font-light">
                      {plan.includedFeatures.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 leading-snug">
                          <Check className="w-4 h-4 text-sand shrink-0 mt-0.5 stroke-[2.5]" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href="#levantamiento"
                    className={`mt-6 w-full py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors text-center flex items-center justify-center gap-2 ${
                      plan.isPopular
                        ? 'bg-sand text-carbon hover:bg-[#a38b72]'
                        : 'bg-white/5 text-cream border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    Cotizar Plan {plan.name}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 4. FORMULARIO DE LEVANTAMIENTO TÉCNICO GRATUITO */}
        <div id="levantamiento" className="bg-[#181614] border border-sand/30 rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-sand/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Texto explicativo izquierda */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand/15 border border-sand/30 text-sand text-xs font-mono tracking-widest uppercase">
                <UserCheck className="w-3.5 h-3.5" />
                VISITA TÉCNICA SIN COSTO
              </div>
              <h2 className="font-heading text-2xl sm:text-4xl font-extrabold uppercase text-cream tracking-wide">
                Solicita una Visita de Levantamiento en Terreno
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                Un profesional de nuestro equipo acudirá a tu edificio, condominio u oficina para realizar un <span className="text-sand font-bold">diagnóstico inicial completo de la infraestructura</span> y entregarte una propuesta a la medida.
              </p>
              
              <div className="space-y-3 pt-2 text-xs font-mono text-neutral-300">
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-sand shrink-0" />
                  <span>Sin compromiso ni cobros de evaluación inicial.</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-sand shrink-0" />
                  <span>Informe fotográfico preliminar de observaciones.</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-sand shrink-0" />
                  <span>Propuesta formal con valores cerrados en CLP / UF.</span>
                </div>
              </div>
            </div>

            {/* Formulario derecha */}
            <div className="lg:col-span-7 bg-carbon/80 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-sand/20 text-sand mx-auto flex items-center justify-center">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h3 className="font-heading text-xl font-bold uppercase text-cream">¡Solicitud Recibida!</h3>
                  <p className="text-xs text-neutral-300 max-w-md mx-auto">
                    Nos pondremos en contacto contigo a la brevedad para coordinar la fecha y hora de la visita técnica de levantamiento.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    className="bg-sand text-carbon font-bold text-xs uppercase tracking-widest px-6 py-2 rounded-xl"
                  >
                    Enviar Otra Solicitud
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Carolina Ibáñez"
                        value={formState.nombre}
                        onChange={(e) => setFormState({ ...formState, nombre: e.target.value })}
                        className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 text-xs focus:outline-none focus:border-sand"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                        Teléfono / WhatsApp *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="+56 9 9876 5432"
                        value={formState.telefono}
                        onChange={(e) => setFormState({ ...formState, telefono: e.target.value })}
                        className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 text-xs focus:outline-none focus:border-sand"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                        Tipo de Propiedad
                      </label>
                      <select
                        value={formState.propiedad}
                        onChange={(e) => setFormState({ ...formState, propiedad: e.target.value })}
                        className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 text-xs focus:outline-none focus:border-sand"
                      >
                        <option value="Edificio Habitacional">Edificio Habitacional</option>
                        <option value="Condominio de Casas">Condominio de Casas</option>
                        <option value="Edificio Corporativo">Edificio Corporativo / Oficinas</option>
                        <option value="Empresa o Bodega">Empresa / Bodega / Comercial</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                        Comuna / Dirección *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Providencia / Av. Pedro de Valdivia 1230"
                        value={formState.direccion}
                        onChange={(e) => setFormState({ ...formState, direccion: e.target.value })}
                        className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 text-xs focus:outline-none focus:border-sand"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                      Comentarios o Requerimientos Específicos
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Ej. Necesitamos revisar mantención de sala de bombas y pintura de pasillos..."
                      value={formState.comentarios}
                      onChange={(e) => setFormState({ ...formState, comentarios: e.target.value })}
                      className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 text-xs focus:outline-none focus:border-sand"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button
                      type="submit"
                      className="flex-1 bg-sand text-carbon hover:bg-[#a38b72] font-bold tracking-widest uppercase text-xs py-3.5 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                    >
                      <Calendar className="w-4 h-4" />
                      Agendar Visita de Levantamiento
                    </Button>
                    <a
                      href={`https://wa.me/56989531450?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 border border-white/20 hover:border-sand/40 hover:bg-white/[0.04] text-cream hover:text-sand py-3.5 px-5 rounded-xl font-bold uppercase tracking-widest text-xs transition-all"
                    >
                      <PhoneCall className="w-4 h-4 text-emerald-400" />
                      Contactar por WhatsApp
                    </a>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default MantenimientoSection;
