// Landing content sections below the hero.
const { useState: useS } = React;

function ApartmentsSection({ onVer }) {
  const { ApartmentCard } = window.RojoYNaranjaDesignSystem_3c785d;
  return (
    <section style={{ background: 'var(--bg-page)', padding: 'var(--section-y) 0' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--container-pad)' }}>
        <SectionHead eyebrow="Los apartamentos" titulo="Cuatro estancias, cuatro caracteres"
          texto="Cada apartamento lleva el nombre de un color de nuestra identidad. Todos de diseño moderno, en pleno casco histórico." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginTop: 'var(--space-7)' }}>
          {window.RYN.apartamentos.map(a => (
            <ApartmentCard key={a.slug} tone={a.tone} nombre={a.nombre} capacidad={`${a.capacidadMax} pers.`}
              soloAdultos={!a.aceptaNinos} amenities={a.amenities.slice(0, 3)} precioDesde={a.precio}
              onCta={() => onVer(a.slug)}
              media={<Photo grad={a.grad} label={`Foto · ${a.nombre.replace('Apartamento ', '')}`} />} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  const items = [
    { icon: 'castle', t: 'Centro histórico', d: 'Dentro de la ciudad amurallada, a un paso de todo.' },
    { icon: 'sparkles', t: 'Diseño contemporáneo', d: 'Interiores actuales, cuidados hasta el último detalle.' },
    { icon: 'waves', t: 'Jacuzzi y spa', d: 'Hidromasaje en todos; jacuzzi en Plata y Oro.' },
    { icon: 'badge-percent', t: 'Sin comisiones', d: 'Reserva directa con el propietario. Mejor precio.' },
  ];
  return (
    <section style={{ background: 'var(--ryn-ink)', padding: 'var(--section-y) 0' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--container-pad)' }}>
        <SectionHead dark eyebrow="Por qué reservar directo" titulo="La diferencia de reservar con nosotros" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28, marginTop: 'var(--space-7)' }}>
          {items.map(it => (
            <div key={it.t} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span style={{ display: 'inline-flex', width: 52, height: 52, borderRadius: '50%',
                alignItems: 'center', justifyContent: 'center', background: 'rgba(213,196,176,0.12)',
                color: 'var(--ryn-oro)' }}>
                <Icon name={it.icon} size={24} />
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: '#fff', fontSize: 'var(--text-lg)', margin: '6px 0 0', fontWeight: 600 }}>{it.t}</h3>
              <p style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-on-dark-muted)', fontSize: 'var(--text-sm)', lineHeight: 1.6, margin: 0 }}>{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienciasSection() {
  return (
    <section style={{ background: 'var(--bg-page)', padding: 'var(--section-y) 0' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--container-pad)',
        display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 56, alignItems: 'center' }}>
        <div>
          <SectionHead eyebrow="Morella te espera" titulo="Una villa medieval entre murallas"
            texto="A los pies del castillo, Morella conserva calles empedradas, gastronomía con denominación propia y cielos perfectos para mirar las estrellas." />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 'var(--space-6)' }}>
            {window.RYN.experiencias.map(e => (
              <div key={e.titulo} style={{ display: 'flex', gap: 12 }}>
                <span style={{ color: 'var(--accent)', flex: 'none', marginTop: 2 }}><Icon name={e.icon} size={22} /></span>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, color: 'var(--text-heading)', fontSize: 'var(--text-base)' }}>{e.titulo}</div>
                  <div style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-muted)', fontSize: 'var(--text-sm)', lineHeight: 1.55 }}>{e.texto}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ height: 420, borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-card)' }}>
          <Photo grad={['#2a2521', '#8d7560']} label="Foto · Morella" />
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  return (
    <section style={{ background: 'var(--surface-sunken)', padding: 'var(--section-y) 0' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--container-pad)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <SectionHead eyebrow="Opiniones" titulo="Lo que dicen nuestros huéspedes" noMargin />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Stars value={window.RYN.info.valoracionMedia} />
            <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: 'var(--text-xl)', color: 'var(--text-heading)' }}>
              {window.RYN.info.valoracionMedia}/10
            </span>
            <span style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>· {window.RYN.info.numOpiniones} opiniones</span>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginTop: 'var(--space-7)' }}>
          {window.RYN.reviews.map(r => (
            <figure key={r.nombre} style={{ margin: 0, background: 'var(--surface-card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)', boxShadow: 'var(--shadow-xs)',
              display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Stars value={r.valoracion} />
              <blockquote style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: 'var(--text-base)',
                lineHeight: 1.55, color: 'var(--text-body)', fontStyle: 'italic' }}>“{r.texto}”</blockquote>
              <figcaption style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--ryn-plata-soft)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ryn-plata-dark)',
                  fontFamily: 'var(--font-serif)', fontWeight: 600 }}>{r.nombre[0]}</span>
                <div style={{ lineHeight: 1.2 }}>
                  <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--text-heading)' }}>{r.nombre}</div>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{r.apt}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBanner({ onReservar }) {
  const { Button } = window.RojoYNaranjaDesignSystem_3c785d;
  return (
    <section style={{ position: 'relative', padding: 'var(--space-9) 0' }}>
      <div style={{ position: 'absolute', inset: 0 }}><Photo grad={['#2a1810', '#AF2C0E']} /></div>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(20,17,15,0.55)' }} />
      <div style={{ position: 'relative', maxWidth: 760, margin: '0 auto', textAlign: 'center', padding: '0 var(--container-pad)' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', color: '#fff', fontSize: 'var(--text-3xl)', margin: 0, fontWeight: 600, letterSpacing: '-0.01em' }}>
          Reserva directa, sin comisiones
        </h2>
        <p style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-on-dark)', fontSize: 'var(--text-md)', margin: '14px 0 26px' }}>
          Mejor precio garantizado y atención directa del propietario.
        </p>
        <Button variant="sand" size="lg" onClick={onReservar}>Ver disponibilidad</Button>
      </div>
    </section>
  );
}

function Footer() {
  const i = window.RYN.info;
  return (
    <footer style={{ background: 'var(--ryn-ink)', color: 'var(--text-on-dark-muted)', padding: 'var(--space-8) 0 var(--space-6)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--container-pad)',
        display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 40 }}>
        <div>
          <Logo variant="white" height={64} />
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', lineHeight: 1.7, marginTop: 18, maxWidth: 300 }}>
            Cuatro apartamentos boutique en el centro amurallado de Morella.
          </p>
        </div>
        <div>
          <FooterHead>Contacto</FooterHead>
          <FooterLine icon="map-pin">{i.direccion}</FooterLine>
          <FooterLine icon="phone">{i.telefono}</FooterLine>
          <FooterLine icon="mail">{i.email}</FooterLine>
        </div>
        <div>
          <FooterHead>Registro de turismo</FooterHead>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-xs)', lineHeight: 1.8, margin: 0 }}>{i.registros}</p>
          <div style={{ display: 'flex', gap: 14, marginTop: 16, color: 'var(--ryn-plata)' }}>
            <Icon name="instagram" size={18} /><Icon name="facebook" size={18} />
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 'var(--container-max)', margin: '28px auto 0', padding: '18px var(--container-pad) 0',
        borderTop: '1px solid var(--border-on-dark)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10,
        fontFamily: 'var(--font-ui)', fontSize: 'var(--text-xs)' }}>
        <span>© 2026 Apartamentos Rojo y Naranja · Morella</span>
        <span>Aviso legal · Privacidad · Cookies</span>
      </div>
    </footer>
  );
}
function FooterHead({ children }) {
  return <div className="ryn-overline" style={{ color: 'var(--ryn-oro)', marginBottom: 14 }}>{children}</div>;
}
function FooterLine({ icon, children }) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10,
      fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', lineHeight: 1.5 }}>
      <span style={{ color: 'var(--ryn-plata)', flex: 'none', marginTop: 1 }}><Icon name={icon} size={16} /></span>{children}
    </div>
  );
}

function SectionHead({ eyebrow, titulo, texto, dark, noMargin }) {
  return (
    <div style={{ maxWidth: 620, marginBottom: noMargin ? 0 : undefined }}>
      <div className="ryn-overline" style={{ color: dark ? 'var(--ryn-plata)' : 'var(--accent)' }}>{eyebrow}</div>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-2xl)', margin: '12px 0 0', fontWeight: 600,
        color: dark ? '#fff' : 'var(--text-heading)', letterSpacing: '-0.01em' }}>{titulo}</h2>
      {texto && <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-md)', lineHeight: 1.6, margin: '14px 0 0',
        color: dark ? 'var(--text-on-dark-muted)' : 'var(--text-muted)' }}>{texto}</p>}
    </div>
  );
}

Object.assign(window, { ApartmentsSection, WhySection, ExperienciasSection, ReviewsSection, CtaBanner, Footer, SectionHead });
