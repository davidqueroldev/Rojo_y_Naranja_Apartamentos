// Availability calendar — month grid with blocked days and an optional
// selectable check-in/check-out range. Used in the detail page and booking flow.
function Calendar({ year = 2026, month = 6, blocked = [], range, onPick, compact }) {
  // month is 0-indexed (6 = July)
  const first = new Date(year, month, 1);
  const startDow = (first.getDay() + 6) % 7; // Monday-first
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = first.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const inRange = (d) => range && range.in && range.out && d > range.in && d < range.out;
  const isEnd = (d) => range && (d === range.in || d === range.out);

  return (
    <div style={{ fontFamily: 'var(--font-ui)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: 'var(--text-base)',
          color: 'var(--text-heading)', textTransform: 'capitalize' }}>{monthName}</span>
        <span style={{ display: 'flex', gap: 6, color: 'var(--text-muted)' }}>
          <Icon name="chevron-left" size={18} /><Icon name="chevron-right" size={18} />
        </span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: compact ? 3 : 5 }}>
        {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((d, i) => (
          <span key={i} style={{ textAlign: 'center', fontSize: 10, fontWeight: 600, letterSpacing: '0.06em',
            color: 'var(--text-muted)', padding: '2px 0' }}>{d}</span>
        ))}
        {cells.map((d, i) => {
          if (!d) return <span key={i} />;
          const isBlocked = blocked.includes(d);
          const end = isEnd(d);
          const mid = inRange(d);
          return (
            <button key={i} disabled={isBlocked} onClick={() => onPick && onPick(d)} style={{
              aspectRatio: '1', border: 0, cursor: isBlocked ? 'not-allowed' : 'pointer',
              borderRadius: end ? 'var(--radius-sm)' : mid ? 0 : 'var(--radius-sm)',
              fontFamily: 'var(--font-ui)', fontSize: compact ? 11 : 13, fontWeight: end ? 700 : 500,
              background: end ? 'var(--accent)' : mid ? 'var(--ryn-rojo-soft)' : 'transparent',
              color: isBlocked ? 'var(--ryn-stone-2)' : end ? '#fff' : 'var(--text-body)',
              textDecoration: isBlocked ? 'line-through' : 'none',
              opacity: isBlocked ? 0.55 : 1,
              transition: 'background var(--dur-fast) var(--ease-out)',
            }}>{d}</button>
          );
        })}
      </div>
    </div>
  );
}
window.Calendar = Calendar;
