'use client'

import { useEffect } from 'react'
import { useUIStore } from '@/store/ui-store'
import { WizardPanel } from './WizardPanel'

export function WizardDrawer(): React.ReactElement {
  const open: boolean = useUIStore((s) => s.wizardDrawerOpen)
  const setOpen = useUIStore((s) => s.setWizardDrawerOpen)

  // Close on Escape key
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, setOpen])

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 transition-opacity duration-250"
          onClick={() => { setOpen(false) }}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`
          fixed left-0 top-14 bottom-0 z-50 w-[340px] overflow-y-auto
          border-r border-app-gray-100 bg-white
          transition-transform duration-250 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
        role="dialog"
        aria-modal="true"
        aria-label="Wizard panel"
      >
        <WizardPanel />
      </div>
    </>
  )
}
