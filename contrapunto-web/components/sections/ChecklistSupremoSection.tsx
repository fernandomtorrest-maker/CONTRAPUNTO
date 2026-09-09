'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ClipboardCheck,
  CheckSquare,
  XSquare,
  MinusSquare,
  Plus,
  Trash2,
  Download,
  ArrowLeft,
  Building,
  FileText,
  RefreshCw,
  Droplets,
  ShieldCheck,
  Edit3,
  RotateCcw
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CONTRAPUNTO_LOGO_BASE64 } from '@/lib/data/logoBase64';

export type StatusType = 'SI_CUMPLE' | 'NO_CUMPLE' | 'NO_APLICA';

export interface ChecklistItem {
  id: string;
  category: string;
  item: string;
  status: StatusType;
  observations: string;
  solution?: string;
}

export interface InspectionData {
  tituloInspeccion: string;
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
  'GENERAL & INFORMACIÓN DE OBRA',
  '💧 IMPERMEABILIZACIÓN & FILTRACIONES',
  '🏗️ ESTRUCTURAS & LOSAS',
  '🎨 TERMINACIONES, PINTURA & CIELOS',
  '🚰 SANITARIAS, REDES & DESAGÜES',
  '⚡ ELÉCTRICAS & SEGURIDAD',
  '🚪 PUERTAS, VENTANAS & CRISTALES'
];

// PLANTILLA 1: GENÉRICA 100% EDITABLE EN BLANCO/BASE
const GENERIC_TEMPLATE_ITEMS: ChecklistItem[] = [
  {
    id: 'chk-g1',
    category: 'GENERAL & INFORMACIÓN DE OBRA',
    item: 'Verificación visual inicial de la superficie u obra a inspeccionar',
    status: 'SI_CUMPLE',
    observations: 'Inspección visual inicial sin deformaciones o anomalías críticas a simple vista.'
  },
  {
    id: 'chk-g2',
    category: 'GENERAL & INFORMACIÓN DE OBRA',
    item: 'Cumplimiento de especificaciones técnicas y materiales requeridos',
    status: 'SI_CUMPLE',
    observations: 'Insumos instalados corresponden a la marca y formato solicitado.'
  },
  {
    id: 'chk-g3',
    category: '💧 IMPERMEABILIZACIÓN & FILTRACIONES',
    item: 'Prueba de agua / estanqueidad o hermeticidad en la zona inspeccionada',
    status: 'NO_CUMPLE',
    observations: 'Escriba aquí la descripción o hallazgo técnico del problema detectado...',
    solution: 'Escriba aquí la solución técnica o reparación recomendada...'
  },
  {
    id: 'chk-g4',
    category: '🎨 TERMINACIONES, PINTURA & CIELOS',
    item: 'Estado de nivelación, aplomo y empaste en muros / cielos',
    status: 'SI_CUMPLE',
    observations: 'Superficie aplomada y libre de abombamientos.'
  },
  {
    id: 'chk-g5',
    category: '⚡ ELÉCTRICAS & SEGURIDAD',
    item: 'Prueba de funcionamiento de tableros, tomacorrientes y tierras',
    status: 'SI_CUMPLE',
    observations: 'Operación continua y verificación de disyuntor diferencial.'
  }
];

// PLANTILLA 2: CASO REAL FILTRACIÓN (JOFRÉ 107)
const JOFRE_TEMPLATE_ITEMS: ChecklistItem[] = [
  {
    id: 'chk-j1',
    category: '💧 IMPERMEABILIZACIÓN & FILTRACIONES',
    item: 'Evaluación de revestimiento y fragües en terraza superior (Depto 2001)',
    status: 'NO_CUMPLE',
    observations: 'El edificio tiene 25 años (entregado el año 2001). Es normal que superficies expuestas a la intemperie con esta data demuestren signos de fatiga de material y requieran mantenimiento. Sin embargo, no se ha podido revisar en detalle la terraza por no contar con acceso a esta.',
    solution: 'Procedimiento recomendado a priori: Retiro de cerámica en el departamento 2001, aplicar membrana impermeabilizante cementicia e instalación de pavimento nuevo por definir. Renovar sellos.'
  },
  {
    id: 'chk-j2',
    category: '💧 IMPERMEABILIZACIÓN & FILTRACIONES',
    item: 'Evacuación de aguas lluvias y pendiente hacia embudos de terraza',
    status: 'NO_CUMPLE',
    observations: 'Pendiente insuficiente hacia los embudos de aguas lluvias, provocando empozamiento cercano al paramento del Depto 1901 en épocas de lluvia.',
    solution: 'Reperfilado de pendiente (mínimo 1.5%) e instalación de cazoleta con rejilla de acero inoxidable.'
  },
  {
    id: 'chk-j3',
    category: '🎨 TERMINACIONES, PINTURA & CIELOS',
    item: 'Inspección de cielo raso y muros en dormitorios y cocina (Depto 1901)',
    status: 'NO_CUMPLE',
    observations: 'Desprendimiento de enlucido de yeso, abombamiento de látex y goteo activo en cielos de 2 dormitorios y cocina con origen desde la terraza superior.',
    solution: 'Raspado de enlucido afectado, tratamiento anti-hongos, empaste de alta adherencia y aplicación de 2 manos de pintura esmalte al agua.'
  },
  {
    id: 'chk-j4',
    category: '🏗️ ESTRUCTURAS & REVISIÓN DE PLANOS',
    item: 'Integridad de losa estructural e inspección de planos del edificio',
    status: 'SI_CUMPLE',
    observations: 'Losa de hormigón armado entre pisos 19 y 20 sin grietas estructurales críticas de flexión. Pudimos conseguir los planos técnicos del edificio con el mayordomo para corroborar trazados.',
    solution: 'Cotejo satisfactorio con planos de arquitectura e instalaciones facilitados por la mayordomía del condominio.'
  },
  {
    id: 'chk-j5',
    category: '🚪 PUERTAS, VENTANAS & SELLOS DE SILICONA',
    item: 'Sellado perimetral de ventanales y botaaguas de terraza',
    status: 'NO_CUMPLE',
    observations: 'Silicona perimetral cristalizada y desprendida en el ventanal de aluminio de la terraza por fatiga natural del material a la intemperie (25 años).',
    solution: 'Remoción de sellantes desgastados y re-sellado con silicona neutra de exterior resistente a rayos UV.'
  }
];

export function ChecklistSupremoSection() {
  const [data, setData] = useState<InspectionData>({
    tituloInspeccion: 'INFORME TÉCNICO DE INSPECCIÓN ITO',
    condominio: 'Condominio Trinos de Santiago',
    direccion: 'General Jofré 107, Santiago',
    deptoAfectado: 'Depto 1901',
    deptoOrigen: 'Depto 2001 (Terraza de uso exclusivo)',
    antiguedadSintomas: 'Edificio entregado el año 2001 (25 años). Fatiga de material por intemperie. Filtración recurrente hace 3 años en 2 dormitorios y cocina. Planos conseguidos con mayordomo.',
    inspector: 'Fernando Torres',
    fecha: new Date().toISOString().split('T')[0],
    numeroReporte: 'CHK-2026-107',
    dictamenGeneral: 'El edificio tiene 25 años. Entregado el año 2001. Es normal que superficies expuestas a la intemperie con esta data demuestren signos de fatiga de material y requieran mantenimiento.\n\nEl procedimiento recomendado a priori, sin todavía revisar en detalle la terraza por no contar con acceso a esta, es retiro de cerámica en el departamento 2001, aplicar membrana impermeabilizante cementicia e instalación de pavimento nuevo por definir. Renovar sellos.\n\nNota: Pudimos conseguir los planos con el mayordomo.'
  });

  const [items, setItems] = useState<ChecklistItem[]>(JOFRE_TEMPLATE_ITEMS);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('TODAS');
  const [customItemText, setCustomItemText] = useState('');
  const [customCategory, setCustomCategory] = useState(DEFAULT_CATEGORIES[0]);
  const [generatingPdf, setGeneratingPdf] = useState(false);

  // Cargar Plantilla Genérica Vacía Editable
  const handleLoadGenericTemplate = () => {
    setData({
      tituloInspeccion: 'INSPECCIÓN TÉCNICA GENERAL DE OBRA',
      condominio: 'Nombre de la Obra / Condominio / Casa',
      direccion: 'Dirección del Inmueble',
      deptoAfectado: 'Unidad / Sector Afectado',
      deptoOrigen: 'Sector / Origen de Inspección',
      antiguedadSintomas: 'Descripción general del motivo de inspección...',
      inspector: 'Inspector Responsable',
      fecha: new Date().toISOString().split('T')[0],
      numeroReporte: `CHK-${Date.now().toString().slice(-4)}`,
      dictamenGeneral: 'Dictamen y conclusiones finales de la inspección técnica...'
    });
    setItems(GENERIC_TEMPLATE_ITEMS);
  };

  // Cargar Caso Real Jofré 107
  const handleLoadJofreCase = () => {
    setData({
      tituloInspeccion: 'INFORME TÉCNICO DE INSPECCIÓN ITO',
      condominio: 'Condominio Trinos de Santiago',
      direccion: 'General Jofré 107, Santiago',
      deptoAfectado: 'Depto 1901',
      deptoOrigen: 'Depto 2001 (Terraza de uso exclusivo)',
      antiguedadSintomas: 'Edificio entregado el año 2001 (25 años). Fatiga de material por intemperie. Filtración recurrente hace 3 años en 2 dormitorios y cocina. Planos conseguidos con mayordomo.',
      inspector: 'Fernando Torres',
      fecha: new Date().toISOString().split('T')[0],
      numeroReporte: 'CHK-2026-107',
      dictamenGeneral: 'El edificio tiene 25 años. Entregado el año 2001. Es normal que superficies expuestas a la intemperie con esta data demuestren signos de fatiga de material y requieran mantenimiento.\n\nEl procedimiento recomendado a priori, sin todavía revisar en detalle la terraza por no contar con acceso a esta, es retiro de cerámica en el departamento 2001, aplicar membrana impermeabilizante cementicia e instalación de pavimento nuevo por definir. Renovar sellos.\n\nNota: Pudimos conseguir los planos con el mayordomo.'
    });
    setItems(JOFRE_TEMPLATE_ITEMS);
  };

  // Cambiar estado de un ítem con 1 clic (SI_CUMPLE / NO_CUMPLE / NO_APLICA)
  const handleStatusChange = (id: string, status: StatusType) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, status } : item));
  };

  // Editar directamente el nombre del criterio
  const handleItemNameChange = (id: string, newName: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, item: newName } : item));
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

  // Agregar nuevo criterio personalizado
  const handleAddCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customItemText.trim()) return;

    const newItem: ChecklistItem = {
      id: `chk-custom-${Date.now()}`,
      category: customCategory,
      item: customItemText.trim(),
      status: 'NO_CUMPLE',
      observations: 'Escriba aquí la descripción u observación técnica...',
      solution: 'Escriba aquí la solución o subsanación recomendada...'
    };

    setItems(prev => [...prev, newItem]);
    setCustomItemText('');
  };

  // Limpiar todos los ítems para empezar de cero
  const handleClearAllItems = () => {
    if (confirm('¿Deseas limpiar todos los criterios para crear un checklist nuevo desde cero?')) {
      setItems([]);
    }
  };

  // Estadísticas rápidas
  const totalCumple = items.filter(i => i.status === 'SI_CUMPLE').length;
  const totalNoCumple = items.filter(i => i.status === 'NO_CUMPLE').length;
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
      doc.setFontSize(14);
      doc.setTextColor(31, 41, 55);
      doc.text(data.tituloInspeccion.toUpperCase(), pageWidth - 15, 20, { align: 'right' });

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(217, 119, 6);
      doc.text('INFORME TÉCNICO CHECKLIST SUPREMO', pageWidth - 15, 25, { align: 'right' });

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
      doc.text('INFORMACIÓN GENERAL DE LA OBRA & INSPECCIÓN', 18, 44);

      doc.setFontSize(8);
      doc.setTextColor(55, 65, 81);

      doc.setFont('helvetica', 'bold');
      doc.text('Obra / Condominio:', 18, 50);
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
      doc.text('Inspector ITO:', 115, 50);
      doc.setFont('helvetica', 'normal');
      doc.text(data.inspector, 145, 50);

      doc.setFont('helvetica', 'bold');
      doc.text('Unidad Origen:', 115, 55);
      doc.setFont('helvetica', 'normal');
      doc.text(data.deptoOrigen, 145, 55);

      doc.setFont('helvetica', 'bold');
      doc.text('Motivo / Síntomas:', 115, 60);
      doc.setFont('helvetica', 'normal');
      const sintomaSplit = doc.splitTextToSize(data.antiguedadSintomas, 48);
      doc.text(sintomaSplit, 145, 60);

      // Resumen estadístico visual
      doc.setFillColor(254, 243, 199);
      doc.rect(15, 73, pageWidth - 30, 8, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(180, 83, 9);
      doc.text(`RESUMEN DE INSPECCIÓN: ${items.length} Criterios Evaluados  |  ✅ SI CUMPLE: ${totalCumple}  |  ❌ NO CUMPLE: ${totalNoCumple}  |  ⚪ N/A: ${totalNoAplica}  |  Índice de Aprobación: ${porcentajeAprobacion}%`, 18, 78);

      // 3. TABLA DE CHECKLIST DETALLADO
      const tableData = items.map((item, idx) => {
        let statusLabel = 'SI CUMPLE';
        if (item.status === 'NO_CUMPLE') statusLabel = 'NO CUMPLE';
        if (item.status === 'NO_APLICA') statusLabel = 'N/A';

        let fullObs = `• Criterio: ${item.item}\n• Descripción / Hallazgo: ${item.observations}`;
        if (item.solution && item.solution.trim()) {
          fullObs += `\n• Solución / Subsanación: ${item.solution}`;
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
        head: [['Nº', 'Categoría de Inspección', 'Resultado', 'Criterio & Descripción Técnica']],
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
          2: { cellWidth: 24, halign: 'center', fontStyle: 'bold' },
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
            if (val === 'SI CUMPLE') {
              data.cell.styles.textColor = [16, 185, 129];
            } else if (val === 'NO CUMPLE') {
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
      doc.text('DICTAMEN TÉCNICO FINAL Y OBSERVACIONES DE CIERRE', 15, finalY);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(55, 65, 81);
      const dictamenLines = doc.splitTextToSize(data.dictamenGeneral, pageWidth - 30);
      doc.text(dictamenLines, 15, finalY + 5);

      const dictamenHeight = dictamenLines.length * 4.5;
      let firmasY = finalY + 8 + dictamenHeight + 12;
      if (firmasY + 15 > 280) {
        doc.addPage();
        firmasY = 40;
      }

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
      doc.text('Conformidad de Inspección Técnica', 155, firmasY + 8, { align: 'center' });

      // Pie de página oficial
      doc.setFontSize(7);
      doc.setTextColor(156, 163, 175);
      doc.text('Constructora Contrapunto © 2026 • Formato General Editable de Inspección ITO', pageWidth / 2, 287, { align: 'center' });

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
                  FORMATO GENERAL EDITABLE DE INSPECCIÓN ITO
                </span>
                <h1 className="font-heading text-xl font-extrabold uppercase tracking-wide text-cream">
                  Checklist Supremo
                </h1>
              </div>
            </div>
          </div>

          {/* BOTONES DE PLANTILLAS Y EXPORTACIÓN */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleLoadGenericTemplate}
              className="inline-flex items-center gap-1.5 bg-stone-900 hover:bg-stone-800 text-cream border border-white/10 px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer"
              title="Cargar formato genérico editable en blanco"
            >
              <RotateCcw className="w-3.5 h-3.5 text-sand" />
              <span>Plantilla Generica</span>
            </button>

            <button
              onClick={handleLoadJofreCase}
              className="inline-flex items-center gap-1.5 bg-stone-900 hover:bg-stone-800 text-amber-300 border border-amber-500/30 px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer"
              title="Cargar caso real de filtración Jofré 107"
            >
              <Droplets className="w-3.5 h-3.5 text-amber-400" />
              <span>Caso Jofré 107</span>
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
                  <Download className="w-4 h-4" /> Exportar PDF
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-8">

        {/* TARJETA 1: ENCABEZADO EDITABLE DE LA INSPECCIÓN */}
        <div className="bg-[#181614] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <Building className="w-5 h-5 text-sand" />
              <h2 className="font-heading text-lg font-bold uppercase text-cream tracking-wide">
                Datos Generales del Inmueble & Registro de Inspección
              </h2>
            </div>
            <span className="text-[10px] font-mono bg-sand/15 text-sand border border-sand/30 px-2.5 py-1 rounded-full uppercase">
              {data.numeroReporte}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div className="lg:col-span-2">
              <label className="block text-amber-300 font-bold mb-1">TÍTULO GENERAL DE LA INSPECCIÓN</label>
              <input
                type="text"
                value={data.tituloInspeccion}
                onChange={e => setData({ ...data, tituloInspeccion: e.target.value })}
                className="w-full bg-stone-900 border border-amber-500/30 text-amber-200 font-bold rounded-xl p-3 focus:outline-none focus:border-sand uppercase"
                placeholder="Ej. INSPECCIÓN TÉCNICA RECEPCIÓN DE DEPARTAMENTO"
              />
            </div>

            <div>
              <label className="block text-cream/50 mb-1">CONDOMINIO / OBRA / LOCAL</label>
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
              <label className="block text-cream/50 mb-1">UNIDAD / SECTOR AFECTADO</label>
              <input
                type="text"
                value={data.deptoAfectado}
                onChange={e => setData({ ...data, deptoAfectado: e.target.value })}
                className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 focus:outline-none focus:border-sand"
                placeholder="Ej. Depto 1901"
              />
            </div>

            <div>
              <label className="block text-cream/50 mb-1">UNIDAD / SECTOR ORIGEN</label>
              <input
                type="text"
                value={data.deptoOrigen}
                onChange={e => setData({ ...data, deptoOrigen: e.target.value })}
                className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 focus:outline-none focus:border-sand"
                placeholder="Ej. Depto 2001 (Terraza superior)"
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

            <div className="md:col-span-4">
              <label className="block text-cream/50 mb-1">MOTIVO DE INSPECCIÓN & SÍNTOMAS REGISTRADOS</label>
              <input
                type="text"
                value={data.antiguedadSintomas}
                onChange={e => setData({ ...data, antiguedadSintomas: e.target.value })}
                className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 focus:outline-none focus:border-sand"
                placeholder="Ej. Verificación de avance de obra / Filtraciones recurrentes..."
              />
            </div>
          </div>
        </div>

        {/* TARJETA 2: RESUMEN ESTADÍSTICO DE RESULTADOS */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-[#181614] border border-white/10 rounded-2xl p-4 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <ClipboardCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-neutral-400 uppercase block">Total Criterios</span>
              <strong className="text-xl font-mono text-cream">{items.length}</strong>
            </div>
          </div>

          <div className="bg-[#181614] border border-emerald-500/30 rounded-2xl p-4 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckSquare className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase block">SI CUMPLE ✅</span>
              <strong className="text-xl font-mono text-emerald-300">{totalCumple}</strong>
            </div>
          </div>

          <div className="bg-[#181614] border border-red-500/30 rounded-2xl p-4 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
              <XSquare className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-red-400 uppercase block">NO CUMPLE ❌</span>
              <strong className="text-xl font-mono text-red-300">{totalNoCumple}</strong>
            </div>
          </div>

          <div className="bg-[#181614] border border-amber-500/30 rounded-2xl p-4 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-amber-400 uppercase block">% Aprobación</span>
              <strong className="text-xl font-mono text-amber-300">{porcentajeAprobacion}%</strong>
            </div>
          </div>
        </div>

        {/* TARJETA 3: CONTROLES PARA AGREGAR CRITERIOS & FILTROS */}
        <div className="bg-[#181614] border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-neutral-400">Filtrar Categoría:</span>
              <select
                value={selectedCategoryFilter}
                onChange={e => setSelectedCategoryFilter(e.target.value)}
                className="bg-stone-900 border border-white/10 text-cream rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-sand cursor-pointer"
              >
                <option value="TODAS">Ver Todas las Categorías ({items.length})</option>
                {DEFAULT_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* FORMULARIO AGREGAR CRITERIO PERSONALIZADO */}
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
                placeholder="Escribe un nuevo criterio a inspeccionar..."
                value={customItemText}
                onChange={e => setCustomItemText(e.target.value)}
                className="bg-stone-900 border border-white/10 text-cream rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-sand flex-1 sm:w-64"
              />
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-400 text-carbon font-bold text-xs px-4 py-2 rounded-xl font-mono uppercase tracking-wider flex items-center gap-1 shrink-0 cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" /> Agregar Criterio
              </button>
            </form>

            <button
              onClick={handleClearAllItems}
              className="text-xs font-mono text-red-400 hover:text-red-300 underline"
            >
              Limpiar Criterios
            </button>
          </div>
        </div>

        {/* TARJETA 4: MATRIZ EDITABLE DE CRITERIOS CON CASILLAS Y DESCRIPCIÓN */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold uppercase text-cream tracking-wide flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-sand" />
              Matriz Editable de Criterios de Inspección & Evaluación
            </h2>
            <span className="text-xs font-mono text-neutral-400">
              Mostrando {filteredItems.length} de {items.length} criterios
            </span>
          </div>

          <div className="space-y-4">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className={`bg-[#181614] border rounded-2xl p-5 space-y-4 transition-all shadow-lg ${
                  item.status === 'SI_CUMPLE'
                    ? 'border-emerald-500/40 bg-stone-900/40'
                    : item.status === 'NO_CUMPLE'
                    ? 'border-red-500/50 bg-stone-900/60'
                    : 'border-white/10'
                }`}
              >
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  
                  {/* EDICIÓN DEL NOMBRE DEL CRITERIO */}
                  <div className="space-y-1.5 flex-1 w-full">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded uppercase">
                        {item.category}
                      </span>
                      <span className="text-xs font-mono text-neutral-500">Criterio N° {index + 1}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Edit3 className="w-4 h-4 text-sand shrink-0" />
                      <input
                        type="text"
                        value={item.item}
                        onChange={e => handleItemNameChange(item.id, e.target.value)}
                        className="w-full bg-stone-900 border border-white/10 text-cream font-mono text-sm font-bold rounded-xl p-2 focus:outline-none focus:border-sand"
                        placeholder="Nombre o enunciado del criterio de inspección..."
                      />
                    </div>
                  </div>

                  {/* CASILLAS TÁCTILES INTERACTIVAS DE 1 CLIC (SI CUMPLE / NO CUMPLE / N/A) */}
                  <div className="flex items-center gap-2 shrink-0 bg-stone-950 p-2 rounded-2xl border border-white/10 font-mono text-xs shadow-inner w-full sm:w-auto justify-center">
                    
                    {/* CASILLA SI / CUMPLE */}
                    <button
                      type="button"
                      onClick={() => handleStatusChange(item.id, 'SI_CUMPLE')}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer border ${
                        item.status === 'SI_CUMPLE'
                          ? 'bg-emerald-500 border-emerald-400 text-carbon shadow-lg shadow-emerald-950/40 scale-105'
                          : 'bg-stone-900 border-white/5 text-neutral-400 hover:text-emerald-400 hover:border-emerald-500/30'
                      }`}
                    >
                      <CheckSquare className="w-4 h-4" />
                      <span>SI (CUMPLE)</span>
                    </button>

                    {/* CASILLA NO / NO CUMPLE */}
                    <button
                      type="button"
                      onClick={() => handleStatusChange(item.id, 'NO_CUMPLE')}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer border ${
                        item.status === 'NO_CUMPLE'
                          ? 'bg-red-500 border-red-400 text-white shadow-lg shadow-red-950/40 scale-105'
                          : 'bg-stone-900 border-white/5 text-neutral-400 hover:text-red-400 hover:border-red-500/30'
                      }`}
                    >
                      <XSquare className="w-4 h-4" />
                      <span>NO (NO CUMPLE)</span>
                    </button>

                    {/* CASILLA NO APLICA */}
                    <button
                      type="button"
                      onClick={() => handleStatusChange(item.id, 'NO_APLICA')}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer border ${
                        item.status === 'NO_APLICA'
                          ? 'bg-stone-700 border-stone-500 text-white shadow-lg scale-105'
                          : 'bg-stone-900 border-white/5 text-neutral-400 hover:text-cream'
                      }`}
                    >
                      <MinusSquare className="w-4 h-4" />
                      <span>N/A</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-2 text-neutral-500 hover:text-red-400 transition-colors ml-1"
                      title="Eliminar este criterio"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </div>

                {/* CAJAS DE DESCRIPCIÓN & SOLUCIÓN RECOMENDADA */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 font-mono text-xs">
                  <div>
                    <label className="block text-[10px] text-neutral-400 mb-1 font-bold">
                      📝 DESCRIPCIÓN / OBSERVACIÓN TÉCNICA DEL CRITERIO:
                    </label>
                    <textarea
                      rows={2}
                      value={item.observations}
                      onChange={e => handleObservationChange(item.id, e.target.value)}
                      className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 focus:outline-none focus:border-sand"
                      placeholder="Escribe la descripción o hallazgo técnico del criterio..."
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-amber-300 mb-1 font-bold">
                      🛠️ ACCIÓN SUBSANATORIA / SOLUCIÓN SUGERIDA:
                    </label>
                    <textarea
                      rows={2}
                      value={item.solution || ''}
                      onChange={e => handleSolutionChange(item.id, e.target.value)}
                      className="w-full bg-stone-900 border border-amber-500/20 text-cream rounded-xl p-3 focus:outline-none focus:border-sand"
                      placeholder="Escribe la solución técnica o subsanación recomendada..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TARJETA 5: DICTAMEN TÉCNICO FINAL Y OBSERVACIONES DE CIERRE */}
        <div className="bg-[#181614] border border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
          <div className="flex items-center gap-2 text-amber-400">
            <FileText className="w-5 h-5" />
            <h3 className="font-heading text-base font-bold uppercase tracking-wider">
              Dictamen Técnico Final & Conclusión del Inspector ITO
            </h3>
          </div>
          <textarea
            rows={3}
            value={data.dictamenGeneral}
            onChange={e => setData({ ...data, dictamenGeneral: e.target.value })}
            className="w-full bg-stone-900 border border-white/10 text-cream rounded-2xl p-4 text-xs font-mono focus:outline-none focus:border-sand"
            placeholder="Escribe la conclusión general de la inspección para el informe oficial..."
          />
        </div>

      </main>
    </div>
  );
}
