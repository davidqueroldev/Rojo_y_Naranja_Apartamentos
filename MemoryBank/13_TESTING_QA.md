# M13 — TESTING & QA
> Proyecto: Apartamentos Rojo y Naranja  
> Sprint programa: S2 (endpoints) + S5 (general) · Estado: 🚫 Parcialmente bloqueada

---

## 🎯 Objetivo
Garantizar que los flujos críticos funcionan antes del lanzamiento. Especial atención al flujo de reserva y pagos.

## 📊 Estado actual

| Tarea | Estado |
|-------|--------|
| Tests endpoints Postman/ThunderClient (S2 #10) | 🚫 Bloqueada |
| Documentar rutas API en README (S2 #11) | 🚫 Bloqueada |
| Tests unitarios Vitest | ⬜ Pendiente |
| Tests E2E Playwright | ⬜ Pendiente |
| QA manual mobile | ⬜ Pendiente |

---

## 🧪 Flujos críticos a testear

| Flujo | Herramienta | Prioridad |
|-------|------------|-----------|
| Registro + confirmación email | Playwright E2E | 🔴 |
| Login + redirección por rol | Playwright E2E | 🔴 |
| Búsqueda de disponibilidad | Vitest unit | 🔴 |
| Cálculo de precio con temporada especial | Vitest unit | 🔴 |
| Reserva completa + pago Stripe test | Playwright E2E | 🔴 |
| Webhook Stripe → actualización estado | Integration | 🔴 |
| Toggle IA/Manual + respuesta chatbot | Integration | 🟠 |
| Envío email de confirmación | Integration | 🟠 |
| Protección de rutas por rol | Playwright E2E | 🔴 |
| Acciones propietario (confirmar/anular) | Playwright E2E | 🟠 |

---

## 🔌 Tests de endpoints (Postman / ThunderClient)

Colección a documentar en `/docs/api-tests.json`:

```
POST /api/reservas
  Body: { apartamento_id, fecha_checkin, fecha_checkout, num_huespedes }
  Expected: 201 + { reserva_id, precio_total }

GET /api/disponibilidad?apartamento=rojo&inicio=2025-07-01&fin=2025-07-07
  Expected: 200 + { disponible: true, fechas_ocupadas: [] }

POST /api/checkout
  Body: { reserva_id, precio_total }
  Expected: 200 + { url: "https://checkout.stripe.com/..." }
```

---

## ✅ Checklist del módulo

- [ ] Colección Postman/ThunderClient exportada en `/docs/`
- [ ] README: sección de rutas de la API documentada
- [ ] Vitest configurado (`vitest.config.ts`)
- [ ] Tests unitarios: `calcularPrecio()`, `generarCodigoReserva()`, lógica disponibilidad
- [ ] Playwright configurado (`playwright.config.ts`)
- [ ] E2E: flujo registro → login → reserva → pago (Stripe test mode)
- [ ] E2E: protección de rutas (invitado no accede a /user)
- [ ] QA manual: iOS Safari + Android Chrome
- [ ] Lighthouse ≥ 90 en mobile antes del go-live

---

## 🐛 Problemas conocidos / Notas

> S2 tasks #10 y #11 están bloqueadas porque los endpoints aún están en desarrollo (task #8).
> Desbloquear cuando M2 y M5 estén completos.

---

*Módulo M13 · Cruza todos los módulos · Ver 00_ROADMAP_GENERAL.md*
