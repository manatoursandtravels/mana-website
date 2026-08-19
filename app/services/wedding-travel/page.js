import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import BookingForm from '@/components/BookingForm';
import Link from 'next/link';
import styles from '../service.module.css';
import { RATES, BUSINESS } from '@/lib/constants';

export const metadata = {
  title: 'Wedding & Event Travel Kadapa | Cab for Weddings | MANA Tours & Travels',
  description:
    'Luxury wedding cars and multi-vehicle fleet in Kadapa. Half-day engagement (₹1,499), full-day wedding (₹2,499), VIP decorated Innova Crysta, and guest fleet coordination. Call +91 99083 00718.',
  keywords: [
    'wedding car rental Kadapa',
    'bridal car Kadapa',
    'wedding taxi fleet Kadapa',
    'marriage function cab booking Kadapa',
    'flower decorated car Kadapa',
    'MANA Tours wedding travel',
  ],
};

const WEDDING_PACKAGES = [
  {
    id: 'half-day-wedding',
    badge: '💍 Engagement / Pooja',
    name: 'Half-Day Event (4 Hours / 40 km)',
    price: '₹1,499',
    priceSub: 'Ideal for single ceremony',
    desc: 'Perfect for engagement ceremonies, pre-wedding poojas, haldi / mehendi rituals, and family temple visits.',
    specs: ['Spotless AC Sedan (Etios / Dzire)', 'Driver in neat formal attire', 'Multiple pickup / drop points', 'Prompt on-call standby'],
  },
  {
    id: 'full-day-wedding',
    badge: '👑 Full Day Function',
    name: 'Full-Day Wedding (8 Hours / 80 km)',
    price: '₹2,499',
    priceSub: 'Complete muhurtham & reception',
    desc: 'Dedicated day-long vehicle for bride, groom, or key elders across convention hall, hotel, and home transfers.',
    specs: ['Full-day vehicle reservation', 'Unlimited local transit within package', 'Zero delay guarantee for auspicious muhurtham', 'Chilled AC comfort'],
  },
  {
    id: 'vip-bridal-crysta',
    badge: '⭐ VIP Bridal Escort',
    name: 'VIP Toyota Innova Crysta Suite',
    price: '₹3,999',
    priceSub: 'Full-day luxury MPV',
    desc: 'Grand luxury ride for bride and groom with plush leather captain seats, climate control, and optional floral ribbon decor.',
    specs: ['Premium Silver / Pearl Innova Crysta', 'Fresh flower garland decoration option', 'Spacious cabin for bridal attire', 'Top-rated executive chauffeur'],
  },
  {
    id: 'fleet-coordination',
    badge: '🚗 Baraat & Guest Fleet',
    name: 'Multi-Vehicle Fleet (3 to 10 Cars)',
    price: 'Custom',
    priceSub: 'Bulk group discount',
    desc: 'Coordinated fleet management for transporting outstation relatives, baraat processions, and large wedding parties.',
    specs: ['Unified dispatch coordination by Pavan', 'Mix of Sedans & 7-Seater MPVs', 'Seamless station & airport guest pickups', 'Dedicated single point of contact'],
  },
];

const EVENTS_SERVED = [
  { name: 'Weddings & Muhurthams', desc: 'Punctual transit synchronized with auspicious timings' },
  { name: 'Engagement & Ring Ceremonies', desc: 'Comfortable family movement between venues' },
  { name: 'Sangeet, Haldi & Mehendi', desc: 'Late-night guest drops and return shuttles' },
  { name: 'Reception Delegations', desc: 'VIP guest escorts from hotels to convention halls' },
  { name: 'Baby Showers & Naming Ceremonies', desc: 'Gentle, smooth driving for mothers and infants' },
  { name: 'Grand Anniversaries & Family Reunions', desc: 'Multi-car coordination for outstation relatives' },
];

const STEPS = [
  {
    num: '1',
    title: 'Share Event Schedule',
    desc: 'Provide function dates, muhurtham timings, venue locations, and required vehicle count.',
  },
  {
    num: '2',
    title: 'Custom Fleet Plan',
    desc: 'Receive tailored package pricing with vehicle assignments and driver contact sheets.',
  },
  {
    num: '3',
    title: 'Pre-Event Inspection',
    desc: 'All wedding cars undergo deep sanitization and exterior polishing before arrival.',
  },
  {
    num: '4',
    title: 'Flawless Execution',
    desc: 'Punctual on-call availability throughout your celebration with zero transportation stress.',
  },
];

export default function WeddingTravelPage() {
  return (
    <>
      <Header />

      {/* ══ 1. HERO SECTION ══ */}
      <section className={styles.serviceHero}>
        <div className={styles.heroBgOverlay} />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroBreadcrumb}>
            <Link href="/">Home</Link> <span>›</span> <Link href="/#services">Services</Link> <span>›</span> <span>Wedding &amp; Events</span>
          </div>

          <div className={styles.heroPill}>
            <span>💒 Wedding &amp; Grand Event Mobility</span>
          </div>

          <h1 className={styles.heroTitle}>
            Grand Occasions Deserve Flawless Travel.<br />
            <span className={styles.heroTitleGradient}>Punctual Fleet &amp; VIP Bridal Cars.</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Make your special day completely stress-free. Spotless AC Sedans, VIP Innova Crysta bridal suites, and synchronized multi-vehicle guest transit across Kadapa.
          </p>

          <div className={styles.heroHighlights}>
            <span className={styles.highlightBadge}>💐 Fresh Flower Decor on Request</span>
            <span className={styles.highlightBadge}>👔 Formally Attired Courteous Drivers</span>
            <span className={styles.highlightBadge}>🚗 Multi-Car Fleet Coordination</span>
            <span className={styles.highlightBadge}>⭐ 5.0 Rated Special Event Service</span>
          </div>
        </div>
      </section>

      {/* ══ 2. WEDDING PACKAGES ══ */}
      <section className="section">
        <div className="container">
          <div className={styles.contentGrid}>
            <div className={styles.mainCol}>
              <div className="section-header" style={{ textAlign: 'left', marginBottom: '8px' }}>
                <span className="eyebrow">Celebration Packages</span>
                <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>Wedding &amp; Event Packages</h2>
                <div className="divider divider--left" />
                <p>Designed to deliver complete peace of mind during your family&apos;s most memorable moments.</p>
              </div>

              {/* Cards Grid */}
              <div className={styles.packageCards}>
                {WEDDING_PACKAGES.map((w) => (
                  <div key={w.id} className={styles.packageCard}>
                    <span className={styles.packageBadge}>{w.badge}</span>
                    <div className={styles.packageName}>{w.name}</div>
                    <div className={styles.packagePrice}>
                      {w.price} <span className={styles.packagePriceSub}>{w.priceSub}</span>
                    </div>
                    <p style={{ fontSize: '0.84rem', color: 'var(--charcoal-600)', marginBottom: '14px', lineHeight: 1.5 }}>
                      {w.desc}
                    </p>

                    <ul className={styles.packageSpecs}>
                      {w.specs.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>

                    <a
                      href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hi Pavan & MANA Tours, I would like to book wedding travel: "${w.name}" (${w.price}). Please share details.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.packageBtn}
                    >
                      💬 Inquire Wedding Package
                    </a>
                  </div>
                ))}
              </div>

              {/* Events Grid */}
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '14px' }}>Events We Seamlessly Support</h3>
                <div className={styles.useCaseGrid}>
                  {EVENTS_SERVED.map((ev, i) => (
                    <div key={i} className={styles.useCaseItem}>
                      <div>
                        <strong>{ev.name}</strong>
                        <span style={{ fontSize: '0.76rem', color: 'var(--charcoal-500)', display: 'block', marginTop: '2px' }}>
                          {ev.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions Box */}
              <div className={styles.inExBox}>
                <div className={styles.inBox}>
                  <h4><span className={styles.checkIcon}>✅</span> Wedding Service Inclusions</h4>
                  <ul className={styles.checkList}>
                    <li><span className={styles.checkIcon}>✓</span> Sanitized, polished, spotless interior and exterior</li>
                    <li><span className={styles.checkIcon}>✓</span> Punctual arrival 15 minutes before scheduled departure</li>
                    <li><span className={styles.checkIcon}>✓</span> Non-smoking, courteous driver in formal dress</li>
                    <li><span className={styles.checkIcon}>✓</span> Fresh floral ribbon decoration available on advance request</li>
                    <li><span className={styles.checkIcon}>✓</span> Dedicated coordination support from Pavan</li>
                  </ul>
                </div>

                <div className={styles.exBox}>
                  <h4><span className={styles.infoIcon}>ℹ️</span> Event Planning Guidelines</h4>
                  <ul className={styles.checkList}>
                    <li><span className={styles.infoIcon}>•</span> Book multi-vehicle fleets at least 7–14 days in advance</li>
                    <li><span className={styles.infoIcon}>•</span> Flower decoration charges quoted separately based on design</li>
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
                  <h4>Planning a Grand Function?</h4>
                  <p>Speak directly with Pavan to customize a multi-car fleet and schedule guest airport/station shuttles.</p>
                  <a href={`tel:${BUSINESS.phone.pavan}`} className="btn btn--white btn--sm" style={{ width: '100%', justifyContent: 'center' }}>
                    📞 Call {BUSINESS.phone.pavanDisplay}
                  </a>
                  <a
                    href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent('Hi Pavan, I am planning a wedding/function in Kadapa and need a fleet quote:')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.waBtn}
                  >
                    💬 WhatsApp Wedding Desk
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
            <span className="eyebrow">Auspicious Execution</span>
            <h2>How Wedding Fleet Booking Works</h2>
            <div className="divider" />
            <p>Precise timing and seamless coordination for your most cherished celebration.</p>
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
