import type { Metadata } from 'next'
import Link from 'next/link'
import { LandingNavbar } from '@/components/landing/LandingNavbar'
import { Footer } from '@/components/landing/Footer'

export const metadata: Metadata = {
  title: 'Contact',
}

const FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: 'Do I need an account to use the app?',
    answer:
      'Nope! You can start building right away. Create a free account anytime to access your projects from any device.',
  },
  {
    question: 'How do I save my work?',
    answer:
      'Your projects save automatically as you work. Create an account to sync your projects across devices and browsers.',
  },
  {
    question: 'What export formats are available?',
    answer:
      'CSS variables, Tailwind config, Figma tokens, and PDF brand guides.',
  },
  {
    question: 'Is it free?',
    answer: 'Yes, completely free and open source.',
  },
]

export default function ContactPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />
      <main className="mx-auto max-w-2xl px-6 pb-16 pt-28">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-app-black">
          Get in Touch
        </h1>
        <p className="mb-10 text-base text-app-gray-500">
          Have a question, feedback, or need help with your account? We&rsquo;d love to hear from you.
        </p>

        {/* Contact */}
        <section className="mb-12">
          <h2 className="mb-3 text-lg font-semibold text-app-black">Contact Us</h2>
          <p className="text-sm leading-relaxed text-app-gray-500">
            Email us at{' '}
            <a
              href="mailto:support@brandstylegenerator.com"
              className="font-medium text-app-black underline underline-offset-2 hover:no-underline"
            >
              support@brandstylegenerator.com
            </a>
            {' '}and we&rsquo;ll get back to you as soon as possible.
          </p>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="mb-6 text-lg font-semibold text-app-black">Frequently Asked Questions</h2>
          <div className="flex flex-col gap-6">
            {FAQ_ITEMS.map((item: { question: string; answer: string }) => (
              <div key={item.question}>
                <h3 className="mb-1 text-sm font-semibold text-app-black">
                  {item.question}
                </h3>
                <p className="text-sm leading-relaxed text-app-gray-500">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Back link */}
        <div className="mt-12 border-t border-app-gray-100 pt-6">
          <Link
            href="/"
            className="text-sm text-app-gray-500 hover:text-app-black transition-colors"
          >
            &larr; Back to home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
