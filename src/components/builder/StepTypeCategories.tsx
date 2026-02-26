'use client'

import { useEffect } from 'react'
import { fontCategories } from '@/data/fonts'
import type { FontCategory } from '@/types/fonts'
import { useBrandStore } from '@/store/brand-store'
import { preloadFontCategory, loadGoogleFont } from '@/lib/fonts'

interface StepTypeCategoriesProps {
  onSelectCategory: (categoryId: string) => void
  onCustomPairing: () => void
}

export function StepTypeCategories({ onSelectCategory, onCustomPairing }: StepTypeCategoriesProps): React.ReactElement {
  const selectedCategoryId = useBrandStore((s) => s.fontCategoryId)

  // Preload the first font of each category for "Aa" previews
  useEffect(() => {
    fontCategories.forEach((cat: FontCategory) => {
      const firstPair = cat.pairs[0]
      if (firstPair !== undefined) {
        loadGoogleFont(firstPair.heading.family, [firstPair.heading.weight])
      }
    })
  }, [])

  const handleCategoryClick = (categoryId: string): void => {
    // Find the category object to pass to preloadFontCategory
    const category: FontCategory | undefined = fontCategories.find((c) => c.id === categoryId)
    if (category !== undefined) {
      preloadFontCategory(category)
    }
    onSelectCategory(categoryId)
  }

  return (
    <div className="flex flex-col">
      {/* Step heading */}
      <h2 className="text-2xl font-bold tracking-tight text-app-black">
        Choose your type style
      </h2>
      <p className="mt-2 text-sm text-app-text-muted">
        Pick a category, then choose your font pairing.
      </p>

      {/* Category cards - single column */}
      <div className="mt-6 flex flex-col gap-3">
        {fontCategories.map((category: FontCategory) => {
          const isSelected: boolean = selectedCategoryId === category.id
          const representativeFont: string = category.pairs[0]?.heading.family ?? 'Inter'

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => handleCategoryClick(category.id)}
              className={`flex cursor-pointer flex-col gap-1 rounded-xl border px-5 py-4 text-left transition-all duration-150 ${
                isSelected
                  ? 'border-app-black'
                  : 'border-app-gray-100 hover:-translate-y-0.5 hover:border-app-gray-200 hover:shadow-sm'
              }`}
            >
              {/* Category name - uppercase, small, letterspaced */}
              <span className="text-xs font-medium uppercase tracking-[2px] text-app-text-muted">
                {category.name}
              </span>

              {/* "Aa" sample in the representative heading font */}
              <span
                className="text-[28px] font-bold leading-tight text-app-black"
                style={{ fontFamily: `"${representativeFont}", system-ui, sans-serif` }}
              >
                Aa
              </span>

              {/* Description */}
              <span className="text-xs text-app-text-muted">
                {category.description}
              </span>

              {/* Pair count */}
              <span className="text-xs text-app-text-muted">
                {category.pairs.length} pairings
              </span>
            </button>
          )
        })}
      </div>

      {/* Custom font pairing option */}
      <div className="mt-5 flex items-center gap-2">
        <div className="h-px flex-1 bg-app-gray-100" />
        <span className="text-xs text-app-text-muted">or</span>
        <div className="h-px flex-1 bg-app-gray-100" />
      </div>

      <button
        type="button"
        onClick={onCustomPairing}
        className="mt-6 w-full cursor-pointer rounded-xl border border-app-gray-100 py-3 text-sm text-app-text-muted
                   transition-all duration-150 hover:border-app-gray-200 hover:text-app-black hover:shadow-sm"
      >
        Custom font pairing
      </button>
    </div>
  )
}
