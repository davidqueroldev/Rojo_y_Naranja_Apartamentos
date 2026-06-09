import { CSSProperties, ReactNode } from 'react'

type Tone = 'neutral' | 'rojo' | 'naranja' | 'plata' | 'oro' | 'success' | 'warning' | 'danger'
type Variant = 'soft' | 'solid' | 'outline'
type Size = 'sm' | 'md'

interface BadgeProps {
  children: ReactNode
  tone?: Tone
  variant?: Variant
  size?: Size
  iconLeft?: ReactNode
}

const palette: Record<Tone, { solid: string; soft: string; softText: string; line: string }> = {
  neutral: { solid: '#3A332D', soft: 'var(--surface-sunken)', softText: 'var(--text-body)', line: 'var(--border-strong)' },
  rojo:    { solid: 'var(--ryn-rojo)',    soft: 'var(--ryn-rojo-soft)',    softText: 'var(--ryn-rojo-dark)',    line: 'var(--ryn-rojo)' },
  naranja: { solid: 'var(--ryn-naranja)', soft: 'var(--ryn-naranja-soft)', softText: 'var(--ryn-naranja-dark)', line: 'var(--ryn-naranja)' },
  plata:   { solid: 'var(--ryn-plata)',   soft: 'var(--ryn-plata-soft)',   softText: 'var(--ryn-plata-dark)',   line: 'var(--ryn-plata)' },
  oro:     { solid: 'var(--ryn-oro)',     soft: 'var(--ryn-oro-soft)',     softText: 'var(--ryn-oro-dark)',     line: 'var(--ryn-oro-dark)' },
  success: { solid: 'var(--ryn-success)', soft: '#E7EEE4', softText: '#3F5938', line: 'var(--ryn-success)' },
  warning: { solid: 'var(--ryn-warning)', soft: '#F7ECD6', softText: '#8A5E14', line: 'var(--ryn-warning)' },
  danger:  { solid: 'var(--ryn-danger)',  soft: 'var(--ryn-rojo-soft)', softText: 'var(--ryn-rojo-dark)', line: 'var(--ryn-danger)' },
}

const sizes: Record<Size, { padding: string; font: string }> = {
  sm: { padding: '2px 8px',  font: 'var(--text-2xs)' },
  md: { padding: '4px 11px', font: 'var(--text-xs)' },
}

export function Badge({ children, tone = 'neutral', variant = 'soft', size = 'md', iconLeft }: BadgeProps) {
  const p = palette[tone]
  const s = sizes[size]

  const styleByVariant: Record<Variant, CSSProperties> = {
    solid:   { background: p.solid, color: (tone === 'oro' || tone === 'plata') ? 'var(--ryn-ink)' : '#fff', border: '1px solid transparent' },
    soft:    { background: p.soft, color: p.softText, border: '1px solid transparent' },
    outline: { background: 'transparent', color: p.softText, border: `1px solid ${p.line}` },
  }

  return (
    <span style={{
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
      ...styleByVariant[variant],
    }}>
      {iconLeft}
      {children}
    </span>
  )
}
