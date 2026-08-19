import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import BookingForm from '@/components/BookingForm';
import Link from 'next/link';
import styles from '../service.module.css';
import { RATES, BUSINESS } from '@/lib/constants';

export const metadata = {
  title: 'Airport Transfers from Kadapa | Tirupati, Hyderabad, Bangalore | MANA Tours',
  description:
    'Guaranteed on-time airport cabs from Kadapa. Fixed prices to Tirupati Airport (₹2,499), Hyderabad RGIA (₹5,499), Bangalore KIAL (₹5,999), Chennai Airport (₹5,799). Flight tracking & 24/7 service. Call +91 99083 00718.',
  keywords: [
    'airport cab Kadapa',
    'Kadapa to Hyderabad airport cab',
    'Kadapa to Bangalore airport taxi',
    'Kadapa to Tirupati airport drop',
    'airport transfer Kadapa',
    'MANA Tours airport cabs',
  ],
};

const AIRPORT_TRANSFERS = [
  {
    id: 'tirupati-air',
    name: 'Kadapa ↔ Tirupati Airport (TIR)',
    price: '₹2,499',
    badge: '⚡ Fastest Hub',
    duration: '~2.5 Hours',
    distance: '~145 km',
    desc: 'Direct terminal pickup and drop for daily SpiceJet, IndiGo, and Alliance Air domestic flights.',
    specs: ['AC Sedan with large 592L boot', 'Flight timing synchronized', 'Zero toll surcharges'],
  },
  {
    id: 'hyderabad-air',
    name: 'Kadapa → Hyderabad RGIA (HYD)',
    price: '₹5,499',
    badge: '✈️ Major Hub',
    duration: '~6 Hours',
    distance: '~360 km',
    desc: 'Direct non-stop transfer to Rajiv Gandhi International Airport for international & domestic departures.',
    specs: ['Smooth 4-lane NH44 highway cruise', 'Driver tracks incoming flights', '3 AM & late-night dispatch'],
  },
  {
    id: 'bangalore-air',
    name: 'Kadapa → Bangalore KIAL (BLR)',
    price: '₹5,999',
    badge: '🏙️ International',
    duration: '~5.5 Hours',
    distance: '~330 km',
    desc: 'Direct express transfer to Kempegowda International Airport Terminal 1 & Terminal 2.',
    specs: ['National FASTag included', 'Spacious MPVs available for overseas baggage', 'Curbside terminal drop'],
  },
  {
    id: 'chennai-air',
    name: 'Kadapa → Chennai Airport (MAA)',
    price: '₹5,799',
    badge: '🌊 Metro Hub',
    duration: '~6.5 Hours',
    distance: '~380 km',
    desc: 'Reliable transfers connecting Kadapa to Anna International & Kamaraj Domestic Terminals.',
    specs: ['Comfortable highway cruising', 'Punctual arrival 3 hours prior to flight', 'Full AC comfort'],
  },
];

const STEPS = [
  {
    num: '1',
    title: 'Share Flight & Departure Time',
    desc: 'Provide your flight departure or landing time along with your Kadapa pickup address.',
  },
  {
    num: '2',
    title: 'Flight Buffer Calculation',
    desc: 'We calculate the optimal departure time accounting for highway traffic and security checks.',
  },
  {
    num: '3',
    title: 'Punctual Handover',
    desc: 'Your driver arrives 15 minutes before scheduled pickup and assists with heavy luggage.',
  },
  {
    num: '4',
    title: 'Curbside Terminal Drop',
    desc: 'Direct drop at your airport departure gate with zero parking hassle or delay.',
  },
];

export default function AirportTransfersPage() {
  return (
    <>
      <Header />

      {/* ══ 1. HERO SECTION ══ */}
      <section className={styles.serviceHero}>
        <div className={styles.heroBgOverlay} />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroBreadcrumb}>
            <Link href="/">Home</Link> <span>›</span> <Link href="/#services">Services</Link> <span>›</span> <span>Airport Transfers</span>
          </div>

          <div className={styles.heroPill}>
            <span>✈️ Guaranteed On-Time Airport Cabs</span>
          </div>

          <h1 className={styles.heroTitle}>
            Never Miss a Flight.<br />
            <span className={styles.heroTitleGradient}>Fixed &amp; Reliable Airport Fares.</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Punctual 24/7 airport transfers from Kadapa to Tirupati, Hyderabad RGIA, Bangalore Kempegowda, and Chennai. Live flight monitoring and spotless AC fleet.
          </p>

          <div className={styles.heroHighlights}>
            <span className={styles.highlightBadge}>🕒 100% On-Time Guarantee</span>
            <span className={styles.highlightBadge}>✈️ Live Flight Status Tracking</span>
            <span className={styles.highlightBadge}>🧳 Large Boot Space for Luggage</span>
            <span className={styles.highlightBadge}>⭐ 5.0 Google Rated Experience</span>
          </div>
        </div>
      </section>

      {/* ══ 2. AIRPORT PACKAGES & BOOKING ══ */}
      <section className="section">
        <div className="container">
          <div className={styles.contentGrid}>
            <div className={styles.mainCol}>
              <div className="section-header" style={{ textAlign: 'left', marginBottom: '8px' }}>
                <span className="eyebrow">Fixed Airport Fares</span>
                <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>All-Inclusive Airport Cabs</h2>
                <div className="divider divider--left" />
                <p>Fixed prices with zero meter tampering or midnight surge. Includes AC vehicle and professional driver.</p>
              </div>

              {/* Cards Grid */}
              <div className={styles.packageCards}>
                {AIRPORT_TRANSFERS.map((a) => (
                  <div key={a.id} className={styles.packageCard}>
                    <span className={styles.packageBadge}>{a.badge}</span>
                    <div className={styles.packageName}>{a.name}</div>
                    <div className={styles.packagePrice}>
                      {a.price} <span className={styles.packagePriceSub}>Fixed · {a.duration}</span>
                    </div>
                    <p style={{ fontSize: '0.84rem', color: 'var(--charcoal-600)', marginBottom: '14px', lineHeight: 1.5 }}>
                      {a.desc}
                    </p>

                    <ul className={styles.packageSpecs}>
                      {a.specs.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>

                    <a
                      href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hi MANA Tours, I need an airport transfer: "${a.name}" (${a.price}). Please confirm availability.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.packageBtn}
                    >
                      💬 Book Airport Transfer
                    </a>
                  </div>
                ))}
              </div>

              {/* Return Airport Pickup Table */}
              <div className={styles.tableCard}>
                <div className={styles.tableHeader}>
                  <h3>Airport Pickups (Return to Kadapa)</h3>
                  <p>Arriving at an airport? Driver tracks your flight landing and waits curbside with your nameboard.</p>
                </div>
                <table className={styles.rateTable}>
                  <thead>
                    <tr>
                      <th>Airport Route</th>
                      <th>Fixed Price</th>
                      <th>Included Services</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Tirupati Airport → Kadapa</td>
                      <td className={styles.priceCol}>₹2,499</td>
                      <td>Terminal greeting · 60-min flight delay buffer</td>
                    </tr>
                    <tr>
                      <td>Hyderabad Airport (RGIA) → Kadapa</td>
                      <td className={styles.priceCol}>₹5,499</td>
                      <td>Terminal greeting · Direct drop to Kadapa doorstep</td>
                    </tr>
                    <tr>
                      <td>Bangalore Airport (KIAL) → Kadapa</td>
                      <td className={styles.priceCol}>₹5,999</td>
                      <td>Terminal greeting · 4-lane expressway drive</td>
                    </tr>
                    <tr>
                      <td>Chennai Airport (MAA) → Kadapa</td>
                      <td className={styles.priceCol}>₹5,799</td>
                      <td>Terminal greeting · Smooth interstate transit</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Inclusions Box */}
              <div className={styles.inExBox}>
                <div className={styles.inBox}>
                  <h4><span className={styles.checkIcon}>✅</span> Guaranteed Features</h4>
                  <ul className={styles.checkList}>
                    <li><span className={styles.checkIcon}>✓</span> Flight arrival &amp; delay tracking by operations desk</li>
                    <li><span className={styles.checkIcon}>✓</span> 100% on-time pickup — zero risk of missed flights</li>
                    <li><span className={styles.checkIcon}>✓</span> Fuel and vehicle charges fully covered</li>
                    <li><span className={styles.checkIcon}>✓</span> 24/7 availability for 2 AM / 4 AM flights</li>
                    <li><span className={styles.checkIcon}>✓</span> Large trunk for multiple suitcases and trolley bags</li>
                  </ul>
                </div>

                <div className={styles.exBox}>
                  <h4><span className={styles.infoIcon}>ℹ️</span> Important Guidelines</h4>
                  <ul className={styles.checkList}>
                    <li><span className={styles.infoIcon}>•</span> Book at least 12–24 hours in advance for guaranteed allocation</li>
                    <li><span className={styles.infoIcon}>•</span> Share flight PNR or flight number during WhatsApp booking</li>
                    <li><span className={styles.infoIcon}>•</span> Airport commercial entry/parking slips (charged at actuals)</li>
                    <li><span className={styles.infoIcon}>•</span> Additional doorstep pickups inside Kadapa: ₹100 per extra point</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Form & Emergency Contact */}
            <div className={styles.sideCol}>
              <div id="book" className={styles.stickyForm}>
                <BookingForm compact />

                <div className={styles.contactCard}>
                  <h4>Flight in Under 6 Hours?</h4>
                  <p>For urgent same-day airport transfers, call Pavan immediately for instant vehicle dispatch.</p>
                  <a href={`tel:${BUSINESS.phone.pavan}`} className="btn btn--white btn--sm" style={{ width: '100%', justifyContent: 'center' }}>
                    📞 Call {BUSINESS.phone.pavanDisplay}
                  </a>
                  <a
                    href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent('Hi Pavan, I have an urgent flight and need an airport cab from Kadapa right away:')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.waBtn}
                  >
                    💬 Urgent WhatsApp Dispatch
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 3. HOW IT WORKS ══ */}
      <section className={`section ${styles.howItWorksSection}`}>
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Flight-Sync Flow</span>
            <h2>How Airport Transfer Booking Works</h2>
            <div className="divider" />
            <p>Precise timing and real-time flight tracking for a relaxed journey.</p>
          </div>

          <div className={styles.stepsGrid}>
            {STEPS.map((s) => (
              <div key={s.num} className={styles.stepCard}>
                <div className={styles.stepNum}>{s.num}</div>
                <div className={styles.stepTitle}>{s.title}</div>
                <div className={styles.stepDesc}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
