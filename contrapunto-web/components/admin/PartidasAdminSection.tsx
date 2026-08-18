'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, Check, RefreshCw, AlertCircle, ArrowLeft, Database, DollarSign, Sparkles, CheckCircle2, Trash2, Upload, FileText, Table } from 'lucide-react';
import Link from 'next/link';

interface ApuInsumo {
  tipo: string;
  unit: string;
  description: string;
  cant: number | string;
  pu: number;
  p_total: number;
  factor: number | string;
  obs: string;
}

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
  apu_details?: ApuInsumo[];
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
  const [ufValue, setUfValue] = useState(40857);

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

  // Filtro de categoría en tabla & lista dinámica de Capítulos
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('TODAS');
  const [chaptersList, setChaptersList] = useState<string[]>(CHAPTERS_LIST);
  const [newCategoryInput, setNewCategoryInput] = useState<string>('');
  const [showCategoryManager, setShowCategoryManager] = useState<boolean>(false);

  // Estado para carga masiva de archivos multiformato (*.xlsx, *.pdf, *.docx, *.json, *.csv)
  const [uploadingFile, setUploadingFile] = useState(false);

  // Estado para edición en línea de un item específico (incluyendo cambio de categoría)
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editPriceUf, setEditPriceUf] = useState<string>('');
  const [editDescription, setEditDescription] = useState<string>('');
  const [editCategory, setEditCategory] = useState<string>('');

  // Estado para desplegable Ficha APU Excel por item ID
  const [openExcelId, setOpenExcelId] = useState<number | null>(null);
  const toggleExcelView = (id: number) => {
    setOpenExcelId(prev => (prev === id ? null : id));
  };

  // Agregar nueva categoría personalizada
  const handleAddCustomCategory = () => {
    const trimmed = newCategoryInput.trim();
    if (!trimmed) return;

    if (!chaptersList.includes(trimmed)) {
      setChaptersList(prev => [...prev, trimmed]);
      setNewCategory(trimmed); // Seleccionar la nueva categoría en el formulario de creación
      setMsgStatus({
        type: 'success',
        text: `¡Categoría "${trimmed}" agregada exitosamente!`
      });
    }
    setNewCategoryInput('');
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
      if (data.success && Array.isArray(data.data)) {
        const fetchedItems: DbItem[] = data.data;
        setPartidas(fetchedItems);

        // Extraer categorías únicas para poblar las opciones del selector
        const uniqueCats = Array.from(
          new Set(
            fetchedItems
              .map((item) => item.category)
              .filter((cat): cat is string => Boolean(cat && cat.trim()))
          )
        );

        setChaptersList(prev => {
          const merged = new Set([...CHAPTERS_LIST, ...uniqueCats, ...prev]);
          return Array.from(merged);
        });
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

  // Iniciar edición de una partida
  const handleStartEdit = (item: DbItem) => {
    setEditingId(item.id);
    setEditDescription(item.description);
    setEditPriceUf(String(item.priceUf));
    setEditCategory(item.category || chaptersList[0] || 'CAP 03 - HORMIGONES & OBRA GRUESA');
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
          category: editCategory,
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
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[10px] font-mono uppercase text-sand font-bold">
                    Capítulo / Categoría *
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowCategoryManager(!showCategoryManager)}
                    className="text-[9px] font-mono text-emerald-400 hover:underline font-bold"
                  >
                    {showCategoryManager ? '✕ Cerrar' : '➕ Crear Nueva Categoría'}
                  </button>
                </div>

                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 text-xs focus:outline-none focus:border-sand font-mono"
                >
                  {chaptersList.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                {/* Panel desplegable para agregar nueva categoría */}
                {showCategoryManager && (
                  <div className="mt-2.5 bg-stone-950 p-3 rounded-xl border border-emerald-500/30 space-y-2">
                    <span className="block text-[10px] font-mono text-emerald-300 font-bold uppercase">
                      Crear Categoría Personalizada:
                    </span>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Ej: CAP 13 - OBRAS EXTERIORES"
                        value={newCategoryInput}
                        onChange={(e) => setNewCategoryInput(e.target.value)}
                        className="flex-1 bg-stone-900 border border-white/10 text-cream text-xs p-2 rounded-lg font-mono focus:outline-none focus:border-emerald-400"
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomCategory}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs px-3 py-2 rounded-lg transition-colors"
                      >
                        Guardar
                      </button>
                    </div>
                  </div>
                )}
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
                  {chaptersList.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 border-l border-white/10 pl-3">
                <span className="text-amber-400 font-bold text-[11px]">UF ($):</span>
                <input
                  type="number"
                  value={ufValue}
                  onChange={(e) => setUfValue(Number(e.target.value))}
                  className="w-24 bg-stone-900 border border-amber-500/40 text-amber-300 font-bold rounded-lg px-2 py-0.5 text-xs text-right focus:outline-none focus:border-amber-400 font-mono"
                />
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
                              <div className="space-y-2">
                                <div>
                                  <label className="text-[9px] font-mono text-sand font-bold block mb-0.5 uppercase">
                                    Capítulo / Categoría:
                                  </label>
                                  <select
                                    value={editCategory}
                                    onChange={(e) => setEditCategory(e.target.value)}
                                    className="w-full bg-stone-900 border border-sand text-cream p-1.5 rounded text-xs font-mono"
                                  >
                                    {chaptersList.map((cat) => (
                                      <option key={cat} value={cat}>
                                        {cat}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div>
                                  <label className="text-[9px] font-mono text-neutral-400 block mb-0.5 uppercase">
                                    Descripción:
                                  </label>
                                  <input
                                    type="text"
                                    value={editDescription}
                                    onChange={(e) => setEditDescription(e.target.value)}
                                    className="w-full bg-stone-900 border border-sand text-cream p-1.5 rounded text-xs"
                                  />
                                </div>
                              </div>
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

                                {/* PLANILLA DESPLEGABLE REPLICADA EXACTAMENTE DE EXCEL */}
                                {openExcelId === item.id && (
                                  <div className="mt-3 bg-[#fefce8] border-2 border-[#107c41] rounded-lg overflow-x-auto shadow-2xl font-mono text-[10px] text-stone-900">
                                    
                                    {/* BARRA DE TÍTULO EXCEL */}
                                    <div className="bg-[#107c41] text-white px-3 py-1.5 flex items-center justify-between text-[10px] font-bold tracking-wider uppercase font-sans">
                                      <div className="flex items-center gap-2">
                                        <Table className="w-4 h-4 text-white" />
                                        <span>ANÁLISIS DE PRECIO UNITARIO (APU) - HOJA DE CÁLCULO EXCEL</span>
                                      </div>
                                      <span className="text-[9px] bg-white/20 px-2 py-0.5 rounded text-white">
                                        Fila {item.id + 12}
                                      </span>
                                    </div>

                                    {/* ENCABEZADO DE PARTIDA (FILA AMARILLA / DORADA FIEL A LA IMAGEN) */}
                                    <div className="bg-[#fceda6] border-b-2 border-[#107c41] p-2.5 font-bold flex flex-wrap items-center justify-between gap-2 text-stone-900">
                                      <div className="flex items-center gap-2">
                                        <span className="bg-[#107c41] text-white px-2 py-0.5 rounded text-[9px] uppercase">
                                          Partida
                                        </span>
                                        <span className="px-2 py-0.5 bg-white/80 border border-amber-400 rounded text-[10px]">
                                          {item.unit || 'M2'}
                                        </span>
                                        <span className="text-xs uppercase tracking-wide text-stone-950 font-black">
                                          {item.description}
                                        </span>
                                      </div>

                                      <div className="flex items-center gap-4 text-[11px]">
                                        <div>
                                          <span className="text-[9px] text-stone-600 uppercase block font-normal">Rendimiento:</span>
                                          <span>1.0000</span>
                                        </div>
                                        <div>
                                          <span className="text-[9px] text-stone-600 uppercase block font-normal">Precio Unitario:</span>
                                          <span className="text-emerald-800 font-extrabold">${clpEst.toLocaleString('es-CL')} ({item.priceUf} UF)</span>
                                        </div>
                                        <div>
                                          <span className="text-[9px] text-stone-600 uppercase block font-normal font-sans">Categoría:</span>
                                          <span className="bg-amber-300/80 px-2 py-0.5 rounded text-[9px] uppercase border border-amber-400">{item.category || 'COMPLEMENTARIO'}</span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* TABLA DE DETALLE DE INSUMOS (8 COLUMNAS EXACTAS DE LA IMAGEN DE EXCEL) */}
                                    <table className="w-full border-collapse text-[10px] text-left">
                                      <thead>
                                        <tr className="bg-[#202727] text-white border-b-2 border-[#0e4e42] text-[9px] uppercase font-bold tracking-wider font-sans select-none">
                                          <th className="p-2 border-r border-[#0e4e42]/60 text-left font-black">
                                            <div className="flex items-center gap-1">
                                              <span>TIPO</span>
                                              <span className="text-[10px] text-emerald-400 font-normal">▾</span>
                                            </div>
                                          </th>
                                          <th className="p-2 border-r border-[#0e4e42]/60 text-center font-black">UD</th>
                                          <th className="p-2 border-r border-[#0e4e42]/60 text-left font-black">DESCRIPCIÓN</th>
                                          <th className="p-2 border-r border-[#0e4e42]/60 text-right font-black">CANT.</th>
                                          <th className="p-2 border-r border-[#0e4e42]/60 text-right font-black">PU</th>
                                          <th className="p-2 border-r border-[#0e4e42]/60 text-right font-black">P. TOTAL</th>
                                          <th className="p-2 border-r border-[#0e4e42]/60 text-right text-red-400 font-black">REND.</th>
                                          <th className="p-2 text-left font-black">OBSERVACIONES</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-[#107c41]/20 bg-white">
                                        {item.apu_details && item.apu_details.length > 0 ? (
                                          item.apu_details.map((insumo, idx) => {
                                            const tipoColor =
                                              insumo.tipo === 'Material'
                                                ? 'text-amber-800 font-bold'
                                                : insumo.tipo === 'Mano de obra'
                                                ? 'text-emerald-800 font-bold'
                                                : insumo.tipo === 'Subcontrato'
                                                ? 'text-purple-800 font-bold'
                                                : 'text-stone-700 font-bold';

                                            const factorDisplay =
                                              insumo.factor !== undefined && insumo.factor !== '' && insumo.factor !== null
                                                ? typeof insumo.factor === 'number'
                                                  ? insumo.factor.toFixed(2)
                                                  : String(insumo.factor)
                                                : '-';

                                            return (
                                              <tr key={idx} className="hover:bg-amber-50/60 transition-colors">
                                                <td className={`p-2 border-r border-[#107c41]/20 ${tipoColor}`}>
                                                  {insumo.tipo}
                                                </td>
                                                <td className="p-2 border-r border-[#107c41]/20 text-center font-semibold text-stone-800">
                                                  {insumo.unit || '-'}
                                                </td>
                                                <td className="p-2 border-r border-[#107c41]/20 font-medium text-stone-900">
                                                  {insumo.description}
                                                </td>
                                                <td className="p-2 border-r border-[#107c41]/20 text-right font-mono font-bold text-stone-800">
                                                  {typeof insumo.cant === 'number' ? insumo.cant.toFixed(4) : insumo.cant}
                                                </td>
                                                <td className="p-2 border-r border-[#107c41]/20 text-right font-mono text-stone-800">
                                                  ${Math.round((insumo.pu || 0) * (ufValue / 38000)).toLocaleString('es-CL')}
                                                </td>
                                                <td className="p-2 border-r border-[#107c41]/20 text-right font-mono font-bold text-stone-950">
                                                  ${Math.round((insumo.p_total || 0) * (ufValue / 38000)).toLocaleString('es-CL')}
                                                </td>
                                                <td className="p-2 border-r border-[#107c41]/20 text-right font-mono font-bold text-red-600">
                                                  {factorDisplay}
                                                </td>
                                                <td className="p-2 text-[9px] text-stone-600 uppercase font-sans leading-tight">
                                                  {insumo.obs || '-'}
                                                </td>
                                              </tr>
                                            );
                                          })
                                        ) : (
                                          <>
                                            <tr className="hover:bg-amber-50/60 transition-colors">
                                              <td className="p-2 border-r border-[#107c41]/20 font-bold text-amber-800">Material</td>
                                              <td className="p-2 border-r border-[#107c41]/20 text-center font-semibold">{item.unit || 'UD'}</td>
                                              <td className="p-2 border-r border-[#107c41]/20 font-medium">{item.description} - Insumo Principal</td>
                                              <td className="p-2 border-r border-[#107c41]/20 text-right font-mono font-bold">1,0000</td>
                                              <td className="p-2 border-r border-[#107c41]/20 text-right font-mono">${Math.round((clpEst * (item.porcentajeMateriales || 50)) / 100).toLocaleString('es-CL')}</td>
                                              <td className="p-2 border-r border-[#107c41]/20 text-right font-mono font-bold">${Math.round((clpEst * (item.porcentajeMateriales || 50)) / 100).toLocaleString('es-CL')}</td>
                                              <td className="p-2 border-r border-[#107c41]/20 text-right font-mono font-bold text-red-600">58,33</td>
                                              <td className="p-2 text-[9px] text-stone-600 uppercase font-sans">REND. SEGÚN ESPECIFICACIÓN TÉCNICA +20% PÉRDIDA</td>
                                            </tr>

                                            <tr className="hover:bg-amber-50/60 transition-colors">
                                              <td className="p-2 border-r border-[#107c41]/20 font-bold text-emerald-800">Mano de obra</td>
                                              <td className="p-2 border-r border-[#107c41]/20 text-center font-semibold">DÍA</td>
                                              <td className="p-2 border-r border-[#107c41]/20 font-medium">MAESTRO / AYUDANTE ESPECIALIZADO</td>
                                              <td className="p-2 border-r border-[#107c41]/20 text-right font-mono font-bold">0,0200</td>
                                              <td className="p-2 border-r border-[#107c41]/20 text-right font-mono">${Math.round((clpEst * (item.porcentajeManoObra || 45)) / 100).toLocaleString('es-CL')}</td>
                                              <td className="p-2 border-r border-[#107c41]/20 text-right font-mono font-bold">${Math.round((clpEst * (item.porcentajeManoObra || 45)) / 100).toLocaleString('es-CL')}</td>
                                              <td className="p-2 border-r border-[#107c41]/20 text-right font-mono font-bold text-red-600">50,00</td>
                                              <td className="p-2 text-[9px] text-stone-600 uppercase font-sans">RENDIMIENTO DÍA JORNADA TRABAJADOR EN TERRENO</td>
                                            </tr>
                                          </>
                                        )}

                                        {/* Fila Especificaciones Técnicas */}
                                        {item.inclusions && (
                                          <tr className="bg-[#fef9c3]">
                                            <td colSpan={8} className="p-3 text-[10px] text-stone-900 border-t border-[#107c41]/30">
                                              <span className="font-bold text-[#107c41] uppercase tracking-wider block mb-1 font-sans">
                                                📋 ESPECIFICACIÓN TÉCNICA Y CRITERIO DE EJECUCIÓN DEL EXCEL:
                                              </span>
                                              <p className="font-sans font-light leading-relaxed text-stone-800">
                                                {item.inclusions}
                                              </p>
                                            </td>
                                          </tr>
                                        )}
                                      </tbody>
                                    </table>
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
                                  onClick={() => handleStartEdit(item)}
                                  className="text-neutral-400 hover:text-sand text-[11px] underline cursor-pointer font-bold"
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
