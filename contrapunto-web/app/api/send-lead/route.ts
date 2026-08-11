import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

const LEADS_FILE_PATH = path.join(process.cwd(), 'lib', 'data', 'leads.json');

// Guardar nuevo lead en archivo JSON local
function appendLeadToDatabase(leadData: {
  nombre?: string;
  telefono?: string;
  email?: string;
  proyecto?: string;
  mensaje?: string;
  detalles?: string;
  comuna?: string;
}) {
  try {
    let currentLeads: Array<{
      id: string;
      nombre: string;
      telefono: string;
      correo: string;
      servicio: string;
      comuna: string;
      mensaje: string;
      status: string;
      assignedTo: string;
      createdAt: string;
      notes: string;
    }> = [];

    if (fs.existsSync(LEADS_FILE_PATH)) {
      const fileData = fs.readFileSync(LEADS_FILE_PATH, 'utf8');
      currentLeads = JSON.parse(fileData);
    }

    let fullMensaje = '';
    if (leadData.mensaje && leadData.mensaje.trim()) {
      fullMensaje += `💬 MENSAJE / DETALLES DEL CLIENTE:\n"${leadData.mensaje.trim()}"\n\n`;
    }
    if (leadData.detalles && leadData.detalles.trim()) {
      fullMensaje += `📋 RESUMEN TÉCNICO DE COTIZACIÓN:\n${leadData.detalles.trim()}`;
    }
    if (!fullMensaje.trim()) {
      fullMensaje = 'Sin mensaje ni detalles adicionales especificados.';
    }

    const newEntry = {
      id: `lead-${Date.now()}`,
      nombre: leadData.nombre?.trim() || 'Cliente Sin Nombre',
      telefono: leadData.telefono?.trim() || 'No especificado',
      correo: leadData.email?.trim() || '',
      servicio: leadData.proyecto?.trim() || 'Cotización Web',
      comuna: leadData.comuna?.trim() || 'No especificada',
      mensaje: fullMensaje,
      status: 'Nuevo',
      assignedTo: 'Sin Asignar',
      createdAt: new Date().toISOString(),
      notes: ''
    };

    currentLeads.unshift(newEntry);
    fs.writeFileSync(LEADS_FILE_PATH, JSON.stringify(currentLeads, null, 2), 'utf8');
    console.log(`[Lead DB Persistent] Lead guardado exitosamente en ${LEADS_FILE_PATH}`);
  } catch (err) {
    console.error('Error al guardar lead en JSON:', err);
  }
}

// Configuración SMTP cargada de variables de entorno o fallbacks
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.hostinger.com';
const SMTP_PORT = Number(process.env.SMTP_PORT) || 465;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;

// Inicialización del transportador SMTP
const transporter = SMTP_USER && SMTP_PASSWORD
  ? nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
      connectionTimeout: 10000,
    })
  : null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, telefono, email, proyecto, mensaje, detalles } = body;

    // Guardar lead automáticamente en base de datos persistente
    appendLeadToDatabase(body);

    // Destinatarios indicados por el usuario
    const recipients = [
      'contacto@contrapuntoconstructora.com',
      'Fernando.m.torres.t@gmail.com'
    ];

    const mailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Nuevo Lead - Cotizador Contrapunto</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 30px; border-radius: 8px; border: 1px solid #ddd;">
          <h2 style="color: #8d775f; border-bottom: 2px solid #8d775f; padding-bottom: 10px;">NUEVO CLIENTE INTERESADO (COTIZADOR)</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 150px;">Nombre:</td>
              <td style="padding: 8px 0;">${nombre || 'No especificado'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Teléfono:</td>
              <td style="padding: 8px 0;"><a href="tel:${telefono}" style="color: #8d775f; text-decoration: none;">${telefono || 'No especificado'}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #8d775f; text-decoration: none;">${email || 'No especificado'}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Proyecto:</td>
              <td style="padding: 8px 0; font-weight: bold; color: #8d775f;">${proyecto || 'No especificado'}</td>
            </tr>
          </table>

          <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #8d775f; border-radius: 4px;">
            <h3 style="margin: 0 0 10px 0; color: #8d775f; font-size: 15px;">Detalles de la Cotización:</h3>
            <p style="margin: 0; font-size: 14px; white-space: pre-wrap; line-height: 1.5;">${detalles || 'No se cargaron detalles adicionales.'}</p>
          </div>

          <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #aaa; border-radius: 4px;">
            <h3 style="margin: 0 0 10px 0; font-size: 15px; color: #555;">Mensaje Opcional:</h3>
            <p style="margin: 0; font-size: 14px; white-space: pre-wrap; line-height: 1.5;">${mensaje || 'Sin mensaje adicional.'}</p>
          </div>

          <p style="margin-top: 30px; font-size: 11px; color: #888; text-align: center; border-top: 1px solid #eee; padding-top: 20px;">
            Este lead fue generado automáticamente por el cotizador interactivo en Constructora Contrapunto.
          </p>
        </div>
      </body>
      </html>
    `;

    if (transporter) {
      // Envío real si SMTP está configurado
      await transporter.sendMail({
        from: `"${nombre || 'Cotizador Contrapunto'}" <${SMTP_USER}>`,
        to: recipients.join(', '),
        subject: `[Lead Web] ${nombre || 'Nuevo Cliente'} — Proyecto: ${proyecto || 'No especificado'}`,
        html: mailHtml,
        replyTo: email || undefined,
      });
      console.log(`[Lead Email API] Correo de lead enviado con éxito para: ${nombre}`);
    } else {
      // Modo simulado en logs si no hay credenciales SMTP en local
      console.log('=== [EMAIL SIMULADO DE LEAD - ENTORNO LOCAL] ===');
      console.log(`Para: ${recipients.join(', ')}`);
      console.log(`De: ${SMTP_USER || 'Simulado'}`);
      console.log(`Asunto: [Lead Web] ${nombre} — Proyecto: ${proyecto}`);
      console.log(`Detalles: ${detalles}`);
      console.log(`Mensaje: ${mensaje}`);
      console.log('==================================================');
    }

    return NextResponse.json({ success: true, message: 'Lead enviado correctamente.' }, { status: 200 });

  } catch (error: unknown) {
    console.error('[Lead API Error]', error);
    const errorMessage = error instanceof Error ? error.message : 'Error interno del servidor al procesar el lead.';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
