import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import BookingForm from '@/components/BookingForm';
import Link from 'next/link';
import styles from '../service.module.css';
import { BUSINESS } from '@/lib/constants';

export const metadata = {
  title: 'Corporate Travel & Business Cab Fleet in Kadapa',
  description:
    'Professional corporate car rental in Kadapa. 100% GST invoices, monthly retainer accounts, executive airport transfers, and VIP Innova Crysta fleet. Call +91 99083 00718.',
  alternates: {
    canonical: '/services/corporate-travel',
  },
  openGraph: {
    title: 'Corporate Cab Rentals & Business Travel Kadapa | MANA Tours',
    description: 'Executive cabs with 100% GST compliant invoicing, dedicated account manager, and monthly billing for corporate clients in Rayalaseema.',
    url: 'https://www.manatoursandtravels.com/services/corporate-travel',
    siteName: 'MANA Tours & Travels',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/images/hero-car.jpg', width: 1200, height: 630, alt: 'Corporate Travel Kadapa' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Corporate Travel Kadapa | MANA Tours',
    description: 'Executive fleet and monthly corporate cab accounts with GST billing in Kadapa.',
    images: ['/images/hero-car.jpg'],
  },
};

const CORPORATE_PACKAGES = [
  {
    id: 'per-trip',
    badge: '💼 Pay Per Trip',
    name: 'Executive Per-Trip Dispatch',
    price: '5% OFF',
    priceSub: 'Standard rates + GST',
    extras: 'Ideal for occasional client pickups, business meetings, and executive outstation travel.',
    specs: [
      'Spotless AC sedan or luxury MPV',
      'Immediate GST invoice sent via email',
      'Uniformed, professional chauffeur',
      'Flexible digital payment (UPI / NetBanking)',
    ],
  },
  {
    id: 'monthly-account',
    badge: '👑 Most Preferred',
    name: 'Monthly Corporate Retainer',
    price: 'Custom',
    priceSub: 'Volume-based pricing',
    extras: 'Dedicated fleet support for companies, industrial plants, banks, and government contractors.',
    specs: [
      'Consolidated monthly 30-day billing',
      'Guaranteed priority vehicle allocation',
      'Dedicated relationship manager (Pavan)',
      'Detailed monthly trip logs & mileage sheets',
    ],
  },
  {
    id: 'delegation-vip',
    badge: '⭐ VIP Delegation',
    name: 'Executive Airport & VIP Fleet',
    price: 'Premium',
    priceSub: 'Innova Crysta / Sedans',
    extras: 'Flawless airport transfers and hotel escorts for visiting directors, auditors, and VIP guests.',
    specs: [
      'Premium Toyota Innova Crysta with leather captain seats',
      'Flight tracking & airport curbside greeting',
      'Complimentary bottled water & sanitizers',
      'Discreet, English & Telugu fluent drivers',
    ],
  },
  {
    id: 'site-visits',
    badge: '🏭 Industrial & Plant',
    name: 'Industrial Site & Field Visits',
    price: 'Custom',
    priceSub: 'Full-day / Multi-day',
    extras: 'Tailored transportation for cement plants, solar power parks, and mining sectors in YSR Kadapa district.',
    specs: [
      'Experienced with Yerraguntla, Pulivendula, and Jammalamadugu routes',
      'Rugged, well-maintained vehicles for industrial terrain',
      'Full-day standby at factory premises',
      'Strict adherence to industrial safety norms',
    ],
  },
];

const STEPS = [
  {
    num: '1',
    title: 'Share Business Requirements',
    desc: 'Tell us your company details, travel frequency, vehicle preference, and GST number.',
  },
  {
    num: '2',
    title: 'Custom Corporate Tariff',
    desc: 'Receive tailored B2B rate cards with volume discounts and transparent credit terms.',
  },
  {
    num: '3',
    title: 'Priority Dispatch',
    desc: 'Book via dedicated corporate WhatsApp hotline with guaranteed priority vehicle placement.',
  },
  {
    num: '4',
    title: 'Consolidated GST Invoicing',
    desc: 'Receive transparent digital invoices with GST input tax credit (ITC) eligibility.',
  },
];

export default function CorporateTravelPage() {
  return (
    <>
      <Header />

      {/* ══ 1. HERO SECTION ══ */}
      <section className={styles.serviceHero}>
        <div className={styles.heroBgOverlay} />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroBreadcrumb}>
            <Link href="/">Home</Link> <span>›</span> <Link href="/#services">Services</Link> <span>›</span> <span>Corporate Travel</span>
          </div>

          <div className={styles.heroPill}>
            <span>🏢 Executive Business Transportation</span>
          </div>

          <h1 className={styles.heroTitle}>
            Corporate Travel Solutions.<br />
            <span className={styles.heroTitleGradient}>GST Invoicing &amp; Priority Dispatch.</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Reliable, polished transportation for enterprises, cement &amp; power plants, banks, and visiting executives in Kadapa. Monthly billing accounts and dedicated fleet support.
          </p>

          <div className={styles.heroHighlights}>
            <span className={styles.highlightBadge}>📄 100% Compliant GST Invoices</span>
            <span className={styles.highlightBadge}>⚡ Priority Executive Fleet Dispatch</span>
            <span className={styles.highlightBadge}>💳 Monthly Consolidated Invoicing</span>
            <span className={styles.highlightBadge}>⭐ 5.0 Rated Corporate Partner</span>
          </div>
        </div>
      </section>

      {/* ══ 2. CORPORATE SOLUTIONS ══ */}
      <section className="section">
        <div className="container">
          <div className={styles.contentGrid}>
            <div className={styles.mainCol}>
              <div className="section-header" style={{ textAlign: 'left', marginBottom: '8px' }}>
                <span className="eyebrow">Enterprise Solutions</span>
                <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>Corporate Packages &amp; Plans</h2>
                <div className="divider divider--left" />
                <p>Designed to simplify corporate expense management and elevate your company&apos;s executive mobility.</p>
              </div>

              {/* Cards Grid */}
              <div className={styles.packageCards}>
                {CORPORATE_PACKAGES.map((pkg) => (
                  <div key={pkg.id} className={styles.packageCard}>
                    <span className={styles.packageBadge}>{pkg.badge}</span>
                    <div className={styles.packageName}>{pkg.name}</div>
                    <div className={styles.packagePrice}>
                      {pkg.price} <span className={styles.packagePriceSub}>{pkg.priceSub}</span>
                    </div>
                    <p style={{ fontSize: '0.84rem', color: 'var(--charcoal-600)', marginBottom: '14px', lineHeight: 1.5 }}>
                      {pkg.extras}
                    </p>

                    <ul className={styles.packageSpecs}>
                      {pkg.specs.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>

                    <a
                      href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hi Pavan & MANA Tours, I would like to discuss corporate travel options for my company: "${pkg.name}".`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.packageBtn}
                    >
                      💬 Inquire Corporate Rate
                    </a>
                  </div>
                ))}
              </div>

              {/* Inclusions Box */}
              <div className={styles.inExBox}>
                <div className={styles.inBox}>
                  <h4><span className={styles.checkIcon}>✅</span> Corporate Client Perks</h4>
                  <ul className={styles.checkList}>
                    <li><span className={styles.checkIcon}>✓</span> GST invoices issued promptly for every trip</li>
                    <li><span className={styles.checkIcon}>✓</span> Priority dispatch during peak festival &amp; rush hours</li>
                    <li><span className={styles.checkIcon}>✓</span> Courteous, non-smoking, uniformed chauffeurs</li>
                    <li><span className={styles.checkIcon}>✓</span> Flexible credit payment cycles for contracted accounts</li>
                    <li><span className={styles.checkIcon}>✓</span> 24/7 dedicated escalation desk with Managing Partner</li>
                  </ul>
                </div>

                <div className={styles.exBox}>
                  <h4><span className={styles.infoIcon}>🏢</span> Industries We Serve</h4>
                  <ul className={styles.checkList}>
                    <li><span className={styles.infoIcon}>•</span> Cement &amp; Heavy Industries (Yerraguntla / Tadipatri belt)</li>
                    <li><span className={styles.infoIcon}>•</span> Solar Power &amp; Renewable Energy Projects</li>
                    <li><span className={styles.infoIcon}>•</span> Banking, Insurance &amp; Financial Institutions</li>
                    <li><span className={styles.infoIcon}>•</span> Healthcare, Pharma &amp; Hospital Delegations</li>
                    <li><span className={styles.infoIcon}>•</span> Government Contractors &amp; Infrastructure Firms</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Form & Corporate Desk */}
            <div className={styles.sideCol}>
              <div id="book" className={styles.stickyForm}>
                <BookingForm compact />

                <div className={styles.contactCard}>
                  <h4>Setup a Corporate Account</h4>
                  <p>Speak directly with Pavan to customize monthly corporate billing and contract rates for your organization.</p>
                  <a href={`tel:${BUSINESS.phone.pavan}`} className="btn btn--white btn--sm" style={{ width: '100%', justifyContent: 'center' }}>
                    📞 Call {BUSINESS.phone.pavanDisplay}
                  </a>
                  <a href={`mailto:${BUSINESS.email}`} className="btn btn--white btn--sm" style={{ width: '100%', justifyContent: 'center' }}>
                    ✉️ {BUSINESS.email}
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
            <span className="eyebrow">Enterprise Flow</span>
            <h2>How Corporate Accounts Work</h2>
            <div className="divider" />
            <p>Seamless onboarding and simplified employee travel management.</p>
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
