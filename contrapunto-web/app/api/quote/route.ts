import { NextRequest, NextResponse } from 'next/server';
import { QuoteServerSchema } from '@/lib/schemas';
import { getPresignedUploadUrls } from '@/lib/storage';
import { generateId } from '@/lib/utils';
import { sendQuoteEmails } from '@/lib/email';
import { rateLimit } from '@/lib/rate-limiter';
import { env } from '@/lib/env';

// ─── POST /api/quote ────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  // 1. Obtener la IP del cliente para aplicar Rate Limiting
  const ip = request.ip || request.headers.get('x-forwarded-for') || '127.0.0.1';
  
  // Rate Limit: Máximo 5 solicitudes cada 15 minutos por IP
  const limitResult = rateLimit(ip, { limit: 5, windowMs: 15 * 60 * 1000 });
  
  // Encabezados estándar de Rate Limiting
  const rateLimitHeaders = {
    'X-RateLimit-Limit': String(limitResult.limit),
    'X-RateLimit-Remaining': String(limitResult.remaining),
  };

  if (limitResult.isLimited) {
    return NextResponse.json(
      { 
        success: false, 
        error: `Demasiadas solicitudes. Por favor, intenta de nuevo en ${limitResult.retryAfterSeconds} segundos.` 
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

  // 2. Control preliminar del tamaño del Payload (Mitigación DoS)
  // Como solo enviamos metadatos de archivos y textos, el payload no debería exceder los 100KB.
  const contentLength = request.headers.get('content-length');
  if (contentLength && parseInt(contentLength, 10) > 100 * 1024) {
    return NextResponse.json(
      { success: false, error: 'Tamaño de solicitud excedido (máximo 100KB).' },
      { status: 413, headers: rateLimitHeaders }
    );
  }

  try {
    // 3. Parsear el body como JSON de forma segura
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Cuerpo de solicitud inválido. Se esperaba JSON.' },
        { status: 400, headers: rateLimitHeaders }
      );
    }

    // 4. Validación estricta con Zod en el servidor
    const validationResult = QuoteServerSchema.safeParse(body);

    if (!validationResult.success) {
      // Formatear errores de Zod para respuesta estructurada
      const formattedErrors = validationResult.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          success: false,
          error: 'Datos del formulario inválidos.',
          errors: formattedErrors,
        },
        { status: 400, headers: rateLimitHeaders }
      );
    }

    const { fileMetadata, ...formData } = validationResult.data;

    // 5. Generar ID único para esta cotización
    const quoteId = generateId();

    // 6. Generar URLs pre-firmadas para los archivos (si existen)
    let uploadUrls: Awaited<ReturnType<typeof getPresignedUploadUrls>> = [];
    
    if (fileMetadata && fileMetadata.length > 0) {
      try {
        uploadUrls = await getPresignedUploadUrls(fileMetadata, quoteId);
      } catch (storageError) {
        console.error('[Storage Error]', storageError);
        // No fallamos el request completo por error de storage
        // El cliente puede reintentar solo el upload
      }
    }

    // 7. Envío de correos de notificación (Administrador y Cliente)
    // Envolvemos en try/catch para que un problema de conexión SMTP no detenga la respuesta de éxito al usuario
    try {
      const mappedFiles = fileMetadata?.map((file, idx) => ({
        filename: file.name,
        publicUrl: uploadUrls[idx]?.publicUrl || `https://storage.simulated.dev/files/${file.name}`,
      })) || [];

      await sendQuoteEmails({
        quoteId,
        formData,
        uploadUrls: mappedFiles,
      });
    } catch (emailError) {
      console.error('[Quote API] Error de integración de correo:', emailError);
    }

    // Log de desarrollo (solo en modo desarrollo)
    if (env.NODE_ENV === 'development') {
      console.log('[Quote API] Nueva cotización recibida:', {
        quoteId,
        fullName: formData.fullName,
        email: formData.email,
        projectType: formData.projectType,
        filesCount: fileMetadata?.length ?? 0,
      });
    }

    // 8. Respuesta exitosa con headers de rate-limiting
    return NextResponse.json(
      {
        success: true,
        quoteId,
        uploadUrls,
        message: `Tu solicitud fue recibida. Nos contactaremos a ${formData.email} en menos de 24 horas.`,
      },
      { 
        status: 200, 
        headers: rateLimitHeaders 
      }
    );

  } catch (error) {
    // Error inesperado del servidor
    console.error('[Quote API] Error interno:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error interno del servidor. Intenta nuevamente.',
      },
      { status: 500, headers: rateLimitHeaders }
    );
  }
}

// ─── GET /api/quote (solo para health check / documentación) ───────────────────
export async function GET() {
  return NextResponse.json(
    {
      endpoint: 'POST /api/quote',
      description: 'Endpoint para recibir solicitudes de cotización de proyectos',
      version: '1.1.0',
      fields: [
        'fullName', 'email', 'phone', 'comuna',
        'projectType', 'budget', 'description', 'fileMetadata?',
      ],
    },
    { status: 200 }
  );
}
