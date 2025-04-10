import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/', 
        '/_next/',
        '/static/',
        '/scripts/',
      ],
    },
    sitemap: 'https://sleepcalc.net/sitemap.xml',
    host: 'https://sleepcalc.net',
  };
} 