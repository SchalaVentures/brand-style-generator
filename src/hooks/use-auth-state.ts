'use client'

import { useState, useEffect, useCallback } from 'react'
import { getSession } from '@/lib/nhost'
import type { Session } from '@nhost/nhost-js/session'

interface AuthState {
  isAuthenticated: boolean
  isAnonymous: boolean
  userId: string | null
  email: string | null
  displayName: string | null
}

const POLL_INTERVAL_MS: number = 1000

export function useAuthState(): AuthState {
  const getState = useCallback((): AuthState => {
    const session: Session | null = getSession()
    if (session === null || session.user === undefined) {
      return {
        isAuthenticated: false,
        isAnonymous: false,
        userId: null,
        email: null,
        displayName: null,
      }
    }
    return {
      isAuthenticated: true,
      isAnonymous: session.user.isAnonymous,
      userId: session.user.id,
      email: session.user.email ?? null,
      displayName: session.user.displayName ?? null,
    }
  }, [])

  const [state, setState] = useState<AuthState>(getState)

  useEffect(() => {
    const interval: ReturnType<typeof setInterval> = setInterval(() => {
      const next: AuthState = getState()
      setState((prev: AuthState) => {
        if (
          prev.isAuthenticated === next.isAuthenticated &&
          prev.isAnonymous === next.isAnonymous &&
          prev.userId === next.userId &&
          prev.email === next.email
        ) {
          return prev
        }
        return next
      })
    }, POLL_INTERVAL_MS)

    return () => { clearInterval(interval) }
  }, [getState])

  return state
}
