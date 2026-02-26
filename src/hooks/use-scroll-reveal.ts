import { useEffect, useRef, useState } from 'react'

interface ScrollRevealResult {
  ref: React.RefObject<HTMLDivElement | null>
  isVisible: boolean
}

export function useScrollReveal(threshold: number = 0.1): ScrollRevealResult {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    const prefersReducedMotion: boolean = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    const observer: IntersectionObserver = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        if (entry !== undefined && entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold },
    )

    if (ref.current !== null) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}
