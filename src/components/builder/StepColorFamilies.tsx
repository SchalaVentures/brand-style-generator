'use client'

import { solidFamilies, gradientFamilies } from '@/data/colors'
import type { GradientFamily } from '@/types/colors'
import { useBrandStore } from '@/store/brand-store'

interface StepColorFamiliesProps {
  onSelectSolidFamily: (familyId: string) => void
  onCustomColor: () => void
}

export function StepColorFamilies({ onSelectSolidFamily, onCustomColor }: StepColorFamiliesProps): React.ReactElement {
  const selectedFamilyId = useBrandStore((s) => s.colorFamilyId)
  const colorType = useBrandStore((s) => s.colorType)
  const selectGradient = useBrandStore((s) => s.selectGradient)

  const handleSelectGradient = (gradient: GradientFamily): void => {
    selectGradient(
      gradient.id,
      gradient.primaryStop,
      gradient.gradientCSS,
      gradient.stops.map((s) => s.hex),
    )
  }

  return (
    <div className="flex flex-col">
      {/* Step heading */}
      <h2 className="text-2xl font-bold tracking-tight text-app-black">
        Pick your primary color
      </h2>
      <p className="mt-2 text-sm text-app-text-muted">
        Choose a gradient or color family.
      </p>

      {/* Gradient families section */}
      <div className="mt-6">
        <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-app-text-muted">
          Gradients
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {gradientFamilies.map((gradient) => (
            <button
              key={gradient.id}
              type="button"
              onClick={() => handleSelectGradient(gradient)}
              className={`group flex cursor-pointer flex-col overflow-hidden rounded-xl border transition-all duration-150 ${
                selectedFamilyId === gradient.id && colorType === 'gradient'
                  ? 'border-app-black'
                  : 'border-app-gray-100 hover:-translate-y-0.5 hover:border-app-gray-200 hover:shadow-sm'
              }`}
            >
              {/* Gradient strip at top */}
              <div
                className="h-5 w-full"
                style={{ background: gradient.gradientCSS }}
              />

              {/* Gradient info */}
              <div className="flex flex-col px-3 py-2.5">
                <span className="text-left text-sm font-semibold text-app-black">
                  {gradient.name}
                </span>
                <span className="text-left text-xs text-app-text-muted">
                  {gradient.stops.length} colors
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="mt-6 flex items-center gap-2">
        <div className="h-px flex-1 bg-app-gray-100" />
        <span className="text-xs text-app-text-muted">or pick a solid color</span>
        <div className="h-px flex-1 bg-app-gray-100" />
      </div>

      {/* Solid color families section */}
      <div className="mt-4">
        <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-app-text-muted">
          Solid Colors
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {solidFamilies.map((family) => (
            <button
              key={family.id}
              type="button"
              onClick={() => onSelectSolidFamily(family.id)}
              className={`group flex cursor-pointer flex-col overflow-hidden rounded-xl border transition-all duration-150 ${
                selectedFamilyId === family.id && colorType === 'solid'
                  ? 'border-app-black'
                  : 'border-app-gray-100 hover:-translate-y-0.5 hover:border-app-gray-200 hover:shadow-sm'
              }`}
            >
              {/* Color strip at top */}
              <div
                className="h-5 w-full"
                style={{ backgroundColor: family.representative }}
              />

              {/* Family info */}
              <div className="flex flex-col px-3 py-2.5">
                <span className="text-left text-sm font-semibold text-app-black">
                  {family.name}
                </span>
                <span className="text-left text-xs text-app-text-muted">
                  {family.shades.length} shades
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom color option */}
      <div className="mt-8 flex items-center gap-2">
        <div className="h-px flex-1 bg-app-gray-100" />
        <span className="text-xs text-app-text-muted">or</span>
        <div className="h-px flex-1 bg-app-gray-100" />
      </div>

      <button
        type="button"
        onClick={onCustomColor}
        className="mt-6 w-full cursor-pointer rounded-xl border border-app-gray-100 py-3 text-sm text-app-text-muted
                   transition-all duration-150 hover:border-app-gray-200 hover:text-app-black hover:shadow-sm"
      >
        Use custom color
      </button>

    </div>
  )
}
