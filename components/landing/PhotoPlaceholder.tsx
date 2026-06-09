interface PhotoPlaceholderProps {
  gradFrom: string
  gradTo: string
  label?: string
  style?: React.CSSProperties
}

export function PhotoPlaceholder({ gradFrom, gradTo, label, style }: PhotoPlaceholderProps) {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: `linear-gradient(135deg, ${gradFrom} 0%, ${gradTo} 100%)`,
      display: 'flex',
      alignItems: 'flex-end',
      padding: '12px 14px',
      ...style,
    }}>
      {label && (
        <span style={{
          fontFamily: 'var(--font-ui)',
          fontSize: 'var(--text-2xs)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(251,246,238,0.45)',
        }}>
          {label}
        </span>
      )}
    </div>
  )
}
