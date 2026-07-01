import { contarNoches } from './fechas'
import { fechasEnRango } from './reservas'

export function calcularPrecioTotal(
  precioBase: number,
  fechaEntrada: Date,
  fechaSalida: Date
): number {
  const noches = contarNoches(fechaEntrada, fechaSalida)
  return precioBase * noches
}

export function formatearPrecio(euros: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(euros)
}

export interface PrecioEspecial {
  fecha_inicio: string
  fecha_fin: string
  precio_noche: number
  nombre: string
}

export interface SegmentoPrecio {
  noches: number
  precioNoche: number
  nombre: string | null
}

/** Agrupa las noches de una reserva en tramos consecutivos de igual precio, aplicando precios_especiales cuando corresponda */
export function calcularDesglose(
  fechaCheckin: string,
  fechaCheckout: string,
  precioBase: number,
  especiales: PrecioEspecial[]
): SegmentoPrecio[] {
  const precios = fechasEnRango(fechaCheckin, fechaCheckout).map((fecha) => {
    const especial = especiales.find((e) => fecha >= e.fecha_inicio && fecha <= e.fecha_fin)
    return { precio: especial?.precio_noche ?? precioBase, nombre: especial?.nombre ?? null }
  })

  const segmentos: SegmentoPrecio[] = []
  for (const { precio, nombre } of precios) {
    const ultimo = segmentos[segmentos.length - 1]
    if (ultimo && ultimo.precioNoche === precio && ultimo.nombre === nombre) {
      ultimo.noches += 1
    } else {
      segmentos.push({ noches: 1, precioNoche: precio, nombre })
    }
  }
  return segmentos
}
