'use client';
import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { BUSINESS } from '@/lib/constants';
import { trackFormSubmission } from '@/lib/analytics';
import {
  FleetPartnerIllustration,
  EarningsGrowthIllustration,
  ContractLegalIllustration,
  SafetyInfographic,
  PricingInfographic,
  WhatsAppInfographic,
  LocalExpertiseInfographic,
} from '@/components/Illustrations';
import styles from './partner.module.css';

const partnerModels = [
  {
    badge: '🏆 Highest Earning Potential',
    title: 'Full-Time Dedicated Fleet Partner',
    desc: 'Attach your vehicle exclusively to the MANA network and let it work around the clock. Receive guaranteed monthly booking volumes, first-priority outstation assignments, a 70% revenue share, and predictable weekly settlements — while you do nothing.',
    earnings: '₹35,000 – ₹55,000 / mo',
    features: ['Guaranteed monthly trip quotas — no empty days', 'First-priority on corporate & outstation routes', '70% net revenue directly to vehicle owner', 'Scheduled weekly UPI / bank settlements'],
  },
  {
    badge: '✅ Total Flexibility',
    title: 'Flexible On-Demand Partner',
    desc: 'Your car stays on your schedule. Accept outstation or weekend trips at your convenience with a full 70/30 revenue split in your favour. Zero forced shifts, zero minimum commitments — pure passive income on your terms.',
    earnings: '₹18,000 – ₹32,000 / mo',
    features: ['Zero forced shifts or minimums — ever', '70% revenue to vehicle owner, every trip', 'You choose your preferred routes', 'Instant trip-by-trip UPI settlement'],
  },
  {
    badge: '💰 Maximum Revenue',
    title: 'Driver-Cum-Owner (DCO) Partner',
    desc: 'Drive your own car on verified MANA VIP, airport, and sacred temple tours. Earn premium pilgrimage-route fares, 70% revenue share, and 100% of all passenger tips and direct driver allowances — nothing held back.',
    earnings: '₹40,000 – ₹65,000+ / mo',
    features: ['Direct owner-driver partnership — full control', '70% trip share + 100% of tips & allowances', 'Premium clientele — verified, respectful travellers', 'Immediate cash or UPI payments after every trip'],
  },
];

const earningsData = [
  {
    type: 'Executive Sedans',
    models: 'Toyota Etios, Maruti Dzire, Honda Amaze',
    monthlyTrips: '16 – 22 Trips',
    routes: 'Kadapa local, Tirupati drops, Gandikota tours',
    gross: '₹28,000 – ₹42,000 / mo',
  },
  {
    type: '7-Seater MPVs',
    models: 'Maruti Ertiga, Kia Carens, Mahindra Marazzo',
    monthlyTrips: '12 – 18 Trips',
    routes: 'Bangalore airport, Hyderabad outstation, Srisailam',
    gross: '₹36,000 – ₹52,000 / mo',
  },
  {
    type: 'Luxury Premium MPVs',
    models: 'Toyota Innova Crysta, Toyota Hycross',
    monthlyTrips: '8 – 14 Trips',
    routes: 'Executive corporate charters, VIP temple visits',
    gross: '₹48,000 – ₹68,000 / mo',
  },
  {
    type: 'Tempo Travellers',
    models: 'Force Urbania, Force Traveller (12–26 Seats)',
    monthlyTrips: '5 – 10 Tours',
    routes: 'Multi-day pilgrimage & family wedding fleets',
    gross: '₹55,000 – ₹85,000 / mo',
  },
];

const partnerGuarantees = [
  {
    Illustration: EarningsGrowthIllustration,
    title: '70% Revenue Share — Paid On Time, Every Time',
    desc: 'A guaranteed 70% share to vehicle owners with trip-by-trip digital UPI transfers or weekly bank settlements. Every single trip. No deductions, no delays, no exceptions.',
  },
  {
    Illustration: ContractLegalIllustration,
    title: 'Formal Written Contract — Your Protection in Writing',
    desc: 'Every partnership is protected by a clear written legal agreement signed by both parties, safeguarding your vehicle asset, rate structure, and owner rights.',
  },
  {
    Illustration: PricingInfographic,
    title: '₹0 Joining Fees. ₹0 Hidden Charges. ₹0 Platform Subscriptions.',
    desc: 'Start earning from your very first trip. No registration fee, no security deposit, no platform subscription. If your car earns, you earn — that simple.',
  },
  {
    Illustration: SafetyInfographic,
    title: 'Pre-Screened, Verified Customer Base',
    desc: 'Every passenger booking is identity-verified, contact-checked, and assessed for respectful travel conduct before your vehicle is dispatched. Your asset is protected.',
  },
  {
    Illustration: LocalExpertiseInfographic,
    title: '100% Toll, Fuel & Permit Transparency',
    desc: 'All customer tolls, parking charges, and state entry permits are collected from passengers at actuals. Your core vehicle earnings are never diluted by operational overheads.',
  },
  {
    Illustration: WhatsAppInfographic,
    title: '24/7 Direct WhatsApp Fleet Command',
    desc: 'A dedicated MANA coordinator is reachable around the clock for route guidance, real-time dispatch updates, and priority emergency breakdown support.',
  },
];

const onboardingSteps = [
  {
    step: '1',
    title: 'Submit in 3 Minutes',
    desc: 'Fill out our streamlined vehicle registration form below with your car model, year, and contact details. Takes under 3 minutes.',
  },
  {
    step: '2',
    title: '24-Hour Document Review',
    desc: 'Our fleet team verifies your RC, insurance, Commercial Permit, and Driver KYC within 24 hours — you’ll receive a WhatsApp confirmation.',
  },
  {
    step: '3',
    title: 'Quick Vehicle Inspection & Contract Sign',
    desc: 'Bring your vehicle for a 20-minute physical inspection. Sign the formal written partnership agreement. Done.',
  },
  {
    step: '4',
    title: 'Your First Trip, This Weekend',
    desc: 'Your vehicle is activated on our live dispatch system. Start receiving passenger trips immediately — your first payout could arrive within days.',
  },
];

const partnerFaqs = [
  {
    q: 'Exactly how does the 70% revenue share work in practice?',
    a: 'For every trip completed, 70% of the total customer fare goes directly to you as the vehicle owner. MANA retains 30% to fund marketing, customer acquisition, 24/7 dispatch operations, and technology. Tolls and parking are always charged to the passenger at actuals — your 70% is never diluted by operational costs.',
  },
  {
    q: 'How and when do I get paid? Can I get paid after every trip?',
    a: 'You choose how you receive your earnings: (1) Immediate digital UPI settlement right after each trip completes, or (2) Consolidated weekly bank transfer every Monday. Every trip invoice and breakdown is shared with you on WhatsApp in real time so you always know exactly what you earned.',
  },
  {
    q: 'Is there any registration fee, platform fee, or security deposit to join?',
    a: 'Absolutely not. Attaching your vehicle to MANA Tours & Travels is 100% free — zero registration fees, zero platform subscriptions, and zero security deposits. We earn only when your car earns. Our incentives are perfectly aligned.',
  },
  {
    q: 'Can I attach my private (white plate) car to MANA?',
    a: 'We prioritize commercially registered (yellow plate) vehicles for full fleet integration. If you own a well-maintained private car, we can guide you through the commercial permit conversion process and get your vehicle compliantly attached to our self-drive fleet.',
  },
  {
    q: 'Do I have to provide a driver, or can I drive my own vehicle?',
    a: 'Both are fully welcome. Drive your own vehicle as a Driver-Cum-Owner (DCO) and keep 70% of every trip plus 100% of tips. Or attach your car as a passive investor-owner and provide a verified chauffeur — the choice is entirely yours.',
  },
];

export default function PartnerPage() {
  const [form, setForm] = useState({
    ownerName: '',
    phone: '',
    vehicleMake: '',
    vehicleModel: '',
    year: '2022',
    regNumber: '',
    fuelType: 'Diesel',
    seats: '5 Seater Sedan',
    modelPreference: 'Full-Time Dedicated',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Fire Google Analytics
    trackFormSubmission('Fleet Partner Application', `${form.vehicleMake} ${form.vehicleModel} (${form.seats})`);

    // 2. Sync to API / Google Sheets in background
    try {
      fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.ownerName,
          phone: form.phone,
          service: 'Fleet Partner Attachment (70% Share)',
          tripType: form.modelPreference,
          pickup: `${form.vehicleMake} ${form.vehicleModel} (${form.year})`,
          destination: `Reg: ${form.regNumber}`,
          passengers: form.seats,
          notes: `Fuel: ${form.fuelType}. Notes: ${form.notes || ''}`,
          sourceUrl: '/partner',
        }),
      }).catch(() => {});
    } catch {}

    const lines = [
      '*New Vehicle Attachment Application — MANA Fleet Partner*',
      '',
      `*Owner Name:* ${form.ownerName}`,
      `*Phone Number:* ${form.phone}`,
      `*Vehicle:* ${form.vehicleMake} ${form.vehicleModel} (${form.year})`,
      `*Registration No:* ${form.regNumber}`,
      `*Fuel Type:* ${form.fuelType}`,
      `*Vehicle Type:* ${form.seats}`,
      `*Partnership Model:* ${form.modelPreference}`,
      form.notes ? `*Additional Notes:* ${form.notes}` : null,
    ].filter(Boolean).join('\n');

    window.open(`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(lines)}`, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <>
      <Header />

      {/* ══ 1. HERO SECTION WITH HIGH-DEFINITION FLEET PARTNER BACKGROUND ══ */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src="/images/partner-hero.jpg"
            alt="MANA Tours & Travels vehicle owner partnership in front of Innova Crysta and Etios fleet"
            fill
            priority
            quality={95}
            style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
          />
          <div className={styles.heroBgOverlay} />
        </div>

        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroPill}>
            <span>🤝 Currently Accepting New Fleet Partners — 70% Revenue Share</span>
          </div>

          <h1 className={styles.heroTitle}>
            Your Car Is an Asset.<br />
            <span className={styles.heroTitleGradient}>Make It Earn ₹30,000–₹75,000 / Month.</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Turn your parked or underutilised vehicle into a steady, high-yield income stream with Kadapa&apos;s most trusted travel network. A <strong>guaranteed 70% partner revenue share</strong>, recurring verified customer bookings, zero joining fees, and every agreement protected in writing.
          </p>

          <div className={styles.heroCtas}>
            <a href="#attach-form" className="btn btn--primary btn--xl">
              🚗 Attach Your Vehicle — Apply Now
            </a>
            <a
              href={`tel:${BUSINESS.phone.pavan}`}
              className="btn btn--brass btn--xl"
            >
              📞 Call Pavan: {BUSINESS.phone.pavanDisplay}
            </a>
          </div>

          {/* Quick Stats Banner */}
          <div className={styles.partnerStats}>
            <div>
              <div className={styles.pStatNum}>70%</div>
              <div className={styles.pStatLabel}>Direct Revenue to Car Owner</div>
            </div>
            <div>
              <div className={styles.pStatNum}>₹0</div>
              <div className={styles.pStatLabel}>Joining / Setup Deposit</div>
            </div>
            <div>
              <div className={styles.pStatNum}>24h</div>
              <div className={styles.pStatLabel}>Fast Vehicle Onboarding</div>
            </div>
            <div>
              <div className={styles.pStatNum}>100%</div>
              <div className={styles.pStatLabel}>Digital On-Time Settlements</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 2. 3 PARTNERSHIP MODELS ══ */}
      <section className="section" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Three Paths to Passive Income</span>
            <h2>Choose the Partnership Model That Fits Your Life</h2>
            <div className="divider" />
            <p>Whether you want guaranteed monthly income, full scheduling freedom, or maximum earnings as an owner-driver — MANA has a model built exactly for you.</p>
          </div>

          <div className={styles.modelsGrid}>
            {partnerModels.map((m, i) => (
              <div key={i} className={styles.modelCard}>
                <span className={styles.modelBadge}>{m.badge}</span>
                <h3 className={styles.modelTitle}>{m.title}</h3>
                <p className={styles.modelDesc}>{m.desc}</p>
                <div className={styles.modelEarnings}>
                  <div className={styles.modelEarnLabel}>Estimated Monthly Net</div>
                  <div className={styles.modelEarnVal}>{m.earnings}</div>
                </div>
                <ul className="checklist">
                  {m.features.map((f, fIndex) => (
                    <li key={fIndex}>{f}</li>
                  ))}
                </ul>
                <a href="#attach-form" className="btn btn--charcoal" style={{ marginTop: 'auto', width: '100%', justifyContent: 'center' }}>
                  Apply for {m.title} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. REASONABLE EARNINGS CALCULATOR & VEHICLE MATRIX ══ */}
      <section className="section" style={{ background: 'var(--pearl-bg)' }}>
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Real Numbers, Real Routes</span>
            <h2>What Partners Actually Earn — Based on Live MANA Bookings</h2>
            <div className="divider" />
            <p>Estimated monthly net revenue based on actual MANA booking averages and the 70% partner revenue share. Calculated across active Rayalaseema routes, not theoretical projections.</p>
          </div>

          <div className={styles.earningsTableWrap}>
            <table className={styles.earningsTable}>
              <thead>
                <tr>
                  <th>Vehicle Category</th>
                  <th>Popular Vehicle Models</th>
                  <th>Expected Monthly Trips</th>
                  <th>Typical Routes Operated</th>
                  <th>Estimated Partner Net (70% Share)</th>
                </tr>
              </thead>
              <tbody>
                {earningsData.map((row, i) => (
                  <tr key={i}>
                    <td className={styles.vehicleNameCell}>{row.type}</td>
                    <td>{row.models}</td>
                    <td>{row.monthlyTrips}</td>
                    <td>{row.routes}</td>
                    <td className={styles.earningHighlight}>{row.gross}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ══ 4. 6 FOUNDATIONAL PARTNER GUARANTEES ══ */}
      <section className="section" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">The MANA Trust Standard</span>
            <h2>The 6 Promises We Put in Writing</h2>
            <div className="divider" />
            <p>Six core business commitments built to protect your vehicle asset, guarantee your income, and give you complete peace of mind.</p>
          </div>

          <div className={styles.guaranteesGrid}>
            {partnerGuarantees.map((g, i) => {
              const Graphic = g.Illustration;
              return (
                <div key={i} className={styles.guaranteeCard}>
                  <div className={styles.guaranteeIcon}>
                    <Graphic size={50} />
                  </div>
                  <h3 className={styles.guaranteeTitle}>{g.title}</h3>
                  <p className={styles.guaranteeDesc}>{g.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ 5. 4-STEP ONBOARDING PROCESS ══ */}
      <section className="section" style={{ background: 'var(--pearl-bg)' }}>
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Fast &amp; Frictionless</span>
            <h2>From Parked to Profitable in 24 Hours</h2>
            <div className="divider" />
            <p>Zero red tape, zero complicated onboarding. Get your vehicle verified, contracted, and earning on the road within one business day.</p>
          </div>

          <div className={styles.stepsGrid}>
            {onboardingSteps.map((s, i) => (
              <div key={i} className={styles.stepCard}>
                <div className={styles.stepNum}>{s.step}</div>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6. APPLICATION FORM & ELIGIBILITY CHECKLIST ══ */}
      <section className="section" style={{ background: '#FFFFFF' }} id="attach-form">
        <div className="container">
          <div className={styles.regLayout}>
            {/* Left Registration Form */}
            <div className={styles.formCard}>
              <div className={styles.formHeader}>
                <span className="eyebrow" style={{ display: 'inline-flex', marginBottom: '8px' }}>
                  Vehicle Attachment Application
                </span>
                <h2 className={styles.formTitle}>Your First Trip Could Be This Weekend</h2>
                <p className={styles.formSubtitle}>
                  Fill in your vehicle details below. Our fleet onboarding team reviews every application personally and contacts you on WhatsApp within 24 hours to confirm your eligibility and first route.
                </p>
              </div>

              {submitted && (
                <div
                  style={{
                    padding: '16px 20px',
                    background: 'var(--brass-subtle)',
                    border: '1.5px solid var(--brass-border)',
                    borderRadius: 'var(--r-xl)',
                    marginBottom: '20px',
                    color: 'var(--brass-dark)',
                    fontWeight: 700,
                  }}
                >
                  ✓ Application submitted! Pavan will personally review and WhatsApp you within 24 hours.
                </div>
              )}

              <form onSubmit={handleSubmit} className={styles.formGrid}>
                <div className={styles.formRow}>
                  <div className="form-group">
                    <label className="form-label">Owner / Driver Name *</label>
                    <input
                      className="form-input"
                      type="text"
                      required
                      placeholder="e.g. K. Venkat Reddy"
                      value={form.ownerName}
                      onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Contact Phone Number *</label>
                    <input
                      className="form-input"
                      type="tel"
                      required
                      placeholder="+91 99083 XXXXX"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className="form-group">
                    <label className="form-label">Vehicle Brand / Make *</label>
                    <input
                      className="form-input"
                      type="text"
                      required
                      placeholder="e.g. Toyota, Maruti, Hyundai"
                      value={form.vehicleMake}
                      onChange={(e) => setForm({ ...form, vehicleMake: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Car Model &amp; Year *</label>
                    <input
                      className="form-input"
                      type="text"
                      required
                      placeholder="e.g. Etios (2022)"
                      value={form.vehicleModel}
                      onChange={(e) => setForm({ ...form, vehicleModel: e.target.value })}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className="form-group">
                    <label className="form-label">Registration Number (Optional)</label>
                    <input
                      className="form-input"
                      type="text"
                      placeholder="e.g. AP 04 XX 1234"
                      value={form.regNumber}
                      onChange={(e) => setForm({ ...form, regNumber: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Fuel Type</label>
                    <select
                      className="form-input"
                      value={form.fuelType}
                      onChange={(e) => setForm({ ...form, fuelType: e.target.value })}
                    >
                      <option value="Diesel">Diesel</option>
                      <option value="Petrol">Petrol</option>
                      <option value="CNG">CNG / Hybrid</option>
                      <option value="EV">Electric (EV)</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className="form-group">
                    <label className="form-label">Vehicle Seating Category</label>
                    <select
                      className="form-input"
                      value={form.seats}
                      onChange={(e) => setForm({ ...form, seats: e.target.value })}
                    >
                      <option value="5 Seater Sedan">5 Seater Sedan (Etios, Dzire, Amaze)</option>
                      <option value="7 Seater MPV">7 Seater MPV (Ertiga, Carens, Marazzo)</option>
                      <option value="Luxury MPV">Luxury MPV (Innova Crysta, Hycross)</option>
                      <option value="Tempo Traveller">Tempo Traveller (12–26 Seater)</option>
                      <option value="Hatchback">Hatchback (Swift, i20)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Preferred Partnership Model</label>
                    <select
                      className="form-input"
                      value={form.modelPreference}
                      onChange={(e) => setForm({ ...form, modelPreference: e.target.value })}
                    >
                      <option value="Full-Time Dedicated">Full-Time Dedicated Fleet (70% Share)</option>
                      <option value="Flexible On-Demand">Flexible On-Demand Partner (70% Share)</option>
                      <option value="Driver-Cum-Owner">Driver-Cum-Owner (DCO)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Additional Information / Driver Availability</label>
                  <textarea
                    className="form-input"
                    rows="3"
                    placeholder="Tell us if you drive yourself or provide a driver, your base area in Kadapa, or preferred routes..."
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn--primary btn--xl" style={{ width: '100%', justifyContent: 'center' }}>
                  🚗 Submit My Vehicle — Start Earning
                </button>
              </form>
            </div>

            {/* Right Eligibility Checklist & Direct Call Box */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className={styles.eligibilityCard}>
                <h3>📋 Partner &amp; Vehicle Eligibility</h3>
                <ul className="checklist">
                  <li>Valid RC (Registration Certificate) and Fitness Certificate</li>
                  <li>Valid Comprehensive Commercial Vehicle Insurance</li>
                  <li>AC in perfect working order (Front &amp; Rear)</li>
                  <li>Vehicle manufacturing year 2017 or newer</li>
                  <li>Valid Indian Commercial Driving License for Chauffeur</li>
                  <li>Spotless, sanitized interior with zero major dent history</li>
                </ul>
              </div>

              <div
                style={{
                  background: 'linear-gradient(135deg, var(--brass-subtle) 0%, #FFFFFF 100%)',
                  border: '1.5px solid var(--brass-border)',
                  borderRadius: 'var(--r-2xl)',
                  padding: '28px',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
                  <FleetPartnerIllustration size={48} />
                  <div>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--charcoal-900)' }}>
                    Prefer a Direct Conversation?
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--charcoal-600)' }}>
                    Call Pavan directly to discuss your vehicle, your preferred routes, and your expected earnings in a private 10-minute call.
                  </p>
                  </div>
                </div>
                <a
                  href={`tel:${BUSINESS.phone.pavan}`}
                  className="btn btn--primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  📞 Call Pavan: {BUSINESS.phone.pavanDisplay}
                </a>
              </div>
            </div>
          </div>

          {/* ══ 7. PARTNER FAQ ══ */}
          <div style={{ marginTop: '64px' }}>
            <div className="section-header">
              <span className="eyebrow">Frequently Asked Questions</span>
              <h2>Fleet Partner Questions, Answered Honestly</h2>
              <div className="divider" />
              <p>Clear, direct answers to the questions every new partner asks us before signing.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {partnerFaqs.map((faq, i) => (
                <details
                  key={i}
                  style={{
                    background: 'var(--pearl-bg)',
                    border: '1px solid var(--pearl-border)',
                    borderRadius: 'var(--r-xl)',
                    padding: '20px 24px',
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
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
