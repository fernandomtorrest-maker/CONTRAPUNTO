// Catálogo completo de 120 servicios oficiales con características, inclusiones, exclusiones y condiciones técnicas
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
  caracteristicas: string;
  includes: string[];
  notIncludes: string[];
  conditions: string;
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
    "description": "Servicio profesional de revestimiento y acabados para transformar pisos y muros con estándar de alta durabilidad y estética impecable. Especialidad: Servicio Instalación de Cerámica por M2.",
    "caracteristicas": "Mano de obra especializada siguiendo estrictas normas técnicas y de nivelación. Contempla la preparación de la base, trazado, colocación milimétrica y fraguado uniforme.",
    "includes": [
      "Mano de obra calificada de instalación",
      "Preparación de base piso o muro (puntereo, galleteo o quemado superficial)",
      "Instalación según patrón y cantería indicada",
      "Fraguado técnico parejo y retiro de excedentes",
      "Instalación de topes de puertas rectos en accesos intervenidos"
    ],
    "notIncludes": [
      "Materiales e insumos (palmetas, cerámicos, adhesivo polimérico, fragüe)",
      "Reparación de preexistencias estructurales (filtraciones, grietas vivas o humedad)",
      "Retiro de revestimientos existentes o picado de losa mayor (se cotiza como partida adicional)",
      "Formatos especiales de gran dimensión mayores a 60 cm sin rectificación previa"
    ],
    "conditions": "Contratación mínima de 15 m². Superficie base afinada, limpia y libre de humedad. Sujeto a rectificación técnica.",
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
    "description": "Servicio profesional de revestimiento y acabados para transformar pisos y muros con estándar de alta durabilidad y estética impecable. Especialidad: Servicio Instalación de Porcelanato por M2.",
    "caracteristicas": "Mano de obra especializada siguiendo estrictas normas técnicas y de nivelación. Contempla la preparación de la base, trazado, colocación milimétrica y fraguado uniforme.",
    "includes": [
      "Mano de obra calificada de instalación",
      "Preparación de base piso o muro (puntereo, galleteo o quemado superficial)",
      "Instalación según patrón y cantería indicada",
      "Fraguado técnico parejo y retiro de excedentes",
      "Instalación de topes de puertas rectos en accesos intervenidos"
    ],
    "notIncludes": [
      "Materiales e insumos (palmetas, cerámicos, adhesivo polimérico, fragüe)",
      "Reparación de preexistencias estructurales (filtraciones, grietas vivas o humedad)",
      "Retiro de revestimientos existentes o picado de losa mayor (se cotiza como partida adicional)",
      "Formatos especiales de gran dimensión mayores a 60 cm sin rectificación previa"
    ],
    "conditions": "Contratación mínima de 15 m². Superficie base afinada, limpia y libre de humedad. Sujeto a rectificación técnica.",
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
    "description": "Servicio profesional de revestimiento y acabados para transformar pisos y muros con estándar de alta durabilidad y estética impecable. Especialidad: Servicio de Instalación de Piso Vinílico por M2.",
    "caracteristicas": "Mano de obra especializada siguiendo estrictas normas técnicas y de nivelación. Contempla la preparación de la base, trazado, colocación milimétrica y fraguado uniforme.",
    "includes": [
      "Mano de obra calificada de instalación",
      "Preparación de base piso o muro (puntereo, galleteo o quemado superficial)",
      "Instalación según patrón y cantería indicada",
      "Fraguado técnico parejo y retiro de excedentes",
      "Instalación de topes de puertas rectos en accesos intervenidos"
    ],
    "notIncludes": [
      "Materiales e insumos (palmetas, cerámicos, adhesivo polimérico, fragüe)",
      "Reparación de preexistencias estructurales (filtraciones, grietas vivas o humedad)",
      "Retiro de revestimientos existentes o picado de losa mayor (se cotiza como partida adicional)",
      "Formatos especiales de gran dimensión mayores a 60 cm sin rectificación previa"
    ],
    "conditions": "Contratación mínima de 15 m². Superficie base afinada, limpia y libre de humedad. Sujeto a rectificación técnica.",
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
    "description": "Servicio profesional de revestimiento y acabados para transformar pisos y muros con estándar de alta durabilidad y estética impecable. Especialidad: Servicio de Instalación de piso laminado por M2.",
    "caracteristicas": "Mano de obra especializada siguiendo estrictas normas técnicas y de nivelación. Contempla la preparación de la base, trazado, colocación milimétrica y fraguado uniforme.",
    "includes": [
      "Mano de obra calificada de instalación",
      "Preparación de base piso o muro (puntereo, galleteo o quemado superficial)",
      "Instalación según patrón y cantería indicada",
      "Fraguado técnico parejo y retiro de excedentes",
      "Instalación de topes de puertas rectos en accesos intervenidos"
    ],
    "notIncludes": [
      "Materiales e insumos (palmetas, cerámicos, adhesivo polimérico, fragüe)",
      "Reparación de preexistencias estructurales (filtraciones, grietas vivas o humedad)",
      "Retiro de revestimientos existentes o picado de losa mayor (se cotiza como partida adicional)",
      "Formatos especiales de gran dimensión mayores a 60 cm sin rectificación previa"
    ],
    "conditions": "Superficie base debe estar completamente desocupada, seca y nivelada. Mínimo de contratación general: 15 m². Sujeto a rectificación de medidas en terreno.",
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
    "description": "Servicio profesional de revestimiento y acabados para transformar pisos y muros con estándar de alta durabilidad y estética impecable. Especialidad: INST ALFOMBRA FULL.",
    "caracteristicas": "Mano de obra especializada siguiendo estrictas normas técnicas y de nivelación. Contempla la preparación de la base, trazado, colocación milimétrica y fraguado uniforme.",
    "includes": [
      "Mano de obra calificada de instalación",
      "Preparación de base piso o muro (puntereo, galleteo o quemado superficial)",
      "Instalación según patrón y cantería indicada",
      "Fraguado técnico parejo y retiro de excedentes",
      "Instalación de topes de puertas rectos en accesos intervenidos"
    ],
    "notIncludes": [
      "Materiales e insumos (palmetas, cerámicos, adhesivo polimérico, fragüe)",
      "Reparación de preexistencias estructurales (filtraciones, grietas vivas o humedad)",
      "Retiro de revestimientos existentes o picado de losa mayor (se cotiza como partida adicional)",
      "Formatos especiales de gran dimensión mayores a 60 cm sin rectificación previa"
    ],
    "conditions": "Superficie base debe estar completamente desocupada, seca y nivelada. Mínimo de contratación general: 15 m². Sujeto a rectificación de medidas en terreno.",
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
    "description": "Servicio profesional de revestimiento y acabados para transformar pisos y muros con estándar de alta durabilidad y estética impecable. Especialidad: Servicio de Aplicación de Pintura Interior por M2.",
    "caracteristicas": "Mano de obra especializada siguiendo estrictas normas técnicas y de nivelación. Contempla la preparación de la base, trazado, colocación milimétrica y fraguado uniforme.",
    "includes": [
      "Mano de obra calificada de instalación",
      "Preparación de base piso o muro (puntereo, galleteo o quemado superficial)",
      "Instalación según patrón y cantería indicada",
      "Fraguado técnico parejo y retiro de excedentes",
      "Instalación de topes de puertas rectos en accesos intervenidos"
    ],
    "notIncludes": [
      "Materiales e insumos (palmetas, cerámicos, adhesivo polimérico, fragüe)",
      "Reparación de preexistencias estructurales (filtraciones, grietas vivas o humedad)",
      "Retiro de revestimientos existentes o picado de losa mayor (se cotiza como partida adicional)",
      "Formatos especiales de gran dimensión mayores a 60 cm sin rectificación previa"
    ],
    "conditions": "Superficie base debe estar completamente desocupada, seca y nivelada. Mínimo de contratación general: 15 m². Sujeto a rectificación de medidas en terreno.",
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
    "description": "Servicio profesional de revestimiento y acabados para transformar pisos y muros con estándar de alta durabilidad y estética impecable. Especialidad: Servicio de Aplicación de Pintura Exterior por M2.",
    "caracteristicas": "Mano de obra especializada siguiendo estrictas normas técnicas y de nivelación. Contempla la preparación de la base, trazado, colocación milimétrica y fraguado uniforme.",
    "includes": [
      "Mano de obra calificada de instalación",
      "Preparación de base piso o muro (puntereo, galleteo o quemado superficial)",
      "Instalación según patrón y cantería indicada",
      "Fraguado técnico parejo y retiro de excedentes",
      "Instalación de topes de puertas rectos en accesos intervenidos"
    ],
    "notIncludes": [
      "Materiales e insumos (palmetas, cerámicos, adhesivo polimérico, fragüe)",
      "Reparación de preexistencias estructurales (filtraciones, grietas vivas o humedad)",
      "Retiro de revestimientos existentes o picado de losa mayor (se cotiza como partida adicional)",
      "Formatos especiales de gran dimensión mayores a 60 cm sin rectificación previa"
    ],
    "conditions": "Superficie base debe estar completamente desocupada, seca y nivelada. Mínimo de contratación general: 15 m². Sujeto a rectificación de medidas en terreno.",
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
    "description": "Ensamble e instalación experta de mobiliario en caja, clósets, pérgolas, quinchos y casetas exteriores garantizando estabilidad y calce perfecto. Especialidad: Servicio Armado de 1 Mueble.",
    "caracteristicas": "Personal calificado para armado según planos del fabricante. Contempla verificación de piezas, ensamble con herrajes apropiados, escuadrado, calibración y anclaje seguro.",
    "includes": [
      "Desempaque e inventario de piezas y herrajes",
      "Armado y ensamble estructural completo según plano técnico",
      "Calibración y cuadratura de puertas, bisagras y rieles telescópicos",
      "Fijación y anclaje de seguridad a muro en muebles altos o clósets",
      "Retiro y acopio ordenado del material de embalaje"
    ],
    "notIncludes": [
      "Mueble o producto en sí (debe estar en el lugar antes de la visita)",
      "Piezas defectuosas o faltantes de fábrica (se levanta reporte para garantía)",
      "Modificaciones estructurales, cortes o perforaciones a tableros de melamina",
      "Anclaje a muros de yeso-cartón sin estructura de refuerzo interior"
    ],
    "conditions": "El cliente debe disponer de un espacio despejado y techado de al menos 2x2 metros para trabajar. Pisos nivelados en caso de pérgolas y bodegas exteriores.",
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
    "description": "Ensamble e instalación experta de mobiliario en caja, clósets, pérgolas, quinchos y casetas exteriores garantizando estabilidad y calce perfecto. Especialidad: Servicio Armado de 2 a 3 Muebles.",
    "caracteristicas": "Personal calificado para armado según planos del fabricante. Contempla verificación de piezas, ensamble con herrajes apropiados, escuadrado, calibración y anclaje seguro.",
    "includes": [
      "Desempaque e inventario de piezas y herrajes",
      "Armado y ensamble estructural completo según plano técnico",
      "Calibración y cuadratura de puertas, bisagras y rieles telescópicos",
      "Fijación y anclaje de seguridad a muro en muebles altos o clósets",
      "Retiro y acopio ordenado del material de embalaje"
    ],
    "notIncludes": [
      "Mueble o producto en sí (debe estar en el lugar antes de la visita)",
      "Piezas defectuosas o faltantes de fábrica (se levanta reporte para garantía)",
      "Modificaciones estructurales, cortes o perforaciones a tableros de melamina",
      "Anclaje a muros de yeso-cartón sin estructura de refuerzo interior"
    ],
    "conditions": "El cliente debe disponer de un espacio despejado y techado de al menos 2x2 metros para trabajar. Pisos nivelados en caso de pérgolas y bodegas exteriores.",
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
    "description": "Ensamble e instalación experta de mobiliario en caja, clósets, pérgolas, quinchos y casetas exteriores garantizando estabilidad y calce perfecto. Especialidad: Servicio Armado de 4 a 6 Muebles.",
    "caracteristicas": "Personal calificado para armado según planos del fabricante. Contempla verificación de piezas, ensamble con herrajes apropiados, escuadrado, calibración y anclaje seguro.",
    "includes": [
      "Desempaque e inventario de piezas y herrajes",
      "Armado y ensamble estructural completo según plano técnico",
      "Calibración y cuadratura de puertas, bisagras y rieles telescópicos",
      "Fijación y anclaje de seguridad a muro en muebles altos o clósets",
      "Retiro y acopio ordenado del material de embalaje"
    ],
    "notIncludes": [
      "Mueble o producto en sí (debe estar en el lugar antes de la visita)",
      "Piezas defectuosas o faltantes de fábrica (se levanta reporte para garantía)",
      "Modificaciones estructurales, cortes o perforaciones a tableros de melamina",
      "Anclaje a muros de yeso-cartón sin estructura de refuerzo interior"
    ],
    "conditions": "El cliente debe disponer de un espacio despejado y techado de al menos 2x2 metros para trabajar. Pisos nivelados en caso de pérgolas y bodegas exteriores.",
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
    "description": "Ensamble e instalación experta de mobiliario en caja, clósets, pérgolas, quinchos y casetas exteriores garantizando estabilidad y calce perfecto. Especialidad: Servicio Armado closet desde 6 puertas.",
    "caracteristicas": "Personal calificado para armado según planos del fabricante. Contempla verificación de piezas, ensamble con herrajes apropiados, escuadrado, calibración y anclaje seguro.",
    "includes": [
      "Desempaque e inventario de piezas y herrajes",
      "Armado y ensamble estructural completo según plano técnico",
      "Calibración y cuadratura de puertas, bisagras y rieles telescópicos",
      "Fijación y anclaje de seguridad a muro en muebles altos o clósets",
      "Retiro y acopio ordenado del material de embalaje"
    ],
    "notIncludes": [
      "Mueble o producto en sí (debe estar en el lugar antes de la visita)",
      "Piezas defectuosas o faltantes de fábrica (se levanta reporte para garantía)",
      "Modificaciones estructurales, cortes o perforaciones a tableros de melamina",
      "Anclaje a muros de yeso-cartón sin estructura de refuerzo interior"
    ],
    "conditions": "El cliente debe disponer de un espacio despejado y techado de al menos 2x2 metros para trabajar. Pisos nivelados en caso de pérgolas y bodegas exteriores.",
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
    "description": "Ensamble e instalación experta de mobiliario en caja, clósets, pérgolas, quinchos y casetas exteriores garantizando estabilidad y calce perfecto. Especialidad: Servicio Armado de 1 Silla.",
    "caracteristicas": "Personal calificado para armado según planos del fabricante. Contempla verificación de piezas, ensamble con herrajes apropiados, escuadrado, calibración y anclaje seguro.",
    "includes": [
      "Desempaque e inventario de piezas y herrajes",
      "Armado y ensamble estructural completo según plano técnico",
      "Calibración y cuadratura de puertas, bisagras y rieles telescópicos",
      "Fijación y anclaje de seguridad a muro en muebles altos o clósets",
      "Retiro y acopio ordenado del material de embalaje"
    ],
    "notIncludes": [
      "Mueble o producto en sí (debe estar en el lugar antes de la visita)",
      "Piezas defectuosas o faltantes de fábrica (se levanta reporte para garantía)",
      "Modificaciones estructurales, cortes o perforaciones a tableros de melamina",
      "Anclaje a muros de yeso-cartón sin estructura de refuerzo interior"
    ],
    "conditions": "El cliente debe disponer de un espacio despejado y techado de al menos 2x2 metros para trabajar. Pisos nivelados en caso de pérgolas y bodegas exteriores.",
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
    "description": "Ensamble e instalación experta de mobiliario en caja, clósets, pérgolas, quinchos y casetas exteriores garantizando estabilidad y calce perfecto. Especialidad: Servicio Armado y Anclaje mueble de TV (no incluye soporte).",
    "caracteristicas": "Personal calificado para armado según planos del fabricante. Contempla verificación de piezas, ensamble con herrajes apropiados, escuadrado, calibración y anclaje seguro.",
    "includes": [
      "Desempaque e inventario de piezas y herrajes",
      "Armado y ensamble estructural completo según plano técnico",
      "Calibración y cuadratura de puertas, bisagras y rieles telescópicos",
      "Fijación y anclaje de seguridad a muro en muebles altos o clósets",
      "Retiro y acopio ordenado del material de embalaje"
    ],
    "notIncludes": [
      "Mueble o producto en sí (debe estar en el lugar antes de la visita)",
      "Piezas defectuosas o faltantes de fábrica (se levanta reporte para garantía)",
      "Modificaciones estructurales, cortes o perforaciones a tableros de melamina",
      "Anclaje a muros de yeso-cartón sin estructura de refuerzo interior"
    ],
    "conditions": "El cliente debe disponer de un espacio despejado y techado de al menos 2x2 metros para trabajar. Pisos nivelados en caso de pérgolas y bodegas exteriores.",
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
    "description": "Ensamble e instalación experta de mobiliario en caja, clósets, pérgolas, quinchos y casetas exteriores garantizando estabilidad y calce perfecto. Especialidad: Servicio Armado y Anclaje mueble de TV + Instalación de Soporte y TV.",
    "caracteristicas": "Personal calificado para armado según planos del fabricante. Contempla verificación de piezas, ensamble con herrajes apropiados, escuadrado, calibración y anclaje seguro.",
    "includes": [
      "Desempaque e inventario de piezas y herrajes",
      "Armado y ensamble estructural completo según plano técnico",
      "Calibración y cuadratura de puertas, bisagras y rieles telescópicos",
      "Fijación y anclaje de seguridad a muro en muebles altos o clósets",
      "Retiro y acopio ordenado del material de embalaje"
    ],
    "notIncludes": [
      "Mueble o producto en sí (debe estar en el lugar antes de la visita)",
      "Piezas defectuosas o faltantes de fábrica (se levanta reporte para garantía)",
      "Modificaciones estructurales, cortes o perforaciones a tableros de melamina",
      "Anclaje a muros de yeso-cartón sin estructura de refuerzo interior"
    ],
    "conditions": "El cliente debe disponer de un espacio despejado y techado de al menos 2x2 metros para trabajar. Pisos nivelados en caso de pérgolas y bodegas exteriores.",
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
    "description": "Ensamble e instalación experta de mobiliario en caja, clósets, pérgolas, quinchos y casetas exteriores garantizando estabilidad y calce perfecto. Especialidad: Servicio Armado y Anclaje 1 Mueble de Cocina Aéreo de 3 a 4 puertas.",
    "caracteristicas": "Personal calificado para armado según planos del fabricante. Contempla verificación de piezas, ensamble con herrajes apropiados, escuadrado, calibración y anclaje seguro.",
    "includes": [
      "Desempaque e inventario de piezas y herrajes",
      "Armado y ensamble estructural completo según plano técnico",
      "Calibración y cuadratura de puertas, bisagras y rieles telescópicos",
      "Fijación y anclaje de seguridad a muro en muebles altos o clósets",
      "Retiro y acopio ordenado del material de embalaje"
    ],
    "notIncludes": [
      "Mueble o producto en sí (debe estar en el lugar antes de la visita)",
      "Piezas defectuosas o faltantes de fábrica (se levanta reporte para garantía)",
      "Modificaciones estructurales, cortes o perforaciones a tableros de melamina",
      "Anclaje a muros de yeso-cartón sin estructura de refuerzo interior"
    ],
    "conditions": "El cliente debe disponer de un espacio despejado y techado de al menos 2x2 metros para trabajar. Pisos nivelados en caso de pérgolas y bodegas exteriores.",
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
    "description": "Ensamble e instalación experta de mobiliario en caja, clósets, pérgolas, quinchos y casetas exteriores garantizando estabilidad y calce perfecto. Especialidad: Servicio Armado e Instalación Kit Mueble de Lavaplatos.",
    "caracteristicas": "Personal calificado para armado según planos del fabricante. Contempla verificación de piezas, ensamble con herrajes apropiados, escuadrado, calibración y anclaje seguro.",
    "includes": [
      "Desempaque e inventario de piezas y herrajes",
      "Armado y ensamble estructural completo según plano técnico",
      "Calibración y cuadratura de puertas, bisagras y rieles telescópicos",
      "Fijación y anclaje de seguridad a muro en muebles altos o clósets",
      "Retiro y acopio ordenado del material de embalaje"
    ],
    "notIncludes": [
      "Mueble o producto en sí (debe estar en el lugar antes de la visita)",
      "Piezas defectuosas o faltantes de fábrica (se levanta reporte para garantía)",
      "Modificaciones estructurales, cortes o perforaciones a tableros de melamina",
      "Anclaje a muros de yeso-cartón sin estructura de refuerzo interior"
    ],
    "conditions": "El cliente debe disponer de un espacio despejado y techado de al menos 2x2 metros para trabajar. Pisos nivelados en caso de pérgolas y bodegas exteriores.",
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
    "description": "Ensamble e instalación experta de mobiliario en caja, clósets, pérgolas, quinchos y casetas exteriores garantizando estabilidad y calce perfecto. Especialidad: Servicio Armado Bodega (precio normal hasta $400.000).",
    "caracteristicas": "Personal calificado para armado según planos del fabricante. Contempla verificación de piezas, ensamble con herrajes apropiados, escuadrado, calibración y anclaje seguro.",
    "includes": [
      "Desempaque e inventario de piezas y herrajes",
      "Armado y ensamble estructural completo según plano técnico",
      "Calibración y cuadratura de puertas, bisagras y rieles telescópicos",
      "Fijación y anclaje de seguridad a muro en muebles altos o clósets",
      "Retiro y acopio ordenado del material de embalaje"
    ],
    "notIncludes": [
      "Mueble o producto en sí (debe estar en el lugar antes de la visita)",
      "Piezas defectuosas o faltantes de fábrica (se levanta reporte para garantía)",
      "Modificaciones estructurales, cortes o perforaciones a tableros de melamina",
      "Anclaje a muros de yeso-cartón sin estructura de refuerzo interior"
    ],
    "conditions": "El cliente debe disponer de un espacio despejado y techado de al menos 2x2 metros para trabajar. Pisos nivelados en caso de pérgolas y bodegas exteriores.",
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
    "description": "Ensamble e instalación experta de mobiliario en caja, clósets, pérgolas, quinchos y casetas exteriores garantizando estabilidad y calce perfecto. Especialidad: Servicio Armado de Terraza.",
    "caracteristicas": "Personal calificado para armado según planos del fabricante. Contempla verificación de piezas, ensamble con herrajes apropiados, escuadrado, calibración y anclaje seguro.",
    "includes": [
      "Desempaque e inventario de piezas y herrajes",
      "Armado y ensamble estructural completo según plano técnico",
      "Calibración y cuadratura de puertas, bisagras y rieles telescópicos",
      "Fijación y anclaje de seguridad a muro en muebles altos o clósets",
      "Retiro y acopio ordenado del material de embalaje"
    ],
    "notIncludes": [
      "Mueble o producto en sí (debe estar en el lugar antes de la visita)",
      "Piezas defectuosas o faltantes de fábrica (se levanta reporte para garantía)",
      "Modificaciones estructurales, cortes o perforaciones a tableros de melamina",
      "Anclaje a muros de yeso-cartón sin estructura de refuerzo interior"
    ],
    "conditions": "El cliente debe disponer de un espacio despejado y techado de al menos 2x2 metros para trabajar. Pisos nivelados en caso de pérgolas y bodegas exteriores.",
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
    "description": "Ensamble e instalación experta de mobiliario en caja, clósets, pérgolas, quinchos y casetas exteriores garantizando estabilidad y calce perfecto. Especialidad: Servicio de Armado de Pérgola (precio producto hasta $149.990).",
    "caracteristicas": "Personal calificado para armado según planos del fabricante. Contempla verificación de piezas, ensamble con herrajes apropiados, escuadrado, calibración y anclaje seguro.",
    "includes": [
      "Desempaque e inventario de piezas y herrajes",
      "Armado y ensamble estructural completo según plano técnico",
      "Calibración y cuadratura de puertas, bisagras y rieles telescópicos",
      "Fijación y anclaje de seguridad a muro en muebles altos o clósets",
      "Retiro y acopio ordenado del material de embalaje"
    ],
    "notIncludes": [
      "Mueble o producto en sí (debe estar en el lugar antes de la visita)",
      "Piezas defectuosas o faltantes de fábrica (se levanta reporte para garantía)",
      "Modificaciones estructurales, cortes o perforaciones a tableros de melamina",
      "Anclaje a muros de yeso-cartón sin estructura de refuerzo interior"
    ],
    "conditions": "Requiere superficie firme (radier de concreto o estructura apta para anclaje). Área despejada para trabajo.",
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
    "description": "Ensamble e instalación experta de mobiliario en caja, clósets, pérgolas, quinchos y casetas exteriores garantizando estabilidad y calce perfecto. Especialidad: Servicio de Armado de Pérgola (precio producto entre $150.000 y $199.990).",
    "caracteristicas": "Personal calificado para armado según planos del fabricante. Contempla verificación de piezas, ensamble con herrajes apropiados, escuadrado, calibración y anclaje seguro.",
    "includes": [
      "Desempaque e inventario de piezas y herrajes",
      "Armado y ensamble estructural completo según plano técnico",
      "Calibración y cuadratura de puertas, bisagras y rieles telescópicos",
      "Fijación y anclaje de seguridad a muro en muebles altos o clósets",
      "Retiro y acopio ordenado del material de embalaje"
    ],
    "notIncludes": [
      "Mueble o producto en sí (debe estar en el lugar antes de la visita)",
      "Piezas defectuosas o faltantes de fábrica (se levanta reporte para garantía)",
      "Modificaciones estructurales, cortes o perforaciones a tableros de melamina",
      "Anclaje a muros de yeso-cartón sin estructura de refuerzo interior"
    ],
    "conditions": "Requiere superficie firme (radier de concreto o estructura apta para anclaje). Área despejada para trabajo.",
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
    "description": "Ensamble e instalación experta de mobiliario en caja, clósets, pérgolas, quinchos y casetas exteriores garantizando estabilidad y calce perfecto. Especialidad: Servicio de Armado de Pérgola (precio producto entre $200.000 y $499.990).",
    "caracteristicas": "Personal calificado para armado según planos del fabricante. Contempla verificación de piezas, ensamble con herrajes apropiados, escuadrado, calibración y anclaje seguro.",
    "includes": [
      "Desempaque e inventario de piezas y herrajes",
      "Armado y ensamble estructural completo según plano técnico",
      "Calibración y cuadratura de puertas, bisagras y rieles telescópicos",
      "Fijación y anclaje de seguridad a muro en muebles altos o clósets",
      "Retiro y acopio ordenado del material de embalaje"
    ],
    "notIncludes": [
      "Mueble o producto en sí (debe estar en el lugar antes de la visita)",
      "Piezas defectuosas o faltantes de fábrica (se levanta reporte para garantía)",
      "Modificaciones estructurales, cortes o perforaciones a tableros de melamina",
      "Anclaje a muros de yeso-cartón sin estructura de refuerzo interior"
    ],
    "conditions": "Requiere superficie firme (radier de concreto o estructura apta para anclaje). Área despejada para trabajo.",
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
    "description": "Ensamble e instalación experta de mobiliario en caja, clósets, pérgolas, quinchos y casetas exteriores garantizando estabilidad y calce perfecto. Especialidad: Servicio de Armado de quitasol.",
    "caracteristicas": "Personal calificado para armado según planos del fabricante. Contempla verificación de piezas, ensamble con herrajes apropiados, escuadrado, calibración y anclaje seguro.",
    "includes": [
      "Desempaque e inventario de piezas y herrajes",
      "Armado y ensamble estructural completo según plano técnico",
      "Calibración y cuadratura de puertas, bisagras y rieles telescópicos",
      "Fijación y anclaje de seguridad a muro en muebles altos o clósets",
      "Retiro y acopio ordenado del material de embalaje"
    ],
    "notIncludes": [
      "Mueble o producto en sí (debe estar en el lugar antes de la visita)",
      "Piezas defectuosas o faltantes de fábrica (se levanta reporte para garantía)",
      "Modificaciones estructurales, cortes o perforaciones a tableros de melamina",
      "Anclaje a muros de yeso-cartón sin estructura de refuerzo interior"
    ],
    "conditions": "El cliente debe disponer de un espacio despejado y techado de al menos 2x2 metros para trabajar. Pisos nivelados en caso de pérgolas y bodegas exteriores.",
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
    "description": "Ensamble e instalación experta de mobiliario en caja, clósets, pérgolas, quinchos y casetas exteriores garantizando estabilidad y calce perfecto. Especialidad: Servicio de Armado de parrilla.",
    "caracteristicas": "Personal calificado para armado según planos del fabricante. Contempla verificación de piezas, ensamble con herrajes apropiados, escuadrado, calibración y anclaje seguro.",
    "includes": [
      "Desempaque e inventario de piezas y herrajes",
      "Armado y ensamble estructural completo según plano técnico",
      "Calibración y cuadratura de puertas, bisagras y rieles telescópicos",
      "Fijación y anclaje de seguridad a muro en muebles altos o clósets",
      "Retiro y acopio ordenado del material de embalaje"
    ],
    "notIncludes": [
      "Mueble o producto en sí (debe estar en el lugar antes de la visita)",
      "Piezas defectuosas o faltantes de fábrica (se levanta reporte para garantía)",
      "Modificaciones estructurales, cortes o perforaciones a tableros de melamina",
      "Anclaje a muros de yeso-cartón sin estructura de refuerzo interior"
    ],
    "conditions": "El cliente debe disponer de un espacio despejado y techado de al menos 2x2 metros para trabajar. Pisos nivelados en caso de pérgolas y bodegas exteriores.",
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
    "description": "Ensamble e instalación experta de mobiliario en caja, clósets, pérgolas, quinchos y casetas exteriores garantizando estabilidad y calce perfecto. Especialidad: Servicio Armado de piscina estructural menor a 3.500 L.",
    "caracteristicas": "Personal calificado para armado según planos del fabricante. Contempla verificación de piezas, ensamble con herrajes apropiados, escuadrado, calibración y anclaje seguro.",
    "includes": [
      "Desempaque e inventario de piezas y herrajes",
      "Armado y ensamble estructural completo según plano técnico",
      "Calibración y cuadratura de puertas, bisagras y rieles telescópicos",
      "Fijación y anclaje de seguridad a muro en muebles altos o clósets",
      "Retiro y acopio ordenado del material de embalaje"
    ],
    "notIncludes": [
      "Mueble o producto en sí (debe estar en el lugar antes de la visita)",
      "Piezas defectuosas o faltantes de fábrica (se levanta reporte para garantía)",
      "Modificaciones estructurales, cortes o perforaciones a tableros de melamina",
      "Anclaje a muros de yeso-cartón sin estructura de refuerzo interior"
    ],
    "conditions": "El cliente debe disponer de un espacio despejado y techado de al menos 2x2 metros para trabajar. Pisos nivelados en caso de pérgolas y bodegas exteriores.",
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
    "description": "Ensamble e instalación experta de mobiliario en caja, clósets, pérgolas, quinchos y casetas exteriores garantizando estabilidad y calce perfecto. Especialidad: Servicio Armado de piscina estructural entre 3.500 y 15.000 L.",
    "caracteristicas": "Personal calificado para armado según planos del fabricante. Contempla verificación de piezas, ensamble con herrajes apropiados, escuadrado, calibración y anclaje seguro.",
    "includes": [
      "Desempaque e inventario de piezas y herrajes",
      "Armado y ensamble estructural completo según plano técnico",
      "Calibración y cuadratura de puertas, bisagras y rieles telescópicos",
      "Fijación y anclaje de seguridad a muro en muebles altos o clósets",
      "Retiro y acopio ordenado del material de embalaje"
    ],
    "notIncludes": [
      "Mueble o producto en sí (debe estar en el lugar antes de la visita)",
      "Piezas defectuosas o faltantes de fábrica (se levanta reporte para garantía)",
      "Modificaciones estructurales, cortes o perforaciones a tableros de melamina",
      "Anclaje a muros de yeso-cartón sin estructura de refuerzo interior"
    ],
    "conditions": "El cliente debe disponer de un espacio despejado y techado de al menos 2x2 metros para trabajar. Pisos nivelados en caso de pérgolas y bodegas exteriores.",
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
    "description": "Ensamble e instalación experta de mobiliario en caja, clósets, pérgolas, quinchos y casetas exteriores garantizando estabilidad y calce perfecto. Especialidad: Armado de equipo de fitness.",
    "caracteristicas": "Personal calificado para armado según planos del fabricante. Contempla verificación de piezas, ensamble con herrajes apropiados, escuadrado, calibración y anclaje seguro.",
    "includes": [
      "Desempaque e inventario de piezas y herrajes",
      "Armado y ensamble estructural completo según plano técnico",
      "Calibración y cuadratura de puertas, bisagras y rieles telescópicos",
      "Fijación y anclaje de seguridad a muro en muebles altos o clósets",
      "Retiro y acopio ordenado del material de embalaje"
    ],
    "notIncludes": [
      "Mueble o producto en sí (debe estar en el lugar antes de la visita)",
      "Piezas defectuosas o faltantes de fábrica (se levanta reporte para garantía)",
      "Modificaciones estructurales, cortes o perforaciones a tableros de melamina",
      "Anclaje a muros de yeso-cartón sin estructura de refuerzo interior"
    ],
    "conditions": "El cliente debe disponer de un espacio despejado y techado de al menos 2x2 metros para trabajar. Pisos nivelados en caso de pérgolas y bodegas exteriores.",
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
    "badge": "Técnico Especializado",
    "description": "Montaje, empotrado y conexión técnica de equipos de climatización, cocinas y electrodomésticos residenciales bajo rigurosos protocolos de seguridad. Especialidad: Servicio Instalación Aire Acondicionado Split.",
    "caracteristicas": "Ejecución por técnicos calificados. Contempla verificación de puntos de conexión, fijación antivibración, sellados térmicos y pruebas funcionales de operación.",
    "includes": [
      "Montaje, calce y fijación nivelada del equipo",
      "Conexión a redes existentes de electricidad, agua o ductos de ventilación",
      "En climatización: hasta 3m de cañería aislada, vacío del sistema con bomba y soportes",
      "Pruebas de estanqueidad, encendido y puesta en marcha",
      "Inducción básica de uso y recomendaciones operativas al cliente"
    ],
    "notIncludes": [
      "Aparato o electrodoméstico (cocina, campana, split, lavavajillas)",
      "Instalación de circuitos eléctricos nuevos o aumento de capacidad en tablero TDA",
      "Metros adicionales de tubería o canalización sobre la extensión estándar",
      "Trabajos en fachadas de altura que demanden cuerdas o andamios certificados"
    ],
    "conditions": "Las conexiones eléctricas, de gas y sanitarias deben estar operativas y normalizadas a menos de 1,2 metros de la ubicación final del equipo.",
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
    "badge": "Técnico Especializado",
    "description": "Montaje, empotrado y conexión técnica de equipos de climatización, cocinas y electrodomésticos residenciales bajo rigurosos protocolos de seguridad. Especialidad: Mantención de Aire Acondicionado Split.",
    "caracteristicas": "Ejecución por técnicos calificados. Contempla verificación de puntos de conexión, fijación antivibración, sellados térmicos y pruebas funcionales de operación.",
    "includes": [
      "Montaje, calce y fijación nivelada del equipo",
      "Conexión a redes existentes de electricidad, agua o ductos de ventilación",
      "En climatización: hasta 3m de cañería aislada, vacío del sistema con bomba y soportes",
      "Pruebas de estanqueidad, encendido y puesta en marcha",
      "Inducción básica de uso y recomendaciones operativas al cliente"
    ],
    "notIncludes": [
      "Aparato o electrodoméstico (cocina, campana, split, lavavajillas)",
      "Instalación de circuitos eléctricos nuevos o aumento de capacidad en tablero TDA",
      "Metros adicionales de tubería o canalización sobre la extensión estándar",
      "Trabajos en fachadas de altura que demanden cuerdas o andamios certificados"
    ],
    "conditions": "Las conexiones eléctricas, de gas y sanitarias deben estar operativas y normalizadas a menos de 1,2 metros de la ubicación final del equipo.",
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
    "badge": "Técnico Especializado",
    "description": "Montaje, empotrado y conexión técnica de equipos de climatización, cocinas y electrodomésticos residenciales bajo rigurosos protocolos de seguridad. Especialidad: Servicio Instalación Campana convencional.",
    "caracteristicas": "Ejecución por técnicos calificados. Contempla verificación de puntos de conexión, fijación antivibración, sellados térmicos y pruebas funcionales de operación.",
    "includes": [
      "Montaje, calce y fijación nivelada del equipo",
      "Conexión a redes existentes de electricidad, agua o ductos de ventilación",
      "En climatización: hasta 3m de cañería aislada, vacío del sistema con bomba y soportes",
      "Pruebas de estanqueidad, encendido y puesta en marcha",
      "Inducción básica de uso y recomendaciones operativas al cliente"
    ],
    "notIncludes": [
      "Aparato o electrodoméstico (cocina, campana, split, lavavajillas)",
      "Instalación de circuitos eléctricos nuevos o aumento de capacidad en tablero TDA",
      "Metros adicionales de tubería o canalización sobre la extensión estándar",
      "Trabajos en fachadas de altura que demanden cuerdas o andamios certificados"
    ],
    "conditions": "Las conexiones eléctricas, de gas y sanitarias deben estar operativas y normalizadas a menos de 1,2 metros de la ubicación final del equipo.",
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
    "badge": "Técnico Especializado",
    "description": "Montaje, empotrado y conexión técnica de equipos de climatización, cocinas y electrodomésticos residenciales bajo rigurosos protocolos de seguridad. Especialidad: Servicio Instalación de 1 Lavadora o Secadora.",
    "caracteristicas": "Ejecución por técnicos calificados. Contempla verificación de puntos de conexión, fijación antivibración, sellados térmicos y pruebas funcionales de operación.",
    "includes": [
      "Montaje, calce y fijación nivelada del equipo",
      "Conexión a redes existentes de electricidad, agua o ductos de ventilación",
      "En climatización: hasta 3m de cañería aislada, vacío del sistema con bomba y soportes",
      "Pruebas de estanqueidad, encendido y puesta en marcha",
      "Inducción básica de uso y recomendaciones operativas al cliente"
    ],
    "notIncludes": [
      "Aparato o electrodoméstico (cocina, campana, split, lavavajillas)",
      "Instalación de circuitos eléctricos nuevos o aumento de capacidad en tablero TDA",
      "Metros adicionales de tubería o canalización sobre la extensión estándar",
      "Trabajos en fachadas de altura que demanden cuerdas o andamios certificados"
    ],
    "conditions": "Las conexiones eléctricas, de gas y sanitarias deben estar operativas y normalizadas a menos de 1,2 metros de la ubicación final del equipo.",
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
    "badge": "Técnico Especializado",
    "description": "Montaje, empotrado y conexión técnica de equipos de climatización, cocinas y electrodomésticos residenciales bajo rigurosos protocolos de seguridad. Especialidad: Servicio de Instalación de Cocina convencional.",
    "caracteristicas": "Ejecución por técnicos calificados. Contempla verificación de puntos de conexión, fijación antivibración, sellados térmicos y pruebas funcionales de operación.",
    "includes": [
      "Montaje, calce y fijación nivelada del equipo",
      "Conexión a redes existentes de electricidad, agua o ductos de ventilación",
      "En climatización: hasta 3m de cañería aislada, vacío del sistema con bomba y soportes",
      "Pruebas de estanqueidad, encendido y puesta en marcha",
      "Inducción básica de uso y recomendaciones operativas al cliente"
    ],
    "notIncludes": [
      "Aparato o electrodoméstico (cocina, campana, split, lavavajillas)",
      "Instalación de circuitos eléctricos nuevos o aumento de capacidad en tablero TDA",
      "Metros adicionales de tubería o canalización sobre la extensión estándar",
      "Trabajos en fachadas de altura que demanden cuerdas o andamios certificados"
    ],
    "conditions": "Las conexiones eléctricas, de gas y sanitarias deben estar operativas y normalizadas a menos de 1,2 metros de la ubicación final del equipo.",
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
    "badge": "Técnico Especializado",
    "description": "Montaje, empotrado y conexión técnica de equipos de climatización, cocinas y electrodomésticos residenciales bajo rigurosos protocolos de seguridad. Especialidad: Servicio de Instalación de cocina encimera.",
    "caracteristicas": "Ejecución por técnicos calificados. Contempla verificación de puntos de conexión, fijación antivibración, sellados térmicos y pruebas funcionales de operación.",
    "includes": [
      "Montaje, calce y fijación nivelada del equipo",
      "Conexión a redes existentes de electricidad, agua o ductos de ventilación",
      "En climatización: hasta 3m de cañería aislada, vacío del sistema con bomba y soportes",
      "Pruebas de estanqueidad, encendido y puesta en marcha",
      "Inducción básica de uso y recomendaciones operativas al cliente"
    ],
    "notIncludes": [
      "Aparato o electrodoméstico (cocina, campana, split, lavavajillas)",
      "Instalación de circuitos eléctricos nuevos o aumento de capacidad en tablero TDA",
      "Metros adicionales de tubería o canalización sobre la extensión estándar",
      "Trabajos en fachadas de altura que demanden cuerdas o andamios certificados"
    ],
    "conditions": "Las conexiones eléctricas, de gas y sanitarias deben estar operativas y normalizadas a menos de 1,2 metros de la ubicación final del equipo.",
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
    "badge": "Técnico Especializado",
    "description": "Montaje, empotrado y conexión técnica de equipos de climatización, cocinas y electrodomésticos residenciales bajo rigurosos protocolos de seguridad. Especialidad: Servicio de Instalación de horno / microondas empotrado.",
    "caracteristicas": "Ejecución por técnicos calificados. Contempla verificación de puntos de conexión, fijación antivibración, sellados térmicos y pruebas funcionales de operación.",
    "includes": [
      "Montaje, calce y fijación nivelada del equipo",
      "Conexión a redes existentes de electricidad, agua o ductos de ventilación",
      "En climatización: hasta 3m de cañería aislada, vacío del sistema con bomba y soportes",
      "Pruebas de estanqueidad, encendido y puesta en marcha",
      "Inducción básica de uso y recomendaciones operativas al cliente"
    ],
    "notIncludes": [
      "Aparato o electrodoméstico (cocina, campana, split, lavavajillas)",
      "Instalación de circuitos eléctricos nuevos o aumento de capacidad en tablero TDA",
      "Metros adicionales de tubería o canalización sobre la extensión estándar",
      "Trabajos en fachadas de altura que demanden cuerdas o andamios certificados"
    ],
    "conditions": "Las conexiones eléctricas, de gas y sanitarias deben estar operativas y normalizadas a menos de 1,2 metros de la ubicación final del equipo.",
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
    "badge": "Técnico Especializado",
    "description": "Montaje, empotrado y conexión técnica de equipos de climatización, cocinas y electrodomésticos residenciales bajo rigurosos protocolos de seguridad. Especialidad: Servicio Instalación de Lavavajillas.",
    "caracteristicas": "Ejecución por técnicos calificados. Contempla verificación de puntos de conexión, fijación antivibración, sellados térmicos y pruebas funcionales de operación.",
    "includes": [
      "Montaje, calce y fijación nivelada del equipo",
      "Conexión a redes existentes de electricidad, agua o ductos de ventilación",
      "En climatización: hasta 3m de cañería aislada, vacío del sistema con bomba y soportes",
      "Pruebas de estanqueidad, encendido y puesta en marcha",
      "Inducción básica de uso y recomendaciones operativas al cliente"
    ],
    "notIncludes": [
      "Aparato o electrodoméstico (cocina, campana, split, lavavajillas)",
      "Instalación de circuitos eléctricos nuevos o aumento de capacidad en tablero TDA",
      "Metros adicionales de tubería o canalización sobre la extensión estándar",
      "Trabajos en fachadas de altura que demanden cuerdas o andamios certificados"
    ],
    "conditions": "Las conexiones eléctricas, de gas y sanitarias deben estar operativas y normalizadas a menos de 1,2 metros de la ubicación final del equipo.",
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
    "badge": "Técnico Especializado",
    "description": "Montaje, empotrado y conexión técnica de equipos de climatización, cocinas y electrodomésticos residenciales bajo rigurosos protocolos de seguridad. Especialidad: Servicio de Instalación Encimera, Campana y Horno (Combo Trío).",
    "caracteristicas": "Ejecución por técnicos calificados. Contempla verificación de puntos de conexión, fijación antivibración, sellados térmicos y pruebas funcionales de operación.",
    "includes": [
      "Montaje, calce y fijación nivelada del equipo",
      "Conexión a redes existentes de electricidad, agua o ductos de ventilación",
      "En climatización: hasta 3m de cañería aislada, vacío del sistema con bomba y soportes",
      "Pruebas de estanqueidad, encendido y puesta en marcha",
      "Inducción básica de uso y recomendaciones operativas al cliente"
    ],
    "notIncludes": [
      "Aparato o electrodoméstico (cocina, campana, split, lavavajillas)",
      "Instalación de circuitos eléctricos nuevos o aumento de capacidad en tablero TDA",
      "Metros adicionales de tubería o canalización sobre la extensión estándar",
      "Trabajos en fachadas de altura que demanden cuerdas o andamios certificados"
    ],
    "conditions": "Las conexiones eléctricas, de gas y sanitarias deben estar operativas y normalizadas a menos de 1,2 metros de la ubicación final del equipo.",
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
    "badge": "Técnico Especializado",
    "description": "Montaje, empotrado y conexión técnica de equipos de climatización, cocinas y electrodomésticos residenciales bajo rigurosos protocolos de seguridad. Especialidad: Servicio de Instalación de Ventilador de techo.",
    "caracteristicas": "Ejecución por técnicos calificados. Contempla verificación de puntos de conexión, fijación antivibración, sellados térmicos y pruebas funcionales de operación.",
    "includes": [
      "Montaje, calce y fijación nivelada del equipo",
      "Conexión a redes existentes de electricidad, agua o ductos de ventilación",
      "En climatización: hasta 3m de cañería aislada, vacío del sistema con bomba y soportes",
      "Pruebas de estanqueidad, encendido y puesta en marcha",
      "Inducción básica de uso y recomendaciones operativas al cliente"
    ],
    "notIncludes": [
      "Aparato o electrodoméstico (cocina, campana, split, lavavajillas)",
      "Instalación de circuitos eléctricos nuevos o aumento de capacidad en tablero TDA",
      "Metros adicionales de tubería o canalización sobre la extensión estándar",
      "Trabajos en fachadas de altura que demanden cuerdas o andamios certificados"
    ],
    "conditions": "Las conexiones eléctricas, de gas y sanitarias deben estar operativas y normalizadas a menos de 1,2 metros de la ubicación final del equipo.",
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
    "badge": "Técnico Especializado",
    "description": "Montaje, empotrado y conexión técnica de equipos de climatización, cocinas y electrodomésticos residenciales bajo rigurosos protocolos de seguridad. Especialidad: Servicio Instalación de 1 Lámpara.",
    "caracteristicas": "Ejecución por técnicos calificados. Contempla verificación de puntos de conexión, fijación antivibración, sellados térmicos y pruebas funcionales de operación.",
    "includes": [
      "Montaje, calce y fijación nivelada del equipo",
      "Conexión a redes existentes de electricidad, agua o ductos de ventilación",
      "En climatización: hasta 3m de cañería aislada, vacío del sistema con bomba y soportes",
      "Pruebas de estanqueidad, encendido y puesta en marcha",
      "Inducción básica de uso y recomendaciones operativas al cliente"
    ],
    "notIncludes": [
      "Aparato o electrodoméstico (cocina, campana, split, lavavajillas)",
      "Instalación de circuitos eléctricos nuevos o aumento de capacidad en tablero TDA",
      "Metros adicionales de tubería o canalización sobre la extensión estándar",
      "Trabajos en fachadas de altura que demanden cuerdas o andamios certificados"
    ],
    "conditions": "Las conexiones eléctricas, de gas y sanitarias deben estar operativas y normalizadas a menos de 1,2 metros de la ubicación final del equipo.",
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
    "description": "Instalación y mantención de sistemas de producción de agua caliente y calefacción a leña/pellet cumpliendo estrictamente con la normativa SEC. Especialidad: Servicio de Instalación de Calefon Tiro Natural.",
    "caracteristicas": "Instaladores certificados SEC. Protocolos rigurosos de estanqueidad de gas, evacuación de gases de combustión mediante ductos concéntricos o cañones aislados.",
    "includes": [
      "Fijación y anclaje reforzado del artefacto a muro estructural",
      "Conexión a red de gas/eléctrica y agua mediante flexibles normados",
      "Instalación de ductos de tiro (natural o concéntrico de tiro forzado)",
      "Pruebas con manómetro de hermeticidad y detección de fugas",
      "Puesta en marcha, calibración de llama y verificación de seguridades"
    ],
    "notIncludes": [
      "Artefacto térmico (calefón, termo, estufa a pellet o leña)",
      "Modificación o extensión de redes matrices de gas de la vivienda",
      "Cañones o kits de evacuación adicionales para entrepisos o techos especiales",
      "Tramitación de sello verde o certificados de regularización general SEC"
    ],
    "conditions": "Debe existir red de agua y gas habilitada en la zona de instalación. En estufas de leña/pellet se debe verificar espacio libre de seguridad contra materiales inflamables.",
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
    "description": "Instalación y mantención de sistemas de producción de agua caliente y calefacción a leña/pellet cumpliendo estrictamente con la normativa SEC. Especialidad: Servicio de Instalación de Calefon Tiro Forzado.",
    "caracteristicas": "Instaladores certificados SEC. Protocolos rigurosos de estanqueidad de gas, evacuación de gases de combustión mediante ductos concéntricos o cañones aislados.",
    "includes": [
      "Fijación y anclaje reforzado del artefacto a muro estructural",
      "Conexión a red de gas/eléctrica y agua mediante flexibles normados",
      "Instalación de ductos de tiro (natural o concéntrico de tiro forzado)",
      "Pruebas con manómetro de hermeticidad y detección de fugas",
      "Puesta en marcha, calibración de llama y verificación de seguridades"
    ],
    "notIncludes": [
      "Artefacto térmico (calefón, termo, estufa a pellet o leña)",
      "Modificación o extensión de redes matrices de gas de la vivienda",
      "Cañones o kits de evacuación adicionales para entrepisos o techos especiales",
      "Tramitación de sello verde o certificados de regularización general SEC"
    ],
    "conditions": "Debe existir red de agua y gas habilitada en la zona de instalación. En estufas de leña/pellet se debe verificar espacio libre de seguridad contra materiales inflamables.",
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
    "description": "Instalación y mantención de sistemas de producción de agua caliente y calefacción a leña/pellet cumpliendo estrictamente con la normativa SEC. Especialidad: Servicio de Instalación de Termo Eléctrico.",
    "caracteristicas": "Instaladores certificados SEC. Protocolos rigurosos de estanqueidad de gas, evacuación de gases de combustión mediante ductos concéntricos o cañones aislados.",
    "includes": [
      "Fijación y anclaje reforzado del artefacto a muro estructural",
      "Conexión a red de gas/eléctrica y agua mediante flexibles normados",
      "Instalación de ductos de tiro (natural o concéntrico de tiro forzado)",
      "Pruebas con manómetro de hermeticidad y detección de fugas",
      "Puesta en marcha, calibración de llama y verificación de seguridades"
    ],
    "notIncludes": [
      "Artefacto térmico (calefón, termo, estufa a pellet o leña)",
      "Modificación o extensión de redes matrices de gas de la vivienda",
      "Cañones o kits de evacuación adicionales para entrepisos o techos especiales",
      "Tramitación de sello verde o certificados de regularización general SEC"
    ],
    "conditions": "Debe existir red de agua y gas habilitada en la zona de instalación. En estufas de leña/pellet se debe verificar espacio libre de seguridad contra materiales inflamables.",
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
    "description": "Instalación y mantención de sistemas de producción de agua caliente y calefacción a leña/pellet cumpliendo estrictamente con la normativa SEC. Especialidad: Servicio de Instalación de Calefactor a Pellet Amesti en Casa 1 Piso.",
    "caracteristicas": "Instaladores certificados SEC. Protocolos rigurosos de estanqueidad de gas, evacuación de gases de combustión mediante ductos concéntricos o cañones aislados.",
    "includes": [
      "Fijación y anclaje reforzado del artefacto a muro estructural",
      "Conexión a red de gas/eléctrica y agua mediante flexibles normados",
      "Instalación de ductos de tiro (natural o concéntrico de tiro forzado)",
      "Pruebas con manómetro de hermeticidad y detección de fugas",
      "Puesta en marcha, calibración de llama y verificación de seguridades"
    ],
    "notIncludes": [
      "Artefacto térmico (calefón, termo, estufa a pellet o leña)",
      "Modificación o extensión de redes matrices de gas de la vivienda",
      "Cañones o kits de evacuación adicionales para entrepisos o techos especiales",
      "Tramitación de sello verde o certificados de regularización general SEC"
    ],
    "conditions": "Debe existir red de agua y gas habilitada en la zona de instalación. En estufas de leña/pellet se debe verificar espacio libre de seguridad contra materiales inflamables.",
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
    "description": "Instalación y mantención de sistemas de producción de agua caliente y calefacción a leña/pellet cumpliendo estrictamente con la normativa SEC. Especialidad: Servicio de Instalación de Calefactor a Pellet Bosca en Casa 1 Piso.",
    "caracteristicas": "Instaladores certificados SEC. Protocolos rigurosos de estanqueidad de gas, evacuación de gases de combustión mediante ductos concéntricos o cañones aislados.",
    "includes": [
      "Fijación y anclaje reforzado del artefacto a muro estructural",
      "Conexión a red de gas/eléctrica y agua mediante flexibles normados",
      "Instalación de ductos de tiro (natural o concéntrico de tiro forzado)",
      "Pruebas con manómetro de hermeticidad y detección de fugas",
      "Puesta en marcha, calibración de llama y verificación de seguridades"
    ],
    "notIncludes": [
      "Artefacto térmico (calefón, termo, estufa a pellet o leña)",
      "Modificación o extensión de redes matrices de gas de la vivienda",
      "Cañones o kits de evacuación adicionales para entrepisos o techos especiales",
      "Tramitación de sello verde o certificados de regularización general SEC"
    ],
    "conditions": "Debe existir red de agua y gas habilitada en la zona de instalación. En estufas de leña/pellet se debe verificar espacio libre de seguridad contra materiales inflamables.",
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
    "description": "Instalación y mantención de sistemas de producción de agua caliente y calefacción a leña/pellet cumpliendo estrictamente con la normativa SEC. Especialidad: Servicio de Instalación de Calefactor a Pellet Bosca en Casa 2 Pisos.",
    "caracteristicas": "Instaladores certificados SEC. Protocolos rigurosos de estanqueidad de gas, evacuación de gases de combustión mediante ductos concéntricos o cañones aislados.",
    "includes": [
      "Fijación y anclaje reforzado del artefacto a muro estructural",
      "Conexión a red de gas/eléctrica y agua mediante flexibles normados",
      "Instalación de ductos de tiro (natural o concéntrico de tiro forzado)",
      "Pruebas con manómetro de hermeticidad y detección de fugas",
      "Puesta en marcha, calibración de llama y verificación de seguridades"
    ],
    "notIncludes": [
      "Artefacto térmico (calefón, termo, estufa a pellet o leña)",
      "Modificación o extensión de redes matrices de gas de la vivienda",
      "Cañones o kits de evacuación adicionales para entrepisos o techos especiales",
      "Tramitación de sello verde o certificados de regularización general SEC"
    ],
    "conditions": "Debe existir red de agua y gas habilitada en la zona de instalación. En estufas de leña/pellet se debe verificar espacio libre de seguridad contra materiales inflamables.",
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
    "description": "Instalación y mantención de sistemas de producción de agua caliente y calefacción a leña/pellet cumpliendo estrictamente con la normativa SEC. Especialidad: Servicio de Instalación de Calefactor a Leña Bosca en Casa 1 Piso.",
    "caracteristicas": "Instaladores certificados SEC. Protocolos rigurosos de estanqueidad de gas, evacuación de gases de combustión mediante ductos concéntricos o cañones aislados.",
    "includes": [
      "Fijación y anclaje reforzado del artefacto a muro estructural",
      "Conexión a red de gas/eléctrica y agua mediante flexibles normados",
      "Instalación de ductos de tiro (natural o concéntrico de tiro forzado)",
      "Pruebas con manómetro de hermeticidad y detección de fugas",
      "Puesta en marcha, calibración de llama y verificación de seguridades"
    ],
    "notIncludes": [
      "Artefacto térmico (calefón, termo, estufa a pellet o leña)",
      "Modificación o extensión de redes matrices de gas de la vivienda",
      "Cañones o kits de evacuación adicionales para entrepisos o techos especiales",
      "Tramitación de sello verde o certificados de regularización general SEC"
    ],
    "conditions": "Debe existir red de agua y gas habilitada en la zona de instalación. En estufas de leña/pellet se debe verificar espacio libre de seguridad contra materiales inflamables.",
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
    "description": "Instalación y mantención de sistemas de producción de agua caliente y calefacción a leña/pellet cumpliendo estrictamente con la normativa SEC. Especialidad: Servicio de Instalación de Calefactor a Leña Bosca en Casa 2 Pisos.",
    "caracteristicas": "Instaladores certificados SEC. Protocolos rigurosos de estanqueidad de gas, evacuación de gases de combustión mediante ductos concéntricos o cañones aislados.",
    "includes": [
      "Fijación y anclaje reforzado del artefacto a muro estructural",
      "Conexión a red de gas/eléctrica y agua mediante flexibles normados",
      "Instalación de ductos de tiro (natural o concéntrico de tiro forzado)",
      "Pruebas con manómetro de hermeticidad y detección de fugas",
      "Puesta en marcha, calibración de llama y verificación de seguridades"
    ],
    "notIncludes": [
      "Artefacto térmico (calefón, termo, estufa a pellet o leña)",
      "Modificación o extensión de redes matrices de gas de la vivienda",
      "Cañones o kits de evacuación adicionales para entrepisos o techos especiales",
      "Tramitación de sello verde o certificados de regularización general SEC"
    ],
    "conditions": "Debe existir red de agua y gas habilitada en la zona de instalación. En estufas de leña/pellet se debe verificar espacio libre de seguridad contra materiales inflamables.",
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
    "description": "Instalación y mantención de sistemas de producción de agua caliente y calefacción a leña/pellet cumpliendo estrictamente con la normativa SEC. Especialidad: Servicio de Instalación de Calefactor a Leña Amesti en Casa 2 Pisos.",
    "caracteristicas": "Instaladores certificados SEC. Protocolos rigurosos de estanqueidad de gas, evacuación de gases de combustión mediante ductos concéntricos o cañones aislados.",
    "includes": [
      "Fijación y anclaje reforzado del artefacto a muro estructural",
      "Conexión a red de gas/eléctrica y agua mediante flexibles normados",
      "Instalación de ductos de tiro (natural o concéntrico de tiro forzado)",
      "Pruebas con manómetro de hermeticidad y detección de fugas",
      "Puesta en marcha, calibración de llama y verificación de seguridades"
    ],
    "notIncludes": [
      "Artefacto térmico (calefón, termo, estufa a pellet o leña)",
      "Modificación o extensión de redes matrices de gas de la vivienda",
      "Cañones o kits de evacuación adicionales para entrepisos o techos especiales",
      "Tramitación de sello verde o certificados de regularización general SEC"
    ],
    "conditions": "Debe existir red de agua y gas habilitada en la zona de instalación. En estufas de leña/pellet se debe verificar espacio libre de seguridad contra materiales inflamables.",
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
    "description": "Instalación y mantención de sistemas de producción de agua caliente y calefacción a leña/pellet cumpliendo estrictamente con la normativa SEC. Especialidad: Servicio de Instalación de Calefactor a Leña Otras Marcas en Casa 1 Piso.",
    "caracteristicas": "Instaladores certificados SEC. Protocolos rigurosos de estanqueidad de gas, evacuación de gases de combustión mediante ductos concéntricos o cañones aislados.",
    "includes": [
      "Fijación y anclaje reforzado del artefacto a muro estructural",
      "Conexión a red de gas/eléctrica y agua mediante flexibles normados",
      "Instalación de ductos de tiro (natural o concéntrico de tiro forzado)",
      "Pruebas con manómetro de hermeticidad y detección de fugas",
      "Puesta en marcha, calibración de llama y verificación de seguridades"
    ],
    "notIncludes": [
      "Artefacto térmico (calefón, termo, estufa a pellet o leña)",
      "Modificación o extensión de redes matrices de gas de la vivienda",
      "Cañones o kits de evacuación adicionales para entrepisos o techos especiales",
      "Tramitación de sello verde o certificados de regularización general SEC"
    ],
    "conditions": "Debe existir red de agua y gas habilitada en la zona de instalación. En estufas de leña/pellet se debe verificar espacio libre de seguridad contra materiales inflamables.",
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
    "description": "Instalación y mantención de sistemas de producción de agua caliente y calefacción a leña/pellet cumpliendo estrictamente con la normativa SEC. Especialidad: Servicio de Mantención de calefactor a leña OTRAS MARCAS en casa 1 piso.",
    "caracteristicas": "Instaladores certificados SEC. Protocolos rigurosos de estanqueidad de gas, evacuación de gases de combustión mediante ductos concéntricos o cañones aislados.",
    "includes": [
      "Fijación y anclaje reforzado del artefacto a muro estructural",
      "Conexión a red de gas/eléctrica y agua mediante flexibles normados",
      "Instalación de ductos de tiro (natural o concéntrico de tiro forzado)",
      "Pruebas con manómetro de hermeticidad y detección de fugas",
      "Puesta en marcha, calibración de llama y verificación de seguridades"
    ],
    "notIncludes": [
      "Artefacto térmico (calefón, termo, estufa a pellet o leña)",
      "Modificación o extensión de redes matrices de gas de la vivienda",
      "Cañones o kits de evacuación adicionales para entrepisos o techos especiales",
      "Tramitación de sello verde o certificados de regularización general SEC"
    ],
    "conditions": "Debe existir red de agua y gas habilitada en la zona de instalación. En estufas de leña/pellet se debe verificar espacio libre de seguridad contra materiales inflamables.",
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
    "description": "Instalación y mantención de sistemas de producción de agua caliente y calefacción a leña/pellet cumpliendo estrictamente con la normativa SEC. Especialidad: Servicio de Mantención de Calefactor a Leña BOSCA en Casa 1 Piso.",
    "caracteristicas": "Instaladores certificados SEC. Protocolos rigurosos de estanqueidad de gas, evacuación de gases de combustión mediante ductos concéntricos o cañones aislados.",
    "includes": [
      "Fijación y anclaje reforzado del artefacto a muro estructural",
      "Conexión a red de gas/eléctrica y agua mediante flexibles normados",
      "Instalación de ductos de tiro (natural o concéntrico de tiro forzado)",
      "Pruebas con manómetro de hermeticidad y detección de fugas",
      "Puesta en marcha, calibración de llama y verificación de seguridades"
    ],
    "notIncludes": [
      "Artefacto térmico (calefón, termo, estufa a pellet o leña)",
      "Modificación o extensión de redes matrices de gas de la vivienda",
      "Cañones o kits de evacuación adicionales para entrepisos o techos especiales",
      "Tramitación de sello verde o certificados de regularización general SEC"
    ],
    "conditions": "Debe existir red de agua y gas habilitada en la zona de instalación. En estufas de leña/pellet se debe verificar espacio libre de seguridad contra materiales inflamables.",
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
    "description": "Instalación y mantención de sistemas de producción de agua caliente y calefacción a leña/pellet cumpliendo estrictamente con la normativa SEC. Especialidad: Servicio de Mantención de calefactor a pellet BOSCA en casa 1 piso.",
    "caracteristicas": "Instaladores certificados SEC. Protocolos rigurosos de estanqueidad de gas, evacuación de gases de combustión mediante ductos concéntricos o cañones aislados.",
    "includes": [
      "Fijación y anclaje reforzado del artefacto a muro estructural",
      "Conexión a red de gas/eléctrica y agua mediante flexibles normados",
      "Instalación de ductos de tiro (natural o concéntrico de tiro forzado)",
      "Pruebas con manómetro de hermeticidad y detección de fugas",
      "Puesta en marcha, calibración de llama y verificación de seguridades"
    ],
    "notIncludes": [
      "Artefacto térmico (calefón, termo, estufa a pellet o leña)",
      "Modificación o extensión de redes matrices de gas de la vivienda",
      "Cañones o kits de evacuación adicionales para entrepisos o techos especiales",
      "Tramitación de sello verde o certificados de regularización general SEC"
    ],
    "conditions": "Debe existir red de agua y gas habilitada en la zona de instalación. En estufas de leña/pellet se debe verificar espacio libre de seguridad contra materiales inflamables.",
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
    "description": "Instalación y mantención de sistemas de producción de agua caliente y calefacción a leña/pellet cumpliendo estrictamente con la normativa SEC. Especialidad: Servicio de Mantención de calefactor a pellet AMESTI en casa 1 piso.",
    "caracteristicas": "Instaladores certificados SEC. Protocolos rigurosos de estanqueidad de gas, evacuación de gases de combustión mediante ductos concéntricos o cañones aislados.",
    "includes": [
      "Fijación y anclaje reforzado del artefacto a muro estructural",
      "Conexión a red de gas/eléctrica y agua mediante flexibles normados",
      "Instalación de ductos de tiro (natural o concéntrico de tiro forzado)",
      "Pruebas con manómetro de hermeticidad y detección de fugas",
      "Puesta en marcha, calibración de llama y verificación de seguridades"
    ],
    "notIncludes": [
      "Artefacto térmico (calefón, termo, estufa a pellet o leña)",
      "Modificación o extensión de redes matrices de gas de la vivienda",
      "Cañones o kits de evacuación adicionales para entrepisos o techos especiales",
      "Tramitación de sello verde o certificados de regularización general SEC"
    ],
    "conditions": "Debe existir red de agua y gas habilitada en la zona de instalación. En estufas de leña/pellet se debe verificar espacio libre de seguridad contra materiales inflamables.",
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
    "description": "Instalación y mantención de sistemas de producción de agua caliente y calefacción a leña/pellet cumpliendo estrictamente con la normativa SEC. Especialidad: Mantención Calefactor Pellet Otras Marcas Casa 1 Piso.",
    "caracteristicas": "Instaladores certificados SEC. Protocolos rigurosos de estanqueidad de gas, evacuación de gases de combustión mediante ductos concéntricos o cañones aislados.",
    "includes": [
      "Fijación y anclaje reforzado del artefacto a muro estructural",
      "Conexión a red de gas/eléctrica y agua mediante flexibles normados",
      "Instalación de ductos de tiro (natural o concéntrico de tiro forzado)",
      "Pruebas con manómetro de hermeticidad y detección de fugas",
      "Puesta en marcha, calibración de llama y verificación de seguridades"
    ],
    "notIncludes": [
      "Artefacto térmico (calefón, termo, estufa a pellet o leña)",
      "Modificación o extensión de redes matrices de gas de la vivienda",
      "Cañones o kits de evacuación adicionales para entrepisos o techos especiales",
      "Tramitación de sello verde o certificados de regularización general SEC"
    ],
    "conditions": "Debe existir red de agua y gas habilitada en la zona de instalación. En estufas de leña/pellet se debe verificar espacio libre de seguridad contra materiales inflamables.",
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
    "description": "Renovación y montaje de artefactos de baño, duchas, receptáculos y griferías con garantía de cero filtraciones y acabados herméticos. Especialidad: Servicio de Instalación de Sanitario WC.",
    "caracteristicas": "Mano de obra en gasfitería especializada. Contempla acople con sellos de compresión, válvulas de corte independientes y sellado perimetral con silicona antihongos.",
    "includes": [
      "Desmonte del artefacto previo si corresponde al mismo punto",
      "Montaje y fijación mecánica con pernos a piso o fijaciones murales",
      "Instalación de sello de cera de alta densidad en inodoros",
      "Conexión de flexibles de acero inoxidable, desagües y sifones",
      "Sellado perimetral transparente o blanco con silicona de alta resistencia"
    ],
    "notIncludes": [
      "Artefactos sanitarios, muebles vanitorios, grifería ni mamparas",
      "Reparación de cañerías embutidas rotas o destapes de alcantarillado",
      "Reubicación de desagües o perforaciones en losas estructurales",
      "Modificaciones de cerámica o albañilería mayor"
    ],
    "conditions": "Las llaves de paso generales o del recinto deben cortar el agua de manera efectiva. El piso debe estar afinado y sin desniveles pronunciados.",
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
    "description": "Renovación y montaje de artefactos de baño, duchas, receptáculos y griferías con garantía de cero filtraciones y acabados herméticos. Especialidad: Servicio de Instalación y Conexión de 1 Monomando para Lavamano.",
    "caracteristicas": "Mano de obra en gasfitería especializada. Contempla acople con sellos de compresión, válvulas de corte independientes y sellado perimetral con silicona antihongos.",
    "includes": [
      "Desmonte del artefacto previo si corresponde al mismo punto",
      "Montaje y fijación mecánica con pernos a piso o fijaciones murales",
      "Instalación de sello de cera de alta densidad en inodoros",
      "Conexión de flexibles de acero inoxidable, desagües y sifones",
      "Sellado perimetral transparente o blanco con silicona de alta resistencia"
    ],
    "notIncludes": [
      "Artefactos sanitarios, muebles vanitorios, grifería ni mamparas",
      "Reparación de cañerías embutidas rotas o destapes de alcantarillado",
      "Reubicación de desagües o perforaciones en losas estructurales",
      "Modificaciones de cerámica o albañilería mayor"
    ],
    "conditions": "Las llaves de paso generales o del recinto deben cortar el agua de manera efectiva. El piso debe estar afinado y sin desniveles pronunciados.",
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
    "description": "Renovación y montaje de artefactos de baño, duchas, receptáculos y griferías con garantía de cero filtraciones y acabados herméticos. Especialidad: Servicio Instalación 1 Monomando para Lavaplato.",
    "caracteristicas": "Mano de obra en gasfitería especializada. Contempla acople con sellos de compresión, válvulas de corte independientes y sellado perimetral con silicona antihongos.",
    "includes": [
      "Desmonte del artefacto previo si corresponde al mismo punto",
      "Montaje y fijación mecánica con pernos a piso o fijaciones murales",
      "Instalación de sello de cera de alta densidad en inodoros",
      "Conexión de flexibles de acero inoxidable, desagües y sifones",
      "Sellado perimetral transparente o blanco con silicona de alta resistencia"
    ],
    "notIncludes": [
      "Artefactos sanitarios, muebles vanitorios, grifería ni mamparas",
      "Reparación de cañerías embutidas rotas o destapes de alcantarillado",
      "Reubicación de desagües o perforaciones en losas estructurales",
      "Modificaciones de cerámica o albañilería mayor"
    ],
    "conditions": "Las llaves de paso generales o del recinto deben cortar el agua de manera efectiva. El piso debe estar afinado y sin desniveles pronunciados.",
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
    "description": "Renovación y montaje de artefactos de baño, duchas, receptáculos y griferías con garantía de cero filtraciones y acabados herméticos. Especialidad: Servicio Instalación Lavamano y pedestal + Conexión de Grifería y Sanitario.",
    "caracteristicas": "Mano de obra en gasfitería especializada. Contempla acople con sellos de compresión, válvulas de corte independientes y sellado perimetral con silicona antihongos.",
    "includes": [
      "Desmonte del artefacto previo si corresponde al mismo punto",
      "Montaje y fijación mecánica con pernos a piso o fijaciones murales",
      "Instalación de sello de cera de alta densidad en inodoros",
      "Conexión de flexibles de acero inoxidable, desagües y sifones",
      "Sellado perimetral transparente o blanco con silicona de alta resistencia"
    ],
    "notIncludes": [
      "Artefactos sanitarios, muebles vanitorios, grifería ni mamparas",
      "Reparación de cañerías embutidas rotas o destapes de alcantarillado",
      "Reubicación de desagües o perforaciones en losas estructurales",
      "Modificaciones de cerámica o albañilería mayor"
    ],
    "conditions": "Las llaves de paso generales o del recinto deben cortar el agua de manera efectiva. El piso debe estar afinado y sin desniveles pronunciados.",
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
    "description": "Renovación y montaje de artefactos de baño, duchas, receptáculos y griferías con garantía de cero filtraciones y acabados herméticos. Especialidad: Servicio Armado e instalación de Mueble Vanitorio + Conexión de grifería.",
    "caracteristicas": "Mano de obra en gasfitería especializada. Contempla acople con sellos de compresión, válvulas de corte independientes y sellado perimetral con silicona antihongos.",
    "includes": [
      "Desmonte del artefacto previo si corresponde al mismo punto",
      "Montaje y fijación mecánica con pernos a piso o fijaciones murales",
      "Instalación de sello de cera de alta densidad en inodoros",
      "Conexión de flexibles de acero inoxidable, desagües y sifones",
      "Sellado perimetral transparente o blanco con silicona de alta resistencia"
    ],
    "notIncludes": [
      "Artefactos sanitarios, muebles vanitorios, grifería ni mamparas",
      "Reparación de cañerías embutidas rotas o destapes de alcantarillado",
      "Reubicación de desagües o perforaciones en losas estructurales",
      "Modificaciones de cerámica o albañilería mayor"
    ],
    "conditions": "Las llaves de paso generales o del recinto deben cortar el agua de manera efectiva. El piso debe estar afinado y sin desniveles pronunciados.",
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
    "description": "Renovación y montaje de artefactos de baño, duchas, receptáculos y griferías con garantía de cero filtraciones y acabados herméticos. Especialidad: Servicio de Instalación de Columna de Ducha.",
    "caracteristicas": "Mano de obra en gasfitería especializada. Contempla acople con sellos de compresión, válvulas de corte independientes y sellado perimetral con silicona antihongos.",
    "includes": [
      "Desmonte del artefacto previo si corresponde al mismo punto",
      "Montaje y fijación mecánica con pernos a piso o fijaciones murales",
      "Instalación de sello de cera de alta densidad en inodoros",
      "Conexión de flexibles de acero inoxidable, desagües y sifones",
      "Sellado perimetral transparente o blanco con silicona de alta resistencia"
    ],
    "notIncludes": [
      "Artefactos sanitarios, muebles vanitorios, grifería ni mamparas",
      "Reparación de cañerías embutidas rotas o destapes de alcantarillado",
      "Reubicación de desagües o perforaciones en losas estructurales",
      "Modificaciones de cerámica o albañilería mayor"
    ],
    "conditions": "Las llaves de paso generales o del recinto deben cortar el agua de manera efectiva. El piso debe estar afinado y sin desniveles pronunciados.",
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
    "description": "Renovación y montaje de artefactos de baño, duchas, receptáculos y griferías con garantía de cero filtraciones y acabados herméticos. Especialidad: Servicio de Instalación de Mampara de Ducha.",
    "caracteristicas": "Mano de obra en gasfitería especializada. Contempla acople con sellos de compresión, válvulas de corte independientes y sellado perimetral con silicona antihongos.",
    "includes": [
      "Desmonte del artefacto previo si corresponde al mismo punto",
      "Montaje y fijación mecánica con pernos a piso o fijaciones murales",
      "Instalación de sello de cera de alta densidad en inodoros",
      "Conexión de flexibles de acero inoxidable, desagües y sifones",
      "Sellado perimetral transparente o blanco con silicona de alta resistencia"
    ],
    "notIncludes": [
      "Artefactos sanitarios, muebles vanitorios, grifería ni mamparas",
      "Reparación de cañerías embutidas rotas o destapes de alcantarillado",
      "Reubicación de desagües o perforaciones en losas estructurales",
      "Modificaciones de cerámica o albañilería mayor"
    ],
    "conditions": "Las llaves de paso generales o del recinto deben cortar el agua de manera efectiva. El piso debe estar afinado y sin desniveles pronunciados.",
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
    "description": "Renovación y montaje de artefactos de baño, duchas, receptáculos y griferías con garantía de cero filtraciones y acabados herméticos. Especialidad: Servicio de Armado e Instalación de Cabina de Ducha.",
    "caracteristicas": "Mano de obra en gasfitería especializada. Contempla acople con sellos de compresión, válvulas de corte independientes y sellado perimetral con silicona antihongos.",
    "includes": [
      "Desmonte del artefacto previo si corresponde al mismo punto",
      "Montaje y fijación mecánica con pernos a piso o fijaciones murales",
      "Instalación de sello de cera de alta densidad en inodoros",
      "Conexión de flexibles de acero inoxidable, desagües y sifones",
      "Sellado perimetral transparente o blanco con silicona de alta resistencia"
    ],
    "notIncludes": [
      "Artefactos sanitarios, muebles vanitorios, grifería ni mamparas",
      "Reparación de cañerías embutidas rotas o destapes de alcantarillado",
      "Reubicación de desagües o perforaciones en losas estructurales",
      "Modificaciones de cerámica o albañilería mayor"
    ],
    "conditions": "Las llaves de paso generales o del recinto deben cortar el agua de manera efectiva. El piso debe estar afinado y sin desniveles pronunciados.",
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
    "description": "Renovación y montaje de artefactos de baño, duchas, receptáculos y griferías con garantía de cero filtraciones y acabados herméticos. Especialidad: Servicio Rebaje de Tina para Fácil Acceso (Pieza + Instalación).",
    "caracteristicas": "Mano de obra en gasfitería especializada. Contempla acople con sellos de compresión, válvulas de corte independientes y sellado perimetral con silicona antihongos.",
    "includes": [
      "Desmonte del artefacto previo si corresponde al mismo punto",
      "Montaje y fijación mecánica con pernos a piso o fijaciones murales",
      "Instalación de sello de cera de alta densidad en inodoros",
      "Conexión de flexibles de acero inoxidable, desagües y sifones",
      "Sellado perimetral transparente o blanco con silicona de alta resistencia"
    ],
    "notIncludes": [
      "Artefactos sanitarios, muebles vanitorios, grifería ni mamparas",
      "Reparación de cañerías embutidas rotas o destapes de alcantarillado",
      "Reubicación de desagües o perforaciones en losas estructurales",
      "Modificaciones de cerámica o albañilería mayor"
    ],
    "conditions": "Las llaves de paso generales o del recinto deben cortar el agua de manera efectiva. El piso debe estar afinado y sin desniveles pronunciados.",
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
    "badge": "Seguridad & Confort",
    "description": "Soluciones integrales de protección perimetral, control de acceso smart, automatización de portones y acondicionamiento de vanos. Especialidad: Servicio de malla de seguridad 0,8mm con Instalación incluida.",
    "caracteristicas": "Instalación de alta precisión técnica. Contempla fijación en hormigón/madera/metal, programación electrónica de mandos y tensado de mallas de seguridad.",
    "includes": [
      "Cajeado y calce milimétrico de cerraduras en puertas de acceso",
      "En motores: fijación sobre base, cremalleras de acero y calibración de fines de carrera",
      "En mallas: anclajes con pitones zincados cada 5 cm y cuerda perimetral tensada",
      "En cortinas y soportes: perforación y anclaje con tarugos aptos para cada muro",
      "Configuración de claves, huellas o sincronización con smartphones"
    ],
    "notIncludes": [
      "Dispositivos o accesorios (cerradura smart, motor, cortina, soporte TV, Starlink)",
      "Canalización eléctrica subterránea de larga distancia para portones",
      "Reparación de portones oxidados, descuadrados o con rodamientos rotos",
      "Refuerzo de marcos de puerta carcomidos o vencidos"
    ],
    "conditions": "Se aplica en vanos y balcones perimetrales. Resistencia de monofilamento de 140 kg/m².",
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
    "badge": "Seguridad & Confort",
    "description": "Soluciones integrales de protección perimetral, control de acceso smart, automatización de portones y acondicionamiento de vanos. Especialidad: Servicio de malla de seguridad 0,9mm con Instalación incluida.",
    "caracteristicas": "Instalación de alta precisión técnica. Contempla fijación en hormigón/madera/metal, programación electrónica de mandos y tensado de mallas de seguridad.",
    "includes": [
      "Cajeado y calce milimétrico de cerraduras en puertas de acceso",
      "En motores: fijación sobre base, cremalleras de acero y calibración de fines de carrera",
      "En mallas: anclajes con pitones zincados cada 5 cm y cuerda perimetral tensada",
      "En cortinas y soportes: perforación y anclaje con tarugos aptos para cada muro",
      "Configuración de claves, huellas o sincronización con smartphones"
    ],
    "notIncludes": [
      "Dispositivos o accesorios (cerradura smart, motor, cortina, soporte TV, Starlink)",
      "Canalización eléctrica subterránea de larga distancia para portones",
      "Reparación de portones oxidados, descuadrados o con rodamientos rotos",
      "Refuerzo de marcos de puerta carcomidos o vencidos"
    ],
    "conditions": "Se aplica en vanos y balcones perimetrales. Resistencia de monofilamento de 140 kg/m².",
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
    "badge": "Seguridad & Confort",
    "description": "Soluciones integrales de protección perimetral, control de acceso smart, automatización de portones y acondicionamiento de vanos. Especialidad: Servicio Instalación 1 de Cerrojo Digital.",
    "caracteristicas": "Instalación de alta precisión técnica. Contempla fijación en hormigón/madera/metal, programación electrónica de mandos y tensado de mallas de seguridad.",
    "includes": [
      "Cajeado y calce milimétrico de cerraduras en puertas de acceso",
      "En motores: fijación sobre base, cremalleras de acero y calibración de fines de carrera",
      "En mallas: anclajes con pitones zincados cada 5 cm y cuerda perimetral tensada",
      "En cortinas y soportes: perforación y anclaje con tarugos aptos para cada muro",
      "Configuración de claves, huellas o sincronización con smartphones"
    ],
    "notIncludes": [
      "Dispositivos o accesorios (cerradura smart, motor, cortina, soporte TV, Starlink)",
      "Canalización eléctrica subterránea de larga distancia para portones",
      "Reparación de portones oxidados, descuadrados o con rodamientos rotos",
      "Refuerzo de marcos de puerta carcomidos o vencidos"
    ],
    "conditions": "En automatización de portones, la hoja debe deslizar de forma suave manualmente. En cerraduras digitales, el espesor de la puerta debe ser compatible (35 a 65 mm).",
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
    "badge": "Seguridad & Confort",
    "description": "Soluciones integrales de protección perimetral, control de acceso smart, automatización de portones y acondicionamiento de vanos. Especialidad: Servicio Instalación 1 Cerradura Digital.",
    "caracteristicas": "Instalación de alta precisión técnica. Contempla fijación en hormigón/madera/metal, programación electrónica de mandos y tensado de mallas de seguridad.",
    "includes": [
      "Cajeado y calce milimétrico de cerraduras en puertas de acceso",
      "En motores: fijación sobre base, cremalleras de acero y calibración de fines de carrera",
      "En mallas: anclajes con pitones zincados cada 5 cm y cuerda perimetral tensada",
      "En cortinas y soportes: perforación y anclaje con tarugos aptos para cada muro",
      "Configuración de claves, huellas o sincronización con smartphones"
    ],
    "notIncludes": [
      "Dispositivos o accesorios (cerradura smart, motor, cortina, soporte TV, Starlink)",
      "Canalización eléctrica subterránea de larga distancia para portones",
      "Reparación de portones oxidados, descuadrados o con rodamientos rotos",
      "Refuerzo de marcos de puerta carcomidos o vencidos"
    ],
    "conditions": "En automatización de portones, la hoja debe deslizar de forma suave manualmente. En cerraduras digitales, el espesor de la puerta debe ser compatible (35 a 65 mm).",
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
    "badge": "Seguridad & Confort",
    "description": "Soluciones integrales de protección perimetral, control de acceso smart, automatización de portones y acondicionamiento de vanos. Especialidad: Servicio de Instalación 1 Cerradura de Acceso principal.",
    "caracteristicas": "Instalación de alta precisión técnica. Contempla fijación en hormigón/madera/metal, programación electrónica de mandos y tensado de mallas de seguridad.",
    "includes": [
      "Cajeado y calce milimétrico de cerraduras en puertas de acceso",
      "En motores: fijación sobre base, cremalleras de acero y calibración de fines de carrera",
      "En mallas: anclajes con pitones zincados cada 5 cm y cuerda perimetral tensada",
      "En cortinas y soportes: perforación y anclaje con tarugos aptos para cada muro",
      "Configuración de claves, huellas o sincronización con smartphones"
    ],
    "notIncludes": [
      "Dispositivos o accesorios (cerradura smart, motor, cortina, soporte TV, Starlink)",
      "Canalización eléctrica subterránea de larga distancia para portones",
      "Reparación de portones oxidados, descuadrados o con rodamientos rotos",
      "Refuerzo de marcos de puerta carcomidos o vencidos"
    ],
    "conditions": "En automatización de portones, la hoja debe deslizar de forma suave manualmente. En cerraduras digitales, el espesor de la puerta debe ser compatible (35 a 65 mm).",
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
    "badge": "Seguridad & Confort",
    "description": "Soluciones integrales de protección perimetral, control de acceso smart, automatización de portones y acondicionamiento de vanos. Especialidad: Servicio Instalación Puerta, Cerradura y Bisagras en marco existente.",
    "caracteristicas": "Instalación de alta precisión técnica. Contempla fijación en hormigón/madera/metal, programación electrónica de mandos y tensado de mallas de seguridad.",
    "includes": [
      "Cajeado y calce milimétrico de cerraduras en puertas de acceso",
      "En motores: fijación sobre base, cremalleras de acero y calibración de fines de carrera",
      "En mallas: anclajes con pitones zincados cada 5 cm y cuerda perimetral tensada",
      "En cortinas y soportes: perforación y anclaje con tarugos aptos para cada muro",
      "Configuración de claves, huellas o sincronización con smartphones"
    ],
    "notIncludes": [
      "Dispositivos o accesorios (cerradura smart, motor, cortina, soporte TV, Starlink)",
      "Canalización eléctrica subterránea de larga distancia para portones",
      "Reparación de portones oxidados, descuadrados o con rodamientos rotos",
      "Refuerzo de marcos de puerta carcomidos o vencidos"
    ],
    "conditions": "En automatización de portones, la hoja debe deslizar de forma suave manualmente. En cerraduras digitales, el espesor de la puerta debe ser compatible (35 a 65 mm).",
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
    "badge": "Seguridad & Confort",
    "description": "Soluciones integrales de protección perimetral, control de acceso smart, automatización de portones y acondicionamiento de vanos. Especialidad: Servicio de Instalación Puertas de Mueble de Cocina.",
    "caracteristicas": "Instalación de alta precisión técnica. Contempla fijación en hormigón/madera/metal, programación electrónica de mandos y tensado de mallas de seguridad.",
    "includes": [
      "Cajeado y calce milimétrico de cerraduras en puertas de acceso",
      "En motores: fijación sobre base, cremalleras de acero y calibración de fines de carrera",
      "En mallas: anclajes con pitones zincados cada 5 cm y cuerda perimetral tensada",
      "En cortinas y soportes: perforación y anclaje con tarugos aptos para cada muro",
      "Configuración de claves, huellas o sincronización con smartphones"
    ],
    "notIncludes": [
      "Dispositivos o accesorios (cerradura smart, motor, cortina, soporte TV, Starlink)",
      "Canalización eléctrica subterránea de larga distancia para portones",
      "Reparación de portones oxidados, descuadrados o con rodamientos rotos",
      "Refuerzo de marcos de puerta carcomidos o vencidos"
    ],
    "conditions": "En automatización de portones, la hoja debe deslizar de forma suave manualmente. En cerraduras digitales, el espesor de la puerta debe ser compatible (35 a 65 mm).",
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
    "badge": "Seguridad & Confort",
    "description": "Soluciones integrales de protección perimetral, control de acceso smart, automatización de portones y acondicionamiento de vanos. Especialidad: Servicio de Instalación de cortinas roller y persianas.",
    "caracteristicas": "Instalación de alta precisión técnica. Contempla fijación en hormigón/madera/metal, programación electrónica de mandos y tensado de mallas de seguridad.",
    "includes": [
      "Cajeado y calce milimétrico de cerraduras en puertas de acceso",
      "En motores: fijación sobre base, cremalleras de acero y calibración de fines de carrera",
      "En mallas: anclajes con pitones zincados cada 5 cm y cuerda perimetral tensada",
      "En cortinas y soportes: perforación y anclaje con tarugos aptos para cada muro",
      "Configuración de claves, huellas o sincronización con smartphones"
    ],
    "notIncludes": [
      "Dispositivos o accesorios (cerradura smart, motor, cortina, soporte TV, Starlink)",
      "Canalización eléctrica subterránea de larga distancia para portones",
      "Reparación de portones oxidados, descuadrados o con rodamientos rotos",
      "Refuerzo de marcos de puerta carcomidos o vencidos"
    ],
    "conditions": "En automatización de portones, la hoja debe deslizar de forma suave manualmente. En cerraduras digitales, el espesor de la puerta debe ser compatible (35 a 65 mm).",
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
    "badge": "Seguridad & Confort",
    "description": "Soluciones integrales de protección perimetral, control de acceso smart, automatización de portones y acondicionamiento de vanos. Especialidad: Servicio de Confección e Instalación de Cortinas A Medida.",
    "caracteristicas": "Instalación de alta precisión técnica. Contempla fijación en hormigón/madera/metal, programación electrónica de mandos y tensado de mallas de seguridad.",
    "includes": [
      "Cajeado y calce milimétrico de cerraduras en puertas de acceso",
      "En motores: fijación sobre base, cremalleras de acero y calibración de fines de carrera",
      "En mallas: anclajes con pitones zincados cada 5 cm y cuerda perimetral tensada",
      "En cortinas y soportes: perforación y anclaje con tarugos aptos para cada muro",
      "Configuración de claves, huellas o sincronización con smartphones"
    ],
    "notIncludes": [
      "Dispositivos o accesorios (cerradura smart, motor, cortina, soporte TV, Starlink)",
      "Canalización eléctrica subterránea de larga distancia para portones",
      "Reparación de portones oxidados, descuadrados o con rodamientos rotos",
      "Refuerzo de marcos de puerta carcomidos o vencidos"
    ],
    "conditions": "En automatización de portones, la hoja debe deslizar de forma suave manualmente. En cerraduras digitales, el espesor de la puerta debe ser compatible (35 a 65 mm).",
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
    "badge": "Seguridad & Confort",
    "description": "Soluciones integrales de protección perimetral, control de acceso smart, automatización de portones y acondicionamiento de vanos. Especialidad: Servicio Instalación de Toldos Retráctil.",
    "caracteristicas": "Instalación de alta precisión técnica. Contempla fijación en hormigón/madera/metal, programación electrónica de mandos y tensado de mallas de seguridad.",
    "includes": [
      "Cajeado y calce milimétrico de cerraduras en puertas de acceso",
      "En motores: fijación sobre base, cremalleras de acero y calibración de fines de carrera",
      "En mallas: anclajes con pitones zincados cada 5 cm y cuerda perimetral tensada",
      "En cortinas y soportes: perforación y anclaje con tarugos aptos para cada muro",
      "Configuración de claves, huellas o sincronización con smartphones"
    ],
    "notIncludes": [
      "Dispositivos o accesorios (cerradura smart, motor, cortina, soporte TV, Starlink)",
      "Canalización eléctrica subterránea de larga distancia para portones",
      "Reparación de portones oxidados, descuadrados o con rodamientos rotos",
      "Refuerzo de marcos de puerta carcomidos o vencidos"
    ],
    "conditions": "En automatización de portones, la hoja debe deslizar de forma suave manualmente. En cerraduras digitales, el espesor de la puerta debe ser compatible (35 a 65 mm).",
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
    "badge": "Seguridad & Confort",
    "description": "Soluciones integrales de protección perimetral, control de acceso smart, automatización de portones y acondicionamiento de vanos. Especialidad: Servicio Instalación Motor Porton Automático y Cremalleras.",
    "caracteristicas": "Instalación de alta precisión técnica. Contempla fijación en hormigón/madera/metal, programación electrónica de mandos y tensado de mallas de seguridad.",
    "includes": [
      "Cajeado y calce milimétrico de cerraduras en puertas de acceso",
      "En motores: fijación sobre base, cremalleras de acero y calibración de fines de carrera",
      "En mallas: anclajes con pitones zincados cada 5 cm y cuerda perimetral tensada",
      "En cortinas y soportes: perforación y anclaje con tarugos aptos para cada muro",
      "Configuración de claves, huellas o sincronización con smartphones"
    ],
    "notIncludes": [
      "Dispositivos o accesorios (cerradura smart, motor, cortina, soporte TV, Starlink)",
      "Canalización eléctrica subterránea de larga distancia para portones",
      "Reparación de portones oxidados, descuadrados o con rodamientos rotos",
      "Refuerzo de marcos de puerta carcomidos o vencidos"
    ],
    "conditions": "En automatización de portones, la hoja debe deslizar de forma suave manualmente. En cerraduras digitales, el espesor de la puerta debe ser compatible (35 a 65 mm).",
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
    "badge": "Seguridad & Confort",
    "description": "Soluciones integrales de protección perimetral, control de acceso smart, automatización de portones y acondicionamiento de vanos. Especialidad: Servicio Instalación de Citófono o Videoportero.",
    "caracteristicas": "Instalación de alta precisión técnica. Contempla fijación en hormigón/madera/metal, programación electrónica de mandos y tensado de mallas de seguridad.",
    "includes": [
      "Cajeado y calce milimétrico de cerraduras en puertas de acceso",
      "En motores: fijación sobre base, cremalleras de acero y calibración de fines de carrera",
      "En mallas: anclajes con pitones zincados cada 5 cm y cuerda perimetral tensada",
      "En cortinas y soportes: perforación y anclaje con tarugos aptos para cada muro",
      "Configuración de claves, huellas o sincronización con smartphones"
    ],
    "notIncludes": [
      "Dispositivos o accesorios (cerradura smart, motor, cortina, soporte TV, Starlink)",
      "Canalización eléctrica subterránea de larga distancia para portones",
      "Reparación de portones oxidados, descuadrados o con rodamientos rotos",
      "Refuerzo de marcos de puerta carcomidos o vencidos"
    ],
    "conditions": "En automatización de portones, la hoja debe deslizar de forma suave manualmente. En cerraduras digitales, el espesor de la puerta debe ser compatible (35 a 65 mm).",
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
    "badge": "Seguridad & Confort",
    "description": "Soluciones integrales de protección perimetral, control de acceso smart, automatización de portones y acondicionamiento de vanos. Especialidad: Servicio de Instalación de soporte para TV.",
    "caracteristicas": "Instalación de alta precisión técnica. Contempla fijación en hormigón/madera/metal, programación electrónica de mandos y tensado de mallas de seguridad.",
    "includes": [
      "Cajeado y calce milimétrico de cerraduras en puertas de acceso",
      "En motores: fijación sobre base, cremalleras de acero y calibración de fines de carrera",
      "En mallas: anclajes con pitones zincados cada 5 cm y cuerda perimetral tensada",
      "En cortinas y soportes: perforación y anclaje con tarugos aptos para cada muro",
      "Configuración de claves, huellas o sincronización con smartphones"
    ],
    "notIncludes": [
      "Dispositivos o accesorios (cerradura smart, motor, cortina, soporte TV, Starlink)",
      "Canalización eléctrica subterránea de larga distancia para portones",
      "Reparación de portones oxidados, descuadrados o con rodamientos rotos",
      "Refuerzo de marcos de puerta carcomidos o vencidos"
    ],
    "conditions": "En automatización de portones, la hoja debe deslizar de forma suave manualmente. En cerraduras digitales, el espesor de la puerta debe ser compatible (35 a 65 mm).",
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
    "badge": "Seguridad & Confort",
    "description": "Soluciones integrales de protección perimetral, control de acceso smart, automatización de portones y acondicionamiento de vanos. Especialidad: Servicio Instalación antena, router y Starlink.",
    "caracteristicas": "Instalación de alta precisión técnica. Contempla fijación en hormigón/madera/metal, programación electrónica de mandos y tensado de mallas de seguridad.",
    "includes": [
      "Cajeado y calce milimétrico de cerraduras en puertas de acceso",
      "En motores: fijación sobre base, cremalleras de acero y calibración de fines de carrera",
      "En mallas: anclajes con pitones zincados cada 5 cm y cuerda perimetral tensada",
      "En cortinas y soportes: perforación y anclaje con tarugos aptos para cada muro",
      "Configuración de claves, huellas o sincronización con smartphones"
    ],
    "notIncludes": [
      "Dispositivos o accesorios (cerradura smart, motor, cortina, soporte TV, Starlink)",
      "Canalización eléctrica subterránea de larga distancia para portones",
      "Reparación de portones oxidados, descuadrados o con rodamientos rotos",
      "Refuerzo de marcos de puerta carcomidos o vencidos"
    ],
    "conditions": "En automatización de portones, la hoja debe deslizar de forma suave manualmente. En cerraduras digitales, el espesor de la puerta debe ser compatible (35 a 65 mm).",
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
    "badge": "Seguridad & Confort",
    "description": "Soluciones integrales de protección perimetral, control de acceso smart, automatización de portones y acondicionamiento de vanos. Especialidad: Servicio Instalación estándar de escalera de entretecho.",
    "caracteristicas": "Instalación de alta precisión técnica. Contempla fijación en hormigón/madera/metal, programación electrónica de mandos y tensado de mallas de seguridad.",
    "includes": [
      "Cajeado y calce milimétrico de cerraduras en puertas de acceso",
      "En motores: fijación sobre base, cremalleras de acero y calibración de fines de carrera",
      "En mallas: anclajes con pitones zincados cada 5 cm y cuerda perimetral tensada",
      "En cortinas y soportes: perforación y anclaje con tarugos aptos para cada muro",
      "Configuración de claves, huellas o sincronización con smartphones"
    ],
    "notIncludes": [
      "Dispositivos o accesorios (cerradura smart, motor, cortina, soporte TV, Starlink)",
      "Canalización eléctrica subterránea de larga distancia para portones",
      "Reparación de portones oxidados, descuadrados o con rodamientos rotos",
      "Refuerzo de marcos de puerta carcomidos o vencidos"
    ],
    "conditions": "En automatización de portones, la hoja debe deslizar de forma suave manualmente. En cerraduras digitales, el espesor de la puerta debe ser compatible (35 a 65 mm).",
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
    "badge": "Seguridad & Confort",
    "description": "Soluciones integrales de protección perimetral, control de acceso smart, automatización de portones y acondicionamiento de vanos. Especialidad: Servicio Instalación estándar de ventana de techo.",
    "caracteristicas": "Instalación de alta precisión técnica. Contempla fijación en hormigón/madera/metal, programación electrónica de mandos y tensado de mallas de seguridad.",
    "includes": [
      "Cajeado y calce milimétrico de cerraduras en puertas de acceso",
      "En motores: fijación sobre base, cremalleras de acero y calibración de fines de carrera",
      "En mallas: anclajes con pitones zincados cada 5 cm y cuerda perimetral tensada",
      "En cortinas y soportes: perforación y anclaje con tarugos aptos para cada muro",
      "Configuración de claves, huellas o sincronización con smartphones"
    ],
    "notIncludes": [
      "Dispositivos o accesorios (cerradura smart, motor, cortina, soporte TV, Starlink)",
      "Canalización eléctrica subterránea de larga distancia para portones",
      "Reparación de portones oxidados, descuadrados o con rodamientos rotos",
      "Refuerzo de marcos de puerta carcomidos o vencidos"
    ],
    "conditions": "En automatización de portones, la hoja debe deslizar de forma suave manualmente. En cerraduras digitales, el espesor de la puerta debe ser compatible (35 a 65 mm).",
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
    "badge": "Proyectos Integrales",
    "description": "Proyectos mayores y remodelaciones llave en mano de cocinas, baños, energías renovables y módulos habitacionales con estándar de ingeniería civil. Especialidad: Servicio de Remodelación de Baño hasta 3 mt2.",
    "caracteristicas": "Coordinación y supervisión técnica integral de obra. Planificación de partidas, cubicación, control de mano de obra y garantía de término según cronograma.",
    "includes": [
      "Planificación y replanteo técnico en obra",
      "Demoliciones y despeje inicial del área según proyecto",
      "Ejecución coordinada de partidas (gasfitería, electricidad, albañilería, terminaciones)",
      "Instalación de muebles de cocina y cubiertas de cuarzo/madera",
      "Supervisión profesional en terreno y entrega formal con protocolo de recepción"
    ],
    "notIncludes": [
      "Artefactos de lujo o electrodomésticos especiales no descritos en la ficha base",
      "Aumentos de empalme eléctrico TE1/SEC ante la empresa distribuidora",
      "Obras civiles mayores de fundaciones o radieres no presupuestados"
    ],
    "conditions": "Sujeto a visita previa de factibilidad técnica y levantamiento de planos. Proyecto sujeto a contrato de ejecución de obra y cronograma valorizado.",
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
    "badge": "Proyectos Integrales",
    "description": "Proyectos mayores y remodelaciones llave en mano de cocinas, baños, energías renovables y módulos habitacionales con estándar de ingeniería civil. Especialidad: Servicio de Remodelación de Baño hasta 5 mt2.",
    "caracteristicas": "Coordinación y supervisión técnica integral de obra. Planificación de partidas, cubicación, control de mano de obra y garantía de término según cronograma.",
    "includes": [
      "Planificación y replanteo técnico en obra",
      "Demoliciones y despeje inicial del área según proyecto",
      "Ejecución coordinada de partidas (gasfitería, electricidad, albañilería, terminaciones)",
      "Instalación de muebles de cocina y cubiertas de cuarzo/madera",
      "Supervisión profesional en terreno y entrega formal con protocolo de recepción"
    ],
    "notIncludes": [
      "Artefactos de lujo o electrodomésticos especiales no descritos en la ficha base",
      "Aumentos de empalme eléctrico TE1/SEC ante la empresa distribuidora",
      "Obras civiles mayores de fundaciones o radieres no presupuestados"
    ],
    "conditions": "Sujeto a visita previa de factibilidad técnica y levantamiento de planos. Proyecto sujeto a contrato de ejecución de obra y cronograma valorizado.",
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
    "badge": "Proyectos Integrales",
    "description": "Proyectos mayores y remodelaciones llave en mano de cocinas, baños, energías renovables y módulos habitacionales con estándar de ingeniería civil. Especialidad: Servicio de Remodelación de Baño hasta 8 mt2.",
    "caracteristicas": "Coordinación y supervisión técnica integral de obra. Planificación de partidas, cubicación, control de mano de obra y garantía de término según cronograma.",
    "includes": [
      "Planificación y replanteo técnico en obra",
      "Demoliciones y despeje inicial del área según proyecto",
      "Ejecución coordinada de partidas (gasfitería, electricidad, albañilería, terminaciones)",
      "Instalación de muebles de cocina y cubiertas de cuarzo/madera",
      "Supervisión profesional en terreno y entrega formal con protocolo de recepción"
    ],
    "notIncludes": [
      "Artefactos de lujo o electrodomésticos especiales no descritos en la ficha base",
      "Aumentos de empalme eléctrico TE1/SEC ante la empresa distribuidora",
      "Obras civiles mayores de fundaciones o radieres no presupuestados"
    ],
    "conditions": "Sujeto a visita previa de factibilidad técnica y levantamiento de planos. Proyecto sujeto a contrato de ejecución de obra y cronograma valorizado.",
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
    "badge": "Proyectos Integrales",
    "description": "Proyectos mayores y remodelaciones llave en mano de cocinas, baños, energías renovables y módulos habitacionales con estándar de ingeniería civil. Especialidad: Proyecto de Cocina 1,6 Metros con Cubierta de Cuarzo + Instalación.",
    "caracteristicas": "Coordinación y supervisión técnica integral de obra. Planificación de partidas, cubicación, control de mano de obra y garantía de término según cronograma.",
    "includes": [
      "Planificación y replanteo técnico en obra",
      "Demoliciones y despeje inicial del área según proyecto",
      "Ejecución coordinada de partidas (gasfitería, electricidad, albañilería, terminaciones)",
      "Instalación de muebles de cocina y cubiertas de cuarzo/madera",
      "Supervisión profesional en terreno y entrega formal con protocolo de recepción"
    ],
    "notIncludes": [
      "Artefactos de lujo o electrodomésticos especiales no descritos en la ficha base",
      "Aumentos de empalme eléctrico TE1/SEC ante la empresa distribuidora",
      "Obras civiles mayores de fundaciones o radieres no presupuestados"
    ],
    "conditions": "Sujeto a visita previa de factibilidad técnica y levantamiento de planos. Proyecto sujeto a contrato de ejecución de obra y cronograma valorizado.",
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
    "badge": "Proyectos Integrales",
    "description": "Proyectos mayores y remodelaciones llave en mano de cocinas, baños, energías renovables y módulos habitacionales con estándar de ingeniería civil. Especialidad: Proyecto de Cocina 1,9 Metros con Cubierta de Cuarzo + Instalación.",
    "caracteristicas": "Coordinación y supervisión técnica integral de obra. Planificación de partidas, cubicación, control de mano de obra y garantía de término según cronograma.",
    "includes": [
      "Planificación y replanteo técnico en obra",
      "Demoliciones y despeje inicial del área según proyecto",
      "Ejecución coordinada de partidas (gasfitería, electricidad, albañilería, terminaciones)",
      "Instalación de muebles de cocina y cubiertas de cuarzo/madera",
      "Supervisión profesional en terreno y entrega formal con protocolo de recepción"
    ],
    "notIncludes": [
      "Artefactos de lujo o electrodomésticos especiales no descritos en la ficha base",
      "Aumentos de empalme eléctrico TE1/SEC ante la empresa distribuidora",
      "Obras civiles mayores de fundaciones o radieres no presupuestados"
    ],
    "conditions": "Sujeto a visita previa de factibilidad técnica y levantamiento de planos. Proyecto sujeto a contrato de ejecución de obra y cronograma valorizado.",
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
    "badge": "Proyectos Integrales",
    "description": "Proyectos mayores y remodelaciones llave en mano de cocinas, baños, energías renovables y módulos habitacionales con estándar de ingeniería civil. Especialidad: Proyecto de Cocina 3 Metros con Cubierta de Madera + Instalación.",
    "caracteristicas": "Coordinación y supervisión técnica integral de obra. Planificación de partidas, cubicación, control de mano de obra y garantía de término según cronograma.",
    "includes": [
      "Planificación y replanteo técnico en obra",
      "Demoliciones y despeje inicial del área según proyecto",
      "Ejecución coordinada de partidas (gasfitería, electricidad, albañilería, terminaciones)",
      "Instalación de muebles de cocina y cubiertas de cuarzo/madera",
      "Supervisión profesional en terreno y entrega formal con protocolo de recepción"
    ],
    "notIncludes": [
      "Artefactos de lujo o electrodomésticos especiales no descritos en la ficha base",
      "Aumentos de empalme eléctrico TE1/SEC ante la empresa distribuidora",
      "Obras civiles mayores de fundaciones o radieres no presupuestados"
    ],
    "conditions": "Sujeto a visita previa de factibilidad técnica y levantamiento de planos. Proyecto sujeto a contrato de ejecución de obra y cronograma valorizado.",
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
    "badge": "Proyectos Integrales",
    "description": "Proyectos mayores y remodelaciones llave en mano de cocinas, baños, energías renovables y módulos habitacionales con estándar de ingeniería civil. Especialidad: Proyecto de Cocina 3 Metros con Cubierta de Cuarzo Blanco + Instalación.",
    "caracteristicas": "Coordinación y supervisión técnica integral de obra. Planificación de partidas, cubicación, control de mano de obra y garantía de término según cronograma.",
    "includes": [
      "Planificación y replanteo técnico en obra",
      "Demoliciones y despeje inicial del área según proyecto",
      "Ejecución coordinada de partidas (gasfitería, electricidad, albañilería, terminaciones)",
      "Instalación de muebles de cocina y cubiertas de cuarzo/madera",
      "Supervisión profesional en terreno y entrega formal con protocolo de recepción"
    ],
    "notIncludes": [
      "Artefactos de lujo o electrodomésticos especiales no descritos en la ficha base",
      "Aumentos de empalme eléctrico TE1/SEC ante la empresa distribuidora",
      "Obras civiles mayores de fundaciones o radieres no presupuestados"
    ],
    "conditions": "Sujeto a visita previa de factibilidad técnica y levantamiento de planos. Proyecto sujeto a contrato de ejecución de obra y cronograma valorizado.",
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
    "badge": "Proyectos Integrales",
    "description": "Proyectos mayores y remodelaciones llave en mano de cocinas, baños, energías renovables y módulos habitacionales con estándar de ingeniería civil. Especialidad: Proyecto de Instalación energía solar On-Grid.",
    "caracteristicas": "Coordinación y supervisión técnica integral de obra. Planificación de partidas, cubicación, control de mano de obra y garantía de término según cronograma.",
    "includes": [
      "Planificación y replanteo técnico en obra",
      "Demoliciones y despeje inicial del área según proyecto",
      "Ejecución coordinada de partidas (gasfitería, electricidad, albañilería, terminaciones)",
      "Instalación de muebles de cocina y cubiertas de cuarzo/madera",
      "Supervisión profesional en terreno y entrega formal con protocolo de recepción"
    ],
    "notIncludes": [
      "Artefactos de lujo o electrodomésticos especiales no descritos en la ficha base",
      "Aumentos de empalme eléctrico TE1/SEC ante la empresa distribuidora",
      "Obras civiles mayores de fundaciones o radieres no presupuestados"
    ],
    "conditions": "Sujeto a visita previa de factibilidad técnica y levantamiento de planos. Proyecto sujeto a contrato de ejecución de obra y cronograma valorizado.",
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
    "badge": "Proyectos Integrales",
    "description": "Proyectos mayores y remodelaciones llave en mano de cocinas, baños, energías renovables y módulos habitacionales con estándar de ingeniería civil. Especialidad: Proyecto de Instalación energía solar Off-Grid.",
    "caracteristicas": "Coordinación y supervisión técnica integral de obra. Planificación de partidas, cubicación, control de mano de obra y garantía de término según cronograma.",
    "includes": [
      "Planificación y replanteo técnico en obra",
      "Demoliciones y despeje inicial del área según proyecto",
      "Ejecución coordinada de partidas (gasfitería, electricidad, albañilería, terminaciones)",
      "Instalación de muebles de cocina y cubiertas de cuarzo/madera",
      "Supervisión profesional en terreno y entrega formal con protocolo de recepción"
    ],
    "notIncludes": [
      "Artefactos de lujo o electrodomésticos especiales no descritos en la ficha base",
      "Aumentos de empalme eléctrico TE1/SEC ante la empresa distribuidora",
      "Obras civiles mayores de fundaciones o radieres no presupuestados"
    ],
    "conditions": "Sujeto a visita previa de factibilidad técnica y levantamiento de planos. Proyecto sujeto a contrato de ejecución de obra y cronograma valorizado.",
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
    "badge": "Proyectos Integrales",
    "description": "Proyectos mayores y remodelaciones llave en mano de cocinas, baños, energías renovables y módulos habitacionales con estándar de ingeniería civil. Especialidad: Servicio de Instalación de Cargadores para Vehículos Eléctricos.",
    "caracteristicas": "Coordinación y supervisión técnica integral de obra. Planificación de partidas, cubicación, control de mano de obra y garantía de término según cronograma.",
    "includes": [
      "Planificación y replanteo técnico en obra",
      "Demoliciones y despeje inicial del área según proyecto",
      "Ejecución coordinada de partidas (gasfitería, electricidad, albañilería, terminaciones)",
      "Instalación de muebles de cocina y cubiertas de cuarzo/madera",
      "Supervisión profesional en terreno y entrega formal con protocolo de recepción"
    ],
    "notIncludes": [
      "Artefactos de lujo o electrodomésticos especiales no descritos en la ficha base",
      "Aumentos de empalme eléctrico TE1/SEC ante la empresa distribuidora",
      "Obras civiles mayores de fundaciones o radieres no presupuestados"
    ],
    "conditions": "Sujeto a visita previa de factibilidad técnica y levantamiento de planos. Proyecto sujeto a contrato de ejecución de obra y cronograma valorizado.",
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
    "badge": "Proyectos Integrales",
    "description": "Proyectos mayores y remodelaciones llave en mano de cocinas, baños, energías renovables y módulos habitacionales con estándar de ingeniería civil. Especialidad: Instalación con cobertura Nacional (General).",
    "caracteristicas": "Coordinación y supervisión técnica integral de obra. Planificación de partidas, cubicación, control de mano de obra y garantía de término según cronograma.",
    "includes": [
      "Planificación y replanteo técnico en obra",
      "Demoliciones y despeje inicial del área según proyecto",
      "Ejecución coordinada de partidas (gasfitería, electricidad, albañilería, terminaciones)",
      "Instalación de muebles de cocina y cubiertas de cuarzo/madera",
      "Supervisión profesional en terreno y entrega formal con protocolo de recepción"
    ],
    "notIncludes": [
      "Artefactos de lujo o electrodomésticos especiales no descritos en la ficha base",
      "Aumentos de empalme eléctrico TE1/SEC ante la empresa distribuidora",
      "Obras civiles mayores de fundaciones o radieres no presupuestados"
    ],
    "conditions": "Sujeto a visita previa de factibilidad técnica y levantamiento de planos. Proyecto sujeto a contrato de ejecución de obra y cronograma valorizado.",
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
    "badge": "Proyectos Integrales",
    "description": "Proyectos mayores y remodelaciones llave en mano de cocinas, baños, energías renovables y módulos habitacionales con estándar de ingeniería civil. Especialidad: Casa Modular Maiten 27.6 m2 Armada e Instalada.",
    "caracteristicas": "Coordinación y supervisión técnica integral de obra. Planificación de partidas, cubicación, control de mano de obra y garantía de término según cronograma.",
    "includes": [
      "Planificación y replanteo técnico en obra",
      "Demoliciones y despeje inicial del área según proyecto",
      "Ejecución coordinada de partidas (gasfitería, electricidad, albañilería, terminaciones)",
      "Instalación de muebles de cocina y cubiertas de cuarzo/madera",
      "Supervisión profesional en terreno y entrega formal con protocolo de recepción"
    ],
    "notIncludes": [
      "Artefactos de lujo o electrodomésticos especiales no descritos en la ficha base",
      "Aumentos de empalme eléctrico TE1/SEC ante la empresa distribuidora",
      "Obras civiles mayores de fundaciones o radieres no presupuestados"
    ],
    "conditions": "Sujeto a visita previa de factibilidad técnica y levantamiento de planos. Proyecto sujeto a contrato de ejecución de obra y cronograma valorizado.",
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
    "description": "Gestión ambiental responsable de enseres, colchones, muebles y electrodomésticos en desuso, asegurando su transporte y valorización en plantas de reciclaje. Especialidad: Servicio de Retiro y Reciclaje de 1 mueble.",
    "caracteristicas": "Retiro coordinado desde el domicilio particular. Traslado seguro a plantas de tratamiento certificadas para evitar el vertimiento en basurales clandestinos.",
    "includes": [
      "Retiro programado desde el interior de la vivienda o departamento",
      "Carga, estiba y transporte seguro en camión habilitado",
      "Entrega en centro de acopio o planta de valorización de residuos",
      "Trazabilidad y gestión con sello de sustentabilidad ambiental"
    ],
    "notIncludes": [
      "Desinstalación técnica de artefactos empotrados a la red de agua o gas",
      "Retiro de escombros de demolición masiva o residuos peligrosos/tóxicos",
      "Bajada por escaleras en edificios sin ascensor sobre pisos muy altos (se evalúa)"
    ],
    "conditions": "El producto debe estar completamente desconectado, desocupado, seco y listo para ser retirado en la puerta o recinto de fácil acceso.",
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
    "description": "Gestión ambiental responsable de enseres, colchones, muebles y electrodomésticos en desuso, asegurando su transporte y valorización en plantas de reciclaje. Especialidad: Servicio de Retiro y Reciclaje de Colchón.",
    "caracteristicas": "Retiro coordinado desde el domicilio particular. Traslado seguro a plantas de tratamiento certificadas para evitar el vertimiento en basurales clandestinos.",
    "includes": [
      "Retiro programado desde el interior de la vivienda o departamento",
      "Carga, estiba y transporte seguro en camión habilitado",
      "Entrega en centro de acopio o planta de valorización de residuos",
      "Trazabilidad y gestión con sello de sustentabilidad ambiental"
    ],
    "notIncludes": [
      "Desinstalación técnica de artefactos empotrados a la red de agua o gas",
      "Retiro de escombros de demolición masiva o residuos peligrosos/tóxicos",
      "Bajada por escaleras en edificios sin ascensor sobre pisos muy altos (se evalúa)"
    ],
    "conditions": "El producto debe estar completamente desconectado, desocupado, seco y listo para ser retirado en la puerta o recinto de fácil acceso.",
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
    "description": "Gestión ambiental responsable de enseres, colchones, muebles y electrodomésticos en desuso, asegurando su transporte y valorización en plantas de reciclaje. Especialidad: Servicio de Retiro y Reciclaje de 1 Electrodoméstico.",
    "caracteristicas": "Retiro coordinado desde el domicilio particular. Traslado seguro a plantas de tratamiento certificadas para evitar el vertimiento en basurales clandestinos.",
    "includes": [
      "Retiro programado desde el interior de la vivienda o departamento",
      "Carga, estiba y transporte seguro en camión habilitado",
      "Entrega en centro de acopio o planta de valorización de residuos",
      "Trazabilidad y gestión con sello de sustentabilidad ambiental"
    ],
    "notIncludes": [
      "Desinstalación técnica de artefactos empotrados a la red de agua o gas",
      "Retiro de escombros de demolición masiva o residuos peligrosos/tóxicos",
      "Bajada por escaleras en edificios sin ascensor sobre pisos muy altos (se evalúa)"
    ],
    "conditions": "El producto debe estar completamente desconectado, desocupado, seco y listo para ser retirado en la puerta o recinto de fácil acceso.",
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
    "description": "Gestión ambiental responsable de enseres, colchones, muebles y electrodomésticos en desuso, asegurando su transporte y valorización en plantas de reciclaje. Especialidad: Servicio de Retiro y Reciclaje de Calefont (sin desinstalación).",
    "caracteristicas": "Retiro coordinado desde el domicilio particular. Traslado seguro a plantas de tratamiento certificadas para evitar el vertimiento en basurales clandestinos.",
    "includes": [
      "Retiro programado desde el interior de la vivienda o departamento",
      "Carga, estiba y transporte seguro en camión habilitado",
      "Entrega en centro de acopio o planta de valorización de residuos",
      "Trazabilidad y gestión con sello de sustentabilidad ambiental"
    ],
    "notIncludes": [
      "Desinstalación técnica de artefactos empotrados a la red de agua o gas",
      "Retiro de escombros de demolición masiva o residuos peligrosos/tóxicos",
      "Bajada por escaleras en edificios sin ascensor sobre pisos muy altos (se evalúa)"
    ],
    "conditions": "El producto debe estar completamente desconectado, desocupado, seco y listo para ser retirado en la puerta o recinto de fácil acceso.",
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
    "badge": "100% Reembolsable",
    "description": "Evaluación técnica presencial en tu domicilio para levantar medidas, diagnosticar factibilidades de instalación y entregar un presupuesto detallado sin sorpresas. Especialidad: Asesoría diseño remodelación de Baño Cocina.",
    "caracteristicas": "Visita realizada por técnicos o profesionales de obra. Se realiza levantamiento métrico con distanciómetro láser, análisis de preexistencias y asesoría técnica directa.",
    "includes": [
      "Visita presencial coordinada en tu domicilio o terreno",
      "Levantamiento de medidas milimétricas y revisión de factibilidad",
      "Diagnóstico del estado de pisos, muros o redes existentes",
      "Envío de cotización y presupuesto formal en 24 a 48 horas",
      "El valor total pagado por la visita se descuenta íntegro al contratar el servicio"
    ],
    "notIncludes": [
      "Ejecución física de trabajos o reparaciones durante la visita técnica",
      "Elaboración de planos de arquitectura o memorias de cálculo de ingeniería"
    ],
    "conditions": "Válido para el radio urbano estándar. En caso de requerir visitas fuera del radio urbano, se coordinará un recargo por traslado.",
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
    "badge": "100% Reembolsable",
    "description": "Evaluación técnica presencial en tu domicilio para levantar medidas, diagnosticar factibilidades de instalación y entregar un presupuesto detallado sin sorpresas. Especialidad: Visita Presupuesto Instalación de Cerámica.",
    "caracteristicas": "Visita realizada por técnicos o profesionales de obra. Se realiza levantamiento métrico con distanciómetro láser, análisis de preexistencias y asesoría técnica directa.",
    "includes": [
      "Visita presencial coordinada en tu domicilio o terreno",
      "Levantamiento de medidas milimétricas y revisión de factibilidad",
      "Diagnóstico del estado de pisos, muros o redes existentes",
      "Envío de cotización y presupuesto formal en 24 a 48 horas",
      "El valor total pagado por la visita se descuenta íntegro al contratar el servicio"
    ],
    "notIncludes": [
      "Ejecución física de trabajos o reparaciones durante la visita técnica",
      "Elaboración de planos de arquitectura o memorias de cálculo de ingeniería"
    ],
    "conditions": "Contratación mínima de 15 m². Superficie base afinada, limpia y libre de humedad. Sujeto a rectificación técnica.",
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
    "badge": "100% Reembolsable",
    "description": "Evaluación técnica presencial en tu domicilio para levantar medidas, diagnosticar factibilidades de instalación y entregar un presupuesto detallado sin sorpresas. Especialidad: Visita Presupuesto Instalación de Piso Vinílico.",
    "caracteristicas": "Visita realizada por técnicos o profesionales de obra. Se realiza levantamiento métrico con distanciómetro láser, análisis de preexistencias y asesoría técnica directa.",
    "includes": [
      "Visita presencial coordinada en tu domicilio o terreno",
      "Levantamiento de medidas milimétricas y revisión de factibilidad",
      "Diagnóstico del estado de pisos, muros o redes existentes",
      "Envío de cotización y presupuesto formal en 24 a 48 horas",
      "El valor total pagado por la visita se descuenta íntegro al contratar el servicio"
    ],
    "notIncludes": [
      "Ejecución física de trabajos o reparaciones durante la visita técnica",
      "Elaboración de planos de arquitectura o memorias de cálculo de ingeniería"
    ],
    "conditions": "Contratación mínima de 15 m². Superficie base afinada, limpia y libre de humedad. Sujeto a rectificación técnica.",
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
    "badge": "100% Reembolsable",
    "description": "Evaluación técnica presencial en tu domicilio para levantar medidas, diagnosticar factibilidades de instalación y entregar un presupuesto detallado sin sorpresas. Especialidad: Visita Presupuesto Instalación de Porcelanato.",
    "caracteristicas": "Visita realizada por técnicos o profesionales de obra. Se realiza levantamiento métrico con distanciómetro láser, análisis de preexistencias y asesoría técnica directa.",
    "includes": [
      "Visita presencial coordinada en tu domicilio o terreno",
      "Levantamiento de medidas milimétricas y revisión de factibilidad",
      "Diagnóstico del estado de pisos, muros o redes existentes",
      "Envío de cotización y presupuesto formal en 24 a 48 horas",
      "El valor total pagado por la visita se descuenta íntegro al contratar el servicio"
    ],
    "notIncludes": [
      "Ejecución física de trabajos o reparaciones durante la visita técnica",
      "Elaboración de planos de arquitectura o memorias de cálculo de ingeniería"
    ],
    "conditions": "Contratación mínima de 15 m². Superficie base afinada, limpia y libre de humedad. Sujeto a rectificación técnica.",
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
    "badge": "100% Reembolsable",
    "description": "Evaluación técnica presencial en tu domicilio para levantar medidas, diagnosticar factibilidades de instalación y entregar un presupuesto detallado sin sorpresas. Especialidad: Visita Presupuesto Aplicación Pintura Exterior o Interior.",
    "caracteristicas": "Visita realizada por técnicos o profesionales de obra. Se realiza levantamiento métrico con distanciómetro láser, análisis de preexistencias y asesoría técnica directa.",
    "includes": [
      "Visita presencial coordinada en tu domicilio o terreno",
      "Levantamiento de medidas milimétricas y revisión de factibilidad",
      "Diagnóstico del estado de pisos, muros o redes existentes",
      "Envío de cotización y presupuesto formal en 24 a 48 horas",
      "El valor total pagado por la visita se descuenta íntegro al contratar el servicio"
    ],
    "notIncludes": [
      "Ejecución física de trabajos o reparaciones durante la visita técnica",
      "Elaboración de planos de arquitectura o memorias de cálculo de ingeniería"
    ],
    "conditions": "Válido para el radio urbano estándar. En caso de requerir visitas fuera del radio urbano, se coordinará un recargo por traslado.",
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
    "badge": "100% Reembolsable",
    "description": "Evaluación técnica presencial en tu domicilio para levantar medidas, diagnosticar factibilidades de instalación y entregar un presupuesto detallado sin sorpresas. Especialidad: Visita Presupuesto Fabricación e Instalación Ventanas a Medida.",
    "caracteristicas": "Visita realizada por técnicos o profesionales de obra. Se realiza levantamiento métrico con distanciómetro láser, análisis de preexistencias y asesoría técnica directa.",
    "includes": [
      "Visita presencial coordinada en tu domicilio o terreno",
      "Levantamiento de medidas milimétricas y revisión de factibilidad",
      "Diagnóstico del estado de pisos, muros o redes existentes",
      "Envío de cotización y presupuesto formal en 24 a 48 horas",
      "El valor total pagado por la visita se descuenta íntegro al contratar el servicio"
    ],
    "notIncludes": [
      "Ejecución física de trabajos o reparaciones durante la visita técnica",
      "Elaboración de planos de arquitectura o memorias de cálculo de ingeniería"
    ],
    "conditions": "Válido para el radio urbano estándar. En caso de requerir visitas fuera del radio urbano, se coordinará un recargo por traslado.",
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
    "badge": "100% Reembolsable",
    "description": "Evaluación técnica presencial en tu domicilio para levantar medidas, diagnosticar factibilidades de instalación y entregar un presupuesto detallado sin sorpresas. Especialidad: Visita Presupuesto Cortinas de Cristal Plegable Terrazas/Balcones.",
    "caracteristicas": "Visita realizada por técnicos o profesionales de obra. Se realiza levantamiento métrico con distanciómetro láser, análisis de preexistencias y asesoría técnica directa.",
    "includes": [
      "Visita presencial coordinada en tu domicilio o terreno",
      "Levantamiento de medidas milimétricas y revisión de factibilidad",
      "Diagnóstico del estado de pisos, muros o redes existentes",
      "Envío de cotización y presupuesto formal en 24 a 48 horas",
      "El valor total pagado por la visita se descuenta íntegro al contratar el servicio"
    ],
    "notIncludes": [
      "Ejecución física de trabajos o reparaciones durante la visita técnica",
      "Elaboración de planos de arquitectura o memorias de cálculo de ingeniería"
    ],
    "conditions": "Válido para el radio urbano estándar. En caso de requerir visitas fuera del radio urbano, se coordinará un recargo por traslado.",
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
    "badge": "100% Reembolsable",
    "description": "Evaluación técnica presencial en tu domicilio para levantar medidas, diagnosticar factibilidades de instalación y entregar un presupuesto detallado sin sorpresas. Especialidad: Visita Presupuesto Instalación Cubierta.",
    "caracteristicas": "Visita realizada por técnicos o profesionales de obra. Se realiza levantamiento métrico con distanciómetro láser, análisis de preexistencias y asesoría técnica directa.",
    "includes": [
      "Visita presencial coordinada en tu domicilio o terreno",
      "Levantamiento de medidas milimétricas y revisión de factibilidad",
      "Diagnóstico del estado de pisos, muros o redes existentes",
      "Envío de cotización y presupuesto formal en 24 a 48 horas",
      "El valor total pagado por la visita se descuenta íntegro al contratar el servicio"
    ],
    "notIncludes": [
      "Ejecución física de trabajos o reparaciones durante la visita técnica",
      "Elaboración de planos de arquitectura o memorias de cálculo de ingeniería"
    ],
    "conditions": "Válido para el radio urbano estándar. En caso de requerir visitas fuera del radio urbano, se coordinará un recargo por traslado.",
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
    "badge": "100% Reembolsable",
    "description": "Evaluación técnica presencial en tu domicilio para levantar medidas, diagnosticar factibilidades de instalación y entregar un presupuesto detallado sin sorpresas. Especialidad: Visita para presupuesto Instalación de Aire Acondicionado.",
    "caracteristicas": "Visita realizada por técnicos o profesionales de obra. Se realiza levantamiento métrico con distanciómetro láser, análisis de preexistencias y asesoría técnica directa.",
    "includes": [
      "Visita presencial coordinada en tu domicilio o terreno",
      "Levantamiento de medidas milimétricas y revisión de factibilidad",
      "Diagnóstico del estado de pisos, muros o redes existentes",
      "Envío de cotización y presupuesto formal en 24 a 48 horas",
      "El valor total pagado por la visita se descuenta íntegro al contratar el servicio"
    ],
    "notIncludes": [
      "Ejecución física de trabajos o reparaciones durante la visita técnica",
      "Elaboración de planos de arquitectura o memorias de cálculo de ingeniería"
    ],
    "conditions": "Válido para el radio urbano estándar. En caso de requerir visitas fuera del radio urbano, se coordinará un recargo por traslado.",
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
    "badge": "100% Reembolsable",
    "description": "Evaluación técnica presencial en tu domicilio para levantar medidas, diagnosticar factibilidades de instalación y entregar un presupuesto detallado sin sorpresas. Especialidad: Visita Presupuesto Instalación Sistema Paneles Solares.",
    "caracteristicas": "Visita realizada por técnicos o profesionales de obra. Se realiza levantamiento métrico con distanciómetro láser, análisis de preexistencias y asesoría técnica directa.",
    "includes": [
      "Visita presencial coordinada en tu domicilio o terreno",
      "Levantamiento de medidas milimétricas y revisión de factibilidad",
      "Diagnóstico del estado de pisos, muros o redes existentes",
      "Envío de cotización y presupuesto formal en 24 a 48 horas",
      "El valor total pagado por la visita se descuenta íntegro al contratar el servicio"
    ],
    "notIncludes": [
      "Ejecución física de trabajos o reparaciones durante la visita técnica",
      "Elaboración de planos de arquitectura o memorias de cálculo de ingeniería"
    ],
    "conditions": "Válido para el radio urbano estándar. En caso de requerir visitas fuera del radio urbano, se coordinará un recargo por traslado.",
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
    "badge": "100% Reembolsable",
    "description": "Evaluación técnica presencial en tu domicilio para levantar medidas, diagnosticar factibilidades de instalación y entregar un presupuesto detallado sin sorpresas. Especialidad: Visita para Presupuesto Instalación Portón Automático.",
    "caracteristicas": "Visita realizada por técnicos o profesionales de obra. Se realiza levantamiento métrico con distanciómetro láser, análisis de preexistencias y asesoría técnica directa.",
    "includes": [
      "Visita presencial coordinada en tu domicilio o terreno",
      "Levantamiento de medidas milimétricas y revisión de factibilidad",
      "Diagnóstico del estado de pisos, muros o redes existentes",
      "Envío de cotización y presupuesto formal en 24 a 48 horas",
      "El valor total pagado por la visita se descuenta íntegro al contratar el servicio"
    ],
    "notIncludes": [
      "Ejecución física de trabajos o reparaciones durante la visita técnica",
      "Elaboración de planos de arquitectura o memorias de cálculo de ingeniería"
    ],
    "conditions": "Válido para el radio urbano estándar. En caso de requerir visitas fuera del radio urbano, se coordinará un recargo por traslado.",
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
    "badge": "100% Reembolsable",
    "description": "Evaluación técnica presencial en tu domicilio para levantar medidas, diagnosticar factibilidades de instalación y entregar un presupuesto detallado sin sorpresas. Especialidad: Visita Presupuesto Instalación Calefactor Leña BOSCA.",
    "caracteristicas": "Visita realizada por técnicos o profesionales de obra. Se realiza levantamiento métrico con distanciómetro láser, análisis de preexistencias y asesoría técnica directa.",
    "includes": [
      "Visita presencial coordinada en tu domicilio o terreno",
      "Levantamiento de medidas milimétricas y revisión de factibilidad",
      "Diagnóstico del estado de pisos, muros o redes existentes",
      "Envío de cotización y presupuesto formal en 24 a 48 horas",
      "El valor total pagado por la visita se descuenta íntegro al contratar el servicio"
    ],
    "notIncludes": [
      "Ejecución física de trabajos o reparaciones durante la visita técnica",
      "Elaboración de planos de arquitectura o memorias de cálculo de ingeniería"
    ],
    "conditions": "Válido para el radio urbano estándar. En caso de requerir visitas fuera del radio urbano, se coordinará un recargo por traslado.",
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
    "badge": "100% Reembolsable",
    "description": "Evaluación técnica presencial en tu domicilio para levantar medidas, diagnosticar factibilidades de instalación y entregar un presupuesto detallado sin sorpresas. Especialidad: Visita Presupuesto Instalación Calefactor Leña AMESTI.",
    "caracteristicas": "Visita realizada por técnicos o profesionales de obra. Se realiza levantamiento métrico con distanciómetro láser, análisis de preexistencias y asesoría técnica directa.",
    "includes": [
      "Visita presencial coordinada en tu domicilio o terreno",
      "Levantamiento de medidas milimétricas y revisión de factibilidad",
      "Diagnóstico del estado de pisos, muros o redes existentes",
      "Envío de cotización y presupuesto formal en 24 a 48 horas",
      "El valor total pagado por la visita se descuenta íntegro al contratar el servicio"
    ],
    "notIncludes": [
      "Ejecución física de trabajos o reparaciones durante la visita técnica",
      "Elaboración de planos de arquitectura o memorias de cálculo de ingeniería"
    ],
    "conditions": "Válido para el radio urbano estándar. En caso de requerir visitas fuera del radio urbano, se coordinará un recargo por traslado.",
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
    "badge": "100% Reembolsable",
    "description": "Evaluación técnica presencial en tu domicilio para levantar medidas, diagnosticar factibilidades de instalación y entregar un presupuesto detallado sin sorpresas. Especialidad: Visita Presupuesto Instalación Calefactor Pellet BOSCA.",
    "caracteristicas": "Visita realizada por técnicos o profesionales de obra. Se realiza levantamiento métrico con distanciómetro láser, análisis de preexistencias y asesoría técnica directa.",
    "includes": [
      "Visita presencial coordinada en tu domicilio o terreno",
      "Levantamiento de medidas milimétricas y revisión de factibilidad",
      "Diagnóstico del estado de pisos, muros o redes existentes",
      "Envío de cotización y presupuesto formal en 24 a 48 horas",
      "El valor total pagado por la visita se descuenta íntegro al contratar el servicio"
    ],
    "notIncludes": [
      "Ejecución física de trabajos o reparaciones durante la visita técnica",
      "Elaboración de planos de arquitectura o memorias de cálculo de ingeniería"
    ],
    "conditions": "Válido para el radio urbano estándar. En caso de requerir visitas fuera del radio urbano, se coordinará un recargo por traslado.",
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
    "badge": "100% Reembolsable",
    "description": "Evaluación técnica presencial en tu domicilio para levantar medidas, diagnosticar factibilidades de instalación y entregar un presupuesto detallado sin sorpresas. Especialidad: Visita Presupuesto Instalación Calefactor Pellet Otras Marcas.",
    "caracteristicas": "Visita realizada por técnicos o profesionales de obra. Se realiza levantamiento métrico con distanciómetro láser, análisis de preexistencias y asesoría técnica directa.",
    "includes": [
      "Visita presencial coordinada en tu domicilio o terreno",
      "Levantamiento de medidas milimétricas y revisión de factibilidad",
      "Diagnóstico del estado de pisos, muros o redes existentes",
      "Envío de cotización y presupuesto formal en 24 a 48 horas",
      "El valor total pagado por la visita se descuenta íntegro al contratar el servicio"
    ],
    "notIncludes": [
      "Ejecución física de trabajos o reparaciones durante la visita técnica",
      "Elaboración de planos de arquitectura o memorias de cálculo de ingeniería"
    ],
    "conditions": "Válido para el radio urbano estándar. En caso de requerir visitas fuera del radio urbano, se coordinará un recargo por traslado.",
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
    "badge": "100% Reembolsable",
    "description": "Evaluación técnica presencial en tu domicilio para levantar medidas, diagnosticar factibilidades de instalación y entregar un presupuesto detallado sin sorpresas. Especialidad: Visita Presupuesto Instalación de Calefón.",
    "caracteristicas": "Visita realizada por técnicos o profesionales de obra. Se realiza levantamiento métrico con distanciómetro láser, análisis de preexistencias y asesoría técnica directa.",
    "includes": [
      "Visita presencial coordinada en tu domicilio o terreno",
      "Levantamiento de medidas milimétricas y revisión de factibilidad",
      "Diagnóstico del estado de pisos, muros o redes existentes",
      "Envío de cotización y presupuesto formal en 24 a 48 horas",
      "El valor total pagado por la visita se descuenta íntegro al contratar el servicio"
    ],
    "notIncludes": [
      "Ejecución física de trabajos o reparaciones durante la visita técnica",
      "Elaboración de planos de arquitectura o memorias de cálculo de ingeniería"
    ],
    "conditions": "Válido para el radio urbano estándar. En caso de requerir visitas fuera del radio urbano, se coordinará un recargo por traslado.",
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
    "badge": "100% Reembolsable",
    "description": "Evaluación técnica presencial en tu domicilio para levantar medidas, diagnosticar factibilidades de instalación y entregar un presupuesto detallado sin sorpresas. Especialidad: Visita Presupuesto Confección e Instalación Cortinas Roller.",
    "caracteristicas": "Visita realizada por técnicos o profesionales de obra. Se realiza levantamiento métrico con distanciómetro láser, análisis de preexistencias y asesoría técnica directa.",
    "includes": [
      "Visita presencial coordinada en tu domicilio o terreno",
      "Levantamiento de medidas milimétricas y revisión de factibilidad",
      "Diagnóstico del estado de pisos, muros o redes existentes",
      "Envío de cotización y presupuesto formal en 24 a 48 horas",
      "El valor total pagado por la visita se descuenta íntegro al contratar el servicio"
    ],
    "notIncludes": [
      "Ejecución física de trabajos o reparaciones durante la visita técnica",
      "Elaboración de planos de arquitectura o memorias de cálculo de ingeniería"
    ],
    "conditions": "Válido para el radio urbano estándar. En caso de requerir visitas fuera del radio urbano, se coordinará un recargo por traslado.",
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
    "badge": "100% Reembolsable",
    "description": "Evaluación técnica presencial en tu domicilio para levantar medidas, diagnosticar factibilidades de instalación y entregar un presupuesto detallado sin sorpresas. Especialidad: Visita Presupuesto Instalación Antena Starlink.",
    "caracteristicas": "Visita realizada por técnicos o profesionales de obra. Se realiza levantamiento métrico con distanciómetro láser, análisis de preexistencias y asesoría técnica directa.",
    "includes": [
      "Visita presencial coordinada en tu domicilio o terreno",
      "Levantamiento de medidas milimétricas y revisión de factibilidad",
      "Diagnóstico del estado de pisos, muros o redes existentes",
      "Envío de cotización y presupuesto formal en 24 a 48 horas",
      "El valor total pagado por la visita se descuenta íntegro al contratar el servicio"
    ],
    "notIncludes": [
      "Ejecución física de trabajos o reparaciones durante la visita técnica",
      "Elaboración de planos de arquitectura o memorias de cálculo de ingeniería"
    ],
    "conditions": "Válido para el radio urbano estándar. En caso de requerir visitas fuera del radio urbano, se coordinará un recargo por traslado.",
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
    "badge": "100% Reembolsable",
    "description": "Evaluación técnica presencial en tu domicilio para levantar medidas, diagnosticar factibilidades de instalación y entregar un presupuesto detallado sin sorpresas. Especialidad: Visita Presupuesto Instalación Toldo para Ventana.",
    "caracteristicas": "Visita realizada por técnicos o profesionales de obra. Se realiza levantamiento métrico con distanciómetro láser, análisis de preexistencias y asesoría técnica directa.",
    "includes": [
      "Visita presencial coordinada en tu domicilio o terreno",
      "Levantamiento de medidas milimétricas y revisión de factibilidad",
      "Diagnóstico del estado de pisos, muros o redes existentes",
      "Envío de cotización y presupuesto formal en 24 a 48 horas",
      "El valor total pagado por la visita se descuenta íntegro al contratar el servicio"
    ],
    "notIncludes": [
      "Ejecución física de trabajos o reparaciones durante la visita técnica",
      "Elaboración de planos de arquitectura o memorias de cálculo de ingeniería"
    ],
    "conditions": "Válido para el radio urbano estándar. En caso de requerir visitas fuera del radio urbano, se coordinará un recargo por traslado.",
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
    "badge": "100% Reembolsable",
    "description": "Evaluación técnica presencial en tu domicilio para levantar medidas, diagnosticar factibilidades de instalación y entregar un presupuesto detallado sin sorpresas. Especialidad: Visita Presupuesto Citofonía y Videoportero.",
    "caracteristicas": "Visita realizada por técnicos o profesionales de obra. Se realiza levantamiento métrico con distanciómetro láser, análisis de preexistencias y asesoría técnica directa.",
    "includes": [
      "Visita presencial coordinada en tu domicilio o terreno",
      "Levantamiento de medidas milimétricas y revisión de factibilidad",
      "Diagnóstico del estado de pisos, muros o redes existentes",
      "Envío de cotización y presupuesto formal en 24 a 48 horas",
      "El valor total pagado por la visita se descuenta íntegro al contratar el servicio"
    ],
    "notIncludes": [
      "Ejecución física de trabajos o reparaciones durante la visita técnica",
      "Elaboración de planos de arquitectura o memorias de cálculo de ingeniería"
    ],
    "conditions": "Válido para el radio urbano estándar. En caso de requerir visitas fuera del radio urbano, se coordinará un recargo por traslado.",
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
    "badge": "100% Reembolsable",
    "description": "Evaluación técnica presencial en tu domicilio para levantar medidas, diagnosticar factibilidades de instalación y entregar un presupuesto detallado sin sorpresas. Especialidad: Visita Presupuesto Instalación Video Portero.",
    "caracteristicas": "Visita realizada por técnicos o profesionales de obra. Se realiza levantamiento métrico con distanciómetro láser, análisis de preexistencias y asesoría técnica directa.",
    "includes": [
      "Visita presencial coordinada en tu domicilio o terreno",
      "Levantamiento de medidas milimétricas y revisión de factibilidad",
      "Diagnóstico del estado de pisos, muros o redes existentes",
      "Envío de cotización y presupuesto formal en 24 a 48 horas",
      "El valor total pagado por la visita se descuenta íntegro al contratar el servicio"
    ],
    "notIncludes": [
      "Ejecución física de trabajos o reparaciones durante la visita técnica",
      "Elaboración de planos de arquitectura o memorias de cálculo de ingeniería"
    ],
    "conditions": "Válido para el radio urbano estándar. En caso de requerir visitas fuera del radio urbano, se coordinará un recargo por traslado.",
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
    "badge": "100% Reembolsable",
    "description": "Evaluación técnica presencial en tu domicilio para levantar medidas, diagnosticar factibilidades de instalación y entregar un presupuesto detallado sin sorpresas. Especialidad: Visita Presupuesto Instalación Puertas.",
    "caracteristicas": "Visita realizada por técnicos o profesionales de obra. Se realiza levantamiento métrico con distanciómetro láser, análisis de preexistencias y asesoría técnica directa.",
    "includes": [
      "Visita presencial coordinada en tu domicilio o terreno",
      "Levantamiento de medidas milimétricas y revisión de factibilidad",
      "Diagnóstico del estado de pisos, muros o redes existentes",
      "Envío de cotización y presupuesto formal en 24 a 48 horas",
      "El valor total pagado por la visita se descuenta íntegro al contratar el servicio"
    ],
    "notIncludes": [
      "Ejecución física de trabajos o reparaciones durante la visita técnica",
      "Elaboración de planos de arquitectura o memorias de cálculo de ingeniería"
    ],
    "conditions": "Válido para el radio urbano estándar. En caso de requerir visitas fuera del radio urbano, se coordinará un recargo por traslado.",
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
    "badge": "100% Reembolsable",
    "description": "Evaluación técnica presencial en tu domicilio para levantar medidas, diagnosticar factibilidades de instalación y entregar un presupuesto detallado sin sorpresas. Especialidad: Visita Presupuesto Instalación Papel Mural.",
    "caracteristicas": "Visita realizada por técnicos o profesionales de obra. Se realiza levantamiento métrico con distanciómetro láser, análisis de preexistencias y asesoría técnica directa.",
    "includes": [
      "Visita presencial coordinada en tu domicilio o terreno",
      "Levantamiento de medidas milimétricas y revisión de factibilidad",
      "Diagnóstico del estado de pisos, muros o redes existentes",
      "Envío de cotización y presupuesto formal en 24 a 48 horas",
      "El valor total pagado por la visita se descuenta íntegro al contratar el servicio"
    ],
    "notIncludes": [
      "Ejecución física de trabajos o reparaciones durante la visita técnica",
      "Elaboración de planos de arquitectura o memorias de cálculo de ingeniería"
    ],
    "conditions": "Válido para el radio urbano estándar. En caso de requerir visitas fuera del radio urbano, se coordinará un recargo por traslado.",
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
    "badge": "100% Reembolsable",
    "description": "Evaluación técnica presencial en tu domicilio para levantar medidas, diagnosticar factibilidades de instalación y entregar un presupuesto detallado sin sorpresas. Especialidad: Visita Presupuesto Instalación Pasto Sintético.",
    "caracteristicas": "Visita realizada por técnicos o profesionales de obra. Se realiza levantamiento métrico con distanciómetro láser, análisis de preexistencias y asesoría técnica directa.",
    "includes": [
      "Visita presencial coordinada en tu domicilio o terreno",
      "Levantamiento de medidas milimétricas y revisión de factibilidad",
      "Diagnóstico del estado de pisos, muros o redes existentes",
      "Envío de cotización y presupuesto formal en 24 a 48 horas",
      "El valor total pagado por la visita se descuenta íntegro al contratar el servicio"
    ],
    "notIncludes": [
      "Ejecución física de trabajos o reparaciones durante la visita técnica",
      "Elaboración de planos de arquitectura o memorias de cálculo de ingeniería"
    ],
    "conditions": "Válido para el radio urbano estándar. En caso de requerir visitas fuera del radio urbano, se coordinará un recargo por traslado.",
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
    "badge": "100% Reembolsable",
    "description": "Evaluación técnica presencial en tu domicilio para levantar medidas, diagnosticar factibilidades de instalación y entregar un presupuesto detallado sin sorpresas. Especialidad: Visita para presupuesto Instalación Mampara o Cabina de ducha.",
    "caracteristicas": "Visita realizada por técnicos o profesionales de obra. Se realiza levantamiento métrico con distanciómetro láser, análisis de preexistencias y asesoría técnica directa.",
    "includes": [
      "Visita presencial coordinada en tu domicilio o terreno",
      "Levantamiento de medidas milimétricas y revisión de factibilidad",
      "Diagnóstico del estado de pisos, muros o redes existentes",
      "Envío de cotización y presupuesto formal en 24 a 48 horas",
      "El valor total pagado por la visita se descuenta íntegro al contratar el servicio"
    ],
    "notIncludes": [
      "Ejecución física de trabajos o reparaciones durante la visita técnica",
      "Elaboración de planos de arquitectura o memorias de cálculo de ingeniería"
    ],
    "conditions": "Válido para el radio urbano estándar. En caso de requerir visitas fuera del radio urbano, se coordinará un recargo por traslado.",
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
    "badge": "100% Reembolsable",
    "description": "Evaluación técnica presencial en tu domicilio para levantar medidas, diagnosticar factibilidades de instalación y entregar un presupuesto detallado sin sorpresas. Especialidad: Visita Presupuesto Instalación Lámina para Renovar Puertas Muebles.",
    "caracteristicas": "Visita realizada por técnicos o profesionales de obra. Se realiza levantamiento métrico con distanciómetro láser, análisis de preexistencias y asesoría técnica directa.",
    "includes": [
      "Visita presencial coordinada en tu domicilio o terreno",
      "Levantamiento de medidas milimétricas y revisión de factibilidad",
      "Diagnóstico del estado de pisos, muros o redes existentes",
      "Envío de cotización y presupuesto formal en 24 a 48 horas",
      "El valor total pagado por la visita se descuenta íntegro al contratar el servicio"
    ],
    "notIncludes": [
      "Ejecución física de trabajos o reparaciones durante la visita técnica",
      "Elaboración de planos de arquitectura o memorias de cálculo de ingeniería"
    ],
    "conditions": "Válido para el radio urbano estándar. En caso de requerir visitas fuera del radio urbano, se coordinará un recargo por traslado.",
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
    "badge": "100% Reembolsable",
    "description": "Evaluación técnica presencial en tu domicilio para levantar medidas, diagnosticar factibilidades de instalación y entregar un presupuesto detallado sin sorpresas. Especialidad: Visita de inspiración.",
    "caracteristicas": "Visita realizada por técnicos o profesionales de obra. Se realiza levantamiento métrico con distanciómetro láser, análisis de preexistencias y asesoría técnica directa.",
    "includes": [
      "Visita presencial coordinada en tu domicilio o terreno",
      "Levantamiento de medidas milimétricas y revisión de factibilidad",
      "Diagnóstico del estado de pisos, muros o redes existentes",
      "Envío de cotización y presupuesto formal en 24 a 48 horas",
      "El valor total pagado por la visita se descuenta íntegro al contratar el servicio"
    ],
    "notIncludes": [
      "Ejecución física de trabajos o reparaciones durante la visita técnica",
      "Elaboración de planos de arquitectura o memorias de cálculo de ingeniería"
    ],
    "conditions": "Válido para el radio urbano estándar. En caso de requerir visitas fuera del radio urbano, se coordinará un recargo por traslado.",
    "iconType": "file"
  }
];
