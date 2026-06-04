# M9 — CHAT HÍBRIDO IA/MANUAL
> Proyecto: Apartamentos Rojo y Naranja  
> Sprint programa: S4 · Estado: ⬜ Pendiente

---

## 🎯 Objetivo
Chat en tiempo real con toggle que permite al propietario delegar respuestas al chatbot de Claude o responder manualmente.

## 🏗️ Arquitectura

```
Usuario (browser)
  ↕ Supabase Realtime (WebSocket)
Tabla `mensajes` en Supabase
  ↕ Database Webhook → POST /api/webhooks/chat-ia
Webhook handler en Vercel
  ↕ Anthropic API (claude-sonnet-4-20250514)
  → INSERT respuesta IA en `mensajes` (remitente: 'ia')
  ↕ Supabase Realtime
Propietario y Usuario ven el mensaje en tiempo real
```

---

## 🔀 Lógica del toggle

```typescript
// conversaciones.modo_ia = false → Manual (propietario escribe)
// conversaciones.modo_ia = true  → IA (Claude responde automáticamente)

// Al llegar mensaje de usuario:
// IF modo_ia === true:
//   → Database Webhook dispara /api/webhooks/chat-ia
//   → Claude recibe historial + contexto del alojamiento
//   → INSERT respuesta con remitente = 'ia'
// IF modo_ia === false:
//   → Solo notificación al propietario (badge no leídos)
//   → Propietario responde manualmente
```

---

## 🤖 System prompt del chatbot

```
Eres el asistente virtual de los Apartamentos Rojo y Naranja,
situados en C/ San Nicolás, 11 en el centro histórico de Morella (Castellón).

APARTAMENTOS DISPONIBLES:
- Rojo: hasta 4 personas, 2 habitaciones, bañera + ducha hidromasaje
- Naranja: hasta 4 personas, 2 habitaciones, ducha hidromasaje
- Plata: 2 personas, jacuzzi para 2, chimenea eléctrica, NO acepta niños
- Ático Oro: 2 personas, jacuzzi, terraza privada 16m², chimenea, NO acepta niños

TODOS INCLUYEN: WiFi, cocina completa, lavadora, lavavajillas, TV, acceso al centro

PRECIOS ESPECIALES: Fin de Año y puentes tienen precios diferentes.
Recomendar consultar por teléfono para esas fechas.

REGISTRO TURÍSTICO: 23750-CS, 23751-CS, 27852-CS, 27853-CS

INSTRUCCIONES:
- Sé amable, cálido y profesional
- Si no sabes algo, di que el propietario contactará pronto
- Ayuda a elegir apartamento según necesidades del usuario
- Para reservas, dirige al formulario de la web
- Responde siempre en el idioma del usuario
```

---

## 💻 Webhook handler

```typescript
// app/api/webhooks/chat-ia/route.ts
import Anthropic from '@anthropic-ai/sdk'
const anthropic = new Anthropic()

export async function POST(request: Request) {
  const { conversacion_id, mensaje_usuario } = await request.json()

  // Verificar que modo_ia está activo
  const { data: conv } = await supabase
    .from('conversaciones')
    .select('modo_ia, ia_contexto')
    .eq('id', conversacion_id)
    .single()

  if (!conv?.modo_ia) return new Response('ok', { status: 200 })

  // Obtener historial (últimos 20 mensajes)
  const { data: mensajes } = await supabase
    .from('mensajes')
    .select('remitente, contenido')
    .eq('conversacion_id', conversacion_id)
    .order('created_at', { ascending: true })
    .limit(20)

  const messages = mensajes!.map(m => ({
    role: m.remitente === 'user' ? 'user' : 'assistant',
    content: m.contenido
  }))

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 500,
    system: SYSTEM_PROMPT, // (ver arriba)
    messages,
  })

  const respuestaIA = response.content[0].type === 'text'
    ? response.content[0].text : ''

  // Insertar respuesta en BD → Supabase Realtime notifica a ambos
  await supabase.from('mensajes').insert({
    conversacion_id,
    remitente: 'ia',
    contenido: respuestaIA
  })

  return new Response('ok', { status: 200 })
}
```

---

## 🖥️ Componente ChatWindow

```typescript
// components/chat/ChatWindow.tsx
// Props: conversacion_id, user_id, is_owner

// 1. Cargar historial inicial con useEffect
// 2. Suscribirse a Supabase Realtime para mensajes nuevos
// 3. Scroll automático al último mensaje
// 4. Input de texto + botón enviar
// 5. Si is_owner: mostrar toggle IA/Manual

// Estilos de burbujas:
// user    → derecha, fondo naranja
// owner   → izquierda, fondo gris
// ia      → izquierda, fondo gris con badge "IA ✨"
```

---

## ✅ Checklist del módulo

- [ ] Webhook `/api/webhooks/chat-ia` implementado
- [ ] Database Webhook en Supabase configurado (INSERT en mensajes → llamar al webhook)
- [ ] System prompt del chatbot con contexto completo
- [ ] Componente `ChatWindow` con Realtime
- [ ] Toggle IA/Manual en vista propietario (actualiza `conversaciones.modo_ia`)
- [ ] Indicador visual "Respondiendo automáticamente" cuando IA activa
- [ ] Historial paginado de mensajes anteriores
- [ ] Test: enviar mensaje → recibir respuesta IA < 5 segundos

---

## 🐛 Problemas conocidos / Notas

> *(Añadir aquí durante el desarrollo)*

---

*Módulo M9 · Depende de: M2, M8 · Ver 00_ROADMAP_GENERAL.md*
