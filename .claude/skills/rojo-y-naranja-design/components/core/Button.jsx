import React from 'react';

/* Rojo y Naranja design system — core control. */

/**
 * Button — Rojo y Naranja's primary action control.
 * Pill-shaped by default (matches the hero "RESERVAR" CTA). Uses brand
 * tokens only; never hard-codes colour.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  shape = 'pill',
  fullWidth = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  as = 'button',
  ...rest
}) {
  const sizes = {
    sm: { padding: '8px 16px', font: 'var(--text-sm)' },
    md: { padding: '12px 24px', font: 'var(--text-base)' },
    lg: { padding: '15px 34px', font: 'var(--text-md)' },
  };

  const variants = {
    // terracotta fill — the strongest call to action
    primary: {
      background: 'var(--accent)',
      color: 'var(--accent-on)',
      border: '1px solid transparent',
    },
    // warm sand pill with dark text — the hero "RESERVAR" treatment
    sand: {
      background: 'var(--ryn-oro)',
      color: 'var(--ryn-ink)',
      border: '1px solid transparent',
    },
    // outline — secondary actions
    outline: {
      background: 'transparent',
      color: 'var(--accent)',
      border: '1px solid var(--border-strong)',
    },
    // ghost — tertiary / inline
    ghost: {
      background: 'transparent',
      color: 'var(--text-heading)',
      border: '1px solid transparent',
    },
    // for placement on dark photography
    light: {
      background: 'rgba(251, 246, 238, 0.10)',
      color: 'var(--ryn-cream)',
      border: '1px solid rgba(251, 246, 238, 0.35)',
    },
  };

  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;

  const style = {
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
    ...v,
  };

  const Tag = as;
  return (
    <Tag
      className={`ryn-btn ryn-btn--${variant}`}
      style={style}
      disabled={Tag === 'button' ? disabled : undefined}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </Tag>
  );
}
