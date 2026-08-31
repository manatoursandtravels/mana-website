import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import BookingForm from '@/components/BookingForm';
import Link from 'next/link';
import styles from '../../services/service.module.css';
import { BUSINESS } from '@/lib/constants';

export const metadata = {
  title: 'Cab Service in Rayachoty | Local & Outstation Taxi',
  description:
    'Book a cab from Rayachoty — local taxi and outstation cabs to Kadapa, Tirupati, Hyderabad, Bangalore & airport drops. Call +91 99083 00718.',
  alternates: { canonical: '/routes/rayachoty-cab' },
  openGraph: {
    title: 'Cab Service in Rayachoty | Local & Outstation Taxi | MANA Tours',
    description: 'Affordable and reliable local & outstation taxi services in Rayachoty (Annamayya District) with 24/7 support.',
    url: 'https://www.manatoursandtravels.com/routes/rayachoty-cab',
    siteName: 'MANA Tours & Travels',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/images/hero-car.jpg', width: 1200, height: 630, alt: 'Cab Service in Rayachoty' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cab Service in Rayachoty | MANA Tours',
    description: 'Local and outstation taxi service in Rayachoty.',
    images: ['/images/hero-car.jpg'],
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Local & Outstation Cab Service',
  name: 'Cab Service in Rayachoty — MANA Tours & Travels',
  description: 'Local taxi and outstation cab service in Rayachoty, Kadapa district, Andhra Pradesh. Serving Kadapa, Tirupati, Hyderabad, Bangalore.',
  provider: {
    '@type': 'LocalBusiness',
    name: 'MANA Tours & Travels',
    telephone: '+919908300718',
    address: { '@type': 'PostalAddress', addressLocality: 'Kadapa', addressRegion: 'Andhra Pradesh', postalCode: '516001', addressCountry: 'IN' },
    url: 'https://www.manatoursandtravels.com',
  },
  areaServed: { '@type': 'City', name: 'Rayachoty' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Does MANA Tours & Travels provide cabs in Rayachoty?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! MANA Tours & Travels serves Rayachoty for local cab pickups and outstation bookings to Kadapa, Tirupati, Hyderabad, Bangalore, and airports. Call +91 99083 00718.' } },
    { '@type': 'Question', name: 'How far is Rayachoty from Kadapa?', acceptedAnswer: { '@type': 'Answer', text: 'Rayachoty is approximately 100 km from Kadapa, around 2 hours by road.' } },
    { '@type': 'Question', name: 'What is the cab fare from Rayachoty to Tirupati?', acceptedAnswer: { '@type': 'Answer', text: 'A cab from Rayachoty to Tirupati (approx 180 km) starts at ₹1,999 one way in an AC sedan. Call MANA Tours at +91 99083 00718 for exact pricing.' } },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.manatoursandtravels.com' },
    { '@type': 'ListItem', position: 2, name: 'Routes', item: 'https://www.manatoursandtravels.com/routes' },
    { '@type': 'ListItem', position: 3, name: 'Rayachoty Cab Service', item: 'https://www.manatoursandtravels.com/routes/rayachoty-cab' },
  ],
};

const popularRoutes = [
  { label: 'Rayachoty → Kadapa', km: '100 km', price: '₹1,299', time: '2 hrs' },
  { label: 'Rayachoty → Tirupati', km: '180 km', price: '₹1,999', time: '3.5 hrs' },
  { label: 'Rayachoty → Hyderabad', km: '450 km', price: '₹5,999', time: '8 hrs' },
  { label: 'Rayachoty → Bangalore', km: '250 km', price: '₹3,999', time: '5 hrs' },
  { label: 'Rayachoty → Chennai', km: '290 km', price: '₹4,499', time: '5.5 hrs' },
];

export default function RayachotypePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <div className={styles.serviceHero}>
        <div className="container">
          <div className={styles.heroBreadcrumb}><Link href="/">Home</Link> › Routes › Rayachoty Cab Service</div>
          <div className={styles.heroIcon}>🚕</div>
          <h1 className={styles.heroTitle}>Cab Service in Rayachoty, Andhra Pradesh</h1>
          <p className={styles.heroSubtitle}>
            Trusted local & outstation cab from Rayachoty. Clean AC cars, transparent pricing, 24/7 WhatsApp booking. Serving Kadapa, Tirupati, Hyderabad, Bangalore & Chennai.
          </p>
          <div className={styles.routeInfo}>
            <div className={styles.routeInfoItem}><div className={styles.routeInfoValue}>24/7</div><div className={styles.routeInfoLabel}>Available</div></div>
            <div className={styles.routeInfoItem}><div className={styles.routeInfoValue}>5.0 ★</div><div className={styles.routeInfoLabel}>Google Rated</div></div>
            <div className={styles.routeInfoItem}><div className={styles.routeInfoValue}>₹0</div><div className={styles.routeInfoLabel}>Hidden Charges</div></div>
            <div className={styles.routeInfoItem}><div className={styles.routeInfoValue}>AC</div><div className={styles.routeInfoLabel}>Clean Vehicles</div></div>
          </div>
          <div className={styles.heroCtas} style={{ marginTop: '24px' }}>
            <a href="#book" className="btn btn--primary btn--lg">📅 Book Rayachoty Cab</a>
            <a href={`tel:${BUSINESS.phone.pavan}`} className="btn btn--white btn--lg">📞 Call Now</a>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.contentGrid}>
            <div className={styles.mainCol}>
              <div className={styles.priceSection}>
                <h2>Cab Fares from Rayachoty</h2>
                <div className="divider divider--left" style={{ marginBottom: '20px' }} />
                <table className="rate-table">
                  <thead><tr><th>Route</th><th>Distance</th><th>Price (One Way)</th><th>Drive Time</th></tr></thead>
                  <tbody>
                    {popularRoutes.map((r, i) => (
                      <tr key={i}><td>{r.label}</td><td>{r.km}</td><td className="price">{r.price}</td><td>{r.time}</td></tr>
                    ))}
                  </tbody>
                </table>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '12px' }}>Toll at actual. All prices for AC sedan (Toyota Etios / equivalent).</p>
              </div>

              <div style={{ marginTop: '32px' }}>
                <h3>Frequently Asked Questions</h3>
                <div className={styles.faqList}>
                  {[
                    { q: 'Does MANA Tours & Travels provide cabs in Rayachoty?', a: 'Yes! MANA Tours & Travels serves Rayachoty for local cab pickups and outstation bookings to Kadapa, Tirupati, Hyderabad, Bangalore, and airports. Call +91 99083 00718.' },
                    { q: 'How far is Rayachoty from Kadapa?', a: 'Rayachoty is approximately 100 km from Kadapa, around 2 hours by road.' },
                    { q: 'What is the cab fare from Rayachoty to Tirupati?', a: 'A cab from Rayachoty to Tirupati (approx 180 km) starts at ₹1,999 one way in an AC sedan.' },
                  ].map((f, i) => (
                    <div key={i} className={styles.faqItem}>
                      <div className={styles.faqQ}>{f.q}</div>
                      <div className={styles.faqA}>{f.a}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.sideCol}>
              <div id="book" className={styles.stickyForm}><BookingForm compact /></div>
              <div className={styles.contactCard}>
                <p>Need quick booking?</p>
                <a href={`tel:${BUSINESS.phone.pavan}`} className="btn btn--primary" style={{ width: '100%', justifyContent: 'center' }}>📞 {BUSINESS.phone.pavanDisplay}</a>
                <a href={`https://wa.me/${BUSINESS.whatsapp}`} target="_blank" rel="noopener noreferrer" className={`btn ${styles.waBtn}`} style={{ width: '100%', justifyContent: 'center' }}>💬 WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer /><WhatsAppButton />
    </>
  );
}
