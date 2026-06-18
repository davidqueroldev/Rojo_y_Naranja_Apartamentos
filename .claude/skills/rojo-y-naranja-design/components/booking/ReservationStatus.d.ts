import * as React from 'react';

export interface ReservationStatusProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Reservation state from the booking state machine. */
  estado?: 'pendiente_pago' | 'pendiente_confirmacion' | 'confirmada' | 'completada' | 'anulada';
  size?: 'sm' | 'md';
}

/** Status pill (dot + Spanish label) for the reservation lifecycle. */
export function ReservationStatus(props: ReservationStatusProps): JSX.Element;
