'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ArrowLeft, Bot, User, RefreshCw, Compass } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

const SUGGESTED_PROMPTS = [
  {
    title: 'Exigencias de Fuego OGUC',
    text: '¿Cuál es la resistencia al fuego exigida por la OGUC para muros divisorios en viviendas pareadas?'
  },
  {
    title: 'Las 3 Reglas del Acorde',
    text: 'Explícame técnicamente las 3 reglas del acorde aplicadas en el diseño de Contrapunto.'
  },
  {
    title: 'Valor m² Tiny House',
    text: '¿Cuál es el valor estimado en UF por m² para una Tiny House terminada llave en mano?'
  },
  {
    title: 'Acondicionamiento Térmico',
    text: '¿Qué exige el artículo 4.1.10 de la OGUC para techumbres en Santiago (Zona 3)?'
  }
];

export default function ChatAgentPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      content: 'Consola del Agente Técnico y Supervisor de Normativa Chilena. Dispuesto para resolver consultas arquitectónicas, de ingeniería sísmica, térmica y parámetros constructivos de Contrapunto. Ingrese su consulta.',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-scroll to the bottom of the chat list on new messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Map messaging history to the format expected by the API
      const history = messages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({
          role: m.role,
          content: m.content
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: textToSend,
          history
        })
      });

      const data = await res.json();

      if (data.success && data.response) {
        const agentMsg: Message = {
          id: `agent-${Date.now()}`,
          role: 'model',
          content: data.response,
          timestamp: new Date()
        };
        setMessages((prev) => [...prev, agentMsg]);
      } else {
        throw new Error(data.error || 'Respuesta fallida de la API');
      }
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'No se pudo obtener respuesta del Agente de Inteligencia Artificial.';
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        role: 'model',
        content: `Error del Servidor: ${errorMessage}`,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        content: 'Consola del Agente Técnico y Supervisor de Normativa Chilena. Dispuesto para resolver consultas arquitectónicas, de ingeniería sísmica, térmica y parámetros constructivos de Contrapunto. Ingrese su consulta.',
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="relative min-h-screen bg-[#0f0e0c] text-cream flex flex-col font-body selection:bg-sand selection:text-carbon overflow-x-hidden">
      {/* Navbar */}
      <Navbar />

      <main className="flex-1 pt-32 pb-16 flex items-center justify-center px-4 md:px-8">
        <div className="w-full max-w-5xl bg-[#161512] border border-white/5 rounded-2xl flex flex-col h-[750px] shadow-2xl relative overflow-hidden">
          
          {/* Cabecera del Chat */}
          <div className="p-6 border-b border-white/5 flex items-center justify-between bg-[#1b1916]">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-sand/10 border border-sand/20 flex items-center justify-center text-sand">
                <Bot className="h-5 w-5 animate-pulse" />
              </div>
              <div>
                <h1 className="font-heading text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  Agente Técnico Contrapunto 
                  <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" />
                </h1>
                <p className="text-[10px] text-cream/50 uppercase tracking-[0.15em] font-semibold">
                  Normativa Chilena OGUC / LGUC / Costos
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleClear}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors text-cream/70 hover:text-white"
                title="Reiniciar chat"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
              <Link href="/">
                <button className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-wider text-cream/80 hover:text-white transition-colors">
                  <ArrowLeft className="h-3 w-3" /> Volver
                </button>
              </Link>
            </div>
          </div>

          {/* Historial de Mensajes */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/5">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex gap-4 max-w-4xl ${
                    msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`h-9 w-9 rounded-full shrink-0 flex items-center justify-center border ${
                      msg.role === 'user'
                        ? 'bg-sand/25 border-sand/40 text-sand'
                        : 'bg-white/5 border-white/10 text-cream/80'
                    }`}
                  >
                    {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>

                  <div className="space-y-1">
                    <div
                      className={`px-4 py-3 rounded-2xl text-xs md:text-sm leading-relaxed border ${
                        msg.role === 'user'
                          ? 'bg-sand/10 border-sand/20 text-cream whitespace-pre-wrap'
                          : 'bg-[#1b1916]/80 border-white/5 text-cream/90 whitespace-pre-wrap'
                      }`}
                    >
                      {msg.content}
                    </div>
                    <p className={`text-[9px] text-cream/30 ${msg.role === 'user' ? 'text-right' : ''}`}>
                      {mounted ? msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-4"
              >
                <div className="h-9 w-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-cream/80">
                  <Bot className="h-4 w-4 animate-spin" />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-[#1b1916]/80 border border-white/5 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 bg-sand rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="h-1.5 w-1.5 bg-sand rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="h-1.5 w-1.5 bg-sand rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Sugerencias de Consultas */}
          {messages.length === 1 && !isLoading && (
            <div className="px-6 py-3 border-t border-white/5 bg-[#1b1916]/40">
              <p className="text-[10px] text-sand uppercase tracking-wider font-bold mb-2 flex items-center gap-1.5">
                <Compass className="h-3 w-3" /> Consultas de Prueba Sugeridas:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {SUGGESTED_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt.text)}
                    className="p-3 bg-[#131210] hover:bg-sand/5 border border-white/5 hover:border-sand/30 rounded-xl text-left transition-all duration-200"
                  >
                    <span className="text-[11px] font-bold text-white block mb-1">
                      {prompt.title}
                    </span>
                    <span className="text-[10px] text-cream/50 line-clamp-2">
                      {prompt.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Formulario de Entrada */}
          <div className="p-6 border-t border-white/5 bg-[#1b1916]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="flex gap-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu consulta sobre la OGUC o Contrapunto aquí..."
                disabled={isLoading}
                className="flex-1 px-4 py-3 bg-[#0f0e0c] border border-white/10 hover:border-white/20 focus:border-sand rounded-xl text-xs md:text-sm text-cream placeholder-cream/40 focus:outline-none transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="px-5 bg-sand hover:bg-[#a38b72] disabled:bg-sand/30 text-carbon disabled:text-carbon/50 rounded-xl flex items-center justify-center transition-colors font-bold text-xs uppercase tracking-wider gap-2"
              >
                Enviar <Send className="h-4 w-4" />
              </button>
            </form>
          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
