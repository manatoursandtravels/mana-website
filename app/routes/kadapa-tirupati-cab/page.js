import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import BookingForm from '@/components/BookingForm';
import Link from 'next/link';
import styles from '../../services/service.module.css';
import { BUSINESS } from '@/lib/constants';

export const metadata = {
  title: 'Kadapa to Tirupati Cab | AC Sedan & Crysta Fleet — Call 24/7',
  description: 'Book an AC cab from Kadapa to Tirupati temple darshan. Best fare guarantee, experienced chauffeur, on-time pickup. Call +91 99083 00718 for instant quote.',
  alternates: { canonical: '/routes/kadapa-tirupati-cab' },
  openGraph: {
    title: 'Kadapa to Tirupati Cab | Best Fare & 24/7 Service | MANA Tours',
    description: 'Fast, comfortable AC cab from Kadapa to Tirupati Balaji temple. Transparent pricing, zero hidden costs. Call +91 99083 00718.',
    url: 'https://www.manatoursandtravels.com/routes/kadapa-tirupati-cab',
    siteName: 'MANA Tours & Travels',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/images/hero-car.jpg', width: 1200, height: 630, alt: 'Kadapa to Tirupati Cab' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kadapa to Tirupati Cab | MANA Tours',
    description: 'Book Kadapa to Tirupati cabs with doorstep pickup and experienced chauffeurs. Call +91 99083 00718.',
    images: ['/images/hero-car.jpg'],
  },
};

const faqs = [
  { q: 'How far is Kadapa from Tirupati?', a: 'Kadapa to Tirupati is approximately 250 km, which takes around 4–5 hours by road depending on traffic.' },
  { q: 'What is the cab fare from Kadapa to Tirupati?', a: 'MANA Tours provides the most competitive fares in Rayalaseema for AC Sedans (Etios/Dzire) and Innova Crysta. Call or WhatsApp +91 99083 00718 for today\'s lowest instant quote.' },
  { q: 'How do I book a cab from Kadapa to Tirupati?', a: 'Simply call/WhatsApp +91 99083 00718 or fill the booking form on this page. We confirm vehicle and driver details immediately.' },
  { q: 'Is toll included in the price?', a: 'Toll and parking are charged at actuals and paid transparently. We provide complete receipts with zero markup.' },
  { q: 'Can I book for early morning pickup?', a: 'Yes! We operate 24/7. Many devotees prefer 2:00 AM – 4:00 AM departures from Kadapa for morning darshan in Tirumala.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const tripSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Intercity Cab Service',
  name: 'Kadapa to Tirupati Cab Service',
  description: 'Comfortable AC cab from Kadapa to Tirupati. Experienced drivers. On-time pickup. Best price guarantee. Call +91 99083 00718.',
  provider: {
    '@type': 'LocalBusiness',
    name: 'MANA Tours & Travels | Kadapa',
    telephone: '+919908300718',
    address: { '@type': 'PostalAddress', addressLocality: 'Kadapa', addressRegion: 'Andhra Pradesh', postalCode: '516001', addressCountry: 'IN' },
  },
  areaServed: [{ '@type': 'City', name: 'Kadapa' }, { '@type': 'City', name: 'Tirupati' }],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.manatoursandtravels.com' },
    { '@type': 'ListItem', position: 2, name: 'Routes', item: 'https://www.manatoursandtravels.com/routes' },
    { '@type': 'ListItem', position: 3, name: 'Kadapa to Tirupati', item: 'https://www.manatoursandtravels.com/routes/kadapa-tirupati-cab' },
  ],
};

export default function KadapaToTirupatiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tripSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <div className={styles.serviceHero}>
        <div className="container">
          <div className={styles.heroBreadcrumb}><Link href="/">Home</Link> › Routes › Kadapa to Tirupati</div>
          <div className={styles.heroIcon}>🛕</div>
          <h1 className={styles.heroTitle}>Kadapa to Tirupati Cab Service</h1>
          <p className={styles.heroSubtitle}>Comfortable, transparent AC cab from Kadapa to Tirupati. Experienced drivers. On-time pickup. Best price guarantee.</p>
          <div className={styles.routeInfo}>
            <div className={styles.routeInfoItem}>
              <div className={styles.routeInfoValue}>~250 km</div>
              <div className={styles.routeInfoLabel}>Distance</div>
            </div>
            <div className={styles.routeInfoItem}>
              <div className={styles.routeInfoValue}>~4–5 hrs</div>
              <div className={styles.routeInfoLabel}>Drive Time</div>
            </div>
            <div className={styles.routeInfoItem}>
              <div className={styles.routeInfoValue}>Best Fare</div>
              <div className={styles.routeInfoLabel}>One Way Drop</div>
            </div>
            <div className={styles.routeInfoItem}>
              <div className={styles.routeInfoValue}>Discounted</div>
              <div className={styles.routeInfoLabel}>Round Trip</div>
            </div>
          </div>
          <div className={styles.heroCtas} style={{marginTop:'24px'}}>
            <a href={`tel:${BUSINESS.phone.pavan}`} className="btn btn--primary btn--lg">📞 Call for Best Fare: {BUSINESS.phone.pavanDisplay}</a>
            <a href="#book" className="btn btn--white btn--lg">📅 Book Online</a>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.contentGrid}>
            <div className={styles.mainCol}>
              <div className={styles.priceSection}>
                <h2>Kadapa to Tirupati Cab Fare &amp; Packages</h2>
                <div className="divider divider--left" style={{marginBottom:'20px'}} />
                <table className="rate-table">
                  <thead><tr><th>Trip Type</th><th>Fare Quote</th><th>Includes</th></tr></thead>
                  <tbody>
                    <tr><td>One Way Drop</td><td className="price"><a href={`tel:${BUSINESS.phone.pavan}`} style={{color:'inherit',textDecoration:'none'}}>📞 Call for Quote</a></td><td>Driver + Chilled AC + Fuel</td></tr>
                    <tr><td>Round Trip (same day)</td><td className="price"><a href={`tel:${BUSINESS.phone.pavan}`} style={{color:'inherit',textDecoration:'none'}}>📞 Call for Quote</a></td><td>Driver + AC + Fuel + Wait</td></tr>
                    <tr><td>Round Trip (overnight)</td><td className="price"><a href={`tel:${BUSINESS.phone.pavan}`} style={{color:'inherit',textDecoration:'none'}}>📞 Call for Quote</a></td><td>Above + driver allowance</td></tr>
                    <tr><td>Tirupati Airport Drop</td><td className="price"><a href={`tel:${BUSINESS.phone.pavan}`} style={{color:'inherit',textDecoration:'none'}}>📞 Call for Quote</a></td><td>On-time airport flight drop</td></tr>
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
                <p style={{fontSize:'0.82rem',color:'var(--text-muted)',marginTop:'12px'}}>Toll and parking at actuals. Sedans (Etios/Dzire) and 7-Seater MPVs (Ertiga/Innova Crysta) available.</p>
              </div>

              <div className={styles.inExBox}>
                <div className={styles.inBox}>
                  <h4>✅ Included</h4>
                  <ul className="checklist">
                    <li>AC Toyota Etios or equivalent</li>
                    <li>Experienced driver (knows Tirupati routes)</li>
                    <li>Pickup from your Kadapa address</li>
                    <li>Fuel for the full trip</li>
                    <li>Up to 2 hrs wait on round trip</li>
                  </ul>
                </div>
                <div className={styles.exBox}>
                  <h4>ℹ️ Extra</h4>
                  <ul className="checklist">
                    <li>Toll (NH167 and AP highway)</li>
                    <li>Parking at Tirupati</li>
                    <li>Driver allowance for overnight: ₹300</li>
                    <li>Wait time beyond 2 hrs: ₹100/hr</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3>Why Choose MANA for Kadapa–Tirupati?</h3>
                <div className={styles.useCaseGrid} style={{marginTop:'16px'}}>
                  {['5★ Google-rated service','Early morning 2 AM–4 AM pickups available','Driver knows Tirupati darshan schedule','No hidden charges — full transparency','Secure online and offline booking','Instant WhatsApp confirmation'].map((u,i) => (
                    <div key={i} className={styles.useCaseItem}>✓ {u}</div>
                  ))}
                </div>
              </div>

              <div>
                <h3>Frequently Asked Questions</h3>
                <div className={styles.faqList}>
                  {faqs.map((f, i) => (
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
                <p>Need urgent booking or have a question?</p>
                <a href={`tel:${BUSINESS.phone.pavan}`} className="btn btn--primary" style={{width:'100%',justifyContent:'center'}}>📞 {BUSINESS.phone.pavanDisplay}</a>
                <a href={`https://wa.me/${BUSINESS.whatsapp}`} target="_blank" rel="noopener noreferrer" className={`btn ${styles.waBtn}`} style={{width:'100%',justifyContent:'center'}}>💬 WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer /><WhatsAppButton />
    </>
  );
}
