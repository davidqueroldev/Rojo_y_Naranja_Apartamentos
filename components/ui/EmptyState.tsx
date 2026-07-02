import { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 'var(--space-2)',
        padding: 'var(--space-7) var(--space-5)',
        color: 'var(--text-muted)',
      }}
    >
      {icon && (
        <div style={{ color: 'var(--ryn-stone-2)', marginBottom: 'var(--space-2)' }}>
          {icon}
        </div>
      )}
      <p style={{ margin: 0, fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 'var(--text-base)', color: 'var(--text-heading)' }}>
        {title}
      </p>
      {description && (
        <p style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', maxWidth: 360 }}>
          {description}
        </p>
      )}
      {action && <div style={{ marginTop: 'var(--space-3)' }}>{action}</div>}
    </div>
  )
}
