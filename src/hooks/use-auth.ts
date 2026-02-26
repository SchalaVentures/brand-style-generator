'use client'

import { useState, useEffect } from 'react'
import type { Session, User, FetchResponse, SignInEmailPasswordResponse } from '@/lib/nhost'
import { auth, nhost, getSession, clearSession } from '@/lib/nhost'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

interface SignInResult {
  error: string | null
}

interface UseAuthReturn extends AuthState {
  signIn: (email: string, password: string) => Promise<SignInResult>
  signOut: () => Promise<void>
}

export function useAuth(): UseAuthReturn {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  })

  useEffect((): void => {
    const session: Session | null = getSession()
    const user: User | undefined = session?.user as User | undefined

    setState({
      user: user ?? null,
      isAuthenticated: user !== undefined,
      isLoading: false,
    })
  }, [])

  const signIn = async (email: string, password: string): Promise<SignInResult> => {
    setState((prev: AuthState) => ({ ...prev, isLoading: true }))
    const GENERIC_ERROR: string = 'Incorrect email or password'

    try {
      const response: FetchResponse<SignInEmailPasswordResponse> =
        await auth.signInEmailPassword({ email, password })

      const body = response.body as {
        session?: { user: User }
        error?: { message: string }
      }

      if (body.error !== undefined) {
        setState((prev: AuthState) => ({ ...prev, isLoading: false }))
        return { error: GENERIC_ERROR }
      }

      if (body.session?.user !== undefined) {
        setState({
          user: body.session.user,
          isAuthenticated: true,
          isLoading: false,
        })
      }

      return { error: null }
    } catch {
      setState((prev: AuthState) => ({ ...prev, isLoading: false }))
      return { error: GENERIC_ERROR }
    }
  }

  const signOut = async (): Promise<void> => {
    setState((prev: AuthState) => ({ ...prev, isLoading: true }))

    try {
      const session: Session | null = getSession()
      if (session?.refreshTokenId !== undefined && session.refreshTokenId !== '') {
        await auth.signOut({ refreshToken: session.refreshTokenId })
      }
    } catch {
      // Ignore signout errors — clear local state regardless
    }

    clearSession()
    setState({ user: null, isAuthenticated: false, isLoading: false })
  }

  // Keep session in sync when nhost refreshes it internally
  useEffect((): (() => void) => {
    const interval: ReturnType<typeof setInterval> = setInterval((): void => {
      const session: Session | null = getSession()
      const user: User | undefined = session?.user as User | undefined
      setState((prev: AuthState) => {
        const nextAuth: boolean = user !== undefined
        if (prev.isAuthenticated === nextAuth) return prev
        return { user: user ?? null, isAuthenticated: nextAuth, isLoading: false }
      })
    }, 2000)

    return (): void => { clearInterval(interval) }
  }, [])

  // Refresh session on mount
  useEffect((): void => {
    const session: Session | null = getSession()
    if (session !== null) {
      nhost.refreshSession().catch((): void => { clearSession() })
    }
  }, [])

  return { ...state, signIn, signOut }
}
