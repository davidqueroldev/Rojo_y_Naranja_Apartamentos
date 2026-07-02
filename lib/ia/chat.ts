import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'
import { apartamentos, info } from '@/lib/data/apartments'

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-flash-latest'
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`

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

/** Gemini estructura el historial como turnos user/model; los mensajes del owner cuentan como "model" (lado anfitrión), igual que los de la IA. */
function construirContents(historial: { remitente: string; contenido: string }[]) {
  return historial.map((m) => ({
    role: m.remitente === 'user' ? 'user' : 'model',
    parts: [{ text: m.contenido }],
  }))
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
    const res = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': process.env.GEMINI_API_KEY || '',
      },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: construirSystemPrompt() }] },
        contents: construirContents(mensajes),
      }),
      signal: AbortSignal.timeout(15_000),
    })

    const data = await res.json().catch(() => null)
    const texto = data?.candidates?.[0]?.content?.parts?.[0]?.text

    if (res.ok && typeof texto === 'string' && texto.trim()) {
      respuesta = texto.trim()
    } else {
      console.error('Gemini respondió con error', res.status, data)
    }
  } catch (e) {
    console.error('Error llamando a Gemini', e)
  }

  await supabase.from('mensajes').insert({
    conversacion_id: conversacionId,
    remitente: 'ia',
    contenido: respuesta,
  })
}
