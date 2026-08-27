import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import BookingForm from '@/components/BookingForm';
import Link from 'next/link';
import styles from '../../services/service.module.css';
import { BUSINESS } from '@/lib/constants';

export const metadata = {
  title: 'Kadapa to Chennai Cab | ₹6,499 One Way | MANA Tours & Travels',
  description: 'Book a cab from Kadapa to Chennai (Central / Airport) from ₹6,499 one way. AC sedan, experienced driver, 24/7 available. MANA Tours & Travels Kadapa. Call +91 99083 00718.',
  keywords: [
    'Kadapa to Chennai cab',
    'Kadapa Chennai taxi',
    'Kadapa to Chennai cab fare',
    'Kadapa to Chennai airport taxi',
    'Chennai cab from Kadapa',
    'Kadapa outstation cab Chennai',
  ],
  alternates: { canonical: 'https://www.manatoursandtravels.com/routes/kadapa-chennai-cab' },
};

const tripSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Intercity Cab Service',
  name: 'Kadapa to Chennai Cab Service',
  description: 'Comfortable AC cab from Kadapa to Chennai. Transparent pricing. Experienced driver. Available 24/7.',
  provider: { '@type': 'LocalBusiness', name: 'MANA Tours & Travels', telephone: '+919908300718' },
  offers: [{ '@type': 'Offer', name: 'One Way Drop', price: '6499', priceCurrency: 'INR' }],
  areaServed: [{ '@type': 'City', name: 'Kadapa' }, { '@type': 'City', name: 'Chennai' }],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.manatoursandtravels.com' },
    { '@type': 'ListItem', position: 2, name: 'Routes', item: 'https://www.manatoursandtravels.com/routes' },
    { '@type': 'ListItem', position: 3, name: 'Kadapa to Chennai', item: 'https://www.manatoursandtravels.com/routes/kadapa-chennai-cab' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How far is Kadapa from Chennai?', acceptedAnswer: { '@type': 'Answer', text: 'Kadapa to Chennai is approximately 430 km, which takes around 7–8 hours by road via NH716.' } },
    { '@type': 'Question', name: 'What is the cab fare from Kadapa to Chennai?', acceptedAnswer: { '@type': 'Answer', text: 'MANA Tours charges ₹6,499 for one way in an AC sedan. Toll is extra at actual.' } },
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
            <Link href="/">Home</Link> &rsaquo; Kadapa to Chennai
          </div>
          <div className={styles.heroIcon}>🌊</div>
          <h1 className={styles.heroTitle}>Kadapa to Chennai Cab</h1>
          <p className={styles.heroSubtitle}>
            Comfortable AC cab from Kadapa to Chennai. Transparent pricing. Experienced driver. Available 24/7.
          </p>
          <div className={styles.routeInfo}>
            <div className={styles.routeInfoItem}>
              <div className={styles.routeInfoValue}>~380 km</div>
              <div className={styles.routeInfoLabel}>Distance</div>
            </div>
            <div className={styles.routeInfoItem}>
              <div className={styles.routeInfoValue}>~6-7 hrs</div>
              <div className={styles.routeInfoLabel}>Drive Time</div>
            </div>
            <div className={styles.routeInfoItem}>
              <div className={styles.routeInfoValue}>Rs.5,299</div>
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
              <h2>Kadapa to Chennai Cab Fare</h2>
              <div className="divider divider--left" style={{ marginBottom: '20px' }} />
              <table className="rate-table">
                <thead><tr><th>Trip Type</th><th>Price</th><th>Includes</th></tr></thead>
                <tbody>
                  <tr><td>One Way / Day Trip</td><td className="price">Rs.5,299</td><td>Driver + AC + Fuel</td></tr>
                  <tr><td>Round Trip</td><td className="price">Rs.9,299</td><td>Driver + AC + Fuel + Wait</td></tr>
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
