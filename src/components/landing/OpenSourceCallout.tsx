import { Github } from 'lucide-react'
import { ScrollReveal } from './ScrollReveal'

export function OpenSourceCallout(): React.ReactElement {
  return (
    <section className="bg-app-off-white px-6 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <ScrollReveal>
          <div className="mb-4 flex justify-center">
            <Github className="h-8 w-8 text-app-black" />
          </div>
          <h2 className="mb-3 text-2xl font-bold text-app-black">
            Open source
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-app-gray-500">
            Brand Style Generator is free and open source under the AGPL-3.0 license.
            Self-host it, contribute, or just peek at the code.
          </p>
          <a
            href="https://github.com/SchalaVentures/brand-style-generator"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer inline-flex items-center gap-2 rounded-lg border border-app-gray-100 px-5 py-2.5
                       text-sm font-medium text-app-black hover:bg-white hover:shadow-sm transition-all"
          >
            View on GitHub &rarr;
          </a>
        </ScrollReveal>
      </div>
    </section>
  )
}
