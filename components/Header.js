'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { BUSINESS } from '@/lib/constants';
import styles from './Header.module.css';

const SERVICES_LINKS = [
  { href: '/services/local-cabs',       label: 'Local Cabs',         icon: '🚗', desc: '4hr & 8hr city packages' },
  { href: '/services/outstation-cabs',  label: 'Outstation Cabs',    icon: '🛣️', desc: 'One-way & round trips'    },
  { href: '/services/airport-transfers',label: 'Airport Transfers',  icon: '✈️', desc: 'Fixed price, on-time'      },
  { href: '/services/pilgrimage-tours', label: 'Pilgrimage Tours',   icon: '🛕', desc: 'Tirupati, Srisailam & more' },
  { href: '/services/tour-packages',    label: 'Tour Packages',      icon: '🏔️', desc: 'Gandikota, Belum & more'   },
  { href: '/services/corporate-travel', label: 'Corporate Travel',   icon: '🏢', desc: 'GST invoices, accounts'    },
  { href: '/services/local-sightseeing',label: 'Local Sightseeing',  icon: '🗺️', desc: 'Kadapa city tours'         },
  { href: '/services/wedding-travel',   label: 'Wedding & Events',   icon: '💒', desc: 'Fleet for special days'    },
  { href: '/services/self-drive',       label: 'Self Drive',         icon: '🔑', desc: 'Drive it yourself'          },
  { href: '/used-cars#sell-car-section',label: 'Certified Used Cars',icon: '🚘', desc: 'Sell your car & verified fleet' },
];

const NAV_LINKS = [
  { href: '/about',   label: 'About' },
  { href: '/partner', label: 'Partner With Us' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled]         = useState(false);
  const [menuOpen, setMenuOpen]         = useState(false);
  const [dropOpen, setDropOpen]         = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const pathname                         = usePathname();
  const dropRef                          = useRef(null);
  const dropTimerRef                     = useRef(null);

  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else          document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const openDrop  = () => { clearTimeout(dropTimerRef.current); setDropOpen(true);  };
  const closeDrop = () => { dropTimerRef.current = setTimeout(() => setDropOpen(false), 180); };

  const solidHeader = scrolled || !isHomePage;

  return (
    <>
      <header className={`${styles.header} ${solidHeader ? styles.solid : ''} ${menuOpen ? styles.menuIsOpen : ''}`}>
        <div className={`container ${styles.inner}`}>

          {/* ── Logo ── */}
          <Link href="/" className={styles.logo} onClick={() => setMenuOpen(false)} aria-label="MANA Tours & Travels — Home">
            <div className={styles.logoImgWrap}>
              <Image
                src="/images/logo.png"
                alt="MANA Tours & Travels"
                width={185}
                height={50}
                style={{ objectFit: 'contain', height: '44px', width: 'auto', display: 'block' }}
                priority
              />
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className={styles.nav} aria-label="Main navigation">

            {/* Home Link */}
            <Link
              href="/"
              className={`${styles.navLink} ${pathname === '/' ? styles.navLinkActive : ''}`}
              id="nav-home"
            >
              Home
            </Link>

            {/* Services mega-drop */}
            <div
              className={styles.navItem}
              ref={dropRef}
              onMouseEnter={openDrop}
              onMouseLeave={closeDrop}
            >
              <button
                className={`${styles.navLink} ${dropOpen ? styles.navLinkActive : ''}`}
                onClick={() => setDropOpen(v => !v)}
                aria-expanded={dropOpen}
                aria-haspopup="true"
                id="services-menu-btn"
              >
                Services
                <svg className={`${styles.chevron} ${dropOpen ? styles.chevronUp : ''}`} width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {dropOpen && (
                <div className={styles.megaDrop} role="menu" aria-label="Services submenu">
                  <div className={styles.megaGrid}>
                    {SERVICES_LINKS.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className={styles.megaItem}
                        role="menuitem"
                        onClick={() => {
                          setDropOpen(false);
                          if (s.href.includes('#')) {
                            const [targetPath, hash] = s.href.split('#');
                            if (pathname === targetPath) {
                              const target = document.getElementById(hash);
                              if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }
                        }}
                      >
                        <span className={styles.megaIcon}>{s.icon}</span>
                        <div>
                          <div className={styles.megaLabel}>{s.label}</div>
                          <div className={styles.megaDesc}>{s.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className={styles.megaFooter}>
                    <span>📞 Need help choosing?</span>
                    <a href={`tel:${BUSINESS.phone.pavan}`} className={styles.megaPhone}>
                      {BUSINESS.phone.pavanDisplay}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Prominently Featured Self Drive */}
            <Link
              href="/services/self-drive"
              className={`${styles.navLink} ${styles.selfDriveNavLink} ${pathname === '/services/self-drive' ? styles.navLinkActive : ''}`}
              id="header-self-drive"
            >
              <span>🔑 Self Drive</span>
              <span className={styles.navBadge}>₹1,499/d</span>
            </Link>

            {NAV_LINKS.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`${styles.navLink} ${pathname === n.href ? styles.navLinkActive : ''}`}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* ── CTA + Hamburger ── */}
          <div className={styles.actions}>
            <a href={`tel:${BUSINESS.phone.pavan}`} className={styles.phoneBtn} aria-label="Call MANA Tours">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.1 15.1 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.45 2.33.7 3.58.7a1 1 0 011 1V20a1 1 0 01-1 1C10.49 21 3 13.51 3 4.5A1 1 0 014 3.5h3.5a1 1 0 011 1c0 1.26.25 2.46.7 3.58a1 1 0 01-.24 1.01l-2.34 2.2z"/></svg>
              <span>{BUSINESS.phone.pavanDisplay}</span>
            </a>
            <a
              href="#booking-section"
              className={`btn btn--primary btn--sm ${styles.ctaBtn}`}
              id="header-book-btn"
              onClick={(e) => {
                e.preventDefault();
                // Priority: booking section (homepage), then local subpage form
                const target =
                  document.getElementById('booking-section') ||
                  document.getElementById('book') ||
                  document.getElementById('booking-form');
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  setTimeout(() => {
                    const firstField = target.querySelector('select, input[type="text"], input[type="tel"]');
                    if (firstField) firstField.focus({ preventScroll: true });
                  }, 750);
                } else {
                  // Not on homepage — navigate to homepage booking section
                  window.location.href = '/#booking-section';
                }
              }}
            >
              Book Now
            </a>
            <button
              className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu ── */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`} aria-hidden={!menuOpen}>
        <nav className={styles.mobileNav}>
          {/* Mobile Featured Self Drive Banner */}
          <Link
            href="/services/self-drive"
            className={styles.mobileFeaturedSelfDrive}
            onClick={() => setMenuOpen(false)}
          >
            <div className={styles.mfsdLeft}>
              <span className={styles.mfsdIcon}>🔑</span>
              <div>
                <div className={styles.mfsdTitle}>Self Drive Rentals</div>
                <div className={styles.mfsdSub}>₹1,499/day · Zero fuel provided</div>
              </div>
            </div>
            <span className={styles.mfsdBadge}>₹800 OFF Weekly</span>
          </Link>

          {/* Mobile Home Link */}
          <Link
            href="/"
            className={`${styles.mobileNavLink} ${pathname === '/' ? styles.mobileNavLinkActive : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <div className={styles.mobileSection}>
            <button
              className={styles.mobileServicesToggle}
              onClick={() => setMobileServices(v => !v)}
              aria-expanded={mobileServices}
            >
              <span>Services</span>
              <svg className={`${styles.chevron} ${mobileServices ? styles.chevronUp : ''}`} width="16" height="16" viewBox="0 0 14 14" fill="none">
                <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {mobileServices && (
              <div className={styles.mobileServiceLinks}>
                {SERVICES_LINKS.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className={styles.mobileServiceItem}
                    onClick={() => {
                      setMenuOpen(false);
                      if (s.href.includes('#')) {
                        const [targetPath, hash] = s.href.split('#');
                        if (pathname === targetPath) {
                          const target = document.getElementById(hash);
                          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }
                    }}
                  >
                    <span>{s.icon}</span> {s.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {NAV_LINKS.map((n) => (
            <Link key={n.href} href={n.href} className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>
              {n.label}
            </Link>
          ))}

          <div className={styles.mobileCtas}>
            <a href={`tel:${BUSINESS.phone.pavan}`} className="btn btn--primary btn--lg" style={{width:'100%', justifyContent:'center'}}>
              📞 {BUSINESS.phone.pavanDisplay} — Pavan
            </a>
            <a href={`tel:${BUSINESS.phone.jyothi}`} className="btn btn--navy btn--lg" style={{width:'100%', justifyContent:'center'}}>
              📞 {BUSINESS.phone.jyothiDisplay} — Jyothi
            </a>
            <a href={`https://wa.me/${BUSINESS.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn btn--lg" style={{width:'100%', justifyContent:'center', background:'#25D366', color:'white'}}>
              💬 WhatsApp Us
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
