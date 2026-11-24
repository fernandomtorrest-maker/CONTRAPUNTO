'use client';

import React, { useState } from 'react';
import { Sparkles, RefreshCw, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface APUProposal {
  titulo: string;
  descripcion: string;
  metraje: number;
  unidades: string;
  costoDirectoClp: number;
  porcentajeManoObra: number;
  porcentajeMateriales: number;
  gastosGeneralesClp: number;
  utilidadClp: number;
  netoClp: number;
  ivaClp: number;
  totalClp: number;
  totalUf: number;
  partidas: Array<{
    item: string;
    descripcion: string;
    unidad: string;
    cantidad: number;
    precioUnitarioClp: number;
    totalPartidaClp: number;
  }>;
}

export default function CotizadorIASesion2() {
  const [naturalPrompt, setNaturalPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [proposal, setProposal] = useState<APUProposal | null>({
    titulo: 'Reparación e Impermeabilización de Terraza (Caso Jofré 107)',
    descripcion: 'Demolición de cerámica existente en terraza Depto 2001 (10m²), aplicación de membrana cementicia estanque, prueba de agua 48h, revestimiento cerámico de exterior y reparación de pintura en cielo Depto 1901.',
    metraje: 10,
    unidades: 'm²',
    costoDirectoClp: 1250000,
    porcentajeManoObra: 45,
    porcentajeMateriales: 55,
    gastosGeneralesClp: 187500,
    utilidadClp: 235885,
    netoClp: 1673385,
    ivaClp: 318378,
    totalClp: 1991763,
    totalUf: 51.07,
    partidas: [
      { item: '1.1', descripcion: 'Retiro de revestimiento cerámico y limpieza de losa Depto 2001', unidad: 'm²', cantidad: 10, precioUnitarioClp: 32000, totalPartidaClp: 320000 },
      { item: '1.2', descripcion: 'Aplicación de membrana elastomérica estanque + banda de refuerzo', unidad: 'm²', cantidad: 10, precioUnitarioClp: 48000, totalPartidaClp: 480000 },
      { item: '1.3', descripcion: 'Instalación de cerámico exterior antideslizante con fragüe epóxico', unidad: 'm²', cantidad: 10, precioUnitarioClp: 33000, totalPartidaClp: 330000 },
      { item: '2.1', descripcion: 'Tratamiento anti-humedad y pintura de cielo Depto 1901 (10m²)', unidad: 'gl', cantidad: 1, precioUnitarioClp: 120000, totalPartidaClp: 120000 },
    ],
  });

  // Presets de prueba instantánea
  const presets = [
    { label: 'Caso Jofré 107 (Impermeabilización 10m²)', prompt: 'Reparación de filtración en terraza Depto 2001 e impermeabilización de 10m²' },
    { label: 'Remodelación Cocina Gourmet 25m²', prompt: 'Remodelación de cocina 25m² con isla central en Silestone, porcelanatos y luminarias LED' },
    { label: 'Quincho & Terraza Pirque 40m²', prompt: 'Construcción de quincho 40m² con parrilla de acero inox, mesones de granito y pérgola' },
  ];

  const handlePresetSelect = (text: string) => {
    setNaturalPrompt(text);
    generarPresupuestoConIA(text);
  };

  const generarPresupuestoConIA = (promptText?: string) => {
    const textToUse = promptText || naturalPrompt;
    if (!textToUse.trim()) return;

    setLoading(true);

    setTimeout(() => {
      // Simulación de respuesta inteligente APU
      const metrajeEstimado = 25;
      const baseDirecto = 2800000;
      const manoObra = 40;
      const materiales = 60;
      const gg = Math.round(baseDirecto * 0.12);
      const ut = Math.round(baseDirecto * 0.15);
      const neto = baseDirecto + gg + ut;
      const iva = Math.round(neto * 0.19);
      const total = neto + iva;

      setProposal({
        titulo: `Cotización Personalizada IA: ${textToUse.slice(0, 40)}...`,
        descripcion: textToUse,
        metraje: metrajeEstimado,
        unidades: 'm²',
        costoDirectoClp: baseDirecto,
        porcentajeManoObra: manoObra,
        porcentajeMateriales: materiales,
        gastosGeneralesClp: gg,
        utilidadClp: ut,
        netoClp: neto,
        ivaClp: iva,
        totalClp: total,
        totalUf: Number((total / 39000).toFixed(2)),
        partidas: [
          { item: '1.1', descripcion: 'Preparación de superficie y faenas previas de protección', unidad: 'gl', cantidad: 1, precioUnitarioClp: 450000, totalPartidaClp: 450000 },
          { item: '1.2', descripcion: 'Suministro e instalación de revestimientos e insumos de primera calidad', unidad: 'm²', cantidad: metrajeEstimado, precioUnitarioClp: 65000, totalPartidaClp: 1625000 },
          { item: '1.3', descripcion: 'Mano de obra especializada y control de calidad de entregables', unidad: 'gl', cantidad: 1, precioUnitarioClp: 725000, totalPartidaClp: 725000 },
        ],
      });

      setLoading(false);
    }, 1200);
  };

  const descargarPDF = () => {
    if (!proposal) return;

    const doc = new jsPDF();
    
    // Encabezado corporativo
    doc.setFillColor(15, 14, 12);
    doc.rect(0, 0, 210, 35, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(245, 158, 11);
    doc.setFontSize(18);
    doc.text('CONTRAPUNTO CONSTRUCTORA', 14, 20);
    doc.setFontSize(10);
    doc.setTextColor(245, 245, 240);
    doc.text('COTIZADOR SUPREMO IA - INFORME TÉCNICO DE APU', 14, 28);

    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
    doc.text(`Proyecto: ${proposal.titulo}`, 14, 45);
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-CL')}`, 14, 52);
    doc.text(`Descripción: ${proposal.descripcion.slice(0, 90)}...`, 14, 59);

    // Tabla de Partidas APU
    const bodyData = proposal.partidas.map((p) => [
      p.item,
      p.descripcion,
      p.unidad,
      p.cantidad,
      `$${p.precioUnitarioClp.toLocaleString('es-CL')}`,
      `$${p.totalPartidaClp.toLocaleString('es-CL')}`,
    ]);

    autoTable(doc, {
      startY: 67,
      head: [['Ítem', 'Descripción de Partida', 'Unidad', 'Cant.', 'P. Unitario', 'Total CLP']],
      body: bodyData,
      headStyles: { fillColor: [217, 119, 6], textColor: [15, 14, 12] },
      styles: { fontSize: 8 },
    });

    // Final Y post tabla
    const finalY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10;

    doc.setFont('helvetica', 'bold');
    doc.text(`Mano de Obra: ${proposal.porcentajeManoObra}% | Materiales: ${proposal.porcentajeMateriales}%`, 14, finalY);
    doc.text(`Neto: $${proposal.netoClp.toLocaleString('es-CL')} CLP`, 14, finalY + 7);
    doc.text(`IVA (19%): $${proposal.ivaClp.toLocaleString('es-CL')} CLP`, 14, finalY + 14);
    doc.setFontSize(12);
    doc.setTextColor(217, 119, 6);
    doc.text(`TOTAL OFICIAL: $${proposal.totalClp.toLocaleString('es-CL')} CLP (~ ${proposal.totalUf} UF)`, 14, finalY + 23);

    doc.save(`Cotizacion_Contrapunto_IA_${Date.now()}.pdf`);
  };

  return (
    <section id="cotizador-ia" className="py-24 bg-[#14120F] relative border-t border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ENCABEZADO DE SECCIÓN */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30">
            Módulo Inteligente &bull; Prompt 5
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-cream tracking-tight">
            Cotizador Supremo{' '}
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
              IA (Lenguaje Natural)
            </span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base font-body">
            Describe lo que deseas construir o reparar y nuestra IA desglosará las partidas APU, mano de obra vs materiales y costo total en CLP/UF.
          </p>
        </div>

        {/* INPUT DE LENGUAJE NATURAL Y BOTONES DE PRUEBA */}
        <div className="space-y-6 mb-12 max-w-4xl mx-auto">
          
          <div className="space-y-2">
            <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
              💡 Presets de Carga Rápida para Probar:
            </label>
            <div className="flex flex-wrap gap-2">
              {presets.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePresetSelect(item.prompt)}
                  className="px-3.5 py-2 rounded-xl bg-stone-900 border border-amber-500/30 text-amber-300 text-xs font-mono hover:bg-amber-500/20 hover:border-amber-400 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              generarPresupuestoConIA();
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="text"
              required
              value={naturalPrompt}
              onChange={(e) => setNaturalPrompt(e.target.value)}
              placeholder="Ej: Impermeabilización de terraza de 10m² con cerámica antideslizante en Depto 2001 y reparación de cielo"
              className="flex-1 bg-stone-900 border border-amber-500/30 text-cream rounded-2xl p-4 text-xs font-mono focus:outline-none focus:border-amber-400 placeholder:text-neutral-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-carbon font-mono font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Procesando APU...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 fill-carbon" /> Generar Presupuesto
                </>
              )}
            </button>
          </form>

        </div>

        {/* MÓDULO RESULTADO APU */}
        {proposal && (
          <div className="bg-[#181614] rounded-3xl p-6 sm:p-10 border border-amber-500/30 shadow-2xl space-y-8 max-w-5xl mx-auto">
            
            {/* ENCABEZADO DE LA PROPUESTA */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                  Resumen de Cotización Ejecutiva
                </span>
                <h3 className="font-heading text-2xl font-bold text-cream">
                  {proposal.titulo}
                </h3>
                <p className="text-xs text-neutral-400 font-body max-w-2xl">
                  {proposal.descripcion}
                </p>
              </div>

              <button
                onClick={descargarPDF}
                className="bg-stone-900 hover:bg-stone-800 text-amber-400 font-mono font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-2xl border border-amber-500/30 hover:border-amber-400 transition-all flex items-center gap-2 shadow-lg cursor-pointer shrink-0"
              >
                <Download className="w-4 h-4" />
                Descargar PDF Oficial
              </button>
            </div>

            {/* DESGLOSE PORCENTUAL MATERIALES VS MANO DE OBRA */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-stone-950 p-4 rounded-2xl border border-white/5 space-y-2">
                <span className="text-[10px] font-mono text-neutral-400 uppercase block">
                  🛠️ Mano de Obra
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-2xl font-bold text-amber-400">
                    {proposal.porcentajeManoObra}%
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    ~ ${Math.round((proposal.netoClp * proposal.porcentajeManoObra) / 100).toLocaleString('es-CL')} CLP
                  </span>
                </div>
                <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full" style={{ width: `${proposal.porcentajeManoObra}%` }} />
                </div>
              </div>

              <div className="bg-stone-950 p-4 rounded-2xl border border-white/5 space-y-2">
                <span className="text-[10px] font-mono text-neutral-400 uppercase block">
                  🧱 Materiales e Insumos
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-2xl font-bold text-amber-300">
                    {proposal.porcentajeMateriales}%
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    ~ ${Math.round((proposal.netoClp * proposal.porcentajeMateriales) / 100).toLocaleString('es-CL')} CLP
                  </span>
                </div>
                <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-300 h-full rounded-full" style={{ width: `${proposal.porcentajeMateriales}%` }} />
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-500/10 to-stone-950 p-4 rounded-2xl border border-amber-500/30 space-y-2">
                <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block">
                  💰 TOTAL INCLUYE IVA (19%)
                </span>
                <div className="font-heading text-2xl font-extrabold text-cream">
                  ${proposal.totalClp.toLocaleString('es-CL')} <span className="text-xs font-mono text-amber-400 font-normal">CLP</span>
                </div>
                <span className="text-xs font-mono text-neutral-400 block font-semibold">
                  Equivalente a ~ {proposal.totalUf} UF
                </span>
              </div>
            </div>

            {/* TABLA DE PARTIDAS DETALLADAS */}
            <div className="overflow-x-auto space-y-3">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                📋 Partidas Constructivas APU Desglosadas:
              </span>
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="bg-stone-900 border-b border-amber-500/20 text-amber-400 uppercase">
                    <th className="p-3">Ítem</th>
                    <th className="p-3">Descripción de Partida</th>
                    <th className="p-3">Unidad</th>
                    <th className="p-3 text-right">Cantidad</th>
                    <th className="p-3 text-right">P. Unitario</th>
                    <th className="p-3 text-right">Total CLP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-neutral-300">
                  {proposal.partidas.map((item, idx) => (
                    <tr key={idx} className="hover:bg-stone-900/50">
                      <td className="p-3 font-bold text-amber-400">{item.item}</td>
                      <td className="p-3">{item.descripcion}</td>
                      <td className="p-3 text-neutral-400">{item.unidad}</td>
                      <td className="p-3 text-right font-bold">{item.cantidad}</td>
                      <td className="p-3 text-right text-neutral-400">${item.precioUnitarioClp.toLocaleString('es-CL')}</td>
                      <td className="p-3 text-right font-bold text-cream">${item.totalPartidaClp.toLocaleString('es-CL')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
