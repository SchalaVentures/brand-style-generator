import Link from 'next/link'

export function Footer(): React.ReactElement {
  return (
    <footer className="border-t border-app-gray-100 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="mb-2 text-sm font-semibold text-app-black">
              Brand Style Generator
            </div>
            <p className="text-xs leading-relaxed text-app-gray-500">
              Build your brand style in minutes. Pick colors, fonts, and tone. See your
              brand on real product mockups.
            </p>
          </div>

          {/* Product links */}
          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-app-black">
              Product
            </div>
            <div className="flex flex-col gap-2">
              <a href="#features" className="cursor-pointer text-xs text-app-gray-500 hover:text-app-black">
                Features
              </a>
              <a href="#how-it-works" className="cursor-pointer text-xs text-app-gray-500 hover:text-app-black">
                How It Works
              </a>
              <a href="#examples" className="cursor-pointer text-xs text-app-gray-500 hover:text-app-black">
                Examples
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-app-black">
              Legal
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/contact" className="cursor-pointer text-xs text-app-gray-500 hover:text-app-black">
                Support
              </Link>
              <Link href="/terms" className="cursor-pointer text-xs text-app-gray-500 hover:text-app-black">
                Terms of Service
              </Link>
              <Link href="/privacy" className="cursor-pointer text-xs text-app-gray-500 hover:text-app-black">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-app-black">
              Social
            </div>
            <div className="flex flex-col gap-2">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-xs text-app-gray-500 hover:text-app-black"
              >
                Twitter
              </a>
              <a
                href="https://github.com/SchalaVentures/brand-style-generator"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-xs text-app-gray-500 hover:text-app-black"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-app-gray-100 pt-6">
          <p className="text-xs text-app-gray-400">
            &copy; {new Date().getFullYear()} brandstylegenerator.com
          </p>
        </div>
      </div>
    </footer>
  )
}
