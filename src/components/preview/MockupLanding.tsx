'use client'

import type { ColorPalette } from '@/types/brand'
import type { TonePreset } from '@/types/tones'
import type React from 'react'
import { useBrandStore } from '@/store/brand-store'
import { getTonePreset } from '@/data/tones'
import { useActivePalette } from '@/hooks/use-active-palette'

export function MockupLanding(): React.ReactElement {
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

  const features: [string, string, string] = tone?.copy.featureTitles ?? [
    'Built for performance.',
    'Security you can trust.',
    'Scale without limits.',
  ]
  const featureDescs: [string, string, string] = tone?.copy.featureDescriptions ?? [
    'Lightning-fast infrastructure that grows with your business.',
    'Enterprise-grade protection for your most sensitive data.',
    'From startup to enterprise, we scale seamlessly.',
  ]
  const ctaText: string = tone?.copy.cta ?? 'Get Started'

  const NAV_LINKS: string[] = ['Features', 'Pricing', 'Blog']
  const ICON_CHARS: string[] = ['&#9733;', '&#9672;', '&#9889;']
  const FOOTER_LINKS: string[] = ['Terms', 'Privacy', 'Contact']

  return (
    <div
      className="overflow-hidden rounded-xl"
      style={{ backgroundColor: palette.bg, border: `1px solid ${palette.border}` }}
    >
      {/* Navbar */}
      <nav
        className="flex h-14 items-center justify-between px-8"
        style={{ borderBottom: `1px solid ${palette.border}` }}
      >
        <span className="text-base" style={{ ...headingStyle, color: palette.primary }}>
          {name}
        </span>
        <div className="flex items-center gap-6">
          {NAV_LINKS.map((link: string) => (
            <span key={link} className="text-[13px]" style={{ ...bodyStyle, color: palette.textMuted }}>
              {link}
            </span>
          ))}
          <div
            className="rounded-md px-4 py-1.5 text-[13px]"
            style={{ ...bodyStyle, background: primaryBg, color: '#FFFFFF', fontWeight: 600 }}
          >
            {ctaText}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="px-8 py-16 text-center">
        <h1
          className="mx-auto max-w-lg text-4xl leading-tight"
          style={{ ...headingStyle, color: palette.text }}
        >
          {tone?.copy.heroHeadline ?? 'The smarter way to build.'}
        </h1>
        <p
          className="mx-auto mt-4 max-w-md text-base leading-relaxed"
          style={{ ...bodyStyle, color: palette.textMuted }}
        >
          {tone?.copy.heroSubheadline ?? "Trusted by teams who don't settle for second best."}
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <div
            className="rounded-lg px-6 py-2.5 text-sm"
            style={{ ...bodyStyle, background: primaryBg, color: '#FFFFFF', fontWeight: 600 }}
          >
            {ctaText}
          </div>
          <span className="text-sm" style={{ ...bodyStyle, color: palette.secondary, fontWeight: 500 }}>
            Learn More &rarr;
          </span>
        </div>
      </div>

      {/* Features */}
      <div
        className="px-8 py-12"
        style={{ backgroundColor: palette.surface, borderTop: `1px solid ${palette.border}` }}
      >
        <div className="grid grid-cols-3 gap-6">
          {features.map((title: string, i: number) => (
            <div
              key={i}
              className="rounded-lg p-5"
              style={{ backgroundColor: palette.bg, border: `1px solid ${palette.border}` }}
            >
              <div
                className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg text-sm"
                style={{ backgroundColor: `${palette.primary}15`, color: palette.primary }}
                dangerouslySetInnerHTML={{ __html: ICON_CHARS[i] ?? '&#9733;' }}
              />
              <div className="text-sm" style={{ ...headingStyle, color: palette.text }}>
                {title}
              </div>
              <p
                className="mt-2 text-xs leading-relaxed"
                style={{ ...bodyStyle, color: palette.textMuted }}
              >
                {featureDescs[i] ?? 'A powerful feature that helps your business grow.'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-between px-8 py-6"
        style={{ borderTop: `1px solid ${palette.border}` }}
      >
        <span className="text-xs" style={{ ...bodyStyle, color: palette.textMuted }}>
          &copy; 2026 {name}
        </span>
        <div className="flex gap-4">
          {FOOTER_LINKS.map((link: string) => (
            <span key={link} className="text-xs" style={{ ...bodyStyle, color: palette.textMuted }}>
              {link}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
