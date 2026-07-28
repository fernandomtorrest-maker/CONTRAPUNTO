import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { verifyAdminToken } from '@/lib/auth';

const LEADS_FILE_PATH = path.join(process.cwd(), 'lib', 'data', 'leads.json');

export interface LeadItem {
  id: string;
  nombre: string;
  telefono: string;
  correo: string;
  servicio: string;
  comuna: string;
  mensaje: string;
  status: 'Nuevo' | 'En Contacto' | 'Visita Agendada' | 'Cerrado / Ganado' | 'Desestimado';
  assignedTo: string;
  createdAt: string;
  notes: string;
}

function readLeads(): LeadItem[] {
  try {
    if (!fs.existsSync(LEADS_FILE_PATH)) {
      fs.writeFileSync(LEADS_FILE_PATH, '[]', 'utf8');
      return [];
    }
    const data = fs.readFileSync(LEADS_FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveLeads(leads: LeadItem[]): boolean {
  try {
    fs.writeFileSync(LEADS_FILE_PATH, JSON.stringify(leads, null, 2), 'utf8');
    return true;
  } catch {
    return false;
  }
}

// GET: Obtener lista de leads
export async function GET(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ success: false, error: 'No autorizado.' }, { status: 401 });
  }

  const leads = readLeads();
  // Ordenar por fecha más reciente primero
  leads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return NextResponse.json({ success: true, count: leads.length, data: leads });
}

// POST: Actualizar estado, notas, responsable o agregar lead manual
export async function POST(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ success: false, error: 'No autorizado.' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const leads = readLeads();

    // Actualizar lead existente
    if (body.action === 'update') {
      const { id, status, assignedTo, notes } = body;
      const index = leads.findIndex((l) => l.id === id);

      if (index === -1) {
        return NextResponse.json({ success: false, error: 'Lead no encontrado.' }, { status: 404 });
      }

      if (status !== undefined) leads[index].status = status;
      if (assignedTo !== undefined) leads[index].assignedTo = assignedTo;
      if (notes !== undefined) leads[index].notes = notes;

      saveLeads(leads);
      return NextResponse.json({ success: true, lead: leads[index] });
    }

    // Agregar nuevo lead manual
    const { nombre, telefono, correo, servicio, comuna, mensaje, assignedTo } = body;
    if (!nombre || !telefono) {
      return NextResponse.json({ success: false, error: 'Se requiere nombre y teléfono.' }, { status: 400 });
    }

    const newLead: LeadItem = {
      id: `lead-${Date.now()}`,
      nombre: nombre.trim(),
      telefono: telefono.trim(),
      correo: correo?.trim() || '',
      servicio: servicio?.trim() || 'Contacto Directo',
      comuna: comuna?.trim() || 'No especificada',
      mensaje: mensaje?.trim() || 'Ingresado manualmente por el equipo.',
      status: 'Nuevo',
      assignedTo: assignedTo || 'Sin Asignar',
      createdAt: new Date().toISOString(),
      notes: '',
    };

    leads.unshift(newLead);
    saveLeads(leads);

    return NextResponse.json({ success: true, lead: newLead });
  } catch {
    return NextResponse.json({ success: false, error: 'Error interno al procesar el lead.' }, { status: 500 });
  }
}

// DELETE: Eliminar lead
export async function DELETE(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ success: false, error: 'No autorizado.' }, { status: 401 });
  }

  try {
    const { id } = await request.json();
    let leads = readLeads();
    leads = leads.filter((l) => l.id !== id);
    saveLeads(leads);

    return NextResponse.json({ success: true, message: 'Lead eliminado.' });
  } catch {
    return NextResponse.json({ success: false, error: 'Error al eliminar.' }, { status: 500 });
  }
}
