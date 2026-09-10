import React from 'react';
import CotizadorItoSection from '@/components/sections/CotizadorItoSection';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Cotizador ITO - Admin | Constructora Contrapunto',
  description: 'Módulo administrativo para el Cotizador de Inspección Técnica ITO.',
};

export default function AdminItoPage() {
  return (
    <div className="min-h-screen bg-[#0f0e0c] text-cream">
      {/* Top Header Navigation */}
      <div className="bg-[#181614] border-b border-sand/20 py-4 px-6 flex justify-between items-center relative z-20">
        <Link
          href="/admin"
          className="text-xs font-mono text-sand hover:text-cream flex items-center gap-2 transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Dashboard Admin</span>
        </Link>
        <span className="text-xs font-mono text-neutral-400">
          Módulo Cotizador de Inspección Técnica ITO
        </span>
      </div>

      <main>
        <CotizadorItoSection />
      </main>
    </div>
  );
}
