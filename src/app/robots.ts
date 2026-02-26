import type { MetadataRoute } from 'next'

const BASE_URL: string = process.env['APP_URL'] ?? 'https://brandstylegenerator.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/projects/'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
