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
    badge: 'Steady & Predictable',
    title: 'Full-Time Dedicated Fleet',
    desc: 'Attach your vehicle exclusively to the MANA network. Receive guaranteed monthly booking volumes, priority outstation assignments, a 70% revenue share, and predictable payouts.',
    earnings: '₹35,000 – ₹55,000 / mo',
    features: ['Fixed monthly trip quotas', 'Priority corporate & outstation routes', '70% revenue share to vehicle owner', 'Scheduled weekly payouts'],
  },
  {
    badge: 'Total Freedom',
    title: 'Flexible On-Demand Partner',
    desc: 'Keep your car on your schedule. Accept outstation or weekend trips with a competitive 70/30 revenue share (70% to car owner) with zero forced shifts.',
    earnings: '₹18,000 – ₹32,000 / mo',
    features: ['Zero forced shifts or minimums', '70% revenue to vehicle owner', 'Choose your preferred routes', 'Instant trip-by-trip settlement'],
  },
  {
    badge: 'Independent Drivers',
    title: 'Driver-Cum-Owner (DCO)',
    desc: 'Drive your own car on verified MANA VIP, airport, and temple tours. Enjoy high-ticket pilgrimage fares with 70% revenue share and 100% of driver tips & direct allowances.',
    earnings: '₹40,000 – ₹65,000+ / mo',
    features: ['Direct owner-driver partnership', '70% trip share + 100% of tips', 'Premium clientele vetting', 'Immediate cash / UPI payments'],
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
    title: '70% Revenue Share & On-Time Payouts',
    desc: 'Transparent 70% share to vehicle owners with trip-by-trip digital UPI transfers or weekly bank settlements without deduction delays.',
  },
  {
    Illustration: ContractLegalIllustration,
    title: 'Formal Written Contract',
    desc: 'Every partnership is bound by a clear written legal agreement protecting your asset, rates, and rights.',
  },
  {
    Illustration: PricingInfographic,
    title: 'Zero Upfront Fees',
    desc: 'No security deposit, no registration charge, and zero hidden platform subscription fees. Start earning immediately.',
  },
  {
    Illustration: SafetyInfographic,
    title: 'Verified Customer Base',
    desc: 'We screen all passenger bookings for identity, contact verification, and respectful travel conduct.',
  },
  {
    Illustration: LocalExpertiseInfographic,
    title: 'Toll & Fuel Clarity',
    desc: 'All customer tolls, parking, and state permits are collected at actuals — your core vehicle earnings remain untouched.',
  },
  {
    Illustration: WhatsAppInfographic,
    title: '24/7 Fleet WhatsApp Desk',
    desc: 'Direct coordinator contact for instant route assistance, emergency breakdown support, and live trip dispatch.',
  },
];

const onboardingSteps = [
  {
    step: '1',
    title: 'Submit Application',
    desc: 'Fill out our quick vehicle registration form below with your car model, year, and contact details.',
  },
  {
    step: '2',
    title: 'Document Review',
    desc: 'Our team verifies your RC, Insurance, Commercial Permit (if applicable), and Driver KYC within 24 hours.',
  },
  {
    step: '3',
    title: 'Vehicle Inspection',
    desc: 'Bring your vehicle for a quick physical inspection and sign the formal written partnership agreement.',
  },
  {
    step: '4',
    title: 'Start Receiving Trips',
    desc: 'Your vehicle is activated on our dispatch system. Start receiving recurring passenger trips immediately.',
  },
];

const partnerFaqs = [
  {
    q: 'How does the 70% revenue share work?',
    a: 'Under our partnership program, the vehicle owner receives 70% of the trip fare. MANA utilizes the remaining 30% for marketing, booking acquisition, customer support, dispatch operations, and technology maintenance. Fuel is handled per trip arrangement, and tolls/parking are paid by passengers at actuals.',
  },
  {
    q: 'How and when do I get paid for trips?',
    a: 'We offer flexible payment terms: either immediate digital UPI settlement right after trip completion, or consolidated weekly bank transfers every Monday. All trip invoices and breakdowns are shared with you on WhatsApp in real time.',
  },
  {
    q: 'Do I have to pay any registration fee or security deposit?',
    a: 'No! Attaching your vehicle to MANA Tours & Travels is 100% free with zero upfront charges, zero registration fees, and zero deposit requirements.',
  },
  {
    q: 'Can I attach my private (white plate) car?',
    a: 'We prioritize commercially registered (yellow plate) vehicles. However, if you own a private car in pristine condition, we can assist you with commercial permit conversion and compliant self-drive fleet attachment.',
  },
  {
    q: 'Can I drive my own car, or do I need to provide a driver?',
    a: 'Both options are welcome! You can drive your own vehicle under our Driver-Cum-Owner program, or attach your car as an investor/owner while providing a verified chauffeur.',
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
            <span>🤝 70% Partner Revenue Share · Verified Fleet Network</span>
          </div>

          <h1 className={styles.heroTitle}>
            Attach Your Vehicle &amp;<br />
            <span className={styles.heroTitleGradient}>Earn ₹30,000 to ₹75,000+ / Mo</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Transform your car into a steady, high-yielding revenue asset with Kadapa&apos;s most trusted travel network.
            Enjoy a competitive <strong>70% partner revenue share</strong>, recurring verified customer bookings, zero joining fees, and written legal contracts.
          </p>

          <div className={styles.heroCtas}>
            <a href="#attach-form" className="btn btn--primary btn--xl">
              🚗 Attach Your Vehicle Now
            </a>
            <a
              href={`tel:${BUSINESS.phone.pavan}`}
              className="btn btn--brass btn--xl"
            >
              📞 Call Pavan (Managing Partner): {BUSINESS.phone.pavanDisplay}
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
            <span className="eyebrow">Flexible Business Models</span>
            <h2>Choose How You Want to Partner</h2>
            <div className="divider" />
            <p>Tailored partnership frameworks designed for full-time fleet owners, weekend drivers, and owner-chauffeurs.</p>
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
                  Apply for this Model
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
            <span className="eyebrow">Realistic Potential</span>
            <h2>Monthly Partner Net Earnings Estimates</h2>
            <div className="divider" />
            <p>Estimated monthly net revenue based on actual MANA booking averages and 70% partner revenue share across Rayalaseema routes.</p>
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
            <span className="eyebrow">The MANA Trust Advantage</span>
            <h2>Why Vehicle Owners Choose MANA</h2>
            <div className="divider" />
            <p>Six core business pillars built to safeguard your vehicle asset and maximize long-term income.</p>
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
            <span className="eyebrow">Fast &amp; Simple</span>
            <h2>How Onboarding Works in 4 Steps</h2>
            <div className="divider" />
            <p>Zero complicated red tape. Get your vehicle verified and earning on the road within 24 hours.</p>
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
                <h2 className={styles.formTitle}>Submit Your Car Details</h2>
                <p className={styles.formSubtitle}>
                  Fill in your vehicle specifications. Our fleet onboarding team will review and connect with you on WhatsApp within 24 hours.
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
                  ✓ Your application has been dispatched to WhatsApp! Pavan will contact you shortly.
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
                  🚗 Submit Car Attachment Application
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
                      Prefer Direct Consultation?
                    </h4>
                    <p style={{ fontSize: '0.88rem', color: 'var(--charcoal-600)' }}>
                      Speak directly with Pavan for 70% partner revenue split terms.
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
              <h2>Vehicle Owner Queries Answered</h2>
              <div className="divider" />
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
