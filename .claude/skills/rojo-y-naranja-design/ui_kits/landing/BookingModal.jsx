// Booking flow modal — dates → datos + email → validación por código → confirmada.
// Demonstrates the brand's email-validation step.
function BookingModal({ slug, onClose, onConfirmed }) {
  const { Button, Input, Badge } = window.RojoYNaranjaDesignSystem_3c785d;
  const a = window.RYN.apartamentos.find(x => x.slug === slug) || window.RYN.apartamentos[0];
  const [step, setStep] = React.useState(0); // 0 datos, 1 validar, 2 hecho
  const [email, setEmail] = React.useState('');
  const [code, setCode] = React.useState('');
  const nights = 3, total = a.precio * nights;
  const codeOk = code.replace(/\s/g, '').length === 6;

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(20,17,15,0.55)',
      backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, overflowY: 'auto' }}>
      <div onClick={e => e.stopPropagation()} style={{ width: 'min(560px, 100%)', background: 'var(--surface-card)',
        borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)',
        maxHeight: 'calc(100vh - 40px)', display: 'flex', flexDirection: 'column', margin: 'auto' }}>
        {/* header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px',
          borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
              <Photo grad={a.grad} />
            </span>
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: 'var(--text-base)', color: 'var(--text-heading)' }}>{a.nombre}</div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>12–15 jul 2026 · 2 huéspedes</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 0, cursor: 'pointer', color: 'var(--text-muted)' }}><Icon name="x" size={22} /></button>
        </div>

        {/* steps indicator */}
        <div style={{ display: 'flex', gap: 6, padding: '14px 24px 0' }}>
          {['Tus datos', 'Validación', 'Confirmada'].map((s, i) => (
            <div key={s} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ height: 3, borderRadius: 2, background: i <= step ? 'var(--accent)' : 'var(--border)' }} />
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 600, letterSpacing: '0.06em',
                textTransform: 'uppercase', color: i <= step ? 'var(--accent)' : 'var(--text-muted)' }}>{s}</span>
            </div>
          ))}
        </div>

        <div style={{ padding: 24, overflowY: 'auto', flex: 1 }}>
          {step === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <Input label="Nombre" placeholder="Tu nombre" defaultValue="" />
                <Input label="Apellidos" placeholder="Tus apellidos" />
              </div>
              <Input label="Correo electrónico" type="email" placeholder="tu@email.com"
                value={email} onChange={e => setEmail(e.target.value)}
                iconLeft={<Icon name="mail" size={16} />}
                hint="Te enviaremos un código para confirmar la reserva." />
              <Input label="Teléfono" type="tel" placeholder="+34 ..." iconLeft={<Icon name="phone" size={16} />} />
              <div style={{ background: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', padding: 14,
                display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)' }}>
                <span style={{ color: 'var(--text-muted)' }}>{a.precio}€ × {nights} noches</span>
                <span style={{ fontWeight: 700, color: 'var(--text-heading)' }}>{total}€</span>
              </div>
              <Button variant="primary" fullWidth size="lg" disabled={!email.includes('@')}
                onClick={() => setStep(1)} iconRight={<Icon name="arrow-right" size={18} />}>Continuar</Button>
            </div>
          )}

          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, textAlign: 'center', alignItems: 'center' }}>
              <span style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--ryn-naranja-soft)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ryn-naranja)' }}>
                <Icon name="mail-check" size={28} />
              </span>
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-lg)', margin: 0, fontWeight: 600 }}>Valida tu correo</h3>
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', margin: '8px 0 0' }}>
                  Hemos enviado un código de 6 dígitos a <strong style={{ color: 'var(--text-body)' }}>{email || 'tu correo'}</strong>.
                </p>
              </div>
              <input value={code} onChange={e => setCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                className="ryn-input" inputMode="numeric" placeholder="• • • • • •"
                style={{ width: 220, textAlign: 'center', letterSpacing: '0.5em', fontSize: 22,
                  fontFamily: 'var(--font-ui)', fontWeight: 700, padding: '12px' }} />
              <Button variant="primary" fullWidth size="lg" disabled={!codeOk} onClick={() => setStep(2)}>Confirmar reserva</Button>
              <button style={{ background: 'none', border: 0, cursor: 'pointer', fontFamily: 'var(--font-ui)',
                fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>Reenviar código</button>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, textAlign: 'center', alignItems: 'center', padding: '8px 0' }}>
              <span style={{ width: 64, height: 64, borderRadius: '50%', background: '#E7EEE4',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ryn-success)' }}>
                <Icon name="check" size={34} strokeWidth={2.2} />
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-xl)', margin: 0, fontWeight: 600 }}>¡Reserva confirmada!</h3>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', margin: 0, maxWidth: 360 }}>
                Tu código es <strong style={{ color: 'var(--text-body)' }}>ARN-2026-0042</strong>. Te hemos enviado la confirmación a tu correo.
              </p>
              <Badge tone="success" variant="soft">Confirmada · {a.nombre}</Badge>
              <Button variant="primary" onClick={onConfirmed} style={{ marginTop: 6 }}>Ver mi reserva</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
window.BookingModal = BookingModal;
