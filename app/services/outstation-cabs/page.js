import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import BookingForm from '@/components/BookingForm';
import GoogleReviews from '@/components/GoogleReviews';
import Link from 'next/link';
import styles from '../service.module.css';
import { RATES, BUSINESS } from '@/lib/constants';

export const metadata = {
  title: 'Outstation Cab Service Kadapa | One Way & Round Trip | MANA Tours & Travels',
  description:
    'Book outstation cabs from Kadapa starting at ₹14/km. One-way and round-trip to Tirupati, Hyderabad, Bangalore, Chennai, Vijayawada. AC Sedans & Crysta. Call +91 99083 00718.',
  keywords: [
    'outstation cabs Kadapa',
    'one way cab Kadapa to Hyderabad',
    'Kadapa to Bangalore taxi',
    'Kadapa to Tirupati cab fare',
    'intercity car rental Kadapa',
    'MANA Tours outstation',
  ],
};

const OUTSTATION_ROUTES = [
  {
    id: 'tirupati',
    from: 'Kadapa',
    to: 'Tirupati',
    distance: '~250 km',
    oneWay: '₹2,099',
    roundTrip: '₹3,499',
    badge: '👑 Top Route',
    desc: 'Smooth highway drive to the sacred Venkateswara Swamy Temple with flexible darshan wait time.',
  },
  {
    id: 'hyderabad',
    from: 'Kadapa',
    to: 'Hyderabad',
    distance: '~360 km',
    oneWay: '₹4,999',
    roundTrip: '₹8,499',
    badge: '✈️ Airport & City',
    desc: 'Direct drops to RGIA Airport, Gachibowli, Hitec City, or Secunderabad. Punctual & safe.',
  },
  {
    id: 'bangalore',
    from: 'Kadapa',
    to: 'Bangalore',
    distance: '~330 km',
    oneWay: '₹5,499',
    roundTrip: '₹9,499',
    badge: '🏙️ Tech Hub',
    desc: 'Direct transit to Kempegowda Airport (KIAL), Whitefield, Electronic City, or Central Bangalore.',
  },
  {
    id: 'chennai',
    from: 'Kadapa',
    to: 'Chennai',
    distance: '~380 km',
    oneWay: '₹5,299',
    roundTrip: '₹9,299',
    badge: '🌊 Metro Route',
    desc: 'Connecting Kadapa to Chennai Airport, Central Railway Station, and T. Nagar shopping districts.',
  },
  {
    id: 'vijayawada',
    from: 'Kadapa',
    to: 'Vijayawada',
    distance: '~270 km',
    oneWay: '₹3,299',
    roundTrip: '₹5,799',
    badge: '🛕 Capital Region',
    desc: 'Fast highway access to Kanaka Durga Temple, Benz Circle, and Amaravati government hubs.',
  },
  {
    id: 'srisailam',
    from: 'Kadapa',
    to: 'Srisailam',
    distance: '~240 km',
    oneWay: '₹2,299',
    roundTrip: '₹3,799',
    badge: '🌲 Forest Ghat Road',
    desc: 'Expert hill drivers navigating the scenic Nallamala forest ghats to the Mallikarjuna Jyotirlinga.',
  },
];

const STEPS = [
  {
    num: '1',
    title: 'Choose Route & Trip Type',
    desc: 'Select one-way drop or round-trip with your preferred date and vehicle category.',
  },
  {
    num: '2',
    title: 'Instant Transparent Quote',
    desc: 'Receive fixed upfront pricing including fuel and driver allowance with zero surge fees.',
  },
  {
    num: '3',
    title: 'Doorstep Morning Handover',
    desc: 'Chauffeur arrives at your Kadapa address with a clean, fully-serviced vehicle.',
  },
  {
    num: '4',
    title: 'Safe Intercity Cruise',
    desc: 'Travel stress-free across South India on valid commercial permits with national FASTag.',
  },
];

export default function OutstationCabsPage() {
  return (
    <>
      <Header />

      {/* ══ 1. HERO SECTION ══ */}
      <section className={styles.serviceHero}>
        <div className={styles.heroBgOverlay} />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroBreadcrumb}>
            <Link href="/">Home</Link> <span>›</span> <Link href="/#services">Services</Link> <span>›</span> <span>Outstation Cabs</span>
          </div>

          <div className={styles.heroPill}>
            <span>🛣️ Intercity &amp; Outstation Travel</span>
          </div>

          <h1 className={styles.heroTitle}>
            Travel Across South India.<br />
            <span className={styles.heroTitleGradient}>Fixed &amp; Per-KM Fares.</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Comfortable, transparent one-way drops and round-trip journeys from Kadapa to Hyderabad, Bangalore, Chennai, Tirupati, and beyond. Starting at just ₹14/km.
          </p>

          <div className={styles.heroHighlights}>
            <span className={styles.highlightBadge}>🛡️ 100% Commercial National Permits</span>
            <span className={styles.highlightBadge}>🚗 Spotless Etios, Ertiga &amp; Crysta</span>
            <span className={styles.highlightBadge}>⚡ Zero Night Surge Pricing</span>
            <span className={styles.highlightBadge}>⭐ 5.0 Google Rated Experience</span>
          </div>
        </div>
      </section>

      {/* ══ 2. OUTSTATION ROUTES & BOOKING ══ */}
      <section className="section">
        <div className="container">
          <div className={styles.contentGrid}>
            <div className={styles.mainCol}>
              <div className="section-header" style={{ textAlign: 'left', marginBottom: '8px' }}>
                <span className="eyebrow">Popular Intercity Destinations</span>
                <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>Fixed Price Outstation Routes</h2>
                <div className="divider divider--left" />
                <p>Choose between fast one-way drops or relaxed round-trip journeys with complete flexibility.</p>
              </div>

              {/* Route Cards Grid */}
              <div className={styles.packageCards}>
                {OUTSTATION_ROUTES.map((r) => (
                  <div key={r.id} className={styles.packageCard}>
                    <span className={styles.packageBadge}>{r.badge}</span>
                    <div className={styles.packageName}>Kadapa → {r.to}</div>
                    <div className={styles.packagePrice}>
                      {r.oneWay} <span className={styles.packagePriceSub}>One Way · {r.distance}</span>
                    </div>
                    <div style={{ fontSize: '0.86rem', color: 'var(--brand-blue)', fontWeight: 800, marginBottom: '8px' }}>
                      Round Trip: {r.roundTrip}
                    </div>
                    <p style={{ fontSize: '0.84rem', color: 'var(--charcoal-600)', marginBottom: '16px', lineHeight: 1.5 }}>
                      {r.desc}
                    </p>

                    <a
                      href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hi MANA Tours, I would like to book a cab from Kadapa to ${r.to} (One Way ${r.oneWay} / Round Trip ${r.roundTrip}).`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.packageBtn}
                    >
                      💬 Book on WhatsApp
                    </a>
                  </div>
                ))}
              </div>

              {/* Per-KM Rate Matrix Table */}
              <div className={styles.tableCard}>
                <div className={styles.tableHeader}>
                  <h3>Outstation Per-KM Pricing Structure</h3>
                  <p>Transparent per-kilometer rates for custom routes and multi-day interstate itineraries.</p>
                </div>
                <table className={styles.rateTable}>
                  <thead>
                    <tr>
                      <th>Vehicle &amp; Tier</th>
                      <th>Rate / Km</th>
                      <th>Terms &amp; Allowances</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>AC Sedan</strong> (Toyota Etios / Swift Dzire)</td>
                      <td className={styles.priceCol}>₹14 / km</td>
                      <td>Min. 250 km/day · Clean, chilled AC</td>
                    </tr>
                    <tr>
                      <td><strong>Comfort MPV</strong> (Maruti Suzuki Ertiga)</td>
                      <td className={styles.priceCol}>₹17 / km</td>
                      <td>Min. 250 km/day · 7 Seats &amp; dual AC</td>
                    </tr>
                    <tr>
                      <td><strong>Luxury MPV</strong> (Toyota Innova Crysta)</td>
                      <td className={styles.priceCol}>₹21 / km</td>
                      <td>Min. 250 km/day · VIP Captain seats</td>
                    </tr>
                    <tr>
                      <td><strong>Driver Night Allowance</strong></td>
                      <td className={styles.priceCol}>₹300 / night</td>
                      <td>Applicable only for overnight journeys</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Inclusions & Transparency Box */}
              <div className={styles.inExBox}>
                <div className={styles.inBox}>
                  <h4><span className={styles.checkIcon}>✅</span> Included in Fare</h4>
                  <ul className={styles.checkList}>
                    <li><span className={styles.checkIcon}>✓</span> Dedicated sanitized AC vehicle</li>
                    <li><span className={styles.checkIcon}>✓</span> Fuel for the entire contracted distance</li>
                    <li><span className={styles.checkIcon}>✓</span> Experienced interstate highway chauffeur</li>
                    <li><span className={styles.checkIcon}>✓</span> Doorstep pickup and drop in Kadapa</li>
                    <li><span className={styles.checkIcon}>✓</span> 24/7 route tracking &amp; concierge</li>
                  </ul>
                </div>

                <div className={styles.exBox}>
                  <h4><span className={styles.infoIcon}>ℹ️</span> Extra Surcharges (Actuals)</h4>
                  <ul className={styles.checkList}>
                    <li><span className={styles.infoIcon}>•</span> National Highway FASTag toll fees (charged at actuals)</li>
                    <li><span className={styles.infoIcon}>•</span> Interstate border entry permits (if entering KA / TN / TS)</li>
                    <li><span className={styles.infoIcon}>•</span> Destination airport / city parking slips (at actuals)</li>
                    <li><span className={styles.infoIcon}>•</span> Driver overnight stay allowance: ₹300 / night</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Booking Form */}
            <div className={styles.sideCol}>
              <div id="book" className={styles.stickyForm}>
                <BookingForm compact />

                <div className={styles.contactCard}>
                  <h4>Custom Outstation Itinerary?</h4>
                  <p>Need a 3-day round trip across multiple cities or temple circuits? Pavan will build your exact custom quote.</p>
                  <a href={`tel:${BUSINESS.phone.pavan}`} className="btn btn--white btn--sm" style={{ width: '100%', justifyContent: 'center' }}>
                    📞 Call {BUSINESS.phone.pavanDisplay}
                  </a>
                  <a
                    href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent('Hi Pavan, I need a custom outstation cab quote from Kadapa. Here is my route:')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.waBtn}
                  >
                    💬 WhatsApp Pavan
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
            <span className="eyebrow">Stress-Free Travel</span>
            <h2>How Outstation Cab Booking Works</h2>
            <div className="divider" />
            <p>From prompt morning pickup to safe arrival — effortless intercity travel.</p>
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

      {/* ══ 4. GOOGLE BUSINESS REVIEWS & SOCIAL PROOF ══ */}
      <GoogleReviews
        filterCategory="airport"
        title={<>Intercity Travelers Love <span style={{ color: '#e8c97a' }}>MANA Tours</span></>}
        subtitle="Verified 5.0 ★ Google reviews from commuters, airport travelers, and outstation passengers across Andhra Pradesh."
      />

      <Footer />
      <WhatsAppButton />
    </>
  );
}
