import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import BookingForm from '@/components/BookingForm';
import Link from 'next/link';
import { BUSINESS, RATES } from '@/lib/constants';
import { SelfDriveIllustration } from '@/components/Illustrations';
import styles from './self-drive.module.css';

export const metadata = {
  title: 'Self Drive Car Rental Kadapa @ ₹1,499/Day | MANA Tours & Travels',
  description:
    'Rent premium self-drive cars in Kadapa starting at ₹1,499/day. Flat ₹800 OFF on weekly 7-day bookings. 100% customer-managed fuel, clean fleet, instant WhatsApp KYC. Call +91 99083 00718.',
  keywords: [
    'self drive car rental Kadapa',
    'rent a car in Kadapa',
    'self drive cars Kadapa',
    'Toyota Etios self drive Kadapa',
    'car rental without driver Kadapa',
    'MANA Tours self drive',
  ],
};

const fleetOptions = [
  {
    name: 'Toyota Etios / Swift Dzire',
    category: 'Executive Sedan',
    img: '/images/fleet-etios-sedan.jpg',
    specs: ['Manual', 'Petrol / Diesel', '5 Seats', '592L Boot', 'Chilled AC'],
    dailyPrice: '₹1,499',
    weeklyPrice: '₹9,693 (Save ₹800)',
    bestFor: 'City commutes, family trips & weekend getaways',
  },
  {
    name: 'Maruti Suzuki Ertiga',
    category: 'Comfort 7-Seater MPV',
    img: '/images/fleet-ertiga-mpv.jpg',
    specs: ['Manual', 'Diesel', '7 Seats', 'Flexible Luggage', 'Dual AC'],
    dailyPrice: '₹2,199',
    weeklyPrice: '₹14,593 (Save ₹800)',
    bestFor: 'Large families, pilgrimage tours & group vacations',
  },
  {
    name: 'Toyota Innova Crysta',
    category: 'Premium Luxury MPV',
    img: '/images/fleet-innova-crysta.jpg',
    specs: ['Manual', 'Diesel', '7 Captain Seats', 'Heavy Luggage', 'Climate Control'],
    dailyPrice: '₹2,999',
    weeklyPrice: '₹20,193 (Save ₹800)',
    bestFor: 'VIP travel, long outstation road trips & wedding events',
  },
];

const selfDriveSteps = [
  {
    step: '1',
    title: 'Choose Dates & Car',
    desc: 'Select your preferred car model and rental duration via our simple online form or directly on WhatsApp.',
  },
  {
    step: '2',
    title: 'Instant KYC Check',
    desc: 'Share your valid Indian Driving License and Aadhaar / Govt ID for rapid 2-minute digital verification.',
  },
  {
    step: '3',
    title: 'Key Handover',
    desc: 'Inspect the vehicle and fuel gauge together at our Kadapa hub or opt for convenient doorstep delivery.',
  },
  {
    step: '4',
    title: 'Drive & Return',
    desc: 'Enjoy complete travel freedom. Return the car with the same fuel level for an immediate security deposit refund.',
  },
];

const selfDriveFaqs = [
  {
    q: 'What is your fuel policy?',
    a: 'Fuel is 100% customer-managed with zero fuel provided from our side. You receive the car with the recorded fuel level at handover, and you return it at the exact same level. This ensures you only pay for the fuel you actually consume with no inflated surcharges.',
  },
  {
    q: 'How does the ₹800 weekly discount offer work?',
    a: 'When you book any of our self-drive vehicles for 7 consecutive days or longer, a flat discount of ₹800 is automatically deducted from your total rental invoice. For example, our 7-day sedan rental drops from ₹10,493 down to just ₹9,693!',
  },
  {
    q: 'What documents are required for renting a self-drive car?',
    a: 'You only need two documents: (1) Original Valid Indian Driving License (4-wheeler, minimum 1 year old), and (2) Aadhaar Card / Passport as address proof. Minimum renter age is 21 years.',
  },
  {
    q: 'Is there a security deposit?',
    a: 'Yes, we maintain a transparent, 100% refundable security deposit of ₹10,000 for all self-drive rentals. This deposit is held at vehicle handover and is refunded immediately via UPI or Cash upon vehicle inspection when you return the car.',
  },
  {
    q: 'Can I drive the vehicle out of state to Bangalore, Hyderabad, or Chennai?',
    a: 'Absolutely! All our self-drive cars are registered commercial vehicles equipped with valid national permits, FASTag, and comprehensive commercial insurance for seamless interstate travel across South India.',
  },
];

export default function SelfDriveLandingPage() {
  return (
    <>
      <Header />

      {/* ══ 1. HERO SECTION ══ */}
      <section className={styles.selfDriveHero}>
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroLeft}>
              <div className={styles.heroPill}>
                <span>🔑 Self Drive Car Rentals in Kadapa</span>
              </div>

              <h1 className={styles.heroTitle}>
                Drive on Your Terms.<br />
                <span className={styles.heroTitleGradient}>₹1,499 / Day</span>
              </h1>

              <p className={styles.heroSubtitle}>
                Experience absolute privacy and road freedom. Well-maintained sedans and spacious MPVs in Kadapa.
                Transparent daily rates, zero hidden surcharges, and instant WhatsApp booking.
              </p>

              {/* Weekly Promo Banner */}
              <div className={styles.weeklyPromoBox}>
                <div className={styles.wpbIcon}>🔥</div>
                <div>
                  <div className={styles.wpbTitle}>Limited Time Weekly Offer: Flat ₹800 OFF</div>
                  <div className={styles.wpbDesc}>
                    Book for 7+ days and save ₹800 instantly! 7-Day Sedan plan now only <strong>₹9,693</strong> (Regular ₹10,493).
                  </div>
                </div>
              </div>

              {/* ⛽ Prominent Fuel Policy Callout */}
              <div className={styles.fuelPolicyBanner}>
                <div className={styles.fuelIconWrap}>⛽</div>
                <div>
                  <div className={styles.fuelPolicyTitle}>100% Customer-Managed Fuel Policy</div>
                  <div className={styles.fuelPolicyDesc}>
                    <strong>Zero fuel is provided by our side.</strong> You receive the vehicle with the recorded fuel level at pickup,
                    fill fuel as per your journey requirements, and return at the exact same fuel level. Maximum transparency — you only pay for what you drive!
                  </div>
                </div>
              </div>

              <div className={styles.heroCtas}>
                <a href="#booking" className="btn btn--primary btn--xl">
                  🚗 Book Self-Drive Now
                </a>
                <a
                  href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent('Hi Pavan, I want to check Self-Drive car availability in Kadapa.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--white btn--xl"
                >
                  💬 WhatsApp Availability
                </a>
              </div>
            </div>

            {/* Hero Right: 3D Offer Highlight & Quick Quote Card */}
            <div className={styles.heroOfferCard}>
              <div className={styles.heroOfferBadge}>Best Price Guaranteed</div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <SelfDriveIllustration size={64} />
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--charcoal-900)' }}>
                    Executive Self-Drive Fleet
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--charcoal-500)' }}>Toyota Etios &amp; Swift Dzire</p>
                </div>
              </div>

              <div className={styles.priceTagSection}>
                <span className={styles.priceTagLabel}>Standard Daily Rate</span>
                <div className={styles.priceTagValue}>
                  <span className={styles.priceNumber}>₹1,499</span>
                  <span className={styles.pricePeriod}>/ 24 Hours</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--charcoal-500)', marginTop: '2px' }}>
                  ⛽ Fuel customer-managed · 250 km included / day
                </p>
              </div>

              <ul className="checklist">
                <li>Instant 2-minute digital KYC verification</li>
                <li>Doorstep vehicle delivery anywhere in Kadapa</li>
                <li>24/7 Roadside Assistance &amp; FASTag equipped</li>
                <li>100% Refundable Security Deposit (₹10,000)</li>
              </ul>

              <a
                href={`tel:${BUSINESS.phone.pavan}`}
                className="btn btn--brass btn--lg"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                📞 Call Pavan: {BUSINESS.phone.pavanDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 2. RENTAL PACKAGES & WEEKLY ₹800 DISCOUNT MATRIX ══ */}
      <section className="section" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Transparent Pricing Plans</span>
            <h2>Choose Your Rental Duration</h2>
            <div className="divider" />
            <p>Competitive rates with zero hidden charges. All rentals feature 100% customer-managed fuel.</p>
          </div>

          <div className={styles.pricingGrid}>
            {/* Plan 1: Daily */}
            <div className={styles.pricingCard}>
              <span className={styles.pricingBadge} style={{ background: 'var(--charcoal-800)' }}>
                Daily Plan
              </span>
              <h3 className={styles.planName}>24 Hours</h3>
              <div className={styles.planPriceWrap}>
                <span className={styles.planPrice}>₹1,499</span>
                <span className={styles.planDuration}>/ 1 Day</span>
              </div>
              <ul className={styles.planFeatures}>
                <li>250 km included allowance</li>
                <li>₹10/km for extra distance</li>
                <li>100% Customer-Managed Fuel</li>
                <li>₹10,000 Refundable Security Deposit</li>
                <li>Comprehensive Insurance Covered</li>
              </ul>
              <a href="#booking" className="btn btn--charcoal" style={{ width: '100%', justifyContent: 'center' }}>
                Book 24 Hours
              </a>
            </div>

            {/* Plan 2: 3-Day Weekend */}
            <div className={styles.pricingCard}>
              <span className={styles.pricingBadge} style={{ background: 'var(--brass-dark)' }}>
                Save ₹300
              </span>
              <h3 className={styles.planName}>3-Day Weekend</h3>
              <div className={styles.planPriceWrap}>
                <span className={styles.planPrice}>₹4,199</span>
                <span className={styles.planDuration}>/ 72 Hours</span>
              </div>
              <ul className={styles.planFeatures}>
                <li>750 km included allowance</li>
                <li>Ideal for Tirupati &amp; Gandikota trips</li>
                <li>100% Customer-Managed Fuel</li>
                <li>₹10,000 Refundable Security Deposit</li>
                <li>FASTag &amp; Inter-State Permits Active</li>
              </ul>
              <a href="#booking" className="btn btn--brass" style={{ width: '100%', justifyContent: 'center' }}>
                Book Weekend Trip
              </a>
            </div>

            {/* Plan 3: Weekly Plan (Featured ₹800 OFF) */}
            <div className={styles.pricingCard}>
              <span className={styles.pricingBadge} style={{ background: 'var(--brass-dark)' }}>Flat ₹800 OFF</span>
              <h3 className={styles.planName}>Weekly (7 Days)</h3>
              <div className={styles.planPriceWrap}>
                <span className={styles.planPrice}>₹9,693</span>
                <span className={styles.planOriginalPrice}>₹10,493</span>
                <span className={styles.planDuration}>/ 7 Full Days</span>
              </div>
              <ul className={styles.planFeatures}>
                <li>1,750 km travel allowance</li>
                <li><strong>Instant ₹800 Savings applied</strong></li>
                <li>100% Customer-Managed Fuel</li>
                <li>₹10,000 Refundable Security Deposit</li>
                <li>Priority Doorstep Pickup &amp; Drop</li>
                <li>Free Sanitization &amp; Vehicle Checkup</li>
              </ul>
              <a href="#booking" className="btn btn--brass" style={{ width: '100%', justifyContent: 'center' }}>
                Book 7 Days
              </a>
            </div>

            {/* Plan 4: Monthly Subscription (Featured 44% OFF) */}
            <div className={`${styles.pricingCard} ${styles.pricingCardFeatured}`}>
              <span className={styles.pricingBadge}>🔥 44% OFF (Save ₹20k)</span>
              <h3 className={styles.planName}>Monthly (30 Days)</h3>
              <div className={styles.planPriceWrap}>
                <span className={styles.planPrice}>₹24,999</span>
                <span className={styles.planOriginalPrice}>₹44,970</span>
                <span className={styles.planDuration}>/ 30 Days</span>
              </div>
              <ul className={styles.planFeatures}>
                <li><strong>Effective ₹833 / day</strong></li>
                <li>3,000 km generous monthly allowance</li>
                <li><strong>Zero maintenance &amp; service costs</strong></li>
                <li>1 Free Weekend MPV Swap / month</li>
                <li>Free doorstep servicing &amp; pickup</li>
                <li>5% Loyalty renewal discount on M2</li>
              </ul>
              <a href="#monthly-plans" className="btn btn--primary" style={{ width: '100%', justifyContent: 'center' }}>
                View Monthly Tiers
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 2B. EXECUTIVE MONTHLY SUBSCRIPTIONS & RETENTION SECTION ══ */}
      <section className={`section ${styles.subscriptionSection}`} id="monthly-plans">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-header">
            <span className={styles.subPill}>💎 Long-Term Self-Drive Membership</span>
            <h2 style={{ color: '#FFFFFF', fontSize: 'clamp(2rem, 3.8vw, 2.8rem)', letterSpacing: '-0.03em' }}>
              Monthly Self-Drive Subscriptions
            </h2>
            <div className="divider divider--gold" />
            <p style={{ color: 'rgba(255, 255, 255, 0.85)', maxWidth: '680px', marginInline: 'auto' }}>
              Zero maintenance costs, zero depreciation, and complete travel freedom. Perfect for visiting NRIs, industrial executives, corporate leaders, and wedding families in Kadapa — for as low as <strong style={{ color: 'var(--brass-light)' }}>₹833 / day</strong>.
            </p>
          </div>

          {/* 3 Monthly Subscription Cards */}
          <div className={styles.subGrid}>
            {RATES.monthlySubscriptions.map((sub) => (
              <div key={sub.id} className={styles.subCard}>
                <span className={styles.subCardBadge}>{sub.badge}</span>
                <div className={styles.subCardTitle}>{sub.name}</div>
                <div className={styles.subCardModels}>{sub.models}</div>

                <div className={styles.subPriceBlock}>
                  <div className={styles.subPriceMain}>{sub.monthlyRate}</div>
                  <div className={styles.subPriceSub}>
                    <span>Effective: <strong>{sub.effectiveDaily}</strong></span>
                    <span className={styles.subSavingsBadge}>{sub.savings}</span>
                  </div>
                </div>

                <div className={styles.subKm}>
                  <span>🛣️</span> {sub.kmAllowance}
                </div>

                <ul className={styles.subPerksList}>
                  {sub.perks.map((p, pIndex) => (
                    <li key={pIndex}>
                      <span style={{ color: 'var(--brass-dark)', fontWeight: 900 }}>✓</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hi Pavan, I am interested in the ${sub.name} (${sub.monthlyRate}) monthly self-drive subscription in Kadapa.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}
                >
                  💬 Subscribe on WhatsApp
                </a>
              </div>
            ))}
          </div>

          {/* 4 Customer Retention Loyalty Privileges */}
          <div className={styles.subRetentionGrid}>
            <div className={styles.subRetentionCard}>
              <div className={styles.subRetentionIcon}>🛠️</div>
              <div className={styles.subRetentionTitle}>Zero Maintenance Cost</div>
              <div className={styles.subRetentionDesc}>
                We handle engine oil, brake servicing, and routine maintenance. You only pay for the fuel you consume.
              </div>
            </div>

            <div className={styles.subRetentionCard}>
              <div className={styles.subRetentionIcon}>🔄</div>
              <div className={styles.subRetentionTitle}>Weekend MPV Swap</div>
              <div className={styles.subRetentionDesc}>
                Sedan subscribers get 1 free weekend upgrade per month to a 7-seater Ertiga for family pilgrimages.
              </div>
            </div>

            <div className={styles.subRetentionCard}>
              <div className={styles.subRetentionIcon}>🎁</div>
              <div className={styles.subRetentionTitle}>Progressive Loyalty Discounts</div>
              <div className={styles.subRetentionDesc}>
                Enjoy 5% OFF on Month 2 renewal, and 10% OFF on Month 3+ continuous subscription renewals.
              </div>
            </div>

            <div className={styles.subRetentionCard}>
              <div className={styles.subRetentionIcon}>🚗</div>
              <div className={styles.subRetentionTitle}>Standby Car Guarantee</div>
              <div className={styles.subRetentionDesc}>
                If your car ever requires scheduled maintenance, we deliver a replacement vehicle to your doorstep within 2 hours.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 3. VEHICLE FLEET SELECTION ══ */}
      <section className="section" style={{ background: 'var(--pearl-bg)' }}>
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Our Sanitized Fleet</span>
            <h2>Select Your Self-Drive Vehicle</h2>
            <div className="divider" />
            <p>Every car is serviced, sanitized, and safety-inspected before handover.</p>
          </div>

          <div className={styles.fleetGrid}>
            {fleetOptions.map((car, i) => (
              <div key={i} className={styles.fleetCard}>
                <div className={styles.fleetImgWrap}>
                  <Image src={car.img} alt={car.name} fill quality={82} style={{ objectFit: 'cover' }} />
                </div>
                <div className={styles.fleetBody}>
                  <div>
                    <span className="badge badge--brass">{car.category}</span>
                    <h3 className={styles.fleetTitle} style={{ marginTop: '8px' }}>
                      {car.name}
                    </h3>
                  </div>

                  <div className={styles.fleetSpecs}>
                    {car.specs.map((spec, sIndex) => (
                      <span key={sIndex} className={styles.fleetSpecPill}>
                        {spec}
                      </span>
                    ))}
                  </div>

                  <p style={{ fontSize: '0.88rem', color: 'var(--charcoal-600)' }}>{car.bestFor}</p>

                  <div className={styles.fleetPriceRow}>
                    <div>
                      <div className={styles.fleetPrice}>{car.dailyPrice}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--charcoal-500)' }}>Per Day (Fuel on you)</div>
                    </div>
                    <a
                      href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hi Pavan, I want to rent the ${car.name} for self-drive.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--primary btn--sm"
                    >
                      Book on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. HOW SELF DRIVE WORKS (4 EASY STEPS) ══ */}
      <section className="section" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Seamless Process</span>
            <h2>How Self-Drive Works in 4 Steps</h2>
            <div className="divider" />
            <p>No lengthy paperwork, no confusing deposits. Simple, transparent, and hassle-free.</p>
          </div>

          <div className={styles.stepsGrid}>
            {selfDriveSteps.map((s, i) => (
              <div key={i} className={styles.stepCard}>
                <div className={styles.stepNumber}>{s.step}</div>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5. REQUIREMENTS & TERMS ══ */}
      <section className="section" style={{ background: 'var(--pearl-bg)' }}>
        <div className="container">
          <div className={styles.reqGrid}>
            <div className={styles.reqCard}>
              <h3 className={styles.reqCardTitle}>📋 Mandatory Rental Requirements</h3>
              <ul className="checklist">
                <li>Valid Indian Driving License (Original 4-wheeler license, min. 1 year old)</li>
                <li>Original Aadhaar Card / Passport for identity &amp; address proof</li>
                <li>Minimum driver age requirement of 21 years</li>
                <li>100% Refundable Security Deposit of ₹10,000 (Refunded immediately upon return inspection)</li>
              </ul>
            </div>

            <div className={styles.reqCard}>
              <h3 className={styles.reqCardTitle}>⛽ Fuel &amp; Usage Terms</h3>
              <ul className="checklist">
                <li>
                  <strong>Fuel is 100% Customer-Managed:</strong> Zero fuel provided from our side. Return at same fuel gauge level.
                </li>
                <li>Inter-state travel permitted across Karnataka, Tamil Nadu, Telangana &amp; AP.</li>
                <li>Standard 250 km / day allowance. Extra mileage billed transparently at ₹10/km.</li>
                <li>Immediate security deposit refund upon vehicle return inspection.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 6. DEDICATED BOOKING FORM & FAQ ══ */}
      <section className="section" style={{ background: '#FFFFFF' }} id="booking">
        <div className="container">
          <div className={styles.heroGrid} style={{ alignItems: 'start' }}>
            {/* Left FAQ */}
            <div>
              <div className="section-header" style={{ textAlign: 'left', marginBottom: '32px' }}>
                <span className="eyebrow" style={{ display: 'inline-flex' }}>
                  Frequently Asked Questions
                </span>
                <h2>Everything You Need to Know</h2>
                <div className="divider divider--left" />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {selfDriveFaqs.map((faq, i) => (
                  <details
                    key={i}
                    style={{
                      background: 'var(--pearl-bg)',
                      border: '1px solid var(--pearl-border)',
                      borderRadius: 'var(--r-xl)',
                      padding: '18px 22px',
                    }}
                  >
                    <summary
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: '1.05rem',
                        color: 'var(--charcoal-900)',
                        cursor: 'pointer',
                        listStyle: 'none',
                      }}
                    >
                      {faq.q}
                    </summary>
                    <p style={{ marginTop: '12px', color: 'var(--charcoal-600)', fontSize: '0.94rem', lineHeight: 1.75 }}>
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>

              <div
                style={{
                  marginTop: '36px',
                  background: 'var(--brass-subtle)',
                  border: '1px solid var(--brass-border)',
                  borderRadius: 'var(--r-2xl)',
                  padding: '24px',
                }}
              >
                <h4 style={{ color: 'var(--charcoal-900)', fontSize: '1.15rem', fontWeight: 800, marginBottom: '8px' }}>
                  Need Immediate Booking Support?
                </h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--charcoal-700)', marginBottom: '14px' }}>
                  Speak directly with Pavan for instant car availability confirmation and custom quote requests.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <a href={`tel:${BUSINESS.phone.pavan}`} className="btn btn--primary btn--sm">
                    📞 Call {BUSINESS.phone.pavanDisplay}
                  </a>
                  <a
                    href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent('Hi Pavan, I want to book a self-drive car in Kadapa.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--white btn--sm"
                  >
                    💬 WhatsApp Us
                  </a>
                </div>
              </div>
            </div>

            {/* Right Interactive Booking Form */}
            <div style={{ position: 'sticky', top: 'calc(var(--header-h) + 24px)' }}>
              <BookingForm compact />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
