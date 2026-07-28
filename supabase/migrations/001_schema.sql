-- ============================================================
-- 001_schema.sql  ·  new-concept (base de datos NUEVA y limpia)
-- ------------------------------------------------------------
-- Esquema desde cero para el fork "new-concept" de Apartamentos
-- Rojo y Naranja. No arrastra las migraciones 001–005 del proyecto
-- original: sin pagos (Stripe), sin chat/IA, sin cuentas de invitado.
--
-- Modelo: web-escaparate + formulario de solicitud/consulta con
-- doble opt-in por email + panel privado del propietario con
-- calendario de disponibilidad.
--
-- Referencia de diseño: docs/ARQUITECTURA_NEW_CONCEPT.md (§5)
-- Aplicar sobre un proyecto Supabase NUEVO (BD vacía).
-- ============================================================

-- ------------------------------------------------------------
-- Extensiones
-- ------------------------------------------------------------
create extension if not exists pgcrypto;   -- gen_random_uuid()

-- ------------------------------------------------------------
-- Tipos enumerados
-- ------------------------------------------------------------
create type user_role        as enum ('owner');                 -- ampliable a 'staff'
create type solicitud_tipo   as enum ('generica', 'reserva');
create type solicitud_estado as enum (
  'pendiente_email',        -- creada; esperando que el cliente confirme su email
  'pendiente_gestion',      -- email confirmado; esperando al propietario
  'aceptada',
  'rechazada',
  'cancelada',
  'expirada'                -- el token de confirmación caducó sin usarse
);
create type bloqueo_origen   as enum ('manual', 'solicitud');

-- ------------------------------------------------------------
-- Utilidad: updated_at automático
-- ------------------------------------------------------------
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- ============================================================
-- profiles  (extiende auth.users; en la práctica, 1 fila: el owner)
-- ============================================================
create table profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  email      text not null,
  nombre     text,
  rol        user_role not null default 'owner',
  created_at timestamptz not null default now()
);

-- Helper: ¿el usuario actual es propietario?
-- security definer para poder leer profiles saltando su propio RLS.
create or replace function is_owner()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and rol = 'owner'
  );
$$;

-- ============================================================
-- solicitudes  (antes 'consultas')
-- Consulta genérica o solicitud de reserva, sin cuenta de usuario,
-- con doble opt-in por email.
-- ============================================================
create table solicitudes (
  id                 uuid primary key default gen_random_uuid(),
  tipo               solicitud_tipo not null,

  -- Datos de contacto
  nombre             text not null,
  apellidos          text,
  telefono           text not null,
  email              text not null,

  -- Solo para tipo = 'reserva'
  apartamento_slug   text,                 -- referencia lógica a lib/data/apartments.ts
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

  constraint solicitudes_reserva_fechas_check check (
    tipo <> 'reserva'
    or (fecha_checkin is not null
        and fecha_checkout is not null
        and fecha_checkout > fecha_checkin)
  ),
  constraint solicitudes_reserva_apartamento_check check (
    tipo <> 'reserva' or apartamento_slug is not null
  )
);

create index idx_solicitudes_estado      on solicitudes(estado);
create index idx_solicitudes_apartamento on solicitudes(apartamento_slug);
create index idx_solicitudes_fechas      on solicitudes(fecha_checkin, fecha_checkout)
  where tipo = 'reserva';

create trigger solicitudes_updated_at
  before update on solicitudes
  for each row execute function set_updated_at();

-- ============================================================
-- bloqueos_calendario
-- Fechas no disponibles: fijadas por el propietario (mantenimiento,
-- uso propio) o generadas al aceptar una solicitud de reserva.
-- Alimenta el datepicker público y el calendario del panel.
-- ============================================================
create table bloqueos_calendario (
  id               uuid primary key default gen_random_uuid(),
  apartamento_slug text not null,
  fecha_inicio     date not null,
  fecha_fin        date not null,
  origen           bloqueo_origen not null default 'manual',
  solicitud_id     uuid references solicitudes(id) on delete set null,
  motivo           text,
  created_at       timestamptz not null default now(),
  constraint bloqueos_fechas_check check (fecha_fin > fecha_inicio)
);

create index idx_bloqueos_apartamento on bloqueos_calendario(apartamento_slug);
create index idx_bloqueos_fechas      on bloqueos_calendario(fecha_inicio, fecha_fin);

-- ============================================================
-- Row-Level Security
-- ------------------------------------------------------------
-- Principio: las escrituras públicas (alta de solicitud, confirmación
-- por token) se hacen SIEMPRE desde rutas de servidor con el cliente
-- service_role (bypassa RLS). El público no tiene sesión, así que no
-- se conceden INSERT/UPDATE a anon/authenticated sobre solicitudes.
-- La disponibilidad se sirve por GET /api/disponibilidad (server),
-- que solo expone rangos de fechas ocupadas, no filas completas.
-- ============================================================
alter table profiles            enable row level security;
alter table solicitudes         enable row level security;
alter table bloqueos_calendario enable row level security;

-- profiles: cada usuario ve/edita su propia fila
create policy "profiles_select_own" on profiles
  for select using (auth.uid() = id);
create policy "profiles_update_own" on profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- solicitudes: solo el propietario (vía RLS). Sin grants a anon.
create policy "solicitudes_owner_all" on solicitudes
  for all using (is_owner());

-- bloqueos_calendario: solo el propietario gestiona (lectura pública
-- va por la ruta de disponibilidad con service_role).
create policy "bloqueos_owner_all" on bloqueos_calendario
  for all using (is_owner());

-- ------------------------------------------------------------
-- Grants para la Data API de Supabase.
-- El propietario usa el cliente authenticated (sujeto a RLS).
-- anon no recibe ningún privilegio: todo lo público pasa por
-- service_role en rutas de servidor.
-- ------------------------------------------------------------
grant select, insert, update on profiles            to authenticated;
grant select, update         on solicitudes         to authenticated;
grant select, insert, update, delete on bloqueos_calendario to authenticated;
