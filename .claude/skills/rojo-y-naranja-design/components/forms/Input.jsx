import React from 'react';

/**
 * Input — labelled text/email/date field for the reservation and
 * email-validation forms. Self-contained: label, optional hint, error state.
 */
export function Input({
  label,
  hint,
  error,
  type = 'text',
  id,
  iconLeft = null,
  value,
  defaultValue,
  placeholder,
  disabled = false,
  ...rest
}) {
  const fieldId = id || `ryn-field-${Math.random().toString(36).slice(2, 8)}`;
  const borderColor = error ? 'var(--ryn-danger)' : 'var(--border-strong)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
      {label && (
        <label htmlFor={fieldId} style={{
          fontFamily: 'var(--font-ui)', fontWeight: 'var(--fw-semibold)',
          fontSize: 'var(--text-xs)', letterSpacing: '0.06em', textTransform: 'uppercase',
          color: 'var(--text-muted)',
        }}>{label}</label>
      )}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {iconLeft && (
          <span style={{ position: 'absolute', left: 12, display: 'inline-flex', color: 'var(--text-muted)', pointerEvents: 'none' }}>
            {iconLeft}
          </span>
        )}
        <input
          id={fieldId}
          type={type}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          className="ryn-input"
          style={{
            width: '100%',
            fontFamily: 'var(--font-ui)',
            fontSize: 'var(--text-base)',
            color: 'var(--text-body)',
            background: disabled ? 'var(--surface-sunken)' : 'var(--surface-card)',
            border: `1px solid ${borderColor}`,
            borderRadius: 'var(--radius-sm)',
            padding: iconLeft ? '11px 14px 11px 38px' : '11px 14px',
            outline: 'none',
            transition: 'border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
          }}
          {...rest}
        />
      </div>
      {(hint || error) && (
        <span style={{
          fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)',
          color: error ? 'var(--ryn-danger)' : 'var(--text-muted)',
        }}>{error || hint}</span>
      )}
    </div>
  );
}
