import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import BookingForm from '@/components/BookingForm';
import Link from 'next/link';
import styles from '../service.module.css';
import { RATES, BUSINESS } from '@/lib/constants';

export const metadata = {
  title: 'Local Hourly Cab Rentals in Kadapa | 4hr & 8hr City Packages',
  description:
    'Book local cabs in Kadapa. 4 hours/40 km at ₹999, 8 hours/80 km at ₹1,799, full day 12hr at ₹2,499. AC sedan with experienced driver. Call +91 99083 00718.',
  alternates: {
    canonical: '/services/local-cabs',
  },
  openGraph: {
    title: 'Local Cab Service in Kadapa | 4hr & 8hr Packages | MANA Tours',
    description: 'Hourly city taxi packages in Kadapa from ₹999. AC sedan, professional chauffeur, fuel included.',
    url: 'https://www.manatoursandtravels.com/services/local-cabs',
    siteName: 'MANA Tours & Travels',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/images/hero-car.jpg', width: 1200, height: 630, alt: 'Local Cabs Kadapa' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Local Cab Service Kadapa | MANA Tours',
    description: 'Affordable hourly car rentals in Kadapa with chauffeur and fuel included.',
    images: ['/images/hero-car.jpg'],
  },
};

const LOCAL_PACKAGES = [
  {
    id: '4hr',
    badge: '⚡ Quick Commute',
    name: '4 Hours / 40 km',
    price: '₹999',
    priceSub: 'Extra: ₹13/km · ₹150/hr',
    extras: 'Ideal for local hospital visits, bank errands, or quick meetings across Kadapa.',
    specs: [
      'Toyota Etios / Swift Dzire AC Sedan',
      'Doorstep pickup & drop anywhere in Kadapa',
      'Fuel for 40 km included',
      'Driver waiting time included',
    ],
  },
  {
    id: '8hr',
    badge: '👑 Most Popular',
    name: '8 Hours / 80 km',
    price: '₹1,799',
    priceSub: 'Extra: ₹13/km · ₹150/hr',
    extras: 'Full-day convenience for shopping, multi-stop family events, or official visits.',
    specs: [
      'Spotless AC Sedan with chilled air conditioning',
      'Multiple stops across Kadapa & outskirts',
      'Fuel for 80 km included',
      'Experienced courteous driver at your service',
    ],
  },
  {
    id: '12hr',
    badge: '🌟 Full Day Freedom',
    name: '12 Hours / 120 km',
    price: '₹2,499',
    priceSub: 'Extra: ₹13/km · ₹150/hr',
    extras: 'Comprehensive day coverage including nearby temples, relatives visits & dinner return.',
    specs: [
      'Premium AC vehicle allocated for the full day',
      'Extended 120 km city & highway perimeter allowance',
      'Zero rush, flexible multi-location itinerary',
      '24/7 dedicated support desk',
    ],
  },
  {
    id: 'night-drop',
    badge: '🌙 24/7 Night Desk',
    name: 'Kadapa Hub / Station Drop',
    price: '₹499',
    priceSub: 'Fixed point-to-point',
    extras: 'Reliable late-night & 3 AM railway station / bus stand transfers.',
    specs: [
      'Guaranteed on-time arrival 10 min before scheduled time',
      'Help with luggage loading & unloading',
      'Zero midnight surge pricing',
      'Live driver tracking on WhatsApp',
    ],
  },
];

const STEPS = [
  {
    num: '1',
    title: 'Select Your Package',
    desc: 'Choose from 4hr, 8hr, or full-day hourly packages based on your day schedule.',
  },
  {
    num: '2',
    title: 'Share Pickup Point',
    desc: 'Tell us your Kadapa address or hotel — driver arrives 10 minutes before the booking time.',
  },
  {
    num: '3',
    title: 'Ride in Comfort',
    desc: 'Enjoy chilled AC travel with unlimited intermediate stops within your allotted hours & km.',
  },
  {
    num: '4',
    title: 'Transparent Settlement',
    desc: 'Pay the exact quoted fare via UPI, GPay, PhonePe, or Cash with zero hidden surcharges.',
  },
];

export default function LocalCabsPage() {
  return (
    <>
      <Header />

      {/* ══ 1. HERO SECTION ══ */}
      <section className={styles.serviceHero}>
        <div className={styles.heroBgOverlay} />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroBreadcrumb}>
            <Link href="/">Home</Link> <span>›</span> <Link href="/#services">Services</Link> <span>›</span> <span>Local Cabs</span>
          </div>

          <div className={styles.heroPill}>
            <span>🚗 Hourly City Cabs in Kadapa</span>
          </div>

          <h1 className={styles.heroTitle}>
            City Commutes on Your Terms.<br />
            <span className={styles.heroTitleGradient}>Transparent Hourly Rates.</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Fixed, transparent packages for hospital visits, shopping, family events, and business commutes across Kadapa. Spotless AC sedans with verified local drivers.
          </p>

          <div className={styles.heroHighlights}>
            <span className={styles.highlightBadge}>⏱️ 10-Min Punctual Pickup</span>
            <span className={styles.highlightBadge}>🚗 Spotless Clean AC Sedans</span>
            <span className={styles.highlightBadge}>🛡️ Zero Surge Night Pricing</span>
            <span className={styles.highlightBadge}>⭐ 5.0 Google Rated Service</span>
          </div>
        </div>
      </section>

      {/* ══ 2. PACKAGES & BOOKING ══ */}
      <section className="section">
        <div className="container">
          <div className={styles.contentGrid}>
            <div className={styles.mainCol}>
              <div className="section-header" style={{ textAlign: 'left', marginBottom: '8px' }}>
                <span className="eyebrow">Hourly &amp; Day Packages</span>
                <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>Choose Your Local Package</h2>
                <div className="divider divider--left" />
                <p>All packages include AC vehicle, fuel, and experienced chauffeur for seamless city transit.</p>
              </div>

              <div className={styles.packageCards}>
                {LOCAL_PACKAGES.map((pkg) => (
                  <div key={pkg.id} className={styles.packageCard}>
                    <span className={styles.packageBadge}>{pkg.badge}</span>
                    <div className={styles.packageName}>{pkg.name}</div>
                    <div className={styles.packagePrice}>
                      {pkg.price}
                      <span className={styles.packagePriceSub}>{pkg.priceSub}</span>
                    </div>
                    <div className={styles.packageExtras}>{pkg.extras}</div>

                    <ul className={styles.packageSpecs}>
                      {pkg.specs.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>

                    <a
                      href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hi MANA Tours, I want to book the "${pkg.name}" (${pkg.price}) local package in Kadapa.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.packageBtn}
                    >
                      💬 Book on WhatsApp
                    </a>
                  </div>
                ))}
              </div>

              {/* Inclusions & Transparency Box */}
              <div className={styles.inExBox}>
                <div className={styles.inBox}>
                  <h4><span className={styles.checkIcon}>✅</span> What&apos;s Included</h4>
                  <ul className={styles.checkList}>
                    <li><span className={styles.checkIcon}>✓</span> Dedicated Air-Conditioned Sedan (Etios / Dzire)</li>
                    <li><span className={styles.checkIcon}>✓</span> Fuel for the package kilometers included</li>
                    <li><span className={styles.checkIcon}>✓</span> Experienced, licensed local driver</li>
                    <li><span className={styles.checkIcon}>✓</span> Doorstep pickup and drop anywhere in Kadapa</li>
                    <li><span className={styles.checkIcon}>✓</span> 24/7 phone and WhatsApp concierge support</li>
                  </ul>
                </div>

                <div className={styles.exBox}>
                  <h4><span className={styles.infoIcon}>ℹ️</span> Extra Surcharges (If Any)</h4>
                  <ul className={styles.checkList}>
                    <li><span className={styles.infoIcon}>•</span> Extra Kilometers beyond package limit: ₹13 / km</li>
                    <li><span className={styles.infoIcon}>•</span> Extra Hours beyond package duration: ₹150 / hr</li>
                    <li><span className={styles.infoIcon}>•</span> Destination parking fees (charged at actuals)</li>
                    <li><span className={styles.infoIcon}>•</span> Highway toll gates outside city limits (actuals)</li>
                  </ul>
                </div>
              </div>

              {/* Perfect For Grid */}
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '14px' }}>Perfect For All Kadapa Needs</h3>
                <div className={styles.useCaseGrid}>
                  {[
                    '🏥 Hospital Visits & Medical Checkups',
                    '🛍️ Wedding Shopping & Market Runs',
                    '🚆 Railway Station & Bus Stand Drops',
                    '💼 Corporate Meetings & Client Pickups',
                    '🏫 School & College Examination Drops',
                    '🍽️ Family Dinners & Social Functions',
                  ].map((item, i) => (
                    <div key={i} className={styles.useCaseItem}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Form & Concierge */}
            <div className={styles.sideCol}>
              <div id="book" className={styles.stickyForm}>
                <BookingForm compact />

                <div className={styles.contactCard}>
                  <h4>Need a Custom Route?</h4>
                  <p>Have multiple locations to visit or need an Innova Crysta for a large family? Call Pavan directly.</p>
                  <a href={`tel:${BUSINESS.phone.pavan}`} className="btn btn--white btn--sm" style={{ width: '100%', justifyContent: 'center' }}>
                    📞 Call {BUSINESS.phone.pavanDisplay}
                  </a>
                  <a
                    href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent('Hi Pavan, I need a customized local cab in Kadapa. Here are my requirements:')}`}
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
            <span className="eyebrow">Seamless Flow</span>
            <h2>How Local Cab Booking Works</h2>
            <div className="divider" />
            <p>From your first WhatsApp message to safe drop-off — smooth and transparent.</p>
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
