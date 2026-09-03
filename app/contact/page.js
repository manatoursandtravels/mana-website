'use client';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import DigitalBusinessCard from '@/components/DigitalBusinessCard';
import { BUSINESS } from '@/lib/constants';
import {
  CustomerCareIllustration,
  LocationBeaconIllustration,
  FastResponseIllustration,
  WhatsAppInfographic,
} from '@/components/Illustrations';
import {
  Rotating3DHeadset,
  Glowing3DTelephoneDesk,
  Pulsing3DWhatsAppBadge,
  Shimmering3DEnvelope,
} from '@/components/ContactAnimations';
import styles from './contact.module.css';

const contactChannels = [
  {
    id: 'pavan',
    badge: 'Direct Line',
    badgeType: 'live',
    category: 'Owner Desk',
    roleTag: 'Founder & Managing Partner',
    name: 'Pavan (Direct)',
    value: BUSINESS.phone.pavanDisplay,
    href: `tel:${BUSINESS.phone.pavan}`,
    action: 'Direct Call Pavan',
    subText: 'Direct fleet allocation & bespoke trip customization',
    theme: 'blue',
    Illustration: Rotating3DHeadset,
  },
  {
    id: 'jyothi',
    badge: '24/7 Desk',
    badgeType: 'active',
    category: 'Bookings',
    roleTag: 'Central Booking & Dispatch',
    name: 'Jyothi (Bookings)',
    value: BUSINESS.phone.jyothiDisplay,
    href: `tel:${BUSINESS.phone.jyothi}`,
    action: 'Call Dispatch Desk',
    subText: 'Instant cab confirmations & live trip tracking',
    theme: 'brass',
    Illustration: Glowing3DTelephoneDesk,
  },
  {
    id: 'whatsapp',
    badge: '< 60s Reply',
    badgeType: 'whatsapp',
    category: 'Instant Chat',
    roleTag: 'WhatsApp Concierge Desk',
    name: '24/7 Fast Support',
    value: '+91 99083 00718',
    href: `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent('Hi MANA Travels, I have an urgent inquiry.')}`,
    action: 'Chat on WhatsApp',
    subText: '1-click booking, live GPS driver link & estimates',
    theme: 'emerald',
    external: true,
    Illustration: Pulsing3DWhatsAppBadge,
  },
  {
    id: 'email',
    badge: 'Official Desk',
    badgeType: 'email',
    category: 'Quotations',
    roleTag: 'Corporate & Tour Quotations',
    name: 'Corporate Desk',
    value: BUSINESS.email,
    href: `mailto:${BUSINESS.email}`,
    action: 'Send Official Email',
    subText: 'B2B contracts, GST invoices & wedding packages',
    theme: 'charcoal',
    Illustration: Shimmering3DEnvelope,
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: 'General Enquiry', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const lines = [
      '*New Contact Message — MANA Tours & Travels*',
      '',
      `*Name:* ${form.name}`,
      `*Phone:* ${form.phone}`,
      form.email ? `*Email:* ${form.email}` : null,
      `*Subject:* ${form.subject}`,
      `*Message:* ${form.message}`,
    ].filter(Boolean).join('\n');

    window.open(`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(lines)}`, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <>
      <Header />

      {/* ══ 1. HERO SECTION ══ */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroPill}>
            <span>⚡ 24/7/365 Available · Response in &lt; 15 Mins</span>
          </div>

          <h1 className={styles.heroTitle}>
            We&apos;re Always Here,<br />
            <span className={styles.heroTitleGradient}>Ready for Your Journey.</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Whether you need a 3:00 AM sacred pilgrimage pickup, a cross-state business transfer, or have a fleet query — our Kadapa dispatch team is standing by.
          </p>
        </div>
      </section>

      {/* ══ 2. 4 INTERACTIVE 3D EXECUTIVE CONCIERGE CHANNELS ══ */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className={styles.contactGrid}>
            {contactChannels.map((c) => {
              const IconGraphic = c.Illustration;
              return (
                <div
                  key={c.id}
                  className={`${styles.contactCard} ${styles[`cardTheme_${c.theme}`]}`}
                  id={`contact-card-${c.id}`}
                >
                  <div className={styles.cardHeaderRow}>
                    <span className={`${styles.statusPill} ${styles[`statusPill_${c.badgeType}`]}`}>
                      <span className={styles.statusDot} />
                      {c.badge}
                    </span>
                    <span className={styles.cardCategory}>{c.category}</span>
                  </div>

                  <div className={styles.cardIconDock}>
                    <IconGraphic />
                  </div>

                  <div className={styles.cardRoleTag}>{c.roleTag}</div>
                  <h3 className={styles.cardPersonTitle}>{c.name}</h3>
                  <a
                    href={c.href}
                    className={styles.cardContactValue}
                    {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {c.value}
                  </a>
                  <p className={styles.cardSubText}>{c.subText}</p>

                  <a
                    href={c.href}
                    className={`${styles.cardActionBtn} ${styles[`btnTheme_${c.theme}`]}`}
                    {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <span>{c.action}</span>
                    <span className={styles.btnArrow}>→</span>
                  </a>
                </div>
              );
            })}
          </div>

          {/* ══ OFFICIAL DIGITAL BUSINESS CARD & VERIFIED CREDENTIALS ══ */}
          <DigitalBusinessCard />

          {/* ══ 3. TWO COLUMN INTERACTIVE FORM & KADAPA HUB INFO ══ */}
          <div className={styles.contactLayout}>
            {/* Left Interactive Message Form */}
            <div className={styles.formCard}>
              <div className={styles.formHeader}>
                <span className="eyebrow" style={{ display: 'inline-flex', marginBottom: '8px' }}>
                  Send a Direct Message
                </span>
                <h2 className={styles.formTitle}>How Can We Assist You?</h2>
                <p className={styles.formSubtitle}>
                  Fill in your query below. Our team connects directly to WhatsApp for instant confirmation.
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
                  ✓ Your message has been routed to WhatsApp. We will reply in under 15 minutes!
                </div>
              )}

              <form onSubmit={handleSubmit} className={styles.formGrid}>
                <div className={styles.formRow}>
                  <div className="form-group">
                    <label className="form-label">Your Name *</label>
                    <input
                      className="form-input"
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
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
                    <label className="form-label">Email Address (Optional)</label>
                    <input
                      className="form-input"
                      type="email"
                      placeholder="name@domain.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <select
                      className="form-input"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    >
                      <option value="General Enquiry">General Travel Enquiry</option>
                      <option value="Tirupati / Pilgrimage Booking">Tirupati / Pilgrimage Booking</option>
                      <option value="Outstation Trip Quote">Outstation Trip Quote</option>
                      <option value="Self Drive Car Rental">Self Drive Car Rental</option>
                      <option value="Attach Vehicle (Partner)">Attach Vehicle (Fleet Partner)</option>
                      <option value="Corporate Travel Account">Corporate Travel Account</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Your Message or Trip Details *</label>
                  <textarea
                    className="form-input"
                    rows="4"
                    required
                    placeholder="Tell us your pickup location, destination dates, or specific questions..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn--primary btn--xl" style={{ width: '100%', justifyContent: 'center' }}>
                  💬 Send Message via WhatsApp
                </button>
              </form>
            </div>

            {/* Right Information & 3D Cards */}
            <div className={styles.infoCol}>
              {/* Response Time Guarantee Card */}
              <div className={styles.guaranteeBanner}>
                <FastResponseIllustration size={54} />
                <div>
                  <div className={styles.guaranteeTitle}>15-Minute Response Guarantee</div>
                  <div className={styles.guaranteeDesc}>
                    Every phone call and WhatsApp message is handled directly by experienced dispatchers — never an automated bot.
                  </div>
                </div>
              </div>

              {/* Kadapa Headquarters */}
              <div className={styles.infoCard}>
                <div className={styles.infoCardIcon}>
                  <LocationBeaconIllustration size={50} />
                </div>
                <div className={styles.infoCardBody}>
                  <h3>Kadapa City Hub &amp; Headquarters</h3>
                  <p>Kadapa, Andhra Pradesh – 516001</p>
                  <p style={{ marginTop: '6px', fontSize: '0.85rem' }}>
                    Serving all of YSR Kadapa district with seamless pickups from RIMS, Railway Station, APSRTC Bus Stand, and Kadapa Airport (CDP).
                  </p>
                </div>
              </div>

              {/* Operating Hours */}
              <div className={styles.infoCard}>
                <div className={styles.infoCardIcon}>
                  <FastResponseIllustration size={50} />
                </div>
                <div className={styles.infoCardBody}>
                  <h3>24/7/365 Round-the-Clock Dispatch</h3>
                  <p>
                    Open all 365 days including festival days and state holidays. Early-morning 3 AM temple departures and late-night airport drop-offs are guaranteed on-time.
                  </p>
                </div>
              </div>

              {/* Payment Methods */}
              <div className={styles.infoCard}>
                <div className={styles.infoCardIcon}>
                  <CustomerCareIllustration size={50} />
                </div>
                <div className={styles.infoCardBody}>
                  <h3>Transparent Post-Trip Settlements</h3>
                  <p>
                    Accepting <strong>UPI</strong> (Google Pay, PhonePe, Paytm), <strong>Bank Transfers</strong>, and <strong>Cash</strong>. Pay after your journey is safely completed. Zero hidden fees.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ══ 4. INTERACTIVE GOOGLE MAP EMBED ══ */}
          <div className={styles.mapWrap}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60997.37988505766!2d78.7745!3d14.4674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bba3c98e8e0b4a3%3A0x1bff3c5dd0a7d1b5!2sKadapa%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1692000000000!5m2!1sen!2sin"
              width="100%"
              height="380"
              style={{ border: 0, display: 'block' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="MANA Tours & Travels location — Kadapa, Andhra Pradesh"
            />
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
