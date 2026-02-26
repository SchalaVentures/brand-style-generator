'use client'

import { useEffect } from 'react'
import { loadGoogleFont } from '@/lib/fonts'
import { HeaderBar } from './HeaderBar'
import { WizardPanel } from './WizardPanel'
import { PreviewPanel } from './PreviewPanel'
import { ExportModal } from './ExportModal'
import { WizardDrawer } from './WizardDrawer'
import { MobileBottomNav } from './MobileBottomNav'
import { useUIStore } from '@/store/ui-store'
import { Pencil } from 'lucide-react'

export function BuilderLayout(): React.ReactElement {
  const exportModalOpen: boolean = useUIStore((s) => s.exportModalOpen)
  const setExportModalOpen = useUIStore((s) => s.setExportModalOpen)
  const wizardDrawerOpen: boolean = useUIStore((s) => s.wizardDrawerOpen)
  const setWizardDrawerOpen = useUIStore((s) => s.setWizardDrawerOpen)
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

      {/* Tablet layout (768-1023px): drawer wizard + full-width preview */}
      <div className="hidden flex-1 overflow-hidden md:flex lg:hidden">
        <main className="flex-1 overflow-y-auto bg-app-gray-50">
          <PreviewPanel />
        </main>
        <WizardDrawer />

        {/* FAB to toggle wizard drawer */}
        <button
          type="button"
          onClick={() => { setWizardDrawerOpen(!wizardDrawerOpen) }}
          className="fixed bottom-6 left-6 z-30 flex h-12 w-12 items-center justify-center
                     rounded-full bg-app-black text-white shadow-lg
                     hover:bg-app-gray-600 transition-colors"
          aria-label={wizardDrawerOpen ? 'Close wizard' : 'Open wizard'}
        >
          <Pencil className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile layout (<768px): tab switching */}
      <div className="flex flex-1 flex-col overflow-hidden md:hidden">
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
