import type { FontCategory, FontPair } from '@/types/fonts'

const loadedFonts: Set<string> = new Set<string>()

/**
 * Load a single Google Font family with specified weights.
 * Injects a <link> tag into <head>. Skips if already loaded.
 */
export function loadGoogleFont(
  family: string,
  weights: number[] = [400, 500, 600, 700],
): void {
  const key: string = `${family}:${weights.join(',')}`
  if (loadedFonts.has(key)) return

  const encodedFamily: string = family.replace(/ /g, '+')
  const weightsParam: string = weights.join(';')
  const url: string = `https://fonts.googleapis.com/css2?family=${encodedFamily}:wght@${weightsParam}&display=swap`

  const link: HTMLLinkElement = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = url
  link.crossOrigin = 'anonymous'
  document.head.appendChild(link)

  loadedFonts.add(key)
}

/**
 * Load a font pair (heading + body fonts).
 */
export function loadFontPair(
  headingFamily: string,
  headingWeight: number,
  bodyFamily: string,
  bodyWeight: number,
): void {
  loadGoogleFont(headingFamily, [headingWeight, 400, 800])
  if (bodyFamily !== headingFamily) {
    loadGoogleFont(bodyFamily, [bodyWeight, 400, 700])
  }
}

/**
 * Preload all fonts in a category.
 */
export function preloadFontCategory(category: FontCategory): void {
  category.pairs.forEach((pair: FontPair) => {
    loadGoogleFont(pair.heading.family, [pair.heading.weight])
    if (pair.body.family !== pair.heading.family) {
      loadGoogleFont(pair.body.family, [pair.body.weight])
    }
  })
}

/**
 * Check if a font family is loaded and ready to render.
 */
export function isFontLoaded(family: string): boolean {
  try {
    return document.fonts.check(`16px "${family}"`)
  } catch {
    return false
  }
}

/**
 * Wait for a specific font to be loaded and ready.
 */
export async function waitForFont(family: string, timeout: number = 3000): Promise<boolean> {
  try {
    await Promise.race([
      document.fonts.load(`16px "${family}"`),
      new Promise((_resolve, reject) => setTimeout(() => reject(new Error('timeout')), timeout)),
    ])
    return true
  } catch {
    return false
  }
}

/**
 * Get the CSS font-family string with fallbacks.
 */
export function getFontStack(family: string, type: 'sans' | 'serif' | 'mono' = 'sans'): string {
  const fallbacks: Record<string, string> = {
    sans: 'system-ui, -apple-system, sans-serif',
    serif: 'Georgia, "Times New Roman", serif',
    mono: '"SF Mono", "Fira Code", monospace',
  }
  return `"${family}", ${fallbacks[type]}`
}
