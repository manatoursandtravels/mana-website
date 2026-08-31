export const metadata = {
  title: 'Certified Used Cars for Sale in Kadapa | 150-Point Inspected',
  description:
    'Buy certified second-hand cars in Kadapa with MANA 150-point inspection, 6-month warranty, zero RC transfer charges, and instant EMI financing options. Call +91 99083 00718.',
  alternates: {
    canonical: '/used-cars',
  },
  openGraph: {
    title: 'Certified Used Cars in Kadapa | MANA Certified Pre-Owned',
    description: 'Explore certified pre-owned cars in Kadapa with 150-point inspection, clear title, and doorstep test drives.',
    url: 'https://www.manatoursandtravels.com/used-cars',
    siteName: 'MANA Tours & Travels',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/images/hero-car.jpg', width: 1200, height: 630, alt: 'MANA Certified Used Cars Kadapa' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Certified Used Cars in Kadapa | MANA Tours',
    description: 'Verified second-hand cars for sale in Kadapa with 150-point inspection.',
    images: ['/images/hero-car.jpg'],
  },
};

export default function UsedCarsLayout({ children }) {
  return children;
}
