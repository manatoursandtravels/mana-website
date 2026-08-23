import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import BookingForm from '@/components/BookingForm';
import GoogleReviews from '@/components/GoogleReviews';
import Link from 'next/link';
import styles from '../service.module.css';
import { BUSINESS } from '@/lib/constants';

export const metadata = {
  title: 'Pilgrimage Tours from Kadapa | Tirupati, Srisailam, Ahobilam | MANA Tours',
  description:
    'Private sacred pilgrimage tours from Kadapa. Tirupati Darshan (₹3,499 RT), Srisailam Jyotirlinga (₹3,799 RT), Ahobilam (₹2,999 RT), Sri Kalahasti (₹3,699 RT). Experienced drivers. Call +91 99083 00718.',
  keywords: [
    'Tirupati pilgrimage package from Kadapa',
    'Srisailam cab Kadapa',
    'Ahobilam tour from Kadapa',
    'Kalahasti temple taxi',
    'temple tour packages Rayalaseema',
    'MANA Tours pilgrimage',
  ],
};

const PILGRIMAGE_ROUTES = [
  {
    id: 'tirupati',
    name: 'Kadapa → Tirupati (Balaji Darshan)',
    roundTrip: '₹3,499',
    oneWay: '₹2,099',
    distance: '~250 km',
    badge: '👑 Most Sacred',
    desc: 'Lord Venkateswara Swamy Temple atop Tirumala hills + Sri Padmavathi Ammavari Temple at Tiruchanur.',
    specs: ['Includes flexible darshan waiting buffer', 'Ghat road experienced driver', 'Doorstep Kadapa return'],
  },
  {
    id: 'srisailam',
    name: 'Kadapa → Srisailam (Jyotirlinga)',
    roundTrip: '₹3,799',
    oneWay: '₹2,299',
    distance: '~240 km',
    badge: '🔱 12 Jyotirlingas',
    desc: 'Sri Bhramaramba Mallikarjuna Swamy Temple nestled in the pristine Nallamala tiger reserve forest.',
    specs: ['Nallamala forest ghats expert', 'Pathalaganga ropeway & dam stop', 'Same-day or overnight option'],
  },
  {
    id: 'ahobilam',
    name: 'Kadapa → Ahobilam (Nava Narasimha)',
    roundTrip: '₹2,999',
    oneWay: '₹1,799',
    distance: '~185 km',
    badge: '🦁 9 Narasimha Shrines',
    desc: 'Ancient sacred hill shrines of Lower and Upper Ahobilam dedicated to Lord Narasimha Swamy.',
    specs: ['Trekking coordination support', 'Diguva & Eguva Ahobilam coverage', 'Peaceful rural highway cruise'],
  },
  {
    id: 'kalahasti',
    name: 'Kadapa → Sri Kalahasti (Vayu Lingam)',
    roundTrip: '₹3,699',
    oneWay: '₹2,199',
    distance: '~230 km',
    badge: '🪐 Rahu-Ketu Pooja',
    desc: 'Ancient Pancha Bhoota Sthalam famous worldwide for Rahu-Ketu Sarpa Dosha Nivarana poojas.',
    specs: ['Early morning pooja timing support', 'Tirupati combo option available', 'Comfortable AC sedan'],
  },
  {
    id: 'yaganti',
    name: 'Kadapa → Mahanandi & Yaganti',
    roundTrip: '₹3,199',
    oneWay: '₹1,999',
    distance: '~210 km',
    badge: '🪨 Growing Nandi & Springs',
    desc: 'The miraculous growing monolithic Nandi at Yaganti and perennial crystal-clear freshwater springs of Mahanandi.',
    specs: ['Belum Caves combo integration', 'Agastya Cave & Pushkarini visits', 'Relaxed family pilgrimage'],
  },
];

const STEPS = [
  {
    num: '1',
    title: 'Choose Sacred Shrine',
    desc: 'Select your pilgrimage destination, date, and family size (Sedan, Ertiga, or Innova Crysta).',
  },
  {
    num: '2',
    title: 'Early Morning Pickup',
    desc: 'Your driver arrives promptly at your Kadapa home or hotel to ensure you reach the temple before major queues.',
  },
  {
    num: '3',
    title: 'Relaxed Darshan Time',
    desc: 'We wait patiently during your darshan and pooja rituals with zero rush or hourly pressure.',
  },
  {
    num: '4',
    title: 'Comfortable Return',
    desc: 'Relax in air-conditioned comfort with optional prasadam and dining stops on the return drive to Kadapa.',
  },
];

export default function PilgrimagePage() {
  return (
    <>
      <Header />

      {/* ══ 1. HERO SECTION ══ */}
      <section className={styles.serviceHero}>
        <div className={styles.heroBgOverlay} />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroBreadcrumb}>
            <Link href="/">Home</Link> <span>›</span> <Link href="/#services">Services</Link> <span>›</span> <span>Pilgrimage Tours</span>
          </div>

          <div className={styles.heroPill}>
            <span>🛕 Sacred Temple Pilgrimages from Kadapa</span>
          </div>

          <h1 className={styles.heroTitle}>
            Devotion Without Hassle.<br />
            <span className={styles.heroTitleGradient}>Curated Sacred Darshan Packages.</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Comfortable, private pilgrimage travel to Tirupati Balaji, Srisailam Mallikarjuna Swamy, Ahobilam, and Sri Kalahasti. Courteous chauffeurs who respect your spiritual journey.
          </p>

          <div className={styles.heroHighlights}>
            <span className={styles.highlightBadge}>🛕 Flexible Darshan Waiting Buffer</span>
            <span className={styles.highlightBadge}>🚗 Spotless Clean AC Sedans &amp; Crysta</span>
            <span className={styles.highlightBadge}>🛡️ Forest &amp; Ghat Road Experienced Drivers</span>
            <span className={styles.highlightBadge}>⭐ 5.0 Google Rated Service</span>
          </div>
        </div>
      </section>

      {/* ══ 2. PILGRIMAGE PACKAGES ══ */}
      <section className="section">
        <div className="container">
          <div className={styles.contentGrid}>
            <div className={styles.mainCol}>
              <div className="section-header" style={{ textAlign: 'left', marginBottom: '8px' }}>
                <span className="eyebrow">Sacred Destinations</span>
                <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>Pilgrimage Route Packages</h2>
                <div className="divider divider--left" />
                <p>Round-trip packages include doorstep Kadapa pickup, fuel, driver allowance, and darshan waiting time.</p>
              </div>

              {/* Cards Grid */}
              <div className={styles.packageCards}>
                {PILGRIMAGE_ROUTES.map((p) => (
                  <div key={p.id} className={styles.packageCard}>
                    <span className={styles.packageBadge}>{p.badge}</span>
                    <div className={styles.packageName}>{p.name}</div>
                    <div className={styles.packagePrice}>
                      {p.roundTrip} <span className={styles.packagePriceSub}>Round Trip · {p.distance}</span>
                    </div>
                    <div style={{ fontSize: '0.86rem', color: 'var(--charcoal-600)', marginBottom: '8px' }}>
                      One-Way Drop: <strong style={{ color: 'var(--brand-blue)' }}>{p.oneWay}</strong>
                    </div>
                    <p style={{ fontSize: '0.84rem', color: 'var(--charcoal-600)', marginBottom: '14px', lineHeight: 1.5 }}>
                      {p.desc}
                    </p>

                    <ul className={styles.packageSpecs}>
                      {p.specs.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>

                    <a
                      href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hi MANA Tours, I would like to book a pilgrimage trip to "${p.name}" (Round Trip ${p.roundTrip}). Please share details.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.packageBtn}
                    >
                      💬 Book Pilgrimage Tour
                    </a>
                  </div>
                ))}
              </div>

              {/* Inclusions Box */}
              <div className={styles.inExBox}>
                <div className={styles.inBox}>
                  <h4><span className={styles.checkIcon}>✅</span> Pilgrimage Inclusions</h4>
                  <ul className={styles.checkList}>
                    <li><span className={styles.checkIcon}>✓</span> Dedicated sanitized AC vehicle (Etios / Ertiga / Crysta)</li>
                    <li><span className={styles.checkIcon}>✓</span> Fuel for the full round-trip temple circuit</li>
                    <li><span className={styles.checkIcon}>✓</span> Experienced driver with temple route expertise</li>
                    <li><span className={styles.checkIcon}>✓</span> Ample darshan waiting time included</li>
                    <li><span className={styles.checkIcon}>✓</span> Doorstep morning pickup and evening return in Kadapa</li>
                  </ul>
                </div>

                <div className={styles.exBox}>
                  <h4><span className={styles.infoIcon}>ℹ️</span> Temple Guidelines</h4>
                  <ul className={styles.checkList}>
                    <li><span className={styles.infoIcon}>•</span> Temple darshan tickets &amp; seva passes (booked by devotees)</li>
                    <li><span className={styles.infoIcon}>•</span> Strict traditional dress codes required at Tirumala &amp; Srisailam</li>
                    <li><span className={styles.infoIcon}>•</span> Highway toll gates &amp; temple parking slips (actuals)</li>
                    <li><span className={styles.infoIcon}>•</span> Driver overnight stay allowance (if staying 2 days): ₹300/night</li>
                  </ul>
                </div>
              </div>

              {/* Pilgrimage Tips */}
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '14px' }}>Devotee Preparation Tips</h3>
                <div className={styles.useCaseGrid}>
                  {[
                    '🪪 Carry Original Aadhaar Cards for all family members',
                    '🌅 Start at 3 AM or 4 AM to beat peak temple crowds',
                    '👕 Men: Dhoti/Kurta, Women: Saree/Chudidar for entry',
                    '📱 Book online SED (Special Entry Darshan) tickets early',
                    '🥥 Drivers know authentic prasad & coconut vendor spots',
                    '✨ Multi-temple custom combos available on WhatsApp',
                  ].map((tip, i) => (
                    <div key={i} className={styles.useCaseItem}>
                      {tip}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Form */}
            <div className={styles.sideCol}>
              <div id="book" className={styles.stickyForm}>
                <BookingForm compact />

                <div className={styles.contactCard}>
                  <h4>Multi-Temple Circuit?</h4>
                  <p>Want to combine Tirupati + Kalahasti, or Srisailam + Mahanandi in a 2-day tour? We build custom itineraries.</p>
                  <a href={`tel:${BUSINESS.phone.pavan}`} className="btn btn--white btn--sm" style={{ width: '100%', justifyContent: 'center' }}>
                    📞 Call {BUSINESS.phone.pavanDisplay}
                  </a>
                  <a
                    href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent('Hi Pavan, I want to plan a multi-temple pilgrimage circuit from Kadapa:')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.waBtn}
                  >
                    💬 WhatsApp Temple Planner
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
            <span className="eyebrow">Devotional Journey</span>
            <h2>How Pilgrimage Tour Booking Works</h2>
            <div className="divider" />
            <p>Peaceful, well-organized travel for your sacred family darshan.</p>
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

      {/* ══ 4. GOOGLE BUSINESS REVIEWS & DEVOTEE PROOF ══ */}
      <GoogleReviews
        filterCategory="pilgrimage"
        title={<>Devotee Experiences &amp; <span style={{ color: '#e8c97a' }}>Google Reviews</span></>}
        subtitle="Authentic 5.0 ★ Google reviews from families who traveled with MANA Tours on sacred pilgrimage circuits."
      />

      <Footer />
      <WhatsAppButton />
    </>
  );
}
