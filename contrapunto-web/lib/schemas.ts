import { z } from 'zod';

// ─── Comunas de la Región Metropolitana ───────────────────────────────────────
export const COMUNAS_RM = [
  'Alhué', 'Buin', 'Calera de Tango', 'Cerrillos', 'Cerro Navia',
  'Colina', 'Conchalí', 'Curacaví', 'El Bosque', 'El Monte',
  'Estación Central', 'Huechuraba', 'Independencia', 'Isla de Maipo',
  'La Cisterna', 'La Florida', 'La Granja', 'La Pintana', 'La Reina',
  'Lampa', 'Las Condes', 'Lo Barnechea', 'Lo Espejo', 'Lo Prado',
  'Macul', 'Maipú', 'María Pinto', 'Melipilla', 'Ñuñoa',
  'Padre Hurtado', 'Paine', 'Pedro Aguirre Cerda', 'Peñaflor',
  'Peñalolén', 'Pirque', 'Providencia', 'Pudahuel', 'Puente Alto',
  'Quilicura', 'Quinta Normal', 'Recoleta', 'Renca', 'San Bernardo',
  'San Joaquín', 'San José de Maipo', 'San Miguel', 'San Pedro',
  'San Ramón', 'Santiago', 'Talagante', 'Til Til', 'Vitacura',
] as const;

export type ComunaRM = typeof COMUNAS_RM[number];

// ─── Tipos de Proyecto ─────────────────────────────────────────────────────────
export const PROJECT_TYPES = [
  'Construcción nueva',
  'Remodelación',
  'Quincho',
  'Tiny House',
  'Mobiliario a medida',
  'Otro',
] as const;

// ─── Rangos de Presupuesto ─────────────────────────────────────────────────────
export const BUDGET_RANGES = [
  'Menos de 500 UF',
  '500 - 1.000 UF',
  '1.000 - 3.000 UF',
  '3.000 - 5.000 UF',
  'Más de 5.000 UF',
  'Por definir',
] as const;

// ─── Schema de Cotización ──────────────────────────────────────────────────────
export const QuoteSchema = z.object({
  fullName: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre es demasiado largo')
    .regex(/^[a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s'-]+$/i, 'Solo se permiten letras y espacios'),

  email: z
    .string()
    .email('Ingresa un correo electrónico válido')
    .max(150, 'El correo es demasiado largo'),

  phone: z
    .string()
    .min(8, 'El teléfono debe tener al menos 8 dígitos')
    .max(20, 'El teléfono es demasiado largo')
    .regex(/^[+]?[0-9\s\-()]+$/, 'Formato de teléfono inválido'),

  comuna: z.string()
    .refine((val) => (COMUNAS_RM as readonly string[]).includes(val), {
      message: 'Selecciona una comuna válida de la RM',
    }),

  projectType: z.string()
    .refine((val) => (PROJECT_TYPES as readonly string[]).includes(val), {
      message: 'Selecciona un tipo de proyecto válido',
    }),

  budget: z.string()
    .refine((val) => (BUDGET_RANGES as readonly string[]).includes(val), {
      message: 'Selecciona un rango de presupuesto',
    }),

  description: z
    .string()
    .min(10, 'Cuéntanos al menos 10 caracteres sobre tu proyecto')
    .max(1000, 'La descripción no puede superar 1000 caracteres'),
});

// ─── Schema para el servidor (archivos vienen como strings de metadata) ────────
export const QuoteServerSchema = QuoteSchema.extend({
  fileMetadata: z
    .array(
      z.object({
        name: z.string().max(255),
        size: z.number().max(10 * 1024 * 1024, 'Cada archivo no puede superar 10MB'),
        type: z.string(),
      })
    )
    .max(5, 'Máximo 5 archivos permitidos')
    .optional(),
});

// ─── Tipos inferidos ───────────────────────────────────────────────────────────
export type QuoteFormValues = z.infer<typeof QuoteSchema>;
export type QuoteServerPayload = z.infer<typeof QuoteServerSchema>;
