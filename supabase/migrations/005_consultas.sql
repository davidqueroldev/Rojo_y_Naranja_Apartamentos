-- ============================================================
-- 005_consultas.sql
-- Nuevo módulo: consultas genéricas y solicitudes de reserva
-- sin registro de usuario (doble confirmación por email).
-- No modifica ninguna tabla existente.
-- ============================================================

-- ----------------------------------------------------------------
-- consultas
-- ----------------------------------------------------------------
CREATE TABLE consultas (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tipo                text NOT NULL
                        CHECK (tipo IN ('generica', 'reserva')),
  nombre              text NOT NULL,
  apellidos           text,
  telefono            text NOT NULL,
  email               text NOT NULL,
  apartamento_id      uuid REFERENCES apartamentos(id) ON DELETE SET NULL,
  fecha_checkin       date,
  fecha_checkout      date,
  mensaje             text,
  estado              text NOT NULL DEFAULT 'pendiente_email'
                        CHECK (estado IN (
                          'pendiente_email',
                          'pendiente_confirmacion',
                          'aceptada',
                          'cancelada',
                          'expirada'
                        )),
  token_confirmacion  text UNIQUE,
  token_expira_en     timestamptz,
  confirmada_en       timestamptz,
  gestionada_en       timestamptz,
  created_at          timestamptz DEFAULT now(),
  updated_at          timestamptz DEFAULT now(),
  CONSTRAINT consultas_reserva_fechas_check CHECK (
    tipo <> 'reserva'
    OR (fecha_checkin IS NOT NULL AND fecha_checkout IS NOT NULL AND fecha_checkout > fecha_checkin)
  ),
  CONSTRAINT consultas_reserva_apartamento_check CHECK (
    tipo <> 'reserva' OR apartamento_id IS NOT NULL
  )
);

-- ----------------------------------------------------------------
-- Índices
-- ----------------------------------------------------------------
CREATE INDEX idx_consultas_estado       ON consultas(estado);
CREATE INDEX idx_consultas_apartamento  ON consultas(apartamento_id);
CREATE INDEX idx_consultas_fechas       ON consultas(fecha_checkin, fecha_checkout) WHERE tipo = 'reserva';

-- ----------------------------------------------------------------
-- updated_at automático (reutiliza set_updated_at() de 003_functions_triggers.sql)
-- ----------------------------------------------------------------
CREATE TRIGGER consultas_updated_at
  BEFORE UPDATE ON consultas
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ----------------------------------------------------------------
-- RLS
-- Las escrituras públicas (crear consulta, confirmar por token) se
-- hacen siempre desde rutas de servidor con el cliente admin
-- (service role, bypassa RLS) — igual que los webhooks existentes.
-- No hay sesión de invitado, así que no se conceden permisos de
-- INSERT/UPDATE a anon/authenticated sobre esta tabla.
-- ----------------------------------------------------------------
ALTER TABLE consultas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "consultas_owner_all" ON consultas
  FOR ALL USING (is_owner());

GRANT SELECT, UPDATE ON consultas TO authenticated;
