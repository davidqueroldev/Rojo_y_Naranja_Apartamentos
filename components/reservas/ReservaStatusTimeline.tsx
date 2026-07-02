import { CheckCircle2, Circle, XCircle } from 'lucide-react'

const PASOS = [
  { key: 'pendiente_pago', label: 'Pago recibido' },
  { key: 'pendiente_confirmacion', label: 'Confirmada por propietario' },
  { key: 'confirmada', label: 'Check-in' },
  { key: 'completada', label: 'Completada' },
] as const

const ORDEN: Record<string, number> = {
  pendiente_pago: 0,
  pendiente_confirmacion: 1,
  confirmada: 2,
  completada: 3,
}

export function ReservaStatusTimeline({ estado }: { estado: string }) {
  if (estado === 'anulada') {
    return (
      <div className="flex items-center gap-2 text-sm rounded-lg p-3" style={{ color: 'var(--ryn-rojo-dark)', background: 'var(--ryn-rojo-soft)' }}>
        <XCircle size={16} /> Esta reserva fue anulada.
      </div>
    )
  }

  const pasoActual = ORDEN[estado] ?? 0

  return (
    <div className="flex flex-col gap-3">
      {PASOS.map((paso, i) => {
        const completado = i <= pasoActual
        return (
          <div key={paso.key} className="flex items-center gap-2 text-sm">
            {completado ? (
              <CheckCircle2 size={18} className="shrink-0" style={{ color: 'var(--ryn-success)' }} />
            ) : (
              <Circle size={18} className="shrink-0" style={{ color: 'var(--ryn-stone-2)' }} />
            )}
            <span className={completado ? 'font-medium' : ''} style={{ color: completado ? 'var(--text-heading)' : 'var(--text-muted)' }}>
              {paso.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
