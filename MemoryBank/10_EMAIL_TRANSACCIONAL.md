# M10 — EMAIL TRANSACCIONAL
> Proyecto: Apartamentos Rojo y Naranja  
> Sprint programa: S4 · Estado: ⬜ Pendiente

---

## 🎯 Objetivo
Emails automáticos en los momentos clave del flujo de reserva. Servicio: Resend + React Email.

## 📧 Emails a implementar

| # | Trigger | Para | Asunto |
|---|---------|------|--------|
| E1 | Registro | Usuario | Confirma tu cuenta — Apartamentos Rojo y Naranja |
| E2 | Pago exitoso | Usuario | Reserva recibida · Pendiente confirmación [ARN-XXXX] |
| E3 | Pago exitoso | Propietario | 🔔 Nueva reserva pendiente — [ARN-XXXX] |
| E4 | Reserva confirmada | Usuario | ✅ ¡Tu reserva está confirmada! [ARN-XXXX] |
| E5 | Reserva anulada | Usuario | Reserva anulada — [ARN-XXXX] |
| E6 | Mensaje nuevo (manual) | Propietario | 💬 Nuevo mensaje de [nombre usuario] |

---

## 💻 Setup Resend

```typescript
// lib/email/send.ts
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail({
  to, subject, react
}: { to: string; subject: string; react: React.ReactElement }) {
  return resend.emails.send({
    from: `Apartamentos Rojo y Naranja <${process.env.EMAIL_FROM}>`,
    to,
    subject,
    react,
  })
}
```

---

## 🎨 Plantilla base (React Email)

```tsx
// emails/BaseTemplate.tsx
// Estructura: logo rojo/naranja · contenido · footer con contacto y nº registro
// Paleta: rojo #C0392B, fondo crema #FDF6EC
// Font: sistema (no web fonts para compatibilidad)
```

---

## ✅ Checklist del módulo

- [ ] Cuenta Resend creada
- [ ] Dominio verificado en Resend (SPF, DKIM, DMARC)
- [ ] `lib/email/send.ts` con función helper
- [ ] Plantilla base `emails/BaseTemplate.tsx`
- [ ] E1: Email confirmación (via Supabase Auth custom template)
- [ ] E2: Email pago recibido (trigger en webhook Stripe)
- [ ] E3: Email nueva reserva al propietario (trigger en webhook Stripe)
- [ ] E4: Email reserva confirmada (trigger en acción del propietario)
- [ ] E5: Email reserva anulada (trigger en acción del propietario)
- [ ] E6: Email nuevo mensaje (trigger en inserción de mensajes con modo_ia=false)
- [ ] Test de envío real desde producción antes del go-live

---

## 🐛 Problemas conocidos / Notas

> *(Añadir aquí durante el desarrollo)*

---

*Módulo M10 · Depende de: M6, M8 · Ver 00_ROADMAP_GENERAL.md*
