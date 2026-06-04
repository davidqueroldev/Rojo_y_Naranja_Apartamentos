-- ============================================================
-- 003_functions_triggers.sql
-- Funciones SQL y triggers de la aplicación
-- ============================================================

-- ================================================================
-- TRIGGER: crear perfil al registrarse un usuario nuevo
-- ================================================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, nombre, rol)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nombre', 'Usuario'),
    'user'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ================================================================
-- TRIGGER: auto-generar código de reserva (ARN-YYYY-NNNN)
-- ================================================================
CREATE OR REPLACE FUNCTION generate_reserva_codigo()
RETURNS trigger AS $$
BEGIN
  NEW.codigo := 'ARN-' || to_char(now(), 'YYYY') || '-'
                || LPAD(nextval('reserva_codigo_seq')::text, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_reserva_codigo
  BEFORE INSERT ON reservas
  FOR EACH ROW
  WHEN (NEW.codigo IS NULL OR NEW.codigo = '')
  EXECUTE FUNCTION generate_reserva_codigo();

-- ================================================================
-- TRIGGER: updated_at automático en profiles, reservas, conversaciones
-- ================================================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER reservas_updated_at
  BEFORE UPDATE ON reservas
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER conversaciones_updated_at
  BEFORE UPDATE ON conversaciones
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ================================================================
-- FUNCIÓN: calcular precio total de una reserva
-- Tiene en cuenta precios especiales por rango de fechas.
-- ================================================================
CREATE OR REPLACE FUNCTION calcular_precio_reserva(
  p_apartamento_id uuid,
  p_fecha_inicio   date,
  p_fecha_fin      date
) RETURNS numeric AS $$
DECLARE
  total      numeric := 0;
  dia        date;
  precio_dia numeric;
BEGIN
  dia := p_fecha_inicio;
  WHILE dia < p_fecha_fin LOOP
    -- Precio especial vigente ese día (el más específico si hay solapamiento)
    SELECT pe.precio_noche INTO precio_dia
    FROM precios_especiales pe
    WHERE pe.apartamento_id = p_apartamento_id
      AND dia BETWEEN pe.fecha_inicio AND pe.fecha_fin
    ORDER BY pe.fecha_inicio DESC
    LIMIT 1;

    -- Fallback al precio base del apartamento
    IF precio_dia IS NULL THEN
      SELECT a.precio_noche_base INTO precio_dia
      FROM apartamentos a
      WHERE a.id = p_apartamento_id;
    END IF;

    total := total + precio_dia;
    dia   := dia + INTERVAL '1 day';
  END LOOP;

  RETURN total;
END;
$$ LANGUAGE plpgsql STABLE;

-- ================================================================
-- FUNCIÓN: comprobar disponibilidad de un apartamento
-- Devuelve true si las fechas están libres (sin reservas activas
-- ni bloqueos del propietario).
-- ================================================================
CREATE OR REPLACE FUNCTION check_disponibilidad(
  p_apartamento_id uuid,
  p_fecha_inicio   date,
  p_fecha_fin      date,
  p_reserva_id     uuid DEFAULT NULL  -- excluir si se está editando
) RETURNS boolean AS $$
BEGIN
  -- Verificar solapamiento con reservas activas
  IF EXISTS (
    SELECT 1 FROM reservas r
    WHERE r.apartamento_id = p_apartamento_id
      AND r.estado NOT IN ('anulada', 'completada')
      AND (p_reserva_id IS NULL OR r.id <> p_reserva_id)
      AND r.fecha_checkin  < p_fecha_fin
      AND r.fecha_checkout > p_fecha_inicio
  ) THEN
    RETURN false;
  END IF;

  -- Verificar solapamiento con bloqueos del propietario
  IF EXISTS (
    SELECT 1 FROM bloqueos_calendario b
    WHERE b.apartamento_id = p_apartamento_id
      AND b.fecha_inicio < p_fecha_fin
      AND b.fecha_fin    > p_fecha_inicio
  ) THEN
    RETURN false;
  END IF;

  RETURN true;
END;
$$ LANGUAGE plpgsql STABLE;
