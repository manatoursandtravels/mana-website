import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import BookingForm from '@/components/BookingForm';
import Link from 'next/link';
import styles from '../../services/service.module.css';
import { BUSINESS } from '@/lib/constants';

export const metadata = {
  title: 'Kadapa to Srisailam Cab | ₹2,299 One Way & ₹3,799 Round Trip',
  description: 'Book a cab from Kadapa to Srisailam starting ₹2,299 one way, ₹3,799 round trip. Sacred Mallikarjuna Jyotirlinga darshan with experienced chauffeur. Call +91 99083 00718.',
  alternates: { canonical: '/routes/kadapa-srisailam-cab' },
  openGraph: {
    title: 'Kadapa to Srisailam Cab | Mallikarjuna Jyotirlinga Pilgrimage | MANA Tours',
    description: 'Sacred pilgrimage cab from Kadapa to Srisailam Mallikarjuna Swamy & Bhramaramba Ammavari Temple. Experienced ghat road drivers.',
    url: 'https://www.manatoursandtravels.com/routes/kadapa-srisailam-cab',
    siteName: 'MANA Tours & Travels',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/images/hero-car.jpg', width: 1200, height: 630, alt: 'Kadapa to Srisailam Cab' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kadapa to Srisailam Cab | MANA Tours',
    description: 'Pilgrimage cab service from Kadapa to Srisailam Jyotirlinga.',
    images: ['/images/hero-car.jpg'],
  },
};

const tripSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Pilgrimage Cab Service',
  name: 'Kadapa to Srisailam Cab Service',
  description: 'Sacred pilgrimage cab from Kadapa to Srisailam Mallikarjuna Jyotirlinga temple.',
  provider: { '@type': 'LocalBusiness', name: 'MANA Tours & Travels', telephone: '+919908300718' },
  offers: [{ '@type': 'Offer', name: 'One Way Pilgrimage', price: '3499', priceCurrency: 'INR' }],
  areaServed: [{ '@type': 'City', name: 'Kadapa' }, { '@type': 'City', name: 'Srisailam' }],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.manatoursandtravels.com' },
    { '@type': 'ListItem', position: 2, name: 'Routes', item: 'https://www.manatoursandtravels.com/routes' },
    { '@type': 'ListItem', position: 3, name: 'Kadapa to Srisailam', item: 'https://www.manatoursandtravels.com/routes/kadapa-srisailam-cab' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How far is Srisailam from Kadapa?', acceptedAnswer: { '@type': 'Answer', text: 'Srisailam is approximately 200 km from Kadapa, around 3.5–4 hours by road via the scenic Nallamala forest ghat road.' } },
    { '@type': 'Question', name: 'What is the cab fare from Kadapa to Srisailam?', acceptedAnswer: { '@type': 'Answer', text: 'MANA Tours charges ₹3,499 for one way and ₹5,499 for round trip to Srisailam in an AC sedan. Toll and forest fees are extra.' } },
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
            <Link href="/">Home</Link> &rsaquo; Kadapa to Srisailam
          </div>
          <div className={styles.heroIcon}>🛕</div>
          <h1 className={styles.heroTitle}>Kadapa to Srisailam Cab</h1>
          <p className={styles.heroSubtitle}>
            Comfortable AC cab from Kadapa to Srisailam. Transparent pricing. Experienced driver. Available 24/7.
          </p>
          <div className={styles.routeInfo}>
            <div className={styles.routeInfoItem}>
              <div className={styles.routeInfoValue}>~240 km</div>
              <div className={styles.routeInfoLabel}>Distance</div>
            </div>
            <div className={styles.routeInfoItem}>
              <div className={styles.routeInfoValue}>~4-5 hrs</div>
              <div className={styles.routeInfoLabel}>Drive Time</div>
            </div>
            <div className={styles.routeInfoItem}>
              <div className={styles.routeInfoValue}>Rs.2,299</div>
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
              <h2>Kadapa to Srisailam Cab Fare</h2>
              <div className="divider divider--left" style={{ marginBottom: '20px' }} />
              <table className="rate-table">
                <thead><tr><th>Trip Type</th><th>Price</th><th>Includes</th></tr></thead>
                <tbody>
                  <tr><td>One Way / Day Trip</td><td className="price">Rs.2,299</td><td>Driver + AC + Fuel</td></tr>
                  <tr><td>Round Trip</td><td className="price">Rs.3,799</td><td>Driver + AC + Fuel + Wait</td></tr>
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
