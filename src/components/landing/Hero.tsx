'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuthState } from '@/hooks/use-auth-state'

interface DemoBrand {
  name: string
  accent: string
  bg: string
  card: string
  text: string
  muted: string
}

const DEMO_BRANDS: DemoBrand[] = [
  {
    name: 'Acme',
    accent: '#3B82F6',
    bg: '#F5F8FF',
    card: '#EFF4FF',
    text: '#1E3A5F',
    muted: '#6B8AAF',
  },
  {
    name: 'Noteful',
    accent: '#8B5CF6',
    bg: '#FAF5FF',
    card: '#F3EAFF',
    text: '#3B1F6E',
    muted: '#7B6B9E',
  },
  {
    name: 'Greenline',
    accent: '#22C55E',
    bg: '#F0FFF4',
    card: '#E6FFEC',
    text: '#1A3D2A',
    muted: '#5B8A6E',
  },
  {
    name: 'Ember',
    accent: '#F97316',
    bg: '#FFFAF5',
    card: '#FFF3E8',
    text: '#4A2810',
    muted: '#9E7A5B',
  },
]

const STAT_LABELS: string[] = ['Users', 'Revenue', 'Conversion']
const STAT_VALUES: string[] = ['2,847', '$12.4k', '3.2%']
const SIDEBAR_ITEMS: string[] = ['Dashboard', 'Projects', 'Team']
const BAR_HEIGHTS: number[] = [40, 65, 45, 80, 55, 70, 90, 60]

export function Hero(): React.ReactElement {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [mounted, setMounted] = useState<boolean>(false)
  const { isAuthenticated, isAnonymous } = useAuthState()
  const isSignedIn: boolean = mounted && isAuthenticated && !isAnonymous

  useEffect(() => {
    setMounted(true)
    const interval: ReturnType<typeof setInterval> = setInterval(() => {
      setActiveIndex((i: number) => (i + 1) % DEMO_BRANDS.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const brand: DemoBrand = DEMO_BRANDS[activeIndex]!

  return (
    <section className="px-6 pb-20 pt-32">
      <div className="mx-auto max-w-6xl text-center">
        <h1 className="mx-auto max-w-3xl text-5xl font-bold leading-tight tracking-tight text-app-black md:text-6xl">
          Build your brand style
          <br />
          in minutes.
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-app-gray-500">
          Pick colors, fonts, and tone. See your brand come alive on real product
          mockups. Export to CSS, Tailwind, or Figma tokens.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href={isSignedIn ? '/projects' : '/create'}
            className="cursor-pointer rounded-lg bg-app-black px-6 py-3 text-sm font-semibold text-white
                       hover:bg-app-gray-600 transition-colors"
          >
            Start Building &rarr;
          </Link>
          <a
            href="#examples"
            className="cursor-pointer text-sm text-app-gray-500 hover:text-app-black transition-colors"
          >
            See Examples &darr;
          </a>
        </div>

        <div className="mx-auto mt-16 max-w-2xl">
          <div
            className="overflow-hidden rounded-xl shadow-xl transition-all duration-700 ease-in-out"
            style={{ border: `1px solid ${brand.card}` }}
          >
            {/* Browser chrome */}
            <div
              className="flex h-9 items-center gap-2 px-4 transition-colors duration-700"
              style={{ backgroundColor: brand.card }}
            >
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
              </div>
              <div
                className="flex-1 rounded px-2 py-0.5 text-center text-[10px] transition-colors duration-700"
                style={{ backgroundColor: brand.bg, color: brand.muted }}
              >
                {brand.name.toLowerCase()}.com/dashboard
              </div>
            </div>

            {/* Simplified dashboard */}
            <div
              className="p-6 transition-colors duration-700"
              style={{ backgroundColor: brand.bg }}
            >
              <div className="flex gap-6">
                {/* Mini sidebar */}
                <div className="w-28 shrink-0">
                  <div
                    className="mb-3 text-sm font-semibold transition-colors duration-700"
                    style={{ color: brand.accent }}
                  >
                    {brand.name}
                  </div>
                  {SIDEBAR_ITEMS.map((item: string, i: number) => (
                    <div
                      key={item}
                      className="mb-1 rounded px-2 py-1 text-xs transition-colors duration-700"
                      style={{
                        backgroundColor: i === 0 ? `${brand.accent}15` : 'transparent',
                        color: i === 0 ? brand.accent : brand.muted,
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>

                {/* Content area */}
                <div className="flex-1">
                  <div className="mb-4 grid grid-cols-3 gap-3">
                    {STAT_VALUES.map((val: string, i: number) => (
                      <div
                        key={val}
                        className="rounded-lg p-3 transition-colors duration-700"
                        style={{ backgroundColor: brand.card }}
                      >
                        <div
                          className="text-lg font-bold transition-colors duration-700"
                          style={{ color: brand.accent }}
                        >
                          {val}
                        </div>
                        <div
                          className="text-[10px] transition-colors duration-700"
                          style={{ color: brand.muted }}
                        >
                          {STAT_LABELS[i]}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chart bars */}
                  <div
                    className="rounded-lg p-3 transition-colors duration-700"
                    style={{ backgroundColor: brand.card }}
                  >
                    <div className="flex h-16 items-end gap-1.5">
                      {BAR_HEIGHTS.map((h: number, i: number) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t transition-all duration-700"
                          style={{
                            height: `${String(h)}%`,
                            backgroundColor: i === 6 ? brand.accent : `${brand.accent}25`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Brand indicator dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {DEMO_BRANDS.map((b: DemoBrand, i: number) => (
              <button
                key={b.name}
                type="button"
                onClick={() => setActiveIndex(i)}
                className="cursor-pointer h-2.5 w-2.5 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: i === activeIndex ? b.accent : '#D1D5DB',
                  transform: i === activeIndex ? 'scale(1.3)' : 'scale(1)',
                }}
                aria-label={`Preview ${b.name} brand`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
