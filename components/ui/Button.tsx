import { CSSProperties, ReactNode } from 'react'
import Link from 'next/link'

type Variant = 'primary' | 'sand' | 'outline' | 'ghost' | 'light'
type Size = 'sm' | 'md' | 'lg'
type Shape = 'pill' | 'rounded'

interface ButtonProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  shape?: Shape
  fullWidth?: boolean
  disabled?: boolean
  iconLeft?: ReactNode
  iconRight?: ReactNode
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
  style?: CSSProperties
}

const sizes: Record<Size, { padding: string; font: string }> = {
  sm: { padding: '8px 16px',  font: 'var(--text-sm)' },
  md: { padding: '12px 24px', font: 'var(--text-base)' },
  lg: { padding: '15px 34px', font: 'var(--text-md)' },
}

const variants: Record<Variant, CSSProperties> = {
  primary: { background: 'var(--accent)', color: 'var(--accent-on)', border: '1px solid transparent' },
  sand:    { background: 'var(--ryn-oro)', color: 'var(--ryn-ink)', border: '1px solid transparent' },
  outline: { background: 'transparent', color: 'var(--accent)', border: '1px solid var(--border-strong)' },
  ghost:   { background: 'transparent', color: 'var(--text-heading)', border: '1px solid transparent' },
  light:   { background: 'rgba(251,246,238,0.10)', color: 'var(--ryn-cream)', border: '1px solid rgba(251,246,238,0.35)' },
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  shape = 'pill',
  fullWidth = false,
  disabled = false,
  iconLeft,
  iconRight,
  href,
  onClick,
  type = 'button',
  className = '',
  style: extraStyle,
}: ButtonProps) {
  const s = sizes[size]
  const v = variants[variant]

  const style: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.55em',
    fontFamily: 'var(--font-ui)',
    fontWeight: 'var(--fw-semibold)',
    fontSize: s.font,
    lineHeight: 1,
    letterSpacing: '0.01em',
    padding: s.padding,
    borderRadius: shape === 'pill' ? 'var(--radius-pill)' : 'var(--radius-sm)',
    width: fullWidth ? '100%' : 'auto',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'transform var(--dur-fast) var(--ease-out), background var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), filter var(--dur-base) var(--ease-out)',
    textDecoration: 'none',
    ...v,
    ...extraStyle,
  }

  const cls = `ryn-btn ryn-btn--${variant} ${className}`.trim()

  if (href) {
    return (
      <Link href={href} className={cls} style={style}>
        {iconLeft}
        {children}
        {iconRight}
      </Link>
    )
  }

  return (
    <button className={cls} style={style} disabled={disabled} onClick={onClick} type={type}>
      {iconLeft}
      {children}
      {iconRight}
    </button>
  )
}
