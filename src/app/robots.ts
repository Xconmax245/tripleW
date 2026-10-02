import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/admin/*'], // Prevent Google from indexing the admin dashboard
    },
    sitemap: 'https://triplew.shop/sitemap.xml',
  };
}
