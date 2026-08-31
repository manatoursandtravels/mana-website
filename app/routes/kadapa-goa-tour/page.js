import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import BookingForm from '@/components/BookingForm';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../services/service.module.css';
import { BUSINESS } from '@/lib/constants';

export const metadata = {
  title: 'Kadapa to Goa Tour Package | 4D/3N Beach & Heritage Holiday Cab',
  description:
    'Book private Kadapa to Goa 4-Day/3-Night holiday tour package starting at ₹15,999. AC Sedans, Ertiga & Innova Crysta. Baga beach, Fort Aguada, Old Goa & Dudhsagar falls. Call +91 99083 00718.',
  alternates: { canonical: '/routes/kadapa-goa-tour' },
  openGraph: {
    title: 'Kadapa to Goa Tour Package | 4D/3N Holiday | MANA Tours',
    description: 'Private 4-Day holiday tour from Kadapa to North & South Goa in comfortable AC vehicles with experienced highway chauffeurs.',
    url: 'https://www.manatoursandtravels.com/routes/kadapa-goa-tour',
    siteName: 'MANA Tours & Travels',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/images/hero-car.jpg', width: 1200, height: 630, alt: 'Kadapa to Goa Tour Cab' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kadapa to Goa Tour Package | MANA Tours',
    description: '4D/3N beach holiday package from Kadapa to Goa in AC comfort.',
    images: ['/images/hero-car.jpg'],
  },
};

export default function KadapaGoaTourPage() {
  return (
    <>
      <Header />

      {/* ══ 1. HERO SECTION ══ */}
      <section className={styles.serviceHero}>
        <div className={styles.heroBgOverlay} />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroBreadcrumb}>
            <Link href="/">Home</Link> <span>›</span> <Link href="/services/tour-packages">Tour Packages</Link> <span>›</span> <span>Kadapa to Goa</span>
          </div>

          <div className={styles.heroPill}>
            <span>🌊 Sun, Sand &amp; Heritage 4D/3N Holiday</span>
          </div>

          <h1 className={styles.heroTitle}>
            Kadapa to Goa Tour Package.<br />
            <span className={styles.heroTitleGradient}>Tropical Coastal Vacation.</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Immerse yourself in golden sandy beaches, historic 17th-century Portuguese forts, UNESCO heritage basilicas, and sunset luxury river cruises. Doorstep Kadapa pickup in private AC comfort.
          </p>

          <div className={styles.heroHighlights}>
            <span className={styles.highlightBadge}>📍 ~620 km · 4 Days / 3 Nights</span>
            <span className={styles.highlightBadge}>🚗 AC Sedan / Ertiga / Innova Crysta</span>
            <span className={styles.highlightBadge}>🏖️ North &amp; South Goa Sightseeing</span>
            <span className={styles.highlightBadge}>⭐ 5.0 Google Rated Experience</span>
          </div>
        </div>
      </section>

      {/* ══ 2. TOUR DETAILS & BOOKING ══ */}
      <section className="section">
        <div className="container">
          <div className={styles.contentGrid}>
            <div className={styles.mainCol}>
              <div className="section-header" style={{ textAlign: 'left', marginBottom: '8px' }}>
                <span className="eyebrow">All-Inclusive Holiday Tariff</span>
                <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>Kadapa to Goa Cab Packages</h2>
                <div className="divider divider--left" />
                <p>Fixed 4-day round-trip packages with doorstep Kadapa pickup, fuel, driver allowance, and complete Goa sightseeing.</p>
              </div>

              {/* Table Card */}
              <div className={styles.tableCard}>
                <div className={styles.tableHeader}>
                  <h3>Tiered Vehicle Pricing (4 Days / 3 Nights)</h3>
                  <p>Covers Kadapa ↔ Goa round trip distance + North &amp; South Goa local sightseeing.</p>
                </div>
                <table className={styles.rateTable}>
                  <thead>
                    <tr>
                      <th>Vehicle Category</th>
                      <th>4D/3N Fare</th>
                      <th>Best For</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>AC Sedan</strong> (Toyota Etios / Dzire)</td>
                      <td className={styles.priceCol}>₹15,999</td>
                      <td>Couples &amp; Small Groups (up to 4 passengers)</td>
                    </tr>
                    <tr>
                      <td><strong>Comfort MPV</strong> (Maruti Suzuki Ertiga)</td>
                      <td className={styles.priceCol}>₹20,999</td>
                      <td>Family Holidays (up to 6 passengers + luggage)</td>
                    </tr>
                    <tr>
                      <td><strong>Luxury MPV</strong> (Toyota Innova Crysta)</td>
                      <td className={styles.priceCol}>₹27,999</td>
                      <td>Executive VIP Luxury Travel (Plush Captain Seats)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Highlights List */}
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '14px' }}>Curated 4-Day Goa Holiday Itinerary</h3>
                <div className={styles.useCaseGrid}>
                  {[
                    'Day 1: Kadapa → Bellary / Hubli → Goa Hotel Check-in & Evening Beach Walk',
                    'Day 2: North Goa Tour — Calangute, Baga Beach, Anjuna & Fort Aguada',
                    'Day 3: South Goa & Heritage — Basilica of Bom Jesus, Se Cathedral & Miramar',
                    'Day 3 Evening: Luxury Mandovi River Sunset Cruise with Goan Folk Dance',
                    'Day 4 Morning: Dudhsagar Waterfalls or Dona Paula Viewpoint',
                    'Day 4 Afternoon: Relaxed Return Highway Drive back to Kadapa',
                  ].map((item, i) => (
                    <div key={i} className={styles.useCaseItem}>
                      <span style={{ color: 'var(--brass-dark)', fontWeight: 900 }}>✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions Box */}
              <div className={styles.inExBox}>
                <div className={styles.inBox}>
                  <h4><span className={styles.checkIcon}>✅</span> Package Inclusions</h4>
                  <ul className={styles.checkList}>
                    <li><span className={styles.checkIcon}>✓</span> Dedicated sanitized AC vehicle for entire 4 days</li>
                    <li><span className={styles.checkIcon}>✓</span> Fuel for round-trip (~1,500 km total allowance)</li>
                    <li><span className={styles.checkIcon}>✓</span> Experienced long-distance highway chauffeur</li>
                    <li><span className={styles.checkIcon}>✓</span> Driver overnight stay allowances (3 nights)</li>
                    <li><span className={styles.checkIcon}>✓</span> Doorstep pickup and drop in Kadapa</li>
                  </ul>
                </div>

                <div className={styles.exBox}>
                  <h4><span className={styles.infoIcon}>ℹ️</span> What&apos;s Extra</h4>
                  <ul className={styles.checkList}>
                    <li><span className={styles.infoIcon}>•</span> Resort / Hotel stay &amp; personal dining in Goa</li>
                    <li><span className={styles.infoIcon}>•</span> Water sports, boat cruises &amp; club entry passes</li>
                    <li><span className={styles.infoIcon}>•</span> Goa state border commercial permits &amp; NH tolls (actuals)</li>
                    <li><span className={styles.infoIcon}>•</span> Additional days beyond 4 days: ₹3,800/day</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Form */}
            <div className={styles.sideCol}>
              <div id="book" className={styles.stickyForm}>
                <BookingForm compact />

                <div className={styles.contactCard}>
                  <h4>Custom Goa Vacation Plan?</h4>
                  <p>Want a 5-day or 6-day extended beach vacation with Gokarna or Murudeshwar en route? Call Pavan directly.</p>
                  <a href={`tel:${BUSINESS.phone.pavan}`} className="btn btn--white btn--sm" style={{ width: '100%', justifyContent: 'center' }}>
                    📞 Call {BUSINESS.phone.pavanDisplay}
                  </a>
                  <a
                    href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent('Hi Pavan, I want to book the Kadapa to Goa 4D/3N holiday tour package. Please share details:')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.waBtn}
                  >
                    💬 WhatsApp Goa Desk
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
