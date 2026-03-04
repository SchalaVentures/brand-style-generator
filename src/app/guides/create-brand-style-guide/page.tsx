import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { HowToJsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'How to Create a Brand Style Guide (With Examples)',
  description:
    'Learn how to create a brand style guide that ensures consistency. Covers what to include, formatting tips, and how to share with your team.',
  keywords: [
    'brand style guide',
    'brand guidelines',
    'how to create brand guide',
    'brand book',
    'visual identity guide',
    'brand documentation',
  ],
  openGraph: {
    title: 'How to Create a Brand Style Guide',
    description: 'Document your brand identity so anyone can use it consistently.',
    type: 'article',
  },
}

const HOW_TO_STEPS = [
  { name: 'Document your colors', text: 'List all colors with hex codes and usage guidelines' },
  { name: 'Specify typography', text: 'Define fonts, sizes, and weights for each use case' },
  { name: 'Add logo guidelines', text: 'Include spacing, sizing, and background requirements' },
  { name: 'Define tone of voice', text: 'Describe how your brand communicates' },
  { name: 'Include examples', text: 'Show real applications of your brand elements' },
]

function CTABox(): React.ReactElement {
  return (
    <div className="my-10 rounded-2xl bg-gradient-to-br from-app-gray-50 to-app-gray-100 p-6 md:p-8">
      <h3 className="text-lg font-semibold text-app-black">Generate your style guide</h3>
      <p className="mt-2 text-sm text-app-gray-500">
        Design your brand and export a complete style guide — PDF, CSS, or Figma tokens.
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

export default function CreateBrandStyleGuidePage(): React.ReactElement {
  return (
    <>
      <HowToJsonLd
        name="How to Create a Brand Style Guide"
        description="A guide to documenting your brand identity for consistent usage"
        steps={HOW_TO_STEPS}
        totalTime="PT45M"
      />

      <article className="px-6 pb-20 pt-32">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <header className="mb-12">
            <p className="text-sm font-medium text-app-gray-400">
              <Link href="/guides" className="hover:text-app-black">
                Guides
              </Link>{' '}
              / Documentation
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-app-black md:text-5xl">
              How to Create a Brand Style Guide
            </h1>
            <p className="mt-4 text-lg text-app-gray-500">
              Document your brand identity so anyone can use it consistently — the essentials of
              brand guidelines.
            </p>
            <p className="mt-4 text-sm text-app-gray-400">7 min read • Updated March 2026</p>
          </header>

          {/* Content */}
          <div className="prose-custom">
            <p>
              A brand style guide is the single source of truth for how your brand looks and
              sounds. Without one, every designer, developer, and marketer makes their own
              interpretation — and your brand slowly loses coherence.
            </p>

            <p>
              This guide covers what to include in your style guide, how to format it, and how to
              make sure people actually use it.
            </p>

            <h2 id="why-style-guide">Why You Need a Style Guide</h2>

            <p>A style guide ensures consistency across:</p>

            <Checklist
              items={[
                'Different team members working on the brand',
                'External agencies and freelancers',
                'Multiple platforms and touchpoints',
                'Time (as team members change)',
              ]}
            />

            <p>
              Without documentation, institutional knowledge lives in people&apos;s heads. When
              they leave, the knowledge leaves too. A style guide makes your brand
              self-documenting.
            </p>

            <h2 id="essential-elements">Essential Elements</h2>

            <p>
              At minimum, your brand style guide should cover these five areas. You can expand
              later, but start here.
            </p>

            <h3>1. Color Palette</h3>

            <p>For each color, document:</p>

            <Checklist
              items={[
                'Color name (e.g., "Brand Blue")',
                'Hex code (#3B82F6)',
                'RGB values (59, 130, 246)',
                'When to use it (primary buttons, links, accents)',
                'When NOT to use it (avoid on dark backgrounds)',
              ]}
            />

            <p>
              Include your full palette: primary, secondary, neutrals, and semantic colors
              (success, warning, error).
            </p>

            <h3>2. Typography</h3>

            <p>Document your fonts with specific details:</p>

            <Checklist
              items={[
                'Font names and where to get them (Google Fonts, Adobe, etc.)',
                'Font sizes for each use case (H1, H2, body, captions)',
                'Line heights and letter spacing',
                'Font weights (when to use bold, medium, regular)',
              ]}
            />

            <h3>3. Logo Usage</h3>

            <p>Your logo section should cover:</p>

            <Checklist
              items={[
                'Primary logo file (SVG, PNG, different sizes)',
                'Clear space requirements (minimum padding around logo)',
                'Minimum size (smallest the logo can be used)',
                'Background requirements (which colors work)',
                "Don'ts (stretching, rotating, recoloring)",
              ]}
            />

            <h3>4. Tone of Voice</h3>

            <p>
              Describe how your brand communicates. This is harder to define than visual elements
              but just as important.
            </p>

            <Checklist
              items={[
                'Brand personality in 3-5 adjectives',
                'Writing style (formal vs casual, concise vs detailed)',
                'Example phrases that sound "on brand"',
                'Phrases to avoid',
              ]}
            />

            <CTABox />

            <h3>5. Application Examples</h3>

            <p>
              Show your brand elements in context. Seeing real examples is more useful than
              abstract rules.
            </p>

            <Checklist
              items={[
                'Button styles (primary, secondary, states)',
                'Card layouts',
                'Email headers',
                'Social media templates',
              ]}
            />

            <h2 id="format-options">Format Options</h2>

            <p>Brand style guides come in different formats depending on your audience:</p>

            <h3>PDF Document</h3>
            <p>
              Best for: Sharing with external agencies, printing, executive presentations.
              Easy to share but hard to update.
            </p>

            <h3>Web-based (Notion, Confluence)</h3>
            <p>
              Best for: Internal teams, living documentation. Easy to update, searchable, can
              embed interactive examples.
            </p>

            <h3>Design Tokens (JSON/CSS)</h3>
            <p>
              Best for: Development teams. Export your colors, fonts, and spacing as code that
              developers can import directly.
            </p>

            <h3>Figma Library</h3>
            <p>
              Best for: Design teams. A Figma file with components, styles, and assets that
              designers can use directly in their work.
            </p>

            <p>
              <strong>Recommendation:</strong> Maintain multiple formats. PDF for external
              sharing, web-based for internal teams, and tokens/Figma for practitioners.
            </p>

            <h2 id="keeping-updated">Keeping Your Style Guide Updated</h2>

            <p>A style guide is only useful if it&apos;s current. Tips for maintenance:</p>

            <Checklist
              items={[
                'Assign an owner — someone responsible for updates',
                'Version it — track what changed and when',
                'Make it accessible — if people can\'t find it, they won\'t use it',
                'Review quarterly — schedule time to audit and update',
              ]}
            />

            <CTABox />

            <h2 id="getting-adoption">Getting People to Actually Use It</h2>

            <p>The best style guide is useless if nobody follows it.</p>

            <ul>
              <li>
                <strong>Make it easy to find</strong> — Pin it in Slack, bookmark it in browsers,
                add it to onboarding docs
              </li>
              <li>
                <strong>Make it easy to use</strong> — Include copy-paste hex codes, downloadable
                assets, ready-to-use templates
              </li>
              <li>
                <strong>Lead by example</strong> — Leadership and senior team members should use
                it consistently
              </li>
              <li>
                <strong>Welcome feedback</strong> — If something doesn&apos;t work in practice,
                update the guide
              </li>
            </ul>

            <h2 id="next-steps">Next Steps</h2>

            <p>
              Ready to create your style guide? Our{' '}
              <Link href="/create" className="text-app-black underline hover:no-underline">
                brand builder
              </Link>{' '}
              lets you design your brand and export a complete style guide in multiple formats —
              PDF for sharing, CSS variables for developers, and Figma tokens for designers.
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
