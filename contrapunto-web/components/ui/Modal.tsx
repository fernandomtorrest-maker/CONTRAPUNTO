'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  position?: 'center' | 'right'; // 'center' para modal central grande, 'right' para modal tipo sidebar
}

export const Modal = ({ isOpen, onClose, children, className, position = 'center' }: ModalProps) => {
  const modalRef = React.useRef<HTMLDivElement>(null);
  
  // Bloquear scroll del body al abrir el modal
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Mover el foco al modal para accesibilidad
      setTimeout(() => {
        modalRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Manejar tecla ESC para cerrar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Variantes de animación según la posición del modal
  const modalVariants = {
    center: {
      hidden: { opacity: 0, scale: 0.95, y: 15 },
      visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring' as const, duration: 0.5, bounce: 0.1 } },
      exit: { opacity: 0, scale: 0.95, y: 15, transition: { duration: 0.3 } },
    },
    right: {
      hidden: { x: '100%' },
      visible: { x: 0, transition: { type: 'spring' as const, damping: 25, stiffness: 200 } },
      exit: { x: '100%', transition: { duration: 0.3 } },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          
          {/* Backdrop/Fondo difuminado */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-carbon/80 backdrop-blur-md cursor-pointer"
          />

          {/* Contenedor del Modal */}
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants[position]}
            className={cn(
              'relative z-10 bg-carbon border border-border shadow-card overflow-y-auto outline-none focus:outline-none focus-visible:ring-1 focus-visible:ring-sand/30',
              position === 'center'
                ? 'w-[95%] max-w-5xl max-h-[90vh] md:w-[90%]'
                : 'absolute right-0 top-0 h-full w-full max-w-xl md:border-l border-t-0 border-b-0 border-r-0',
              className
            )}
          >
            {/* Botón de Cerrar */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-20 text-cream/70 hover:text-sand transition-colors focus-visible:ring-1 focus-visible:ring-sand p-1 outline-none"
              aria-label="Cerrar modal"
            >
              <X size={24} strokeWidth={1.5} />
            </button>

            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
