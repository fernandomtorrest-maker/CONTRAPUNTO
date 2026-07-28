import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { verifyAdminToken, hasRrhhPermission } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  const payload = token ? await verifyAdminToken(token) : null;

  if (!payload || !hasRrhhPermission(payload.user)) {
    return NextResponse.json(
      { success: false, error: 'Acceso denegado. Permisos de RRHH requeridos.' },
      { status: 403 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const collabId = (formData.get('collabId') as string) || 'general';

    if (!file) {
      return NextResponse.json({ success: false, error: 'No se recibió ningún archivo.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'rrhh', collabId);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, buffer);

    const fileUrl = `/uploads/rrhh/${collabId}/${fileName}`;

    return NextResponse.json({
      success: true,
      fileUrl,
      fileName: file.name,
      fileSize: file.size,
    });
  } catch (error) {
    console.error('Error al subir archivo de RRHH:', error);
    return NextResponse.json({ success: false, error: 'Error interno al guardar archivo.' }, { status: 500 });
  }
}
