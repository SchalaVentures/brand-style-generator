'use client'

import type { PreviewTab } from '@/types/brand'
import { useBrandStore } from '@/store/brand-store'
import { PreviewTabBar } from '../preview/PreviewTabBar'
import { MockupDashboard } from '../preview/MockupDashboard'
import { MockupLanding } from '../preview/MockupLanding'
import { MockupMobile } from '../preview/MockupMobile'
import { MockupLogin } from '../preview/MockupLogin'
import { BrandGuide } from '../preview/BrandGuide'

interface Tab {
  id: PreviewTab
  label: string
}

const TABS: Tab[] = [
  { id: 'brand-guide', label: 'Brand Guide' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'landing', label: 'Landing' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'login', label: 'Login' },
]

export function PreviewPanel(): React.ReactElement {
  const activeTab: PreviewTab = useBrandStore((s) => s.activeTab)

  const renderMockup = (): React.ReactElement => {
    switch (activeTab) {
      case 'dashboard':
        return <MockupDashboard />
      case 'landing':
        return <MockupLanding />
      case 'mobile':
        return <MockupMobile />
      case 'login':
        return <MockupLogin />
      case 'brand-guide':
        return <BrandGuide />
      default:
        return <BrandGuide />
    }
  }

  return (
    <div className="flex h-full flex-col">
      {/* Sticky tab bar */}
      <div className="sticky top-0 z-10">
        <PreviewTabBar tabs={TABS} />
      </div>

      {/* Mockup container */}
      <div className="flex-1 overflow-y-auto bg-white p-2 sm:p-6 lg:p-8">
        {renderMockup()}
      </div>
    </div>
  )
}
