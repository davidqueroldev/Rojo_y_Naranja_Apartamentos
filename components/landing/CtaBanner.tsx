import { Button } from '@/components/ui/Button'

export function CtaBanner() {
  return (
    <section style={{ position: 'relative', padding: 'var(--space-9) 0' }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, #2a1810 0%, #AF2C0E 100%)',
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(20,17,15,0.40)' }} />
      <div style={{
        position: 'relative',
        maxWidth: 760,
        margin: '0 auto',
        textAlign: 'center',
        padding: '0 var(--container-pad)',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          color: '#fff',
          fontSize: 'var(--text-3xl)',
          margin: 0,
          fontWeight: 600,
          letterSpacing: '-0.01em',
        }}>
          Reserva directa, sin comisiones
        </h2>
        <p style={{
          fontFamily: 'var(--font-ui)',
          color: 'var(--text-on-dark)',
          fontSize: 'var(--text-md)',
          margin: '14px 0 26px',
        }}>
          Mejor precio garantizado y atención directa del propietario.
        </p>
        <Button variant="sand" size="lg" href="#apartamentos">
          Ver disponibilidad
        </Button>
      </div>
    </section>
  )
}
