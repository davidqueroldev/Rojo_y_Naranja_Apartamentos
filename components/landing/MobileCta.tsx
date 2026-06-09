'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'

export function MobileCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="ryn-mobile-cta"
      style={{
        position: 'fixed',
        bottom: 20,
        left: '50%',
        transform: `translateX(-50%) translateY(${visible ? 0 : 80}px)`,
        zIndex: 40,
        opacity: visible ? 1 : 0,
        transition: 'transform var(--dur-base) var(--ease-out), opacity var(--dur-base) var(--ease-out)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <Button variant="primary" size="lg" href="#apartamentos" shape="pill" style={{ boxShadow: 'var(--shadow-lg)' } as React.CSSProperties}>
        Ver disponibilidad
      </Button>
    </div>
  )
}
