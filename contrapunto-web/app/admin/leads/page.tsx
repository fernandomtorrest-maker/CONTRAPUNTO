import React from 'react';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyAdminToken } from '@/lib/auth';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import LeadsAdminSection from '@/components/admin/LeadsAdminSection';

export const metadata: Metadata = {
  title: 'Gestión de Leads & Contactos | Constructora Contrapunto',
  description: 'Panel privado de recepción y seguimiento comercial de prospectos web.',
};

export default async function AdminLeadsPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (!token || !(await verifyAdminToken(token))) {
    redirect('/admin/login');
  }

  return (
    <div className="relative min-h-screen bg-[#0f0e0c] text-cream overflow-hidden selection:bg-sand selection:text-carbon font-body">
      <Navbar />
      <main className="pt-24 min-h-screen relative z-10">
        <LeadsAdminSection />
      </main>
      <Footer />
    </div>
  );
}
