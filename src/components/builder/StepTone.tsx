'use client'

import { tonePresets } from '@/data/tones'
import type { TonePreset } from '@/types/tones'
import { useBrandStore } from '@/store/brand-store'

export function StepTone(): React.ReactElement {
  const selectedToneId = useBrandStore((s) => s.tonePresetId)
  const selectTone = useBrandStore((s) => s.selectTone)

  return (
    <div className="flex flex-col">
      {/* Step heading */}
      <h2 className="text-2xl font-bold tracking-tight text-app-black">
        What's your brand's personality?
      </h2>
      <p className="mt-2 text-sm text-app-text-muted">
        This affects the copy in your mockups and brand guide.
      </p>

      {/* Tone preset cards */}
      <div className="mt-6 flex flex-col gap-3">
        {tonePresets.map((preset: TonePreset) => {
          const isSelected: boolean = selectedToneId === preset.id

          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => selectTone(preset.id)}
              className={`flex cursor-pointer flex-col gap-2 rounded-xl border p-5 text-left transition-all duration-150 ${
                isSelected
                  ? 'border-app-black bg-app-bg-alt'
                  : 'border-app-gray-100 hover:-translate-y-0.5 hover:border-app-gray-200 hover:shadow-sm'
              }`}
              aria-label={`${preset.name}: ${preset.description}${isSelected ? ', selected' : ''}`}
            >
              {/* Preset name - uppercase, letterspaced */}
              <span className="text-xs font-semibold uppercase tracking-[2px] text-app-text-muted">
                {preset.name}
              </span>

              {/* Sample headline quote */}
              <span className="text-base italic leading-snug text-app-black">
                &ldquo;{preset.copy.heroHeadline}&rdquo;
              </span>

              {/* Description */}
              <span className="text-[13px] text-app-text-muted">
                {preset.description}
              </span>

              {/* Reference brands */}
              <span className="text-xs italic text-app-text-muted">
                Think: {preset.thinkReferences}
              </span>
            </button>
          )
        })}
      </div>

    </div>
  )
}
