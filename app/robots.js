// app/robots.js — Dynamic robots.txt generator for Next.js App Router
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
    ],
    sitemap: 'https://www.manatoursandtravels.com/sitemap.xml',
    host: 'https://www.manatoursandtravels.com',
  };
}
