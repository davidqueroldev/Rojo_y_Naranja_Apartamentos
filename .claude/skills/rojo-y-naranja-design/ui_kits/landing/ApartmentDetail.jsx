// Apartment detail view — gallery, description, amenities, availability,
// price calculator and reserve CTA.
function ApartmentDetail({ slug, onReservar, onVolver, onVer }) {
  const { Button, Badge } = window.RojoYNaranjaDesignSystem_3c785d;
  const a = window.RYN.apartamentos.find(x => x.slug === slug);
  const blocked = [5, 6, 7, 18, 19, 25, 26];
  const nights = 3;
  const total = a.precio * nights;

  return (
    <div style={{ background: 'var(--bg-page)' }}>
      {/* Gallery */}
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--space-6) var(--container-pad) 0' }}>
        <button onClick={onVolver} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none',
          border: 0, cursor: 'pointer', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', fontWeight: 600,
          color: 'var(--text-muted)', marginBottom: 18 }}>
          <Icon name="arrow-left" size={16} /> Todos los apartamentos
        </button>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12, height: 420, borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <Photo grad={a.grad} label={`Foto principal · ${a.nombre}`} />
          <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 12 }}>
            <Photo grad={[a.grad[0], '#6b5b4f']} label="Salón" />
            <Photo grad={['#2a2521', a.grad[1]]} label="Baño" />
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--space-7) var(--container-pad) var(--section-y)',
        display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 56, alignItems: 'start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <Badge tone={a.tone} variant="soft">{a.nombre.replace('Apartamento ', 'Apartamento ')}</Badge>
            <Badge tone="neutral" variant="outline">{a.capacidad}</Badge>
            {!a.aceptaNinos && <Badge tone="rojo" variant="solid">Solo adultos</Badge>}
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-3xl)', margin: '16px 0 0', fontWeight: 600,
            letterSpacing: '-0.02em', color: 'var(--text-heading)' }}>{a.nombre}</h1>
          <div style={{ display: 'flex', gap: 22, margin: '14px 0 0', color: 'var(--text-muted)', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)' }}>
            <Spec icon="bed-double" t={`${a.habitaciones} habitaciones`} />
            <Spec icon="bath" t={`${a.banos} ${a.banos > 1 ? 'baños' : 'baño'}`} />
            <Spec icon="users" t={`${a.capacidadMax} huéspedes`} />
          </div>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-md)', lineHeight: 1.7, color: 'var(--text-body)', margin: '22px 0 0' }}>
            {a.resumen}
          </p>

          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-lg)', margin: '34px 0 16px', fontWeight: 600 }}>Equipamiento</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {a.amenities.map(am => (
              <div key={am} style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-ui)',
                fontSize: 'var(--text-sm)', color: 'var(--text-body)' }}>
                <span style={{ color: 'var(--accent)' }}><Icon name={window.RYN.amenityIcons[am] || 'check'} size={18} /></span>{am}
              </div>
            ))}
          </div>

          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-lg)', margin: '34px 0 16px', fontWeight: 600 }}>Disponibilidad</h3>
          <div style={{ maxWidth: 360, background: 'var(--surface-card)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)' }}>
            <Calendar blocked={blocked} range={{ in: 12, out: 15 }} />
            <div style={{ display: 'flex', gap: 18, marginTop: 14, fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--text-muted)' }}>
              <Legend color="var(--accent)" t="Tu selección" />
              <Legend color="var(--ryn-stone-2)" t="No disponible" />
            </div>
          </div>
        </div>

        {/* Booking sidebar */}
        <aside style={{ position: 'sticky', top: 90, background: 'var(--surface-card)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', boxShadow: 'var(--shadow-card)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-2xl)', fontWeight: 600, color: 'var(--text-heading)' }}>{a.precio}€</span>
            <span style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>/ noche</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, margin: '18px 0' }}>
            <DateBox label="Entrada" value="12 jul 2026" />
            <DateBox label="Salida" value="15 jul 2026" />
          </div>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Row l={`${a.precio}€ × ${nights} noches`} r={`${total}€`} />
            <Row l="Tasa de limpieza" r="incluida" muted />
            <Row l="Total" r={`${total}€`} bold />
          </div>
          <div style={{ marginTop: 18 }}>
            <Button variant="primary" fullWidth size="lg" onClick={() => onReservar(a.slug)}>Reservar</Button>
          </div>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textAlign: 'center', margin: '12px 0 0' }}>
            Confirmamos por email · Sin comisiones
          </p>
        </aside>
      </div>

      {/* Otros apartamentos */}
      <div style={{ background: 'var(--surface-sunken)', padding: 'var(--section-y) 0' }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--container-pad)' }}>
          <SectionHead eyebrow="Otros apartamentos" titulo="También te pueden gustar" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 'var(--space-6)' }}>
            {window.RYN.apartamentos.filter(x => x.slug !== slug).map(o => {
              const { ApartmentCard } = window.RojoYNaranjaDesignSystem_3c785d;
              return <ApartmentCard key={o.slug} tone={o.tone} nombre={o.nombre} capacidad={`${o.capacidadMax} pers.`}
                soloAdultos={!o.aceptaNinos} amenities={o.amenities.slice(0, 3)} precioDesde={o.precio}
                onCta={() => onVer(o.slug)} media={<Photo grad={o.grad} label={`Foto · ${o.nombre.replace('Apartamento ', '')}`} />} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function Spec({ icon, t }) {
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}><Icon name={icon} size={17} />{t}</span>;
}
function Legend({ color, t }) {
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
    <span style={{ width: 11, height: 11, borderRadius: 3, background: color }} />{t}</span>;
}
function DateBox({ label, value }) {
  return (
    <div style={{ border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-sm)', padding: '8px 12px' }}>
      <div style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', color: 'var(--text-heading)', marginTop: 2 }}>{value}</div>
    </div>
  );
}
function Row({ l, r, bold, muted }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-ui)',
      fontSize: bold ? 'var(--text-base)' : 'var(--text-sm)', fontWeight: bold ? 700 : 500,
      color: muted ? 'var(--text-muted)' : 'var(--text-body)' }}>
      <span>{l}</span><span>{r}</span>
    </div>
  );
}
window.ApartmentDetail = ApartmentDetail;
