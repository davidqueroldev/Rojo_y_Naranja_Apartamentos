-- ============================================================
-- seed.sql
-- Datos iniciales: los 4 apartamentos de Morella
-- ============================================================

INSERT INTO apartamentos (
  slug, nombre, descripcion,
  capacidad_min, capacidad_max,
  num_habitaciones, num_banos,
  acepta_ninos, precio_noche_base,
  amenities, activo
) VALUES
(
  'rojo',
  'Apartamento Rojo',
  'Acogedor apartamento para hasta 4 personas en el corazón de Morella. Dos habitaciones, dos baños y una terraza con vistas a la muralla medieval.',
  1, 4, 2, 2, true, 95.00,
  ARRAY[
    'wifi', 'cocina_equipada', 'lavadora', 'lavavajillas',
    'tv', 'ducha_hidromasaje', 'bañera', 'terraza', 'calefaccion', 'aire_acondicionado'
  ],
  true
),
(
  'naranja',
  'Apartamento Naranja',
  'Luminoso apartamento familiar con dos habitaciones y vistas al casco histórico. Ideal para familias o grupos de amigos.',
  1, 4, 2, 1, true, 90.00,
  ARRAY[
    'wifi', 'cocina_equipada', 'lavadora', 'lavavajillas',
    'tv', 'ducha_hidromasaje', 'balcon', 'calefaccion', 'aire_acondicionado'
  ],
  true
),
(
  'plata',
  'Apartamento Plata',
  'Romántico apartamento para parejas con jacuzzi privado y chimenea eléctrica. Ambiente íntimo y tranquilo. No apto para niños.',
  1, 2, 1, 1, false, 110.00,
  ARRAY[
    'wifi', 'cocina_equipada', 'lavadora', 'lavavajillas',
    'tv', 'jacuzzi', 'chimenea_electrica', 'calefaccion', 'aire_acondicionado'
  ],
  true
),
(
  'oro',
  'Ático Oro',
  'Exclusivo ático para parejas con terraza privada, jacuzzi y chimenea eléctrica. Las mejores vistas de Morella desde el tejado. No apto para niños.',
  1, 2, 1, 1, false, 130.00,
  ARRAY[
    'wifi', 'cocina_equipada', 'lavadora', 'lavavajillas',
    'tv', 'jacuzzi', 'chimenea_electrica', 'terraza_privada',
    'vistas_panoramicas', 'calefaccion', 'aire_acondicionado'
  ],
  true
);

-- Precio especial de ejemplo: Semana Santa 2026
-- (comentado para no afectar a producción — descomentar en dev para pruebas)
/*
INSERT INTO precios_especiales (apartamento_id, nombre, fecha_inicio, fecha_fin, precio_noche, notas)
SELECT id, 'Semana Santa 2026', '2026-03-28', '2026-04-05', precio_noche_base * 1.30,
       'Incremento 30% temporada alta'
FROM apartamentos;
*/
