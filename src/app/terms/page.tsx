import type { Metadata } from 'next'
import Link from 'next/link'
import { LandingNavbar } from '@/components/landing/LandingNavbar'
import { Footer } from '@/components/landing/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service',
}

export default function TermsPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />
      <main className="mx-auto max-w-2xl px-6 pb-16 pt-28">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-app-black">
          Terms of Service
        </h1>
        <p className="mb-10 text-sm text-app-gray-400">
          Last updated: February 26, 2026
        </p>

        <div className="flex flex-col gap-8 text-sm leading-relaxed text-app-gray-500">

          <section>
            <h2 className="mb-2 text-base font-semibold text-app-black">Acceptance of Terms</h2>
            <p>
              By accessing or using Brand Style Generator (&ldquo;Service&rdquo;), you agree to
              be bound by these Terms of Service (&ldquo;Terms&rdquo;) and our{' '}
              <Link href="/privacy" className="font-medium text-app-black underline underline-offset-2 hover:no-underline">
                Privacy Policy
              </Link>
              . If you do not agree to these Terms, do not use the Service. If you are using the
              Service on behalf of an organization, you represent that you have authority to bind
              that organization to these Terms.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-app-black">Description of Service</h2>
            <p>
              Brand Style Generator is a free web-based tool that helps individuals and teams
              create brand style guides. Features include selecting colors, fonts, and tone;
              previewing your brand on product mockups; saving and managing projects; sharing
              brand guides via public links; and exporting to CSS variables, Tailwind config,
              Figma tokens, and PDF. The Service is provided free of charge and is open source.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-app-black">User Accounts</h2>
            <p className="mb-2">
              You may use the Service as a guest without an account. Guest sessions are stored in
              your browser and may be lost if you clear browser data or switch devices.
            </p>
            <p className="mb-2">
              You may create a free account using an email address. You are responsible for:
            </p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Maintaining the confidentiality of your account credentials.</li>
              <li>All activity that occurs under your account.</li>
              <li>Notifying us promptly of any unauthorized use of your account.</li>
            </ul>
            <p className="mt-2">
              We reserve the right to suspend or terminate accounts that violate these Terms.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-app-black">Your Content</h2>
            <p className="mb-2">
              You retain full ownership of all brand styles, color palettes, font selections, and
              other content you create using the Service (&ldquo;Your Content&rdquo;). We do not
              claim any intellectual property rights over Your Content.
            </p>
            <p className="mb-2">
              By using the Service, you grant us a limited, non-exclusive license to store,
              process, and transmit Your Content solely as necessary to provide the Service to
              you (for example, to save your projects to our database or to render a shared link).
            </p>
            <p>
              You are responsible for ensuring that Your Content does not violate any applicable
              laws or third-party rights.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-app-black">Acceptable Use</h2>
            <p className="mb-2">You agree not to:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Use the Service for any unlawful purpose or in violation of any applicable laws or regulations.</li>
              <li>Attempt to gain unauthorized access to any part of the Service or its infrastructure.</li>
              <li>Interfere with or disrupt the Service, its servers, or networks.</li>
              <li>Use automated tools (bots, scrapers, crawlers) to access the Service in ways that impose an unreasonable burden on our infrastructure.</li>
              <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity.</li>
              <li>Upload or transmit content that is malicious, defamatory, or infringes third-party intellectual property rights.</li>
              <li>Attempt to reverse engineer, decompile, or extract source code from the Service beyond what is publicly available in the open-source repository.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-app-black">Intellectual Property</h2>
            <p className="mb-2">
              The Service&rsquo;s source code is open source and available under its respective
              license. The Brand Style Generator name, logo, and visual design are the property
              of Brand Style Generator and may not be used without permission.
            </p>
            <p>
              Third-party fonts loaded from Google Fonts are subject to their respective
              licenses (typically SIL Open Font License). The export files you generate are yours
              to use without restriction.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-app-black">Privacy and Data</h2>
            <p>
              Your use of the Service is subject to our{' '}
              <Link href="/privacy" className="font-medium text-app-black underline underline-offset-2 hover:no-underline">
                Privacy Policy
              </Link>
              , which is incorporated into these Terms by reference. By using the Service, you
              consent to the collection and use of information as described in the Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-app-black">Service Availability and Modifications</h2>
            <p className="mb-2">
              The Service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without
              warranties of any kind, express or implied, including but not limited to warranties
              of merchantability, fitness for a particular purpose, or non-infringement.
            </p>
            <p>
              We reserve the right to modify, suspend, or discontinue the Service (or any part
              of it) at any time, with or without notice. We are not liable to you or any third
              party for any modification, suspension, or discontinuation of the Service.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-app-black">Third-Party Services and Links</h2>
            <p>
              The Service integrates with third-party services (such as Nhost, Cloudflare, and
              Google Fonts) and may contain links to third-party websites. We are not responsible
              for the content, privacy practices, or terms of any third-party services. Your use
              of third-party services is governed by their respective terms.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-app-black">Disclaimer of Warranties</h2>
            <p>
              To the fullest extent permitted by applicable law, the Service is provided without
              any warranties. We do not warrant that the Service will be uninterrupted,
              error-free, secure, or free of viruses. We do not warrant the accuracy, reliability,
              or completeness of any content generated by or available through the Service.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-app-black">Limitation of Liability</h2>
            <p className="mb-2">
              To the fullest extent permitted by applicable law, Brand Style Generator and its
              creators, contributors, and affiliates shall not be liable for any:
            </p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Indirect, incidental, special, consequential, or punitive damages.</li>
              <li>Loss of profits, data, goodwill, or other intangible losses.</li>
              <li>Damages arising from your use of or inability to use the Service.</li>
              <li>Unauthorized access to or alteration of your data.</li>
            </ul>
            <p className="mt-2">
              In jurisdictions that do not allow certain exclusions or limitations of liability,
              our liability is limited to the maximum extent permitted by law.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-app-black">Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Brand Style Generator and its creators
              from any claims, damages, losses, or expenses (including reasonable legal fees)
              arising from your use of the Service, Your Content, or your violation of these
              Terms.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-app-black">Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with applicable law. Any
              disputes arising from these Terms or your use of the Service shall be resolved
              through good-faith negotiation where possible. If a dispute cannot be resolved
              informally, it shall be subject to the jurisdiction of the courts applicable to
              the service operator.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-app-black">Severability</h2>
            <p>
              If any provision of these Terms is found to be unenforceable or invalid, that
              provision will be limited or eliminated to the minimum extent necessary, and the
              remaining provisions will remain in full force and effect.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-app-black">Entire Agreement</h2>
            <p>
              These Terms, together with the Privacy Policy, constitute the entire agreement
              between you and Brand Style Generator regarding the Service and supersede any prior
              agreements on the same subject matter.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-app-black">Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. When we make material changes, we will
              update the &ldquo;Last updated&rdquo; date at the top of this page. Continued use
              of the Service after changes are posted constitutes acceptance of the updated Terms.
              If you do not agree to the updated Terms, you must stop using the Service.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-app-black">Contact</h2>
            <p>
              If you have any questions about these Terms, please{' '}
              <Link href="/contact" className="font-medium text-app-black underline underline-offset-2 hover:no-underline">
                contact us
              </Link>
              .
            </p>
          </section>

        </div>

        <div className="mt-12 border-t border-app-gray-100 pt-6">
          <Link href="/" className="text-sm text-app-gray-500 hover:text-app-black transition-colors">
            &larr; Back to home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
