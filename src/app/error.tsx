'use client'

import { useEffect } from 'react'
import Link from 'next/link'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorPageProps): React.ReactElement {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-app-bg-alt px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-modal text-center">
        <p className="mb-1 text-4xl">⚠️</p>
        <h1 className="mb-2 text-xl font-bold text-app-black">Something went wrong</h1>
        <p className="mb-6 text-sm text-app-text-muted">
          An unexpected error occurred. Your work is safe — try refreshing or go back to the app.
        </p>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={reset}
            className="cursor-pointer h-10 rounded-lg bg-app-black text-sm font-semibold text-white
                       hover:bg-app-gray-600 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/create"
            className="cursor-pointer h-10 flex items-center justify-center rounded-lg border
                       border-app-gray-100 text-sm text-app-text-muted hover:text-app-black
                       hover:border-app-gray-200 transition-colors"
          >
            Back to app
          </Link>
        </div>
      </div>
    </div>
  )
}
