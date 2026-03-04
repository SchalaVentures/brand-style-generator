import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { HowToJsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'How to Design a Brand in 5 Steps (2026 Guide)',
  description:
    'Learn how to design a brand from scratch. This step-by-step guide covers choosing colors, picking fonts, defining your tone, and creating a cohesive brand identity.',
  keywords: [
    'how to design a brand',
    'brand design guide',
    'create brand identity',
    'brand design for beginners',
    'startup branding',
    'DIY brand design',
  ],
  openGraph: {
    title: 'How to Design a Brand in 5 Steps',
    description:
      'A complete guide to creating your brand identity — colors, fonts, tone, and visual style.',
    type: 'article',
  },
}

const HOW_TO_STEPS = [
  { name: 'Define your brand personality', text: 'Identify 3-5 adjectives that describe your brand' },
  { name: 'Choose your primary color', text: 'Pick a color that reflects your brand personality' },
  { name: 'Build your color palette', text: 'Create supporting colors for backgrounds, text, and accents' },
  { name: 'Select your fonts', text: 'Choose a heading font and body font that work together' },
  { name: 'Document everything', text: 'Create a brand style guide for consistent usage' },
]

function CTABox(): React.ReactElement {
  return (
    <div className="my-10 rounded-2xl bg-gradient-to-br from-app-gray-50 to-app-gray-100 p-6 md:p-8">
      <h3 className="text-lg font-semibold text-app-black">Try it yourself</h3>
      <p className="mt-2 text-sm text-app-gray-500">
        Put this guide into practice — our free tool walks you through each step.
      </p>
      <Link
        href="/create"
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-app-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-app-gray-600"
      >
        Start Building <ArrowRight className="h-4 w-4" />
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

export default function HowToDesignABrandPage(): React.ReactElement {
  return (
    <>
      <HowToJsonLd
        name="How to Design a Brand"
        description="A step-by-step guide to creating a complete brand identity from scratch"
        steps={HOW_TO_STEPS}
        totalTime="PT30M"
      />

      <article className="px-6 pb-20 pt-32">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <header className="mb-12">
            <p className="text-sm font-medium text-app-gray-400">
              <Link href="/guides" className="hover:text-app-black">
                Guides
              </Link>{' '}
              / Brand Design
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-app-black md:text-5xl">
              How to Design a Brand in 5 Steps
            </h1>
            <p className="mt-4 text-lg text-app-gray-500">
              A complete guide to creating your brand identity from scratch — no design experience
              required.
            </p>
            <p className="mt-4 text-sm text-app-gray-400">8 min read • Updated March 2026</p>
          </header>

          {/* Content */}
          <div className="prose-custom">
            <p>
              Designing a brand doesn&apos;t require a design degree or expensive agencies. What it
              requires is clarity about who you are, who you&apos;re serving, and how you want to be
              perceived.
            </p>

            <p>
              This guide walks you through the five essential steps to create a cohesive brand
              identity — from choosing your colors to documenting your style guide.
            </p>

            <h2 id="what-is-brand-identity">What is a Brand Identity?</h2>

            <p>
              Your brand identity is the visual and verbal language that represents your business.
              It includes:
            </p>

            <Checklist
              items={[
                'Colors — your primary color and supporting palette',
                'Typography — the fonts you use for headings and body text',
                'Tone of voice — how you communicate (friendly, professional, bold)',
                'Visual style — how all these elements work together',
              ]}
            />

            <p>
              A strong brand identity makes your business recognizable, builds trust, and helps
              customers remember you. It&apos;s not just about looking good — it&apos;s about
              looking <em>consistent</em>.
            </p>

            <h2 id="step-1-define-personality">Step 1: Define Your Brand Personality</h2>

            <p>
              Before you pick colors or fonts, you need to know <em>who</em> your brand is. Think of
              your brand as a person. How would you describe them?
            </p>

            <p>
              <strong>Exercise:</strong> Write down 3-5 adjectives that describe your brand. For
              example:
            </p>

            <Checklist
              items={[
                'A tech startup might be: innovative, approachable, confident',
                'A law firm might be: trustworthy, professional, experienced',
                'A coffee shop might be: warm, friendly, artisanal',
              ]}
            />

            <p>
              These adjectives will guide every design decision you make. If your brand is
              &quot;playful,&quot; you probably shouldn&apos;t use a serious serif font. If
              it&apos;s &quot;professional,&quot; neon pink might not be the right primary color.
            </p>

            <h2 id="step-2-choose-primary-color">Step 2: Choose Your Primary Color</h2>

            <p>
              Your primary color is the most important design decision you&apos;ll make. It&apos;s
              the color people will associate with your brand — think Coca-Cola red or Facebook
              blue.
            </p>

            <h3>Color Psychology Basics</h3>

            <p>Different colors evoke different emotions:</p>

            <ul>
              <li>
                <strong>Blue</strong> — trust, stability, professionalism (banks, tech)
              </li>
              <li>
                <strong>Green</strong> — growth, health, sustainability (eco brands, wellness)
              </li>
              <li>
                <strong>Red</strong> — energy, urgency, passion (food, entertainment)
              </li>
              <li>
                <strong>Purple</strong> — creativity, luxury, wisdom (beauty, premium brands)
              </li>
              <li>
                <strong>Orange</strong> — friendliness, confidence, warmth (lifestyle, youth)
              </li>
              <li>
                <strong>Black</strong> — sophistication, elegance, authority (luxury, fashion)
              </li>
            </ul>

            <p>
              Choose a color that aligns with your brand personality. If you&apos;re a wellness
              brand focused on nature, green makes sense. If you&apos;re a fintech app building
              trust, blue is a safe choice.
            </p>

            <CTABox />

            <h2 id="step-3-build-palette">Step 3: Build Your Color Palette</h2>

            <p>
              One color isn&apos;t enough. You need a complete palette that works together. A
              typical brand palette includes:
            </p>

            <Checklist
              items={[
                'Primary color — your main brand color',
                'Secondary color — a complementary accent',
                'Background colors — light tones for surfaces',
                'Text colors — dark tones for readability',
                'Semantic colors — success (green), warning (yellow), error (red)',
              ]}
            />

            <h3>Building from Your Primary Color</h3>

            <p>
              Modern color tools use perceptually uniform color spaces like OKLCH to generate
              palettes that look naturally balanced. The key is maintaining consistent lightness
              relationships across your palette.
            </p>

            <p>
              For each color, you&apos;ll typically need multiple shades — lighter versions for
              backgrounds, darker versions for text and borders. A good palette has 5-10 shades per
              color family.
            </p>

            <h2 id="step-4-select-fonts">Step 4: Select Your Fonts</h2>

            <p>
              Typography carries as much personality as color. You&apos;ll need two fonts: one for
              headings, one for body text.
            </p>

            <h3>Heading Fonts</h3>

            <p>
              Your heading font is for impact. It should reflect your brand personality more
              strongly than your body font.
            </p>

            <ul>
              <li>
                <strong>Sans-serif</strong> (Inter, Poppins) — modern, clean, approachable
              </li>
              <li>
                <strong>Serif</strong> (Playfair Display, Merriweather) — classic, trustworthy,
                editorial
              </li>
              <li>
                <strong>Display</strong> (Space Grotesk, Outfit) — distinctive, contemporary, bold
              </li>
            </ul>

            <h3>Body Fonts</h3>

            <p>
              Your body font is for readability. Prioritize legibility over personality — people
              will read long passages in this font.
            </p>

            <p>
              <strong>Safe choices:</strong> Inter, Open Sans, Source Sans Pro, Lato. These fonts
              are designed for screens and work at any size.
            </p>

            <h3>Pairing Fonts</h3>

            <p>The classic approach is to pair fonts with contrast:</p>

            <Checklist
              items={[
                'Serif heading + Sans-serif body (traditional, editorial)',
                'Sans-serif heading + Sans-serif body (modern, clean)',
                'Display heading + Neutral body (distinctive, contemporary)',
              ]}
            />

            <p>
              The key is contrast without conflict. Your fonts should look different enough to
              create hierarchy, but share enough DNA to feel cohesive.
            </p>

            <h2 id="step-5-document-style-guide">Step 5: Document Your Style Guide</h2>

            <p>
              A brand style guide ensures everyone uses your brand consistently. It doesn&apos;t
              need to be elaborate — a simple document covering the essentials is enough.
            </p>

            <h3>What to Include</h3>

            <Checklist
              items={[
                'Color palette with hex codes (and usage guidelines)',
                'Font names, sizes, and weights',
                'Logo usage (minimum size, spacing, backgrounds)',
                'Tone of voice examples (do/don\'t)',
                'Sample applications (buttons, cards, headers)',
              ]}
            />

            <p>
              Export your style guide in a format your team can use — PDF for reference, CSS
              variables for developers, Figma tokens for designers.
            </p>

            <CTABox />

            <h2 id="common-mistakes">Common Brand Design Mistakes</h2>

            <p>Avoid these pitfalls when designing your brand:</p>

            <ul>
              <li>
                <strong>Too many colors</strong> — Stick to 2-3 main colors. More creates chaos.
              </li>
              <li>
                <strong>Inconsistent usage</strong> — Use your exact hex codes everywhere. Close
                enough isn&apos;t close enough.
              </li>
              <li>
                <strong>Ignoring accessibility</strong> — Ensure your text colors have sufficient
                contrast against backgrounds.
              </li>
              <li>
                <strong>Chasing trends</strong> — Trends fade. Choose timeless over trendy.
              </li>
              <li>
                <strong>No documentation</strong> — If it&apos;s not written down, it will be used
                inconsistently.
              </li>
            </ul>

            <h2 id="next-steps">Next Steps</h2>

            <p>
              You now have the framework to design a complete brand identity. The next step is to
              put it into practice:
            </p>

            <ol>
              <li>Define your brand personality (3-5 adjectives)</li>
              <li>Choose a primary color that reflects that personality</li>
              <li>Build out your full color palette</li>
              <li>Select fonts that support your brand voice</li>
              <li>Document everything in a style guide</li>
            </ol>

            <p>
              Our{' '}
              <Link href="/create" className="text-app-black underline hover:no-underline">
                free brand builder
              </Link>{' '}
              walks you through each step visually. You&apos;ll see your brand come to life on real
              mockups and export production-ready assets when you&apos;re done.
            </p>
          </div>

          {/* Related Guides */}
          <div className="mt-16 border-t border-app-gray-100 pt-12">
            <h2 className="text-xl font-semibold text-app-black">Continue Learning</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Link
                href="/guides/choose-brand-colors"
                className="rounded-xl border border-app-gray-100 p-4 transition-colors hover:border-app-gray-200"
              >
                <p className="font-medium text-app-black">How to Choose Brand Colors →</p>
                <p className="mt-1 text-sm text-app-gray-500">Deep dive into color selection</p>
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
