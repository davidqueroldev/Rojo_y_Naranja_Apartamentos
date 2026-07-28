import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireOwner } from '@/lib/utils/owner'

// POST /api/owner/solicitudes/[id]/rechazar — marca la solicitud como rechazada
export async function POST(_request: Request, { params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { user, isOwner } = await requireOwner(supabase)
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  if (!isOwner) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const { data: solicitud, error: errorSolicitud } = await supabase
    .from('solicitudes')
    .select('id, estado')
    .eq('id', params.id)
    .single()

  if (errorSolicitud || !solicitud) {
    return NextResponse.json({ error: 'Solicitud no encontrada' }, { status: 404 })
  }
  if (solicitud.estado === 'rechazada' || solicitud.estado === 'aceptada') {
    return NextResponse.json({ error: `No se puede rechazar una solicitud ${solicitud.estado}` }, { status: 409 })
  }

  const { error } = await supabase
    .from('solicitudes')
    .update({ estado: 'rechazada', gestionada_en: new Date().toISOString() })
    .eq('id', solicitud.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
