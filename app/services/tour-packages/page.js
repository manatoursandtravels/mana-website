import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import BookingForm from '@/components/BookingForm';
import Link from 'next/link';
import { BUSINESS } from '@/lib/constants';
import styles from './tour-packages.module.css';

export const metadata = {
  title: 'Tour Packages from Kadapa | Gandikota, Belum Caves & Horsley Hills | MANA Tours',
  description:
    'Handcrafted private tour packages from Kadapa. Gandikota Gorge Day Trip (₹2,799), Belum Caves Heritage (₹2,499), Gandikota+Belum Combo (₹3,299), Horsley Hills & Tirupati. AC sedans & luxury Innova Crysta. Call +91 99083 00718.',
  keywords: [
    'tour packages from Kadapa',
    'Gandikota tour package',
    'Belum Caves cab from Kadapa',
    'Gandikota day trip',
    'Horsley Hills tour Kadapa',
    'Rayalaseema tour packages',
    'MANA Tours day trips',
  ],
};

const TOUR_PACKAGES = [
  {
    id: 'gandikota',
    title: 'Gandikota Day Expedition',
    tagline: 'The Grand Canyon of India',
    img: '/images/gandikota.jpg',
    badge: '👑 Most Popular',
    distance: '~120 km from Kadapa',
    duration: 'Full Day (~10-12 Hrs)',
    highlights: [
      'Breathtaking Pennar River Gorge Viewpoint',
      'Historic 13th-Century Gandikota Fort & Granary',
      'Intricately carved Raghunatha Swamy Temple',
      'Dramatic Sunset Viewpoint & Photography',
      'Authentic Rayalaseema cuisine stop',
    ],
    rates: [
      { vehicle: 'Sedan (4p)', price: '₹2,799' },
      { vehicle: 'Ertiga (6p)', price: '₹3,699' },
      { vehicle: 'Innova (7p)', price: '₹4,699' },
    ],
    fromPrice: '₹2,799',
  },
  {
    id: 'belum-caves',
    title: 'Belum Caves Heritage Odyssey',
    tagline: 'Subterranean Geological Wonder',
    img: '/images/belum-caves.jpg',
    badge: '🪨 Geological Marvel',
    distance: '~105 km from Kadapa',
    duration: 'Full Day (~8-10 Hrs)',
    highlights: [
      '3.5 km Subterranean Limestone Cave System',
      'Meditation Hall (Dhyana Mandir) & Stalactites',
      'Underground Stream (Patalaganga)',
      'Giant Buddha Statue & Heritage Park',
      'Safe, illuminated tourist pathways',
    ],
    rates: [
      { vehicle: 'Sedan (4p)', price: '₹2,499' },
      { vehicle: 'Ertiga (6p)', price: '₹3,399' },
      { vehicle: 'Innova (7p)', price: '₹4,299' },
    ],
    fromPrice: '₹2,499',
  },
  {
    id: 'gandikota-belum-combo',
    title: 'Gandikota + Belum Caves Combo',
    tagline: 'The Ultimate Rayalaseema Circuit',
    img: '/images/gandikota.jpg',
    badge: '⚡ Best Value Combo',
    distance: '~260 km Total Circuit',
    duration: 'Full Day (~12-14 Hrs)',
    highlights: [
      'Morning exploration of cool Belum Caves',
      'Authentic Rayalaseema Ragi Mudda lunch stop',
      'Afternoon Gandikota Fort & Pennar Gorge',
      'Golden hour sunset over the canyon',
      'Covers both top wonders in a single day',
    ],
    rates: [
      { vehicle: 'Sedan (4p)', price: '₹3,299' },
      { vehicle: 'Ertiga (6p)', price: '₹4,399' },
      { vehicle: 'Innova (7p)', price: '₹5,499' },
    ],
    fromPrice: '₹3,299',
  },
  {
    id: 'horsley-hills',
    title: 'Horsley Hills Mountain Escape',
    tagline: 'The Ooty of Andhra Pradesh',
    img: '/images/horsley-hills.jpg',
    badge: '🌲 Hill Station Retreat',
    distance: '~135 km from Kadapa',
    duration: '1-2 Days (~14-16 Hrs)',
    highlights: [
      'Panoramic ViewPoint overlooking deep valleys',
      'Kalyani — 150-year-old giant Eucalyptus Tree',
      'Gali Bandalu (Wind Rocks) & scenic breezes',
      'Horsley Hills Wildlife Zoo & Nature Trails',
      'Pleasant cool climate all year round',
    ],
    rates: [
      { vehicle: 'Sedan (4p)', price: '₹3,899' },
      { vehicle: 'Ertiga (6p)', price: '₹4,899' },
      { vehicle: 'Innova (7p)', price: '₹5,999' },
    ],
    fromPrice: '₹3,899',
  },
  {
    id: 'tirupati-talakona',
    title: 'Tirupati & Talakona Tour',
    tagline: 'Sacred Darshan & Tropical Waterfalls',
    img: '/images/tirupati.jpg',
    badge: '🛕 Sacred & Nature',
    distance: '~145 km from Kadapa',
    duration: 'Full Day (~14-16 Hrs)',
    highlights: [
      'Lord Venkateswara Swamy Temple Darshan support',
      'Sri Padmavathi Ammavari Temple (Tiruchanur)',
      'Talakona Waterfalls — Highest cascade in AP',
      'Lush Sri Venkateswara National Park forest drive',
      'Smooth early morning / late evening return',
    ],
    rates: [
      { vehicle: 'Sedan (4p)', price: '₹3,499' },
      { vehicle: 'Ertiga (6p)', price: '₹4,599' },
      { vehicle: 'Innova (7p)', price: '₹5,699' },
    ],
    fromPrice: '₹3,499',
  },
  {
    id: 'ooty-nilgiris',
    title: 'Ooty Nilgiris Mountain Tour',
    tagline: 'Queen of Hill Stations Vacation',
    img: '/images/ooty.jpg',
    badge: '🌲 Queen of Hill Stations',
    distance: '~560 km from Kadapa',
    duration: '3 Days / 2 Nights',
    highlights: [
      'Emerald Tea Factory & Nilgiri Tea Plantations',
      'Ooty Lake Boating & Botanical Gardens',
      'Doddabetta Peak & Pykara Waterfalls',
      'Scenic Nilgiri Mountain Railway Toy Train',
      'Coimbatore / Mysore transit connectivity',
    ],
    rates: [
      { vehicle: 'Sedan (4p)', price: '₹12,499' },
      { vehicle: 'Ertiga (6p)', price: '₹16,499' },
      { vehicle: 'Innova (7p)', price: '₹21,999' },
    ],
    fromPrice: '₹12,499',
  },
  {
    id: 'goa-beach-holiday',
    title: 'Goa Coastal & Beach Holiday',
    tagline: 'Sun, Sand & Heritage Escape',
    img: '/images/goa.jpg',
    badge: '🌊 Beach & Heritage Escape',
    distance: '~620 km from Kadapa',
    duration: '4 Days / 3 Nights',
    highlights: [
      'North Goa Golden Beaches (Calangute, Baga, Anjuna)',
      'Historic 17th-Century Fort Aguada & Lighthouse',
      'Old Goa UNESCO Basilicas (Bom Jesus & Se Cathedral)',
      'Dudhsagar Waterfall Jungle Jeep Safari stop',
      'Mandovi River Sunset Luxury Cruise',
    ],
    rates: [
      { vehicle: 'Sedan (4p)', price: '₹15,999' },
      { vehicle: 'Ertiga (6p)', price: '₹20,999' },
      { vehicle: 'Innova (7p)', price: '₹27,999' },
    ],
    fromPrice: '₹15,999',
  },
];

const TOUR_STEPS = [
  {
    num: '1',
    title: 'Doorstep Pickup in Kadapa',
    desc: 'Your sanitized AC car and courteous local driver arrive at your hotel or home at the exact agreed morning time.',
  },
  {
    num: '2',
    title: 'Scenic Highway Cruise',
    desc: 'Relax on smooth state highways. Enjoy optional stops for authentic South Indian breakfast and filter coffee.',
  },
  {
    num: '3',
    title: 'Unrushed Sightseeing',
    desc: 'Take your time at viewpoints, fort monuments, and photo spots. Zero pressure, zero group tour rush.',
  },
  {
    num: '4',
    title: 'Safe Return Drop',
    desc: 'After sunset and dinner, we drive you comfortably back to Kadapa and drop you right at your doorstep.',
  },
];

export default function TourPackagesPage() {
  return (
    <>
      <Header />

      {/* ══ 1. CINEMATIC HERO ══ */}
      <section className={styles.tourHero}>
        <div className={styles.heroBg}>
          <Image
            src="/images/gandikota.jpg"
            alt="Scenic Gandikota gorge and fort in Andhra Pradesh"
            fill
            priority
            quality={92}
            style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
          />
          <div className={styles.heroBgOverlay} />
        </div>

        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroBreadcrumb}>
            <Link href="/">Home</Link> <span>›</span> <Link href="/#services">Services</Link> <span>›</span> <span>Tour Packages</span>
          </div>

          <div className={styles.heroPill}>
            <span>✨ Handcrafted Private Day Tours & Escapes</span>
          </div>

          <h1 className={styles.heroTitle}>
            Explore Andhra&apos;s Wonders.<br />
            <span className={styles.heroTitleGradient}>Curated Tour Packages.</span>
          </h1>

          <p className={styles.heroSubtitle}>
            From the grand Pennar river gorge at Gandikota to the mysterious subterranean halls of Belum Caves — private chauffeur-driven tour packages with door-to-door pickup in Kadapa.
          </p>

          <div className={styles.heroHighlights}>
            <span className={styles.highlightBadge}>🚗 Spotless AC Sedans & Crysta</span>
            <span className={styles.highlightBadge}>⏱️ Unrushed Private Sightseeing</span>
            <span className={styles.highlightBadge}>🛡️ 100% Fixed Upfront Fares</span>
            <span className={styles.highlightBadge}>⭐ 5.0 Google Rated Experience</span>
          </div>
        </div>
      </section>

      {/* ══ 2. TOUR PACKAGES & STICKY BOOKING ══ */}
      <section className="section">
        <div className="container">
          <div className={styles.packagesLayout}>
            {/* Left Column: Tour Package Cards */}
            <div className={styles.packagesCol}>
              <div className="section-header" style={{ textAlign: 'left', marginBottom: '8px' }}>
                <span className="eyebrow">Handcrafted Itineraries</span>
                <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)' }}>Choose Your Destination</h2>
                <div className="divider divider--left" />
                <p>Every tour package includes private AC vehicle, fuel, experienced chauffeur, and flexible sightseeing stops.</p>
              </div>

              <div className={styles.packagesGrid}>
                {TOUR_PACKAGES.map((pkg) => (
                  <div key={pkg.id} className={styles.tourCard} id={`tour-${pkg.id}`}>
                    <div className={styles.tourCardImgWrap}>
                      <Image
                        src={pkg.img}
                        alt={pkg.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className={styles.tourCardImg}
                        style={{ objectFit: 'cover' }}
                      />
                      <span className={styles.tourBadge}>{pkg.badge}</span>
                      <span className={styles.tourDurationBadge}>⏱️ {pkg.duration}</span>
                    </div>

                    <div className={styles.tourCardBody}>
                      <div className={styles.tourDistance}>{pkg.distance}</div>
                      <h3 className={styles.tourTitle}>{pkg.title}</h3>
                      <div className={styles.tourTagline}>{pkg.tagline}</div>

                      <ul className={styles.tourHighlights}>
                        {pkg.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>

                      {/* Tiered Rates Grid */}
                      <div className={styles.tourRatesGrid}>
                        {pkg.rates.map((r, i) => (
                          <div key={i} className={styles.tourRateItem}>
                            <span className={styles.tourRateVehicle}>{r.vehicle}</span>
                            <span className={styles.tourRatePrice}>{r.price}</span>
                          </div>
                        ))}
                      </div>

                      <div className={styles.tourCardFooter}>
                        <div className={styles.tourFromPrice}>
                          <span className="fromLabel">Starts from</span>
                          <span className={styles.fromAmount}>{pkg.fromPrice}</span>
                        </div>
                        <a
                          href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hi MANA Tours, I would like to book the "${pkg.title}" (${pkg.fromPrice}). Please share availability and details.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.tourWaBtn}
                        >
                          <span>Book on WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Inclusions & Transparency Box */}
              <div className={styles.transparencyBox}>
                <div className="section-header" style={{ textAlign: 'left', marginBottom: '20px' }}>
                  <span className="eyebrow">Complete Transparency</span>
                  <h3 style={{ fontSize: '1.4rem' }}>What Is Included in Your Tour Fare?</h3>
                </div>
                <div className={styles.transparencyGrid}>
                  <div className={styles.includedCol}>
                    <h4><span className={styles.checkIcon}>✅</span> 100% Included in Package</h4>
                    <ul className={styles.checkList}>
                      <li><span className={styles.checkIcon}>✓</span> Dedicated Air-Conditioned Vehicle (Etios / Ertiga / Innova)</li>
                      <li><span className={styles.checkIcon}>✓</span> Fuel charges for entire round-trip itinerary</li>
                      <li><span className={styles.checkIcon}>✓</span> Experienced chauffeur with deep local route knowledge</li>
                      <li><span className={styles.checkIcon}>✓</span> Doorstep pickup and return drop anywhere in Kadapa city</li>
                      <li><span className={styles.checkIcon}>✓</span> Sightseeing waiting time at all destination viewpoints</li>
                      <li><span className={styles.checkIcon}>✓</span> Comprehensive commercial passenger insurance</li>
                    </ul>
                  </div>

                  <div className={styles.excludedCol}>
                    <h4><span className={styles.infoIcon}>ℹ️</span> Customer Managed Expenses</h4>
                    <ul className={styles.checkList}>
                      <li><span className={styles.infoIcon}>•</span> Monument entry tickets & cave passes (paid directly at counters)</li>
                      <li><span className={styles.infoIcon}>•</span> Personal meals, snacks, and beverage expenses</li>
                      <li><span className={styles.infoIcon}>•</span> Highway toll gates & destination parking slips (charged at actuals)</li>
                      <li><span className={styles.infoIcon}>•</span> Local heritage guide tips (optional)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Quick Booking & Custom Tour Builder */}
            <div className={styles.stickyFormWrap}>
              <BookingForm />

              {/* Custom Multi-Day Tour Card */}
              <div className={styles.customTourCard}>
                <h3>Need a Custom Tour?</h3>
                <p>
                  Planning a 2-day or 3-day family vacation covering Gandikota, Belum, Ahobilam & Srisailam? We craft bespoke custom itineraries tailored to your schedule.
                </p>
                <a
                  href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent('Hi Pavan & MANA Tours, I would like a custom multi-day tour package from Kadapa. Here are my dates and requirements:')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.customWaBtn}
                >
                  💬 Plan Custom Tour on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 3. HOW IT WORKS 4-STEP TIMELINE ══ */}
      <section className={`section ${styles.howItWorksSection}`}>
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Seamless Journey Flow</span>
            <h2>How Your MANA Day Tour Works</h2>
            <div className="divider" />
            <p>From prompt morning pickup to safe evening arrival — effortless, private travel for you and your family.</p>
          </div>

          <div className={styles.stepsGrid}>
            {TOUR_STEPS.map((s) => (
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
