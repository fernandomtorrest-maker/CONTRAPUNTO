import React from 'react';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyAdminToken, hasRrhhPermission } from '@/lib/auth';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import RrhhAdminSection from '@/components/admin/RrhhAdminSection';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Recursos Humanos & Gestión de Personas | Constructora Contrapunto',
  description: 'Panel privado de gestión de personal, contratos y liquidaciones.',
};

export default async function AdminRrhhPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (!token) {
    redirect('/admin/login');
  }

  const payload = await verifyAdminToken(token);

  if (!payload || !payload.user) {
    redirect('/admin/login');
  }

  // Validación de acceso exclusivo RRHH: Jean, Valeria, Nicole, Fernando
  const isAuthorized = hasRrhhPermission(payload.user);

  if (!isAuthorized) {
    return (
      <div className="relative min-h-screen bg-[#0f0e0c] text-cream overflow-hidden font-body">
        <Navbar />
        <main className="pt-32 pb-20 min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#181614] border border-red-500/30 rounded-3xl p-8 text-center space-y-5 shadow-2xl">
            <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl w-fit mx-auto">
              <ShieldAlert className="w-10 h-10" />
            </div>
            <h1 className="font-heading text-2xl font-bold uppercase text-cream">Acceso Restringido</h1>
            <p className="text-xs text-neutral-300 font-light leading-relaxed">
              El módulo de Recursos Humanos es exclusivo para el equipo de Administración de RRHH (<strong className="text-sand">Jean, Valeria, Nicole y Fernando</strong>). Tu usuario (<strong className="text-sand">{payload.user}</strong>) no posee permisos para esta sección.
            </p>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 bg-sand text-carbon font-bold uppercase text-xs px-6 py-3 rounded-xl hover:bg-[#a38b72] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Volver al Dashboard Principal
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0f0e0c] text-cream overflow-hidden selection:bg-sand selection:text-carbon font-body">
      <Navbar />
      <main className="pt-24 min-h-screen relative z-10">
        <RrhhAdminSection />
      </main>
      <Footer />
    </div>
  );
}
