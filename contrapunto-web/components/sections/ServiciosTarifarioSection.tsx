'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  CheckCircle2, 
  ShieldCheck, 
  Wrench, 
  Sparkles, 
  MessageCircle, 
  Clock, 
  Award, 
  Hammer, 
  Flame, 
  Droplets, 
  Paintbrush, 
  Wind, 
  Lock, 
  Sofa, 
  HelpCircle, 
  FileText, 
  Check,
  ChevronDown,
  X,
  Info,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
  SODIMAC_CATEGORIES, 
  SODIMAC_SERVICES_CATALOG, 
  ServicePriceItem 
} from './sodimacServicesCatalog';

export const ServiciosTarifarioSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(30);
  const [activeModalService, setActiveModalService] = useState<ServicePriceItem | null>(null);

  // Filtrado reactivo por categoría y búsqueda
  const filteredServices = useMemo(() => {
    return SODIMAC_SERVICES_CATALOG.filter(service => {
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      const matchesQuery = 
        searchQuery === '' ||
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.caracteristicas.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.num.toString() === searchQuery.trim() ||
        service.includes.some(inc => inc.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  // Servicios actualmente visibles según paginación progresiva
  const currentVisibleServices = useMemo(() => {
    return filteredServices.slice(0, visibleCount);
  }, [filteredServices, visibleCount]);

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    setVisibleCount(30);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setVisibleCount(30);
  };

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0
    }).format(val);
  };

  const getIcon = (type: ServicePriceItem['iconType']) => {
    switch (type) {
      case 'brush': return <Paintbrush className="w-5 h-5 text-sand" />;
      case 'droplet': return <Droplets className="w-5 h-5 text-sand" />;
      case 'wind': return <Wind className="w-5 h-5 text-sand" />;
      case 'flame': return <Flame className="w-5 h-5 text-sand" />;
      case 'wrench': return <Wrench className="w-5 h-5 text-sand" />;
      case 'lock': return <Lock className="w-5 h-5 text-sand" />;
      case 'sofa': return <Sofa className="w-5 h-5 text-sand" />;
      case 'hammer': return <Hammer className="w-5 h-5 text-sand" />;
      case 'file': return <FileText className="w-5 h-5 text-sand" />;
      default: return <Wrench className="w-5 h-5 text-sand" />;
    }
  };

  return (
    <div className="text-cream py-12 md:py-20">
      <div className="container-base max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER HERO */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-sand/10 border border-sand/30 rounded-full text-sand text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            Catálogo Completo · 120 Servicios con Ficha Técnica
          </div>
          
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase text-white tracking-tight leading-none">
            CATÁLOGO DE SERVICIOS<br />
            <span className="text-sand">& CARACTERÍSTICAS TÉCNICAS.</span>
          </h1>

          <p className="text-sm sm:text-base text-cream/70 leading-relaxed font-body">
            Consulta los **120 servicios oficiales** con sus características completas, qué incluye cada partida, 
            exclusiones y condiciones de ejecución técnica. Precios reales de lista sin ofertas temporales.
          </p>

          {/* BENEFICIOS BADGES */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="bg-white/[0.03] border border-white/10 p-3 rounded-lg flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-sand shrink-0" />
              <div>
                <p className="text-[11px] font-bold text-white uppercase leading-tight">Precios Reales</p>
                <p className="text-[10px] text-cream/50">Valores de lista completos</p>
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/10 p-3 rounded-lg flex items-center gap-2.5">
              <Info className="w-5 h-5 text-sand shrink-0" />
              <div>
                <p className="text-[11px] font-bold text-white uppercase leading-tight">Ficha Técnica</p>
                <p className="text-[10px] text-cream/50">Incluye / No incluye</p>
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/10 p-3 rounded-lg flex items-center gap-2.5">
              <Award className="w-5 h-5 text-sand shrink-0" />
              <div>
                <p className="text-[11px] font-bold text-white uppercase leading-tight">9 Categorías</p>
                <p className="text-[10px] text-cream/50">120 servicios auditados</p>
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/10 p-3 rounded-lg flex items-center gap-2.5">
              <MessageCircle className="w-5 h-5 text-sand shrink-0" />
              <div>
                <p className="text-[11px] font-bold text-white uppercase leading-tight">Atención Directa</p>
                <p className="text-[10px] text-cream/50">WhatsApp inmediato</p>
              </div>
            </div>
          </div>
        </div>

        {/* BUSCADOR Y FILTROS */}
        <div className="space-y-6 mb-12">
          
          {/* Barra de Búsqueda */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cream/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Buscar entre los 120 servicios (ej: porcelanato, calefón, pérgola, #78)..."
              className="w-full bg-[#181614] border border-white/15 focus:border-sand rounded-xl pl-12 pr-4 py-3.5 text-sm text-cream placeholder-cream/40 outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button 
                onClick={() => handleSearchChange('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-cream/50 hover:text-cream px-1.5 py-0.5 rounded bg-white/5"
              >
                Limpiar
              </button>
            )}
          </div>

          {/* Tabs de Categorías Oficiales */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-5xl mx-auto">
            {SODIMAC_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'bg-sand text-carbon shadow-lg shadow-sand/20 font-bold'
                      : 'bg-[#181614] text-cream/70 border border-white/10 hover:border-sand/40 hover:text-cream'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Conteo de resultados */}
          <div className="text-center text-xs text-cream/40 font-mono">
            Mostrando {currentVisibleServices.length} de {filteredServices.length} {filteredServices.length === 1 ? 'servicio encontrado' : 'servicios encontrados'}
          </div>
        </div>

        {/* GRID DE TARJETAS DE SERVICIOS */}
        {filteredServices.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentVisibleServices.map((service) => {
                const whatsappUrl = `https://wa.me/56966974560?text=${encodeURIComponent(
                  `Hola Contrapunto, me interesa consultar por el servicio #${service.num}: ${service.title} (${formatPrice(service.price)} / ${service.unit}). ¿Tienen disponibilidad?`
                )}`;

                return (
                  <motion.div
                    key={service.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="bg-[#141210] border border-white/10 rounded-xl p-6 flex flex-col justify-between hover:border-sand/40 hover:shadow-xl hover:shadow-black/50 transition-all group"
                  >
                    <div className="space-y-4">
                      
                      {/* Top Bar: Icon + Number + Badge */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-lg bg-sand/10 border border-sand/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                            {getIcon(service.iconType)}
                          </div>
                          <span className="text-xs font-mono font-bold text-cream/40">
                            #{service.num.toString().padStart(2, '0')}
                          </span>
                        </div>
                        
                        {service.badge && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-sand/15 text-sand border border-sand/30 rounded-full">
                            {service.badge}
                          </span>
                        )}
                      </div>

                      {/* Categoría y Título */}
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-sand/80 block">
                          {service.categoryLabel}
                        </span>
                        <h3 className="font-heading text-base sm:text-lg font-bold text-white group-hover:text-sand transition-colors mt-0.5 leading-snug">
                          {service.title}
                        </h3>
                      </div>

                      {/* Precio Real Destacado */}
                      <div className="pt-2 pb-1 border-y border-white/5 flex items-baseline justify-between">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-extrabold text-white font-mono tracking-tight">
                              {formatPrice(service.price)}
                            </span>
                            <span className="text-xs text-cream/60 font-medium">
                              / {service.unit}
                            </span>
                          </div>
                          <span className="text-[10px] text-cream/40">
                            Precio real de lista
                          </span>
                        </div>
                        
                        <span className="text-[9px] uppercase tracking-widest text-cream/40 bg-white/5 px-2 py-1 rounded">
                          Mano de obra
                        </span>
                      </div>

                      {/* Características en resumen */}
                      <div className="bg-white/[0.02] border border-white/5 p-3 rounded-lg space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-sand/90 flex items-center gap-1.5">
                          <Info className="w-3.5 h-3.5 text-sand" /> Características del Servicio:
                        </span>
                        <p className="text-[11px] text-cream/70 leading-relaxed line-clamp-3">
                          {service.caracteristicas}
                        </p>
                      </div>

                      {/* Qué incluye (resumen 3 puntos) */}
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-bold uppercase text-sand/90 tracking-wider block">
                          Incluye ejecución técnica:
                        </span>
                        <ul className="space-y-1 text-[11px] text-cream/60">
                          {service.includes.slice(0, 3).map((inc, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-sand shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>

                    {/* Botones de Acción */}
                    <div className="pt-5 mt-4 border-t border-white/5 space-y-2">
                      <button
                        onClick={() => setActiveModalService(service)}
                        className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-white/5 hover:bg-white/10 text-cream/80 hover:text-cream border border-white/10 hover:border-sand/40 font-body text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all"
                      >
                        <FileText className="w-3.5 h-3.5 text-sand" />
                        <span>Ver Ficha Técnica Completa</span>
                      </button>

                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-sand text-carbon hover:bg-sand-dark font-body text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-md group-hover:scale-[1.01]"
                      >
                        <MessageCircle className="w-4 h-4 fill-current" />
                        <span>Cotizar esta Partida</span>
                      </a>
                    </div>

                  </motion.div>
                );
              })}
            </div>

            {/* BOTÓN VER MÁS PARTIDAS */}
            {filteredServices.length > visibleCount && (
              <div className="text-center pt-10">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 30)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-sand text-cream font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg"
                >
                  <span>Cargar más servicios ({filteredServices.length - visibleCount} restantes)</span>
                  <ChevronDown className="w-4 h-4 text-sand" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 bg-[#141210] border border-white/10 rounded-2xl max-w-xl mx-auto space-y-4">
            <HelpCircle className="w-12 h-12 text-sand/50 mx-auto" />
            <h3 className="font-heading text-lg font-bold text-white uppercase">
              No encontramos servicios para &quot;{searchQuery}&quot;
            </h3>
            <p className="text-xs text-cream/60 max-w-md mx-auto">
              Revisa si el término de búsqueda está bien escrito o explora las categorías del catálogo completo.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setVisibleCount(30);
              }}
            >
              Ver los 120 servicios
            </Button>
          </div>
        )}

        {/* MODAL DETALLE DE FICHA TÉCNICA */}
        <AnimatePresence>
          {activeModalService && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveModalService(null)}
                className="absolute inset-0 bg-black/85 backdrop-blur-md"
              />

              {/* Contenido Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.2 }}
                className="relative bg-[#141210] border border-white/15 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl z-10"
              >
                {/* Header Modal */}
                <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-sand bg-sand/15 px-2 py-0.5 rounded">
                        #{activeModalService.num.toString().padStart(2, '0')}
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-cream/50">
                        {activeModalService.categoryLabel}
                      </span>
                    </div>
                    <h2 className="font-heading text-xl sm:text-2xl font-bold text-white uppercase leading-tight">
                      {activeModalService.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => setActiveModalService(null)}
                    className="p-1.5 rounded-lg text-cream/50 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Precio en Modal */}
                <div className="flex items-baseline justify-between bg-white/[0.03] border border-white/10 p-4 rounded-xl">
                  <div>
                    <span className="text-xs text-cream/50 uppercase block font-semibold">Valor Real de Lista</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-white font-mono">
                        {formatPrice(activeModalService.price)}
                      </span>
                      <span className="text-sm text-cream/70">
                        / {activeModalService.unit}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 bg-sand/20 text-sand border border-sand/30 rounded-full">
                    Garantía Formal
                  </span>
                </div>

                {/* 1. Descripción */}
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-sand flex items-center gap-2">
                    <Info className="w-4 h-4" /> Descripción General
                  </h4>
                  <p className="text-xs sm:text-sm text-cream/80 leading-relaxed">
                    {activeModalService.description}
                  </p>
                </div>

                {/* 2. Características */}
                <div className="space-y-1.5 bg-[#181614] border border-white/10 p-4 rounded-xl">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-sand" /> Características del Servicio
                  </h4>
                  <p className="text-xs sm:text-sm text-cream/80 leading-relaxed">
                    {activeModalService.caracteristicas}
                  </p>
                </div>

                {/* 3. Qué incluye */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-green-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" /> ¿Qué incluye este servicio?
                  </h4>
                  <ul className="space-y-1.5 text-xs text-cream/80 pl-1">
                    {activeModalService.includes.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-green-400 font-bold shrink-0">✓</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 4. Qué NO incluye */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-2">
                    <X className="w-4 h-4 text-red-400" /> ¿Qué NO incluye este servicio?
                  </h4>
                  <ul className="space-y-1.5 text-xs text-cream/70 pl-1">
                    {activeModalService.notIncludes.map((ninc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-red-400 font-bold shrink-0">✕</span>
                        <span>{ninc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 5. Condiciones del servicio */}
                <div className="bg-sand/10 border border-sand/30 p-4 rounded-xl space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-sand flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-sand" /> Condiciones y Factibilidad Técnica
                  </span>
                  <p className="text-xs text-cream/90 leading-relaxed">
                    {activeModalService.conditions}
                  </p>
                </div>

                {/* CTA en Modal */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href={`https://wa.me/56966974560?text=${encodeURIComponent(
                      `Hola Contrapunto, me interesa consultar por el servicio #${activeModalService.num}: ${activeModalService.title} (${formatPrice(activeModalService.price)} / ${activeModalService.unit}). ¿Tienen disponibilidad?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-sand text-carbon hover:bg-sand-dark font-body text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Cotizar este Servicio por WhatsApp</span>
                  </a>
                  <button
                    onClick={() => setActiveModalService(null)}
                    className="w-full sm:w-auto px-6 py-3.5 bg-white/5 hover:bg-white/10 text-cream text-xs uppercase font-bold tracking-widest rounded-xl transition-colors"
                  >
                    Cerrar
                  </button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* COMPARATIVA CONSTRUCTORA CONTRAPUNTO VS RETAIL */}
        <div className="mt-20 bg-gradient-to-br from-[#181614] to-[#12100e] border border-white/10 rounded-2xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-sand/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-4 mb-8">
            <span className="text-xs font-bold text-sand uppercase tracking-widest block">
              DIFERENCIAL DE CALIDAD
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold uppercase text-white tracking-tight">
              ¿Por qué contratar con Constructora Contrapunto en vez del retail tradicional?
            </h2>
            <p className="text-xs sm:text-sm text-cream/70 leading-relaxed">
              En las grandes tiendas, el servicio se subcontrata a cuadrillas externas sin control técnico directo de obra. En Contrapunto brindamos los mismos valores transparentes, pero con estándar de construcción civil y supervisión profesional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            {/* Retail */}
            <div className="bg-black/30 border border-white/10 p-6 rounded-xl space-y-3">
              <span className="text-xs font-bold text-cream/40 uppercase tracking-widest block">
                Retail Tradicional
              </span>
              <ul className="space-y-2.5 text-cream/60">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span>Subcontratación masiva sin supervisión presencial de un profesional de la construcción.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span>Costos adicionales imprevistos si el piso o la pared tienen irregularidades.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span>Servicio de postventa y reclamos engorroso a través de call centers.</span>
                </li>
              </ul>
            </div>

            {/* Contrapunto */}
            <div className="bg-sand/10 border border-sand/30 p-6 rounded-xl space-y-3">
              <span className="text-xs font-bold text-sand uppercase tracking-widest block flex items-center gap-1.5">
                <Check className="w-4 h-4 text-sand" /> Estándar Constructora Contrapunto
              </span>
              <ul className="space-y-2.5 text-cream">
                <li className="flex items-start gap-2">
                  <span className="text-sand font-bold shrink-0">✓</span>
                  <span><strong>Supervisión Técnica ITO:</strong> Protocolos de construcción, plomos, escuadras y nivelación láser.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sand font-bold shrink-0">✓</span>
                  <span><strong>Técnicos Certificados SEC:</strong> Para gas, calderas, calefones y tableros eléctricos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sand font-bold shrink-0">✓</span>
                  <span><strong>Garantía Real y Contacto Directo:</strong> Comunicación fluida con nuestro equipo en terreno.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA FINAL DE CONTACTO */}
        <div className="mt-16 text-center space-y-4">
          <h3 className="font-heading text-xl sm:text-2xl font-bold uppercase text-white">
            ¿Tienes un proyecto especial o requieres una cotización a medida?
          </h3>
          <p className="text-xs sm:text-sm text-cream/60 max-w-xl mx-auto">
            Realizamos obras completas, remodelaciones integrales de casas y departamentos, quinchos, terrazas y asesoría estética.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link href="/cotizar">
              <Button variant="primary" size="md">
                Cotizar Proyecto Integral
              </Button>
            </Link>
            <a
              href="https://wa.me/56966974560?text=Hola%20Contrapunto,%20quisiera%20consultar%20por%20un%20servicio%20especial%20en%20terreno."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="md">
                Hablar con un Constructor
              </Button>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ServiciosTarifarioSection;
