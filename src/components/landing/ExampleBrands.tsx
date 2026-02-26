import Link from 'next/link'
import { ScrollReveal } from './ScrollReveal'

interface ExampleBrand {
  name: string
  tagline: string
  accent: string
  bg: string
  card: string
  text: string
  muted: string
  fonts: string
  tone: string
}

const EXAMPLES: ExampleBrand[] = [
  {
    name: 'Acme',
    tagline: 'Ship faster, build better',
    accent: '#3B82F6',
    bg: '#F5F8FF',
    card: '#EFF4FF',
    text: '#1E3A5F',
    muted: '#6B8AAF',
    fonts: 'Inter + Inter',
    tone: 'Confident',
  },
  {
    name: 'Noteful',
    tagline: 'Your thoughts, organized',
    accent: '#8B5CF6',
    bg: '#FAF5FF',
    card: '#F3EAFF',
    text: '#3B1F6E',
    muted: '#7B6B9E',
    fonts: 'Poppins + Poppins',
    tone: 'Playful',
  },
  {
    name: 'Greenline',
    tagline: 'Sustainable growth',
    accent: '#22C55E',
    bg: '#F0FFF4',
    card: '#E6FFEC',
    text: '#1A3D2A',
    muted: '#5B8A6E',
    fonts: 'Lora + Noto Sans',
    tone: 'Warm',
  },
]

const CHART_HEIGHTS: number[] = [30, 50, 40, 70, 45, 60]
const STAT_VALUES: string[] = ['847', '$4.2k', '3.1%']

export function ExampleBrands(): React.ReactElement {
  return (
    <section id="examples" className="scroll-mt-20 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="mb-4 text-center text-3xl font-bold text-app-black">
            See it in action
          </h2>
          <p className="mx-auto mb-12 max-w-lg text-center text-app-gray-500">
            Three different brands, three different vibes. All built in minutes.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {EXAMPLES.map((brand: ExampleBrand, i: number) => (
            <ScrollReveal key={brand.name} delay={i * 100}>
              <Link
                href="/create"
                className="cursor-pointer group block overflow-hidden rounded-xl border border-app-gray-100
                           transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Mini dashboard preview */}
                <div className="p-4" style={{ backgroundColor: brand.bg }}>
                  <div
                    className="overflow-hidden rounded-lg"
                    style={{ border: `1px solid ${brand.card}` }}
                  >
                    {/* Chrome bar */}
                    <div
                      className="flex h-6 items-center gap-1.5 px-3"
                      style={{ backgroundColor: brand.card }}
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-[#FF5F57]" />
                      <div className="h-1.5 w-1.5 rounded-full bg-[#FEBC2E]" />
                      <div className="h-1.5 w-1.5 rounded-full bg-[#28C840]" />
                    </div>
                    {/* Content */}
                    <div className="p-3" style={{ backgroundColor: brand.bg }}>
                      <div
                        className="mb-2 text-xs font-semibold"
                        style={{ color: brand.accent }}
                      >
                        {brand.name}
                      </div>
                      <div className="grid grid-cols-3 gap-1.5">
                        {STAT_VALUES.map((v: string) => (
                          <div
                            key={v}
                            className="rounded p-1.5"
                            style={{ backgroundColor: brand.card }}
                          >
                            <div
                              className="text-xs font-bold"
                              style={{ color: brand.accent }}
                            >
                              {v}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 flex h-8 items-end gap-0.5">
                        {CHART_HEIGHTS.map((h: number, idx: number) => (
                          <div
                            key={idx}
                            className="flex-1 rounded-t"
                            style={{
                              height: `${String(h)}%`,
                              backgroundColor: `${brand.accent}30`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card info */}
                <div className="border-t border-app-gray-100 p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-8 w-8 rounded-lg"
                      style={{ backgroundColor: brand.accent }}
                    />
                    <div>
                      <div className="text-sm font-semibold text-app-black">
                        {brand.name}
                      </div>
                      <div className="text-xs text-app-gray-500">
                        {brand.fonts} &middot; {brand.tone}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
