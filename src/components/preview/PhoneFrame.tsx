'use client'

import type { ReactNode } from 'react'
import { useBrandStore } from '@/store/brand-store'

interface PhoneFrameProps {
  children: ReactNode
}

export function PhoneFrame({ children }: PhoneFrameProps): React.ReactElement {
  const previewMode: 'light' | 'dark' = useBrandStore((s) => s.previewMode)
  const isDark: boolean = previewMode === 'dark'

  return (
    <div className="flex justify-center">
      <div
        className="w-[375px] overflow-hidden rounded-[40px] shadow-lg"
        style={{ border: `8px solid ${isDark ? '#1a1a1a' : '#111'}` }}
      >
        {/* Status bar */}
        <div
          className="flex h-11 items-center justify-between px-6"
          style={{
            backgroundColor: isDark ? '#0A0A0A' : '#FFFFFF',
            color: isDark ? '#999' : '#111',
          }}
          aria-hidden="true"
        >
          <span className="text-xs font-semibold">9:41</span>
          <div className="flex items-center gap-1 text-xs">
            <span>&#9679;&#9679;&#9679;&#9679;</span>
            <span>&#128267;</span>
          </div>
        </div>

        {/* Content area */}
        <div className="overflow-hidden">{children}</div>

        {/* Home indicator */}
        <div
          className="flex h-8 items-end justify-center pb-2"
          style={{ backgroundColor: isDark ? '#0A0A0A' : '#FFFFFF' }}
          aria-hidden="true"
        >
          <div
            className="h-1 w-32 rounded-full"
            style={{ backgroundColor: isDark ? '#333' : '#D1D5DB' }}
          />
        </div>
      </div>
    </div>
  )
}
