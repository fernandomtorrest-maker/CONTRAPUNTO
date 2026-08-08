import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import * as XLSX from 'xlsx';

const DATA_FILE_PATH = path.join(process.cwd(), 'lib', 'data', 'bbdd_pu.json');
const UF_VALUE = 38500.0;

interface DbItem {
  id: number;
  code: string;
  description: string;
  unit: string;
  type?: string;
  priceUf: number;
  inclusions?: string;
  porcentajeMateriales?: number;
  porcentajeManoObra?: number;
  porcentajeEquipos?: number;
}

function readDatabase(): DbItem[] {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const data = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('[Import API] Error al leer BBDD:', err);
  }
  return [];
}

function saveDatabase(data: DbItem[]): boolean {
  try {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[Import API] Error al guardar BBDD:', err);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No se ha adjuntado ningún archivo.' }, { status: 400 });
    }

    const fileName = file.name;
    const ext = path.extname(fileName).toLowerCase();
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const newPartidas: Array<Omit<DbItem, 'id'>> = [];

    if (ext === '.xlsx' || ext === '.xls' || ext === '.xlsm' || ext === '.csv') {
      const workbook = XLSX.read(buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json<Array<string | number | boolean | null | undefined>>(sheet, { header: 1 });

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (!Array.isArray(row) || row.length < 2) continue;

        let desc = '';
        let unit = 'un';
        let price = 0;
        const mat = 50;
        const mo = 45;
        const eq = 5;
        const inc = '';

        const rowStr = row.map(c => String(c || '').trim());

        for (const cell of rowStr) {
          if (cell.length > 8 && !desc && isNaN(Number(cell))) {
            desc = cell;
          } else if (['m2', 'm3', 'ml', 'un', 'gl', 'kg', 'mes', 'dia', 'm', 'tin'].includes(cell.toLowerCase())) {
            unit = cell.toLowerCase();
          } else if (!isNaN(Number(cell)) && Number(cell) > 0 && price === 0) {
            price = Number(cell);
          }
        }

        if (desc) {
          const priceUf = price > 500 ? Number((price / UF_VALUE).toFixed(4)) : Number(price.toFixed(4));
          newPartidas.push({
            code: '',
            description: desc,
            unit: unit || 'un',
            type: 'Partida',
            priceUf: priceUf || 0.5,
            inclusions: inc || `Importado desde ${fileName}`,
            porcentajeMateriales: mat,
            porcentajeManoObra: mo,
            porcentajeEquipos: eq,
          });
        }
      }
    } else if (ext === '.json') {
      const jsonText = buffer.toString('utf-8');
      const parsed = JSON.parse(jsonText);
      const items = Array.isArray(parsed) ? parsed : [parsed];

      for (const item of items) {
        if (item.description) {
          newPartidas.push({
            code: item.code || '',
            description: item.description,
            unit: item.unit || 'un',
            type: 'Partida',
            priceUf: Number(item.priceUf || (item.priceClp ? (item.priceClp / UF_VALUE).toFixed(4) : 0.5)),
            inclusions: item.inclusions || `Importado desde ${fileName}`,
            porcentajeMateriales: item.porcentajeMateriales || 50,
            porcentajeManoObra: item.porcentajeManoObra || 45,
            porcentajeEquipos: item.porcentajeEquipos || 5,
          });
        }
      }
    } else {
      const rawText = buffer.toString('utf-8');
      const lines = rawText.split('\n');

      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.length > 10) {
          const parts = trimmed.split(/[\t;,]/);
          const desc = parts[0] || trimmed;
          newPartidas.push({
            code: '',
            description: desc.substring(0, 150),
            unit: 'un',
            type: 'Partida',
            priceUf: 0.5,
            inclusions: `Importado desde ${fileName}`,
            porcentajeMateriales: 50,
            porcentajeManoObra: 45,
            porcentajeEquipos: 5,
          });
        }
      }
    }

    if (newPartidas.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No se pudieron extraer partidas válidas del archivo.' },
        { status: 400 }
      );
    }

    const db = readDatabase();
    const existingDescSet = new Set(db.map(i => i.description.toLowerCase().trim()));
    
    let addedCount = 0;
    let maxId = db.reduce((max, item) => (item.id > max ? item.id : max), 0);

    for (const newItem of newPartidas) {
      const cleanDesc = newItem.description.toLowerCase().trim();
      if (!existingDescSet.has(cleanDesc)) {
        maxId++;
        existingDescSet.add(cleanDesc);
        db.unshift({
          id: maxId,
          code: newItem.code || `PAR-${String(maxId).padStart(4, '0')}`,
          description: newItem.description,
          unit: newItem.unit || 'un',
          type: 'Partida',
          priceUf: newItem.priceUf || 0.5,
          inclusions: newItem.inclusions,
          porcentajeMateriales: newItem.porcentajeMateriales || 50,
          porcentajeManoObra: newItem.porcentajeManoObra || 45,
          porcentajeEquipos: newItem.porcentajeEquipos || 5,
        });
        addedCount++;
      }
    }

    saveDatabase(db);

    return NextResponse.json({
      success: true,
      message: `¡Importación exitosa! Se añadieron ${addedCount} partidas nuevas a la base de datos de ${db.length} partidas.`,
      addedCount,
      totalCount: db.length,
    });
  } catch (err) {
    console.error('[Import API Error]', err);
    return NextResponse.json({ success: false, error: 'Error al procesar el archivo.' }, { status: 500 });
  }
}
