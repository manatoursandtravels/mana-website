import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import BookingForm from '@/components/BookingForm';
import Link from 'next/link';
import styles from '../../services/service.module.css';
import { BUSINESS } from '@/lib/constants';

export const metadata = {
  title: 'Kadapa to Bangalore Cab | Airport Drops & City Taxi — Call 24/7',
  description: 'Book a clean AC cab from Kadapa to Bangalore (BLR Airport & City). Best fare guarantee, experienced chauffeur, 24/7 available. Call +91 99083 00718 for instant quote.',
  alternates: { canonical: '/routes/kadapa-bangalore-cab' },
  openGraph: {
    title: 'Kadapa to Bangalore Cab | Airport Drops & City Taxi | MANA Tours',
    description: 'Direct highway cab from Kadapa to Bangalore City & Kempegowda Airport (BLR). Transparent pricing, sanitized AC vehicles. Call +91 99083 00718.',
    url: 'https://www.manatoursandtravels.com/routes/kadapa-bangalore-cab',
    siteName: 'MANA Tours & Travels',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/images/hero-car.jpg', width: 1200, height: 630, alt: 'Kadapa to Bangalore Cab' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kadapa to Bangalore Cab | MANA Tours',
    description: 'Direct AC taxi from Kadapa to Bangalore & KIAL Airport. Call +91 99083 00718.',
    images: ['/images/hero-car.jpg'],
  },
};

const tripSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Intercity Cab Service',
  name: 'Kadapa to Bangalore Cab Service',
  description: 'Comfortable AC cab from Kadapa to Bangalore. Transparent pricing. Experienced driver. Available 24/7. Call +91 99083 00718.',
  provider: {
    '@type': 'LocalBusiness',
    name: 'MANA Tours & Travels | Kadapa',
    telephone: '+919908300718',
    address: { '@type': 'PostalAddress', addressLocality: 'Kadapa', addressRegion: 'Andhra Pradesh', postalCode: '516001', addressCountry: 'IN' },
  },
  areaServed: [{ '@type': 'City', name: 'Kadapa' }, { '@type': 'City', name: 'Bangalore' }],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.manatoursandtravels.com' },
    { '@type': 'ListItem', position: 2, name: 'Routes', item: 'https://www.manatoursandtravels.com/routes' },
    { '@type': 'ListItem', position: 3, name: 'Kadapa to Bangalore', item: 'https://www.manatoursandtravels.com/routes/kadapa-bangalore-cab' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How far is Kadapa from Bangalore?', acceptedAnswer: { '@type': 'Answer', text: 'Kadapa to Bangalore is approximately 330 km, which takes around 5–6 hours by road via Rayachoty & Madanapalle.' } },
    { '@type': 'Question', name: 'What is the cab fare from Kadapa to Bangalore?', acceptedAnswer: { '@type': 'Answer', text: 'MANA Tours offers the most competitive rates in Rayalaseema for Sedans and Innova MPVs. Call or WhatsApp +91 99083 00718 for today\'s lowest instant fare quote.' } },
    { '@type': 'Question', name: 'Does MANA provide Bangalore airport (BLR) cab from Kadapa?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! MANA provides dedicated Kempegowda International Airport (BLR) drops with on-time flight arrival guarantee. Call 24/7.' } },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tripSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <div className={styles.serviceHero}>
        <div className="container">
          <div className={styles.heroBreadcrumb}>
            <Link href="/">Home</Link> &rsaquo; Kadapa to Bangalore
          </div>
          <div className={styles.heroIcon}>🏙</div>
          <h1 className={styles.heroTitle}>Kadapa to Bangalore Cab</h1>
          <p className={styles.heroSubtitle}>
            Comfortable AC cab from Kadapa to Bangalore City &amp; KIAL Airport. Experienced drivers. On-time flight drops. Available 24/7.
          </p>
          <div className={styles.routeInfo}>
            <div className={styles.routeInfoItem}>
              <div className={styles.routeInfoValue}>~330 km</div>
              <div className={styles.routeInfoLabel}>Distance</div>
            </div>
            <div className={styles.routeInfoItem}>
              <div className={styles.routeInfoValue}>~5-6 hrs</div>
              <div className={styles.routeInfoLabel}>Drive Time</div>
            </div>
            <div className={styles.routeInfoItem}>
              <div className={styles.routeInfoValue}>Best Fare</div>
              <div className={styles.routeInfoLabel}>Instant Quote</div>
            </div>
          </div>
          <div className={styles.heroCtas} style={{ marginTop: '24px' }}>
            <a href={`tel:${BUSINESS.phone.pavan}`} className="btn btn--primary btn--lg">📞 Call for Best Fare: {BUSINESS.phone.pavanDisplay}</a>
            <a href="#book" className="btn btn--white btn--lg">📅 Book Online</a>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.contentGrid}>
            <div className={styles.mainCol}>
              <h2>Kadapa to Bangalore Cab Fare &amp; Packages</h2>
              <div className="divider divider--left" style={{ marginBottom: '20px' }} />
              <table className="rate-table">
                <thead><tr><th>Trip Type</th><th>Fare Quote</th><th>Includes</th></tr></thead>
                <tbody>
                  <tr><td>One Way / Airport Drop</td><td className="price"><a href={`tel:${BUSINESS.phone.pavan}`} style={{color:'inherit',textDecoration:'none'}}>📞 Call for Quote</a></td><td>Driver + AC + Fuel</td></tr>
                  <tr><td>Round Trip (Return)</td><td className="price"><a href={`tel:${BUSINESS.phone.pavan}`} style={{color:'inherit',textDecoration:'none'}}>📞 Call for Quote</a></td><td>Driver + AC + Fuel + Wait</td></tr>
                </tbody>
              </table>
              <div style={{marginTop:'16px'}}>
                <a
                  href={`tel:${BUSINESS.phone.pavan}`}
                  className="btn btn--primary"
                  style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'12px 20px',fontSize:'0.95rem'}}
                >
                  <span>📞 Call Pavan for Today&apos;s Best Fare: {BUSINESS.phone.pavanDisplay}</span>
                </a>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '12px' }}>
                Toll and parking at actuals. Sedans (Etios/Dzire) and 7-Seater MPVs (Ertiga/Innova Crysta) available.
              </p>
            </div>
            <div className={styles.sideCol}>
              <div id="book" className={styles.stickyForm}><BookingForm compact /></div>
              <div className={styles.contactCard}>
                <p>Need to book or have a question?</p>
                <a href={`tel:${BUSINESS.phone.pavan}`} className="btn btn--primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Call {BUSINESS.phone.pavanDisplay}
                </a>
                <a href={`https://wa.me/${BUSINESS.whatsapp}`} target="_blank" rel="noopener noreferrer" className={`btn ${styles.waBtn}`} style={{ width: '100%', justifyContent: 'center' }}>
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer /><WhatsAppButton />
    </>
  );
}
