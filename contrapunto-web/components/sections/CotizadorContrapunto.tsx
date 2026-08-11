'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { ChevronLeft, Plus, Minus, MessageCircle, Send, Download } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

/*
========================================
CONSTANTES ESTÁTICAS (Externalizadas)
========================================
*/

const m2EspaciosCasa: Record<string, number> = {
  'Dormitorio matrimonial en suite': 24,
  'Dormitorio matrimonial simple': 18,
  'Dormitorio simple': 12,
  'Dormitorio visitas': 12,
  'Walk-in closet': 6,
  'Baño principal': 8,
  'Baño secundario': 5,
  'Living pequeño': 18,
  'Living grande': 32,
  'Cocina americana': 16,
  'Cocina grande': 26,
  Oficina: 12,
  Terraza: 20,
  Quincho: 22,
  Pérgola: 16,
  Bodega: 8,
}

const valorM2BaseQuincho: Record<string, number> = {
  'Terraza abierta': 180000,
  'Terraza techada': 320000,
  'Quincho completo': 520000,
}

const multiplicadorMaterialidad: Record<string, number> = {
  Madera: 1,
  'Acero y madera': 1.12,
  'Ladrillo y madera': 1.22,
}

const extrasQuinchoValores: Record<string, number> = {
  'Parrilla integrada': 950000,
  'Horno de barro': 1800000,
  Lavaplatos: 180000,
  'Mesón de hormigón': 650000,
  'Mesón de madera': 420000,
  'Barra exterior': 450000,
  'Iluminación LED': 250000,
  'Deck de madera': 1200000,
  'Piso porcelanato': 1600000,
  'Terraza cerrada': 2500000,
  Pérgola: 950000,
  'Hot tub / tinaja': 3200000,
}

type Paso = {
  tipo: 'cards' | 'input' | 'multiselect' | 'quantity-select' | 'resultado'
  campo?: string
  titulo?: string
  opciones?: Array<{ valor: string; imagen: string }> | string[]
  placeholder?: string
}

const flujoBase: Paso[] = [
  {
    tipo: 'cards',
    campo: 'tipoProyecto',
    titulo: '¿Qué quieres construir?',
    opciones: [
      {
        valor: 'Casa nueva',
        imagen: '/images/cotizador/casa-nueva.webp',
      },
      {
        valor: 'Ampliación',
        imagen: '/images/cotizador/ampliacion.webp',
      },
      {
        valor: 'Quincho / Terraza',
        imagen: '/images/cotizador/foto-quincho.webp',
      },
      {
        valor: 'Tiny House',
        imagen: '/images/cotizador/tiny-house.webp',
      },
    ],
  },
]

const flujos: Record<string, Paso[]> = {
  'Casa nueva': [
    ...flujoBase,
    {
      tipo: 'cards',
      campo: 'plantas',
      titulo: '¿Cuántas plantas quieres?',
      opciones: [
        {
          valor: '1 piso',
          imagen: '/images/cotizador/casa-1-piso.webp',
        },
        {
          valor: '2 pisos',
          imagen: '/images/cotizador/casa-2-pisos.webp',
        },
        {
          valor: '3 pisos o más',
          imagen: '/images/cotizador/casa-3-pisos.webp',
        },
      ],
    },
    {
      tipo: 'quantity-select',
      campo: 'espaciosCasa',
      titulo: 'Selecciona los espacios de tu casa',
      opciones: Object.keys(m2EspaciosCasa),
    },
    {
      tipo: 'resultado',
    },
  ],
  'Ampliación': [
    ...flujoBase,
    {
      tipo: 'cards',
      campo: 'plantas',
      titulo: '¿Cuántas plantas quieres?',
      opciones: [
        {
          valor: '1 piso',
          imagen: '/images/cotizador/casa-1-piso.webp',
        },
        {
          valor: '2 pisos',
          imagen: '/images/cotizador/casa-2-pisos.webp',
        },
        {
          valor: '3 pisos o más',
          imagen: '/images/cotizador/casa-3-pisos.webp',
        },
      ],
    },
    {
      tipo: 'quantity-select',
      campo: 'espaciosCasa',
      titulo: 'Selecciona los espacios de tu casa',
      opciones: Object.keys(m2EspaciosCasa),
    },
    {
      tipo: 'resultado',
    },
  ],
  'Quincho / Terraza': [
    ...flujoBase,
    {
      tipo: 'cards',
      campo: 'tipoQuincho',
      titulo: '¿Qué tipo de proyecto exterior quieres?',
      opciones: [
        {
          valor: 'Terraza abierta',
          imagen: '/images/cotizador/terraza-abierta.webp',
        },
        {
          valor: 'Terraza techada',
          imagen: '/images/cotizador/terraza-techada.webp',
        },
        {
          valor: 'Quincho completo',
          imagen: '/images/cotizador/quincho-completo.webp',
        },
      ],
    },
    {
      tipo: 'input',
      campo: 'metrosQuincho',
      titulo: '¿Cuántos m² aproximados tendrá el proyecto?',
      placeholder: 'Ej: 35',
    },
    {
      tipo: 'cards',
      campo: 'materialidadQuincho',
      titulo: '¿Qué materialidad prefieres?',
      opciones: [
        {
          valor: 'Madera',
          imagen: '/images/cotizador/terraza-madera.webp',
        },
        {
          valor: 'Acero y madera',
          imagen: '/images/cotizador/terraza-acero-y-madera.webp',
        },
        {
          valor: 'Ladrillo y madera',
          imagen: '/images/cotizador/terraza-ladrillo-madera.webp',
        },
      ],
    },
    {
      tipo: 'multiselect',
      campo: 'extrasQuincho',
      titulo: 'Selecciona los elementos que quieres incluir',
      opciones: [
        'Parrilla integrada',
        'Horno de barro',
        'Lavaplatos',
        'Mesón de hormigón',
        'Mesón de madera',
        'Barra exterior',
        'Iluminación LED',
        'Deck de madera',
        'Piso porcelanato',
        'Terraza cerrada',
        'Pérgola',
        'Hot tub / tinaja',
      ],
    },
    {
      tipo: 'resultado',
    },
  ],
  'Tiny House': [
    ...flujoBase,
    {
      tipo: 'cards',
      campo: 'usoTiny',
      titulo: '¿Qué uso tendrá la Tiny House?',
      opciones: [
        {
          valor: 'Vivienda permanente',
          imagen: '/images/cotizador/tiny-vivienda.webp',
        },
        {
          valor: 'Turismo / Airbnb',
          imagen: '/images/cotizador/tiny-airbnb.webp',
        },
        {
          valor: 'Oficina o estudio',
          imagen: '/images/cotizador/tiny-office.webp',
        },
      ],
    },
    {
      tipo: 'cards',
      campo: 'tamanoTiny',
      titulo: '¿Qué tamaño aproximado deseas?',
      opciones: [
        {
          valor: '15m² - 25m²',
          imagen: '/images/cotizador/tiny-15-25.webp',
        },
        {
          valor: '25m² - 35m²',
          imagen: '/images/cotizador/tiny-25-35.webp',
        },
        {
          valor: '35m² - 50m²',
          imagen: '/images/cotizador/tiny-35-50.webp',
        },
      ],
    },
    {
      tipo: 'input',
      campo: 'metrosTiny',
      titulo: '¿Cuántos m² exactos tendrá tu Tiny House?',
      placeholder: 'Ej: 28',
    },
    {
      tipo: 'resultado',
    },
  ],
}

export default function CotizadorContrapunto() {
  const [pasoActual, setPasoActual] = useState(0)
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const hasCountedRef = useRef(false)

  const [respuestas, setRespuestas] = useState({
    tipoProyecto: '',
    // CASA
    plantas: '',
    espaciosCasa: {} as Record<string, number>,
    metrosOtrosCasa: 0,
    nombreOtrosCasa: '',
    // QUINCHO
    tipoQuincho: '',
    materialidadQuincho: '',
    extrasQuincho: [] as string[],
    metrosQuincho: 25,
    // TINY
    usoTiny: '',
    tamanoTiny: '',
    metrosTiny: 30,
    // CONTACTO
    nombreContacto: '',
    telefonoContacto: '',
    emailContacto: '',
    mensajeContacto: '',
  })

  // Sincronizar dinámicamente los pasos basados en la selección actual
  const pasos = useMemo(() => {
    return flujos[respuestas.tipoProyecto] || flujoBase
  }, [respuestas.tipoProyecto])

  // Evitar desbordamiento de índice de pasos con un fallback seguro
  const paso = useMemo(() => {
    if (pasoActual >= pasos.length) {
      return pasos[pasos.length - 1]
    }
    return pasos[pasoActual]
  }, [pasos, pasoActual])

  // Pre-carga proactiva de todas las imágenes de todos los flujos de la aplicación al iniciar la página
  const todasLasImagenesDelFlujo = useMemo(() => {
    const urls: string[] = []
    // Agregar imágenes del flujo base
    flujoBase.forEach((p) => {
      if (p.tipo === 'cards' && p.opciones) {
        ;(p.opciones as Array<{ valor: string; imagen: string }>).forEach((op) => {
          if (op.imagen && !urls.includes(op.imagen)) urls.push(op.imagen)
        })
      }
    })
    // Agregar imágenes de todos los flujos específicos (Casa, Quincho, Tiny House)
    Object.values(flujos).forEach((pasosFlujo) => {
      pasosFlujo.forEach((p) => {
        if (p.tipo === 'cards' && p.opciones) {
          ;(p.opciones as Array<{ valor: string; imagen: string }>).forEach((op) => {
            if (op.imagen && !urls.includes(op.imagen)) urls.push(op.imagen)
          })
        }
      })
    })
    return urls
  }, [])

  /*
  ========================================
  HELPERS / ACCIONES
  ========================================
  */

  const siguientePaso = () => {
    if (pasoActual < pasos.length - 1) {
      setPasoActual((prev) => prev + 1)
    }
  }

  const pasoAnterior = () => {
    if (pasoActual > 0) {
      setPasoActual((prev) => prev - 1)
    }
  }

  const seleccionarOpcion = (campo: string, valor: string) => {
    // Sincronización instantánea y atómica del estado de respuestas y del paso actual.
    // Al realizar ambos cambios de estado juntos, React los agrupa en un único ciclo de renderizado,
    // eliminando el doble render ineficiente y la necesidad del setTimeout artificial de 80ms.
    setRespuestas((prev) => {
      const nuevasRespuestas = { ...prev, [campo]: valor }
      
      const proximoTipoProyecto = campo === 'tipoProyecto' ? valor : prev.tipoProyecto
      const proximosPasos = flujos[proximoTipoProyecto] || flujoBase
      
      if (pasoActual < proximosPasos.length - 1) {
        setPasoActual(pasoActual + 1)
      }
      return nuevasRespuestas
    })
  }

  const toggleArrayItem = (campo: string, valor: string) => {
    setRespuestas((prev) => {
      const arr = prev[campo as keyof typeof prev]
      const existe = Array.isArray(arr) && arr.includes(valor)
      
      if (existe) {
        return {
          ...prev,
          [campo]: (arr as string[]).filter((i) => i !== valor),
        }
      } else {
        return {
          ...prev,
          [campo]: [...(arr as string[]), valor],
        }
      }
    })
  }

  const incrementarEspacio = (espacio: string) => {
    setRespuestas((prev) => ({
      ...prev,
      espaciosCasa: {
        ...prev.espaciosCasa,
        [espacio]: (prev.espaciosCasa[espacio] || 0) + 1,
      },
    }))
  }

  const decrementarEspacio = (espacio: string) => {
    setRespuestas((prev) => {
      const cantidad = prev.espaciosCasa[espacio] || 0
      if (cantidad <= 1) {
        const nuevosEspacios = { ...prev.espaciosCasa }
        delete nuevosEspacios[espacio]
        return { ...prev, espaciosCasa: nuevosEspacios }
      }
      return {
        ...prev,
        espaciosCasa: {
          ...prev.espaciosCasa,
          [espacio]: cantidad - 1,
        },
      }
    })
  }

  const enviarDatosContacto = async () => {
    if (!respuestas.nombreContacto || !respuestas.telefonoContacto || !respuestas.emailContacto) {
      alert('Por favor, ingresa Nombre, Teléfono y Email para poder enviarte la cotización.');
      return;
    }

    setEnviando(true);

    // Generar resumen estructurado y legible
    let detallesCotizacion = '';
    if (respuestas.tipoProyecto === 'Casa nueva' || respuestas.tipoProyecto === 'Ampliación') {
      detallesCotizacion = `• Tipo de Obra: ${respuestas.tipoProyecto}\n• Cantidad de pisos: ${respuestas.plantas}\n• Superficie estimada: ${metrosTotalesCasa}m²\n• Estándar Base: desde $${valorCasaBase.toLocaleString('es-CL')} ($600.000/m²)\n• Estándar Alto: desde $${valorCasaAlto.toLocaleString('es-CL')} ($850.000/m²)\n• Estándar Superior: desde $${valorCasaSuperior.toLocaleString('es-CL')} ($1.200.000/m²)\n• Espacios:\n` + 
        Object.entries(respuestas.espaciosCasa).map(([espacio, cantidad]) => `  - ${cantidad}x ${espacio} (${m2EspaciosCasa[espacio] * cantidad}m²)`).join('\n') +
        (respuestas.metrosOtrosCasa > 0 ? `\n  - ${respuestas.nombreOtrosCasa || 'Otros espacios'} (${respuestas.metrosOtrosCasa}m²)` : '');
    } else if (respuestas.tipoProyecto === 'Quincho / Terraza') {
      detallesCotizacion = `• Tipo de Obra: Quincho / Terraza\n• Tipo de terraza: ${respuestas.tipoQuincho}\n• Superficie: ${metrosQuincho}m²\n• Materialidad: ${respuestas.materialidadQuincho}\n• Elementos extras: ${respuestas.extrasQuincho.join(', ') || 'Ninguno'}\n• TOTAL estimado: $${totalQuincho.toLocaleString('es-CL')} ($${valorM2FinalQuincho.toLocaleString('es-CL')}/m²)`;
    } else if (respuestas.tipoProyecto === 'Tiny House') {
      detallesCotizacion = `• Tipo de Obra: Tiny House\n• Uso de la Tiny: ${respuestas.usoTiny}\n• Rango de tamaño: ${respuestas.tamanoTiny}\n• Superficie exacta: ${metrosTiny}m²\n• Valor estimado: $${valorTiny.toLocaleString('es-CL')} ($600.000/m²)`;
    }

    try {
      const response = await fetch('/api/send-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: respuestas.nombreContacto,
          telefono: respuestas.telefonoContacto,
          email: respuestas.emailContacto,
          proyecto: respuestas.tipoProyecto,
          mensaje: respuestas.mensajeContacto,
          detalles: detallesCotizacion,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setEnviado(true);
      } else {
        alert(`Error al procesar el envío: ${data.error || 'Por favor, intenta nuevamente.'}`);
      }
    } catch (err) {
      console.error(err);
      alert('Error de conexión con el servidor. Intenta de nuevo.');
    } finally {
      setEnviando(false);
    }
  }

  /*
  ========================================
  CÁLCULOS MEMOIZADOS (useMemo)
  ========================================
  */

  // 1. CASA NUEVA
  const metrosTotalesCasa = useMemo(() => {
    const sum = Object.entries(respuestas.espaciosCasa).reduce((acc, [espacio, cantidad]) => {
      return acc + (m2EspaciosCasa[espacio] || 0) * cantidad
    }, 0)
    return sum + (Number(respuestas.metrosOtrosCasa) || 0)
  }, [respuestas.espaciosCasa, respuestas.metrosOtrosCasa])

  const valorCasaBase = useMemo(() => metrosTotalesCasa * 600000, [metrosTotalesCasa])
  const valorCasaAlto = useMemo(() => metrosTotalesCasa * 850000, [metrosTotalesCasa])
  const valorCasaSuperior = useMemo(() => metrosTotalesCasa * 1200000, [metrosTotalesCasa])

  // 2. QUINCHO / TERRAZA
  const metrosQuincho = Number(respuestas.metrosQuincho) || 0
  const valorBaseM2 = useMemo(() => valorM2BaseQuincho[respuestas.tipoQuincho] || 0, [respuestas.tipoQuincho])
  const multiplicador = useMemo(() => multiplicadorMaterialidad[respuestas.materialidadQuincho] || 1, [respuestas.materialidadQuincho])
  
  const subtotalQuincho = useMemo(() => {
    return metrosQuincho * valorBaseM2 * multiplicador
  }, [metrosQuincho, valorBaseM2, multiplicador])

  const totalExtrasQuincho = useMemo(() => {
    return respuestas.extrasQuincho?.reduce((acc, extra) => {
      return acc + (extrasQuinchoValores[extra] || 0)
    }, 0) || 0
  }, [respuestas.extrasQuincho])

  const totalQuincho = useMemo(() => subtotalQuincho + totalExtrasQuincho, [subtotalQuincho, totalExtrasQuincho])
  const valorM2FinalQuincho = useMemo(() => {
    return metrosQuincho > 0 ? Math.round(totalQuincho / metrosQuincho) : 0
  }, [totalQuincho, metrosQuincho])

  // 3. TINY HOUSE
  const metrosTiny = Number(respuestas.metrosTiny) || 0
  const valorTiny = useMemo(() => metrosTiny * 600000, [metrosTiny])

  /*
  ========================================
  GENERAR PDF (jsPDF)
  ========================================
  */

  const generarPDF = async () => {
    const { jsPDF } = await import('jspdf')
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()

    // Cargar imagen de logo y convertir a silueta negra para el PDF
    let logoImg: HTMLImageElement | null = null
    let logoBlackUrl: string | null = null
    try {
      const loadImage = (url: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
          const img = new window.Image()
          img.src = url
          img.onload = () => resolve(img)
          img.onerror = (err) => reject(err)
        })
      }
      logoImg = await loadImage('/logo.png')

      if (logoImg) {
        const canvas = document.createElement('canvas')
        canvas.width = logoImg.naturalWidth || logoImg.width
        canvas.height = logoImg.naturalHeight || logoImg.height
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.drawImage(logoImg, 0, 0)
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          const data = imgData.data
          for (let i = 0; i < data.length; i += 4) {
            const alpha = data[i + 3]
            if (alpha > 0) {
              data[i] = 0     // R
              data[i + 1] = 0 // G
              data[i + 2] = 0 // B
            }
          }
          ctx.putImageData(imgData, 0, 0)
          logoBlackUrl = canvas.toDataURL('image/png')
        }
      }
    } catch (err) {
      console.error('Error al cargar y procesar el logo para el PDF:', err)
    }

    const pdfLogo = logoBlackUrl || logoImg

    // Marca de agua translúcida al centro
    if (pdfLogo) {
      const docAny = doc as unknown as { GState: new (options: { opacity: number }) => unknown }
      const GStateClass = docAny.GState || (jsPDF as unknown as { GState: new (options: { opacity: number }) => unknown }).GState
      if (GStateClass) {
        doc.saveGraphicsState()
        doc.setGState(new GStateClass({ opacity: 0.05 })) // 5% de opacidad para que no tape el texto
        const wWidth = 120
        const wHeight = 75
        const wX = (pageWidth - wWidth) / 2
        const wY = (doc.internal.pageSize.getHeight() - wHeight) / 2
        doc.addImage(pdfLogo, 'PNG', wX, wY, wWidth, wHeight)
        doc.restoreGraphicsState()
      }
    }

    // Logo arriba a la izquierda
    if (pdfLogo) {
      doc.addImage(pdfLogo, 'PNG', 20, 10, 24, 15)
    }

    let y = 20

    // Header
    doc.setFontSize(24)
    doc.setTextColor(141, 119, 95) // #8d775f
    doc.text('CONTRAPUNTO', pageWidth / 2, y, { align: 'center' })
    y += 8
    doc.setFontSize(11)
    doc.setTextColor(100)
    doc.text('Cotización de Proyecto', pageWidth / 2, y, { align: 'center' })
    y += 17

    // Fecha
    doc.setFontSize(10)
    doc.setTextColor(120)
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-CL')}`, 20, y)
    y += 15

    // Línea separadora
    doc.setDrawColor(141, 119, 95)
    doc.line(20, y, pageWidth - 20, y)
    y += 15

    // Tipo de proyecto
    doc.setFontSize(16)
    doc.setTextColor(40)
    doc.text(`Proyecto: ${respuestas.tipoProyecto}`, 20, y)
    y += 15

    if (respuestas.tipoProyecto === 'Casa nueva' || respuestas.tipoProyecto === 'Ampliación') {
      doc.setFontSize(12)
      doc.setTextColor(60)
      doc.text(`Cantidad de pisos: ${respuestas.plantas}`, 20, y)
      y += 10
      doc.text(`Superficie total: ${metrosTotalesCasa}m²`, 20, y)
      y += 15

      // Espacios
      doc.setFontSize(14)
      doc.setTextColor(141, 119, 95)
      doc.text('Espacios seleccionados:', 20, y)
      y += 10

      doc.setFontSize(11)
      doc.setTextColor(60)
      Object.entries(respuestas.espaciosCasa).forEach(([espacio, cantidad]) => {
        doc.text(`• ${cantidad}x ${espacio} (${m2EspaciosCasa[espacio] * cantidad}m²)`, 25, y)
        y += 7
      })
      if (respuestas.metrosOtrosCasa > 0) {
        doc.text(`• ${respuestas.nombreOtrosCasa || 'Otros espacios'} (${respuestas.metrosOtrosCasa}m²)`, 25, y)
        y += 7
      }
      y += 10

      // Precios
      doc.setFontSize(14)
      doc.setTextColor(141, 119, 95)
      doc.text('Cotización por estándar:', 20, y)
      y += 10

      doc.setFontSize(12)
      doc.setTextColor(60)
      doc.text(`Estándar Base (desde $600.000/m²):`, 25, y)
      doc.setTextColor(40)
      doc.text(`desde $${valorCasaBase.toLocaleString('es-CL')}`, pageWidth - 60, y)
      y += 8
      doc.setTextColor(60)
      doc.text(`Estándar Alto (desde $850.000/m²):`, 25, y)
      doc.setTextColor(40)
      doc.text(`desde $${valorCasaAlto.toLocaleString('es-CL')}`, pageWidth - 60, y)
      y += 8
      doc.setTextColor(60)
      doc.text(`Estándar Superior (desde $1.200.000/m²):`, 25, y)
      doc.setTextColor(40)
      doc.text(`desde $${valorCasaSuperior.toLocaleString('es-CL')}`, pageWidth - 60, y)
      y += 15

    } else if (respuestas.tipoProyecto === 'Quincho / Terraza') {
      doc.setFontSize(12)
      doc.setTextColor(60)
      doc.text(`Tipo: ${respuestas.tipoQuincho}`, 20, y)
      y += 8
      doc.text(`Superficie: ${metrosQuincho}m²`, 20, y)
      y += 8
      doc.text(`Materialidad: ${respuestas.materialidadQuincho}`, 20, y)
      y += 15

      if (respuestas.extrasQuincho.length > 0) {
        doc.setFontSize(14)
        doc.setTextColor(141, 119, 95)
        doc.text('Extras incluidos:', 20, y)
        y += 10

        doc.setFontSize(11)
        doc.setTextColor(60)
        respuestas.extrasQuincho.forEach((extra) => {
          doc.text(`• ${extra}: $${extrasQuinchoValores[extra]?.toLocaleString('es-CL')}`, 25, y)
          y += 7
        })
        y += 10
      }

      // Desglose
      doc.setFontSize(14)
      doc.setTextColor(141, 119, 95)
      doc.text('Desglose:', 20, y)
      y += 10

      doc.setFontSize(12)
      doc.setTextColor(60)
      doc.text(`Estructura base:`, 25, y)
      doc.text(`$${subtotalQuincho.toLocaleString('es-CL')}`, pageWidth - 60, y)
      y += 8
      doc.text(`Extras:`, 25, y)
      doc.text(`$${totalExtrasQuincho.toLocaleString('es-CL')}`, pageWidth - 60, y)
      y += 10

      doc.setFontSize(14)
      doc.setTextColor(40)
      doc.text(`TOTAL:`, 25, y)
      doc.text(`$${totalQuincho.toLocaleString('es-CL')}`, pageWidth - 60, y)
      y += 8
      doc.setFontSize(10)
      doc.setTextColor(100)
      doc.text(`(${valorM2FinalQuincho.toLocaleString('es-CL')}/m²)`, pageWidth - 60, y)
      y += 15

    } else if (respuestas.tipoProyecto === 'Tiny House') {
      doc.setFontSize(12)
      doc.setTextColor(60)
      doc.text(`Uso: ${respuestas.usoTiny}`, 20, y)
      y += 8
      doc.text(`Rango seleccionado: ${respuestas.tamanoTiny}`, 20, y)
      y += 8
      doc.text(`Superficie exacta: ${metrosTiny}m²`, 20, y)
      y += 15

      // Precios de Estándares para Tiny House
      doc.setFontSize(14)
      doc.setTextColor(141, 119, 95)
      doc.text('Cotización por estándar:', 20, y)
      y += 10

      const valorTinyBase = metrosTiny * 600000
      const valorTinyAlto = metrosTiny * 850000
      const valorTinySuperior = metrosTiny * 1200000

      doc.setFontSize(12)
      doc.setTextColor(60)
      doc.text(`Estándar Base (desde $600.000/m²):`, 25, y)
      doc.setTextColor(40)
      doc.text(`desde $${valorTinyBase.toLocaleString('es-CL')}`, pageWidth - 60, y)
      y += 8
      doc.setTextColor(60)
      doc.text(`Estándar Alto (desde $850.000/m²):`, 25, y)
      doc.setTextColor(40)
      doc.text(`desde $${valorTinyAlto.toLocaleString('es-CL')}`, pageWidth - 60, y)
      y += 8
      doc.setTextColor(60)
      doc.text(`Estándar Superior (desde $1.200.000/m²):`, 25, y)
      doc.setTextColor(40)
      doc.text(`desde $${valorTinySuperior.toLocaleString('es-CL')}`, pageWidth - 60, y)
      y += 15
    }

    // Línea separadora
    doc.setDrawColor(200)
    doc.line(20, y, pageWidth - 20, y)
    y += 15

    // Nota
    doc.setFontSize(9)
    doc.setTextColor(120)
    const nota = 'Nota: Esta cotización es referencial y puede variar según las condiciones específicas del terreno, accesos y requerimientos particulares del proyecto. No incluye permisos municipales ni conexiones a servicios externos.'
    const notaLines = doc.splitTextToSize(nota, pageWidth - 40)
    doc.text(notaLines, 20, y)
    y += notaLines.length * 5 + 15

    // Footer
    doc.setFontSize(10)
    doc.setTextColor(141, 119, 95)
    doc.text('Contrapunto - Construcciones en Madera', pageWidth / 2, doc.internal.pageSize.getHeight() - 20, { align: 'center' })
    doc.setFontSize(9)
    doc.setTextColor(100)
    doc.text('contacto@contrapuntoconstructora.cl | +56 9 6697 4560', pageWidth / 2, doc.internal.pageSize.getHeight() - 14, { align: 'center' })

    // Descargar
    doc.save(`cotizacion-contrapunto-${respuestas.tipoProyecto.toLowerCase().replace(/\s/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`)
  }

  // CRITERIO 3: Incremento automático del contador al llegar a la pantalla final de Resultado / Presupuesto
  useEffect(() => {
    if (paso?.tipo === 'resultado' && !hasCountedRef.current) {
      hasCountedRef.current = true;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      fetch('/api/cotizar/count', { method: 'POST' }).catch(err => {
        console.error('Error al registrar contador de cotizar:', err);
      });
    }
  }, [pasoActual, paso?.tipo]);

  // Evitar renderizado nulo si el paso no existe
  if (!paso) return null

  return (
    <div className="min-h-screen bg-[#1b1b1b] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <div className="mb-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-white/5 pb-8">
          <div>
            <div className="mb-3 text-xs uppercase tracking-[0.35em] text-[#8d775f]">
              Contrapunto
            </div>
            <h1 className="text-5xl font-light">Cotizador de Proyectos</h1>
          </div>
          <Link href="/">
            <button className="inline-flex items-center gap-2 text-xs text-[#8d775f] hover:text-[#a58a6b] uppercase tracking-wider font-bold border border-[#8d775f]/30 hover:border-[#8d775f] bg-[#8d775f]/10 px-5 py-3.5 rounded-lg transition-all">
              Volver al Inicio
            </button>
          </Link>
        </div>

        {/* Progress indicator */}
        <div className="mb-8 flex gap-2">
          {pasos.map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                index <= pasoActual ? 'bg-[#8d775f]' : 'bg-white/10'
              }`}
            />
          ))}
        </div>

        <h2 className="mb-10 text-3xl font-light">{paso.titulo}</h2>

        {/* CARDS */}
        {paso.tipo === 'cards' && paso.opciones && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(paso.opciones as Array<{ valor: string; imagen: string }>).map(
              (opcion) => (
                <button
                  key={opcion.valor}
                  onClick={() =>
                    seleccionarOpcion(paso.campo!, opcion.valor)
                  }
                  className="group overflow-hidden rounded-[2rem] border border-white/10 bg-[#262626] text-left transition-all duration-300 hover:border-[#8d775f]"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={opcion.imagen}
                      alt={opcion.valor}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-all duration-700 group-hover:scale-105"
                      priority={pasoActual === 0}
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-2xl font-light">{opcion.valor}</div>
                  </div>
                </button>
              )
            )}
          </div>
        )}

        {/* INPUT */}
        {paso.tipo === 'input' && (
          <div className="max-w-2xl">
            <input
              type="number"
              value={respuestas[paso.campo as keyof typeof respuestas] as number}
              onChange={(e) =>
                setRespuestas((prev) => ({
                  ...prev,
                  [paso.campo!]: e.target.value,
                }))
              }
              placeholder={paso.placeholder}
              className="w-full rounded-[2rem] border border-white/10 bg-[#262626] px-8 py-8 text-4xl outline-none focus:border-[#8d775f]"
            />
          </div>
        )}

        {/* MULTISELECT */}
        {paso.tipo === 'multiselect' && paso.opciones && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {(paso.opciones as string[]).map((item) => {
              const arr = respuestas[paso.campo as keyof typeof respuestas]
              const activo = Array.isArray(arr) && arr.includes(item)

              return (
                <button
                  key={item}
                  onClick={() => toggleArrayItem(paso.campo!, item)}
                  className={`rounded-[2rem] border p-6 text-left transition-all duration-300 ${
                    activo
                      ? 'border-[#8d775f] bg-[#8d775f]'
                      : 'border-white/10 bg-[#262626] hover:border-[#8d775f]'
                  }`}
                >
                  <div className="text-xl font-light">{item}</div>
                  {m2EspaciosCasa[item] && (
                    <div className="mt-1 text-sm text-white/60">
                      {m2EspaciosCasa[item]}m²
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        )}

        {/* QUANTITY SELECT - Para espacios de casa */}
        {paso.tipo === 'quantity-select' && paso.opciones && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {(paso.opciones as string[]).map((item) => {
              const cantidad = respuestas.espaciosCasa[item] || 0
              const activo = cantidad > 0

              return (
                <div
                  key={item}
                  className={`rounded-[2rem] border p-6 transition-all duration-300 ${
                    activo
                      ? 'border-[#8d775f] bg-[#8d775f]/20'
                      : 'border-white/10 bg-[#262626]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xl font-light">{item}</div>
                      <div className="mt-1 text-sm text-white/60">
                        {m2EspaciosCasa[item]}m² c/u
                      </div>
                      {activo && (
                        <div className="mt-2 text-sm text-[#8d775f]">
                          Total: {m2EspaciosCasa[item] * cantidad}m²
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      {activo && (
                        <button
                          onClick={() => decrementarEspacio(item)}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all hover:border-[#8d775f] hover:bg-[#8d775f]/20"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                      )}
                      <span className={`min-w-[2rem] text-center text-2xl font-light ${activo ? 'text-[#8d775f]' : 'text-neutral-600'}`}>
                        {cantidad}
                      </span>
                      <button
                        onClick={() => incrementarEspacio(item)}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all hover:border-[#8d775f] hover:bg-[#8d775f]/20"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* OPCION OTROS ESPACIOS */}
            <div
              className={`rounded-[2rem] border p-6 transition-all duration-300 ${
                respuestas.metrosOtrosCasa > 0 || respuestas.nombreOtrosCasa
                  ? 'border-[#8d775f] bg-[#8d775f]/20'
                  : 'border-white/10 bg-[#262626]'
              }`}
            >
              <div className="flex flex-col gap-3">
                <div>
                  <div className="text-xl font-light">Espacio Personalizado</div>
                  <div className="mt-1 text-sm text-white/60">
                    Ingresa el nombre y los m²
                  </div>
                </div>
                <div className="flex flex-col gap-3 mt-2">
                  <input
                    type="text"
                    placeholder="Ej: Gimnasio, Sala de cine..."
                    value={respuestas.nombreOtrosCasa || ''}
                    onChange={(e) =>
                      setRespuestas((prev) => ({
                        ...prev,
                        nombreOtrosCasa: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-white/20 bg-black/30 px-4 py-2 text-sm font-light outline-none transition-all focus:border-[#8d775f] text-white"
                  />
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min="0"
                      placeholder="0"
                      value={respuestas.metrosOtrosCasa || ''}
                      onChange={(e) =>
                        setRespuestas((prev) => ({
                          ...prev,
                          metrosOtrosCasa: Math.max(0, parseInt(e.target.value) || 0),
                        }))
                      }
                      className="w-24 rounded-lg border border-white/20 bg-black/30 px-4 py-2 text-xl font-light outline-none transition-all focus:border-[#8d775f] text-white"
                    />
                    <span className="text-neutral-500 font-light text-xl">m²</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* RESULTADOS */}
        {paso.tipo === 'resultado' && (
          <div className="space-y-8">
            {/* CASA */}
            {(respuestas.tipoProyecto === 'Casa nueva' || respuestas.tipoProyecto === 'Ampliación') && (
              <>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-[2rem] bg-[#262626] p-8">
                    <div className="mb-3 text-neutral-400">Superficie</div>
                    <div className="text-5xl font-light">
                      {metrosTotalesCasa}m²
                    </div>
                  </div>
                  <div className="rounded-[2rem] bg-[#262626] p-8">
                    <div className="mb-3 text-neutral-400">Estándar Base</div>
                    <div className="text-3xl font-light">
                      desde ${valorCasaBase.toLocaleString('es-CL')}
                    </div>
                    <div className="mt-2 text-sm text-neutral-500">
                      desde $600.000/m²
                    </div>
                  </div>
                  <div className="rounded-[2rem] bg-[#8d775f] p-8">
                    <div className="mb-3 text-neutral-200">Estándar Alto</div>
                    <div className="text-3xl font-light">
                      desde ${valorCasaAlto.toLocaleString('es-CL')}
                    </div>
                    <div className="mt-2 text-sm text-white/70">
                      desde $850.000/m²
                    </div>
                  </div>
                  <div className="rounded-[2rem] bg-[#262626] p-8">
                    <div className="mb-3 text-neutral-400">Estándar Superior</div>
                    <div className="text-3xl font-light">
                      desde ${valorCasaSuperior.toLocaleString('es-CL')}
                    </div>
                    <div className="mt-2 text-sm text-neutral-500">
                      desde $1.200.000/m²
                    </div>
                  </div>
                </div>

                {/* Espacios seleccionados */}
                <div className="rounded-[2rem] border border-white/10 bg-[#262626] p-10">
                  <div className="mb-6 text-sm uppercase tracking-[0.25em] text-[#8d775f]">
                    Espacios seleccionados
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {Object.entries(respuestas.espaciosCasa).map(([espacio, cantidad]) => (
                      <div
                        key={espacio}
                        className="rounded-full bg-white/10 px-4 py-2 text-sm"
                      >
                        {cantidad}x {espacio} ({m2EspaciosCasa[espacio] * cantidad}m²)
                      </div>
                    ))}
                    {respuestas.metrosOtrosCasa > 0 && (
                      <div className="rounded-full bg-[#8d775f]/20 border border-[#8d775f]/30 px-4 py-2 text-sm text-[#8d775f]">
                        {respuestas.nombreOtrosCasa || 'Otros espacios'} ({respuestas.metrosOtrosCasa}m²)
                      </div>
                    )}
                  </div>
                </div>

                {/* Detalle de estándares Casa Nueva */}
                <div className="rounded-[2rem] border border-white/10 bg-[#262626] p-10">
                  <div className="mb-8 text-sm uppercase tracking-[0.25em] text-[#8d775f]">
                    ¿Qué incluye cada estándar?
                  </div>
                  <div className="grid gap-6 md:grid-cols-3">
                    {/* Estándar Base */}
                    <div className="rounded-2xl border border-white/10 p-6">
                      <h4 className="mb-4 text-xl font-light">Estándar Base</h4>
                      <p className="mb-4 text-sm text-neutral-400">$600.000/m²</p>
                      <ul className="space-y-2 text-sm text-neutral-300">
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                          Estructura en madera pino impregnado o metalcon
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                          Revestimiento exterior en siding, zinc acanalado prepintado
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                          Ventanas de termopanel aluminio estándar
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                          Pisos de cerámico o piso vinilico estándar
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                          Griferías y artefactos sanitarios línea económica
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                          Instalación eléctrica y sanitaria certificadas
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                          Cocina con muebles melamina estándar de 15mm con cubierta postformada
                        </li>
                      </ul>
                    </div>

                    {/* Estándar Alto */}
                    <div className="rounded-2xl border-2 border-[#8d775f] bg-[#8d775f]/10 p-6">
                      <h4 className="mb-4 text-xl font-light">Estándar Alto</h4>
                      <p className="mb-4 text-sm text-[#8d775f]">$850.000/m² - Recomendado</p>
                      <ul className="space-y-2 text-sm text-neutral-300">
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                          Estructura en panel sip, albañileria confinada, o madera/estructura metalica segun especificación
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                          Revestimiento exterior en madera natural, metal siding, estuco, revestimiento a elección
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                          Ventanas de termopanel perfileria PVC
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                          Pisos de porcelanato, madera o piso vinilico premium
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                          Griferías y artefactos sanitarios línea media
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                          Instalación eléctrica y Sanitaria certificadas + Proyecto de domotica y audio
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                          Cocina con muebles melamina premium y cubierta de cuarzo
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                          Aislación térmica reforzada
                        </li>
                      </ul>
                    </div>

                    {/* Estándar Superior */}
                    <div className="rounded-2xl border border-white/10 p-6">
                      <h4 className="mb-4 text-xl font-light">Estándar Superior</h4>
                      <p className="mb-4 text-sm text-neutral-400">$1.200.000/m²</p>
                      <ul className="space-y-2 text-sm text-neutral-300">
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                          Estructura en acero, albañileria u hormigon armado segun especificacion técnica
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                          Revestimiento en madera noble, composite premium, hormigon a la vista, revestimiento a elección
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                          Ventanas de aluminio termopanel con rotura de puente térmico
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                          Pisos de madera nativa o porcelanato gran formato, a elección 
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                          Griferías y artefactos de diseño linea premium
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                          Sistema de eléctrico y chapas con domótica. Camaras de seguridad
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                          Cocina con muebles a medida y cubierta cuarzo/Silestone/granito o a elección
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                          Climatización (calefacción central o losa radiante)
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                          Paisajismo básico incluido
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Disclaimer elegante */}
                  <div className="mt-8 border-t border-white/5 pt-6 text-center">
                    <p className="text-sm italic text-neutral-400 font-light">
                      Los valores presentados son estimativos. El presupuesto real y definitivo está sujeto al estudio del proyecto y las especificaciones técnicas correspondientes.
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* QUINCHO */}
            {respuestas.tipoProyecto === 'Quincho / Terraza' && (
              <>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="rounded-[2rem] bg-[#262626] p-8">
                    <div className="mb-3 text-neutral-400">Superficie</div>
                    <div className="text-6xl font-light">{metrosQuincho}m²</div>
                  </div>
                  <div className="rounded-[2rem] bg-[#8d775f] p-8">
                    <div className="mb-3 text-neutral-200">Valor estimado</div>
                    <div className="text-4xl font-light">
                      ${Math.round(totalQuincho).toLocaleString('es-CL')}
                    </div>
                  </div>
                  <div className="rounded-[2rem] bg-[#262626] p-8">
                    <div className="mb-3 text-neutral-400">
                      Valor promedio m²
                    </div>
                    <div className="text-4xl font-light">
                      ${valorM2FinalQuincho.toLocaleString('es-CL')}
                    </div>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-[#262626] p-10">
                  <div className="mb-8 text-sm uppercase tracking-[0.25em] text-[#8d775f]">
                    Desglose referencial
                  </div>
                  <div className="space-y-5">
                    <div className="flex justify-between border-b border-white/10 pb-5">
                      <div>
                        <div className="text-2xl font-light">
                          {respuestas.tipoQuincho}
                        </div>
                        <div className="mt-2 text-sm text-neutral-500">
                          Base constructiva · {respuestas.materialidadQuincho}
                        </div>
                        <div className="mt-1 text-sm text-neutral-600">
                          ${valorBaseM2.toLocaleString('es-CL')}/m²
                        </div>
                      </div>
                      <div className="text-2xl font-light">
                        ${Math.round(subtotalQuincho).toLocaleString('es-CL')}
                      </div>
                    </div>

                    {respuestas.extrasQuincho?.map((extra) => (
                      <div
                        key={extra}
                        className="flex justify-between border-b border-white/10 pb-4"
                      >
                        <div>
                          <div className="text-lg">{extra}</div>
                          <div className="mt-1 text-sm text-neutral-500">
                            Elemento adicional
                          </div>
                        </div>
                        <div className="text-lg">
                          ${extrasQuinchoValores[extra]?.toLocaleString('es-CL')}
                        </div>
                      </div>
                    ))}

                    <div className="flex items-end justify-between pt-8">
                      <div>
                        <div className="text-3xl font-light">Total estimado</div>
                        <div className="mt-2 text-sm text-neutral-500">
                          Valor referencial de mercado
                        </div>
                      </div>
                      <div className="text-5xl font-light text-[#8d775f]">
                        ${Math.round(totalQuincho).toLocaleString('es-CL')}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* TINY */}
            {respuestas.tipoProyecto === 'Tiny House' && (
              <>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-[2rem] bg-[#262626] p-8">
                    <div className="mb-3 text-neutral-400">Superficie</div>
                    <div className="text-5xl font-light">{metrosTiny}m²</div>
                  </div>
                  <div className="rounded-[2rem] bg-[#262626] p-8">
                    <div className="mb-3 text-neutral-400">Estándar Base</div>
                    <div className="text-3xl font-light">
                      desde ${(metrosTiny * 600000).toLocaleString('es-CL')}
                    </div>
                    <div className="mt-2 text-sm text-neutral-500">
                      desde $600.000/m²
                    </div>
                  </div>
                  <div className="rounded-[2rem] bg-[#8d775f] p-8">
                    <div className="mb-3 text-neutral-200">Estándar Alto</div>
                    <div className="text-3xl font-light">
                      desde ${(metrosTiny * 850000).toLocaleString('es-CL')}
                    </div>
                    <div className="mt-2 text-sm text-white/70">
                      desde $850.000/m²
                    </div>
                  </div>
                  <div className="rounded-[2rem] bg-[#262626] p-8">
                    <div className="mb-3 text-neutral-400">Estándar Superior</div>
                    <div className="text-3xl font-light">
                      desde ${(metrosTiny * 1200000).toLocaleString('es-CL')}
                    </div>
                    <div className="mt-2 text-sm text-neutral-500">
                      desde $1.200.000/m²
                    </div>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-[#262626] p-10">
                  <div className="mb-6 text-sm uppercase tracking-[0.25em] text-[#8d775f]">
                    Resumen del proyecto
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-white/10 pb-3">
                      <span className="text-neutral-400">Uso</span>
                      <span>{respuestas.usoTiny}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-3">
                      <span className="text-neutral-400">Rango de tamaño</span>
                      <span>{respuestas.tamanoTiny}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-3">
                      <span className="text-neutral-400">Superficie exacta</span>
                      <span>{metrosTiny}m²</span>
                    </div>
                  </div>
                </div>

                {/* Detalle de lo que incluye Tiny House */}
                <div className="rounded-[2rem] border border-white/10 bg-[#262626] p-10">
                  <div className="mb-8 text-sm uppercase tracking-[0.25em] text-[#8d775f]">
                    ¿Qué incluye tu Tiny House?
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Estructura y Exterior */}
                    <div className="rounded-2xl border border-white/10 p-6">
                      <h4 className="mb-4 flex items-center gap-2 text-lg font-light">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#8d775f]/20 text-sm text-[#8d775f]">1</span>
                        Estructura y Exterior
                      </h4>
                      <ul className="space-y-2 text-sm text-neutral-300">
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                          Estructura en madera certificada, metalcom o panel SIP
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                          Revestimiento exterior en madera, fibrocemento o zinc acanalado prepintado
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                          Techumbre con aislación segun especificación técnica y terminación zinc-alum
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                          Ventanas de termopanel pvc 
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                          Puerta de acceso con cerradura de seguridad digital
                        </li>
                      </ul>
                    </div>

                    {/* Interior */}
                    <div className="rounded-2xl border border-white/10 p-6">
                      <h4 className="mb-4 flex items-center gap-2 text-lg font-light">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#8d775f]/20 text-sm text-[#8d775f]">2</span>
                        Interior
                      </h4>
                      <ul className="space-y-2 text-sm text-neutral-300">
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                          Revestimiento interior en madera o yeso cartón
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                          Pisos de madera ingenierizada o vinílico premium
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                          Aislación térmica en muros, piso y cielo segun especificación
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                          Cielo con terminación en madera o volcanita
                        </li>
                      </ul>
                    </div>

                    {/* Cocina */}
                    <div className="rounded-2xl border border-white/10 p-6">
                      <h4 className="mb-4 flex items-center gap-2 text-lg font-light">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#8d775f]/20 text-sm text-[#8d775f]">3</span>
                        Cocina
                      </h4>
                      <ul className="space-y-2 text-sm text-neutral-300">
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                          Muebles de cocina en melamina, mdf, terciado o roble de demolicion
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                          Cubierta de granito, cuarzo o madera
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                          Lavaplatos de acero inoxidable
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                          Grifería monomando
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                          Conexión para encimera y horno
                        </li>
                      </ul>
                    </div>

                    {/* Baño */}
                    <div className="rounded-2xl border border-white/10 p-6">
                      <h4 className="mb-4 flex items-center gap-2 text-lg font-light">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#8d775f]/20 text-sm text-[#8d775f]">4</span>
                        Baño
                      </h4>
                      <ul className="space-y-2 text-sm text-neutral-300">
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                          WC y lavamanos con mueble
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                          Shower door
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                          Revestimiento cerámico o de pvc en muros.
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                          Grifería completa
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                          Extractor de aire
                        </li>
                      </ul>
                    </div>

                    {/* Instalaciones */}
                    <div className="rounded-2xl border border-white/10 p-6 md:col-span-2">
                      <h4 className="mb-4 flex items-center gap-2 text-lg font-light">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#8d775f]/20 text-sm text-[#8d775f]">5</span>
                        Instalaciones
                      </h4>
                      <div className="grid gap-4 md:grid-cols-2">
                        <ul className="space-y-2 text-sm text-neutral-300">
                          <li className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                            Instalación eléctrica completa certificada SEC
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                            Sistema de audio hi-fi
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                            Puntos de luz LED en todos los espacios
                          </li>
                        </ul>
                        <ul className="space-y-2 text-sm text-neutral-300">
                          <li className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                            Red de agua fría y caliente (dispositivo para calentar agua a elección)
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                            Red de alcantarillado conectada
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8d775f]" />
                            Conexión para calefacción (estufa a leña o aire acondicionado)
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-xl bg-[#8d775f]/10 p-4 text-sm text-neutral-300">
                    <span className="font-medium text-[#8d775f]">Nota:</span> El valor incluye mano de obra y materiales. No incluye transporte de despacho. Incluye entramado de piso, conexion servicios de electricidad, agua y alcantarillado. No considera permisos municipales.
                  </div>
                </div>
              </>
            )}

            {/* SECCION DE CONTACTO - Común para todos los proyectos */}
            <div className="mt-12 rounded-[2rem] border border-white/10 bg-[#262626] p-10">
              <div className="mb-8 text-sm uppercase tracking-[0.25em] text-[#8d775f]">
                ¿Te interesa este proyecto?
              </div>
              <p className="mb-8 text-lg text-neutral-300">
                Contáctanos para recibir una cotización personalizada y resolver todas tus dudas.
              </p>

              {/* Botón Descargar PDF */}
              <button
                onClick={generarPDF}
                className="mb-4 flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-[#8d775f] bg-transparent py-5 text-lg font-medium text-[#8d775f] transition-all duration-300 hover:bg-[#8d775f] hover:text-white"
              >
                <Download className="h-6 w-6" />
                Descargar cotización en PDF
              </button>

              {/* Botón WhatsApp */}
              <a
                href={`https://wa.me/56966974560?text=${encodeURIComponent(
                  `Hola Contrapunto! Me interesa cotizar un proyecto de ${respuestas.tipoProyecto}.\n\n` +
                  (respuestas.tipoProyecto === 'Casa nueva' || respuestas.tipoProyecto === 'Ampliación'
                    ? `Superficie: ${metrosTotalesCasa}m²\nEspacios: ${Object.entries(respuestas.espaciosCasa).map(([e, c]) => `${c}x ${e}`).join(', ')}`
                    : respuestas.tipoProyecto === 'Quincho / Terraza'
                    ? `Tipo: ${respuestas.tipoQuincho}\nSuperficie: ${metrosQuincho}m²\nMaterialidad: ${respuestas.materialidadQuincho}\nExtras: ${respuestas.extrasQuincho.join(', ')}`
                    : `Uso: ${respuestas.usoTiny}\nSuperficie: ${metrosTiny}m²`)
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-10 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#25D366] py-5 text-lg font-medium text-white transition-all duration-300 hover:bg-[#20bd5a]"
              >
                <MessageCircle className="h-6 w-6" />
                Escribir por WhatsApp
              </a>

              <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-[#262626] px-4 text-sm text-neutral-500">o déjanos tus datos</span>
                </div>
              </div>

              {/* Formulario de contacto */}
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    value={respuestas.nombreContacto}
                    onChange={(e) => setRespuestas(prev => ({ ...prev, nombreContacto: e.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-[#1b1b1b] px-5 py-4 outline-none transition-all focus:border-[#8d775f]"
                  />
                  <input
                    type="tel"
                    placeholder="Tu teléfono"
                    value={respuestas.telefonoContacto}
                    onChange={(e) => setRespuestas(prev => ({ ...prev, telefonoContacto: e.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-[#1b1b1b] px-5 py-4 outline-none transition-all focus:border-[#8d775f]"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Tu email"
                  value={respuestas.emailContacto}
                  onChange={(e) => setRespuestas(prev => ({ ...prev, emailContacto: e.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-[#1b1b1b] px-5 py-4 outline-none transition-all focus:border-[#8d775f]"
                />
                <textarea
                  placeholder="Cuéntanos más sobre tu proyecto (opcional)"
                  value={respuestas.mensajeContacto}
                  onChange={(e) => setRespuestas(prev => ({ ...prev, mensajeContacto: e.target.value }))}
                  rows={4}
                  className="w-full resize-none rounded-xl border border-white/10 bg-[#1b1b1b] px-5 py-4 outline-none transition-all focus:border-[#8d775f]"
                />
                {enviado ? (
                  <div className="rounded-xl bg-[#25D366]/20 border border-[#25D366] p-5 text-center text-[#25D366] text-lg font-medium">
                    ¡Gracias! Tus datos y cotización fueron enviados exitosamente. Nos contactaremos a la brevedad.
                  </div>
                ) : (
                  <button
                    onClick={enviarDatosContacto}
                    disabled={enviando}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#8d775f] py-4 text-lg font-medium transition-all duration-300 hover:bg-[#a58a6b] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-5 w-5" />
                    {enviando ? 'Enviando cotización...' : 'Enviar datos de contacto'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* FOOTER */}
        <div className="mt-20 flex items-center justify-between">
          <button
            onClick={pasoAnterior}
            className={`flex items-center gap-2 text-sm uppercase tracking-[0.2em] ${
              pasoActual === 0
                ? 'cursor-not-allowed text-neutral-700'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
            Atrás
          </button>

          {paso.tipo !== 'cards' && paso.tipo !== 'resultado' && (
            <button
              onClick={siguientePaso}
              className="rounded-2xl bg-[#8d775f] px-8 py-4 transition-all duration-300 hover:bg-[#a58a6b]"
            >
              Continuar
            </button>
          )}

          {paso.tipo === 'resultado' && (
            <button
              onClick={() => {
                hasCountedRef.current = false;
                setPasoActual(0)
                setRespuestas({
                  tipoProyecto: '',
                  plantas: '',
                  espaciosCasa: {},
                  metrosOtrosCasa: 0,
                  nombreOtrosCasa: '',
                  tipoQuincho: '',
                  materialidadQuincho: '',
                  extrasQuincho: [],
                  metrosQuincho: 25,
                  usoTiny: '',
                  tamanoTiny: '',
                  metrosTiny: 30,
                  nombreContacto: '',
                  telefonoContacto: '',
                  emailContacto: '',
                  mensajeContacto: '',
                })
              }}
              className="rounded-2xl border border-white/10 px-8 py-4 transition-all duration-300 hover:border-[#8d775f]"
            >
              Nueva cotización
            </button>
          )}
        </div>
        
        {/* Elemento invisible de precarga proactiva de todas las imágenes del flujo */}
        <div className="sr-only hidden" aria-hidden="true">
          {todasLasImagenesDelFlujo.map((url) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={url} src={url} alt="preload" />
          ))}
        </div>
      </div>
    </div>
  )
}
