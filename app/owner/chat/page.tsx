import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/Badge'
import { ModoIAGlobalToggle } from '@/components/owner/ModoIAGlobalToggle'

export default async function OwnerChatListPage() {
  const supabase = await createClient()

  const { data: conversaciones } = await supabase
    .from('conversaciones')
    .select('id, modo_ia, updated_at, profiles(nombre), mensajes(id, contenido, remitente, leido, created_at)')
    .order('updated_at', { ascending: false })

  const lista = (conversaciones ?? []).map((c) => {
    const ordenados = [...(c.mensajes ?? [])].sort((a, b) => (a.created_at ?? '').localeCompare(b.created_at ?? ''))
    const ultimo = ordenados[ordenados.length - 1]
    const noLeidos = ordenados.filter((m) => !m.leido && m.remitente === 'user').length
    return { ...c, ultimo, noLeidos }
  })

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Conversaciones</h1>
          <ModoIAGlobalToggle />
        </div>

        {lista.length === 0 ? (
          <p className="text-sm text-gray-500">Todavía no hay conversaciones.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {lista.map((c) => (
              <Link
                key={c.id}
                href={`/owner/chat/${c.id}`}
                className="flex items-center justify-between rounded-lg border border-gray-200 p-4 hover:border-gray-400 transition-colors"
              >
                <div className="min-w-0">
                  <div className="font-medium">{c.profiles?.nombre ?? 'Usuario'}</div>
                  <div className="text-sm text-gray-500 truncate max-w-xs">{c.ultimo?.contenido ?? 'Sin mensajes'}</div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {c.modo_ia && <Badge tone="neutral" variant="soft">IA</Badge>}
                  {c.noLeidos > 0 && <Badge tone="rojo" variant="solid">{c.noLeidos}</Badge>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
