import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const COUNTER_FILE_PATH = path.join(process.cwd(), 'lib', 'data', 'cotizar_counter.json');

interface CounterData {
  totalCotizaciones: number;
  lastUpdated: string;
}

function readCounter(): CounterData {
  try {
    if (!fs.existsSync(COUNTER_FILE_PATH)) {
      const initial: CounterData = { totalCotizaciones: 0, lastUpdated: new Date().toISOString() };
      fs.writeFileSync(COUNTER_FILE_PATH, JSON.stringify(initial, null, 2), 'utf8');
      return initial;
    }
    const data = fs.readFileSync(COUNTER_FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error al leer cotizar_counter.json:', err);
    return { totalCotizaciones: 0, lastUpdated: new Date().toISOString() };
  }
}

function saveCounter(data: CounterData): boolean {
  try {
    fs.writeFileSync(COUNTER_FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error al guardar cotizar_counter.json:', err);
    return false;
  }
}

// GET: Obtener el contador actual de /cotizar
export async function GET() {
  const counter = readCounter();
  return NextResponse.json({
    success: true,
    totalCotizaciones: counter.totalCotizaciones,
    lastUpdated: counter.lastUpdated,
  });
}

// POST: Incrementar en +1 el contador de /cotizar
export async function POST() {
  try {
    const counter = readCounter();
    counter.totalCotizaciones += 1;
    counter.lastUpdated = new Date().toISOString();

    saveCounter(counter);

    return NextResponse.json({
      success: true,
      totalCotizaciones: counter.totalCotizaciones,
      lastUpdated: counter.lastUpdated,
    });
  } catch (err) {
    console.error('[POST /api/cotizar/count error]', err);
    return NextResponse.json({ success: false, error: 'Error al incrementar contador.' }, { status: 500 });
  }
}

// PUT / DELETE: Reiniciar el contador a 0 (Solo Admin)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const action = body.action;

    if (action === 'reset') {
      const counter: CounterData = { totalCotizaciones: 0, lastUpdated: new Date().toISOString() };
      saveCounter(counter);
      return NextResponse.json({
        success: true,
        message: 'Contador reiniciado a 0.',
        totalCotizaciones: 0,
      });
    }

    return NextResponse.json({ success: false, error: 'Acción no válida.' }, { status: 400 });
  } catch (err) {
    console.error('[PUT /api/cotizar/count error]', err);
    return NextResponse.json({ success: false, error: 'Error al reiniciar contador.' }, { status: 500 });
  }
}
