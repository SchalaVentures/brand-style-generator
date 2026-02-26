import type { FontCategory, FontPair } from '@/types/fonts'

export const fontCategories: FontCategory[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean geometric sans-serifs. Silicon Valley energy.',
    vibe: 'Startups, tech, SaaS',
    pairs: [
      { id: 'inter', heading: { family: 'Inter', weight: 700 }, body: { family: 'Inter', weight: 400 } },
      { id: 'plus-jakarta-sans', heading: { family: 'Plus Jakarta Sans', weight: 700 }, body: { family: 'Plus Jakarta Sans', weight: 400 } },
      { id: 'albert-sans', heading: { family: 'Albert Sans', weight: 700 }, body: { family: 'Albert Sans', weight: 400 } },
      { id: 'instrument-sans', heading: { family: 'Instrument Sans', weight: 700 }, body: { family: 'Instrument Sans', weight: 400 } },
      { id: 'figtree', heading: { family: 'Figtree', weight: 700 }, body: { family: 'Figtree', weight: 400 } },
      { id: 'onest', heading: { family: 'Onest', weight: 700 }, body: { family: 'Onest', weight: 400 } },
      { id: 'hanken-grotesk', heading: { family: 'Hanken Grotesk', weight: 700 }, body: { family: 'Hanken Grotesk', weight: 400 } },
      { id: 'bricolage-grotesque', heading: { family: 'Bricolage Grotesque', weight: 700 }, body: { family: 'Bricolage Grotesque', weight: 400 } },
      { id: 'schibsted-grotesk', heading: { family: 'Schibsted Grotesk', weight: 700 }, body: { family: 'Schibsted Grotesk', weight: 400 } },
      { id: 'wix-madefor-display', heading: { family: 'Wix Madefor Display', weight: 700 }, body: { family: 'Wix Madefor Display', weight: 400 } },
    ],
  },
  {
    id: 'bold',
    name: 'Bold',
    description: 'Strong, high-impact typefaces. Commands attention.',
    vibe: 'Agencies, startups, brands',
    pairs: [
      { id: 'space-grotesk-dm-sans', heading: { family: 'Space Grotesk', weight: 700 }, body: { family: 'DM Sans', weight: 400 } },
      { id: 'outfit', heading: { family: 'Outfit', weight: 700 }, body: { family: 'Outfit', weight: 400 } },
      { id: 'sora', heading: { family: 'Sora', weight: 700 }, body: { family: 'Sora', weight: 400 } },
      { id: 'manrope', heading: { family: 'Manrope', weight: 700 }, body: { family: 'Manrope', weight: 400 } },
      { id: 'red-hat-display-red-hat-text', heading: { family: 'Red Hat Display', weight: 700 }, body: { family: 'Red Hat Text', weight: 400 } },
      { id: 'urbanist', heading: { family: 'Urbanist', weight: 700 }, body: { family: 'Urbanist', weight: 400 } },
      { id: 'epilogue', heading: { family: 'Epilogue', weight: 700 }, body: { family: 'Epilogue', weight: 400 } },
      { id: 'public-sans', heading: { family: 'Public Sans', weight: 700 }, body: { family: 'Public Sans', weight: 400 } },
      { id: 'be-vietnam-pro', heading: { family: 'Be Vietnam Pro', weight: 700 }, body: { family: 'Be Vietnam Pro', weight: 400 } },
      { id: 'lexend', heading: { family: 'Lexend', weight: 700 }, body: { family: 'Lexend', weight: 400 } },
    ],
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Timeless serifs paired with clean sans-serifs.',
    vibe: 'Editorial, publishing, luxury',
    pairs: [
      { id: 'playfair-display-lato', heading: { family: 'Playfair Display', weight: 700 }, body: { family: 'Lato', weight: 400 } },
      { id: 'merriweather-open-sans', heading: { family: 'Merriweather', weight: 700 }, body: { family: 'Open Sans', weight: 400 } },
      { id: 'libre-baskerville-source-sans-3', heading: { family: 'Libre Baskerville', weight: 700 }, body: { family: 'Source Sans 3', weight: 400 } },
      { id: 'spectral-karla', heading: { family: 'Spectral', weight: 700 }, body: { family: 'Karla', weight: 400 } },
      { id: 'lora-roboto', heading: { family: 'Lora', weight: 700 }, body: { family: 'Roboto', weight: 400 } },
      { id: 'pt-serif-pt-sans', heading: { family: 'PT Serif', weight: 700 }, body: { family: 'PT Sans', weight: 400 } },
      { id: 'noto-serif-noto-sans', heading: { family: 'Noto Serif', weight: 700 }, body: { family: 'Noto Sans', weight: 400 } },
      { id: 'bitter-raleway', heading: { family: 'Bitter', weight: 700 }, body: { family: 'Raleway', weight: 400 } },
      { id: 'crimson-text-work-sans', heading: { family: 'Crimson Text', weight: 700 }, body: { family: 'Work Sans', weight: 400 } },
      { id: 'eb-garamond-inter', heading: { family: 'EB Garamond', weight: 700 }, body: { family: 'Inter', weight: 400 } },
    ],
  },
  {
    id: 'playful',
    name: 'Playful',
    description: 'Rounded, friendly typefaces. Approachable and fun.',
    vibe: 'Consumer apps, kids, lifestyle',
    pairs: [
      { id: 'nunito', heading: { family: 'Nunito', weight: 700 }, body: { family: 'Nunito', weight: 400 } },
      { id: 'poppins', heading: { family: 'Poppins', weight: 700 }, body: { family: 'Poppins', weight: 400 } },
      { id: 'quicksand', heading: { family: 'Quicksand', weight: 700 }, body: { family: 'Quicksand', weight: 400 } },
      { id: 'comfortaa-nunito-sans', heading: { family: 'Comfortaa', weight: 700 }, body: { family: 'Nunito Sans', weight: 400 } },
      { id: 'fredoka-nunito', heading: { family: 'Fredoka', weight: 700 }, body: { family: 'Nunito', weight: 400 } },
      { id: 'baloo-2-nunito-sans', heading: { family: 'Baloo 2', weight: 700 }, body: { family: 'Nunito Sans', weight: 400 } },
      { id: 'rubik', heading: { family: 'Rubik', weight: 700 }, body: { family: 'Rubik', weight: 400 } },
      { id: 'varela-round-open-sans', heading: { family: 'Varela Round', weight: 400 }, body: { family: 'Open Sans', weight: 400 } },
      { id: 'grandstander-nunito', heading: { family: 'Grandstander', weight: 700 }, body: { family: 'Nunito', weight: 400 } },
      { id: 'chewy-nunito-sans', heading: { family: 'Chewy', weight: 400 }, body: { family: 'Nunito Sans', weight: 400 } },
    ],
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Ultra-clean, understated type. Let the content speak.',
    vibe: 'Design tools, portfolios, studios',
    pairs: [
      { id: 'dm-sans', heading: { family: 'DM Sans', weight: 700 }, body: { family: 'DM Sans', weight: 400 } },
      { id: 'manrope-minimal', heading: { family: 'Manrope', weight: 600 }, body: { family: 'Manrope', weight: 400 } },
      { id: 'figtree-minimal', heading: { family: 'Figtree', weight: 600 }, body: { family: 'Figtree', weight: 400 } },
      { id: 'ibm-plex-sans', heading: { family: 'IBM Plex Sans', weight: 600 }, body: { family: 'IBM Plex Sans', weight: 400 } },
      { id: 'wix-madefor-display-text', heading: { family: 'Wix Madefor Display', weight: 600 }, body: { family: 'Wix Madefor Display', weight: 400 } },
      { id: 'onest-minimal', heading: { family: 'Onest', weight: 600 }, body: { family: 'Onest', weight: 400 } },
      { id: 'hanken-grotesk-minimal', heading: { family: 'Hanken Grotesk', weight: 600 }, body: { family: 'Hanken Grotesk', weight: 400 } },
      { id: 'schibsted-grotesk-minimal', heading: { family: 'Schibsted Grotesk', weight: 600 }, body: { family: 'Schibsted Grotesk', weight: 400 } },
      { id: 'bricolage-grotesque-minimal', heading: { family: 'Bricolage Grotesque', weight: 600 }, body: { family: 'Bricolage Grotesque', weight: 400 } },
      { id: 'outfit-minimal', heading: { family: 'Outfit', weight: 600 }, body: { family: 'Outfit', weight: 400 } },
    ],
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Refined display serifs with sophisticated sans-serif bodies.',
    vibe: 'Fashion, luxury, hospitality',
    pairs: [
      { id: 'cormorant-garamond-proza-libre', heading: { family: 'Cormorant Garamond', weight: 700 }, body: { family: 'Proza Libre', weight: 400 } },
      { id: 'dm-serif-display-dm-sans', heading: { family: 'DM Serif Display', weight: 400 }, body: { family: 'DM Sans', weight: 400 } },
      { id: 'fraunces-inter', heading: { family: 'Fraunces', weight: 700 }, body: { family: 'Inter', weight: 400 } },
      { id: 'cinzel-lato', heading: { family: 'Cinzel', weight: 700 }, body: { family: 'Lato', weight: 400 } },
      { id: 'bodoni-moda-montserrat', heading: { family: 'Bodoni Moda', weight: 700 }, body: { family: 'Montserrat', weight: 400 } },
      { id: 'gilda-display-jost', heading: { family: 'Gilda Display', weight: 400 }, body: { family: 'Jost', weight: 400 } },
      { id: 'yeseva-one-josefin-sans', heading: { family: 'Yeseva One', weight: 400 }, body: { family: 'Josefin Sans', weight: 400 } },
      { id: 'abril-fatface-poppins', heading: { family: 'Abril Fatface', weight: 400 }, body: { family: 'Poppins', weight: 400 } },
      { id: 'eczar-gentium-plus', heading: { family: 'Eczar', weight: 700 }, body: { family: 'Gentium Plus', weight: 400 } },
      { id: 'tenor-sans-jost', heading: { family: 'Tenor Sans', weight: 400 }, body: { family: 'Jost', weight: 400 } },
    ],
  },
  {
    id: 'technical',
    name: 'Technical',
    description: 'Monospace headings with clean sans-serif bodies.',
    vibe: 'Developer tools, docs, dashboards',
    pairs: [
      { id: 'jetbrains-mono-inter', heading: { family: 'JetBrains Mono', weight: 700 }, body: { family: 'Inter', weight: 400 } },
      { id: 'fira-code-fira-sans', heading: { family: 'Fira Code', weight: 700 }, body: { family: 'Fira Sans', weight: 400 } },
      { id: 'source-code-pro-source-sans-3', heading: { family: 'Source Code Pro', weight: 700 }, body: { family: 'Source Sans 3', weight: 400 } },
      { id: 'ibm-plex-mono-ibm-plex-sans', heading: { family: 'IBM Plex Mono', weight: 700 }, body: { family: 'IBM Plex Sans', weight: 400 } },
      { id: 'space-mono-space-grotesk', heading: { family: 'Space Mono', weight: 700 }, body: { family: 'Space Grotesk', weight: 400 } },
      { id: 'roboto-mono-roboto', heading: { family: 'Roboto Mono', weight: 700 }, body: { family: 'Roboto', weight: 400 } },
      { id: 'ubuntu-mono-ubuntu', heading: { family: 'Ubuntu Mono', weight: 700 }, body: { family: 'Ubuntu', weight: 400 } },
      { id: 'overpass-mono-overpass', heading: { family: 'Overpass Mono', weight: 700 }, body: { family: 'Overpass', weight: 400 } },
      { id: 'inconsolata-nunito-sans', heading: { family: 'Inconsolata', weight: 700 }, body: { family: 'Nunito Sans', weight: 400 } },
      { id: 'anonymous-pro-open-sans', heading: { family: 'Anonymous Pro', weight: 700 }, body: { family: 'Open Sans', weight: 400 } },
    ],
  },
  {
    id: 'warm',
    name: 'Warm',
    description: 'Readable serifs with humanist sans-serif bodies.',
    vibe: 'Blogs, magazines, education',
    pairs: [
      { id: 'lora-noto-sans', heading: { family: 'Lora', weight: 700 }, body: { family: 'Noto Sans', weight: 400 } },
      { id: 'vollkorn-work-sans', heading: { family: 'Vollkorn', weight: 700 }, body: { family: 'Work Sans', weight: 400 } },
      { id: 'crimson-pro-karla', heading: { family: 'Crimson Pro', weight: 700 }, body: { family: 'Karla', weight: 400 } },
      { id: 'literata-inter', heading: { family: 'Literata', weight: 700 }, body: { family: 'Inter', weight: 400 } },
      { id: 'petrona-cabin', heading: { family: 'Petrona', weight: 700 }, body: { family: 'Cabin', weight: 400 } },
      { id: 'cardo-source-sans-3', heading: { family: 'Cardo', weight: 700 }, body: { family: 'Source Sans 3', weight: 400 } },
      { id: 'neuton-open-sans', heading: { family: 'Neuton', weight: 700 }, body: { family: 'Open Sans', weight: 400 } },
      { id: 'gentium-plus-nunito-sans', heading: { family: 'Gentium Plus', weight: 700 }, body: { family: 'Nunito Sans', weight: 400 } },
      { id: 'alegreya-alegreya-sans', heading: { family: 'Alegreya', weight: 700 }, body: { family: 'Alegreya Sans', weight: 400 } },
      { id: 'domine-fira-sans', heading: { family: 'Domine', weight: 700 }, body: { family: 'Fira Sans', weight: 400 } },
    ],
  },
]

export function getFontCategory(categoryId: string): FontCategory | undefined {
  return fontCategories.find((c: FontCategory) => c.id === categoryId)
}

export function getFontPair(categoryId: string, pairId: string): FontPair | undefined {
  const category: FontCategory | undefined = getFontCategory(categoryId)
  return category?.pairs.find((p: FontPair) => p.id === pairId)
}

export function getAllFontFamilies(): string[] {
  const families: Set<string> = new Set<string>()
  fontCategories.forEach((cat: FontCategory) => {
    cat.pairs.forEach((pair: FontPair) => {
      families.add(pair.heading.family)
      families.add(pair.body.family)
    })
  })
  return Array.from(families)
}

export function getGoogleFontsUrl(
  families: string[],
  weights: number[] = [400, 500, 600, 700, 800],
): string {
  const params: string = families
    .map((f: string) => {
      const encodedFamily: string = f.replace(/ /g, '+')
      return `family=${encodedFamily}:wght@${weights.join(';')}`
    })
    .join('&')
  return `https://fonts.googleapis.com/css2?${params}&display=swap`
}
