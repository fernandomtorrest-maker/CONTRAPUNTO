'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Inbox,
  Search,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Plus,
  RefreshCw,
  Trash2,
  Clock,
  ArrowLeft,
  Edit3,
  Save,
  Send
} from 'lucide-react';

const TEAM_MEMBERS = ['Sin Asignar', 'Fernando', 'Nicole', 'Diego', 'Niels', 'Julio'];
const LEAD_STATUSES = ['Nuevo', 'En Contacto', 'Visita Agendada', 'Cerrado / Ganado', 'Desestimado'] as const;

export interface LeadItem {
  id: string;
  nombre: string;
  telefono: string;
  correo: string;
  servicio: string;
  comuna: string;
  mensaje: string;
  status: typeof LEAD_STATUSES[number];
  assignedTo: string;
  createdAt: string;
  notes: string;
}

export function LeadsAdminSection() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('Todos');

  // Formulario nuevo lead manual
  const [showAddModal, setShowAddModal] = useState(false);
  const [newNombre, setNewNombre] = useState('');
  const [newTelefono, setNewTelefono] = useState('');
  const [newCorreo, setNewCorreo] = useState('');
  const [newServicio, setNewServicio] = useState('Inspección Técnica');
  const [newComuna, setNewComuna] = useState('');
  const [newMensaje, setNewMensaje] = useState('');
  const [newAssignedTo, setNewAssignedTo] = useState('Sin Asignar');
  const [submitting, setSubmitting] = useState(false);

  // Edición de notas
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  // Cargar leads desde API
  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/leads', { cache: 'no-store' });
      const data = await res.json();
      if (data.success) {
        setLeads(data.data);
      }
    } catch {
      console.error('Error al cargar leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Actualizar atributo del lead (status, assignedTo, notes)
  const handleUpdateLead = async (id: string, updates: Partial<LeadItem>) => {
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update', id, ...updates }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, ...updates } : l))
        );
      }
    } catch {
      alert('Error al actualizar el lead.');
    }
  };

  // Eliminar lead
  const handleDeleteLead = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este lead?')) return;
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
      }
    } catch {
      alert('Error al eliminar.');
    }
  };

  // Guardar nuevo lead manual
  const handleAddManualLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNombre.trim() || !newTelefono.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: newNombre,
          telefono: newTelefono,
          correo: newCorreo,
          servicio: newServicio,
          comuna: newComuna,
          mensaje: newMensaje,
          assignedTo: newAssignedTo,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setNewNombre('');
        setNewTelefono('');
        setNewCorreo('');
        setNewComuna('');
        setNewMensaje('');
        setShowAddModal(false);
        fetchLeads();
      } else {
        alert(data.error || 'Error al crear lead.');
      }
    } catch {
      alert('Error de conexión.');
    } finally {
      setSubmitting(false);
    }
  };

  // Guardar nota editada
  const handleSaveNotes = (id: string) => {
    handleUpdateLead(id, { notes: noteText });
    setEditingNotesId(null);
  };

  // Generar link de WhatsApp directo
  const getWhatsAppLink = (phone: string, nombre: string, servicio: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(
      `Hola ${nombre}! Te contactamos de Constructora Contrapunto referente a tu solicitud de ${servicio}. ¿Cómo estás?`
    );
    return `https://wa.me/${cleanPhone}?text=${msg}`;
  };

  // Filtrar por estado y búsqueda
  const filteredLeads = leads.filter((item) => {
    const matchesSearch =
      item.nombre.toLowerCase().includes(search.toLowerCase()) ||
      item.telefono.includes(search) ||
      item.correo.toLowerCase().includes(search.toLowerCase()) ||
      item.servicio.toLowerCase().includes(search.toLowerCase()) ||
      item.comuna.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = filterStatus === 'Todos' || item.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Insignias por estado
  const statusStyles: { [key in typeof LEAD_STATUSES[number]]: string } = {
    Nuevo: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    'En Contacto': 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    'Visita Agendada': 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    'Cerrado / Ganado': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    Desestimado: 'bg-stone-800 text-neutral-400 border-white/10',
  };

  return (
    <div className="py-10 bg-[#0f0e0c] text-cream min-h-screen font-body selection:bg-sand selection:text-carbon">
      <div className="container-base max-w-7xl mx-auto space-y-8">

        {/* HEADER DE NAVEGACIÓN Y TÍTULO */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
          <div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-xs text-sand hover:underline font-mono uppercase tracking-wider mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Volver al Dashboard
            </Link>
            <h1 className="font-heading text-3xl font-extrabold uppercase text-cream tracking-wide flex items-center gap-3">
              <Inbox className="w-7 h-7 text-sand" />
              Gestión de Leads & Contactos Web
            </h1>
            <p className="text-xs text-neutral-400 font-light mt-1">
              Registro automático y seguimiento comercial de prospectos ({leads.length} registros).
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(!showAddModal)}
            className="bg-sand text-carbon hover:bg-[#a38b72] px-5 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors shadow-lg flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Ingresar Lead Manual
          </button>
        </div>

        {/* MODAL INGRESO LEAD MANUAL */}
        {showAddModal && (
          <form
            onSubmit={handleAddManualLead}
            className="bg-[#181614] border border-sand/40 rounded-3xl p-6 shadow-2xl space-y-4 animate-fade-in"
          >
            <h2 className="font-heading text-base font-bold uppercase text-sand tracking-wider">
              Ingresar Prospecto Manualmente
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                  Nombre del Cliente *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Manuel Silva"
                  value={newNombre}
                  onChange={(e) => setNewNombre(e.target.value)}
                  className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 text-xs focus:outline-none focus:border-sand"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                  Teléfono de Contacto *
                </label>
                <input
                  type="text"
                  required
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
                  placeholder="cliente@ejemplo.com"
                  value={newCorreo}
                  onChange={(e) => setNewCorreo(e.target.value)}
                  className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 text-xs focus:outline-none focus:border-sand font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                  Servicio de Interés
                </label>
                <input
                  type="text"
                  placeholder="Ej. Inspección Pre-Entrega"
                  value={newServicio}
                  onChange={(e) => setNewServicio(e.target.value)}
                  className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 text-xs focus:outline-none focus:border-sand"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                  Comuna / Ubicación
                </label>
                <input
                  type="text"
                  placeholder="Ej. Providencia"
                  value={newComuna}
                  onChange={(e) => setNewComuna(e.target.value)}
                  className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 text-xs focus:outline-none focus:border-sand"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                  Asignar a Responsable
                </label>
                <select
                  value={newAssignedTo}
                  onChange={(e) => setNewAssignedTo(e.target.value)}
                  className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 text-xs focus:outline-none focus:border-sand font-mono"
                >
                  {TEAM_MEMBERS.map((user) => (
                    <option key={user} value={user}>
                      👤 {user}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                Mensaje o Requerimientos
              </label>
              <textarea
                rows={2}
                placeholder="Detalles de la consulta del cliente..."
                value={newMensaje}
                onChange={(e) => setNewMensaje(e.target.value)}
                className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 text-xs focus:outline-none focus:border-sand"
              />
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
                {submitting ? 'Guardando...' : 'Guardar Lead'}
              </button>
            </div>
          </form>
        )}

        {/* FILTROS Y BARRA DE BÚSQUEDA */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-[#181614] border border-white/10 rounded-2xl p-4 shadow-lg">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-mono uppercase text-neutral-400 mr-2">Filtrar por Estado:</span>
            {['Todos', ...LEAD_STATUSES].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  filterStatus === status
                    ? 'bg-sand text-carbon font-bold'
                    : 'bg-stone-900 text-neutral-400 hover:text-cream border border-white/5'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por nombre, teléfono, comuna..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-sand font-mono"
            />
          </div>
        </div>

        {/* LISTADO DE LEADS */}
        {loading ? (
          <div className="text-center py-12 text-xs font-mono text-sand flex justify-center items-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin" /> Cargando lista de leads...
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="bg-[#181614] border border-white/10 rounded-2xl p-12 text-center space-y-3">
            <Inbox className="w-10 h-10 text-neutral-600 mx-auto" />
            <p className="text-xs text-neutral-400 font-mono">
              No se encontraron leads con el criterio seleccionado.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredLeads.map((item) => (
              <div
                key={item.id}
                className="bg-[#181614] border border-white/10 hover:border-sand/40 rounded-2xl p-5 shadow-xl transition-all space-y-4"
              >
                {/* Header Lead: Nombre, Estado, Responsable */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-white/5 pb-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-heading text-lg font-bold text-cream">
                        {item.nombre}
                      </span>
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider border px-2.5 py-0.5 rounded-full ${statusStyles[item.status]}`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-400">
                      <span className="text-sand font-bold flex items-center gap-1">
                        🏢 {item.servicio}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-neutral-500" /> {item.comuna}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-neutral-500">
                        <Clock className="w-3.5 h-3.5" /> {new Date(item.createdAt).toLocaleDateString('es-CL')}
                      </span>
                    </div>
                  </div>

                  {/* Asignación de Responsable */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase">Responsable:</span>
                    <select
                      value={item.assignedTo}
                      onChange={(e) => handleUpdateLead(item.id, { assignedTo: e.target.value })}
                      className="bg-stone-900 border border-white/10 text-sand font-mono text-xs rounded-lg px-2.5 py-1 focus:outline-none focus:border-sand cursor-pointer font-bold"
                    >
                      {TEAM_MEMBERS.map((user) => (
                        <option key={user} value={user}>
                          👤 {user}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Mensaje original del cliente */}
                <div className="bg-stone-900/60 border border-white/5 rounded-xl p-3 text-xs text-neutral-300 font-light leading-relaxed whitespace-pre-line">
                  <span className="text-[10px] font-mono text-sand uppercase block mb-1 font-bold">
                    Mensaje / Consulta del Cliente:
                  </span>
                  {item.mensaje}
                </div>

                {/* Datos de contacto + Botones WhatsApp y Email */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                    <a
                      href={`tel:${item.telefono}`}
                      className="text-neutral-300 hover:text-sand flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-sand" /> {item.telefono}
                    </a>
                    {item.correo && (
                      <a
                        href={`mailto:${item.correo}`}
                        className="text-neutral-300 hover:text-sand flex items-center gap-1.5"
                      >
                        <Mail className="w-3.5 h-3.5 text-sand" /> {item.correo}
                      </a>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                    {/* Cambiar Estado */}
                    <select
                      value={item.status}
                      onChange={(e) => handleUpdateLead(item.id, { status: e.target.value as LeadItem['status'] })}
                      className="bg-stone-900 border border-white/20 text-cream text-xs rounded-xl px-3 py-2 font-mono focus:outline-none focus:border-sand cursor-pointer"
                    >
                      {LEAD_STATUSES.map((st) => (
                        <option key={st} value={st}>
                          Estado: {st}
                        </option>
                      ))}
                    </select>

                    {/* Botón WhatsApp Directo */}
                    <a
                      href={getWhatsAppLink(item.telefono, item.nombre, item.servicio)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-1.5 shadow transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" /> WhatsApp Directo
                    </a>

                    <button
                      onClick={() => handleDeleteLead(item.id)}
                      className="text-neutral-500 hover:text-red-400 p-2 transition-colors"
                      title="Eliminar Lead"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Bitácora de Notas Internas */}
                <div className="pt-2 border-t border-white/5">
                  {editingNotesId === item.id ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Añadir nota de llamada o seguimiento..."
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        className="w-full bg-stone-900 border border-sand text-cream rounded-xl p-2 text-xs font-mono"
                      />
                      <button
                        onClick={() => handleSaveNotes(item.id)}
                        className="bg-sand text-carbon font-bold px-3 py-1 rounded-xl text-xs flex items-center gap-1"
                      >
                        <Save className="w-3.5 h-3.5" /> Guardar
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-xs font-mono">
                      <div className="text-neutral-400 flex items-center gap-2">
                        <MessageSquare className="w-3.5 h-3.5 text-sand" />
                        <span>Notas: {item.notes || 'Sin notas registradas.'}</span>
                      </div>
                      <button
                        onClick={() => {
                          setEditingNotesId(item.id);
                          setNoteText(item.notes || '');
                        }}
                        className="text-sand hover:underline text-[11px] flex items-center gap-1"
                      >
                        <Edit3 className="w-3 h-3" /> Editar Nota
                      </button>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default LeadsAdminSection;
