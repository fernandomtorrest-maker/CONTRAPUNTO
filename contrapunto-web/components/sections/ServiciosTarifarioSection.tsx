'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
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
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export interface ServicePriceItem {
  id: string;
  title: string;
  category: 'pisos-pintura' | 'climatizacion' | 'gasfiteria-agua' | 'cocina-electro' | 'muebles-exteriores' | 'seguridad' | 'visitas';
  categoryLabel: string;
  price: number;
  unit: string; // 'm²', 'unidad', 'tarifa base', 'visita'
  originalPrice?: number;
  badge?: string;
  description: string;
  includes: string[];
  iconType: 'brush' | 'droplet' | 'wind' | 'flame' | 'wrench' | 'lock' | 'sofa' | 'hammer' | 'file';
}

const CATEGORIES = [
  { id: 'all', label: 'Todas las Partidas' },
  { id: 'pisos-pintura', label: 'Pisos & Pintura' },
  { id: 'climatizacion', label: 'Climatización & Calefacción' },
  { id: 'gasfiteria-agua', label: 'Gasfitería & Agua Caliente' },
  { id: 'cocina-electro', label: 'Cocina & Línea Blanca' },
  { id: 'muebles-exteriores', label: 'Mobiliario & Exteriores' },
  { id: 'seguridad', label: 'Seguridad & Domótica' },
  { id: 'visitas', label: 'Visitas Técnicas ITO' },
];

const SERVICES_CATALOG: ServicePriceItem[] = [
  // --- PISOS & PINTURA ---
  {
    id: 'piso-ceramica',
    title: 'Instalación de Cerámica',
    category: 'pisos-pintura',
    categoryLabel: 'Pisos & Revestimientos',
    price: 8500,
    unit: 'm²',
    badge: 'Mano de Obra Calificada',
    description: 'Instalación profesional de palmetas cerámicas en pisos y muros con fraguado técnico parejo.',
    includes: ['Nivelación visual de superficie', 'Aplicación de adhesivo técnico', 'Fraguado parejo de canterías', 'Retiro de excedentes'],
    iconType: 'brush'
  },
  {
    id: 'piso-porcelanato',
    title: 'Instalación de Porcelanato',
    category: 'pisos-pintura',
    categoryLabel: 'Pisos & Revestimientos',
    price: 16990,
    unit: 'm²',
    badge: 'Terminación Fina',
    description: 'Colocación de porcelanatos rectificados y gran formato (60x60, 60x120) con sistema de nivelación.',
    includes: ['Cortes de alta precisión', 'Adhesivo polimérico especial', 'Sistema de cuñas niveladoras', 'Limpieza y sellado superficial'],
    iconType: 'brush'
  },
  {
    id: 'piso-vinilico',
    title: 'Instalación de Piso Vinílico SPC / LVT',
    category: 'pisos-pintura',
    categoryLabel: 'Pisos & Revestimientos',
    price: 10990,
    unit: 'm² (desde 15 m²)',
    badge: 'Popular',
    description: 'Montaje de sistema click vinílico rígido o pegado sobre piso existente afinado.',
    includes: ['Revisión de humedad basal', 'Rebaje de puertas', 'Cortes perimetrales y dilatación', 'Instalación de guardapolvos'],
    iconType: 'brush'
  },
  {
    id: 'piso-laminado',
    title: 'Instalación de Piso Laminado / Flotante',
    category: 'pisos-pintura',
    categoryLabel: 'Pisos & Revestimientos',
    price: 6490,
    unit: 'm²',
    badge: 'Rápida Ejecución',
    description: 'Instalación rápida y limpia de piso fotolaminado de alto tráfico para dormitorios y áreas comunes.',
    includes: ['Colocación de polietileno y espuma', 'Encaje click de alta resistencia', 'Juntas de dilatación en vanos', 'Retiro de escombros ligeros'],
    iconType: 'brush'
  },
  {
    id: 'pintura-interior',
    title: 'Pintura Interior Muros & Cielos',
    category: 'pisos-pintura',
    categoryLabel: 'Pintura & Terminaciones',
    price: 4500,
    unit: 'm²',
    badge: '2 Manos + Lijado',
    description: 'Pintado a 2 manos con esmalte al agua o látex de alta cobertura sobre muros sanos.',
    includes: ['Empaste de fisuras superficiales', 'Lijado suave previo', 'Enmascarado y protección de piso', 'Dos manos de acabado uniforme'],
    iconType: 'brush'
  },
  {
    id: 'pintura-exterior',
    title: 'Pintura Exterior & Fachadas',
    category: 'pisos-pintura',
    categoryLabel: 'Pintura & Terminaciones',
    price: 6990,
    unit: 'm²',
    badge: 'Protección UV & Clima',
    description: 'Pintura hidrorrepelente para muros exteriores, ladrillo, siding, estuco o fibrocemento.',
    includes: ['Lavado superficial de polvo', 'Aplicación de sellador fijador', 'Pintura elastomérica o hidroóleo', 'Protección climática UV'],
    iconType: 'brush'
  },

  // --- CLIMATIZACIÓN & AGUA CALIENTE ---
  {
    id: 'aire-acondicionado',
    title: 'Instalación de Aire Acondicionado Split',
    category: 'climatizacion',
    categoryLabel: 'Climatización HVAC',
    price: 149990,
    unit: 'unidad',
    badge: 'Instalador SEC',
    description: 'Montaje de unidad interior y condensadora exterior hasta 3 metros de cañería estándar.',
    includes: ['Fijación con soportes antivibración', 'Presurización y vacío con bomba', 'Conexión a red eléctrica cercana', 'Capacitación en uso del control'],
    iconType: 'wind'
  },
  {
    id: 'mantencion-aire',
    title: 'Mantención & Limpieza Aire Acondicionado',
    category: 'climatizacion',
    categoryLabel: 'Climatización HVAC',
    price: 59990,
    unit: 'unidad',
    badge: 'Limpieza Química',
    description: 'Sanitización profunda de serpentín, limpieza de filtros y verificación de gas refrigerante.',
    includes: ['Desinfección antibacteriana', 'Revisión de consumo eléctrico', 'Comprobación de drenaje de condensados', 'Medición de presión de gas'],
    iconType: 'wind'
  },
  {
    id: 'calefon-tiro-natural',
    title: 'Instalación de Calefón Tiro Natural',
    category: 'gasfiteria-agua',
    categoryLabel: 'Agua Caliente Sanitaria',
    price: 65000,
    unit: 'instalación',
    badge: 'Norma SEC',
    description: 'Reemplazo e instalación sobre conexiones existentes de gas licuado o gas natural.',
    includes: ['Fijación segura a muro', 'Conexión a flexible de gas normado', 'Conexión hidráulica agua fría/caliente', 'Prueba de estanqueidad y fuga'],
    iconType: 'flame'
  },
  {
    id: 'calefon-tiro-forzado',
    title: 'Instalación de Calefón Tiro Forzado',
    category: 'gasfiteria-agua',
    categoryLabel: 'Agua Caliente Sanitaria',
    price: 85000,
    unit: 'instalación',
    badge: 'Norma SEC',
    description: 'Instalación de calefón ionizado o digital con ducto de evacuación concéntrico al exterior.',
    includes: ['Pasamuro y sellado de ducto concéntrico', 'Conexión eléctrica y gas certificada', 'Pruebas de encendido y regulación', 'Certificado de instalación técnica'],
    iconType: 'flame'
  },
  {
    id: 'termo-electrico',
    title: 'Instalación de Termo Eléctrico',
    category: 'gasfiteria-agua',
    categoryLabel: 'Agua Caliente Sanitaria',
    price: 75000,
    unit: 'instalación',
    badge: 'Anclaje Reforzado',
    description: 'Instalación segura de termos murales o de piso desde 50L hasta 150L.',
    includes: ['Anclaje estructural reforzado a muro', 'Instalación de válvula de sobrepresión', 'Conexión a red hidráulica y eléctrica', 'Purga y prueba de temperatura'],
    iconType: 'droplet'
  },
  {
    id: 'calefactor-pellet-1p',
    title: 'Instalación Calefactor a Pellet (Casa 1 Piso)',
    category: 'climatizacion',
    categoryLabel: 'Calefacción Sustentable',
    price: 145000,
    unit: 'instalación',
    badge: 'Bosca / Amesti',
    description: 'Instalación de estufa a pellet con kit de cañones a techo en vivienda de 1 piso.',
    includes: ['Perforación de cielo y cubierta', 'Aislación térmica con lana mineral', 'Sellado de golilla hermética en techo', 'Primera puesta en marcha técnica'],
    iconType: 'flame'
  },
  {
    id: 'calefactor-pellet-2p',
    title: 'Instalación Calefactor a Pellet (Casa 2 Pisos)',
    category: 'climatizacion',
    categoryLabel: 'Calefacción Sustentable',
    price: 185000,
    unit: 'instalación',
    description: 'Instalación completa atravesando entrepiso y cubierta con ductos dobles aislados.',
    includes: ['Corte técnico de entrepiso y cielo', 'Fijación de abrazaderas y tirantes', 'Sellado de cumbrera o techumbre', 'Prueba de tiro forzado'],
    iconType: 'flame'
  },

  // --- GASFITERÍA & BAÑOS ---
  {
    id: 'sanitario-wc',
    title: 'Instalación de Sanitario WC',
    category: 'gasfiteria-agua',
    categoryLabel: 'Sanitarios & Baño',
    price: 38000,
    unit: 'unidad',
    badge: 'Garantía Estanqueidad',
    description: 'Montaje de inodoro One-Piece o de dos piezas con estanque sobre desagüe existente.',
    includes: ['Instalación de sello de cera antifuga', 'Fijación con pernos a piso', 'Regulación de estanque y flotador', 'Conexión de flexible y llave de paso'],
    iconType: 'droplet'
  },
  {
    id: 'monomando-griferia',
    title: 'Instalación de Monomando Lavatorio / Lavaplato',
    category: 'gasfiteria-agua',
    categoryLabel: 'Sanitarios & Baño',
    price: 25000,
    unit: 'unidad',
    description: 'Cambio de llave tradicional o instalación de nuevo monomando con flexibles de acero inoxidable.',
    includes: ['Desmonte de grifería anterior', 'Montaje con sellos de goma y tuercas', 'Conexión a agua fría y caliente', 'Prueba de flujo y hermeticidad'],
    iconType: 'droplet'
  },
  {
    id: 'vanitorio-mueble',
    title: 'Armado e Instalación de Vanitorio + Grifería',
    category: 'gasfiteria-agua',
    categoryLabel: 'Sanitarios & Baño',
    price: 55000,
    unit: 'conjunto',
    badge: 'Todo en Uno',
    description: 'Armado del mueble de baño, anclaje a muro, fijación de lavamanos y conexión de gasfitería.',
    includes: ['Armado completo del mueble', 'Anclaje con tarugos a muro', 'Instalación de desagüe y sifón', 'Sellado perimetral con silicona antihongos'],
    iconType: 'wrench'
  },
  {
    id: 'mampara-ducha',
    title: 'Instalación de Mampara de Ducha Templada',
    category: 'gasfiteria-agua',
    categoryLabel: 'Sanitarios & Baño',
    price: 65000,
    unit: 'instalación',
    description: 'Fijación de mampara fija o corredera de cristal templado sobre tina o receptáculo.',
    includes: ['Nivelación láser milimétrica', 'Perforación de cerámica/porcelanato', 'Anclaje de perfiles de aluminio', 'Sellado transparente antihongos'],
    iconType: 'wrench'
  },
  {
    id: 'cabina-ducha',
    title: 'Armado e Instalación de Cabina de Ducha',
    category: 'gasfiteria-agua',
    categoryLabel: 'Sanitarios & Baño',
    price: 150000,
    unit: 'instalación',
    badge: 'Estructura Completa',
    description: 'Montaje de receptáculo, vidrios curvos o rectos, grifería multifunción y sellado integral.',
    includes: ['Armado de estructura metálica/vidrio', 'Conexión de desagüe de receptáculo', 'Conexión de duchas y jets', 'Pruebas de presión y estanqueidad'],
    iconType: 'wrench'
  },

  // --- COCINA & ELECTRO ---
  {
    id: 'combo-cocina-trio',
    title: 'Combo Trío: Encimera + Horno + Campana',
    category: 'cocina-electro',
    categoryLabel: 'Cocina & Electrodomésticos',
    price: 95000,
    unit: 'combo',
    badge: 'Pack Completo Cocina',
    description: 'Instalación integral de los 3 electrodomésticos empotrados en mueble de cocina.',
    includes: ['Calce y fijación de encimera', 'Anclaje de horno eléctrico', 'Instalación y nivelación de campana', 'Conexión a red eléctrica y ducto'],
    iconType: 'hammer'
  },
  {
    id: 'encimera-cocina',
    title: 'Instalación de Encimera Gas / Vitrocerámica',
    category: 'cocina-electro',
    categoryLabel: 'Cocina & Electrodomésticos',
    price: 39990,
    unit: 'unidad',
    description: 'Montaje en vano existente sobre cubierta de cuarzo, granito o postformado.',
    includes: ['Sellado perimetral con burlete térmico', 'Fijación con grampas bajo cubierta', 'Conexión a gas o electricidad', 'Prueba de quemadores'],
    iconType: 'flame'
  },
  {
    id: 'campana-extractora',
    title: 'Instalación de Campana Extractora',
    category: 'cocina-electro',
    categoryLabel: 'Cocina & Electrodomésticos',
    price: 38000,
    unit: 'unidad',
    description: 'Montaje mural o bajo mueble con salida al exterior o recirculación de carbón activado.',
    includes: ['Fijación reforzada a muro', 'Conexión de tubo corrugado de tiro', 'Enchufe a toma de corriente', 'Prueba de turbina y luces'],
    iconType: 'wind'
  },
  {
    id: 'lavavajillas-lavadora',
    title: 'Instalación de Lavavajillas o Lavadora',
    category: 'cocina-electro',
    categoryLabel: 'Cocina & Electrodomésticos',
    price: 28000,
    unit: 'unidad',
    description: 'Conexión limpia a red de agua potable, desagüe y toma eléctrica normada.',
    includes: ['Retiro de pernos de transporte', 'Nivelación de patas de goma', 'Conexión de manguera de entrada y salida', 'Ciclo de prueba breve'],
    iconType: 'droplet'
  },

  // --- MOBILIARIO & EXTERIORES ---
  {
    id: 'armado-1-mueble',
    title: 'Armado de Mueble Estándar (Cómoda, Rack, Escritorio)',
    category: 'muebles-exteriores',
    categoryLabel: 'Mobiliario & Exteriores',
    price: 32000,
    unit: 'mueble',
    description: 'Armado minucioso según plano del fabricante, escuadre y calibración de cajones.',
    includes: ['Herramientas de montaje adecuadas', 'Colocación de tarugos y pernos minifix', 'Calibración de bisagras y correderas', 'Retiro de embalaje'],
    iconType: 'sofa'
  },
  {
    id: 'armado-closet-6p',
    title: 'Armado de Clóset Grande (Desde 6 Puertas)',
    category: 'muebles-exteriores',
    categoryLabel: 'Mobiliario & Exteriores',
    price: 55000,
    unit: 'mueble',
    badge: 'Gran Formato',
    description: 'Ensamble de clósets de gran tamaño con barras para colgar, cajoneras interiores y repisas.',
    includes: ['Montaje de estructura principal', 'Alineación de puertas y tiradores', 'Anclaje de seguridad a muro', 'Revisión de escuadras'],
    iconType: 'sofa'
  },
  {
    id: 'armado-pergola',
    title: 'Armado & Anclaje de Pérgola en Kit (Terraza)',
    category: 'muebles-exteriores',
    categoryLabel: 'Mobiliario & Exteriores',
    price: 140000,
    unit: 'estructura',
    badge: 'Terraza & Jardín',
    description: 'Armado y anclaje estructural de pérgola de aluminio, madera o acero comprada en kit.',
    includes: ['Ensamble de pilares y vigas maestras', 'Anclaje químico o apernado a radier', 'Colocación de celosías o policarbonato', 'Revisión de resistencia al viento'],
    iconType: 'hammer'
  },
  {
    id: 'armado-bodega-exterior',
    title: 'Armado de Caseta / Bodega de Jardín',
    category: 'muebles-exteriores',
    categoryLabel: 'Mobiliario & Exteriores',
    price: 65000,
    unit: 'bodega',
    description: 'Ensamble completo de caseta metálica, resina o madera sobre piso nivelado.',
    includes: ['Montaje de paneles de muro', 'Instalación de techo y cumbrera', 'Ajuste de puertas correderas o batientes', 'Sellado perimetral basal'],
    iconType: 'hammer'
  },
  {
    id: 'armado-parrilla',
    title: 'Armado de Parrilla a Gas o Carbón',
    category: 'muebles-exteriores',
    categoryLabel: 'Mobiliario & Exteriores',
    price: 29990,
    unit: 'unidad',
    description: 'Montaje de estructura, ruedas, quemadores, encendido piezoeléctrico y bandejas.',
    includes: ['Ensamble de carro base', 'Fijación de caja de cocción y tapa', 'Conexión de regulador de gas', 'Prueba de encendido seguro'],
    iconType: 'flame'
  },

  // --- SEGURIDAD & DOMÓTICA ---
  {
    id: 'cerradura-digital',
    title: 'Instalación de Cerradura o Cerrojo Digital',
    category: 'seguridad',
    categoryLabel: 'Seguridad & Domótica',
    price: 58000,
    unit: 'unidad',
    badge: 'Smart Home',
    description: 'Reemplazo de cerradura convencional por sistema biométrico, tarjeta o código numérico.',
    includes: ['Cajeado técnico en puerta de madera o metal', 'Fijación de cuerpo exterior e interior', 'Configuración de huellas y claves', 'Prueba de pestillo y batería'],
    iconType: 'lock'
  },
  {
    id: 'motor-porton-automatico',
    title: 'Instalación de Motor Portón Corredera',
    category: 'seguridad',
    categoryLabel: 'Seguridad & Domótica',
    price: 85000,
    unit: 'instalación',
    badge: 'Automatización',
    description: 'Fijación de motorreductor, soldadura o apernado de cremalleras y topes de fin de carrera.',
    includes: ['Fijación sobre base de concreto', 'Alineación de cremalleras de acero', 'Configuración de 2 controles remotos', 'Regulación de fuerza y embrague'],
    iconType: 'wrench'
  },
  {
    id: 'malla-seguridad-ninos',
    title: 'Malla de Seguridad para Balcones & Ventanas',
    category: 'seguridad',
    categoryLabel: 'Seguridad & Domótica',
    price: 8990,
    unit: 'm²',
    badge: 'Resistencia 140 kg/m²',
    description: 'Instalación de red de monofilamento de alta tenacidad con anclajes cada 5 cm.',
    includes: ['Perforación en hormigón o vano', 'Colocación de ganchos pitón zincados', 'Tensado milimétrico de la cuerda perimetral', 'Certificación de resistencia 140 kg/m²'],
    iconType: 'lock'
  },
  {
    id: 'antena-starlink-router',
    title: 'Instalación de Antena Starlink & Red Wifi',
    category: 'seguridad',
    categoryLabel: 'Seguridad & Domótica',
    price: 85000,
    unit: 'instalación',
    badge: 'Conectividad',
    description: 'Montaje en techo o muro exterior con mástil de soporte, sellado y canalización de cable.',
    includes: ['Fijación en punto óptimo sin obstrucciones', 'Pase de cable hermético hacia el interior', 'Conexión de router y configuración de red', 'Prueba de velocidad de subida/bajada'],
    iconType: 'wrench'
  },

  // --- VISITAS TÉCNICAS & PRESUPUESTO ITO ---
  {
    id: 'visita-presupuesto-obras',
    title: 'Visita de Diagnóstico & Presupuesto en Obra',
    category: 'visitas',
    categoryLabel: 'Evaluación Técnica',
    price: 15000,
    unit: 'visita',
    badge: '100% Reembolsable',
    description: 'Evaluación presencial por técnico o supervisor para dimensionar partidas, m² y requerimientos.',
    includes: ['Medición con distanciómetro láser', 'Revisión de factibilidad de servicios', 'Cotización formal detallada en 24h', 'El costo se descuenta íntegro al contratar'],
    iconType: 'file'
  },
  {
    id: 'visita-diseno-cocina-bano',
    title: 'Asesoría en Terreno Remodelación Cocina & Baño',
    category: 'visitas',
    categoryLabel: 'Evaluación Técnica',
    price: 25000,
    unit: 'visita',
    badge: 'Arquitectura',
    description: 'Visita especializada de arquitectura para evaluar distribución, redes hidráulicas y propuesta espacial.',
    includes: ['Levantamiento de medidas del espacio', 'Asesoría en materialidades y revestimientos', 'Presupuesto llave en mano de remodelación', 'Descuento total si se ejecuta el proyecto'],
    iconType: 'file'
  },
  {
    id: 'inspeccion-ito-entrega',
    title: 'Inspección Técnica de Entrega de Inmueble (ITO)',
    category: 'visitas',
    categoryLabel: 'Evaluación Técnica',
    price: 65000,
    unit: 'inmueble',
    badge: 'Informe Profesional',
    description: 'Revisión minuciosa antes de recibir tu departamento o casa nueva de inmobiliaria.',
    includes: ['Inspección de plomos, niveles y terminaciones', 'Prueba de presión de gas y circuitos eléctricos', 'Verificación de acústica y filtraciones', 'Informe fotográfico de observaciones para entrega'],
    iconType: 'file'
  }
];

export const ServiciosTarifarioSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filtrado reactivo por categoría y búsqueda
  const filteredServices = useMemo(() => {
    return SERVICES_CATALOG.filter(service => {
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      const matchesQuery = 
        searchQuery === '' ||
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.includes.some(inc => inc.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

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
            Tarifario Transparente & Servicios Express
          </div>
          
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase text-white tracking-tight leading-none">
            CATÁLOGO DE SERVICIOS<br />
            <span className="text-sand">& PARTIDAS CONSTRUCTORA.</span>
          </h1>

          <p className="text-sm sm:text-base text-cream/70 leading-relaxed font-body">
            Valores de referencia ajustados a los promedios reales del mercado en Chile (Habitissimo, APU y grupos de contratistas). 
            Precios justos y transparentes con la **supervisión técnica, respaldo normativo y garantía formal** de Constructora Contrapunto.
          </p>

          {/* BENEFICIOS CONTRAPUNTO BADGES */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="bg-white/[0.03] border border-white/10 p-3 rounded-lg flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-sand shrink-0" />
              <div>
                <p className="text-[11px] font-bold text-white uppercase leading-tight">Garantía Formal</p>
                <p className="text-[10px] text-cream/50">Respaldo de constructora</p>
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/10 p-3 rounded-lg flex items-center gap-2.5">
              <Award className="w-5 h-5 text-sand shrink-0" />
              <div>
                <p className="text-[11px] font-bold text-white uppercase leading-tight">Técnicos SEC</p>
                <p className="text-[10px] text-cream/50">Gas y electricidad normados</p>
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/10 p-3 rounded-lg flex items-center gap-2.5">
              <Clock className="w-5 h-5 text-sand shrink-0" />
              <div>
                <p className="text-[11px] font-bold text-white uppercase leading-tight">Respuesta 24h</p>
                <p className="text-[10px] text-cream/50">Agendamiento ágil</p>
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/10 p-3 rounded-lg flex items-center gap-2.5">
              <MessageCircle className="w-5 h-5 text-sand shrink-0" />
              <div>
                <p className="text-[11px] font-bold text-white uppercase leading-tight">Atención Directa</p>
                <p className="text-[10px] text-cream/50">Vía WhatsApp inmediata</p>
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
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar servicio (ej: porcelanato, aire acondicionado, calefón, clóset, pintura)..."
              className="w-full bg-[#181614] border border-white/15 focus:border-sand rounded-xl pl-12 pr-4 py-3.5 text-sm text-cream placeholder-cream/40 outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-cream/50 hover:text-cream px-1.5 py-0.5 rounded bg-white/5"
              >
                Limpiar
              </button>
            )}
          </div>

          {/* Tabs de Categorías */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-5xl mx-auto">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
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
            Mostrando {filteredServices.length} {filteredServices.length === 1 ? 'partida disponible' : 'partidas disponibles'}
          </div>
        </div>

        {/* GRID DE TARJETAS DE SERVICIOS */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => {
              const whatsappUrl = `https://wa.me/56966974560?text=${encodeURIComponent(
                `Hola Contrapunto, me interesa consultar y agendar el servicio de: ${service.title} (${formatPrice(service.price)} / ${service.unit}). ¿Tienen disponibilidad?`
              )}`;

              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className="bg-[#141210] border border-white/10 rounded-xl p-6 flex flex-col justify-between hover:border-sand/40 hover:shadow-xl hover:shadow-black/50 transition-all group"
                >
                  <div className="space-y-4">
                    
                    {/* Top Bar: Icon + Badge */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="w-10 h-10 rounded-lg bg-sand/10 border border-sand/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                        {getIcon(service.iconType)}
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
                      <h3 className="font-heading text-lg font-bold text-white group-hover:text-sand transition-colors mt-0.5">
                        {service.title}
                      </h3>
                    </div>

                    {/* Precio Destacado */}
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
                        {service.originalPrice && (
                          <div className="text-[11px] text-cream/40 line-through">
                            Ref. Mercado: {formatPrice(service.originalPrice)}
                          </div>
                        )}
                      </div>
                      
                      <span className="text-[9px] uppercase tracking-widest text-cream/40 bg-white/5 px-2 py-1 rounded">
                        Mano de obra
                      </span>
                    </div>

                    {/* Descripción */}
                    <p className="text-xs text-cream/70 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Qué incluye */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-bold uppercase text-sand/90 tracking-wider block">
                        Incluye ejecución técnica:
                      </span>
                      <ul className="space-y-1 text-[11px] text-cream/60">
                        {service.includes.map((inc, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-sand shrink-0 mt-0.5" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Botón CTA por WhatsApp */}
                  <div className="pt-6 mt-4 border-t border-white/5">
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
        ) : (
          <div className="text-center py-16 bg-[#141210] border border-white/10 rounded-2xl max-w-xl mx-auto space-y-4">
            <HelpCircle className="w-12 h-12 text-sand/50 mx-auto" />
            <h3 className="font-heading text-lg font-bold text-white uppercase">
              No encontramos una partida para &quot;{searchQuery}&quot;
            </h3>
            <p className="text-xs text-cream/60 max-w-md mx-auto">
              Si requieres una partida personalizada, ampliación o proyecto especial, contáctanos directamente para coordinar una visita técnica a tu medida.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
            >
              Ver todas las partidas
            </Button>
          </div>
        )}

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
              En las grandes tiendas, el servicio se subcontrata a instaladores externos sin control técnico directo de obra. En Contrapunto brindamos el mismo precio transparente, pero con estándar de construcción civil.
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
            ¿Tienes un proyecto más grande o requieres una cotización a medida?
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
