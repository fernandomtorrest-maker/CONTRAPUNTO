import { env } from './env';

const GEMINI_SYSTEM_INSTRUCTION = `
Eres el Ingeniero de Obras y Consultor Técnico de Contrapunto Constructora, una firma chilena de arquitectura, diseño y construcción de alta gama. Tu propósito es responder consultas de clientes y prospectos de manera rigurosamente técnica, precisa y objetiva.

INSTRUCCIONES DE TONO Y COMPORTAMIENTO:
1. Sé estrictamente técnico, profesional y pragmático.
2. Evita cualquier tipo de lenguaje condescendiente, preámbulos conversacionales, rodeos o elogios (por ejemplo, nunca digas: "¡Excelente pregunta!", "Es un gusto saludarte", "Espero que estés muy bien", "Con mucho gusto te explico", etc.).
3. Responde directamente a la consulta del usuario usando terminología de arquitectura, ingeniería civil y construcción chilena.
4. Si la consulta del usuario es informal, respóndele formal y técnicamente.
5. Utiliza términos y abreviaciones técnicas locales cuando corresponda (ej: DOM, OGUC, LGUC, UF, m², NCh).

NÚCLEO DE CONOCIMIENTO TÉCNICO:

I. NORMATIVA DE CONSTRUCCIÓN CHILENA (OGUC y LGUC):
- Permisos y Trámites: Toda obra nueva, ampliación o alteración estructural requiere aprobación previa de la Dirección de Obras Municipales (DOM) mediante un Permiso de Edificación y su posterior Recepción Final.
- Resistencia al Fuego (Art. 4.3.3 OGUC): Los muros divisorios entre unidades de vivienda pareadas o adosadas deben cumplir con una resistencia al fuego mínima de F-60 a F-120 según el tipo de edificación y altura. Las estructuras soportantes principales deben cumplir con la clasificación correspondiente (Tipo A, B, C, o D).
- Acondicionamiento Térmico (Art. 4.1.10 OGUC): Exigencias de transmitancia térmica (U) obligatoria para techumbres, muros perimetrales y pisos ventilados según la zona térmica de Chile (de Zona 1 a Zona 7). E.g., Zona 3 (Santiago): Techo U <= 0.47 W/m²K, Muros U <= 1.9 W/m²K.
- Normativa Sísmica: Toda estructura en Chile se rige por la NCh433 (Diseño Sísmico de Edificios) y la NCh430 (Hormigón Armado), considerando zonas sísmicas (Zona 1, 2 y 3, siendo la 3 la costera de mayor aceleración) y tipo de suelo (Suelo A a Suelo E).
- Accesibilidad Universal (Art. 2.2.8 OGUC): Rampas peatonales con pendiente máxima de 8% (o hasta 12% para tramos muy cortos según justificación), anchos mínimos de puertas de 90 cm y pasillos mínimos de 120 cm libres para circulación de sillas de ruedas.

II. CRITERIOS, VALORES Y SERVICIOS DE CONTRAPUNTO:
- Filosofía Arquitectónica: "Partituras para Habitar" (Scores for Living).
- Las 3 Reglas del Acorde (Principios del diseño espacial):
  1. Independencia Funcional: Los espacios deben adaptarse de forma limpia a múltiples usos simultáneos sin interferir en la circulación.
  2. Diferencia Formal: Uso de volúmenes bien definidos para separar zonas de uso (público, privado, de trabajo).
  3. Encuentros Conscientes: Celebración de las uniones de materiales y sistemas estructurales (ej: juntas de madera noble con vigas de acero negro, transiciones de hormigón a madera).
- Sistemas Constructivos: Wood-frame, Steel-frame y estructuras híbridas con revestimientos en maderas nobles (pino machihembrado media luna, oregón, raulí), acero expuesto y hormigón visto.
- Servicios Principales:
  * Proyectos a Medida: Diseño y construcción de Tiny Houses, Tiny Offices, Quinchos y Terrazas.
  * Flipping Inmobiliario: Adquisición, remodelación integral de alta calidad y reventa.
  * Crowdfunding Inmobiliario: Inversión colaborativa de alta rentabilidad orientada al arriendo de cabinas turísticas y desarrollos de nicho.
- Valores y Costos Referenciales:
  * Tiny Houses y Tiny Offices (Terminadas "llave en mano"): Rango de 35 a 45 UF por metro cuadrado (m²).
  * Terrazas y Quinchos de Alta Gama (Con pilares de acero o madera noble, cubiertas de policarbonato/madera, parrilla integrada): Rango de 15 a 25 UF por metro cuadrado (m²).
  * Remodelaciones Integrales: Desde 10 UF por metro cuadrado (m²), sujeto a factibilidad técnica de la estructura existente.

III. RESPUESTAS ANTE CONSULTAS COMERCIALES:
- Si el usuario solicita presupuesto exacto, explícale que toda cotización requiere un estudio de cabida en el terreno y diseño preliminar. Direcciónalos a cotizar en la web formalmente o a agendar una llamada con la gerencia comercial a través de contacto@contrapuntoconstructora.com.
`;

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export async function askAgent(history: ChatMessage[], nextMessage: string): Promise<string> {
  const apiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('[Agent API] GEMINI_API_KEY is not defined. Returning simulator mode.');
    
    const query = nextMessage.toLowerCase();
    
    if (query.includes('fuego') || query.includes('incendio') || query.includes('cortafuego') || query.includes('4.3.3')) {
      return "[MODO SIMULADOR TÉCNICO - SIN API KEY]\n\nDe acuerdo al artículo 4.3.3 de la Ordenanza General de Urbanismo y Construcciones (OGUC) de Chile, las exigencias de resistencia al fuego para muros divisorios cortafuegos entre viviendas pareadas varían entre F-60 y F-120. Esto depende de la clasificación de la edificación (clase y altura). Las estructuras soportantes verticales deben ser continuas desde el cimiento hasta el techo y poseer el mismo índice de resistencia para evitar propagaciones laterales y verticales en caso de siniestro.";
    }
    
    if (query.includes('acorde') || query.includes('regla') || query.includes('filosofía') || query.includes('filosofia') || query.includes('composición')) {
      return "[MODO SIMULADOR TÉCNICO - SIN API KEY]\n\nEl diseño y composición espacial de Contrapunto Constructora se rige por las '3 Reglas del Acorde':\n\n1. **Independencia Funcional:** Organización que permite la coexistencia de diferentes actividades (público, privado, teletrabajo) sin interferencia en la circulación principal.\n2. **Diferencia Formal:** Articulación volumétrica que distingue claramente las zonas espaciales del proyecto.\n3. **Encuentros Conscientes:** Valoración de los puntos de unión de materiales distintos (como vigas metálicas oscuras conectándose con columnas de pino oregón y transiciones a hormigón visto), transformando los detalles estructurales en hitos estéticos.";
    }
    
    if (query.includes('precio') || query.includes('valor') || query.includes('uf') || query.includes('costo') || query.includes('m2') || query.includes('m²')) {
      return "[MODO SIMULADOR TÉCNICO - SIN API KEY]\n\nEn Contrapunto Constructora operamos con los siguientes costos y tarifas paramétricas de referencia:\n\n* **Tiny Houses y Tiny Offices (Llave en mano):** El rango estimado fluctúa entre las 35 y 45 UF por metro cuadrado (m²), dependiendo de las especificaciones y el grado de autosustentabilidad.\n* **Quinchos y Terrazas de Alta Gama:** Rango aproximado entre 15 y 25 UF por metro cuadrado (m²), considerando estructura de madera noble o acero con cubiertas ventiladas.\n* **Remodelaciones Completas:** Desde 10 UF por metro cuadrado (m²), sujeto a estudio de factibilidad técnica y estructural.";
    }
    
    if (query.includes('térmico') || query.includes('termico') || query.includes('aislamiento') || query.includes('4.1.10') || query.includes('santiago') || query.includes('zona 3')) {
      return "[MODO SIMULADOR TÉCNICO - SIN API KEY]\n\nEl artículo 4.1.10 de la OGUC establece la obligatoriedad de acondicionamiento térmico para viviendas nuevas en Chile. Para la Zona 3 (Santiago/Región Metropolitana), se exige una transmitancia térmica (U) máxima de:\n* Techumbre: U <= 0.47 W/m²K (resistencia térmica mínima equivalente R100 de 188).\n* Muros perimetrales: U <= 1.90 W/m²K (R100 de 37).\n* Pisos ventilados: U <= 0.60 W/m²K (R100 de 147).\n\nEn Contrapunto superamos esta norma utilizando lana mineral o poliuretano proyectado de alta densidad en tabiquerías wood-frame para optimizar la inercia térmica.";
    }
    
    if (query.includes('permiso') || query.includes('recepción') || query.includes('recepcion') || query.includes('dom') || query.includes('municipal')) {
      return "[MODO SIMULADOR TÉCNICO - SIN API KEY]\n\nToda alteración estructural, ampliación o edificación nueva en territorio chileno requiere un Permiso de Edificación previo otorgado por la Dirección de Obras Municipales (DOM) respectiva. Una vez finalizada la obra con apego a los planos aprobados y las normas sísmicas y de fuego, se debe tramitar la Recepción Final (o Recepción Definitiva). Ejecutar obras sin estos permisos expone al propietario a multas del juzgado de policía local y órdenes de demolición.";
    }
    
    return "[MODO SIMULADOR TÉCNICO - SIN API KEY]\n\nPara procesar consultas libres y dinámicas en tiempo real con inteligencia artificial (Gemini 1.5), es indispensable que configures tu clave en el archivo local 'contrapunto-web/.env.local' en la variable 'GEMINI_API_KEY'.\n\nMientras tanto, puedes consultar al simulador técnico sobre los siguientes temas:\n* Exigencias de fuego de la OGUC\n* Criterios y las 3 reglas del acorde de Contrapunto\n* Valores y tarifas de m² (Tiny Houses y Quinchos)\n* Acondicionamiento térmico en Chile (Art. 4.1.10)\n* Permisos municipales y Recepción Final de la DOM";
  }

  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`;

  // Format history and the new message for Gemini contents
  const contents = [
    {
      role: 'user',
      parts: [{ text: `INSTRUCCIÓN DEL SISTEMA (Asume este rol técnico de forma permanente):\n${GEMINI_SYSTEM_INSTRUCTION}` }]
    },
    {
      role: 'model',
      parts: [{ text: 'Entendido. Asumo el rol de Ingeniero de Obras y Consultor Técnico de Contrapunto. Responderé de manera estrictamente técnica, objetiva, directa y sin condescendencia.' }]
    },
    ...history.map((msg) => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    })),
    {
      role: 'user',
      parts: [{ text: nextMessage }],
    },
  ];

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.15,
          maxOutputTokens: 1000,
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('[Gemini API Error]', errText);
      if (response.status === 401) {
        if (apiKey && apiKey.startsWith('AQ.')) {
          return "[MÉTODO DE AUTENTICACIÓN - API KEY AQ.]\n\nEl motor de Gemini ha denegado el acceso con código 401.\n\nEsto se debe a un problema conocido de compatibilidad en los servidores de Google: las nuevas claves API creadas en Google AI Studio que comienzan con el prefijo 'AQ.' presentan fallos al ser usadas mediante llamadas API directas y requieren autenticación OAuth. Por favor, genera una clave API clásica (que comience con el prefijo 'AIzaSy') desde Google AI Studio utilizando una cuenta de Gmail personal para habilitar las consultas en tiempo real.";
        }
        return "[ERROR DE AUTENTICACIÓN - 401]\n\nLa clave API de Gemini configurada en '.env.local' fue rechazada por los servidores de Google (401 Unauthorized). Verifique que esté correctamente copiada sin espacios ni caracteres adicionales.";
      }
      throw new Error(`Gemini API returned status ${response.status}`);
    }

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!replyText) {
      throw new Error('Formato de respuesta de Gemini inválido');
    }

    return replyText.trim();
  } catch (error) {
    console.error('[Agent Connection Error]', error);
    return "Error de Conexión: No se pudo conectar con el motor de Inteligencia Artificial para procesar la respuesta. Por favor, reintente en unos momentos.";
  }
}
