import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ChatWindow } from '@/components/chat/ChatWindow'

interface Props {
  params: { id: string }
}

export default async function OwnerChatDetailPage({ params }: Props) {
  const supabase = await createClient()
  const { data: conversacion } = await supabase
    .from('conversaciones')
    .select('id, modo_ia, profiles(nombre)')
    .eq('id', params.id)
    .single()

  if (!conversacion) notFound()

  await supabase
    .from('mensajes')
    .update({ leido: true })
    .eq('conversacion_id', params.id)
    .eq('remitente', 'user')
    .eq('leido', false)

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">{conversacion.profiles?.nombre ?? 'Usuario'}</h1>
        <ChatWindow conversacionId={conversacion.id} isOwner modoIaInicial={conversacion.modo_ia ?? false} />
      </div>
    </main>
  )
}
