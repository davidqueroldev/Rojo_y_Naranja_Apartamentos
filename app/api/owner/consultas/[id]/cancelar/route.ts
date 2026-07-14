import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireOwner } from '@/lib/utils/owner'

// POST /api/owner/consultas/[id]/cancelar — marca la consulta como cancelada
export async function POST(_request: Request, { params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { user, isOwner } = await requireOwner(supabase)
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  if (!isOwner) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const { data: consulta, error: errorConsulta } = await supabase
    .from('consultas')
    .select('id, estado')
    .eq('id', params.id)
    .single()

  if (errorConsulta || !consulta) {
    return NextResponse.json({ error: 'Consulta no encontrada' }, { status: 404 })
  }
  if (consulta.estado === 'cancelada' || consulta.estado === 'aceptada') {
    return NextResponse.json({ error: `No se puede cancelar una consulta ${consulta.estado}` }, { status: 409 })
  }

  const { error } = await supabase
    .from('consultas')
    .update({ estado: 'cancelada', gestionada_en: new Date().toISOString() })
    .eq('id', consulta.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
