import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { BrandState, ColorPalette, PreviewTab } from '@/types/brand'
import { generatePalette, generateGradientPalette } from '@/lib/palette'
import { getDefaultBrand } from '@/data/defaults'
import { nhost, auth } from '@/lib/nhost'

interface BrandActions {
  setName: (name: string) => void
  setTagline: (tagline: string) => void

  selectColorFamily: (familyId: string) => void
  selectColorShade: (shadeId: string, hex: string) => void
  selectGradient: (familyId: string, primaryHex: string, gradientCSS: string, stops: string[]) => void
  setCustomColor: (hex: string) => void
  setColorOverride: (mode: 'light' | 'dark', role: keyof ColorPalette, hex: string) => void
  resetColorOverride: (mode: 'light' | 'dark', role: keyof ColorPalette) => void
  resetAllColorOverrides: () => void

  selectFontCategory: (categoryId: string) => void
  selectFontPair: (pairId: string, headingFont: string, headingWeight: number, bodyFont: string, bodyWeight: number) => void
  setCustomFonts: (headingFont: string, headingWeight: number, bodyFont: string, bodyWeight: number) => void

  selectTone: (toneId: string) => void

  setProjectId: (id: string | null) => void

  setStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  completeWizard: () => void

  setPreviewMode: (mode: 'light' | 'dark') => void
  togglePreviewMode: () => void
  setActiveTab: (tab: PreviewTab) => void

  resetAll: () => void
  loadState: (state: Partial<BrandState>) => void

  getActivePalette: () => ColorPalette
}

type BrandStore = BrandState & BrandActions

export const useBrandStore = create<BrandStore>()(
  persist(
    (set, get) => ({
      ...getDefaultBrand(),

      setName: (name: string) => set({ name }),
      setTagline: (tagline: string) => set({ tagline }),

      selectColorFamily: (familyId: string) => set({ colorFamilyId: familyId }),
      selectColorShade: (shadeId: string, hex: string) => {
        const { light, dark } = generatePalette(hex)
        set({
          colorShadeId: shadeId,
          colorType: 'solid',
          primaryColor: hex,
          gradientCSS: null,
          gradientStops: null,
          lightPalette: light,
          darkPalette: dark,
          colorOverrides: { light: {}, dark: {} },
        })
      },
      selectGradient: (familyId: string, primaryHex: string, gradientCSS: string, stops: string[]) => {
        const { light, dark } = generateGradientPalette(stops, primaryHex)
        set({
          colorFamilyId: familyId,
          colorShadeId: null,
          colorType: 'gradient',
          primaryColor: primaryHex,
          gradientCSS,
          gradientStops: stops,
          lightPalette: light,
          darkPalette: dark,
          colorOverrides: { light: {}, dark: {} },
        })
      },
      setCustomColor: (hex: string) => {
        const { light, dark } = generatePalette(hex)
        set({
          colorFamilyId: null,
          colorShadeId: null,
          colorType: 'solid',
          primaryColor: hex,
          gradientCSS: null,
          gradientStops: null,
          lightPalette: light,
          darkPalette: dark,
        })
      },
      setColorOverride: (mode: 'light' | 'dark', role: keyof ColorPalette, hex: string) =>
        set((state: BrandStore) => ({
          colorOverrides: {
            ...state.colorOverrides,
            [mode]: { ...state.colorOverrides[mode], [role]: hex },
          },
        })),
      resetColorOverride: (mode: 'light' | 'dark', role: keyof ColorPalette) =>
        set((state: BrandStore) => {
          const overrides: Partial<ColorPalette> = { ...state.colorOverrides[mode] }
          delete overrides[role]
          return { colorOverrides: { ...state.colorOverrides, [mode]: overrides } }
        }),
      resetAllColorOverrides: () => set({ colorOverrides: { light: {}, dark: {} } }),

      selectFontCategory: (categoryId: string) => set({ fontCategoryId: categoryId }),
      selectFontPair: (pairId: string, headingFont: string, headingWeight: number, bodyFont: string, bodyWeight: number) =>
        set({ fontPairId: pairId, headingFont, headingWeight, bodyFont, bodyWeight }),
      setCustomFonts: (headingFont: string, headingWeight: number, bodyFont: string, bodyWeight: number) =>
        set({ fontCategoryId: null, fontPairId: null, headingFont, headingWeight, bodyFont, bodyWeight }),

      selectTone: (toneId: string) => set({ tonePresetId: toneId }),

      setProjectId: (id: string | null) => set({ projectId: id }),

      setStep: (step: number) => set({ currentStep: step }),
      nextStep: () => set((state: BrandStore) => ({ currentStep: Math.min(state.currentStep + 1, state.wizardCompleted ? 4 : 3) })),
      prevStep: () => set((state: BrandStore) => ({ currentStep: Math.max(state.currentStep - 1, 0) })),
      completeWizard: () => {
        set({ wizardCompleted: true, currentStep: 4 })

        // Create anonymous account only when the user finishes the wizard
        if (nhost.getUserSession() === null) {
          auth.signInAnonymous().catch(() => {
            // Backend may be down — app still works via localStorage
          })
        }
      },

      setPreviewMode: (mode: 'light' | 'dark') => set({ previewMode: mode }),
      togglePreviewMode: () =>
        set((state: BrandStore) => ({
          previewMode: state.previewMode === 'light' ? 'dark' : 'light',
        })),
      setActiveTab: (tab: PreviewTab) => set({ activeTab: tab }),

      resetAll: () => set({ ...getDefaultBrand(), projectId: null }),
      loadState: (newState: Partial<BrandState>) => set(newState),

      getActivePalette: (): ColorPalette => {
        const state: BrandStore = get()
        const basePalette: ColorPalette =
          state.previewMode === 'light' ? state.lightPalette : state.darkPalette
        const overrides: Partial<ColorPalette> = state.colorOverrides[state.previewMode]
        return { ...basePalette, ...overrides }
      },
    }),
    {
      name: 'bsg-brand-state',
      version: 2,
      migrate: (): BrandState => getDefaultBrand(),
    },
  ),
)
