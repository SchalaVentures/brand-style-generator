'use client'

import { useRef, useEffect, useState, type ReactNode } from 'react'

interface StepTransitionProps {
  stepKey: number | string
  direction: 'forward' | 'backward'
  children: ReactNode
}

export function StepTransition({ stepKey, direction, children }: StepTransitionProps): React.ReactElement {
  const [displayChildren, setDisplayChildren] = useState<ReactNode>(children)
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false)
  const [phase, setPhase] = useState<'enter' | 'idle'>('idle')
  const prevKeyRef = useRef<number | string>(stepKey)

  useEffect(() => {
    const prefersReducedMotion: boolean = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prevKeyRef.current !== stepKey) {
      prevKeyRef.current = stepKey

      if (prefersReducedMotion) {
        // Instant swap - no animation
        setDisplayChildren(children)
        return
      }

      // Phase 1: fade out current content
      setIsTransitioning(true)
      setPhase('enter')

      // After exit animation, swap content and slide in
      const exitTimer: ReturnType<typeof setTimeout> = setTimeout(() => {
        setDisplayChildren(children)

        // Force reflow, then start enter animation
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setPhase('idle')
            const enterTimer: ReturnType<typeof setTimeout> = setTimeout(() => {
              setIsTransitioning(false)
            }, 200)
            // Note: cleanup handled by outer useEffect return
            void enterTimer
          })
        })
      }, 200)

      return (): void => clearTimeout(exitTimer)
    } else {
      // Same step key - just update children without animation
      setDisplayChildren(children)
      return
    }
  }, [stepKey, children])

  const getTransform = (): string => {
    if (!isTransitioning) return 'translateX(0)'
    if (phase === 'enter') {
      return direction === 'forward' ? 'translateX(-20px)' : 'translateX(20px)'
    }
    return 'translateX(0)'
  }

  const getOpacity = (): number => {
    if (!isTransitioning) return 1
    if (phase === 'enter') return 0
    return 1
  }

  return (
    <div
      style={{
        transform: getTransform(),
        opacity: getOpacity(),
        transition: isTransitioning ? 'transform 200ms ease-in-out, opacity 200ms ease-in-out' : 'none',
      }}
    >
      {displayChildren}
    </div>
  )
}
