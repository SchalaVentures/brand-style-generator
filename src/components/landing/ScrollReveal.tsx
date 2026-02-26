'use client'

import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import type { ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
}

export function ScrollReveal({ children, delay = 0 }: ScrollRevealProps): React.ReactElement {
  const { ref, isVisible } = useScrollReveal()

  return (
    <div
      ref={ref}
      className="transition-all duration-700 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: `${String(delay)}ms`,
      }}
    >
      {children}
    </div>
  )
}
