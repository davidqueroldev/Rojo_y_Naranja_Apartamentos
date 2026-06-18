// Owner admin panel — manage and cancel reservations.
function AdminPanel({ onSalir }) {
  const { Button, ReservationStatus, Badge } = window.RojoYNaranjaDesignSystem_3c785d;
  const seed = [
    { codigo: 'ARN-2026-0042', apt: 'Ático Oro', tone: 'oro', huesped: 'Inés Marco', fechas: '12–15 jul', personas: 2, total: 390, estado: 'confirmada' },
    { codigo: 'ARN-2026-0041', apt: 'Apartamento Plata', tone: 'plata', huesped: 'Mayte Roca', fechas: '10–12 jul', personas: 2, total: 220, estado: 'pendiente_pago' },
    { codigo: 'ARN-2026-0040', apt: 'Apartamento Rojo', tone: 'rojo', huesped: 'Álvaro Méndez', fechas: '4–7 jul', personas: 4, total: 285, estado: 'pendiente_confirmacion' },
    { codigo: 'ARN-2026-0038', apt: 'Apartamento Naranja', tone: 'naranja', huesped: 'Familia Poveda', fechas: '28–30 jun', personas: 3, total: 180, estado: 'completada' },
  ];
  const [rows, setRows] = React.useState(seed);
  const [confirm, setConfirm] = React.useState(null);

  const cancelar = (codigo) => {
    setRows(rs => rs.map(r => r.codigo === codigo ? { ...r, estado: 'anulada' } : r));
    setConfirm(null);
  };

  const stats = [
    { icon: 'calendar-check', label: 'Confirmadas', value: rows.filter(r => r.estado === 'confirmada').length },
    { icon: 'hourglass', label: 'Pendientes', value: rows.filter(r => r.estado.startsWith('pendiente')).length },
    { icon: 'euro', label: 'Ingresos mes', value: rows.filter(r => r.estado !== 'anulada').reduce((s, r) => s + r.total, 0) + '€' },
    { icon: 'home', label: 'Apartamentos', value: 4 },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)' }}>
      {/* top bar */}
      <header style={{ background: 'var(--ryn-ink)', padding: '14px var(--container-pad)' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Logo variant="white" height={36} />
            <Badge tone="oro" variant="soft" size="sm">Panel propietario</Badge>
          </div>
          <button onClick={onSalir} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'none',
            border: '1px solid var(--border-on-dark)', borderRadius: 'var(--radius-pill)', padding: '7px 16px',
            cursor: 'pointer', fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--text-on-dark)' }}>
            <Icon name="log-out" size={16} /> Salir
          </button>
        </div>
      </header>

      <div style={{ maxWidth: 1080, margin: '0 auto', padding: 'var(--space-7) var(--container-pad)' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-2xl)', margin: 0, fontWeight: 600 }}>Reservas</h1>
        <p style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-muted)', margin: '6px 0 0' }}>Gestiona y cancela las reservas de los cuatro apartamentos.</p>

        {/* stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, margin: '26px 0 30px' }}>
          {stats.map(s => (
            <div key={s.label} style={{ background: 'var(--surface-card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)', display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ width: 42, height: 42, borderRadius: 'var(--radius-md)', background: 'var(--ryn-rojo-soft)',
                color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={s.icon} size={20} />
              </span>
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--text-heading)', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: 4 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* table */}
        <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.4fr 1fr 0.7fr 0.8fr 1fr 0.9fr',
            padding: '14px 22px', background: 'var(--surface-sunken)', fontFamily: 'var(--font-ui)', fontSize: 11,
            fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            <span>Código</span><span>Apartamento</span><span>Huésped</span><span>Fechas</span><span>Total</span><span>Estado</span><span></span>
          </div>
          {rows.map((r, i) => (
            <div key={r.codigo} style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.4fr 1fr 0.7fr 0.8fr 1fr 0.9fr',
              alignItems: 'center', padding: '16px 22px', borderTop: '1px solid var(--border)',
              fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', color: 'var(--text-body)',
              opacity: r.estado === 'anulada' ? 0.55 : 1 }}>
              <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{r.codigo}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: `var(--ryn-${r.tone})` }} />{r.apt}
              </span>
              <span>{r.huesped}</span>
              <span>{r.fechas}</span>
              <span style={{ fontWeight: 600 }}>{r.total}€</span>
              <span><ReservationStatus estado={r.estado} size="sm" /></span>
              <span style={{ textAlign: 'right' }}>
                {r.estado !== 'anulada' && r.estado !== 'completada' ? (
                  <button onClick={() => setConfirm(r)} style={{ display: 'inline-flex', alignItems: 'center', gap: 5,
                    background: 'none', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-pill)',
                    padding: '6px 12px', cursor: 'pointer', fontFamily: 'var(--font-ui)', fontWeight: 600,
                    fontSize: 'var(--text-xs)', color: 'var(--ryn-danger)' }}>
                    <Icon name="x" size={13} /> Cancelar
                  </button>
                ) : <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>—</span>}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* cancel confirm dialog */}
      {confirm && (
        <div onClick={() => setConfirm(null)} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(20,17,15,0.55)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div onClick={e => e.stopPropagation()} style={{ width: 'min(420px, 100%)', background: 'var(--surface-card)',
            borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', boxShadow: 'var(--shadow-lg)', textAlign: 'center' }}>
            <span style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--ryn-rojo-soft)', color: 'var(--ryn-danger)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
              <Icon name="alert-triangle" size={26} />
            </span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-lg)', margin: '16px 0 0', fontWeight: 600 }}>¿Cancelar reserva?</h3>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', margin: '8px 0 22px' }}>
              {confirm.codigo} · {confirm.apt}. El huésped recibirá un email de cancelación. Esta acción no se puede deshacer.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <Button variant="ghost" onClick={() => setConfirm(null)}>Volver</Button>
              <Button variant="primary" onClick={() => cancelar(confirm.codigo)} iconLeft={<Icon name="x" size={16} />}>Sí, cancelar</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
window.AdminPanel = AdminPanel;
