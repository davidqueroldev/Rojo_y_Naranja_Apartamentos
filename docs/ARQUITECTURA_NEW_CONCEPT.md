# Arquitectura — `new-concept` (fork ligero de Rojo y Naranja Apartamentos)

> **Estado:** propuesta / RFC · **Rama:** `new-concept` · **Fecha:** 2026-07-28
> **Autor:** equipo Rojo y Naranja
> **Sustituye a:** arquitectura documentada en `MemoryBank/` (M0–M14)

---

## 1. Motivación

La versión original (rama `main`) es una **plataforma de reservas transaccional**: máquina de
estados de reserva, pasarela Stripe con webhooks, panel de usuario registrado, y chat híbrido
con IA. Es potente, pero para el negocio real de 4 apartamentos en Morella resulta
**sobredimensionada y cara de mantener**:

- Nadie cobra online: los clientes reservan y pagan por otras vías (transferencia, en mano).
- El chat con IA nunca se usó en producción y añade coste de API, superficie de ataque y
  tablas de Realtime que hay que vigilar.
- El registro de usuarios (guest) es fricción innecesaria: casi todos los contactos son
  "solicitud de reserva" o "consulta genérica" de gente que no quiere crear una cuenta.

La rama `new-concept` ya ha empezado este giro de forma **incremental** (añadiendo la tabla
`consultas` sin tocar el resto). Este documento propone **rehacer la arquitectura desde cero
sobre una base de datos Supabase nueva y limpia**, quedándonos solo con lo que aporta valor.

### Objetivo en una frase

> Una web-escaparate rápida y con buen SEO para 4 apartamentos, con un **formulario de
> solicitud de reserva / consulta** que confirma por email, y un **panel privado para el
> propietario** que gestiona esas solicitudes y el calendario de disponibilidad. Sin pagos
> online. Sin chat. Sin cuentas de invitado.

---

## 2. Qué entra y qué sale respecto a `main`

| Módulo (`main` / MemoryBank) | `new-concept` | Motivo |
|---|---|---|
| Landing + páginas de apartamento (M04) | ✅ **Se conserva y mejora** | Es el core del negocio |
| Reservas con máquina de estados (M05) | 🔄 **Se sustituye** por `consultas` | No hay pago que orquestar |
| Stripe Checkout + webhooks (M06) | ❌ **Se elimina** | No se cobra online |
| Panel de usuario / guest (M07) | ❌ **Se elimina** | No hay cuentas de invitado |
| Dashboard propietario (M08) | ✅ **Se conserva y simplifica** | Gestión de solicitudes y calendario |
| Chat híbrido con IA (M09) | ❌ **Se elimina** | No se usa; coste y superficie |
| Email transaccional (M10) | ✅ **Se conserva**, reenfocado a consultas | Doble opt-in + aviso al owner |
| SEO técnico (M11) | ✅ **Se refuerza** | Ahora es el canal principal |
| Analytics (M12) | ✅ **Se conserva** (ligero) | Medir conversión del formulario |
| Auth y roles (M03) | 🔄 **Se reduce a un solo rol**: `owner` | Solo el propietario entra |
| Testing/QA (M13), Despliegue (M14) | ✅ **Se conserva** | Igual de importantes |

**Dependencias que se retiran del `package.json`:** `stripe`, `@stripe/stripe-js`,
`@anthropic-ai/sdk`. (Se revisa también si `zustand` sigue haciendo falta — ver §7.)

---

## 3. Principios de diseño

1. **Base de datos nueva y mínima.** Proyecto Supabase nuevo; solo las tablas necesarias.
   Nada de `pagos`, `reservas`, `conversaciones`, `mensajes`, `precios_especiales`
   (a menos que se quiera precio dinámico — ver §5).
2. **Contenido de apartamentos en código, no en BD.** Los 4 apartamentos son estáticos
   (fotos, amenities, textos). Ya viven en `lib/data/apartments.ts`. La BD solo guarda lo
   **transaccional y variable** (solicitudes, bloqueos de calendario). Esto simplifica el
   RLS y hace la landing 100% estática/ISR.
3. **Escrituras públicas solo desde el servidor.** El formulario público nunca escribe con la
   `anon key`. Las rutas de servidor usan el cliente `service_role`. El público **no tiene
   sesión**, así que no se conceden `INSERT/UPDATE` a `anon`. (Ya es el patrón de la
   migración `005_consultas.sql`.)
4. **Un solo rol con privilegios: `owner`.** El middleware protege `/owner/*`. Todo lo demás
   es público.
5. **Defensa en profundidad contra spam.** El formulario es público → rate-limit + honeypot +
   (opcional) captcha, y doble opt-in por email antes de que una solicitud llegue a
   "pendiente de gestión".

---

## 4. Arquitectura de aplicación (Next.js 14 App Router)

```
app/
  (public)/                     # Sin sesión. Estático / ISR.
    page.tsx                    # Landing (hero, apartamentos, mapa, formulario)
    apartamentos/[slug]/        # Ficha de cada apartamento
    solicitud/confirmar/[token] # Landing de confirmación de email (doble opt-in)
  (auth)/
    login/                      # Único login: el propietario
    reset-password/
  owner/                        # Protegido por middleware (rol = owner)
    dashboard/                  # Resumen: solicitudes nuevas, ocupación
    solicitudes/                # Bandeja de consultas/solicitudes (lista + detalle)
    solicitudes/[id]/
    calendario/                # Disponibilidad y bloqueos por apartamento
    apartamentos/[slug]/       # (opcional) editar textos/precio si se mueve a BD
  api/
    solicitudes/               # POST público: crear consulta/solicitud
    solicitudes/confirmar/     # POST/GET: confirmar por token (doble opt-in)
    disponibilidad/            # GET público: fechas ocupadas de un apartamento
    owner/
      solicitudes/[id]/        # aceptar / rechazar / marcar gestionada
      bloqueos/                # crear / borrar bloqueos de calendario
  auth/callback/               # Callback de Supabase Auth
components/
  landing/                     # Hero, ApartmentsSection, ConsultaSection, MapSection…
  owner/                       # Bandeja, acciones, calendario
  ui/                          # Botones, inputs, badges (design system del skill de marca)
lib/
  supabase/{client,server}.ts  # Dos clientes (anon / service_role)
  data/apartments.ts           # Fuente de verdad de los 4 apartamentos
  email/                       # Envío + plantillas (Resend + React Email)
  validation/                  # Esquemas Zod de los formularios
  rate-limit.ts                # Rate limiting de rutas públicas
emails/                        # Plantillas React Email
supabase/migrations/           # Esquema nuevo (ver §5)
```

**Renderizado**

- **Landing y fichas:** Server Components estáticos con **ISR** (revalidación por tiempo).
  El contenido viene de `lib/data/apartments.ts`, así que no hay consulta a BD en la ruta
  crítica → TTFB mínimo y SEO óptimo.
- **Disponibilidad del calendario del formulario:** se pide bajo demanda a
  `GET /api/disponibilidad?apartamento=slug` (client component del datepicker), no en el
  render inicial.
- **Panel del propietario:** Server Components con datos frescos (sin cache) + Server Actions
  o rutas API para las mutaciones.

---

## 5. Modelo de datos (Supabase nuevo)

Base de datos **desde cero**. Solo 3 tablas de dominio + `profiles` para el propietario.

### 5.1 `profiles` (solo propietario)

Extiende `auth.users`. En la práctica tendrá **1 fila**. Se conserva por simetría con Supabase
Auth y por si en el futuro entra personal de limpieza/gestión.

```sql
create type user_role as enum ('owner');   -- ampliable a 'staff' en el futuro

create table profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  email      text not null,
  nombre     text,
  rol        user_role not null default 'owner',
  created_at timestamptz not null default now()
);
```

### 5.2 `solicitudes` (antes `consultas`)

El corazón del nuevo modelo: consulta genérica o solicitud de reserva, sin cuenta de usuario,
con **doble opt-in por email**. Es la tabla `consultas` de `005_consultas.sql`, renombrada y
adoptada como diseño oficial.

```sql
create type solicitud_tipo   as enum ('generica', 'reserva');
create type solicitud_estado as enum (
  'pendiente_email',        -- creada, esperando que el cliente confirme su email
  'pendiente_gestion',      -- email confirmado, esperando al propietario
  'aceptada',
  'rechazada',
  'cancelada',
  'expirada'                -- el token de confirmación caducó sin usarse
);

create table solicitudes (
  id                 uuid primary key default gen_random_uuid(),
  tipo               solicitud_tipo not null,
  -- Datos de contacto
  nombre             text not null,
  apellidos          text,
  telefono           text not null,
  email              text not null,
  -- Solo para tipo = 'reserva'
  apartamento_slug   text,                    -- referencia lógica a lib/data/apartments.ts
  fecha_checkin      date,
  fecha_checkout     date,
  num_huespedes      int,
  mensaje            text,
  -- Máquina de estados
  estado             solicitud_estado not null default 'pendiente_email',
  -- Doble opt-in
  token_confirmacion text unique,
  token_expira_en    timestamptz,
  confirmada_en      timestamptz,
  -- Gestión del propietario
  gestionada_en      timestamptz,
  nota_interna       text,
  -- Anti-spam / auditoría
  ip_origen          inet,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),

  constraint reserva_fechas_check check (
    tipo <> 'reserva'
    or (fecha_checkin is not null and fecha_checkout is not null and fecha_checkout > fecha_checkin)
  ),
  constraint reserva_apartamento_check check (
    tipo <> 'reserva' or apartamento_slug is not null
  )
);

create index idx_solicitudes_estado      on solicitudes(estado);
create index idx_solicitudes_apartamento on solicitudes(apartamento_slug);
create index idx_solicitudes_fechas      on solicitudes(fecha_checkin, fecha_checkout)
  where tipo = 'reserva';
```

> **Cambio respecto a `main`:** el estado `pendiente_confirmacion` de `consultas` se renombra a
> `pendiente_gestion` para que quede claro que "confirmación" es del cliente (email) y
> "gestión" es del propietario. Se añaden `num_huespedes`, `nota_interna`, `ip_origen` y el
> estado `rechazada`.

### 5.3 `bloqueos_calendario`

Fechas no disponibles que fija el propietario (mantenimiento, uso propio) **o** que genera una
solicitud aceptada. Alimenta tanto el datepicker público como el calendario del panel.

```sql
create type bloqueo_origen as enum ('manual', 'solicitud');

create table bloqueos_calendario (
  id               uuid primary key default gen_random_uuid(),
  apartamento_slug text not null,
  fecha_inicio     date not null,
  fecha_fin        date not null,
  origen           bloqueo_origen not null default 'manual',
  solicitud_id     uuid references solicitudes(id) on delete set null,
  motivo           text,
  created_at       timestamptz not null default now(),
  check (fecha_fin > fecha_inicio)
);

create index idx_bloqueos_apartamento on bloqueos_calendario(apartamento_slug);
create index idx_bloqueos_fechas      on bloqueos_calendario(fecha_inicio, fecha_fin);
```

Cuando el propietario **acepta** una solicitud de reserva, la acción crea (dentro de una
transacción) el bloqueo correspondiente con `origen = 'solicitud'`. Así la disponibilidad
pública se actualiza sin duplicar la lógica.

### 5.4 (Opcional) `precios_especiales`

Solo si se quiere mostrar precio dinámico por temporada en la landing. Si el precio se
negocia por email, **no hace falta** y se deja el `precio` base en `lib/data/apartments.ts`.
Recomendación: **no incluirla en la v1**; añadirla más adelante si el negocio lo pide.

### 5.5 RLS (Row-Level Security)

- **`solicitudes`:** RLS activo. `owner` tiene `SELECT/UPDATE` de todo
  (`using (is_owner())`). **No** se concede `INSERT/UPDATE` a `anon`: las altas y la
  confirmación por token pasan siempre por rutas de servidor con `service_role`.
- **`bloqueos_calendario`:** `owner` `ALL`. Lectura pública **no directa**: la disponibilidad
  se sirve por `GET /api/disponibilidad` (server), que solo expone rangos de fechas ocupadas,
  no filas completas.
- **`profiles`:** cada usuario ve/edita su fila (`id = auth.uid()`).

Helper reutilizable:

```sql
create or replace function is_owner() returns boolean
language sql security definer stable as $$
  select exists (
    select 1 from profiles where id = auth.uid() and rol = 'owner'
  );
$$;
```

---

## 6. Flujos principales

### 6.1 Solicitud de reserva / consulta (público)

```
Cliente rellena formulario (landing)
      │  (Zod valida en cliente y servidor; honeypot + rate-limit)
      ▼
POST /api/solicitudes                → inserta fila estado='pendiente_email'
      │                                 genera token + token_expira_en (p.ej. 24 h)
      ▼
Resend envía email "confirma tu solicitud" con enlace /solicitud/confirmar/[token]
      │
      ▼
Cliente pulsa el enlace
      ▼
POST /api/solicitudes/confirmar      → valida token no expirado
      │                                 estado → 'pendiente_gestion', confirmada_en=now()
      ├─► email al CLIENTE: "hemos recibido tu solicitud"
      └─► email al PROPIETARIO: "nueva solicitud pendiente"
```

Ventaja del doble opt-in: filtra bots y emails falsos **antes** de molestar al propietario, y
da consentimiento explícito (RGPD).

### 6.2 Gestión por el propietario (privado)

```
Owner entra en /owner/solicitudes (bandeja)
      ▼
Abre una solicitud pendiente
      ├─ Aceptar  → estado='aceptada', gestionada_en=now()
      │             + (si tipo='reserva') crea bloqueo_calendario(origen='solicitud')
      │             + email al cliente "solicitud aceptada"
      ├─ Rechazar → estado='rechazada' + email opcional al cliente
      └─ Nota interna (no se envía)
```

### 6.3 Disponibilidad

```
Datepicker del formulario (o calendario del panel)
      ▼
GET /api/disponibilidad?apartamento=slug
      ▼
Server lee bloqueos_calendario del apartamento y devuelve rangos ocupados
      ▼
El datepicker deshabilita esas fechas
```

### 6.4 Tareas programadas (Supabase Cron / `pg_cron`)

- **Expirar solicitudes:** cada hora, `update solicitudes set estado='expirada'
  where estado='pendiente_email' and token_expira_en < now()`.
- Alternativa sin `pg_cron`: un Cron Job de Vercel que pega a una ruta protegida.

---

## 7. Stack y dependencias

**Se mantiene:** Next.js 14 (App Router), Supabase (Postgres + Auth + RLS), Resend + React
Email, Tailwind, Vitest + Playwright, deploy en Vercel, `date-fns`, `react-day-picker`,
`lucide-react`, `leaflet` (mapa), `recharts` (métricas del dashboard, opcional).

**Se añade:** `zod` (validación de formularios/rutas), utilidad de **rate-limiting**
(Upstash Ratelimit si hay Redis, o una tabla `rate_limits` en Postgres para no añadir
infra).

**Se retira:** `stripe`, `@stripe/stripe-js`, `@anthropic-ai/sdk`, `nodemailer` (si todo el
email va por Resend). Revisar `zustand`: con el formulario controlado por React y sin estado
global complejo, probablemente **sobra**.

### Variables de entorno (nuevas / recortadas)

```
NEXT_PUBLIC_SUPABASE_URL            # proyecto Supabase NUEVO
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
RESEND_API_KEY
EMAIL_FROM                          # remitente verificado
OWNER_NOTIFICATION_EMAIL            # a dónde llegan los avisos de nuevas solicitudes
NEXT_PUBLIC_APP_URL
# Fuera: STRIPE_*, ANTHROPIC_API_KEY
```

---

## 8. Seguridad y privacidad

- **RGPD:** el doble opt-in es el consentimiento. Añadir checkbox de política de privacidad en
  el formulario y enlace a la política. Definir **retención**: purgar solicitudes `expiradas` /
  `rechazadas` a los N meses (cron).
- **Anti-spam:** honeypot + rate-limit por IP + validación estricta con Zod. Captcha
  (hCaptcha/Turnstile) solo si aparece abuso real.
- **Superficie mínima:** al quitar Stripe y la IA, desaparecen dos webhooks públicos y una
  clave de API cara. Menos endpoints públicos que auditar.
- **Secrets:** `service_role` solo en el servidor; nunca en componentes cliente.

---

## 9. Migración desde `main` / `new-concept` actual

Como es una **BD nueva**, no hay migración de datos de producción (el negocio aún no opera
online). El plan es de **código**, no de datos:

1. **Provisionar** el proyecto Supabase nuevo y aplicar las migraciones de §5 (una sola
   migración limpia `001_schema.sql`, sin arrastrar 001–004 de `main`).
2. **Podar el código muerto:** eliminar `app/api/checkout`, `app/api/webhooks/stripe`,
   `app/api/webhooks/chat-ia`, `app/api/conversaciones`, `app/owner/chat`, panel de usuario
   (`app/user`), `lib` de Stripe y de IA, plantillas de email de pago, tablas de tests
   asociadas.
3. **Renombrar** `consultas` → `solicitudes` (tabla, tipos, rutas, componentes,
   `lib/utils/consultas.ts`).
4. **Regenerar tipos:** `npx supabase gen types typescript --local > types/supabase.ts`.
5. **Actualizar** `middleware.ts` (solo protege `/owner`, un rol), `.env.example`,
   `package.json` (quitar deps), `CLAUDE.md` y archivar `MemoryBank/` M05/M06/M07/M09 como
   "no aplica en new-concept".
6. **Tests:** reescribir E2E de reserva-pago como E2E de solicitud-confirmación por email.

> Se puede hacer por fases: primero levantar la BD nueva y el flujo de `solicitudes`
> end-to-end, y solo cuando esté verde, borrar el código legado.

---

## 10. Roadmap sugerido

| Fase | Entregable | Estado |
|---|---|---|
| F0 | Proyecto Supabase nuevo + migración `001_schema.sql` + RLS | ⬜ |
| F1 | Formulario público + `POST /api/solicitudes` + validación Zod | 🟡 (base en `new-concept`) |
| F2 | Doble opt-in por email (Resend) + `/solicitud/confirmar/[token]` | 🟡 |
| F3 | Bandeja del propietario: listar / aceptar / rechazar | 🟡 |
| F4 | Calendario + `bloqueos_calendario` + `GET /api/disponibilidad` | ⬜ |
| F5 | Cron de expiración + retención RGPD | ⬜ |
| F6 | Poda de código legado (Stripe, IA, guest) + limpieza de deps | ⬜ |
| F7 | SEO técnico + analytics + hardening anti-spam | ⬜ |
| F8 | Suite de tests (Vitest + Playwright) verde + go-live | ⬜ |

> **Detalle operativo:** el plan por fases accionable (pasos, dependencias y criterios de
> "hecho") está en **`docs/PLAN_EJECUCION_NEW_CONCEPT.md`**. El **esquema de la BD nueva**, ya
> escrito y validado en seco, está en **`supabase/migrations/001_schema.sql`**.

---

## 11. Decisiones tomadas

**Decididas (2026-07-28):**
- **Fork:** repositorio **nuevo y separado en GitHub**; el original queda como archivo histórico.
- **BD:** proyecto Supabase **nuevo ya creado y aplicado** (`001_schema.sql`, región `eu-north-1`).
- **Precio dinámico:** ❌ **sin `precios_especiales` en v1** — el precio se negocia por email;
  precio base en `lib/data/apartments.ts`. Se añadirá si el negocio pide temporadas.
- **Rol:** un solo rol con privilegios (`owner`); el enum `user_role` deja abierto `staff`.
- **Idiomas:** 🇪🇸 **solo español** en v1. No se prepara i18n ni routing por idioma.
- **Rate-limit / anti-spam (F5):** **tabla `rate_limits` en Postgres**, sin Upstash/Redis
  (no se añade infraestructura externa).
- **Notificaciones al propietario:** **email + aviso en el dashboard**. Cuando una solicitud
  pasa a `pendiente_gestion` (cliente confirma su email), se envía un email al propietario
  (`GMAIL_USER`/SMTP) **y** aparece en el contador/lista de "pendientes de gestión" del panel
  (ya implementado en `/owner/dashboard`). Sin push por ahora.

---

*Fin del RFC. Esquema de BD congelado y aplicado; decisiones cerradas.*
