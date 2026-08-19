import React from 'react';

/* ═══════════════════════════════════════════════════════════════════
   MANA Bespoke Vector Illustrations & Glossy 3D Vector Iconography
   Brushed Brass (#B88E3E, #DDB86C) · Pearl & Charcoal · Brand Red
   ═══════════════════════════════════════════════════════════════════ */

// 1. Local Cabs — 3D City Route & Sedan Vector
export function LocalCabIllustration({ className, size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="brassGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5E4C0" />
          <stop offset="50%" stopColor="#C89E4E" />
          <stop offset="100%" stopColor="#9A7426" />
        </linearGradient>
        <linearGradient id="glossPearl1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#EDE9DF" />
        </linearGradient>
        <linearGradient id="redGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1A6CD4" />
          <stop offset="100%" stopColor="#0B4EA2" />
        </linearGradient>
        <filter id="glow3D1" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#B88E3E" floodOpacity="0.25" />
        </filter>
      </defs>
      <rect x="6" y="6" width="68" height="68" rx="20" fill="url(#glossPearl1)" stroke="url(#brassGrad1)" strokeWidth="1.5" filter="url(#glow3D1)" />
      <circle cx="40" cy="40" r="26" fill="rgba(184, 142, 62, 0.08)" />
      <rect x="22" y="32" width="6" height="18" rx="1.5" fill="#C89E4E" opacity="0.4" />
      <rect x="30" y="24" width="8" height="26" rx="1.5" fill="#C89E4E" opacity="0.6" />
      <rect x="40" y="28" width="7" height="22" rx="1.5" fill="#C89E4E" opacity="0.5" />
      <rect x="49" y="34" width="8" height="16" rx="1.5" fill="#C89E4E" opacity="0.4" />
      <path d="M22 52L26 44C27 42 29 41 32 41H48C51 41 53 42 54 44L58 52C60 52 61 53.5 61 55.5V58C61 59 60 60 59 60H57C57 58 55.5 56.5 53.5 56.5C51.5 56.5 50 58 50 60H30C30 58 28.5 56.5 26.5 56.5C24.5 56.5 23 58 23 60H21C20 60 19 59 19 58V55.5C19 53.5 20 52 22 52Z" fill="url(#redGrad1)" />
      <path d="M28 44.5L30 49H50L52 44.5C51.5 43.5 50 43 48.5 43H31.5C30 43 28.5 43.5 28 44.5Z" fill="#FFFFFF" opacity="0.9" />
      <circle cx="26.5" cy="59" r="3.5" fill="#0E131F" stroke="url(#brassGrad1)" strokeWidth="1.5" />
      <circle cx="53.5" cy="59" r="3.5" fill="#0E131F" stroke="url(#brassGrad1)" strokeWidth="1.5" />
      <path d="M12 18C20 10 60 10 68 18" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}

// 2. Outstation Cabs — Highway Vector & Navigation Milestone
export function OutstationIllustration({ className, size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="brassGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5E4C0" />
          <stop offset="50%" stopColor="#C89E4E" />
          <stop offset="100%" stopColor="#9A7426" />
        </linearGradient>
        <linearGradient id="glossPearl2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#EDE9DF" />
        </linearGradient>
        <filter id="glow3D2" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#B88E3E" floodOpacity="0.25" />
        </filter>
      </defs>
      <rect x="6" y="6" width="68" height="68" rx="20" fill="url(#glossPearl2)" stroke="url(#brassGrad2)" strokeWidth="1.5" filter="url(#glow3D2)" />
      <path d="M28 62L36 24H44L52 62H46L41 32H39L34 62H28Z" fill="#1A202C" />
      <path d="M40 28V36M40 42V50M40 54V60" stroke="#F5E4C0" strokeWidth="2" strokeDasharray="3 3" strokeLinecap="round" />
      <g transform="translate(48, 16)">
        <circle cx="10" cy="10" r="10" fill="#0B4EA2" />
        <circle cx="10" cy="10" r="4.5" fill="#FFFFFF" />
        <path d="M10 20L7 16H13L10 20Z" fill="#0B4EA2" />
      </g>
      <path d="M18 42H26M14 48H22M56 46H66M54 52H62" stroke="#B88E3E" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M12 18C20 10 60 10 68 18" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}

// 3. Airport Transfers — Modern Jetway & On-Time Vector
export function AirportIllustration({ className, size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="brassGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5E4C0" />
          <stop offset="50%" stopColor="#C89E4E" />
          <stop offset="100%" stopColor="#9A7426" />
        </linearGradient>
        <linearGradient id="blueJetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#0D2B6B" />
        </linearGradient>
        <filter id="glow3D3" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#B88E3E" floodOpacity="0.25" />
        </filter>
      </defs>
      <rect x="6" y="6" width="68" height="68" rx="20" fill="#FFFFFF" stroke="url(#brassGrad3)" strokeWidth="1.5" filter="url(#glow3D3)" />
      <circle cx="40" cy="40" r="24" stroke="rgba(184, 142, 62, 0.2)" strokeWidth="1.5" strokeDasharray="4 4" />
      <path d="M42 22L47 34L61 36L48 44L52 58L40 49L28 58L32 44L19 36L33 34L38 22H42Z" fill="url(#blueJetGrad)" />
      <path d="M37 54C34 57 26 62 20 64" stroke="#FF9933" strokeWidth="2" strokeLinecap="round" />
      <path d="M43 54C46 57 54 62 60 64" stroke="#138808" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 18C20 10 60 10 68 18" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
    </svg>
  );
}

// 4. Pilgrimage Tours — Sacred Gopuram / Temple Dome Vector
export function PilgrimageIllustration({ className, size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="goldDomeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2D6" />
          <stop offset="40%" stopColor="#E5B25D" />
          <stop offset="100%" stopColor="#B37E22" />
        </linearGradient>
        <filter id="glow3D4" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#B88E3E" floodOpacity="0.25" />
        </filter>
      </defs>
      <rect x="6" y="6" width="68" height="68" rx="20" fill="#FFFFFF" stroke="url(#goldDomeGrad)" strokeWidth="1.5" filter="url(#glow3D4)" />
      <path d="M40 16V22M38 22H42" stroke="#B88E3E" strokeWidth="2" strokeLinecap="round" />
      <path d="M36 22H44L46 28H34L36 22Z" fill="url(#goldDomeGrad)" />
      <path d="M32 29H48L51 37H29L32 29Z" fill="url(#goldDomeGrad)" />
      <path d="M27 38H53L56 48H24L27 38Z" fill="url(#goldDomeGrad)" />
      <path d="M22 49H58L62 62H18L22 49Z" fill="url(#goldDomeGrad)" />
      <path d="M35 62V53C35 50.5 37 49 40 49C43 49 45 50.5 45 53V62H35Z" fill="#0E131F" />
      <circle cx="40" cy="54" r="1.5" fill="#F5E4C0" />
      <path d="M20 28L14 26M60 28L66 26M20 40L12 40M60 40L68 40" stroke="#E5B25D" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

// 5. Tour Packages — Gandikota Canyon & Adventure Vector
export function TourPackageIllustration({ className, size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="brassGrad5" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5E4C0" />
          <stop offset="50%" stopColor="#C89E4E" />
          <stop offset="100%" stopColor="#9A7426" />
        </linearGradient>
        <filter id="glow3D5" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#B88E3E" floodOpacity="0.25" />
        </filter>
      </defs>
      <rect x="6" y="6" width="68" height="68" rx="20" fill="#FFFFFF" stroke="url(#brassGrad5)" strokeWidth="1.5" filter="url(#glow3D5)" />
      <circle cx="40" cy="28" r="10" fill="#FFA500" opacity="0.3" />
      <circle cx="40" cy="28" r="6" fill="#FFA500" />
      <path d="M16 62L32 36L44 50L54 38L64 62H16Z" fill="url(#brassGrad5)" />
      <path d="M32 36L38 46L32 62H24L16 62L32 36Z" fill="#9A7426" opacity="0.7" />
      <path d="M54 38L58 48L52 62H46L44 50L54 38Z" fill="#9A7426" opacity="0.5" />
      <path d="M34 62C36 56 42 54 44 62" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

// 6. Corporate Travel — Executive Fleet & Business Briefcase Vector
export function CorporateIllustration({ className, size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="brassGrad6" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5E4C0" />
          <stop offset="50%" stopColor="#C89E4E" />
          <stop offset="100%" stopColor="#9A7426" />
        </linearGradient>
        <filter id="glow3D6" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#B88E3E" floodOpacity="0.25" />
        </filter>
      </defs>
      <rect x="6" y="6" width="68" height="68" rx="20" fill="#FFFFFF" stroke="url(#brassGrad6)" strokeWidth="1.5" filter="url(#glow3D6)" />
      <rect x="22" y="24" width="16" height="36" rx="2" fill="#1A202C" />
      <rect x="42" y="32" width="16" height="28" rx="2" fill="#2D3748" />
      <rect x="26" y="28" width="3" height="3" fill="#C89E4E" />
      <rect x="31" y="28" width="3" height="3" fill="#C89E4E" />
      <rect x="26" y="34" width="3" height="3" fill="#C89E4E" />
      <rect x="31" y="34" width="3" height="3" fill="#C89E4E" />
      <rect x="26" y="40" width="3" height="3" fill="#C89E4E" />
      <rect x="31" y="40" width="3" height="3" fill="#C89E4E" />
      <rect x="46" y="36" width="3" height="3" fill="#F5E4C0" />
      <rect x="51" y="36" width="3" height="3" fill="#F5E4C0" />
      <rect x="46" y="42" width="3" height="3" fill="#F5E4C0" />
      <rect x="51" y="42" width="3" height="3" fill="#F5E4C0" />
      <g transform="translate(30, 44)">
        <rect x="0" y="4" width="20" height="14" rx="2.5" fill="#0B4EA2" stroke="#FFFFFF" strokeWidth="1" />
        <path d="M6 4V2C6 1.5 6.5 1 7 1H13C13.5 1 14 1.5 14 2V4" stroke="#FFFFFF" strokeWidth="1.5" />
        <circle cx="10" cy="11" r="1.5" fill="#C89E4E" />
      </g>
    </svg>
  );
}

// 7. Local Sightseeing — Kadapa Exploration Compass Vector
export function SightseeingIllustration({ className, size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="brassGrad7" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5E4C0" />
          <stop offset="50%" stopColor="#C89E4E" />
          <stop offset="100%" stopColor="#9A7426" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="68" height="68" rx="20" fill="#FFFFFF" stroke="url(#brassGrad7)" strokeWidth="1.5" />
      <path d="M22 28L34 24L46 28L58 24V54L46 58L34 54L22 58V28Z" fill="#F6F0E4" stroke="#C89E4E" strokeWidth="1.5" strokeLinejoin="round" />
      <g transform="translate(40, 40)">
        <circle cx="0" cy="0" r="12" fill="#FFFFFF" stroke="#1A202C" strokeWidth="1.5" />
        <polygon points="0,-9 3,0 -3,0" fill="#0B4EA2" />
        <polygon points="0,9 3,0 -3,0" fill="#1A202C" />
        <circle cx="0" cy="0" r="2" fill="#C89E4E" />
      </g>
    </svg>
  );
}

// 8. Wedding & Events — Royal Procession Ribbon Vector
export function WeddingIllustration({ className, size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="brassGrad8" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5E4C0" />
          <stop offset="50%" stopColor="#C89E4E" />
          <stop offset="100%" stopColor="#9A7426" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="68" height="68" rx="20" fill="#FFFFFF" stroke="url(#brassGrad8)" strokeWidth="1.5" />
      <circle cx="34" cy="38" r="12" stroke="url(#brassGrad8)" strokeWidth="3" />
      <circle cx="46" cy="38" r="12" stroke="#0B4EA2" strokeWidth="3" />
      <polygon points="34,22 37,26 34,30 31,26" fill="#F5E4C0" stroke="#B88E3E" strokeWidth="0.8" />
      <path d="M20 58C24 48 56 48 60 58" stroke="url(#brassGrad8)" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
    </svg>
  );
}

// 9. Self Drive — Key & Freedom Vector
export function SelfDriveIllustration({ className, size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="brassGrad9" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5E4C0" />
          <stop offset="50%" stopColor="#C89E4E" />
          <stop offset="100%" stopColor="#9A7426" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="68" height="68" rx="20" fill="#FFFFFF" stroke="url(#brassGrad9)" strokeWidth="1.5" />
      <g transform="translate(40, 40) rotate(-45)">
        <rect x="-8" y="-18" width="16" height="24" rx="8" fill="#1A202C" stroke="url(#brassGrad9)" strokeWidth="1.5" />
        <circle cx="0" cy="-10" r="3" fill="#0B4EA2" />
        <path d="M-2 6V18H2V14H6V11H2V6H-2Z" fill="url(#brassGrad9)" />
      </g>
      <path d="M22 40C22 50 30 58 40 58C50 58 58 50 58 40" stroke="url(#brassGrad9)" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 3" />
    </svg>
  );
}

// ─── 6 Bespoke 3D Infographics for Why Choose MANA ───

// A. 3D Shield Vector — Safety First
export function SafetyInfographic({ size = 52 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F6F0E4" />
          <stop offset="100%" stopColor="#FFFFFF" />
        </linearGradient>
        <linearGradient id="brassLine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DDB86C" />
          <stop offset="100%" stopColor="#9A7426" />
        </linearGradient>
      </defs>
      <path d="M32 8L50 16V32C50 44 42 52 32 56C22 52 14 44 14 32V16L32 8Z" fill="url(#shieldGrad)" stroke="url(#brassLine)" strokeWidth="2" />
      <path d="M32 14L44 20V32C44 40 38 46 32 49C26 46 20 40 20 32V20L32 14Z" fill="#0B4EA2" />
      <path d="M26 31L30 35L38 27" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// B. 3D Clock Chronometer — On-Time Guarantee
export function OnTimeInfographic({ size = 52 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="34" r="22" fill="#FFFFFF" stroke="#B88E3E" strokeWidth="2" />
      <circle cx="32" cy="34" r="17" fill="#F6F0E4" />
      <path d="M32 23V34L40 38" stroke="#0B4EA2" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="29" y="7" width="6" height="5" rx="1.5" fill="#B88E3E" />
      <path d="M46 16L50 20" stroke="#B88E3E" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 16L14 20" stroke="#B88E3E" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// C. 3D Transparent Ledger / Pricing
export function PricingInfographic({ size = 52 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="12" width="36" height="42" rx="4" fill="#FFFFFF" stroke="#B88E3E" strokeWidth="2" />
      <line x1="22" y1="22" x2="42" y2="22" stroke="#0B4EA2" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="22" y1="30" x2="38" y2="30" stroke="#1A202C" strokeWidth="2" strokeLinecap="round" />
      <line x1="22" y1="38" x2="34" y2="38" stroke="#1A202C" strokeWidth="2" strokeLinecap="round" />
      <circle cx="40" cy="42" r="7" fill="#B88E3E" />
      <path d="M38 42L40 44L43 40" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// D. 3D Owner Handshake / Direct Commitment
export function OwnerInfographic({ size = 52 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="24" fill="#F6F0E4" stroke="#B88E3E" strokeWidth="2" />
      <circle cx="32" cy="24" r="7" fill="#0B4EA2" />
      <path d="M18 46C18 38 24 36 32 36C40 36 46 38 46 46" fill="#1A202C" />
      <path d="M26 44L32 40L38 44" stroke="#DDB86C" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// E. 3D Kadapa Regional Landmark / Compass Pin
export function LocalExpertiseInfographic({ size = 52 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="24" fill="#FFFFFF" stroke="#B88E3E" strokeWidth="2" />
      <path d="M32 14C24 14 18 20 18 27C18 38 32 50 32 50C32 50 46 38 46 27C46 20 40 14 32 14Z" fill="#0B4EA2" />
      <circle cx="32" cy="26" r="5" fill="#FFFFFF" />
      <circle cx="32" cy="26" r="2" fill="#B88E3E" />
    </svg>
  );
}

// F. 3D WhatsApp Instant Connect
export function WhatsAppInfographic({ size = 52 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="24" fill="#FFFFFF" stroke="#25D366" strokeWidth="2" />
      <circle cx="32" cy="32" r="18" fill="#25D366" />
      <path d="M37.5 34.5C37.2 34.3 35.8 33.6 35.5 33.5C35.2 33.4 35 33.4 34.8 33.7C34.6 34 34 34.7 33.8 34.9C33.6 35.1 33.4 35.1 33.1 35C32.8 34.8 31.9 34.5 30.8 33.5C29.9 32.7 29.3 31.7 29.1 31.4C28.9 31.1 29.1 31 29.2 30.8C29.3 30.7 29.5 30.5 29.6 30.3C29.7 30.1 29.8 30 29.9 29.8C30 29.6 30 29.4 29.9 29.3C29.8 29.1 29.2 27.7 29 27.1C28.8 26.5 28.5 26.6 28.3 26.6H27.8C27.6 26.6 27.3 26.7 27 27C26.7 27.3 26 28 26 29.5C26 31 27.1 32.4 27.2 32.6C27.3 32.8 29.3 35.8 32.3 37.1C33 37.4 33.6 37.6 34 37.7C34.7 38 35.4 37.9 35.9 37.8C36.5 37.7 37.7 37.1 37.9 36.4C38.1 35.7 38.1 35.1 38.1 35C38 34.8 37.8 34.7 37.5 34.5Z" fill="#FFFFFF" />
    </svg>
  );
}

// G. Ambient Hero Vector Waves
export function HeroAmbientWaves() {
  return (
    <svg viewBox="0 0 1440 280" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', position: 'absolute', bottom: 0, left: 0, pointerEvents: 'none', zIndex: 2 }}>
      <path d="M0,160L60,154.7C120,149,240,139,360,149.3C480,160,600,192,720,186.7C840,181,960,139,1080,133.3C1200,128,1320,160,1380,176L1440,192L1440,280L1380,280C1320,280,1200,280,1080,280C960,280,840,280,720,280C600,280,480,280,360,280C240,280,120,280,60,280L0,280Z" fill="rgba(250, 249, 245, 0.9)" />
      <path d="M0,96L80,117.3C160,139,320,181,480,186.7C640,192,800,160,960,133.3C1120,107,1280,85,1360,74.7L1440,64L1440,280L1360,280C1280,280,1120,280,960,280C800,280,640,280,480,280C320,280,160,280,80,280L0,280Z" fill="rgba(255, 255, 255, 0.6)" />
    </svg>
  );
}

// ─── BESPOKE CONTACT & PARTNER ILLUSTRATIONS ───

// H. Customer Care Support Vector
export function CustomerCareIllustration({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="26" fill="#FFFFFF" stroke="#B88E3E" strokeWidth="2" />
      <circle cx="32" cy="24" r="9" fill="#0B4EA2" />
      <path d="M16 48C16 38 24 37 32 37C40 37 48 38 48 48" fill="#1A202C" />
      <path d="M20 22C20 15 25 11 32 11C39 11 44 15 44 22V28" stroke="#B88E3E" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="42" y="22" width="4" height="8" rx="2" fill="#B88E3E" />
      <rect x="18" y="22" width="4" height="8" rx="2" fill="#B88E3E" />
      <path d="M44 28V32H38" stroke="#B88E3E" strokeWidth="2" strokeLinecap="round" />
      <circle cx="38" cy="32" r="2" fill="#0B4EA2" />
    </svg>
  );
}

// I. 24/7 Fast Response Stopwatch Vector
export function FastResponseIllustration({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="34" r="22" fill="#FFFFFF" stroke="#B88E3E" strokeWidth="2" />
      <circle cx="32" cy="34" r="17" fill="#F6F0E4" />
      <path d="M32 23V34L40 34" stroke="#0B4EA2" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M28 8H36V12H28V8Z" fill="#B88E3E" />
      <path d="M46 16L50 20" stroke="#B88E3E" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 16L14 20" stroke="#B88E3E" strokeWidth="2" strokeLinecap="round" />
      <polygon points="34,22 28,34 32,34 30,42 38,30 34,30" fill="#FF9900" />
    </svg>
  );
}

// J. Location & Kadapa Hub Beacon Vector
export function LocationBeaconIllustration({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="26" fill="#FFFFFF" stroke="#B88E3E" strokeWidth="2" />
      <circle cx="32" cy="48" r="10" fill="rgba(184, 142, 62, 0.15)" />
      <path d="M32 14C24 14 18 20 18 27C18 37 32 48 32 48C32 48 46 37 46 27C46 20 40 14 32 14Z" fill="#0B4EA2" />
      <circle cx="32" cy="26" r="6" fill="#FFFFFF" />
      <circle cx="32" cy="26" r="2.5" fill="#B88E3E" />
    </svg>
  );
}

// K. Fleet Partner & Car Attachment Vector
export function FleetPartnerIllustration({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="26" fill="#FFFFFF" stroke="#B88E3E" strokeWidth="2" />
      <path d="M16 38L22 28H42L48 38V44H16V38Z" fill="#1A202C" />
      <path d="M24 30L21 36H43L40 30H24Z" fill="#FFFFFF" opacity="0.9" />
      <circle cx="23" cy="44" r="4" fill="#0B4EA2" stroke="#FFFFFF" strokeWidth="1.5" />
      <circle cx="41" cy="44" r="4" fill="#0B4EA2" stroke="#FFFFFF" strokeWidth="1.5" />
      <circle cx="48" cy="18" r="10" fill="#B88E3E" />
      <path d="M45 18L47 20L52 15" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// L. Guaranteed Earnings & Payouts Vector
export function EarningsGrowthIllustration({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="26" fill="#FFFFFF" stroke="#B88E3E" strokeWidth="2" />
      <rect x="16" y="38" width="6" height="14" rx="2" fill="#B88E3E" opacity="0.5" />
      <rect x="25" y="30" width="6" height="22" rx="2" fill="#B88E3E" opacity="0.7" />
      <rect x="34" y="24" width="6" height="28" rx="2" fill="#B88E3E" />
      <rect x="43" y="16" width="6" height="36" rx="2" fill="#0B4EA2" />
      <path d="M16 32L26 24L35 18L46 10" stroke="#1A202C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <polygon points="46,10 40,11 44,16" fill="#1A202C" />
    </svg>
  );
}

// M. Written Legal Agreement Vector
export function ContractLegalIllustration({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="16" y="10" width="32" height="44" rx="4" fill="#FFFFFF" stroke="#B88E3E" strokeWidth="2" />
      <line x1="22" y1="18" x2="38" y2="18" stroke="#0B4EA2" strokeWidth="2" strokeLinecap="round" />
      <line x1="22" y1="24" x2="42" y2="24" stroke="#1A202C" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="22" y1="30" x2="36" y2="30" stroke="#1A202C" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="22" y1="36" x2="40" y2="36" stroke="#1A202C" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="38" cy="42" r="6" fill="#B88E3E" />
      <path d="M36 42L37.5 43.5L40 40.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
