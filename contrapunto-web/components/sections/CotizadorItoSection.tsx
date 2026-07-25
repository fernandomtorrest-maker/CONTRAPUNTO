'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Check, Download, MessageSquare, Calculator, FileText, Sparkles, Building2, Home, Wrench, Calendar, Layers, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import jsPDF from 'jspdf';
import { LOGO_BASE64 } from '@/lib/logoBase64';

type InspectionType = 'nuevo' | 'usado' | 'ito';
type ItoTerrenoSubMode = 'frecuencia' | 'hitos';

interface Plan {
  id: string;
  name: string;
  badge?: string;
  isPopular?: boolean;
  ratePerM2: number; // CLP por m2
  minPrice: number;  // Piso mínimo CLP
  description: string;
  includedFeatures: string[];
}

interface ItoFrequencyOption {
  id: string;
  name: string;
  badge?: string;
  isPopular?: boolean;
  visitsPerWeek: number;
  ratePerVisit: number;
  description: string;
  features: string[];
}

interface ItoHitoOption {
  id: string;
  number: string;
  title: string;
  price: number;
  description: string;
  verifications: string[];
}

const INSPECTION_TYPES = [
  {
    id: 'nuevo' as InspectionType,
    name: 'Casa / Depto Nuevo',
    sub: 'Pre-Entrega Inmobiliaria',
    factor: 1.0,
    icon: <Building2 className="w-5 h-5 text-sand" />,
    desc: 'Revisión preventiva previa a firmar acta de recepción de llaves.'
  },
  {
    id: 'usado' as InspectionType,
    name: 'Propiedad Usada',
    sub: 'Compra o Arriendo',
    factor: 1.15,
    icon: <Home className="w-5 h-5 text-sand" />,
    desc: 'Detección de vicios ocultos, humedad y fallas estructurales.'
  },
  {
    id: 'ito' as InspectionType,
    name: 'ITO en Terreno',
    sub: 'Supervisión de Obra',
    factor: 1.25,
    icon: <Wrench className="w-5 h-5 text-sand" />,
    desc: 'Control continuo de avance, calidad e hitos críticos en terreno.'
  }
];

const PLANS: Plan[] = [
  {
    id: 'basico',
    name: 'Plan Básico',
    ratePerM2: 1300,
    minPrice: 90000,
    description: 'Inspección visual esencial de terminaciones y redes generales.',
    includedFeatures: [
      'Inspección visual de terminaciones (pinturas, cerámicos, pisadura)',
      'Verificación de funcionamiento de puertas, ventanas y quincallería',
      'Pruebas rápidas de flujo en griferías y desagües sanitarios',
      'Verificación visual de tablero eléctrico y enchufes principales',
      'Informe Snag List (Lista de Observaciones) en formato PDF'
    ]
  },
  {
    id: 'intermedio',
    name: 'Plan Intermedio',
    isPopular: true,
    badge: 'RECOMENDADO',
    ratePerM2: 1950,
    minPrice: 140000,
    description: 'El plan más solicitado. Incluye instrumental digital y registro fotográfico.',
    includedFeatures: [
      'Todo lo incluido en el PLAN BÁSICO',
      'Medición instrumental digital de humedad en muros y cielos',
      'Pruebas de estanqueidad y presión en red de agua fría y caliente',
      'Verificación de tierras de protección y aislamiento eléctrico con multímetro',
      'Registro fotográfico HD detallado de cada observación',
      'Asesoría verbal post-inspección para reunión con la inmobiliaria'
    ]
  },
  {
    id: 'pro',
    name: 'Plan Pro',
    badge: 'COMPLETO',
    ratePerM2: 2750,
    minPrice: 190000,
    description: 'Inspección pericial integral con termografía y respaldo legal/inmobiliario.',
    includedFeatures: [
      'Todo lo incluido en el PLAN INTERMEDIO',
      'Inspección termográfica infrarroja para detectar fugas ocultas y puentes térmicos',
      'Revisión técnica de estructura, techumbre, mansardas y vigas superiores',
      'Verificación de sellos de gas y ventilaciones normativas SEC',
      'Informe Pericial Digital completo con validez legal/inmobiliaria',
      'Presupuesto estimado de reparación post-inspección para negociación',
      'Atención prioritaria y soporte directo con Diego Stankovsky'
    ]
  }
];

const ITO_FREQUENCIES: ItoFrequencyOption[] = [
  {
    id: 'frec_1',
    name: '1 Visita / semana',
    badge: 'Hitos & Avance',
    visitsPerWeek: 1,
    ratePerVisit: 80000,
    description: 'Control semanal de avance físico y revisión de hitos clave en obras pequeñas o remodelaciones.',
    features: [
      '1 Visita técnica presencial por semana',
      'Emisión de Informe de Avance Semanal',
      'Anotaciones oficiales en Libro de Obras',
      'Revisión visual de calidad en partidas en curso'
    ]
  },
  {
    id: 'frec_2',
    name: '2 Visitas / semana',
    badge: 'RECOMENDADO',
    isPopular: true,
    visitsPerWeek: 2,
    ratePerVisit: 72000,
    description: 'Supervisión constante de calidad, recepción de insumos e inspección en etapas intermedias.',
    features: [
      '2 Visitas técnicas presenciales por semana',
      'Control de recepción de materiales e insumos',
      'Revisión y validación de Estados de Pago del contratista',
      'Informes fotográficos de avance y RNC (No Conformidades)',
      'Asesoría técnica directa con el mandante'
    ]
  },
  {
    id: 'frec_3',
    name: '3 Visitas / semana',
    badge: 'INTEGRAL',
    visitsPerWeek: 3,
    ratePerVisit: 65000,
    description: 'Fiscalización intensiva para obras complejas, vaciado de hormigones y coordinación estrecha.',
    features: [
      '3 Visitas técnicas presenciales por semana',
      'Presencia en llenado de hormigones y recepciones críticas',
      'Control riguroso de Carta Gantt y Estados de Pago',
      'Informes técnicos semanales detallados con validez legal',
      'Soporte prioritario y reuniones con equipo constructor'
    ]
  }
];

const ITO_HITOS: ItoHitoOption[] = [
  {
    id: 'hito_1',
    number: 'HITO 01',
    title: 'Fundaciones & Excavaciones',
    price: 95000,
    description: 'Verificación técnica previa al llenado de hormigón en cimientos y sobrecimientos.',
    verifications: [
      'Revisión de sello de excavación y cotas de nivelación',
      'Verificación de enfierradura (diámetros, traslapes, amarres y recubrimientos)',
      'Inspección de pasadas de tuberías en sobrecimientos'
    ]
  },
  {
    id: 'hito_2',
    number: 'HITO 02',
    title: 'Obra Gruesa & Estructuras',
    price: 105000,
    description: 'Control de elementos soportantes, losas, muros de hormigón o albañilería.',
    verifications: [
      'Revisión de moldajes, alzaprimado y aplomado de muros',
      'Certificados de resistencia y muestreo de probetas de hormigón',
      'Inspección de cadenas, dindeles y estructuración de techumbre'
    ]
  },
  {
    id: 'hito_3',
    number: 'HITO 03',
    title: 'Instalaciones Empotradas (SEC / Sanitarias)',
    price: 95000,
    description: 'Pruebas de estanqueidad y presión antes de cerrar tabiques y losas.',
    verifications: [
      'Prueba de presión hidráulica en redes de agua fría y caliente',
      'Prueba de estanqueidad y pendientes en alcantarillado',
      'Trazado de canalizaciones eléctricas y sellos normativos SEC'
    ]
  },
  {
    id: 'hito_4',
    number: 'HITO 04',
    title: 'Techumbre & Impermeabilización',
    price: 90000,
    description: 'Inspección de cubiertas, evacuación pluvial y barreras de humedad.',
    verifications: [
      'Verificación de pendientes y hojalatería de cubierta',
      'Inspección de aislación térmica y barreras de vapor/humedad',
      'Pruebas de hermeticidad en ventanas y encuentros'
    ]
  },
  {
    id: 'hito_5',
    number: 'HITO 05',
    title: 'Tabiquería, Estucos & Revestimientos',
    price: 85000,
    description: 'Control de aplomado, nivelación de pisos y secado de morteros.',
    verifications: [
      'Verificación de plomo en muros y escuadra en esquinas',
      'Secado y adherencia de estucos y microcementos',
      'Instalación de pavimentos, porcelanatos y juntas de dilatación'
    ]
  },
  {
    id: 'hito_6',
    number: 'HITO 06',
    title: 'Recepción Final & Cierre de Obra',
    price: 110000,
    description: 'Auditoría integral Snag List y entrega de acta de conformidad.',
    verifications: [
      'Auditoría minuciosa de terminaciones, quincallería y pinturas',
      'Prueba funcional total de artefactos e iluminación',
      'Informe Pericial de Cierre y aprobación de recepción final'
    ]
  }
];

const COMMUNAS = [
  'Alhué', 'Buin', 'Calera de Tango', 'Cerrillos', 'Cerro Navia', 'Colina / Chicureo',
  'Conchalí', 'Curacaví', 'El Bosque', 'El Monte', 'Estación Central', 'Huechuraba',
  'Independencia', 'Isla de Maipo', 'La Cisterna', 'La Florida', 'La Granja', 'La Pintana',
  'La Reina', 'Lampa', 'Las Condes', 'Lo Barnechea', 'Lo Espejo', 'Lo Prado', 'Macul',
  'Maipú', 'María Pinto', 'Melipilla', 'Ñuñoa', 'Padre Hurtado', 'Paine',
  'Pedro Aguirre Cerda', 'Peñaflor', 'Peñalolén', 'Pirque', 'Providencia', 'Pudahuel',
  'Puente Alto', 'Quilicura', 'Quinta Normal', 'Recoleta', 'Renca', 'San Bernardo',
  'San Joaquín', 'San José de Maipo', 'San Miguel', 'San Pedro', 'San Ramón',
  'Santiago Centro', 'Talagante', 'Tiltil', 'Vitacura', 'Otras Comunas (Regiones)'
];

export const CotizadorItoSection = () => {
  const [selectedType, setSelectedType] = useState<InspectionType>('nuevo');
  const [m2, setM2] = useState<number>(90);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('intermedio');
  const [commune, setCommune] = useState<string>('Las Condes');

  // Estados específicos para ITO en Terreno
  const [itoMode, setItoMode] = useState<ItoTerrenoSubMode>('frecuencia');
  const [itoMonths, setItoMonths] = useState<number>(3);
  const [selectedFrecId, setSelectedFrecId] = useState<string>('frec_2');
  const [selectedHitos, setSelectedHitos] = useState<string[]>(['hito_1', 'hito_3', 'hito_6']);

  // Datos del cliente para PDF/WhatsApp
  const [clientInfo, setClientInfo] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    direccion: ''
  });

  const [pdfGenerating, setPdfGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // UF constante de referencia (ej. 38.500 CLP) e IVA (19%)
  const UF_VALUE = 38500;
  const IVA_FACTOR = 1.19;

  // Obtener el tipo de inspección actual
  const currentTypeObj = INSPECTION_TYPES.find(t => t.id === selectedType) || INSPECTION_TYPES[0];

  // Cálculo de precio para cada plan estándar por m2 con IVA (Pre-entrega / Usada)
  const calculatePlanPrice = (plan: Plan) => {
    const rawPriceNet = m2 * plan.ratePerM2 * currentTypeObj.factor;
    const baseNet = Math.max(plan.minPrice, Math.round(rawPriceNet));
    const finalPrice = Math.round(baseNet * IVA_FACTOR);
    const ufPrice = finalPrice / UF_VALUE;
    return { finalPrice, ufPrice };
  };

  const selectedPlanObj = PLANS.find(p => p.id === selectedPlanId) || PLANS[1];

  // Cálculos dinámicos según el tipo de servicio seleccionado (con IVA incluido)
  let currentPriceClp = 0;
  let currentPriceUf = 0;
  let currentFrecObj = ITO_FREQUENCIES[1];
  const selectedHitosObjs = ITO_HITOS.filter(h => selectedHitos.includes(h.id));

  if (selectedType === 'ito') {
    if (itoMode === 'frecuencia') {
      currentFrecObj = ITO_FREQUENCIES.find(f => f.id === selectedFrecId) || ITO_FREQUENCIES[1];
      const totalVisits = itoMonths * 4 * currentFrecObj.visitsPerWeek;
      const netTotal = totalVisits * currentFrecObj.ratePerVisit;
      currentPriceClp = Math.round(netTotal * IVA_FACTOR);
      currentPriceUf = currentPriceClp / UF_VALUE;
    } else {
      const netTotal = selectedHitosObjs.reduce((acc, h) => acc + h.price, 0);
      currentPriceClp = Math.round(netTotal * IVA_FACTOR);
      currentPriceUf = currentPriceClp / UF_VALUE;
    }
  } else {
    const { finalPrice, ufPrice } = calculatePlanPrice(selectedPlanObj);
    currentPriceClp = finalPrice;
    currentPriceUf = ufPrice;
  }

  // Manejador para activar/desactivar un hito en Modalidad B
  const toggleHito = (hitoId: string) => {
    if (selectedHitos.includes(hitoId)) {
      if (selectedHitos.length > 1) {
        setSelectedHitos(selectedHitos.filter(id => id !== hitoId));
      }
    } else {
      setSelectedHitos([...selectedHitos, hitoId]);
    }
  };

  // Generación de PDF de Cotización ITO
  const handleDownloadPdf = async () => {
    if (!clientInfo.nombre || !clientInfo.telefono) {
      setErrorMsg('Por favor completa al menos tu Nombre y Teléfono antes de descargar el presupuesto.');
      return;
    }
    setErrorMsg('');
    setPdfGenerating(true);

    try {
      const doc = new jsPDF({ unit: 'mm', format: 'letter' });

      // Header Brand Color
      doc.setFillColor(20, 19, 17); // #141311
      doc.rect(0, 0, 216, 32, 'F');

      // Logo
      try {
        if (LOGO_BASE64) {
          doc.addImage(LOGO_BASE64, 'PNG', 12, 5, 45, 22);
        }
      } catch (e) {
        console.warn('Could not render logo in PDF', e);
      }

      // Title & Document Code
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('COTIZACIÓN DE INSPECCIÓN TÉCNICA (ITO)', 204, 14, { align: 'right' });
      
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(`Nº COT-ITO-${Math.floor(1000 + Math.random() * 9000)} | Fecha: ${new Date().toLocaleDateString('es-CL')}`, 204, 21, { align: 'right' });

      // Client Box
      doc.setFillColor(245, 245, 240);
      doc.rect(12, 38, 192, 34, 'F');
      doc.setDrawColor(220, 220, 210);
      doc.rect(12, 38, 192, 34, 'S');

      doc.setTextColor(20, 19, 17);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text('DATOS DEL CLIENTE Y PROPIEDAD', 16, 45);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.text(`Nombre Cliente: ${clientInfo.nombre}`, 16, 52);
      doc.text(`Teléfono: ${clientInfo.telefono}`, 16, 58);
      doc.text(`Correo: ${clientInfo.correo || 'No informado'}`, 16, 64);

      if (selectedType === 'ito') {
        doc.text(`Tipo Servicio: ITO en Terreno (${itoMode === 'frecuencia' ? 'Frecuencia Semanal' : 'Hitos Críticos'})`, 110, 52);
        if (itoMode === 'frecuencia') {
          doc.text(`Duración: ${itoMonths} Meses (${itoMonths * 4} Semanas)`, 110, 58);
          doc.text(`Frecuencia: ${currentFrecObj.name} (${itoMonths * 4 * currentFrecObj.visitsPerWeek} visitas tot.)`, 110, 64);
        } else {
          doc.text(`Hitos Contratados: ${selectedHitosObjs.length} Hitos Críticos`, 110, 58);
          doc.text(`Ubicación: ${commune} ${clientInfo.direccion ? '- ' + clientInfo.direccion : ''}`, 110, 64);
        }
      } else {
        doc.text(`Tipo de Inspección: ${currentTypeObj.name} (${currentTypeObj.sub})`, 110, 52);
        doc.text(`Superficie: ${m2} m²`, 110, 58);
        doc.text(`Comuna / Ubicación: ${commune} ${clientInfo.direccion ? '- ' + clientInfo.direccion : ''}`, 110, 64);
      }

      // Selected Plan Summary Header
      doc.setFillColor(217, 119, 6); // Sand / Orange
      doc.rect(12, 78, 192, 8, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);

      if (selectedType === 'ito') {
        if (itoMode === 'frecuencia') {
          doc.text(`DETALLE DE COBERTURA: ${currentFrecObj.name.toUpperCase()} (${itoMonths} MESES)`, 16, 83.5);
        } else {
          doc.text(`DETALLE DE PAQUETE DE HITOS CRÍTICOS (${selectedHitosObjs.length} HITOS)`, 16, 83.5);
        }
      } else {
        doc.text(`DETALLE DEL PLAN SELECCIONADO: ${selectedPlanObj.name.toUpperCase()}`, 16, 83.5);
      }

      // Features / Items Table Body
      let y = 92;
      doc.setTextColor(40, 40, 40);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);

      if (selectedType === 'ito') {
        if (itoMode === 'frecuencia') {
          currentFrecObj.features.forEach((feat, index) => {
            doc.setFillColor(index % 2 === 0 ? 250 : 255, index % 2 === 0 ? 250 : 255, 250);
            doc.rect(12, y - 4, 192, 7, 'F');
            doc.setDrawColor(240, 240, 240);
            doc.rect(12, y - 4, 192, 7, 'S');

            doc.text(`[✓]  ${feat}`, 16, y);
            y += 7.5;
          });
        } else {
          selectedHitosObjs.forEach((hito, index) => {
            doc.setFillColor(index % 2 === 0 ? 250 : 255, index % 2 === 0 ? 250 : 255, 250);
            doc.rect(12, y - 4, 192, 7.5, 'F');
            doc.setDrawColor(240, 240, 240);
            doc.rect(12, y - 4, 192, 7.5, 'S');

            doc.setFont('helvetica', 'bold');
            doc.text(`[✓] ${hito.number}: ${hito.title}`, 16, y);
            doc.setFont('helvetica', 'normal');
            doc.text(`$${hito.price.toLocaleString('es-CL')} CLP`, 200, y, { align: 'right' });
            y += 8;
          });
        }
      } else {
        selectedPlanObj.includedFeatures.forEach((feat, index) => {
          doc.setFillColor(index % 2 === 0 ? 250 : 255, index % 2 === 0 ? 250 : 255, 250);
          doc.rect(12, y - 4, 192, 7, 'F');
          doc.setDrawColor(240, 240, 240);
          doc.rect(12, y - 4, 192, 7, 'S');

          doc.text(`[✓]  ${feat}`, 16, y);
          y += 7.5;
        });
      }

      // Price Box
      y += 6;
      doc.setFillColor(20, 19, 17);
      doc.rect(12, y, 192, 22, 'F');

      doc.setTextColor(217, 119, 6);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('TOTAL ESTIMADO INSPECCIÓN TÉCNICA (IVA INCLUIDO):', 18, y + 9);

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(15);
      doc.text(`$${currentPriceClp.toLocaleString('es-CL')} CLP (IVA incl.)`, 200, y + 10, { align: 'right' });
      
      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'normal');
      doc.text(`(Equivalente aprox. ${currentPriceUf.toFixed(2)} UF)`, 200, y + 16, { align: 'right' });

      // Inspector Signature & Footer
      y += 34;
      doc.setDrawColor(180, 180, 180);
      doc.line(130, y, 195, y);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(20, 19, 17);
      doc.text('Diego Stankovsky', 162.5, y + 5, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(100, 100, 100);
      doc.text('Inspector Técnico de Obras (ITO) | Constructora Contrapunto', 162.5, y + 9, { align: 'center' });
      doc.text('www.contrapuntoconstructora.com | +56 9 8953 1450', 162.5, y + 13, { align: 'center' });

      // Commercial Terms
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(20, 19, 17);
      doc.text('CONDICIONES GENERALES:', 12, y + 5);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(80, 80, 80);
      doc.text('1. Validez de esta cotización: 15 días corridos.', 12, y + 10);
      doc.text('2. Coordinación de visita sujeta a disponibilidad de agenda.', 12, y + 14);
      doc.text('3. Entrega de informe digital en 24 a 48 hrs hábiles tras cada inspección.', 12, y + 18);

      const fileName = `cotizacion-ito-${clientInfo.nombre.toLowerCase().replace(/\s+/g, '-')}.pdf`;
      doc.save(fileName);
    } catch (e) {
      console.error('Error generating ITO PDF:', e);
      setErrorMsg('Ocurrió un error al generar el PDF.');
    } finally {
      setPdfGenerating(false);
    }
  };

  // Enlace de WhatsApp estructurado según modalidad
  let whatsappDetails = '';
  if (selectedType === 'ito') {
    if (itoMode === 'frecuencia') {
      whatsappDetails = `- Servicio: *ITO en Terreno (Frecuencia Semanal)*\n- Duración: ${itoMonths} Meses (${itoMonths * 4} semanas)\n- Frecuencia: *${currentFrecObj.name}*\n- Total Visitas: ${itoMonths * 4 * currentFrecObj.visitsPerWeek} visitas en terreno`;
    } else {
      whatsappDetails = `- Servicio: *ITO en Terreno (Paquete de Hitos Críticos)*\n- Hitos Seleccionados (${selectedHitosObjs.length}): ${selectedHitosObjs.map(h => h.title).join(', ')}`;
    }
  } else {
    whatsappDetails = `- Plan: *${selectedPlanObj.name}*\n- Tipo: ${currentTypeObj.name}\n- Superficie: ${m2} m²`;
  }

  const whatsappText = encodeURIComponent(
    `Hola Diego Stankovsky! Me interesa agendar una Inspección Técnica.\n\n` +
    `📌 *Detalles:* \n` +
    `${whatsappDetails}\n` +
    `- Comuna: ${commune}\n` +
    `- Valor Estimado: *$${currentPriceClp.toLocaleString('es-CL')} CLP (IVA Incluido)* (${currentPriceUf.toFixed(2)} UF)\n\n` +
    `👤 *Mis Datos:*\n` +
    `- Nombre: ${clientInfo.nombre || 'Sin indicar'}\n` +
    `- Teléfono: ${clientInfo.telefono || 'Sin indicar'}`
  );

  return (
    <section id="cotizador-ito" className="py-12 sm:py-16 bg-[#0f0e0c] text-cream min-h-screen relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-sand/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-10 bottom-10 w-96 h-96 bg-stone-800/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container-base max-w-7xl mx-auto relative z-10 space-y-12">
        
        {/* HEADER SECTION */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand/15 border border-sand/30 text-sand text-xs font-mono tracking-widest uppercase">
            <Calculator className="w-3.5 h-3.5" />
            CALCULADORA DE TARIFAS ITO EN TIEMPO REAL
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-cream uppercase tracking-wide">
            Cotizador de Inspección Técnica
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
            Calcula tu tarifa personalizada para inspección de pre-entrega, propiedades usadas o supervisión continua ITO en terreno. Obtén tu presupuesto de inmediato firmado por nuestro inspector <span className="text-sand font-bold">Diego Stankovsky</span>.
          </p>
        </div>

        {/* MAIN CALCULATOR GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT COLUMN: Property Config & Customer Form */}
          <div className="lg:col-span-5 space-y-6">

            {/* CARD 1: Configuración del Servicio */}
            <div className="bg-[#181614] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <h2 className="font-heading text-xl font-extrabold text-cream uppercase tracking-wider flex items-center gap-2 border-b border-white/10 pb-3">
                <Building2 className="w-5 h-5 text-sand" />
                1. Selección del Servicio
              </h2>

              {/* Selector de Tipo de Inspección */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-sand block">
                  Tipo de Inspección / Propiedad
                </label>
                <div className="grid grid-cols-1 gap-2.5">
                  {INSPECTION_TYPES.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
                        selectedType === type.id
                          ? 'border-sand bg-sand/10 text-cream shadow-md'
                          : 'border-white/10 bg-carbon/60 text-neutral-400 hover:border-white/20'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${selectedType === type.id ? 'bg-sand text-carbon' : 'bg-stone-800 text-cream'}`}>
                        {type.icon}
                      </div>
                      <div className="flex-1">
                        <span className="block text-xs font-bold text-cream uppercase tracking-wider">{type.name}</span>
                        <span className="block text-[10px] text-neutral-400 font-light">{type.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* CONTENIDO VARIABLE SEGÚN TIPO */}
              {selectedType !== 'ito' ? (
                /* Selector de Metraje (m2) para Pre-entrega o Usada */
                <div className="space-y-3 pt-2 border-t border-white/5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold uppercase tracking-wider text-sand">
                      Superficie a Inspeccionar
                    </label>
                    <span className="font-mono text-base font-bold text-cream bg-carbon/80 px-3 py-1 rounded-lg border border-white/10">
                      {m2} m²
                    </span>
                  </div>
                  <input
                    type="range"
                    min={30}
                    max={500}
                    step={5}
                    value={m2}
                    onChange={(e) => setM2(Number(e.target.value))}
                    className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-sand"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                    <span>30 m²</span>
                    <span>250 m²</span>
                    <span>500 m²</span>
                  </div>
                </div>
              ) : (
                /* Configurador específico para ITO EN TERRENO */
                <div className="space-y-5 pt-2 border-t border-white/5">
                  
                  {/* Selector de Sub-Modalidad ITO en Terreno */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-sand block">
                      Enfoque de la Supervisión ITO
                    </label>
                    <div className="grid grid-cols-2 gap-2 p-1 bg-carbon rounded-xl border border-white/10">
                      <button
                        onClick={() => setItoMode('frecuencia')}
                        className={`py-2 px-3 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                          itoMode === 'frecuencia'
                            ? 'bg-sand text-carbon shadow-sm'
                            : 'text-neutral-400 hover:text-cream'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        A. Frecuencia & Meses
                      </button>
                      <button
                        onClick={() => setItoMode('hitos')}
                        className={`py-2 px-3 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                          itoMode === 'hitos'
                            ? 'bg-sand text-carbon shadow-sm'
                            : 'text-neutral-400 hover:text-cream'
                        }`}
                      >
                        <Layers className="w-3.5 h-3.5" />
                        B. Hitos Críticos
                      </button>
                    </div>
                  </div>

                  {itoMode === 'frecuencia' ? (
                    /* Modalidad A: Slider de Meses */
                    <div className="space-y-3 bg-carbon/60 p-4 rounded-xl border border-white/5">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold uppercase tracking-wider text-cream flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-sand" />
                          Duración de la Obra
                        </label>
                        <span className="font-mono text-sm font-bold text-sand bg-stone-900 px-2.5 py-0.5 rounded border border-white/10">
                          {itoMonths} {itoMonths === 1 ? 'Mes' : 'Meses'} ({itoMonths * 4} Semanas)
                        </span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={12}
                        step={1}
                        value={itoMonths}
                        onChange={(e) => setItoMonths(Number(e.target.value))}
                        className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-sand"
                      />
                      <div className="flex justify-between text-[9px] font-mono text-neutral-500">
                        <span>1 mes</span>
                        <span>6 meses</span>
                        <span>12 meses</span>
                      </div>
                    </div>
                  ) : (
                    /* Modalidad B: Leyenda informativa Hitos */
                    <div className="bg-carbon/60 p-3.5 rounded-xl border border-white/5 text-[11px] text-neutral-300 font-light leading-relaxed">
                      💡 <span className="text-sand font-bold">Instrucciones:</span> Selecciona en la columna derecha los hitos clave que requieres fiscalizar en tu proyecto de construcción o remodelación.
                    </div>
                  )}

                </div>
              )}

              {/* Selector de Comuna */}
              <div className="space-y-2 pt-2 border-t border-white/5">
                <label className="text-xs font-bold uppercase tracking-wider text-sand block">
                  Comuna / Ubicación de la Obra
                </label>
                <select
                  value={commune}
                  onChange={(e) => setCommune(e.target.value)}
                  className="w-full bg-carbon border border-white/10 text-cream rounded-xl p-3 text-xs focus:outline-none focus:border-sand"
                >
                  {COMMUNAS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* CARD 2: Datos del Cliente */}
            <div className="bg-[#181614] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xl">
              <h2 className="font-heading text-xl font-extrabold text-cream uppercase tracking-wider flex items-center gap-2 border-b border-white/10 pb-3">
                <FileText className="w-5 h-5 text-sand" />
                2. Datos del Solicitante
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                    Nombre y Apellido *
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Matías Donoso"
                    value={clientInfo.nombre}
                    onChange={(e) => setClientInfo({ ...clientInfo, nombre: e.target.value })}
                    className="w-full bg-carbon border border-white/10 text-cream rounded-xl p-3 text-xs focus:outline-none focus:border-sand"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                      Teléfono WhatsApp *
                    </label>
                    <input
                      type="text"
                      placeholder="+56 9 1234 5678"
                      value={clientInfo.telefono}
                      onChange={(e) => setClientInfo({ ...clientInfo, telefono: e.target.value })}
                      className="w-full bg-carbon border border-white/10 text-cream rounded-xl p-3 text-xs focus:outline-none focus:border-sand"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      placeholder="cliente@email.com"
                      value={clientInfo.correo}
                      onChange={(e) => setClientInfo({ ...clientInfo, correo: e.target.value })}
                      className="w-full bg-carbon border border-white/10 text-cream rounded-xl p-3 text-xs focus:outline-none focus:border-sand"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                    Dirección (Opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Av. Las Condes 12345, Dpto 802"
                    value={clientInfo.direccion}
                    onChange={(e) => setClientInfo({ ...clientInfo, direccion: e.target.value })}
                    className="w-full bg-carbon border border-white/10 text-cream rounded-xl p-3 text-xs focus:outline-none focus:border-sand"
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-950/60 border border-red-800 rounded-xl text-red-300 text-xs font-mono">
                  {errorMsg}
                </div>
              )}
            </div>

          </div>

          {/* RIGHT COLUMN: Options Selection & Summary */}
          <div className="lg:col-span-7 space-y-6">

            {/* SELECCIÓN DINÁMICA DE OPCIONES */}
            {selectedType !== 'ito' ? (
              /* SELECCIÓN DE PLANES POR M2 (Pre-entrega / Usada) */
              <div className="space-y-4">
                <h2 className="font-heading text-xl font-extrabold text-cream uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-sand" />
                  3. Elige tu Plan de Inspección
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {PLANS.map((plan) => {
                    const { finalPrice, ufPrice } = calculatePlanPrice(plan);
                    const isSelected = selectedPlanId === plan.id;

                    return (
                      <motion.div
                        key={plan.id}
                        onClick={() => setSelectedPlanId(plan.id)}
                        whileHover={{ scale: 1.02 }}
                        className={`relative cursor-pointer rounded-2xl p-5 border flex flex-col justify-between transition-all duration-300 ${
                          isSelected
                            ? 'border-sand bg-stone-900/90 shadow-2xl ring-2 ring-sand/40'
                            : 'border-white/10 bg-stone-900/40 hover:border-white/30'
                        }`}
                      >
                        {plan.badge && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sand text-carbon text-[9px] font-bold uppercase tracking-widest px-3 py-0.5 rounded-full shadow-md">
                            {plan.badge}
                          </div>
                        )}

                        <div className="space-y-3 pt-1">
                          <div className="flex justify-between items-center">
                            <h3 className="font-heading text-lg font-bold text-cream uppercase tracking-wider">
                              {plan.name}
                            </h3>
                            {isSelected && (
                              <div className="w-5 h-5 rounded-full bg-sand text-carbon flex items-center justify-center">
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </div>
                            )}
                          </div>

                          <p className="text-[10px] text-neutral-400 font-light leading-relaxed min-h-[36px]">
                            {plan.description}
                          </p>

                          <div className="pt-2 border-t border-white/10">
                            <div className="text-xl font-mono font-bold text-sand">
                              ${finalPrice.toLocaleString('es-CL')} <span className="text-xs font-normal text-sand/80">(IVA incl.)</span>
                            </div>
                            <div className="text-[10px] font-mono text-neutral-400">
                              ~ {ufPrice.toFixed(2)} UF CLP
                            </div>
                          </div>

                          <ul className="space-y-2 pt-2 border-t border-white/5 text-[10px] text-neutral-300 font-light">
                            {plan.includedFeatures.map((feat, idx) => (
                              <li key={idx} className="flex items-start gap-1.5 leading-snug">
                                <span className="text-sand mt-0.5">•</span>
                                {feat}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <button
                          className={`mt-4 w-full py-2.5 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-colors ${
                            isSelected
                              ? 'bg-sand text-carbon'
                              : 'bg-white/5 text-cream border border-white/10 hover:bg-white/10'
                          }`}
                        >
                          {isSelected ? 'Plan Seleccionado' : 'Seleccionar'}
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ) : itoMode === 'frecuencia' ? (
              /* MODALIDAD A: SELECCIÓN DE FRECUENCIA SEMANAL */
              <div className="space-y-4">
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <h2 className="font-heading text-xl font-extrabold text-cream uppercase tracking-wider flex items-center gap-2">
                    <Clock className="w-5 h-5 text-sand" />
                    3. Frecuencia de Visitas Semanales
                  </h2>
                  <span className="text-xs font-mono text-sand font-bold">
                    Duración elegida: {itoMonths} {itoMonths === 1 ? 'Mes' : 'Meses'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {ITO_FREQUENCIES.map((frec) => {
                    const totalVisits = itoMonths * 4 * frec.visitsPerWeek;
                    const totalPriceNet = totalVisits * frec.ratePerVisit;
                    const totalPrice = Math.round(totalPriceNet * IVA_FACTOR);
                    const ufPrice = totalPrice / UF_VALUE;
                    const isSelected = selectedFrecId === frec.id;

                    return (
                      <motion.div
                        key={frec.id}
                        onClick={() => setSelectedFrecId(frec.id)}
                        whileHover={{ scale: 1.02 }}
                        className={`relative cursor-pointer rounded-2xl p-5 border flex flex-col justify-between transition-all duration-300 ${
                          isSelected
                            ? 'border-sand bg-stone-900/90 shadow-2xl ring-2 ring-sand/40'
                            : 'border-white/10 bg-stone-900/40 hover:border-white/30'
                        }`}
                      >
                        {frec.badge && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sand text-carbon text-[9px] font-bold uppercase tracking-widest px-3 py-0.5 rounded-full shadow-md">
                            {frec.badge}
                          </div>
                        )}

                        <div className="space-y-3 pt-1">
                          <div className="flex justify-between items-center">
                            <h3 className="font-heading text-base font-bold text-cream uppercase tracking-wider">
                              {frec.name}
                            </h3>
                            {isSelected && (
                              <div className="w-5 h-5 rounded-full bg-sand text-carbon flex items-center justify-center">
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </div>
                            )}
                          </div>

                          <p className="text-[10px] text-neutral-400 font-light leading-relaxed min-h-[36px]">
                            {frec.description}
                          </p>

                          <div className="pt-2 border-t border-white/10 space-y-1">
                            <div className="text-xl font-mono font-bold text-sand">
                              ${totalPrice.toLocaleString('es-CL')} <span className="text-xs font-normal text-sand/80">(IVA incl.)</span>
                            </div>
                            <div className="text-[10px] font-mono text-neutral-400 flex justify-between">
                              <span>Total ({totalVisits} visitas):</span>
                              <span>~ {ufPrice.toFixed(2)} UF</span>
                            </div>
                            <div className="text-[10px] font-mono text-sand/80">
                              ~ ${Math.round(totalPrice / itoMonths).toLocaleString('es-CL')} / mes (IVA incl.)
                            </div>
                          </div>

                          <ul className="space-y-2 pt-2 border-t border-white/5 text-[10px] text-neutral-300 font-light">
                            {frec.features.map((feat, idx) => (
                              <li key={idx} className="flex items-start gap-1.5 leading-snug">
                                <span className="text-sand mt-0.5">•</span>
                                {feat}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <button
                          className={`mt-4 w-full py-2.5 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-colors ${
                            isSelected
                              ? 'bg-sand text-carbon'
                              : 'bg-white/5 text-cream border border-white/10 hover:bg-white/10'
                          }`}
                        >
                          {isSelected ? 'Frecuencia Elegida' : 'Seleccionar'}
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* MODALIDAD B: SELECCIÓN DE HITOS CRÍTICOS (CHECKBOXES) */
              <div className="space-y-4">
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <h2 className="font-heading text-xl font-extrabold text-cream uppercase tracking-wider flex items-center gap-2">
                    <Layers className="w-5 h-5 text-sand" />
                    3. Paquete Personalizado de Hitos Críticos
                  </h2>
                  <span className="text-xs font-mono text-sand font-bold">
                    {selectedHitos.length} de {ITO_HITOS.length} Hitos Seleccionados
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ITO_HITOS.map((hito) => {
                    const isChecked = selectedHitos.includes(hito.id);
                    const hitoPriceWithIva = Math.round(hito.price * IVA_FACTOR);

                    return (
                      <div
                        key={hito.id}
                        onClick={() => toggleHito(hito.id)}
                        className={`cursor-pointer rounded-2xl p-5 border flex flex-col justify-between transition-all duration-300 ${
                          isChecked
                            ? 'border-sand bg-stone-900/90 shadow-xl ring-1 ring-sand/30'
                            : 'border-white/10 bg-stone-900/30 hover:border-white/20'
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-2.5">
                              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                                isChecked ? 'bg-sand border-sand text-carbon' : 'border-white/30 bg-carbon'
                              }`}>
                                {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </div>
                              <div>
                                <span className="text-[10px] font-mono text-sand uppercase tracking-widest block">{hito.number}</span>
                                <h3 className="font-heading text-base font-bold text-cream uppercase tracking-wider">{hito.title}</h3>
                              </div>
                            </div>
                            <span className="font-mono text-sm font-bold text-sand shrink-0">
                              ${hitoPriceWithIva.toLocaleString('es-CL')} <span className="text-[10px] font-normal text-sand/80">(IVA incl.)</span>
                            </span>
                          </div>

                          <p className="text-[10px] text-neutral-400 font-light leading-relaxed">
                            {hito.description}
                          </p>

                          <ul className="space-y-1.5 border-t border-white/5 pt-2 text-[10px] text-neutral-300 font-light">
                            {hito.verifications.map((verif, vIdx) => (
                              <li key={vIdx} className="flex items-start gap-1.5 leading-snug">
                                <span className="text-sand mt-0.5">•</span>
                                {verif}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* RESUMEN FINAL & ACCIONES */}
            <div className="bg-[#181614] border border-sand/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute right-0 bottom-0 w-64 h-64 bg-sand/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
                <div>
                  <span className="text-[10px] font-mono text-sand uppercase tracking-widest block">Resumen de Cotización</span>
                  <h3 className="font-heading text-2xl font-extrabold text-cream uppercase tracking-wide">
                    {selectedType === 'ito' ? (
                      itoMode === 'frecuencia' ? `ITO ${currentFrecObj.name} (${itoMonths}m)` : `ITO Paquete (${selectedHitos.length} Hitos)`
                    ) : (
                      `${selectedPlanObj.name} (${m2} m²)`
                    )}
                  </h3>
                  <span className="text-xs text-neutral-400">
                    Servicio: {currentTypeObj.name} — Ubicación: {commune}
                  </span>
                </div>

                <div className="text-left md:text-right">
                  <span className="text-[10px] font-mono text-neutral-400 block uppercase tracking-wider">Total Estimado (IVA Incluido)</span>
                  <div className="text-3xl font-mono font-bold text-sand">
                    ${currentPriceClp.toLocaleString('es-CL')} <span className="text-xs font-normal text-cream/70">CLP (IVA incl.)</span>
                  </div>
                  <span className="text-xs font-mono text-neutral-400">
                    ~ {currentPriceUf.toFixed(2)} UF
                  </span>
                </div>
              </div>

              {/* BOTONES DE ACCIÓN: PDF Y WHATSAPP */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button
                  onClick={handleDownloadPdf}
                  disabled={pdfGenerating}
                  className="flex-1 bg-sand text-carbon hover:bg-[#a38b72] font-bold tracking-widest uppercase text-xs py-4 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  {pdfGenerating ? 'Generando PDF...' : 'Obtener Cotización ITO (PDF)'}
                </Button>

                <a
                  href={`https://wa.me/56989531450?text=${whatsappText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 border border-white/20 hover:border-sand/40 hover:bg-white/[0.04] text-cream hover:text-sand py-4 px-6 rounded-xl font-bold uppercase tracking-widest text-xs transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  Agendar por WhatsApp
                </a>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-neutral-400 pt-2 border-t border-white/5">
                <ShieldCheck className="w-4 h-4 text-sand" />
                Presupuesto respaldado por Constructora Contrapunto & Diego Stankovsky (ITO)
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default CotizadorItoSection;
