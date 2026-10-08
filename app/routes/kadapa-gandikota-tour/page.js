import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import BookingForm from '@/components/BookingForm';
import Link from 'next/link';
import styles from '../../services/service.module.css';
import { BUSINESS } from '@/lib/constants';

export const metadata = {
  title: 'Kadapa to Gandikota Tour Cab | Grand Canyon of India Day Trip — Call 24/7',
  description: 'Full-day Gandikota & Belum Caves tour from Kadapa. Private AC cab with experienced guide-driver. Best tour package rates. Call +91 99083 00718 for instant quote.',
  alternates: { canonical: '/routes/kadapa-gandikota-tour' },
  openGraph: {
    title: 'Kadapa to Gandikota Tour Cab | Day Trip Package | MANA Tours',
    description: 'Explore the Grand Canyon of India with private AC cab from Kadapa. Includes gorge viewpoint, Gandikota Fort, and Madhavaraya temple. Call +91 99083 00718.',
    url: 'https://www.manatoursandtravels.com/routes/kadapa-gandikota-tour',
    siteName: 'MANA Tours & Travels',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/images/gandikota.jpg', width: 1200, height: 630, alt: 'Kadapa to Gandikota Tour Cab' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kadapa to Gandikota Tour Cab | MANA Tours',
    description: 'Day trip to Gandikota Gorge from Kadapa in private AC car. Call +91 99083 00718.',
    images: ['/images/gandikota.jpg'],
  },
};

const tripSchema = {
  '@context': 'https://schema.org',
  '@type': 'TouristTrip',
  name: 'Kadapa to Gandikota & Belum Caves Day Tour',
  description: 'Private guided full-day sightseeing tour to Gandikota Fort (Grand Canyon of India) and Belum Caves from Kadapa. Call +91 99083 00718.',
  provider: { '@type': 'LocalBusiness', name: 'MANA Tours & Travels | Kadapa', telephone: '+919908300718' },
  touristType: { '@type': 'Audience', audienceType: 'Tourists, Nature lovers, History enthusiasts' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.manatoursandtravels.com' },
    { '@type': 'ListItem', position: 2, name: 'Routes', item: 'https://www.manatoursandtravels.com/routes' },
    { '@type': 'ListItem', position: 3, name: 'Gandikota Tour', item: 'https://www.manatoursandtravels.com/routes/kadapa-gandikota-tour' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How far is Gandikota from Kadapa?', acceptedAnswer: { '@type': 'Answer', text: 'Gandikota Fort is approximately 70 km from Kadapa, around 1.5 hours by road via Jammalamadugu.' } },
    { '@type': 'Question', name: 'What is included in the Gandikota day tour package?', acceptedAnswer: { '@type': 'Answer', text: 'MANA\'s Gandikota & Belum Caves tour includes private AC cab, driver, Gandikota Fort gorge viewpoints, Belum Caves visit, and sunset photography stops. Pickup and drop at your doorstep in Kadapa.' } },
    { '@type': 'Question', name: 'Is Gandikota called the Grand Canyon of India?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Gandikota Gorge in Kadapa district is popularly called the Grand Canyon of India due to its dramatic rocky cliffs carved by the Penna River.' } },
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
            <Link href="/">Home</Link> &rsaquo; Kadapa to Gandikota
          </div>
          <div className={styles.heroIcon}>🏔</div>
          <h1 className={styles.heroTitle}>Kadapa to Gandikota Tour Cab</h1>
          <p className={styles.heroSubtitle}>
            Comfortable AC cab from Kadapa to Gandikota &amp; Belum Caves. Experienced guide-chauffeur. Custom day tour packages.
          </p>
          <div className={styles.routeInfo}>
            <div className={styles.routeInfoItem}>
              <div className={styles.routeInfoValue}>~120 km</div>
              <div className={styles.routeInfoLabel}>Distance</div>
            </div>
            <div className={styles.routeInfoItem}>
              <div className={styles.routeInfoValue}>~2-3 hrs</div>
              <div className={styles.routeInfoLabel}>Drive Time</div>
            </div>
            <div className={styles.routeInfoItem}>
              <div className={styles.routeInfoValue}>Best Fare</div>
              <div className={styles.routeInfoLabel}>Tour Package</div>
            </div>
          </div>
          <div className={styles.heroCtas} style={{ marginTop: '24px' }}>
            <a href={`tel:${BUSINESS.phone.pavan}`} className="btn btn--primary btn--lg">📞 Call for Tour Package: {BUSINESS.phone.pavanDisplay}</a>
            <a href="#book" className="btn btn--white btn--lg">📅 Book Online</a>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.contentGrid}>
            <div className={styles.mainCol}>
              <h2>Kadapa to Gandikota Tour Packages &amp; Fares</h2>
              <div className="divider divider--left" style={{ marginBottom: '20px' }} />
              <table className="rate-table">
                <thead><tr><th>Trip Type</th><th>Fare Quote</th><th>Includes</th></tr></thead>
                <tbody>
                  <tr><td>Gandikota Day Trip</td><td className="price"><a href={`tel:${BUSINESS.phone.pavan}`} style={{color:'inherit',textDecoration:'none'}}>📞 Call for Quote</a></td><td>Driver + AC + Fuel + Gorge Wait</td></tr>
                  <tr><td>Gandikota + Belum Caves Combo</td><td className="price"><a href={`tel:${BUSINESS.phone.pavan}`} style={{color:'inherit',textDecoration:'none'}}>📞 Call for Quote</a></td><td>Full Day Tour + 2 Attractions</td></tr>
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
                Toll and parking at actuals. Sedans and 7-Seater MPVs (Ertiga/Innova Crysta) available.
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
