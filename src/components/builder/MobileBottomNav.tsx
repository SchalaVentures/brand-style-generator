'use client'

import { Paintbrush, Eye } from 'lucide-react'
import { useUIStore } from '@/store/ui-store'

interface NavTab {
  id: 'build' | 'preview'
  label: string
  icon: React.ReactElement
}

const TABS: NavTab[] = [
  { id: 'build', label: 'Build', icon: <Paintbrush className="h-5 w-5" /> },
  { id: 'preview', label: 'Preview', icon: <Eye className="h-5 w-5" /> },
]

export function MobileBottomNav(): React.ReactElement {
  const mobileView = useUIStore((s) => s.mobileView)
  const setMobileView = useUIStore((s) => s.setMobileView)

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-14 items-center border-t border-app-gray-100 bg-white lg:hidden">
      {TABS.map((tab: NavTab) => {
        const isActive: boolean = mobileView === tab.id
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => setMobileView(tab.id)}
            className={`flex flex-1 flex-col items-center justify-center gap-0.5 transition-colors
              ${isActive ? 'text-app-black' : 'text-app-gray-400'}`}
            aria-label={tab.label}
            aria-current={isActive ? 'page' : undefined}
          >
            {tab.icon}
            <span className="text-[11px] font-medium">{tab.label}</span>
            {isActive && (
              <div className="absolute bottom-1 h-1 w-1 rounded-full bg-app-black" />
            )}
          </button>
        )
      })}
    </nav>
  )
}
