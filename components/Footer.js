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
  { label: 'Certified Used Cars', href: '/used-cars', highlight: '🔥 5 in Stock' },
  { label: 'Self Drive Rentals (₹1,499/d)', href: '/services/self-drive', highlight: '₹800 OFF' },
  { label: 'Partner Program (70% Share)', href: '/partner', highlight: 'Earn ₹50k+' },
  { label: 'Contact Executive Desk', href: '/contact' },
  { label: 'Frequently Asked Questions', href: '/faq' },
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
                <a
                  href="https://share.google/0sD6bzbqjLt1h1NCZ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.googleReviewBadge}
                  title="View verified 5.0 Google Reviews for MANA Tours & Travels Kadapa"
                >
                  <span className={styles.goldStars}>★★★★★</span>
                  <span>5.0 · Google Verified Profile ↗</span>
                </a>
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

      {/* ── 2.5 LOCAL GEO AUTHORITY & GMB VERIFICATION STRIP ── */}
      <div className={styles.geoCoverageBand}>
        <div className="container">
          <div className={styles.geoCoverageGrid}>
            <div className={styles.geoLeft}>
              <div className={styles.geoTitle}>
                <span>📍 Kadapa &amp; Rayalaseema Local Service Coverage</span>
              </div>
              <p className={styles.geoDesc}>
                Providing 24/7 on-demand cab pickups, fixed airport transfers, self-drive car rentals, and temple darshan drops across Kadapa City (Seven Roads, Devuni Kadapa, RIMS, Railway Station, Yerramukkapalli, Rajiv Marg), Proddatur, Pulivendula, Rayachoty, Badvel, Jammalamadugu, Maidukur, Rajampet, Tirupati, Gandikota, and Srisailam.
              </p>
            </div>

            <div className={styles.geoRight}>
              <a
                href="https://share.google/0sD6bzbqjLt1h1NCZ"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.gmbAuthorityBtn}
                id="footer-gmb-link"
              >
                <span className={styles.gmbIcon}>⭐</span>
                <div>
                  <div className={styles.gmbBtnTitle}>Google Business Profile</div>
                  <div className={styles.gmbBtnSub}>5.0 ★ Rated · View on Google Maps ↗</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. SOCIAL FOLLOW STRIP ── */}
      <div className={styles.socialStrip}>
        <div className="container">
          <div className={styles.socialStripInner}>
            <span className={styles.socialStripLabel}>Follow MANA Tours</span>
            <div className={styles.socialLinks}>
              {/* YouTube */}
              <a
                href="https://www.youtube.com/@ManaToursTravels"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.socialLink} ${styles.socialYt}`}
                aria-label="MANA Tours on YouTube"
                title="YouTube — Road Trip Vlogs & Travel Guides"
              >
                <svg width="18" height="18" viewBox="0 0 90 63" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M88.1 9.86C87.1 6.22 84.24 3.36 80.6 2.36 73.57.5 45 .5 45 .5S16.43.5 9.4 2.36C5.76 3.36 2.9 6.22 1.9 9.86.04 16.89.04 31.5.04 31.5s-.16 14.61 1.86 21.64c1 3.64 3.86 6.5 7.5 7.5C16.43 62.5 45 62.5 45 62.5s28.57 0 35.6-1.86c3.64-1 6.5-3.86 7.5-7.5 1.86-7.03 1.86-21.64 1.86-21.64s.16-14.61-1.86-21.64z"/>
                  <path d="M36 45L59.27 31.5 36 18v27z" fill="white"/>
                </svg>
                <span>YouTube</span>
              </a>
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${BUSINESS.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.socialLink} ${styles.socialWa}`}
                aria-label="MANA Tours on WhatsApp"
                title="WhatsApp — Instant Booking"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.116.553 4.103 1.522 5.831L.057 23.428l5.763-1.51A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.922 0-3.71-.522-5.241-1.428l-.376-.223-3.892 1.02 1.038-3.79-.246-.39A9.818 9.818 0 012.182 12C2.182 6.575 6.575 2.182 12 2.182S21.818 6.575 21.818 12 17.425 21.818 12 21.818z"/>
                </svg>
                <span>WhatsApp</span>
              </a>
              {/* Google */}
              <a
                href="https://share.google/0sD6bzbqjLt1h1NCZ"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.socialLink} ${styles.socialGoogle}`}
                aria-label="MANA Tours Google Business Profile"
                title="Google — 5.0★ Reviews"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>
                <span>Google</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. BOTTOM COPYRIGHT & LOCAL PRIDE BAR ── */}
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
