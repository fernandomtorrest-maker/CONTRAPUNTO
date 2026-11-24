// Catálogo completo de 120 servicios y valores reales (sin oferta) extraídos de Sodimac Chile
export interface ServicePriceItem {
  id: string;
  num: number;
  title: string;
  category: string;
  categoryLabel: string;
  price: number;
  unit: string;
  badge?: string;
  description: string;
  includes: string[];
  iconType: 'brush' | 'droplet' | 'wind' | 'flame' | 'wrench' | 'lock' | 'sofa' | 'hammer' | 'file';
}

export const SODIMAC_CATEGORIES = [
  { id: 'all', label: 'Todos los Servicios (120)' },
  { id: 'pisos-muros-pintura', label: 'Pisos, Muros & Pintura (7)' },
  { id: 'armado-muebles', label: 'Armado de Muebles & Exteriores (19)' },
  { id: 'linea-blanca-climatizacion', label: 'Línea Blanca & Climatización (11)' },
  { id: 'calefaccion-agua', label: 'Calefones, Termos & Calderas (15)' },
  { id: 'bano-sanitarios', label: 'Baños, Sanitarios & Grifería (9)' },
  { id: 'seguridad-puertas-cortinaje', label: 'Seguridad, Puertas & Cortinaje (16)' },
  { id: 'remodelaciones-proyectos', label: 'Remodelaciones & Proyectos (12)' },
  { id: 'retiro-reciclaje', label: 'Retiro & Reciclaje ECO (4)' },
  { id: 'visitas-presupuesto', label: 'Visitas & Presupuestos (27)' },
];

export const SODIMAC_SERVICES_CATALOG: ServicePriceItem[] = [
  {
    "num": 1,
    "id": "srv-1",
    "title": "Servicio Instalación de Cerámica por M2",
    "category": "pisos-muros-pintura",
    "categoryLabel": "Pisos, Muros & Pintura",
    "price": 16990,
    "unit": "m²",
    "badge": "Terminaciones",
    "description": "Servicio especializado de servicio instalación de cerámica por m2 con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Preparación técnica de superficie",
      "Aplicación con herramientas profesionales",
      "Nivelación y remate de canterías",
      "Limpieza y retiro de excedentes"
    ],
    "iconType": "brush"
  },
  {
    "num": 2,
    "id": "srv-2",
    "title": "Servicio Instalación de Porcelanato por M2",
    "category": "pisos-muros-pintura",
    "categoryLabel": "Pisos, Muros & Pintura",
    "price": 19990,
    "unit": "m²",
    "badge": "Terminaciones",
    "description": "Servicio especializado de servicio instalación de porcelanato por m2 con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Preparación técnica de superficie",
      "Aplicación con herramientas profesionales",
      "Nivelación y remate de canterías",
      "Limpieza y retiro de excedentes"
    ],
    "iconType": "brush"
  },
  {
    "num": 3,
    "id": "srv-3",
    "title": "Servicio de Instalación de Piso Vinílico por M2",
    "category": "pisos-muros-pintura",
    "categoryLabel": "Pisos, Muros & Pintura",
    "price": 10990,
    "unit": "m²",
    "badge": "Terminaciones",
    "description": "Servicio especializado de servicio de instalación de piso vinílico por m2 con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Preparación técnica de superficie",
      "Aplicación con herramientas profesionales",
      "Nivelación y remate de canterías",
      "Limpieza y retiro de excedentes"
    ],
    "iconType": "brush"
  },
  {
    "num": 4,
    "id": "srv-4",
    "title": "Servicio de Instalación de piso laminado por M2",
    "category": "pisos-muros-pintura",
    "categoryLabel": "Pisos, Muros & Pintura",
    "price": 10990,
    "unit": "m²",
    "badge": "Terminaciones",
    "description": "Servicio especializado de servicio de instalación de piso laminado por m2 con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Preparación técnica de superficie",
      "Aplicación con herramientas profesionales",
      "Nivelación y remate de canterías",
      "Limpieza y retiro de excedentes"
    ],
    "iconType": "brush"
  },
  {
    "num": 5,
    "id": "srv-5",
    "title": "INST ALFOMBRA FULL",
    "category": "pisos-muros-pintura",
    "categoryLabel": "Pisos, Muros & Pintura",
    "price": 4990,
    "unit": "instalación",
    "badge": "Terminaciones",
    "description": "Servicio especializado de inst alfombra full con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Preparación técnica de superficie",
      "Aplicación con herramientas profesionales",
      "Nivelación y remate de canterías",
      "Limpieza y retiro de excedentes"
    ],
    "iconType": "brush"
  },
  {
    "num": 6,
    "id": "srv-6",
    "title": "Servicio de Aplicación de Pintura Interior por M2",
    "category": "pisos-muros-pintura",
    "categoryLabel": "Pisos, Muros & Pintura",
    "price": 4990,
    "unit": "m²",
    "badge": "Terminaciones",
    "description": "Servicio especializado de servicio de aplicación de pintura interior por m2 con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Preparación técnica de superficie",
      "Aplicación con herramientas profesionales",
      "Nivelación y remate de canterías",
      "Limpieza y retiro de excedentes"
    ],
    "iconType": "brush"
  },
  {
    "num": 7,
    "id": "srv-7",
    "title": "Servicio de Aplicación de Pintura Exterior por M2",
    "category": "pisos-muros-pintura",
    "categoryLabel": "Pisos, Muros & Pintura",
    "price": 7990,
    "unit": "m²",
    "badge": "Terminaciones",
    "description": "Servicio especializado de servicio de aplicación de pintura exterior por m2 con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Preparación técnica de superficie",
      "Aplicación con herramientas profesionales",
      "Nivelación y remate de canterías",
      "Limpieza y retiro de excedentes"
    ],
    "iconType": "brush"
  },
  {
    "num": 8,
    "id": "srv-8",
    "title": "Servicio Armado de 1 Mueble",
    "category": "armado-muebles",
    "categoryLabel": "Armado de Muebles & Exteriores",
    "price": 29990,
    "unit": "mueble",
    "badge": "Armado Experto",
    "description": "Servicio especializado de servicio armado de 1 mueble con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Armado según plano técnico del fabricante",
      "Calibración de bisagras y correderas",
      "Anclaje de seguridad cuando aplica",
      "Retiro de material de embalaje"
    ],
    "iconType": "sofa"
  },
  {
    "num": 9,
    "id": "srv-9",
    "title": "Servicio Armado de 2 a 3 Muebles",
    "category": "armado-muebles",
    "categoryLabel": "Armado de Muebles & Exteriores",
    "price": 58990,
    "unit": "mueble",
    "badge": "Armado Experto",
    "description": "Servicio especializado de servicio armado de 2 a 3 muebles con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Armado según plano técnico del fabricante",
      "Calibración de bisagras y correderas",
      "Anclaje de seguridad cuando aplica",
      "Retiro de material de embalaje"
    ],
    "iconType": "sofa"
  },
  {
    "num": 10,
    "id": "srv-10",
    "title": "Servicio Armado de 4 a 6 Muebles",
    "category": "armado-muebles",
    "categoryLabel": "Armado de Muebles & Exteriores",
    "price": 87990,
    "unit": "mueble",
    "badge": "Armado Experto",
    "description": "Servicio especializado de servicio armado de 4 a 6 muebles con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Armado según plano técnico del fabricante",
      "Calibración de bisagras y correderas",
      "Anclaje de seguridad cuando aplica",
      "Retiro de material de embalaje"
    ],
    "iconType": "sofa"
  },
  {
    "num": 11,
    "id": "srv-11",
    "title": "Servicio Armado closet desde 6 puertas",
    "category": "armado-muebles",
    "categoryLabel": "Armado de Muebles & Exteriores",
    "price": 46990,
    "unit": "mueble",
    "badge": "Armado Experto",
    "description": "Servicio especializado de servicio armado closet desde 6 puertas con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Armado según plano técnico del fabricante",
      "Calibración de bisagras y correderas",
      "Anclaje de seguridad cuando aplica",
      "Retiro de material de embalaje"
    ],
    "iconType": "sofa"
  },
  {
    "num": 12,
    "id": "srv-12",
    "title": "Servicio Armado de 1 Silla",
    "category": "armado-muebles",
    "categoryLabel": "Armado de Muebles & Exteriores",
    "price": 19990,
    "unit": "mueble",
    "badge": "Armado Experto",
    "description": "Servicio especializado de servicio armado de 1 silla con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Armado según plano técnico del fabricante",
      "Calibración de bisagras y correderas",
      "Anclaje de seguridad cuando aplica",
      "Retiro de material de embalaje"
    ],
    "iconType": "sofa"
  },
  {
    "num": 13,
    "id": "srv-13",
    "title": "Servicio Armado y Anclaje mueble de TV (no incluye soporte)",
    "category": "armado-muebles",
    "categoryLabel": "Armado de Muebles & Exteriores",
    "price": 54990,
    "unit": "mueble",
    "badge": "Armado Experto",
    "description": "Servicio especializado de servicio armado y anclaje mueble de tv (no incluye soporte) con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Armado según plano técnico del fabricante",
      "Calibración de bisagras y correderas",
      "Anclaje de seguridad cuando aplica",
      "Retiro de material de embalaje"
    ],
    "iconType": "sofa"
  },
  {
    "num": 14,
    "id": "srv-14",
    "title": "Servicio Armado y Anclaje mueble de TV + Instalación de Soporte y TV",
    "category": "armado-muebles",
    "categoryLabel": "Armado de Muebles & Exteriores",
    "price": 64990,
    "unit": "mueble",
    "badge": "Armado Experto",
    "description": "Servicio especializado de servicio armado y anclaje mueble de tv + instalación de soporte y tv con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Armado según plano técnico del fabricante",
      "Calibración de bisagras y correderas",
      "Anclaje de seguridad cuando aplica",
      "Retiro de material de embalaje"
    ],
    "iconType": "sofa"
  },
  {
    "num": 15,
    "id": "srv-15",
    "title": "Servicio Armado y Anclaje 1 Mueble de Cocina Aéreo de 3 a 4 puertas",
    "category": "armado-muebles",
    "categoryLabel": "Armado de Muebles & Exteriores",
    "price": 41990,
    "unit": "mueble",
    "badge": "Armado Experto",
    "description": "Servicio especializado de servicio armado y anclaje 1 mueble de cocina aéreo de 3 a 4 puertas con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Armado según plano técnico del fabricante",
      "Calibración de bisagras y correderas",
      "Anclaje de seguridad cuando aplica",
      "Retiro de material de embalaje"
    ],
    "iconType": "sofa"
  },
  {
    "num": 16,
    "id": "srv-16",
    "title": "Servicio Armado e Instalación Kit Mueble de Lavaplatos",
    "category": "armado-muebles",
    "categoryLabel": "Armado de Muebles & Exteriores",
    "price": 71990,
    "unit": "mueble",
    "badge": "Armado Experto",
    "description": "Servicio especializado de servicio armado e instalación kit mueble de lavaplatos con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Armado según plano técnico del fabricante",
      "Calibración de bisagras y correderas",
      "Anclaje de seguridad cuando aplica",
      "Retiro de material de embalaje"
    ],
    "iconType": "sofa"
  },
  {
    "num": 17,
    "id": "srv-17",
    "title": "Servicio Armado Bodega (precio normal hasta $400.000)",
    "category": "armado-muebles",
    "categoryLabel": "Armado de Muebles & Exteriores",
    "price": 49990,
    "unit": "mueble",
    "badge": "Armado Experto",
    "description": "Servicio especializado de servicio armado bodega (precio normal hasta $400.000) con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Armado según plano técnico del fabricante",
      "Calibración de bisagras y correderas",
      "Anclaje de seguridad cuando aplica",
      "Retiro de material de embalaje"
    ],
    "iconType": "sofa"
  },
  {
    "num": 18,
    "id": "srv-18",
    "title": "Servicio Armado de Terraza",
    "category": "armado-muebles",
    "categoryLabel": "Armado de Muebles & Exteriores",
    "price": 29990,
    "unit": "instalación",
    "badge": "Armado Experto",
    "description": "Servicio especializado de servicio armado de terraza con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Armado según plano técnico del fabricante",
      "Calibración de bisagras y correderas",
      "Anclaje de seguridad cuando aplica",
      "Retiro de material de embalaje"
    ],
    "iconType": "sofa"
  },
  {
    "num": 19,
    "id": "srv-19",
    "title": "Servicio de Armado de Pérgola (precio producto hasta $149.990)",
    "category": "armado-muebles",
    "categoryLabel": "Armado de Muebles & Exteriores",
    "price": 27990,
    "unit": "instalación",
    "badge": "Armado Experto",
    "description": "Servicio especializado de servicio de armado de pérgola (precio producto hasta $149.990) con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Armado según plano técnico del fabricante",
      "Calibración de bisagras y correderas",
      "Anclaje de seguridad cuando aplica",
      "Retiro de material de embalaje"
    ],
    "iconType": "sofa"
  },
  {
    "num": 20,
    "id": "srv-20",
    "title": "Servicio de Armado de Pérgola (precio producto entre $150.000 y $199.990)",
    "category": "armado-muebles",
    "categoryLabel": "Armado de Muebles & Exteriores",
    "price": 41990,
    "unit": "instalación",
    "badge": "Armado Experto",
    "description": "Servicio especializado de servicio de armado de pérgola (precio producto entre $150.000 y $199.990) con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Armado según plano técnico del fabricante",
      "Calibración de bisagras y correderas",
      "Anclaje de seguridad cuando aplica",
      "Retiro de material de embalaje"
    ],
    "iconType": "sofa"
  },
  {
    "num": 21,
    "id": "srv-21",
    "title": "Servicio de Armado de Pérgola (precio producto entre $200.000 y $499.990)",
    "category": "armado-muebles",
    "categoryLabel": "Armado de Muebles & Exteriores",
    "price": 54990,
    "unit": "instalación",
    "badge": "Armado Experto",
    "description": "Servicio especializado de servicio de armado de pérgola (precio producto entre $200.000 y $499.990) con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Armado según plano técnico del fabricante",
      "Calibración de bisagras y correderas",
      "Anclaje de seguridad cuando aplica",
      "Retiro de material de embalaje"
    ],
    "iconType": "sofa"
  },
  {
    "num": 22,
    "id": "srv-22",
    "title": "Servicio de Armado de quitasol",
    "category": "armado-muebles",
    "categoryLabel": "Armado de Muebles & Exteriores",
    "price": 29990,
    "unit": "mueble",
    "badge": "Armado Experto",
    "description": "Servicio especializado de servicio de armado de quitasol con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Armado según plano técnico del fabricante",
      "Calibración de bisagras y correderas",
      "Anclaje de seguridad cuando aplica",
      "Retiro de material de embalaje"
    ],
    "iconType": "sofa"
  },
  {
    "num": 23,
    "id": "srv-23",
    "title": "Servicio de Armado de parrilla",
    "category": "armado-muebles",
    "categoryLabel": "Armado de Muebles & Exteriores",
    "price": 26990,
    "unit": "mueble",
    "badge": "Armado Experto",
    "description": "Servicio especializado de servicio de armado de parrilla con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Armado según plano técnico del fabricante",
      "Calibración de bisagras y correderas",
      "Anclaje de seguridad cuando aplica",
      "Retiro de material de embalaje"
    ],
    "iconType": "sofa"
  },
  {
    "num": 24,
    "id": "srv-24",
    "title": "Servicio Armado de piscina estructural menor a 3.500 L",
    "category": "armado-muebles",
    "categoryLabel": "Armado de Muebles & Exteriores",
    "price": 29990,
    "unit": "instalación",
    "badge": "Armado Experto",
    "description": "Servicio especializado de servicio armado de piscina estructural menor a 3.500 l con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Armado según plano técnico del fabricante",
      "Calibración de bisagras y correderas",
      "Anclaje de seguridad cuando aplica",
      "Retiro de material de embalaje"
    ],
    "iconType": "sofa"
  },
  {
    "num": 25,
    "id": "srv-25",
    "title": "Servicio Armado de piscina estructural entre 3.500 y 15.000 L",
    "category": "armado-muebles",
    "categoryLabel": "Armado de Muebles & Exteriores",
    "price": 49990,
    "unit": "instalación",
    "badge": "Armado Experto",
    "description": "Servicio especializado de servicio armado de piscina estructural entre 3.500 y 15.000 l con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Armado según plano técnico del fabricante",
      "Calibración de bisagras y correderas",
      "Anclaje de seguridad cuando aplica",
      "Retiro de material de embalaje"
    ],
    "iconType": "sofa"
  },
  {
    "num": 26,
    "id": "srv-26",
    "title": "Armado de equipo de fitness",
    "category": "armado-muebles",
    "categoryLabel": "Armado de Muebles & Exteriores",
    "price": 31990,
    "unit": "instalación",
    "badge": "Armado Experto",
    "description": "Servicio especializado de armado de equipo de fitness con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Armado según plano técnico del fabricante",
      "Calibración de bisagras y correderas",
      "Anclaje de seguridad cuando aplica",
      "Retiro de material de embalaje"
    ],
    "iconType": "sofa"
  },
  {
    "num": 27,
    "id": "srv-27",
    "title": "Servicio Instalación Aire Acondicionado Split",
    "category": "linea-blanca-climatizacion",
    "categoryLabel": "Línea Blanca & Climatización",
    "price": 149990,
    "unit": "instalación",
    "badge": "Instalación Técnica",
    "description": "Servicio especializado de servicio instalación aire acondicionado split con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Fijación y anclaje seguro",
      "Conexión a redes correspondientes",
      "Prueba de funcionamiento y estanqueidad",
      "Inducción de uso al cliente"
    ],
    "iconType": "wind"
  },
  {
    "num": 28,
    "id": "srv-28",
    "title": "Mantención de Aire Acondicionado Split",
    "category": "linea-blanca-climatizacion",
    "categoryLabel": "Línea Blanca & Climatización",
    "price": 69990,
    "unit": "instalación",
    "badge": "Instalación Técnica",
    "description": "Servicio especializado de mantención de aire acondicionado split con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Fijación y anclaje seguro",
      "Conexión a redes correspondientes",
      "Prueba de funcionamiento y estanqueidad",
      "Inducción de uso al cliente"
    ],
    "iconType": "wind"
  },
  {
    "num": 29,
    "id": "srv-29",
    "title": "Servicio Instalación Campana convencional",
    "category": "linea-blanca-climatizacion",
    "categoryLabel": "Línea Blanca & Climatización",
    "price": 38990,
    "unit": "instalación",
    "badge": "Instalación Técnica",
    "description": "Servicio especializado de servicio instalación campana convencional con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Fijación y anclaje seguro",
      "Conexión a redes correspondientes",
      "Prueba de funcionamiento y estanqueidad",
      "Inducción de uso al cliente"
    ],
    "iconType": "wind"
  },
  {
    "num": 30,
    "id": "srv-30",
    "title": "Servicio Instalación de 1 Lavadora o Secadora",
    "category": "linea-blanca-climatizacion",
    "categoryLabel": "Línea Blanca & Climatización",
    "price": 33990,
    "unit": "instalación",
    "badge": "Instalación Técnica",
    "description": "Servicio especializado de servicio instalación de 1 lavadora o secadora con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Fijación y anclaje seguro",
      "Conexión a redes correspondientes",
      "Prueba de funcionamiento y estanqueidad",
      "Inducción de uso al cliente"
    ],
    "iconType": "wind"
  },
  {
    "num": 31,
    "id": "srv-31",
    "title": "Servicio de Instalación de Cocina convencional",
    "category": "linea-blanca-climatizacion",
    "categoryLabel": "Línea Blanca & Climatización",
    "price": 33990,
    "unit": "instalación",
    "badge": "Instalación Técnica",
    "description": "Servicio especializado de servicio de instalación de cocina convencional con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Fijación y anclaje seguro",
      "Conexión a redes correspondientes",
      "Prueba de funcionamiento y estanqueidad",
      "Inducción de uso al cliente"
    ],
    "iconType": "wind"
  },
  {
    "num": 32,
    "id": "srv-32",
    "title": "Servicio de Instalación de cocina encimera",
    "category": "linea-blanca-climatizacion",
    "categoryLabel": "Línea Blanca & Climatización",
    "price": 38990,
    "unit": "instalación",
    "badge": "Instalación Técnica",
    "description": "Servicio especializado de servicio de instalación de cocina encimera con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Fijación y anclaje seguro",
      "Conexión a redes correspondientes",
      "Prueba de funcionamiento y estanqueidad",
      "Inducción de uso al cliente"
    ],
    "iconType": "wind"
  },
  {
    "num": 33,
    "id": "srv-33",
    "title": "Servicio de Instalación de horno / microondas empotrado",
    "category": "linea-blanca-climatizacion",
    "categoryLabel": "Línea Blanca & Climatización",
    "price": 38990,
    "unit": "instalación",
    "badge": "Instalación Técnica",
    "description": "Servicio especializado de servicio de instalación de horno / microondas empotrado con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Fijación y anclaje seguro",
      "Conexión a redes correspondientes",
      "Prueba de funcionamiento y estanqueidad",
      "Inducción de uso al cliente"
    ],
    "iconType": "wind"
  },
  {
    "num": 34,
    "id": "srv-34",
    "title": "Servicio Instalación de Lavavajillas",
    "category": "linea-blanca-climatizacion",
    "categoryLabel": "Línea Blanca & Climatización",
    "price": 33990,
    "unit": "instalación",
    "badge": "Instalación Técnica",
    "description": "Servicio especializado de servicio instalación de lavavajillas con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Fijación y anclaje seguro",
      "Conexión a redes correspondientes",
      "Prueba de funcionamiento y estanqueidad",
      "Inducción de uso al cliente"
    ],
    "iconType": "wind"
  },
  {
    "num": 35,
    "id": "srv-35",
    "title": "Servicio de Instalación Encimera, Campana y Horno (Combo Trío)",
    "category": "linea-blanca-climatizacion",
    "categoryLabel": "Línea Blanca & Climatización",
    "price": 89990,
    "unit": "combo",
    "badge": "Instalación Técnica",
    "description": "Servicio especializado de servicio de instalación encimera, campana y horno (combo trío) con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Fijación y anclaje seguro",
      "Conexión a redes correspondientes",
      "Prueba de funcionamiento y estanqueidad",
      "Inducción de uso al cliente"
    ],
    "iconType": "wind"
  },
  {
    "num": 36,
    "id": "srv-36",
    "title": "Servicio de Instalación de Ventilador de techo",
    "category": "linea-blanca-climatizacion",
    "categoryLabel": "Línea Blanca & Climatización",
    "price": 49990,
    "unit": "instalación",
    "badge": "Instalación Técnica",
    "description": "Servicio especializado de servicio de instalación de ventilador de techo con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Fijación y anclaje seguro",
      "Conexión a redes correspondientes",
      "Prueba de funcionamiento y estanqueidad",
      "Inducción de uso al cliente"
    ],
    "iconType": "wind"
  },
  {
    "num": 37,
    "id": "srv-37",
    "title": "Servicio Instalación de 1 Lámpara",
    "category": "linea-blanca-climatizacion",
    "categoryLabel": "Línea Blanca & Climatización",
    "price": 28990,
    "unit": "instalación",
    "badge": "Instalación Técnica",
    "description": "Servicio especializado de servicio instalación de 1 lámpara con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Fijación y anclaje seguro",
      "Conexión a redes correspondientes",
      "Prueba de funcionamiento y estanqueidad",
      "Inducción de uso al cliente"
    ],
    "iconType": "wind"
  },
  {
    "num": 38,
    "id": "srv-38",
    "title": "Servicio de Instalación de Calefon Tiro Natural",
    "category": "calefaccion-agua",
    "categoryLabel": "Calefones, Termos & Calderas",
    "price": 79990,
    "unit": "instalación",
    "badge": "Norma SEC",
    "description": "Servicio especializado de servicio de instalación de calefon tiro natural con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Instalador técnico normado",
      "Conexión hidráulica y de combustible/energía",
      "Prueba de tiro y presión",
      "Certificación de funcionamiento seguro"
    ],
    "iconType": "flame"
  },
  {
    "num": 39,
    "id": "srv-39",
    "title": "Servicio de Instalación de Calefon Tiro Forzado",
    "category": "calefaccion-agua",
    "categoryLabel": "Calefones, Termos & Calderas",
    "price": 89990,
    "unit": "instalación",
    "badge": "Norma SEC",
    "description": "Servicio especializado de servicio de instalación de calefon tiro forzado con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Instalador técnico normado",
      "Conexión hidráulica y de combustible/energía",
      "Prueba de tiro y presión",
      "Certificación de funcionamiento seguro"
    ],
    "iconType": "flame"
  },
  {
    "num": 40,
    "id": "srv-40",
    "title": "Servicio de Instalación de Termo Eléctrico",
    "category": "calefaccion-agua",
    "categoryLabel": "Calefones, Termos & Calderas",
    "price": 99990,
    "unit": "instalación",
    "badge": "Norma SEC",
    "description": "Servicio especializado de servicio de instalación de termo eléctrico con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Instalador técnico normado",
      "Conexión hidráulica y de combustible/energía",
      "Prueba de tiro y presión",
      "Certificación de funcionamiento seguro"
    ],
    "iconType": "flame"
  },
  {
    "num": 41,
    "id": "srv-41",
    "title": "Servicio de Instalación de Calefactor a Pellet Amesti en Casa 1 Piso",
    "category": "calefaccion-agua",
    "categoryLabel": "Calefones, Termos & Calderas",
    "price": 139990,
    "unit": "instalación",
    "badge": "Norma SEC",
    "description": "Servicio especializado de servicio de instalación de calefactor a pellet amesti en casa 1 piso con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Instalador técnico normado",
      "Conexión hidráulica y de combustible/energía",
      "Prueba de tiro y presión",
      "Certificación de funcionamiento seguro"
    ],
    "iconType": "flame"
  },
  {
    "num": 42,
    "id": "srv-42",
    "title": "Servicio de Instalación de Calefactor a Pellet Bosca en Casa 1 Piso",
    "category": "calefaccion-agua",
    "categoryLabel": "Calefones, Termos & Calderas",
    "price": 139990,
    "unit": "instalación",
    "badge": "Norma SEC",
    "description": "Servicio especializado de servicio de instalación de calefactor a pellet bosca en casa 1 piso con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Instalador técnico normado",
      "Conexión hidráulica y de combustible/energía",
      "Prueba de tiro y presión",
      "Certificación de funcionamiento seguro"
    ],
    "iconType": "flame"
  },
  {
    "num": 43,
    "id": "srv-43",
    "title": "Servicio de Instalación de Calefactor a Pellet Bosca en Casa 2 Pisos",
    "category": "calefaccion-agua",
    "categoryLabel": "Calefones, Termos & Calderas",
    "price": 179990,
    "unit": "instalación",
    "badge": "Norma SEC",
    "description": "Servicio especializado de servicio de instalación de calefactor a pellet bosca en casa 2 pisos con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Instalador técnico normado",
      "Conexión hidráulica y de combustible/energía",
      "Prueba de tiro y presión",
      "Certificación de funcionamiento seguro"
    ],
    "iconType": "flame"
  },
  {
    "num": 44,
    "id": "srv-44",
    "title": "Servicio de Instalación de Calefactor a Leña Bosca en Casa 1 Piso",
    "category": "calefaccion-agua",
    "categoryLabel": "Calefones, Termos & Calderas",
    "price": 117990,
    "unit": "instalación",
    "badge": "Norma SEC",
    "description": "Servicio especializado de servicio de instalación de calefactor a leña bosca en casa 1 piso con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Instalador técnico normado",
      "Conexión hidráulica y de combustible/energía",
      "Prueba de tiro y presión",
      "Certificación de funcionamiento seguro"
    ],
    "iconType": "flame"
  },
  {
    "num": 45,
    "id": "srv-45",
    "title": "Servicio de Instalación de Calefactor a Leña Bosca en Casa 2 Pisos",
    "category": "calefaccion-agua",
    "categoryLabel": "Calefones, Termos & Calderas",
    "price": 165990,
    "unit": "instalación",
    "badge": "Norma SEC",
    "description": "Servicio especializado de servicio de instalación de calefactor a leña bosca en casa 2 pisos con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Instalador técnico normado",
      "Conexión hidráulica y de combustible/energía",
      "Prueba de tiro y presión",
      "Certificación de funcionamiento seguro"
    ],
    "iconType": "flame"
  },
  {
    "num": 46,
    "id": "srv-46",
    "title": "Servicio de Instalación de Calefactor a Leña Amesti en Casa 2 Pisos",
    "category": "calefaccion-agua",
    "categoryLabel": "Calefones, Termos & Calderas",
    "price": 165990,
    "unit": "instalación",
    "badge": "Norma SEC",
    "description": "Servicio especializado de servicio de instalación de calefactor a leña amesti en casa 2 pisos con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Instalador técnico normado",
      "Conexión hidráulica y de combustible/energía",
      "Prueba de tiro y presión",
      "Certificación de funcionamiento seguro"
    ],
    "iconType": "flame"
  },
  {
    "num": 47,
    "id": "srv-47",
    "title": "Servicio de Instalación de Calefactor a Leña Otras Marcas en Casa 1 Piso",
    "category": "calefaccion-agua",
    "categoryLabel": "Calefones, Termos & Calderas",
    "price": 117990,
    "unit": "instalación",
    "badge": "Norma SEC",
    "description": "Servicio especializado de servicio de instalación de calefactor a leña otras marcas en casa 1 piso con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Instalador técnico normado",
      "Conexión hidráulica y de combustible/energía",
      "Prueba de tiro y presión",
      "Certificación de funcionamiento seguro"
    ],
    "iconType": "flame"
  },
  {
    "num": 48,
    "id": "srv-48",
    "title": "Servicio de Mantención de calefactor a leña OTRAS MARCAS en casa 1 piso",
    "category": "calefaccion-agua",
    "categoryLabel": "Calefones, Termos & Calderas",
    "price": 45990,
    "unit": "instalación",
    "badge": "Norma SEC",
    "description": "Servicio especializado de servicio de mantención de calefactor a leña otras marcas en casa 1 piso con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Instalador técnico normado",
      "Conexión hidráulica y de combustible/energía",
      "Prueba de tiro y presión",
      "Certificación de funcionamiento seguro"
    ],
    "iconType": "flame"
  },
  {
    "num": 49,
    "id": "srv-49",
    "title": "Servicio de Mantención de Calefactor a Leña BOSCA en Casa 1 Piso",
    "category": "calefaccion-agua",
    "categoryLabel": "Calefones, Termos & Calderas",
    "price": 79990,
    "unit": "instalación",
    "badge": "Norma SEC",
    "description": "Servicio especializado de servicio de mantención de calefactor a leña bosca en casa 1 piso con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Instalador técnico normado",
      "Conexión hidráulica y de combustible/energía",
      "Prueba de tiro y presión",
      "Certificación de funcionamiento seguro"
    ],
    "iconType": "flame"
  },
  {
    "num": 50,
    "id": "srv-50",
    "title": "Servicio de Mantención de calefactor a pellet BOSCA en casa 1 piso",
    "category": "calefaccion-agua",
    "categoryLabel": "Calefones, Termos & Calderas",
    "price": 99990,
    "unit": "instalación",
    "badge": "Norma SEC",
    "description": "Servicio especializado de servicio de mantención de calefactor a pellet bosca en casa 1 piso con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Instalador técnico normado",
      "Conexión hidráulica y de combustible/energía",
      "Prueba de tiro y presión",
      "Certificación de funcionamiento seguro"
    ],
    "iconType": "flame"
  },
  {
    "num": 51,
    "id": "srv-51",
    "title": "Servicio de Mantención de calefactor a pellet AMESTI en casa 1 piso",
    "category": "calefaccion-agua",
    "categoryLabel": "Calefones, Termos & Calderas",
    "price": 104990,
    "unit": "instalación",
    "badge": "Norma SEC",
    "description": "Servicio especializado de servicio de mantención de calefactor a pellet amesti en casa 1 piso con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Instalador técnico normado",
      "Conexión hidráulica y de combustible/energía",
      "Prueba de tiro y presión",
      "Certificación de funcionamiento seguro"
    ],
    "iconType": "flame"
  },
  {
    "num": 52,
    "id": "srv-52",
    "title": "Mantención Calefactor Pellet Otras Marcas Casa 1 Piso",
    "category": "calefaccion-agua",
    "categoryLabel": "Calefones, Termos & Calderas",
    "price": 104990,
    "unit": "instalación",
    "badge": "Norma SEC",
    "description": "Servicio especializado de mantención calefactor pellet otras marcas casa 1 piso con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Instalador técnico normado",
      "Conexión hidráulica y de combustible/energía",
      "Prueba de tiro y presión",
      "Certificación de funcionamiento seguro"
    ],
    "iconType": "flame"
  },
  {
    "num": 53,
    "id": "srv-53",
    "title": "Servicio de Instalación de Sanitario WC",
    "category": "bano-sanitarios",
    "categoryLabel": "Baños, Sanitarios & Grifería",
    "price": 42990,
    "unit": "instalación",
    "badge": "Gasfitería",
    "description": "Servicio especializado de servicio de instalación de sanitario wc con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Desmonte de artefacto previo si aplica",
      "Montaje con sellos y empaquetaduras",
      "Conexión de flexibles y grifería",
      "Sellado perimetral antihongos"
    ],
    "iconType": "droplet"
  },
  {
    "num": 54,
    "id": "srv-54",
    "title": "Servicio de Instalación y Conexión de 1 Monomando para Lavamano",
    "category": "bano-sanitarios",
    "categoryLabel": "Baños, Sanitarios & Grifería",
    "price": 29990,
    "unit": "instalación",
    "badge": "Gasfitería",
    "description": "Servicio especializado de servicio de instalación y conexión de 1 monomando para lavamano con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Desmonte de artefacto previo si aplica",
      "Montaje con sellos y empaquetaduras",
      "Conexión de flexibles y grifería",
      "Sellado perimetral antihongos"
    ],
    "iconType": "droplet"
  },
  {
    "num": 55,
    "id": "srv-55",
    "title": "Servicio Instalación 1 Monomando para Lavaplato",
    "category": "bano-sanitarios",
    "categoryLabel": "Baños, Sanitarios & Grifería",
    "price": 29990,
    "unit": "instalación",
    "badge": "Gasfitería",
    "description": "Servicio especializado de servicio instalación 1 monomando para lavaplato con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Desmonte de artefacto previo si aplica",
      "Montaje con sellos y empaquetaduras",
      "Conexión de flexibles y grifería",
      "Sellado perimetral antihongos"
    ],
    "iconType": "droplet"
  },
  {
    "num": 56,
    "id": "srv-56",
    "title": "Servicio Instalación Lavamano y pedestal + Conexión de Grifería y Sanitario",
    "category": "bano-sanitarios",
    "categoryLabel": "Baños, Sanitarios & Grifería",
    "price": 77990,
    "unit": "instalación",
    "badge": "Gasfitería",
    "description": "Servicio especializado de servicio instalación lavamano y pedestal + conexión de grifería y sanitario con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Desmonte de artefacto previo si aplica",
      "Montaje con sellos y empaquetaduras",
      "Conexión de flexibles y grifería",
      "Sellado perimetral antihongos"
    ],
    "iconType": "droplet"
  },
  {
    "num": 57,
    "id": "srv-57",
    "title": "Servicio Armado e instalación de Mueble Vanitorio + Conexión de grifería",
    "category": "bano-sanitarios",
    "categoryLabel": "Baños, Sanitarios & Grifería",
    "price": 58990,
    "unit": "mueble",
    "badge": "Gasfitería",
    "description": "Servicio especializado de servicio armado e instalación de mueble vanitorio + conexión de grifería con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Desmonte de artefacto previo si aplica",
      "Montaje con sellos y empaquetaduras",
      "Conexión de flexibles y grifería",
      "Sellado perimetral antihongos"
    ],
    "iconType": "droplet"
  },
  {
    "num": 58,
    "id": "srv-58",
    "title": "Servicio de Instalación de Columna de Ducha",
    "category": "bano-sanitarios",
    "categoryLabel": "Baños, Sanitarios & Grifería",
    "price": 38990,
    "unit": "instalación",
    "badge": "Gasfitería",
    "description": "Servicio especializado de servicio de instalación de columna de ducha con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Desmonte de artefacto previo si aplica",
      "Montaje con sellos y empaquetaduras",
      "Conexión de flexibles y grifería",
      "Sellado perimetral antihongos"
    ],
    "iconType": "droplet"
  },
  {
    "num": 59,
    "id": "srv-59",
    "title": "Servicio de Instalación de Mampara de Ducha",
    "category": "bano-sanitarios",
    "categoryLabel": "Baños, Sanitarios & Grifería",
    "price": 59990,
    "unit": "instalación",
    "badge": "Gasfitería",
    "description": "Servicio especializado de servicio de instalación de mampara de ducha con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Desmonte de artefacto previo si aplica",
      "Montaje con sellos y empaquetaduras",
      "Conexión de flexibles y grifería",
      "Sellado perimetral antihongos"
    ],
    "iconType": "droplet"
  },
  {
    "num": 60,
    "id": "srv-60",
    "title": "Servicio de Armado e Instalación de Cabina de Ducha",
    "category": "bano-sanitarios",
    "categoryLabel": "Baños, Sanitarios & Grifería",
    "price": 145990,
    "unit": "instalación",
    "badge": "Gasfitería",
    "description": "Servicio especializado de servicio de armado e instalación de cabina de ducha con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Desmonte de artefacto previo si aplica",
      "Montaje con sellos y empaquetaduras",
      "Conexión de flexibles y grifería",
      "Sellado perimetral antihongos"
    ],
    "iconType": "droplet"
  },
  {
    "num": 61,
    "id": "srv-61",
    "title": "Servicio Rebaje de Tina para Fácil Acceso (Pieza + Instalación)",
    "category": "bano-sanitarios",
    "categoryLabel": "Baños, Sanitarios & Grifería",
    "price": 319990,
    "unit": "instalación",
    "badge": "Gasfitería",
    "description": "Servicio especializado de servicio rebaje de tina para fácil acceso (pieza + instalación) con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Desmonte de artefacto previo si aplica",
      "Montaje con sellos y empaquetaduras",
      "Conexión de flexibles y grifería",
      "Sellado perimetral antihongos"
    ],
    "iconType": "droplet"
  },
  {
    "num": 62,
    "id": "srv-62",
    "title": "Servicio de malla de seguridad 0,8mm con Instalación incluida",
    "category": "seguridad-puertas-cortinaje",
    "categoryLabel": "Seguridad, Puertas & Cortinaje",
    "price": 8490,
    "unit": "m²",
    "badge": "Seguridad Hogar",
    "description": "Servicio especializado de servicio de malla de seguridad 0,8mm con instalación incluida con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Instalación milimétrica en vano o marco",
      "Alineación de herrajes y cremalleras",
      "Configuración de mandos o controles",
      "Prueba de resistencia y cierre"
    ],
    "iconType": "lock"
  },
  {
    "num": 63,
    "id": "srv-63",
    "title": "Servicio de malla de seguridad 0,9mm con Instalación incluida",
    "category": "seguridad-puertas-cortinaje",
    "categoryLabel": "Seguridad, Puertas & Cortinaje",
    "price": 9990,
    "unit": "m²",
    "badge": "Seguridad Hogar",
    "description": "Servicio especializado de servicio de malla de seguridad 0,9mm con instalación incluida con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Instalación milimétrica en vano o marco",
      "Alineación de herrajes y cremalleras",
      "Configuración de mandos o controles",
      "Prueba de resistencia y cierre"
    ],
    "iconType": "lock"
  },
  {
    "num": 64,
    "id": "srv-64",
    "title": "Servicio Instalación 1 de Cerrojo Digital",
    "category": "seguridad-puertas-cortinaje",
    "categoryLabel": "Seguridad, Puertas & Cortinaje",
    "price": 66990,
    "unit": "instalación",
    "badge": "Seguridad Hogar",
    "description": "Servicio especializado de servicio instalación 1 de cerrojo digital con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Instalación milimétrica en vano o marco",
      "Alineación de herrajes y cremalleras",
      "Configuración de mandos o controles",
      "Prueba de resistencia y cierre"
    ],
    "iconType": "lock"
  },
  {
    "num": 65,
    "id": "srv-65",
    "title": "Servicio Instalación 1 Cerradura Digital",
    "category": "seguridad-puertas-cortinaje",
    "categoryLabel": "Seguridad, Puertas & Cortinaje",
    "price": 66990,
    "unit": "instalación",
    "badge": "Seguridad Hogar",
    "description": "Servicio especializado de servicio instalación 1 cerradura digital con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Instalación milimétrica en vano o marco",
      "Alineación de herrajes y cremalleras",
      "Configuración de mandos o controles",
      "Prueba de resistencia y cierre"
    ],
    "iconType": "lock"
  },
  {
    "num": 66,
    "id": "srv-66",
    "title": "Servicio de Instalación 1 Cerradura de Acceso principal",
    "category": "seguridad-puertas-cortinaje",
    "categoryLabel": "Seguridad, Puertas & Cortinaje",
    "price": 46990,
    "unit": "instalación",
    "badge": "Seguridad Hogar",
    "description": "Servicio especializado de servicio de instalación 1 cerradura de acceso principal con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Instalación milimétrica en vano o marco",
      "Alineación de herrajes y cremalleras",
      "Configuración de mandos o controles",
      "Prueba de resistencia y cierre"
    ],
    "iconType": "lock"
  },
  {
    "num": 67,
    "id": "srv-67",
    "title": "Servicio Instalación Puerta, Cerradura y Bisagras en marco existente",
    "category": "seguridad-puertas-cortinaje",
    "categoryLabel": "Seguridad, Puertas & Cortinaje",
    "price": 109990,
    "unit": "instalación",
    "badge": "Seguridad Hogar",
    "description": "Servicio especializado de servicio instalación puerta, cerradura y bisagras en marco existente con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Instalación milimétrica en vano o marco",
      "Alineación de herrajes y cremalleras",
      "Configuración de mandos o controles",
      "Prueba de resistencia y cierre"
    ],
    "iconType": "lock"
  },
  {
    "num": 68,
    "id": "srv-68",
    "title": "Servicio de Instalación Puertas de Mueble de Cocina",
    "category": "seguridad-puertas-cortinaje",
    "categoryLabel": "Seguridad, Puertas & Cortinaje",
    "price": 59990,
    "unit": "mueble",
    "badge": "Seguridad Hogar",
    "description": "Servicio especializado de servicio de instalación puertas de mueble de cocina con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Instalación milimétrica en vano o marco",
      "Alineación de herrajes y cremalleras",
      "Configuración de mandos o controles",
      "Prueba de resistencia y cierre"
    ],
    "iconType": "lock"
  },
  {
    "num": 69,
    "id": "srv-69",
    "title": "Servicio de Instalación de cortinas roller y persianas",
    "category": "seguridad-puertas-cortinaje",
    "categoryLabel": "Seguridad, Puertas & Cortinaje",
    "price": 29990,
    "unit": "instalación",
    "badge": "Seguridad Hogar",
    "description": "Servicio especializado de servicio de instalación de cortinas roller y persianas con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Instalación milimétrica en vano o marco",
      "Alineación de herrajes y cremalleras",
      "Configuración de mandos o controles",
      "Prueba de resistencia y cierre"
    ],
    "iconType": "lock"
  },
  {
    "num": 70,
    "id": "srv-70",
    "title": "Servicio de Confección e Instalación de Cortinas A Medida",
    "category": "seguridad-puertas-cortinaje",
    "categoryLabel": "Seguridad, Puertas & Cortinaje",
    "price": 99990,
    "unit": "instalación",
    "badge": "Seguridad Hogar",
    "description": "Servicio especializado de servicio de confección e instalación de cortinas a medida con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Instalación milimétrica en vano o marco",
      "Alineación de herrajes y cremalleras",
      "Configuración de mandos o controles",
      "Prueba de resistencia y cierre"
    ],
    "iconType": "lock"
  },
  {
    "num": 71,
    "id": "srv-71",
    "title": "Servicio Instalación de Toldos Retráctil",
    "category": "seguridad-puertas-cortinaje",
    "categoryLabel": "Seguridad, Puertas & Cortinaje",
    "price": 77990,
    "unit": "instalación",
    "badge": "Seguridad Hogar",
    "description": "Servicio especializado de servicio instalación de toldos retráctil con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Instalación milimétrica en vano o marco",
      "Alineación de herrajes y cremalleras",
      "Configuración de mandos o controles",
      "Prueba de resistencia y cierre"
    ],
    "iconType": "lock"
  },
  {
    "num": 72,
    "id": "srv-72",
    "title": "Servicio Instalación Motor Porton Automático y Cremalleras",
    "category": "seguridad-puertas-cortinaje",
    "categoryLabel": "Seguridad, Puertas & Cortinaje",
    "price": 89990,
    "unit": "instalación",
    "badge": "Seguridad Hogar",
    "description": "Servicio especializado de servicio instalación motor porton automático y cremalleras con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Instalación milimétrica en vano o marco",
      "Alineación de herrajes y cremalleras",
      "Configuración de mandos o controles",
      "Prueba de resistencia y cierre"
    ],
    "iconType": "lock"
  },
  {
    "num": 73,
    "id": "srv-73",
    "title": "Servicio Instalación de Citófono o Videoportero",
    "category": "seguridad-puertas-cortinaje",
    "categoryLabel": "Seguridad, Puertas & Cortinaje",
    "price": 104990,
    "unit": "instalación",
    "badge": "Seguridad Hogar",
    "description": "Servicio especializado de servicio instalación de citófono o videoportero con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Instalación milimétrica en vano o marco",
      "Alineación de herrajes y cremalleras",
      "Configuración de mandos o controles",
      "Prueba de resistencia y cierre"
    ],
    "iconType": "lock"
  },
  {
    "num": 74,
    "id": "srv-74",
    "title": "Servicio de Instalación de soporte para TV",
    "category": "seguridad-puertas-cortinaje",
    "categoryLabel": "Seguridad, Puertas & Cortinaje",
    "price": 39990,
    "unit": "instalación",
    "badge": "Seguridad Hogar",
    "description": "Servicio especializado de servicio de instalación de soporte para tv con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Instalación milimétrica en vano o marco",
      "Alineación de herrajes y cremalleras",
      "Configuración de mandos o controles",
      "Prueba de resistencia y cierre"
    ],
    "iconType": "lock"
  },
  {
    "num": 75,
    "id": "srv-75",
    "title": "Servicio Instalación antena, router y Starlink",
    "category": "seguridad-puertas-cortinaje",
    "categoryLabel": "Seguridad, Puertas & Cortinaje",
    "price": 79990,
    "unit": "instalación",
    "badge": "Seguridad Hogar",
    "description": "Servicio especializado de servicio instalación antena, router y starlink con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Instalación milimétrica en vano o marco",
      "Alineación de herrajes y cremalleras",
      "Configuración de mandos o controles",
      "Prueba de resistencia y cierre"
    ],
    "iconType": "lock"
  },
  {
    "num": 76,
    "id": "srv-76",
    "title": "Servicio Instalación estándar de escalera de entretecho",
    "category": "seguridad-puertas-cortinaje",
    "categoryLabel": "Seguridad, Puertas & Cortinaje",
    "price": 329990,
    "unit": "instalación",
    "badge": "Seguridad Hogar",
    "description": "Servicio especializado de servicio instalación estándar de escalera de entretecho con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Instalación milimétrica en vano o marco",
      "Alineación de herrajes y cremalleras",
      "Configuración de mandos o controles",
      "Prueba de resistencia y cierre"
    ],
    "iconType": "lock"
  },
  {
    "num": 77,
    "id": "srv-77",
    "title": "Servicio Instalación estándar de ventana de techo",
    "category": "seguridad-puertas-cortinaje",
    "categoryLabel": "Seguridad, Puertas & Cortinaje",
    "price": 272990,
    "unit": "instalación",
    "badge": "Seguridad Hogar",
    "description": "Servicio especializado de servicio instalación estándar de ventana de techo con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Instalación milimétrica en vano o marco",
      "Alineación de herrajes y cremalleras",
      "Configuración de mandos o controles",
      "Prueba de resistencia y cierre"
    ],
    "iconType": "lock"
  },
  {
    "num": 78,
    "id": "srv-78",
    "title": "Servicio de Remodelación de Baño hasta 3 mt2",
    "category": "remodelaciones-proyectos",
    "categoryLabel": "Remodelaciones & Proyectos",
    "price": 1090990,
    "unit": "m²",
    "badge": "Proyecto Mayor",
    "description": "Servicio especializado de servicio de remodelación de baño hasta 3 mt2 con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Planificación y cubicación en obra",
      "Suministro o mano de obra integral",
      "Supervisión técnica de avance",
      "Entrega con garantía formal"
    ],
    "iconType": "hammer"
  },
  {
    "num": 79,
    "id": "srv-79",
    "title": "Servicio de Remodelación de Baño hasta 5 mt2",
    "category": "remodelaciones-proyectos",
    "categoryLabel": "Remodelaciones & Proyectos",
    "price": 1290990,
    "unit": "m²",
    "badge": "Proyecto Mayor",
    "description": "Servicio especializado de servicio de remodelación de baño hasta 5 mt2 con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Planificación y cubicación en obra",
      "Suministro o mano de obra integral",
      "Supervisión técnica de avance",
      "Entrega con garantía formal"
    ],
    "iconType": "hammer"
  },
  {
    "num": 80,
    "id": "srv-80",
    "title": "Servicio de Remodelación de Baño hasta 8 mt2",
    "category": "remodelaciones-proyectos",
    "categoryLabel": "Remodelaciones & Proyectos",
    "price": 1490990,
    "unit": "m²",
    "badge": "Proyecto Mayor",
    "description": "Servicio especializado de servicio de remodelación de baño hasta 8 mt2 con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Planificación y cubicación en obra",
      "Suministro o mano de obra integral",
      "Supervisión técnica de avance",
      "Entrega con garantía formal"
    ],
    "iconType": "hammer"
  },
  {
    "num": 81,
    "id": "srv-81",
    "title": "Proyecto de Cocina 1,6 Metros con Cubierta de Cuarzo + Instalación",
    "category": "remodelaciones-proyectos",
    "categoryLabel": "Remodelaciones & Proyectos",
    "price": 990990,
    "unit": "proyecto",
    "badge": "Proyecto Mayor",
    "description": "Servicio especializado de proyecto de cocina 1,6 metros con cubierta de cuarzo + instalación con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Planificación y cubicación en obra",
      "Suministro o mano de obra integral",
      "Supervisión técnica de avance",
      "Entrega con garantía formal"
    ],
    "iconType": "hammer"
  },
  {
    "num": 82,
    "id": "srv-82",
    "title": "Proyecto de Cocina 1,9 Metros con Cubierta de Cuarzo + Instalación",
    "category": "remodelaciones-proyectos",
    "categoryLabel": "Remodelaciones & Proyectos",
    "price": 1190990,
    "unit": "proyecto",
    "badge": "Proyecto Mayor",
    "description": "Servicio especializado de proyecto de cocina 1,9 metros con cubierta de cuarzo + instalación con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Planificación y cubicación en obra",
      "Suministro o mano de obra integral",
      "Supervisión técnica de avance",
      "Entrega con garantía formal"
    ],
    "iconType": "hammer"
  },
  {
    "num": 83,
    "id": "srv-83",
    "title": "Proyecto de Cocina 3 Metros con Cubierta de Madera + Instalación",
    "category": "remodelaciones-proyectos",
    "categoryLabel": "Remodelaciones & Proyectos",
    "price": 2290990,
    "unit": "proyecto",
    "badge": "Proyecto Mayor",
    "description": "Servicio especializado de proyecto de cocina 3 metros con cubierta de madera + instalación con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Planificación y cubicación en obra",
      "Suministro o mano de obra integral",
      "Supervisión técnica de avance",
      "Entrega con garantía formal"
    ],
    "iconType": "hammer"
  },
  {
    "num": 84,
    "id": "srv-84",
    "title": "Proyecto de Cocina 3 Metros con Cubierta de Cuarzo Blanco + Instalación",
    "category": "remodelaciones-proyectos",
    "categoryLabel": "Remodelaciones & Proyectos",
    "price": 2490990,
    "unit": "proyecto",
    "badge": "Proyecto Mayor",
    "description": "Servicio especializado de proyecto de cocina 3 metros con cubierta de cuarzo blanco + instalación con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Planificación y cubicación en obra",
      "Suministro o mano de obra integral",
      "Supervisión técnica de avance",
      "Entrega con garantía formal"
    ],
    "iconType": "hammer"
  },
  {
    "num": 85,
    "id": "srv-85",
    "title": "Proyecto de Instalación energía solar On-Grid",
    "category": "remodelaciones-proyectos",
    "categoryLabel": "Remodelaciones & Proyectos",
    "price": 3899990,
    "unit": "proyecto",
    "badge": "Proyecto Mayor",
    "description": "Servicio especializado de proyecto de instalación energía solar on-grid con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Planificación y cubicación en obra",
      "Suministro o mano de obra integral",
      "Supervisión técnica de avance",
      "Entrega con garantía formal"
    ],
    "iconType": "hammer"
  },
  {
    "num": 86,
    "id": "srv-86",
    "title": "Proyecto de Instalación energía solar Off-Grid",
    "category": "remodelaciones-proyectos",
    "categoryLabel": "Remodelaciones & Proyectos",
    "price": 4799990,
    "unit": "proyecto",
    "badge": "Proyecto Mayor",
    "description": "Servicio especializado de proyecto de instalación energía solar off-grid con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Planificación y cubicación en obra",
      "Suministro o mano de obra integral",
      "Supervisión técnica de avance",
      "Entrega con garantía formal"
    ],
    "iconType": "hammer"
  },
  {
    "num": 87,
    "id": "srv-87",
    "title": "Servicio de Instalación de Cargadores para Vehículos Eléctricos",
    "category": "remodelaciones-proyectos",
    "categoryLabel": "Remodelaciones & Proyectos",
    "price": 1899990,
    "unit": "instalación",
    "badge": "Proyecto Mayor",
    "description": "Servicio especializado de servicio de instalación de cargadores para vehículos eléctricos con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Planificación y cubicación en obra",
      "Suministro o mano de obra integral",
      "Supervisión técnica de avance",
      "Entrega con garantía formal"
    ],
    "iconType": "hammer"
  },
  {
    "num": 88,
    "id": "srv-88",
    "title": "Instalación con cobertura Nacional (General)",
    "category": "remodelaciones-proyectos",
    "categoryLabel": "Remodelaciones & Proyectos",
    "price": 1590000,
    "unit": "instalación",
    "badge": "Proyecto Mayor",
    "description": "Servicio especializado de instalación con cobertura nacional (general) con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Planificación y cubicación en obra",
      "Suministro o mano de obra integral",
      "Supervisión técnica de avance",
      "Entrega con garantía formal"
    ],
    "iconType": "hammer"
  },
  {
    "num": 89,
    "id": "srv-89",
    "title": "Casa Modular Maiten 27.6 m2 Armada e Instalada",
    "category": "remodelaciones-proyectos",
    "categoryLabel": "Remodelaciones & Proyectos",
    "price": 13990990,
    "unit": "m²",
    "badge": "Proyecto Mayor",
    "description": "Servicio especializado de casa modular maiten 27.6 m2 armada e instalada con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Planificación y cubicación en obra",
      "Suministro o mano de obra integral",
      "Supervisión técnica de avance",
      "Entrega con garantía formal"
    ],
    "iconType": "hammer"
  },
  {
    "num": 90,
    "id": "srv-90",
    "title": "Servicio de Retiro y Reciclaje de 1 mueble",
    "category": "retiro-reciclaje",
    "categoryLabel": "Retiro & Reciclaje Responsable",
    "price": 29990,
    "unit": "mueble",
    "badge": "Sello ECO",
    "description": "Servicio especializado de servicio de retiro y reciclaje de 1 mueble con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Retiro coordinado desde el domicilio",
      "Carga y transporte responsable",
      "Destino a planta de valorización o reciclaje",
      "Certificado de gestión ambiental"
    ],
    "iconType": "file"
  },
  {
    "num": 91,
    "id": "srv-91",
    "title": "Servicio de Retiro y Reciclaje de Colchón",
    "category": "retiro-reciclaje",
    "categoryLabel": "Retiro & Reciclaje Responsable",
    "price": 33990,
    "unit": "instalación",
    "badge": "Sello ECO",
    "description": "Servicio especializado de servicio de retiro y reciclaje de colchón con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Retiro coordinado desde el domicilio",
      "Carga y transporte responsable",
      "Destino a planta de valorización o reciclaje",
      "Certificado de gestión ambiental"
    ],
    "iconType": "file"
  },
  {
    "num": 92,
    "id": "srv-92",
    "title": "Servicio de Retiro y Reciclaje de 1 Electrodoméstico",
    "category": "retiro-reciclaje",
    "categoryLabel": "Retiro & Reciclaje Responsable",
    "price": 33990,
    "unit": "instalación",
    "badge": "Sello ECO",
    "description": "Servicio especializado de servicio de retiro y reciclaje de 1 electrodoméstico con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Retiro coordinado desde el domicilio",
      "Carga y transporte responsable",
      "Destino a planta de valorización o reciclaje",
      "Certificado de gestión ambiental"
    ],
    "iconType": "file"
  },
  {
    "num": 93,
    "id": "srv-93",
    "title": "Servicio de Retiro y Reciclaje de Calefont (sin desinstalación)",
    "category": "retiro-reciclaje",
    "categoryLabel": "Retiro & Reciclaje Responsable",
    "price": 16990,
    "unit": "instalación",
    "badge": "Sello ECO",
    "description": "Servicio especializado de servicio de retiro y reciclaje de calefont (sin desinstalación) con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Retiro coordinado desde el domicilio",
      "Carga y transporte responsable",
      "Destino a planta de valorización o reciclaje",
      "Certificado de gestión ambiental"
    ],
    "iconType": "file"
  },
  {
    "num": 94,
    "id": "srv-94",
    "title": "Asesoría diseño remodelación de Baño Cocina",
    "category": "visitas-presupuesto",
    "categoryLabel": "Visitas de Presupuesto & Asesorías",
    "price": 29990,
    "unit": "visita",
    "badge": "En Terreno",
    "description": "Servicio especializado de asesoría diseño remodelación de baño cocina con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Evaluación técnica presencial en terreno",
      "Levantamiento de medidas y factibilidad",
      "Presupuesto formal detallado en 24-48h",
      "Asesoría técnica personalizada"
    ],
    "iconType": "file"
  },
  {
    "num": 95,
    "id": "srv-95",
    "title": "Visita Presupuesto Instalación de Cerámica",
    "category": "visitas-presupuesto",
    "categoryLabel": "Visitas de Presupuesto & Asesorías",
    "price": 16990,
    "unit": "visita",
    "badge": "En Terreno",
    "description": "Servicio especializado de visita presupuesto instalación de cerámica con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Evaluación técnica presencial en terreno",
      "Levantamiento de medidas y factibilidad",
      "Presupuesto formal detallado en 24-48h",
      "Asesoría técnica personalizada"
    ],
    "iconType": "file"
  },
  {
    "num": 96,
    "id": "srv-96",
    "title": "Visita Presupuesto Instalación de Piso Vinílico",
    "category": "visitas-presupuesto",
    "categoryLabel": "Visitas de Presupuesto & Asesorías",
    "price": 20000,
    "unit": "visita",
    "badge": "En Terreno",
    "description": "Servicio especializado de visita presupuesto instalación de piso vinílico con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Evaluación técnica presencial en terreno",
      "Levantamiento de medidas y factibilidad",
      "Presupuesto formal detallado en 24-48h",
      "Asesoría técnica personalizada"
    ],
    "iconType": "file"
  },
  {
    "num": 97,
    "id": "srv-97",
    "title": "Visita Presupuesto Instalación de Porcelanato",
    "category": "visitas-presupuesto",
    "categoryLabel": "Visitas de Presupuesto & Asesorías",
    "price": 16990,
    "unit": "visita",
    "badge": "En Terreno",
    "description": "Servicio especializado de visita presupuesto instalación de porcelanato con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Evaluación técnica presencial en terreno",
      "Levantamiento de medidas y factibilidad",
      "Presupuesto formal detallado en 24-48h",
      "Asesoría técnica personalizada"
    ],
    "iconType": "file"
  },
  {
    "num": 98,
    "id": "srv-98",
    "title": "Visita Presupuesto Aplicación Pintura Exterior o Interior",
    "category": "visitas-presupuesto",
    "categoryLabel": "Visitas de Presupuesto & Asesorías",
    "price": 20000,
    "unit": "visita",
    "badge": "En Terreno",
    "description": "Servicio especializado de visita presupuesto aplicación pintura exterior o interior con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Evaluación técnica presencial en terreno",
      "Levantamiento de medidas y factibilidad",
      "Presupuesto formal detallado en 24-48h",
      "Asesoría técnica personalizada"
    ],
    "iconType": "file"
  },
  {
    "num": 99,
    "id": "srv-99",
    "title": "Visita Presupuesto Fabricación e Instalación Ventanas a Medida",
    "category": "visitas-presupuesto",
    "categoryLabel": "Visitas de Presupuesto & Asesorías",
    "price": 29990,
    "unit": "visita",
    "badge": "En Terreno",
    "description": "Servicio especializado de visita presupuesto fabricación e instalación ventanas a medida con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Evaluación técnica presencial en terreno",
      "Levantamiento de medidas y factibilidad",
      "Presupuesto formal detallado en 24-48h",
      "Asesoría técnica personalizada"
    ],
    "iconType": "file"
  },
  {
    "num": 100,
    "id": "srv-100",
    "title": "Visita Presupuesto Cortinas de Cristal Plegable Terrazas/Balcones",
    "category": "visitas-presupuesto",
    "categoryLabel": "Visitas de Presupuesto & Asesorías",
    "price": 29990,
    "unit": "visita",
    "badge": "En Terreno",
    "description": "Servicio especializado de visita presupuesto cortinas de cristal plegable terrazas/balcones con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Evaluación técnica presencial en terreno",
      "Levantamiento de medidas y factibilidad",
      "Presupuesto formal detallado en 24-48h",
      "Asesoría técnica personalizada"
    ],
    "iconType": "file"
  },
  {
    "num": 101,
    "id": "srv-101",
    "title": "Visita Presupuesto Instalación Cubierta",
    "category": "visitas-presupuesto",
    "categoryLabel": "Visitas de Presupuesto & Asesorías",
    "price": 20000,
    "unit": "visita",
    "badge": "En Terreno",
    "description": "Servicio especializado de visita presupuesto instalación cubierta con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Evaluación técnica presencial en terreno",
      "Levantamiento de medidas y factibilidad",
      "Presupuesto formal detallado en 24-48h",
      "Asesoría técnica personalizada"
    ],
    "iconType": "file"
  },
  {
    "num": 102,
    "id": "srv-102",
    "title": "Visita para presupuesto Instalación de Aire Acondicionado",
    "category": "visitas-presupuesto",
    "categoryLabel": "Visitas de Presupuesto & Asesorías",
    "price": 20000,
    "unit": "visita",
    "badge": "En Terreno",
    "description": "Servicio especializado de visita para presupuesto instalación de aire acondicionado con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Evaluación técnica presencial en terreno",
      "Levantamiento de medidas y factibilidad",
      "Presupuesto formal detallado en 24-48h",
      "Asesoría técnica personalizada"
    ],
    "iconType": "file"
  },
  {
    "num": 103,
    "id": "srv-103",
    "title": "Visita Presupuesto Instalación Sistema Paneles Solares",
    "category": "visitas-presupuesto",
    "categoryLabel": "Visitas de Presupuesto & Asesorías",
    "price": 20000,
    "unit": "visita",
    "badge": "En Terreno",
    "description": "Servicio especializado de visita presupuesto instalación sistema paneles solares con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Evaluación técnica presencial en terreno",
      "Levantamiento de medidas y factibilidad",
      "Presupuesto formal detallado en 24-48h",
      "Asesoría técnica personalizada"
    ],
    "iconType": "file"
  },
  {
    "num": 104,
    "id": "srv-104",
    "title": "Visita para Presupuesto Instalación Portón Automático",
    "category": "visitas-presupuesto",
    "categoryLabel": "Visitas de Presupuesto & Asesorías",
    "price": 20000,
    "unit": "visita",
    "badge": "En Terreno",
    "description": "Servicio especializado de visita para presupuesto instalación portón automático con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Evaluación técnica presencial en terreno",
      "Levantamiento de medidas y factibilidad",
      "Presupuesto formal detallado en 24-48h",
      "Asesoría técnica personalizada"
    ],
    "iconType": "file"
  },
  {
    "num": 105,
    "id": "srv-105",
    "title": "Visita Presupuesto Instalación Calefactor Leña BOSCA",
    "category": "visitas-presupuesto",
    "categoryLabel": "Visitas de Presupuesto & Asesorías",
    "price": 20000,
    "unit": "visita",
    "badge": "En Terreno",
    "description": "Servicio especializado de visita presupuesto instalación calefactor leña bosca con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Evaluación técnica presencial en terreno",
      "Levantamiento de medidas y factibilidad",
      "Presupuesto formal detallado en 24-48h",
      "Asesoría técnica personalizada"
    ],
    "iconType": "file"
  },
  {
    "num": 106,
    "id": "srv-106",
    "title": "Visita Presupuesto Instalación Calefactor Leña AMESTI",
    "category": "visitas-presupuesto",
    "categoryLabel": "Visitas de Presupuesto & Asesorías",
    "price": 20000,
    "unit": "visita",
    "badge": "En Terreno",
    "description": "Servicio especializado de visita presupuesto instalación calefactor leña amesti con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Evaluación técnica presencial en terreno",
      "Levantamiento de medidas y factibilidad",
      "Presupuesto formal detallado en 24-48h",
      "Asesoría técnica personalizada"
    ],
    "iconType": "file"
  },
  {
    "num": 107,
    "id": "srv-107",
    "title": "Visita Presupuesto Instalación Calefactor Pellet BOSCA",
    "category": "visitas-presupuesto",
    "categoryLabel": "Visitas de Presupuesto & Asesorías",
    "price": 20000,
    "unit": "visita",
    "badge": "En Terreno",
    "description": "Servicio especializado de visita presupuesto instalación calefactor pellet bosca con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Evaluación técnica presencial en terreno",
      "Levantamiento de medidas y factibilidad",
      "Presupuesto formal detallado en 24-48h",
      "Asesoría técnica personalizada"
    ],
    "iconType": "file"
  },
  {
    "num": 108,
    "id": "srv-108",
    "title": "Visita Presupuesto Instalación Calefactor Pellet Otras Marcas",
    "category": "visitas-presupuesto",
    "categoryLabel": "Visitas de Presupuesto & Asesorías",
    "price": 20000,
    "unit": "visita",
    "badge": "En Terreno",
    "description": "Servicio especializado de visita presupuesto instalación calefactor pellet otras marcas con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Evaluación técnica presencial en terreno",
      "Levantamiento de medidas y factibilidad",
      "Presupuesto formal detallado en 24-48h",
      "Asesoría técnica personalizada"
    ],
    "iconType": "file"
  },
  {
    "num": 109,
    "id": "srv-109",
    "title": "Visita Presupuesto Instalación de Calefón",
    "category": "visitas-presupuesto",
    "categoryLabel": "Visitas de Presupuesto & Asesorías",
    "price": 20000,
    "unit": "visita",
    "badge": "En Terreno",
    "description": "Servicio especializado de visita presupuesto instalación de calefón con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Evaluación técnica presencial en terreno",
      "Levantamiento de medidas y factibilidad",
      "Presupuesto formal detallado en 24-48h",
      "Asesoría técnica personalizada"
    ],
    "iconType": "file"
  },
  {
    "num": 110,
    "id": "srv-110",
    "title": "Visita Presupuesto Confección e Instalación Cortinas Roller",
    "category": "visitas-presupuesto",
    "categoryLabel": "Visitas de Presupuesto & Asesorías",
    "price": 29990,
    "unit": "visita",
    "badge": "En Terreno",
    "description": "Servicio especializado de visita presupuesto confección e instalación cortinas roller con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Evaluación técnica presencial en terreno",
      "Levantamiento de medidas y factibilidad",
      "Presupuesto formal detallado en 24-48h",
      "Asesoría técnica personalizada"
    ],
    "iconType": "file"
  },
  {
    "num": 111,
    "id": "srv-111",
    "title": "Visita Presupuesto Instalación Antena Starlink",
    "category": "visitas-presupuesto",
    "categoryLabel": "Visitas de Presupuesto & Asesorías",
    "price": 20000,
    "unit": "visita",
    "badge": "En Terreno",
    "description": "Servicio especializado de visita presupuesto instalación antena starlink con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Evaluación técnica presencial en terreno",
      "Levantamiento de medidas y factibilidad",
      "Presupuesto formal detallado en 24-48h",
      "Asesoría técnica personalizada"
    ],
    "iconType": "file"
  },
  {
    "num": 112,
    "id": "srv-112",
    "title": "Visita Presupuesto Instalación Toldo para Ventana",
    "category": "visitas-presupuesto",
    "categoryLabel": "Visitas de Presupuesto & Asesorías",
    "price": 20000,
    "unit": "visita",
    "badge": "En Terreno",
    "description": "Servicio especializado de visita presupuesto instalación toldo para ventana con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Evaluación técnica presencial en terreno",
      "Levantamiento de medidas y factibilidad",
      "Presupuesto formal detallado en 24-48h",
      "Asesoría técnica personalizada"
    ],
    "iconType": "file"
  },
  {
    "num": 113,
    "id": "srv-113",
    "title": "Visita Presupuesto Citofonía y Videoportero",
    "category": "visitas-presupuesto",
    "categoryLabel": "Visitas de Presupuesto & Asesorías",
    "price": 20000,
    "unit": "visita",
    "badge": "En Terreno",
    "description": "Servicio especializado de visita presupuesto citofonía y videoportero con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Evaluación técnica presencial en terreno",
      "Levantamiento de medidas y factibilidad",
      "Presupuesto formal detallado en 24-48h",
      "Asesoría técnica personalizada"
    ],
    "iconType": "file"
  },
  {
    "num": 114,
    "id": "srv-114",
    "title": "Visita Presupuesto Instalación Video Portero",
    "category": "visitas-presupuesto",
    "categoryLabel": "Visitas de Presupuesto & Asesorías",
    "price": 20000,
    "unit": "visita",
    "badge": "En Terreno",
    "description": "Servicio especializado de visita presupuesto instalación video portero con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Evaluación técnica presencial en terreno",
      "Levantamiento de medidas y factibilidad",
      "Presupuesto formal detallado en 24-48h",
      "Asesoría técnica personalizada"
    ],
    "iconType": "file"
  },
  {
    "num": 115,
    "id": "srv-115",
    "title": "Visita Presupuesto Instalación Puertas",
    "category": "visitas-presupuesto",
    "categoryLabel": "Visitas de Presupuesto & Asesorías",
    "price": 20000,
    "unit": "visita",
    "badge": "En Terreno",
    "description": "Servicio especializado de visita presupuesto instalación puertas con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Evaluación técnica presencial en terreno",
      "Levantamiento de medidas y factibilidad",
      "Presupuesto formal detallado en 24-48h",
      "Asesoría técnica personalizada"
    ],
    "iconType": "file"
  },
  {
    "num": 116,
    "id": "srv-116",
    "title": "Visita Presupuesto Instalación Papel Mural",
    "category": "visitas-presupuesto",
    "categoryLabel": "Visitas de Presupuesto & Asesorías",
    "price": 20000,
    "unit": "visita",
    "badge": "En Terreno",
    "description": "Servicio especializado de visita presupuesto instalación papel mural con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Evaluación técnica presencial en terreno",
      "Levantamiento de medidas y factibilidad",
      "Presupuesto formal detallado en 24-48h",
      "Asesoría técnica personalizada"
    ],
    "iconType": "file"
  },
  {
    "num": 117,
    "id": "srv-117",
    "title": "Visita Presupuesto Instalación Pasto Sintético",
    "category": "visitas-presupuesto",
    "categoryLabel": "Visitas de Presupuesto & Asesorías",
    "price": 20000,
    "unit": "visita",
    "badge": "En Terreno",
    "description": "Servicio especializado de visita presupuesto instalación pasto sintético con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Evaluación técnica presencial en terreno",
      "Levantamiento de medidas y factibilidad",
      "Presupuesto formal detallado en 24-48h",
      "Asesoría técnica personalizada"
    ],
    "iconType": "file"
  },
  {
    "num": 118,
    "id": "srv-118",
    "title": "Visita para presupuesto Instalación Mampara o Cabina de ducha",
    "category": "visitas-presupuesto",
    "categoryLabel": "Visitas de Presupuesto & Asesorías",
    "price": 20000,
    "unit": "visita",
    "badge": "En Terreno",
    "description": "Servicio especializado de visita para presupuesto instalación mampara o cabina de ducha con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Evaluación técnica presencial en terreno",
      "Levantamiento de medidas y factibilidad",
      "Presupuesto formal detallado en 24-48h",
      "Asesoría técnica personalizada"
    ],
    "iconType": "file"
  },
  {
    "num": 119,
    "id": "srv-119",
    "title": "Visita Presupuesto Instalación Lámina para Renovar Puertas Muebles",
    "category": "visitas-presupuesto",
    "categoryLabel": "Visitas de Presupuesto & Asesorías",
    "price": 29990,
    "unit": "visita",
    "badge": "En Terreno",
    "description": "Servicio especializado de visita presupuesto instalación lámina para renovar puertas muebles con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Evaluación técnica presencial en terreno",
      "Levantamiento de medidas y factibilidad",
      "Presupuesto formal detallado en 24-48h",
      "Asesoría técnica personalizada"
    ],
    "iconType": "file"
  },
  {
    "num": 120,
    "id": "srv-120",
    "title": "Visita de inspiración",
    "category": "visitas-presupuesto",
    "categoryLabel": "Visitas de Presupuesto & Asesorías",
    "price": 29990,
    "unit": "visita",
    "badge": "En Terreno",
    "description": "Servicio especializado de visita de inspiración con estándar técnico profesional y garantía de ejecución.",
    "includes": [
      "Evaluación técnica presencial en terreno",
      "Levantamiento de medidas y factibilidad",
      "Presupuesto formal detallado en 24-48h",
      "Asesoría técnica personalizada"
    ],
    "iconType": "file"
  }
];
