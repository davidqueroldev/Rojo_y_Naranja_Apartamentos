-- ============================================================
-- 002_rls_policies.sql
-- Row-Level Security: habilitar RLS y definir políticas
-- ============================================================

-- ----------------------------------------------------------------
-- Habilitar RLS en todas las tablas
-- ----------------------------------------------------------------
ALTER TABLE profiles           ENABLE ROW LEVEL SECURITY;
ALTER TABLE apartamentos       ENABLE ROW LEVEL SECURITY;
ALTER TABLE precios_especiales ENABLE ROW LEVEL SECURITY;
ALTER TABLE bloqueos_calendario ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservas           ENABLE ROW LEVEL SECURITY;
ALTER TABLE pagos              ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversaciones     ENABLE ROW LEVEL SECURITY;
ALTER TABLE mensajes           ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------------
-- Helper: comprobar si el usuario actual es owner
-- ----------------------------------------------------------------
CREATE OR REPLACE FUNCTION is_owner()
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND rol = 'owner'
  )
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ================================================================
-- POLÍTICAS: profiles
-- ================================================================

-- Usuario ve y edita solo su propio perfil
CREATE POLICY "profiles_select_own" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Owner ve todos los perfiles
CREATE POLICY "profiles_select_owner" ON profiles
  FOR SELECT USING (is_owner());

-- El insert lo hace el trigger on_auth_user_created (SECURITY DEFINER)
-- No se necesita política de INSERT para usuarios normales

-- ================================================================
-- POLÍTICAS: apartamentos
-- ================================================================

-- Lectura pública (no requiere autenticación)
CREATE POLICY "apartamentos_public_read" ON apartamentos
  FOR SELECT USING (true);

-- Owner puede crear, editar y eliminar
CREATE POLICY "apartamentos_owner_write" ON apartamentos
  FOR ALL USING (is_owner());

-- ================================================================
-- POLÍTICAS: precios_especiales
-- ================================================================

-- Lectura pública (necesario para mostrar precios correctos)
CREATE POLICY "precios_public_read" ON precios_especiales
  FOR SELECT USING (true);

-- Owner gestiona los precios especiales
CREATE POLICY "precios_owner_write" ON precios_especiales
  FOR ALL USING (is_owner());

-- ================================================================
-- POLÍTICAS: bloqueos_calendario
-- ================================================================

-- Lectura pública (necesario para la disponibilidad)
CREATE POLICY "bloqueos_public_read" ON bloqueos_calendario
  FOR SELECT USING (true);

-- Owner gestiona los bloqueos
CREATE POLICY "bloqueos_owner_write" ON bloqueos_calendario
  FOR ALL USING (is_owner());

-- ================================================================
-- POLÍTICAS: reservas
-- ================================================================

-- Usuario ve solo sus reservas
CREATE POLICY "reservas_select_own" ON reservas
  FOR SELECT USING (auth.uid() = user_id);

-- Usuario puede crear reservas a su nombre
CREATE POLICY "reservas_insert_own" ON reservas
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Owner ve y gestiona todas las reservas
CREATE POLICY "reservas_owner_all" ON reservas
  FOR ALL USING (is_owner());

-- ================================================================
-- POLÍTICAS: pagos
-- ================================================================

-- Usuario ve los pagos de sus propias reservas
CREATE POLICY "pagos_select_own" ON pagos
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM reservas r
      WHERE r.id = reserva_id AND r.user_id = auth.uid()
    )
  );

-- Owner ve y gestiona todos los pagos
CREATE POLICY "pagos_owner_all" ON pagos
  FOR ALL USING (is_owner());

-- ================================================================
-- POLÍTICAS: conversaciones
-- ================================================================

-- Usuario ve sus propias conversaciones
CREATE POLICY "conversaciones_select_own" ON conversaciones
  FOR SELECT USING (auth.uid() = user_id);

-- Usuario puede iniciar una conversación
CREATE POLICY "conversaciones_insert_own" ON conversaciones
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Owner ve y gestiona todas las conversaciones
CREATE POLICY "conversaciones_owner_all" ON conversaciones
  FOR ALL USING (is_owner());

-- ================================================================
-- GRANTS para la Data API de Supabase
-- Sin estos GRANT las tablas no son accesibles vía REST/GraphQL
-- aunque RLS esté configurado correctamente.
-- ================================================================

-- anon: solo puede leer apartamentos, precios y bloqueos (público)
GRANT SELECT ON apartamentos        TO anon;
GRANT SELECT ON precios_especiales  TO anon;
GRANT SELECT ON bloqueos_calendario TO anon;

-- authenticated: acceso completo a las tablas de usuario
-- (RLS se encarga de restringir qué filas ve cada uno)
GRANT SELECT, INSERT, UPDATE        ON profiles             TO authenticated;
GRANT SELECT                        ON apartamentos         TO authenticated;
GRANT SELECT                        ON precios_especiales   TO authenticated;
GRANT SELECT                        ON bloqueos_calendario  TO authenticated;
GRANT SELECT, INSERT                ON reservas             TO authenticated;
GRANT SELECT                        ON pagos                TO authenticated;
GRANT SELECT, INSERT, UPDATE        ON conversaciones       TO authenticated;
GRANT SELECT, INSERT                ON mensajes             TO authenticated;

-- ================================================================
-- POLÍTICAS: mensajes
-- ================================================================

-- Usuario ve mensajes de sus conversaciones
CREATE POLICY "mensajes_select_own" ON mensajes
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM conversaciones c
      WHERE c.id = conversacion_id AND c.user_id = auth.uid()
    )
  );

-- Usuario puede enviar mensajes en sus conversaciones
CREATE POLICY "mensajes_insert_own" ON mensajes
  FOR INSERT WITH CHECK (
    auth.uid() = (
      SELECT user_id FROM conversaciones WHERE id = conversacion_id
    )
  );

-- Owner ve y gestiona todos los mensajes (incluye insertar como 'owner')
CREATE POLICY "mensajes_owner_all" ON mensajes
  FOR ALL USING (is_owner());
