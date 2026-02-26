'use client'

import type { PreviewTab } from '@/types/brand'
import { useBrandStore } from '@/store/brand-store'
import { LightDarkToggle } from './LightDarkToggle'

interface Tab {
  id: PreviewTab
  label: string
}

interface PreviewTabBarProps {
  tabs: Tab[]
}

export function PreviewTabBar({ tabs }: PreviewTabBarProps): React.ReactElement {
  const activeTab: PreviewTab = useBrandStore((s) => s.activeTab)
  const setActiveTab = useBrandStore((s) => s.setActiveTab)

  return (
    <div className="shrink-0 border-b border-app-gray-100 bg-white">
      {/* Tabs row — scrollable */}
      <div className="flex items-center overflow-x-auto px-3 pt-2 pb-0 scrollbar-none sm:px-4 sm:py-0 sm:h-12" role="tablist" aria-label="Preview tabs">
        {tabs.map((tab: Tab) => {
          const isActive: boolean = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 cursor-pointer rounded-md px-2.5 py-1.5 text-[13px] font-medium transition-colors duration-150 sm:px-3 ${
                isActive
                  ? 'bg-app-black text-white'
                  : 'text-app-text-muted hover:bg-app-bg-alt hover:text-app-black'
              }`}
              role="tab"
              aria-selected={isActive}
            >
              {tab.label}
            </button>
          )
        })}

        {/* Toggle inline on sm+ */}
        <div className="ml-auto hidden shrink-0 pl-2 sm:block">
          <LightDarkToggle />
        </div>
      </div>

      {/* Toggle below tabs on mobile only */}
      <div className="flex justify-end px-3 pb-2 sm:hidden">
        <LightDarkToggle />
      </div>
    </div>
  )
}
