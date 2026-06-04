# M12 — ANALYTICS BÁSICO
> Proyecto: Apartamentos Rojo y Naranja  
> Sprint programa: S5 · Estado: ⬜ Pendiente

---

## 🎯 Objetivo
Visibilidad de reservas e ingresos para el propietario, sin herramientas externas de pago.

## 📊 Métricas en dashboard

- Reservas del mes por estado
- Ingresos del mes (suma de `pagos.importe` donde `estado = 'completado'`)
- Tasa de ocupación por apartamento (% días reservados en el mes)
- Apartamento más reservado del mes

## 💻 Query de KPIs

```sql
-- Ingresos y reservas del mes actual
SELECT
  COUNT(*) FILTER (WHERE estado = 'confirmada') AS confirmadas,
  COUNT(*) FILTER (WHERE estado = 'pendiente_confirmacion') AS pendientes,
  COUNT(*) FILTER (WHERE estado = 'anulada') AS anuladas
FROM reservas
WHERE DATE_TRUNC('month', created_at) = DATE_TRUNC('month', NOW());

-- Ingresos del mes
SELECT SUM(p.importe) AS ingresos_mes
FROM pagos p
JOIN reservas r ON p.reserva_id = r.id
WHERE p.estado = 'completado'
  AND DATE_TRUNC('month', p.created_at) = DATE_TRUNC('month', NOW());
```

## ✅ Checklist del módulo

- [ ] Queries SQL de agregación en Supabase (funciones o vistas)
- [ ] Componentes `KPICard` y `GraficoOcupacion` (recharts)
- [ ] Selector de rango de fechas para el análisis
- [ ] (Opcional) Vercel Analytics para tráfico web

---

*Módulo M12 · Depende de: M8 · Ver 00_ROADMAP_GENERAL.md*
