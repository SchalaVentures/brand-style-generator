'use client'

import { useBrandStore } from '@/store/brand-store'
import Input from '@/components/ui/input'

export function StepBrandName(): React.ReactElement {
  const name = useBrandStore((s) => s.name)
  const tagline = useBrandStore((s) => s.tagline)
  const setName = useBrandStore((s) => s.setName)
  const setTagline = useBrandStore((s) => s.setTagline)
  const nextStep = useBrandStore((s) => s.nextStep)

  const canProceed: boolean = name.trim().length > 0

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter' && canProceed) {
      nextStep()
    }
  }

  return (
    <div className="flex flex-col">
      {/* Step heading */}
      <h2 className="text-2xl font-bold tracking-tight text-app-black">
        What's your brand called?
      </h2>
      <p className="mt-2 text-sm text-app-text-muted">
        This name will appear in all mockups and your brand guide.
      </p>

      {/* Brand name input */}
      <div className="mt-8">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value.slice(0, 50))}
          onKeyDown={handleKeyDown}
          placeholder="e.g., Acme, Noteful, ShipFast"
          autoFocus
          className="text-lg"
        />
        <p className="mt-1.5 text-xs text-app-text-muted">
          {name.length}/50 characters
        </p>
      </div>

      {/* Tagline input */}
      <div className="mt-5">
        <Input
          label="Tagline (optional)"
          value={tagline}
          onChange={(e) => setTagline(e.target.value.slice(0, 100))}
          onKeyDown={handleKeyDown}
          placeholder="e.g., Ship faster, build better"
        />
        <p className="mt-1.5 text-xs text-app-text-muted">
          {tagline.length}/100 characters
        </p>
      </div>

    </div>
  )
}
