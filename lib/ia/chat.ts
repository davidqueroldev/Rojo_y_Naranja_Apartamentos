import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'
import { apartamentos, info } from '@/lib/data/apartments'

const APIFREELLM_URL = process.env.APIFREELLM_URL || 'https://apifreellm.com/api/v1/chat'

function construirSystemPrompt(): string {
  const listaApartamentos = apartamentos
    .map((a) => `- ${a.nombre}: hasta ${a.capacidadMax} personas, ${a.habitaciones} dormitorio${a.habitaciones > 1 ? 's' : ''}${a.aceptaNinos ? '' : ', NO acepta niños'} — ${a.resumen}`)
    .join('\n')

  return `Eres el asistente virtual de los Apartamentos Rojo y Naranja, situados en ${info.direccion}.

APARTAMENTOS DISPONIBLES:
${listaApartamentos}

TODOS INCLUYEN: wifi, cocina completa, lavadora, lavavajillas, TV, acceso al centro histórico de Morella.

PRECIOS ESPECIALES: Fin de Año y puentes pueden tener precios diferentes. Recomienda consultar por teléfono para esas fechas.

REGISTRO TURÍSTICO: ${info.registros}

INSTRUCCIONES:
- Responde en texto plano, sin markdown (nada de **negrita**, listas con guiones ni encabezados) — el chat no lo interpreta.
- Sé amable, cálido y profesional.
- Si no sabes algo, di que el propietario contactará pronto.
- Ayuda a elegir apartamento según las necesidades del usuario.
- Para reservas, dirige al formulario de la web.
- Responde siempre en el idioma del usuario.`
}

const RESPUESTA_FALLBACK = 'Disculpa, no he podido procesar tu mensaje ahora mismo. El propietario te responderá en breve.'

/** apifreellm no soporta system prompt ni historial estructurado: solo { message }. Se concatena todo en un único mensaje. */
function construirMensaje(historial: { remitente: string; contenido: string }[]): string {
  const conversacion = historial
    .map((m) => `${m.remitente === 'user' ? 'Huésped' : 'Anfitrión'}: ${m.contenido}`)
    .join('\n')

  return `${construirSystemPrompt()}

CONVERSACIÓN HASTA AHORA:
${conversacion}

Responde ahora como el anfitrión al último mensaje del huésped.`
}

export async function generarRespuestaIA(supabase: SupabaseClient<Database>, conversacionId: string) {
  const { data: mensajes } = await supabase
    .from('mensajes')
    .select('remitente, contenido')
    .eq('conversacion_id', conversacionId)
    .order('created_at', { ascending: true })
    .limit(20)

  if (!mensajes || mensajes.length === 0) return

  let respuesta = RESPUESTA_FALLBACK

  try {
    const res = await fetch(APIFREELLM_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.APIFREELLM_API_KEY}`,
      },
      body: JSON.stringify({ message: construirMensaje(mensajes) }),
    })

    const data = await res.json().catch(() => null)
    if (res.ok && data?.success && typeof data.response === 'string') {
      respuesta = data.response
    } else {
      console.error('apifreellm respondió con error', res.status, data)
    }
  } catch (e) {
    console.error('Error llamando a apifreellm', e)
  }

  await supabase.from('mensajes').insert({
    conversacion_id: conversacionId,
    remitente: 'ia',
    contenido: respuesta,
  })
}
