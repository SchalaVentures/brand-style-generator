import { create } from 'zustand'

type MobileView = 'build' | 'preview'

interface UIState {
  exportModalOpen: boolean
  shareModalOpen: boolean
  authModalOpen: boolean
  wizardDrawerOpen: boolean
  mobileView: MobileView
  setExportModalOpen: (open: boolean) => void
  setShareModalOpen: (open: boolean) => void
  setAuthModalOpen: (open: boolean) => void
  setWizardDrawerOpen: (open: boolean) => void
  setMobileView: (view: MobileView) => void
}

export const useUIStore = create<UIState>()((set) => ({
  exportModalOpen: false,
  shareModalOpen: false,
  authModalOpen: false,
  wizardDrawerOpen: false,
  mobileView: 'build' as MobileView,
  setExportModalOpen: (open: boolean) => set({ exportModalOpen: open }),
  setShareModalOpen: (open: boolean) => set({ shareModalOpen: open }),
  setAuthModalOpen: (open: boolean) => set({ authModalOpen: open }),
  setWizardDrawerOpen: (open: boolean) => set({ wizardDrawerOpen: open }),
  setMobileView: (view: MobileView) => set({ mobileView: view }),
}))
