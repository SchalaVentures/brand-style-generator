'use client'

import { useBrandStore } from '@/store/brand-store'
import type { ColorPalette } from '@/types/brand'

/**
 * Returns the active palette with color overrides applied.
 * Reactive — re-renders when palette, preview mode, or overrides change.
 */
export function useActivePalette(): ColorPalette {
  const previewMode = useBrandStore((s) => s.previewMode)
  const lightPalette = useBrandStore((s) => s.lightPalette)
  const darkPalette = useBrandStore((s) => s.darkPalette)
  const colorOverrides = useBrandStore((s) => s.colorOverrides)

  const basePalette: ColorPalette = previewMode === 'dark' ? darkPalette : lightPalette
  const overrides: Partial<ColorPalette> = colorOverrides[previewMode]

  return { ...basePalette, ...overrides }
}
