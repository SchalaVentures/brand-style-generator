import { LandingNavbar } from '@/components/landing/LandingNavbar'
import { Hero } from '@/components/landing/Hero'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { FeatureHighlights } from '@/components/landing/FeatureHighlights'
import { ExampleBrands } from '@/components/landing/ExampleBrands'
import { OpenSourceCallout } from '@/components/landing/OpenSourceCallout'
import { FinalCTA } from '@/components/landing/FinalCTA'
import { Footer } from '@/components/landing/Footer'

export default function LandingPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />
      <main>
        <Hero />
        <HowItWorks />
        <FeatureHighlights />
        <ExampleBrands />
        <OpenSourceCallout />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
