export interface ColorPalette {
  // Brand colors — core identity
  primary: string
  secondary: string
  tertiary: string
  accent: string

  // Surface colors — auto-derived
  bg: string
  surface: string
  surfaceRaised: string
  border: string

  // On-colors — readable text on brand backgrounds
  onPrimary: string
  onSecondary: string
  onTertiary: string
  onAccent: string

  // Text colors — adapt to brand hue
  text: string
  textMuted: string

  // Semantic colors — brand-influenced
  success: string
  warning: string
  error: string
}

export interface BrandState {
  // Step 0: Brand info
  name: string
  tagline: string

  // Step 1: Colors
  colorFamilyId: string | null
  colorShadeId: string | null
  colorType: 'solid' | 'gradient'
  primaryColor: string
  gradientCSS: string | null
  gradientStops: string[] | null
  lightPalette: ColorPalette
  darkPalette: ColorPalette
  colorOverrides: {
    light: Partial<ColorPalette>
    dark: Partial<ColorPalette>
  }

  // Step 2: Typography
  fontCategoryId: string | null
  fontPairId: string | null
  headingFont: string
  headingWeight: number
  bodyFont: string
  bodyWeight: number

  // Step 3: Tone
  tonePresetId: string | null

  // Persistence
  projectId: string | null

  // UI state
  currentStep: number
  previewMode: 'light' | 'dark'
  activeTab: PreviewTab
  wizardCompleted: boolean
}

export type PreviewTab = 'dashboard' | 'landing' | 'mobile' | 'login' | 'brand-guide'

export type WizardStep = 0 | 1 | 2 | 3

export interface BrandProject {
  id: string
  userId: string
  name: string
  state: BrandState
  thumbnailColor: string | null
  createdAt: string
  updatedAt: string
}

export interface SharedLink {
  id: string
  state: BrandState
  brandName: string
  primaryColor: string | null
  viewCount: number
  createdAt: string
}
