import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import BookingForm from '@/components/BookingForm';
import FareCalculator from '@/components/FareCalculator';
import Link from 'next/link';
import BookingCTA from '@/components/BookingCTA';
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
    absolute: 'MANA Tours & Travels Kadapa — #1 Cab Service, Holiday Packages & Self-Drive in Kadapa',
  },
  description:
    'MANA Tours & Travels in Kadapa — 5.0★ Google Rated. Kadapa to Tirupati package from ₹2,099, self-drive cars from ₹1,499/day, Bangalore & Hyderabad airport taxi drops, Gandikota tours & outstation cabs. Clean AC vehicles, zero hidden costs. Call +91 99083 00718.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'MANA Tours & Travels Kadapa — Every Journey, A New Experience',
    description: 'Premier cab, self-drive rentals and holiday tour packages from Kadapa, Andhra Pradesh. 5.0★ Google Rated. Call +91 99083 00718.',
    url: 'https://www.manatoursandtravels.com',
    siteName: 'MANA Tours & Travels Kadapa',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/hero-car.jpg',
        width: 1200,
        height: 630,
        alt: 'MANA Tours & Travels Kadapa Premium Fleet - Black Mahindra XUV 3XO SUV and Toyota Innova Crysta',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MANA Tours & Travels Kadapa — #1 Cab & Self-Drive Service',
    description: 'Premier cab, self-drive car rentals & holiday tour packages from Kadapa.',
    images: ['/images/hero-car.jpg'],
  },
};

const stats = [
  { num: '5.0', label: 'Google Rating', sub: '50+ Verified Reviews', Component: HolographicGoldStar },
  { num: '24/7', label: 'Available All Hours', sub: 'Live Dispatch Desk', Component: SweepingClockHand },
  { num: '₹0', label: 'Hidden Charges', sub: '100% Upfront Quotes', Component: ShimmeringRupeeCascade },
  { num: '9+', label: 'Specialized Fleets', sub: 'Sedans, MPVs & SUVs', Component: AnimatedLuxuryFleet },
];

const tourPackages = [
  {
    id: 'tirupati-darshan',
    name: 'Tirupati Balaji VIP Darshan Tour',
    sub: 'Sri Venkateswara Swamy Temple · Same-Day Return',
    tag: '👑 Most Popular',
    duration: 'Same-Day Return (12-14 hrs)',
    km: '~250 km',
    img: '/images/tirupati.jpg',
    price: 'From ₹2,099',
    priceSub: 'All-inclusive AC vehicle & chauffeur',
    inclusions: ['Dedicated AC Sedan / Innova', 'Alipiri & Tirumala Ghat Route', 'Doorstep Pickup in Kadapa', 'Zero Hidden Surcharges'],
    href: '/routes/kadapa-tirupati-cab',
    waText: 'Hi Pavan, I want to book the Tirupati Balaji Temple Tour Package from Kadapa.',
  },
  {
    id: 'gandikota-canyon',
    name: 'Gandikota Canyon & Belum Caves Expedition',
    sub: 'Grand Canyon of India & Historic Underground Caves',
    tag: '🏜️ Must-Visit Adventure',
    duration: '1 Day Full-Day Tour',
    km: '~120 km',
    img: '/images/gandikota.jpg',
    price: 'Best Price Guaranteed',
    priceSub: 'Full day sightseeing & flexible stops',
    inclusions: ['Gandikota Fort & Gorge Viewpoint', 'Belum Caves Exploration', 'Scenic Rayalaseema Route', 'Doorstep Pickup & Return'],
    href: '/routes/kadapa-gandikota-tour',
    waText: 'Hi Pavan, I want to enquire about the Gandikota & Belum Caves Day Tour Package.',
  },
  {
    id: 'srisailam-yatra',
    name: 'Srisailam Mallikarjuna Jyotirlinga Yatra',
    sub: 'Sacred 12-Jyotirlinga & Shakti Peeth Pilgrimage',
    tag: '🔱 Sacred Yatra',
    duration: '2 Days / 1 Night',
    km: '~240 km',
    img: '/images/tirupati.jpg',
    price: 'Call for Custom Tour',
    priceSub: 'AC Vehicle + Overnight Driver Allowance',
    inclusions: ['Mallikarjuna Swamy Temple Darshan', 'Nallamala Forest Scenic Ghat Drive', 'Patalaganga & Dam Viewpoint', 'Dedicated Chauffeur Stay'],
    href: '/routes/kadapa-srisailam-cab',
    waText: 'Hi Pavan, I want to book the 2-Day Srisailam Jyotirlinga Yatra package from Kadapa.',
  },
  {
    id: 'ahobilam-safari',
    name: 'Ahobilam Nava Narasimha Temple Safari',
    sub: '9 Narasimha Shrines in Majestic Eastern Ghats',
    tag: '🛕 Sacred Heritage Trek',
    duration: '1 Day / Extended Day',
    km: '~185 km',
    img: '/images/gandikota.jpg',
    price: 'Call for Best Rate',
    priceSub: 'Rough ghat experienced chauffeur',
    inclusions: ['Lower & Upper Ahobilam Temples', 'Experienced Ghat Route Driver', 'Clean Sanitized AC Fleet', 'Flexible Darshan Timings'],
    href: '/services/pilgrimage-tours',
    waText: 'Hi Pavan, I want to book the Ahobilam Nava Narasimha Temple Pilgrimage cab.',
  },
  {
    id: 'ooty-nilgiris',
    name: 'Ooty & Nilgiri Hills Scenic Escape',
    sub: 'Queen of Hill Stations · Tea Gardens & Lakes',
    tag: '🌲 Hill Vacation',
    duration: '3 Days / 2 Nights',
    km: '~560 km',
    img: '/images/ooty.jpg',
    price: 'Custom Holiday Package',
    priceSub: 'AC Sedan / Innova Crysta for Hills',
    inclusions: ['Botanical Gardens & Doddabetta', 'Tea Plantations & Pykara Lake', 'Coonoor Scenic Ghat Cruise', 'Complete Inter-State Permits'],
    href: '/routes/kadapa-ooty-tour',
    waText: 'Hi Pavan, I want to plan the 3D/2N Ooty Nilgiris Holiday Tour Package from Kadapa.',
  },
  {
    id: 'goa-coastal',
    name: 'Goa Coastal Beach & Heritage Holiday',
    sub: 'Sun, Sand, Historic Forts & Portuguese Churches',
    tag: '🌊 Beach Holiday',
    duration: '4 Days / 3 Nights',
    km: '~620 km',
    img: '/images/goa.jpg',
    price: 'Custom Holiday Package',
    priceSub: 'Long-distance highway luxury fleet',
    inclusions: ['North & South Goa Sightseeing', 'Old Goa Heritage Cathedrals', 'Beachfront Cruise & Leisure', 'Spacious Innova Crysta / Ertiga'],
    href: '/routes/kadapa-goa-tour',
    waText: 'Hi Pavan, I want to plan the 4D/3N Goa Holiday Package from Kadapa.',
  },
];

const fleetHighlights = [
  {
    id: 'xuv3xo',
    name: 'Mahindra XUV 3XO (Black Edition)',
    subtitle: 'Turbocharged Compact SUV with Skyroof & Level 2 ADAS',
    category: '🔥 New Arrival SUV',
    img: '/images/fleet-xuv-3xo.png',
    rating: '5.0 ★ (Brand New Fleet)',
    specs: ['5 Passengers', 'Turbo Engine', 'Skyroof & ADAS', 'Dual AC'],
    selfDriveRate: '₹1,999 / day',
    outstationNote: 'Self-Drive or Outstation Chauffeur',
    bestFor: 'Youth road trips, couples & Gandikota canyon drives with sporty SUV punch.',
    href: '/services/self-drive',
    waText: 'Hi Pavan, I want to book the New Black Mahindra XUV 3XO SUV.',
  },
  {
    id: 'innova',
    name: 'Toyota Innova Crysta',
    subtitle: 'Luxury Executive MPV · King of Indian Highways',
    category: '👑 Luxury Executive MPV',
    img: '/images/fleet-innova-crysta.jpg',
    rating: '5.0 ★ (95+ Trips)',
    specs: ['7 Captain Seats', 'Heavy Luggage', 'High-Torque Diesel', 'Auto Climate'],
    selfDriveRate: '₹2,999 / day',
    outstationNote: 'Most popular for Tirupati & Srisailam',
    bestFor: 'VIP family pilgrimages, temple yatras, and interstate luxury travel.',
    href: '/services/outstation-cabs',
    waText: 'Hi Pavan, I want to book the Toyota Innova Crysta for our trip.',
  },
  {
    id: 'ertiga',
    name: 'Maruti Suzuki Ertiga',
    subtitle: 'Smart Hybrid 7-Seater Family MPV',
    category: '👨‍👩‍👧‍👦 Family Favorite',
    img: '/images/fleet-ertiga-mpv.jpg',
    rating: '4.9 ★ (85+ Trips)',
    specs: ['7 Passengers', 'Roof AC Vents', 'Foldable 3rd Row', 'Smooth Mileage'],
    selfDriveRate: '₹2,199 / day',
    outstationNote: 'Budget-friendly 7-seater outstation',
    bestFor: 'Joint family temple visits, group vacations, and airport transfers.',
    href: '/services/outstation-cabs',
    waText: 'Hi Pavan, I want to book the Maruti Ertiga 7-Seater MPV.',
  },
  {
    id: 'etios',
    name: 'Toyota Etios / Swift Dzire',
    subtitle: 'Executive Economy AC Sedan',
    category: '⚡ Best Value Sedan',
    img: '/images/fleet-etios-sedan.jpg',
    rating: '5.0 ★ (120+ Trips)',
    specs: ['5 Passengers', '592L Boot Space', 'Chilled AC', 'High Mileage'],
    selfDriveRate: '₹1,499 / day',
    outstationNote: 'Daily local & one-way drops',
    bestFor: 'Quick city commutes, airport taxi drops, and economical road trips.',
    href: '/services/local-cabs',
    waText: 'Hi Pavan, I want to book the Toyota Etios / Swift Dzire sedan.',
  },
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
            alt="MANA Tours and Travels Kadapa premium fleet - Brand new Metallic Black Mahindra XUV 3XO SUV and Toyota Innova Crysta parked on scenic highway"
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
              <span className={styles.pillSub}>Kadapa&apos;s Premier Tours &amp; Holiday Travel Partner</span>
            </a>

            <h1 className={styles.heroH1}>
              <span className={styles.heroH1Line1}>Every Journey,</span><br />
              <span className={styles.heroH1Line2}>A New Experience.</span>
            </h1>

            <p className={styles.heroP}>
              Your trusted travel partner in Kadapa for sacred temple pilgrimages, curated holiday packages, fixed airport taxi drops, and self-drive car rentals. Clean AC vehicles, verified chauffeurs, and upfront transparent fares.
            </p>

            {/* Mobile-Friendly Quick Service Shortcuts */}
            <div className={styles.heroQuickChips} aria-label="Popular travel shortcuts">
              <Link href="#tour-packages" className={styles.heroQuickChip}>
                <span className={styles.hqcIcon}>🛕</span>
                <span className={styles.hqcLabel}>Tirupati Darshan</span>
                <span className={styles.hqcPrice}>Best Fare</span>
              </Link>
              <Link href="#tour-packages" className={styles.heroQuickChip}>
                <span className={styles.hqcIcon}>🏜️</span>
                <span className={styles.hqcLabel}>Gandikota Canyon</span>
                <span className={styles.hqcPrice}>Day Tour</span>
              </Link>
              <Link href="/services/self-drive" className={styles.heroQuickChip}>
                <span className={styles.hqcIcon}>🔑</span>
                <span className={styles.hqcLabel}>Self Drive (XUV 3XO)</span>
                <span className={styles.hqcPrice}>₹1,499/d</span>
              </Link>
              <Link href="/services/airport-transfers" className={styles.heroQuickChip}>
                <span className={styles.hqcIcon}>✈️</span>
                <span className={styles.hqcLabel}>Airport Drops</span>
                <span className={styles.hqcPrice}>24/7 Desk</span>
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
              <BookingCTA className="btn btn--primary btn--xl" id="hero-book" label="🚗 Plan Your Journey" />
              <a
                href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent('Hi Pavan, I want to enquire about tour packages and cab booking from Kadapa.')}`}
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

        {/* ══ STATS GRID ══ */}
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

      {/* ══ 2. TRENDING TOUR & PILGRIMAGE PACKAGES (Tours Category Showcase) ══ */}
      <section className={`section ${styles.packagesSection}`} id="tour-packages">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">✦ Curated South India Holidays &amp; Pilgrimages ✦</span>
            <h2>Trending Tour Packages from Kadapa</h2>
            <div className="divider" />
            <p>South India&apos;s most revered sacred temple shrines, dramatic red gorges, and serene hill retreats — all hosted in private sanitized AC vehicles with professional chauffeurs.</p>
          </div>

          <div className={styles.packagesGrid}>
            {tourPackages.map((pkg) => (
              <div key={pkg.id} className={styles.pkgCard}>
                <div className={styles.pkgImgWrap}>
                  <Image
                    src={pkg.img}
                    alt={pkg.name}
                    fill
                    quality={85}
                    className={styles.pkgImg}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className={styles.pkgImgOverlay} />
                  <div className={styles.pkgTopBadges}>
                    <span className={styles.pkgTagBadge}>{pkg.tag}</span>
                    <span className={styles.pkgDurationBadge}>⏱️ {pkg.duration}</span>
                  </div>
                  <span className={styles.pkgBottomBadge}>📍 {pkg.km}</span>
                </div>

                <div className={styles.pkgBody}>
                  <div>
                    <h3 className={styles.pkgTitle}>{pkg.name}</h3>
                    <p className={styles.pkgSub}>{pkg.sub}</p>
                  </div>

                  <div className={styles.pkgInclusions}>
                    {pkg.inclusions.map((inc, idx) => (
                      <div key={idx} className={styles.pkgIncItem}>
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>

                  <div className={styles.pkgPriceRow}>
                    <span className={styles.pkgPrice}>{pkg.price}</span>
                    <span className={styles.pkgPriceSub}>{pkg.priceSub}</span>
                  </div>

                  <div className={styles.pkgActions}>
                    <a
                      href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(pkg.waText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.pkgWaBtn}
                    >
                      <span>💬 WhatsApp</span>
                    </a>
                    <Link href={pkg.href} className={styles.pkgBookBtn}>
                      <span>View Route →</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. OUR PREMIUM TRAVEL FLEET (Highlighting XUV 3XO SUV & Innova Crysta) ══ */}
      <section className={`section ${styles.fleetSection}`} id="fleet">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">✦ Executive Chauffeur &amp; Self-Drive Fleet ✦</span>
            <h2>Travel in Uncompromised Comfort</h2>
            <div className="divider" />
            <p>From the brand new Stealth Black Mahindra XUV 3XO Turbo SUV with Skyroof to the executive Toyota Innova Crysta — fully sanitized, commercially insured, and inspected before every trip.</p>
          </div>

          <div className={styles.fleetGrid}>
            {fleetHighlights.map((car) => (
              <div key={car.id} className={styles.fleetCard}>
                <div className={styles.fleetImgWrap}>
                  <Image
                    src={car.img}
                    alt={car.name}
                    fill
                    quality={85}
                    className={styles.fleetImg}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <span className={styles.fleetBadge}>{car.category}</span>
                  <span className={styles.fleetRatingBadge}>{car.rating}</span>
                </div>

                <div className={styles.fleetBody}>
                  <div>
                    <h3 className={styles.fleetName}>{car.name}</h3>
                    <p className={styles.fleetSubtitle}>{car.subtitle}</p>
                  </div>

                  <div className={styles.fleetSpecsGrid}>
                    {car.specs.map((spec, sidx) => (
                      <span key={sidx} className={styles.fleetSpecItem}>
                        • {spec}
                      </span>
                    ))}
                  </div>

                  <div className={styles.fleetRateBox}>
                    <div>
                      <div className={styles.fleetRateVal}>{car.selfDriveRate}</div>
                      <div className={styles.fleetRateLabel}>{car.outstationNote}</div>
                    </div>
                  </div>

                  <div className={styles.fleetCtaRow}>
                    <a
                      href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(car.waText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.fleetWaBtn}
                    >
                      <span>💬 Reserve</span>
                    </a>
                    <Link href={car.href} className={styles.fleetDetailBtn}>
                      <span>Details</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. SPECIALIZED SERVICES GRID ══ */}
      <section className={`section ${styles.servicesSection}`}>
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">✦ Complete Travel Solutions ✦</span>
            <h2>Every Travel Need, Crafted to Perfection</h2>
            <div className="divider" />
            <p>From local Kadapa city hourly packages to cross-state pilgrimage journeys — explore our specialized fleet services with transparent upfront pricing.</p>
          </div>
          <div className={styles.servicesGrid}>
            {[
              { id: 'local-cabs',       label: 'Local Cabs',         icon: '🚗', tag: 'City Rides',    from: 'Best Rate',     theme: 'blue',   href: '/services/local-cabs',         desc: '4hr/40km & 8hr/80km city packages. Driver + AC + Fuel included.' },
              { id: 'outstation-cabs',  label: 'Outstation Cabs',    icon: '🛣️', tag: 'Intercity',    from: 'Call for Fare', theme: 'red',    href: '/services/outstation-cabs',    desc: 'One-way & round-trip travel across AP & South India. Call 24/7 for instant quote.' },
              { id: 'airport-transfers',label: 'Airport Transfers',  icon: '✈️', tag: '24/7 Drops',   from: 'Instant Quote', theme: 'indigo', href: '/services/airport-transfers',  desc: 'Fixed-price pickup & drop to Tirupati, Hyderabad & Bangalore airports.' },
              { id: 'pilgrimage-tours', label: 'Pilgrimage Tours',   icon: '🛕', tag: 'Sacred Trips', from: 'Call for Fare', theme: 'amber',  href: '/services/pilgrimage-tours',   desc: 'Tirupati, Srisailam, Ahobilam & more. Darshan-timed departures.' },
              { id: 'tour-packages',    label: 'Tour Packages',      icon: '🏔️', tag: 'Curated',      from: 'Best Package',  theme: 'teal',   href: '/services/tour-packages',      desc: 'Gandikota, Belum, Ooty & Goa. Full-day guided packages with expert guide.' },
              { id: 'corporate-travel', label: 'Corporate Travel',   icon: '🏢', tag: 'GST Ready',    from: 'Custom Quote',  theme: 'slate',  href: '/services/corporate-travel',   desc: 'GST invoices, flexible monthly accounts, and premium executive vehicles.' },
              { id: 'local-sightseeing',label: 'Local Sightseeing',  icon: '🗺️', tag: 'Kadapa City', from: 'Call for Fare', theme: 'green',  href: '/services/local-sightseeing',  desc: 'Curated Kadapa heritage & sightseeing tours. Full-day city exploration.' },
              { id: 'wedding-travel',   label: 'Wedding & Events',   icon: '💒', tag: 'VIP Fleet',    from: 'VIP Quote',     theme: 'rose',   href: '/services/wedding-travel',     desc: 'Decorated premium fleet for weddings, engagements & VIP events.' },
              { id: 'self-drive',       label: 'Self Drive',         icon: '🔑', tag: 'New XUV 3XO SUV',from: '₹1,499/d',     theme: 'brass',  href: '/services/self-drive',         desc: 'Drive yourself in sanitized cars: Swift Dzire, New Black XUV 3XO SUV & Ertiga. Doorstep handover in Kadapa.' },
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
                      <span className={styles.serviceFromLabel}>Fare</span>
                      <span className={styles.serviceFromPrice}>{s.from}</span>
                    </div>
                    <div className={styles.serviceCta}>
                      <span className={styles.serviceLink}>Call Desk</span>
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

      {/* ══ 5. TRANSPARENT FARES & RATES SECTION WITH INTERACTIVE CALCULATOR ══ */}
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
            💡 All fares include commercial vehicle, licensed chauffeur &amp; fuel. Toll and parking are paid at actuals.
            Custom itineraries are available on WhatsApp 24/7.
          </p>
        </div>
      </section>

      {/* ⭐ 6. DYNAMIC GOOGLE BUSINESS REVIEWS & SOCIAL PROOF ⭐ */}
      <ReviewsMarquee />

      {/* ══ 7. 6 INFOGRAPHIC PILLARS: THE MANA DIFFERENCE ══ */}
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

      {/* ══ 8. VEHICLE OWNER PARTNER BANNER ══ */}
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

      {/* 🎬 9. YOUTUBE COMMUNITY CHANNEL ── */}
      <YouTubeChannel />

      {/* ══ 10. INSTANT BOOKING SECTION ══ */}
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
