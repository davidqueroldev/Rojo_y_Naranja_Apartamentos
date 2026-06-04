# M7 — PANEL DE USUARIO REGISTRADO
> Proyecto: Apartamentos Rojo y Naranja  
> Sprint programa: S4 · Estado: ⬜ Pendiente

---

## 🎯 Objetivo
Área privada donde el usuario gestiona sus reservas, consulta el estado de los pagos y se comunica con el propietario.

## 🗂️ Vistas del panel

### `/user/dashboard`
- Saludo personalizado con nombre del usuario
- Card "Próxima reserva": apartamento, fechas, estado
- Acceso rápido a: Mis reservas · Chat · Nueva reserva

### `/user/reservas`
- Tabla de reservas con columnas: Código · Apartamento · Check-in · Check-out · Estado · Importe
- Badge de estado coloreado:
  - 🟡 `pendiente_pago`
  - 🔵 `pendiente_confirmacion`
  - 🟢 `confirmada`
  - 🔴 `anulada`
  - ⚫ `completada`
- Filtro por estado
- Botón "Ver detalle" por fila

### `/user/reservas/[id]`
- Datos completos: apartamento, fechas, huéspedes, precio, código ARN-
- Timeline de estado: Pago recibido → Confirmada por propietario → Check-in → Completada
- Si estado = `confirmada`: botón "Descargar confirmación PDF"
- Botón "Contactar propietario" → abre/navega al chat

### `/user/chat/[reservaId]`
- Ventana de chat en tiempo real (ver M9)
- Historial de mensajes paginado
- Indicador "Respondiendo automáticamente" si modo IA activo

---

## 🧩 Componentes clave

```typescript
// ReservaStatusTimeline
// Props: estado actual
// Muestra línea de tiempo visual con pasos completados/pendientes

// ReservaTable
// Props: reservas[], loading
// Tabla responsive con badges y acciones

// PDFConfirmacion
// Genera PDF con: logo, datos reserva, datos apartamento, datos de contacto
// Librería: @react-pdf/renderer
```

---

## ✅ Checklist del módulo

- [ ] Layout con sidebar de navegación usuario
- [ ] `/user/dashboard` con datos reales de Supabase
- [ ] `/user/reservas` con tabla y filtros
- [ ] `/user/reservas/[id]` con timeline de estado
- [ ] Generación de PDF de confirmación
- [ ] Chat integrado (ver M9)
- [ ] Loading states y mensajes de error
- [ ] Responsive mobile

---

## 🐛 Problemas conocidos / Notas

> *(Añadir aquí durante el desarrollo)*

---

*Módulo M7 · Depende de: M3, M6 · Ver 00_ROADMAP_GENERAL.md*
