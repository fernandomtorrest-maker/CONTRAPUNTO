/**
 * lib/email.ts
 * 
 * Servicio de envío de notificaciones de correo electrónico usando Nodemailer.
 * Soporta configuración SMTP de Hostinger y plantillas de diseño premium.
 */

import nodemailer from 'nodemailer';
import type { QuoteServerPayload } from './schemas';
import { env } from './env';

// ─── Configuración de Variables de Entorno ────────────────────────────────────
const SMTP_HOST = env.SMTP_HOST;
const SMTP_PORT = env.SMTP_PORT;
const SMTP_USER = env.SMTP_USER;
const SMTP_PASSWORD = env.SMTP_PASSWORD;
const SMTP_FROM = env.SMTP_FROM || (SMTP_USER ? `"Constructora Contrapunto" <${SMTP_USER}>` : '');
const SMTP_TO = env.SMTP_TO;

// ─── Inicializar Transporter de Nodemailer ────────────────────────────────────
const isSmtpConfigured = !!SMTP_USER && !!SMTP_PASSWORD;

const transporter = isSmtpConfigured
  ? nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465, // True para puerto 465, false para otros
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
      // Timeout settings to avoid hanging connections
      connectionTimeout: 10000, // 10s
      greetingTimeout: 10000,
      socketTimeout: 15000,
    })
  : null;

// En modo desarrollo sin credenciales, advertir en consola
if (!isSmtpConfigured) {
  console.warn(
    '[Email Service] ADVERTENCIA: SMTP_USER y SMTP_PASSWORD no configurados. ' +
    `Los correos se simularán y se enviarán de forma real una vez que agregues las variables de entorno en el panel de Hostinger.\n` +
    `Destinatario de cotizaciones por defecto: ${SMTP_TO}`
  );
}

/**
 * Escapes special characters for HTML to prevent HTML Injection/XSS in email clients.
 */
function escapeHtml(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Verifica la conexión con el servidor SMTP.
 * Útil para endpoints de health check.
 */
export async function verifyEmailConnection(): Promise<{ success: boolean; error?: string }> {
  if (!transporter) {
    return { success: false, error: 'SMTP no está configurado.' };
  }
  try {
    await transporter.verify();
    return { success: true };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return { success: false, error: msg };
  }
}

interface SendEmailParams {
  quoteId: string;
  formData: Omit<QuoteServerPayload, 'fileMetadata'>;
  uploadUrls: Array<{ filename: string; publicUrl: string }>;
}

/**
 * Envía las notificaciones de correo electrónico (Administrador y Cliente).
 */
export async function sendQuoteEmails({
  quoteId,
  formData,
  uploadUrls,
}: SendEmailParams): Promise<{ success: boolean; error?: string }> {
  try {
    // Escapar todos los campos antes de renderizar para prevenir HTML Injection
    const safeData = {
      fullName: escapeHtml(formData.fullName),
      email: escapeHtml(formData.email),
      phone: escapeHtml(formData.phone),
      comuna: escapeHtml(formData.comuna),
      projectType: escapeHtml(formData.projectType),
      budget: escapeHtml(formData.budget),
      description: escapeHtml(formData.description),
    };

    const safeUploadUrls = uploadUrls.map(u => ({
      filename: escapeHtml(u.filename),
      publicUrl: escapeHtml(u.publicUrl) // URLs should be clean, but let's make sure they are safe
    }));

    const adminHtml = getAdminEmailHtml(quoteId, safeData, safeUploadUrls);
    const clientHtml = getClientEmailHtml(safeData);

    if (transporter) {
      // 1. Enviar alerta al Administrador
      await transporter.sendMail({
        from: SMTP_FROM || SMTP_USER,
        to: SMTP_TO,
        subject: `[Nueva Cotización] ID: ${quoteId} — ${safeData.fullName}`,
        html: adminHtml,
      });

      // 2. Enviar confirmación al Cliente (Acuse de recibo)
      await transporter.sendMail({
        from: SMTP_FROM || SMTP_USER,
        to: formData.email, // Use original email for destination header
        subject: `Recibimos tu solicitud de cotización — Constructora Contrapunto`,
        html: clientHtml,
      });

      console.log(`[Email Service] Correos enviados de forma real para Cotización ID: ${quoteId}`);
    } else {
      // Modo Simulado (Consola de desarrollo)
      console.log('=== [EMAIL SIMULADO - ADMINISTRADOR] ===');
      console.log(`De: ${SMTP_FROM || 'Simulated'}`);
      console.log(`Para: ${SMTP_TO}`);
      console.log(`Asunto: [Nueva Cotización] ID: ${quoteId} — ${safeData.fullName}`);
      console.log('----------------------------------------------------');
      console.log(`Cliente: ${safeData.fullName} (${safeData.email})`);
      console.log(`Teléfono: ${safeData.phone}`);
      console.log(`Comuna: ${safeData.comuna}`);
      console.log(`Proyecto: ${safeData.projectType} — Presupuesto: ${safeData.budget}`);
      console.log(`Descripción: ${safeData.description}`);
      console.log(`Archivos (${safeUploadUrls.length}):`, safeUploadUrls);
      console.log('====================================================\n');

      console.log('=== [EMAIL SIMULADO - CLIENTE] ===');
      console.log(`De: ${SMTP_FROM || 'Simulated'}`);
      console.log(`Para: ${safeData.email}`);
      console.log('Asunto: Recibimos tu solicitud de cotización — Constructora Contrapunto');
      console.log(`Mensaje: Estimado/a ${safeData.fullName}, hemos recibido tu solicitud.`);
      console.log('====================================================');
    }

    return { success: true };
  } catch (error: unknown) {
    console.error('[Email Service Error]', error);
    const errorMessage = error instanceof Error ? error.message : 'Error al enviar correos';
    return { success: false, error: errorMessage };
  }
}

// ─── Plantilla HTML: Administrador ───────────────────
function getAdminEmailHtml(
  quoteId: string,
  data: Omit<QuoteServerPayload, 'fileMetadata'>,
  files: Array<{ filename: string; publicUrl: string }>
): string {
  const filesListHtml = files.length > 0
    ? files
        .map(
          (f) =>
            `<li style="margin-bottom: 6px;">
              <a href="${f.publicUrl}" target="_blank" style="color: #cda250; text-decoration: none; font-weight: bold;">
                🔗 Descargar: ${f.filename.split('/').pop()}
              </a>
             </li>`
        )
        .join('')
    : '<li style="color: #888888; font-style: italic;">No se adjuntaron archivos de referencia.</li>';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Nueva Cotización</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background-color: #0f0e0c; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #f9f6f0; -webkit-font-smoothing: antialiased;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0f0e0c; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #1a1916; border: 1px solid #2d2b27; padding: 40px; text-align: left;">
              <!-- Header -->
              <tr>
                <td style="border-bottom: 1px solid #2d2b27; padding-bottom: 20px;">
                  <span style="color: #cda250; font-size: 11px; font-weight: bold; letter-spacing: 3px; text-transform: uppercase; display: block; margin-bottom: 5px;">CONSTRUCTORA CONTRAPUNTO</span>
                  <h1 style="color: #f9f6f0; font-size: 24px; font-weight: 800; margin: 0; letter-spacing: 1px; text-transform: uppercase;">NUEVA COTIZACIÓN RECIBIDA</h1>
                  <span style="color: #888888; font-size: 11px; display: block; margin-top: 5px;">ID DE PROYECTO: ${quoteId}</span>
                </td>
              </tr>
              
              <!-- Detalles del Cliente -->
              <tr>
                <td style="padding: 24px 0 10px 0;">
                  <h2 style="color: #cda250; font-size: 13px; font-weight: 800; margin: 0 0 16px 0; letter-spacing: 2px; text-transform: uppercase; border-left: 2px solid #cda250; padding-left: 8px;">DATOS DEL CLIENTE</h2>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 13px; color: #f9f6f0;">
                    <tr>
                      <td width="150" style="padding: 6px 0; color: #888888; font-weight: bold; text-transform: uppercase; font-size: 11px;">Nombre Completo:</td>
                      <td style="padding: 6px 0; font-weight: bold;">${data.fullName}</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0; color: #888888; font-weight: bold; text-transform: uppercase; font-size: 11px;">Email:</td>
                      <td style="padding: 6px 0;">
                        <a href="mailto:${data.email}" style="color: #f9f6f0; text-decoration: none; border-bottom: 1px dotted #888888;">${data.email}</a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0; color: #888888; font-weight: bold; text-transform: uppercase; font-size: 11px;">Teléfono:</td>
                      <td style="padding: 6px 0;">
                        <a href="https://wa.me/${data.phone.replace(/[^0-9]/g, '')}" target="_blank" style="color: #25d366; text-decoration: none; font-weight: bold;">
                          ${data.phone} (Abrir WhatsApp 💬)
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0; color: #888888; font-weight: bold; text-transform: uppercase; font-size: 11px;">Comuna:</td>
                      <td style="padding: 6px 0; font-weight: bold;">${data.comuna}</td>
                    </tr>
                  </table>
                </td>
              </tr>
 
              <!-- Detalles del Proyecto -->
              <tr>
                <td style="padding: 20px 0 10px 0; border-top: 1px solid #2d2b27;">
                  <h2 style="color: #cda250; font-size: 13px; font-weight: 800; margin: 0 0 16px 0; letter-spacing: 2px; text-transform: uppercase; border-left: 2px solid #cda250; padding-left: 8px;">DETALLES DEL PROYECTO</h2>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 13px; color: #f9f6f0;">
                    <tr>
                      <td width="150" style="padding: 6px 0; color: #888888; font-weight: bold; text-transform: uppercase; font-size: 11px;">Tipo de Obra:</td>
                      <td style="padding: 6px 0; font-weight: bold; text-transform: uppercase; color: #cda250;">${data.projectType}</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0; color: #888888; font-weight: bold; text-transform: uppercase; font-size: 11px;">Presupuesto:</td>
                      <td style="padding: 6px 0; font-weight: bold;">${data.budget}</td>
                    </tr>
                  </table>
                </td>
              </tr>
 
              <!-- Descripción -->
              <tr>
                <td style="padding: 20px 0; border-top: 1px solid #2d2b27;">
                  <h2 style="color: #cda250; font-size: 13px; font-weight: 800; margin: 0 0 12px 0; letter-spacing: 2px; text-transform: uppercase; border-left: 2px solid #cda250; padding-left: 8px;">DESCRIPCIÓN DEL REQUERIMIENTO</h2>
                  <div style="background-color: #0f0e0c; border: 1px solid #2d2b27; padding: 16px; border-radius: 4px; font-size: 13px; line-height: 1.6; color: #dfd5c6; white-space: pre-wrap;">${data.description}</div>
                </td>
              </tr>
 
              <!-- Archivos Adjuntos -->
              <tr>
                <td style="padding: 20px 0 10px 0; border-top: 1px solid #2d2b27;">
                  <h2 style="color: #cda250; font-size: 13px; font-weight: 800; margin: 0 0 12px 0; letter-spacing: 2px; text-transform: uppercase; border-left: 2px solid #cda250; padding-left: 8px;">REFERENCIAS Y PLANOS ADJUNTOS</h2>
                  <ul style="margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.6;">
                    ${filesListHtml}
                  </ul>
                </td>
              </tr>
 
              <!-- Footer -->
              <tr>
                <td align="center" style="border-top: 1px solid #2d2b27; padding-top: 24px; font-size: 10px; color: #888888; text-transform: uppercase; letter-spacing: 1px;">
                  © 2026 CONSTRUCTORA CONTRAPUNTO — SISTEMA DE CAPTACIÓN WEB
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

// ─── Plantilla HTML: Cliente (Acuse de recibo) ─────────────────────────────────
function getClientEmailHtml(data: Omit<QuoteServerPayload, 'fileMetadata'>): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Recibimos tu solicitud</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background-color: #0f0e0c; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #f9f6f0; -webkit-font-smoothing: antialiased;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0f0e0c; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #1a1916; border: 1px solid #2d2b27; padding: 45px; text-align: left;">
              <!-- Logo / Header -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-bottom: 1px solid #2d2b27; padding-bottom: 25px; margin-bottom: 25px;">
                <tr>
                  <td>
                    <span style="color: #cda250; font-size: 11px; font-weight: bold; letter-spacing: 4px; text-transform: uppercase; display: block; margin-bottom: 4px;">CONSTRUCTORA CONTRAPUNTO</span>
                    <span style="color: #888888; font-size: 10px; text-transform: uppercase; letter-spacing: 2px;">DISEÑO • CONSTRUCCIÓN • OFICIO</span>
                  </td>
                </tr>
              </table>
 
              <!-- Mensaje Principal -->
              <tr>
                <td>
                  <p style="font-size: 15px; line-height: 1.6; margin-top: 0; color: #dfd5c6;">
                    Estimado/a <strong>${data.fullName}</strong>,
                  </p>
                  <p style="font-size: 14px; line-height: 1.6; color: #dfd5c6;">
                    Queremos confirmarte que hemos recibido exitosamente tu requerimiento para el proyecto de <strong>${data.projectType}</strong> en la comuna de <strong>${data.comuna}</strong>.
                  </p>
                  <p style="font-size: 14px; line-height: 1.6; color: #dfd5c6;">
                    En <strong>Constructora Contrapunto</strong> valoramos la precisión y los materiales nobles. Nuestro equipo técnico y de arquitectura ya está analizando los detalles y referencias que nos compartiste para preparar una propuesta inicial a tu medida.
                  </p>
                  
                  <!-- Tarjeta de Compromiso -->
                  <div style="background-color: #0f0e0c; border: 1px solid #2d2b27; border-left: 3px solid #cda250; padding: 20px; margin: 30px 0; border-radius: 2px;">
                    <h3 style="color: #cda250; font-size: 13px; font-weight: bold; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px;">Nuestro Compromiso de Respuesta</h3>
                    <p style="font-size: 13px; margin: 0; color: #f9f6f0; line-height: 1.5;">
                      Un especialista se pondrá en contacto contigo en un plazo <strong>menor a 24 horas hábiles</strong> a través de tu correo (${data.email}) o al teléfono <strong>${data.phone}</strong>.
                    </p>
                  </div>
 
                  <p style="font-size: 14px; line-height: 1.6; color: #dfd5c6;">
                    Si tienes alguna duda inmediata o quieres agregar más antecedentes a tu proyecto, puedes responder directamente a este correo o escribirnos vía WhatsApp en el siguiente botón:
                  </p>
 
                  <!-- Botón de Acción -->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 30px 0 10px 0; text-align: center;">
                    <tr>
                      <td>
                        <a href="https://wa.me/56912345678?text=Hola%20Constructora%20Contrapunto,%20acabo%20de%20enviar%20una%20cotizacion%20desde%20la%20web" target="_blank" style="background-color: #cda250; color: #0f0e0c; display: inline-block; padding: 14px 28px; text-decoration: none; font-size: 12px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; border-radius: 0px; box-shadow: 0 4px 10px rgba(205, 162, 80, 0.2);">
                          Conversar por WhatsApp 💬
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
 
              <!-- Firma y Cierre -->
              <tr>
                <td style="border-top: 1px solid #2d2b27; margin-top: 40px; padding-top: 25px;">
                  <p style="font-size: 12px; line-height: 1.5; color: #888888; margin: 0;">
                    Atentamente,<br>
                    <strong style="color: #f9f6f0;">Equipo de Arquitectura y Construcción</strong><br>
                    Constructora Contrapunto S.A.<br>
                    <span style="font-size: 10px; text-transform: uppercase; color: #888888; letter-spacing: 1px;">Santiago, Chile • www.constructoracontrapunto.cl</span>
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}
