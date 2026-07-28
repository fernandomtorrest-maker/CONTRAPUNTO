import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { verifyAdminToken, hasRrhhPermission } from '@/lib/auth';

const RRHH_FILE_PATH = path.join(process.cwd(), 'lib', 'data', 'rrhh_collaborators.json');

export interface CollaboratorItem {
  id: string;
  rut: string;
  nombre: string;
  cargo: string;
  departamento: string;
  tipoContrato: 'Indefinido' | 'Plazo Fijo' | 'Por Obra o Faena' | 'Honorarios';
  fechaIngreso: string;
  fechaVencimientoContrato: string;
  telefono: string;
  correo: string;
  afp: string;
  salud: string;
  sueldoBase: number;
  status: 'Activo' | 'En Vacaciones' | 'Licencia Médica' | 'Desvinculado';
  vacacionesTotales: number;
  vacacionesTomadas: number;
  eppEntregado: string;
  fechaUltimoEPP: string;
  observaciones: string;
}

function readCollaborators(): CollaboratorItem[] {
  try {
    if (!fs.existsSync(RRHH_FILE_PATH)) {
      fs.writeFileSync(RRHH_FILE_PATH, '[]', 'utf8');
      return [];
    }
    const data = fs.readFileSync(RRHH_FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveCollaborators(collabs: CollaboratorItem[]): boolean {
  try {
    fs.writeFileSync(RRHH_FILE_PATH, JSON.stringify(collabs, null, 2), 'utf8');
    return true;
  } catch {
    return false;
  }
}

// GET: Obtener colaboradores (solo autorizados RRHH)
export async function GET(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  const payload = token ? await verifyAdminToken(token) : null;

  if (!payload || !hasRrhhPermission(payload.user)) {
    return NextResponse.json(
      { success: false, error: 'Acceso restringido solo al equipo de Administración de RRHH.' },
      { status: 403 }
    );
  }

  const collabs = readCollaborators();
  return NextResponse.json({ success: true, count: collabs.length, data: collabs });
}

// POST: Crear o actualizar colaborador
export async function POST(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  const payload = token ? await verifyAdminToken(token) : null;

  if (!payload || !hasRrhhPermission(payload.user)) {
    return NextResponse.json({ success: false, error: 'Acceso denegado.' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const collabs = readCollaborators();

    // Actualizar colaborador existente
    if (body.action === 'update') {
      const { id, updates } = body;
      const index = collabs.findIndex((c) => c.id === id);

      if (index === -1) {
        return NextResponse.json({ success: false, error: 'Colaborador no encontrado.' }, { status: 404 });
      }

      collabs[index] = { ...collabs[index], ...updates };
      saveCollaborators(collabs);

      return NextResponse.json({ success: true, collaborator: collabs[index] });
    }

    // Agregar nuevo colaborador
    const { rut, nombre, cargo, departamento, tipoContrato, fechaIngreso, fechaVencimientoContrato, sueldoBase, telefono, correo } = body;

    if (!rut || !nombre || !cargo) {
      return NextResponse.json({ success: false, error: 'Se requiere RUT, Nombre y Cargo del colaborador.' }, { status: 400 });
    }

    const newCollab: CollaboratorItem = {
      id: `collab-${Date.now()}`,
      rut: rut.trim(),
      nombre: nombre.trim(),
      cargo: cargo.trim(),
      departamento: departamento?.trim() || 'Oficina Central',
      tipoContrato: tipoContrato || 'Indefinido',
      fechaIngreso: fechaIngreso || new Date().toISOString().split('T')[0],
      fechaVencimientoContrato: fechaVencimientoContrato || 'Indefinido',
      telefono: telefono?.trim() || '',
      correo: correo?.trim() || '',
      afp: body.afp?.trim() || 'Habitat',
      salud: body.salud?.trim() || 'Fonasa',
      sueldoBase: Number(sueldoBase) || 0,
      status: 'Activo',
      vacacionesTotales: 15,
      vacacionesTomadas: 0,
      eppEntregado: body.eppEntregado?.trim() || 'Casco, Zapatos de Seguridad',
      fechaUltimoEPP: new Date().toISOString().split('T')[0],
      observaciones: body.observaciones?.trim() || '',
    };

    collabs.unshift(newCollab);
    saveCollaborators(collabs);

    return NextResponse.json({ success: true, collaborator: newCollab });
  } catch {
    return NextResponse.json({ success: false, error: 'Error interno de RRHH.' }, { status: 500 });
  }
}

// DELETE: Eliminar expediente
export async function DELETE(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  const payload = token ? await verifyAdminToken(token) : null;

  if (!payload || !hasRrhhPermission(payload.user)) {
    return NextResponse.json({ success: false, error: 'Acceso denegado.' }, { status: 403 });
  }

  try {
    const { id } = await request.json();
    let collabs = readCollaborators();
    collabs = collabs.filter((c) => c.id !== id);
    saveCollaborators(collabs);

    return NextResponse.json({ success: true, message: 'Expediente eliminado.' });
  } catch {
    return NextResponse.json({ success: false, error: 'Error al eliminar.' }, { status: 500 });
  }
}
