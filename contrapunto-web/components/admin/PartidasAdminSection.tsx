'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, Check, RefreshCw, AlertCircle, ArrowLeft, Database, DollarSign, Sparkles, CheckCircle2, Trash2, Upload, FileText, Table } from 'lucide-react';
import Link from 'next/link';

interface DbItem {
  id: number;
  code: string;
  description: string;
  unit: string;
  type: string;
  priceUf: number;
  inclusions?: string;
  category?: string;
  porcentajeMateriales?: number;
  porcentajeManoObra?: number;
  porcentajeEquipos?: number;
}

export const CHAPTERS_LIST = [
  "CAP 01 - OBRAS PRELIMINARES & FAENAS",
  "CAP 02 - MOVIMIENTO DE TIERRAS & EXCAVACIONES",
  "CAP 03 - HORMIGONES & OBRA GRUESA",
  "CAP 04 - ALBAÑILERÍA & TABIQUERÍA",
  "CAP 05 - ESTRUCTURAS METÁLICAS & ACERO",
  "CAP 06 - TECHUMBRES, CUBIERTAS & HOJALATERÍA",
  "CAP 07 - IMPERMEABILIZACIÓN & AISLACIÓN",
  "CAP 08 - PUERTAS, VENTANAS & PORTONES",
  "CAP 09 - REVESTIMIENTOS & PAVIMENTOS",
  "CAP 10 - INSTALACIONES (ELEC / SAN / CLIMA)",
  "CAP 11 - PINTURAS & TERMINACIONES",
  "CAP 12 - MOBILIARIO & ARQUITECTURA",
];

interface ApuProposal {
  code: string;
  description: string;
  unit: string;
  priceUf: number;
  priceClpEstimated: number;
  porcentajeMateriales: number;
  porcentajeManoObra: number;
  porcentajeEquipos: number;
  inclusions: string;
}

export function PartidasAdminSection() {
  const [partidas, setPartidas] = useState<DbItem[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [msgStatus, setMsgStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // UF de referencia
  const [ufValue, setUfValue] = useState(38500);

  // Generador en Lenguaje Natural (IA)
  const [naturalPrompt, setNaturalPrompt] = useState('');
  const [generatingApu, setGeneratingApu] = useState(false);
  const [apuProposal, setApuProposal] = useState<ApuProposal | null>(null);

  // Estado del formulario de nueva partida
  const [newCode, setNewCode] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState('CAP 03 - HORMIGONES & OBRA GRUESA');
  const [newUnit, setNewUnit] = useState('m2');
  const [newPriceUf, setNewPriceUf] = useState('');
  const [newInclusions, setNewInclusions] = useState('');
  const [newMatPct, setNewMatPct] = useState(50);
  const [newMoPct, setNewMoPct] = useState(45);
  const [newEqPct, setNewEqPct] = useState(5);

  // Filtro de categoría en tabla
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('TODAS');

  // Estado para carga masiva de archivos multiformato (*.xlsx, *.pdf, *.docx, *.json, *.csv)
  const [uploadingFile, setUploadingFile] = useState(false);

  // Estado para edición en línea de un item específico
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editPriceUf, setEditPriceUf] = useState<string>('');
  const [editDescription, setEditDescription] = useState<string>('');

  // Estado para desplegable Ficha APU Excel por item ID
  const [openExcelId, setOpenExcelId] = useState<number | null>(null);
  const toggleExcelView = (id: number) => {
    setOpenExcelId(prev => (prev === id ? null : id));
  };

  // Procesar archivo adjunto multiformato
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingFile(true);
    setMsgStatus(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/partidas/import-file', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setMsgStatus({
          type: 'success',
          text: data.message || 'Partidas importadas correctamente.',
        });
        fetchPartidas();
      } else {
        setMsgStatus({ type: 'error', text: data.error || 'Error al procesar el archivo.' });
      }
    } catch {
      setMsgStatus({ type: 'error', text: 'Error de conexión al importar el archivo.' });
    } finally {
      setUploadingFile(false);
      // Reset input
      e.target.value = '';
    }
  };

  // Cargar partidas desde la API
  const fetchPartidas = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/partidas', { cache: 'no-store' });
      const data = await res.json();
      if (data.success) {
        setPartidas(data.data);
      }
    } catch (err) {
      console.error('Error fetching partidas:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartidas();
  }, []);

  // Generar Propuesta de APU en Lenguaje Natural
  const handleGenerateApuAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!naturalPrompt.trim()) return;

    setGeneratingApu(true);
    setApuProposal(null);
    try {
      const res = await fetch('/api/admin/partidas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate_apu_ai',
          naturalLanguagePrompt: naturalPrompt,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setApuProposal(data.proposal);
        // Autocompletar el formulario manual también para fácil revisión
        setNewCode(data.proposal.code);
        setNewDescription(data.proposal.description);
        setNewUnit(data.proposal.unit);
        setNewPriceUf(String(data.proposal.priceUf));
        setNewInclusions(data.proposal.inclusions);
        setNewMatPct(data.proposal.porcentajeMateriales);
        setNewMoPct(data.proposal.porcentajeManoObra);
        setNewEqPct(data.proposal.porcentajeEquipos);
      } else {
        alert(data.error || 'Error al analizar la frase.');
      }
    } catch {
      alert('Error al conectar con la IA de partidas.');
    } finally {
      setGeneratingApu(false);
    }
  };

  // Guardar partida propuesta por IA
  const handleAcceptProposal = async () => {
    if (!apuProposal) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/partidas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: apuProposal.code,
          description: apuProposal.description,
          unit: apuProposal.unit,
          type: 'Partida',
          priceUf: apuProposal.priceUf,
          inclusions: apuProposal.inclusions,
          porcentajeMateriales: apuProposal.porcentajeMateriales,
          porcentajeManoObra: apuProposal.porcentajeManoObra,
          porcentajeEquipos: apuProposal.porcentajeEquipos,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMsgStatus({
          type: 'success',
          text: `¡Propuesta de APU "${apuProposal.description}" guardada con éxito en la base de datos!`,
        });
        setApuProposal(null);
        setNaturalPrompt('');
        fetchPartidas();
      } else {
        alert(data.error || 'Error al guardar.');
      }
    } catch {
      alert('Error al guardar.');
    } finally {
      setSubmitting(false);
    }
  };

  // Agregar nueva partida manualmente
  const handleAddPartida = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDescription.trim() || !newPriceUf || isNaN(Number(newPriceUf))) {
      setMsgStatus({ type: 'error', text: 'Por favor completa la descripción y un precio en UF válido.' });
      return;
    }

    setSubmitting(true);
    setMsgStatus(null);

    try {
      const res = await fetch('/api/admin/partidas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: newCode,
          description: newDescription,
          category: newCategory,
          unit: newUnit,
          type: 'Partida',
          priceUf: Number(newPriceUf),
          inclusions: newInclusions,
          porcentajeMateriales: newMatPct,
          porcentajeManoObra: newMoPct,
          porcentajeEquipos: newEqPct,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setMsgStatus({
          type: 'success',
          text: `¡Partida "${data.item.description}" agregada con éxito a la base de datos!`,
        });
        setNewCode('');
        setNewDescription('');
        setNewPriceUf('');
        setNewInclusions('');
        fetchPartidas();
      } else {
        setMsgStatus({ type: 'error', text: data.error || 'Error al guardar la partida.' });
      }
    } catch {
      setMsgStatus({ type: 'error', text: 'Error al enviar los datos al servidor.' });
    } finally {
      setSubmitting(false);
    }
  };

  // Guardar edición de partida
  const handleSaveEdit = async (id: number) => {
    if (!editPriceUf || isNaN(Number(editPriceUf))) {
      alert('Ingresa un valor UF válido.');
      return;
    }

    try {
      const res = await fetch('/api/admin/partidas', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          description: editDescription,
          priceUf: Number(editPriceUf),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setEditingId(null);
        fetchPartidas();
      } else {
        alert(data.error || 'Error al actualizar.');
      }
    } catch {
      alert('Error de conexión.');
    }
  };

  // Eliminar partida de la BBDD
  const handleDeletePartida = async (id: number, description: string) => {
    if (!confirm(`¿Estás seguro de que deseas eliminar la partida "${description}"? Esta acción no se puede deshacer.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/partidas?id=${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (data.success) {
        setMsgStatus({
          type: 'success',
          text: `Partida "${description}" eliminada correctamente.`,
        });
        if (editingId === id) setEditingId(null);
        fetchPartidas();
      } else {
        alert(data.error || 'Error al eliminar la partida.');
      }
    } catch {
      alert('Error de conexión al eliminar la partida.');
    }
  };

  // Filtrar partidas por texto de búsqueda y por Capítulo
  const filteredPartidas = partidas.filter((item) => {
    const q = search.toLowerCase();
    const matchesQuery = (
      item.description.toLowerCase().includes(q) ||
      item.code.toLowerCase().includes(q) ||
      item.unit.toLowerCase().includes(q)
    );
    const matchesCategory = selectedCategoryFilter === 'TODAS' || item.category === selectedCategoryFilter;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="py-10 bg-[#0f0e0c] text-cream min-h-screen font-body selection:bg-sand selection:text-carbon">
      <div className="container-base max-w-7xl mx-auto space-y-10">

        {/* HEADER DE ADMINISTRACIÓN */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
          <div>
            <Link
              href="/cotizador-supremo"
              className="inline-flex items-center gap-1.5 text-xs text-sand hover:underline font-mono uppercase tracking-wider mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Volver al Cotizador Supremo
            </Link>
            <h1 className="font-heading text-3xl font-extrabold uppercase text-cream tracking-wide flex items-center gap-3">
              <Database className="w-7 h-7 text-sand" />
              Gestión de Partidas & Precios Unitarios (APU)
            </h1>
            <p className="text-xs text-neutral-400 font-light mt-1">
              Desglose de Mano de Obra vs Materiales • Generador Inteligente en Lenguaje Natural.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-stone-900 border border-sand/30 rounded-2xl px-4 py-2 text-xs font-mono">
            <DollarSign className="w-4 h-4 text-sand" />
            <span>UF Referencia:</span>
            <input
              type="number"
              value={ufValue}
              onChange={(e) => setUfValue(Number(e.target.value))}
              className="w-24 bg-carbon border border-white/20 text-sand font-bold text-center rounded py-1 text-xs"
            />
            <span className="text-neutral-400">CLP</span>
          </div>
        </div>

        {/* MENSAJES DE ESTADO */}
        {msgStatus && (
          <div
            className={`p-4 rounded-2xl border text-xs flex items-center gap-3 ${
              msgStatus.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-red-500/10 border-red-500/30 text-red-300'
            }`}
          >
            {msgStatus.type === 'success' ? <Check className="w-5 h-5 text-emerald-400 shrink-0" /> : <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />}
            <span>{msgStatus.text}</span>
          </div>
        )}

        {/* MÓDULO DE IMPORTACIÓN MASIVA DE ARCHIVOS MULTIFORMATO */}
        <div className="bg-[#181614] border border-sky-500/40 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="p-2.5 rounded-xl bg-sky-500/15 border border-sky-500/40 text-sky-400">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-heading text-lg font-bold uppercase text-cream tracking-wider flex items-center gap-2">
                Importar & Adherir Partidas Masivamente a la Base de Datos
              </h2>
              <span className="text-[10px] font-mono text-sky-300 uppercase tracking-widest block">
                Arrastra o selecciona un archivo para cargar automáticamente nuevas partidas a la web
              </span>
            </div>
          </div>

          <div className="border-2 border-dashed border-sky-500/30 hover:border-sky-400/70 rounded-2xl p-6 text-center transition-all bg-stone-900/60 relative group">
            <input
              type="file"
              accept=".xlsx,.xls,.xlsm,.csv,.pdf,.docx,.doc,.json,.txt"
              onChange={handleFileUpload}
              disabled={uploadingFile}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
              <div className="p-3 rounded-full bg-sky-500/10 text-sky-400 group-hover:scale-110 transition-transform">
                {uploadingFile ? (
                  <RefreshCw className="w-8 h-8 animate-spin text-sky-400" />
                ) : (
                  <FileText className="w-8 h-8 text-sky-400" />
                )}
              </div>
              <div className="text-xs font-mono">
                <span className="font-bold text-cream block">
                  {uploadingFile ? 'Procesando y extrayendo partidas...' : 'Haz clic o arrastra un archivo aquí'}
                </span>
                <span className="text-[11px] text-neutral-400 block mt-1">
                  Soporta formatos: <strong className="text-sky-300">*.xlsx, *.xls, *.csv, *.pdf, *.docx, *.json, *.txt</strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* MÓDULO 1: ASISTENTE DE IA EN LENGUAJE NATURAL */}
        <div className="bg-[#181614] border border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-heading text-lg font-bold uppercase text-cream tracking-wider flex items-center gap-2">
                Asistente Inteligente de Partidas en Lenguaje Natural
              </h2>
              <span className="text-[10px] font-mono text-sand uppercase tracking-widest block">
                Escribe en español lo que necesitas cotizar y la IA sugerirá el APU y las especificaciones técnicas
              </span>
            </div>
          </div>

          <form onSubmit={handleGenerateApuAI} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                required
                placeholder="Ej. Instalación de pasto sintético 30mm sobre base de maicillo compactado"
                value={naturalPrompt}
                onChange={(e) => setNaturalPrompt(e.target.value)}
                className="flex-1 bg-stone-900 border border-white/10 text-cream rounded-2xl p-3.5 text-xs focus:outline-none focus:border-sand font-mono"
              />
              <button
                type="submit"
                disabled={generatingApu}
                className="bg-amber-500 hover:bg-amber-400 text-carbon font-bold uppercase tracking-widest text-xs px-6 py-3.5 rounded-2xl transition-all shadow-lg flex items-center gap-2 cursor-pointer shrink-0 font-mono"
              >
                {generatingApu ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Analizando 3 Fuentes...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" /> Generar Propuesta APU
                  </>
                )}
              </button>
            </div>

            {/* Sugerencias Rápidas de Prueba */}
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono">
              <span className="text-neutral-400 font-bold uppercase">Sugerencia Rápida:</span>
              <button
                type="button"
                onClick={() => setNaturalPrompt('Estructura metálica para cobertizo de quincho con perfiles tubulares y anticorrosivo')}
                className="bg-stone-900 hover:bg-stone-800 text-sand border border-white/10 px-2.5 py-1 rounded-lg cursor-pointer transition-colors"
              >
                🏗️ Cobertizo Metálico (Tubular/kg)
              </button>
              <button
                type="button"
                onClick={() => setNaturalPrompt('Fabricación y montaje de galpón metálico con pilares IPE 200 y vigas de acero')}
                className="bg-stone-900 hover:bg-stone-800 text-sand border border-white/10 px-2.5 py-1 rounded-lg cursor-pointer transition-colors"
              >
                🏗️ Galpón Estructural (Vigas IPE/kg)
              </button>
            </div>
          </form>

          {/* TARJETA CON LA PROPUESTA GENERADA DE APU */}
          {apuProposal && (
            <div className="bg-stone-900 border border-amber-500/30 rounded-2xl p-5 space-y-4 animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-white/10 pb-3">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 font-bold uppercase block">
                    Propuesta Sugerida de APU (Código: {apuProposal.code})
                  </span>
                  <h3 className="font-heading text-base font-bold text-cream">
                    {apuProposal.description}
                  </h3>
                </div>
                <div className="text-right font-mono">
                  <span className="text-sand font-extrabold text-sm block">
                    {apuProposal.priceUf} UF / {apuProposal.unit}
                  </span>
                  <span className="text-[11px] text-neutral-400">
                    ~ ${apuProposal.priceClpEstimated.toLocaleString('es-CL')} CLP
                  </span>
                </div>
              </div>

              {/* DESGLOSE APU SUGERIDO */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="bg-[#181614] p-3 rounded-xl border border-white/5 space-y-1">
                  <span className="text-[10px] text-neutral-400 uppercase block">📦 Materiales e Insumos</span>
                  <span className="font-bold text-amber-300 text-sm">{apuProposal.porcentajeMateriales}%</span>
                  <span className="text-[10px] text-neutral-400 block">
                    ~ ${Math.round((apuProposal.priceClpEstimated * apuProposal.porcentajeMateriales) / 100).toLocaleString('es-CL')} CLP
                  </span>
                </div>

                <div className="bg-[#181614] p-3 rounded-xl border border-white/5 space-y-1">
                  <span className="text-[10px] text-neutral-400 uppercase block">🔨 Mano de Obra</span>
                  <span className="font-bold text-emerald-400 text-sm">{apuProposal.porcentajeManoObra}%</span>
                  <span className="text-[10px] text-neutral-400 block">
                    ~ ${Math.round((apuProposal.priceClpEstimated * apuProposal.porcentajeManoObra) / 100).toLocaleString('es-CL')} CLP
                  </span>
                </div>

                <div className="bg-[#181614] p-3 rounded-xl border border-white/5 space-y-1">
                  <span className="text-[10px] text-neutral-400 uppercase block">🏗️ Equipos & Logística</span>
                  <span className="font-bold text-sky-400 text-sm">{apuProposal.porcentajeEquipos}%</span>
                  <span className="text-[10px] text-neutral-400 block">
                    ~ ${Math.round((apuProposal.priceClpEstimated * apuProposal.porcentajeEquipos) / 100).toLocaleString('es-CL')} CLP
                  </span>
                </div>
              </div>

              <div className="bg-[#181614] p-3 rounded-xl border border-white/5 text-xs font-light text-neutral-300">
                <strong className="text-sand font-mono uppercase text-[10px] block mb-1">Especificación & Criterios Considerados:</strong>
                {apuProposal.inclusions}
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setApuProposal(null)}
                  className="px-4 py-2 text-xs font-mono text-neutral-400 hover:text-cream"
                >
                  Descartar
                </button>
                <button
                  type="button"
                  onClick={handleAcceptProposal}
                  disabled={submitting}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer font-mono shadow-lg"
                >
                  <CheckCircle2 className="w-4 h-4" /> Guardar en Base de Datos
                </button>
              </div>
            </div>
          )}
        </div>

        {/* MÓDULO 2: FORMULARIO DE ALTA MANUAL DE PARTIDA */}
        <div className="bg-[#181614] border border-sand/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center gap-2.5 border-b border-white/10 pb-4">
            <div className="p-2 rounded-xl bg-sand/15 border border-sand/30 text-sand">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading text-lg font-bold uppercase text-cream tracking-wider">
                Ingreso Manual de Partida & Desglose APU
              </h2>
              <span className="text-[10px] font-mono text-sand uppercase tracking-widest block">
                Define el porcentaje de Mano de Obra, Materiales y Equipos manualmente
              </span>
            </div>
          </div>

          <form onSubmit={handleAddPartida} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-2">
                <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                  Código (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ej. PAR-0120"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 text-xs focus:outline-none focus:border-sand font-mono"
                />
              </div>

              <div className="md:col-span-5">
                <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                  Descripción Técnica de la Partida *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Instalación de porcelanato 60x60 sobre losa"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 text-xs focus:outline-none focus:border-sand"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                  Unidad *
                </label>
                <select
                  value={newUnit}
                  onChange={(e) => setNewUnit(e.target.value)}
                  className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 text-xs focus:outline-none focus:border-sand font-mono cursor-pointer"
                >
                  <option value="m2">m2 (Metro cuadrado)</option>
                  <option value="m3">m3 (Metro cúbico)</option>
                  <option value="ml">ml (Metro lineal)</option>
                  <option value="un">un (Unidad / Pieza)</option>
                  <option value="gl">gl (Global)</option>
                </select>
              </div>

              <div className="md:col-span-3">
                <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                  Capítulo / Categoría *
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 text-xs focus:outline-none focus:border-sand font-mono"
                >
                  {CHAPTERS_LIST.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-3">
                <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                  Precio Unitario (UF) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.001"
                    required
                    placeholder="Ej. 0.85"
                    value={newPriceUf}
                    onChange={(e) => setNewPriceUf(e.target.value)}
                    className="w-full bg-stone-900 border border-white/10 text-sand font-mono font-bold rounded-xl p-3 pr-16 text-xs focus:outline-none focus:border-sand"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-sand font-bold">
                    UF
                  </span>
                </div>
                <div className="mt-1 text-[11px] font-mono font-bold text-emerald-400 flex items-center justify-between">
                  <span>Valor en Pesos:</span>
                  <span>
                    {newPriceUf && !isNaN(Number(newPriceUf))
                      ? `$${Math.round(Number(newPriceUf) * ufValue).toLocaleString('es-CL')} CLP`
                      : '$0 CLP'}
                  </span>
                </div>
              </div>
            </div>

            {/* DESGLOSE PORCENTUAL DE APU */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-stone-900 p-4 rounded-2xl border border-white/5">
              <div>
                <label className="text-[10px] font-mono uppercase text-amber-300 block mb-1">
                  📦 % Materiales & Insumos
                </label>
                <input
                  type="number"
                  value={newMatPct}
                  onChange={(e) => setNewMatPct(Number(e.target.value))}
                  className="w-full bg-[#181614] border border-white/10 text-amber-300 font-mono font-bold rounded-xl p-2.5 text-xs"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-emerald-400 block mb-1">
                  🔨 % Mano de Obra
                </label>
                <input
                  type="number"
                  value={newMoPct}
                  onChange={(e) => setNewMoPct(Number(e.target.value))}
                  className="w-full bg-[#181614] border border-white/10 text-emerald-400 font-mono font-bold rounded-xl p-2.5 text-xs"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-sky-400 block mb-1">
                  🏗️ % Equipos & Herramientas
                </label>
                <input
                  type="number"
                  value={newEqPct}
                  onChange={(e) => setNewEqPct(Number(e.target.value))}
                  className="w-full bg-[#181614] border border-white/10 text-sky-400 font-mono font-bold rounded-xl p-2.5 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                Especificaciones / Criterios Incluidos
              </label>
              <input
                type="text"
                placeholder="Ej. Incluye pegamento Bekron, fragüe, cortes y mano de obra de colocación."
                value={newInclusions}
                onChange={(e) => setNewInclusions(e.target.value)}
                className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 text-xs focus:outline-none focus:border-sand"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="bg-sand text-carbon hover:bg-[#a38b72] px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-xs transition-colors shadow-lg cursor-pointer"
              >
                {submitting ? 'Guardando...' : 'Guardar Nueva Partida'}
              </button>
            </div>
          </form>
        </div>

        {/* TABLA DE PARTIDAS & EDICIÓN DE APU EN LÍNEA */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#181614] border border-white/10 rounded-2xl p-4 shadow-lg">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
              <span className="text-neutral-400">
                Total en BBDD: <strong className="text-sand">{partidas.length}</strong> | Mostrando: <strong className="text-emerald-400">{filteredPartidas.length}</strong>
              </span>
              <div className="flex items-center gap-2 border-l border-white/10 pl-3">
                <span className="text-sand font-bold text-[11px]">Capítulo:</span>
                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="bg-stone-900 border border-white/20 text-cream rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-sand"
                >
                  <option value="TODAS">Ver Todos los Capítulos ({partidas.length})</option>
                  {CHAPTERS_LIST.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por código o descripción..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-sand font-mono"
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12 text-xs font-mono text-sand flex justify-center items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin" /> Cargando catálogo de precios unitarios...
            </div>
          ) : (
            <div className="bg-[#181614] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-stone-900 border-b border-white/10 text-sand uppercase text-[10px]">
                    <tr>
                      <th className="p-3.5">Código</th>
                      <th className="p-3.5">Descripción de la Partida</th>
                      <th className="p-3.5">Unidad</th>
                      <th className="p-3.5 text-right">Precio (UF)</th>
                      <th className="p-3.5 text-right">Precio Est. CLP</th>
                      <th className="p-3.5 text-center">Desglose APU (% Mat / % MO)</th>
                      <th className="p-3.5 text-center">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredPartidas.map((item) => {
                      const isEditing = editingId === item.id;
                      const clpEst = Math.round(item.priceUf * ufValue);
                      const matPct = item.porcentajeMateriales || 50;
                      const moPct = item.porcentajeManoObra || 45;

                      return (
                        <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="p-3.5 text-sand font-bold">{item.code}</td>
                          <td className="p-3.5 text-cream font-sans font-medium max-w-xs sm:max-w-md">
                            {isEditing ? (
                              <input
                                type="text"
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                className="w-full bg-stone-900 border border-sand text-cream p-1.5 rounded text-xs"
                              />
                            ) : (
                              <div>
                                {item.category && (
                                  <span className="inline-block text-[9px] font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded mb-1 uppercase tracking-wider">
                                    {item.category}
                                  </span>
                                )}
                                <span className="block font-bold">{item.description}</span>
                                
                                {/* BOTÓN DESPLEGABLE FICHA EXCEL */}
                                <div className="mt-2">
                                  <button
                                    type="button"
                                    onClick={() => toggleExcelView(item.id)}
                                    className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#107c41]/20 hover:bg-[#107c41]/35 border border-[#107c41]/50 rounded text-[9px] font-mono text-emerald-300 font-bold transition-all shadow-sm"
                                  >
                                    <Table className="w-3 h-3 text-emerald-400" />
                                    {openExcelId === item.id ? 'OCULTAR FICHA EXCEL ▲' : '📊 VER FICHA APU EXCEL ▼'}
                                  </button>
                                </div>

                                {/* PLANILLA DESPLEGABLE ULTRA FIEL A EXCEL */}
                                {openExcelId === item.id && (
                                  <div className="mt-2.5 bg-[#111111] border-2 border-[#107c41] rounded-lg overflow-hidden shadow-2xl font-mono text-[9px] max-w-xl">
                                    {/* Barra de título estilo Microsoft Excel */}
                                    <div className="bg-[#107c41] text-white px-2.5 py-1 flex items-center justify-between font-bold uppercase">
                                      <div className="flex items-center gap-1.5">
                                        <Table className="w-3 h-3" />
                                        <span>MICROSOFT EXCEL - HOJA DE ANÁLISIS DE PRECIOS UNITARIOS</span>
                                      </div>
                                      <span className="text-[8px] opacity-80">HOJA_APU_CHILE.XLSX</span>
                                    </div>

                                    {/* Encabezado de Columnas Excel (A, B, C, D, E) */}
                                    <div className="grid grid-cols-12 bg-stone-900 border-b border-neutral-700 text-stone-400 text-center font-bold">
                                      <div className="col-span-1 border-r border-neutral-700 py-0.5 bg-stone-950">A</div>
                                      <div className="col-span-4 border-r border-neutral-700 py-0.5">B (CONCEPTO)</div>
                                      <div className="col-span-2 border-r border-neutral-700 py-0.5">C (UNIDAD)</div>
                                      <div className="col-span-2 border-r border-neutral-700 py-0.5">D (% APU)</div>
                                      <div className="col-span-3 py-0.5">E (SUBTOTAL CLP)</div>
                                    </div>

                                    {/* Filas de Celdas Excel */}
                                    <div className="divide-y divide-neutral-800 text-neutral-200">
                                      {/* Fila 1: Materiales */}
                                      <div className="grid grid-cols-12 hover:bg-white/5 transition-colors">
                                        <div className="col-span-1 border-r border-neutral-800 p-1 text-center font-bold text-amber-400 bg-stone-950/60">1</div>
                                        <div className="col-span-4 border-r border-neutral-800 p-1 flex items-center gap-1">
                                          <span className="text-amber-400 font-bold">📦 Materiales</span>
                                        </div>
                                        <div className="col-span-2 border-r border-neutral-800 p-1 text-center">{item.unit || 'm2'}</div>
                                        <div className="col-span-2 border-r border-neutral-800 p-1 text-center text-amber-300 font-bold">{item.porcentajeMateriales || 50}%</div>
                                        <div className="col-span-3 p-1 text-right font-bold text-cream">${Math.round((clpEst * (item.porcentajeMateriales || 50)) / 100).toLocaleString('es-CL')}</div>
                                      </div>

                                      {/* Fila 2: Mano de Obra */}
                                      <div className="grid grid-cols-12 hover:bg-white/5 transition-colors">
                                        <div className="col-span-1 border-r border-neutral-800 p-1 text-center font-bold text-emerald-400 bg-stone-950/60">2</div>
                                        <div className="col-span-4 border-r border-neutral-800 p-1 flex items-center gap-1">
                                          <span className="text-emerald-400 font-bold">🔨 Mano de Obra</span>
                                        </div>
                                        <div className="col-span-2 border-r border-neutral-800 p-1 text-center">JORNAL</div>
                                        <div className="col-span-2 border-r border-neutral-800 p-1 text-center text-emerald-300 font-bold">{item.porcentajeManoObra || 45}%</div>
                                        <div className="col-span-3 p-1 text-right font-bold text-cream">${Math.round((clpEst * (item.porcentajeManoObra || 45)) / 100).toLocaleString('es-CL')}</div>
                                      </div>

                                      {/* Fila 3: Equipos */}
                                      <div className="grid grid-cols-12 hover:bg-white/5 transition-colors">
                                        <div className="col-span-1 border-r border-neutral-800 p-1 text-center font-bold text-sky-400 bg-stone-950/60">3</div>
                                        <div className="col-span-4 border-r border-neutral-800 p-1 flex items-center gap-1">
                                          <span className="text-sky-400 font-bold">🏗️ Equipos</span>
                                        </div>
                                        <div className="col-span-2 border-r border-neutral-800 p-1 text-center">GL</div>
                                        <div className="col-span-2 border-r border-neutral-800 p-1 text-center text-sky-300 font-bold">{item.porcentajeEquipos || 5}%</div>
                                        <div className="col-span-3 p-1 text-right font-bold text-cream">${Math.round((clpEst * (item.porcentajeEquipos || 5)) / 100).toLocaleString('es-CL')}</div>
                                      </div>

                                      {/* Fila 4: Especificación Técnica */}
                                      {item.inclusions && (
                                        <div className="grid grid-cols-12 bg-stone-950/80 p-1.5 border-t border-neutral-700">
                                          <div className="col-span-1 border-r border-neutral-800 text-center font-bold text-sand">4</div>
                                          <div className="col-span-11 pl-1.5 text-neutral-300 font-light leading-relaxed">
                                            <span className="text-sand font-bold block uppercase text-[8px]">📋 ESPECIFICACIÓN TÉCNICA:</span>
                                            {item.inclusions}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </td>
                          <td className="p-3.5 text-neutral-300 font-bold">{item.unit}</td>
                          <td className="p-3.5 text-right font-bold text-sand">
                            {isEditing ? (
                              <input
                                type="number"
                                step="0.001"
                                value={editPriceUf}
                                onChange={(e) => setEditPriceUf(e.target.value)}
                                className="w-20 bg-stone-900 border border-sand text-sand font-bold p-1 rounded text-right text-xs"
                              />
                            ) : (
                              `${item.priceUf} UF`
                            )}
                          </td>
                          <td className="p-3.5 text-right text-neutral-300">
                            ${clpEst.toLocaleString('es-CL')} CLP
                          </td>
                          <td className="p-3.5 text-center">
                            <span className="text-[10px] bg-stone-900 border border-white/10 px-2.5 py-1 rounded-full text-neutral-300">
                              📦 Mat: <strong className="text-amber-300">{matPct}%</strong> | 🔨 MO: <strong className="text-emerald-400">{moPct}%</strong>
                            </span>
                          </td>
                          <td className="p-3.5 text-center">
                            {isEditing ? (
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => handleSaveEdit(item.id)}
                                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded text-[10px] font-bold uppercase transition-colors cursor-pointer"
                                >
                                  Guardar
                                </button>
                                <button
                                  onClick={() => handleDeletePartida(item.id, item.description)}
                                  className="bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white border border-red-500/40 px-2 py-1 rounded text-[10px] font-bold uppercase transition-all cursor-pointer flex items-center gap-1"
                                  title="Eliminar partida"
                                >
                                  <Trash2 className="w-3 h-3" /> Eliminar
                                </button>
                                <button
                                  onClick={() => setEditingId(null)}
                                  className="text-neutral-400 hover:text-cream text-[10px] underline"
                                >
                                  Cancelar
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center justify-center gap-3">
                                <button
                                  onClick={() => {
                                    setEditingId(item.id);
                                    setEditPriceUf(String(item.priceUf));
                                    setEditDescription(item.description);
                                  }}
                                  className="text-neutral-400 hover:text-sand text-[11px] underline cursor-pointer"
                                >
                                  Editar
                                </button>
                                <button
                                  onClick={() => handleDeletePartida(item.id, item.description)}
                                  className="text-neutral-500 hover:text-red-400 transition-colors p-1 rounded cursor-pointer"
                                  title="Eliminar partida"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default PartidasAdminSection;
