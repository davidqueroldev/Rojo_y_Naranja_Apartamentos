# M1 — SETUP & ARQUITECTURA
> Proyecto: Apartamentos Rojo y Naranja  
> Repo: https://github.com/davidqueroldev/WEB_ROJO_Y_NARANJA  
> Sprint programa: S1 (✅ mayormente completado) · S2 (variables de entorno 🔄)

---

## 🎯 Objetivo
Estructura del proyecto lista, entorno de desarrollo configurado, todas las integraciones base conectadas y primer commit funcional.

## 📊 Estado actual

| Tarea | Estado |
|-------|--------|
| Definir idea y alcance | ✅ Completada |
| Repositorio GitHub configurado | ✅ Completada |
| Stack y deploy target definidos | ✅ Completada |
| Primer commit con README y estructura | ✅ Completada |
| Variables de entorno (.env) | 🔄 En progreso |
| Backlog en GitHub Projects | ⬜ Pendiente |

---

## 🛠️ Stack definitivo

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 14 (App Router) |
| Estilos | Tailwind CSS |
| Base de datos + Auth | Supabase (PostgreSQL + Supabase Auth + Realtime) |
| Pagos | Stripe Checkout |
| Deploy | Vercel |
| Chat IA | Claude API (Anthropic) vía webhook Vercel |
| Email | Resend + React Email |
| Testing | Vitest (unit) + Playwright (E2E) |

---

## 📁 Árbol de carpetas completo

```
/
├── app/
│   ├── (public)/
│   │   ├── page.tsx                    # Landing principal
│   │   ├── apartamentos/
│   │   │   └── [slug]/page.tsx         # Detalle apartamento
│   │   └── layout.tsx
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── confirm/page.tsx
│   │   └── reset-password/page.tsx
│   ├── (user)/
│   │   ├── dashboard/page.tsx
│   │   ├── reservas/
│   │   │   ├── page.tsx
│   │   │   ├── nueva/page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── chat/
│   │   │   └── [reservaId]/page.tsx
│   │   └── layout.tsx                  # Guard: rol 'user' o 'owner'
│   ├── (owner)/
│   │   ├── dashboard/page.tsx
│   │   ├── reservas/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── apartamentos/
│   │   │   └── [slug]/disponibilidad/page.tsx
│   │   ├── precios/page.tsx
│   │   ├── chat/
│   │   │   ├── page.tsx
│   │   │   └── [conversacionId]/page.tsx
│   │   └── layout.tsx                  # Guard: rol 'owner'
│   ├── api/
│   │   ├── webhooks/
│   │   │   ├── stripe/route.ts
│   │   │   └── chat-ia/route.ts
│   │   ├── reservas/route.ts
│   │   ├── disponibilidad/route.ts
│   │   └── checkout/route.ts
│   └── layout.tsx
├── components/
│   ├── ui/                             # Button, Input, Card, Badge, Modal…
│   ├── landing/                        # Hero, ApartamentoCard, Galeria, Mapa…
│   ├── reservas/                       # CalendarioDisponibilidad, FormularioReserva…
│   ├── chat/                           # ChatWindow, MessageBubble, ToggleIA…
│   ├── dashboard/                      # ReservaTable, KPICard, CalendarioGlobal…
│   └── shared/                         # Navbar, Footer, Providers…
├── lib/
│   ├── supabase/
│   │   ├── client.ts                   # Cliente browser
│   │   ├── server.ts                   # Cliente server (SSR)
│   │   └── middleware.ts
│   ├── stripe/
│   │   ├── client.ts
│   │   └── webhooks.ts
│   ├── claude/
│   │   └── chat.ts
│   ├── email/
│   │   └── send.ts
│   └── utils/
│       ├── precios.ts
│       └── fechas.ts
├── types/
│   └── supabase.ts                     # Tipos generados: supabase gen types typescript
├── supabase/
│   └── migrations/                     # Migraciones SQL versionadas
├── middleware.ts                        # Protección de rutas por rol
└── .env.local                          # NUNCA en git
```

---

## 🔑 Variables de entorno

```bash
# .env.local — copiar a .env.example sin valores para el repo

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Anthropic (Claude)
ANTHROPIC_API_KEY=

# Email (Resend)
RESEND_API_KEY=
EMAIL_FROM=hola@apartamentosrojoynaranja.com

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 📦 Dependencias clave a instalar

```bash
npm install @supabase/ssr @supabase/supabase-js
npm install stripe @stripe/stripe-js
npm install @anthropic-ai/sdk
npm install resend @react-email/components
npm install date-fns react-day-picker
npm install zustand
npm install react-big-calendar
npm install recharts

npm install -D vitest @playwright/test
```

---

## 🔐 Middleware de rutas

```typescript
// middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Rutas owner: solo rol 'owner'
  if (pathname.startsWith('/owner')) {
    // verificar sesión y rol desde profiles
    // si no owner → redirect /unauthorized
  }

  // Rutas user: rol 'user' o 'owner'
  if (pathname.startsWith('/user')) {
    // si no autenticado → redirect /login
  }
}

export const config = {
  matcher: ['/user/:path*', '/owner/:path*']
}
```

---

## ✅ Checklist del módulo

- [x] Repositorio GitHub creado y con estructura base
- [x] README con descripción del proyecto
- [x] Stack definido y documentado
- [ ] `.env.local` con todas las variables rellenas
- [ ] `.env.example` en el repo (sin valores)
- [ ] Supabase: proyecto creado (región EU)
- [ ] Vercel: proyecto conectado al repo
- [ ] Stripe: cuenta creada, webhook configurado en test mode
- [ ] Resend: cuenta creada, dominio verificado
- [ ] GitHub Projects: backlog inicial creado
- [ ] ESLint + Prettier + Husky configurados
- [ ] Middleware de rutas implementado

---

## 🐛 Problemas conocidos / Notas

> *(Añadir aquí durante el desarrollo)*

---

*Módulo M1 · Ver 00_ROADMAP_GENERAL.md para visión completa*
