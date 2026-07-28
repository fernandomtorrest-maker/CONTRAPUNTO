import React from 'react';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyAdminToken } from '@/lib/auth';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import DashboardSection from '@/components/admin/DashboardSection';

export const metadata: Metadata = {
  title: 'Panel de Control & Dashboard | Constructora Contrapunto',
  description: 'Pantalla de bienvenida y hub corporativo administrativo para el equipo Contrapunto.',
};

export default async function AdminDashboardPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (!token) {
    redirect('/admin/login');
  }

  const payload = await verifyAdminToken(token);

  if (!payload || !payload.user) {
    redirect('/admin/login');
  }

  return (
    <div className="relative min-h-screen bg-[#0f0e0c] text-cream overflow-hidden selection:bg-sand selection:text-carbon font-body">
      <Navbar />
      <main className="pt-24 min-h-screen relative z-10">
        <DashboardSection currentUser={payload.user} />
      </main>
      <Footer />
    </div>
  );
}
