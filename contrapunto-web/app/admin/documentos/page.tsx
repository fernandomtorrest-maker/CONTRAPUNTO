import React from 'react';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyAdminToken } from '@/lib/auth';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import DocumentosAdminSection from '@/components/admin/DocumentosAdminSection';

export const metadata: Metadata = {
  title: 'Centro de Documentos & Plantillas | Constructora Contrapunto',
  description: 'Repositorio oficial corporativo de formatos de informes ITO, manuales y dossiers.',
};

export default async function AdminDocumentosPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (!token || !(await verifyAdminToken(token))) {
    redirect('/admin/login');
  }

  return (
    <div className="relative min-h-screen bg-[#0f0e0c] text-cream overflow-hidden selection:bg-sand selection:text-carbon font-body">
      <Navbar />
      <main className="pt-24 min-h-screen relative z-10">
        <DocumentosAdminSection />
      </main>
      <Footer />
    </div>
  );
}
