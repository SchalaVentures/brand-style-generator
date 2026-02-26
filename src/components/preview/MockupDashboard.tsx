'use client'

import type { ColorPalette } from '@/types/brand'
import type { TonePreset } from '@/types/tones'
import type React from 'react'
import { useBrandStore } from '@/store/brand-store'
import { getTonePreset } from '@/data/tones'
import { useActivePalette } from '@/hooks/use-active-palette'
import { useMockupZoom } from '@/hooks/use-mockup-zoom'
import { BrowserFrame } from './BrowserFrame'


export function MockupDashboard(): React.ReactElement {
  const name: string = useBrandStore((s) => s.name)
  const headingFont: string = useBrandStore((s) => s.headingFont)
  const headingWeight: number = useBrandStore((s) => s.headingWeight)
  const bodyFont: string = useBrandStore((s) => s.bodyFont)
  const bodyWeight: number = useBrandStore((s) => s.bodyWeight)
  const tonePresetId: string | null = useBrandStore((s) => s.tonePresetId)

  const colorType: string = useBrandStore((s) => s.colorType)
  const gradientCSS: string | null = useBrandStore((s) => s.gradientCSS)

  const palette: ColorPalette = useActivePalette()
  const tone: TonePreset | undefined = tonePresetId !== null ? getTonePreset(tonePresetId) : undefined
  const primaryBg: string = colorType === 'gradient' && gradientCSS !== null ? gradientCSS : palette.primary

  const headingStyle: React.CSSProperties = {
    fontFamily: `"${headingFont}", system-ui, sans-serif`,
    fontWeight: headingWeight,
  }
  const bodyStyle: React.CSSProperties = {
    fontFamily: `"${bodyFont}", system-ui, sans-serif`,
    fontWeight: bodyWeight,
  }

  const NAV_ITEMS: string[] = ['Dashboard', 'Projects', 'Analytics', 'Team', 'Settings']
  const STATS: { label: string; value: string }[] = [
    { label: 'Active Users', value: '2,847' },
    { label: 'Revenue', value: '$12.4k' },
    { label: 'Conversion', value: '3.2%' },
  ]
  const BAR_HEIGHTS: number[] = [40, 65, 45, 80, 55, 70, 90, 60, 75, 50, 85, 65]
  const ACTIVITY_ITEMS: string[] = [
    'New signup from alex@company.co',
    'Invoice #1042 paid',
    'Team meeting scheduled',
  ]
  const TIMESTAMPS: string[] = ['2m ago', '1h ago', '3h ago']
  const { containerRef, contentRef, zoom } = useMockupZoom()

  return (
    <div ref={containerRef} className="overflow-x-auto sm:overflow-visible">
    <div ref={contentRef} className="min-w-[780px] pb-4 sm:min-w-0 sm:pb-0" style={{ zoom }}>
    <BrowserFrame path="/dashboard">
      <div
        className="flex min-h-[480px]"
        style={{ backgroundColor: palette.bg, color: palette.text }}
      >
        {/* Sidebar */}
        <div
          className="flex w-48 shrink-0 flex-col gap-1 border-r p-4"
          style={{ backgroundColor: palette.surface, borderColor: palette.border }}
        >
          <div className="mb-4 px-2" style={headingStyle}>
            <span style={{ color: palette.primary, fontSize: '16px' }}>{name}</span>
          </div>
          {NAV_ITEMS.map((item: string, i: number) => (
            <div
              key={item}
              className="rounded-md px-3 py-2 text-[13px]"
              style={{
                ...bodyStyle,
                backgroundColor: i === 0 ? `${palette.primary}15` : 'transparent',
                color: i === 0 ? palette.primary : palette.textMuted,
              }}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 p-6">
          {/* Page header */}
          <div className="mb-6">
            <h1 className="text-xl" style={{ ...headingStyle, color: palette.text }}>
              Dashboard
            </h1>
            <p className="mt-1 text-sm" style={{ ...bodyStyle, color: palette.textMuted }}>
              {tone?.copy.dashboardStatus ?? 'All systems operational'}
            </p>
          </div>

          {/* Stats grid */}
          <div className="mb-6 grid grid-cols-3 gap-4">
            {STATS.map((stat: { label: string; value: string }) => (
              <div
                key={stat.label}
                className="rounded-lg p-4"
                style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}` }}
              >
                <div className="text-2xl" style={{ ...headingStyle, color: palette.primary }}>
                  {stat.value}
                </div>
                <div className="mt-1 text-xs" style={{ ...bodyStyle, color: palette.textMuted }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Chart placeholder */}
          <div
            className="mb-6 rounded-lg p-4"
            style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}` }}
          >
            <div className="mb-3 text-sm" style={{ ...headingStyle, color: palette.text }}>
              Performance
            </div>
            <div className="flex h-24 items-end gap-2">
              {BAR_HEIGHTS.map((h: number, i: number) => (
                <div
                  key={i}
                  className="flex-1 rounded-t"
                  style={{
                    height: `${h}%`,
                    background: i === 6 ? primaryBg : `${palette.primary}30`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div
            className="rounded-lg"
            style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}` }}
          >
            <div
              className="border-b px-4 py-3 text-sm"
              style={{ ...headingStyle, color: palette.text, borderColor: palette.border }}
            >
              Recent Activity
            </div>
            {ACTIVITY_ITEMS.map((item: string, i: number) => (
              <div
                key={i}
                className="flex items-center justify-between border-b px-4 py-3 last:border-b-0"
                style={{ ...bodyStyle, borderColor: palette.border }}
              >
                <span className="text-sm" style={{ color: palette.text }}>
                  {item}
                </span>
                <span className="text-xs" style={{ color: palette.textMuted }}>
                  {TIMESTAMPS[i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BrowserFrame>
    </div>
    </div>
  )
}
