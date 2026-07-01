import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET /api/reservas/[id] — solo accesible por el propietario de la reserva o el owner (vía RLS)
export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('reservas')
    .select('*, apartamentos(slug, nombre, fotos)')
    .eq('id', params.id)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Reserva no encontrada' }, { status: 404 })
  }

  return NextResponse.json({ reserva: data })
}
