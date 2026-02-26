'use client'

import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/lib/nhost'

export function ResetPasswordClient(): React.ReactElement {
  const searchParams = useSearchParams()
  const router = useRouter()
  const ticket: string | null = searchParams.get('ticket')

  const [password, setPassword] = useState<string>('')
  const [confirm, setConfirm] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    setError(null)

    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    try {
      const body = ticket !== null
        ? { newPassword: password, ticket }
        : { newPassword: password }

      const response = await auth.changeUserPassword(body)
      if (response.status !== 200) {
        setError('Failed to reset password. The link may have expired.')
        return
      }
      setDone(true)
      setTimeout(() => { router.push('/projects') }, 2000)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const FIELD_CLASS: string =
    'h-10 w-full rounded-lg border border-app-gray-100 px-3 text-sm ' +
    'focus:border-app-black focus:outline-none focus:ring-1 focus:ring-app-black'

  return (
    <div className="flex min-h-screen items-center justify-center bg-app-bg-alt px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-modal">
        <h1 className="mb-1 text-xl font-bold text-app-black">Set new password</h1>
        <p className="mb-6 text-sm text-app-text-muted">Choose a strong password for your account.</p>

        {done ? (
          <div className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
            Password updated! Redirecting…
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="rp-password" className="mb-1 block text-xs font-medium text-app-text-muted">
                New Password
              </label>
              <input
                id="rp-password"
                type="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) }}
                required
                minLength={9}
                className={FIELD_CLASS}
                placeholder="Min 9 characters"
              />
            </div>

            <div>
              <label htmlFor="rp-confirm" className="mb-1 block text-xs font-medium text-app-text-muted">
                Confirm Password
              </label>
              <input
                id="rp-confirm"
                type="password"
                value={confirm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setConfirm(e.target.value) }}
                required
                minLength={9}
                className={FIELD_CLASS}
                placeholder="Repeat password"
              />
            </div>

            {error !== null && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="h-10 cursor-pointer rounded-lg bg-app-black text-sm font-semibold text-white
                         hover:bg-app-gray-600 transition-colors disabled:opacity-50"
            >
              {loading ? 'Updating…' : 'Update Password'}
            </button>

            <Link
              href="/projects"
              className="text-center text-xs text-app-text-muted hover:text-app-black transition-colors"
            >
              Back to app
            </Link>
          </form>
        )}
      </div>
    </div>
  )
}
