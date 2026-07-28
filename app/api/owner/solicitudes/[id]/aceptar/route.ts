import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireOwner } from '@/lib/utils/owner'

// POST /api/owner/solicitudes/[id]/aceptar — pendiente_gestion -> aceptada
export async function POST(_request: Request, { params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { user, isOwner } = await requireOwner(supabase)
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  if (!isOwner) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const { data, error } = await supabase
    .from('solicitudes')
    .update({ estado: 'aceptada', gestionada_en: new Date().toISOString() })
    .eq('id', params.id)
    .eq('estado', 'pendiente_gestion')
    .select('id, nombre, email')
    .maybeSingle()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!data) return NextResponse.json({ error: 'La solicitud no está pendiente de gestión' }, { status: 409 })

  return NextResponse.json({ ok: true })
}
