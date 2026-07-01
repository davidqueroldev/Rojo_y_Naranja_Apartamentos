import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'

export interface ApartamentoInfo {
  id: string
  slug: string
  capacidad_max: number
  acepta_ninos: boolean
  precio_noche_base: number
}

export async function resolverApartamento(
  supabase: SupabaseClient<Database>,
  slug: string
): Promise<ApartamentoInfo | null> {
  const { data } = await supabase
    .from('apartamentos')
    .select('id, slug, capacidad_max, acepta_ninos, precio_noche_base')
    .eq('slug', slug)
    .eq('activo', true)
    .single()

  if (!data) return null
  return { ...data, acepta_ninos: data.acepta_ninos ?? true }
}

const ESTADOS: Record<string, { label: string; tone: 'neutral' | 'success' | 'warning' | 'danger' }> = {
  pendiente_pago: { label: 'Pendiente de pago', tone: 'warning' },
  pendiente_confirmacion: { label: 'Pendiente de confirmación', tone: 'warning' },
  confirmada: { label: 'Confirmada', tone: 'success' },
  completada: { label: 'Completada', tone: 'neutral' },
  anulada: { label: 'Anulada', tone: 'danger' },
}

export function estadoReserva(estado: string) {
  return ESTADOS[estado] ?? { label: estado, tone: 'neutral' as const }
}

/** Fechas 'YYYY-MM-DD' en [inicio, fin) — fin es exclusivo (noche de checkout no cuenta como ocupada) */
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
