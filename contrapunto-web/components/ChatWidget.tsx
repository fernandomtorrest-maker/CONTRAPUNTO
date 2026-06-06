'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, RefreshCw, Compass, X } from 'lucide-react';
import { useChat } from './ChatContext';

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

export default function ChatWidget() {
  const { isChatOpen, closeChat } = useChat();
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isChatOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isLoading, isChatOpen]);

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
    <AnimatePresence>
      {isChatOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[400px] h-[580px] bg-[#161512]/95 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col shadow-2xl overflow-hidden font-body text-cream"
        >
          {/* Cabecera del Chat */}
          <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#1b1916]/80">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-full bg-sand/10 border border-sand/20 flex items-center justify-center text-sand">
                <Bot className="h-4.5 w-4.5" />
              </div>
              <div>
                <h1 className="font-heading text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                  Agente Técnico Contrapunto 
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" />
                </h1>
                <p className="text-[9px] text-cream/40 uppercase tracking-[0.15em] font-semibold">
                  Ciber Maestro
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClear}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors text-cream/70 hover:text-white"
                title="Reiniciar chat"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={closeChat}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors text-cream/70 hover:text-white"
                title="Cerrar chat"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>

          {/* Historial de Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${
                  msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`h-7 w-7 rounded-full shrink-0 flex items-center justify-center border text-[10px] ${
                    msg.role === 'user'
                      ? 'bg-sand/20 border-sand/30 text-sand'
                      : 'bg-white/5 border-white/10 text-cream/80'
                  }`}
                >
                  {msg.role === 'user' ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                </div>

                <div className="space-y-1">
                  <div
                    className={`px-3 py-2.5 rounded-xl text-xs leading-relaxed border ${
                      msg.role === 'user'
                        ? 'bg-sand/10 border-sand/20 text-cream whitespace-pre-wrap'
                        : 'bg-[#1b1916]/80 border-white/5 text-cream/90 whitespace-pre-wrap'
                    }`}
                  >
                    {msg.content}
                  </div>
                  <p className={`text-[8px] text-cream/30 ${msg.role === 'user' ? 'text-right' : ''}`}>
                    {mounted ? msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3">
                <div className="h-7 w-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-cream/80">
                  <Bot className="h-3.5 w-3.5 animate-spin" />
                </div>
                <div className="px-3 py-2.5 rounded-xl bg-[#1b1916]/80 border border-white/5 flex items-center gap-1">
                  <span className="h-1 w-1 bg-sand rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="h-1 w-1 bg-sand rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="h-1 w-1 bg-sand rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Sugerencias de Consultas */}
          {messages.length === 1 && !isLoading && (
            <div className="px-4 py-2.5 border-t border-white/5 bg-[#1b1916]/40">
              <p className="text-[9px] text-sand uppercase tracking-wider font-bold mb-1.5 flex items-center gap-1">
                <Compass className="h-3 w-3" /> Consultas Sugeridas:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {SUGGESTED_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt.text)}
                    className="p-2 bg-[#131210] hover:bg-sand/5 border border-white/5 hover:border-sand/30 rounded-lg text-left transition-all duration-200"
                  >
                    <span className="text-[10px] font-bold text-white block mb-0.5 truncate">
                      {prompt.title}
                    </span>
                    <span className="text-[8px] text-cream/50 line-clamp-1">
                      {prompt.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Formulario de Entrada */}
          <div className="p-4 border-t border-white/5 bg-[#1b1916]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu consulta..."
                disabled={isLoading}
                className="flex-1 px-3 py-2 bg-[#0f0e0c] border border-white/10 hover:border-white/20 focus:border-sand rounded-xl text-xs text-cream placeholder-cream/40 focus:outline-none transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="px-4 bg-sand hover:bg-[#a38b72] disabled:bg-sand/30 text-carbon disabled:text-carbon/50 rounded-xl flex items-center justify-center transition-colors font-bold text-xs uppercase tracking-wider gap-1"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
