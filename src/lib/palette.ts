import { converter, formatHex } from 'culori'
import type { ColorPalette } from '@/types/brand'
import { ensureContrast } from './contrast'

const toOklch = converter('oklch')

export interface GeneratedPalettes {
  light: ColorPalette
  dark: ColorPalette
}

// ─── Solid color palette ────────────────────────────────────────────────────────

export function generatePalette(primaryHex: string): GeneratedPalettes {
  const primary = toOklch(primaryHex)
  if (primary === undefined) throw new Error(`Invalid color: ${primaryHex}`)

  const hue: number = primary.h ?? 0
  const chroma: number = primary.c ?? 0.15
  const isNeutral: boolean = chroma < 0.03

  // Derive brand colors from primary via hue relationships
  const secondaryHex: string = isNeutral
    ? oklchToHex(primary.l * 0.85, 0.02, 40)
    : oklchToHex(primary.l * 0.95, chroma * 0.80, normalizeHue(hue + 30))

  const tertiaryHex: string = isNeutral
    ? oklchToHex(primary.l * 0.70, 0.02, 220)
    : oklchToHex(primary.l * 0.85, chroma * 0.65, normalizeHue(hue - 60))

  const accentHex: string = isNeutral
    ? oklchToHex(0.65, 0.15, 40)
    : oklchToHex(0.65, Math.max(chroma, 0.12), normalizeHue(hue + 180))

  const light: ColorPalette = buildLightPalette(primaryHex, secondaryHex, tertiaryHex, accentHex, hue, chroma, isNeutral)
  const dark: ColorPalette = buildDarkPalette(primaryHex, secondaryHex, tertiaryHex, accentHex, hue, chroma, isNeutral)

  return { light, dark }
}

// ─── Gradient palette ───────────────────────────────────────────────────────────

export function generateGradientPalette(stops: string[], primaryHex: string): GeneratedPalettes {
  const primary = toOklch(primaryHex)
  if (primary === undefined) throw new Error(`Invalid color: ${primaryHex}`)

  const hue: number = primary.h ?? 0
  const chroma: number = primary.c ?? 0.15
  const isNeutral: boolean = chroma < 0.03

  // Map gradient stops to brand colors
  const secondaryHex: string = stops.length >= 2 ? (stops[1] ?? primaryHex) : primaryHex
  const tertiaryHex: string = stops.length >= 3 ? (stops[2] ?? secondaryHex) : secondaryHex

  // Accent: complementary to the dominant hue of the gradient
  const accentHex: string = isNeutral
    ? oklchToHex(0.65, 0.15, 40)
    : oklchToHex(0.65, Math.max(chroma, 0.12), normalizeHue(hue + 180))

  const light: ColorPalette = buildLightPalette(primaryHex, secondaryHex, tertiaryHex, accentHex, hue, chroma, isNeutral)
  const dark: ColorPalette = buildDarkPalette(primaryHex, secondaryHex, tertiaryHex, accentHex, hue, chroma, isNeutral)

  return { light, dark }
}

// ─── Light mode ─────────────────────────────────────────────────────────────────

function buildLightPalette(
  primaryHex: string,
  secondaryHex: string,
  tertiaryHex: string,
  accentHex: string,
  hue: number,
  chroma: number,
  isNeutral: boolean,
): ColorPalette {
  const c: number = isNeutral ? 0 : chroma

  // Surfaces — tinted with brand hue so each brand feels distinct
  const bg: string = oklchToHex(0.985, c * 0.012, hue)
  const surface: string = oklchToHex(0.993, c * 0.008, hue)
  const surfaceRaised: string = oklchToHex(0.998, c * 0.005, hue)
  const border: string = oklchToHex(0.91, c * 0.02, hue)

  // Text
  let text: string = oklchToHex(0.13, c * 0.03, hue)
  let textMuted: string = oklchToHex(0.50, c * 0.02, hue)
  text = ensureContrast(text, bg, 4.5, 'darken')
  textMuted = ensureContrast(textMuted, bg, 3.0, 'darken')

  // Semantic — blend with brand hue (20% influence)
  const successHue: number = blendHue(142, hue)
  const warningHue: number = blendHue(75, hue)
  const errorHue: number = blendHue(25, hue)

  return {
    primary: primaryHex,
    secondary: secondaryHex,
    tertiary: tertiaryHex,
    accent: accentHex,
    bg,
    surface,
    surfaceRaised,
    border,
    text,
    textMuted,
    success: oklchToHex(0.50, 0.15, successHue),
    warning: oklchToHex(0.52, 0.14, warningHue),
    error: oklchToHex(0.52, 0.16, errorHue),
  }
}

// ─── Dark mode ──────────────────────────────────────────────────────────────────

function buildDarkPalette(
  primaryHex: string,
  secondaryHex: string,
  tertiaryHex: string,
  accentHex: string,
  hue: number,
  chroma: number,
  isNeutral: boolean,
): ColorPalette {
  const c: number = isNeutral ? 0 : chroma

  // Surfaces
  const bg: string = oklchToHex(0.14, c * 0.06, hue)
  const surface: string = oklchToHex(0.19, c * 0.05, hue)
  const surfaceRaised: string = oklchToHex(0.23, c * 0.04, hue)
  const border: string = oklchToHex(0.27, c * 0.04, hue)

  // Text
  let text: string = oklchToHex(0.93, c * 0.04, hue)
  let textMuted: string = oklchToHex(0.62, c * 0.03, hue)
  text = ensureContrast(text, bg, 4.5, 'lighten')
  textMuted = ensureContrast(textMuted, bg, 3.0, 'lighten')

  // Semantic — blend with brand hue (20% influence)
  const successHue: number = blendHue(142, hue)
  const warningHue: number = blendHue(75, hue)
  const errorHue: number = blendHue(25, hue)

  return {
    primary: primaryHex,
    secondary: secondaryHex,
    tertiary: tertiaryHex,
    accent: accentHex,
    bg,
    surface,
    surfaceRaised,
    border,
    text,
    textMuted,
    success: oklchToHex(0.68, 0.16, successHue),
    warning: oklchToHex(0.76, 0.16, warningHue),
    error: oklchToHex(0.66, 0.18, errorHue),
  }
}

// ─── Helpers ────────────────────────────────────────────────────────────────────

function oklchToHex(l: number, c: number, h: number): string {
  return formatHex({ mode: 'oklch', l, c, h }) ?? '#000000'
}

function normalizeHue(h: number): number {
  return ((h % 360) + 360) % 360
}

function blendHue(semanticHue: number, brandHue: number): number {
  return normalizeHue(semanticHue * 0.8 + brandHue * 0.2)
}
