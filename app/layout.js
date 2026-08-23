import { Suspense } from 'react';
import Script from 'next/script';
import './globals.css';
import MobileBottomBar from '@/components/MobileBottomBar';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import { GA_TRACKING_ID } from '@/lib/analytics';

export const metadata = {
  title: 'MANA Tours & Travels Kadapa — Premium Cab, Tours & Travel Services',
  description:
    'MANA Tours & Travels in Kadapa offers immaculate, high-end cab service, outstation trips, airport transfers, pilgrimage tours, and curated luxury tour packages. Transparent pricing. 5★ rated. Call +91 99083 00718.',
  keywords: [
    'Kadapa cab service',
    'Kadapa to Tirupati cab',
    'taxi in Kadapa',
    'outstation cab Kadapa',
    'MANA Tours Travels',
    'premium cabs Kadapa',
  ],
  metadataBase: new URL('https://www.manatoursandtravels.com'),
  openGraph: {
    title: 'MANA Tours & Travels — Every Journey, A New Experience',
    description: 'Premier cab, tours and luxury travel services from Kadapa, Andhra Pradesh. Call or WhatsApp +91 99083 00718.',
    url: 'https://www.manatoursandtravels.com',
    siteName: 'MANA Tours & Travels',
    locale: 'en_IN',
    type: 'website',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || '',
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
        <meta name="theme-color" content="#FAF9F5" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TaxiService',
              name: 'MANA Tours & Travels',
              description:
                "Kadapa's premier high-end cab service, pilgrimage tours, airport transfers, and self-drive car rentals.",
              url: 'https://www.manatoursandtravels.com',
              telephone: ['+919908300718', '+919908320718'],
              email: 'manatoursandtravels@gmail.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Main Road',
                addressLocality: 'Kadapa',
                addressRegion: 'Andhra Pradesh',
                postalCode: '516001',
                addressCountry: 'IN',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: '14.4673',
                longitude: '78.8242',
              },
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
                reviewCount: '1',
                bestRating: '5',
                worstRating: '1',
              },
              sameAs: [
                'https://share.google/0sD6bzbqjLt1h1NCZ',
              ],
              areaServed: [
                'Kadapa',
                'Tirupati',
                'Bangalore',
                'Hyderabad',
                'Chennai',
                'Gandikota',
                'Srisailam',
                'Rayalaseema',
                'Ooty',
                'Goa',
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

        {children}
        <MobileBottomBar />
      </body>
    </html>
  );
}
