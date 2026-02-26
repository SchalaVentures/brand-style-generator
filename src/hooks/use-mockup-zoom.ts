'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const SM_BREAKPOINT: number = 640
const CHROME_OFFSET: number = 260

/**
 * Measures the actual content height at zoom=1, then calculates
 * the zoom factor so the mockup fits the viewport height on mobile.
 * Width is unconstrained — horizontal scroll is available.
 * Returns 1 on sm+ breakpoints.
 */
export function useMockupZoom(): {
  containerRef: React.RefObject<HTMLDivElement | null>
  contentRef: React.RefObject<HTMLDivElement | null>
  zoom: number
} {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const [zoom, setZoom] = useState<number>(1)

  const calculate = useCallback((): void => {
    if (window.innerWidth >= SM_BREAKPOINT) {
      setZoom(1)
      return
    }

    const content: HTMLDivElement | null = contentRef.current
    if (content === null) return

    // Temporarily reset zoom to measure natural height
    const prevZoom: string = content.style.zoom
    content.style.zoom = '1'
    const naturalHeight: number = content.scrollHeight
    content.style.zoom = prevZoom

    const availableHeight: number = window.innerHeight - CHROME_OFFSET
    const newZoom: number = Math.min(1, availableHeight / naturalHeight)
    setZoom(newZoom)
  }, [])

  useEffect(() => {
    // Delay initial calculation so content has rendered
    requestAnimationFrame((): void => {
      calculate()
    })

    window.addEventListener('resize', calculate)
    return (): void => {
      window.removeEventListener('resize', calculate)
    }
  }, [calculate])

  return { containerRef, contentRef, zoom }
}
