Status pill for a reservation's lifecycle state — use in the user dashboard and the owner's reservations table.

```jsx
<ReservationStatus estado="confirmada" />
<ReservationStatus estado="pendiente_pago" size="sm" />
```

States (in order): `pendiente_pago`, `pendiente_confirmacion`, `confirmada`, `completada`, `anulada`. Colour and Spanish label are derived automatically.
