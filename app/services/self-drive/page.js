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
  title: 'Premium Self-Drive Car Rental Kadapa | From ₹1,499/Day | MANA Tours & Travels',
  description:
    'Drive in absolute freedom. Rent a premium self-drive car in Kadapa from ₹1,499/day — no driver, no compromise, zero hidden costs. Fully insured, FASTag-equipped sedans & MPVs. ₹800 OFF on 7-day bookings. Monthly memberships from ₹833/day. Call +91 99083 00718.',
  keywords: [
    'self drive car rental Kadapa',
    'rent a car without driver Kadapa',
    'premium self drive Kadapa',
    'Toyota Etios self drive Kadapa',
    'monthly car subscription Kadapa',
    'self drive car Andhra Pradesh',
    'MANA self drive membership',
    'car hire Kadapa',
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
    bestFor: 'City commutes, family trips & weekend getaways across South India',
  },
  {
    name: 'Maruti Suzuki Ertiga',
    category: 'Comfort 7-Seater MPV',
    img: '/images/fleet-ertiga-mpv.jpg',
    specs: ['Manual', 'Diesel', '7 Seats', 'Flexible Luggage', 'Dual AC'],
    dailyPrice: '₹2,199',
    weeklyPrice: '₹14,593 (Save ₹800)',
    bestFor: 'Large families, pilgrimages, group vacations & temple circuits',
  },
  {
    name: 'Toyota Innova Crysta',
    category: 'Premium Luxury MPV',
    img: '/images/fleet-innova-crysta.jpg',
    specs: ['Manual', 'Diesel', '7 Captain Seats', 'Heavy Luggage', 'Climate Control'],
    dailyPrice: '₹2,999',
    weeklyPrice: '₹20,193 (Save ₹800)',
    bestFor: 'VIP road trips, wedding travel, corporate outstation & multi-day tours',
  },
];

const selfDriveSteps = [
  {
    step: '1',
    title: 'Pick Your Car & Dates',
    desc: 'Choose your perfect vehicle and rental window via WhatsApp or our online form. Availability confirmed in minutes — no waiting.',
  },
  {
    step: '2',
    title: 'Instant 2-Min KYC',
    desc: 'Share your Driving License and Aadhaar digitally. Verified instantly — zero physical office visit, zero paperwork queue.',
  },
  {
    step: '3',
    title: 'Keys at Your Door',
    desc: 'Vehicle delivered spotless to your doorstep anywhere in Kadapa. Full walkthrough, fuel check, and handover in under 10 minutes.',
  },
  {
    step: '4',
    title: 'Drive. Return. Refund.',
    desc: 'Enjoy complete freedom. Return at the same fuel level and receive your full security deposit refund on the spot — zero delays, zero friction.',
  },
];

const selfDriveFaqs = [
  {
    q: 'What is your fuel policy — do you provide any fuel?',
    a: 'We operate on a 100% Customer-Managed Fuel policy. You receive the car with the fuel gauge recorded at handover — you fill as you need and return at the exact same level. You pay only for what you actually drive. No fuel surcharges, no inflated estimates — complete transparency every time.',
  },
  {
    q: 'How does the ₹800 weekly discount work?',
    a: 'Book any self-drive vehicle for 7 or more consecutive days and a flat ₹800 is deducted automatically at checkout. Our 7-day Executive Sedan package drops from ₹10,493 to just ₹9,693 — an effective rate under ₹1,385 per day for complete travel freedom. No codes, no conditions.',
  },
  {
    q: 'What documents do I need to rent a self-drive car?',
    a: 'Just two documents: (1) Original Valid Indian Driving License — 4-wheeler class, minimum 1 year old, and (2) Aadhaar Card or Passport as address proof. Minimum renter age is 21 years. The entire KYC process is digital and takes under 2 minutes — no office visit required.',
  },
  {
    q: 'Is there a security deposit, and when do I get it back?',
    a: 'Yes — a fully refundable ₹10,000 security deposit is collected at vehicle handover. The moment you return the car and it clears our quick condition check, the deposit is returned to you immediately via UPI or cash. No waiting periods, no deductions for normal wear.',
  },
  {
    q: 'Can I take the car to Bangalore, Hyderabad, Chennai, or other states?',
    a: 'Absolutely. All our self-drive vehicles hold valid National Permits, active FASTag accounts, and comprehensive commercial insurance — fully compliant for interstate travel across Karnataka, Tamil Nadu, Telangana, and Andhra Pradesh. Explore South India without limits.',
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
                <span>🔑 Premium Self-Drive Car Rentals — Kadapa</span>
              </div>

              <h1 className={styles.heroTitle}>
                Your Car. Your Rules.<br />
                <span className={styles.heroTitleGradient}>Your Road, From ₹1,499.</span>
              </h1>

              <p className={styles.heroSubtitle}>
                Kadapa&apos;s only premium self-drive fleet — sanitised, fully insured, and FASTag-equipped sedans &amp; MPVs you can drive anywhere in South India. No driver. No compromise. Zero hidden costs.
              </p>

              {/* Weekly Promo Banner */}
              <div className={styles.weeklyPromoBox}>
                <div className={styles.wpbIcon}>🔥</div>
                <div>
                  <div className={styles.wpbTitle}>Members Save ₹800 on Every 7-Day Booking — That&apos;s Our Promise, Every Time.</div>
                  <div className={styles.wpbDesc}>
                    7-Day Sedan plan now only <strong>₹9,693</strong> — down from ₹10,493. No codes. No conditions. Applied automatically.
                  </div>
                </div>
              </div>

              {/* ⛽ Prominent Fuel Policy Callout */}
              <div className={styles.fuelPolicyBanner}>
                <div className={styles.fuelIconWrap}>⛽</div>
                <div>
                  <div className={styles.fuelPolicyTitle}>100% Customer-Managed Fuel — Maximum Transparency</div>
                  <div className={styles.fuelPolicyDesc}>
                    <strong>Zero fuel markup from our side.</strong> You pick up the car at the recorded fuel level, fill as you drive, and return at the same level. You pay only for the fuel you actually use — never a rupee more.
                  </div>
                </div>
              </div>

              <div className={styles.heroCtas}>
                <a href="#booking" className="btn btn--primary btn--xl">
                  🚗 Reserve Your Car — Check Availability
                </a>
                <a
                  href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent('Hi Pavan, I want to check Self-Drive car availability in Kadapa.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--white btn--xl"
                >
                  💬 WhatsApp for Instant Quote
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
                <li>Instant 2-minute digital KYC — no office visit</li>
                <li>Doorstep vehicle delivery anywhere in Kadapa</li>
                <li>24/7 Roadside Assistance &amp; FASTag-equipped</li>
                <li>₹10,000 Refundable Deposit — returned on the spot</li>
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
            <span className="eyebrow">Transparent Pricing — No Surprises</span>
            <h2>Choose Your Freedom Plan</h2>
            <div className="divider" />
            <p>Every plan includes a spotless AC vehicle, comprehensive insurance, and a 250 km daily allowance. You bring the fuel — we handle everything else.</p>
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
                Weekend — Save ₹300
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
                Book Weekend Escape
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
                Unlock Member Pricing →
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
              Drive Every Day. Pay Once a Month.
            </h2>
            <div className="divider divider--gold" />
            <p style={{ color: 'rgba(255, 255, 255, 0.85)', maxWidth: '700px', marginInline: 'auto', lineHeight: 1.8 }}>
              Your own car — without the EMI, the depreciation, or the maintenance bills. Whether you&apos;re an NRI back for a season, a corporate executive posted to Kadapa, or a family that simply loves road freedom — our monthly memberships deliver a pristine, fully insured vehicle at your door, for as little as <strong style={{ color: 'var(--brass-light)' }}>₹833 / day</strong>.
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
              <div className={styles.subRetentionTitle}>Zero Maintenance. Ever.</div>
              <div className={styles.subRetentionDesc}>
                Engine oil, brake servicing, tyre rotation — all managed by us. You only pay for the fuel you burn. Own the freedom, not the upkeep.
              </div>
            </div>

            <div className={styles.subRetentionCard}>
              <div className={styles.subRetentionIcon}>🔄</div>
              <div className={styles.subRetentionTitle}>Free Weekend MPV Upgrade</div>
              <div className={styles.subRetentionDesc}>
                Sedan members get one complimentary weekend upgrade to a 7-seater Ertiga every month — perfect for spontaneous family pilgrimages.
              </div>
            </div>

            <div className={styles.subRetentionCard}>
              <div className={styles.subRetentionIcon}>🎁</div>
              <div className={styles.subRetentionTitle}>Loyalty Rewards That Compound</div>
              <div className={styles.subRetentionDesc}>
                5% off on Month 2 renewal. 10% off from Month 3 onwards. The longer you stay, the better your rate gets — automatically.
              </div>
            </div>

            <div className={styles.subRetentionCard}>
              <div className={styles.subRetentionIcon}>🚗</div>
              <div className={styles.subRetentionTitle}>Standby Car — 2-Hour Guarantee</div>
              <div className={styles.subRetentionDesc}>
                If your vehicle ever needs scheduled maintenance, we deliver a ready replacement to your doorstep within 2 hours — no downtime, no excuses.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 3. VEHICLE FLEET SELECTION ══ */}
      <section className="section" style={{ background: 'var(--pearl-bg)' }}>
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">✦ Our Sanitized Fleet ✦</span>
            <h2>Select Your Self-Drive Vehicle</h2>
            <div className="divider" />
            <p>Every car is professionally serviced, deep-sanitized, and safety-inspected before every handover. What you see is what you get.</p>
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
            <h2>From Booking to Keys — in 4 Simple Steps</h2>
            <div className="divider" />
            <p>No lengthy paperwork. No confusing deposits. No office queues. Just your car, your schedule, your way.</p>
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
              <h3 className={styles.reqCardTitle}>📋 Rental Requirements — Quick &amp; Simple</h3>
              <ul className="checklist">
                <li>Valid Indian Driving License (Original 4-wheeler license, min. 1 year old)</li>
                <li>Original Aadhaar Card / Passport for identity &amp; address proof</li>
                <li>Minimum driver age requirement of 21 years</li>
                <li>100% Refundable Security Deposit of ₹10,000 (Refunded immediately upon return inspection)</li>
              </ul>
            </div>

            <div className={styles.reqCard}>
              <h3 className={styles.reqCardTitle}>⛽ Fuel &amp; Usage Terms — Fully Transparent</h3>
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
                <p style={{ color: 'var(--charcoal-600)', fontSize: '0.96rem' }}>Honest answers to the questions we hear every day.</p>
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
                  Ready to Hit the Road? Let&apos;s Talk.
                </h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--charcoal-700)', marginBottom: '14px' }}>
                  Speak directly with Pavan for instant availability check and a custom rate for longer rentals or monthly memberships.
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
