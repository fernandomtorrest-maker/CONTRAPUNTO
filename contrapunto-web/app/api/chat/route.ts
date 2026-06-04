import { NextRequest, NextResponse } from 'next/server';
import { askAgent, ChatMessage } from '@/lib/whatsapp-agent';
import { rateLimit } from '@/lib/rate-limiter';

export async function POST(request: NextRequest) {
  // 1. Rate Limiting: Max 20 queries per 15 minutes per IP for AI chat
  const ip = request.ip || request.headers.get('x-forwarded-for') || '127.0.0.1';
  const limitResult = rateLimit(ip, { limit: 20, windowMs: 15 * 60 * 1000 });

  const rateLimitHeaders = {
    'X-RateLimit-Limit': String(limitResult.limit),
    'X-RateLimit-Remaining': String(limitResult.remaining),
  };

  if (limitResult.isLimited) {
    return NextResponse.json(
      {
        success: false,
        error: `Consumo de IA excedido. Por favor, reintenta en ${limitResult.retryAfterSeconds} segundos.`
      },
      {
        status: 429,
        headers: {
          ...rateLimitHeaders,
          'Retry-After': String(limitResult.retryAfterSeconds)
        }
      }
    );
  }

  try {
    const body = await request.json();
    const { message, history } = body as { message: string; history: ChatMessage[] };

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Mensaje inválido. Se requiere "message" en formato de texto.' },
        { status: 400, headers: rateLimitHeaders }
      );
    }

    const validatedHistory = Array.isArray(history) ? history : [];

    // Call the Gemini Agent Helper
    const response = await askAgent(validatedHistory, message);

    return NextResponse.json(
      {
        success: true,
        response,
      },
      {
        status: 200,
        headers: rateLimitHeaders,
      }
    );
  } catch (error) {
    console.error('[Chat API Error]', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error interno al procesar la respuesta con el Agente de IA.',
      },
      { status: 500, headers: rateLimitHeaders }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      endpoint: 'POST /api/chat',
      description: 'Endpoint privado para consultas al Agente Técnico Contrapunto',
      version: '1.0.0',
    },
    { status: 200 }
  );
}
