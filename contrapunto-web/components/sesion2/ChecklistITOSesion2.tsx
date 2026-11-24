'use client';

import React, { useState } from 'react';
import { CheckCircle2, XCircle, MinusCircle, Download, ShieldCheck, Building2 } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface InspectionItem {
  id: string;
  categoria: string;
  nombre: string;
  estado: 'cumple' | 'no_cumple' | 'na';
  observacion: string;
  reparacionRecomendada: string;
}

export default function ChecklistITOSesion2() {
  // Datos del Proyecto / Inspección
  const [condominio, setCondominio] = useState<string>('Condominio Trinos de Santiago');
  const [direccion, setDireccion] = useState<string>('General Jofré 107, Santiago');
  const [deptoAfectado, setDeptoAfectado] = useState<string>('Depto 1901');
  const [deptoOrigen, setDeptoOrigen] = useState<string>('Depto 2001 (Terraza)');
  const [inspector, setInspector] = useState<string>('Diego Morales (ITO Contrapunto)');
  const [fecha] = useState<string>(new Date().toISOString().split('T')[0]);

  // Items de Inspección
  const [items, setItems] = useState<InspectionItem[]>([
    {
      id: '1',
      categoria: '💧 Filtraciones e Impermeabilización',
      nombre: 'Prueba de Estanqueidad en Losa de Terraza',
      estado: 'no_cumple',
      observacion: 'Filtración recurrente por rotura de junta de dilatación y degradación de membrana asfáltica con 25 años de antigüedad.',
      reparacionRecomendada: 'Remoción de revestimiento cerámico, picado de fragües, e impermeabilización con membrana elastomérica cementicia en 10m².',
    },
    {
      id: '2',
      categoria: '💧 Filtraciones e Impermeabilización',
      nombre: 'Pendientes de Desagüe en Terraza',
      estado: 'no_cumple',
      observacion: 'Pozas de agua estancada junto al parapeto de fachada por pendiente insuficiente (< 1%).',
      reparacionRecomendada: 'Recontrapiso con pendiente mínima de 1.5% hacia bajada de agua lluvia.',
    },
    {
      id: '3',
      categoria: '🏗️ Obra Gruesa & Estructuras',
      nombre: 'Estado de Cielo y Volcanita en Depto Afectado',
      estado: 'no_cumple',
      observacion: 'Desprendimiento de pintura y manchas de humedad activa en cielo de dorm. principal y cocina Depto 1901.',
      reparacionRecomendada: 'Raspado, empastado hidrófugo, sello bloqueador de humedad y doble mano de esmalte al agua.',
    },
    {
      id: '4',
      categoria: '🎨 Terminaciones & Revestimientos',
      nombre: 'Fragües y Cerámicos en Terraza',
      estado: 'no_cumple',
      observacion: 'Fragüe disgregado con ingreso directo de agua hacia la losa de entrepiso.',
      reparacionRecomendada: 'Instalación de cerámico antideslizante con fragüe epóxico de alta resistencia UV.',
    },
    {
      id: '5',
      categoria: '🚰 Instalaciones Sanitarias',
      nombre: 'Revisión de Sifón y Desagüe de Aguas Lluvias',
      estado: 'cumple',
      observacion: 'Desagüe limpio sin obstrucciones de hojas ni sedimentos.',
      reparacionRecomendada: 'Mantenimiento preventivo semestral.',
    },
    {
      id: '6',
      categoria: '🚪 Puertas & Ventanas',
      nombre: 'Sello de Silicona en Ventanal de Terraza',
      estado: 'cumple',
      observacion: 'Sellos de marco de aluminio en buen estado sin grietas.',
      reparacionRecomendada: 'Ninguna.',
    },
  ]);

  // Cargar Caso Real Jofré 107
  const cargarCasoJofre107 = () => {
    setCondominio('Condominio Trinos de Santiago');
    setDireccion('General Jofré 107, Santiago');
    setDeptoAfectado('Depto 1901 (Cielo & Recintos)');
    setDeptoOrigen('Depto 2001 (Terraza Uso Exclusivo)');
    setInspector('Diego Morales (ITO Contrapunto)');
  };

  // Toggle de Estado de Inspección
  const toggleEstado = (id: string, nuevoEstado: 'cumple' | 'no_cumple' | 'na') => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, estado: nuevoEstado } : item))
    );
  };

  // Actualizar Observación
  const updateObservacion = (id: string, field: 'observacion' | 'reparacionRecomendada', value: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  // Métricas
  const totalCumple = items.filter((i) => i.estado === 'cumple').length;
  const totalNoCumple = items.filter((i) => i.estado === 'no_cumple').length;
  const totalNa = items.filter((i) => i.estado === 'na').length;
  const porcentajeAprobacion = Math.round((totalCumple / (items.length - totalNa || 1)) * 100);

  // Generar Informe PDF Oficial
  const generarInformePDF = () => {
    const doc = new jsPDF();

    // Banner Corporativo Superior
    doc.setFillColor(15, 14, 12);
    doc.rect(0, 0, 210, 38, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(245, 158, 11);
    doc.setFontSize(18);
    doc.text('CONTRAPUNTO CONSTRUCTORA', 14, 18);
    doc.setFontSize(10);
    doc.setTextColor(245, 245, 240);
    doc.text('INFORME TÉCNICO DE INSPECCIÓN ITO & DIAGNÓSTICO DE PATOLOGÍAS', 14, 28);

    // Ficha del Proyecto
    doc.setTextColor(40, 40, 40);
    doc.setFontSize(9);
    doc.text(`Condominio / Edificio: ${condominio}`, 14, 46);
    doc.text(`Dirección: ${direccion}`, 14, 52);
    doc.text(`Unidad Afectada: ${deptoAfectado}`, 14, 58);
    doc.text(`Unidad Origen: ${deptoOrigen}`, 110, 46);
    doc.text(`Inspector ITO: ${inspector}`, 110, 52);
    doc.text(`Fecha: ${fecha}`, 110, 58);

    // Tabla de Hallazgos
    const bodyData = items.map((item) => [
      item.categoria,
      item.nombre,
      item.estado === 'cumple' ? 'CUMPLE ✅' : item.estado === 'no_cumple' ? 'OBSERVADO ❌' : 'N/A ⚪',
      item.observacion,
      item.reparacionRecomendada,
    ]);

    autoTable(doc, {
      startY: 65,
      head: [['Categoría', 'Punto de Inspección', 'Estado', 'Hallazgo Técnico', 'Solución Recomendada']],
      body: bodyData,
      headStyles: { fillColor: [217, 119, 6], textColor: [15, 14, 12] },
      styles: { fontSize: 7, cellPadding: 3 },
      columnStyles: {
        0: { cellWidth: 35 },
        1: { cellWidth: 35 },
        2: { cellWidth: 25 },
        3: { cellWidth: 45 },
        4: { cellWidth: 45 },
      },
    });

    const finalY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 12;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(`DICTAMEN ITO FINAL: ${porcentajeAprobacion}% de Conformidad General.`, 14, finalY);
    doc.text('Dictamen: Se requiere subsanación urgente en impermeabilización de terraza para frenar filtración recurrente.', 14, finalY + 6);

    // Firmas
    doc.line(20, finalY + 30, 80, finalY + 30);
    doc.text('Firma Inspector ITO', 30, finalY + 35);

    doc.line(130, finalY + 30, 190, finalY + 30);
    doc.text('Firma Recepción Cliente', 140, finalY + 35);

    doc.save(`Informe_ITO_Contrapunto_${Date.now()}.pdf`);
  };

  return (
    <section id="checklist-ito" className="py-24 bg-[#0F0E0C] relative border-t border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ENCABEZADO DE SECCIÓN */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30">
            Módulo de Terreno &bull; Prompt 6
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-cream tracking-tight">
            Checklist Supremo{' '}
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
              ITO & Inspección Técnica
            </span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base font-body">
            Auditoría de patologías de obra, filtraciones e inspecciones en terreno con generación inmediata de dictamen oficial en PDF.
          </p>
        </div>

        {/* PANEL GENERAL DE CONTROL */}
        <div className="bg-[#181614] rounded-3xl p-6 sm:p-10 border border-amber-500/30 shadow-2xl space-y-8 max-w-6xl mx-auto">
          
          {/* BOTÓN CARGA RÁPIDA CASO JOFRÉ 107 Y FICHA DE ANTECEDENTES */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-stone-950 p-6 rounded-2xl border border-white/5">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" /> Ficha Ejecutiva del Proyecto Auditoría
              </span>
              <h3 className="font-heading text-xl font-bold text-cream">
                {condominio}
              </h3>
              <p className="text-xs font-mono text-neutral-400">
                {direccion} &bull; {deptoAfectado} &bull; {deptoOrigen}
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={cargarCasoJofre107}
                className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-mono font-bold text-xs uppercase px-4 py-2.5 rounded-xl border border-amber-500/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                ⚡ Cargar Caso Real Jofré 107
              </button>

              <button
                onClick={generarInformePDF}
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-carbon font-mono font-bold text-xs uppercase px-5 py-2.5 rounded-xl transition-all shadow-lg flex items-center gap-2 cursor-pointer hover:scale-105"
              >
                <Download className="w-4 h-4 fill-carbon" /> Exportar Informe PDF
              </button>
            </div>
          </div>

          {/* MÉTRICAS DE ESTADO EN TIEMPO REAL */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-stone-900 p-4 rounded-2xl border border-emerald-500/30 space-y-1">
              <span className="text-[10px] font-mono text-emerald-400 uppercase flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Puntos Conformes
              </span>
              <div className="font-heading text-2xl font-bold text-cream">
                {totalCumple} <span className="text-xs font-mono text-neutral-400">ítems</span>
              </div>
            </div>

            <div className="bg-stone-900 p-4 rounded-2xl border border-rose-500/30 space-y-1">
              <span className="text-[10px] font-mono text-rose-400 uppercase flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5" /> Puntos Observados
              </span>
              <div className="font-heading text-2xl font-bold text-cream">
                {totalNoCumple} <span className="text-xs font-mono text-neutral-400">ítems</span>
              </div>
            </div>

            <div className="bg-stone-900 p-4 rounded-2xl border border-white/10 space-y-1">
              <span className="text-[10px] font-mono text-neutral-400 uppercase flex items-center gap-1">
                <MinusCircle className="w-3.5 h-3.5" /> No Aplica (N/A)
              </span>
              <div className="font-heading text-2xl font-bold text-cream">
                {totalNa} <span className="text-xs font-mono text-neutral-400">ítems</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-500/10 to-stone-900 p-4 rounded-2xl border border-amber-500/30 space-y-1">
              <span className="text-[10px] font-mono text-amber-400 uppercase font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Aprobación ITO
              </span>
              <div className={`font-heading text-2xl font-bold ${porcentajeAprobacion > 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {porcentajeAprobacion}%
              </div>
            </div>

          </div>

          {/* MATRIZ DE INSPECCIÓN CON BOTONES DE 3 ESTADOS */}
          <div className="space-y-4">
            <span className="text-xs font-mono text-neutral-300 uppercase tracking-wider block">
              📋 Matriz de Verificación Táctil (Selección por Clic):
            </span>

            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-stone-900/80 p-5 rounded-2xl border border-white/10 space-y-4 hover:border-amber-500/30 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-mono text-amber-400 uppercase block">
                        {item.categoria}
                      </span>
                      <h4 className="font-heading text-lg font-bold text-cream">
                        {item.nombre}
                      </h4>
                    </div>

                    {/* BOTONES INTERACTIVOS DE 3 ESTADOS */}
                    <div className="flex items-center gap-2 bg-stone-950 p-1 rounded-xl border border-white/5">
                      <button
                        onClick={() => toggleEstado(item.id, 'cumple')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1 cursor-pointer ${
                          item.estado === 'cumple'
                            ? 'bg-emerald-500 text-carbon shadow-md shadow-emerald-500/20'
                            : 'text-neutral-400 hover:text-emerald-400'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Cumple
                      </button>

                      <button
                        onClick={() => toggleEstado(item.id, 'no_cumple')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1 cursor-pointer ${
                          item.estado === 'no_cumple'
                            ? 'bg-rose-500 text-cream shadow-md shadow-rose-500/20'
                            : 'text-neutral-400 hover:text-rose-400'
                        }`}
                      >
                        <XCircle className="w-3.5 h-3.5" /> Observado
                      </button>

                      <button
                        onClick={() => toggleEstado(item.id, 'na')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1 cursor-pointer ${
                          item.estado === 'na'
                            ? 'bg-stone-700 text-cream'
                            : 'text-neutral-400 hover:text-neutral-200'
                        }`}
                      >
                        <MinusCircle className="w-3.5 h-3.5" /> N/A
                      </button>
                    </div>
                  </div>

                  {/* CAJAS EDITABLES DE HALLAZGO Y REPARACIÓN */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono pt-2">
                    <div>
                      <label className="text-[10px] text-neutral-400 block mb-1">
                        Hallazgo / Observación Técnica:
                      </label>
                      <textarea
                        rows={2}
                        value={item.observacion}
                        onChange={(e) => updateObservacion(item.id, 'observacion', e.target.value)}
                        className="w-full bg-stone-950 border border-white/10 rounded-xl p-2.5 text-neutral-200 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-neutral-400 block mb-1">
                        Solución & Subsanación Recomendada:
                      </label>
                      <textarea
                        rows={2}
                        value={item.reparacionRecomendada}
                        onChange={(e) => updateObservacion(item.id, 'reparacionRecomendada', e.target.value)}
                        className="w-full bg-stone-950 border border-white/10 rounded-xl p-2.5 text-neutral-200 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
