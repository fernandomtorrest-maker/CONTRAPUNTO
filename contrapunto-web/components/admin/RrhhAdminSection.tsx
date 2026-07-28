'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  Search,
  Plus,
  ArrowLeft,
  RefreshCw,
  FileCheck,
  Calendar,
  DollarSign,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  FolderOpen,
  UploadCloud,
  ExternalLink,
  Download,
  Building2,
  X,
  FileText,
  UserCheck
} from 'lucide-react';

export interface CollaboratorDocument {
  id: string;
  title: string;
  category: 'Contratos & Anexos' | 'Liquidaciones de Sueldo' | 'Licencias & Permisos' | 'Prevención & EPP' | 'Documentación Personal';
  format: string;
  url: string;
  uploadedAt: string;
  uploadedBy: string;
  expirationDate?: string;
}

export interface CollaboratorItem {
  id: string;
  rut: string;
  nombre: string;
  cargo: string;
  departamento: string;
  tipoContrato: 'Indefinido' | 'Plazo Fijo' | 'Por Obra o Faena' | 'Honorarios';
  fechaIngreso: string;
  fechaVencimientoContrato: string;
  telefono: string;
  correo: string;
  afp: string;
  salud: string;
  tramoFonasa?: string;
  montoIsapreUF?: number;
  mutual?: string;
  afc?: string;
  sueldoBase: number;
  status: 'Activo' | 'En Vacaciones' | 'Licencia Médica' | 'Desvinculado';
  vacacionesTotales: number;
  vacacionesTomadas: number;
  eppEntregado: string;
  fechaUltimoEPP: string;
  observaciones: string;
  documentos?: CollaboratorDocument[];
}

export function RrhhAdminSection() {
  const [collabs, setCollabs] = useState<CollaboratorItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'personal' | 'contratos' | 'vacaciones' | 'sueldos' | 'previred' | 'epp'>('personal');
  const [search, setSearch] = useState('');

  // Modal Expediente Documental de un Trabajador
  const [selectedCollab, setSelectedCollab] = useState<CollaboratorItem | null>(null);
  const [showDocModal, setShowDocModal] = useState(false);

  // Formulario nuevo documento para trabajador
  const [docTitle, setDocTitle] = useState('');
  const [docCategory, setDocCategory] = useState<CollaboratorDocument['category']>('Contratos & Anexos');
  const [docUrlMode, setDocUrlMode] = useState<'upload' | 'drive'>('upload');
  const [docDriveUrl, setDocDriveUrl] = useState('');
  const [docFile, setDocFile] = useState<File | null>(null);
  const [docExpiration, setDocExpiration] = useState('N/A');
  const [uploadingDoc, setUploadingDoc] = useState(false);

  // Formulario nuevo colaborador
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRut, setNewRut] = useState('');
  const [newNombre, setNewNombre] = useState('');
  const [newCargo, setNewCargo] = useState('');
  const [newDepartamento, setNewDepartamento] = useState('Terreno / Obras');
  const [newTipoContrato, setNewTipoContrato] = useState<CollaboratorItem['tipoContrato']>('Indefinido');
  const [newFechaIngreso, setNewFechaIngreso] = useState(new Date().toISOString().split('T')[0]);
  const [newFechaVencimiento, setNewFechaVencimiento] = useState('Indefinido');
  const [newSueldoBase, setNewSueldoBase] = useState('');
  const [newTelefono, setNewTelefono] = useState('');
  const [newCorreo, setNewCorreo] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Cargar colaboradores
  const fetchCollaborators = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/rrhh', { cache: 'no-store' });
      const data = await res.json();
      if (data.success) {
        setCollabs(data.data);
      }
    } catch {
      console.error('Error al cargar datos de RRHH');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollaborators();
  }, []);

  // Agregar nuevo colaborador
  const handleAddCollaborator = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRut.trim() || !newNombre.trim() || !newCargo.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/rrhh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rut: newRut,
          nombre: newNombre,
          cargo: newCargo,
          departamento: newDepartamento,
          tipoContrato: newTipoContrato,
          fechaIngreso: newFechaIngreso,
          fechaVencimientoContrato: newFechaVencimiento,
          sueldoBase: newSueldoBase,
          telefono: newTelefono,
          correo: newCorreo,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setNewRut('');
        setNewNombre('');
        setNewCargo('');
        setNewSueldoBase('');
        setShowAddModal(false);
        fetchCollaborators();
      } else {
        alert(data.error || 'Error al guardar colaborador.');
      }
    } catch {
      alert('Error al conectar con el servidor de RRHH.');
    } finally {
      setSubmitting(false);
    }
  };

  // Abrir modal de documentos
  const handleOpenFolder = (collab: CollaboratorItem) => {
    setSelectedCollab(collab);
    setShowDocModal(true);
  };

  // Guardar/Adjuntar documento a trabajador
  const handleSaveDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCollab || !docTitle.trim()) return;

    setUploadingDoc(true);
    let finalUrl = docDriveUrl.trim();

    try {
      // Subida de archivo directa si se seleccionó archivo local
      if (docUrlMode === 'upload' && docFile) {
        const formData = new FormData();
        formData.append('file', docFile);
        formData.append('collabId', selectedCollab.id);

        const uploadRes = await fetch('/api/admin/rrhh/upload', {
          method: 'POST',
          body: formData,
        });
        const uploadData = await uploadRes.json();

        if (uploadData.success) {
          finalUrl = uploadData.fileUrl;
        } else {
          alert(uploadData.error || 'Error al subir archivo.');
          setUploadingDoc(false);
          return;
        }
      }

      if (!finalUrl) {
        alert('Debes ingresar una URL de Google Drive o seleccionar un archivo.');
        setUploadingDoc(false);
        return;
      }

      const res = await fetch('/api/admin/rrhh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add_document',
          collabId: selectedCollab.id,
          title: docTitle,
          category: docCategory,
          format: docFile ? docFile.name.split('.').pop()?.toUpperCase() || 'PDF' : 'PDF/Drive',
          url: finalUrl,
          expirationDate: docExpiration,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setDocTitle('');
        setDocDriveUrl('');
        setDocFile(null);
        setSelectedCollab(data.collaborator);
        fetchCollaborators();
      } else {
        alert(data.error || 'Error al registrar documento.');
      }
    } catch {
      alert('Error al guardar el documento.');
    } finally {
      setUploadingDoc(false);
    }
  };

  // Eliminar documento
  const handleDeleteDoc = async (docId: string) => {
    if (!selectedCollab || !confirm('¿Eliminar este documento del expediente?')) return;
    try {
      const res = await fetch('/api/admin/rrhh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete_document',
          collabId: selectedCollab.id,
          docId,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSelectedCollab((prev) =>
          prev
            ? {
                ...prev,
                documentos: prev.documentos?.filter((d) => d.id !== docId),
              }
            : null
        );
        fetchCollaborators();
      }
    } catch {
      alert('Error al eliminar el documento.');
    }
  };

  // Exportar Plantilla Previred (.csv)
  const handleExportPrevired = async () => {
    try {
      const res = await fetch('/api/admin/rrhh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'export_previred' }),
      });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Nomina_Previred_Contrapunto_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch {
      alert('Error al generar la plantilla de Previred.');
    }
  };

  // Actualizar estado del trabajador
  const handleUpdateStatus = async (id: string, newStatus: CollaboratorItem['status']) => {
    try {
      const res = await fetch('/api/admin/rrhh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update',
          id,
          updates: { status: newStatus },
        }),
      });
      const data = await res.json();
      if (data.success) {
        setCollabs((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
        );
      }
    } catch {
      alert('Error al actualizar estado.');
    }
  };

  // Eliminar colaborador
  const handleDeleteCollaborator = async (id: string) => {
    if (!confirm('¿Estás seguro de dar de baja este expediente?')) return;
    try {
      const res = await fetch('/api/admin/rrhh', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setCollabs((prev) => prev.filter((c) => c.id !== id));
      }
    } catch {
      alert('Error al eliminar.');
    }
  };

  // Filtrar colaboradores por texto de búsqueda
  const filteredCollabs = collabs.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.nombre.toLowerCase().includes(q) ||
      c.rut.toLowerCase().includes(q) ||
      c.cargo.toLowerCase().includes(q) ||
      c.departamento.toLowerCase().includes(q)
    );
  });

  return (
    <div className="py-10 bg-[#0f0e0c] text-cream min-h-screen font-body selection:bg-sand selection:text-carbon">
      <div className="container-base max-w-7xl mx-auto space-y-8">

        {/* HEADER DE RECURSOS HUMANOS */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
          <div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-xs text-sand hover:underline font-mono uppercase tracking-wider mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Volver al Dashboard
            </Link>
            <h1 className="font-heading text-3xl font-extrabold uppercase text-cream tracking-wide flex items-center gap-3">
              <Users className="w-7 h-7 text-sand" />
              Recursos Humanos & Gestión de Personas
            </h1>
            <p className="text-xs text-neutral-400 font-light mt-1">
              Expedientes digitales, subida de contratos/liquidaciones y exportador masivo para Previred (`Jean`, `Valeria`, `Nicole`, `Fernando`).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportPrevired}
              className="bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/40 px-4 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors flex items-center gap-2 cursor-pointer font-mono"
            >
              <Building2 className="w-4 h-4" /> Exportar a Previred (.csv)
            </button>

            <button
              onClick={() => setShowAddModal(!showAddModal)}
              className="bg-sand text-carbon hover:bg-[#a38b72] px-5 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Nuevo Trabajador
            </button>
          </div>
        </div>

        {/* FORMULARIO NUEVO TRABAJADOR */}
        {showAddModal && (
          <form
            onSubmit={handleAddCollaborator}
            className="bg-[#181614] border border-sand/40 rounded-3xl p-6 shadow-2xl space-y-4 animate-fade-in"
          >
            <h2 className="font-heading text-base font-bold uppercase text-sand tracking-wider flex items-center gap-2">
              <UserCheck className="w-4 h-4" /> Ingresar Ficha de Nuevo Colaborador
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                  RUT *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. 12.345.678-9"
                  value={newRut}
                  onChange={(e) => setNewRut(e.target.value)}
                  className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 text-xs focus:outline-none focus:border-sand font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Andrés Silva Riquelme"
                  value={newNombre}
                  onChange={(e) => setNewNombre(e.target.value)}
                  className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 text-xs focus:outline-none focus:border-sand"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                  Cargo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Inspector Técnico de Obras / Maestro Alfarero"
                  value={newCargo}
                  onChange={(e) => setNewCargo(e.target.value)}
                  className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 text-xs focus:outline-none focus:border-sand"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                  Área / Departamento
                </label>
                <select
                  value={newDepartamento}
                  onChange={(e) => setNewDepartamento(e.target.value)}
                  className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 text-xs focus:outline-none focus:border-sand font-mono"
                >
                  <option value="Terreno / Obras">Terreno / Obras</option>
                  <option value="Inspección Técnica">Inspección Técnica (ITO)</option>
                  <option value="Oficina Central">Oficina Central / Administración</option>
                  <option value="Mantenimiento">Mantenimiento & Servicios</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                  Tipo de Contrato
                </label>
                <select
                  value={newTipoContrato}
                  onChange={(e) => setNewTipoContrato(e.target.value as CollaboratorItem['tipoContrato'])}
                  className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 text-xs focus:outline-none focus:border-sand font-mono"
                >
                  <option value="Indefinido">Indefinido</option>
                  <option value="Plazo Fijo">Plazo Fijo</option>
                  <option value="Por Obra o Faena">Por Obra o Faena</option>
                  <option value="Honorarios">Honorarios</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                  Sueldo Base (CLP)
                </label>
                <input
                  type="number"
                  placeholder="Ej. 850000"
                  value={newSueldoBase}
                  onChange={(e) => setNewSueldoBase(e.target.value)}
                  className="w-full bg-stone-900 border border-white/10 text-sand font-mono font-bold rounded-xl p-3 text-xs focus:outline-none focus:border-sand"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                  Fecha de Ingreso
                </label>
                <input
                  type="date"
                  value={newFechaIngreso}
                  onChange={(e) => setNewFechaIngreso(e.target.value)}
                  className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 text-xs focus:outline-none focus:border-sand font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                  Vencimiento Contrato
                </label>
                <input
                  type="text"
                  placeholder="AAAA-MM-DD o Indefinido"
                  value={newFechaVencimiento}
                  onChange={(e) => setNewFechaVencimiento(e.target.value)}
                  className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 text-xs focus:outline-none focus:border-sand font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                  Teléfono de Contacto
                </label>
                <input
                  type="text"
                  placeholder="+56 9 1234 5678"
                  value={newTelefono}
                  onChange={(e) => setNewTelefono(e.target.value)}
                  className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 text-xs focus:outline-none focus:border-sand font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  placeholder="trabajador@contrapunto.cl"
                  value={newCorreo}
                  onChange={(e) => setNewCorreo(e.target.value)}
                  className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 text-xs focus:outline-none focus:border-sand font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-xs font-mono text-neutral-400 hover:text-cream"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="bg-sand text-carbon hover:bg-[#a38b72] px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                {submitting ? 'Guardando...' : 'Guardar Ficha Trabajador'}
              </button>
            </div>
          </form>
        )}

        {/* NAVEGACIÓN DE PESTAÑAS (TABS) */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab('personal')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'personal'
                ? 'bg-sand text-carbon shadow-lg'
                : 'bg-stone-900 text-neutral-400 hover:text-cream border border-white/5'
            }`}
          >
            <Users className="w-4 h-4" /> Expedientes Digitales ({collabs.length})
          </button>

          <button
            onClick={() => setActiveTab('contratos')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'contratos'
                ? 'bg-sand text-carbon shadow-lg'
                : 'bg-stone-900 text-neutral-400 hover:text-cream border border-white/5'
            }`}
          >
            <FileCheck className="w-4 h-4" /> Contratos & Vencimientos
          </button>

          <button
            onClick={() => setActiveTab('previred')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'previred'
                ? 'bg-emerald-600 text-white shadow-lg font-bold'
                : 'bg-stone-900 text-neutral-400 hover:text-cream border border-white/5'
            }`}
          >
            <Building2 className="w-4 h-4" /> Previsión & Previred
          </button>

          <button
            onClick={() => setActiveTab('vacaciones')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'vacaciones'
                ? 'bg-sand text-carbon shadow-lg'
                : 'bg-stone-900 text-neutral-400 hover:text-cream border border-white/5'
            }`}
          >
            <Calendar className="w-4 h-4" /> Vacaciones & Permisos
          </button>

          <button
            onClick={() => setActiveTab('sueldos')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'sueldos'
                ? 'bg-sand text-carbon shadow-lg'
                : 'bg-stone-900 text-neutral-400 hover:text-cream border border-white/5'
            }`}
          >
            <DollarSign className="w-4 h-4" /> Liquidaciones & Sueldos
          </button>

          <button
            onClick={() => setActiveTab('epp')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'epp'
                ? 'bg-sand text-carbon shadow-lg'
                : 'bg-stone-900 text-neutral-400 hover:text-cream border border-white/5'
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> EPP & Prevención
          </button>
        </div>

        {/* BUSCADOR */}
        <div className="flex justify-between items-center bg-[#181614] border border-white/10 rounded-2xl p-4 shadow-lg">
          <span className="text-xs font-mono text-neutral-400">Filtrar nómina de colaboradores:</span>
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por RUT, nombre o cargo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-sand font-mono"
            />
          </div>
        </div>

        {/* CONTENIDO SEGÚN LA PESTAÑA SELECCIONADA */}
        {loading ? (
          <div className="text-center py-12 text-xs font-mono text-sand flex justify-center items-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin" /> Cargando nómina de colaboradores...
          </div>
        ) : (
          <div className="space-y-4">
            {/* PESTAÑA 1: EXPEDIENTES DIGITALES DE PERSONAL */}
            {activeTab === 'personal' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCollabs.map((collab) => {
                  const docCount = collab.documentos?.length || 0;

                  return (
                    <div
                      key={collab.id}
                      className="bg-[#181614] border border-white/10 hover:border-sand/40 rounded-2xl p-5 shadow-xl space-y-4 transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] font-mono text-sand font-bold block">
                              RUT: {collab.rut}
                            </span>
                            <h3 className="font-heading text-lg font-bold text-cream">
                              {collab.nombre}
                            </h3>
                          </div>
                          <select
                            value={collab.status}
                            onChange={(e) => handleUpdateStatus(collab.id, e.target.value as CollaboratorItem['status'])}
                            className="bg-stone-900 border border-white/10 text-sand font-mono text-[10px] uppercase font-bold rounded-lg px-2 py-1 focus:outline-none focus:border-sand cursor-pointer"
                          >
                            <option value="Activo">🟢 Activo</option>
                            <option value="En Vacaciones">🔵 Vacaciones</option>
                            <option value="Licencia Médica">🟡 Licencia</option>
                            <option value="Desvinculado">🔴 Desvinculado</option>
                          </select>
                        </div>

                        <div className="space-y-1 text-xs text-neutral-300">
                          <p className="font-medium text-cream">{collab.cargo}</p>
                          <p className="text-[11px] font-mono text-neutral-400">
                            Área: {collab.departamento} • Contrato: {collab.tipoContrato}
                          </p>
                        </div>

                        <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-400">
                          <span>AFP: {collab.afp}</span>
                          <span>•</span>
                          <span>Salud: {collab.salud}</span>
                          <span>•</span>
                          <span>Sueldo: ${collab.sueldoBase.toLocaleString('es-CL')} CLP</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-3 text-xs font-mono">
                        <button
                          onClick={() => handleOpenFolder(collab)}
                          className="bg-sand/15 hover:bg-sand text-sand hover:text-carbon border border-sand/30 font-bold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer text-xs"
                        >
                          <FolderOpen className="w-4 h-4" /> Carpetas & Documentos ({docCount})
                        </button>

                        <button
                          onClick={() => handleDeleteCollaborator(collab.id)}
                          className="text-neutral-500 hover:text-red-400 p-1"
                          title="Eliminar Expediente"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* PESTAÑA 2: CONTRATOS & VENCIMIENTOS */}
            {activeTab === 'contratos' && (
              <div className="bg-[#181614] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-stone-900 border-b border-white/10 text-sand uppercase text-[10px]">
                    <tr>
                      <th className="p-3.5">Trabajador</th>
                      <th className="p-3.5">Cargo</th>
                      <th className="p-3.5">Tipo Contrato</th>
                      <th className="p-3.5">Fecha Ingreso</th>
                      <th className="p-3.5">Vencimiento</th>
                      <th className="p-3.5 text-center">Estado Alerta</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredCollabs.map((collab) => {
                      const isFixed = collab.tipoContrato !== 'Indefinido';

                      return (
                        <tr key={collab.id} className="hover:bg-white/[0.02]">
                          <td className="p-3.5 text-cream font-sans font-bold">{collab.nombre}</td>
                          <td className="p-3.5 text-neutral-300">{collab.cargo}</td>
                          <td className="p-3.5 text-sand font-bold">{collab.tipoContrato}</td>
                          <td className="p-3.5 text-neutral-400">{collab.fechaIngreso}</td>
                          <td className="p-3.5 text-neutral-200 font-bold">{collab.fechaVencimientoContrato}</td>
                          <td className="p-3.5 text-center">
                            {isFixed ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                                <AlertTriangle className="w-3 h-3" /> Vence Pronto
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                                <CheckCircle2 className="w-3 h-3" /> Vigente (Indefinido)
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* PESTAÑA 3: PREVISIÓN & PREVIRED */}
            {activeTab === 'previred' && (
              <div className="space-y-6">
                <div className="bg-[#181614] border border-emerald-500/30 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1">
                    <h3 className="font-heading text-lg font-bold text-emerald-300 flex items-center gap-2">
                      <Building2 className="w-5 h-5" /> Integración & Plantilla de Carga Masiva Previred
                    </h3>
                    <p className="text-xs text-neutral-300 font-light">
                      Genera el archivo delimitado por punto y coma (<code>.csv</code>) normado para cargar directamente las cotizaciones del personal a <strong>Previred.com</strong>.
                    </p>
                  </div>

                  <button
                    onClick={handleExportPrevired}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-3 rounded-xl transition-all shadow-lg flex items-center gap-2 font-mono text-xs cursor-pointer shrink-0"
                  >
                    <Download className="w-4 h-4" /> Exportar Nómina Previred (.csv)
                  </button>
                </div>

                <div className="bg-[#181614] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-stone-900 border-b border-white/10 text-sand uppercase text-[10px]">
                      <tr>
                        <th className="p-3.5">RUT</th>
                        <th className="p-3.5">Trabajador</th>
                        <th className="p-3.5">AFP</th>
                        <th className="p-3.5">Salud</th>
                        <th className="p-3.5">Mutualidad</th>
                        <th className="p-3.5 text-right">Sueldo Imponible</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredCollabs.map((collab) => (
                        <tr key={collab.id} className="hover:bg-white/[0.02]">
                          <td className="p-3.5 text-sand font-bold">{collab.rut}</td>
                          <td className="p-3.5 text-cream font-sans font-bold">{collab.nombre}</td>
                          <td className="p-3.5 text-neutral-300">{collab.afp}</td>
                          <td className="p-3.5 text-neutral-300">{collab.salud}</td>
                          <td className="p-3.5 text-neutral-400">{collab.mutual || 'Mutual CChC'}</td>
                          <td className="p-3.5 text-right font-bold text-emerald-400">
                            ${collab.sueldoBase.toLocaleString('es-CL')} CLP
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* PESTAÑA 4: VACACIONES */}
            {activeTab === 'vacaciones' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCollabs.map((collab) => {
                  const pendientes = collab.vacacionesTotales - collab.vacacionesTomadas;

                  return (
                    <div key={collab.id} className="bg-[#181614] border border-white/10 rounded-2xl p-5 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-heading text-base font-bold text-cream">{collab.nombre}</h3>
                          <span className="text-xs text-neutral-400 font-mono">{collab.cargo}</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-sand bg-sand/10 border border-sand/30 px-3 py-1 rounded-xl">
                          {pendientes} Días Pendientes
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-white/5">
                        <div className="bg-stone-900 p-2.5 rounded-xl border border-white/5">
                          <span className="text-[10px] text-neutral-400 block">Días Tomados</span>
                          <span className="font-bold text-neutral-200">{collab.vacacionesTomadas} Días</span>
                        </div>
                        <div className="bg-stone-900 p-2.5 rounded-xl border border-white/5">
                          <span className="text-[10px] text-neutral-400 block">Total Derecho Anual</span>
                          <span className="font-bold text-sand">{collab.vacacionesTotales} Días</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* PESTAÑA 5: SUELDOS & LIQUIDACIONES */}
            {activeTab === 'sueldos' && (
              <div className="bg-[#181614] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-stone-900 border-b border-white/10 text-sand uppercase text-[10px]">
                    <tr>
                      <th className="p-3.5">Trabajador</th>
                      <th className="p-3.5">Cargo</th>
                      <th className="p-3.5 text-right">Sueldo Base (CLP)</th>
                      <th className="p-3.5">Previsión / Salud</th>
                      <th className="p-3.5 text-center">Estado Liquidación</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredCollabs.map((collab) => (
                      <tr key={collab.id} className="hover:bg-white/[0.02]">
                        <td className="p-3.5 text-cream font-sans font-bold">{collab.nombre}</td>
                        <td className="p-3.5 text-neutral-300">{collab.cargo}</td>
                        <td className="p-3.5 text-right font-bold text-sand">
                          ${collab.sueldoBase.toLocaleString('es-CL')} CLP
                        </td>
                        <td className="p-3.5 text-neutral-400">
                          {collab.afp} / {collab.salud}
                        </td>
                        <td className="p-3.5 text-center">
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                            ✓ Liquidación al día
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* PESTAÑA 6: EPP & PREVENCIÓN */}
            {activeTab === 'epp' && (
              <div className="space-y-4">
                {filteredCollabs.map((collab) => (
                  <div key={collab.id} className="bg-[#181614] border border-white/10 rounded-2xl p-5 space-y-3">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div>
                        <h3 className="font-heading text-base font-bold text-cream">{collab.nombre}</h3>
                        <span className="text-xs text-neutral-400 font-mono">{collab.cargo} • {collab.departamento}</span>
                      </div>
                      <span className="text-[10px] font-mono text-sand bg-sand/10 border border-sand/30 px-3 py-1 rounded-xl">
                        Última Entrega EPP: {collab.fechaUltimoEPP}
                      </span>
                    </div>

                    <div className="bg-stone-900 border border-white/5 rounded-xl p-3 text-xs text-neutral-300 font-mono space-y-1">
                      <span className="text-[10px] font-bold text-sand uppercase block">Equipos Entregados:</span>
                      <p>{collab.eppEntregado}</p>
                    </div>

                    {collab.observaciones && (
                      <p className="text-xs text-neutral-400 font-light italic">
                        Nota: {collab.observaciones}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* MODAL EXPEDIENTE DOCUMENTAL DEL TRABAJADOR */}
        {showDocModal && selectedCollab && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-[#181614] border border-sand/40 rounded-3xl max-w-3xl w-full p-6 space-y-6 shadow-2xl animate-fade-in relative my-8">
              <button
                onClick={() => setShowDocModal(false)}
                className="absolute top-5 right-5 text-neutral-400 hover:text-cream p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1 border-b border-white/10 pb-4">
                <span className="text-[10px] font-mono text-sand uppercase font-bold">Expediente Digital</span>
                <h2 className="font-heading text-xl font-bold text-cream flex items-center gap-2">
                  <FolderOpen className="w-5 h-5 text-sand" /> Documentos de {selectedCollab.nombre}
                </h2>
                <p className="text-xs text-neutral-400 font-mono">
                  RUT: {selectedCollab.rut} | Cargo: {selectedCollab.cargo}
                </p>
              </div>

              {/* FORMULARIO ADJUNTAR DOCUMENTO */}
              <form onSubmit={handleSaveDocument} className="bg-stone-900 border border-white/10 rounded-2xl p-4 space-y-4">
                <h3 className="text-xs font-bold text-sand uppercase tracking-wider flex items-center gap-1.5 font-mono">
                  <Plus className="w-3.5 h-3.5" /> Adjuntar Nuevo Documento al Expediente
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                      Nombre / Título del Documento *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Contrato Plazo Fijo 2026.pdf"
                      value={docTitle}
                      onChange={(e) => setDocTitle(e.target.value)}
                      className="w-full bg-[#181614] border border-white/10 text-cream rounded-xl p-2.5 text-xs focus:outline-none focus:border-sand"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                      Categoría
                    </label>
                    <select
                      value={docCategory}
                      onChange={(e) => setDocCategory(e.target.value as CollaboratorDocument['category'])}
                      className="w-full bg-[#181614] border border-white/10 text-cream rounded-xl p-2.5 text-xs focus:outline-none focus:border-sand font-mono cursor-pointer"
                    >
                      <option value="Contratos & Anexos">Contratos & Anexos</option>
                      <option value="Liquidaciones de Sueldo">Liquidaciones de Sueldo</option>
                      <option value="Licencias & Permisos">Licencias & Permisos</option>
                      <option value="Prevención & EPP">Prevención & EPP (Exámenes/Mutual)</option>
                      <option value="Documentación Personal">Documentación Personal (Carnet/AFP)</option>
                    </select>
                  </div>
                </div>

                {/* MODOS DE SUBIDA (SUBIR ARCHIVO DIRECTO O LINK DE GOOGLE DRIVE) */}
                <div className="space-y-2">
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <label className="flex items-center gap-1.5 cursor-pointer text-sand">
                      <input
                        type="radio"
                        name="mode"
                        checked={docUrlMode === 'upload'}
                        onChange={() => setDocUrlMode('upload')}
                        className="accent-sand"
                      />
                      <UploadCloud className="w-3.5 h-3.5" /> Subir Archivo PDF/Foto Directo a la Web
                    </label>

                    <label className="flex items-center gap-1.5 cursor-pointer text-neutral-300">
                      <input
                        type="radio"
                        name="mode"
                        checked={docUrlMode === 'drive'}
                        onChange={() => setDocUrlMode('drive')}
                        className="accent-sand"
                      />
                      <ExternalLink className="w-3.5 h-3.5" /> Enlace a Google Drive / Cloud
                    </label>
                  </div>

                  {docUrlMode === 'upload' ? (
                    <input
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.xlsx"
                      onChange={(e) => setDocFile(e.target.files?.[0] || null)}
                      className="w-full bg-[#181614] border border-white/10 text-neutral-300 rounded-xl p-2 text-xs font-mono"
                    />
                  ) : (
                    <input
                      type="url"
                      placeholder="Ej. https://drive.google.com/file/d/..."
                      value={docDriveUrl}
                      onChange={(e) => setDocDriveUrl(e.target.value)}
                      className="w-full bg-[#181614] border border-white/10 text-cream rounded-xl p-2.5 text-xs focus:outline-none focus:border-sand font-mono"
                    />
                  )}
                </div>

                <div className="flex justify-between items-center pt-1">
                  <input
                    type="text"
                    placeholder="Fecha Vencimiento (ej. 2026-12-31 o N/A)"
                    value={docExpiration}
                    onChange={(e) => setDocExpiration(e.target.value)}
                    className="bg-[#181614] border border-white/10 text-cream rounded-xl p-2 text-xs font-mono w-56"
                  />

                  <button
                    type="submit"
                    disabled={uploadingDoc}
                    className="bg-sand text-carbon hover:bg-[#a38b72] px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    {uploadingDoc ? 'Guardando...' : 'Adjuntar Documento'}
                  </button>
                </div>
              </form>

              {/* CARPETAS Y ARCHIVOS DEL TRABAJADOR */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider font-mono">
                  Documentos Registrados en Carpeta ({selectedCollab.documentos?.length || 0})
                </h3>

                {!selectedCollab.documentos || selectedCollab.documentos.length === 0 ? (
                  <div className="bg-stone-900 border border-white/5 rounded-2xl p-6 text-center text-xs text-neutral-400 font-mono">
                    No hay documentos adjuntos en el expediente de {selectedCollab.nombre}.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {selectedCollab.documentos.map((doc) => (
                      <div
                        key={doc.id}
                        className="bg-stone-900 border border-white/10 hover:border-sand/40 rounded-xl p-3 flex items-center justify-between text-xs font-mono"
                      >
                        <div className="space-y-0.5">
                          <span className="text-[9px] uppercase font-bold text-sand bg-sand/10 px-2 py-0.5 rounded border border-sand/30 mr-2">
                            {doc.category}
                          </span>
                          <span className="font-bold text-cream">{doc.title}</span>
                          <p className="text-[10px] text-neutral-400">
                            Subido por {doc.uploadedBy} el {doc.uploadedAt} • Vencimiento: {doc.expirationDate || 'N/A'}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <a
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-sand/15 hover:bg-sand text-sand hover:text-carbon border border-sand/30 font-bold px-3 py-1 rounded-lg transition-colors flex items-center gap-1 text-[11px]"
                          >
                            <FileText className="w-3.5 h-3.5" /> Ver Archivo
                          </a>

                          <button
                            onClick={() => handleDeleteDoc(doc.id)}
                            className="text-neutral-500 hover:text-red-400 p-1"
                            title="Eliminar Documento"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default RrhhAdminSection;
