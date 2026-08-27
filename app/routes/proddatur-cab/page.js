import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import BookingForm from '@/components/BookingForm';
import Link from 'next/link';
import styles from '../../services/service.module.css';
import { BUSINESS } from '@/lib/constants';

export const metadata = {
  title: 'Cab Service in Proddatur | Local & Outstation Taxi | MANA Tours Kadapa',
  description:
    'Book a cab from Proddatur — local taxi, outstation cabs to Kadapa, Tirupati, Hyderabad, Bangalore & airport transfers. MANA Tours & Travels. Call +91 99083 00718.',
  keywords: [
    'cab service in Proddatur',
    'Proddatur to Kadapa cab',
    'taxi in Proddatur',
    'Proddatur cab booking',
    'Proddatur to Tirupati cab',
    'Proddatur to Hyderabad taxi',
    'local cab Proddatur',
    'Proddatur outstation cab',
    'car rental Proddatur',
    'MANA tours Proddatur',
  ],
  alternates: { canonical: 'https://www.manatoursandtravels.com/routes/proddatur-cab' },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Local & Outstation Cab Service',
  name: 'Cab Service in Proddatur — MANA Tours & Travels',
  description: 'Local taxi and outstation cab service in Proddatur, Andhra Pradesh. Serving Kadapa, Tirupati, Hyderabad, Bangalore, and all Rayalaseema destinations.',
  provider: {
    '@type': 'LocalBusiness',
    name: 'MANA Tours & Travels',
    telephone: '+919908300718',
    address: { '@type': 'PostalAddress', addressLocality: 'Kadapa', addressRegion: 'Andhra Pradesh', postalCode: '516001', addressCountry: 'IN' },
    url: 'https://www.manatoursandtravels.com',
  },
  areaServed: { '@type': 'City', name: 'Proddatur' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Is MANA Tours & Travels available in Proddatur?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! MANA Tours & Travels serves Proddatur for local cab pickups, outstation cab bookings to Kadapa, Tirupati, Hyderabad, Bangalore, and airport transfers. Call +91 99083 00718 to book.' } },
    { '@type': 'Question', name: 'How far is Proddatur from Kadapa?', acceptedAnswer: { '@type': 'Answer', text: 'Proddatur is approximately 70 km from Kadapa, around 1.5 hours by road via the Proddatur-Kadapa highway.' } },
    { '@type': 'Question', name: 'What is the cab fare from Proddatur to Tirupati?', acceptedAnswer: { '@type': 'Answer', text: 'A cab from Proddatur to Tirupati (approx 290 km) starts at ₹2,499 one way in an AC sedan. Call MANA Tours at +91 99083 00718 for exact pricing.' } },
    { '@type': 'Question', name: 'Can I book a self-drive car in Proddatur?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! MANA Tours offers self-drive car rentals starting ₹1,499/day for pickup in Proddatur. Call us to arrange the handover at your location.' } },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.manatoursandtravels.com' },
    { '@type': 'ListItem', position: 2, name: 'Routes', item: 'https://www.manatoursandtravels.com/routes' },
    { '@type': 'ListItem', position: 3, name: 'Proddatur Cab Service', item: 'https://www.manatoursandtravels.com/routes/proddatur-cab' },
  ],
};

const popularRoutes = [
  { label: 'Proddatur → Kadapa', km: '70 km', price: '₹999', time: '1.5 hrs' },
  { label: 'Proddatur → Tirupati', km: '290 km', price: '₹2,499', time: '5 hrs' },
  { label: 'Proddatur → Hyderabad', km: '400 km', price: '₹5,499', time: '7 hrs' },
  { label: 'Proddatur → Bangalore', km: '380 km', price: '₹5,999', time: '6.5 hrs' },
  { label: 'Proddatur → Srisailam', km: '130 km', price: '₹1,799', time: '2.5 hrs' },
  { label: 'Proddatur → Gandikota', km: '40 km', price: '₹799', time: '1 hr' },
];

export default function ProddaturCabPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <div className={styles.serviceHero}>
        <div className="container">
          <div className={styles.heroBreadcrumb}><Link href="/">Home</Link> › Routes › Proddatur Cab Service</div>
          <div className={styles.heroIcon}>🚕</div>
          <h1 className={styles.heroTitle}>Cab Service in Proddatur, Andhra Pradesh</h1>
          <p className={styles.heroSubtitle}>
            Trusted local taxi & outstation cab from Proddatur. Clean AC cars, experienced drivers, transparent pricing. Serving Kadapa, Tirupati, Hyderabad & more.
          </p>
          <div className={styles.routeInfo}>
            <div className={styles.routeInfoItem}><div className={styles.routeInfoValue}>24/7</div><div className={styles.routeInfoLabel}>Available</div></div>
            <div className={styles.routeInfoItem}><div className={styles.routeInfoValue}>5.0 ★</div><div className={styles.routeInfoLabel}>Google Rated</div></div>
            <div className={styles.routeInfoItem}><div className={styles.routeInfoValue}>₹0</div><div className={styles.routeInfoLabel}>Hidden Charges</div></div>
            <div className={styles.routeInfoItem}><div className={styles.routeInfoValue}>AC</div><div className={styles.routeInfoLabel}>Clean Vehicles</div></div>
          </div>
          <div className={styles.heroCtas} style={{ marginTop: '24px' }}>
            <a href="#book" className="btn btn--primary btn--lg">📅 Book Proddatur Cab</a>
            <a href={`tel:${BUSINESS.phone.pavan}`} className="btn btn--white btn--lg">📞 Call Now</a>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.contentGrid}>
            <div className={styles.mainCol}>
              <div className={styles.priceSection}>
                <h2>Popular Routes from Proddatur — Fare Table</h2>
                <div className="divider divider--left" style={{ marginBottom: '20px' }} />
                <table className="rate-table">
                  <thead><tr><th>Route</th><th>Distance</th><th>Price (One Way)</th><th>Drive Time</th></tr></thead>
                  <tbody>
                    {popularRoutes.map((r, i) => (
                      <tr key={i}>
                        <td>{r.label}</td>
                        <td>{r.km}</td>
                        <td className="price">{r.price}</td>
                        <td>{r.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '12px' }}>Toll and parking at actual. All prices for AC sedan. Round-trip discounts available.</p>
              </div>

              <div style={{ marginTop: '32px' }}>
                <h3>Why Choose MANA Tours for Proddatur Cabs?</h3>
                <div className={styles.useCaseGrid} style={{ marginTop: '16px' }}>
                  {[
                    'Pickup from any Proddatur address',
                    '5.0 ★ Google-rated Kadapa fleet',
                    '24/7 WhatsApp booking & support',
                    'No hidden charges — full transparency',
                    'Self-drive cars also available',
                    'Pilgrimage routes: Tirupati, Srisailam',
                  ].map((u, i) => (
                    <div key={i} className={styles.useCaseItem}>✓ {u}</div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '32px' }}>
                <h3>Frequently Asked Questions</h3>
                <div className={styles.faqList}>
                  {[
                    { q: 'Is MANA Tours & Travels available in Proddatur?', a: 'Yes! MANA Tours & Travels serves Proddatur for local cab pickups, outstation cab bookings to Kadapa, Tirupati, Hyderabad, Bangalore, and airport transfers. Call +91 99083 00718 to book.' },
                    { q: 'How far is Proddatur from Kadapa?', a: 'Proddatur is approximately 70 km from Kadapa, around 1.5 hours by road.' },
                    { q: 'What is the cab fare from Proddatur to Tirupati?', a: 'A cab from Proddatur to Tirupati (approx 290 km) starts at ₹2,499 one way in an AC sedan.' },
                    { q: 'Can I book a self-drive car in Proddatur?', a: 'Yes! MANA Tours offers self-drive car rentals starting ₹1,499/day for pickup in Proddatur. Call us to arrange the handover at your location.' },
                  ].map((f, i) => (
                    <div key={i} className={styles.faqItem}>
                      <div className={styles.faqQ}>{f.q}</div>
                      <div className={styles.faqA}>{f.a}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '32px' }}>
                <h3>More Routes from MANA Tours & Travels</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '14px' }}>Explore all outstation and pilgrimage routes we operate from Kadapa & Rayalaseema:</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {[
                    { label: 'Kadapa → Tirupati', href: '/routes/kadapa-tirupati-cab' },
                    { label: 'Kadapa → Hyderabad', href: '/routes/kadapa-hyderabad-cab' },
                    { label: 'Kadapa → Bangalore', href: '/routes/kadapa-bangalore-cab' },
                    { label: 'Kadapa → Gandikota', href: '/routes/kadapa-gandikota-tour' },
                    { label: 'Kadapa → Srisailam', href: '/routes/kadapa-srisailam-cab' },
                    { label: 'Self-Drive Cars', href: '/services/self-drive' },
                  ].map((r, i) => (
                    <Link key={i} href={r.href} className="btn btn--outline btn--sm">→ {r.label}</Link>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.sideCol}>
              <div id="book" className={styles.stickyForm}><BookingForm compact /></div>
              <div className={styles.contactCard}>
                <p>Need quick booking or have questions?</p>
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
