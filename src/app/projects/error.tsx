'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'
import Button from '@/components/ui/button'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

const IS_PRODUCTION: boolean =
  process.env['APP_ENV'] === 'production' || process.env['NODE_ENV'] === 'production'

export default function ProjectsError({ error, reset }: ErrorPageProps): React.ReactElement {
  useEffect(() => {
    console.error('Projects error boundary caught:', error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-app-bg-alt px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-modal text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
          <AlertTriangle className="h-6 w-6 text-red-500" />
        </div>
        <h1 className="mb-2 text-xl font-bold text-app-black">Couldn&apos;t load your projects</h1>
        <p className="mb-4 text-sm text-app-text-muted">
          We had trouble fetching your saved projects. This might be a temporary issue — try again
          or head back to the builder.
        </p>

        {!IS_PRODUCTION && (
          <div className="mb-6 rounded-lg bg-app-gray-50 p-3 text-left">
            <p className="mb-1 text-xs font-medium text-app-gray-500">Error details</p>
            <p className="break-words font-mono text-xs text-red-600">{error.message}</p>
            {error.digest !== undefined && (
              <p className="mt-1 font-mono text-xs text-app-gray-400">Digest: {error.digest}</p>
            )}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Button onClick={reset} variant="primary" className="w-full">
            Try again
          </Button>
          <Link href="/create" className="block">
            <Button variant="secondary" className="w-full">
              Back to builder
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
