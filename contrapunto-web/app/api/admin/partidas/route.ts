import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { verifyAdminToken } from '@/lib/auth';

const BBDD_FILE_PATH = path.join(process.cwd(), 'lib', 'data', 'bbdd_pu.json');

interface DbItem {
  id: number;
  code: string;
  description: string;
  unit: string;
  type: string;
  priceUf: number;
  inclusions?: string;
}

// Función auxiliar para leer el archivo JSON
function readDatabase(): DbItem[] {
  try {
    const fileData = fs.readFileSync(BBDD_FILE_PATH, 'utf8');
    return JSON.parse(fileData);
  } catch (err) {
    console.error('Error reading bbdd_pu.json:', err);
    return [];
  }
}

// Función auxiliar para guardar en el archivo JSON
function saveDatabase(data: DbItem[]): boolean {
  try {
    fs.writeFileSync(BBDD_FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing bbdd_pu.json:', err);
    return false;
  }
}

// GET: Obtener lista de partidas
export async function GET() {
  try {
    const db = readDatabase();
    return NextResponse.json({ success: true, count: db.length, data: db });
  } catch {
    return NextResponse.json({ success: false, error: 'Error al consultar partidas.' }, { status: 500 });
  }
}

// POST: Agregar nueva partida
export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación
    const token = request.cookies.get('admin_token')?.value;
    if (!token || !(await verifyAdminToken(token))) {
      return NextResponse.json({ success: false, error: 'No autorizado. Inicie sesión.' }, { status: 401 });
    }

    const { code, description, unit, type = 'Partida', priceUf, inclusions } = await request.json();

    if (!description || !unit || priceUf === undefined || isNaN(Number(priceUf))) {
      return NextResponse.json(
        { success: false, error: 'Faltan campos obligatorios: Descripción, Unidad y Precio UF válido.' },
        { status: 400 }
      );
    }

    const db = readDatabase();
    
    // Generar un ID nuevo correlativo
    const maxId = db.reduce((max, item) => (item.id > max ? item.id : max), 0);
    const newId = maxId + 1;

    // Código autogenerado si no se entrega
    const finalCode = code?.trim() || `PAR-${String(newId).padStart(4, '0')}`;

    const newItem: DbItem = {
      id: newId,
      code: finalCode,
      description: description.trim(),
      unit: unit.trim(),
      type: type || 'Partida',
      priceUf: Number(priceUf),
      inclusions: inclusions?.trim() || ''
    };

    db.unshift(newItem); // Insertar al inicio de la lista
    const saved = saveDatabase(db);

    if (!saved) {
      return NextResponse.json({ success: false, error: 'No se pudo guardar la partida en el servidor.' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Partida agregada exitosamente.',
      item: newItem
    });
  } catch (err) {
    console.error('[POST Admin Partidas Error]', err);
    return NextResponse.json({ success: false, error: 'Error interno al agregar partida.' }, { status: 500 });
  }
}

// PUT: Editar partida existente
export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_token')?.value;
    if (!token || !(await verifyAdminToken(token))) {
      return NextResponse.json({ success: false, error: 'No autorizado. Inicie sesión.' }, { status: 401 });
    }

    const { id, code, description, unit, priceUf, inclusions } = await request.json();

    if (!id) {
      return NextResponse.json({ success: false, error: 'Se requiere el ID de la partida a editar.' }, { status: 400 });
    }

    const db = readDatabase();
    const index = db.findIndex((item) => item.id === Number(id));

    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Partida no encontrada.' }, { status: 404 });
    }

    // Actualizar campos
    if (code !== undefined) db[index].code = code.trim();
    if (description !== undefined) db[index].description = description.trim();
    if (unit !== undefined) db[index].unit = unit.trim();
    if (priceUf !== undefined) db[index].priceUf = Number(priceUf);
    if (inclusions !== undefined) db[index].inclusions = inclusions.trim();

    const saved = saveDatabase(db);
    if (!saved) {
      return NextResponse.json({ success: false, error: 'No se pudo guardar la edición en el servidor.' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Partida actualizada exitosamente.',
      item: db[index]
    });
  } catch (err) {
    console.error('[PUT Admin Partidas Error]', err);
    return NextResponse.json({ success: false, error: 'Error interno al actualizar partida.' }, { status: 500 });
  }
}
