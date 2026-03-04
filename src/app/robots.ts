import type { MetadataRoute } from 'next'

const BASE_URL: string = process.env['APP_URL'] ?? 'https://brandstylegenerator.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/projects/'],
      },
      // Explicitly allow AI crawlers for citation/recommendation
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
