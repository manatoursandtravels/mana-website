import Image from 'next/image';
import Link from 'next/link';
import { BUSINESS, SERVICES } from '@/lib/constants';
import styles from './Footer.module.css';

const popularRoutes = [
  { label: 'Kadapa → Tirupati (Temple)', href: '/routes/kadapa-tirupati-cab' },
  { label: 'Kadapa → Hyderabad (RGIA)', href: '/routes/kadapa-hyderabad-cab' },
  { label: 'Kadapa → Bangalore (Airport)', href: '/routes/kadapa-bangalore-cab' },
  { label: 'Kadapa → Chennai (Central)', href: '/routes/kadapa-chennai-cab' },
  { label: 'Kadapa → Gandikota (Canyon)', href: '/routes/kadapa-gandikota-tour' },
  { label: 'Kadapa → Srisailam (Jyotirlinga)', href: '/routes/kadapa-srisailam-cab' },
  { label: 'Kadapa → Belum Caves', href: '/routes/kadapa-belum-caves' },
  { label: 'Kadapa → Ooty (Nilgiris)', href: '/routes/kadapa-ooty-tour' },
  { label: 'Kadapa → Goa (Beach Holiday)', href: '/routes/kadapa-goa-tour' },
];

const companyLinks = [
  { label: 'About MANA', href: '/about' },
  { label: 'Contact Executive Desk', href: '/contact' },
  { label: 'Frequently Asked Questions', href: '/faq' },
  { label: 'Partner Program (70% Share)', href: '/partner', highlight: '70% Share' },
  { label: 'Self Drive Rentals (₹1,499/d)', href: '/services/self-drive' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* ── 1. FLOATING EXECUTIVE CTA CARD ── */}
      <div className="container">
        <div className={styles.ctaWrapper}>
          <div className={styles.ctaCard}>
            <div className={styles.ctaCardBgMesh} />
            <div className={styles.ctaGrid}>
              <div className={styles.ctaLeft}>
                <div className={styles.ctaStatusPill}>
                  <span className={styles.statusDotPulse} />
                  <span>24/7 Dispatch Online · Response in &lt; 15 Minutes</span>
                </div>
                <h2 className={styles.ctaHeading}>Book Your Next Trip Right Now.</h2>
                <p className={styles.ctaDesc}>
                  Instant cab booking, self-drive car handover, or pilgrimage inquiry — call or WhatsApp directly to get a confirmed quote in under 5 minutes.
                </p>
              </div>

              <div className={styles.ctaActions}>
                <a href={`tel:${BUSINESS.phone.pavan}`} className={styles.ctaPhoneBtn} id="footer-call-pavan">
                  <span>📞 Call {BUSINESS.phone.pavanDisplay}</span>
                </a>
                <a
                  href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent('Hi MANA Tours, I would like to check cab / self-drive availability from Kadapa.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ctaWhatsAppBtn}
                  id="footer-wa"
                >
                  <span>💬 WhatsApp Instant Book</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. MAIN FOOTER BODY ── */}
      <div className={styles.mainFooter}>
        <div className="container">
          <div className={styles.footerGrid}>
            {/* Column 1: Brand & Executive Hub (With Big Logo) */}
            <div className={styles.brandCol}>
              <Link href="/" className={styles.footerLogoAnchor} aria-label="MANA Tours & Travels">
                <div className={styles.logoDisplayWrap}>
                  <Image
                    src="/images/logo.png"
                    alt="MANA Tours & Travels — Kadapa"
                    width={340}
                    height={96}
                    priority
                    style={{
                      height: '76px',
                      width: 'auto',
                      objectFit: 'contain',
                      display: 'block',
                    }}
                  />
                </div>
              </Link>

              <div className={styles.brandTagline}>
                &ldquo;Every Journey, A New Experience&rdquo;
              </div>

              <p className={styles.brandDescription}>
                Kadapa&apos;s premier chauffeur cab and self-drive car rental provider. Dedicated to spotless sanitized vehicles, punctuality, and upfront transparent pricing across Andhra Pradesh &amp; South India.
              </p>

              {/* Direct Concierge Contact Pills */}
              <div className={styles.execContacts}>
                <a href={`tel:${BUSINESS.phone.pavan}`} className={styles.contactPill}>
                  <span className={styles.contactRoleTitle}>Pavan · Managing Partner</span>
                  <span className={styles.contactPhoneNum}>{BUSINESS.phone.pavanDisplay}</span>
                </a>
                <a href={`tel:${BUSINESS.phone.jyothi}`} className={styles.contactPill}>
                  <span className={styles.contactRoleTitle}>Jyothi · Booking Desk</span>
                  <span className={styles.contactPhoneNum}>{BUSINESS.phone.jyothiDisplay}</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className={styles.trustBadgeRow}>
                <div className={styles.googleReviewBadge}>
                  <span className={styles.goldStars}>★★★★★</span>
                  <span>5.0 · Google Rated</span>
                </div>
                <div className={styles.permitBadge}>
                  <span>🛡️ All-India Commercial Permits</span>
                </div>
              </div>
            </div>

            {/* Column 2: Fleet & Services */}
            <div className={styles.navColumn}>
              <h3 className={styles.colHeader}>Our Services</h3>
              <ul className={styles.navLinksList}>
                {SERVICES.map((s) => (
                  <li key={s.id}>
                    <Link href={s.href} className={styles.navLinkItem}>
                      <span className={styles.linkDot} />
                      <span>{s.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Popular Intercity Routes */}
            <div className={styles.navColumn}>
              <h3 className={styles.colHeader}>Popular Routes</h3>
              <ul className={styles.navLinksList}>
                {popularRoutes.map((r, i) => (
                  <li key={i}>
                    <Link href={r.href} className={styles.navLinkItem}>
                      <span className={styles.linkDot} />
                      <span>{r.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Company & Kadapa Hub Desk */}
            <div className={styles.navColumn}>
              <h3 className={styles.colHeader}>Company &amp; Hub</h3>
              <ul className={styles.navLinksList}>
                {companyLinks.map((c, i) => (
                  <li key={i}>
                    <Link href={c.href} className={styles.navLinkItem}>
                      <span className={styles.linkDot} />
                      <span>{c.label}</span>
                      {c.highlight && (
                        <span className={styles.partnerHighlightPill}>{c.highlight}</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Hub Info Card */}
              <div className={styles.hubInfoCard}>
                <div className={styles.hubTitle}>
                  <span>📍 Kadapa Operations Hub</span>
                </div>
                <div className={styles.hubAddress}>
                  {BUSINESS.address}
                </div>
                <div className={styles.hubHours}>
                  <span>⏰ Open 24 Hours / 7 Days</span>
                </div>
                <div className={styles.paymentPillRow}>
                  <span className={styles.payPill}>UPI</span>
                  <span className={styles.payPill}>GPay</span>
                  <span className={styles.payPill}>PhonePe</span>
                  <span className={styles.payPill}>Cash</span>
                  <span className={styles.payPill}>FASTag</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. BOTTOM COPYRIGHT BAR ── */}
      <div className={styles.bottomBar}>
        <div className="container">
          <div className={styles.bottomInner}>
            <p className={styles.copyrightText}>
              &copy; {year} MANA Tours &amp; Travels. All rights reserved.
            </p>

            <div className={styles.legalLinks}>
              <Link href="/terms" className={styles.legalLink}>Terms of Service</Link>
              <span className={styles.legalDot}>·</span>
              <Link href="/privacy" className={styles.legalLink}>Privacy Policy</Link>
              <span className={styles.legalDot}>·</span>
              <Link href="/cancellation" className={styles.legalLink}>Cancellation Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
