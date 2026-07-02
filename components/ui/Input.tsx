import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
}

export function Input({ label, hint, error, id, style, ...rest }: InputProps) {
  const fieldId = id ?? rest.name
  const borderColor = error ? 'var(--ryn-danger)' : 'var(--border-strong)'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
      {label && (
        <label
          htmlFor={fieldId}
          style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 'var(--fw-semibold)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
          }}
        >
          {label}
        </label>
      )}
      <input
        id={fieldId}
        className="ryn-input"
        style={{
          width: '100%',
          fontFamily: 'var(--font-ui)',
          fontSize: 'var(--text-base)',
          color: 'var(--text-body)',
          background: rest.disabled ? 'var(--surface-sunken)' : 'var(--surface-card)',
          border: `1px solid ${borderColor}`,
          borderRadius: 'var(--radius-sm)',
          padding: '11px 14px',
          outline: 'none',
          transition: 'border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
          ...style,
        }}
        {...rest}
      />
      {(hint || error) && (
        <span
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 'var(--text-sm)',
            color: error ? 'var(--ryn-danger)' : 'var(--text-muted)',
          }}
        >
          {error || hint}
        </span>
      )}
    </div>
  )
}
