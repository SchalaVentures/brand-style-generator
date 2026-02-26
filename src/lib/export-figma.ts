import type { BrandState } from '@/types/brand'

export function generateFigmaTokensExport(state: BrandState): string {
  const { lightPalette, darkPalette, headingFont, bodyFont } = state

  const tokens: Record<string, unknown> = {
    color: {
      light: {
        primary: { value: lightPalette.primary, type: 'color' },
        secondary: { value: lightPalette.secondary, type: 'color' },
        tertiary: { value: lightPalette.tertiary, type: 'color' },
        accent: { value: lightPalette.accent, type: 'color' },
        'on-primary': { value: lightPalette.onPrimary, type: 'color' },
        'on-secondary': { value: lightPalette.onSecondary, type: 'color' },
        'on-tertiary': { value: lightPalette.onTertiary, type: 'color' },
        'on-accent': { value: lightPalette.onAccent, type: 'color' },
        bg: { value: lightPalette.bg, type: 'color' },
        surface: { value: lightPalette.surface, type: 'color' },
        'surface-raised': { value: lightPalette.surfaceRaised, type: 'color' },
        border: { value: lightPalette.border, type: 'color' },
        text: { value: lightPalette.text, type: 'color' },
        'text-muted': { value: lightPalette.textMuted, type: 'color' },
        success: { value: lightPalette.success, type: 'color' },
        warning: { value: lightPalette.warning, type: 'color' },
        error: { value: lightPalette.error, type: 'color' },
      },
      dark: {
        primary: { value: darkPalette.primary, type: 'color' },
        secondary: { value: darkPalette.secondary, type: 'color' },
        tertiary: { value: darkPalette.tertiary, type: 'color' },
        accent: { value: darkPalette.accent, type: 'color' },
        'on-primary': { value: darkPalette.onPrimary, type: 'color' },
        'on-secondary': { value: darkPalette.onSecondary, type: 'color' },
        'on-tertiary': { value: darkPalette.onTertiary, type: 'color' },
        'on-accent': { value: darkPalette.onAccent, type: 'color' },
        bg: { value: darkPalette.bg, type: 'color' },
        surface: { value: darkPalette.surface, type: 'color' },
        'surface-raised': { value: darkPalette.surfaceRaised, type: 'color' },
        border: { value: darkPalette.border, type: 'color' },
        text: { value: darkPalette.text, type: 'color' },
        'text-muted': { value: darkPalette.textMuted, type: 'color' },
        success: { value: darkPalette.success, type: 'color' },
        warning: { value: darkPalette.warning, type: 'color' },
        error: { value: darkPalette.error, type: 'color' },
      },
    },
    typography: {
      heading: {
        fontFamily: { value: headingFont, type: 'fontFamilies' },
        fontWeight: { value: String(state.headingWeight), type: 'fontWeights' },
      },
      body: {
        fontFamily: { value: bodyFont, type: 'fontFamilies' },
        fontWeight: { value: String(state.bodyWeight), type: 'fontWeights' },
      },
    },
    fontSize: {
      xs: { value: '12', type: 'fontSizes' },
      sm: { value: '14', type: 'fontSizes' },
      base: { value: '16', type: 'fontSizes' },
      lg: { value: '18', type: 'fontSizes' },
      xl: { value: '20', type: 'fontSizes' },
      '2xl': { value: '24', type: 'fontSizes' },
      '3xl': { value: '30', type: 'fontSizes' },
      '4xl': { value: '36', type: 'fontSizes' },
      '5xl': { value: '48', type: 'fontSizes' },
    },
    borderRadius: {
      sm: { value: '6', type: 'borderRadius' },
      md: { value: '8', type: 'borderRadius' },
      lg: { value: '12', type: 'borderRadius' },
      xl: { value: '16', type: 'borderRadius' },
    },
  }

  if (state.gradientCSS !== null) {
    tokens['gradient'] = {
      primary: { value: state.gradientCSS, type: 'color' },
      stops: (state.gradientStops ?? []).map((stop: string) => ({ value: stop, type: 'color' })),
    }
  }

  return JSON.stringify(tokens, null, 2)
}
