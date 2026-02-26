import type { ReactElement } from 'react'

export function SuspenseFallback(): ReactElement {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="text-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-neutral-300 border-t-transparent mx-auto mb-4" />
        <p className="text-sm text-neutral-500">Loading...</p>
      </div>
    </div>
  )
}

export function PageSuspenseFallback(): ReactElement {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-300 border-t-transparent" />
    </div>
  )
}
