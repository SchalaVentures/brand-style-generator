'use client'

import { useState } from 'react'
import { useBrandStore } from '@/store/brand-store'
import { loadGoogleFont } from '@/lib/fonts'
import { getAllFontFamilies } from '@/data/fonts'

const WEIGHTS: number[] = [400, 500, 600, 700, 800, 900]

// Popular Google Fonts combined with curated data fonts (de-duped, sorted)
const POPULAR_FONTS: string[] = [
  'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins',
  'Nunito', 'Raleway', 'Source Sans 3', 'DM Sans', 'Space Grotesk',
  'Plus Jakarta Sans', 'Manrope', 'Figtree', 'Outfit', 'Sora',
  'Albert Sans', 'Urbanist', 'Lexend', 'Work Sans',
  'Rubik', 'Quicksand', 'Cabin', 'Karla', 'Noto Sans',
  'Playfair Display', 'Merriweather', 'Lora', 'Crimson Pro',
  'EB Garamond', 'Cormorant Garamond', 'DM Serif Display',
  'JetBrains Mono', 'Fira Code', 'Source Code Pro', 'IBM Plex Mono',
  ...getAllFontFamilies(),
].filter((v: string, i: number, a: string[]) => a.indexOf(v) === i).sort()

export function CustomFontPairing(): React.ReactElement {
  const headingFont = useBrandStore((s) => s.headingFont)
  const headingWeight = useBrandStore((s) => s.headingWeight)
  const bodyFont = useBrandStore((s) => s.bodyFont)
  const bodyWeight = useBrandStore((s) => s.bodyWeight)
  const setCustomFonts = useBrandStore((s) => s.setCustomFonts)

  const [headingSearch, setHeadingSearch] = useState<string>('')
  const [bodySearch, setBodySearch] = useState<string>('')
  const [showHeadingDropdown, setShowHeadingDropdown] = useState<boolean>(false)
  const [showBodyDropdown, setShowBodyDropdown] = useState<boolean>(false)

  const filteredHeadingFonts: string[] = POPULAR_FONTS.filter((f) =>
    f.toLowerCase().includes(headingSearch.toLowerCase()),
  ).slice(0, 15)

  const filteredBodyFonts: string[] = POPULAR_FONTS.filter((f) =>
    f.toLowerCase().includes(bodySearch.toLowerCase()),
  ).slice(0, 15)

  const handleSelectHeadingFont = (family: string): void => {
    loadGoogleFont(family, [headingWeight])
    setCustomFonts(family, headingWeight, bodyFont, bodyWeight)
    setShowHeadingDropdown(false)
    setHeadingSearch('')
  }

  const handleSelectBodyFont = (family: string): void => {
    loadGoogleFont(family, [bodyWeight])
    setCustomFonts(headingFont, headingWeight, family, bodyWeight)
    setShowBodyDropdown(false)
    setBodySearch('')
  }

  const handleHeadingWeightChange = (weight: number): void => {
    loadGoogleFont(headingFont, [weight])
    setCustomFonts(headingFont, weight, bodyFont, bodyWeight)
  }

  const handleBodyWeightChange = (weight: number): void => {
    loadGoogleFont(bodyFont, [weight])
    setCustomFonts(headingFont, headingWeight, bodyFont, weight)
  }

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-sm font-semibold text-app-black">Custom font pairing</h3>

      {/* Heading font selector */}
      <div className="relative">
        <label className="mb-1 block text-xs font-medium text-app-text-muted">
          Heading font
        </label>
        <input
          type="text"
          value={showHeadingDropdown ? headingSearch : headingFont}
          onChange={(e) => {
            setHeadingSearch(e.target.value)
            setShowHeadingDropdown(true)
          }}
          onFocus={() => setShowHeadingDropdown(true)}
          onBlur={() => setTimeout(() => setShowHeadingDropdown(false), 150)}
          placeholder="Search fonts..."
          className="h-10 w-full rounded-lg border border-app-gray-100 px-3 text-sm focus:border-app-black focus:outline-none focus:ring-1 focus:ring-app-black"
        />
        {showHeadingDropdown && filteredHeadingFonts.length > 0 && (
          <div className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-app-gray-100 bg-white shadow-md">
            {filteredHeadingFonts.map((font) => (
              <button
                key={font}
                type="button"
                onMouseDown={() => handleSelectHeadingFont(font)}
                className="w-full px-3 py-2 text-left text-sm hover:bg-app-bg-alt"
                style={{ fontFamily: `"${font}", system-ui` }}
              >
                {font}
              </button>
            ))}
          </div>
        )}

        {/* Weight selector */}
        <div className="relative mt-2 inline-block">
          <select
            value={headingWeight}
            onChange={(e) => handleHeadingWeightChange(Number(e.target.value))}
            className="h-8 appearance-none rounded-lg border border-app-gray-100 px-2 pr-6 text-xs"
          >
            {WEIGHTS.map((w) => (
              <option key={w} value={w}>Weight {w}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Body font selector */}
      <div className="relative">
        <label className="mb-1 block text-xs font-medium text-app-text-muted">
          Body font
        </label>
        <input
          type="text"
          value={showBodyDropdown ? bodySearch : bodyFont}
          onChange={(e) => {
            setBodySearch(e.target.value)
            setShowBodyDropdown(true)
          }}
          onFocus={() => setShowBodyDropdown(true)}
          onBlur={() => setTimeout(() => setShowBodyDropdown(false), 150)}
          placeholder="Search fonts..."
          className="h-10 w-full rounded-lg border border-app-gray-100 px-3 text-sm focus:border-app-black focus:outline-none focus:ring-1 focus:ring-app-black"
        />
        {showBodyDropdown && filteredBodyFonts.length > 0 && (
          <div className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-app-gray-100 bg-white shadow-md">
            {filteredBodyFonts.map((font) => (
              <button
                key={font}
                type="button"
                onMouseDown={() => handleSelectBodyFont(font)}
                className="w-full px-3 py-2 text-left text-sm hover:bg-app-bg-alt"
                style={{ fontFamily: `"${font}", system-ui` }}
              >
                {font}
              </button>
            ))}
          </div>
        )}

        <div className="relative mt-2 inline-block">
          <select
            value={bodyWeight}
            onChange={(e) => handleBodyWeightChange(Number(e.target.value))}
            className="h-8 appearance-none rounded-lg border border-app-gray-100 px-2 pr-6 text-xs"
          >
            {WEIGHTS.map((w) => (
              <option key={w} value={w}>Weight {w}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Live preview of custom pairing */}
      <div className="rounded-xl border border-app-gray-100 p-4">
        <span
          className="block text-xl leading-tight text-app-black"
          style={{ fontFamily: `"${headingFont}", system-ui`, fontWeight: headingWeight }}
        >
          Preview heading text
        </span>
        <span
          className="mt-2 block text-sm text-app-text-body"
          style={{ fontFamily: `"${bodyFont}", system-ui`, fontWeight: bodyWeight }}
        >
          Preview body text showing how this custom pairing looks together.
        </span>
      </div>
    </div>
  )
}
