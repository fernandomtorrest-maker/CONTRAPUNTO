'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Phone, Clock, ShieldCheck, FileText, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Dropzone } from '@/components/ui/Dropzone';
import { QuoteSchema, QuoteFormValues, COMUNAS_RM, PROJECT_TYPES, BUDGET_RANGES } from '@/lib/schemas';
import { cn } from '@/lib/utils';
import type { QuoteApiResponse } from '@/types';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuoteModal = ({ isOpen, onClose }: QuoteModalProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(QuoteSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      comuna: undefined,
      projectType: undefined,
      budget: undefined,
      description: '',
    },
  });

  // Envío del formulario a la API Route
  const onSubmit = async (data: QuoteFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      // 1. Preparar payload con metadatos de archivos para la validación estricta en el servidor
      const fileMetadata = files.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
      }));

      const payload = {
        ...data,
        fileMetadata,
      };

      // 2. Hacer request a la API Route
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Ocurrió un error al procesar tu solicitud.');
      }

      const { uploadUrls, quoteId } = result as QuoteApiResponse;

      // 3. Si hay URLs pre-firmadas devueltas, subir archivos directamente al almacenamiento en la nube
      if (uploadUrls && uploadUrls.length > 0 && files.length > 0) {
        // En un caso real, haríamos PUT requests paralelos directos a S3/R2/GCS:
        /*
        await Promise.all(
          uploadUrls.map(async (uploadUrlInfo, idx) => {
            const fileToUpload = files[idx];
            await fetch(uploadUrlInfo.uploadUrl, {
              method: 'PUT',
              headers: {
                'Content-Type': fileToUpload.type,
              },
              body: fileToUpload,
            });
          })
        );
        */
        console.log(`[Storage Simulado] Subiendo ${files.length} archivos para la cotización ${quoteId}...`);
      }

      // Éxito
      setSubmitSuccess(result.message || 'Tu cotización fue enviada con éxito.');
      
      // Limpiar formulario y archivos
      reset();
      setFiles([]);
      
    } catch (err: unknown) {
      console.error('[Quote Form Submit Error]', err);
      setSubmitError(err instanceof Error ? err.message : 'Error inesperado al enviar.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Restablecer estado de éxito cuando se cierra
  const handleClose = () => {
    setSubmitSuccess(null);
    setSubmitError(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} position="center" className="max-w-5xl md:h-[90vh] md:max-h-[900px] overflow-hidden flex flex-col md:flex-row bg-carbon rounded-none border-border">
      
      {/* COLUMNA IZQUIERDA: Formulario */}
      <div className="w-full md:w-3/5 p-6 md:p-12 overflow-y-auto max-h-full scroll-thin">
        {submitSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="h-full flex flex-col justify-center items-center text-center py-12"
          >
            <div className="w-16 h-16 rounded-full bg-sand/10 flex items-center justify-center mb-6 text-sand border border-sand/30">
              <CheckCircle size={36} strokeWidth={1.5} />
            </div>
            <h3 className="font-heading text-3xl font-extrabold text-cream tracking-wide uppercase mb-3">
              ¡SOLICITUD ENVIADA!
            </h3>
            <p className="text-sm text-cream/70 max-w-sm leading-relaxed mb-8">
              {submitSuccess}
            </p>
            <Button onClick={handleClose} variant="primary" size="md">
              Cerrar Ventana
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-8">
            {/* Cabecera */}
            <div>
              <span className="text-label text-sand font-bold">COTIZA TU PROYECTO</span>
              <h2 className="font-heading text-4xl font-extrabold text-cream tracking-wide uppercase mt-1">
                HABLEMOS DE TU PROYECTO.
              </h2>
              <p className="text-xs text-cream/50 uppercase tracking-widest leading-relaxed mt-2">
                Cuéntanos tu idea y te ayudaremos a hacerla realidad. Responderemos a la brevedad.
              </p>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Nombre completo */}
              <div>
                <label htmlFor="fullName" className="label-form">NOMBRE COMPLETO</label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Ej: Juan Pérez"
                  className={cn('input-base', errors.fullName && 'error')}
                  {...register('fullName')}
                />
                {errors.fullName && <p className="error-msg">{errors.fullName.message}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Correo */}
                <div>
                  <label htmlFor="email" className="label-form">CORREO ELECTRÓNICO</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Ej: juanperez@mail.com"
                    className={cn('input-base', errors.email && 'error')}
                    {...register('email')}
                  />
                  {errors.email && <p className="error-msg">{errors.email.message}</p>}
                </div>

                {/* Teléfono */}
                <div>
                  <label htmlFor="phone" className="label-form">TELÉFONO / WHATSAPP</label>
                  <input
                    id="phone"
                    type="text"
                    placeholder="Ej: +56 9 1234 5678"
                    className={cn('input-base', errors.phone && 'error')}
                    {...register('phone')}
                  />
                  {errors.phone && <p className="error-msg">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Comuna */}
                <div>
                  <label htmlFor="comuna" className="label-form">COMUNA</label>
                  <select
                    id="comuna"
                    className={cn('select-base', errors.comuna && 'error')}
                    {...register('comuna')}
                  >
                    <option value="">Selecciona</option>
                    {COMUNAS_RM.map((comuna) => (
                      <option key={comuna} value={comuna}>
                        {comuna}
                      </option>
                    ))}
                  </select>
                  {errors.comuna && <p className="error-msg">{errors.comuna.message}</p>}
                </div>

                {/* Tipo de proyecto */}
                <div>
                  <label htmlFor="projectType" className="label-form">TIPO DE PROYECTO</label>
                  <select
                    id="projectType"
                    className={cn('select-base', errors.projectType && 'error')}
                    {...register('projectType')}
                  >
                    <option value="">Selecciona</option>
                    {PROJECT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.projectType && <p className="error-msg">{errors.projectType.message}</p>}
                </div>

                {/* Presupuesto */}
                <div>
                  <label htmlFor="budget" className="label-form">PRESUPUESTO ESTIMADO</label>
                  <select
                    id="budget"
                    className={cn('select-base', errors.budget && 'error')}
                    {...register('budget')}
                  >
                    <option value="">Selecciona</option>
                    {BUDGET_RANGES.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                  {errors.budget && <p className="error-msg">{errors.budget.message}</p>}
                </div>
              </div>

              {/* Descripción */}
              <div>
                <label htmlFor="description" className="label-form">CUÉNTANOS MÁS DE TU PROYECTO</label>
                <textarea
                  id="description"
                  rows={4}
                  placeholder="Cuéntanos sobre tu idea, qué necesitas, medidas aproximadas, estilo, etc."
                  className={cn('input-base resize-none', errors.description && 'error')}
                  {...register('description')}
                />
                {errors.description && <p className="error-msg">{errors.description.message}</p>}
              </div>

              {/* Zona de Dropzone */}
              <Dropzone files={files} onChange={setFiles} maxFiles={5} maxSizeMB={10} />

              {/* Error del Submit */}
              {submitError && (
                <div className="bg-red-950/20 border border-red-900/50 p-4">
                  <p className="text-[11px] text-red-400 font-bold uppercase tracking-wider">
                    {submitError}
                  </p>
                </div>
              )}

              {/* Botón enviar */}
              <div className="pt-3">
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  variant="primary"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <span>Enviar Solicitud</span>
                  <ArrowRight size={14} />
                </Button>
              </div>

              {/* Garantía de privacidad */}
              <p className="text-[9px] text-cream/40 uppercase tracking-widest text-center mt-3">
                🔒 Tu información está protegida y no será compartida con terceros.
              </p>
            </form>
          </div>
        )}
      </div>

      {/* COLUMNA DERECHA: Imagen + Propuesta de valor */}
      <div className="hidden md:block w-2/5 relative h-full bg-stone-dark">
        {/* Imagen de fondo */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-carbon/60 backdrop-blur-[2px] z-0" />
        
        {/* Capa de overlay negra que alberga el texto y los iconos */}
        <div className="absolute inset-y-0 right-0 w-[90%] bg-carbon/95 border-l border-border px-8 py-12 z-10 flex flex-col justify-between">
          <div className="space-y-8">
            
            {/* Propuesta 1 */}
            <div className="flex gap-4">
              <div className="w-10 h-10 border border-border flex items-center justify-center text-sand shrink-0 bg-stone/50">
                <Clock size={18} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="font-heading text-sm font-bold text-cream uppercase tracking-widest">
                  Respuesta Rápida
                </h4>
                <p className="text-[11px] text-cream/50 uppercase tracking-wide leading-relaxed mt-1">
                  Respondemos a tu solicitud en menos de 24 horas.
                </p>
              </div>
            </div>

            {/* Propuesta 2 */}
            <div className="flex gap-4">
              <div className="w-10 h-10 border border-border flex items-center justify-center text-sand shrink-0 bg-stone/50">
                <ShieldCheck size={18} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="font-heading text-sm font-bold text-cream uppercase tracking-widest">
                  Asesoría Personalizada
                </h4>
                <p className="text-[11px] text-cream/50 uppercase tracking-wide leading-relaxed mt-1">
                  Te acompañamos en cada etapa de tu proyecto.
                </p>
              </div>
            </div>

            {/* Propuesta 3 */}
            <div className="flex gap-4">
              <div className="w-10 h-10 border border-border flex items-center justify-center text-sand shrink-0 bg-stone/50">
                <FileText size={18} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="font-heading text-sm font-bold text-cream uppercase tracking-widest">
                  Presupuestos Claros
                </h4>
                <p className="text-[11px] text-cream/50 uppercase tracking-wide leading-relaxed mt-1">
                  Sin costos ocultos, con total transparencia.
                </p>
              </div>
            </div>

            {/* Propuesta 4: WhatsApp */}
            <div className="flex gap-4">
              <div className="w-10 h-10 border border-border flex items-center justify-center text-sand shrink-0 bg-stone/50">
                <Phone size={18} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="font-heading text-sm font-bold text-cream uppercase tracking-widest">
                  ¿Prefieres WhatsApp?
                </h4>
                <p className="text-[11px] text-cream/50 uppercase tracking-wide leading-relaxed mt-1">
                  Escríbenos directo y conversemos.
                </p>
              </div>
            </div>

          </div>

          {/* Botón WhatsApp */}
          <div className="pt-6 border-t border-border">
            <a
              href="https://wa.me/56912345678"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full"
            >
              <Button variant="outline" className="w-full text-center">
                Escribir Ahora
              </Button>
            </a>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default QuoteModal;
