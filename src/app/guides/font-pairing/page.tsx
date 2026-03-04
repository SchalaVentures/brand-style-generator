import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { HowToJsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Font Pairing Guide: How to Choose Fonts That Work Together',
  description:
    'Learn how to pair fonts for your brand. Covers heading vs body fonts, font categories, pairing strategies, and common mistakes to avoid.',
  keywords: [
    'font pairing',
    'how to pair fonts',
    'brand typography',
    'heading body font',
    'google fonts pairing',
    'font combination',
  ],
  openGraph: {
    title: 'Font Pairing Guide',
    description: 'How to choose fonts that work together for your brand.',
    type: 'article',
  },
}

const HOW_TO_STEPS = [
  { name: 'Understand font categories', text: 'Learn the difference between serif, sans-serif, and display fonts' },
  { name: 'Choose a heading font', text: 'Pick a font that reflects your brand personality' },
  { name: 'Select a body font', text: 'Choose a highly readable font for long-form content' },
  { name: 'Create contrast', text: 'Pair fonts that are different but complementary' },
  { name: 'Test at multiple sizes', text: 'Ensure your fonts work across all use cases' },
]

function CTABox(): React.ReactElement {
  return (
    <div className="my-10 rounded-2xl bg-gradient-to-br from-app-gray-50 to-app-gray-100 p-6 md:p-8">
      <h3 className="text-lg font-semibold text-app-black">Preview font combinations</h3>
      <p className="mt-2 text-sm text-app-gray-500">
        See how different font pairs look on real mockups before committing.
      </p>
      <Link
        href="/create"
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-app-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-app-gray-600"
      >
        Try Font Pairing <ArrowRight className="h-4 w-4" />
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

export default function FontPairingPage(): React.ReactElement {
  return (
    <>
      <HowToJsonLd
        name="How to Pair Fonts"
        description="A guide to choosing fonts that work together for your brand"
        steps={HOW_TO_STEPS}
        totalTime="PT15M"
      />

      <article className="px-6 pb-20 pt-32">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <header className="mb-12">
            <p className="text-sm font-medium text-app-gray-400">
              <Link href="/guides" className="hover:text-app-black">
                Guides
              </Link>{' '}
              / Typography
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-app-black md:text-5xl">
              Font Pairing Guide
            </h1>
            <p className="mt-4 text-lg text-app-gray-500">
              How to choose fonts that work together — heading and body combinations that look
              professional.
            </p>
            <p className="mt-4 text-sm text-app-gray-400">5 min read • Updated March 2026</p>
          </header>

          {/* Content */}
          <div className="prose-custom">
            <p>
              Typography is the voice of your brand. The fonts you choose affect how people
              perceive your business — professional or casual, modern or traditional, bold or
              understated.
            </p>

            <p>
              This guide covers font categories, pairing strategies, and practical tips for
              choosing fonts that work together.
            </p>

            <h2 id="font-categories">Understanding Font Categories</h2>

            <p>Before pairing fonts, you need to understand the main categories:</p>

            <h3>Serif Fonts</h3>
            <p>
              Serif fonts have small decorative strokes (serifs) at the ends of letters. They feel
              traditional, trustworthy, and editorial. Think newspapers, law firms, and luxury
              brands.
            </p>
            <p>
              <strong>Examples:</strong> Times New Roman, Georgia, Playfair Display, Merriweather
            </p>

            <h3>Sans-Serif Fonts</h3>
            <p>
              Sans-serif fonts lack decorative strokes, giving them a clean, modern appearance.
              They dominate tech, startups, and contemporary brands.
            </p>
            <p>
              <strong>Examples:</strong> Inter, Helvetica, Open Sans, Roboto
            </p>

            <h3>Display Fonts</h3>
            <p>
              Display fonts are designed for large sizes — headlines, logos, hero text. They have
              more personality but sacrifice readability at small sizes.
            </p>
            <p>
              <strong>Examples:</strong> Space Grotesk, Outfit, Poppins, Montserrat
            </p>

            <h3>Monospace Fonts</h3>
            <p>
              Every character has the same width. Used for code, technical content, and brands
              wanting a techy or typewriter aesthetic.
            </p>
            <p>
              <strong>Examples:</strong> JetBrains Mono, Fira Code, IBM Plex Mono
            </p>

            <CTABox />

            <h2 id="heading-vs-body">Heading vs. Body Fonts</h2>

            <p>Most brands need two fonts: one for headings, one for body text.</p>

            <h3>Heading Font</h3>
            <p>Your heading font is for impact. It should:</p>
            <Checklist
              items={[
                'Reflect your brand personality strongly',
                'Look good at large sizes',
                'Be distinctive but not distracting',
                'Work for headlines, titles, and CTAs',
              ]}
            />

            <h3>Body Font</h3>
            <p>Your body font is for readability. It should:</p>
            <Checklist
              items={[
                'Prioritize legibility over personality',
                'Work well at 14-18px (typical body sizes)',
                'Have consistent letter spacing',
                'Include multiple weights (regular, medium, bold)',
              ]}
            />

            <h2 id="pairing-strategies">Pairing Strategies</h2>

            <p>The golden rule of font pairing: create contrast without conflict.</p>

            <h3>Strategy 1: Serif + Sans-Serif</h3>
            <p>
              The classic pairing. Use a serif for headings and sans-serif for body (or vice
              versa). The contrast creates clear hierarchy.
            </p>
            <p>
              <strong>Example:</strong> Playfair Display (heading) + Inter (body)
            </p>

            <h3>Strategy 2: Same Family, Different Weights</h3>
            <p>
              Use one font family but vary the weights. Bold or black for headings, regular for
              body. This guarantees harmony.
            </p>
            <p>
              <strong>Example:</strong> Inter Black (heading) + Inter Regular (body)
            </p>

            <h3>Strategy 3: Display + Neutral</h3>
            <p>
              Pair a distinctive display font for headings with a neutral, highly readable font
              for body. The display font carries personality; the body font stays out of the way.
            </p>
            <p>
              <strong>Example:</strong> Space Grotesk (heading) + Source Sans Pro (body)
            </p>

            <h2 id="common-mistakes">Common Font Mistakes</h2>

            <ul>
              <li>
                <strong>Too many fonts</strong> — Stick to 2 fonts maximum. Three or more creates
                visual noise.
              </li>
              <li>
                <strong>Fonts too similar</strong> — If fonts look almost the same, pick one.
                Subtle differences look like mistakes.
              </li>
              <li>
                <strong>Display fonts for body text</strong> — Display fonts aren&apos;t designed
                for long-form reading. They tire the eye.
              </li>
              <li>
                <strong>Ignoring weights</strong> — A font with only regular and bold limits your
                hierarchy options.
              </li>
              <li>
                <strong>Not testing sizes</strong> — Fonts that look great in headlines may fail
                at 14px.
              </li>
            </ul>

            <CTABox />

            <h2 id="recommended-pairings">Recommended Google Font Pairings</h2>

            <p>These combinations work well together and are free to use:</p>

            <h3>Modern & Clean</h3>
            <ul>
              <li>
                <strong>Inter + Inter</strong> — Simple, professional, works everywhere
              </li>
              <li>
                <strong>Poppins + Open Sans</strong> — Friendly, contemporary
              </li>
            </ul>

            <h3>Editorial & Sophisticated</h3>
            <ul>
              <li>
                <strong>Playfair Display + Source Sans Pro</strong> — Classic editorial feel
              </li>
              <li>
                <strong>Merriweather + Lato</strong> — Warm, readable, trustworthy
              </li>
            </ul>

            <h3>Bold & Contemporary</h3>
            <ul>
              <li>
                <strong>Space Grotesk + Inter</strong> — Tech-forward, distinctive
              </li>
              <li>
                <strong>Outfit + DM Sans</strong> — Modern, geometric, clean
              </li>
            </ul>

            <h2 id="next-steps">Next Steps</h2>

            <p>
              The best way to choose fonts is to see them in context. Our{' '}
              <Link href="/create" className="text-app-black underline hover:no-underline">
                brand builder
              </Link>{' '}
              lets you preview font combinations on real mockups — so you can see exactly how your
              brand will look before committing.
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
                href="/guides/choose-brand-colors"
                className="rounded-xl border border-app-gray-100 p-4 transition-colors hover:border-app-gray-200"
              >
                <p className="font-medium text-app-black">How to Choose Brand Colors →</p>
                <p className="mt-1 text-sm text-app-gray-500">Color psychology and palettes</p>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
