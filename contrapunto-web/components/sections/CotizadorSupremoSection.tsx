'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Trash2, Search, Plus, Copy, Check, RefreshCw, AlertCircle, HelpCircle, Download, Table, ArrowLeft } from 'lucide-react';

interface DbItem {
  id: number;
  code: string;
  description: string;
  unit: string;
  type?: string;
  priceUf: number;
  inclusions?: string;
  category?: string;
  porcentajeMateriales?: number;
  porcentajeManoObra?: number;
  porcentajeEquipos?: number;
}

const CHAPTERS_LIST = [
  "CAP 01 - OBRAS PRELIMINARES & FAENAS",
  "CAP 02 - MOVIMIENTO DE TIERRAS & EXCAVACIONES",
  "CAP 03 - HORMIGONES & OBRA GRUESA",
  "CAP 04 - ALBAÑILERÍA & TABIQUERÍA",
  "CAP 05 - ESTRUCTURAS METÁLICAS & ACERO",
  "CAP 06 - TECHUMBRES, CUBIERTAS & HOJALATERÍA",
  "CAP 07 - IMPERMEABILIZACIÓN & AISLACIÓN",
  "CAP 08 - PUERTAS, VENTANAS & PORTONES",
  "CAP 09 - REVESTIMIENTOS & PAVIMENTOS",
  "CAP 10 - INSTALACIONES (ELEC / SAN / CLIMA)",
  "CAP 11 - PINTURAS & TERMINACIONES",
  "CAP 12 - MOBILIARIO & ARQUITECTURA",
];

interface ParsedResultItem {
  matchedItem: DbItem | null;
  alternatives: DbItem[];
  originalQuery: string;
  requestedQty: number;
  requestedUnit: string;
}

type AlternativeItem = DbItem;

interface QuoteItem {
  id: string; // unique instance ID
  dbId: number;
  code: string;
  description: string;
  unit: string;
  quantity: number;
  priceUf: number;
  inclusions?: string;
  category?: string;
  porcentajeMateriales?: number;
  porcentajeManoObra?: number;
  porcentajeEquipos?: number;
  alternatives: Array<{
    id: number;
    code: string;
    description: string;
    unit: string;
    priceUf: number;
    inclusions?: string;
  }>;
}

export default function CotizadorSupremoSection() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ufValue, setUfValue] = useState(37500);
  const [gastosGenerales, setGastosGenerales] = useState(15);
  const [utilidad, setUtilidad] = useState(10);
  const [ivaActive, setIvaActive] = useState(true);
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  
  // Manual Search State & Category Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('TODAS');
  const [searchResults, setSearchResults] = useState<DbItem[]>([]);
  const [allDbItems, setAllDbItems] = useState<DbItem[]>([]);
  
  // Feedback states
  const [copySuccess, setCopySuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Estado para controlar el desplegable de Ficha Excel APU por item ID
  const [openExcelId, setOpenExcelId] = useState<string | number | null>(null);

  const toggleExcelView = (id: string | number) => {
    setOpenExcelId(prev => (prev === id ? null : id));
  };

  // Client details for PDF quotes
  const [clientInfo, setClientInfo] = useState({
    nombre: 'Matias Donoso',
    telefono: '+56 9 6697 4560',
    correo: 'contacto@contrapuntoconstructora.cl',
    localidad: 'Talca',
    fecha: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    numeroCotizacion: 'V-033',
    costoMateriales: 0
  });

  const [chaptersList, setChaptersList] = useState<string[]>(CHAPTERS_LIST);

  // Cargar BBDD completa al montar
  useEffect(() => {
    const fetchAllPartidas = async () => {
      try {
        const res = await fetch('/api/admin/partidas', { cache: 'no-store' });
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          const items: DbItem[] = data.data;
          setAllDbItems(items);

          const uniqueCats = Array.from(
            new Set(
              items
                .map((item) => item.category)
                .filter((cat): cat is string => Boolean(cat && cat.trim()))
            )
          );

          setChaptersList(prev => Array.from(new Set([...CHAPTERS_LIST, ...uniqueCats, ...prev])));
        }
      } catch (err) {
        console.error('Error al cargar BBDD completa:', err);
      }
    };
    fetchAllPartidas();
  }, []);

  // Filtrar partidas según texto o categoría seleccionada
  useEffect(() => {
    if (allDbItems.length === 0) return;

    const queryLower = searchQuery.toLowerCase().trim();

    if (!queryLower && selectedCategory === 'TODAS') {
      setSearchResults([]);
      return;
    }

    const filtered = allDbItems.filter((item) => {
      const matchesCategory = selectedCategory === 'TODAS' || item.category === selectedCategory;
      const matchesQuery = !queryLower || (
        item.description.toLowerCase().includes(queryLower) ||
        item.code.toLowerCase().includes(queryLower)
      );
      return matchesCategory && matchesQuery;
    }).slice(0, 15);

    setSearchResults(filtered);
  }, [searchQuery, selectedCategory, allDbItems]);

  // Submit NLP prompt to API
  const handleAIParsing = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/cotizador-supremo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Error al procesar la cotización.');
      }

      const parsedResults = data.results as ParsedResultItem[];
      
      const newItems: QuoteItem[] = parsedResults.map((resItem, idx: number) => {
        const matched = resItem.matchedItem;
        
        return {
          id: `${Date.now()}-${idx}-${Math.random().toString(36).substr(2, 9)}`,
          dbId: matched ? matched.id : -1,
          code: matched ? matched.code : 'N/A',
          description: matched ? matched.description : `[No encontrado: ${resItem.originalQuery}]`,
          unit: matched ? matched.unit : resItem.requestedUnit || 'un',
          quantity: resItem.requestedQty || 1,
          priceUf: matched ? matched.priceUf : 0,
          inclusions: matched ? matched.inclusions : undefined,
          porcentajeMateriales: matched ? matched.porcentajeMateriales ?? 50 : 50,
          porcentajeManoObra: matched ? matched.porcentajeManoObra ?? 45 : 45,
          porcentajeEquipos: matched ? matched.porcentajeEquipos ?? 5 : 5,
          alternatives: resItem.alternatives || []
        };
      });

      setQuoteItems((prev) => [...prev, ...newItems]);
      setPrompt(''); // clear input on success
    } catch (err) {
      console.error(err);
      const errMsg = err instanceof Error ? err.message : 'Error de comunicación con el cotizador.';
      setErrorMsg(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Add item manually from search list
  const handleAddManualItem = (item: DbItem) => {
    const newItem: QuoteItem = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      dbId: item.id,
      code: item.code,
      description: item.description,
      unit: item.unit,
      quantity: 1,
      priceUf: item.priceUf,
      inclusions: item.inclusions,
      porcentajeMateriales: item.porcentajeMateriales ?? 50,
      porcentajeManoObra: item.porcentajeManoObra ?? 45,
      porcentajeEquipos: item.porcentajeEquipos ?? 5,
      alternatives: []
    };
    setQuoteItems((prev) => [...prev, newItem]);
    setSearchQuery('');
    setSearchResults([]);
  };

  // Update quantity of an item in the table
  const handleUpdateQty = (id: string, qty: number) => {
    setQuoteItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(0, qty) } : item))
    );
  };

  // Switch an item to an alternative match
  const handleSwitchAlternative = (itemId: string, alternative: AlternativeItem) => {
    setQuoteItems((prev) =>
      prev.map((item) => {
        if (item.id !== itemId) return item;
        // Collect current alternatives
        const currentMatched = {
          id: item.dbId,
          code: item.code,
          description: item.description,
          unit: item.unit,
          priceUf: item.priceUf,
          inclusions: item.inclusions
        };
        // Remove selection from alternatives and add current matched
        const newAlts = item.alternatives
          .filter((a) => a.id !== alternative.id)
          .concat(currentMatched);

        return {
          ...item,
          dbId: alternative.id,
          code: alternative.code,
          description: alternative.description,
          unit: alternative.unit,
          priceUf: alternative.priceUf,
          inclusions: alternative.inclusions,
          alternatives: newAlts
        };
      })
    );
  };

  // Delete an item from the table
  const handleDeleteItem = (id: string) => {
    setQuoteItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Calculate costs
  const calculateTotals = () => {
    const costDirectoUf = quoteItems.reduce((acc, item) => acc + (item.quantity * item.priceUf), 0);
    const costDirectoClp = costDirectoUf * ufValue;
    
    const ggUf = costDirectoUf * (gastosGenerales / 100);
    const ggClp = costDirectoClp * (gastosGenerales / 100);
    
    const utilUf = costDirectoUf * (utilidad / 100);
    const utilClp = costDirectoClp * (utilidad / 100);
    
    const netoUf = costDirectoUf + ggUf + utilUf;
    const netoClp = costDirectoClp + ggClp + utilClp;
    
    const ivaUf = ivaActive ? netoUf * 0.19 : 0;
    const ivaClp = ivaActive ? netoClp * 0.19 : 0;
    
    // Add materials cost to totals
    const materialsClp = Number(clientInfo.costoMateriales) || 0;
    const materialsUf = materialsClp / ufValue;

    const totalUf = netoUf + ivaUf + materialsUf;
    const totalClp = netoClp + ivaClp + materialsClp;

    return {
      costDirectoUf,
      costDirectoClp,
      ggUf,
      ggClp,
      utilUf,
      utilClp,
      netoUf,
      netoClp,
      ivaUf,
      ivaClp,
      materialsUf,
      materialsClp,
      totalUf,
      totalClp
    };
  };

  const totals = calculateTotals();

  // Copy structured clipboard text
  const handleCopyText = () => {
    if (quoteItems.length === 0) return;
    
    let text = `*COTIZACIÓN CONTRAPUNTO CONSTRUCTORA*\n`;
    text += `========================================\n\n`;
    
    quoteItems.forEach((item) => {
      const priceClp = item.priceUf * ufValue;
      const totalClp = item.quantity * priceClp;
      text += `- *${item.quantity.toFixed(1)} ${item.unit}* x ${item.description}\n`;
      text += `  PU: ${item.priceUf.toFixed(4)} UF ($${Math.round(priceClp).toLocaleString('es-CL')})\n`;
      text += `  Total: ${(item.quantity * item.priceUf).toFixed(2)} UF ($${Math.round(totalClp).toLocaleString('es-CL')})\n\n`;
    });
    
    text += `========================================\n`;
    text += `*Costo Directo:* ${totals.costDirectoUf.toFixed(2)} UF ($${Math.round(totals.costDirectoClp).toLocaleString('es-CL')})\n`;
    text += `*Gastos Generales (${gastosGenerales}%):* ${totals.ggUf.toFixed(2)} UF ($${Math.round(totals.ggClp).toLocaleString('es-CL')})\n`;
    text += `*Utilidad (${utilidad}%):* ${totals.utilUf.toFixed(2)} UF ($${Math.round(totals.utilClp).toLocaleString('es-CL')})\n`;
    text += `*Neto:* ${totals.netoUf.toFixed(2)} UF ($${Math.round(totals.netoClp).toLocaleString('es-CL')})\n`;
    if (ivaActive) {
      text += `*IVA (19%):* ${totals.ivaUf.toFixed(2)} UF ($${Math.round(totals.ivaClp).toLocaleString('es-CL')})\n`;
    }
    text += `*TOTAL PRESUPUESTO:* ${totals.totalUf.toFixed(2)} UF ($${Math.round(totals.totalClp).toLocaleString('es-CL')})\n\n`;
    text += `_(Valores calculados con UF de referencia: $${ufValue.toLocaleString('es-CL')})_`;

    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 3000);
  };

  // Generate and download client PDF (Presupuesto Matias Donoso format)
  const handleDownloadPdf = async () => {
    if (quoteItems.length === 0) return;
    setErrorMsg('');

    try {
      const { jsPDF } = await import('jspdf');
      const { CONTRAPUNTO_LOGO_BASE64 } = await import('../../lib/data/logoBase64');
      
      const doc = new jsPDF('p', 'mm', 'letter');
      const pageWidth = doc.internal.pageSize.getWidth();

      // Draw Logo (Size adjusted to 284/254 aspect ratio)
      doc.addImage(CONTRAPUNTO_LOGO_BASE64, 'PNG', 20, 15, 30, 27);

      // Title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(20);
      doc.setTextColor(31, 41, 55); // #1f2937
      doc.text('PRESUPUESTO DE OBRA', pageWidth - 20, 24, { align: 'right' });

      // Subtitle (Quote Number & Date)
      doc.setFont('helvetica', 'oblique');
      doc.setFontSize(9);
      doc.setTextColor(107, 114, 128); // #6b7280
      
      let formattedDate = clientInfo.fecha;
      try {
        const parts = clientInfo.fecha.split('-');
        if (parts.length === 3) {
          formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
      } catch {}

      doc.text(`${clientInfo.numeroCotizacion} | ${formattedDate}`, pageWidth - 20, 29, { align: 'right' });

      // Left info block below logo
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(55, 65, 81); // #374151
      doc.text('Oficio y Normativa', 20, 48);
      
      doc.setTextColor(29, 78, 216); // #1d4ed8
      doc.text('contacto@contrapuntoconstructora.cl | +56 9 6697 4560', 20, 52);

      // Client info divider
      doc.setDrawColor(217, 119, 6); // #d97706 orange
      doc.setLineWidth(0.4);
      doc.line(20, 58, pageWidth - 20, 58);

      // Client info header
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(217, 119, 6);
      doc.text('INFORMACIÓN DEL CLIENTE', 20, 63);

      // Client info fields
      doc.setFontSize(8.5);
      doc.setTextColor(55, 65, 81);
      
      doc.setFont('helvetica', 'bold');
      doc.text('Nombre y Apellido:', 20, 70);
      doc.setFont('helvetica', 'normal');
      doc.text(clientInfo.nombre, 48, 70);

      doc.setFont('helvetica', 'bold');
      doc.text('Teléfono:', 20, 75);
      doc.setFont('helvetica', 'normal');
      doc.text(clientInfo.telefono, 48, 75);

      doc.setFont('helvetica', 'bold');
      doc.text('Localidad:', 20, 80);
      doc.setFont('helvetica', 'normal');
      doc.text(clientInfo.localidad || 'No especificada', 48, 80);

      doc.setFont('helvetica', 'bold');
      doc.text('Fecha:', 110, 70);
      doc.setFont('helvetica', 'normal');
      doc.text(formattedDate, 126, 70);

      doc.setFont('helvetica', 'bold');
      doc.text('Correo:', 110, 75);
      doc.setFont('helvetica', 'normal');
      doc.text(clientInfo.correo, 126, 75);

      doc.setFont('helvetica', 'bold');
      doc.text('Cotización:', 110, 80);
      doc.setFont('helvetica', 'normal');
      doc.text(clientInfo.numeroCotizacion, 126, 80);

      // Table Setup
      let y = 88;

      // Table Header Background Box
      doc.setFillColor(31, 41, 55); // #1f2937
      doc.rect(15, y, 186, 8, 'F');
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(255, 255, 255);
      
      doc.text('Item', 17, y + 5.5);
      doc.text('Descripción', 29, y + 5.5);
      doc.text('Unidad', 121 + 6.5, y + 5.5, { align: 'center' });
      doc.text('Cant.', 134 + 6, y + 5.5, { align: 'center' });
      doc.text('Unitario (CLP)', 171 - 2, y + 5.5, { align: 'right' });
      doc.text('Total (CLP)', 201 - 2, y + 5.5, { align: 'right' });

      y += 8;

      // Draw rows
      quoteItems.forEach((item, index) => {
        const itemNum = (index + 1).toFixed(1);
        const puClp = item.priceUf * ufValue;
        const totalClp = item.quantity * puClp;

        const descLines = doc.splitTextToSize(item.description, 90);
        const incLines = item.inclusions ? doc.splitTextToSize(item.inclusions, 88) : [];
        
        const descHeight = descLines.length * 4;
        const incHeight = incLines.length > 0 ? (incLines.length * 3.2) + 1.5 : 0;
        const rowNeededHeight = descHeight + incHeight + 4; // padding

        // Page overflow check
        if (y + rowNeededHeight > 255) {
          doc.setDrawColor(229, 231, 235);
          doc.line(15, y, 201, y);

          doc.addPage();
          y = 15;
          // Redraw table header
          doc.setFillColor(31, 41, 55);
          doc.rect(15, y, 186, 8, 'F');
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8.5);
          doc.setTextColor(255, 255, 255);
          
          doc.text('Item', 17, y + 5.5);
          doc.text('Descripción', 29, y + 5.5);
          doc.text('Unidad', 121 + 6.5, y + 5.5, { align: 'center' });
          doc.text('Cant.', 134 + 6, y + 5.5, { align: 'center' });
          doc.text('Unitario (CLP)', 171 - 2, y + 5.5, { align: 'right' });
          doc.text('Total (CLP)', 201 - 2, y + 5.5, { align: 'right' });
          y += 8;
        }

        // Row border line
        doc.setDrawColor(229, 231, 235);
        doc.setLineWidth(0.15);
        doc.line(15, y, 201, y);

        // Print values
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(55, 65, 81);

        doc.text(itemNum, 17, y + 4.5);
        doc.text(descLines, 29, y + 4.5);

        if (incLines.length > 0) {
          doc.setFont('helvetica', 'oblique');
          doc.setFontSize(7.2);
          doc.setTextColor(100, 100, 100);
          doc.text(incLines, 31, y + 4.5 + descHeight + 1.2);
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8);
          doc.setTextColor(55, 65, 81);
        }

        doc.text(item.unit, 121 + 6.5, y + 4.5, { align: 'center' });
        doc.text(item.quantity.toLocaleString('es-CL'), 134 + 6, y + 4.5, { align: 'center' });
        doc.text(`$${Math.round(puClp).toLocaleString('es-CL')}`, 171 - 2, y + 4.5, { align: 'right' });
        doc.text(`$${Math.round(totalClp).toLocaleString('es-CL')}`, 201 - 2, y + 4.5, { align: 'right' });

        y += rowNeededHeight;
      });

      // Close table
      doc.setDrawColor(200);
      doc.line(15, y, 201, y);

      // Check remaining height for totals
      if (y + 80 > 270) {
        doc.addPage();
        y = 15;
      } else {
        y += 10;
      }

      const y_total = y;

      // Table 1: Mano de obra breakdown
      const table1Rows = [
        { label: 'Valor Mano de Obra', value: `$${Math.round(totals.costDirectoClp).toLocaleString('es-CL')}` },
        { label: `Gastos generales (${gastosGenerales}%)`, value: `$${Math.round(totals.ggClp).toLocaleString('es-CL')}` },
        { label: `Utilidades (${utilidad}%)`, value: `$${Math.round(totals.utilClp).toLocaleString('es-CL')}` },
        { label: 'TOTAL NETO', value: `$${Math.round(totals.netoClp).toLocaleString('es-CL')}` },
        { label: 'IVA (19%)', value: ivaActive ? `$${Math.round(totals.ivaClp).toLocaleString('es-CL')}` : '$0' },
        { label: 'TOTAL mano de obra IVA incluido', value: `$${Math.round(totals.netoClp + totals.ivaClp).toLocaleString('es-CL')}`, isBold: true }
      ];

      doc.setDrawColor(200);
      doc.setLineWidth(0.2);

      table1Rows.forEach((row, i) => {
        const y_row = y_total + (i * 4.8);
        
        doc.rect(131, y_row, 43, 4.8);
        doc.rect(131 + 43, y_row, 27, 4.8);

        doc.setFont('helvetica', row.isBold ? 'bold' : 'normal');
        doc.setFontSize(row.isBold ? 7.5 : 7.2);
        doc.setTextColor(31, 41, 55);
        doc.text(row.label, 133, y_row + 3.4);
        doc.text(row.value, 201 - 2, y_row + 3.4, { align: 'right' });
      });

      // Table 2: General total
      const y_table2 = y_total + (6 * 4.8) + 4;
      const table2Rows = [
        { label: 'Mano de obra', value: `$${Math.round(totals.netoClp + totals.ivaClp).toLocaleString('es-CL')}` },
        { label: 'Costo Materiales', value: `$${Math.round(totals.materialsClp).toLocaleString('es-CL')}` },
        { label: 'TOTAL GENERAL', value: `$${Math.round(totals.totalClp).toLocaleString('es-CL')}`, isHighlight: true }
      ];

      table2Rows.forEach((row, i) => {
        const y_row = y_table2 + (i * 4.8);

        if (row.isHighlight) {
          doc.setFillColor(217, 119, 6); // #d97706 orange
          doc.rect(131, y_row, 43, 4.8, 'F');
          doc.rect(131 + 43, y_row, 27, 4.8, 'F');
          
          doc.setTextColor(255, 255, 255);
          doc.setFont('helvetica', 'bold');
        } else {
          doc.setTextColor(31, 41, 55);
          doc.setFont('helvetica', 'normal');
        }

        doc.rect(131, y_row, 43, 4.8);
        doc.rect(131 + 43, y_row, 27, 4.8);

        doc.setFontSize(7.5);
        doc.text(row.label, 133, y_row + 3.4);
        doc.text(row.value, 201 - 2, y_row + 3.4, { align: 'right' });
      });

      // VALOR EN UF (Ref.)
      const y_uf = y_table2 + (3 * 4.8) + 4;
      doc.setTextColor(31, 41, 55);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.text('VALOR EN UF (Ref.)', 131, y_uf + 3);
      doc.text(totals.totalUf.toFixed(2), 201 - 2, y_uf + 3, { align: 'right' });

      // Left column: Commercial conditions
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(217, 119, 6);
      doc.text('CONDICIONES COMERCIALES', 15, y_total + 2);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(75, 85, 99);
      
      doc.text('1. Validez de la oferta: 15 días corridos.', 15, y_total + 7);
      doc.text('2. Forma de pago: 50% Anticipo / 40% Avance / 10% Recepción.', 15, y_total + 11);
      doc.text('3. No incluye permisos de edificación ni derechos municipales.', 15, y_total + 15);
      doc.text('4. Plazo de ejecución estimado: 30 dias corridos', 15, y_total + 19);

      // Signature line
      const y_sig = y_uf + 15;
      doc.setDrawColor(156, 163, 175);
      doc.setLineWidth(0.25);
      doc.line(140, y_sig, 195, y_sig);
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(107, 114, 128);
      doc.text('Firma Cliente', 167.5, y_sig + 4, { align: 'center' });

      // Save PDF document
      const sanitizedName = clientInfo.nombre.toLowerCase().replace(/\s/g, '-');
      doc.save(`presupuesto-${sanitizedName}-${clientInfo.numeroCotizacion}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setErrorMsg('Ocurrió un error al generar el PDF de cotización.');
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header section */}
      <div className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div className="text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand/10 border border-sand/20 text-sand text-xs mb-3 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-sand animate-pulse" />
            MÓDULO INTERNO SECRETO
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-light text-cream tracking-wide">
            Cotizador <span className="font-serif italic text-sand">Supremo</span>
          </h1>
          <p className="mt-3 text-cream/60 max-w-2xl font-light text-sm">
            Ingresa descripciones en lenguaje natural para que la IA extraiga cantidades y busque precios, o busca directamente partidas en la base de datos.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/admin"
            className="bg-stone-900 border border-sand/40 hover:border-sand hover:bg-stone-800 text-cream font-mono text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all inline-flex items-center gap-2 shadow-lg group"
          >
            <ArrowLeft className="w-4 h-4 text-sand group-hover:-translate-x-1 transition-transform" />
            <span>Volver al Dashboard</span>
          </Link>
          <Link
            href="/admin/partidas"
            className="bg-stone-900/60 border border-white/10 hover:border-sand/40 hover:bg-stone-800 text-sand/80 hover:text-sand font-mono text-xs uppercase tracking-wider px-3.5 py-2.5 rounded-xl transition-all inline-flex items-center gap-1.5"
          >
            <span>⚙️ Base de Partidas</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Inputs & Options */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Card 1: NLP Magic Box */}
          <div className="bg-[#1a1815] border border-stone-800 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-24 h-24 bg-sand/5 rounded-full blur-xl pointer-events-none"></div>
            
            <h2 className="text-lg font-display text-cream mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sand" />
              Caja de Texto Mágica
            </h2>
            
            <p className="text-xs text-cream/55 mb-4 leading-relaxed">
              Escribe libremente lo que necesitas cotizar. Ejemplo:<br />
              <span className="italic text-sand/80 font-mono">
                &quot;necesito cotizar 50m2 de instalacion de piso vinilico y 200m2 de pintura (latex y luego esmalte al agua), retiro de escombros 2m3&quot;
              </span>
            </p>

            <textarea
              className="w-full h-32 bg-stone-950 border border-stone-800 rounded-xl p-3 text-sm text-cream placeholder-cream/30 focus:outline-none focus:border-sand transition-colors duration-300 resize-none font-light"
              placeholder="Escribe o pega tu solicitud de cotización aquí..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isLoading}
            />

            {errorMsg && (
              <div className="mt-3 flex items-start gap-2 text-xs text-red-400 bg-red-950/20 border border-red-900/30 p-2.5 rounded-lg">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              onClick={handleAIParsing}
              disabled={isLoading || !prompt.trim()}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-sand hover:bg-sand/90 text-carbon py-3 px-4 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Interpretando partidas...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Procesar Solicitud
                </>
              )}
            </button>
          </div>

          {/* Card 2: Manual Search & Add por Categorías */}
          <div className="bg-[#1a1815] border border-stone-800 rounded-2xl p-6 shadow-2xl space-y-3">
            <h2 className="text-lg font-display text-cream flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Search className="w-5 h-5 text-sand" />
                Catálogo & Buscador por Capítulos
              </span>
              <span className="text-[10px] font-mono text-sand/70 bg-sand/10 border border-sand/20 px-2 py-0.5 rounded">
                772 PARTIDAS
              </span>
            </h2>
            
            {/* Selector de Categoría / Capítulo */}
            <div>
              <label className="block text-[10px] font-mono uppercase text-sand mb-1">
                Filtrar por Capítulo:
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 text-cream rounded-xl p-2.5 text-xs font-mono focus:outline-none focus:border-sand"
              >
                <option value="TODAS">Ver Todos los Capítulos ({allDbItems.length} Partidas)</option>
                {chaptersList.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Input de Búsqueda por Texto */}
            <div className="relative">
              <input
                type="text"
                className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-4 py-2 text-xs text-cream placeholder-cream/30 focus:outline-none focus:border-sand transition-colors font-mono"
                placeholder="Filtrar por nombre o código (ej: Radier, Zinc)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-cream/30" />
            </div>

            {/* Results list con botón Añadir a 1-Clic */}
            {searchResults.length > 0 && (
              <div className="mt-3 border border-stone-800 bg-stone-950 rounded-xl divide-y divide-stone-900 max-h-72 overflow-y-auto">
                {searchResults.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 hover:bg-stone-900/60 transition-colors duration-200 flex items-center justify-between gap-3 group"
                  >
                    <div className="min-w-0 flex-1">
                      {item.category && (
                        <span className="inline-block text-[8px] font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20 px-1.5 py-0.2 rounded mb-0.5 uppercase tracking-wider">
                          {item.category}
                        </span>
                      )}
                      <div className="flex items-center gap-2 text-xs font-mono text-sand">
                        <span className="font-bold">{item.code || 'S/C'}</span>
                        <span className="text-stone-600">|</span>
                        <span>{item.unit}</span>
                      </div>
                      <div className="text-xs text-cream/90 font-medium line-clamp-1 mt-0.5">
                        {item.description}
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-3">
                      <div className="text-right font-mono">
                        <span className="block text-xs font-bold text-sand">{item.priceUf.toFixed(4)} UF</span>
                        <span className="block text-[10px] text-cream/50">${Math.round(item.priceUf * ufValue).toLocaleString('es-CL')}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAddManualItem(item)}
                        className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/40 border border-amber-500/50 text-amber-300 text-xs font-mono font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer shadow-sm active:scale-95"
                      >
                        <Plus className="w-3.5 h-3.5 text-amber-400" />
                        Añadir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {(searchQuery.trim().length >= 2 || selectedCategory !== 'TODAS') && searchResults.length === 0 && (
              <div className="mt-3 p-3 text-center text-xs text-cream/40 font-light font-mono border border-stone-800 rounded-xl">
                No se encontraron partidas en este filtro.
              </div>
            )}
          </div>

          {/* Card 3: Client and Project Details */}
          <div className="bg-[#1a1815] border border-stone-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <h2 className="text-lg font-display text-cream mb-2 flex items-center gap-2">
              <span className="text-sand">👤</span> Datos del Cliente y Proyecto
            </h2>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-cream/50 mb-1.5">NOMBRE Y APELLIDO</label>
                <input
                  type="text"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-sm text-cream focus:outline-none focus:border-sand"
                  value={clientInfo.nombre}
                  onChange={(e) => setClientInfo(prev => ({ ...prev, nombre: e.target.value }))}
                  placeholder="Ej: Matias Donoso"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-cream/50 mb-1.5">TELÉFONO</label>
                  <input
                    type="text"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-sm text-cream focus:outline-none focus:border-sand"
                    value={clientInfo.telefono}
                    onChange={(e) => setClientInfo(prev => ({ ...prev, telefono: e.target.value }))}
                    placeholder="Ej: +56 9 1234 5678"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-cream/50 mb-1.5">CORREO</label>
                  <input
                    type="email"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-sm text-cream focus:outline-none focus:border-sand"
                    value={clientInfo.correo}
                    onChange={(e) => setClientInfo(prev => ({ ...prev, correo: e.target.value }))}
                    placeholder="Ej: cliente@correo.cl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-cream/50 mb-1.5">LOCALIDAD</label>
                  <input
                    type="text"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-sm text-cream focus:outline-none focus:border-sand"
                    value={clientInfo.localidad}
                    onChange={(e) => setClientInfo(prev => ({ ...prev, localidad: e.target.value }))}
                    placeholder="Ej: Talca, Maule"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-cream/50 mb-1.5 font-mono">FECHA</label>
                  <input
                    type="date"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-sm text-cream focus:outline-none focus:border-sand"
                    value={clientInfo.fecha}
                    onChange={(e) => setClientInfo(prev => ({ ...prev, fecha: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-cream/50 mb-1.5">Nº COTIZACIÓN</label>
                  <input
                    type="text"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-sm text-cream font-mono focus:outline-none focus:border-sand"
                    value={clientInfo.numeroCotizacion}
                    onChange={(e) => setClientInfo(prev => ({ ...prev, numeroCotizacion: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-cream/50 mb-1.5">PRESUPUESTO MATERIALES ($)</label>
                  <input
                    type="number"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-sm text-cream font-mono focus:outline-none focus:border-sand"
                    value={clientInfo.costoMateriales || ''}
                    onChange={(e) => setClientInfo(prev => ({ ...prev, costoMateriales: Number(e.target.value) }))}
                    placeholder="Ej: 10642830"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Parameters */}
          <div className="bg-[#1a1815] border border-stone-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <h2 className="text-lg font-display text-cream mb-2">Parámetros Financieros</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-cream/50 mb-1.5">VALOR UF ($)</label>
                <input
                  type="number"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-sm text-cream font-mono focus:outline-none focus:border-sand"
                  value={ufValue}
                  onChange={(e) => setUfValue(Number(e.target.value))}
                />
              </div>
              
              <div>
                <label className="block text-xs font-mono text-cream/50 mb-1.5">IVA (19%)</label>
                <button
                  onClick={() => setIvaActive(!ivaActive)}
                  className={`w-full py-2 px-3 rounded-xl border text-sm font-semibold transition-all duration-300 ${
                    ivaActive
                      ? 'bg-sand/10 border-sand text-sand'
                      : 'bg-stone-950 border-stone-800 text-cream/40'
                  }`}
                >
                  {ivaActive ? 'Activado (19%)' : 'Exento (0%)'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-cream/50 mb-1.5">GASTOS GRALES. (%)</label>
                <input
                  type="number"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-sm text-cream font-mono focus:outline-none focus:border-sand"
                  value={gastosGenerales}
                  onChange={(e) => setGastosGenerales(Number(e.target.value))}
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-cream/50 mb-1.5">UTILIDAD (%)</label>
                <input
                  type="number"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-sm text-cream font-mono focus:outline-none focus:border-sand"
                  value={utilidad}
                  onChange={(e) => setUtilidad(Number(e.target.value))}
                />
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Table & Grand Totals */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Card: Budget Table */}
          <div className="bg-[#1a1815] border border-stone-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col min-h-[500px]">
            
            <div className="p-6 border-b border-stone-900 flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-xl font-display text-cream">Presupuesto Estimado</h2>
              {quoteItems.length > 0 && (
                <button
                  onClick={() => setQuoteItems([])}
                  className="text-xs text-red-400 hover:text-red-300 font-mono transition-colors"
                >
                  Limpiar todo
                </button>
              )}
            </div>

            {quoteItems.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-cream/35">
                <HelpCircle className="w-12 h-12 text-stone-800 mb-3 animate-pulse" />
                <p className="font-light text-sm">No hay partidas agregadas al presupuesto.</p>
                <p className="text-xs text-cream/20 mt-1 max-w-sm leading-relaxed">
                  Prueba escribiendo tu solicitud en la caja mágica de la izquierda o búscalas manualmente.
                </p>
              </div>
            ) : (
              <div className="flex-1 overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-stone-950 border-b border-stone-900 text-xs font-mono text-cream/50 tracking-wider">
                      <th className="p-4 font-normal">CÓDIGO</th>
                      <th className="p-4 font-normal">DESCRIPCIÓN</th>
                      <th className="p-4 font-normal text-center">CANT.</th>
                      <th className="p-4 font-normal text-right">P.U.</th>
                      <th className="p-4 font-normal text-right">TOTAL (CLP)</th>
                      <th className="p-4 text-center font-normal">ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-900/50">
                    {quoteItems.map((item) => {
                      const totalItemClp = item.quantity * item.priceUf * ufValue;
                      return (
                        <tr key={item.id} className="hover:bg-stone-900/20 transition-colors">
                          <td className="p-4 font-mono text-xs text-sand shrink-0">{item.code || 'S/C'}</td>
                          
                          <td className="p-4 min-w-[200px]">
                            {item.category && (
                              <span className="inline-block text-[9px] font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded mb-1 uppercase tracking-wider">
                                {item.category}
                              </span>
                            )}
                            <div className="text-xs text-cream font-medium line-clamp-2">{item.description}</div>
                            {/* BOTÓN DESPLEGABLE FICHA EXCEL */}
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                              <button
                                type="button"
                                onClick={() => toggleExcelView(item.id)}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#107c41]/20 hover:bg-[#107c41]/35 border border-[#107c41]/50 rounded text-[10px] font-mono text-emerald-300 font-bold transition-all shadow-sm"
                              >
                                <Table className="w-3.5 h-3.5 text-emerald-400" />
                                {openExcelId === item.id ? 'OCULTAR FICHA EXCEL ▲' : '📊 VER FICHA APU EXCEL ▼'}
                              </button>

                              <span className="bg-stone-900 border border-stone-800 px-2 py-0.5 rounded text-[9px] font-mono text-amber-300">
                                📦 Mat ({item.porcentajeMateriales || 50}%): ${Math.round((totalItemClp * (item.porcentajeMateriales || 50)) / 100).toLocaleString('es-CL')}
                              </span>
                              <span className="bg-stone-900 border border-stone-800 px-2 py-0.5 rounded text-[9px] font-mono text-emerald-400">
                                🔨 MO ({item.porcentajeManoObra || 45}%): ${Math.round((totalItemClp * (item.porcentajeManoObra || 45)) / 100).toLocaleString('es-CL')}
                              </span>
                            </div>

                            {/* PLANILLA DESPLEGABLE ULTRA FIEL A EXCEL */}
                            {openExcelId === item.id && (
                              <div className="mt-3 bg-[#111111] border-2 border-[#107c41] rounded-lg overflow-hidden shadow-2xl font-mono text-[10px] max-w-2xl">
                                {/* Barra de título estilo Microsoft Excel */}
                                <div className="bg-[#107c41] text-white px-3 py-1 flex items-center justify-between text-[9px] font-bold tracking-wider uppercase">
                                  <div className="flex items-center gap-2">
                                    <Table className="w-3.5 h-3.5" />
                                    <span>MICROSOFT EXCEL - HOJA DE ANÁLISIS DE PRECIOS UNITARIOS</span>
                                  </div>
                                  <span className="text-[8px] opacity-80">HOJA_APU_CHILE.XLSX</span>
                                </div>

                                {/* Encabezado de Columnas Excel (A, B, C, D, E) */}
                                <div className="grid grid-cols-12 bg-stone-900 border-b border-neutral-700 text-stone-400 text-center text-[9px] font-bold">
                                  <div className="col-span-1 border-r border-neutral-700 py-1 bg-stone-950">A</div>
                                  <div className="col-span-4 border-r border-neutral-700 py-1">B (CONCEPTO / INSUMO)</div>
                                  <div className="col-span-2 border-r border-neutral-700 py-1">C (UNIDAD)</div>
                                  <div className="col-span-2 border-r border-neutral-700 py-1">D (% APU)</div>
                                  <div className="col-span-3 py-1">E (SUBTOTAL CLP)</div>
                                </div>

                                {/* Filas de Celdas Excel */}
                                <div className="divide-y divide-neutral-800 text-neutral-200">
                                  {/* Fila 1: Materiales */}
                                  <div className="grid grid-cols-12 hover:bg-white/5 transition-colors">
                                    <div className="col-span-1 border-r border-neutral-800 p-1.5 text-center font-bold text-amber-400 bg-stone-950/60">1</div>
                                    <div className="col-span-4 border-r border-neutral-800 p-1.5 flex items-center gap-1">
                                      <span className="text-amber-400 font-bold">📦 Materiales & Insumos</span>
                                    </div>
                                    <div className="col-span-2 border-r border-neutral-800 p-1.5 text-center">{item.unit || 'm2'}</div>
                                    <div className="col-span-2 border-r border-neutral-800 p-1.5 text-center text-amber-300 font-bold">{item.porcentajeMateriales || 50}%</div>
                                    <div className="col-span-3 p-1.5 text-right font-bold text-cream">${Math.round((totalItemClp * (item.porcentajeMateriales || 50)) / 100).toLocaleString('es-CL')}</div>
                                  </div>

                                  {/* Fila 2: Mano de Obra */}
                                  <div className="grid grid-cols-12 hover:bg-white/5 transition-colors">
                                    <div className="col-span-1 border-r border-neutral-800 p-1.5 text-center font-bold text-emerald-400 bg-stone-950/60">2</div>
                                    <div className="col-span-4 border-r border-neutral-800 p-1.5 flex items-center gap-1">
                                      <span className="text-emerald-400 font-bold">🔨 Mano de Obra + Leyes Soc.</span>
                                    </div>
                                    <div className="col-span-2 border-r border-neutral-800 p-1.5 text-center">JORNAL</div>
                                    <div className="col-span-2 border-r border-neutral-800 p-1.5 text-center text-emerald-300 font-bold">{item.porcentajeManoObra || 45}%</div>
                                    <div className="col-span-3 p-1.5 text-right font-bold text-cream">${Math.round((totalItemClp * (item.porcentajeManoObra || 45)) / 100).toLocaleString('es-CL')}</div>
                                  </div>

                                  {/* Fila 3: Equipos */}
                                  <div className="grid grid-cols-12 hover:bg-white/5 transition-colors">
                                    <div className="col-span-1 border-r border-neutral-800 p-1.5 text-center font-bold text-sky-400 bg-stone-950/60">3</div>
                                    <div className="col-span-4 border-r border-neutral-800 p-1.5 flex items-center gap-1">
                                      <span className="text-sky-400 font-bold">🏗️ Equipos & Herramientas</span>
                                    </div>
                                    <div className="col-span-2 border-r border-neutral-800 p-1.5 text-center">GL</div>
                                    <div className="col-span-2 border-r border-neutral-800 p-1.5 text-center text-sky-300 font-bold">{item.porcentajeEquipos || 5}%</div>
                                    <div className="col-span-3 p-1.5 text-right font-bold text-cream">${Math.round((totalItemClp * (item.porcentajeEquipos || 5)) / 100).toLocaleString('es-CL')}</div>
                                  </div>

                                  {/* Fila 4: Especificación Técnica */}
                                  {item.inclusions && (
                                    <div className="grid grid-cols-12 bg-stone-950/80 p-2 border-t border-neutral-700">
                                      <div className="col-span-1 border-r border-neutral-800 text-center font-bold text-sand">4</div>
                                      <div className="col-span-11 pl-2 text-neutral-300 font-light leading-relaxed">
                                        <span className="text-sand font-bold block mb-0.5 uppercase text-[9px]">📋 ESPECIFICACIÓN TÉCNICA Y CRITERIO DE EJECUCIÓN:</span>
                                        {item.inclusions}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                            {/* Alternative matching notification & switcher dropdown */}
                            {item.alternatives.length > 0 && (
                              <div className="mt-1 flex items-center gap-1.5">
                                <span className="text-[10px] font-mono text-amber-500/80">
                                  ¿No es la correcta? Cambiar por:
                                </span>
                                <select
                                  onChange={(e) => {
                                    const selected = item.alternatives.find(a => String(a.id) === e.target.value);
                                    if (selected) handleSwitchAlternative(item.id, selected);
                                  }}
                                  className="text-[10px] bg-stone-900 border border-stone-800 text-cream/70 rounded px-1.5 py-0.5 focus:outline-none max-w-[150px] truncate"
                                  defaultValue=""
                                >
                                  <option value="" disabled>Alternativas...</option>
                                  {item.alternatives.map((alt) => (
                                    <option key={alt.id} value={alt.id}>
                                      {alt.description} ({alt.priceUf.toFixed(4)} UF / ${Math.round(alt.priceUf * ufValue).toLocaleString('es-CL')})
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )}
                          </td>
                          
                          <td className="p-4 text-center shrink-0">
                            <input
                              type="number"
                              step="any"
                              className="w-16 bg-stone-950 border border-stone-850 rounded px-2 py-1 text-center text-xs font-mono text-cream focus:outline-none focus:border-sand"
                              value={item.quantity}
                              onChange={(e) => handleUpdateQty(item.id, Number(e.target.value))}
                            />
                            <span className="block text-[10px] text-cream/40 mt-0.5 font-mono">{item.unit}</span>
                          </td>
                          
                          <td className="p-4 text-right shrink-0">
                            <div className="font-mono text-xs text-cream/80">{item.priceUf.toFixed(4)} UF</div>
                            <div className="font-mono text-[10px] text-cream/45 mt-0.5">${Math.round(item.priceUf * ufValue).toLocaleString('es-CL')}</div>
                          </td>
                          
                          <td className="p-4 text-right font-mono text-xs text-cream shrink-0">
                            ${Math.round(totalItemClp).toLocaleString('es-CL')}
                          </td>
                          
                          <td className="p-4 text-center shrink-0">
                            <button
                              onClick={() => handleDeleteItem(item.id)}
                              className="text-stone-600 hover:text-red-400 p-1.5 rounded-lg hover:bg-stone-900 transition-colors"
                              title="Eliminar partida"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* Calculations Footer */}
            {quoteItems.length > 0 && (
              <div className="bg-stone-950 border-t border-stone-900 p-6 space-y-3.5">
                <div className="flex justify-between items-center text-xs font-mono text-cream/60">
                  <span>COSTO DIRECTO</span>
                  <span>{totals.costDirectoUf.toFixed(2)} UF (${Math.round(totals.costDirectoClp).toLocaleString('es-CL')})</span>
                </div>
                
                <div className="flex justify-between items-center text-xs font-mono text-cream/60">
                  <span>GASTOS GENERALES ({gastosGenerales}%)</span>
                  <span>{totals.ggUf.toFixed(2)} UF (${Math.round(totals.ggClp).toLocaleString('es-CL')})</span>
                </div>

                <div className="flex justify-between items-center text-xs font-mono text-cream/60">
                  <span>UTILIDAD ({utilidad}%)</span>
                  <span>{totals.utilUf.toFixed(2)} UF (${Math.round(totals.utilClp).toLocaleString('es-CL')})</span>
                </div>

                <div className="border-t border-stone-900/60 my-2"></div>

                <div className="flex justify-between items-center text-xs font-mono text-cream/80">
                  <span>NETO</span>
                  <span>{totals.netoUf.toFixed(2)} UF (${Math.round(totals.netoClp).toLocaleString('es-CL')})</span>
                </div>

                {ivaActive && (
                  <div className="flex justify-between items-center text-xs font-mono text-cream/60">
                    <span>IVA (19%)</span>
                    <span>{totals.ivaUf.toFixed(2)} UF (${Math.round(totals.ivaClp).toLocaleString('es-CL')})</span>
                  </div>
                )}

                <div className="border-t border-stone-900/80 my-2"></div>

                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-display text-cream font-medium tracking-wide">TOTAL ESTIMADO</span>
                  <div className="text-right">
                    <div className="text-2xl font-mono text-sand font-bold">
                      ${Math.round(totals.totalClp).toLocaleString('es-CL')}
                    </div>
                    <div className="text-xs font-mono text-cream/40">
                      {totals.totalUf.toFixed(2)} UF
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 flex gap-3">
                  <button
                    onClick={handleDownloadPdf}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#d97706] hover:bg-[#ea580c] text-white py-3 px-4 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 active:scale-[0.98] select-none shadow-lg shadow-amber-950/20"
                  >
                    <Download className="w-4 h-4 text-white" />
                    Obtener cotización
                  </button>
                  <button
                    onClick={handleCopyText}
                    title="Copiar texto estructurado"
                    className="p-3 bg-[#1a1815] border border-stone-850 hover:border-sand hover:bg-stone-900 text-cream rounded-xl transition-all duration-300 active:scale-[0.98] select-none"
                  >
                    {copySuccess ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-sand" />
                    )}
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
