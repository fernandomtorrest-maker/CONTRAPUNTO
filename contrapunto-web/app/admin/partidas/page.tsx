import React from 'react';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyAdminToken } from '@/lib/auth';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import PartidasAdminSection from '@/components/admin/PartidasAdminSection';

export const metadata: Metadata = {
  title: 'Administración de Partidas & Precios Unitarios | Constructora Contrapunto',
  description: 'Panel privado de gestión de partidas y valores para el Cotizador Supremo.',
};

export default async function AdminPartidasPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (!token || !(await verifyAdminToken(token))) {
    redirect('/admin/login');
  }

  return (
    <div className="relative min-h-screen bg-[#0f0e0c] text-cream overflow-hidden selection:bg-sand selection:text-carbon font-body">
      <Navbar />
      <main className="pt-24 min-h-screen relative z-10">
        <PartidasAdminSection />
      </main>
      <Footer />
    </div>
  );
}
