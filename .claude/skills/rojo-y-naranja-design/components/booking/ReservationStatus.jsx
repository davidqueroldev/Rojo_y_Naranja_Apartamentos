import React from 'react';

/**
 * ReservationStatus — labelled pill for the reservation state machine:
 * pendiente_pago → pendiente_confirmacion → confirmada → completada / anulada.
 * Renders a status dot + Spanish label with the right semantic colour.
 */
const STATES = {
  pendiente_pago:         { label: 'Pendiente de pago', color: 'var(--ryn-warning)',  soft: '#F7ECD6', text: '#8A5E14' },
  pendiente_confirmacion: { label: 'Pendiente confirmar', color: 'var(--ryn-info)',   soft: '#E5EAEC', text: '#465259' },
  confirmada:             { label: 'Confirmada',         color: 'var(--ryn-success)', soft: '#E7EEE4', text: '#3F5938' },
  completada:             { label: 'Completada',         color: 'var(--ryn-stone)',   soft: 'var(--surface-sunken)', text: 'var(--text-body)' },
  anulada:                { label: 'Anulada',            color: 'var(--ryn-danger)',  soft: 'var(--ryn-rojo-soft)', text: 'var(--ryn-rojo-dark)' },
};

export function ReservationStatus({ estado = 'pendiente_pago', size = 'md', ...rest }) {
  const s = STATES[estado] || STATES.pendiente_pago;
  const dims = size === 'sm'
    ? { padding: '3px 10px 3px 8px', font: 'var(--text-2xs)', dot: 6 }
    : { padding: '5px 13px 5px 10px', font: 'var(--text-xs)', dot: 7 };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5em',
        background: s.soft,
        color: s.text,
        fontFamily: 'var(--font-ui)',
        fontWeight: 'var(--fw-semibold)',
        fontSize: dims.font,
        letterSpacing: '0.03em',
        padding: dims.padding,
        borderRadius: 'var(--radius-pill)',
        whiteSpace: 'nowrap',
      }}
      {...rest}
    >
      <span style={{
        width: dims.dot, height: dims.dot, borderRadius: '50%',
        background: s.color, flex: 'none',
      }} />
      {s.label}
    </span>
  );
}
