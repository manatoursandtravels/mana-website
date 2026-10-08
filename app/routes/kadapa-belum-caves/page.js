import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import BookingForm from '@/components/BookingForm';
import Link from 'next/link';
import styles from '../../services/service.module.css';
import { BUSINESS } from '@/lib/constants';

export const metadata = {
  title: 'Kadapa to Belum Caves Cab | Day Trip Tour Package — Call 24/7',
  description: 'Book an AC cab from Kadapa to Belum Caves (longest cave network in plains). Full-day tour package. Call +91 99083 00718 for instant quote.',
  alternates: { canonical: '/routes/kadapa-belum-caves' },
  openGraph: {
    title: 'Kadapa to Belum Caves Cab | Day Trip Tour | MANA Tours',
    description: 'Explore the natural underground limestone formations of Belum Caves with private AC cab from Kadapa. Call +91 99083 00718.',
    url: 'https://www.manatoursandtravels.com/routes/kadapa-belum-caves',
    siteName: 'MANA Tours & Travels',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/images/hero-car.jpg', width: 1200, height: 630, alt: 'Kadapa to Belum Caves Cab' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kadapa to Belum Caves Cab | MANA Tours',
    description: 'Day trip to Belum Caves from Kadapa in AC comfort. Call +91 99083 00718.',
    images: ['/images/hero-car.jpg'],
  },
};

const tripSchema = {
  '@context': 'https://schema.org',
  '@type': 'TouristTrip',
  name: 'Kadapa to Belum Caves Day Tour',
  description: 'Day trip to Belum Caves from Kadapa — the longest natural cave in India. Call +91 99083 00718.',
  provider: { '@type': 'LocalBusiness', name: 'MANA Tours & Travels | Kadapa', telephone: '+919908300718' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.manatoursandtravels.com' },
    { '@type': 'ListItem', position: 2, name: 'Routes', item: 'https://www.manatoursandtravels.com/routes' },
    { '@type': 'ListItem', position: 3, name: 'Belum Caves', item: 'https://www.manatoursandtravels.com/routes/kadapa-belum-caves' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How far is Belum Caves from Kadapa?', acceptedAnswer: { '@type': 'Answer', text: 'Belum Caves are approximately 110 km from Kadapa, around 2 hours by road via Jammalamadugu.' } },
    { '@type': 'Question', name: 'What is the cab fare from Kadapa to Belum Caves?', acceptedAnswer: { '@type': 'Answer', text: 'MANA Tours offers customized day trip packages for Sedans and Innova Crystas. Call or WhatsApp +91 99083 00718 for today\'s lowest instant quote.' } },
    { '@type': 'Question', name: 'Are Belum Caves the longest cave in India?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Belum Caves in Kurnool district is the second longest natural cave in the Indian subcontinent (3,229 m) and the longest cave in India open to tourists.' } },
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
            <Link href="/">Home</Link> &rsaquo; Kadapa to Belum Caves
          </div>
          <div className={styles.heroIcon}>⛰</div>
          <h1 className={styles.heroTitle}>Kadapa to Belum Caves Cab</h1>
          <p className={styles.heroSubtitle}>
            Comfortable AC cab from Kadapa to Belum Caves. Transparent pricing. Experienced driver. Available 24/7.
          </p>
          <div className={styles.routeInfo}>
            <div className={styles.routeInfoItem}>
              <div className={styles.routeInfoValue}>~100 km</div>
              <div className={styles.routeInfoLabel}>Distance</div>
            </div>
            <div className={styles.routeInfoItem}>
              <div className={styles.routeInfoValue}>~2 hrs</div>
              <div className={styles.routeInfoLabel}>Drive Time</div>
            </div>
            <div className={styles.routeInfoItem}>
              <div className={styles.routeInfoValue}>Best Fare</div>
              <div className={styles.routeInfoLabel}>Day Tour</div>
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
              <h2>Kadapa to Belum Caves Cab Fare &amp; Packages</h2>
              <div className="divider divider--left" style={{ marginBottom: '20px' }} />
              <table className="rate-table">
                <thead><tr><th>Trip Type</th><th>Fare Quote</th><th>Includes</th></tr></thead>
                <tbody>
                  <tr><td>One Way / Day Trip</td><td className="price"><a href={`tel:${BUSINESS.phone.pavan}`} style={{color:'inherit',textDecoration:'none'}}>📞 Call for Quote</a></td><td>Driver + AC + Fuel</td></tr>
                  <tr><td>Round Trip (Full Day)</td><td className="price"><a href={`tel:${BUSINESS.phone.pavan}`} style={{color:'inherit',textDecoration:'none'}}>📞 Call for Quote</a></td><td>Driver + AC + Fuel + Wait</td></tr>
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
