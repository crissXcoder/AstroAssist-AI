import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/', // Protegemos las rutas API del indexado basura
    },
    sitemap: 'https://astroassist.vercel.app/sitemap.xml',
  }
}
