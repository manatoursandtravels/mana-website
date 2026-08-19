import React from 'react';
import styles from './ContactAnimations.module.css';

/* ═══════════════════════════════════════════════════════════════════
   1. 3D EXECUTIVE DIRECT LINE (PAVAN - MANAGING PARTNER)
   Glossy 3D Gold & Royal Sapphire Headset with live voice radio pulse
   ═══════════════════════════════════════════════════════════════════ */
export function Rotating3DHeadset({ className }) {
  return (
    <div className={`${styles.animWrap} ${className || ''}`}>
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.animSvg}>
        <defs>
          <linearGradient id="headsetGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF8E7" />
            <stop offset="35%" stopColor="#FFDF73" />
            <stop offset="70%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#8C6621" />
          </linearGradient>
          <linearGradient id="headsetBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="30%" stopColor="#1A6CD4" />
            <stop offset="80%" stopColor="#0B4EA2" />
            <stop offset="100%" stopColor="#073574" />
          </linearGradient>
          <radialGradient id="pavanHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1A6CD4" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#0B4EA2" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#0B4EA2" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Backlight Glow */}
        <circle cx="40" cy="40" r="36" fill="url(#pavanHalo)" />

        {/* Active Radio Wave Pulse */}
        <circle cx="40" cy="40" r="28" fill="none" stroke="#0B4EA2" strokeWidth="1.2" strokeDasharray="4 4" className={styles.pulseRing} />

        {/* 3D Headset Floating Body */}
        <g className={styles.floatingBody3D}>
          {/* Main Ergonomic Headband */}
          <path
            d="M20 44 C20 22 28 14 40 14 C52 14 60 22 60 44"
            stroke="url(#headsetGoldGrad)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Headband Chrome Highlight Strip */}
          <path
            d="M24 38 C24 24 30 17 40 17 C50 17 56 24 56 38"
            stroke="#FFFFFF"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* Left 3D Cushion Earpad */}
          <g transform="translate(13, 36)">
            <rect x="0" y="0" width="13" height="22" rx="6.5" fill="url(#headsetBlueGrad)" stroke="url(#headsetGoldGrad)" strokeWidth="1.5" />
            <rect x="3" y="4" width="7" height="14" rx="3.5" fill="#073574" opacity="0.9" />
            <circle cx="6.5" cy="11" r="2" fill="#38BDF8" opacity="0.7" />
          </g>

          {/* Right 3D Cushion Earpad */}
          <g transform="translate(54, 36)">
            <rect x="0" y="0" width="13" height="22" rx="6.5" fill="url(#headsetBlueGrad)" stroke="url(#headsetGoldGrad)" strokeWidth="1.5" />
            <rect x="3" y="4" width="7" height="14" rx="3.5" fill="#073574" opacity="0.9" />
            <circle cx="6.5" cy="11" r="2" fill="#38BDF8" opacity="0.7" />
          </g>

          {/* Microphone Boom Arm */}
          <path
            d="M60 48 C60 62 50 66 42 66"
            stroke="url(#headsetGoldGrad)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* Glowing Microphone Capsule */}
          <rect x="35" y="62" width="9" height="8" rx="4" fill="url(#headsetBlueGrad)" stroke="#FFFFFF" strokeWidth="1.2" />
          <circle cx="39.5" cy="66" r="2.2" fill="#38BDF8" className={styles.micBlink} />

          {/* Founder Star Badge on Top Center */}
          <g transform="translate(36, 8)">
            <circle cx="4" cy="4" r="5.5" fill="url(#headsetGoldGrad)" stroke="#FFFFFF" strokeWidth="1" />
            <text x="4" y="6.8" textAnchor="middle" fontSize="6.5" fontWeight="900" fill="#5A4010">★</text>
          </g>
        </g>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   2. 3D CENTRAL DISPATCH & BOOKING DESK (JYOTHI - BOOKINGS)
   Glossy 3D Gold Telephone Console with active ringing vibration & live beacon
   ═══════════════════════════════════════════════════════════════════ */
export function Glowing3DTelephoneDesk({ className }) {
  return (
    <div className={`${styles.animWrap} ${className || ''}`}>
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.animSvg}>
        <defs>
          <linearGradient id="phoneGold3D" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF8E7" />
            <stop offset="35%" stopColor="#FFDF73" />
            <stop offset="70%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#8C6621" />
          </linearGradient>
          <linearGradient id="deskStationBase" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#F6F3EB" />
            <stop offset="100%" stopColor="#DFD8C8" />
          </linearGradient>
          <radialGradient id="jyothiHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#B88E3E" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#B88E3E" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Halo Glow */}
        <circle cx="40" cy="40" r="36" fill="url(#jyothiHalo)" />

        {/* 3D Dispatch Console Base */}
        <g transform="translate(16, 32)">
          {/* Base Chassis */}
          <rect x="0" y="0" width="48" height="34" rx="8" fill="url(#deskStationBase)" stroke="url(#phoneGold3D)" strokeWidth="2" />
          {/* Keypad Matrix Grid */}
          <circle cx="12" cy="11" r="2.8" fill="#B88E3E" />
          <circle cx="24" cy="11" r="2.8" fill="#B88E3E" />
          <circle cx="36" cy="11" r="2.8" fill="#B88E3E" />
          <circle cx="12" cy="19" r="2.8" fill="#B88E3E" />
          <circle cx="24" cy="19" r="2.8" fill="#0B4EA2" />
          <circle cx="36" cy="19" r="2.8" fill="#B88E3E" />
          <circle cx="12" cy="27" r="2.4" fill="#94A3B8" />
          <circle cx="24" cy="27" r="2.4" fill="#10B981" />
          <circle cx="36" cy="27" r="2.4" fill="#94A3B8" />
        </g>

        {/* 3D Floating Gold Handset with Active Ringing Vibration */}
        <g className={styles.handsetRinging}>
          <path
            d="M15 24 C15 18 20 15 26 18 L31 20 C33 21 34 25 31 27 L28 29 C31 35 36 40 42 43 L44 40 C46 37 50 38 51 40 L54 45 C56 50 53 56 47 56 C31 56 15 40 15 24 Z"
            fill="url(#phoneGold3D)"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            style={{ filter: 'drop-shadow(0 6px 12px rgba(184, 142, 62, 0.45))' }}
          />
          {/* Specular Gloss Arc on Handset */}
          <path d="M20 23 C20 20 23 18 26 20" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Ringing Sound Wave Sparkles */}
        <g className={styles.sparkleCluster}>
          <circle cx="14" cy="15" r="2.2" fill="#FFDF73" />
          <circle cx="58" cy="26" r="2.2" fill="#FFDF73" />
          <path d="M54 16 L56 20 L60 21 L56 22 L54 26 L52 22 L48 21 L52 20 Z" fill="#D4AF37" opacity="0.8" />
        </g>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   3. 3D INSTANT WHATSAPP CONCIERGE (24/7 LIVE CHAT)
   High-gloss 3D emerald sphere with floating chat bubble & continuous radiating pulse
   ═══════════════════════════════════════════════════════════════════ */
export function Pulsing3DWhatsAppBadge({ className }) {
  return (
    <div className={`${styles.animWrap} ${className || ''}`}>
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.animSvg}>
        <defs>
          <linearGradient id="waSphere3D" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ADE80" />
            <stop offset="30%" stopColor="#25D366" />
            <stop offset="75%" stopColor="#16A34A" />
            <stop offset="100%" stopColor="#065F46" />
          </linearGradient>
          <radialGradient id="waHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#25D366" stopOpacity="0.3" />
            <stop offset="60%" stopColor="#16A34A" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#16A34A" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Radiating 24/7 Pulse Waves */}
        <circle cx="40" cy="40" r="36" fill="url(#waHalo)" />
        <circle cx="40" cy="40" r="28" fill="none" stroke="#25D366" strokeWidth="1.5" className={styles.pulseRing} />

        {/* 3D Levitating WhatsApp Bubble Body */}
        <g className={styles.floatingBody3D}>
          {/* Main 3D Glossy Sphere */}
          <circle cx="40" cy="40" r="25" fill="url(#waSphere3D)" stroke="#FFFFFF" strokeWidth="2.5" style={{ filter: 'drop-shadow(0 8px 18px rgba(37, 211, 102, 0.45))' }} />

          {/* Speech Bubble Tail */}
          <path d="M27 48 L22 58 L32 54 Z" fill="#16A34A" />

          {/* 3D Phone Handset Glyph */}
          <path
            d="M48.2 44.8c-.4-.2-2.2-1.1-2.5-1.1-.4-.1-.6-.1-.9.3-.3.4-1 1.2-1.2 1.4-.2.3-.4.3-.8.1-.4-.2-1.6-.6-3-1.8-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8.2-.2.4-.4.6-.6.2-.2.3-.4.4-.6.1-.3 0-.5-.1-.7-.1-.2-.9-2.1-1.2-2.9-.3-.8-.6-.7-.9-.7h-.8c-.3 0-.7.1-1 .5-.4.4-1.3 1.3-1.3 3.1s1.4 3.6 1.6 3.8c.2.3 2.6 4 6.3 5.6.9.4 1.6.6 2.1.8.9.3 1.7.2 2.4.1.7-.1 2.2-.9 2.5-1.7.3-.9.3-1.6.2-1.7 0-.3-.3-.4-.6-.6z"
            fill="#FFFFFF"
          />

          {/* Shimmering Specular Glint */}
          <g className={styles.specularShine}>
            <ellipse cx="30" cy="26" rx="6" ry="3.2" fill="#FFFFFF" opacity="0.85" transform="rotate(-30 30 26)" />
          </g>

          {/* Quick Response Lightning Pill */}
          <g transform="translate(48, 16)">
            <circle cx="8" cy="8" r="7.5" fill="#FFDF73" stroke="#FFFFFF" strokeWidth="1.2" />
            <text x="8" y="11" textAnchor="middle" fontSize="8" fontWeight="900" fill="#5A4010">⚡</text>
          </g>
        </g>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   4. 3D CORPORATE & TOUR DESK (OFFICIAL CORRESPONDENCE)
   Glossy 3D Gold & Sapphire Envelope with rising letter & wax emblem seal
   ═══════════════════════════════════════════════════════════════════ */
export function Shimmering3DEnvelope({ className }) {
  return (
    <div className={`${styles.animWrap} ${className || ''}`}>
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.animSvg}>
        <defs>
          <linearGradient id="envBody3D" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#F6F3EB" />
            <stop offset="100%" stopColor="#D9D2C3" />
          </linearGradient>
          <linearGradient id="envFlapBlue3D" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="35%" stopColor="#1A6CD4" />
            <stop offset="80%" stopColor="#0B4EA2" />
            <stop offset="100%" stopColor="#073574" />
          </linearGradient>
          <linearGradient id="envWaxGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF8E7" />
            <stop offset="45%" stopColor="#FFDF73" />
            <stop offset="85%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#8C6621" />
          </linearGradient>
          <radialGradient id="emailHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0B4EA2" stopOpacity="0.2" />
            <stop offset="60%" stopColor="#0B4EA2" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#0B4EA2" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Halo Glow */}
        <circle cx="40" cy="40" r="36" fill="url(#emailHalo)" />

        {/* 3D Floating Envelope Assembly */}
        <g className={styles.floatingBody3D}>
          {/* Rising Letter Peek from Behind Flap */}
          <g className={styles.letterRising}>
            <rect x="22" y="18" width="36" height="24" rx="3" fill="#FFFFFF" stroke="#0B4EA2" strokeWidth="1.2" />
            <line x1="28" y1="24" x2="42" y2="24" stroke="#0B4EA2" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="28" y1="29" x2="52" y2="29" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="28" y1="34" x2="46" y2="34" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />
          </g>

          {/* Main Envelope Pocket Chassis */}
          <path
            d="M14 30 L40 48 L66 30 V56 C66 58.5 64 60.5 61.5 60.5 H18.5 C16 60.5 14 58.5 14 56 V30 Z"
            fill="url(#envBody3D)"
            stroke="url(#envFlapBlue3D)"
            strokeWidth="1.8"
            style={{ filter: 'drop-shadow(0 6px 14px rgba(11, 78, 162, 0.28))' }}
          />

          {/* Lower Pocket Creases */}
          <path d="M14 58 L34 43" stroke="#CBD5E1" strokeWidth="1.4" />
          <path d="M66 58 L46 43" stroke="#CBD5E1" strokeWidth="1.4" />

          {/* 3D Metallic Flap (Top Fold) */}
          <path
            d="M14 30 L40 48 L66 30 C66 27 63.5 24.5 60.5 24.5 H19.5 C16.5 24.5 14 27 14 30 Z"
            fill="url(#envFlapBlue3D)"
            stroke="#FFFFFF"
            strokeWidth="1.4"
          />

          {/* 3D Gold Wax Emblem Seal */}
          <g transform="translate(40, 47)">
            <circle cx="0" cy="0" r="7" fill="url(#envWaxGold)" stroke="#FFFFFF" strokeWidth="1.2" />
            <circle cx="0" cy="0" r="4.2" fill="#5A4010" />
            <text x="0" y="3" textAnchor="middle" fontSize="6" fontWeight="900" fill="#FFF8E7">M</text>
          </g>
        </g>
      </svg>
    </div>
  );
}
