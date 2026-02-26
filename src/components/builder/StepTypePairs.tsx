'use client'

import { useBrandStore } from '@/store/brand-store'
import { getFontCategory } from '@/data/fonts'
import type { FontCategory, FontPair } from '@/types/fonts'

interface StepTypePairsProps {
  categoryId: string
  onBack: () => void
}

export function StepTypePairs({ categoryId, onBack }: StepTypePairsProps): React.ReactElement | null {
  const selectedPairId = useBrandStore((s) => s.fontPairId)
  const selectFontPair = useBrandStore((s) => s.selectFontPair)

  const category: FontCategory | undefined = getFontCategory(categoryId)
  if (category === undefined) return null

  return (
    <div className="flex flex-col">
      {/* Back to categories */}
      <button
        type="button"
        onClick={onBack}
        className="mb-4 flex cursor-pointer items-center gap-1 text-sm text-app-text-muted transition-colors hover:text-app-black"
      >
        <span aria-hidden="true">&larr;</span> Back to categories
      </button>

      {/* Category heading */}
      <h2 className="text-2xl font-bold tracking-tight text-app-black">
        {category.name}
      </h2>
      <p className="mt-1 text-sm text-app-text-muted">
        Pick a font pairing
      </p>

      {/* Pair cards */}
      <div className="mt-5 flex flex-col gap-3">
        {category.pairs.map((pair: FontPair) => {
          const isSelected: boolean = selectedPairId === pair.id

          return (
            <button
              key={pair.id}
              type="button"
              onClick={() =>
                selectFontPair(
                  pair.id,
                  pair.heading.family,
                  pair.heading.weight,
                  pair.body.family,
                  pair.body.weight,
                )
              }
              className={`flex cursor-pointer flex-col gap-2 rounded-xl border p-5 text-left transition-all duration-150 ${
                isSelected
                  ? 'border-app-black bg-app-bg-alt'
                  : 'border-app-gray-100 hover:-translate-y-0.5 hover:border-app-gray-200 hover:shadow-sm'
              }`}
              aria-label={`${pair.heading.family} ${pair.heading.weight} + ${pair.body.family} ${pair.body.weight}${isSelected ? ', selected' : ''}`}
            >
              {/* Heading sample */}
              <span
                className="leading-tight text-[22px] text-app-black"
                style={{
                  fontFamily: `"${pair.heading.family}", system-ui, sans-serif`,
                  fontWeight: pair.heading.weight,
                }}
              >
                The quick brown fox jumps over the lazy dog.
              </span>

              {/* Body sample */}
              <span
                className="text-sm leading-relaxed text-app-text-body"
                style={{
                  fontFamily: `"${pair.body.family}", system-ui, sans-serif`,
                  fontWeight: pair.body.weight,
                }}
              >
                Body text sample rendered in the body font showing how paragraphs would look in this pairing at regular weight and size.
              </span>

              {/* Meta: font names + weights */}
              <span className="mt-1 text-xs font-medium text-app-text-muted">
                {pair.heading.family} {pair.heading.weight} + {pair.body.family} {pair.body.weight}
              </span>
            </button>
          )
        })}
      </div>

    </div>
  )
}
