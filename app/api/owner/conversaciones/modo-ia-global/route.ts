import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireOwner } from '@/lib/utils/owner'

// PATCH /api/owner/conversaciones/modo-ia-global — Body: { modo_ia: boolean }
export async function PATCH(request: Request) {
  const supabase = await createClient()
  const { user, isOwner } = await requireOwner(supabase)
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  if (!isOwner) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const body = await request.json().catch(() => null)
  if (typeof body?.modo_ia !== 'boolean') {
    return NextResponse.json({ error: 'modo_ia debe ser booleano' }, { status: 400 })
  }

  const { error } = await supabase.from('conversaciones').update({ modo_ia: body.modo_ia }).not('id', 'is', null)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
