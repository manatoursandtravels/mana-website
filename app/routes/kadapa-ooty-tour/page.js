import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import BookingForm from '@/components/BookingForm';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../services/service.module.css';
import { BUSINESS } from '@/lib/constants';

export const metadata = {
  title: 'Kadapa to Ooty Tour Package | 3D/2N Nilgiris Holiday Cab',
  description:
    'Book private Kadapa to Ooty 3-Day/2-Night tour package starting at ₹12,499. AC Sedans, Ertiga & Innova Crysta. Tea plantations, Pykara lake, Doddabetta peak. Call +91 99083 00718.',
  alternates: { canonical: '/routes/kadapa-ooty-tour' },
  openGraph: {
    title: 'Kadapa to Ooty Tour Package | 3D/2N Holiday | MANA Tours',
    description: 'Private 3-Day holiday package from Kadapa to Ooty & Coonoor with dedicated AC cab and experienced hill-driving chauffeur.',
    url: 'https://www.manatoursandtravels.com/routes/kadapa-ooty-tour',
    siteName: 'MANA Tours & Travels',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/images/hero-car.jpg', width: 1200, height: 630, alt: 'Kadapa to Ooty Tour Cab' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kadapa to Ooty Tour Package | MANA Tours',
    description: '3D/2N private holiday tour from Kadapa to Ooty in AC comfort.',
    images: ['/images/hero-car.jpg'],
  },
};

export default function KadapaOotyTourPage() {
  return (
    <>
      <Header />

      {/* ══ 1. HERO SECTION ══ */}
      <section className={styles.serviceHero}>
        <div className={styles.heroBgOverlay} />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroBreadcrumb}>
            <Link href="/">Home</Link> <span>›</span> <Link href="/services/tour-packages">Tour Packages</Link> <span>›</span> <span>Kadapa to Ooty</span>
          </div>

          <div className={styles.heroPill}>
            <span>🌲 Queen of Hill Stations 3D/2N Vacation</span>
          </div>

          <h1 className={styles.heroTitle}>
            Kadapa to Ooty Tour Package.<br />
            <span className={styles.heroTitleGradient}>Misty Nilgiri Mountains Escape.</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Escape to the lush tea gardens, emerald lakes, and cool pine forests of Ooty and Coonoor. Private chauffeur-driven tour package from Kadapa with complete sightseeing.
          </p>

          <div className={styles.heroHighlights}>
            <span className={styles.highlightBadge}>📍 ~560 km · 3 Days / 2 Nights</span>
            <span className={styles.highlightBadge}>🚗 AC Sedan / Ertiga / Innova Crysta</span>
            <span className={styles.highlightBadge}>⛰️ Complete Sightseeing Included</span>
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
                <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>Kadapa to Ooty Cab Packages</h2>
                <div className="divider divider--left" />
                <p>Fixed 3-day round-trip packages with doorstep Kadapa pickup, fuel, driver allowance, and Ooty/Coonoor sightseeing.</p>
              </div>

              {/* Table Card */}
              <div className={styles.tableCard}>
                <div className={styles.tableHeader}>
                  <h3>Tiered Vehicle Pricing (3 Days / 2 Nights)</h3>
                  <p>Covers Kadapa ↔ Ooty round trip distance + local mountain sightseeing.</p>
                </div>
                <table className={styles.rateTable}>
                  <thead>
                    <tr>
                      <th>Vehicle Category</th>
                      <th>3D/2N Fare</th>
                      <th>Best For</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>AC Sedan</strong> (Toyota Etios / Dzire)</td>
                      <td className={styles.priceCol}>₹12,499</td>
                      <td>Couples &amp; Small Families (up to 4 passengers)</td>
                    </tr>
                    <tr>
                      <td><strong>Comfort MPV</strong> (Maruti Suzuki Ertiga)</td>
                      <td className={styles.priceCol}>₹16,499</td>
                      <td>Family Groups (up to 6 passengers + luggage)</td>
                    </tr>
                    <tr>
                      <td><strong>Luxury MPV</strong> (Toyota Innova Crysta)</td>
                      <td className={styles.priceCol}>₹21,999</td>
                      <td>VIP Executive &amp; Luxury Travel (Captain Seats)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Highlights List */}
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '14px' }}>Curated 3-Day Ooty Sightseeing Itinerary</h3>
                <div className={styles.useCaseGrid}>
                  {[
                    'Day 1: Scenic Drive Kadapa → Mysore / Bandipur → Ooty Hill Arrival',
                    'Day 1 Evening: Ooty Lake Boating & Local Tibetan Market Walk',
                    'Day 2 Morning: Doddabetta Peak (Highest point) & Tea Factory Tour',
                    'Day 2 Afternoon: Government Botanical Garden & Rose Garden',
                    'Day 3 Morning: Pykara Lake, Waterfalls & Pine Needle Forest Walk',
                    'Day 3 Afternoon: Relaxed Scenic Highway Return Drive to Kadapa',
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
                    <li><span className={styles.checkIcon}>✓</span> Dedicated sanitized AC vehicle for entire 3 days</li>
                    <li><span className={styles.checkIcon}>✓</span> Fuel for round-trip (~1,200 km total allowance)</li>
                    <li><span className={styles.checkIcon}>✓</span> Experienced ghat-road licensed hill chauffeur</li>
                    <li><span className={styles.checkIcon}>✓</span> Driver overnight stay allowances (2 nights)</li>
                    <li><span className={styles.checkIcon}>✓</span> Doorstep pickup and drop in Kadapa</li>
                  </ul>
                </div>

                <div className={styles.exBox}>
                  <h4><span className={styles.infoIcon}>ℹ️</span> What&apos;s Extra</h4>
                  <ul className={styles.checkList}>
                    <li><span className={styles.infoIcon}>•</span> Hotel stay &amp; personal meals in Ooty</li>
                    <li><span className={styles.infoIcon}>•</span> Sightseeing entry tickets &amp; boat passes</li>
                    <li><span className={styles.infoIcon}>•</span> Interstate border permits &amp; NH FASTag tolls (actuals)</li>
                    <li><span className={styles.infoIcon}>•</span> Extra days extended beyond 3 days (₹3,500/day)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Form */}
            <div className={styles.sideCol}>
              <div id="book" className={styles.stickyForm}>
                <BookingForm compact />

                <div className={styles.contactCard}>
                  <h4>Custom Ooty / Coonoor Plan?</h4>
                  <p>Want to add Kodaikanal or Mysore to your holiday? Pavan will build your custom multi-destination itinerary.</p>
                  <a href={`tel:${BUSINESS.phone.pavan}`} className="btn btn--white btn--sm" style={{ width: '100%', justifyContent: 'center' }}>
                    📞 Call {BUSINESS.phone.pavanDisplay}
                  </a>
                  <a
                    href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent('Hi Pavan, I want to book the Kadapa to Ooty 3D/2N tour package. Please share availability:')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.waBtn}
                  >
                    💬 WhatsApp Ooty Desk
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
