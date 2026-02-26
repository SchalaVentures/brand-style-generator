'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface UpgradeBannerProps {
  onUpgrade: () => void
}

const DISMISSED_KEY: string = 'bsg-upgrade-dismissed'

export function UpgradeBanner({ onUpgrade }: UpgradeBannerProps): React.ReactElement | null {
  const [dismissed, setDismissed] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem(DISMISSED_KEY) === 'true'
  })

  if (dismissed) return null

  const handleDismiss = (): void => {
    setDismissed(true)
    localStorage.setItem(DISMISSED_KEY, 'true')
  }

  return (
    <div className="relative flex items-center justify-between gap-4 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3">
      <div className="flex-1">
        <p className="text-sm text-blue-900">
          Create a free account to access your projects from any device.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onUpgrade}
          className="cursor-pointer rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white
                     hover:bg-blue-700 transition-colors"
        >
          Create Account
        </button>
        <button
          type="button"
          onClick={handleDismiss}
          className="cursor-pointer rounded-md p-1 text-blue-400 hover:text-blue-600 transition-colors"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
