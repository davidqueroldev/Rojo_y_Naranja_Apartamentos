import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireOwner } from '@/lib/utils/owner'

// PATCH /api/owner/apartamentos/[id] — Body: { precio_noche_base }
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { user, isOwner } = await requireOwner(supabase)
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  if (!isOwner) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const body = await request.json().catch(() => null)
  const precio_noche_base = body?.precio_noche_base

  if (typeof precio_noche_base !== 'number' || precio_noche_base <= 0) {
    return NextResponse.json({ error: 'precio_noche_base debe ser un número positivo' }, { status: 400 })
  }

  const { error } = await supabase.from('apartamentos').update({ precio_noche_base }).eq('id', params.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
