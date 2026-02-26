import type { Metadata } from 'next'
import { AuthInitializer } from '@/components/AuthInitializer'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Brand Style Generator | Build Your Brand in Minutes',
    template: '%s | Brand Style Generator',
  },
  description:
    'Pick colors, fonts, and tone. See your brand come alive on real product mockups. Export to CSS, Tailwind, or Figma tokens. Free and open source.',
  keywords: [
    'brand style generator',
    'color palette',
    'font pairing',
    'brand guide',
    'tailwind colors',
    'figma tokens',
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
      <body className="antialiased">
        <AuthInitializer>{children}</AuthInitializer>
      </body>
    </html>
  )
}
