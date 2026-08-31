export const metadata = {
  title: 'Attach Your Vehicle — Fleet Partner Program',
  description:
    'Own a commercial car in Kadapa? Partner with MANA Tours & Travels. Earn ₹35,000–₹55,000/month with 70% revenue share, verified bookings, and weekly UPI settlements. Call +91 99083 00718.',
  alternates: {
    canonical: '/partner',
  },
  openGraph: {
    title: 'Attach Your Vehicle — MANA Fleet Partner Program Kadapa',
    description: 'Earn consistent revenue by attaching your car to Kadapa\'s leading cab network. Transparent 70% revenue share.',
    url: 'https://www.manatoursandtravels.com/partner',
    siteName: 'MANA Tours & Travels',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/images/hero-car.jpg', width: 1200, height: 630, alt: 'Attach Your Vehicle to MANA Tours' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fleet Partner Program | MANA Tours Kadapa',
    description: 'Attach your car to MANA Tours & Travels and earn steady monthly income.',
    images: ['/images/hero-car.jpg'],
  },
};

export default function PartnerLayout({ children }) {
  return children;
}
