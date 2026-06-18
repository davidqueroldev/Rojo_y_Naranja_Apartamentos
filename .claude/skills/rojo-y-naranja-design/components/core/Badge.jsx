import React from 'react';

/**
 * Badge — compact label for capacity, restrictions and apartment identity.
 * Tones map to the brand palette; `soft` is the default low-emphasis style.
 */
export function Badge({
  children,
  tone = 'neutral',
  variant = 'soft',
  size = 'md',
  iconLeft = null,
  ...rest
}) {
  const palette = {
    neutral: { solid: '#3A332D', soft: 'var(--surface-sunken)', softText: 'var(--text-body)', line: 'var(--border-strong)' },
    rojo:    { solid: 'var(--ryn-rojo)',    soft: 'var(--ryn-rojo-soft)',    softText: 'var(--ryn-rojo-dark)',    line: 'var(--ryn-rojo)' },
    naranja: { solid: 'var(--ryn-naranja)', soft: 'var(--ryn-naranja-soft)', softText: 'var(--ryn-naranja-dark)', line: 'var(--ryn-naranja)' },
    plata:   { solid: 'var(--ryn-plata)',   soft: 'var(--ryn-plata-soft)',   softText: 'var(--ryn-plata-dark)',   line: 'var(--ryn-plata)' },
    oro:     { solid: 'var(--ryn-oro)',      soft: 'var(--ryn-oro-soft)',      softText: 'var(--ryn-oro-dark)',     line: 'var(--ryn-oro-dark)' },
    success: { solid: 'var(--ryn-success)',  soft: '#E7EEE4', softText: '#3F5938', line: 'var(--ryn-success)' },
    warning: { solid: 'var(--ryn-warning)',  soft: '#F7ECD6', softText: '#8A5E14', line: 'var(--ryn-warning)' },
    danger:  { solid: 'var(--ryn-danger)',   soft: 'var(--ryn-rojo-soft)', softText: 'var(--ryn-rojo-dark)', line: 'var(--ryn-danger)' },
  };

  const p = palette[tone] || palette.neutral;
  const sizes = {
    sm: { padding: '2px 8px', font: 'var(--text-2xs)' },
    md: { padding: '4px 11px', font: 'var(--text-xs)' },
  };
  const s = sizes[size] || sizes.md;

  const styleByVariant = {
    solid:   { background: p.solid, color: tone === 'oro' || tone === 'plata' ? 'var(--ryn-ink)' : '#fff', border: '1px solid transparent' },
    soft:    { background: p.soft, color: p.softText, border: '1px solid transparent' },
    outline: { background: 'transparent', color: p.softText, border: `1px solid ${p.line}` },
  };
  const v = styleByVariant[variant] || styleByVariant.soft;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4em',
        fontFamily: 'var(--font-ui)',
        fontWeight: 'var(--fw-semibold)',
        fontSize: s.font,
        lineHeight: 1.2,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        padding: s.padding,
        borderRadius: 'var(--radius-pill)',
        whiteSpace: 'nowrap',
        ...v,
      }}
      {...rest}
    >
      {iconLeft}
      {children}
    </span>
  );
}
