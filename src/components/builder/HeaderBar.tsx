'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { CircleHelp, FolderOpen } from 'lucide-react'
import Button from '@/components/ui/button'
import { useUIStore } from '@/store/ui-store'
import { useBrandStore } from '@/store/brand-store'
import { nhost } from '@/lib/nhost'
import { saveProject } from '@/lib/projects'
import { AuthModal } from '@/components/auth/AuthModal'
import { ShareModal } from './ShareModal'
import { useAutoSave } from '@/hooks/use-auto-save'
import { useAuthState } from '@/hooks/use-auth-state'

export function HeaderBar(): React.ReactElement {
  const setExportModalOpen = useUIStore((s: { setExportModalOpen: (open: boolean) => void }) => s.setExportModalOpen)
  const [sharing, setSharing] = useState<boolean>(false)
  const [shareUrl, setShareUrl] = useState<string>('')
  const [shareError, setShareError] = useState<boolean>(false)
  const [showShareModal, setShowShareModal] = useState<boolean>(false)
  const [saving, setSaving] = useState<boolean>(false)
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false)
  const [mounted, setMounted] = useState<boolean>(false)
  const pendingSaveRef = useRef<boolean>(false)
  const autoSaveStatus = useAutoSave()
  const authState = useAuthState()

  const PENDING_SAVE_KEY: string = 'bsg-pending-save'

  useEffect(() => {
    setMounted(true)
    // Restore pending save flag across page refreshes (e.g., after email verification redirect)
    if (localStorage.getItem(PENDING_SAVE_KEY) === '1') {
      pendingSaveRef.current = true
    }
  }, [])

  // When auth state transitions to authenticated (non-anonymous), trigger pending save
  useEffect(() => {
    if (authState.isAuthenticated && !authState.isAnonymous && pendingSaveRef.current) {
      pendingSaveRef.current = false
      localStorage.removeItem(PENDING_SAVE_KEY)
      performSave()
    }
  }, [authState.isAuthenticated, authState.isAnonymous])

  const performSave = useCallback(async (): Promise<void> => {
    setSaving(true)
    try {
      const state = useBrandStore.getState()
      const { id, isNew } = await saveProject(state, state.projectId)
      if (isNew) {
        useBrandStore.getState().setProjectId(id)
      }
    } catch {
      // Save failed
    } finally {
      setSaving(false)
    }
  }, [])

  const handleSave = useCallback(async (): Promise<void> => {
    const session = nhost.getUserSession()
    if (session === null) {
      // No session at all — need to authenticate first
      pendingSaveRef.current = true
      localStorage.setItem(PENDING_SAVE_KEY, '1')
      setShowAuthModal(true)
      return
    }

    // Anonymous or real user — both can save (anonymous has 'user' role)
    await performSave()
  }, [performSave])

  const handleAuthSuccess = useCallback((): void => {
    // Session may not be persisted to storage yet, so use a short delay
    setTimeout(() => {
      pendingSaveRef.current = false
      localStorage.removeItem(PENDING_SAVE_KEY)
      performSave()
    }, 500)
  }, [performSave])

  interface ShareApiResponse {
    url?: string
    error?: string
  }

  const handleShare = async (): Promise<void> => {
    if (sharing) return
    setSharing(true)
    setShareError(false)
    try {
      const state = useBrandStore.getState()
      const res: Response = await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          state,
          brandName: state.name || 'My Brand',
          primaryColor: state.primaryColor,
          projectId: state.projectId ?? null,
        }),
      })

      const data = await res.json() as ShareApiResponse

      if (typeof data.url === 'string') {
        setShareUrl(`${window.location.origin}${data.url}`)
        setShowShareModal(true)
      } else {
        console.error('Share failed:', data.error)
        setShareError(true)
      }
    } catch (err: unknown) {
      console.error('Share request failed:', err)
      setShareError(true)
    } finally {
      setSharing(false)
    }
  }

  return (
    <>
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-app-gray-100 bg-white px-3 sm:px-4">
        {/* Left: Logo / Wordmark */}
        <Link
          href="/"
          className="text-[15px] font-bold tracking-[-0.5px] text-app-black"
        >
          Brand Style Generator
        </Link>

        {/* Right: Action buttons + auth state */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Auto-save status indicator */}
          {autoSaveStatus === 'saving' && (
            <span className="hidden text-xs text-app-text-muted sm:inline">Saving\u2026</span>
          )}
          {autoSaveStatus === 'saved' && (
            <span className="hidden text-xs text-green-600 sm:inline">Saved</span>
          )}
          {autoSaveStatus === 'error' && (
            <span className="hidden text-xs text-red-500 sm:inline">Save failed</span>
          )}

          <Link
            href="/contact"
            target="_blank"
            className="hidden rounded-md p-1.5 text-app-text-muted hover:text-app-black transition-colors sm:block"
            aria-label="Help"
          >
            <CircleHelp className="h-4 w-4" />
          </Link>

          {/* Share — hidden on mobile */}
          <div className="hidden sm:block">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              disabled={sharing}
              className={shareError ? 'text-red-500' : undefined}
            >
              {sharing ? 'Sharing\u2026' : shareError ? 'Share failed' : 'Share'}
            </Button>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => { setExportModalOpen(true) }}
          >
            Export
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Saving\u2026' : 'Save'}
          </Button>

          {/* Auth indicator - only render after mount to avoid hydration mismatch */}
          {mounted && authState.isAuthenticated && authState.isAnonymous && (
            <button
              type="button"
              onClick={() => { setShowAuthModal(true) }}
              className="cursor-pointer rounded-md border border-app-gray-100 px-2.5 py-1 text-xs font-medium
                         text-app-text-muted hover:border-app-black hover:text-app-black transition-colors"
            >
              Sign up
            </button>
          )}
          {mounted && authState.isAuthenticated && !authState.isAnonymous && (
            <Link
              href="/projects"
              className="flex cursor-pointer items-center gap-1.5 rounded-md border border-app-gray-100 px-2 py-1 text-xs font-medium
                         text-app-text-muted hover:border-app-black hover:text-app-black transition-colors sm:px-2.5"
            >
              <FolderOpen className="h-3.5 w-3.5 shrink-0" />
              <span className="hidden sm:inline">My Projects</span>
            </Link>
          )}
        </div>
      </header>

      {/* Auth modal */}
      <AuthModal
        open={showAuthModal}
        onClose={() => { setShowAuthModal(false) }}
        onSuccess={handleAuthSuccess}
      />

      {/* Share modal */}
      <ShareModal
        open={showShareModal}
        onClose={() => { setShowShareModal(false) }}
        shareUrl={shareUrl}
        brandName={useBrandStore.getState().name || 'My Brand'}
      />
    </>
  )
}
