import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import BookingForm from '@/components/BookingForm';
import { BUSINESS } from '@/lib/constants';
import {
  SafetyInfographic,
  PricingInfographic,
  WhatsAppInfographic,
  LocalExpertiseInfographic,
  FleetPartnerIllustration,
} from '@/components/Illustrations';
import styles from './about.module.css';

export const metadata = {
  title: 'About Us — MANA Tours & Travels Kadapa | Our Story & Founders',
  description:
    'Learn about MANA Tours & Travels in Kadapa — founded by Pavan and Jyothi. Built on trust, punctuality, and family-style travel care across Andhra Pradesh. Call +91 99083 00718.',
};

const founders = [
  {
    name: 'Pavan',
    role: 'Founder & Managing Partner',
    avatar: '👨‍✈️',
    phone: BUSINESS.phone.pavanDisplay,
    bio: 'With over a decade of hands-on commercial driving and fleet management experience, Pavan personally oversees vehicle maintenance, route logistics, and customer comfort. He frequently pilots flagship outstation tours, ensuring unmatched punctuality and genuine hospitality.',
  },
  {
    name: 'Jyothi',
    role: 'Co-Founder & Booking Operations Head',
    avatar: '👩‍💼',
    phone: BUSINESS.phone.jyothiDisplay,
    bio: 'The organizational backbone of MANA Tours & Travels. Jyothi manages 24/7 customer bookings, WhatsApp dispatch, custom pilgrimage itineraries, and partner driver coordination, ensuring every traveler receives prompt, transparent, and empathetic service.',
  },
];

const pillars = [
  {
    icon: '⏱️',
    title: 'Zero-Lateness Punctuality',
    desc: 'Our chauffeurs arrive 15 minutes prior to scheduled departure. We respect your flight schedules, temple darshan slots, and business meetings.',
  },
  {
    icon: '💎',
    title: '100% Transparent Fares',
    desc: 'Upfront all-inclusive quotes covering commercial vehicle, fuel, driver allowance, and chilled AC. No surprise tolls or hidden platform surcharges.',
  },
  {
    icon: '✨',
    title: 'Sanitized & Pristine Fleet',
    desc: 'Every sedan, MPV, and Tempo Traveller undergoes multi-point safety checks, AC filter sanitization, and interior vacuuming before every journey.',
  },
  {
    icon: '🙏',
    title: 'Family-Style Care',
    desc: 'We treat every passenger like family. Courteous, verified, regional drivers who assist with luggage, elder care, and local sightseeing tips.',
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />

      {/* ══ 1. HERO SECTION ══ */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src="/images/partner-collaboration.jpg"
            alt="MANA Tours & Travels founders and drivers on Andhra Pradesh highway"
            fill
            priority
            quality={90}
            style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
          />
          <div className={styles.heroBgOverlay} />
        </div>

        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroPill}>
            <span>రాయలసీమ సంస్కృతి · Kadapa&apos;s Trusted Travel Legacy</span>
          </div>

          <h1 className={styles.heroTitle}>
            Driven by Passion.<br />
            <span style={{ color: 'var(--brand-red)' }}>United by Trust.</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Born in Kadapa, Andhra Pradesh. Built from the ground up by <strong>Pavan</strong> and <strong>Jyothi</strong> on a foundation of uncompromising safety, transparent pricing, and genuine Telugu hospitality.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#our-story" className="btn btn--primary btn--xl">
              📖 Discover Our Story
            </a>
            <a href={`tel:${BUSINESS.phone.pavan}`} className="btn btn--brass btn--xl">
              📞 Speak with Pavan: {BUSINESS.phone.pavanDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* ══ 2. OUR STORY & ROOTS ══ */}
      <section className="section" id="our-story" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div className={styles.storyLayout}>
            <div className={styles.storyContent}>
              <span className="eyebrow" style={{ display: 'inline-block', marginBottom: '14px' }}>
                నమస్కారం · Welcome to MANA
              </span>
              <h2>Every Journey, A New Experience</h2>
              <div className="divider divider--left" style={{ marginBottom: '24px' }} />
              <p>
                MANA Tours &amp; Travels was established with a singular vision: to eliminate the anxiety, unfair surcharges, and unpredictability often associated with private cab hire in Rayalaseema.
              </p>
              <p>
                Whether you are embarking on a sacred early-morning pilgrimage to <strong>Tirumala Tirupati</strong> or <strong>Srisailam</strong>, catching a critical flight at <strong>Bangalore Airport</strong>, or exploring the breathtaking canyon cliffs of <strong>Gandikota &amp; Belum Caves</strong>, MANA guarantees a safe, dignified, and serene travel experience.
              </p>
              <p>
                Starting with a single immaculately maintained Toyota Etios, we have grown into Kadapa&apos;s premier multi-tier fleet network—incorporating executive sedans, 7-seater MPVs, Innova Crysta luxury charters, and high-capacity Tempo Travellers.
              </p>
            </div>

            <div className={styles.storyStatCard}>
              <div className={styles.storyStatsGrid}>
                <div className={styles.sStat}>
                  <div className={styles.sStatNum}>5.0 ★</div>
                  <div className={styles.sStatLabel}>Google Rating</div>
                </div>
                <div className={styles.sStat}>
                  <div className={styles.sStatNum}>1,200+</div>
                  <div className={styles.sStatLabel}>Safe Journeys</div>
                </div>
                <div className={styles.sStat}>
                  <div className={styles.sStatNum}>24/7</div>
                  <div className={styles.sStatLabel}>Kadapa Hub Desk</div>
                </div>
                <div className={styles.sStat}>
                  <div className={styles.sStatNum}>₹0</div>
                  <div className={styles.sStatLabel}>Hidden Surcharges</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 3. FOUNDERS SPOTLIGHT ══ */}
      <section className="section" style={{ background: 'var(--pearl-bg)' }}>
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Leadership &amp; Ownership</span>
            <h2>Meet the Founders</h2>
            <div className="divider" />
            <p>Hands-on operational commitment from the people who personally care about your journey.</p>
          </div>

          <div className={styles.foundersGrid}>
            {founders.map((f, i) => (
              <div key={i} className={styles.founderCard}>
                <div className={styles.founderHeader}>
                  <div className={styles.founderAvatar}>{f.avatar}</div>
                  <div>
                    <h3 className={styles.founderName}>{f.name}</h3>
                    <div className={styles.founderRole}>{f.role}</div>
                  </div>
                </div>
                <p className={styles.founderBio}>{f.bio}</p>
                <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--pearl-border)' }}>
                  <a
                    href={`tel:${f.phone.replace(/[^0-9+]/g, '')}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'var(--brand-red)',
                      fontWeight: 800,
                      fontSize: '0.92rem',
                    }}
                  >
                    📞 Direct Contact: {f.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. 4 PILLARS OF EXCELLENCE ══ */}
      <section className="section" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Uncompromising Quality</span>
            <h2>The 4 Pillars of MANA Standard</h2>
            <div className="divider" />
            <p>Core principles that govern every single trip we dispatch across South India.</p>
          </div>

          <div className={styles.pillarsGrid}>
            {pillars.map((p, i) => (
              <div key={i} className={styles.pillarCard}>
                <div className={styles.pillarIcon}>{p.icon}</div>
                <h3 className={styles.pillarTitle}>{p.title}</h3>
                <p className={styles.pillarDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5. BOOKING FORM INTEGRATION ══ */}
      <section className="section" style={{ background: 'var(--pearl-bg)' }} id="book-section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Plan Your Next Trip</span>
            <h2>Book a Journey with Us Today</h2>
            <div className="divider" />
            <p>Experience the MANA difference. Instant confirmation on WhatsApp in under 15 minutes.</p>
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <BookingForm />
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
