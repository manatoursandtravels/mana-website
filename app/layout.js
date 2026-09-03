import { Suspense } from 'react';
import Script from 'next/script';
import './globals.css';
import MobileBottomBar from '@/components/MobileBottomBar';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';
import PWAInstallBanner from '@/components/PWAInstallBanner';
import AiVoiceBookingAgent from '@/components/AiVoiceBookingAgent';
import { GA_TRACKING_ID } from '@/lib/analytics';

export const viewport = {
  themeColor: '#0B1B3D',
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: {
    default: 'MANA Tours & Travels Kadapa — #1 Cab Service, Self-Drive & Taxi in Kadapa',
    template: '%s | MANA Tours & Travels Kadapa',
  },
  description:
    'MANA Tours & Travels in Kadapa is your #1 trusted travel partner for sacred Tirupati pilgrimage tours, self-drive car rentals from ₹1,499/day, fixed airport transfers, and outstation cabs. 5.0★ Google rated. Call +91 99083 00718.',
  metadataBase: new URL('https://www.manatoursandtravels.com'),
  alternates: {
    canonical: './',
  },
  other: {
    'geo.region': 'IN-AP',
    'geo.placename': 'Kadapa, Andhra Pradesh',
    'geo.position': '14.4601018;78.6723772',
    'ICBM': '14.4601018, 78.6723772',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'MANA Tours & Travels Kadapa',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'MANA Tours & Travels Kadapa — Every Journey, A New Experience',
    description: 'Premier cab, self-drive rentals and pilgrimage travel from Kadapa, Andhra Pradesh. 5.0★ Google Rated. Call +91 99083 00718.',
    url: 'https://www.manatoursandtravels.com',
    siteName: 'MANA Tours & Travels Kadapa',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/hero-car.jpg',
        width: 1200,
        height: 630,
        alt: 'MANA Tours & Travels Kadapa Premium Luxury Cab Fleet',
      },
    ],
  },
  verification: {
    google: 'Rw-78cCUz14-PwTuXtjzzk2G0bN4S47gzg82ES7JnTI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MANA Tours & Travels Kadapa — Every Journey, A New Experience',
    description: 'Premier cab, self-drive rentals and pilgrimage travel from Kadapa, Andhra Pradesh. 5.0★ Google Rated. Call +91 99083 00718.',
    images: ['/images/hero-car.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,500&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="MANA Tours & Travels Kadapa" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': ['TaxiService', 'AutoRental', 'TravelAgency', 'LocalBusiness'],
                  '@id': 'https://www.manatoursandtravels.com/#business',
                  name: 'MANA Tours & Travels Kadapa',
                  alternateName: [
                    'MANA Tours and Travels Kadapa',
                    'MANA Tours & Travels',
                    'MANA Travels',
                    'MANA Cabs Kadapa',
                  ],
                  description:
                    'Kadapa\'s #1 premier car rental, self-drive, and taxi service in Rayalaseema. Sacred Tirupati pilgrimage packages, Bangalore & Hyderabad airport drops, Gandikota canyon tours, and self-drive cars from ₹1,499/day.',
                  url: 'https://www.manatoursandtravels.com',
                  telephone: '+919908300718',
                  email: 'contact@manatoursandtravels.com',
                  priceRange: '₹₹',
                  currenciesAccepted: 'INR',
                  paymentAccepted: 'Cash, UPI, Credit Card, Net Banking',
                  image: 'https://www.manatoursandtravels.com/icons/icon-512x512.png',
                  logo: 'https://www.manatoursandtravels.com/icons/icon-512x512.png',
                  address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'Main Road, Near Seven Roads Junction',
                    addressLocality: 'Kadapa',
                    addressRegion: 'Andhra Pradesh',
                    postalCode: '516001',
                    addressCountry: 'IN',
                  },
                  geo: {
                    '@type': 'GeoCoordinates',
                    latitude: '14.4601018',
                    longitude: '78.6723772',
                  },
                  hasMap:
                    'https://www.google.com/maps/place/MANA+Tours+%26+Travels+%7C+Kadapa/@14.4753307,78.8006914,14.5z/data=!4m14!1m7!3m6!1s0x4655d0c639a1eecf:0xb16ecf98c511b010!2sMANA+Tours+%26+Travels+%7C+Kadapa!8m2!3d14.4601018!4d78.6723772',
                  openingHoursSpecification: {
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: [
                      'Monday',
                      'Tuesday',
                      'Wednesday',
                      'Thursday',
                      'Friday',
                      'Saturday',
                      'Sunday',
                    ],
                    opens: '00:00',
                    closes: '23:59',
                  },
                  aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: '5.0',
                    reviewCount: '50',
                    bestRating: '5',
                    worstRating: '1',
                  },
                  review: [
                    {
                      '@type': 'Review',
                      author: { '@type': 'Person', name: 'Jairo Straten' },
                      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
                      reviewBody:
                        'We booked car from Kadapa to Ahobilam. Car was clean and the journey was comfortable. Driver was friendly and everything went smoothly. reasonable pricing.',
                      publisher: { '@type': 'Organization', name: 'Google Business Profile' },
                    },
                  ],
                  sameAs: [
                    'https://share.google/0sD6bzbqjLt1h1NCZ',
                    'https://www.youtube.com/@ManaToursTravels',
                    'https://www.indiaonline.in/kadapa/business/mana-tours-and-travels-109381',
                    'https://wa.me/919908300718',
                    'https://www.manatoursandtravels.com',
                  ],
                  areaServed: [
                    { '@type': 'City', name: 'Kadapa' },
                    { '@type': 'City', name: 'Tirupati' },
                    { '@type': 'City', name: 'Bangalore' },
                    { '@type': 'City', name: 'Hyderabad' },
                    { '@type': 'City', name: 'Chennai' },
                    { '@type': 'City', name: 'Gandikota' },
                    { '@type': 'City', name: 'Srisailam' },
                    { '@type': 'City', name: 'Ahobilam' },
                    { '@type': 'City', name: 'Proddatur' },
                    { '@type': 'City', name: 'Pulivendula' },
                    { '@type': 'City', name: 'Rayachoty' },
                    { '@type': 'City', name: 'Badvel' },
                    { '@type': 'City', name: 'Jammalamadugu' },
                    { '@type': 'City', name: 'Rajampet' },
                  ],
                  hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'MANA Travel Services & Tariffs',
                    itemListElement: [
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Kadapa to Tirupati Temple Darshan Cab',
                          description: 'Round trip sacred pilgrimage tour with clean AC car and experienced chauffeur.',
                        },
                        price: '2099',
                        priceCurrency: 'INR',
                      },
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Premium Self-Drive Car Rental Kadapa',
                          description: 'Sanitized self-drive cars in Kadapa from ₹1,499/day with FASTag and zero hidden charges.',
                        },
                        price: '1499',
                        priceCurrency: 'INR',
                      },
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Kadapa to Bangalore Airport Fixed Drop',
                          description: 'Fixed fare on-time airport transfer from Kadapa to Kempegowda International Airport (BLR).',
                        },
                        price: '5499',
                        priceCurrency: 'INR',
                      },
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Gandikota Grand Canyon & Belum Caves Day Tour',
                          description: 'Private guided day tour to Gandikota fort and Belum Caves from Kadapa.',
                        },
                        price: '2799',
                        priceCurrency: 'INR',
                      },
                    ],
                  },
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://www.manatoursandtravels.com/#website',
                  url: 'https://www.manatoursandtravels.com',
                  name: 'MANA Tours & Travels Kadapa',
                  alternateName: [
                    'MANA Tours & Travels',
                    'MANA Travels Kadapa',
                    'MANA Travels',
                    'MANA Cabs Kadapa',
                  ],
                  description: 'Kadapa\'s #1 cab, self-drive & pilgrimage travel service in Rayalaseema, Andhra Pradesh.',
                  publisher: { '@id': 'https://www.manatoursandtravels.com/#business' },
                  potentialAction: {
                    '@type': 'SearchAction',
                    target: {
                      '@type': 'EntryPoint',
                      urlTemplate: 'https://www.manatoursandtravels.com/?q={search_term_string}',
                    },
                    'query-input': 'required name=search_term_string',
                  },
                },
                {
                  '@type': 'Organization',
                  '@id': 'https://www.manatoursandtravels.com/#organization',
                  name: 'MANA Tours & Travels Kadapa',
                  alternateName: [
                    'MANA Tours & Travels',
                    'MANA Travels',
                    'MANA Travels Kadapa',
                  ],
                  url: 'https://www.manatoursandtravels.com',
                  logo: {
                    '@type': 'ImageObject',
                    url: 'https://www.manatoursandtravels.com/icons/icon-512x512.png',
                    width: 512,
                    height: 512,
                  },
                  contactPoint: [
                    {
                      '@type': 'ContactPoint',
                      telephone: '+91-99083-00718',
                      contactType: 'customer service',
                      areaServed: 'IN',
                      availableLanguage: ['Telugu', 'English', 'Hindi'],
                    },
                  ],
                  sameAs: [
                    'https://share.google/0sD6bzbqjLt1h1NCZ',
                    'https://www.youtube.com/@ManaToursTravels',
                    'https://www.indiaonline.in/kadapa/business/mana-tours-and-travels-109381',
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        {/* Google Analytics 4 Script */}
        {GA_TRACKING_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <Script
              id="google-analytics-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_TRACKING_ID}', {
                    page_path: window.location.pathname,
                    send_page_view: true
                  });
                `,
              }}
            />
          </>
        )}

        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>

        <ServiceWorkerRegister />
        <PWAInstallBanner />
        <AiVoiceBookingAgent />

        {children}
        <MobileBottomBar />
      </body>
    </html>
  );
}
