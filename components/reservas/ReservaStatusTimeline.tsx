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
      <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 rounded-lg p-3">
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
              <CheckCircle2 size={18} className="text-green-600 shrink-0" />
            ) : (
              <Circle size={18} className="text-gray-300 shrink-0" />
            )}
            <span className={completado ? 'text-gray-900 font-medium' : 'text-gray-400'}>
              {paso.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
