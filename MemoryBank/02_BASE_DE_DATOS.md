# 02 · BASE DE DATOS (SUPABASE / POSTGRESQL)
> Banco de memoria — Apartamentos Rojo y Naranja
> Sprint asociado: S2

---

## CONTEXTO RÁPIDO

Base de datos PostgreSQL gestionada por Supabase. RLS habilitado en todas las tablas. Los 4 apartamentos son: **Rojo** (4p), **Naranja** (4p), **Plata** (2p, sin niños), **Ático Oro** (2p, sin niños).

---

## ESTADO ACTUAL

- 🔄 En progreso — Diseño del esquema
- ⬜ Pendiente — Migraciones creadas en `/supabase/migrations/`
- ⬜ Pendiente — RLS activado y políticas definidas
- ⬜ Pendiente — Seed de los 4 apartamentos
- ⬜ Pendiente — Tipos TypeScript generados

---

## ESQUEMA DE TABLAS

### `profiles` ← extiende `auth.users`
```sql
CREATE TABLE profiles (
  id            uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nombre        text NOT NULL,
  apellidos     text,
  telefono      text,
  rol           text NOT NULL DEFAULT 'user',  -- 'user' | 'owner'
  avatar_url    text,
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now()
);
```

### `apartamentos`
```sql
CREATE TABLE apartamentos (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug              text UNIQUE NOT NULL,   -- 'rojo' | 'naranja' | 'plata' | 'oro'
  nombre            text NOT NULL,
  descripcion       text,
  capacidad_min     int NOT NULL DEFAULT 1,
  capacidad_max     int NOT NULL,
  num_habitaciones  int,
  num_banos         int,
  acepta_ninos      boolean DEFAULT true,   -- false para Plata y Oro
  precio_noche_base numeric(10,2) NOT NULL,
  fotos             text[],                 -- Array de URLs
  amenities         text[],
  activo            boolean DEFAULT true,
  created_at        timestamptz DEFAULT now()
);
```

### `precios_especiales`
```sql
CREATE TABLE precios_especiales (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  apartamento_id  uuid REFERENCES apartamentos(id) ON DELETE CASCADE,
  nombre          text NOT NULL,           -- 'Semana Santa', 'Fin de Año'
  fecha_inicio    date NOT NULL,
  fecha_fin       date NOT NULL,
  precio_noche    numeric(10,2) NOT NULL,
  notas           text
);
```

### `bloqueos_calendario`
```sql
CREATE TABLE bloqueos_calendario (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  apartamento_id  uuid REFERENCES apartamentos(id) ON DELETE CASCADE,
  fecha_inicio    date NOT NULL,
  fecha_fin       date NOT NULL,
  motivo          text,   -- 'mantenimiento', 'uso_propietario'
  created_at      timestamptz DEFAULT now()
);
```

### `reservas`
```sql
CREATE TABLE reservas (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo              text UNIQUE NOT NULL,   -- ARN-2025-0001
  user_id             uuid REFERENCES profiles(id),
  apartamento_id      uuid REFERENCES apartamentos(id),
  fecha_checkin       date NOT NULL,
  fecha_checkout      date NOT NULL,
  num_huespedes       int NOT NULL,
  precio_total        numeric(10,2) NOT NULL,
  estado              text NOT NULL DEFAULT 'pendiente_pago',
  -- Estados: 'pendiente_pago' | 'pendiente_confirmacion' | 'confirmada' | 'anulada' | 'completada'
  notas_usuario       text,
  notas_propietario   text,
  stripe_session_id   text,
  created_at          timestamptz DEFAULT now(),
  updated_at          timestamptz DEFAULT now()
);
```

### `pagos`
```sql
CREATE TABLE pagos (
  id                          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reserva_id                  uuid REFERENCES reservas(id),
  stripe_payment_intent_id    text UNIQUE,
  importe                     numeric(10,2) NOT NULL,
  moneda                      text DEFAULT 'eur',
  estado                      text NOT NULL,   -- 'pendiente' | 'completado' | 'reembolsado' | 'fallido'
  tipo                        text,            -- 'señal' | 'total'
  created_at                  timestamptz DEFAULT now()
);
```

### `conversaciones`
```sql
CREATE TABLE conversaciones (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid REFERENCES profiles(id),
  reserva_id  uuid REFERENCES reservas(id),   -- nullable
  modo_ia     boolean DEFAULT false,
  ia_contexto text,
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now()
);
```

### `mensajes`
```sql
CREATE TABLE mensajes (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversacion_id   uuid REFERENCES conversaciones(id) ON DELETE CASCADE,
  remitente         text NOT NULL,   -- 'user' | 'owner' | 'ia'
  contenido         text NOT NULL,
  leido             boolean DEFAULT false,
  created_at        timestamptz DEFAULT now()
);
```

---

## POLÍTICAS RLS

```sql
-- Habilitar RLS en todas las tablas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservas ENABLE ROW LEVEL SECURITY;
ALTER TABLE pagos ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE mensajes ENABLE ROW LEVEL SECURITY;
ALTER TABLE bloqueos_calendario ENABLE ROW LEVEL SECURITY;
ALTER TABLE precios_especiales ENABLE ROW LEVEL SECURITY;

-- profiles: usuario ve/edita solo el suyo; owner ve todos
CREATE POLICY "user_own_profile" ON profiles
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "owner_all_profiles" ON profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND rol = 'owner')
  );

-- reservas: usuario ve las suyas; owner ve y gestiona todas
CREATE POLICY "user_own_reservas" ON reservas
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "user_insert_reservas" ON reservas
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "owner_all_reservas" ON reservas
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND rol = 'owner')
  );

-- mensajes: usuario ve mensajes de sus conversaciones
CREATE POLICY "user_own_mensajes" ON mensajes
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM conversaciones c
      WHERE c.id = conversacion_id AND c.user_id = auth.uid()
    )
  );

CREATE POLICY "owner_all_mensajes" ON mensajes
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND rol = 'owner')
  );

-- apartamentos: lectura pública (precios, fotos); escritura solo owner
CREATE POLICY "public_read_apartamentos" ON apartamentos
  FOR SELECT USING (true);

CREATE POLICY "owner_write_apartamentos" ON apartamentos
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND rol = 'owner')
  );
```

---

## FUNCIÓN SQL: CALCULAR PRECIO

```sql
CREATE OR REPLACE FUNCTION calcular_precio_reserva(
  p_apartamento_id uuid,
  p_fecha_inicio date,
  p_fecha_fin date
) RETURNS numeric AS $$
DECLARE
  total numeric := 0;
  dia date;
  precio_dia numeric;
BEGIN
  dia := p_fecha_inicio;
  WHILE dia < p_fecha_fin LOOP
    -- Buscar precio especial para ese día
    SELECT pe.precio_noche INTO precio_dia
    FROM precios_especiales pe
    WHERE pe.apartamento_id = p_apartamento_id
      AND dia BETWEEN pe.fecha_inicio AND pe.fecha_fin
    LIMIT 1;

    -- Si no hay precio especial, usar precio base
    IF precio_dia IS NULL THEN
      SELECT precio_noche_base INTO precio_dia
      FROM apartamentos WHERE id = p_apartamento_id;
    END IF;

    total := total + precio_dia;
    dia := dia + INTERVAL '1 day';
  END LOOP;
  RETURN total;
END;
$$ LANGUAGE plpgsql;
```

---

## TRIGGER: CREAR PERFIL AL REGISTRARSE

```sql
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
```

---

## SEED: LOS 4 APARTAMENTOS

```sql
INSERT INTO apartamentos (slug, nombre, capacidad_max, num_habitaciones, num_banos, acepta_ninos, precio_noche_base, amenities) VALUES
('rojo',   'Apartamento Rojo',   4, 2, 2, true,  95.00, ARRAY['wifi','cocina','lavadora','lavavajillas','tv','ducha_hidromasaje','bañera']),
('naranja','Apartamento Naranja',4, 2, 1, true,  90.00, ARRAY['wifi','cocina','lavadora','lavavajillas','tv','ducha_hidromasaje']),
('plata',  'Apartamento Plata',  2, 1, 1, false, 110.00, ARRAY['wifi','cocina','lavadora','lavavajillas','tv','jacuzzi','chimenea_electrica']),
('oro',    'Ático Oro',          2, 1, 1, false, 130.00, ARRAY['wifi','cocina','lavadora','lavavajillas','tv','jacuzzi','chimenea_electrica','terraza_privada']);
```

---

## TAREAS DE ESTE MÓDULO

- [ ] Crear carpeta `/supabase/migrations/`
- [ ] Escribir migración `001_initial_schema.sql` con todas las tablas
- [ ] Escribir migración `002_rls_policies.sql` con todas las políticas
- [ ] Escribir migración `003_functions_triggers.sql`
- [ ] Ejecutar migraciones en Supabase (entorno dev)
- [ ] Insertar seed de los 4 apartamentos
- [ ] Generar tipos TypeScript: `npx supabase gen types typescript --local > types/supabase.ts`
- [ ] Verificar RLS con usuarios de prueba (user vs owner)

---

*Módulo: 02 · Base de Datos | Proyecto: Apartamentos Rojo y Naranja*
