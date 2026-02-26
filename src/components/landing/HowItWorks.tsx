import { ScrollReveal } from './ScrollReveal'

interface Step {
  number: string
  title: string
  description: string
}

const STEPS: Step[] = [
  {
    number: '01',
    title: 'Pick your colors, fonts & tone',
    description:
      'Curated options organized by category. No design degree needed, just pick what feels right.',
  },
  {
    number: '02',
    title: 'Preview on real product mockups',
    description:
      'See your brand on a dashboard, landing page, mobile app, login page, and full brand guide.',
  },
  {
    number: '03',
    title: 'Export & share with your team',
    description:
      'Copy CSS variables, Tailwind config, or Figma tokens. Download a PDF brand guide. Share a link.',
  },
]

export function HowItWorks(): React.ReactElement {
  return (
    <section id="how-it-works" className="scroll-mt-20 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="mb-12 text-center text-3xl font-bold text-app-black">
            How it works
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {STEPS.map((step: Step, i: number) => (
            <ScrollReveal key={step.number} delay={i * 100}>
              <div className="text-center">
                <div className="mb-4 text-4xl font-bold text-app-gray-100">
                  {step.number}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-app-black">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-app-gray-500">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
