# Plan de ejecución — new-concept (fork + BD limpia)

> **Complementa a:** `docs/ARQUITECTURA_NEW_CONCEPT.md` (RFC de diseño).
> **Esquema de la BD nueva:** `supabase/migrations-new/001_schema.sql`.
> **Decisiones tomadas:** fork = **repositorio nuevo separado en GitHub**; la BD Supabase
> nueva **ya está creada** (claves en poder del propietario); el precio se negocia por
> email (**sin `precios_especiales` en v1**); un solo rol con privilegios (`owner`).

Este documento traduce el roadmap del RFC (§10) en pasos operativos accionables, con
dependencias y criterios de "hecho". Las fases se ejecutan en sesiones siguientes.

---

## Estado de partida (qué ya existe en `new-concept`)

- ✅ Landing reestructurada, fichas de apartamento, formulario de solicitud (solo reserva),
  doble opt-in por email, panel del propietario con bandeja de consultas.
- ✅ Tabla `consultas` (equivalente a `solicitudes`) en la **BD actual** vía
  `005_consultas.sql`. En la BD nueva se sustituye por `001_schema.sql`.
- ✅ Arreglo de anulación de reservas con Stripe congelado.
- ⚠️ Código legado aún presente: Stripe, chat/IA, panel de usuario (`app/user`), migraciones
  001–005. Se poda en F3.
- ⚠️ El esquema nuevo (`001_schema.sql`) está preparado y **validado en seco** (sqlglot +
  checks estructurales) pero **no aplicado** a ninguna BD.

---

## F0 — Base de datos nueva  *(bloquea F2, F4)*

**Objetivo:** dejar la BD Supabase nueva operativa con el esquema limpio.

Pasos:
1. El propietario entrega las claves del proyecto Supabase nuevo (o las coloca en `.env.local`):
   `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
2. Aplicar `supabase/migrations-new/001_schema.sql` a la BD nueva (SQL Editor de Supabase, o
   `psql`/CLI con la connection string). **No** aplicar las migraciones legacy 001–005.
3. Crear el usuario propietario en Auth (email + contraseña) e insertar su fila en `profiles`
   con `rol='owner'` (el proyecto original no tiene trigger de auto-perfil en este esquema, se
   hace a mano o con un pequeño script `service_role`).
4. Regenerar tipos: `npx supabase gen types typescript --local > types/supabase.ts`
   (o `--project-id <ref>` contra el proyecto nuevo).

**Hecho cuando:** una consulta `select` a `solicitudes`/`bloqueos_calendario` responde vacío
sin error, y `is_owner()` devuelve `true` para el propietario autenticado.

---

## F1 — Repositorio nuevo en GitHub  *(independiente de F0)*

**Objetivo:** repo separado que arranque desde `new-concept`, dejando el original como archivo.

Pasos:
1. Crear el repo nuevo en GitHub (vía MCP de GitHub o `gh`), vacío.
2. Empujar el contenido de `new-concept` como rama principal del repo nuevo (historia limpia o
   preservada, a decidir). El esquema `001_schema.sql` se moverá a `supabase/migrations/` del
   repo nuevo (sin las 001–005 legacy, que se podan en F3).
3. Configurar `.env.local` del repo nuevo apuntando a la **BD nueva** (F0) y a Resend.
4. Conectar despliegue (Vercel) del repo nuevo a su rama principal.

**Hecho cuando:** el repo nuevo compila (`npm run build`) apuntando a la BD nueva y el original
queda intacto.

---

## F2 — Renombrar `consultas → solicitudes`  *(depende de F0)*

**Objetivo:** alinear el código con el esquema nuevo.

Pasos (patrón de renombrado, mismo en cada capa):
- Rutas: `app/api/consultas` → `app/api/solicitudes`; `app/(public)/confirmar-consulta/[token]`
  → `.../solicitud/confirmar/[token]`; `app/owner/consultas` → `app/owner/solicitudes`.
- API owner: `app/api/owner/consultas/[id]/{aceptar,cancelar}` → `.../solicitudes/[id]/{aceptar,rechazar}`
  (nuevo estado `rechazada`), más `.../cancelar` si se mantiene.
- Componentes: `components/landing/ConsultaSection.tsx` → `SolicitudSection.tsx`;
  `components/owner/ConsultaAccionesButtons.tsx` → `SolicitudAccionesButtons.tsx`.
- Utilidades/tipos: `lib/utils/consultas.ts` → `solicitudes.ts`; estado
  `pendiente_confirmacion` → `pendiente_gestion`; añadir `rechazada`, `num_huespedes`,
  `nota_interna`.
- Emails: renombrar y adaptar `ConsultaConfirmacionEmail` → `SolicitudConfirmacionEmail`.

**Hecho cuando:** el flujo público (crear → email → confirmar) y el del propietario (aceptar/
rechazar) funcionan de extremo a extremo contra la BD nueva; `tsc`, `lint` y tests en verde.

---

## F3 — Poda de código legado  *(independiente; hacer tras F2 para no romper imports)*

**Objetivo:** eliminar todo lo que el nuevo concepto no usa.

Borrar: `app/api/checkout`, `app/api/webhooks/stripe`, `app/api/webhooks/chat-ia`,
`app/api/conversaciones`, `app/owner/chat`, `app/user`, `components/chat`, `lib/stripe`,
`lib/ia`, `components/booking/BookingWidget.tsx`, plantillas de email de pago
(`ReservaConfirmadaEmail`, `PagoRecibidoEmail`, etc. según se reemplacen), migraciones legacy
`supabase/migrations/001–005` (el esquema vivo es `001_schema.sql`), tablas de tests asociadas.

`package.json`: quitar `stripe`, `@stripe/stripe-js`, `@anthropic-ai/sdk`; revisar si
`zustand` y `nodemailer` siguen haciendo falta (email por Resend → probablemente fuera
`nodemailer`). Limpiar `.env.example` (fuera `STRIPE_*`, `ANTHROPIC_API_KEY`).

**Hecho cuando:** `npm run build` pasa sin referencias colgantes y no queda ningún import a los
módulos borrados.

---

## F4 — Calendario y disponibilidad  *(depende de F0)*

**Objetivo:** disponibilidad real basada en `bloqueos_calendario`.

Pasos:
- `GET /api/disponibilidad?apartamento=slug`: leer `bloqueos_calendario` del apartamento y
  devolver rangos ocupados (reaprovecha el patrón del endpoint actual, cambiando el origen de
  datos de `reservas`/`bloqueos` viejos al nuevo `bloqueos_calendario`).
- Acción "aceptar solicitud" (F2): al aceptar una `reserva`, crear en **transacción** el
  `bloqueos_calendario` con `origen='solicitud'` y `solicitud_id`.
- Panel `app/owner/calendario`: alta/baja de bloqueos manuales (`origen='manual'`).

**Hecho cuando:** aceptar una solicitud bloquea las fechas y el datepicker público las
deshabilita.

---

## F5 — Anti-spam / RGPD  *(independiente)*

- Validación con **Zod** en las rutas públicas (`lib/validation/`), honeypot en el formulario,
  rate-limit por IP (tabla `rate_limits` en Postgres para no añadir infra, o Upstash si hay Redis).
- Checkbox de política de privacidad + enlace en el formulario.
- Cron de expiración: `update solicitudes set estado='expirada' where estado='pendiente_email'
  and token_expira_en < now()` (Supabase `pg_cron` o Cron Job de Vercel a una ruta protegida).
- Retención: purgar `expiradas`/`rechazadas` a los N meses.

**Hecho cuando:** una petición malformada o abusiva se rechaza; las solicitudes sin confirmar
pasan a `expirada` automáticamente.

---

## F6 — SEO, analytics, tests y go-live  *(final)*

- SEO técnico (metadatos, sitemap, structured data de las fichas), analytics ligero de
  conversión del formulario.
- Reescribir E2E: de "reserva-pago" a "solicitud-confirmación por email"; unit tests de las
  utilidades nuevas. `Vitest` + `Playwright` en verde.
- Despliegue del repo nuevo a producción.

---

## Mapa de dependencias

```
F0 (BD nueva) ──► F2 (renombrar) ──► F4 (calendario)
     │                 │
     │                 └──► F3 (poda)  [tras F2 para no romper imports]
     │
F1 (repo nuevo) ── independiente ──► despliegue en F1/F6
F5 (anti-spam) ── independiente
F6 (SEO/tests/go-live) ── requiere F2–F5 estables
```

**Orden recomendado:** F0 → F1 → F2 → F3 → F4 → F5 → F6.
