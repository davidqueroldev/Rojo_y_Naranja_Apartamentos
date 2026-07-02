import { describe, it, expect } from 'vitest'
import { calcularPrecioTotal, formatearPrecio, calcularDesglose } from './precios'

describe('calcularPrecioTotal', () => {
  it('multiplica el precio base por el número de noches', () => {
    expect(calcularPrecioTotal(90, new Date('2026-07-01'), new Date('2026-07-04'))).toBe(270)
  })

  it('devuelve 0 para entrada y salida el mismo día', () => {
    expect(calcularPrecioTotal(90, new Date('2026-07-01'), new Date('2026-07-01'))).toBe(0)
  })
})

// Intl.NumberFormat('es-ES') usa un espacio no separable (NBSP) antes de "€";
// se normaliza a un espacio normal para no depender de ese detalle de codificación.
function sinEspaciosRaros(s: string) {
  return s.replace(/\s/g, ' ')
}

describe('formatearPrecio', () => {
  it('formatea en euros con estilo es-ES', () => {
    expect(sinEspaciosRaros(formatearPrecio(90))).toBe('90,00 €')
  })

  it('redondea a dos decimales', () => {
    expect(sinEspaciosRaros(formatearPrecio(99.999))).toBe('100,00 €')
  })
})

describe('calcularDesglose', () => {
  const especiales = [
    { fecha_inicio: '2026-12-30', fecha_fin: '2027-01-02', precio_noche: 200, nombre: 'Fin de Año' },
  ]

  it('agrupa todas las noches en un único tramo cuando no hay precio especial', () => {
    const segmentos = calcularDesglose('2026-07-01', '2026-07-04', 90, [])
    expect(segmentos).toEqual([{ noches: 3, precioNoche: 90, nombre: null }])
  })

  it('separa en tramos cuando una reserva cruza un precio especial', () => {
    // check-out excluido: 12-29 (base) · 12-30,31 + 01-01,02 (especial, fin inclusive) = 1 + 4 noches
    const segmentos = calcularDesglose('2026-12-29', '2027-01-03', 90, especiales)
    expect(segmentos).toEqual([
      { noches: 1, precioNoche: 90, nombre: null },
      { noches: 4, precioNoche: 200, nombre: 'Fin de Año' },
    ])
  })

  it('no fusiona tramos consecutivos con el mismo precio pero distinto nombre', () => {
    const dosEspeciales = [
      { fecha_inicio: '2026-07-01', fecha_fin: '2026-07-01', precio_noche: 90, nombre: 'Promo A' },
      { fecha_inicio: '2026-07-02', fecha_fin: '2026-07-02', precio_noche: 90, nombre: 'Promo B' },
    ]
    const segmentos = calcularDesglose('2026-07-01', '2026-07-03', 90, dosEspeciales)
    expect(segmentos).toEqual([
      { noches: 1, precioNoche: 90, nombre: 'Promo A' },
      { noches: 1, precioNoche: 90, nombre: 'Promo B' },
    ])
  })
})
