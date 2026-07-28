# CLAUDE.md

Guía para Claude Code (claude.ai/code) al trabajar en este repositorio.

> **Rama `new-concept` / `arquitectura-new-concept`.** Esta es la reescritura desde cero del
> proyecto: web-escaparate + solicitudes por email + panel del propietario. Sin pagos online,
> sin chat, sin cuentas de invitado. El diseño completo está en
> `docs/ARQUITECTURA_NEW_CONCEPT.md` (RFC) y el plan por fases en
> `docs/PLAN_EJECUCION_NEW_CONCEPT.md`.

## Qué es

**Apartamentos Rojo y Naranja** — web de 4 apartamentos turísticos en Morella (Castellón).
Una landing con buen SEO donde el visitante manda una **solicitud** (consulta genérica o
solicitud de reserva con fechas), confirma su email (**doble opt-in**), y el **propietario**
la gestiona (acepta / rechaza) desde un panel privado. El precio y la reserva se cierran por
email/teléfono fuera de la web. **Solo en español.**

## Stack

- **Framework:** Next.js 14 (App Router), React 18, TypeScript
- **BD y Auth:** Supabase (PostgreSQL + RLS). **Sin Realtime.**
- **Email:** nodemailer sobre Gmail SMTP + React Email (`@react-email/components`) para
  renderizar las plantillas de `emails/`
- **Estilos:** Tailwind CSS + custom properties (design tokens del skill de marca)
- **Mapa:** Leaflet · **Galería:** yet-another-react-lightbox · **Fechas:** date-fns +
  react-day-picker · **Imágenes:** Cloudinary (`lib/cloudinary.ts`)
- **Tests:** Vitest (unit) + Playwright (E2E)
- **Deploy:** Vercel

No hay Stripe, ni `@anthropic-ai/sdk`, ni zustand: se eliminaron en la poda del legacy.

## Comandos

```bash
npm run dev          # dev server (:3000)
npm run build        # build de producción
npm test             # Vitest
npm run test:e2e     # Playwright
npm run lint         # ESLint

# Regenerar tipos de Supabase tras cambiar el esquema (requiere Docker o --db-url):
npx supabase gen types typescript --db-url "<connection-string>" > types/supabase.ts
```

## Arquitectura

### Route groups (`app/`)

- `app/(public)/` — landing (`page.tsx`), fichas `apartamentos/[slug]`, y la confirmación de
  email `solicitud/confirmar/[token]`. Sin sesión.
- `app/(auth)/` — `login` y `reset-password`. Único login: el propietario.
- `app/owner/` — panel privado (`dashboard`, `solicitudes`). Protegido por `middleware.ts`.
- `app/api/` — rutas de servidor: `solicitudes` (POST público), `disponibilidad` (GET público),
  `owner/solicitudes/[id]/{aceptar,rechazar}`.

`middleware.ts` protege solo `/owner/:path*`: sin sesión → `/login`; con sesión pero
`profiles.rol !== 'owner'` → `/unauthorized`.

### Clientes de Supabase

- `lib/supabase/client.ts` — navegador (anon key, sujeto a RLS).
- `lib/supabase/server.ts` — Server Components / rutas con sesión (anon key + cookies SSR).
- `lib/supabase/admin.ts` — `createAdminClient()` con **service_role** (bypassa RLS). **Toda
  escritura pública** (crear solicitud, confirmar por token, leer disponibilidad) va por aquí:
  el público no tiene sesión y no se le conceden INSERT/UPDATE por RLS.

### Apartamentos: estáticos en código, no en BD

Los 4 apartamentos (fotos, amenities, textos, precio base) viven en `lib/data/apartments.ts`.
La BD **no** tiene tabla `apartamentos`: las solicitudes y bloqueos referencian el apartamento
por su `slug` (`oro`, `plata`, `rojo`, `naranja`). Esto mantiene la landing estática/ISR.

### Máquina de estados de una solicitud

`pendiente_email` → (cliente pulsa el enlace del email) → `pendiente_gestion` →
(propietario) → `aceptada` | `rechazada`. Otros estados: `cancelada`, `expirada` (token caducado).

La transición `pendiente_email → pendiente_gestion` ocurre **solo** en
`app/(public)/solicitud/confirmar/[token]/page.tsx`.

### Tablas (Supabase — esquema en `supabase/migrations/001_schema.sql`)

| Tabla | Propósito |
|---|---|
| `profiles` | Extiende `auth.users`; `rol` (`user_role`, solo `owner`). En la práctica 1 fila. |
| `solicitudes` | Consultas y solicitudes de reserva con doble opt-in (`apartamento_slug`, fechas, `estado`, `token_confirmacion`…). |
| `bloqueos_calendario` | Fechas no disponibles (`origen`: `manual` o `solicitud`); alimenta la disponibilidad. |

RLS activo en las 3. `is_owner()` (SECURITY DEFINER) resuelve el rol. El propietario ve/gestiona
todo vía RLS; el público solo a través de rutas de servidor con service_role.

### Email

`lib/email/send.ts` (`enviarEmail`) renderiza una plantilla de `emails/` con React Email y la
manda por `lib/email/mailer.ts` (nodemailer + Gmail SMTP: `GMAIL_USER`, `GMAIL_APP_PASSWORD`).

## Variables de entorno

Ver `.env.example`:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
GMAIL_USER
GMAIL_APP_PASSWORD
NEXT_PUBLIC_APP_URL
```

## Estado y fases

Implementado: landing, fichas, formulario de solicitud (solo reserva), doble opt-in por email,
panel del propietario (dashboard + bandeja de solicitudes con aceptar/rechazar), BD nueva
aplicada. Pendiente por fases (ver `docs/PLAN_EJECUCION_NEW_CONCEPT.md`): **F4** calendario de
bloqueos + email de aviso al propietario al confirmar, **F5** anti-spam (Zod + honeypot +
rate-limit con tabla Postgres) + cron de expiración + RGPD, **F6** SEO + analytics + tests +
go-live. La documentación de la arquitectura **antigua** (Stripe, chat, roles user/owner) vivía
en `MemoryBank/` y se eliminó en este fork; queda en la rama `main` del proyecto original.
