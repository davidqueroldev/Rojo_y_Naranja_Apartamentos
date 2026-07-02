'use client'

import { useEffect, useRef, useState } from 'react'
import { Send, Sparkles } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface Mensaje {
  id: string
  remitente: 'user' | 'owner' | 'ia'
  contenido: string
  created_at: string
}

export function ChatWindow({
  conversacionId,
  isOwner,
  modoIaInicial,
}: {
  conversacionId: string
  isOwner: boolean
  modoIaInicial?: boolean
}) {
  const [mensajes, setMensajes] = useState<Mensaje[]>([])
  const [texto, setTexto] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [modoIa, setModoIa] = useState(!!modoIaInicial)
  const finRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const supabase = createClient()
    let channel: ReturnType<typeof supabase.channel> | null = null
    let cancelado = false

    async function iniciar() {
      // La sesión debe estar cargada antes de suscribirse: si no, el cliente de
      // Realtime todavía no tiene el token del usuario y las políticas RLS
      // descartan silenciosamente los cambios (nunca llega ningún evento).
      const { data: { session } } = await supabase.auth.getSession()
      if (session) await supabase.realtime.setAuth(session.access_token)
      if (cancelado) return

      const { data } = await supabase
        .from('mensajes')
        .select('id, remitente, contenido, created_at')
        .eq('conversacion_id', conversacionId)
        .order('created_at', { ascending: true })
      if (cancelado) return
      setMensajes((data as Mensaje[]) ?? [])

      channel = supabase
        .channel(`mensajes-${conversacionId}`)
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'mensajes', filter: `conversacion_id=eq.${conversacionId}` },
          (payload) => {
            setMensajes((prev) => [...prev, payload.new as Mensaje])
          }
        )
        .subscribe()
    }

    iniciar()

    return () => {
      cancelado = true
      if (channel) supabase.removeChannel(channel)
    }
  }, [conversacionId])

  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensajes.length])

  async function enviar() {
    const contenido = texto.trim()
    if (!contenido) return
    setEnviando(true)
    setTexto('')
    try {
      await fetch(`/api/conversaciones/${conversacionId}/mensajes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contenido }),
      })
    } finally {
      setEnviando(false)
    }
  }

  async function alternarModoIa() {
    const nuevo = !modoIa
    setModoIa(nuevo)
    await fetch(`/api/conversaciones/${conversacionId}/modo-ia`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ modo_ia: nuevo }),
    })
  }

  return (
    <div className="flex flex-col h-[70vh] border border-gray-200 rounded-lg overflow-hidden">
      {isOwner && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 text-sm bg-white">
          <span className="font-medium">Modo de respuesta</span>
          <button
            onClick={alternarModoIa}
            className={`px-3 py-1 rounded-full text-xs font-medium ${modoIa ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}
          >
            {modoIa ? 'IA activa' : 'Manual'}
          </button>
        </div>
      )}
      {!isOwner && modoIa && (
        <div className="flex items-center gap-1 px-4 py-2 border-b border-gray-100 text-xs text-purple-600 bg-purple-50">
          <Sparkles size={12} /> Respondiendo automáticamente
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 bg-gray-50">
        {mensajes.map((m) => {
          const esPropio = isOwner ? m.remitente === 'owner' : m.remitente === 'user'
          const esIA = m.remitente === 'ia'
          return (
            <div
              key={m.id}
              className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${
                esPropio ? 'self-end bg-red-700 text-white' : esIA ? 'self-start bg-purple-50 border border-purple-200 text-gray-800' : 'self-start bg-white border border-gray-200 text-gray-800'
              }`}
            >
              {esIA && (
                <div className="text-[10px] font-semibold text-purple-600 mb-1 flex items-center gap-1">
                  <Sparkles size={10} /> IA
                </div>
              )}
              {m.contenido}
            </div>
          )
        })}
        <div ref={finRef} />
      </div>

      <div className="flex items-center gap-2 p-3 border-t border-gray-200 bg-white">
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') enviar()
          }}
          placeholder="Escribe un mensaje…"
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:border-gray-400"
        />
        <button
          onClick={enviar}
          disabled={enviando || !texto.trim()}
          className="p-2 rounded-full bg-red-700 text-white disabled:opacity-50"
          aria-label="Enviar"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  )
}
