import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireOwner } from '@/lib/utils/owner'

// POST /api/owner/precios — Body: { apartamento_id, nombre, fecha_inicio, fecha_fin, precio_noche, notas? }
export async function POST(request: Request) {
  const supabase = await createClient()
  const { user, isOwner } = await requireOwner(supabase)
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  if (!isOwner) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const body = await request.json().catch(() => null)
  const { apartamento_id, nombre, fecha_inicio, fecha_fin, precio_noche, notas } = body ?? {}

  if (!apartamento_id || !nombre || !fecha_inicio || !fecha_fin || !precio_noche) {
    return NextResponse.json(
      { error: 'Campos requeridos: apartamento_id, nombre, fecha_inicio, fecha_fin, precio_noche' },
      { status: 400 }
    )
  }
  if (fecha_fin < fecha_inicio) {
    return NextResponse.json({ error: 'fecha_fin debe ser posterior o igual a fecha_inicio' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('precios_especiales')
    .insert({ apartamento_id, nombre, fecha_inicio, fecha_fin, precio_noche, notas: notas || null })
    .select('id')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ id: data.id }, { status: 201 })
}
