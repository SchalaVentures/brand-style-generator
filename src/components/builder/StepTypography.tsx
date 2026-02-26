'use client'

import { useState } from 'react'
import { StepTypeCategories } from './StepTypeCategories'
import { StepTypePairs } from './StepTypePairs'
import { CustomFontPairing } from './CustomFontPairing'

type TypeSubStep = 'categories' | 'pairs' | 'custom'

export function StepTypography(): React.ReactElement {
  const [subStep, setSubStep] = useState<TypeSubStep>('categories')
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)

  const handleSelectCategory = (categoryId: string): void => {
    setSelectedCategoryId(categoryId)
    setSubStep('pairs')
  }

  const handleBackFromPairs = (): void => {
    setSubStep('categories')
  }

  // Custom font pairing sub-step
  if (subStep === 'custom') {
    return (
      <div className="flex flex-col">
        <button
          type="button"
          onClick={() => setSubStep('categories')}
          className="mb-4 flex cursor-pointer items-center gap-1 text-sm text-app-text-muted transition-colors hover:text-app-black"
        >
          <span aria-hidden="true">&larr;</span> Back to categories
        </button>

        <CustomFontPairing />

      </div>
    )
  }

  // Pair selection
  if (subStep === 'pairs' && selectedCategoryId !== null) {
    return (
      <StepTypePairs
        categoryId={selectedCategoryId}
        onBack={handleBackFromPairs}
      />
    )
  }

  // Category selection
  return (
    <StepTypeCategories
      onSelectCategory={handleSelectCategory}
      onCustomPairing={() => setSubStep('custom')}
    />
  )
}
