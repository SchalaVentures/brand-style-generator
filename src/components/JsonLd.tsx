interface WebApplicationJsonLdProps {
  url?: string
}

export function WebApplicationJsonLd({
  url = 'https://brandstylegenerator.com',
}: WebApplicationJsonLdProps): React.ReactElement {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Brand Style Generator',
    url,
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web',
    browserRequirements: 'Requires JavaScript',
    description:
      'Free web app to design complete brand identities. Generate color palettes, choose fonts, preview on mockups, and export to CSS, Tailwind, or Figma tokens.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'OKLCH color palette generation',
      'WCAG accessibility checking',
      'Google Fonts pairing',
      'Live mockup previews',
      'CSS export',
      'Tailwind config export',
      'Figma tokens export',
      'PDF brand guide export',
      'Dark mode support',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

interface OrganizationJsonLdProps {
  url?: string
}

export function OrganizationJsonLd({
  url = 'https://brandstylegenerator.com',
}: OrganizationJsonLdProps): React.ReactElement {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Brand Style Generator',
    url,
    logo: `${url}/logo.png`,
    sameAs: [],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

interface HowToStep {
  name: string
  text: string
}

interface HowToJsonLdProps {
  name: string
  description: string
  steps: HowToStep[]
  totalTime?: string
}

export function HowToJsonLd({
  name,
  description,
  steps,
  totalTime = 'PT5M',
}: HowToJsonLdProps): React.ReactElement {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    totalTime,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[]
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps): React.ReactElement {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

interface FAQItem {
  question: string
  answer: string
}

interface FAQJsonLdProps {
  items: FAQItem[]
}

export function FAQJsonLd({ items }: FAQJsonLdProps): React.ReactElement {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
