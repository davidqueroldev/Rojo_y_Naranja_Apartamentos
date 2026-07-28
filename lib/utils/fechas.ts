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

/** Fechas 'YYYY-MM-DD' en [inicio, fin) — fin es exclusivo (la noche de salida no cuenta como ocupada). */
export function fechasEnRango(inicio: string, fin: string): string[] {
  const fechas: string[] = []
  let actual = new Date(`${inicio}T00:00:00Z`)
  const limite = new Date(`${fin}T00:00:00Z`)
  while (actual < limite) {
    fechas.push(actual.toISOString().slice(0, 10))
    actual = new Date(actual.getTime() + 24 * 60 * 60 * 1000)
  }
  return fechas
}
