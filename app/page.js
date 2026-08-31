import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import BookingForm from '@/components/BookingForm';
import FareCalculator from '@/components/FareCalculator';
import Link from 'next/link';
import BookingCTA from '@/components/BookingCTA';
import GoogleReviews from '@/components/GoogleReviews';
import ReviewsMarquee from '@/components/ReviewsMarquee';
import YouTubeChannel from '@/components/YouTubeChannel';
import { BUSINESS, SERVICES, RATES } from '@/lib/constants';
import {
  LocalCabIllustration,
  OutstationIllustration,
  AirportIllustration,
  PilgrimageIllustration,
  TourPackageIllustration,
  CorporateIllustration,
  SightseeingIllustration,
  WeddingIllustration,
  SelfDriveIllustration,
  SafetyInfographic,
  OnTimeInfographic,
  PricingInfographic,
  OwnerInfographic,
  LocalExpertiseInfographic,
  WhatsAppInfographic,
  HeroAmbientWaves,
} from '@/components/Illustrations';
import {
  HolographicGoldStar,
  SweepingClockHand,
  ShimmeringRupeeCascade,
  AnimatedLuxuryFleet,
} from '@/components/StatAnimations';
import styles from './page.module.css';

export const metadata = {
  title: {
    absolute: 'MANA Tours & Travels Kadapa — #1 Cab Service, Self-Drive & Taxi in Kadapa',
  },
  description:
    'MANA Tours & Travels in Kadapa — 5.0★ Google Rated. Kadapa to Tirupati cab from ₹2,099, self-drive cars from ₹1,499/day, Bangalore & Hyderabad airport taxi drops, Gandikota tours & outstation cabs. Clean AC vehicles, zero hidden costs. Call +91 99083 00718.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'MANA Tours & Travels Kadapa — Every Journey, A New Experience',
    description: 'Premier cab, self-drive rentals and pilgrimage travel from Kadapa, Andhra Pradesh. 5.0★ Google Rated. Call +91 99083 00718.',
    url: 'https://www.manatoursandtravels.com',
    siteName: 'MANA Tours & Travels',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/hero-car.jpg',
        width: 1200,
        height: 630,
        alt: 'MANA Tours & Travels Kadapa Premium Fleet',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MANA Tours & Travels Kadapa — #1 Cab & Self-Drive Service',
    description: 'Premier cab, self-drive car rentals & pilgrimage travel from Kadapa.',
    images: ['/images/hero-car.jpg'],
  },
};

const stats = [
  { num: '5.0', label: 'Google Rating', sub: '50+ Verified Reviews', Component: HolographicGoldStar },
  { num: '24/7', label: 'Available All Hours', sub: 'Live Dispatch Desk', Component: SweepingClockHand },
  { num: '₹0', label: 'Hidden Charges', sub: '100% Upfront Quotes', Component: ShimmeringRupeeCascade },
  { num: '9+', label: 'Specialized Fleets', sub: 'Sedans, MPVs & Coaches', Component: AnimatedLuxuryFleet },
];

const whyUsInfographics = [
  {
    Illustration: SafetyInfographic,
    title: 'Safety First',
    desc: 'Verified vehicles, comprehensive commercial insurance, and background-checked drivers on every single trip.',
  },
  {
    Illustration: OnTimeInfographic,
    title: 'On-Time Guarantee',
    desc: 'Your driver arrives before the scheduled pickup time. We proactively share live status — zero last-minute anxiety.',
  },
  {
    Illustration: PricingInfographic,
    title: 'Transparent Pricing',
    desc: 'Complete fare breakdown upfront before booking confirmation. What we quote is strictly what you pay.',
  },
  {
    Illustration: OwnerInfographic,
    title: 'Owner-Operated',
    desc: 'Pavan personally operates many premium trips. Direct owner commitment and hospitality — not an impersonal call center.',
  },
  {
    Illustration: LocalExpertiseInfographic,
    title: 'Local Rayalaseema Roots',
    desc: 'Born and based in Kadapa. Unrivaled knowledge of every state highway, scenic route, and hidden gem.',
  },
  {
    Illustration: WhatsAppInfographic,
    title: 'WhatsApp Instant Booking',
    desc: 'Book, customize, and receive driver details directly on WhatsApp in under 60 seconds with zero app downloads.',
  },
];

const testimonials = [
  { name: 'Jairo Straten', city: 'Kadapa → Ahobilam', text: 'We booked car from Kadapa to Ahobilam. Car was clean and the journey was comfortable. Driver was friendly and everything went smoothly. reasonable pricing.', stars: 5, source: 'Google Verified' },
  { name: 'Ramesh K.', city: 'Kadapa', text: 'Booked for Tirupati at 3 AM — Pavan arrived 10 minutes early, car was spotless and AC was perfect. Never going anywhere else!', stars: 5 },
  { name: 'Priya S.', city: 'Hyderabad', text: 'Used MANA for Hyderabad airport transfer. Fixed price, no haggling, smooth ride all the way to RGIA. Highly recommend.', stars: 5 },
  { name: 'Dr. Srinivas R.', city: 'Kadapa', text: 'I use MANA for all my hospital rounds. Always punctual, always professional. The 4hr local package is outstanding value.', stars: 5 },
  { name: 'Lalitha M.', city: 'Nellore', text: 'The Gandikota day trip was incredible — driver knew every viewpoint, waited patiently. One of the best travel experiences ever!', stars: 5 },
];

const destinations = [
  { name: 'Tirupati', sub: 'Sri Venkateswara Swamy Temple', img: '/images/tirupati.jpg', price: 'From ₹2,099', href: '/routes/kadapa-tirupati-cab', badge: '👑 Most Popular', km: '~250 km' },
  { name: 'Gandikota', sub: 'Grand Canyon of India', img: '/images/gandikota.jpg', price: 'From ₹2,799', href: '/routes/kadapa-gandikota-tour', badge: '🏜️ Must Visit', km: '~120 km' },
  { name: 'Ooty Nilgiris', sub: 'Queen of Hill Stations (3D/2N)', img: '/images/ooty.jpg', price: 'From ₹12,499', href: '/routes/kadapa-ooty-tour', badge: '🌲 Hill Vacation', km: '~560 km' },
  { name: 'Goa Coastal', sub: 'Beach & Heritage Holiday (4D/3N)', img: '/images/goa.jpg', price: 'From ₹15,999', href: '/routes/kadapa-goa-tour', badge: '🌊 Beach Holiday', km: '~620 km' },
];

// Service ID to Vector Illustration map
const serviceIllustrations = {
  'local-cabs': LocalCabIllustration,
  'outstation-cabs': OutstationIllustration,
  'airport-transfers': AirportIllustration,
  'pilgrimage-tours': PilgrimageIllustration,
  'tour-packages': TourPackageIllustration,
  'corporate-travel': CorporateIllustration,
  'local-sightseeing': SightseeingIllustration,
  'wedding-travel': WeddingIllustration,
  'self-drive': SelfDriveIllustration,
};

export default function HomePage() {
  return (
    <>
      <Header />

      {/* ══ 1. HERO SECTION ══ */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src="/images/hero-car.jpg"
            alt="MANA Tours premium metallic silver Toyota Etios Platinum and Innova Crysta fleet on scenic Andhra Pradesh highway"
            fill
            priority
            quality={95}
            style={{ objectFit: 'cover', objectPosition: 'center 45%' }}
          />
          <div className={styles.heroBgOverlay} />
          <div className={styles.heroBgNoise} />
          <HeroAmbientWaves />
        </div>

        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroContent}>
            <a href="#google-reviews" className={styles.heroPill} title="View Google Reviews & Rating">
              <span className={styles.heroPillDot} />
              <span className={styles.pillHighlight}>⭐ 5.0 Google Rated</span>
              <span className={styles.pillDivider}>·</span>
              <span className={styles.pillSub}>Kadapa&apos;s Premier Travel Partner</span>
            </a>

            <h1 className={styles.heroH1}>
              <span className={styles.heroH1Line1}>Every Journey,</span><br />
              <span className={styles.heroH1Line2}>A New Experience.</span>
            </h1>

            <p className={styles.heroP}>
              Your trusted travel partner in Kadapa for temple pilgrimage tours, fixed airport transfers, outstation cabs, and self-drive car rentals. Clean AC vehicles, on-time pickup, and transparent upfront pricing.
            </p>

            {/* Mobile-Friendly Quick Service Shortcuts */}
            <div className={styles.heroQuickChips} aria-label="Popular quick routes">
              <Link href="/services/pilgrimage-tours" className={styles.heroQuickChip}>
                <span className={styles.hqcIcon}>🛕</span>
                <span className={styles.hqcLabel}>Tirupati Darshan</span>
                <span className={styles.hqcPrice}>₹2,099</span>
              </Link>
              <Link href="/services/airport-transfers" className={styles.heroQuickChip}>
                <span className={styles.hqcIcon}>✈️</span>
                <span className={styles.hqcLabel}>Airport Drops</span>
                <span className={styles.hqcPrice}>Fixed Fare</span>
              </Link>
              <Link href="/services/self-drive" className={styles.heroQuickChip}>
                <span className={styles.hqcIcon}>🔑</span>
                <span className={styles.hqcLabel}>Self Drive</span>
                <span className={styles.hqcPrice}>₹1,499/d</span>
              </Link>
              <Link href="/routes/kadapa-gandikota-tour" className={styles.heroQuickChip}>
                <span className={styles.hqcIcon}>🏜️</span>
                <span className={styles.hqcLabel}>Gandikota</span>
                <span className={styles.hqcPrice}>Day Tour</span>
              </Link>
            </div>

            <div className={styles.heroContacts}>
              <a href={`tel:${BUSINESS.phone.pavan}`} className={styles.heroContact} id="hero-pavan">
                <div className={styles.heroContactIcon}>📞</div>
                <div className={styles.heroContactInfo}>
                  <div className={styles.heroContactName}>Call Pavan</div>
                  <div className={styles.heroContactNum}>{BUSINESS.phone.pavanDisplay}</div>
                </div>
              </a>
              <div className={styles.heroContactDivider} />
              <a href={`tel:${BUSINESS.phone.jyothi}`} className={styles.heroContact} id="hero-jyothi">
                <div className={styles.heroContactIcon}>📞</div>
                <div className={styles.heroContactInfo}>
                  <div className={styles.heroContactName}>Call Jyothi</div>
                  <div className={styles.heroContactNum}>{BUSINESS.phone.jyothiDisplay}</div>
                </div>
              </a>
            </div>

            <div className={styles.heroCtas}>
              <BookingCTA className="btn btn--primary btn--xl" id="hero-book" label="🚗 Book a Journey" />
              <a
                href={`https://wa.me/${BUSINESS.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.heroWaBtn}
                id="hero-wa"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.116.553 4.103 1.522 5.831L.057 23.428l5.763-1.51A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.922 0-3.71-.522-5.241-1.428l-.376-.223-3.892 1.02 1.038-3.79-.246-.39A9.818 9.818 0 012.182 12C2.182 6.575 6.575 2.182 12 2.182S21.818 6.575 21.818 12 17.425 21.818 12 21.818z" />
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>

          <div className={styles.heroFormWrap}>
            <BookingForm />
          </div>
        </div>

        {/* ══ DYNAMIC 3D ANIMATED STATS GRID ══ */}
        <div className={styles.statsBar}>
          <div className="container">
            <div className={styles.statsGrid}>
              {stats.map((s, i) => {
                const AnimComponent = s.Component;
                return (
                  <div key={i} className={styles.statItem}>
                    <div className={styles.statIconWrap}>
                      <AnimComponent />
                    </div>
                    <div className={styles.statNum}>{s.num}</div>
                    <div className={styles.statLabel}>{s.label}</div>
                    <div className={styles.statSub}>{s.sub}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 2. BESPOKE LUXURY SERVICES GRID ══ */}
      <section className={`section ${styles.servicesSection}`}>
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">✦ Our Specialized Fleets ✦</span>
            <h2>Every Travel Need, Crafted to Perfection</h2>
            <div className="divider" />
            <p>From local Kadapa city packages to cross-state pilgrimage journeys — explore our specialized fleet services with transparent upfront pricing.</p>
          </div>
          <div className={styles.servicesGrid}>
            {[
              { id: 'local-cabs',       label: 'Local Cabs',         icon: '🚗', tag: 'City Rides',    from: '₹999',    theme: 'blue',   href: '/services/local-cabs',         desc: '4hr/40km & 8hr/80km city packages. Driver + AC + Fuel included.' },
              { id: 'outstation-cabs',  label: 'Outstation Cabs',    icon: '🛣️', tag: 'Intercity',    from: '₹2,099',  theme: 'red',    href: '/services/outstation-cabs',    desc: 'One-way & round-trip travel across AP & South India. Fixed upfront fares.' },
              { id: 'airport-transfers',label: 'Airport Transfers',  icon: '✈️', tag: 'Fixed Fare',   from: '₹2,499',  theme: 'indigo', href: '/services/airport-transfers',  desc: 'Fixed-price pickup & drop to Tirupati, Hyderabad & Bangalore airports.' },
              { id: 'pilgrimage-tours', label: 'Pilgrimage Tours',   icon: '🛕', tag: 'Sacred Trips', from: '₹2,099',  theme: 'amber',  href: '/services/pilgrimage-tours',   desc: 'Tirupati, Srisailam, Ahobilam & more. Darshan-timed departures.' },
              { id: 'tour-packages',    label: 'Tour Packages',      icon: '🏔️', tag: 'Curated',      from: '₹2,799',  theme: 'teal',   href: '/services/tour-packages',      desc: 'Gandikota, Belum, Ooty & Goa. Full-day guided packages with expert guide.' },
              { id: 'corporate-travel', label: 'Corporate Travel',   icon: '🏢', tag: 'GST Ready',    from: '₹1,799',  theme: 'slate',  href: '/services/corporate-travel',   desc: 'GST invoices, flexible monthly accounts, and premium executive vehicles.' },
              { id: 'local-sightseeing',label: 'Local Sightseeing',  icon: '🗺️', tag: 'Kadapa City', from: '₹1,499',  theme: 'green',  href: '/services/local-sightseeing',  desc: 'Curated Kadapa heritage & sightseeing tours. Full-day city exploration.' },
              { id: 'wedding-travel',   label: 'Wedding & Events',   icon: '💒', tag: 'VIP Fleet',    from: '₹1,499',  theme: 'rose',   href: '/services/wedding-travel',     desc: 'Decorated premium fleet for weddings, engagements & VIP events.' },
              { id: 'self-drive',       label: 'Self Drive',         icon: '🔑', tag: 'Drive Yourself',from: '₹1,499', theme: 'brass',  href: '/services/self-drive',         desc: 'Drive yourself in premium sanitized cars. Doorstep handover in Kadapa.' },
            ].map((s, i) => {
              const ServiceVector = serviceIllustrations[s.id] || LocalCabIllustration;
              return (
                <Link
                  key={s.id}
                  href={s.href}
                  className={`${styles.serviceCard} ${styles[`serviceCard--${s.theme}`]}`}
                  id={`service-${s.id}`}
                  style={{ '--delay': `${i * 50}ms` }}
                >
                  {/* Top row: icon + category tag */}
                  <div className={styles.serviceCardTop}>
                    <div className={styles.serviceIconWrap}>
                      <ServiceVector size={48} />
                    </div>
                    <span className={styles.serviceTag}>{s.tag}</span>
                  </div>

                  {/* Body */}
                  <div className={styles.serviceBody}>
                    <h3 className={styles.serviceName}>{s.label}</h3>
                    <p className={styles.serviceDesc}>{s.desc}</p>
                  </div>

                  {/* Footer: from-price + cta */}
                  <div className={styles.serviceFooter}>
                    <div className={styles.serviceFromWrap}>
                      <span className={styles.serviceFromLabel}>From</span>
                      <span className={styles.serviceFromPrice}>{s.from}</span>
                    </div>
                    <div className={styles.serviceCta}>
                      <span className={styles.serviceLink}>Explore</span>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>

                  <div className={styles.serviceAccent} />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ 3. DESTINATIONS SHOWCASE ══ */}
      <section className={`section ${styles.destSection}`}>
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Curated Getaways</span>
            <h2>Where Will You Journey Next?</h2>
            <div className="divider" />
            <p>South India&apos;s most revered temple pilgrimages and majestic natural wonders — all accessible from Kadapa with upfront fixed-price cabs.</p>
          </div>
          <div className={styles.destGrid}>
            {destinations.map((d, i) => (
              <Link key={i} href={d.href} className={styles.destCard} id={`dest-${i}`}>
                <div className={styles.destImg}>
                  <Image src={d.img} alt={d.name} fill quality={85} style={{ objectFit: 'cover' }} />
                  <div className={styles.destImgOverlay} />
                  <div className={styles.destTopRow}>
                    <span className={styles.destBadge}>{d.badge}</span>
                    <span className={styles.destKm}>{d.km}</span>
                  </div>
                </div>
                <div className={styles.destBody}>
                  <div>
                    <div className={styles.destName}>{d.name}</div>
                    <div className={styles.destSub}>{d.sub}</div>
                  </div>
                  <div className={styles.destPrice}>
                    {d.price} <span>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. TRANSPARENT FARES & RATES SECTION WITH INTERACTIVE CALCULATOR ══ */}
      <section className={`section ${styles.ratesSection}`}>
        <div className={styles.ratesBg} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-header">
            <span className="eyebrow">నమస్కారం · Real-Time Fare Estimator</span>
            <h2>Estimate Your Fare in 5 Seconds</h2>
            <div className="divider" />
            <p>రాయలసీమలో నమ్మకమైన ట్రావెల్ పార్టనర్ — Upfront, all-inclusive pricing with zero hidden surcharges.</p>
          </div>

          {/* Interactive Calculator Component */}
          <div style={{ marginBottom: '44px' }}>
            <FareCalculator />
          </div>

          <div className="section-header" style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--charcoal-900)' }}>
              Standard Route Rate Breakdown
            </h3>
          </div>
          <div className={styles.ratesGrid}>
            {[
              {
                icon: '🏙️',
                title: 'Local Kadapa Packages',
                rows: RATES.local.map((r) => ({ label: r.label, val: r.price, note: r.extras })),
                footer: 'Driver + AC + Fuel included. Toll at actuals.',
              },
              {
                icon: '🛣️',
                title: 'Outstation Routes',
                rows: RATES.routes.slice(0, 5).map((r) => ({ label: `${r.from} → ${r.to}`, val: r.oneWay, alt: `${r.roundTrip} RT` })),
                footer: 'Toll & parking at actuals. Driver allowance for overnight.',
              },
              {
                icon: '🏔️',
                title: 'Day Trips & Airport Drops',
                rows: [...RATES.dayTrips, ...RATES.airports.slice(0, 2)].map((r) => ({
                  label: r.label || r.route,
                  val: r.price,
                })),
                footer: 'Entry tickets extra. 24/7 on-time pickup guaranteed.',
              },
            ].map((card, ci) => (
              <div key={ci} className={styles.rateCard}>
                <div className={styles.rateCardHead}>
                  <span className={styles.rateCardIcon}>{card.icon}</span>
                  <span className={styles.rateCardTitle}>{card.title}</span>
                </div>
                <div className={styles.rateCardBody}>
                  {card.rows.map((row, ri) => (
                    <div key={ri} className={styles.rateRow}>
                      <span className={styles.rateLabel}>{row.label}</span>
                      <div className={styles.rateVals}>
                        <span className={styles.rateVal}>{row.val}</span>
                        {row.alt && (
                          <>
                            <span className={styles.rateSep}>|</span>
                            <span className={styles.rateAlt}>{row.alt}</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.rateCardFoot}>{card.footer}</div>
              </div>
            ))}
          </div>
          <p className={styles.ratesDisclaimer}>
            💡 All fares include commercial vehicle, licensed chauffeur & fuel. Toll and parking are paid at actuals.
            Custom itineraries are available on WhatsApp 24/7.
          </p>
        </div>
      </section>

      {/* ⭐ 5. DYNAMIC GOOGLE BUSINESS REVIEWS & SOCIAL PROOF ⭐ */}
      <ReviewsMarquee />

      {/* ══ 6. 3D INFOGRAPHIC PILLARS: THE MANA DIFFERENCE ══ */}
      <section className={`section ${styles.whySection}`}>
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Why Choose MANA</span>
            <h2>The MANA Standard of Excellence</h2>
            <div className="divider" />
            <p>Six foundational commitments built into every single trip we operate across Andhra Pradesh.</p>
          </div>
          <div className={styles.whyGrid}>
            {whyUsInfographics.map((item, i) => {
              const Graphic = item.Illustration;
              return (
                <div key={i} className={styles.whyCard}>
                  <div className={styles.whyIcon}>
                    <Graphic size={48} />
                  </div>
                  <h3 className={styles.whyTitle}>{item.title}</h3>
                  <p className={styles.whyDesc}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ 7. VEHICLE OWNER PARTNER BANNER ══ */}
      <section className={styles.partnerBanner}>
        <div className={styles.partnerBannerBg} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className={styles.partnerInner}>
            <div className={styles.partnerLeft}>
              <span className={styles.partnerPill}>Vehicle Owners &amp; Fleet Partners</span>
              <h2 className={styles.partnerH2}>Own a Vehicle? Earn With MANA.</h2>
              <p className={styles.partnerP}>
                Attach your car to MANA Tours &amp; Travels. We generate verified, recurring customer bookings — you earn consistent revenue.
                Transparent settlements, flexible schedule, and formal written agreements.
              </p>
              <ul className={styles.partnerChecks}>
                <li>Zero upfront fees, security deposits, or hidden costs</li>
                <li>Clear written agreement &amp; industry-best 70% partner revenue share</li>
                <li>Trip-by-trip guaranteed digital UPI settlements</li>
              </ul>
            </div>
            <div className={styles.partnerRight}>
              <Link href="/partner" className="btn btn--charcoal btn--xl" id="partner-cta">
                <span aria-hidden="true">🚗</span> Attach Your Car Today
              </Link>
              <p className={styles.partnerContact}>
                Or call Pavan directly: <a href={`tel:${BUSINESS.phone.pavan}`}>{BUSINESS.phone.pavanDisplay}</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🎬 7b. YOUTUBE COMMUNITY CHANNEL ── */}
      <YouTubeChannel />

      {/* ══ 8. INSTANT BOOKING SECTION ══ */}
      <section className={`section ${styles.bookingSection}`} id="booking-section">
        <div className="container">
          <div className={styles.bookingInner}>
            <div className={styles.bookingLeft}>
              <span className="eyebrow" style={{ display: 'inline-flex', marginBottom: '16px' }}>
                Instant Booking
              </span>
              <h2>Plan Your Journey in 60 Seconds</h2>
              <div className="divider divider--left" style={{ marginBottom: '24px' }} />
              <ul className="checklist">
                <li>Submit your trip details in 60 seconds via the form or WhatsApp</li>
                <li>Direct WhatsApp confirmation with fare quote within 30 minutes</li>
                <li>Pay after completion — Cash, UPI, or Bank Transfer accepted</li>
                <li>Verified chauffeur &amp; vehicle details dispatched before departure</li>
              </ul>

              <div className={styles.bookingCallBox}>
                <p className={styles.bookingCallTitle}>Prefer to speak directly?</p>
                <a href={`tel:${BUSINESS.phone.jyothi}`} className={styles.bookingPhone}>
                  <span aria-hidden="true">💬</span> {BUSINESS.phone.jyothiDisplay} <span>— Jyothi (Booking Desk &amp; Quotes)</span>
                </a>
                <a href={`tel:${BUSINESS.phone.pavan}`} className={styles.bookingPhone}>
                  <span aria-hidden="true">📞</span> {BUSINESS.phone.pavanDisplay} <span>— Pavan (Managing Partner · Fleet)</span>
                </a>
              </div>
            </div>
            <div className={styles.bookingFormWrap}>
              <BookingForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
