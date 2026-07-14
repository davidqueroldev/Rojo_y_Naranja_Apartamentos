const ESTADOS: Record<string, { label: string; tone: 'neutral' | 'success' | 'warning' | 'danger' }> = {
  pendiente_email: { label: 'Pendiente de confirmar email', tone: 'neutral' },
  pendiente_confirmacion: { label: 'Pendiente de confirmación', tone: 'warning' },
  aceptada: { label: 'Aceptada', tone: 'success' },
  cancelada: { label: 'Cancelada', tone: 'danger' },
  expirada: { label: 'Expirada', tone: 'neutral' },
}

export function estadoConsulta(estado: string) {
  return ESTADOS[estado] ?? { label: estado, tone: 'neutral' as const }
}

const TIPOS: Record<string, string> = {
  generica: 'Consulta genérica',
  reserva: 'Solicitud de reserva',
}

export function tipoConsulta(tipo: string) {
  return TIPOS[tipo] ?? tipo
}
