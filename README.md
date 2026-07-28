<p align="center">
  <img src="public/logo-rojo.png" alt="Apartamentos Rojo y Naranja" width="220" />
</p>

<h1 align="center">Apartamentos Rojo y Naranja</h1>

<p align="center">
  Web-escaparate de 4 apartamentos turísticos boutique en el centro histórico de Morella (Castellón).<br/>
  Solicitudes de reserva por email con doble confirmación y panel privado del propietario.
  Sin pagos online, sin chat, sin cuentas de invitado. Solo español.
</p>

---

## Qué es

Una landing rápida y con buen SEO donde el visitante:

1. Ve los 4 apartamentos (**Oro, Plata, Rojo, Naranja**) y sus fichas con galería.
2. Envía una **solicitud** (consulta o solicitud de reserva con fechas) desde un formulario.
3. **Confirma su email** pulsando un enlace (doble opt-in) — solo entonces la solicitud llega
   al propietario.

El **propietario** entra a un panel privado, ve las solicitudes pendientes y las **acepta o
rechaza**. El precio y el cierre de la reserva se negocian por email/teléfono, fuera de la web.

El diseño completo está en **[`docs/ARQUITECTURA_NEW_CONCEPT.md`](docs/ARQUITECTURA_NEW_CONCEPT.md)**
(RFC) y el plan por fases en **[`docs/PLAN_EJECUCION_NEW_CONCEPT.md`](docs/PLAN_EJECUCION_NEW_CONCEPT.md)**.

## Stack

Next.js 14 (App Router) · TypeScript · Supabase (PostgreSQL + Auth + RLS) · nodemailer (Gmail
SMTP) + React Email · Tailwind CSS · Leaflet · Cloudinary · Vitest + Playwright · Vercel.

## Puesta en marcha

### 1. Requisitos

- Node.js 20+
- Un proyecto **Supabase** (base de datos vacía)
- Una cuenta de Gmail con **contraseña de aplicación** para el envío de emails

### 2. Instalar y configurar el entorno

```bash
npm install
cp .env.example .env.local
```

Rellena `.env.local` con las claves de tu proyecto Supabase y el email:

```
NEXT_PUBLIC_SUPABASE_URL=https://<tu-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
GMAIL_USER=tu-cuenta@gmail.com
GMAIL_APP_PASSWORD=...          # contraseña de aplicación de Google
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Aplicar el esquema de la base de datos

En el **SQL Editor** de tu proyecto Supabase, ejecuta el contenido de
[`supabase/migrations/001_schema.sql`](supabase/migrations/001_schema.sql). Crea las 3 tablas
(`profiles`, `solicitudes`, `bloqueos_calendario`), sus enums, la función `is_owner()` y las
políticas RLS. La base de datos debe estar vacía (es un esquema desde cero).

### 4. Crear el usuario propietario

El acceso al panel es solo para el propietario. Créalo en **Authentication → Users** (con email
confirmado) e inserta su fila en `profiles`:

```sql
insert into profiles (id, email, nombre, rol)
values ('<uuid-del-usuario-en-auth>', 'tu-cuenta@gmail.com', 'Rojo y Naranja', 'owner');
```

### 5. Arrancar

```bash
npm run dev     # http://localhost:3000
```

- Landing pública en `/`.
- Panel del propietario en `/login` → `/owner/dashboard`.

## Estructura

```
app/(public)/     Landing, fichas apartamentos/[slug], solicitud/confirmar/[token]
app/(auth)/       login, reset-password (solo propietario)
app/owner/        dashboard, solicitudes (protegido por middleware)
app/api/          solicitudes (POST), disponibilidad (GET), owner/solicitudes/[id]/{aceptar,rechazar}
components/       landing/, owner/, layout/, ui/
lib/              supabase/ (client·server·admin), data/apartments.ts, email/, utils/
emails/           plantillas React Email
supabase/migrations/001_schema.sql   esquema de la BD
docs/             RFC de arquitectura y plan de ejecución por fases
```

Los 4 apartamentos son **estáticos** (`lib/data/apartments.ts`): no hay tabla `apartamentos`,
se referencian por `slug`.

## Comandos

```bash
npm run dev        npm run build       npm start
npm run lint       npm test            npm run test:e2e
```

## Estado del proyecto

Implementado (F0–F3): BD nueva aplicada, landing, fichas, formulario de solicitud con doble
opt-in, y panel del propietario (dashboard + bandeja con aceptar/rechazar). Verificado de
extremo a extremo.

Pendiente (ver el plan de ejecución): **F4** calendario de bloqueos + aviso por email al
propietario · **F5** anti-spam (Zod + honeypot + rate-limit con tabla Postgres) + expiración +
RGPD · **F6** SEO + analytics + tests + go-live.

> Este repositorio es el **fork limpio** del proyecto original (una plataforma con Stripe, chat
> IA y registro de usuarios). Todo ese legacy se ha eliminado.
