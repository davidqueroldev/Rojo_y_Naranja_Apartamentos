# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Rojo y Naranja Apartamentos** is a vacation rental booking platform for 4 properties in Morella, Spain. It handles multi-role access (guests vs. property owner), real-time chat with optional AI assistance, and Stripe-based payments.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database & Auth:** Supabase (PostgreSQL + RLS + Realtime)
- **Payments:** Stripe Checkout (webhook-driven state machine)
- **AI Chat:** Anthropic Claude API (`@anthropic-ai/sdk`)
- **Email:** Resend + React Email
- **State:** Zustand
- **Styling:** Tailwind CSS
- **Testing:** Vitest (unit) + Playwright (E2E)
- **Deploy:** Vercel

## Commands

```bash
npm run dev          # Start dev server (port 3000)
npm run build        # Production build
npm test             # Vitest unit tests
npm run test:e2e     # Playwright E2E tests
npm run lint         # ESLint + Prettier

# Regenerate Supabase types after schema changes
npx supabase gen types typescript --local > types/supabase.ts
```

## Architecture

### Route Groups

- `app/(public)/` — Landing page, apartment detail pages (unauthenticated)
- `app/(auth)/` — Login, register, confirm, reset-password
- `app/(user)/` — Guest dashboard (requires `user` or `owner` role)
- `app/(owner)/` — Owner-only management (requires `owner` role)
- `app/api/` — Server-side API routes (reservations, checkout, webhooks)

Route protection is handled in `middleware.ts` using Supabase SSR session and profile role.

### Supabase Client Pattern

Two clients must be used correctly:
- `lib/supabase/client.ts` — Browser client (uses anon key, subject to RLS)
- `lib/supabase/server.ts` — Server client for API routes and Server Components (uses service role key, bypasses RLS)

### Reservation State Machine

`pendiente_pago` → `pendiente_confirmacion` → `confirmada` → `completada` / `anulada`

Stripe webhook (`api/webhooks/stripe/route.ts`) drives state transitions and triggers transactional emails via Resend.

### Hybrid AI Chat

Each `conversaciones` row has a `modo_ia: boolean` flag the owner can toggle. When enabled, incoming user messages trigger `api/webhooks/chat-ia/route.ts`, which calls Claude with apartment context and posts the response back as a message with `remitente: 'ia'`. All parties receive updates via Supabase Realtime subscription.

### Database Key Tables

| Table | Purpose |
|---|---|
| `profiles` | Extends `auth.users`; stores `rol` (`'user'` \| `'owner'`) |
| `apartamentos` | The 4 properties (Rojo, Naranja, Plata, Ático Oro) |
| `reservas` | Bookings with Stripe session ID and state |
| `pagos` | Payment records linked to Stripe payment intents |
| `precios_especiales` | Seasonal/holiday pricing overrides |
| `bloqueos_calendario` | Owner-set blocks (maintenance, personal use) |
| `conversaciones` | Chat threads with `modo_ia` toggle |
| `mensajes` | Individual messages; `remitente`: `'user'`\|`'owner'`\|`'ia'` |

Row-Level Security is enabled on all tables. Users see only their own data; owners see all apartment-related data.

## Environment Variables

See `.env.example` for the full list. Required variables:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
ANTHROPIC_API_KEY
RESEND_API_KEY
NEXT_PUBLIC_APP_URL
```

## Documentation

The `MemoryBank/` directory contains 15 detailed spec files (M0–M14) covering every module: database schema with full SQL, API endpoint contracts, component requirements, and deployment checklists. Consult the relevant module before implementing any feature.
