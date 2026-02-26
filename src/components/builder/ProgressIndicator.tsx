'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useBrandStore } from '@/store/brand-store'

const STEPS: { id: number; label: string }[] = [
  { id: 0, label: 'Name' },
  { id: 1, label: 'Colors' },
  { id: 2, label: 'Fonts' },
  { id: 3, label: 'Tone' },
]

export function ProgressIndicator(): React.ReactElement {
  const currentStep = useBrandStore((s) => s.currentStep)
  const setStep = useBrandStore((s) => s.setStep)
  const nextStep = useBrandStore((s) => s.nextStep)
  const prevStep = useBrandStore((s) => s.prevStep)
  const completeWizard = useBrandStore((s) => s.completeWizard)
  const wizardCompleted = useBrandStore((s) => s.wizardCompleted)
  const name = useBrandStore((s) => s.name)
  const tonePresetId = useBrandStore((s) => s.tonePresetId)

  // When editing a step after wizard completion, still allow navigation
  const isEditingStep: boolean = wizardCompleted && currentStep <= 3

  const canGoNext: boolean = (() => {
    if (wizardCompleted && !isEditingStep) return false
    switch (currentStep) {
      case 0: return name.trim().length > 0
      case 3: return tonePresetId !== null
      default: return true
    }
  })()

  const canGoBack: boolean = currentStep > 0

  const handleNext = (): void => {
    if (!canGoNext) return
    if (currentStep === 3 && !wizardCompleted) {
      completeWizard()
    } else if (currentStep === 3 && wizardCompleted) {
      // Return to summary when done editing
      setStep(4)
    } else {
      nextStep()
    }
  }

  const nextLabel: string = currentStep === 3
    ? (wizardCompleted ? 'Done' : 'Complete')
    : 'Next'

  const stepDots = (
    <ol className="flex items-center gap-0">
      {STEPS.map((step, index) => {
        const isCompleted: boolean = currentStep > step.id || (wizardCompleted && currentStep !== step.id)
        const isCurrent: boolean = currentStep === step.id

        return (
          <li key={step.id} className="flex items-center">
            <button
              type="button"
              onClick={() => { setStep(step.id) }}
              disabled={false}
              className="flex cursor-pointer flex-col items-center gap-1.5"
              aria-current={isCurrent ? 'step' : undefined}
              aria-label={`Step ${step.id + 1}: ${step.label}${isCompleted ? ' (completed)' : ''}`}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium transition-colors duration-150 ${
                  isCompleted
                    ? 'cursor-pointer bg-app-black text-white'
                    : isCurrent
                      ? 'cursor-pointer border-2 border-app-black text-app-black'
                      : 'cursor-pointer border border-app-gray-200 text-app-gray-400 hover:border-app-gray-400'
                }`}
              >
                {isCompleted ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path
                      d="M2.5 6L5 8.5L9.5 3.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  step.id + 1
                )}
              </span>
              <span className="text-xs font-medium text-app-black">
                {step.label}
              </span>
            </button>

            {index < STEPS.length - 1 && (
              <div
                className={`mx-3 h-px w-10 ${
                  currentStep > step.id || (wizardCompleted && currentStep !== step.id) ? 'bg-app-black' : 'bg-app-gray-200'
                }`}
                aria-hidden="true"
              />
            )}
          </li>
        )
      })}
    </ol>
  )

  const backButton = (
    <button
      type="button"
      onClick={prevStep}
      disabled={!canGoBack}
      className={`flex cursor-pointer items-center gap-1.5 transition-colors duration-150 ${
        canGoBack ? 'text-app-text-muted hover:text-app-black' : 'invisible'
      }`}
      aria-label="Previous step"
    >
      <ChevronLeft className="h-5 w-5" />
      <span className="text-sm font-medium">Back</span>
    </button>
  )

  const nextButton = (
    <button
      type="button"
      onClick={handleNext}
      disabled={!canGoNext}
      className={`flex cursor-pointer items-center gap-1.5 transition-colors duration-150 ${
        canGoNext ? 'text-app-black hover:text-app-gray-600' : 'invisible'
      }`}
      aria-label={currentStep === 3 ? (wizardCompleted ? 'Done editing' : 'Complete wizard') : 'Next step'}
    >
      <span className="text-sm font-medium">{nextLabel}</span>
      <ChevronRight className="h-5 w-5" />
    </button>
  )

  return (
    <nav aria-label="Wizard progress" className="mb-6 sm:mb-8">
      {/* Mobile: steps centered, Back/Next below */}
      <div className="flex flex-col gap-3 sm:hidden">
        <div className="flex justify-center">{stepDots}</div>
        <div className="flex items-center justify-between">{backButton}{nextButton}</div>
      </div>

      {/* Desktop: 3-col grid */}
      <div className="hidden sm:grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <div className="justify-self-start">{backButton}</div>
        {stepDots}
        <div className="justify-self-end">{nextButton}</div>
      </div>
    </nav>
  )
}
