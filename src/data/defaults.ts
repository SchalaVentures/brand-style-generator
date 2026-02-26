import type { BrandState } from '@/types/brand'
import { generatePalette } from '@/lib/palette'

const DEFAULT_PRIMARY: string = '#2563EB'
const { light, dark } = generatePalette(DEFAULT_PRIMARY)

export function getDefaultBrand(): BrandState {
  return {
    name: 'Acme',
    tagline: '',

    colorFamilyId: 'blues',
    colorShadeId: 'royal',
    colorType: 'solid',
    primaryColor: DEFAULT_PRIMARY,
    gradientCSS: null,
    gradientStops: null,
    lightPalette: light,
    darkPalette: dark,
    colorOverrides: { light: {}, dark: {} },

    fontCategoryId: 'modern',
    fontPairId: 'inter',
    headingFont: 'Inter',
    headingWeight: 700,
    bodyFont: 'Inter',
    bodyWeight: 400,

    tonePresetId: 'confident',

    projectId: null,

    currentStep: 0,
    previewMode: 'light',
    activeTab: 'brand-guide',
    wizardCompleted: false,
  }
}
