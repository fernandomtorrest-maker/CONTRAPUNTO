import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { verifyAdminToken, hasRrhhPermission } from '@/lib/auth';

const RRHH_FILE_PATH = path.join(process.cwd(), 'lib', 'data', 'rrhh_collaborators.json');

export interface CollaboratorDocument {
  id: string;
  title: string;
  category: 'Contratos & Anexos' | 'Liquidaciones de Sueldo' | 'Licencias & Permisos' | 'Prevención & EPP' | 'Documentación Personal';
  format: string;
  url: string;
  uploadedAt: string;
  uploadedBy: string;
  expirationDate?: string;
}

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
  tramoFonasa?: string;
  montoIsapreUF?: number;
  mutual?: string;
  afc?: string;
  sueldoBase: number;
  status: 'Activo' | 'En Vacaciones' | 'Licencia Médica' | 'Desvinculado';
  vacacionesTotales: number;
  vacacionesTomadas: number;
  eppEntregado: string;
  fechaUltimoEPP: string;
  observaciones: string;
  documentos?: CollaboratorDocument[];
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

// GET: Obtener colaboradores
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

// POST: Crear, actualizar, agregar documento o exportar Previred
export async function POST(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  const payload = token ? await verifyAdminToken(token) : null;

  if (!payload || !hasRrhhPermission(payload.user)) {
    return NextResponse.json({ success: false, error: 'Acceso denegado.' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const collabs = readCollaborators();

    // 1. Agregar Documento a Trabajador
    if (body.action === 'add_document') {
      const { collabId, title, category, format, url, expirationDate } = body;
      const index = collabs.findIndex((c) => c.id === collabId);

      if (index === -1) {
        return NextResponse.json({ success: false, error: 'Colaborador no encontrado.' }, { status: 404 });
      }

      const newDoc: CollaboratorDocument = {
        id: `doc-${Date.now()}`,
        title: title.trim(),
        category: category || 'Contratos & Anexos',
        format: format || 'PDF',
        url: url.trim(),
        uploadedAt: new Date().toISOString().split('T')[0],
        uploadedBy: payload.user,
        expirationDate: expirationDate || 'N/A',
      };

      if (!collabs[index].documentos) {
        collabs[index].documentos = [];
      }

      collabs[index].documentos?.unshift(newDoc);
      saveCollaborators(collabs);

      return NextResponse.json({ success: true, document: newDoc, collaborator: collabs[index] });
    }

    // 2. Eliminar Documento de Trabajador
    if (body.action === 'delete_document') {
      const { collabId, docId } = body;
      const index = collabs.findIndex((c) => c.id === collabId);

      if (index !== -1 && collabs[index].documentos) {
        collabs[index].documentos = collabs[index].documentos?.filter((d) => d.id !== docId);
        saveCollaborators(collabs);
      }

      return NextResponse.json({ success: true });
    }

    // 3. Exportar Plantilla Oficial Previred (.csv)
    if (body.action === 'export_previred') {
      const activeCollabs = collabs.filter((c) => c.status !== 'Desvinculado');

      let csv = 'RUT;Nombre;Cargo;Sueldo_Imponible;AFP;Salud;Tramo_Fonasa;Monto_Isapre_UF;Mutual;AFC;Dias_Trabajados\n';
      activeCollabs.forEach((c) => {
        csv += `${c.rut};${c.nombre};${c.cargo};${c.sueldoBase};${c.afp};${c.salud};${c.tramoFonasa || 'N/A'};${c.montoIsapreUF || 0};${c.mutual || 'Mutual CChC'};${c.afc || 'Sí'};30\n`;
      });

      return new NextResponse(csv, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="Nomenclatura_Previred_Contrapunto_${new Date().toISOString().split('T')[0]}.csv"`,
        },
      });
    }

    // 4. Actualización general de datos del colaborador
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

    // 5. Alta de nuevo trabajador
    const { rut, nombre, cargo, departamento, tipoContrato, fechaIngreso, fechaVencimientoContrato, sueldoBase, telefono, correo } = body;

    if (!rut || !nombre || !cargo) {
      return NextResponse.json({ success: false, error: 'Se requiere RUT, Nombre y Cargo.' }, { status: 400 });
    }

    const newCollab: CollaboratorItem = {
      id: `collab-${Date.now()}`,
      rut: rut.trim(),
      nombre: nombre.trim(),
      cargo: cargo.trim(),
      departamento: departamento?.trim() || 'Terreno / Obras',
      tipoContrato: tipoContrato || 'Indefinido',
      fechaIngreso: fechaIngreso || new Date().toISOString().split('T')[0],
      fechaVencimientoContrato: fechaVencimientoContrato || 'Indefinido',
      telefono: telefono?.trim() || '',
      correo: correo?.trim() || '',
      afp: body.afp?.trim() || 'Habitat',
      salud: body.salud?.trim() || 'Fonasa',
      tramoFonasa: body.tramoFonasa || 'B',
      montoIsapreUF: Number(body.montoIsapreUF) || 0,
      mutual: 'Mutual de Seguridad CChC',
      afc: 'Sí',
      sueldoBase: Number(sueldoBase) || 0,
      status: 'Activo',
      vacacionesTotales: 15,
      vacacionesTomadas: 0,
      eppEntregado: body.eppEntregado?.trim() || 'Casco, Zapatos de Seguridad',
      fechaUltimoEPP: new Date().toISOString().split('T')[0],
      observaciones: body.observaciones?.trim() || '',
      documentos: [],
    };

    collabs.unshift(newCollab);
    saveCollaborators(collabs);

    return NextResponse.json({ success: true, collaborator: newCollab });
  } catch {
    return NextResponse.json({ success: false, error: 'Error interno en RRHH.' }, { status: 500 });
  }
}

// DELETE: Eliminar colaborador
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

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: 'Error al eliminar.' }, { status: 500 });
  }
}
