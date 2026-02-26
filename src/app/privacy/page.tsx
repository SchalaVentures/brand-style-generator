import type { Metadata } from 'next'
import Link from 'next/link'
import { LandingNavbar } from '@/components/landing/LandingNavbar'
import { Footer } from '@/components/landing/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy',
}

export default function PrivacyPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />
      <main className="mx-auto max-w-2xl px-6 pb-16 pt-28">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-app-black">
          Privacy Policy
        </h1>
        <p className="mb-10 text-sm text-app-gray-400">
          Last updated: February 26, 2026
        </p>

        <div className="flex flex-col gap-8 text-sm leading-relaxed text-app-gray-500">

          <section>
            <h2 className="mb-2 text-base font-semibold text-app-black">Overview</h2>
            <p>
              Brand Style Generator (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is
              committed to protecting your privacy. This policy explains what information we
              collect, how we use it, and your rights regarding your data. By using this service,
              you agree to the practices described here.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-app-black">Information We Collect</h2>

            <h3 className="mb-1 font-medium text-app-black">Information you provide</h3>
            <ul className="mb-4 ml-4 list-disc space-y-1">
              <li><strong>Account information</strong>: your email address and optional display name when you create an account.</li>
              <li><strong>Project data</strong>: brand styles, color palettes, font selections, tone settings, and any other content you create or save using the service.</li>
            </ul>

            <h3 className="mb-1 font-medium text-app-black">Information collected automatically</h3>
            <ul className="ml-4 list-disc space-y-1">
              <li><strong>Usage data</strong>: pages visited, features used, and interactions with the service. This may be collected through first-party analytics or third-party analytics services.</li>
              <li><strong>Device and browser information</strong>: browser type, operating system, screen size, and general geographic region (country or city level), used to improve compatibility and user experience.</li>
              <li><strong>Log data</strong>: server logs including IP addresses, request timestamps, and error reports, retained for security and debugging purposes.</li>
              <li><strong>Share link views</strong>: when someone views a shared brand link, we record a view count. No personal information about the viewer is stored.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-app-black">Cookies and Tracking Technologies</h2>
            <p className="mb-3">
              We use cookies and similar technologies to operate and improve the service. The
              types of cookies we use or may use include:
            </p>
            <ul className="ml-4 list-disc space-y-2">
              <li>
                <strong>Essential cookies</strong>: required for the service to function.
                Currently this includes a single session cookie
                (<code className="rounded bg-gray-100 px-1 py-0.5 text-xs">nhost-session</code>)
                used for authentication. You cannot opt out of essential cookies without stopping
                use of the service.
              </li>
              <li>
                <strong>Analytics cookies</strong>: we may use analytics services (such as
                Segment, Mixpanel, PostHog, or similar tools) to understand how the service is
                used and to improve it. These may use cookies or pixel tracking. We will update
                this policy when such services are introduced.
              </li>
              <li>
                <strong>Advertising and retargeting pixels</strong>: in the future we may use
                advertising pixels (such as Meta Pixel or Google Tag Manager) for marketing
                purposes. These would only be added with appropriate disclosure in this policy.
              </li>
            </ul>
            <p className="mt-3">
              You can control cookies through your browser settings. Disabling non-essential
              cookies will not affect your ability to use the core features of the service.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-app-black">How We Use Your Information</h2>
            <ul className="ml-4 list-disc space-y-1">
              <li>To provide and operate the service, including saving, loading, and sharing your projects.</li>
              <li>To authenticate your account and maintain your session.</li>
              <li>To analyze usage patterns and improve the product experience.</li>
              <li>To diagnose technical issues and ensure service reliability.</li>
              <li>To communicate with you about the service when necessary (e.g. account-related emails).</li>
              <li>To comply with legal obligations.</li>
            </ul>
            <p className="mt-2">
              We do <strong>not</strong> sell your personal data to third parties. We do not use
              your project content for advertising targeting.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-app-black">Guest Sessions</h2>
            <p>
              When you use the app without creating an account, a temporary anonymous session is
              created and stored in your browser via a cookie. No personally identifiable
              information is collected for guest sessions. Your in-progress brand data is stored
              locally in your browser. Clearing your browser data will end the session and delete
              locally stored data.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-app-black">Third-Party Services</h2>
            <p className="mb-2">
              We share data with third-party service providers only as necessary to operate the service:
            </p>
            <ul className="ml-4 list-disc space-y-1">
              <li><strong>Nhost</strong>: backend infrastructure including database (PostgreSQL), authentication, and file storage. Your account data and project data are stored on Nhost-managed infrastructure.</li>
              <li><strong>Cloudflare</strong>: hosting, CDN, and DDoS protection. Cloudflare may process request data including IP addresses.</li>
              <li><strong>Google Fonts</strong>: fonts are loaded from Google&rsquo;s servers, which may log font requests. See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="font-medium text-app-black underline underline-offset-2 hover:no-underline">Google&rsquo;s Privacy Policy</a>.</li>
              <li><strong>OAuth providers</strong> (Google, GitHub): if you choose to sign in using a social provider, we receive only the profile information you authorize during the OAuth flow.</li>
              <li><strong>Analytics providers</strong>: we may add analytics services in the future. This policy will be updated before any such service is introduced.</li>
            </ul>
            <p className="mt-2">
              We do not share your data with third parties for their own marketing or advertising
              purposes.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-app-black">Data Storage and Security</h2>
            <p>
              Your data is stored on secure, managed infrastructure. We use industry-standard
              security measures including encrypted connections (HTTPS/TLS) and access controls.
              Data may be stored in cloud regions outside your country of residence as required to
              provide the service. While we take reasonable precautions, no system is completely
              secure and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-app-black">Data Retention</h2>
            <ul className="ml-4 list-disc space-y-1">
              <li><strong>Account data</strong>: retained until you delete your account.</li>
              <li><strong>Project data</strong>: retained until you delete the project or your account.</li>
              <li><strong>Shared links</strong>: retained until you delete them or request removal.</li>
              <li><strong>Log data</strong>: typically retained for 30–90 days for security and debugging.</li>
              <li><strong>Guest session data</strong>: stored only in your browser and cleared when you clear browser data.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-app-black">Your Rights</h2>
            <p className="mb-2">
              Depending on your location, you may have the following rights regarding your
              personal data:
            </p>
            <ul className="ml-4 list-disc space-y-1">
              <li><strong>Access</strong>: request a copy of the personal data we hold about you.</li>
              <li><strong>Correction</strong>: request correction of inaccurate data.</li>
              <li><strong>Deletion</strong>: request deletion of your account and associated data.</li>
              <li><strong>Export</strong>: export your projects at any time using the built-in export feature (CSS, Tailwind, Figma tokens, PDF).</li>
              <li><strong>Restriction</strong>: request that we limit how we process your data.</li>
              <li><strong>Objection</strong>: object to processing of your data in certain circumstances.</li>
              <li><strong>Portability</strong>: receive your data in a portable format.</li>
            </ul>
            <p className="mt-2">
              To exercise any of these rights, please{' '}
              <Link href="/contact" className="font-medium text-app-black underline underline-offset-2 hover:no-underline">
                contact us
              </Link>
              . We will respond within a reasonable timeframe.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-app-black">Children&rsquo;s Privacy</h2>
            <p>
              This service is not directed at children under 13 years of age. We do not knowingly
              collect personal information from children under 13. If you believe a child has
              provided us with personal information, please contact us and we will delete it.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-app-black">Do Not Track</h2>
            <p>
              Some browsers send &ldquo;Do Not Track&rdquo; signals. We currently do not respond
              to Do Not Track signals in a standardized way, as no industry standard has been
              adopted. We will update this section if our practices change.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-app-black">Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. When we make material changes,
              we will update the &ldquo;Last updated&rdquo; date at the top of this page. For
              significant changes (such as introducing new tracking technologies), we will make
              reasonable efforts to notify users. Continued use of the service after changes
              constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-app-black">Contact</h2>
            <p>
              If you have questions about this privacy policy or want to exercise your data
              rights, please{' '}
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
