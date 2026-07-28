'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText,
  Search,
  Plus,
  Download,
  ArrowLeft,
  RefreshCw,
  FolderOpen
} from 'lucide-react';

export interface DocumentItem {
  id: string;
  title: string;
  category: string;
  format: string;
  description: string;
  url: string;
  uploadedBy: string;
  createdAt: string;
}

export function DocumentosAdminSection() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('Todas');

  // Formulario nuevo documento
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Plantillas ITO');
  const [newFormat, setNewFormat] = useState('PDF');
  const [newDescription, setNewDescription] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Cargar documentos desde API
  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/documentos', { cache: 'no-store' });
      const data = await res.json();
      if (data.success) {
        setDocuments(data.data);
      }
    } catch {
      console.error('Error al cargar documentos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Guardar nuevo documento
  const handleAddDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newUrl.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/documentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          category: newCategory,
          format: newFormat,
          description: newDescription,
          url: newUrl,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setNewTitle('');
        setNewDescription('');
        setNewUrl('');
        setShowAddForm(false);
        fetchDocuments();
      } else {
        alert(data.error || 'Error al guardar documento.');
      }
    } catch {
      alert('Error de conexión.');
    } finally {
      setSubmitting(false);
    }
  };

  // Categorías únicas
  const categories = ['Todas', 'Plantillas ITO', 'Normativa & Leyes', 'Comercial & Presentaciones', 'General'];

  // Filtrar documentos
  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.description.toLowerCase().includes(search.toLowerCase()) ||
      doc.category.toLowerCase().includes(search.toLowerCase());

    const matchesCat = filterCategory === 'Todas' || doc.category === filterCategory;

    return matchesSearch && matchesCat;
  });

  return (
    <div className="py-10 bg-[#0f0e0c] text-cream min-h-screen font-body selection:bg-sand selection:text-carbon">
      <div className="container-base max-w-7xl mx-auto space-y-8">

        {/* HEADER DE NAVEGACIÓN */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
          <div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-xs text-sand hover:underline font-mono uppercase tracking-wider mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Volver al Dashboard
            </Link>
            <h1 className="font-heading text-3xl font-extrabold uppercase text-cream tracking-wide flex items-center gap-3">
              <FolderOpen className="w-7 h-7 text-sand" />
              Centro de Documentos & Plantillas
            </h1>
            <p className="text-xs text-neutral-400 font-light mt-1">
              Repositorio corporativo de formatos de informes ITO, manuales y dossiers oficiales ({documents.length} documentos).
            </p>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-sand text-carbon hover:bg-[#a38b72] px-5 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors shadow-lg flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Registrar Nuevo Documento
          </button>
        </div>

        {/* FORMULARIO REGISTRAR DOCUMENTO */}
        {showAddForm && (
          <form
            onSubmit={handleAddDocument}
            className="bg-[#181614] border border-sand/40 rounded-3xl p-6 shadow-2xl space-y-4 animate-fade-in"
          >
            <h2 className="font-heading text-base font-bold uppercase text-sand tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4" /> Registrar Nuevo Documento o Enlace
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                  Título del Documento *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Formato de Presupuesto Obras Civiles 2026"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 text-xs focus:outline-none focus:border-sand"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                  Categoría
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 text-xs focus:outline-none focus:border-sand font-mono cursor-pointer"
                >
                  <option value="Plantillas ITO">Plantillas ITO</option>
                  <option value="Normativa & Leyes">Normativa & Leyes</option>
                  <option value="Comercial & Presentaciones">Comercial & Presentaciones</option>
                  <option value="General">General</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                  Enlace URL / Ruta del Archivo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. /docs/plantilla-informe.pdf o https://drive.google.com/..."
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 text-xs focus:outline-none focus:border-sand font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                  Formato (Ej. PDF, Word, Excel)
                </label>
                <input
                  type="text"
                  placeholder="Ej. PDF / Word"
                  value={newFormat}
                  onChange={(e) => setNewFormat(e.target.value)}
                  className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 text-xs focus:outline-none focus:border-sand font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                Descripción / Uso del Documento
              </label>
              <textarea
                rows={2}
                placeholder="Detalla para qué sirve esta plantilla o archivo..."
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 text-xs focus:outline-none focus:border-sand"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-xs font-mono text-neutral-400 hover:text-cream"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="bg-sand text-carbon hover:bg-[#a38b72] px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                {submitting ? 'Guardando...' : 'Guardar Documento'}
              </button>
            </div>
          </form>
        )}

        {/* BÚSQUEDA Y FILTROS */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-[#181614] border border-white/10 rounded-2xl p-4 shadow-lg">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-mono uppercase text-neutral-400 mr-2">Categoría:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  filterCategory === cat
                    ? 'bg-sand text-carbon font-bold'
                    : 'bg-stone-900 text-neutral-400 hover:text-cream border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar documento por título..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-sand font-mono"
            />
          </div>
        </div>

        {/* LISTA DE DOCUMENTOS */}
        {loading ? (
          <div className="text-center py-12 text-xs font-mono text-sand flex justify-center items-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin" /> Cargando repositorio de documentos...
          </div>
        ) : filteredDocs.length === 0 ? (
          <div className="bg-[#181614] border border-white/10 rounded-2xl p-12 text-center text-xs text-neutral-400 font-mono">
            No se encontraron documentos en esta categoría.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="bg-[#181614] border border-white/10 hover:border-sand/40 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-4 group transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sand bg-sand/10 border border-sand/30 px-2.5 py-0.5 rounded-full">
                      {doc.category}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400 bg-stone-900 px-2 py-0.5 rounded border border-white/5">
                      {doc.format}
                    </span>
                  </div>

                  <h3 className="font-heading text-base font-bold text-cream group-hover:text-sand transition-colors">
                    {doc.title}
                  </h3>

                  <p className="text-xs text-neutral-400 font-light leading-relaxed">
                    {doc.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-500 text-[10px]">
                    Subido por {doc.uploadedBy}
                  </span>

                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-sand/15 hover:bg-sand text-sand hover:text-carbon border border-sand/30 font-bold px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" /> Abrir / Descargar
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default DocumentosAdminSection;
