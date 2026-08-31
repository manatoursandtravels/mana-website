import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import BookingForm from '@/components/BookingForm';
import Link from 'next/link';
import styles from '../service.module.css';
import { BUSINESS } from '@/lib/constants';

export const metadata = {
  title: 'Local Sightseeing & Heritage City Tours in Kadapa',
  description:
    'Explore Kadapa city and historic heritage attractions in air-conditioned comfort. 4hr city tour (₹1,499), 8hr full-day circuit (₹1,799), Siddhavattam & Vontimitta. Call +91 99083 00718.',
  alternates: {
    canonical: '/services/local-sightseeing',
  },
  openGraph: {
    title: 'Local Sightseeing Tours in Kadapa | MANA Tours & Travels',
    description: 'Explore Kadapa historic attractions with private AC cabs and local expert chauffeurs from ₹1,499.',
    url: 'https://www.manatoursandtravels.com/services/local-sightseeing',
    siteName: 'MANA Tours & Travels',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/images/hero-car.jpg', width: 1200, height: 630, alt: 'Local Sightseeing Kadapa' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Local Sightseeing Kadapa | MANA Tours',
    description: 'Private city tours and heritage site trips in Kadapa.',
    images: ['/images/hero-car.jpg'],
  },
};

const SIGHTSEEING_PACKAGES = [
  {
    id: 'half-day',
    badge: '⚡ City Express',
    name: 'Half-Day City Explorer (4h / 40km)',
    price: '₹1,499',
    priceSub: 'Ideal for 3–4 key landmarks',
    desc: 'Covers Ameen Peer Dargah (Pedda Dargah), Devuni Kadapa Sri Lakshmi Venkateswara Temple, and local shopping bazars.',
    specs: ['AC Sedan with local driver guide', '4 Hours / 40 km allowance', 'Doorstep hotel or home pickup'],
  },
  {
    id: 'full-day',
    badge: '👑 Most Popular',
    name: 'Full-Day Heritage Circuit (8h / 80km)',
    price: '₹1,799',
    priceSub: 'Comprehensive city & outskirts',
    desc: 'Expanded tour covering Siddhavattam Fort along Pennar river, Vontimitta Kodandarama Swamy Temple, and Pushpagiri temples.',
    specs: ['8 Hours / 80 km full day allowance', 'Flexible photo & lunch stops', 'Chilled AC comfort all day'],
  },
  {
    id: 'siddhavattam-vontimitta',
    badge: '🏰 Historic Forts',
    name: 'Siddhavattam Fort & Vontimitta Circuit',
    price: '₹2,199',
    priceSub: 'Full-day heritage expedition',
    desc: 'Explore the massive 14th-century riverside fortifications at Siddhavattam and the majestic monolithic stone architecture of Vontimitta.',
    specs: ['Knowledgeable heritage route driver', 'Pennar river bank viewpoints', 'Great for photography lovers'],
  },
  {
    id: 'pushpagiri-temple',
    badge: '🛕 Sacred River Confluence',
    name: 'Pushpagiri & Southern Hampi Tour',
    price: '₹1,999',
    priceSub: 'Half to full-day excursion',
    desc: 'Visit the renowned holy hill of Pushpagiri housing medieval Dravidian rock temples at the scenic confluence of Pennar and Papaghni rivers.',
    specs: ['Scenic rural Rayalaseema landscapes', 'Ancient Vijayanagara rock carvings', 'Door-to-door private cab'],
  },
];

const ATTRACTIONS = [
  { name: 'Devuni Kadapa (Tirupati Gateway Temple)', type: 'Sacred Hindu' },
  { name: 'Ameen Peer Dargah (Pedda Dargah)', type: 'Sufi Heritage' },
  { name: 'Siddhavattam Fort & Pennar Banks', type: '14th-Century Fort' },
  { name: 'Vontimitta Sri Kodandarama Temple', type: 'National Heritage' },
  { name: 'Pushpagiri Temple Complex', type: 'Medieval Architecture' },
  { name: 'Cuddapah Old Fort (Idga Fort)', type: 'Historical Landmark' },
  { name: 'Bhagavan Mahavir Government Museum', type: 'Archaeology' },
  { name: 'Kadapa Market & Handloom Shopping', type: 'Local Culture' },
];

const STEPS = [
  {
    num: '1',
    title: 'Select Sightseeing Package',
    desc: 'Pick your preferred half-day city tour or comprehensive full-day heritage fort circuit.',
  },
  {
    num: '2',
    title: 'Doorstep Morning Pickup',
    desc: 'Your sanitized AC car and courteous driver arrive at your Kadapa hotel or residence.',
  },
  {
    num: '3',
    title: 'Unrushed Exploration',
    desc: 'Spend as much time as you like at each fort, temple, or museum. Zero tour-group rush.',
  },
  {
    num: '4',
    title: 'Comfortable Evening Drop',
    desc: 'Return comfortably with optional stops for Kadapa Karam Dosa and local sweet shops.',
  },
];

export default function LocalSightseeingPage() {
  return (
    <>
      <Header />

      {/* ══ 1. HERO SECTION ══ */}
      <section className={styles.serviceHero}>
        <div className={styles.heroBgOverlay} />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroBreadcrumb}>
            <Link href="/">Home</Link> <span>›</span> <Link href="/#services">Services</Link> <span>›</span> <span>Local Sightseeing</span>
          </div>

          <div className={styles.heroPill}>
            <span>🗺️ Kadapa City &amp; Heritage Tours</span>
          </div>

          <h1 className={styles.heroTitle}>
            Discover Kadapa&apos;s Heritage.<br />
            <span className={styles.heroTitleGradient}>Curated Half &amp; Full-Day City Tours.</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Explore ancient Vijayanagara rock temples, riverside forts, and sacred sufi dargahs in private air-conditioned comfort. Experienced local drivers who know every scenic viewpoint.
          </p>

          <div className={styles.heroHighlights}>
            <span className={styles.highlightBadge}>🏰 Ancient Forts &amp; Temple Circuits</span>
            <span className={styles.highlightBadge}>🚗 Spotless Clean AC Sedans</span>
            <span className={styles.highlightBadge}>⏱️ Unrushed Photography Stops</span>
            <span className={styles.highlightBadge}>⭐ 5.0 Google Rated Experience</span>
          </div>
        </div>
      </section>

      {/* ══ 2. SIGHTSEEING PACKAGES ══ */}
      <section className="section">
        <div className="container">
          <div className={styles.contentGrid}>
            <div className={styles.mainCol}>
              <div className="section-header" style={{ textAlign: 'left', marginBottom: '8px' }}>
                <span className="eyebrow">Curated City Itineraries</span>
                <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>Sightseeing Tour Packages</h2>
                <div className="divider divider--left" />
                <p>Every sightseeing tour includes private AC car, fuel, experienced local driver, and flexible stops.</p>
              </div>

              {/* Cards Grid */}
              <div className={styles.packageCards}>
                {SIGHTSEEING_PACKAGES.map((s) => (
                  <div key={s.id} className={styles.packageCard}>
                    <span className={styles.packageBadge}>{s.badge}</span>
                    <div className={styles.packageName}>{s.name}</div>
                    <div className={styles.packagePrice}>
                      {s.price} <span className={styles.packagePriceSub}>{s.priceSub}</span>
                    </div>
                    <p style={{ fontSize: '0.84rem', color: 'var(--charcoal-600)', marginBottom: '14px', lineHeight: 1.5 }}>
                      {s.desc}
                    </p>

                    <ul className={styles.packageSpecs}>
                      {s.specs.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>

                    <a
                      href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hi MANA Tours, I would like to book the "${s.name}" (${s.price}) sightseeing package.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.packageBtn}
                    >
                      💬 Book Sightseeing Tour
                    </a>
                  </div>
                ))}
              </div>

              {/* Attractions Grid */}
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '14px' }}>Key Kadapa Attractions Covered</h3>
                <div className={styles.useCaseGrid}>
                  {ATTRACTIONS.map((att, i) => (
                    <div key={i} className={styles.useCaseItem}>
                      <div>
                        <strong>{att.name}</strong>
                        <span style={{ fontSize: '0.74rem', color: 'var(--brass-dark)', display: 'block', textTransform: 'uppercase', fontWeight: 800 }}>
                          {att.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions Box */}
              <div className={styles.inExBox}>
                <div className={styles.inBox}>
                  <h4><span className={styles.checkIcon}>✅</span> Sightseeing Inclusions</h4>
                  <ul className={styles.checkList}>
                    <li><span className={styles.checkIcon}>✓</span> Dedicated Air-Conditioned Sedan (Etios / Dzire)</li>
                    <li><span className={styles.checkIcon}>✓</span> Fuel for package kilometers included</li>
                    <li><span className={styles.checkIcon}>✓</span> Local driver who knows heritage landmarks &amp; best photo spots</li>
                    <li><span className={styles.checkIcon}>✓</span> Doorstep pickup and drop in Kadapa</li>
                    <li><span className={styles.checkIcon}>✓</span> Flexible time allocation at each attraction</li>
                  </ul>
                </div>

                <div className={styles.exBox}>
                  <h4><span className={styles.infoIcon}>ℹ️</span> What&apos;s Extra</h4>
                  <ul className={styles.checkList}>
                    <li><span className={styles.infoIcon}>•</span> Monument entry passes &amp; camera tickets (paid at counters)</li>
                    <li><span className={styles.infoIcon}>•</span> Personal snacks, tender coconuts &amp; meals</li>
                    <li><span className={styles.infoIcon}>•</span> Extra Kilometers beyond package limit: ₹13 / km</li>
                    <li><span className={styles.infoIcon}>•</span> Extra Hours beyond package duration: ₹150 / hr</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Form */}
            <div className={styles.sideCol}>
              <div id="book" className={styles.stickyForm}>
                <BookingForm compact />

                <div className={styles.contactCard}>
                  <h4>Custom Sightseeing Plan?</h4>
                  <p>Have specific temples, shopping bazars, or ancestral villages to visit? We create customized day routes.</p>
                  <a href={`tel:${BUSINESS.phone.pavan}`} className="btn btn--white btn--sm" style={{ width: '100%', justifyContent: 'center' }}>
                    📞 Call {BUSINESS.phone.pavanDisplay}
                  </a>
                  <a
                    href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent('Hi Pavan, I want to create a custom sightseeing itinerary in Kadapa:')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.waBtn}
                  >
                    💬 WhatsApp Itinerary
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
            <span className="eyebrow">Relaxed Sightseeing</span>
            <h2>How Sightseeing Tours Work</h2>
            <div className="divider" />
            <p>Private, unhurried city exploration for families and visitors.</p>
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
