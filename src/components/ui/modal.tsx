'use client'

import { useCallback, useEffect, useRef } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export default function Modal({
  open,
  onClose,
  title,
  children,
}: ModalProps): React.ReactElement | null {
  const overlayRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, handleKeyDown])

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === overlayRef.current) onClose()
    },
    [onClose],
  )

  if (!open) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-150"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-[560px] rounded-2xl bg-app-white shadow-xl animate-in zoom-in-95 duration-150">
        {title !== undefined && (
          <div className="flex items-center justify-between border-b border-app-gray-100 px-6 py-4">
            <h2 className="text-base font-semibold text-app-black">{title}</h2>
            <button
              onClick={onClose}
              className="cursor-pointer rounded-lg p-1.5 text-app-gray-400 transition-colors hover:bg-app-gray-50 hover:text-app-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-app-black"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        {title === undefined && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 cursor-pointer rounded-lg p-1.5 text-app-gray-400 transition-colors hover:bg-app-gray-50 hover:text-app-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-app-black"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  )
}
