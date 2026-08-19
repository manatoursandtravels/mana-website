import React from 'react';
import styles from './StatAnimations.module.css';

/* ═══════════════════════════════════════════════════════════════════
   1. GENTLY ROTATING HOLOGRAPHIC GOLD STAR
   Multi-faceted 3D gold star with holographic sheen & light glints
   ═══════════════════════════════════════════════════════════════════ */
export function HolographicGoldStar({ className }) {
  return (
    <div className={`${styles.starWrap} ${className || ''}`}>
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.starSvg}>
        <defs>
          <linearGradient id="holoGoldLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF4D0" />
            <stop offset="40%" stopColor="#FFDF73" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>
          <linearGradient id="holoGoldMid" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#B88E3E" />
            <stop offset="100%" stopColor="#8C6621" />
          </linearGradient>
          <linearGradient id="holoGoldDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A07828" />
            <stop offset="100%" stopColor="#5A4010" />
          </linearGradient>
          <radialGradient id="holoCenterGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF9E6" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#FFDF73" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer ambient glow */}
        <circle cx="32" cy="32" r="28" fill="url(#holoCenterGlow)" />

        {/* 3D Star Facets (Center at 32, 32) */}
        {/* Top Tip */}
        <path d="M32 6 L38 24 L32 32 Z" fill="url(#holoGoldLight)" />
        <path d="M32 6 L32 32 L26 24 Z" fill="url(#holoGoldMid)" />

        {/* Right Top Tip */}
        <path d="M58 24 L42 34 L32 32 Z" fill="url(#holoGoldLight)" />
        <path d="M58 24 L32 32 L38 24 Z" fill="url(#holoGoldMid)" />

        {/* Right Bottom Tip */}
        <path d="M48 54 L32 42 L32 32 Z" fill="url(#holoGoldDark)" />
        <path d="M48 54 L32 32 L42 34 Z" fill="url(#holoGoldMid)" />

        {/* Left Bottom Tip */}
        <path d="M16 54 L22 34 L32 32 Z" fill="url(#holoGoldMid)" />
        <path d="M16 54 L32 32 L32 42 Z" fill="url(#holoGoldDark)" />

        {/* Left Top Tip */}
        <path d="M6 24 L26 24 L32 32 Z" fill="url(#holoGoldLight)" />
        <path d="M6 24 L32 32 L22 34 Z" fill="url(#holoGoldMid)" />

        {/* Central 3D Emboss Diamond */}
        <polygon points="32,24 38,32 32,40 26,32" fill="url(#holoGoldLight)" opacity="0.85" />

        {/* Holographic Sparkle Glints */}
        <g className={styles.starGlint} style={{ transformOrigin: '32px 32px' }}>
          <path d="M32 14 L34 26 L46 28 L34 30 L32 42 L30 30 L18 28 L30 26 Z" fill="#FFFFFF" opacity="0.9" />
          <circle cx="32" cy="28" r="2.5" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   2. SMOOTHLY SWEEPING CHRONOMETER CLOCK HAND
   Precision 24/7 chronometer with continuous sweeping second/minute hands
   ═══════════════════════════════════════════════════════════════════ */
export function SweepingClockHand({ className }) {
  return (
    <div className={`${styles.clockWrap} ${className || ''}`}>
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.clockSvg}>
        <defs>
          <linearGradient id="bezelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#D9E2EC" />
            <stop offset="70%" stopColor="#0B4EA2" />
            <stop offset="100%" stopColor="#073574" />
          </linearGradient>
          <linearGradient id="dialGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>
          <linearGradient id="brassHand" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFDF73" />
            <stop offset="100%" stopColor="#B88E3E" />
          </linearGradient>
        </defs>

        {/* Outer Chronometer Bezel */}
        <circle cx="32" cy="32" r="28" fill="url(#dialGrad)" stroke="url(#bezelGrad)" strokeWidth="2.5" />

        {/* 24/7 Active Radar Pulse */}
        <circle cx="32" cy="32" r="16" fill="rgba(11, 78, 162, 0.12)" stroke="#0B4EA2" strokeWidth="1" strokeDasharray="3 3" className={styles.radarPulse} />

        {/* Dial Hour Tick Marks (12, 3, 6, 9) */}
        <rect x="30.5" y="8" width="3" height="6" rx="1" fill="#0B4EA2" />
        <rect x="50" y="30.5" width="6" height="3" rx="1" fill="#0B4EA2" />
        <rect x="30.5" y="50" width="3" height="6" rx="1" fill="#0B4EA2" />
        <rect x="8" y="30.5" width="6" height="3" rx="1" fill="#0B4EA2" />

        {/* Minor Dial Dots */}
        <circle cx="45" cy="19" r="1.5" fill="#94A3B8" />
        <circle cx="45" cy="45" r="1.5" fill="#94A3B8" />
        <circle cx="19" cy="45" r="1.5" fill="#94A3B8" />
        <circle cx="19" cy="19" r="1.5" fill="#94A3B8" />

        {/* "24/7" Inscription Badge */}
        <text x="32" y="24" textAnchor="middle" fontSize="6.5" fontWeight="900" fontFamily="sans-serif" fill="#0B4EA2" letterSpacing="0.05em">
          24/7
        </text>

        {/* Minute Hand (Sweeps smoothly) */}
        <g className={styles.minuteHand}>
          <line x1="32" y1="32" x2="32" y2="16" stroke="#0E1A2B" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Sweeping Second Hand (Continuous linear rotation with counter-balance) */}
        <g className={styles.secondHand}>
          <line x1="32" y1="39" x2="32" y2="11" stroke="url(#brassHand)" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="32" cy="14" r="2.2" fill="#D4AF37" />
          <circle cx="32" cy="37" r="1.8" fill="#B88E3E" />
        </g>

        {/* Center Jewel Hub */}
        <circle cx="32" cy="32" r="3.8" fill="#0B4EA2" stroke="#FFFFFF" strokeWidth="1.2" />
        <circle cx="32" cy="32" r="1.5" fill="#FFDF73" />
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   3. SHIMMERING CASCADE OF RUPEE COINS
   3D gold Rupee coins with cascading floating particles and zero-fee clarity
   ═══════════════════════════════════════════════════════════════════ */
export function ShimmeringRupeeCascade({ className }) {
  return (
    <div className={`${styles.rupeeWrap} ${className || ''}`}>
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.rupeeSvg}>
        <defs>
          <linearGradient id="coinGradGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF4D0" />
            <stop offset="35%" stopColor="#FFDF73" />
            <stop offset="70%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#8C6621" />
          </linearGradient>
          <linearGradient id="coinGradRim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE082" />
            <stop offset="100%" stopColor="#5A4010" />
          </linearGradient>
          <linearGradient id="shieldBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A6CD4" />
            <stop offset="100%" stopColor="#0B4EA2" />
          </linearGradient>
        </defs>

        {/* Cascading Mini Coin Particles */}
        <g className={styles.coinParticle1}>
          <circle cx="48" cy="22" r="6" fill="url(#coinGradGold)" stroke="url(#coinGradRim)" strokeWidth="1" />
          <text x="48" y="24.5" textAnchor="middle" fontSize="5.5" fontWeight="900" fill="#5A4010">₹</text>
        </g>

        <g className={styles.coinParticle2}>
          <circle cx="16" cy="26" r="5" fill="url(#coinGradGold)" stroke="url(#coinGradRim)" strokeWidth="0.8" />
          <text x="16" y="28.2" textAnchor="middle" fontSize="4.8" fontWeight="900" fill="#5A4010">₹</text>
        </g>

        {/* Main 3D Floating Rupee Coin */}
        <g className={styles.coinMain}>
          {/* Outer Beveled Edge Rim */}
          <circle cx="32" cy="34" r="20" fill="url(#coinGradRim)" />
          <circle cx="32" cy="33" r="18.5" fill="url(#coinGradGold)" />
          <circle cx="32" cy="33" r="15.5" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1" strokeDasharray="2 2" />

          {/* Embossed ₹ Rupee Glyph */}
          <text
            x="32"
            y="39.5"
            textAnchor="middle"
            fontSize="18"
            fontWeight="900"
            fontFamily="'Outfit', sans-serif"
            fill="#5A4010"
            style={{ filter: 'drop-shadow(0 1px 0 rgba(255,255,255,0.8))' }}
          >
            ₹
          </text>

          {/* Holographic Sheen Arc */}
          <path d="M18 24 C24 16 40 16 46 24" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
        </g>

        {/* Verified ₹0 Zero-Fee Shield Badge */}
        <g transform="translate(38, 38)">
          <circle cx="10" cy="10" r="9" fill="url(#shieldBlue)" stroke="#FFFFFF" strokeWidth="1.5" />
          <path d="M7 10 L9.5 12.5 L13.5 7.5" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   4. HIGH-FIDELITY ANIMATED LUXURY VEHICLE FLEET
   Sleek 3D sedan/MPV with spinning alloy wheels, glowing LED beams & speed streaks
   ═══════════════════════════════════════════════════════════════════ */
export function AnimatedLuxuryFleet({ className }) {
  return (
    <div className={`${styles.fleetWrap} ${className || ''}`}>
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.fleetSvg}>
        <defs>
          <linearGradient id="carBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>
          <linearGradient id="carGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B4EA2" />
            <stop offset="100%" stopColor="#073574" />
          </linearGradient>
          <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFDF73" />
            <stop offset="100%" stopColor="#B88E3E" />
          </linearGradient>
          <linearGradient id="headlightGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Speed Streamlines */}
        <g className={styles.speedStreak}>
          <line x1="8" y1="26" x2="2" y2="26" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="12" y1="32" x2="4" y2="32" stroke="#0B4EA2" strokeWidth="2" strokeLinecap="round" />
          <line x1="10" y1="38" x2="2" y2="38" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Animated Car Body (Suspension Hover Bounce) */}
        <g className={styles.carBody}>
          {/* Chassis Shadow */}
          <ellipse cx="34" cy="46" rx="24" ry="3.5" fill="rgba(14, 19, 31, 0.2)" />

          {/* LED Headlight Beam Projection */}
          <polygon points="54,34 64,28 64,40 54,38" fill="url(#headlightGlow)" className={styles.headlightBeam} />

          {/* Secondary Fleet Silhouette in Background */}
          <path
            d="M20 25 L26 19 C28 17 31 16 35 16 H44 L49 22 L52 26 H20 Z"
            fill="#0B4EA2"
            opacity="0.35"
          />

          {/* Main Car Profile Shell */}
          <path
            d="M14 36 L19 25 C20.5 22.5 23 21 26 21 H43 C46 21 48.5 22.5 50 25 L55 36 C57 36.5 58 38 58 40 V42 C58 43 57 44 56 44 H54 C54 41 51.5 38.5 48.5 38.5 C45.5 38.5 43 41 43 44 H25 C25 41 22.5 38.5 19.5 38.5 C16.5 38.5 14 41 14 44 H12 C11 44 10 43 10 42 V40 C10 38 11.5 36.5 14 36 Z"
            fill="url(#carBodyGrad)"
            stroke="#0B4EA2"
            strokeWidth="1.2"
          />

          {/* Tinted Aerodynamic Windows */}
          <path
            d="M21 26 L23.5 23.5 C24.5 22.5 25.8 22 27.5 22 H34 V26 H21 Z"
            fill="url(#carGlassGrad)"
            opacity="0.9"
          />
          <path
            d="M36 22 H42 C43.8 22 45.2 22.8 46 24 L48 26 H36 V22 Z"
            fill="url(#carGlassGrad)"
            opacity="0.9"
          />

          {/* Gloss Light Reflection Curve */}
          <path d="M16 36 L48 34" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />

          {/* Front LED Projector Light */}
          <rect x="54" y="34.5" width="3" height="3" rx="1" fill="#38BDF8" />

          {/* Rear Tail Light */}
          <rect x="11" y="35" width="2.5" height="3" rx="0.8" fill="#EF4444" />

          {/* Animated Front Alloy Wheel */}
          <g transform="translate(48.5, 43.5)">
            <circle cx="0" cy="0" r="5.2" fill="#0E1A2B" stroke="#64748B" strokeWidth="0.8" />
            <g className={styles.wheelSpin}>
              <circle cx="0" cy="0" r="3.2" fill="#1E293B" stroke="url(#rimGrad)" strokeWidth="1" />
              <line x1="-2.5" y1="0" x2="2.5" y2="0" stroke="url(#rimGrad)" strokeWidth="0.8" />
              <line x1="0" y1="-2.5" x2="0" y2="2.5" stroke="url(#rimGrad)" strokeWidth="0.8" />
            </g>
          </g>

          {/* Animated Rear Alloy Wheel */}
          <g transform="translate(19.5, 43.5)">
            <circle cx="0" cy="0" r="5.2" fill="#0E1A2B" stroke="#64748B" strokeWidth="0.8" />
            <g className={styles.wheelSpin}>
              <circle cx="0" cy="0" r="3.2" fill="#1E293B" stroke="url(#rimGrad)" strokeWidth="1" />
              <line x1="-2.5" y1="0" x2="2.5" y2="0" stroke="url(#rimGrad)" strokeWidth="0.8" />
              <line x1="0" y1="-2.5" x2="0" y2="2.5" stroke="url(#rimGrad)" strokeWidth="0.8" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
