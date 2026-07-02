import { describe, it, expect } from 'vitest'
import { contarNoches, rangoFechas, formatearFecha, fechasSeSuperponen } from './fechas'

describe('contarNoches', () => {
  it('cuenta las noches entre dos fechas', () => {
    expect(contarNoches(new Date('2026-07-01'), new Date('2026-07-04'))).toBe(3)
  })

  it('devuelve 0 si entrada y salida son el mismo día', () => {
    expect(contarNoches(new Date('2026-07-01'), new Date('2026-07-01'))).toBe(0)
  })
})

describe('rangoFechas', () => {
  it('incluye tanto la fecha de entrada como la de salida', () => {
    const dias = rangoFechas(new Date('2026-07-01'), new Date('2026-07-03'))
    expect(dias).toHaveLength(3)
  })
})

describe('formatearFecha', () => {
  it('formatea como dd/MM/yyyy', () => {
    expect(formatearFecha(new Date('2026-07-01T00:00:00'))).toBe('01/07/2026')
  })
})

describe('fechasSeSuperponen', () => {
  it('detecta solapamiento parcial', () => {
    const a = new Date('2026-07-01')
    const b = new Date('2026-07-05')
    const c = new Date('2026-07-03')
    const d = new Date('2026-07-08')
    expect(fechasSeSuperponen(a, b, c, d)).toBe(true)
  })

  it('no detecta solapamiento cuando una reserva termina justo cuando empieza la otra (checkout = checkin)', () => {
    const a = new Date('2026-07-01')
    const b = new Date('2026-07-05')
    const c = new Date('2026-07-05')
    const d = new Date('2026-07-08')
    expect(fechasSeSuperponen(a, b, c, d)).toBe(false)
  })

  it('no detecta solapamiento entre rangos totalmente separados', () => {
    const a = new Date('2026-07-01')
    const b = new Date('2026-07-05')
    const c = new Date('2026-08-01')
    const d = new Date('2026-08-05')
    expect(fechasSeSuperponen(a, b, c, d)).toBe(false)
  })
})
