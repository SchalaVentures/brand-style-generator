'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthState } from '@/hooks/use-auth-state'
import { AuthModal } from '@/components/auth/AuthModal'

export function LandingNavbar(): React.ReactElement {
  const [scrolled, setScrolled] = useState<boolean>(false)
  const [mounted, setMounted] = useState<boolean>(false)
  const [showSignIn, setShowSignIn] = useState<boolean>(false)
  const { isAuthenticated, isAnonymous } = useAuthState()
  const isSignedIn: boolean = mounted && isAuthenticated && !isAnonymous
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    const handleScroll = (): void => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav
        className={`
          fixed top-0 z-50 w-full transition-all duration-200
          ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'}
        `}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center px-6">
          {/* Left: Logo */}
          <div className="flex-1">
            <Link href="/" className="cursor-pointer text-base font-semibold tracking-tight text-app-black">
              Brand Style Generator
            </Link>
          </div>

          {/* Center: Nav links */}
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="/#how-it-works"
              className="cursor-pointer text-sm text-app-gray-500 hover:text-app-black transition-colors"
            >
              How It Works
            </a>
            <a
              href="/#features"
              className="cursor-pointer text-sm text-app-gray-500 hover:text-app-black transition-colors"
            >
              Features
            </a>
          </div>

          {/* Right: Auth actions */}
          <div className="flex flex-1 items-center justify-end gap-3">
            {isSignedIn ? (
              <Link
                href="/projects"
                className="cursor-pointer rounded-lg bg-app-black px-4 py-2 text-sm font-semibold text-white
                           hover:bg-app-gray-600 transition-colors"
              >
                Projects
              </Link>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => { setShowSignIn(true) }}
                  className="cursor-pointer text-sm text-app-gray-500 hover:text-app-black transition-colors"
                >
                  Sign In
                </button>
                <Link
                  href="/create"
                  className="cursor-pointer rounded-lg bg-app-black px-4 py-2 text-sm font-semibold text-white
                             hover:bg-app-gray-600 transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <AuthModal
        open={showSignIn}
        onClose={() => { setShowSignIn(false) }}
        onSuccess={() => { setShowSignIn(false); router.push('/projects') }}
        initialFlow="signin"
      />
    </>
  )
}
