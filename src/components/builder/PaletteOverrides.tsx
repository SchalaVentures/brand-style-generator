'use client'

import { useState } from 'react'
import { useBrandStore } from '@/store/brand-store'
import type { ColorPalette } from '@/types/brand'

interface PaletteSection {
  title: string
  roles: { key: keyof ColorPalette; label: string }[]
}

const PALETTE_SECTIONS: PaletteSection[] = [
  {
    title: 'Brand',
    roles: [
      { key: 'primary', label: 'Primary' },
      { key: 'secondary', label: 'Secondary' },
      { key: 'tertiary', label: 'Tertiary' },
      { key: 'accent', label: 'Accent' },
    ],
  },
  {
    title: 'Surface',
    roles: [
      { key: 'bg', label: 'Background' },
      { key: 'surface', label: 'Surface' },
      { key: 'surfaceRaised', label: 'Surface Raised' },
      { key: 'border', label: 'Border' },
    ],
  },
  {
    title: 'Text',
    roles: [
      { key: 'text', label: 'Text' },
      { key: 'textMuted', label: 'Muted' },
    ],
  },
  {
    title: 'Semantic',
    roles: [
      { key: 'success', label: 'Success' },
      { key: 'warning', label: 'Warning' },
      { key: 'error', label: 'Error' },
    ],
  },
]

export function PaletteOverrides(): React.ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const previewMode = useBrandStore((s) => s.previewMode)
  const lightPalette = useBrandStore((s) => s.lightPalette)
  const darkPalette = useBrandStore((s) => s.darkPalette)
  const colorOverrides = useBrandStore((s) => s.colorOverrides)
  const setColorOverride = useBrandStore((s) => s.setColorOverride)
  const resetColorOverride = useBrandStore((s) => s.resetColorOverride)
  const resetAllColorOverrides = useBrandStore((s) => s.resetAllColorOverrides)

  const basePalette: ColorPalette = previewMode === 'light' ? lightPalette : darkPalette
  const overrides: Partial<ColorPalette> = colorOverrides[previewMode]
  const hasOverrides: boolean = Object.keys(overrides).length > 0

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="mt-4 cursor-pointer text-xs text-app-text-muted transition-colors hover:text-app-black"
      >
        Customize palette
      </button>
    )
  }

  return (
    <div className="mt-4 rounded-xl border border-app-gray-100 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-app-black">
          Customize palette ({previewMode})
        </h4>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="cursor-pointer text-xs text-app-text-muted hover:text-app-black"
        >
          Close
        </button>
      </div>

      <div className="space-y-4">
        {PALETTE_SECTIONS.map((section) => (
          <div key={section.title}>
            {/* Section header */}
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-app-text-muted">
              {section.title}
            </p>

            <div className="space-y-2">
              {section.roles.map(({ key, label }) => {
                const currentValue: string = (overrides[key] as string | undefined) ?? basePalette[key]
                const isOverridden: boolean = key in overrides

                return (
                  <div key={key} className="flex items-center gap-2">
                    {/* Color picker */}
                    <input
                      type="color"
                      value={currentValue}
                      onChange={(e) => setColorOverride(previewMode, key, e.target.value)}
                      className="h-6 w-6 cursor-pointer rounded border border-app-gray-100"
                      aria-label={`Override ${label} color`}
                    />

                    {/* Label */}
                    <span className="flex-1 text-xs text-app-text-body">
                      {label}
                    </span>

                    {/* Hex value */}
                    <span className="font-mono text-xs text-app-text-muted">
                      {currentValue}
                    </span>

                    {/* Reset button (if overridden) */}
                    {isOverridden && (
                      <button
                        type="button"
                        onClick={() => resetColorOverride(previewMode, key)}
                        className="cursor-pointer text-[11px] text-app-text-muted hover:text-app-black"
                        aria-label={`Reset ${label} to auto-generated`}
                      >
                        Reset
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Reset all */}
      {hasOverrides && (
        <button
          type="button"
          onClick={resetAllColorOverrides}
          className="mt-3 cursor-pointer text-xs text-red-500 hover:text-red-700"
        >
          Reset all overrides
        </button>
      )}
    </div>
  )
}
