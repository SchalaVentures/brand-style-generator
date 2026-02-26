import { converter, formatHex } from 'culori'

const toOklch = converter('oklch')

export function relativeLuminance(hex: string): number {
  const r: number = parseInt(hex.slice(1, 3), 16) / 255
  const g: number = parseInt(hex.slice(3, 5), 16) / 255
  const b: number = parseInt(hex.slice(5, 7), 16) / 255

  const toLinear = (c: number): number =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)

  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)
}

export function contrastRatio(hex1: string, hex2: string): number {
  const l1: number = relativeLuminance(hex1)
  const l2: number = relativeLuminance(hex2)
  const lighter: number = Math.max(l1, l2)
  const darker: number = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

export function ensureContrast(
  foreground: string,
  background: string,
  minRatio: number,
  direction: 'lighten' | 'darken',
): string {
  const fg = toOklch(foreground)
  if (fg === undefined) return foreground

  let current = { ...fg }
  let attempts: number = 0

  while (
    contrastRatio(formatHex(current) ?? foreground, background) < minRatio &&
    attempts < 50
  ) {
    current = {
      ...current,
      l: current.l + (direction === 'lighten' ? 0.02 : -0.02),
    }
    current.l = Math.max(0, Math.min(1, current.l))
    attempts++
  }

  return formatHex(current) ?? foreground
}

export function shouldUseWhiteText(bgHex: string): boolean {
  return relativeLuminance(bgHex) < 0.4
}
