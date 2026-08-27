import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import BookingForm from '@/components/BookingForm';
import Link from 'next/link';
import styles from '../../services/service.module.css';
import { BUSINESS } from '@/lib/constants';

export const metadata = {
  title: 'Kadapa to Belum Caves Cab | Longest Cave in India | MANA Tours',
  description: 'Book a cab from Kadapa to Belum Caves (longest cave in India). Full-day tour starting ₹1,499. MANA Tours & Travels Kadapa. Call +91 99083 00718.',
  keywords: [
    'Kadapa to Belum Caves cab',
    'Belum Caves tour from Kadapa',
    'Belum Caves day trip Kadapa',
    'Kadapa sightseeing Belum Caves',
    'longest cave India tour Kadapa',
  ],
  alternates: { canonical: 'https://www.manatoursandtravels.com/routes/kadapa-belum-caves' },
};

const tripSchema = {
  '@context': 'https://schema.org',
  '@type': 'TouristTrip',
  name: 'Kadapa to Belum Caves Day Tour',
  description: 'Day trip to Belum Caves from Kadapa — the longest natural cave in India.',
  provider: { '@type': 'LocalBusiness', name: 'MANA Tours & Travels', telephone: '+919908300718' },
  offers: [{ '@type': 'Offer', name: 'Day Tour', price: '1499', priceCurrency: 'INR' }],
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
    { '@type': 'Question', name: 'How far is Belum Caves from Kadapa?', acceptedAnswer: { '@type': 'Answer', text: 'Belum Caves are approximately 130 km from Kadapa, around 2.5 hours by road.' } },
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
              <div className={styles.routeInfoValue}>Rs.2,499</div>
              <div className={styles.routeInfoLabel}>Fare</div>
            </div>
          </div>
          <div className={styles.heroCtas} style={{ marginTop: '24px' }}>
            <a href="#book" className="btn btn--primary btn--lg">Book This Cab</a>
            <a href={`tel:${BUSINESS.phone.pavan}`} className="btn btn--white btn--lg">Call Now</a>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.contentGrid}>
            <div className={styles.mainCol}>
              <h2>Kadapa to Belum Caves Cab Fare</h2>
              <div className="divider divider--left" style={{ marginBottom: '20px' }} />
              <table className="rate-table">
                <thead><tr><th>Trip Type</th><th>Price</th><th>Includes</th></tr></thead>
                <tbody>
                  <tr><td>One Way / Day Trip</td><td className="price">Rs.2,499</td><td>Driver + AC + Fuel</td></tr>
                  <tr><td>Round Trip</td><td className="price">Rs.2,499</td><td>Driver + AC + Fuel + Wait</td></tr>
                </tbody>
              </table>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '12px' }}>
                Toll and parking at actual, paid by customer. All prices for AC sedan.
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
