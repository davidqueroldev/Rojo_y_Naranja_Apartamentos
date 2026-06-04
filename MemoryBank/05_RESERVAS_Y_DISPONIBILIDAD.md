# M5 — RESERVAS & DISPONIBILIDAD
> Proyecto: Apartamentos Rojo y Naranja  
> Sprint programa: S2/S4 · Estado: 🔄 En progreso (endpoints CRUD)

---

## 🎯 Objetivo
Sistema completo para consultar disponibilidad y crear reservas con validaciones, precios dinámicos y flujo paso a paso.

## 📊 Estado actual

| Tarea | Estado |
|-------|--------|
| Lógica de disponibilidad | 🔄 En progreso |
| API endpoint disponibilidad | 🔄 En progreso |
| Formulario reserva (wizard) | ⬜ Pendiente |
| Cálculo dinámico de precio | ⬜ Pendiente |
| Validaciones (niños, capacidad) | ⬜ Pendiente |
| Tests Postman/ThunderClient | 🚫 Bloqueada |

---

## 📐 Lógica de disponibilidad

Una fecha está **OCUPADA** si:
```sql
-- Hay reserva activa que incluye esa fecha
SELECT 1 FROM reservas
WHERE apartamento_id = $1
  AND estado IN ('pendiente_confirmacion', 'confirmada')
  AND fecha_checkin <= $fecha AND fecha_checkout > $fecha

UNION

-- Hay bloqueo manual que incluye esa fecha  
SELECT 1 FROM bloqueos_calendario
WHERE apartamento_id = $1
  AND fecha_inicio <= $fecha AND fecha_fin > $fecha
```

---

## 🌐 API Routes

### `GET /api/disponibilidad`
```typescript
// Parámetros: ?apartamento=rojo&inicio=2025-07-01&fin=2025-07-07
// Respuesta: { disponible: true, fechas_ocupadas: ['2025-07-03', '2025-07-04'] }

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const apartamento = searchParams.get('apartamento')
  const inicio = searchParams.get('inicio')
  const fin = searchParams.get('fin')
  // query Supabase → retorna array de fechas ocupadas
}
```

### `POST /api/reservas`
```typescript
// Body: { apartamento_id, fecha_checkin, fecha_checkout, num_huespedes, notas_usuario }
// Crea reserva en estado 'pendiente_pago'
// Retorna: { reserva_id, precio_total, stripe_redirect_url }
```

### `GET /api/reservas/[id]`
```typescript
// Solo accesible por el propietario de la reserva o el owner
```

---

## 🧭 Flujo de reserva (wizard 3 pasos)

```
Paso 1 — Selección
  ├─ Apartamento (si no viene de la card)
  ├─ Fechas check-in / check-out (react-day-picker, fechas ocupadas deshabilitadas)
  ├─ Nº huéspedes (respeta capacidad_max del apartamento)
  └─ Validación: si Plata/Oro → avisar que no acepta niños

Paso 2 — Resumen
  ├─ Desglose: X noches × Y€ = Z€ total
  ├─ Si hay precio especial: mostrar qué noches tienen tarifa diferente
  ├─ Campo de notas opcionales
  └─ Botón "Continuar al pago"

Paso 3 — Pago (Stripe)
  ├─ Crear reserva en BD (estado: 'pendiente_pago')
  ├─ Crear Stripe Checkout Session
  └─ Redirigir a Stripe → (ver M6)
```

---

## 💰 Cálculo de precio (cliente)

```typescript
// lib/utils/precios.ts
export async function calcularPrecio(
  apartamentoId: string,
  fechaInicio: Date,
  fechaFin: Date
): Promise<{ total: number; desglose: { fecha: string; precio: number }[] }> {
  // Llamar a función SQL calcular_precio_reserva (ver M2)
  // o replicar lógica en TypeScript consultando precios_especiales
}
```

---

## ✅ Validaciones de negocio

```typescript
// Antes de crear reserva:
// 1. Fechas no solapan con reservas activas o bloqueos
// 2. fecha_checkout > fecha_checkin
// 3. num_huespedes <= capacidad_max del apartamento
// 4. Si apartamento es 'plata' o 'oro': mostrar advertencia niños
//    (no hay restricción técnica, es informativa)
// 5. Usuario autenticado
```

---

## 🔢 Generación de código de reserva

```typescript
// Formato: ARN-YYYY-XXXX (ARN = Apartamentos Rojo Naranja)
// Ejemplo: ARN-2025-0042

async function generarCodigoReserva(): Promise<string> {
  const year = new Date().getFullYear()
  const { count } = await supabase
    .from('reservas')
    .select('*', { count: 'exact', head: true })
  const numero = String((count || 0) + 1).padStart(4, '0')
  return `ARN-${year}-${numero}`
}
```

---

## ✅ Checklist del módulo

- [ ] API `GET /api/disponibilidad` funcional y testeada
- [ ] API `POST /api/reservas` con validaciones
- [ ] Función `calcularPrecio()` con soporte de precios especiales
- [ ] Generación de código de reserva (ARN-YYYY-XXXX)
- [ ] Componente `CalendarioDisponibilidad` (días ocupados deshabilitados)
- [ ] Wizard de reserva (3 pasos)
- [ ] Validación de capacidad y fechas
- [ ] Tests con Postman/ThunderClient (S2 task #10)
- [ ] Documentación de rutas API en README (S2 task #11)

---

## 🐛 Problemas conocidos / Notas

> *(Añadir aquí durante el desarrollo)*

---

*Módulo M5 · Depende de: M2, M3 · Necesario para: M6, M7 · Ver 00_ROADMAP_GENERAL.md*
