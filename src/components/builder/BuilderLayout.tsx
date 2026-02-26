'use client'

import { useEffect } from 'react'
import { loadGoogleFont } from '@/lib/fonts'
import { HeaderBar } from './HeaderBar'
import { WizardPanel } from './WizardPanel'
import { PreviewPanel } from './PreviewPanel'
import { ExportModal } from './ExportModal'
import { MobileBottomNav } from './MobileBottomNav'
import { useUIStore } from '@/store/ui-store'

export function BuilderLayout(): React.ReactElement {
  const exportModalOpen: boolean = useUIStore((s) => s.exportModalOpen)
  const setExportModalOpen = useUIStore((s) => s.setExportModalOpen)
  const mobileView = useUIStore((s) => s.mobileView)

  // Preload default fonts on mount so preview is never unstyled
  useEffect(() => {
    loadGoogleFont('Inter', [400, 700])
  }, [])

  return (
    <div className="flex h-screen flex-col">
      <HeaderBar />

      {/* Desktop layout (≥1024px): 40/60 split */}
      <div className="hidden flex-1 overflow-hidden lg:flex">
        <aside className="w-[40%] shrink-0 overflow-y-auto border-r border-app-gray-100 bg-white">
          <WizardPanel />
        </aside>
        <main className="w-[60%] overflow-y-auto bg-white">
          <PreviewPanel />
        </main>
      </div>

      {/* Mobile layout (<1024px): tab switching */}
      <div className="flex flex-1 flex-col overflow-hidden lg:hidden">
        {mobileView === 'build' ? (
          <div className="flex-1 overflow-y-auto bg-white pb-14">
            <WizardPanel />
          </div>
        ) : (
          <main className="flex-1 overflow-y-auto bg-app-gray-50 pb-14">
            <PreviewPanel />
          </main>
        )}
        <MobileBottomNav />
      </div>

      {/* Modals */}
      <ExportModal
        open={exportModalOpen}
        onClose={() => { setExportModalOpen(false) }}
      />
    </div>
  )
}
