'use client'

import { useState, useEffect } from 'react'
import { auth, getSession } from '@/lib/nhost'
import Modal from '@/components/ui/modal'
import { ForgotPasswordModal } from './ForgotPasswordModal'

type AuthFlow = 'upgrade' | 'signin' | 'signup'

interface AuthModalProps {
  open: boolean
  onClose: () => void
  onSuccess: () => void
  initialFlow?: 'upgrade' | 'signin'
}

export function AuthModal({ open, onClose, onSuccess, initialFlow }: AuthModalProps): React.ReactElement {
  const defaultFlow = (): AuthFlow => {
    if (initialFlow !== undefined) return initialFlow
    const session = getSession()
    if (session !== null && session.user?.isAnonymous === true) return 'upgrade'
    return 'signin'
  }

  const [flow, setFlow] = useState<AuthFlow>(defaultFlow)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [verificationSent, setVerificationSent] = useState<boolean>(false)
  const [showForgot, setShowForgot] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  useEffect(() => {
    if (open) {
      setFlow(defaultFlow())
      setEmail('')
      setPassword('')
      setError(null)
      setVerificationSent(false)
      setShowPassword(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const resetForm = (): void => {
    setEmail('')
    setPassword('')
    setError(null)
    setVerificationSent(false)
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (flow === 'upgrade') {
        const redirectTo: string = `${window.location.origin}/create`
        const response = await auth.deanonymizeUser({
          signInMethod: 'email-password',
          email,
          password,
          options: { redirectTo },
        })
        if (response.status !== 200) {
          const body = response.body as { error?: string; message?: string }
          if (body.error === 'email-already-in-use') {
            setError('This email is already registered. Try signing in instead.')
            return
          }
          if (body.error === 'user-not-anonymous') {
            setError('You already have an account. Try signing in instead.')
            return
          }
          setError(body.message ?? 'Something went wrong.')
          return
        }
        setVerificationSent(true)
        return
      }

      if (flow === 'signin') {
        const response = await auth.signInEmailPassword({ email, password })
        if (response.body.session === undefined) {
          setError('Invalid email or password.')
          return
        }
        onSuccess()
        onClose()
        return
      }

      if (flow === 'signup') {
        const redirectTo: string = `${window.location.origin}/create`
        const response = await auth.signUpEmailPassword({
          email,
          password,
          options: { displayName: email.split('@')[0], redirectTo },
        })
        if (response.body.session === undefined) {
          setVerificationSent(true)
          return
        }
        onSuccess()
        onClose()
        return
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const title = (): string => {
    if (flow === 'upgrade') return 'Create Your Account'
    if (flow === 'signup') return 'Create Account'
    return 'Welcome Back'
  }

  const submitLabel = (): string => {
    if (loading) return 'Loading\u2026'
    if (flow === 'upgrade' || flow === 'signup') return 'Create Account'
    return 'Sign In'
  }

  if (verificationSent) {
    return (
      <Modal open={open} onClose={onClose} title="Check Your Email">
        <div className="flex flex-col gap-4 text-center">
          <p className="text-sm text-app-text-muted">
            We sent a verification link to <strong>{email}</strong>. Click the link in the email to verify your account.
          </p>
          <p className="text-xs text-app-text-muted">
            Your projects are safe in the meantime.
          </p>
          <button
            type="button"
            onClick={() => { resetForm(); onClose() }}
            className="h-10 cursor-pointer rounded-lg bg-app-black text-sm font-semibold text-white
                       hover:bg-app-accent-hover transition-colors"
          >
            Got it
          </button>
        </div>
      </Modal>
    )
  }

  return (
    <>
      <Modal open={open} onClose={onClose} title={title()}>
        <div className="flex flex-col gap-4">
          {flow === 'upgrade' && (
            <p className="text-sm text-app-text-muted">Save your projects across devices</p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="auth-email" className="mb-1 block text-xs font-medium text-app-text-muted">
                Email
              </label>
              <input
                id="auth-email"
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value) }}
                required
                className="h-10 w-full rounded-lg border border-app-gray-100 px-3 text-sm
                           focus:border-app-black focus:outline-none focus:ring-1 focus:ring-app-black"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="auth-password" className="mb-1 block text-xs font-medium text-app-text-muted">
                Password
              </label>
              <div className="relative">
                <input
                  id="auth-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) }}
                  required
                  minLength={9}
                  className="h-10 w-full rounded-lg border border-app-gray-100 px-3 pr-10 text-sm
                             focus:border-app-black focus:outline-none focus:ring-1 focus:ring-app-black"
                  placeholder="Min 9 characters"
                />
                <button
                  type="button"
                  onClick={() => { setShowPassword((prev: boolean) => !prev) }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-app-text-muted hover:text-app-black transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {flow === 'signin' && (
                <button
                  type="button"
                  onClick={() => { setShowForgot(true) }}
                  className="mt-1.5 cursor-pointer text-xs text-app-text-muted hover:text-app-black transition-colors float-right"
                >
                  Forgot password?
                </button>
              )}
            </div>

            {error !== null && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="h-10 cursor-pointer rounded-lg bg-app-black text-sm font-semibold text-white
                         hover:bg-app-accent-hover transition-colors disabled:opacity-50"
            >
              {submitLabel()}
            </button>
          </form>

          <p className="text-center text-xs text-app-text-muted">
            {flow === 'signin' ? (
              <>
                Don&rsquo;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => { resetForm(); setFlow('signup') }}
                  className="cursor-pointer text-app-black font-medium"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => { resetForm(); setFlow('signin') }}
                  className="cursor-pointer text-app-black font-medium"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </Modal>

      <ForgotPasswordModal
        open={showForgot}
        onClose={() => { setShowForgot(false) }}
      />
    </>
  )
}
