import { getSiteInfo } from '@/lib/config'
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const siteInfo = getSiteInfo()
  const baseUrl = siteInfo.url
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/', '/private/'],
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 0,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}