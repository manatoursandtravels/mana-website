import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import BookingForm from '@/components/BookingForm';
import Link from 'next/link';
import styles from '../../services/service.module.css';
import { BUSINESS } from '@/lib/constants';

export const metadata = {
  title: 'Cab Service in Pulivendula | Local & Outstation Taxi | MANA Tours Kadapa',
  description:
    'Book a cab from Pulivendula — local taxi, outstation cabs to Kadapa, Tirupati, Hyderabad, Bangalore & airport transfers. MANA Tours & Travels. Call +91 99083 00718.',
  keywords: [
    'cab service in Pulivendula',
    'Pulivendula to Kadapa cab',
    'taxi in Pulivendula',
    'Pulivendula cab booking',
    'Pulivendula to Tirupati cab',
    'Pulivendula to Hyderabad taxi',
    'local cab Pulivendula',
    'car rental Pulivendula',
    'MANA tours Pulivendula',
    'outstation cab Pulivendula',
  ],
  alternates: { canonical: 'https://www.manatoursandtravels.com/routes/pulivendula-cab' },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Local & Outstation Cab Service',
  name: 'Cab Service in Pulivendula — MANA Tours & Travels',
  description: 'Local taxi and outstation cab service in Pulivendula, Kadapa district, Andhra Pradesh. Serving Kadapa, Tirupati, Hyderabad, Bangalore, and all Rayalaseema destinations.',
  provider: {
    '@type': 'LocalBusiness',
    name: 'MANA Tours & Travels',
    telephone: '+919908300718',
    address: { '@type': 'PostalAddress', addressLocality: 'Kadapa', addressRegion: 'Andhra Pradesh', postalCode: '516001', addressCountry: 'IN' },
    url: 'https://www.manatoursandtravels.com',
  },
  areaServed: { '@type': 'City', name: 'Pulivendula' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Does MANA Tours & Travels serve Pulivendula?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! MANA Tours & Travels provides cab services in Pulivendula for local trips, outstation cabs to Kadapa, Tirupati, Hyderabad, and airport transfers. Call +91 99083 00718 to book.' } },
    { '@type': 'Question', name: 'How far is Pulivendula from Kadapa?', acceptedAnswer: { '@type': 'Answer', text: 'Pulivendula is approximately 90 km from Kadapa, around 2 hours by road.' } },
    { '@type': 'Question', name: 'What is the cab fare from Pulivendula to Tirupati?', acceptedAnswer: { '@type': 'Answer', text: 'A cab from Pulivendula to Tirupati (approx 310 km) starts at ₹2,799 one way in an AC sedan. Call MANA Tours at +91 99083 00718 for exact pricing.' } },
    { '@type': 'Question', name: 'Can I get a cab from Pulivendula to Hyderabad?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. MANA Tours provides outstation cabs from Pulivendula to Hyderabad (approx 420 km) starting at ₹5,799. 24/7 availability with advance booking.' } },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.manatoursandtravels.com' },
    { '@type': 'ListItem', position: 2, name: 'Routes', item: 'https://www.manatoursandtravels.com/routes' },
    { '@type': 'ListItem', position: 3, name: 'Pulivendula Cab Service', item: 'https://www.manatoursandtravels.com/routes/pulivendula-cab' },
  ],
};

const popularRoutes = [
  { label: 'Pulivendula → Kadapa', km: '90 km', price: '₹1,199', time: '2 hrs' },
  { label: 'Pulivendula → Tirupati', km: '310 km', price: '₹2,799', time: '5.5 hrs' },
  { label: 'Pulivendula → Hyderabad', km: '420 km', price: '₹5,799', time: '7.5 hrs' },
  { label: 'Pulivendula → Bangalore', km: '400 km', price: '₹6,199', time: '7 hrs' },
  { label: 'Pulivendula → Gandikota', km: '40 km', price: '₹799', time: '1 hr' },
  { label: 'Pulivendula → Srisailam', km: '120 km', price: '₹1,699', time: '2.5 hrs' },
];

export default function PulivendulaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <div className={styles.serviceHero}>
        <div className="container">
          <div className={styles.heroBreadcrumb}><Link href="/">Home</Link> › Routes › Pulivendula Cab Service</div>
          <div className={styles.heroIcon}>🚕</div>
          <h1 className={styles.heroTitle}>Cab Service in Pulivendula, Kadapa District</h1>
          <p className={styles.heroSubtitle}>
            Trusted local & outstation cab service from Pulivendula. Clean AC cars, experienced drivers, 24/7 WhatsApp booking. Tirupati, Hyderabad, Bangalore & more.
          </p>
          <div className={styles.routeInfo}>
            <div className={styles.routeInfoItem}><div className={styles.routeInfoValue}>24/7</div><div className={styles.routeInfoLabel}>Available</div></div>
            <div className={styles.routeInfoItem}><div className={styles.routeInfoValue}>5.0 ★</div><div className={styles.routeInfoLabel}>Google Rated</div></div>
            <div className={styles.routeInfoItem}><div className={styles.routeInfoValue}>₹0</div><div className={styles.routeInfoLabel}>Hidden Charges</div></div>
            <div className={styles.routeInfoItem}><div className={styles.routeInfoValue}>AC</div><div className={styles.routeInfoLabel}>Clean Fleet</div></div>
          </div>
          <div className={styles.heroCtas} style={{ marginTop: '24px' }}>
            <a href="#book" className="btn btn--primary btn--lg">📅 Book Pulivendula Cab</a>
            <a href={`tel:${BUSINESS.phone.pavan}`} className="btn btn--white btn--lg">📞 Call Now</a>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.contentGrid}>
            <div className={styles.mainCol}>
              <div className={styles.priceSection}>
                <h2>Cab Fares from Pulivendula</h2>
                <div className="divider divider--left" style={{ marginBottom: '20px' }} />
                <table className="rate-table">
                  <thead><tr><th>Route</th><th>Distance</th><th>Price (One Way)</th><th>Drive Time</th></tr></thead>
                  <tbody>
                    {popularRoutes.map((r, i) => (
                      <tr key={i}><td>{r.label}</td><td>{r.km}</td><td className="price">{r.price}</td><td>{r.time}</td></tr>
                    ))}
                  </tbody>
                </table>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '12px' }}>Toll at actual. All prices for AC sedan. Round-trip discounts available.</p>
              </div>

              <div style={{ marginTop: '32px' }}>
                <h3>Frequently Asked Questions</h3>
                <div className={styles.faqList}>
                  {[
                    { q: 'Does MANA Tours & Travels serve Pulivendula?', a: 'Yes! MANA Tours & Travels provides cab services in Pulivendula for local trips, outstation cabs to Kadapa, Tirupati, Hyderabad, and airport transfers. Call +91 99083 00718 to book.' },
                    { q: 'How far is Pulivendula from Kadapa?', a: 'Pulivendula is approximately 90 km from Kadapa, around 2 hours by road.' },
                    { q: 'What is the cab fare from Pulivendula to Tirupati?', a: 'A cab from Pulivendula to Tirupati starts at ₹2,799 one way in an AC sedan.' },
                    { q: 'Can I get a cab from Pulivendula to Hyderabad?', a: 'Yes. MANA Tours provides outstation cabs from Pulivendula to Hyderabad starting at ₹5,799. 24/7 availability with advance booking.' },
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
                <p>Quick booking or questions?</p>
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
