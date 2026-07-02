import { CSSProperties, ReactNode } from 'react'

type Padding = 'sm' | 'md' | 'lg'

interface CardProps {
  children: ReactNode
  padding?: Padding
  className?: string
  style?: CSSProperties
}

const paddings: Record<Padding, string> = {
  sm: 'var(--space-4)',
  md: 'var(--space-5)',
  lg: 'var(--space-6)',
}

export function Card({ children, padding = 'md', className = '', style: extraStyle }: CardProps) {
  return (
    <div
      className={className}
      style={{
        background: 'var(--surface-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: paddings[padding],
        ...extraStyle,
      }}
    >
      {children}
    </div>
  )
}
