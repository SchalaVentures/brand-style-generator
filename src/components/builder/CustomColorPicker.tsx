'use client'

import { useState } from 'react'
import { useBrandStore } from '@/store/brand-store'

export function CustomColorPicker(): React.ReactElement {
  const primaryColor = useBrandStore((s) => s.primaryColor)
  const setCustomColor = useBrandStore((s) => s.setCustomColor)
  const [hexInput, setHexInput] = useState<string>(primaryColor)

  const isValidHex: boolean = /^#[0-9A-Fa-f]{6}$/.test(hexInput)

  const handleColorChange = (hex: string): void => {
    setHexInput(hex)
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      setCustomColor(hex)
    }
  }

  const handleInputChange = (value: string): void => {
    // Auto-prepend # if user types without it
    const cleaned: string = value.startsWith('#') ? value : `#${value}`
    setHexInput(cleaned)
    if (/^#[0-9A-Fa-f]{6}$/.test(cleaned)) {
      setCustomColor(cleaned)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold text-app-black">Custom color</h3>

      <div className="flex items-center gap-3">
        {/* Native color picker */}
        <input
          type="color"
          value={primaryColor}
          onChange={(e) => handleColorChange(e.target.value)}
          className="h-10 w-10 cursor-pointer rounded-lg border border-app-gray-100"
          aria-label="Pick a custom color"
        />

        {/* Hex text input */}
        <input
          type="text"
          value={hexInput}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="#2563EB"
          maxLength={7}
          className={`h-10 flex-1 rounded-lg border px-3 font-mono text-sm focus:outline-none focus:ring-1 ${
            isValidHex
              ? 'border-app-gray-100 focus:border-app-black focus:ring-app-black'
              : 'border-red-300 focus:border-red-500 focus:ring-red-500'
          }`}
          aria-label="Hex color value"
        />
      </div>

      {!isValidHex && hexInput.length > 1 && (
        <p className="text-xs text-red-500">Enter a valid hex color (e.g., #2563EB)</p>
      )}
    </div>
  )
}
