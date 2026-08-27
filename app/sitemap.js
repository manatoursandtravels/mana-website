// app/sitemap.js — Auto-generated sitemap for Next.js App Router
export default function sitemap() {
  const base = 'https://www.manatoursandtravels.com';
  const now = new Date().toISOString();

  const staticPages = [
    '', '/about', '/contact', '/faq', '/partner',
    '/used-cars', '/self-drive-kyc',
    '/terms', '/privacy', '/cancellation',
  ];

  const services = [
    'local-cabs', 'outstation-cabs', 'airport-transfers',
    'pilgrimage-tours', 'tour-packages', 'corporate-travel',
    'local-sightseeing', 'wedding-travel', 'self-drive',
  ];

  const routes = [
    'kadapa-tirupati-cab', 'kadapa-hyderabad-cab', 'kadapa-bangalore-cab',
    'kadapa-chennai-cab', 'kadapa-gandikota-tour', 'kadapa-srisailam-cab',
    'kadapa-belum-caves', 'kadapa-ooty-tour', 'kadapa-goa-tour',
    'proddatur-cab', 'pulivendula-cab', 'rayachoty-cab',
  ];


  return [
    ...staticPages.map(p => ({ url: `${base}${p}`, lastModified: now, changeFrequency: 'monthly', priority: p === '' ? 1.0 : 0.8 })),
    ...services.map(s => ({ url: `${base}/services/${s}`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 })),
    ...routes.map(r => ({ url: `${base}/routes/${r}`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 })),
  ];
}
