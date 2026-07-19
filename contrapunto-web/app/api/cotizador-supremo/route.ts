import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/lib/env';
import bbddPuData from '@/lib/data/bbdd_pu.json';

// Normalize strings for comparison (lowercase, strip accents, remove non-alphanumeric)
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/[^a-z0-9\s]/g, ' ') // replace special chars with space
    .replace(/\s+/g, ' ')
    .trim();
}

// Simple scoring system for matching search terms to database descriptions
interface DbItem {
  id: number;
  code: string;
  description: string;
  unit: string;
  type: string;
  priceUf: number;
}

function matchDatabaseItem(searchTerm: string, userUnit: string): { matched: DbItem | null; alternatives: DbItem[] } {
  const cleanSearch = normalizeText(searchTerm);
  const searchWords = cleanSearch.split(' ').filter(w => w.length > 2);
  
  if (searchWords.length === 0) {
    searchWords.push(cleanSearch);
  }

  const items = bbddPuData as DbItem[];
  const candidates: { item: DbItem; score: number }[] = [];

  for (const item of items) {
    if (item.type !== 'Partida') continue; // only price items

    const descClean = normalizeText(item.description);
    let score = 0;

    // 1. Check exact phrase match (very high weight)
    if (descClean.includes(cleanSearch)) {
      score += 1000;
    }

    // 2. Check word overlap (high weight per word)
    for (const word of searchWords) {
      if (descClean.includes(word)) {
        score += 200;
      }
    }

    // 3. Exact code match
    if (item.code.toLowerCase() === searchTerm.toLowerCase().trim()) {
      score += 5000;
    }

    // 4. Boost score slightly if unit matches or is similar (tie-breaker only)
    const itemUnitClean = normalizeText(item.unit);
    const userUnitClean = normalizeText(userUnit);
    if (userUnitClean && (itemUnitClean === userUnitClean || itemUnitClean.includes(userUnitClean) || userUnitClean.includes(itemUnitClean))) {
      score += 10;
    }

    if (score > 0) {
      candidates.push({ item, score });
    }
  }

  // Sort by score descending
  candidates.sort((a, b) => b.score - a.score);

  if (candidates.length === 0) {
    return { matched: null, alternatives: [] };
  }

  // Best match is candidate 0
  const matched = candidates[0].item;
  // Alternatives are candidates 1 to 5
  const alternatives = candidates.slice(1, 6).map(c => c.item);

  return { matched, alternatives };
}

const SYSTEM_PROMPT = `
Eres un analizador de solicitudes de cotización de construcción en Chile. Tu tarea es extraer de forma estructurada las partidas (trabajos, materiales o servicios) mencionadas por el usuario en español, identificando la cantidad, la unidad de medida y un término de búsqueda simplificado que se parezca lo más posible a cómo se denominaría técnicamente en una base de datos de construcción.

REGLAS DE EXTRACCIÓN E HOMOLOGACIÓN:
1. Identifica cada partida individual mencionada.
2. Si el usuario menciona una partida compleja que involucre más de un trabajo (ej: "pintura latex y luego esmalte al agua"), sepáralo en partidas individuales si corresponden a ítems diferentes (ej: una partida para "latex" y otra para "esmalte al agua"), usando la misma cantidad y unidad asignadas a ese grupo.
3. Extrae la cantidad numérica exacta. Si no se especifica, asume 1.
4. Normaliza la unidad de medida a abreviaciones comunes: "m2", "m3", "ml", "mes", "un", "gl", "kg".
5. Traduce términos informales a términos técnicos de construcción para facilitar el match en la base de datos (ej: usa "pavimento vinilico" en lugar de "piso vinilico", "latex" o "esmalte al agua" en lugar de "pintura", "retiro de escombros" en lugar de "sacar basura").

Ejemplo de entrada:
"necesito cotizar 50m2 de instalacion de piso vinilico y 200m2 de pintura (latex y luego esmalte al agua), retiro de escombros 2m3"

Ejemplo de salida estrictamente en formato JSON array (sin markdown, sin bloques de código \`\`\`json, solo el texto JSON crudo):
[
  {"cantidad": 50, "unidad": "m2", "partida_busqueda": "pavimento vinilico"},
  {"cantidad": 200, "unidad": "m2", "partida_busqueda": "latex"},
  {"cantidad": 200, "unidad": "m2", "partida_busqueda": "esmalte al agua"},
  {"cantidad": 2, "unidad": "m3", "partida_busqueda": "retiro de escombros"}
]
`;

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Se requiere la propiedad "prompt" en formato texto.' },
        { status: 400 }
      );
    }

    const apiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'GEMINI_API_KEY no está configurada.' },
        { status: 500 }
      );
    }

    // Call Gemini API to parse the prompt
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`;
    const contents = [
      {
        role: 'user',
        parts: [{ text: `${SYSTEM_PROMPT}\n\nAnaliza la siguiente solicitud del usuario:\n"${prompt}"` }]
      }
    ];

    const geminiResponse = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 4000,
          responseMimeType: "application/json"
        }
      })
    });

    if (!geminiResponse.ok) {
      const errText = await geminiResponse.text();
      console.error('[Gemini API Error]', errText);
      return NextResponse.json(
        { success: false, error: 'Error al comunicarse con el motor de IA.' },
        { status: 500 }
      );
    }

    const geminiData = await geminiResponse.json();
    let replyText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    // Clean code block markers if any
    replyText = replyText.replace(/```json/g, '').replace(/```/g, '').trim();

    let parsedIntentions: { cantidad: number; unidad: string; partida_busqueda: string }[] = [];
    try {
      parsedIntentions = JSON.parse(replyText);
    } catch (parseErr) {
      console.error('[JSON Parse Error] Raw text:', replyText, parseErr);
      return NextResponse.json(
        { success: false, error: 'No se pudo estructurar el análisis de la IA.', rawText: replyText },
        { status: 500 }
      );
    }

    // Match parsed intentions against the local JSON database
    const results = parsedIntentions.map((intention) => {
      const { matched, alternatives } = matchDatabaseItem(intention.partida_busqueda, intention.unidad);
      return {
        originalQuery: intention.partida_busqueda,
        requestedQty: intention.cantidad,
        requestedUnit: intention.unidad,
        matchedItem: matched ? {
          id: matched.id,
          code: matched.code,
          description: matched.description,
          unit: matched.unit,
          priceUf: matched.priceUf
        } : null,
        alternatives: alternatives.map(alt => ({
          id: alt.id,
          code: alt.code,
          description: alt.description,
          unit: alt.unit,
          priceUf: alt.priceUf
        }))
      };
    });

    return NextResponse.json({
      success: true,
      results
    });

  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : 'Error interno del servidor.';
    console.error('[Cotizador API Error]', err);
    return NextResponse.json(
      { success: false, error: errorMsg },
      { status: 500 }
    );
  }
}
