// Sticky navigation bar — dark, translucent, versalita links + sand CTA.
function Navbar({ onReservar, onHome, onAdmin, scrolled }) {
  const links = ['Inicio', 'Apartamentos', 'Morella', 'Experiencias', 'Contacto'];
  const { Button } = window.RojoYNaranjaDesignSystem_3c785d;
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? 'rgba(20,17,15,0.92)' : 'rgba(20,17,15,0.35)',
      backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
      borderBottom: scrolled ? '1px solid var(--border-on-dark)' : '1px solid transparent',
      transition: 'background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)',
    }}>
      <div style={{
        maxWidth: 'var(--container-max)', margin: '0 auto',
        padding: '14px var(--container-pad)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer', flex: 'none' }} onClick={onHome}>
          <Logo variant="white" height={40} />
          <span style={{ width: 1, height: 30, background: 'var(--border-on-dark)' }} />
          <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 500, fontVariantCaps: 'all-small-caps',
            letterSpacing: '0.1em', fontSize: 14, color: 'var(--ryn-plata)', whiteSpace: 'nowrap' }}>tu lugar en Morella</span>
        </div>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
          {links.map((l, i) => (
            <a key={l} onClick={i === 0 ? onHome : undefined} style={{
              fontFamily: 'var(--font-ui)', fontWeight: 500, fontVariantCaps: 'all-small-caps',
              letterSpacing: '0.08em', fontSize: 16, color: i === 0 ? 'var(--ryn-oro)' : 'var(--text-on-dark)',
              cursor: 'pointer',
            }}>{l}</a>
          ))}
          <Button variant="sand" size="sm" onClick={onReservar}>Reservar</Button>
          <a onClick={onAdmin} title="Acceso propietario" style={{ display: 'inline-flex', color: 'var(--text-on-dark-muted)', cursor: 'pointer' }}>
            <Icon name="shield" size={18} />
          </a>
        </nav>
      </div>
    </header>
  );
}
window.Navbar = Navbar;
