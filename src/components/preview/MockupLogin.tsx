'use client'

import type { ColorPalette } from '@/types/brand'
import type { TonePreset } from '@/types/tones'
import type React from 'react'
import { useBrandStore } from '@/store/brand-store'
import { getTonePreset } from '@/data/tones'
import { useActivePalette } from '@/hooks/use-active-palette'

export function MockupLogin(): React.ReactElement {
  const name: string = useBrandStore((s) => s.name)
  const tagline: string = useBrandStore((s) => s.tagline)
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

  const SOCIAL_PROVIDERS: string[] = ['Google', 'GitHub']

  return (
    <div
      className="flex min-h-[520px] flex-col items-center justify-center rounded-xl px-4 py-12"
      style={{ backgroundColor: palette.bg }}
    >
      {/* Brand name + tagline */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl" style={{ ...headingStyle, color: palette.primary }}>
          {name}
        </h1>
        {tagline !== '' && (
          <p className="mt-1 text-sm" style={{ ...bodyStyle, color: palette.textMuted }}>
            {tagline}
          </p>
        )}
      </div>

      {/* Login card */}
      <div
        className="w-full max-w-sm rounded-2xl p-8"
        style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}` }}
      >
        {/* Welcome text */}
        <h2 className="text-lg" style={{ ...headingStyle, color: palette.text }}>
          {tone?.copy.loginWelcome ?? 'Welcome back.'}
        </h2>
        <p className="mt-1 text-sm" style={{ ...bodyStyle, color: palette.textMuted }}>
          Sign in to your account
        </p>

        {/* Email field */}
        <div className="mt-6">
          <label
            className="mb-1.5 block text-xs"
            style={{ ...bodyStyle, color: palette.textMuted, fontWeight: 500 }}
          >
            Email
          </label>
          <div
            className="flex h-10 w-full items-center rounded-lg px-3 text-sm"
            style={{
              ...bodyStyle,
              backgroundColor: palette.bg,
              border: `1px solid ${palette.border}`,
              color: palette.textMuted,
            }}
          >
            you@example.com
          </div>
        </div>

        {/* Password field */}
        <div className="mt-4">
          <label
            className="mb-1.5 block text-xs"
            style={{ ...bodyStyle, color: palette.textMuted, fontWeight: 500 }}
          >
            Password
          </label>
          <div
            className="flex h-10 w-full items-center rounded-lg px-3 text-sm"
            style={{
              ...bodyStyle,
              backgroundColor: palette.bg,
              border: `1px solid ${palette.border}`,
              color: palette.textMuted,
            }}
          >
            &bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;
          </div>
        </div>

        {/* Sign in button */}
        <div
          className="mt-6 flex h-10 w-full items-center justify-center rounded-lg text-sm"
          style={{ ...bodyStyle, background: primaryBg, color: '#FFFFFF', fontWeight: 600 }}
        >
          Sign In
        </div>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1" style={{ backgroundColor: palette.border }} />
          <span className="text-xs" style={{ ...bodyStyle, color: palette.textMuted }}>
            or continue with
          </span>
          <div className="h-px flex-1" style={{ backgroundColor: palette.border }} />
        </div>

        {/* Social login buttons */}
        <div className="flex gap-3">
          {SOCIAL_PROVIDERS.map((provider: string) => (
            <div
              key={provider}
              className="flex h-10 flex-1 items-center justify-center rounded-lg text-sm"
              style={{
                ...bodyStyle,
                backgroundColor: palette.bg,
                border: `1px solid ${palette.border}`,
                color: palette.text,
              }}
            >
              {provider}
            </div>
          ))}
        </div>

        {/* Sign up link */}
        <p
          className="mt-6 text-center text-xs"
          style={{ ...bodyStyle, color: palette.textMuted }}
        >
          Don&rsquo;t have an account?{' '}
          <span style={{ color: palette.secondary, fontWeight: 500 }}>Sign up</span>
        </p>
      </div>
    </div>
  )
}
