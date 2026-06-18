// Shared presentational helpers for the landing kit. Exposed on window.
// Loaded as a Babel script BEFORE the section files.

const { useEffect, useRef } = React;

// Re-scan the DOM so Lucide swaps <i data-lucide> for SVGs after React renders.
function useLucide(dep) {
  useEffect(() => {
    if (window.lucide && window.lucide.createIcons) {
      window.lucide.createIcons();
    }
  });
}

// Thin-stroke Lucide icon. Renders into a ref-managed span so Lucide's node
// swap never collides with React reconciliation. size in px; color via currentColor.
function Icon({ name, size = 20, fill = false, style }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.lucide) return;
    el.innerHTML = `<i data-lucide="${name}"></i>`;
    window.lucide.createIcons();
  }, [name]);
  return (
    <span
      ref={ref}
      className={'ryn-ic' + (fill ? ' ryn-ic--fill' : '')}
      style={{ display: 'inline-flex', width: size, height: size, flex: 'none', ...style }}
    />
  );
}

// Warm moody gradient placeholder standing in for the dark interior photography.
// `label` is a quiet caption; real photos replace these in production.
function Photo({ grad = ['#2a2521', '#6b5b4f'], label, children, style }) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%', height: '100%',
        background: `linear-gradient(140deg, ${grad[0]} 0%, ${grad[1]} 120%)`,
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* faint texture so flat gradients read as photography stand-ins */}
      <div style={{ position: 'absolute', inset: 0, background:
        'radial-gradient(120% 80% at 80% 10%, rgba(255,255,255,0.10), transparent 60%)' }} />
      {label && (
        <span style={{
          position: 'absolute', left: 14, bottom: 12,
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.72)',
        }}>
          <Icon name="image" size={12} /> {label}
        </span>
      )}
      {children}
    </div>
  );
}

function Stars({ value = 10, max = 10 }) {
  // value is /10 on the source; render as 5 stars
  const fivescale = value / 2;
  const full = Math.round(fivescale);
  return (
    <span style={{ display: 'inline-flex', gap: 2, color: 'var(--ryn-naranja)' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} name="star" size={15} fill={i < full} />
      ))}
    </span>
  );
}

// The wordmark — uses the extracted brand logo asset.
function Logo({ variant = 'white', height = 46 }) {
  const src = variant === 'white' ? 'logo-white.png'
            : variant === 'rojo' ? 'logo-rojo.png' : 'logo-dark.png';
  return <img src={`../../assets/${src}`} alt="Rojo y Naranja · Morella" style={{ height, width: 'auto', display: 'block' }} />;
}

Object.assign(window, { useLucide, Icon, Photo, Stars, Logo });
