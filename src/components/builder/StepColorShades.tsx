'use client'

import { useBrandStore } from '@/store/brand-store'
import { getSolidFamily } from '@/data/colors'
import { shouldUseWhiteText } from '@/lib/contrast'

const PALETTE_LABELS: Record<string, string> = {
  primary: 'Primary',
  secondary: 'Secondary',
  tertiary: 'Tertiary',
  accent: 'Accent',
  bg: 'Background',
  surface: 'Surface',
  surfaceRaised: 'Surface Raised',
  border: 'Border',
  text: 'Text',
  textMuted: 'Muted',
  success: 'Success',
  warning: 'Warning',
  error: 'Error',
}

interface StepColorShadesProps {
  familyId: string
  onBack: () => void
}

export function StepColorShades({ familyId, onBack }: StepColorShadesProps): React.ReactElement | null {
  const selectedShadeId = useBrandStore((s) => s.colorShadeId)
  const selectColorShade = useBrandStore((s) => s.selectColorShade)
  const selectColorFamily = useBrandStore((s) => s.selectColorFamily)
  const lightPalette = useBrandStore((s) => s.lightPalette)
  const darkPalette = useBrandStore((s) => s.darkPalette)
  const family = getSolidFamily(familyId)
  if (family === undefined) return null

  const handleSelectShade = (shadeId: string, hex: string): void => {
    selectColorFamily(familyId)
    selectColorShade(shadeId, hex)
  }

  const hasSelection: boolean = selectedShadeId !== null

  return (
    <div className="flex flex-col">
      {/* Back to families */}
      <button
        type="button"
        onClick={onBack}
        className="mb-4 flex cursor-pointer items-center gap-1 text-sm text-app-text-muted transition-colors hover:text-app-black"
      >
        <span aria-hidden="true">&larr;</span> Back to families
      </button>

      {/* Family heading */}
      <h2 className="text-2xl font-bold tracking-tight text-app-black">
        {family.name}
      </h2>
      <p className="mt-1 text-sm text-app-text-muted">
        Pick a shade
      </p>

      {/* Shade grid - 4 columns with names */}
      <div className="mt-5 grid grid-cols-4 gap-2">
        {family.shades.map((shade) => {
          const isSelected: boolean = selectedShadeId === shade.id
          const useWhite: boolean = shouldUseWhiteText(shade.hex)

          return (
            <button
              key={shade.id}
              type="button"
              onClick={() => handleSelectShade(shade.id, shade.hex)}
              className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-lg transition-transform duration-100 hover:scale-105 focus-visible:outline-2 focus-visible:outline-app-black ${
                isSelected ? 'ring-2 ring-app-black ring-offset-2' : ''
              }`}
              aria-label={`${shade.name}, ${shade.hex}${isSelected ? ', selected' : ''}`}
            >
              <div
                className="flex h-12 items-center justify-center"
                style={{ backgroundColor: shade.hex }}
              >
                {isSelected && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className={useWhite ? 'text-white' : 'text-black'}
                    aria-hidden="true"
                  >
                    <path
                      d="M3 8L6.5 11.5L13 4.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <div className="bg-white px-1.5 py-1.5 text-center">
                <span className="block text-[11px] font-medium leading-tight text-app-black">
                  {shade.name}
                </span>
                <span className="block font-mono text-[11px] text-app-text-muted">
                  {shade.hex}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Mini palette preview (visible after selecting a shade) */}
      {hasSelection && (
        <div className="mt-6">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-app-text-muted">
            Generated palette
          </p>

          {/* Light mode row */}
          <div className="mb-3">
            <p className="mb-1 text-[11px] text-app-text-muted">Light</p>
            <div className="flex gap-1">
              {(Object.entries(lightPalette) as [string, string][]).map(([role, hex]) => (
                <div
                  key={role}
                  className="flex flex-col items-center"
                  title={`${PALETTE_LABELS[role] ?? role}: ${hex}`}
                >
                  <div
                    className="h-6 w-6 rounded-md border border-app-gray-100"
                    style={{ backgroundColor: hex }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Dark mode row */}
          <div>
            <p className="mb-1 text-[11px] text-app-text-muted">Dark</p>
            <div className="flex gap-1">
              {(Object.entries(darkPalette) as [string, string][]).map(([role, hex]) => (
                <div
                  key={role}
                  className="flex flex-col items-center"
                  title={`${PALETTE_LABELS[role] ?? role}: ${hex}`}
                >
                  <div
                    className="h-6 w-6 rounded-md border border-app-gray-100"
                    style={{ backgroundColor: hex }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
