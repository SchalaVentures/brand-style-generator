'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useBrandStore } from '@/store/brand-store'
import type { BrandState, PreviewTab } from '@/types/brand'
import { PreviewTabBar } from '@/components/preview/PreviewTabBar'
import { MockupDashboard } from '@/components/preview/MockupDashboard'
import { MockupLanding } from '@/components/preview/MockupLanding'
import { MockupMobile } from '@/components/preview/MockupMobile'
import { MockupLogin } from '@/components/preview/MockupLogin'
import { BrandGuide } from '@/components/preview/BrandGuide'

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

interface SharedViewClientProps {
  brandState: BrandState
  brandName: string
}

export function SharedViewClient({ brandState, brandName }: SharedViewClientProps): React.ReactElement {
  const activeTab: PreviewTab = useBrandStore((s) => s.activeTab)
  const previewMode = useBrandStore((s) => s.previewMode)

  // Hydrate the store with the shared brand state on mount
  useEffect(() => {
    useBrandStore.setState({
      ...brandState,
      wizardCompleted: true,
    })
  }, [brandState])

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
    }
  }

  const containerBg: string = previewMode === 'dark' ? 'bg-[#0A0A0A]' : 'bg-[#F5F5F5]'

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="flex h-14 items-center justify-between border-b border-app-gray-100 bg-white px-6">
        <Link
          href="/"
          className="cursor-pointer text-sm font-medium text-app-text-muted hover:text-app-black transition-colors"
        >
          Brand Style Generator
        </Link>
        <Link
          href="/create"
          className="cursor-pointer rounded-lg bg-app-black px-4 py-2 text-sm font-semibold text-white
                     hover:bg-app-accent-hover transition-colors"
        >
          Create Your Own
        </Link>
      </header>

      {/* Brand summary */}
      <div className="flex items-center gap-4 border-b border-app-gray-100 bg-white px-6 py-3">
        <h1 className="text-lg font-bold text-app-black">{brandName}</h1>
        <div
          className="h-5 w-5 rounded shrink-0"
          style={{ backgroundColor: brandState.primaryColor }}
        />
        <span className="text-xs text-app-text-muted truncate">
          {brandState.headingFont} + {brandState.bodyFont}
        </span>
      </div>

      {/* Tab bar */}
      <PreviewTabBar tabs={TABS} />

      {/* Mockup */}
      <div className={`flex-1 overflow-y-auto ${containerBg} p-6 lg:p-8`}>
        {renderMockup()}
      </div>
    </div>
  )
}
