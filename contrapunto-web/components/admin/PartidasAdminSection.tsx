'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit3, Check, RefreshCw, AlertCircle, ArrowLeft, Database, Layers, Save, DollarSign } from 'lucide-react';
import Link from 'next/link';

interface DbItem {
  id: number;
  code: string;
  description: string;
  unit: string;
  type: string;
  priceUf: number;
  inclusions?: string;
}

export function PartidasAdminSection() {
  const [partidas, setPartidas] = useState<DbItem[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [msgStatus, setMsgStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // UF de referencia
  const [ufValue, setUfValue] = useState(38500);

  // Estado del formulario de nueva partida
  const [newCode, setNewCode] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newUnit, setNewUnit] = useState('m2');
  const [newPriceUf, setNewPriceUf] = useState('');
  const [newInclusions, setNewInclusions] = useState('');

  // Estado para edición en línea de un item específico
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editPriceUf, setEditPriceUf] = useState<string>('');
  const [editDescription, setEditDescription] = useState<string>('');

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

  // Agregar nueva partida
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
          unit: newUnit,
          type: 'Partida',
          priceUf: Number(newPriceUf),
          inclusions: newInclusions
        })
      });

      const data = await res.json();

      if (data.success) {
        setMsgStatus({ type: 'success', text: `¡Partida "${data.item.description}" agregada con éxito y disponible en Cotizador Supremo!` });
        setNewCode('');
        setNewDescription('');
        setNewPriceUf('');
        setNewInclusions('');
        fetchPartidas(); // Recargar lista
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
          priceUf: Number(editPriceUf)
        })
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

  // Filtrar partidas por texto de búsqueda
  const filteredPartidas = partidas.filter((item) => {
    const q = search.toLowerCase();
    return (
      item.description.toLowerCase().includes(q) ||
      item.code.toLowerCase().includes(q) ||
      item.unit.toLowerCase().includes(q)
    );
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
              Gestión de Partidas & Precios Unitarios
            </h1>
            <p className="text-xs text-neutral-400 font-light mt-1">
              Base de Datos Dinámica • Los cambios guardados se aplican <strong className="text-sand">inmediatamente</strong> en las cotizaciones en línea.
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

        {/* FORMULARIO DE ALTA DE NUEVA PARTIDA */}
        <div className="bg-[#181614] border border-sand/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-2.5 border-b border-white/10 pb-4">
            <div className="p-2 rounded-xl bg-sand/15 border border-sand/30 text-sand">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading text-lg font-bold uppercase text-cream tracking-wider">
                Agregar Nueva Partida o Valor
              </h2>
              <span className="text-[10px] font-mono text-sand uppercase tracking-widest block">
                Ingresa una partida recién cotizada para usarla en el cotizador
              </span>
            </div>
          </div>

          <form onSubmit={handleAddPartida} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              
              {/* Código */}
              <div className="md:col-span-2">
                <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
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

              {/* Descripción */}
              <div className="md:col-span-5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
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

              {/* Unidad */}
              <div className="md:col-span-2">
                <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                  Unidad de Medida *
                </label>
                <select
                  value={newUnit}
                  onChange={(e) => setNewUnit(e.target.value)}
                  className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 text-xs focus:outline-none focus:border-sand font-mono"
                >
                  <option value="m2">m2 (Metro cuadrado)</option>
                  <option value="m3">m3 (Metro cúbico)</option>
                  <option value="ml">ml (Metro lineal)</option>
                  <option value="un">un (Unidad / Pieza)</option>
                  <option value="gl">gl (Global)</option>
                  <option value="mes">mes (Mes de servicio)</option>
                  <option value="kg">kg (Kilogramo)</option>
                </select>
              </div>

              {/* Precio UF */}
              <div className="md:col-span-3">
                <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
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
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-neutral-400">
                    UF
                  </span>
                </div>
                {newPriceUf && !isNaN(Number(newPriceUf)) && (
                  <span className="text-[10px] font-mono text-sand/80 mt-1 block">
                    ~ ${Math.round(Number(newPriceUf) * ufValue).toLocaleString('es-CL')} CLP
                  </span>
                )}
              </div>
            </div>

            {/* Inclusiones */}
            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                Inclusiones / Detalle de Criterios (Opcional)
              </label>
              <input
                type="text"
                placeholder="Ej. Incluye pegamento Bekron, fragüe, corte y mano de obra de instalación."
                value={newInclusions}
                onChange={(e) => setNewInclusions(e.target.value)}
                className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 text-xs focus:outline-none focus:border-sand"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="bg-sand text-carbon hover:bg-[#a38b72] px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                {submitting ? 'Guardando...' : 'Guardar y Publicar Partida'}
              </button>
            </div>
          </form>
        </div>

        {/* LISTADO & BUSCADOR DE PARTIDAS REGISTRADAS */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="font-heading text-xl font-extrabold uppercase text-cream tracking-wide flex items-center gap-2">
                <Layers className="w-5 h-5 text-sand" />
                Base de Datos de Partidas ({filteredPartidas.length})
              </h2>
              <p className="text-xs text-neutral-400 font-light">
                Haz clic en la edición rápida para ajustar valores o descripciones de partidas existentes.
              </p>
            </div>

            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar partida por código o nombre..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-sand font-mono"
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12 text-xs font-mono text-sand flex justify-center items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin" /> Cargando base de datos de partidas...
            </div>
          ) : (
            <div className="bg-[#181614] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-stone-900 border-b border-white/10 text-sand uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3.5">Código</th>
                      <th className="p-3.5">Descripción de la Partida</th>
                      <th className="p-3.5">Unidad</th>
                      <th className="p-3.5 text-right">Precio (UF)</th>
                      <th className="p-3.5 text-right">Precio Est. (CLP)</th>
                      <th className="p-3.5 text-center">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredPartidas.map((item) => {
                      const isEditing = editingId === item.id;
                      const priceClpEst = Math.round(item.priceUf * ufValue);

                      return (
                        <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="p-3.5 text-sand font-bold whitespace-nowrap">
                            {item.code}
                          </td>
                          <td className="p-3.5 text-neutral-200">
                            {isEditing ? (
                              <input
                                type="text"
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                className="w-full bg-stone-900 border border-sand text-cream px-2 py-1 rounded text-xs"
                              />
                            ) : (
                              <div>
                                <span className="font-sans font-medium text-cream">{item.description}</span>
                                {item.inclusions && (
                                  <span className="block text-[10px] text-neutral-400 font-light mt-0.5">
                                    • {item.inclusions}
                                  </span>
                                )}
                              </div>
                            )}
                          </td>
                          <td className="p-3.5 text-neutral-400 uppercase">
                            {item.unit}
                          </td>
                          <td className="p-3.5 text-right font-bold text-sand">
                            {isEditing ? (
                              <input
                                type="number"
                                step="0.001"
                                value={editPriceUf}
                                onChange={(e) => setEditPriceUf(e.target.value)}
                                className="w-20 bg-stone-900 border border-sand text-sand font-bold text-right px-2 py-1 rounded text-xs"
                              />
                            ) : (
                              `${item.priceUf.toFixed(3)} UF`
                            )}
                          </td>
                          <td className="p-3.5 text-right text-neutral-300">
                            ${priceClpEst.toLocaleString('es-CL')}
                          </td>
                          <td className="p-3.5 text-center whitespace-nowrap">
                            {isEditing ? (
                              <button
                                onClick={() => handleSaveEdit(item.id)}
                                className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-lg font-bold text-[10px] uppercase hover:bg-emerald-500/30 transition-colors"
                              >
                                Guardar
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  setEditingId(item.id);
                                  setEditPriceUf(item.priceUf.toString());
                                  setEditDescription(item.description);
                                }}
                                className="text-sand/80 hover:text-sand border border-sand/20 hover:border-sand px-2.5 py-1 rounded-lg text-[10px] uppercase transition-colors inline-flex items-center gap-1"
                              >
                                <Edit3 className="w-3 h-3" /> Editar
                              </button>
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
