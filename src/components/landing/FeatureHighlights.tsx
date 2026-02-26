import { Palette, Type, LayoutDashboard, BookOpen, Code2, Link2 } from 'lucide-react'
import { ScrollReveal } from './ScrollReveal'
import type { ReactElement } from 'react'

interface Feature {
  icon: ReactElement
  title: string
  description: string
}

const FEATURES: Feature[] = [
  {
    icon: <Palette className="h-6 w-6" />,
    title: 'Curated Color Palettes',
    description:
      'Choose from hundreds of curated shades organized by color family. Pick one, and we generate your full color system automatically.',
  },
  {
    icon: <Type className="h-6 w-6" />,
    title: 'Pre-Paired Typography',
    description:
      '80+ font pairings categorized by feel: Modern, Bold, Classic, Playful, and more. Every pair guaranteed to look great.',
  },
  {
    icon: <LayoutDashboard className="h-6 w-6" />,
    title: 'Realistic Mockups',
    description:
      'See your brand on a SaaS dashboard, landing page, mobile app, and login page. Not color swatches, real product UIs.',
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: 'Full Brand Guide',
    description:
      'Get a complete brand guide with wordmark, colors, typography, buttons, and voice & tone. A professional deliverable.',
  },
  {
    icon: <Code2 className="h-6 w-6" />,
    title: 'Developer-Ready Exports',
    description:
      'Copy-paste CSS variables, Tailwind config, or Figma tokens. Download a PDF brand guide. Ready for your codebase.',
  },
  {
    icon: <Link2 className="h-6 w-6" />,
    title: 'Team Sharing',
    description:
      'Share a link. Anyone can view your brand preview on all mockups. Get alignment without scheduling a meeting.',
  },
]

export function FeatureHighlights(): React.ReactElement {
  return (
    <section id="features" className="scroll-mt-20 bg-app-off-white px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="mb-4 text-center text-3xl font-bold text-app-black">
            Everything you need
          </h2>
          <p className="mx-auto mb-12 max-w-lg text-center text-app-gray-500">
            From color selection to export: a complete brand style workflow in one tool.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature: Feature, i: number) => (
            <ScrollReveal key={feature.title} delay={i * 100}>
              <div className="rounded-xl border border-app-gray-100 bg-white p-6 transition-all hover:shadow-md">
                <div className="mb-4 text-app-gray-500">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-base font-semibold text-app-black">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-app-gray-500">
                  {feature.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
