import type { Metadata } from 'next'
import { AuthInitializer } from '@/components/AuthInitializer'
import { WebApplicationJsonLd, OrganizationJsonLd } from '@/components/JsonLd'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Brand Style Generator | Build Your Brand in Minutes',
    template: '%s | Brand Style Generator',
  },
  description:
    'Pick colors, fonts, and tone. See your brand come alive on real product mockups. Export to CSS, Tailwind, or Figma tokens. Free and open source.',
  keywords: [
    // Tool keywords
    'brand style generator',
    'color palette generator',
    'font pairing tool',
    'brand guide maker',
    'tailwind colors',
    'figma tokens',
    // Problem/question keywords (SEO)
    'how to design a brand',
    'how to create brand colors',
    'brand identity design',
    'startup branding',
    'DIY brand design',
    'free brand kit maker',
    'brand guidelines generator',
    'color scheme generator',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://brandstylegenerator.com',
    siteName: 'Brand Style Generator',
    title: 'Brand Style Generator | Build Your Brand in Minutes',
    description:
      'Pick colors, fonts, and tone. Preview on real mockups. Export CSS, Tailwind, Figma tokens.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brand Style Generator',
    description: 'Build your brand style in minutes. Free and open source.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): React.ReactElement {
  return (
    <html lang="en">
      <head>
        <WebApplicationJsonLd />
        <OrganizationJsonLd />
      </head>
      <body className="antialiased">
        <AuthInitializer>{children}</AuthInitializer>
      </body>
    </html>
  )
}
