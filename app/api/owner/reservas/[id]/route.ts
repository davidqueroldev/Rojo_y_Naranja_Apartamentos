import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireOwner } from '@/lib/utils/owner'
import type { TablesUpdate } from '@/types/supabase'

// PATCH /api/owner/reservas/[id] — Body: { fecha_checkin?, fecha_checkout?, num_huespedes?, notas_propietario? }
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { user, isOwner } = await requireOwner(supabase)
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  if (!isOwner) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const body = await request.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Body inválido' }, { status: 400 })

  const { fecha_checkin, fecha_checkout, num_huespedes, notas_propietario } = body as {
    fecha_checkin?: string
    fecha_checkout?: string
    num_huespedes?: number
    notas_propietario?: string
  }

  if (fecha_checkin && fecha_checkout && fecha_checkout <= fecha_checkin) {
    return NextResponse.json({ error: 'La fecha de checkout debe ser posterior a la de checkin' }, { status: 400 })
  }

  const cambios: TablesUpdate<'reservas'> = {}
  if (fecha_checkin) cambios.fecha_checkin = fecha_checkin
  if (fecha_checkout) cambios.fecha_checkout = fecha_checkout
  if (num_huespedes) cambios.num_huespedes = num_huespedes
  if (notas_propietario !== undefined) cambios.notas_propietario = notas_propietario

  if (Object.keys(cambios).length === 0) {
    return NextResponse.json({ error: 'No hay cambios que aplicar' }, { status: 400 })
  }

  const { error } = await supabase.from('reservas').update(cambios).eq('id', params.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
