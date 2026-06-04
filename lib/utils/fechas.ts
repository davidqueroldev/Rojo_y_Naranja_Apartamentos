import { differenceInDays, eachDayOfInterval, format } from 'date-fns'

export function contarNoches(entrada: Date, salida: Date): number {
  return differenceInDays(salida, entrada)
}

export function rangoFechas(entrada: Date, salida: Date): Date[] {
  return eachDayOfInterval({ start: entrada, end: salida })
}

export function formatearFecha(fecha: Date): string {
  return format(fecha, 'dd/MM/yyyy')
}

export function fechasSeSuperponen(
  inicio1: Date, fin1: Date,
  inicio2: Date, fin2: Date
): boolean {
  return inicio1 < fin2 && fin1 > inicio2
}
