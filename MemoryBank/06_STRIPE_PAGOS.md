# M6 — PASARELA DE PAGOS (STRIPE)
> Proyecto: Apartamentos Rojo y Naranja  
> Sprint programa: S4 · Estado: ⬜ Pendiente

---

## 🎯 Objetivo
Cobro seguro con Stripe Checkout. Webhook que actualiza automáticamente el estado de la reserva tras el pago.

## 🔄 Flujo completo

```
1. POST /api/checkout
   → Crea Stripe Checkout Session
   → metadata: { reserva_id, user_id, apartamento_slug }
   → success_url: /reservas/{id}?pago=ok
   → cancel_url: /reservas/{id}?pago=cancelado

2. Usuario → Stripe Checkout (página hosted)
   → Introduce tarjeta y paga

3. Stripe → POST /api/webhooks/stripe
   → Verificar firma con STRIPE_WEBHOOK_SECRET
   → Evento 'checkout.session.completed':
       - reservas.estado → 'pendiente_confirmacion'
       - INSERT en tabla pagos
       - Notificar propietario (Realtime + email)
       - Email confirmación al usuario

4. Usuario redirigido a /reservas/{id}
   → Mensaje: "Pago recibido. El propietario confirmará tu reserva."
```

---

## 💻 Código clave

### `POST /api/checkout/route.ts`
```typescript
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: Request) {
  const { reserva_id, precio_total, descripcion } = await request.json()

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'eur',
        product_data: { name: descripcion },
        unit_amount: Math.round(precio_total * 100), // céntimos
      },
      quantity: 1,
    }],
    mode: 'payment',
    metadata: { reserva_id },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/reservas/${reserva_id}?pago=ok`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/reservas/${reserva_id}?pago=cancelado`,
  })

  // Guardar session ID en reserva
  await supabase.from('reservas')
    .update({ stripe_session_id: session.id })
    .eq('id', reserva_id)

  return Response.json({ url: session.url })
}
```

### `POST /api/webhooks/stripe/route.ts`
```typescript
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: Request) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return new Response('Webhook signature invalid', { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const { reserva_id } = session.metadata!

    // Idempotencia: verificar que no se procesó antes
    const { data: pago } = await supabase.from('pagos')
      .select('id').eq('stripe_payment_intent_id', session.payment_intent as string).single()

    if (!pago) {
      // Actualizar estado reserva
      await supabase.from('reservas')
        .update({ estado: 'pendiente_confirmacion', updated_at: new Date().toISOString() })
        .eq('id', reserva_id)

      // Registrar pago
      await supabase.from('pagos').insert({
        reserva_id,
        stripe_payment_intent_id: session.payment_intent as string,
        importe: (session.amount_total || 0) / 100,
        estado: 'completado',
        tipo: 'total'
      })

      // TODO: enviar email + notificación Realtime (ver M10)
    }
  }

  return new Response('ok', { status: 200 })
}

export const config = { api: { bodyParser: false } }
```

---

## ⚙️ Configuración Stripe Dashboard

- Crear webhook endpoint: `https://tudominio.com/api/webhooks/stripe`
- Eventos a escuchar: `checkout.session.completed`, `payment_intent.payment_failed`
- Modo test: usar tarjeta `4242 4242 4242 4242`

---

## ✅ Checklist del módulo

- [ ] Cuenta Stripe creada
- [ ] Variables de entorno Stripe configuradas (test mode)
- [ ] `POST /api/checkout` implementado
- [ ] `POST /api/webhooks/stripe` implementado con verificación de firma
- [ ] Idempotencia implementada (no procesar el mismo evento dos veces)
- [ ] Página de éxito `/reservas/[id]?pago=ok` con mensaje correcto
- [ ] Página de cancelación con mensaje y botón de reintentar
- [ ] Test con tarjeta 4242 4242 4242 4242 en modo test
- [ ] Cambio a claves LIVE antes del go-live (ver M14)

---

## 🐛 Problemas conocidos / Notas

> *(Añadir aquí durante el desarrollo)*

---

*Módulo M6 · Depende de: M5 · Necesario para: M7, M8, M10 · Ver 00_ROADMAP_GENERAL.md*
