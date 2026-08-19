import Image from 'next/image';
import Link from 'next/link';
import { BUSINESS, SERVICES } from '@/lib/constants';
import styles from './Footer.module.css';

const popularRoutes = [
  { label: 'Kadapa → Tirupati (Temple)', href: '/routes/kadapa-tirupati-cab', tag: 'Darshan' },
  { label: 'Kadapa → Bangalore (Airport)', href: '/routes/kadapa-bangalore-cab', tag: 'Airport' },
  { label: 'Kadapa → Hyderabad (RGIA)', href: '/routes/kadapa-hyderabad-cab', tag: 'Airport' },
  { label: 'Kadapa → Chennai (Central)', href: '/routes/kadapa-chennai-cab', tag: 'Intercity' },
  { label: 'Kadapa → Gandikota (Canyon)', href: '/routes/kadapa-gandikota-tour', tag: 'Day Tour' },
  { label: 'Kadapa → Srisailam (Jyotirlinga)', href: '/routes/kadapa-srisailam-cab', tag: 'Pilgrimage' },
  { label: 'Kadapa → Belum Caves', href: '/routes/kadapa-belum-caves', tag: 'Heritage' },
  { label: 'Kadapa → Ooty (Nilgiris)', href: '/routes/kadapa-ooty-tour', tag: 'Holiday' },
  { label: 'Kadapa → Goa (Beach Holiday)', href: '/routes/kadapa-goa-tour', tag: 'Vacation' },
];

const companyLinks = [
  { label: 'About MANA Tours', href: '/about' },
  { label: 'Contact Executive Desk', href: '/contact' },
  { label: 'Frequently Asked Questions', href: '/faq' },
  { label: 'Partner Program (70% Share)', href: '/partner', highlight: 'Earn ₹50k+' },
  { label: 'Self Drive Rentals (₹1,499/d)', href: '/services/self-drive', highlight: '₹800 OFF' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* ── 1. FLOATING EXECUTIVE CTA BAND ── */}
      <div className="container">
        <div className={styles.ctaWrapper}>
          <div className={styles.ctaCard}>
            <div className={styles.ctaCardBgMesh} />
            <div className={styles.ctaGrid}>
              <div className={styles.ctaLeft}>
                <div className={styles.ctaStatusPill}>
                  <span className={styles.statusDotPulse} />
                  <span>24/7 Operations Hub Online · Response in &lt; 5 Minutes</span>
                </div>
                <h2 className={styles.ctaHeading}>Ready for an Unforgettable Journey?</h2>
                <p className={styles.ctaDesc}>
                  Instant cab booking, self-drive car handover, or customized pilgrimage packages across South India — call or WhatsApp directly for an upfront guaranteed quote.
                </p>
              </div>

              <div className={styles.ctaActions}>
                <a href={`tel:${BUSINESS.phone.pavan}`} className={styles.ctaPhoneBtn} id="footer-call-pavan">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79a15.1 15.1 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.45 2.33.7 3.58.7a1 1 0 011 1V20a1 1 0 01-1 1C10.49 21 3 13.51 3 4.5A1 1 0 014 3.5h3.5a1 1 0 011 1c0 1.26.25 2.46.7 3.58a1 1 0 01-.24 1.01l-2.34 2.2z"/>
                  </svg>
                  <span>Call {BUSINESS.phone.pavanDisplay}</span>
                </a>
                <a
                  href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent('Hi MANA Tours, I would like to check cab / self-drive availability from Kadapa.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ctaWhatsAppBtn}
                  id="footer-wa"
                >
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.116.553 4.103 1.522 5.831L.057 23.428l5.763-1.51A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.922 0-3.71-.522-5.241-1.428l-.376-.223-3.892 1.02 1.038-3.79-.246-.39A9.818 9.818 0 012.182 12C2.182 6.575 6.575 2.182 12 2.182S21.818 6.575 21.818 12 17.425 21.818 12 21.818z"/>
                  </svg>
                  <span>WhatsApp Instant Booking</span>
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
            {/* Column 1: Brand & Executive Hub */}
            <div className={styles.brandCol}>
              <Link href="/" className={styles.footerLogoAnchor} aria-label="MANA Tours & Travels">
                <div className={styles.logoDisplayWrap}>
                  <Image
                    src="/images/logo.png"
                    alt="MANA Tours & Travels — Kadapa"
                    width={320}
                    height={90}
                    priority
                    style={{
                      height: '68px',
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
                  <div className={styles.contactIconWrap}>📞</div>
                  <div className={styles.contactText}>
                    <span className={styles.contactRoleTitle}>Pavan · Managing Partner</span>
                    <span className={styles.contactPhoneNum}>{BUSINESS.phone.pavanDisplay}</span>
                  </div>
                </a>
                <a href={`tel:${BUSINESS.phone.jyothi}`} className={styles.contactPill}>
                  <div className={styles.contactIconWrap}>💬</div>
                  <div className={styles.contactText}>
                    <span className={styles.contactRoleTitle}>Jyothi · Booking Desk</span>
                    <span className={styles.contactPhoneNum}>{BUSINESS.phone.jyothiDisplay}</span>
                  </div>
                </a>
              </div>

              {/* Trust Badges */}
              <div className={styles.trustBadgeRow}>
                <div className={styles.googleReviewBadge}>
                  <span className={styles.goldStars}>★★★★★</span>
                  <span>5.0 · Google Verified</span>
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
                      <span className={styles.linkArrow}>→</span>
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
                      <span className={styles.linkArrow}>→</span>
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
                      <span className={styles.linkArrow}>→</span>
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
                  <span className={styles.hubPulseDot} />
                  <span>Open 24 Hours / 7 Days</span>
                </div>
                <div className={styles.paymentMethodsWrap}>
                  <span className={styles.payLabel}>Accepted Payments:</span>
                  <div className={styles.paymentPillRow}>
                    <span className={styles.payPill}>UPI</span>
                    <span className={styles.payPill}>GPay</span>
                    <span className={styles.payPill}>PhonePe</span>
                    <span className={styles.payPill}>Cards</span>
                    <span className={styles.payPill}>FASTag</span>
                    <span className={styles.payPill}>Cash</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. BOTTOM COPYRIGHT & LOCAL PRIDE BAR ── */}
      <div className={styles.bottomBar}>
        <div className="container">
          <div className={styles.bottomInner}>
            <p className={styles.copyrightText}>
              &copy; {year} MANA Tours &amp; Travels. All rights reserved.
            </p>

            <div className={styles.localPrideText}>
              <span>Handcrafted with pride in Kadapa, Andhra Pradesh</span>
            </div>

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
