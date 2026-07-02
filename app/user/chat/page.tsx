import { createClient } from '@/lib/supabase/server'
import { ChatWindow } from '@/components/chat/ChatWindow'

interface Props {
  searchParams: { reserva?: string }
}

export default async function UserChatPage({ searchParams }: Props) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null // middleware ya protege esta ruta

  const reservaId = searchParams.reserva ?? null

  let query = supabase.from('conversaciones').select('id, modo_ia').eq('user_id', user.id)
  query = reservaId ? query.eq('reserva_id', reservaId) : query.is('reserva_id', null)
  const { data: existente } = await query.maybeSingle()

  let conversacionId = existente?.id
  let modoIa = existente?.modo_ia ?? false

  if (!conversacionId) {
    const { data: nueva, error } = await supabase
      .from('conversaciones')
      .insert({ user_id: user.id, reserva_id: reservaId })
      .select('id, modo_ia')
      .single()
    if (error || !nueva) {
      return (
        <main className="min-h-screen p-8">
          <p className="text-sm text-red-600">No se pudo abrir el chat. Inténtalo de nuevo.</p>
        </main>
      )
    }
    conversacionId = nueva.id
    modoIa = nueva.modo_ia ?? false
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Chat con el propietario</h1>
        <ChatWindow conversacionId={conversacionId} isOwner={false} modoIaInicial={modoIa} />
      </div>
    </main>
  )
}
