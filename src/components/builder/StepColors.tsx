'use client'

import { useState, useRef, useCallback } from 'react'
import { RotateCcw } from 'lucide-react'
import { StepColorFamilies } from './StepColorFamilies'
import { StepColorShades } from './StepColorShades'
import { CustomColorPicker } from './CustomColorPicker'
import { PaletteOverrides } from './PaletteOverrides'
import { useBrandStore } from '@/store/brand-store'
import type { ColorPalette } from '@/types/brand'

type ColorSubStep = 'families' | 'shades' | 'custom'

interface SavedCustomState {
  primaryColor: string
  overrides: { light: Partial<ColorPalette>; dark: Partial<ColorPalette> }
}

export function StepColors(): React.ReactElement {
  const [subStep, setSubStep] = useState<ColorSubStep>('families')
  const [selectedSolidFamilyId, setSelectedSolidFamilyId] = useState<string | null>(null)
  const savedCustomRef = useRef<SavedCustomState | null>(null)

  const handleSelectSolidFamily = (familyId: string): void => {
    setSelectedSolidFamilyId(familyId)
    setSubStep('shades')
  }

  const handleBackFromShades = (): void => {
    setSubStep('families')
  }

  // Save custom state when leaving the custom flow
  const handleBackFromCustom = useCallback((): void => {
    const state = useBrandStore.getState()
    savedCustomRef.current = {
      primaryColor: state.primaryColor,
      overrides: { ...state.colorOverrides },
    }
    setSubStep('families')
  }, [])

  // Restore custom state when entering the custom flow
  const handleEnterCustom = useCallback((): void => {
    const saved: SavedCustomState | null = savedCustomRef.current
    if (saved !== null) {
      useBrandStore.getState().setCustomColor(saved.primaryColor)
      useBrandStore.setState({ colorOverrides: saved.overrides })
    }
    setSubStep('custom')
  }, [])

  const colorOverrides = useBrandStore((s) => s.colorOverrides)
  const resetAllColorOverrides = useBrandStore((s) => s.resetAllColorOverrides)
  const hasOverrides: boolean =
    Object.keys(colorOverrides.light).length > 0 || Object.keys(colorOverrides.dark).length > 0

  // Custom color sub-step
  if (subStep === 'custom') {
    return (
      <div className="flex flex-col">
        <button
          type="button"
          onClick={handleBackFromCustom}
          className="mb-4 flex cursor-pointer items-center gap-1 text-sm text-app-text-muted transition-colors hover:text-app-black"
        >
          <span aria-hidden="true">&larr;</span> Back to families
        </button>

        <h2 className="text-2xl font-bold tracking-tight text-app-black">
          Custom color
        </h2>
        <p className="mt-1 text-sm text-app-text-muted">
          Enter any hex color to generate your palette.
        </p>

        <div className="mt-6">
          <CustomColorPicker />
        </div>

        {/* Reset all overrides — prominent placement */}
        {hasOverrides && (
          <button
            type="button"
            onClick={resetAllColorOverrides}
            className="mt-4 flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-red-50
                       px-4 py-2.5 text-xs font-medium text-red-600 transition-colors hover:border-red-300 hover:bg-red-100"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset all palette overrides
          </button>
        )}

        <PaletteOverrides />

      </div>
    )
  }

  // Shade selection - only for solid families
  if (subStep === 'shades' && selectedSolidFamilyId !== null) {
    return <StepColorShades familyId={selectedSolidFamilyId} onBack={handleBackFromShades} />
  }

  // Family selection (gradients + solids)
  return (
    <StepColorFamilies
      onSelectSolidFamily={handleSelectSolidFamily}
      onCustomColor={handleEnterCustom}
    />
  )
}
