import { describe, it, expect } from 'vitest'
import { estadoReserva, fechasEnRango } from './reservas'

describe('estadoReserva', () => {
  it('devuelve label y tone para un estado conocido', () => {
    expect(estadoReserva('confirmada')).toEqual({ label: 'Confirmada', tone: 'success' })
  })

  it('cae a un fallback neutral para un estado desconocido', () => {
    expect(estadoReserva('lo-que-sea')).toEqual({ label: 'lo-que-sea', tone: 'neutral' })
  })
})

describe('fechasEnRango', () => {
  it('incluye la fecha de inicio pero excluye la de fin (checkout no cuenta como noche ocupada)', () => {
    expect(fechasEnRango('2026-07-01', '2026-07-04')).toEqual(['2026-07-01', '2026-07-02', '2026-07-03'])
  })

  it('devuelve un array vacío cuando inicio y fin coinciden', () => {
    expect(fechasEnRango('2026-07-01', '2026-07-01')).toEqual([])
  })
})
