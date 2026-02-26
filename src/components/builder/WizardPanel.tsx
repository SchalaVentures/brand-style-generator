'use client'

import { useEffect } from 'react'
import { useBrandStore } from '@/store/brand-store'
import { ProgressIndicator } from './ProgressIndicator'
import { StepBrandName } from './StepBrandName'
import { StepColors } from './StepColors'
import { StepTypography } from './StepTypography'
import { StepTone } from './StepTone'
import { WizardSummary } from './WizardSummary'

export function WizardPanel(): React.ReactElement {
  const currentStep = useBrandStore((s) => s.currentStep)
  const wizardCompleted = useBrandStore((s) => s.wizardCompleted)
  const setStep = useBrandStore((s) => s.setStep)

  // Keyboard shortcut: Escape goes back
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      const tag: string = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return

      if (e.key === 'Escape' && currentStep > 0) {
        e.preventDefault()
        setStep(currentStep - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return (): void => window.removeEventListener('keydown', handleKeyDown)
  }, [currentStep, wizardCompleted, setStep])

  const showSummary: boolean = wizardCompleted && currentStep > 3

  const renderStep = (): React.ReactElement => {
    if (showSummary) return <WizardSummary />

    switch (currentStep) {
      case 0: return <StepBrandName />
      case 1: return <StepColors />
      case 2: return <StepTypography />
      case 3: return <StepTone />
      default: return <WizardSummary />
    }
  }

  return (
    <div className="flex min-h-full flex-col px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
      <ProgressIndicator />
      <div className="flex-1 pb-8">
        {renderStep()}
      </div>
    </div>
  )
}
