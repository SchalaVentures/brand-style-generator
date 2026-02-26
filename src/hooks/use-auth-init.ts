'use client'

import { useEffect, useState } from 'react'
import { nhost, auth, getSession, clearSession } from '@/lib/nhost'

type AuthStatus = 'loading' | 'ready'

/**
 * Extract refreshToken from URL hash or query params.
 * Nhost redirects back after email verification with:
 *   ?refreshToken=xxx&type=emailVerify  (query params)
 *   #refreshToken=xxx&type=emailVerify  (hash params)
 */
function extractRefreshToken(): string | null {
  if (typeof window === 'undefined') return null

  // Check query params first
  const queryParams: URLSearchParams = new URLSearchParams(window.location.search)
  const fromQuery: string | null = queryParams.get('refreshToken')
  if (fromQuery !== null) return fromQuery

  // Check hash params
  const hash: string = window.location.hash.substring(1)
  if (hash.length === 0) return null
  const hashParams: URLSearchParams = new URLSearchParams(hash)
  return hashParams.get('refreshToken')
}

/** Remove auth params from the URL without triggering navigation */
function cleanAuthParams(): void {
  const url: URL = new URL(window.location.href)
  url.searchParams.delete('refreshToken')
  url.searchParams.delete('type')
  // Clear hash if it contained auth params
  if (url.hash.includes('refreshToken')) {
    url.hash = ''
  }
  window.history.replaceState({}, '', url.toString())
}

export function useAuthInit(): AuthStatus {
  const [status, setStatus] = useState<AuthStatus>('loading')

  useEffect(() => {
    const init = async (): Promise<void> => {
      // Handle email verification / auth callback redirect
      const refreshToken: string | null = extractRefreshToken()
      if (refreshToken !== null) {
        try {
          await auth.refreshToken({ refreshToken })
          cleanAuthParams()
          // If we're on the landing page, redirect to the builder
          if (window.location.pathname === '/') {
            window.location.href = '/create'
            return
          }
        } catch {
          cleanAuthParams()
        }
        setStatus('ready')
        return
      }

      // Normal session refresh
      const session = getSession()
      if (session !== null) {
        try {
          await nhost.refreshSession()
        } catch {
          clearSession()
        }
      }

      setStatus('ready')
    }

    init()
  }, [])

  return status
}
