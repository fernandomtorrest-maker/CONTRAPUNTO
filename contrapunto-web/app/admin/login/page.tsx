'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, User, KeyRound, AlertCircle, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const AUTHORIZED_USERS = ['Fernando', 'Nicole', 'Diego', 'Niels', 'Julio'];

export default function AdminLoginPage() {
  const [selectedUser, setSelectedUser] = useState('Fernando');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName: selectedUser, password }),
      });

      const data = await res.json();

      if (data.success) {
        router.push('/admin/partidas');
      } else {
        setErrorMsg(data.error || 'Credenciales no válidas.');
      }
    } catch {
      setErrorMsg('Error al conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0e0c] text-cream flex items-center justify-center p-4 relative overflow-hidden font-body selection:bg-sand selection:text-carbon">
      {/* Glow background effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-sand/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-[#181614] border border-sand/30 rounded-3xl p-8 shadow-2xl space-y-6 relative z-10">
        
        {/* LOGO CORPORATIVO & HEADER */}
        <div className="text-center space-y-3">
          <div className="relative w-32 h-16 mx-auto">
            <Image
              src="/logo.png"
              alt="Constructora Contrapunto"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand/15 border border-sand/30 text-sand text-[10px] font-mono tracking-widest uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            PANEL ADMINISTRATIVO CORPORATIVO
          </div>
          <h1 className="font-heading text-2xl font-extrabold uppercase text-cream tracking-wide">
            Acceso de Equipo
          </h1>
          <p className="text-xs text-neutral-400 font-light">
            Ingreso exclusivo para gestión de partidas y cotizaciones en línea.
          </p>
        </div>

        {/* ALERTA DE ERROR */}
        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 rounded-xl p-3 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* FORMULARIO DE ACCESO */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* SELECTOR DE USUARIO AUTORIZADO */}
          <div>
            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-sand block mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              Selecciona tu Usuario
            </label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3.5 text-xs focus:outline-none focus:border-sand font-mono cursor-pointer"
            >
              {AUTHORIZED_USERS.map((user) => (
                <option key={user} value={user}>
                  👤 {user}
                </option>
              ))}
            </select>
          </div>

          {/* CLAVE MAESTRA GENERAL */}
          <div>
            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-sand block mb-1.5 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5" />
              Contraseña Corporativa
            </label>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-stone-900 border border-white/10 text-cream rounded-xl p-3.5 text-xs focus:outline-none focus:border-sand font-mono tracking-widest"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sand text-carbon hover:bg-[#a38b72] font-bold tracking-widest uppercase text-xs py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            {loading ? (
              <span>Verificando...</span>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                Ingresar al Panel Admin
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-white/5 text-[10px] font-mono text-neutral-500">
          Constructora Contrapunto © 2026 • Acceso Seguro
        </div>
      </div>
    </div>
  );
}
