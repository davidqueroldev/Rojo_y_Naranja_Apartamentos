# M8 — DASHBOARD DEL PROPIETARIO
> Proyecto: Apartamentos Rojo y Naranja  
> Sprint programa: S4 · Estado: ⬜ Pendiente

---

## 🎯 Objetivo
Panel completo de gestión: reservas, disponibilidad, precios y comunicaciones. Acceso exclusivo rol 'owner'.

## 🗂️ Vistas del dashboard

### `/owner/dashboard`
- KPIs del mes: reservas totales · ingresos · ocupación por apartamento
- Calendario global (react-big-calendar): color por apartamento
  - 🔴 Rojo · 🟠 Naranja · ⚪ Plata · 🟡 Oro
- Alertas activas: reservas `pendiente_confirmacion` · mensajes no leídos

### `/owner/reservas`
- Tabla completa con filtros: estado · apartamento · rango fechas · usuario
- Acciones rápidas inline:
  - ✅ Confirmar → estado `confirmada` + email al usuario
  - ❌ Anular → estado `anulada` + email + reembolso Stripe si aplica
  - ✏️ Modificar → modal con formulario
- Paginación server-side (Supabase range)

### `/owner/reservas/[id]`
- Detalle completo + datos del usuario
- Formulario de modificación: cambiar fechas, huéspedes, añadir nota interna
- Historial de cambios de estado con timestamps

### `/owner/apartamentos/[slug]/disponibilidad`
- Calendario interactivo para bloquear/desbloquear fechas
- CRUD de bloqueos: seleccionar rango → motivo → guardar
- Vista consolidada de ocupación del mes

### `/owner/precios`
- Tabla de precios base por apartamento (editable inline)
- CRUD de precios especiales por temporada:
  - Nombre · Fechas · Precio/noche por apartamento
  - Ejemplos: Fin de Año (consultar por teléfono → bloquear online), Semana Santa, Puente Mayo

### `/owner/chat`
- Lista de conversaciones ordenadas por último mensaje
- Badge nº de mensajes no leídos
- Toggle global "Modo IA activo para todas las conversaciones"
- Por conversación: toggle individual Manual ↔ IA
- (Ver M9 para detalle del sistema de chat)

---

## ⚡ Notificaciones en tiempo real

```typescript
// Supabase Realtime: suscribirse a cambios en reservas y mensajes
const channel = supabase
  .channel('owner-notifications')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'reservas',
    filter: `estado=eq.pendiente_confirmacion`
  }, (payload) => {
    // Mostrar toast: "Nueva reserva de [usuario]"
    showToast(`Nueva reserva: ${payload.new.codigo}`)
  })
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'mensajes'
  }, (payload) => {
    // Actualizar badge de chat no leídos
    incrementUnreadCount()
  })
  .subscribe()
```

---

## ✅ Checklist del módulo

- [ ] Layout owner con sidebar y notificaciones
- [ ] `/owner/dashboard` con KPIs reales y calendario global
- [ ] `/owner/reservas` con tabla, filtros y acciones
- [ ] Modal de modificación de reserva
- [ ] `/owner/apartamentos/[slug]/disponibilidad` funcional
- [ ] `/owner/precios` con CRUD de precios especiales
- [ ] Suscripción Supabase Realtime para notificaciones
- [ ] Toasts de notificación en tiempo real
- [ ] Loading states y confirmaciones modales para acciones destructivas

---

## 🐛 Problemas conocidos / Notas

> *(Añadir aquí durante el desarrollo)*

---

*Módulo M8 · Depende de: M3, M6 · Necesario para: M9 · Ver 00_ROADMAP_GENERAL.md*
