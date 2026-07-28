'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  MessageSquare,
  Pin,
  Send,
  Plus,
  LogOut,
  Database,
  Sparkles,
  ClipboardList,
  Wrench,
  Inbox,
  FileText,
  ShieldCheck,
  Clock,
  ChevronDown,
  ChevronUp,
  Users
} from 'lucide-react';
import { hasRrhhPermission } from '@/lib/auth';

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

interface Post {
  id: string;
  author: string;
  category: 'Urgente' | 'Precios & Cotizaciones' | 'Obras e Inspecciones' | 'General';
  title: string;
  content: string;
  isPinned: boolean;
  createdAt: string;
  comments: Comment[];
}

interface DashboardSectionProps {
  currentUser: string;
}

export function DashboardSection({ currentUser }: DashboardSectionProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  // Formulario nuevo post
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<Post['category']>('General');
  const [newIsPinned, setNewIsPinned] = useState(false);
  const [submittingPost, setSubmittingPost] = useState(false);
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  // Formulario comentarios por post
  const [commentInputs, setCommentInputs] = useState<{ [postId: string]: string }>({});
  const [expandedPosts, setExpandedPosts] = useState<{ [postId: string]: boolean }>({});

  const router = useRouter();

  // Cargar publicaciones del foro
  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/admin/forum', { cache: 'no-store' });
      const data = await res.json();
      if (data.success) {
        setPosts(data.posts);
      }
    } catch {
      console.error('Error al cargar publicaciones');
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Manejar cierre de sesión
  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch {
      router.push('/admin/login');
    }
  };

  // Enviar nueva publicación
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    setSubmittingPost(true);
    try {
      const res = await fetch('/api/admin/forum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          content: newContent,
          category: newCategory,
          isPinned: newIsPinned,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setNewTitle('');
        setNewContent('');
        setNewCategory('General');
        setNewIsPinned(false);
        setShowNewPostForm(false);
        fetchPosts();
      } else {
        alert(data.error || 'Error al publicar el aviso.');
      }
    } catch {
      alert('Error al conectar con el servidor.');
    } finally {
      setSubmittingPost(false);
    }
  };

  // Enviar comentario
  const handleAddComment = async (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;

    try {
      const res = await fetch('/api/admin/forum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'comment',
          postId,
          content: text,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setCommentInputs({ ...commentInputs, [postId]: '' });
        fetchPosts();
      }
    } catch {
      alert('Error al publicar comentario.');
    }
  };

  // Alternar fijado de post
  const handleTogglePin = async (postId: string) => {
    try {
      const res = await fetch('/api/admin/forum', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId }),
      });
      const data = await res.json();
      if (data.success) {
        fetchPosts();
      }
    } catch {
      console.error('Error al cambiar pin');
    }
  };

  // Formatear fechas
  const formatDate = (isoStr: string) => {
    const d = new Date(isoStr);
    return d.toLocaleDateString('es-CL', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Colores por categoría
  const categoryBadges: { [key in Post['category']]: string } = {
    Urgente: 'bg-red-500/20 text-red-300 border-red-500/40',
    'Precios & Cotizaciones': 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    'Obras e Inspecciones': 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    General: 'bg-sand/20 text-sand border-sand/40',
  };

  return (
    <div className="py-10 bg-[#0f0e0c] text-cream min-h-screen font-body selection:bg-sand selection:text-carbon">
      <div className="container-base max-w-7xl mx-auto space-y-12">

        {/* HEADER DE BIENVENIDA Y LOGOUT */}
        <div className="bg-[#181614] border border-sand/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand/15 border border-sand/30 text-sand text-[10px] font-mono tracking-widest uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              SISTEMA ADMINISTRATIVO DE CONTROL
            </div>
            <h1 className="font-heading text-2xl sm:text-4xl font-extrabold uppercase text-cream tracking-wide">
              ¡Bienvenido/a, <span className="text-sand">{currentUser}</span>! 👋
            </h1>
            <p className="text-xs text-neutral-400 font-light">
              Plataforma centralizada para la administración de partidas, cotizaciones y comunicaciones internas del equipo.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-neutral-400 hover:text-cream font-mono underline uppercase tracking-wider px-3 py-2"
            >
              🌐 Ver Sitio Web
            </Link>
            <button
              onClick={handleLogout}
              className="bg-stone-900 hover:bg-red-500/20 border border-white/10 hover:border-red-500/40 text-neutral-300 hover:text-red-300 font-mono text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer shadow"
            >
              <LogOut className="w-4 h-4" />
              Cerrar Sesión
            </button>
          </div>
        </div>

        {/* SECCIÓN PRINCIPAL GRID: MÓDULOS + TABLERO DE AVISOS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* COLUMNA IZQUIERDA: MÓDULOS DEL SISTEMA (7 columnas) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h2 className="font-heading text-xl font-extrabold uppercase text-cream tracking-wide flex items-center gap-2.5">
                <Database className="w-5 h-5 text-sand" />
                Módulos del Sistema
              </h2>
              <p className="text-xs text-neutral-400 font-light mt-1">
                Accede directamente a los módulos administrativos y cotizadores.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Tarjeta 1: Partidas & Precios Unitarios */}
              <Link
                href="/admin/partidas"
                className="bg-[#181614] border border-sand/30 hover:border-sand hover:bg-stone-900 rounded-2xl p-5 transition-all group shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="p-3 rounded-xl bg-sand/15 text-sand group-hover:scale-110 transition-transform">
                      <Database className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      ACTIVO
                    </span>
                  </div>
                  <h3 className="font-heading text-base font-bold text-cream group-hover:text-sand transition-colors">
                    Base de Partidas & Precios
                  </h3>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">
                    Crear y editar partidas y valores en UF/CLP para el Cotizador Supremo en tiempo real.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-sand">
                  <span>Gestionar Base de Datos</span>
                  <span>→</span>
                </div>
              </Link>

              {/* Tarjeta 2: Cotizador Supremo */}
              <Link
                href="/cotizador-supremo"
                className="bg-[#181614] border border-white/10 hover:border-sand hover:bg-stone-900 rounded-2xl p-5 transition-all group shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="p-3 rounded-xl bg-sand/15 text-sand group-hover:scale-110 transition-transform">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      ACTIVO
                    </span>
                  </div>
                  <h3 className="font-heading text-base font-bold text-cream group-hover:text-sand transition-colors">
                    Cotizador Supremo (IA)
                  </h3>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">
                    Cotización inteligente por lenguaje natural con motor Gemini y búsqueda de partidas.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-sand">
                  <span>Abrir Cotizador IA</span>
                  <span>→</span>
                </div>
              </Link>

              {/* Tarjeta 3: Cotizador ITO */}
              <Link
                href="/cotizador-ito"
                className="bg-[#181614] border border-white/10 hover:border-sand hover:bg-stone-900 rounded-2xl p-5 transition-all group shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="p-3 rounded-xl bg-sand/15 text-sand group-hover:scale-110 transition-transform">
                      <ClipboardList className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      ACTIVO
                    </span>
                  </div>
                  <h3 className="font-heading text-base font-bold text-cream group-hover:text-sand transition-colors">
                    Cotizador ITO
                  </h3>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">
                    Inspección Técnica Pre-Entrega, Viviendas Usadas e Inspecciones por Frecuencia/Hitos con IVA.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-sand">
                  <span>Ir a Cotizador ITO</span>
                  <span>→</span>
                </div>
              </Link>

              {/* Tarjeta 4: Mantenimiento Integral */}
              <Link
                href="/mantenimiento"
                className="bg-[#181614] border border-white/10 hover:border-sand hover:bg-stone-900 rounded-2xl p-5 transition-all group shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="p-3 rounded-xl bg-sand/15 text-sand group-hover:scale-110 transition-transform">
                      <Wrench className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      ACTIVO
                    </span>
                  </div>
                  <h3 className="font-heading text-base font-bold text-cream group-hover:text-sand transition-colors">
                    Mantenimiento Integral
                  </h3>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">
                    Sección pública y planes mensuales para Edificios Residenciales, Condominios y Empresas.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-sand">
                  <span>Ver Mantenimiento</span>
                  <span>→</span>
                </div>
              </Link>

              {/* Tarjeta 5: Gestión de Leads Web */}
              <Link
                href="/admin/leads"
                className="bg-[#181614] border border-white/10 hover:border-sand hover:bg-stone-900 rounded-2xl p-5 transition-all group shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="p-3 rounded-xl bg-sand/15 text-sand group-hover:scale-110 transition-transform">
                      <Inbox className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      ACTIVO
                    </span>
                  </div>
                  <h3 className="font-heading text-base font-bold text-cream group-hover:text-sand transition-colors">
                    Gestión de Leads & Contactos
                  </h3>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">
                    Registro automático y asignación de prospectos recibidos desde los formularios web.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-sand">
                  <span>Ver Leads Recibidos</span>
                  <span>→</span>
                </div>
              </Link>

              {/* Tarjeta 6: Centro de Documentos */}
              <Link
                href="/admin/documentos"
                className="bg-[#181614] border border-white/10 hover:border-sand hover:bg-stone-900 rounded-2xl p-5 transition-all group shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="p-3 rounded-xl bg-sand/15 text-sand group-hover:scale-110 transition-transform">
                      <FileText className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      ACTIVO
                    </span>
                  </div>
                  <h3 className="font-heading text-base font-bold text-cream group-hover:text-sand transition-colors">
                    Centro de Documentos & Plantillas
                  </h3>
                </div>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-sand">
                  <span>Abrir Documentos</span>
                  <span>→</span>
                </div>
              </Link>

              {/* Tarjeta 7: Recursos Humanos & Personas */}
              <Link
                href="/admin/rrhh"
                className="bg-[#181614] border border-white/10 hover:border-sand hover:bg-stone-900 rounded-2xl p-5 transition-all group shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="p-3 rounded-xl bg-sand/15 text-sand group-hover:scale-110 transition-transform">
                      <Users className="w-6 h-6" />
                    </div>
                    {hasRrhhPermission(currentUser) ? (
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                        ACTIVO RRHH
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full">
                        RESTRINGIDO
                      </span>
                    )}
                  </div>
                  <h3 className="font-heading text-base font-bold text-cream group-hover:text-sand transition-colors">
                    Recursos Humanos & Personas
                  </h3>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">
                    Fichas de colaboradores, contratos, control de vacaciones, liquidaciones y EPP (Jean, Valeria, Nicole y Fernando).
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-sand">
                  <span>Gestionar RRHH</span>
                  <span>→</span>
                </div>
              </Link>

            </div>
          </div>

          {/* COLUMNA DERECHA: TABLERO DE AVISOS & FORO INTERNO (5 columnas) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-heading text-xl font-extrabold uppercase text-cream tracking-wide flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-sand" />
                  Tablero de Avisos & Foro
                </h2>
                <p className="text-xs text-neutral-400 font-light mt-1">
                  Comunicación interna del equipo ({posts.length} mensajes)
                </p>
              </div>

              <button
                onClick={() => setShowNewPostForm(!showNewPostForm)}
                className="bg-sand text-carbon hover:bg-[#a38b72] px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow transition-colors"
              >
                <Plus className="w-4 h-4" />
                Publicar
              </button>
            </div>

            {/* FORMULARIO DESPLEGABLE PARA NUEVA PUBLICACIÓN */}
            {showNewPostForm && (
              <form
                onSubmit={handleCreatePost}
                className="bg-[#181614] border border-sand/40 rounded-2xl p-5 space-y-4 shadow-2xl animate-fade-in"
              >
                <h3 className="font-heading text-sm font-bold uppercase text-sand tracking-wider flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Crear Nuevo Aviso o Novedad
                </h3>

                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                    Título del Aviso *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Ajuste en valores de porcelanato esta semana"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 text-xs focus:outline-none focus:border-sand"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                      Categoría
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as Post['category'])}
                      className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-2.5 text-xs focus:outline-none focus:border-sand font-mono cursor-pointer"
                    >
                      <option value="General">📌 General</option>
                      <option value="Precios & Cotizaciones">💰 Precios & Cotizaciones</option>
                      <option value="Obras e Inspecciones">🏗️ Obras e Inspecciones</option>
                      <option value="Urgente">🚨 Urgente</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 pt-5">
                    <label className="flex items-center gap-2 text-xs font-mono text-neutral-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newIsPinned}
                        onChange={(e) => setNewIsPinned(e.target.checked)}
                        className="rounded border-white/20 bg-stone-900 text-sand focus:ring-sand"
                      />
                      <Pin className="w-3.5 h-3.5 text-sand" />
                      Fijar al inicio
                    </label>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                    Mensaje / Detalle *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Escribe el aviso para el equipo..."
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3 text-xs focus:outline-none focus:border-sand"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowNewPostForm(false)}
                    className="px-4 py-2 text-xs font-mono text-neutral-400 hover:text-cream"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={submittingPost}
                    className="bg-sand text-carbon hover:bg-[#a38b72] px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
                  >
                    {submittingPost ? 'Publicando...' : 'Publicar Aviso'}
                  </button>
                </div>
              </form>
            )}

            {/* LISTA DE PUBLICACIONES DEL FORO */}
            <div className="space-y-4">
              {loadingPosts ? (
                <div className="text-center py-8 text-xs font-mono text-sand">
                  Cargando avisos...
                </div>
              ) : posts.length === 0 ? (
                <div className="bg-[#181614] border border-white/10 rounded-2xl p-6 text-center text-xs text-neutral-400 font-light">
                  No hay publicaciones aún. Sé el primero en dejar un aviso.
                </div>
              ) : (
                posts.map((post) => {
                  const isExpanded = expandedPosts[post.id];

                  return (
                    <div
                      key={post.id}
                      className={`bg-[#181614] border ${
                        post.isPinned ? 'border-sand/60 bg-sand/[0.02]' : 'border-white/10'
                      } rounded-2xl p-5 space-y-3 shadow-lg relative transition-all`}
                    >
                      {/* Header del Post */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            {post.isPinned && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-sand bg-sand/10 border border-sand/30 px-2 py-0.5 rounded-md">
                                <Pin className="w-3 h-3 fill-sand" /> FIJADO
                              </span>
                            )}
                            <span
                              className={`text-[10px] font-mono font-bold uppercase tracking-wider border px-2 py-0.5 rounded-md ${
                                categoryBadges[post.category] || categoryBadges['General']
                              }`}
                            >
                              {post.category}
                            </span>
                          </div>
                          <h3 className="font-heading text-base font-bold text-cream tracking-wide">
                            {post.title}
                          </h3>
                        </div>

                        <button
                          onClick={() => handleTogglePin(post.id)}
                          title={post.isPinned ? 'Desfijar de la cima' : 'Fijar al inicio'}
                          className="text-neutral-500 hover:text-sand p-1 transition-colors"
                        >
                          <Pin className={`w-4 h-4 ${post.isPinned ? 'text-sand fill-sand' : ''}`} />
                        </button>
                      </div>

                      {/* Autor y Fecha */}
                      <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400 border-b border-white/5 pb-2">
                        <span className="text-sand font-bold flex items-center gap-1">
                          👤 {post.author}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-neutral-500">
                          <Clock className="w-3 h-3" /> {formatDate(post.createdAt)}
                        </span>
                      </div>

                      {/* Mensaje principal */}
                      <p className="text-xs text-neutral-300 font-light leading-relaxed whitespace-pre-line">
                        {post.content}
                      </p>

                      {/* Botón de comentarios / Respuestas */}
                      <div className="pt-2 flex justify-between items-center text-xs font-mono text-neutral-400">
                        <button
                          onClick={() =>
                            setExpandedPosts({ ...expandedPosts, [post.id]: !isExpanded })
                          }
                          className="hover:text-sand inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{post.comments.length} comentarios</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      {/* SECCIÓN COMENTARIOS (Desplegable) */}
                      {isExpanded && (
                        <div className="pt-3 border-t border-white/5 space-y-3 animate-fade-in">
                          {/* Lista de comentarios */}
                          <div className="space-y-2">
                            {post.comments.map((comm) => (
                              <div
                                key={comm.id}
                                className="bg-stone-900/60 border border-white/5 rounded-xl p-3 text-xs space-y-1"
                              >
                                <div className="flex justify-between items-center text-[10px] font-mono">
                                  <span className="text-sand font-bold">👤 {comm.author}</span>
                                  <span className="text-neutral-500">{formatDate(comm.createdAt)}</span>
                                </div>
                                <p className="text-neutral-300 font-light">{comm.content}</p>
                              </div>
                            ))}
                          </div>

                          {/* Campo agregar comentario */}
                          <div className="flex gap-2 pt-1">
                            <input
                              type="text"
                              placeholder="Escribe tu respuesta..."
                              value={commentInputs[post.id] || ''}
                              onChange={(e) =>
                                setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
                              }
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleAddComment(post.id);
                              }}
                              className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-2.5 text-xs focus:outline-none focus:border-sand"
                            />
                            <button
                              onClick={() => handleAddComment(post.id)}
                              className="bg-sand text-carbon hover:bg-[#a38b72] px-3.5 rounded-xl font-bold transition-colors cursor-pointer shrink-0"
                            >
                              <Send className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default DashboardSection;
