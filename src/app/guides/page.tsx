import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, Palette, Type, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Brand Design Guides',
  description:
    'Free guides on how to design a brand, choose brand colors, pair fonts, and create professional brand style guides. No design experience needed.',
  keywords: [
    'brand design guide',
    'how to design a brand',
    'brand identity tutorial',
    'color palette guide',
    'font pairing guide',
  ],
}

interface Guide {
  slug: string
  title: string
  description: string
  icon: React.ReactNode
  readTime: string
}

const GUIDES: Guide[] = [
  {
    slug: 'how-to-design-a-brand',
    title: 'How to Design a Brand',
    description:
      'A complete guide to creating your brand identity from scratch — colors, fonts, tone, and visual style.',
    icon: <BookOpen className="h-6 w-6" />,
    readTime: '8 min read',
  },
  {
    slug: 'choose-brand-colors',
    title: 'How to Choose Brand Colors',
    description:
      'Learn color psychology, pick a primary color, and build a cohesive palette that works everywhere.',
    icon: <Palette className="h-6 w-6" />,
    readTime: '6 min read',
  },
  {
    slug: 'font-pairing',
    title: 'Font Pairing Guide',
    description:
      'How to choose fonts that work together — heading and body font combinations that look professional.',
    icon: <Type className="h-6 w-6" />,
    readTime: '5 min read',
  },
  {
    slug: 'create-brand-style-guide',
    title: 'Create a Brand Style Guide',
    description:
      'Document your brand identity so anyone can use it consistently — the essentials of brand guidelines.',
    icon: <FileText className="h-6 w-6" />,
    readTime: '7 min read',
  },
]

export default function GuidesPage(): React.ReactElement {
  return (
    <div className="px-6 pb-20 pt-32">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-app-black md:text-5xl">
            Brand Design Guides
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-app-gray-500">
            Everything you need to know about designing a brand — from choosing colors to creating
            style guides. Free, practical, no fluff.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {GUIDES.map((guide: Guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group rounded-2xl border border-app-gray-100 bg-white p-6 transition-all hover:border-app-gray-200 hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-app-gray-50 text-app-gray-500 transition-colors group-hover:bg-app-black group-hover:text-white">
                {guide.icon}
              </div>
              <h2 className="text-xl font-semibold text-app-black">{guide.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-app-gray-500">{guide.description}</p>
              <p className="mt-4 text-xs font-medium text-app-gray-400">{guide.readTime}</p>
            </Link>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-app-gray-50 p-8 text-center">
          <h2 className="text-xl font-semibold text-app-black">Ready to build your brand?</h2>
          <p className="mt-2 text-sm text-app-gray-500">
            Put these guides into practice with our free brand builder.
          </p>
          <Link
            href="/create"
            className="mt-6 inline-block rounded-lg bg-app-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-app-gray-600"
          >
            Start Building →
          </Link>
        </div>
      </div>
    </div>
  )
}
