import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { verifyAdminToken } from '@/lib/auth';

const BBDD_FILE_PATH = path.join(process.cwd(), 'lib', 'data', 'bbdd_pu.json');

export interface DbItem {
  id: number;
  code: string;
  description: string;
  unit: string;
  type: string;
  priceUf: number;
  inclusions?: string;
  category?: string;
  porcentajeMateriales?: number;
  porcentajeManoObra?: number;
  porcentajeEquipos?: number;
}

// Función auxiliar para leer la base de datos
function readDatabase(): DbItem[] {
  try {
    const fileData = fs.readFileSync(BBDD_FILE_PATH, 'utf8');
    return JSON.parse(fileData);
  } catch (err) {
    console.error('Error reading bbdd_pu.json:', err);
    return [];
  }
}

// Función auxiliar para guardar en la base de datos
function saveDatabase(data: DbItem[]): boolean {
  try {
    fs.writeFileSync(BBDD_FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing bbdd_pu.json:', err);
    return false;
  }
}

// Generador Heurístico de APU en Lenguaje Natural
function generateApuFromNaturalLanguage(prompt: string) {
  const p = prompt.toLowerCase();

  let unit = 'm2';
  let priceUf = 0.85;
  let mat = 50;
  let mo = 45;
  let eq = 5;
  let codePrefix = 'PART';
  let inclusions = '';

  // Reglas de inferencia técnica paramétrica según rubro
  if (p.includes('estructura metalica') || p.includes('acero') || p.includes('cobertizo metalico') || p.includes('perfil') || p.includes('viga') || p.includes('galpon') || p.includes('cercha') || p.includes('soldadura')) {
    unit = 'kg';
    const isHeavy = p.includes('pesada') || p.includes('galpon') || p.includes('ipe') || p.includes('viga h');
    priceUf = isHeavy ? 0.065 : 0.075;
    mat = isHeavy ? 60 : 55;
    mo = isHeavy ? 35 : 40;
    eq = 5;
    codePrefix = 'EST-MET';
    inclusions = isHeavy
      ? 'Incluye: suministro de acero estructural A36/A572 en perfiles pesados (IPE/H), trazado, biselado, soldadura MIG continua E7018, esquema anticorrosivo epóxico de 2 manos, pernos de anclaje A307, montaje en terreno con camión grúa pluma y aseo técnico.'
      : 'Incluye: suministro de perfiles tubulares/costaneras de acero, trazado, corte mecánico, soldadura 7018, aplicación de 2 manos de pintura anticorrosiva sintética/epóxica, pernos de fijación, montaje en terreno y limpieza de obra.';
  } else if (p.includes('radier') || p.includes('hormigon') || p.includes('fundacion') || p.includes('losa')) {
    unit = 'm2';
    priceUf = p.includes('15cm') || p.includes('h25') ? 1.15 : 0.85;
    mat = 55;
    mo = 40;
    eq = 5;
    codePrefix = 'RAD';
    inclusions = 'Incluye: excavación superficial, base de estabilizado compactado, moldajes de madera, colocación de malla ACMA, vaciado de hormigón preparado y afinado mecánico.';
  } else if (p.includes('pintura') || p.includes('esmalte') || p.includes('latex')) {
    unit = 'm2';
    priceUf = 0.28;
    mat = 40;
    mo = 55;
    eq = 5;
    codePrefix = 'PIN';
    inclusions = 'Incluye: limpieza de superficie, lijado, sellante primario, empaste localizado en fisuras, 2 manos de látex extracubriente y 2 manos de esmalte de terminación.';
  } else if (p.includes('piso') || p.includes('spc') || p.includes('porcelanato') || p.includes('cerámica') || p.includes('azulejo')) {
    unit = 'm2';
    priceUf = p.includes('porcelanato') ? 1.25 : 0.95;
    mat = 50;
    mo = 45;
    eq = 5;
    codePrefix = 'PAV';
    inclusions = 'Incluye: nivelación ligera de piso, instalación del revestimiento, fragüe especial/espuma autonivelante, guardapolvos y junquillos de terminación.';
  } else if (p.includes('electrico') || p.includes('enchufe') || p.includes('tablero') || p.includes('foco') || p.includes('iluminacion')) {
    unit = p.includes('tablero') ? 'un' : 'un';
    priceUf = p.includes('tablero') ? 8.5 : 1.2;
    mat = 50;
    mo = 45;
    eq = 5;
    codePrefix = 'ELEC';
    inclusions = 'Incluye: canalización cacheno/conduit embutido o a la vista, cableado de cobre libre de halógenos, módulo de tomacorriente/foco y certificación de continuidad.';
  } else if (p.includes('pastoral') || p.includes('pasto') || p.includes('jardin') || p.includes('paisajismo')) {
    unit = 'm2';
    priceUf = 0.65;
    mat = 60;
    mo = 35;
    eq = 5;
    codePrefix = 'PAI';
    inclusions = 'Incluye: retiro de capa vegetal descompuesta, nivelación con arena de cuarzo/maicillo, tendido de rollo de pasto sintético 30mm/semilla y sellado de uniones.';
  } else if (p.includes('tabique') || p.includes('volcanita') || p.includes('aislacion') || p.includes('muro')) {
    unit = 'm2';
    priceUf = 0.92;
    mat = 48;
    mo = 47;
    eq = 5;
    codePrefix = 'TAB';
    inclusions = 'Incluye: estructura de perfiles de acero galv. Metalcon, lana de vidrio térmica/acústica 50mm, placas de volcanita 15mm por ambas caras y huincha de juntura con pasta.';
  } else {
    unit = 'un';
    priceUf = 1.5;
    mat = 50;
    mo = 45;
    eq = 5;
    codePrefix = 'OBR';
    inclusions = `Incluye: suministro de materiales principales para ${prompt}, mano de obra calificada de instalación, herramientas de soporte y aseo técnico post-ejecución.`;
  }

  // Generar código autogenerado
  const randomNum = Math.floor(Math.random() * 900) + 100;
  const generatedCode = `${codePrefix}-${randomNum}`;

  return {
    code: generatedCode,
    description: prompt.charAt(0).toUpperCase() + prompt.slice(1),
    unit,
    priceUf,
    priceClpEstimated: Math.round(priceUf * 38000),
    porcentajeMateriales: mat,
    porcentajeManoObra: mo,
    porcentajeEquipos: eq,
    inclusions,
  };
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

// POST: Agregar nueva partida o Generar propuesta de IA
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_token')?.value;
    if (!token || !(await verifyAdminToken(token))) {
      return NextResponse.json({ success: false, error: 'No autorizado. Inicie sesión.' }, { status: 401 });
    }

    const body = await request.json();

    // ACCIÓN 1: Generador Inteligente de APU en Lenguaje Natural
    if (body.action === 'generate_apu_ai') {
      const { naturalLanguagePrompt } = body;
      if (!naturalLanguagePrompt || !naturalLanguagePrompt.trim()) {
        return NextResponse.json({ success: false, error: 'Escribe una descripción en lenguaje natural.' }, { status: 400 });
      }

      const proposal = generateApuFromNaturalLanguage(naturalLanguagePrompt.trim());
      return NextResponse.json({ success: true, proposal });
    }

    // ACCIÓN 2: Guardar nueva partida en la base de datos
    const {
      code,
      description,
      unit,
      type = 'Partida',
      priceUf,
      inclusions,
      porcentajeMateriales = 50,
      porcentajeManoObra = 45,
      porcentajeEquipos = 5,
    } = body;

    if (!description || !unit || priceUf === undefined || isNaN(Number(priceUf))) {
      return NextResponse.json(
        { success: false, error: 'Faltan campos obligatorios: Descripción, Unidad y Precio UF válido.' },
        { status: 400 }
      );
    }

    const db = readDatabase();
    const maxId = db.reduce((max, item) => (item.id > max ? item.id : max), 0);
    const newId = maxId + 1;
    const finalCode = code?.trim() || `PAR-${String(newId).padStart(4, '0')}`;

    const newItem: DbItem = {
      id: newId,
      code: finalCode,
      description: description.trim(),
      unit: unit.trim(),
      type: type || 'Partida',
      priceUf: Number(priceUf),
      inclusions: inclusions?.trim() || '',
      porcentajeMateriales: Number(porcentajeMateriales),
      porcentajeManoObra: Number(porcentajeManoObra),
      porcentajeEquipos: Number(porcentajeEquipos),
    };

    db.unshift(newItem);
    const saved = saveDatabase(db);

    if (!saved) {
      return NextResponse.json({ success: false, error: 'No se pudo guardar en el servidor.' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Partida agregada exitosamente.',
      item: newItem,
    });
  } catch (err) {
    console.error('[POST Admin Partidas Error]', err);
    return NextResponse.json({ success: false, error: 'Error interno al procesar la partida.' }, { status: 500 });
  }
}

// PUT: Editar partida existente
export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_token')?.value;
    if (!token || !(await verifyAdminToken(token))) {
      return NextResponse.json({ success: false, error: 'No autorizado. Inicie sesión.' }, { status: 401 });
    }

    const {
      id,
      code,
      description,
      unit,
      priceUf,
      inclusions,
      porcentajeMateriales,
      porcentajeManoObra,
      porcentajeEquipos,
    } = await request.json();

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
    if (porcentajeMateriales !== undefined) db[index].porcentajeMateriales = Number(porcentajeMateriales);
    if (porcentajeManoObra !== undefined) db[index].porcentajeManoObra = Number(porcentajeManoObra);
    if (porcentajeEquipos !== undefined) db[index].porcentajeEquipos = Number(porcentajeEquipos);

    const saved = saveDatabase(db);
    if (!saved) {
      return NextResponse.json({ success: false, error: 'No se pudo guardar la edición en el servidor.' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Partida actualizada exitosamente.',
      item: db[index],
    });
  } catch (err) {
    console.error('[PUT Admin Partidas Error]', err);
    return NextResponse.json({ success: false, error: 'Error interno al actualizar partida.' }, { status: 500 });
  }
}

// DELETE: Eliminar partida existente
export async function DELETE(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_token')?.value;
    if (!token || !(await verifyAdminToken(token))) {
      return NextResponse.json({ success: false, error: 'No autorizado. Inicie sesión.' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Se requiere el ID de la partida a eliminar.' }, { status: 400 });
    }

    const db = readDatabase();
    const filteredDb = db.filter((item) => item.id !== Number(id));

    if (filteredDb.length === db.length) {
      return NextResponse.json({ success: false, error: 'Partida no encontrada.' }, { status: 404 });
    }

    const saved = saveDatabase(filteredDb);
    if (!saved) {
      return NextResponse.json({ success: false, error: 'No se pudo eliminar la partida del servidor.' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Partida eliminada exitosamente.',
    });
  } catch (err) {
    console.error('[DELETE Admin Partidas Error]', err);
    return NextResponse.json({ success: false, error: 'Error interno al eliminar la partida.' }, { status: 500 });
  }
}
