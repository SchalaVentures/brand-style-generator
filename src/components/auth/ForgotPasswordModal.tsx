'use client'

import { useState, useEffect } from 'react'
import { auth } from '@/lib/nhost'
import Modal from '@/components/ui/modal'

interface ForgotPasswordModalProps {
  open: boolean
  onClose: () => void
}

export function ForgotPasswordModal({ open, onClose }: ForgotPasswordModalProps): React.ReactElement {
  const [email, setEmail] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [sent, setSent] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      setEmail('')
      setLoading(false)
      setSent(false)
      setError(null)
    }
  }, [open])

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const redirectTo: string = `${window.location.origin}/reset-password`
      await auth.sendPasswordResetEmail({ email, options: { redirectTo } })
      setSent(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Reset Password">
      {sent ? (
        <div className="flex flex-col gap-4 text-center">
          <p className="text-sm text-app-text-muted">
            We sent a reset link to <strong>{email}</strong>. Check your inbox.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="h-10 cursor-pointer rounded-lg bg-app-black text-sm font-semibold text-white
                       hover:bg-app-accent-hover transition-colors"
          >
            Got it
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <p className="text-sm text-app-text-muted">
            Enter your email and we&rsquo;ll send you a reset link.
          </p>
          <div>
            <label htmlFor="forgot-email" className="mb-1 block text-xs font-medium text-app-text-muted">
              Email
            </label>
            <input
              id="forgot-email"
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value) }}
              required
              className="h-10 w-full rounded-lg border border-app-gray-100 px-3 text-sm
                         focus:border-app-black focus:outline-none focus:ring-1 focus:ring-app-black"
              placeholder="you@example.com"
              autoFocus
            />
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
            {loading ? 'Sending\u2026' : 'Send Reset Link'}
          </button>
        </form>
      )}
    </Modal>
  )
}
