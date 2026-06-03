'use client';

import React, { useState } from 'react';
import { 
  ArrowRight,
  Heart,
  ChevronDown
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';

// Custom SVG component to represent Instagram logo
const InstagramIcon = ({ className = 'h-4 w-4' }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

// All 12 projects matching the layout and naming in the reference image
const initialProjects = [
  {
    id: 1,
    title: 'Proyecto Los Robles',
    category: 'FLIPPING INMOBILIARIO',
    likes: 84,
    image: '/images/cotizador/casa-nueva.jpg',
    status: 'terminado'
  },
  {
    id: 2,
    title: 'Proyecto Nativo',
    category: 'CROWDFUNDING INMOBILIARIO',
    likes: 67,
    image: '/images/cotizador/casa-2-pisos.jpg',
    status: 'terminado'
  },
  {
    id: 3,
    title: 'Proyecto Parque Sur',
    category: 'FLIPPING INMOBILIARIO',
    likes: 92,
    image: '/images/cotizador/casa-3-pisos.jpg',
    status: 'terminado'
  },
  {
    id: 4,
    title: 'Proyecto Interiorismo M.',
    category: 'COMERCIAL',
    likes: 51,
    image: '/images/cotizador/foto-quincho.png',
    status: 'terminado'
  },
  {
    id: 5,
    title: 'Proyecto Andino',
    category: 'CROWDFUNDING INMOBILIARIO',
    likes: 73,
    image: '/images/cotizador/tiny-vivienda.png',
    status: 'terminado'
  },
  {
    id: 6,
    title: 'Proyecto Vista Norte',
    category: 'FLIPPING INMOBILIARIO',
    likes: 65,
    image: '/images/cotizador/terraza-ladrillo-madera.png',
    status: 'terminado'
  },
  {
    id: 7,
    title: 'Proyecto Taller 51',
    category: 'COMERCIAL',
    likes: 48,
    image: '/images/cotizador/terraza-techada.jpg',
    status: 'terminado'
  },
  {
    id: 8,
    title: 'Proyecto La Dehesa',
    category: 'CROWDFUNDING INMOBILIARIO',
    likes: 80,
    image: '/images/cotizador/tiny-35-50.png',
    status: 'en desarrollo'
  },
  {
    id: 9,
    title: 'Proyecto Patagonia',
    category: 'FLIPPING INMOBILIARIO',
    likes: 70,
    image: '/images/cotizador/terraza-acero-y-madera.png',
    status: 'terminado'
  },
  {
    id: 10,
    title: 'Proyecto Costanera',
    category: 'CROWDFUNDING INMOBILIARIO',
    likes: 58,
    image: '/images/cotizador/tiny-office.jpg',
    status: 'en desarrollo'
  },
  {
    id: 11,
    title: 'Proyecto El Arrayán',
    category: 'FLIPPING INMOBILIARIO',
    likes: 63,
    image: '/images/cotizador/terraza-abierta.png',
    status: 'en desarrollo'
  },
  {
    id: 12,
    title: 'Proyecto Estudio 27',
    category: 'COMERCIAL',
    likes: 45,
    image: '/images/cotizador/casa-1-piso.png',
    status: 'terminado'
  }
];

export default function ProyectosGalleryPage() {
  const [activeFilter, setActiveFilter] = useState('TODOS');
  const [projects, setProjects] = useState(initialProjects);
  const [likedProjects, setLikedProjects] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState('recientes');
  const [visibleCount, setVisibleCount] = useState(12);

  // Client-side filtering logic
  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'TODOS') return true;
    if (activeFilter === 'FLIPPING INMOBILIARIO') return project.category === 'FLIPPING INMOBILIARIO';
    if (activeFilter === 'CROWDFUNDING INMOBILIARIO') return project.category === 'CROWDFUNDING INMOBILIARIO';
    if (activeFilter === 'COMERCIALES') return project.category === 'COMERCIAL';
    if (activeFilter === 'EN DESARROLLO') return project.status === 'en desarrollo';
    return true;
  });

  // Sort logic
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === 'populares') {
      return b.likes - a.likes;
    }
    // Default: 'recientes' (keeps original database order or ID descending)
    return b.id - a.id;
  });

  const toggleLike = (id: number) => {
    if (likedProjects.includes(id)) {
      setLikedProjects(likedProjects.filter(pId => pId !== id));
      setProjects(projects.map(p => p.id === id ? { ...p, likes: p.likes - 1 } : p));
    } else {
      setLikedProjects([...likedProjects, id]);
      setProjects(projects.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0f0e0c] text-cream overflow-hidden selection:bg-sand selection:text-carbon font-body">
      {/* Navbar */}
      <Navbar />

      {/* HERO SECTION / HEADER SPLIT */}
      <section className="relative pt-32 pb-20 border-b border-white/5 bg-[#0f0e0c]">
        <div className="container-base max-w-7xl px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold text-sand uppercase tracking-[0.2em] block">
                DISEÑO, CONSTRUCCIÓN Y RESULTADOS REALES.
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase text-white tracking-tight leading-none">
                GALERÍA DE<br />PROYECTOS.
              </h1>
              <p className="text-sm md:text-base text-cream/70 leading-relaxed max-w-md">
                Explora algunos de nuestros proyectos terminados y en desarrollo. 
                Cada imagen refleja nuestro compromiso con la calidad, el diseño y la rentabilidad.
              </p>
              <div className="pt-2">
                <a 
                  href="https://www.instagram.com/contrapuntoconstructora/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3.5 border border-sand/40 bg-sand/10 hover:bg-sand hover:text-carbon text-sand text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded-sm"
                >
                  <InstagramIcon className="h-4 w-4" /> Síguenos en Instagram <ArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* Right Image Column */}
            <div className="lg:col-span-7 relative h-[320px] sm:h-[450px] lg:h-[500px] w-full overflow-hidden rounded-lg shadow-2xl border border-white/10 group">
              <img 
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop" 
                alt="Constructora Contrapunto Interior" 
                className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e0c]/80 via-transparent to-transparent"></div>
            </div>

          </div>
        </div>
      </section>

      {/* FILTER TABS & SORT BAR (Light background contrast) */}
      <section className="bg-[#f4f3ef] text-carbon py-6 border-b border-carbon/10">
        <div className="container-base max-w-7xl px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Horizontal Tabs */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-6 text-xs sm:text-sm font-bold tracking-wider uppercase">
            {['TODOS', 'FLIPPING INMOBILIARIO', 'CROWDFUNDING INMOBILIARIO', 'COMERCIALES', 'EN DESARROLLO'].map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  setActiveFilter(filter);
                  setVisibleCount(12);
                }}
                className={`py-2 px-1 relative transition-all duration-300 hover:text-sand ${
                  activeFilter === filter 
                    ? 'text-carbon border-b-2 border-sand' 
                    : 'text-carbon/60'
                }`}
              >
                {filter === 'COMERCIALES' ? 'COMERCIALES' : filter}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <span className="text-xs text-carbon/60 font-semibold uppercase tracking-wider">Ordenar por:</span>
            <div className="relative inline-block text-left">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-carbon/20 rounded-md px-4 py-1.5 pr-8 text-xs font-bold uppercase tracking-wider text-carbon outline-none cursor-pointer focus:border-sand"
              >
                <option value="recientes">Más Recientes</option>
                <option value="populares">Más Populares</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-carbon/60 pointer-events-none" size={14} />
            </div>
          </div>

        </div>
      </section>

      {/* GALLERY GRID */}
      <section className="py-20 bg-[#fbfbfa]">
        <div className="container-base max-w-7xl px-6 md:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sortedProjects.slice(0, visibleCount).map((project) => (
              <div 
                key={project.id}
                className="group flex flex-col bg-white border border-carbon/5 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 rounded-sm"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-carbon/10">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  {project.status === 'en desarrollo' && (
                    <span className="absolute top-3 left-3 bg-sand text-carbon text-[9px] font-extrabold uppercase px-2 py-0.5 tracking-widest rounded-sm">
                      En Desarrollo
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col justify-between flex-grow text-carbon">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wide group-hover:text-sand transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-carbon/5 mt-4">
                    <span className="text-[10px] font-extrabold text-carbon/50 tracking-wider">
                      {project.category}
                    </span>
                    
                    <button 
                      onClick={() => toggleLike(project.id)}
                      className={`flex items-center gap-1 text-[11px] font-bold transition-colors ${
                        likedProjects.includes(project.id) 
                          ? 'text-red-500' 
                          : 'text-carbon/60 hover:text-red-500'
                      }`}
                    >
                      <Heart size={14} fill={likedProjects.includes(project.id) ? 'currentColor' : 'none'} />
                      <span>{project.likes}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {sortedProjects.length > visibleCount && (
            <div className="text-center pt-16">
              <button 
                onClick={() => setVisibleCount(prev => prev + 4)}
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-carbon/25 text-carbon hover:bg-carbon hover:text-white text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded-sm"
              >
                Cargar más proyectos <ArrowRight size={14} />
              </button>
            </div>
          )}

        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-[#12110e] border-t border-white/5 py-20">
        <div className="container-base max-w-6xl px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left column */}
            <div className="lg:col-span-6 space-y-2">
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold uppercase text-white tracking-tight">
                ¿TIENES UN TERRENO
              </h2>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold uppercase text-sand tracking-tight">
                O UNA IDEA?
              </h2>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-cream/50 pt-2">
                CONSTRUYAMOS ALGO RENTABLE JUNTOS.
              </p>
            </div>

            {/* Right column */}
            <div className="lg:col-span-6 space-y-6">
              <p className="text-xs sm:text-sm text-cream/70 leading-relaxed uppercase tracking-wider">
                Evaluamos tu proyecto y te ayudamos a hacerlo realidad con un modelo claro, eficiente y transparente.
              </p>
              <div>
                <Link 
                  href="/cotizar"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-sand hover:bg-sand-light text-carbon font-extrabold text-xs tracking-widest uppercase transition-colors rounded-sm"
                >
                  Cotiza tu proyecto <ArrowRight size={14} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}


