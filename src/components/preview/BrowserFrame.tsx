'use client'

import type { ReactNode } from 'react'
import { useBrandStore } from '@/store/brand-store'

interface BrowserFrameProps {
  children: ReactNode
  path?: string
}

export function BrowserFrame({ children, path = '/dashboard' }: BrowserFrameProps): React.ReactElement {
  const name: string = useBrandStore((s) => s.name)
  const previewMode: 'light' | 'dark' = useBrandStore((s) => s.previewMode)

  const domain: string = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '')
    .slice(0, 20) || 'yourbrand'

  const isDark: boolean = previewMode === 'dark'

  return (
    <div
      className="overflow-hidden rounded-xl shadow-md"
      style={{ border: `1px solid ${isDark ? '#222' : '#E5E7EB'}` }}
    >
      {/* Title bar */}
      <div
        className="flex h-10 items-center gap-3 px-4"
        style={{
          backgroundColor: isDark ? '#1a1a1a' : '#F5F5F5',
          borderBottom: `1px solid ${isDark ? '#333' : '#E5E7EB'}`,
        }}
      >
        {/* Traffic light dots */}
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <div className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <div className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <div className="h-3 w-3 rounded-full bg-[#28C840]" />
        </div>

        {/* URL bar */}
        <div
          className="flex-1 rounded-md px-3 py-1 text-center text-xs"
          style={{
            backgroundColor: isDark ? '#111' : '#FFFFFF',
            color: isDark ? '#888' : '#6B7280',
            border: `1px solid ${isDark ? '#333' : '#E5E7EB'}`,
          }}
        >
          {domain}.com{path}
        </div>
      </div>

      {/* Content area */}
      <div className="overflow-hidden">{children}</div>
    </div>
  )
}
