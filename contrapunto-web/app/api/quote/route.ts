import { NextRequest, NextResponse } from 'next/server';
import { QuoteServerSchema } from '@/lib/schemas';
import { getPresignedUploadUrls } from '@/lib/storage';
import { generateId } from '@/lib/utils';

// ─── POST /api/quote ────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    // 1. Parsear el body como JSON
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Body inválido. Se esperaba JSON.' },
        { status: 400 }
      );
    }

    // 2. Validación estricta con Zod en el servidor
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
        { status: 400 }
      );
    }

    const { fileMetadata, ...formData } = validationResult.data;

    // 3. Generar ID único para esta cotización
    const quoteId = generateId();

    // 4. Generar URLs pre-firmadas para los archivos (si existen)
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

    // 5. TODO: Aquí se integraría el envío de email (Resend/SendGrid/Nodemailer)
    // await sendQuoteNotificationEmail({ quoteId, formData, uploadUrls });

    // 6. TODO: Aquí se integraría la persistencia en DB (PostgreSQL/MongoDB)
    // await db.quotes.create({ id: quoteId, ...formData, status: 'pending' });

    // Log de desarrollo (remover en producción o reemplazar con logger)
    if (process.env.NODE_ENV === 'development') {
      console.log('[Quote API] Nueva cotización recibida:', {
        quoteId,
        fullName: formData.fullName,
        email: formData.email,
        projectType: formData.projectType,
        filesCount: fileMetadata?.length ?? 0,
      });
    }

    // 7. Respuesta exitosa
    return NextResponse.json(
      {
        success: true,
        quoteId,
        uploadUrls,
        message: `Tu solicitud fue recibida. Nos contactaremos a ${formData.email} en menos de 24 horas.`,
      },
      { status: 200 }
    );

  } catch (error) {
    // Error inesperado del servidor
    console.error('[Quote API] Error interno:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error interno del servidor. Intenta nuevamente.',
      },
      { status: 500 }
    );
  }
}

// ─── GET /api/quote (solo para health check / documentación) ───────────────────
export async function GET() {
  return NextResponse.json(
    {
      endpoint: 'POST /api/quote',
      description: 'Endpoint para recibir solicitudes de cotización de proyectos',
      version: '1.0.0',
      fields: [
        'fullName', 'email', 'phone', 'comuna',
        'projectType', 'budget', 'description', 'fileMetadata?',
      ],
    },
    { status: 200 }
  );
}
