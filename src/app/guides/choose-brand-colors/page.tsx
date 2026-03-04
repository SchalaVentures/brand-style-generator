import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { HowToJsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'How to Choose Brand Colors (Color Psychology Guide)',
  description:
    'Learn how to choose brand colors that connect with your audience. Covers color psychology, building palettes, and ensuring accessibility.',
  keywords: [
    'how to choose brand colors',
    'brand color palette',
    'color psychology branding',
    'brand color guide',
    'choose colors for logo',
  ],
  openGraph: {
    title: 'How to Choose Brand Colors',
    description: 'A practical guide to selecting colors that define your brand identity.',
    type: 'article',
  },
}

const HOW_TO_STEPS = [
  { name: 'Understand color psychology', text: 'Learn what emotions different colors evoke' },
  { name: 'Define your brand personality', text: 'Identify 3-5 adjectives that describe your brand' },
  { name: 'Choose a primary color', text: 'Select one main color that embodies your brand' },
  { name: 'Build supporting colors', text: 'Add secondary, background, and accent colors' },
  { name: 'Test for accessibility', text: 'Ensure sufficient contrast for readability' },
]

function CTABox(): React.ReactElement {
  return (
    <div className="my-10 rounded-2xl bg-gradient-to-br from-app-gray-50 to-app-gray-100 p-6 md:p-8">
      <h3 className="text-lg font-semibold text-app-black">Generate your palette</h3>
      <p className="mt-2 text-sm text-app-gray-500">
        Pick a color and we&apos;ll generate a complete, accessible palette instantly.
      </p>
      <Link
        href="/create"
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-app-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-app-gray-600"
      >
        Try the Color Picker <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  )
}

function Checklist({ items }: { items: string[] }): React.ReactElement {
  return (
    <ul className="my-6 space-y-3">
      {items.map((item: string) => (
        <li key={item} className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
          <span className="text-app-gray-600">{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default function ChooseBrandColorsPage(): React.ReactElement {
  return (
    <>
      <HowToJsonLd
        name="How to Choose Brand Colors"
        description="A step-by-step guide to selecting the perfect color palette for your brand"
        steps={HOW_TO_STEPS}
        totalTime="PT20M"
      />

      <article className="px-6 pb-20 pt-32">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <header className="mb-12">
            <p className="text-sm font-medium text-app-gray-400">
              <Link href="/guides" className="hover:text-app-black">
                Guides
              </Link>{' '}
              / Colors
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-app-black md:text-5xl">
              How to Choose Brand Colors
            </h1>
            <p className="mt-4 text-lg text-app-gray-500">
              Color is the first thing people notice about your brand. Here&apos;s how to choose
              colors that connect.
            </p>
            <p className="mt-4 text-sm text-app-gray-400">6 min read • Updated March 2026</p>
          </header>

          {/* Content */}
          <div className="prose-custom">
            <p>
              Your brand colors do more than look good — they communicate who you are before anyone
              reads a single word. The right colors build trust, evoke emotion, and make your brand
              memorable.
            </p>

            <p>
              This guide covers the fundamentals of color psychology, how to pick a primary color,
              and how to build a complete palette that works across every touchpoint.
            </p>

            <h2 id="color-psychology">Color Psychology: What Colors Communicate</h2>

            <p>
              Different colors trigger different psychological responses. While these associations
              can vary by culture, here are the most common in Western markets:
            </p>

            <h3>Blue — Trust & Stability</h3>
            <p>
              Blue is the most popular brand color for a reason: it evokes trust, reliability, and
              calm. Banks, tech companies, and healthcare brands favor blue because it feels safe
              and professional.
            </p>
            <p>
              <strong>Best for:</strong> Finance, tech, healthcare, B2B services
            </p>

            <h3>Green — Growth & Nature</h3>
            <p>
              Green signals growth, health, and environmental consciousness. It&apos;s the natural
              choice for wellness brands, eco-friendly products, and financial growth messaging.
            </p>
            <p>
              <strong>Best for:</strong> Health, sustainability, finance (growth), organic products
            </p>

            <h3>Red — Energy & Urgency</h3>
            <p>
              Red demands attention. It communicates passion, excitement, and urgency. Food brands
              use red to stimulate appetite; retail uses it for sales and CTAs.
            </p>
            <p>
              <strong>Best for:</strong> Food, entertainment, sales/retail, sports
            </p>

            <h3>Purple — Creativity & Luxury</h3>
            <p>
              Purple combines the energy of red with the calm of blue, creating associations with
              creativity, luxury, and wisdom. Beauty brands and premium products often use purple.
            </p>
            <p>
              <strong>Best for:</strong> Beauty, luxury, creative services, spirituality
            </p>

            <h3>Orange — Friendliness & Confidence</h3>
            <p>
              Orange is approachable and energetic without the intensity of red. It works well for
              brands targeting younger audiences or emphasizing affordability and fun.
            </p>
            <p>
              <strong>Best for:</strong> Youth brands, entertainment, affordable services
            </p>

            <h3>Black — Sophistication & Power</h3>
            <p>
              Black communicates elegance, sophistication, and authority. Luxury brands and fashion
              houses use black to signal premium quality and timeless style.
            </p>
            <p>
              <strong>Best for:</strong> Luxury, fashion, high-end services
            </p>

            <CTABox />

            <h2 id="choosing-primary">Choosing Your Primary Color</h2>

            <p>Your primary color is your brand&apos;s signature. To choose it:</p>

            <Checklist
              items={[
                'Review your brand personality adjectives — what color matches them?',
                'Consider your industry — some colors are expected (blue for finance)',
                'Think about competitors — differentiate or align strategically',
                'Test emotional response — show options to target customers',
              ]}
            />

            <p>
              Don&apos;t overthink it. Pick a color that feels right for your brand personality, then
              refine the exact shade. A warm blue feels different than a cool blue — subtle
              differences matter.
            </p>

            <h2 id="building-palette">Building Your Full Palette</h2>

            <p>One color isn&apos;t enough. A complete brand palette typically includes:</p>

            <Checklist
              items={[
                'Primary — your main brand color',
                'Secondary — a complementary accent color',
                'Neutral — grays for text and backgrounds',
                'Semantic — success (green), warning (amber), error (red)',
              ]}
            />

            <h3>Generating Shades</h3>

            <p>
              For each color, you need multiple shades — lighter for backgrounds, darker for text
              and borders. Modern tools use perceptually uniform color spaces (like OKLCH) to
              generate shades that look naturally balanced.
            </p>

            <p>
              A good palette has 9-11 shades per color family, ranging from nearly white (50) to
              nearly black (950).
            </p>

            <h2 id="accessibility">Accessibility: Contrast Matters</h2>

            <p>
              Beautiful colors mean nothing if people can&apos;t read your content. WCAG guidelines
              require:
            </p>

            <Checklist
              items={[
                'Normal text: 4.5:1 contrast ratio minimum',
                'Large text (18px+): 3:1 contrast ratio minimum',
                'UI components: 3:1 contrast ratio minimum',
              ]}
            />

            <p>
              Always test your text colors against your background colors. Dark text on light
              backgrounds is generally safer than the reverse.
            </p>

            <CTABox />

            <h2 id="common-mistakes">Common Color Mistakes</h2>

            <ul>
              <li>
                <strong>Too many colors</strong> — Stick to 2-3 main colors. More creates visual
                chaos.
              </li>
              <li>
                <strong>Inconsistent usage</strong> — Use exact hex codes everywhere. &quot;Close
                enough&quot; isn&apos;t.
              </li>
              <li>
                <strong>Ignoring context</strong> — Colors look different on screens vs. print.
                Test both.
              </li>
              <li>
                <strong>Following trends blindly</strong> — Trendy colors date quickly. Favor
                timeless over trendy.
              </li>
            </ul>

            <h2 id="next-steps">Next Steps</h2>

            <p>
              Ready to build your palette? Our{' '}
              <Link href="/create" className="text-app-black underline hover:no-underline">
                free color palette generator
              </Link>{' '}
              lets you pick a primary color and instantly generates a complete, accessible palette
              — with light and dark mode support built in.
            </p>
          </div>

          {/* Related Guides */}
          <div className="mt-16 border-t border-app-gray-100 pt-12">
            <h2 className="text-xl font-semibold text-app-black">Continue Learning</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Link
                href="/guides/how-to-design-a-brand"
                className="rounded-xl border border-app-gray-100 p-4 transition-colors hover:border-app-gray-200"
              >
                <p className="font-medium text-app-black">How to Design a Brand →</p>
                <p className="mt-1 text-sm text-app-gray-500">The complete brand design guide</p>
              </Link>
              <Link
                href="/guides/font-pairing"
                className="rounded-xl border border-app-gray-100 p-4 transition-colors hover:border-app-gray-200"
              >
                <p className="font-medium text-app-black">Font Pairing Guide →</p>
                <p className="mt-1 text-sm text-app-gray-500">Master typography combinations</p>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
