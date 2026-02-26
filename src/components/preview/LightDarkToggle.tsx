'use client'

import { useBrandStore } from '@/store/brand-store'

export function LightDarkToggle(): React.ReactElement {
  const previewMode = useBrandStore((s) => s.previewMode)
  const setPreviewMode = useBrandStore((s) => s.setPreviewMode)

  const isLight: boolean = previewMode === 'light'

  return (
    <div
      className="flex h-8 items-center gap-0.5 rounded-full bg-app-bg-alt p-0.5"
      role="radiogroup"
      aria-label="Preview color mode"
    >
      <button
        type="button"
        onClick={() => setPreviewMode('light')}
        className={`flex h-7 items-center gap-1 rounded-full px-3 text-xs font-medium transition-all duration-150 ${
          isLight
            ? 'bg-white text-app-black shadow-sm'
            : 'text-app-text-muted hover:text-app-black'
        }`}
        role="radio"
        aria-checked={isLight}
        aria-label="Light mode preview"
      >
        <span aria-hidden="true" className="text-sm">&#9728;</span>
        Light
      </button>
      <button
        type="button"
        onClick={() => setPreviewMode('dark')}
        className={`flex h-7 items-center gap-1 rounded-full px-3 text-xs font-medium transition-all duration-150 ${
          !isLight
            ? 'bg-white text-app-black shadow-sm'
            : 'text-app-text-muted hover:text-app-black'
        }`}
        role="radio"
        aria-checked={!isLight}
        aria-label="Dark mode preview"
      >
        <span aria-hidden="true" className="text-sm">&#9790;</span>
        Dark
      </button>
    </div>
  )
}
