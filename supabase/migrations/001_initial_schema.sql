-- ============================================================
-- 001_initial_schema.sql
-- Esquema inicial: tablas y relaciones
-- Proyecto: Apartamentos Rojo y Naranja
-- ============================================================

-- ----------------------------------------------------------------
-- profiles (extiende auth.users)
-- ----------------------------------------------------------------
CREATE TABLE profiles (
  id          uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nombre      text NOT NULL,
  apellidos   text,
  telefono    text,
  rol         text NOT NULL DEFAULT 'user'
                CHECK (rol IN ('user', 'owner')),
  avatar_url  text,
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now()
);

-- ----------------------------------------------------------------
-- apartamentos
-- ----------------------------------------------------------------
CREATE TABLE apartamentos (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug               text UNIQUE NOT NULL
                       CHECK (slug IN ('rojo', 'naranja', 'plata', 'oro')),
  nombre             text NOT NULL,
  descripcion        text,
  capacidad_min      int NOT NULL DEFAULT 1,
  capacidad_max      int NOT NULL,
  num_habitaciones   int,
  num_banos          int,
  acepta_ninos       boolean DEFAULT true,
  precio_noche_base  numeric(10,2) NOT NULL,
  fotos              text[],
  amenities          text[],
  activo             boolean DEFAULT true,
  created_at         timestamptz DEFAULT now()
);

-- ----------------------------------------------------------------
-- precios_especiales
-- ----------------------------------------------------------------
CREATE TABLE precios_especiales (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  apartamento_id  uuid NOT NULL REFERENCES apartamentos(id) ON DELETE CASCADE,
  nombre          text NOT NULL,
  fecha_inicio    date NOT NULL,
  fecha_fin       date NOT NULL,
  precio_noche    numeric(10,2) NOT NULL,
  notas           text,
  CONSTRAINT precios_fechas_check CHECK (fecha_fin >= fecha_inicio)
);

-- ----------------------------------------------------------------
-- bloqueos_calendario
-- ----------------------------------------------------------------
CREATE TABLE bloqueos_calendario (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  apartamento_id  uuid NOT NULL REFERENCES apartamentos(id) ON DELETE CASCADE,
  fecha_inicio    date NOT NULL,
  fecha_fin       date NOT NULL,
  motivo          text,
  created_at      timestamptz DEFAULT now(),
  CONSTRAINT bloqueos_fechas_check CHECK (fecha_fin >= fecha_inicio)
);

-- ----------------------------------------------------------------
-- reservas
-- ----------------------------------------------------------------
CREATE SEQUENCE reserva_codigo_seq;

CREATE TABLE reservas (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo             text UNIQUE NOT NULL,
  user_id            uuid REFERENCES profiles(id),
  apartamento_id     uuid REFERENCES apartamentos(id),
  fecha_checkin      date NOT NULL,
  fecha_checkout     date NOT NULL,
  num_huespedes      int NOT NULL,
  precio_total       numeric(10,2) NOT NULL,
  estado             text NOT NULL DEFAULT 'pendiente_pago'
                       CHECK (estado IN (
                         'pendiente_pago',
                         'pendiente_confirmacion',
                         'confirmada',
                         'anulada',
                         'completada'
                       )),
  notas_usuario      text,
  notas_propietario  text,
  stripe_session_id  text,
  created_at         timestamptz DEFAULT now(),
  updated_at         timestamptz DEFAULT now(),
  CONSTRAINT reservas_fechas_check CHECK (fecha_checkout > fecha_checkin)
);

-- ----------------------------------------------------------------
-- pagos
-- ----------------------------------------------------------------
CREATE TABLE pagos (
  id                       uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reserva_id               uuid REFERENCES reservas(id),
  stripe_payment_intent_id text UNIQUE,
  importe                  numeric(10,2) NOT NULL,
  moneda                   text DEFAULT 'eur',
  estado                   text NOT NULL
                             CHECK (estado IN ('pendiente', 'completado', 'reembolsado', 'fallido')),
  tipo                     text CHECK (tipo IN ('señal', 'total')),
  created_at               timestamptz DEFAULT now()
);

-- ----------------------------------------------------------------
-- conversaciones
-- ----------------------------------------------------------------
CREATE TABLE conversaciones (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid REFERENCES profiles(id),
  reserva_id  uuid REFERENCES reservas(id),
  modo_ia     boolean DEFAULT false,
  ia_contexto text,
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now()
);

-- ----------------------------------------------------------------
-- mensajes
-- ----------------------------------------------------------------
CREATE TABLE mensajes (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversacion_id  uuid NOT NULL REFERENCES conversaciones(id) ON DELETE CASCADE,
  remitente        text NOT NULL
                     CHECK (remitente IN ('user', 'owner', 'ia')),
  contenido        text NOT NULL,
  leido            boolean DEFAULT false,
  created_at       timestamptz DEFAULT now()
);

-- ----------------------------------------------------------------
-- Índices de rendimiento
-- ----------------------------------------------------------------
CREATE INDEX idx_reservas_user_id       ON reservas(user_id);
CREATE INDEX idx_reservas_apartamento   ON reservas(apartamento_id);
CREATE INDEX idx_reservas_estado        ON reservas(estado);
CREATE INDEX idx_reservas_fechas        ON reservas(fecha_checkin, fecha_checkout);
CREATE INDEX idx_bloqueos_apartamento   ON bloqueos_calendario(apartamento_id);
CREATE INDEX idx_precios_apartamento    ON precios_especiales(apartamento_id);
CREATE INDEX idx_mensajes_conversacion  ON mensajes(conversacion_id);
CREATE INDEX idx_conversaciones_user    ON conversaciones(user_id);
