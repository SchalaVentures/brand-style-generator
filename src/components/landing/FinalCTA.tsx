import Link from 'next/link'
import { ScrollReveal } from './ScrollReveal'

export function FinalCTA(): React.ReactElement {
  return (
    <section className="px-6 py-20 text-center">
      <div className="mx-auto max-w-2xl">
        <ScrollReveal>
          <h2 className="mb-3 text-3xl font-bold text-app-black">
            Ready to build your brand?
          </h2>
          <p className="mb-8 text-app-gray-500">
            No account needed. Free forever.
          </p>
          <Link
            href="/create"
            className="cursor-pointer inline-block rounded-lg bg-app-black px-8 py-3.5 text-sm font-semibold text-white
                       hover:bg-app-gray-600 transition-colors"
          >
            Start Building &rarr;
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}
