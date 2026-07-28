import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { verifyAdminToken } from '@/lib/auth';

const DOCUMENTS_FILE_PATH = path.join(process.cwd(), 'lib', 'data', 'documents.json');

export interface DocumentItem {
  id: string;
  title: string;
  category: string;
  format: string;
  description: string;
  url: string;
  uploadedBy: string;
  createdAt: string;
}

function readDocuments(): DocumentItem[] {
  try {
    if (!fs.existsSync(DOCUMENTS_FILE_PATH)) {
      fs.writeFileSync(DOCUMENTS_FILE_PATH, '[]', 'utf8');
      return [];
    }
    const data = fs.readFileSync(DOCUMENTS_FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveDocuments(docs: DocumentItem[]): boolean {
  try {
    fs.writeFileSync(DOCUMENTS_FILE_PATH, JSON.stringify(docs, null, 2), 'utf8');
    return true;
  } catch {
    return false;
  }
}

// GET: Obtener lista de documentos
export async function GET() {
  const docs = readDocuments();
  docs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return NextResponse.json({ success: true, count: docs.length, data: docs });
}

// POST: Registrar nuevo documento
export async function POST(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  const payload = token ? await verifyAdminToken(token) : null;

  if (!payload) {
    return NextResponse.json({ success: false, error: 'No autorizado.' }, { status: 401 });
  }

  try {
    const { title, category, format, description, url } = await request.json();

    if (!title || !category || !url) {
      return NextResponse.json(
        { success: false, error: 'Se requiere título, categoría y enlace URL/ruta.' },
        { status: 400 }
      );
    }

    const docs = readDocuments();
    const newDoc: DocumentItem = {
      id: `doc-${Date.now()}`,
      title: title.trim(),
      category: category.trim(),
      format: format?.trim() || 'PDF',
      description: description?.trim() || '',
      url: url.trim(),
      uploadedBy: payload.user,
      createdAt: new Date().toISOString(),
    };

    docs.unshift(newDoc);
    saveDocuments(docs);

    return NextResponse.json({ success: true, document: newDoc });
  } catch {
    return NextResponse.json({ success: false, error: 'Error al registrar documento.' }, { status: 500 });
  }
}
