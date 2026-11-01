import React from 'react';
import styles from './StatAnimations.module.css';

/* ═══════════════════════════════════════════════════════════════════
   MANA TOURS & TRAVELS — PRECISION EDITORIAL STAT EMBLEMS
   Emil Kowalski Design Engineering & Impeccable Taste Standard
   Zero AI Slop · Architectural Precision · Subtle Atmospheric Glow
   ═══════════════════════════════════════════════════════════════════ */

/* ── 1. TRANSPARENT TARIFF / RUPEE PRECISION EMBLEM ── */
export function ShimmeringRupeeCascade({ className }) {
  return (
    <div className={`${styles.emblemWrap} ${className || ''}`} aria-hidden="true">
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.emblemSvg}>
        {/* Background circle badge */}
        <circle cx="24" cy="24" r="22" fill="rgba(212, 175, 55, 0.08)" stroke="rgba(212, 175, 55, 0.3)" strokeWidth="1.2" />
        <circle cx="24" cy="24" r="18" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" strokeDasharray="2 3" />
        
        {/* Precision Rupee Symbol */}
        <path
          d="M17 15H31M17 20H28M17 15V23C19 23 25 23 25 18M21 23L31 33"
          stroke="#E5C07B"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Micro index dot */}
        <circle cx="34" cy="15" r="1.5" fill="#D4AF37" />
      </svg>
    </div>
  );
}

/* ── 2. INSTANT 2-MINUTE CHRONOMETER EMBLEM ── */
export function SweepingClockHand({ className }) {
  return (
    <div className={`${styles.emblemWrap} ${className || ''}`} aria-hidden="true">
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.emblemSvg}>
        {/* Chronometer bezel */}
        <circle cx="24" cy="24" r="22" fill="rgba(16, 185, 129, 0.08)" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="1.2" />
        
        {/* Radial tick marks */}
        <line x1="24" y1="6" x2="24" y2="9" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="24" y1="39" x2="24" y2="42" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="6" y1="24" x2="9" y2="24" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="39" y1="24" x2="42" y2="24" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.5" strokeLinecap="round" />

        {/* Dynamic Sweep Indicator (subtle, quiet precision) */}
        <circle cx="24" cy="24" r="15" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="24" y1="24" x2="24" y2="13" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
        <line x1="24" y1="24" x2="31" y2="24" stroke="#E5C07B" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="24" cy="24" r="2.5" fill="#FFFFFF" />
      </svg>
    </div>
  );
}

/* ── 3. ZERO-MARKUP TRANSPARENCY STAR EMBLEM ── */
export function HolographicGoldStar({ className }) {
  return (
    <div className={`${styles.emblemWrap} ${className || ''}`} aria-hidden="true">
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.emblemSvg}>
        {/* Outer badge */}
        <circle cx="24" cy="24" r="22" fill="rgba(212, 175, 55, 0.08)" stroke="rgba(212, 175, 55, 0.3)" strokeWidth="1.2" />
        
        {/* 4-Point Geometric Star */}
        <path
          d="M24 8L27.5 20.5L40 24L27.5 27.5L24 40L20.5 27.5L8 24L20.5 20.5L24 8Z"
          fill="rgba(229, 192, 123, 0.2)"
          stroke="#E5C07B"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="24" cy="24" r="2.5" fill="#FFF0D0" />
      </svg>
    </div>
  );
}

/* ── 4. 24/7 FLEET DISPATCH & HANDOVER EMBLEM ── */
export function AnimatedLuxuryFleet({ className }) {
  return (
    <div className={`${styles.emblemWrap} ${className || ''}`} aria-hidden="true">
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.emblemSvg}>
        {/* Outer badge */}
        <circle cx="24" cy="24" r="22" fill="rgba(56, 189, 248, 0.08)" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1.2" />
        
        {/* Minimalist Key / Car Pin Silhouette */}
        <path
          d="M14 26C14 23.5 16 20 20 19L22 15C22.6 13.8 24 13 25.5 13H28C29.5 13 30.8 13.8 31.5 15L33.5 19C37 20 39 23.5 39 26V30C39 31.5 37.8 32.5 36.5 32.5H35.5C34.5 32.5 33.5 31.5 33.5 30.5V29.5H19.5V30.5C19.5 31.5 18.5 32.5 17.5 32.5H16.5C15.2 32.5 14 31.5 14 30V26Z"
          fill="rgba(56, 189, 248, 0.15)"
          stroke="#38BDF8"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        {/* Headlights */}
        <circle cx="19" cy="25" r="1.8" fill="#FFF0D0" />
        <circle cx="34" cy="25" r="1.8" fill="#FFF0D0" />
        {/* 24/7 pulse indicator dot */}
        <circle cx="24" cy="22" r="1.5" fill="#38BDF8" />
      </svg>
    </div>
  );
}
