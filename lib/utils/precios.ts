import { contarNoches } from './fechas'

export function calcularPrecioTotal(
  precioBase: number,
  fechaEntrada: Date,
  fechaSalida: Date
): number {
  const noches = contarNoches(fechaEntrada, fechaSalida)
  return precioBase * noches
}

export function formatearPrecio(centimos: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(centimos / 100)
}
