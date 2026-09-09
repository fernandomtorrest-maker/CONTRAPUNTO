'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ClipboardCheck,
  CheckCircle2,
  XCircle,
  MinusCircle,
  Plus,
  Trash2,
  Download,
  ArrowLeft,
  Building,
  FileText,
  RefreshCw,
  Droplets,
  ShieldCheck
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CONTRAPUNTO_LOGO_BASE64 } from '@/lib/data/logoBase64';

export type StatusType = 'CUMPLE' | 'OBSERVADO' | 'NO_APLICA';

export interface ChecklistItem {
  id: string;
  category: string;
  item: string;
  status: StatusType;
  observations: string;
  solution?: string;
}

export interface InspectionData {
  condominio: string;
  direccion: string;
  deptoAfectado: string;
  deptoOrigen: string;
  antiguedadSintomas: string;
  inspector: string;
  fecha: string;
  numeroReporte: string;
  dictamenGeneral: string;
}

const DEFAULT_CATEGORIES = [
  '💧 FILTRACIONES, HUMEDADES E IMPERMEABILIZACIÓN',
  '🏗️ OBRA GRUESA, LOSAS Y ESTRUCTURAS',
  '🎨 TERMINACIONES, CIELOS Y PINTURA',
  '🚰 INSTALACIONES SANITARIAS Y DESAGÜES',
  '⚡ INSTALACIONES ELÉCTRICAS Y SEGURIDAD',
  '🚪 PUERTAS, VENTANAS Y SELLOS DE SILICONA'
];

const INITIAL_ITEMS: ChecklistItem[] = [
  // Filtraciones e Impermeabilización
  {
    id: 'chk-1',
    category: '💧 FILTRACIONES, HUMEDADES E IMPERMEABILIZACIÓN',
    item: 'Prueba de estanqueidad y sellado de friso/cerámico en terraza superior',
    status: 'OBSERVADO',
    observations: 'Se detecta falla recurrente en la membrana impermeabilizante y fragüe desgastado en terraza de uso exclusivo del Depto 2001.',
    solution: 'Retiro de revestimiento cerámico dañado, retiro de frágil existente, aplicación de membrana líquida de poliuretano de alto rendimiento y re-fragüe epóxico.'
  },
  {
    id: 'chk-2',
    category: '💧 FILTRACIONES, HUMEDADES E IMPERMEABILIZACIÓN',
    item: 'Evacuación de aguas lluvias y limpiamanos de terraza',
    status: 'OBSERVADO',
    observations: 'Pendiente insuficiente hacia los embudos de aguas lluvias, provocando empozamiento cercano al paramento del Depto 1901.',
    solution: 'Reperfilado de pendiente (mínimo 1.5%) e instalación de cazoleta con rejilla de acero inoxidable.'
  },
  {
    id: 'chk-3',
    category: '💧 FILTRACIONES, HUMEDADES E IMPERMEABILIZACIÓN',
    item: 'Verificación de bajadas de agua servida y sifones en baño/cocina',
    status: 'CUMPLE',
    observations: 'Sin evidencias de fuga activa en cañerías verticales u horizontales de descarga interna.'
  },

  // Terminaciones y Cielos
  {
    id: 'chk-4',
    category: '🎨 TERMINACIONES, CIELOS Y PINTURA',
    item: 'Inspección de cielo raso y muros en dormitorios (Depto 1901)',
    status: 'OBSERVADO',
    observations: 'Desprendimiento de enlucido de yeso, abombamiento de látex y goteo constante en cielo de dormitorio principal y dormitorio secundario.',
    solution: 'Raspado de enlucido afectado, tratamiento anti-hongos, empaste de alta adherencia y aplicación de 2 manos de pintura esmalte al agua.'
  },
  {
    id: 'chk-5',
    category: '🎨 TERMINACIONES, CIELOS Y PINTURA',
    item: 'Estado de revestimientos en cocina y pasillo de distribución',
    status: 'OBSERVADO',
    observations: 'Manchas de humedad e eflorescencia salina en encuentro de cielo y losa de hormigón armado.',
    solution: 'Secado técnico con deshumidificador industrial y re-pintado con sellante impermeabilizante de bloqueo.'
  },

  // Estructuras
  {
    id: 'chk-6',
    category: '🏗️ OBRA GRUESA, LOSAS Y ESTRUCTURAS',
    item: 'Integridad estructural de losa de hormigón armado entre pisos 19 y 20',
    status: 'CUMPLE',
    observations: 'Losa estructural sin grietas críticas de flexión; la afectación es de carácter superficial por infiltración de agua lluvia superior.'
  },

  // Sanitarias
  {
    id: 'chk-7',
    category: '🚰 INSTALACIONES SANITARIAS Y DESAGÜES',
    item: 'Prueba de presión y estanqueidad en redes de agua fría y caliente',
    status: 'CUMPLE',
    observations: 'Presión constante en 2.8 bar. Red sin variaciones de presión durante prueba de estanqueidad de 30 min.'
  },

  // Puertas y Ventanas
  {
    id: 'chk-8',
    category: '🚪 PUERTAS, VENTANAS Y SELLOS DE SILICONA',
    item: 'Sellado perimetral de ventanales y botaaguas de terraza',
    status: 'OBSERVADO',
    observations: 'Silicona perimetral cristalizada y desprendida en el ventanal de aluminio de la terraza.',
    solution: 'Remoción de caucho/silicona vieja y re-sellado con silicona neutra de exterior resistente a rayos UV.'
  }
];

export function ChecklistSupremoSection() {
  const [data, setData] = useState<InspectionData>({
    condominio: 'Condominio Trinos de Santiago',
    direccion: 'General Jofré 107, Santiago',
    deptoAfectado: 'Depto 1901',
    deptoOrigen: 'Depto 2001 (Terraza de uso exclusivo)',
    antiguedadSintomas: 'Filtración recurrente al llover desde hace 3 años; goteo activo en 2 dormitorios y cocina.',
    inspector: 'Fernando Torres',
    fecha: new Date().toISOString().split('T')[0],
    numeroReporte: 'CHK-2026-107',
    dictamenGeneral: 'Se concluye técnicamente que la humedad proviene de la falla en la membrana impermeabilizante y pendiente de la terraza del Depto 2001. Se recomienda ejecución urgente de sellado epóxico y reparación de cielos del Depto 1901.'
  });

  const [items, setItems] = useState<ChecklistItem[]>(INITIAL_ITEMS);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('TODAS');
  const [customItemText, setCustomItemText] = useState('');
  const [customCategory, setCustomCategory] = useState(DEFAULT_CATEGORIES[0]);
  const [generatingPdf, setGeneratingPdf] = useState(false);

  // Cargar caso de ejemplo Jofré 107
  const handleLoadJofreCase = () => {
    setData({
      condominio: 'Condominio Trinos de Santiago',
      direccion: 'General Jofré 107, Santiago',
      deptoAfectado: 'Depto 1901 (Propietarios: Padres del Solicitante)',
      deptoOrigen: 'Depto 2001 (Terraza de uso exclusivo)',
      antiguedadSintomas: '3 años con filtración constante en épocas de lluvia. Goteo visible en dormitorio principal y daños en cocina.',
      inspector: 'Fernando Torres - Inspector Técnico ITO',
      fecha: new Date().toISOString().split('T')[0],
      numeroReporte: 'CHK-JOFRE-107',
      dictamenGeneral: 'Diagnóstico Confirmado: La patología responde a percolación de agua lluvia a través de las juntas de dilatación y fragües fracturados en la terraza superior del Depto 2001, afectando directamente la losa del Depto 1901.'
    });
    setItems(INITIAL_ITEMS);
  };

  // Cambiar estado de un ítem
  const handleStatusChange = (id: string, status: StatusType) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, status } : item));
  };

  // Cambiar observación de un ítem
  const handleObservationChange = (id: string, obs: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, observations: obs } : item));
  };

  // Cambiar solución propuesta de un ítem
  const handleSolutionChange = (id: string, sol: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, solution: sol } : item));
  };

  // Eliminar ítem
  const handleDeleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  // Agregar nuevo ítem personalizado
  const handleAddCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customItemText.trim()) return;

    const newItem: ChecklistItem = {
      id: `chk-custom-${Date.now()}`,
      category: customCategory,
      item: customItemText.trim(),
      status: 'OBSERVADO',
      observations: 'Observación técnica registrada durante la inspección.',
      solution: 'Reparación o subsanación recomendada.'
    };

    setItems(prev => [...prev, newItem]);
    setCustomItemText('');
  };

  // Estadísticas rápidas
  const totalCumple = items.filter(i => i.status === 'CUMPLE').length;
  const totalObservado = items.filter(i => i.status === 'OBSERVADO').length;
  const totalNoAplica = items.filter(i => i.status === 'NO_APLICA').length;
  const porcentajeAprobacion = items.length > 0 ? Math.round((totalCumple / items.length) * 100) : 0;

  // GENERACIÓN DEL INFORME PDF OFICIAL DE CHECKLIST SUPREMO
  const handleDownloadPdf = async () => {
    setGeneratingPdf(true);
    try {
      const doc = new jsPDF({ unit: 'mm', format: 'a4' });
      const pageWidth = doc.internal.pageSize.width;

      // 1. LOGO Y ENCABEZADO INSTITUCIONAL
      try {
        doc.addImage(CONTRAPUNTO_LOGO_BASE64, 'PNG', 15, 12, 38, 19);
      } catch {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        doc.setTextColor(217, 119, 6);
        doc.text('CONTRAPUNTO', 15, 22);
      }

      // Título Informe Supremo
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(31, 41, 55);
      doc.text('INFORME TÉCNICO DE INSPECCIÓN', pageWidth - 15, 20, { align: 'right' });

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(217, 119, 6);
      doc.text('CHECKLIST SUPREMO ITO', pageWidth - 15, 25, { align: 'right' });

      doc.setFont('helvetica', 'oblique');
      doc.setFontSize(8.5);
      doc.setTextColor(107, 114, 128);
      doc.text(`${data.numeroReporte} | Fecha: ${data.fecha}`, pageWidth - 15, 30, { align: 'right' });

      // Línea divisoria dorada
      doc.setDrawColor(217, 119, 6);
      doc.setLineWidth(0.5);
      doc.line(15, 34, pageWidth - 15, 34);

      // 2. CUADRO FICHA DE LA OBRA / DIAGNÓSTICO
      doc.setFillColor(248, 250, 252);
      doc.rect(15, 38, pageWidth - 30, 32, 'F');
      doc.setDrawColor(226, 232, 240);
      doc.rect(15, 38, pageWidth - 30, 32, 'S');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(217, 119, 6);
      doc.text('INFORMACIÓN GENERAL DE LA OBRA & DIAGNÓSTICO', 18, 44);

      doc.setFontSize(8);
      doc.setTextColor(55, 65, 81);

      doc.setFont('helvetica', 'bold');
      doc.text('Condominio/Edificación:', 18, 50);
      doc.setFont('helvetica', 'normal');
      doc.text(data.condominio, 53, 50);

      doc.setFont('helvetica', 'bold');
      doc.text('Dirección:', 18, 55);
      doc.setFont('helvetica', 'normal');
      doc.text(data.direccion, 53, 55);

      doc.setFont('helvetica', 'bold');
      doc.text('Unidad Afectada:', 18, 60);
      doc.setFont('helvetica', 'normal');
      doc.text(data.deptoAfectado, 53, 60);

      doc.setFont('helvetica', 'bold');
      doc.text('Inspector A Cargo:', 115, 50);
      doc.setFont('helvetica', 'normal');
      doc.text(data.inspector, 145, 50);

      doc.setFont('helvetica', 'bold');
      doc.text('Unidad Origen:', 115, 55);
      doc.setFont('helvetica', 'normal');
      doc.text(data.deptoOrigen, 145, 55);

      doc.setFont('helvetica', 'bold');
      doc.text('Antigüedad/Síntomas:', 115, 60);
      doc.setFont('helvetica', 'normal');
      const sintomaSplit = doc.splitTextToSize(data.antiguedadSintomas, 48);
      doc.text(sintomaSplit, 145, 60);

      // Resumen estadístico visual
      doc.setFillColor(254, 243, 199);
      doc.rect(15, 73, pageWidth - 30, 8, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(180, 83, 9);
      doc.text(`RESUMEN DE INSPECCIÓN: ${items.length} Puntos Evaluados  |  ✅ Conformes: ${totalCumple}  |  ❌ Observados: ${totalObservado}  |  ⚪ No Aplica: ${totalNoAplica}  |  Índice de Aprobación: ${porcentajeAprobacion}%`, 18, 78);

      // 3. TABLA DE CHECKLIST DETALLADO
      const tableData = items.map((item, idx) => {
        let statusLabel = 'CUMPLE';
        if (item.status === 'OBSERVADO') statusLabel = 'OBSERVADO';
        if (item.status === 'NO_APLICA') statusLabel = 'N/A';

        let fullObs = `• Ítem: ${item.item}\n• Hallazgo: ${item.observations}`;
        if (item.solution && item.solution.trim()) {
          fullObs += `\n• Reparación Sugerida: ${item.solution}`;
        }

        return [
          String(idx + 1).padStart(2, '0'),
          item.category.replace(/[^a-zA-Z0-9\sÁÉÍÓÚáéíóúÑñ]/g, '').trim(),
          statusLabel,
          fullObs
        ];
      });

      autoTable(doc, {
        startY: 84,
        head: [['Nº', 'Capítulo / Especialidad', 'Estado', 'Punto Inspeccionado & Observación Técnica']],
        body: tableData,
        theme: 'grid',
        headStyles: {
          fillColor: [31, 41, 55],
          textColor: [255, 255, 255],
          fontSize: 8,
          fontStyle: 'bold',
          halign: 'left'
        },
        columnStyles: {
          0: { cellWidth: 10, halign: 'center' },
          1: { cellWidth: 42, fontStyle: 'bold' },
          2: { cellWidth: 22, halign: 'center', fontStyle: 'bold' },
          3: { cellWidth: 'auto' }
        },
        styles: {
          fontSize: 7.5,
          cellPadding: 2.5,
          overflow: 'linebreak'
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        didParseCell: (data: any) => {
          if (data.section === 'body' && data.column.index === 2) {
            const val = data.cell.raw;
            if (val === 'CUMPLE') {
              data.cell.styles.textColor = [16, 185, 129];
            } else if (val === 'OBSERVADO') {
              data.cell.styles.textColor = [239, 68, 68];
            } else {
              data.cell.styles.textColor = [156, 163, 175];
            }
          }
        }
      });

      // 4. DICTAMEN FINAL Y FIRMAS
      const docWithAutoTable = doc as unknown as { lastAutoTable?: { finalY: number } };
      let finalY = docWithAutoTable.lastAutoTable ? docWithAutoTable.lastAutoTable.finalY + 8 : 200;

      if (finalY + 50 > 280) {
        doc.addPage();
        finalY = 20;
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(217, 119, 6);
      doc.text('DICTAMEN TÉCNICO FINAL DE LA INSPECCIÓN', 15, finalY);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(55, 65, 81);
      const dictamenLines = doc.splitTextToSize(data.dictamenGeneral, pageWidth - 30);
      doc.text(dictamenLines, 15, finalY + 5);

      const firmasY = finalY + 28;

      // Cuadro de Firma Inspector
      doc.setDrawColor(200);
      doc.setLineWidth(0.2);
      doc.line(25, firmasY, 85, firmasY);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.text(data.inspector, 55, firmasY + 4, { align: 'center' });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(100, 100, 100);
      doc.text('Inspector Técnico ITO - Contrapunto', 55, firmasY + 8, { align: 'center' });

      // Cuadro de Firma Cliente
      doc.line(125, firmasY, 185, firmasY);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(55, 65, 81);
      doc.text('Firma Recepción Cliente / Propietario', 155, firmasY + 4, { align: 'center' });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(100, 100, 100);
      doc.text('Conformidad de Informe de Inspección', 155, firmasY + 8, { align: 'center' });

      // Pie de página oficial
      doc.setFontSize(7);
      doc.setTextColor(156, 163, 175);
      doc.text('Constructora Contrapunto © 2026 • Informe de Inspección Técnica ITO Oficial', pageWidth / 2, 287, { align: 'center' });

      doc.save(`Checklist_Supremo_${data.numeroReporte}.pdf`);
    } catch (err) {
      console.error('Error al generar PDF de Checklist:', err);
      alert('Ocurrió un error al generar el PDF.');
    } finally {
      setGeneratingPdf(false);
    }
  };

  const filteredItems = selectedCategoryFilter === 'TODAS'
    ? items
    : items.filter(i => i.category === selectedCategoryFilter);

  return (
    <div className="min-h-screen bg-[#0f0e0c] text-cream font-body selection:bg-sand selection:text-carbon pb-24">
      
      {/* HEADER PRINCIPAL */}
      <header className="border-b border-stone-850 bg-[#161412]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="p-2 rounded-xl bg-stone-900 border border-stone-800 hover:border-sand text-cream transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
                <ClipboardCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-sand font-bold tracking-widest uppercase block">
                  MÓDULO DE INSPECCIÓN ITO & PRE-ENTREGA
                </span>
                <h1 className="font-heading text-xl font-extrabold uppercase tracking-wide text-cream">
                  Checklist Supremo
                </h1>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLoadJofreCase}
              className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-amber-300 border border-amber-500/30 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer"
            >
              <Droplets className="w-4 h-4 text-amber-400" />
              <span>Cargar Caso Real (Jofré 107)</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={generatingPdf}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-carbon font-bold px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all shadow-lg cursor-pointer"
            >
              {generatingPdf ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Generando PDF...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" /> Generar PDF Supremo
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-8">

        {/* TARJETA 1: DATOS DE LA OBRA Y PROPIEDAD */}
        <div className="bg-[#181614] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <Building className="w-5 h-5 text-sand" />
              <h2 className="font-heading text-lg font-bold uppercase text-cream tracking-wide">
                Información del Inmueble & Antecedentes Técnicos
              </h2>
            </div>
            <span className="text-[10px] font-mono bg-sand/15 text-sand border border-sand/30 px-2.5 py-1 rounded-full uppercase">
              {data.numeroReporte}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <label className="block text-cream/50 mb-1">CONDOMINIO / EDIFICIO</label>
              <input
                type="text"
                value={data.condominio}
                onChange={e => setData({ ...data, condominio: e.target.value })}
                className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 focus:outline-none focus:border-sand"
                placeholder="Ej. Condominio Trinos de Santiago"
              />
            </div>

            <div>
              <label className="block text-cream/50 mb-1">DIRECCIÓN DE LA OBRA</label>
              <input
                type="text"
                value={data.direccion}
                onChange={e => setData({ ...data, direccion: e.target.value })}
                className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 focus:outline-none focus:border-sand"
                placeholder="Ej. General Jofré 107, Santiago"
              />
            </div>

            <div>
              <label className="block text-cream/50 mb-1">DEPTO / UNIDAD AFECTADA</label>
              <input
                type="text"
                value={data.deptoAfectado}
                onChange={e => setData({ ...data, deptoAfectado: e.target.value })}
                className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 focus:outline-none focus:border-sand"
                placeholder="Ej. Depto 1901"
              />
            </div>

            <div>
              <label className="block text-cream/50 mb-1">DEPTO / ORIGEN COLINDANTE</label>
              <input
                type="text"
                value={data.deptoOrigen}
                onChange={e => setData({ ...data, deptoOrigen: e.target.value })}
                className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 focus:outline-none focus:border-sand"
                placeholder="Ej. Depto 2001 (Terraza superior)"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-cream/50 mb-1">SÍNTOMAS & ANTIGÜEDAD DEL PROBLEMA</label>
              <input
                type="text"
                value={data.antiguedadSintomas}
                onChange={e => setData({ ...data, antiguedadSintomas: e.target.value })}
                className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 focus:outline-none focus:border-sand"
                placeholder="Ej. 3 años de filtración recurrente al llover..."
              />
            </div>

            <div>
              <label className="block text-cream/50 mb-1">INSPECTOR ITO RESPONSABLE</label>
              <input
                type="text"
                value={data.inspector}
                onChange={e => setData({ ...data, inspector: e.target.value })}
                className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 focus:outline-none focus:border-sand"
              />
            </div>

            <div>
              <label className="block text-cream/50 mb-1">FECHA DE INSPECCIÓN</label>
              <input
                type="date"
                value={data.fecha}
                onChange={e => setData({ ...data, fecha: e.target.value })}
                className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 focus:outline-none focus:border-sand"
              />
            </div>
          </div>
        </div>

        {/* TARJETA 2: RESUMEN ESTADÍSTICO DE HALLAZGOS */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-[#181614] border border-white/10 rounded-2xl p-4 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <ClipboardCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-neutral-400 uppercase block">Total Puntos</span>
              <strong className="text-xl font-mono text-cream">{items.length}</strong>
            </div>
          </div>

          <div className="bg-[#181614] border border-emerald-500/30 rounded-2xl p-4 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase block">Conformes ✅</span>
              <strong className="text-xl font-mono text-emerald-300">{totalCumple}</strong>
            </div>
          </div>

          <div className="bg-[#181614] border border-red-500/30 rounded-2xl p-4 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
              <XCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-red-400 uppercase block">Observados ❌</span>
              <strong className="text-xl font-mono text-red-300">{totalObservado}</strong>
            </div>
          </div>

          <div className="bg-[#181614] border border-amber-500/30 rounded-2xl p-4 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-amber-400 uppercase block">% Aprobación</span>
              <strong className="text-xl font-mono text-amber-300">{porcentajeAprobacion}%</strong>
            </div>
          </div>
        </div>

        {/* TARJETA 3: AGREGAR PUNTO PERSONALIZADO & FILTROS */}
        <div className="bg-[#181614] border border-white/10 rounded-3xl p-6 space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-neutral-400">Filtrar por Capítulo:</span>
              <select
                value={selectedCategoryFilter}
                onChange={e => setSelectedCategoryFilter(e.target.value)}
                className="bg-stone-900 border border-white/10 text-cream rounded-xl px-3 py-1.5 text-xs font-mono focus:outline-none focus:border-sand cursor-pointer"
              >
                <option value="TODAS">Ver Todos los Capítulos ({items.length})</option>
                {DEFAULT_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* FORMULARIO AGREGAR ÍTEM PERSONALIZADO */}
            <form onSubmit={handleAddCustomItem} className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
              <select
                value={customCategory}
                onChange={e => setCustomCategory(e.target.value)}
                className="bg-stone-900 border border-white/10 text-cream rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-sand cursor-pointer"
              >
                {DEFAULT_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Escribe un nuevo punto a inspeccionar..."
                value={customItemText}
                onChange={e => setCustomItemText(e.target.value)}
                className="bg-stone-900 border border-white/10 text-cream rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-sand flex-1 sm:w-64"
              />
              <button
                type="submit"
                className="bg-sand text-carbon hover:bg-[#a38b72] font-bold text-xs px-3.5 py-2 rounded-xl font-mono uppercase tracking-wider flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Agregar
              </button>
            </form>
          </div>
        </div>

        {/* TARJETA 4: MATRIZ DE PUNTOS CON CASILLAS 3 ESTADOS Y DESCRIPCIÓN */}
        <div className="space-y-4">
          <h2 className="font-heading text-lg font-bold uppercase text-cream tracking-wide flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-sand" />
            Matriz Detallada de Inspección & Hallazgos Técnicos
          </h2>

          <div className="space-y-4">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className={`bg-[#181614] border rounded-2xl p-5 space-y-3 transition-all ${
                  item.status === 'CUMPLE'
                    ? 'border-emerald-500/30'
                    : item.status === 'OBSERVADO'
                    ? 'border-red-500/40'
                    : 'border-white/10'
                }`}
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded uppercase">
                      {item.category}
                    </span>
                    <h3 className="font-mono text-sm font-bold text-cream flex items-center gap-2">
                      <span className="text-neutral-500">#{index + 1}</span>
                      {item.item}
                    </h3>
                  </div>

                  {/* CASILLAS DE VERIFICACIÓN (3 ESTADOS) */}
                  <div className="flex items-center gap-2 shrink-0 bg-stone-900/90 p-1.5 rounded-xl border border-white/10 font-mono text-xs">
                    <button
                      type="button"
                      onClick={() => handleStatusChange(item.id, 'CUMPLE')}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                        item.status === 'CUMPLE'
                          ? 'bg-emerald-500 text-carbon shadow-md'
                          : 'text-neutral-400 hover:text-emerald-400'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Cumple
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStatusChange(item.id, 'OBSERVADO')}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                        item.status === 'OBSERVADO'
                          ? 'bg-red-500 text-white shadow-md'
                          : 'text-neutral-400 hover:text-red-400'
                      }`}
                    >
                      <XCircle className="w-3.5 h-3.5" /> Observado
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStatusChange(item.id, 'NO_APLICA')}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                        item.status === 'NO_APLICA'
                          ? 'bg-stone-700 text-white shadow-md'
                          : 'text-neutral-400 hover:text-cream'
                      }`}
                    >
                      <MinusCircle className="w-3.5 h-3.5" /> N/A
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors ml-1"
                      title="Eliminar punto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* CAJAS DE DESCRIPCIÓN & SOLUCIÓN RECOMENDADA */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 font-mono text-xs">
                  <div>
                    <label className="block text-[10px] text-neutral-400 mb-1">
                      💬 HALLAZGO / OBSERVACIÓN TÉCNICA:
                    </label>
                    <textarea
                      rows={2}
                      value={item.observations}
                      onChange={e => handleObservationChange(item.id, e.target.value)}
                      className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-2.5 focus:outline-none focus:border-sand"
                      placeholder="Describe la falla, grieta o problema hallado..."
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-amber-300 mb-1">
                      🛠️ REPARACIÓN & SUBSANACIÓN RECOMENDADA:
                    </label>
                    <textarea
                      rows={2}
                      value={item.solution || ''}
                      onChange={e => handleSolutionChange(item.id, e.target.value)}
                      className="w-full bg-stone-900 border border-amber-500/20 text-cream rounded-xl p-2.5 focus:outline-none focus:border-sand"
                      placeholder="Escribe la solución técnica o tratamiento sugerido..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TARJETA 5: DICTAMEN TÉCNICO FINAL Y RESUMEN */}
        <div className="bg-[#181614] border border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-amber-400">
            <FileText className="w-5 h-5" />
            <h3 className="font-heading text-base font-bold uppercase tracking-wider">
              Dictamen Técnico Final del Inspector ITO
            </h3>
          </div>
          <textarea
            rows={3}
            value={data.dictamenGeneral}
            onChange={e => setData({ ...data, dictamenGeneral: e.target.value })}
            className="w-full bg-stone-900 border border-white/10 text-cream rounded-2xl p-4 text-xs font-mono focus:outline-none focus:border-sand"
            placeholder="Escribe la conclusión general de la inspección para el informe final..."
          />
        </div>

      </main>
    </div>
  );
}
