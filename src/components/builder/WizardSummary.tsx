'use client'

import { useState } from 'react'
import { useBrandStore } from '@/store/brand-store'
import { ConfirmModal } from '@/components/ui/confirm-modal'
import { getSolidFamily, getGradientFamily } from '@/data/colors'
import { getFontCategory } from '@/data/fonts'
import { getTonePreset } from '@/data/tones'
import type { ColorFamily } from '@/types/colors'
import type { FontCategory } from '@/types/fonts'
import type { TonePreset } from '@/types/tones'

export function WizardSummary(): React.ReactElement {
  const name = useBrandStore((s) => s.name)
  const tagline = useBrandStore((s) => s.tagline)
  const colorFamilyId = useBrandStore((s) => s.colorFamilyId)
  const colorShadeId = useBrandStore((s) => s.colorShadeId)
  const colorType = useBrandStore((s) => s.colorType)
  const primaryColor = useBrandStore((s) => s.primaryColor)
  const fontCategoryId = useBrandStore((s) => s.fontCategoryId)
  const headingFont = useBrandStore((s) => s.headingFont)
  const headingWeight = useBrandStore((s) => s.headingWeight)
  const bodyFont = useBrandStore((s) => s.bodyFont)
  const bodyWeight = useBrandStore((s) => s.bodyWeight)
  const tonePresetId = useBrandStore((s) => s.tonePresetId)
  const setStep = useBrandStore((s) => s.setStep)
  const resetAll = useBrandStore((s) => s.resetAll)
  const [confirmReset, setConfirmReset] = useState<boolean>(false)

  // Resolve display names
  const solidFamily: ColorFamily | undefined = colorFamilyId !== null
    ? getSolidFamily(colorFamilyId)
    : undefined
  const gradientFamily = colorFamilyId !== null && colorType === 'gradient'
    ? getGradientFamily(colorFamilyId)
    : undefined

  const shade = solidFamily !== undefined && colorShadeId !== null
    ? solidFamily.shades.find((s) => s.id === colorShadeId)
    : undefined

  const colorName: string = colorType === 'gradient'
    ? (gradientFamily?.name ?? 'Gradient')
    : (shade?.name ?? 'Custom color')

  const fontCategory: FontCategory | undefined = fontCategoryId !== null
    ? getFontCategory(fontCategoryId)
    : undefined

  const tone: TonePreset | undefined = tonePresetId !== null
    ? getTonePreset(tonePresetId)
    : undefined

  const handleEditStep = (step: number): void => {
    setStep(step)
  }

  const handleStartOver = (): void => {
    setConfirmReset(true)
  }

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold tracking-tight text-app-black">
        Your brand style
      </h2>

      <div className="mt-6 flex flex-col gap-3">
        {/* Brand Name card */}
        <button
          type="button"
          onClick={() => handleEditStep(0)}
          className="flex items-start gap-3 rounded-xl border border-app-gray-100 p-4 text-left transition-all duration-150 hover:border-app-gray-200 hover:shadow-sm"
        >
          <span className="text-lg text-app-text-muted">Aa</span>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-app-black">{name}</span>
            {tagline !== '' && (
              <span className="text-xs text-app-text-muted">{tagline}</span>
            )}
          </div>
        </button>

        {/* Color card */}
        <button
          type="button"
          onClick={() => handleEditStep(1)}
          className="flex items-center gap-3 rounded-xl border border-app-gray-100 p-4 text-left transition-all duration-150 hover:border-app-gray-200 hover:shadow-sm"
        >
          <div
            className="h-8 w-8 shrink-0 rounded-lg"
            style={
              colorType === 'gradient' && gradientFamily !== undefined
                ? { background: gradientFamily.gradientCSS }
                : { backgroundColor: primaryColor }
            }
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-app-black">
              {colorName}
            </span>
            <span className="font-mono text-xs text-app-text-muted">
              {primaryColor}
            </span>
          </div>
        </button>

        {/* Typography card */}
        <button
          type="button"
          onClick={() => handleEditStep(2)}
          className="flex items-start gap-3 rounded-xl border border-app-gray-100 p-4 text-left transition-all duration-150 hover:border-app-gray-200 hover:shadow-sm"
        >
          <span
            className="text-lg text-app-text-muted"
            style={{ fontFamily: `"${headingFont}", system-ui` }}
          >
            Aa
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-app-black">
              {fontCategory?.name ?? 'Custom'}
            </span>
            <span className="text-xs text-app-text-muted">
              {headingFont} {headingWeight} + {bodyFont} {bodyWeight}
            </span>
          </div>
        </button>

        {/* Tone card */}
        <button
          type="button"
          onClick={() => handleEditStep(3)}
          className="flex items-start gap-3 rounded-xl border border-app-gray-100 p-4 text-left transition-all duration-150 hover:border-app-gray-200 hover:shadow-sm"
        >
          <span className="text-lg text-app-text-muted">&ldquo;&rdquo;</span>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-app-black">
              {tone?.name ?? 'Unknown'}
            </span>
            <span className="text-xs text-app-text-muted">
              {tone?.description}
            </span>
          </div>
        </button>
      </div>

      {/* Guidance text */}
      <p className="mt-6 text-sm text-app-text-muted">
        Explore your brand in the preview panel. Click any card above to edit.
      </p>

      {/* Start over */}
      <button
        type="button"
        onClick={handleStartOver}
        className="mt-6 text-sm text-app-text-muted transition-colors hover:text-red-500"
      >
        Start over
      </button>

      <ConfirmModal
        open={confirmReset}
        title="Start over?"
        description="This will reset all your choices — name, colors, fonts, and tone."
        confirmLabel="Start over"
        destructive
        onConfirm={() => { setConfirmReset(false); resetAll() }}
        onCancel={() => { setConfirmReset(false) }}
      />
    </div>
  )
}
