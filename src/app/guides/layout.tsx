import { LandingNavbar } from '@/components/landing/LandingNavbar'
import { Footer } from '@/components/landing/Footer'

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
