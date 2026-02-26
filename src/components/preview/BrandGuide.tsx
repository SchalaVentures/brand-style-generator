'use client'

import type { ColorPalette } from '@/types/brand'
import type { TonePreset } from '@/types/tones'
import type React from 'react'
import { useBrandStore } from '@/store/brand-store'
import { getTonePreset } from '@/data/tones'
import { contrastRatio } from '@/lib/contrast'
import { useActivePalette } from '@/hooks/use-active-palette'

// ─── Section wrapper ───────────────────────────────────────────────────────────

interface SectionProps {
  title: string
  palette: ColorPalette
  headingStyle: React.CSSProperties
  children: React.ReactNode
}

function Section({ title, palette, headingStyle, children }: SectionProps): React.ReactElement {
  return (
    <div className="px-10 py-8" style={{ borderTop: `1px solid ${palette.border}` }}>
      <h2 className="mb-5 text-xl" style={{ ...headingStyle, color: palette.text }}>
        {title}
      </h2>
      {children}
    </div>
  )
}

// ─── Color role definitions ─────────────────────────────────────────────────────

interface ColorRole {
  key: keyof ColorPalette
  label: string
  desc: string
}

const BRAND_COLORS: ColorRole[] = [
  { key: 'primary', label: 'Primary', desc: 'CTAs, headers, brand presence' },
  { key: 'secondary', label: 'Secondary', desc: 'Supporting elements, secondary buttons' },
  { key: 'tertiary', label: 'Tertiary', desc: 'Subtle accents, backgrounds' },
  { key: 'accent', label: 'Accent', desc: 'Highlights, badges, notifications' },
]

const SURFACE_TEXT_COLORS: ColorRole[] = [
  { key: 'bg', label: 'Background', desc: 'Page background' },
  { key: 'surface', label: 'Surface', desc: 'Cards, elevated content' },
  { key: 'surfaceRaised', label: 'Raised', desc: 'Modals, dropdowns' },
  { key: 'border', label: 'Border', desc: 'Dividers' },
  { key: 'text', label: 'Text', desc: 'Headings, body' },
  { key: 'textMuted', label: 'Text Muted', desc: 'Labels, captions' },
]

const SEMANTIC_COLORS: ColorRole[] = [
  { key: 'success', label: 'Success', desc: 'Positive states' },
  { key: 'warning', label: 'Warning', desc: 'Caution states' },
  { key: 'error', label: 'Error', desc: 'Error states' },
]

// ─── BrandGuide ─────────────────────────────────────────────────────────────────

export function BrandGuide(): React.ReactElement {
  const name: string = useBrandStore((s) => s.name)
  const tagline: string = useBrandStore((s) => s.tagline)
  const lightPalette: ColorPalette = useBrandStore((s) => s.lightPalette)
  const darkPalette: ColorPalette = useBrandStore((s) => s.darkPalette)
  const headingFont: string = useBrandStore((s) => s.headingFont)
  const headingWeight: number = useBrandStore((s) => s.headingWeight)
  const bodyFont: string = useBrandStore((s) => s.bodyFont)
  const bodyWeight: number = useBrandStore((s) => s.bodyWeight)
  const tonePresetId: string | null = useBrandStore((s) => s.tonePresetId)
  const colorType: string = useBrandStore((s) => s.colorType)
  const gradientCSS: string | null = useBrandStore((s) => s.gradientCSS)
  const gradientStops: string[] | null = useBrandStore((s) => s.gradientStops)

  const palette: ColorPalette = useActivePalette()
  const primaryBg: string = colorType === 'gradient' && gradientCSS !== null ? gradientCSS : palette.primary
  const tone: TonePreset | undefined = tonePresetId !== null ? getTonePreset(tonePresetId) : undefined

  const headingStyle: React.CSSProperties = {
    fontFamily: `"${headingFont}", system-ui, sans-serif`,
    fontWeight: headingWeight,
  }
  const bodyStyle: React.CSSProperties = {
    fontFamily: `"${bodyFont}", system-ui, sans-serif`,
    fontWeight: bodyWeight,
  }

  const textOnSwatch = (hex: string): string =>
    contrastRatio(hex, '#FFFFFF') >= 4.5 ? '#FFFFFF' : '#111111'

  const firstInitial: string = name.charAt(0).toUpperCase() || 'A'
  const WEIGHT_SHOWCASE: number[] = [400, 500, 600, 700]
  const isGradient: boolean = colorType === 'gradient' && gradientCSS !== null

  return (
    <div
      className="mx-auto max-w-3xl rounded-xl"
      style={{ backgroundColor: palette.bg, color: palette.text }}
    >
      {/* ─── HEADER ─── */}
      <div
        className="rounded-t-xl px-10 py-12 text-center"
        style={{ backgroundColor: palette.surface }}
      >
        <h1 className="text-4xl" style={{ ...headingStyle, color: palette.text }}>
          {name}
        </h1>
        {tagline !== '' && (
          <p className="mt-2 text-base" style={{ ...bodyStyle, color: palette.textMuted }}>
            {tagline}
          </p>
        )}
        <p className="mt-4 text-xs" style={{ ...bodyStyle, color: palette.textMuted }}>
          Brand Guide v1.0 &middot;{' '}
          {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
        </p>
      </div>

      {/* ─── SECTION 1: WORDMARK ─── */}
      <Section title="Wordmark" palette={palette} headingStyle={headingStyle}>
        <div className="grid grid-cols-2 gap-4">
          {/* On light bg */}
          <div
            className="flex flex-col items-center justify-center rounded-lg p-8"
            style={{ backgroundColor: lightPalette.bg, border: `1px solid ${lightPalette.border}` }}
          >
            <span className="text-2xl" style={{ ...headingStyle, color: lightPalette.text }}>
              {name}
            </span>
            <span className="mt-2 text-xs" style={{ ...bodyStyle, color: lightPalette.textMuted }}>
              On Light
            </span>
          </div>
          {/* On dark bg */}
          <div
            className="flex flex-col items-center justify-center rounded-lg p-8"
            style={{ backgroundColor: darkPalette.bg, border: `1px solid ${darkPalette.border}` }}
          >
            <span className="text-2xl" style={{ ...headingStyle, color: darkPalette.text }}>
              {name}
            </span>
            <span className="mt-2 text-xs" style={{ ...bodyStyle, color: darkPalette.textMuted }}>
              On Dark
            </span>
          </div>
          {/* On primary bg */}
          <div
            className="flex flex-col items-center justify-center rounded-lg p-8"
            style={{ background: primaryBg }}
          >
            <span className="text-2xl" style={{ ...headingStyle, color: isGradient ? '#FFFFFF' : textOnSwatch(palette.primary) }}>
              {name}
            </span>
            <span className="mt-2 text-xs" style={{ color: isGradient ? 'rgba(255,255,255,0.7)' : textOnSwatch(palette.primary), ...bodyStyle, opacity: 0.7 }}>
              On Primary
            </span>
          </div>
          {/* Brand color on light bg */}
          <div
            className="flex flex-col items-center justify-center rounded-lg p-8"
            style={{ backgroundColor: lightPalette.bg, border: `1px solid ${lightPalette.border}` }}
          >
            <span className="text-2xl" style={{ ...headingStyle, color: palette.primary }}>
              {name}
            </span>
            <span className="mt-2 text-xs" style={{ ...bodyStyle, color: lightPalette.textMuted }}>
              Brand Color
            </span>
          </div>
        </div>

        {/* With Tagline variant */}
        {tagline !== '' && (
          <div className="mt-4">
            <p className="mb-2 text-xs" style={{ ...bodyStyle, color: palette.textMuted }}>
              Lockup with tagline
            </p>
            <div
              className="flex flex-col items-center justify-center rounded-lg p-8"
              style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}` }}
            >
              <span className="text-2xl" style={{ ...headingStyle, color: palette.text }}>
                {name}
              </span>
              <span className="mt-1 text-sm" style={{ ...bodyStyle, color: palette.textMuted }}>
                {tagline}
              </span>
            </div>
          </div>
        )}

        {/* Favicon preview */}
        <div className="mt-6 flex items-center gap-4">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg text-lg"
            style={{
              ...headingStyle,
              background: primaryBg,
              color: isGradient ? '#FFFFFF' : textOnSwatch(palette.primary),
            }}
          >
            {firstInitial}
          </div>
          <div
            className="flex h-8 w-8 items-center justify-center rounded-md text-sm"
            style={{
              ...headingStyle,
              background: primaryBg,
              color: isGradient ? '#FFFFFF' : textOnSwatch(palette.primary),
            }}
          >
            {firstInitial}
          </div>
          <span className="text-xs" style={{ ...bodyStyle, color: palette.textMuted }}>
            Favicon / Avatar
          </span>
        </div>
      </Section>

      {/* ─── SECTION 2: BRAND COLORS ─── */}
      <Section title="Brand Colors" palette={palette} headingStyle={headingStyle}>
        {/* Primary — hero swatch, full width */}
        <div
          className="overflow-hidden rounded-xl"
          style={{ border: `1px solid ${palette.border}` }}
        >
          <div
            className="flex h-24 items-end p-5"
            style={{ background: isGradient ? (gradientCSS ?? palette.primary) : palette.primary }}
          >
            <div>
              <div
                className="text-sm font-semibold"
                style={{ color: isGradient ? '#FFFFFF' : textOnSwatch(palette.primary) }}
              >
                Primary
              </div>
              <div
                className="mt-0.5 font-mono text-xs opacity-80"
                style={{ color: isGradient ? '#FFFFFF' : textOnSwatch(palette.primary) }}
              >
                {isGradient ? 'Gradient' : palette.primary}
              </div>
            </div>
          </div>
          {/* Gradient stops indicator */}
          {isGradient && gradientStops !== null && (
            <div className="flex gap-0">
              {gradientStops.map((stop: string, i: number) => (
                <div
                  key={i}
                  className="flex h-8 flex-1 items-center justify-center"
                  style={{ backgroundColor: stop }}
                >
                  <span
                    className="font-mono text-xs"
                    style={{ color: textOnSwatch(stop) }}
                  >
                    {stop}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Secondary, Tertiary, Accent — 3-column row */}
        <div className="mt-3 grid grid-cols-3 gap-3">
          {BRAND_COLORS.slice(1).map((role: ColorRole) => {
            const hex: string = palette[role.key]
            return (
              <div
                key={role.key}
                className="flex flex-col overflow-hidden rounded-lg"
                style={{ border: `1px solid ${palette.border}` }}
              >
                <div
                  className="flex h-16 items-end p-3"
                  style={{ backgroundColor: hex }}
                >
                  <span
                    className="font-mono text-xs"
                    style={{ color: textOnSwatch(hex) }}
                  >
                    {hex}
                  </span>
                </div>
                <div className="flex-1 p-3" style={{ backgroundColor: palette.surface }}>
                  <div className="text-xs font-semibold" style={{ color: palette.text }}>
                    {role.label}
                  </div>
                  <div className="mt-0.5 text-xs" style={{ color: palette.textMuted }}>
                    {role.desc}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Surface, Text & Semantic — compact rows */}
        <div className="mt-6">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider" style={{ color: palette.textMuted }}>
            Surfaces &amp; Text
          </p>
          <div className="flex flex-wrap gap-4">
            {SURFACE_TEXT_COLORS.map((role: ColorRole) => {
              const hex: string = palette[role.key]
              return (
                <div key={role.key} className="flex items-center gap-2">
                  <div
                    className="h-7 w-7 rounded-md"
                    style={{
                      backgroundColor: hex,
                      border: `1px solid ${palette.border}`,
                    }}
                  />
                  <div>
                    <div className="text-xs font-medium" style={{ color: palette.text }}>
                      {role.label}
                    </div>
                    <div className="font-mono text-xs" style={{ color: palette.textMuted }}>
                      {hex}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-5">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider" style={{ color: palette.textMuted }}>
            Semantic
          </p>
          <div className="flex gap-6">
            {SEMANTIC_COLORS.map((role: ColorRole) => {
              const hex: string = palette[role.key]
              return (
                <div key={role.key} className="flex items-center gap-2">
                  <div
                    className="h-5 w-5 rounded-full"
                    style={{ backgroundColor: hex }}
                  />
                  <div>
                    <span className="text-xs font-medium" style={{ color: palette.text }}>
                      {role.label}
                    </span>
                    <span className="ml-1.5 font-mono text-xs" style={{ color: palette.textMuted }}>
                      {hex}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Section>

      {/* ─── SECTION 3: TYPOGRAPHY ─── */}
      <Section title="Typography" palette={palette} headingStyle={headingStyle}>
        {/* Type scale specimens */}
        <div className="space-y-5">
          {/* Heading */}
          <div
            className="rounded-lg p-5"
            style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}` }}
          >
            <div className="mb-2 flex items-baseline justify-between">
              <span className="text-xs font-medium" style={{ ...bodyStyle, color: palette.textMuted }}>
                Heading
              </span>
              <span className="font-mono text-xs" style={{ color: palette.textMuted }}>
                {headingFont} &middot; {headingWeight} &middot; 32–48px &middot; -0.5px
              </span>
            </div>
            <p className="text-3xl leading-tight" style={{ ...headingStyle, color: palette.text, letterSpacing: '-0.5px' }}>
              {tone?.copy.heroHeadline ?? 'The smarter way to build.'}
            </p>
          </div>

          {/* Subheading */}
          <div
            className="rounded-lg p-5"
            style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}` }}
          >
            <div className="mb-2 flex items-baseline justify-between">
              <span className="text-xs font-medium" style={{ ...bodyStyle, color: palette.textMuted }}>
                Subheading
              </span>
              <span className="font-mono text-xs" style={{ color: palette.textMuted }}>
                {headingFont} &middot; {Math.min(headingWeight, 600)} &middot; 20–24px &middot; -0.3px
              </span>
            </div>
            <p
              className="text-xl leading-snug"
              style={{
                fontFamily: `"${headingFont}", system-ui, sans-serif`,
                fontWeight: Math.min(headingWeight, 600),
                color: palette.text,
                letterSpacing: '-0.3px',
              }}
            >
              {tone?.copy.heroSubheadline ?? "Trusted by teams who don't settle for second best."}
            </p>
          </div>

          {/* Body */}
          <div
            className="rounded-lg p-5"
            style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}` }}
          >
            <div className="mb-2 flex items-baseline justify-between">
              <span className="text-xs font-medium" style={{ ...bodyStyle, color: palette.textMuted }}>
                Body
              </span>
              <span className="font-mono text-xs" style={{ color: palette.textMuted }}>
                {bodyFont} &middot; {bodyWeight} &middot; 16px &middot; 0px
              </span>
            </div>
            <p className="text-base leading-relaxed" style={{ ...bodyStyle, color: palette.text }}>
              This is an example of body text rendered in your chosen body font at regular weight and size,
              showing how paragraphs would look in production across multiple lines.
            </p>
          </div>

          {/* Caption */}
          <div
            className="rounded-lg p-5"
            style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}` }}
          >
            <div className="mb-2 flex items-baseline justify-between">
              <span className="text-xs font-medium" style={{ ...bodyStyle, color: palette.textMuted }}>
                Caption
              </span>
              <span className="font-mono text-xs" style={{ color: palette.textMuted }}>
                {bodyFont} &middot; {bodyWeight} &middot; 12–13px &middot; 0.1px
              </span>
            </div>
            <p
              className="text-xs leading-normal"
              style={{ ...bodyStyle, color: palette.textMuted, letterSpacing: '0.1px' }}
            >
              Captions and helper text for labels, timestamps, metadata, and secondary information.
            </p>
          </div>
        </div>

        {/* Weight showcase */}
        <div className="mt-8">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider" style={{ color: palette.textMuted }}>
            Weight Specimens
          </p>
          <div className="flex gap-6">
            {WEIGHT_SHOWCASE.map((w: number) => (
              <div key={w} className="text-center">
                <span
                  className="block text-3xl"
                  style={{ fontFamily: `"${headingFont}", system-ui`, fontWeight: w, color: palette.text }}
                >
                  Aa
                </span>
                <span
                  className="mt-1 block text-xs"
                  style={{ ...bodyStyle, color: palette.textMuted }}
                >
                  {w}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── SECTION 4: BUTTONS ─── */}
      <Section title="Buttons" palette={palette} headingStyle={headingStyle}>
        {/* On light surface */}
        <p className="mb-3 text-xs font-medium uppercase tracking-wider" style={{ color: palette.textMuted }}>
          On Light
        </p>
        <div
          className="flex flex-wrap gap-3 rounded-lg p-5"
          style={{ backgroundColor: lightPalette.bg, border: `1px solid ${lightPalette.border}` }}
        >
          <div
            className="rounded-lg px-5 py-2.5 text-sm"
            style={{ ...bodyStyle, background: primaryBg, color: '#FFFFFF', fontWeight: 600 }}
          >
            Primary
          </div>
          <div
            className="rounded-lg px-5 py-2.5 text-sm"
            style={{ ...bodyStyle, backgroundColor: palette.secondary, color: textOnSwatch(palette.secondary), fontWeight: 600 }}
          >
            Secondary
          </div>
          <div
            className="rounded-lg px-5 py-2.5 text-sm"
            style={{
              ...bodyStyle,
              border: `1.5px solid ${palette.primary}`,
              color: palette.primary,
              fontWeight: 600,
            }}
          >
            Outline
          </div>
          <div
            className="rounded-lg px-5 py-2.5 text-sm"
            style={{ ...bodyStyle, color: palette.primary, fontWeight: 600 }}
          >
            Ghost
          </div>
        </div>

        {/* On dark surface */}
        <p className="mb-3 mt-5 text-xs font-medium uppercase tracking-wider" style={{ color: palette.textMuted }}>
          On Dark
        </p>
        <div
          className="flex flex-wrap gap-3 rounded-lg p-5"
          style={{ backgroundColor: darkPalette.bg, border: `1px solid ${darkPalette.border}` }}
        >
          <div
            className="rounded-lg px-5 py-2.5 text-sm"
            style={{ ...bodyStyle, background: primaryBg, color: '#FFFFFF', fontWeight: 600 }}
          >
            Primary
          </div>
          <div
            className="rounded-lg px-5 py-2.5 text-sm"
            style={{ ...bodyStyle, backgroundColor: darkPalette.secondary ?? palette.secondary, color: textOnSwatch(darkPalette.secondary ?? palette.secondary), fontWeight: 600 }}
          >
            Secondary
          </div>
          <div
            className="rounded-lg px-5 py-2.5 text-sm"
            style={{
              ...bodyStyle,
              border: `1.5px solid ${palette.primary}`,
              color: palette.primary,
              fontWeight: 600,
            }}
          >
            Outline
          </div>
          <div
            className="rounded-lg px-5 py-2.5 text-sm"
            style={{ ...bodyStyle, color: palette.primary, fontWeight: 600 }}
          >
            Ghost
          </div>
        </div>
      </Section>

      {/* ─── SECTION 5: VOICE & TONE ─── */}
      {tone !== undefined && (
        <Section title="Voice & Tone" palette={palette} headingStyle={headingStyle}>
          {/* Do / Don't cards */}
          <div className="mb-6 space-y-3">
            {tone.voiceExamples.map((example: { do: string; dont: string }, i: number) => (
              <div key={i} className="grid grid-cols-2 gap-4">
                <div
                  className="rounded-lg p-4"
                  style={{ backgroundColor: palette.surface, borderLeft: `3px solid ${palette.success}` }}
                >
                  <div className="mb-2 text-xs font-semibold" style={{ color: palette.success }}>
                    Do
                  </div>
                  <p className="text-sm" style={{ ...bodyStyle, color: palette.text }}>
                    {example.do}
                  </p>
                </div>
                <div
                  className="rounded-lg p-4"
                  style={{ backgroundColor: palette.surface, borderLeft: `3px solid ${palette.error}` }}
                >
                  <div className="mb-2 text-xs font-semibold" style={{ color: palette.error }}>
                    Don&apos;t
                  </div>
                  <p className="text-sm" style={{ ...bodyStyle, color: palette.text }}>
                    {example.dont}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Tone context table */}
          <div
            className="overflow-hidden rounded-lg"
            style={{ border: `1px solid ${palette.border}` }}
          >
            <table className="w-full text-sm" style={bodyStyle}>
              <thead>
                <tr style={{ backgroundColor: palette.surface }}>
                  <th
                    className="px-4 py-2.5 text-left text-xs font-semibold"
                    style={{ color: palette.textMuted }}
                  >
                    Context
                  </th>
                  <th
                    className="px-4 py-2.5 text-left text-xs font-semibold"
                    style={{ color: palette.textMuted }}
                  >
                    Tone
                  </th>
                  <th
                    className="px-4 py-2.5 text-left text-xs font-semibold"
                    style={{ color: palette.textMuted }}
                  >
                    Example
                  </th>
                </tr>
              </thead>
              <tbody>
                {tone.toneTable.map((row: { context: string; tone: string; example: string }, i: number) => (
                  <tr key={i} style={{ borderTop: `1px solid ${palette.border}` }}>
                    <td className="px-4 py-2.5" style={{ color: palette.text }}>
                      {row.context}
                    </td>
                    <td className="px-4 py-2.5" style={{ color: palette.textMuted }}>
                      {row.tone}
                    </td>
                    <td className="px-4 py-2.5 italic" style={{ color: palette.textMuted }}>
                      {row.example}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {/* ─── SECTION 6: BRAND IDENTITY ─── */}
      {tone !== undefined && (
        <Section title="Brand Identity" palette={palette} headingStyle={headingStyle}>
          <div className="grid grid-cols-3 gap-4">
            {tone.traits.map((trait: string, i: number) => (
              <div
                key={i}
                className="rounded-lg p-5 text-center"
                style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}` }}
              >
                <div className="text-lg" style={{ ...headingStyle, color: palette.primary }}>
                  {trait}
                </div>
                <p
                  className="mt-2 text-xs leading-relaxed"
                  style={{ ...bodyStyle, color: palette.textMuted }}
                >
                  {tone.traitDescriptions[i]}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Footer */}
      <div className="px-10 py-6 text-center">
        <p className="text-xs" style={{ ...bodyStyle, color: palette.textMuted }}>
          Generated by brandstylegenerator.com
        </p>
      </div>
    </div>
  )
}
