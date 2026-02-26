'use client'

import type { ColorPalette } from '@/types/brand'
import type { TonePreset } from '@/types/tones'
import type React from 'react'
import { useBrandStore } from '@/store/brand-store'
import { getTonePreset } from '@/data/tones'
import { useActivePalette } from '@/hooks/use-active-palette'
import { PhoneFrame } from './PhoneFrame'

export function MockupMobile(): React.ReactElement {
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

  const ctaText: string = tone?.copy.cta ?? 'Get Started'

  const STATS: { label: string; value: string; trend: string }[] = [
    { label: 'Tasks', value: '12', trend: '+3' },
    { label: 'Completed', value: '7', trend: '+2' },
  ]
  const RECENT_ITEMS: string[] = ['Project Alpha', 'Design Review', 'Team Standup']
  const TIMES: string[] = ['2m', '1h', '3h']
  const TAB_ITEMS: string[] = ['Home', 'Stats', 'Add', 'Profile']

  return (
    <PhoneFrame>
      <div
        className="flex flex-col"
        style={{ backgroundColor: palette.bg, minHeight: '580px' }}
      >
        {/* App header */}
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{ borderBottom: `1px solid ${palette.border}` }}
        >
          <span className="text-base" style={{ ...headingStyle, color: palette.primary }}>
            {name}
          </span>
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full"
            style={{ backgroundColor: palette.surface }}
          >
            <span className="text-xs" style={{ color: palette.textMuted }}>&#9881;</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-5">
          {/* Welcome text */}
          <h2 className="text-xl" style={{ ...headingStyle, color: palette.text }}>
            {tone?.copy.mobileWelcome ?? 'Welcome back'}
          </h2>
          <p className="mt-1 text-sm" style={{ ...bodyStyle, color: palette.textMuted }}>
            {tone?.copy.dashboardStatus ?? 'Everything is running smoothly.'}
          </p>

          {/* Stats cards */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            {STATS.map((stat: { label: string; value: string; trend: string }) => (
              <div
                key={stat.label}
                className="rounded-xl p-4"
                style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}` }}
              >
                <div className="text-2xl" style={{ ...headingStyle, color: palette.primary }}>
                  {stat.value}
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs" style={{ ...bodyStyle, color: palette.textMuted }}>
                    {stat.label}
                  </span>
                  <span className="text-xs" style={{ color: palette.success }}>
                    {stat.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Action button */}
          <div
            className="mt-5 flex items-center justify-center rounded-xl py-3 text-sm"
            style={{ ...bodyStyle, background: primaryBg, color: '#FFFFFF', fontWeight: 600 }}
          >
            {ctaText}
          </div>

          {/* Recent items */}
          <div className="mt-5">
            <div
              className="mb-2 text-xs"
              style={{ ...headingStyle, color: palette.textMuted, fontWeight: 600 }}
            >
              Recent
            </div>
            {RECENT_ITEMS.map((item: string, i: number) => (
              <div
                key={item}
                className="flex items-center justify-between border-b py-3 last:border-b-0"
                style={{ borderColor: palette.border }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="h-8 w-8 rounded-lg"
                    style={{ backgroundColor: `${palette.primary}15` }}
                  />
                  <div>
                    <span
                      className="block text-sm"
                      style={{ ...bodyStyle, color: palette.text }}
                    >
                      {item}
                    </span>
                    <span
                      className="text-xs"
                      style={{ ...bodyStyle, color: palette.textMuted }}
                    >
                      Updated {TIMES[i]} ago
                    </span>
                  </div>
                </div>
                <span className="text-xs" style={{ color: palette.textMuted }}>
                  &rsaquo;
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom tab bar */}
        <div
          className="flex items-center justify-around border-t px-4 py-3"
          style={{ backgroundColor: palette.surface, borderColor: palette.border }}
        >
          {TAB_ITEMS.map((tab: string, i: number) => (
            <div key={tab} className="flex flex-col items-center gap-0.5">
              <div
                className="h-5 w-5 rounded"
                style={{
                  backgroundColor: i === 0 ? palette.primary : `${palette.textMuted}30`,
                }}
              />
              <span
                className="text-xs"
                style={{ ...bodyStyle, color: i === 0 ? palette.primary : palette.textMuted }}
              >
                {tab}
              </span>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  )
}
