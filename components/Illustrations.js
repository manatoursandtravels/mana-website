import React from 'react';

/* ═══════════════════════════════════════════════════════════════════
   MANA Bespoke 3D Vector Illustrations (High-End Isometric & Depth)
   Brushed Brass, Luminous Gold, Royal Blue, Emerald & Sacred Amber
   ═══════════════════════════════════════════════════════════════════ */

// 1. Local Cabs — 3D Isometric City Sedan & Navigation Beacon
export function LocalCabIllustration({ className, size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="lcGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lcRoad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>
        <linearGradient id="lcCabBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="40%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="lcGlass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
        <filter id="lc3dShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#0F172A" floodOpacity="0.25" />
        </filter>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#lcGlow)" />
      <ellipse cx="50" cy="72" rx="42" ry="16" fill="url(#lcRoad)" stroke="#94A3B8" strokeWidth="1.5" />
      <ellipse cx="50" cy="71" rx="34" ry="11" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.8" />
      <g filter="url(#lc3dShadow)">
        <ellipse cx="48" cy="68" rx="28" ry="8" fill="#0F172A" opacity="0.35" />
        <path d="M20 54L28 46H68L80 54C82 56 82 59 80 61L74 63H26L20 61C18 59 18 56 20 54Z" fill="url(#lcCabBody)" stroke="#B45309" strokeWidth="1.2" />
        <path d="M30 46L38 34H62L70 46H30Z" fill="url(#lcCabBody)" stroke="#B45309" strokeWidth="1" />
        <path d="M39 36L33 45H67L61 36H39Z" fill="url(#lcGlass)" />
        <path d="M41 37L35 44H49L53 37H41Z" fill="#FFFFFF" opacity="0.3" />
        <rect x="44" y="29" width="14" height="6" rx="2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1" />
        <rect x="46" y="31" width="10" height="2" fill="#F59E0B" />
        <circle cx="32" cy="63" r="6" fill="#0F172A" />
        <circle cx="32" cy="63" r="3" fill="#E2E8F0" stroke="#64748B" strokeWidth="1" />
        <circle cx="68" cy="63" r="6" fill="#0F172A" />
        <circle cx="68" cy="63" r="3" fill="#E2E8F0" stroke="#64748B" strokeWidth="1" />
        <ellipse cx="23" cy="55" rx="3" ry="2" fill="#FEF08A" />
        <ellipse cx="77" cy="55" rx="3" ry="2" fill="#FEF08A" />
      </g>
      <g transform="translate(68, 14)" filter="url(#lc3dShadow)">
        <path d="M10 0C4.5 0 0 4.5 0 10C0 17.5 10 26 10 26C10 26 20 17.5 20 10C20 4.5 15.5 0 10 0Z" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1.5" />
        <circle cx="10" cy="10" r="4" fill="#FFFFFF" />
      </g>
    </svg>
  );
}

// 2. Outstation Cabs — 3D Highway Perspective & Milestone
export function OutstationIllustration({ className, size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="osGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="osHwy" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="osStone" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>
        <filter id="os3dShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#0F172A" floodOpacity="0.3" />
        </filter>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#osGlow)" />
      <ellipse cx="50" cy="74" rx="42" ry="14" fill="#E2E8F0" />
      <path d="M12 84L40 42H60L88 84H12Z" fill="url(#osHwy)" />
      <path d="M50 44V50M50 54V62M50 68V80" stroke="#FBBF24" strokeWidth="2.5" strokeDasharray="4 4" strokeLinecap="round" />
      <path d="M12 84L40 42" stroke="#94A3B8" strokeWidth="2" />
      <path d="M88 84L60 42" stroke="#94A3B8" strokeWidth="2" />
      <g transform="translate(36, 52)" filter="url(#os3dShadow)">
        <path d="M4 14L8 6H20L24 14C25 15 25 17 24 18H4C3 17 3 15 4 14Z" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1" />
        <path d="M8 6L11 2H17L20 6H8Z" fill="#1E40AF" />
        <circle cx="8" cy="18" r="2.5" fill="#0F172A" />
        <circle cx="20" cy="18" r="2.5" fill="#0F172A" />
        <polygon points="4,13 0,16 5,16" fill="#FEF08A" opacity="0.8" />
        <polygon points="24,13 28,16 23,16" fill="#FEF08A" opacity="0.8" />
      </g>
      <g transform="translate(68, 48)" filter="url(#os3dShadow)">
        <rect x="0" y="8" width="18" height="24" rx="2" fill="url(#osStone)" stroke="#94A3B8" strokeWidth="1" />
        <path d="M0 8C0 2 18 2 18 8H0Z" fill="#10B981" />
        <rect x="3" y="13" width="12" height="2" rx="1" fill="#0F172A" />
        <rect x="5" y="18" width="8" height="2" rx="1" fill="#0F172A" />
        <rect x="6" y="24" width="6" height="3" rx="1" fill="#EF4444" />
      </g>
      <circle cx="50" cy="38" r="8" fill="#F59E0B" opacity="0.4" />
      <path d="M30 42C36 36 44 38 50 42C56 38 64 36 70 42H30Z" fill="#64748B" opacity="0.5" />
    </svg>
  );
}

// 3. Airport Transfers — 3D Jetliner & On-Time Clock
export function AirportIllustration({ className, size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="apGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6366F1" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="apFuselage" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#E2E8F0" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
        <linearGradient id="apWing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#312E81" />
        </linearGradient>
        <filter id="ap3dShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="8" stdDeviation="6" floodColor="#1E1B4B" floodOpacity="0.3" />
        </filter>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#apGlow)" />
      <ellipse cx="50" cy="78" rx="40" ry="12" fill="#1E293B" stroke="#475569" strokeWidth="1" />
      <ellipse cx="50" cy="78" rx="30" ry="7" fill="none" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="5 4" />
      <path d="M14 62C14 56 22 56 25 60C28 54 38 54 40 60C44 60 48 64 48 68H14V62Z" fill="#F1F5F9" opacity="0.75" />
      <path d="M62 48C62 44 68 44 70 46C73 42 81 42 83 46C86 46 89 49 89 52H62V48Z" fill="#F1F5F9" opacity="0.6" />
      <g transform="translate(18, 14) rotate(-24)" filter="url(#ap3dShadow)">
        <path d="M10 40C-4 44 -12 50 -20 54" stroke="#818CF8" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
        <path d="M22 44C8 48 0 54 -8 58" stroke="#818CF8" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
        <path d="M38 10C42 16 42 46 36 56C34 59 30 60 28 60C26 60 22 59 20 56C14 46 14 16 18 10C22 4 34 4 38 10Z" fill="url(#apFuselage)" stroke="#64748B" strokeWidth="1" />
        <path d="M25 8C26 6 30 6 31 8L32 12H24L25 8Z" fill="#0F172A" />
        <path d="M8 32L-12 44L-10 48L12 40L8 32Z" fill="url(#apWing)" />
        <path d="M48 32L68 44L66 48L44 40L48 32Z" fill="url(#apWing)" />
        <path d="M-12 44L-14 38L-10 40L-12 44Z" fill="#F59E0B" />
        <path d="M68 44L70 38L66 40L68 44Z" fill="#F59E0B" />
        <path d="M22 54L10 64V67L24 60V54H22Z" fill="url(#apWing)" />
        <path d="M34 54L46 64V67L32 60V54H34Z" fill="url(#apWing)" />
        <path d="M27 50H29V62H27V50Z" fill="#F59E0B" />
      </g>
      <g transform="translate(68, 22)" filter="url(#ap3dShadow)">
        <circle cx="11" cy="11" r="11" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="2" />
        <circle cx="11" cy="11" r="9" fill="#FEF3C7" />
        <path d="M11 6V11L15 13" stroke="#B45309" strokeWidth="1.8" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// 4. Pilgrimage Tours — 3D Sacred Golden Temple & Gopuram
export function PilgrimageIllustration({ className, size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="pilGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pilGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="35%" stopColor="#FBBF24" />
          <stop offset="70%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id="pilBase" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="100%" stopColor="#FDE68A" />
        </linearGradient>
        <filter id="pil3dShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#78350F" floodOpacity="0.35" />
        </filter>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#pilGlow)" />
      <g opacity="0.4" stroke="#F59E0B" strokeWidth="1.5">
        <line x1="50" y1="8" x2="50" y2="16" />
        <line x1="28" y1="16" x2="34" y2="22" />
        <line x1="72" y1="16" x2="66" y2="22" />
        <line x1="16" y1="36" x2="24" y2="38" />
        <line x1="84" y1="36" x2="76" y2="38" />
      </g>
      <ellipse cx="50" cy="80" rx="38" ry="11" fill="url(#pilBase)" stroke="#B45309" strokeWidth="1.5" />
      <g filter="url(#pil3dShadow)">
        <path d="M22 80L26 66H74L78 80H22Z" fill="url(#pilGold)" stroke="#92400E" strokeWidth="1" />
        <path d="M44 80V70C44 67 47 65 50 65C53 65 56 67 56 70V80H44Z" fill="#1E293B" />
        <circle cx="50" cy="69" r="1.5" fill="#FEF08A" />
        <path d="M28 66L32 54H68L72 66H28Z" fill="url(#pilGold)" stroke="#92400E" strokeWidth="1" />
        <rect x="36" y="58" width="5" height="5" rx="1" fill="#78350F" />
        <rect x="47" y="58" width="6" height="5" rx="1" fill="#78350F" />
        <rect x="59" y="58" width="5" height="5" rx="1" fill="#78350F" />
        <path d="M34 54L38 43H62L66 54H34Z" fill="url(#pilGold)" stroke="#92400E" strokeWidth="1" />
        <rect x="42" y="47" width="4" height="4" rx="1" fill="#78350F" />
        <rect x="54" y="47" width="4" height="4" rx="1" fill="#78350F" />
        <path d="M40 43L43 33H57L60 43H40Z" fill="url(#pilGold)" stroke="#92400E" strokeWidth="1" />
        <path d="M42 33C42 27 58 27 58 33H42Z" fill="url(#pilGold)" stroke="#92400E" strokeWidth="1" />
        <path d="M49 20V27M50 20V27M51 20V27" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" />
        <circle cx="50" cy="19" r="2.5" fill="#FEF08A" />
        <path d="M44 23V27M45 23V27" stroke="#FEF08A" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="44.5" cy="22.5" r="2" fill="#FEF08A" />
        <path d="M55 23V27M56 23V27" stroke="#FEF08A" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="55.5" cy="22.5" r="2" fill="#FEF08A" />
      </g>
      <path d="M18 68C14 62 18 56 24 58C24 64 22 68 18 68Z" fill="#F43F5E" opacity="0.75" />
      <path d="M82 68C86 62 82 56 76 58C76 64 78 68 82 68Z" fill="#F43F5E" opacity="0.75" />
    </svg>
  );
}

// 5. Tour Packages — 3D Gandikota Canyon & Explorer Compass
export function TourPackageIllustration({ className, size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="tpGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0D9488" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0D9488" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="tpCanyonLeft" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F87171" />
          <stop offset="50%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#7F1D1D" />
        </linearGradient>
        <linearGradient id="tpCanyonRight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FCA5A5" />
          <stop offset="50%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>
        <linearGradient id="tpRiver" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>
        <filter id="tp3dShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#134E4A" floodOpacity="0.3" />
        </filter>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#tpGlow)" />
      <circle cx="50" cy="36" r="13" fill="#FBBF24" />
      <circle cx="50" cy="36" r="16" fill="#FBBF24" opacity="0.3" />
      <g filter="url(#tp3dShadow)">
        <polygon points="10,80 28,42 42,56 46,72 44,80" fill="url(#tpCanyonLeft)" />
        <polygon points="10,80 20,54 28,42 22,80" fill="#991B1B" opacity="0.6" />
        <polygon points="90,80 72,40 58,54 54,72 56,80" fill="url(#tpCanyonRight)" />
        <polygon points="90,80 80,52 72,40 78,80" fill="#7F1D1D" opacity="0.6" />
        <path d="M42 56C46 62 54 64 48 72C46 76 48 80 50 82H54C56 78 52 74 54 70C58 64 54 60 58 54L42 56Z" fill="url(#tpRiver)" />
      </g>
      <g transform="translate(64, 18)" filter="url(#tp3dShadow)">
        <circle cx="14" cy="14" r="14" fill="#FFFFFF" stroke="#D97706" strokeWidth="2" />
        <circle cx="14" cy="14" r="11" fill="#FEF3C7" />
        <polygon points="14,4 17,14 14,12 11,14" fill="#DC2626" />
        <polygon points="14,24 17,14 14,16 11,14" fill="#1E293B" />
        <polygon points="24,14 14,17 16,14 14,11" fill="#D97706" />
        <polygon points="4,14 14,17 12,14 14,11" fill="#D97706" />
        <circle cx="14" cy="14" r="2.5" fill="#F59E0B" />
      </g>
    </svg>
  );
}

// 6. Corporate Travel — 3D Glass Towers & Executive Briefcase
export function CorporateIllustration({ className, size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="corGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#475569" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#475569" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="corTower1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="50%" stopColor="#1E40AF" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="corTower2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#94A3B8" />
          <stop offset="50%" stopColor="#475569" />
          <stop offset="100%" stopColor="#1E293B" />
        </linearGradient>
        <filter id="cor3dShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#0F172A" floodOpacity="0.3" />
        </filter>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#corGlow)" />
      <ellipse cx="50" cy="78" rx="40" ry="12" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
      <g filter="url(#cor3dShadow)">
        <rect x="22" y="34" width="18" height="42" rx="2" fill="url(#corTower2)" stroke="#64748B" strokeWidth="1" />
        <g fill="#F1F5F9" opacity="0.6">
          <rect x="25" y="38" width="4" height="4" rx="0.5" />
          <rect x="33" y="38" width="4" height="4" rx="0.5" />
          <rect x="25" y="46" width="4" height="4" rx="0.5" />
          <rect x="33" y="46" width="4" height="4" rx="0.5" />
          <rect x="25" y="54" width="4" height="4" rx="0.5" />
          <rect x="33" y="54" width="4" height="4" rx="0.5" />
        </g>
        <rect x="38" y="20" width="24" height="56" rx="3" fill="url(#corTower1)" stroke="#38BDF8" strokeWidth="1.2" />
        <line x1="50" y1="20" x2="50" y2="76" stroke="#60A5FA" strokeWidth="1" opacity="0.5" />
        <line x1="38" y1="32" x2="62" y2="32" stroke="#60A5FA" strokeWidth="0.8" opacity="0.5" />
        <line x1="38" y1="44" x2="62" y2="44" stroke="#60A5FA" strokeWidth="0.8" opacity="0.5" />
        <line x1="38" y1="56" x2="62" y2="56" stroke="#60A5FA" strokeWidth="0.8" opacity="0.5" />
        <rect x="60" y="38" width="18" height="38" rx="2" fill="url(#corTower2)" stroke="#64748B" strokeWidth="1" />
        <g fill="#F1F5F9" opacity="0.6">
          <rect x="64" y="44" width="4" height="4" rx="0.5" />
          <rect x="71" y="44" width="4" height="4" rx="0.5" />
          <rect x="64" y="52" width="4" height="4" rx="0.5" />
          <rect x="71" y="52" width="4" height="4" rx="0.5" />
        </g>
      </g>
      <g transform="translate(18, 56)" filter="url(#cor3dShadow)">
        <rect x="0" y="5" width="26" height="18" rx="3" fill="#0F172A" stroke="#F59E0B" strokeWidth="1.2" />
        <rect x="1" y="6" width="24" height="16" rx="2" fill="#1E293B" />
        <path d="M8 5V2C8 1 9 0 10 0H16C17 0 18 1 18 2V5" stroke="#F59E0B" strokeWidth="1.8" fill="none" />
        <rect x="11" y="11" width="4" height="4" rx="1" fill="#F59E0B" />
      </g>
    </svg>
  );
}

// 7. Local Sightseeing — 3D Topographical Map & Ruby Beacon
export function SightseeingIllustration({ className, size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="ssGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#059669" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ssMap1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="100%" stopColor="#FDE68A" />
        </linearGradient>
        <linearGradient id="ssMap2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#FCD34D" />
        </linearGradient>
        <filter id="ss3dShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#064E3B" floodOpacity="0.3" />
        </filter>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#ssGlow)" />
      <g filter="url(#ss3dShadow)">
        <polygon points="14,40 38,32 38,76 14,84" fill="url(#ssMap1)" stroke="#D97706" strokeWidth="1" />
        <polygon points="38,32 62,40 62,84 38,76" fill="url(#ssMap2)" stroke="#D97706" strokeWidth="1" />
        <polygon points="62,40 86,32 86,76 62,84" fill="url(#ssMap1)" stroke="#D97706" strokeWidth="1" />
        <path d="M18 56C24 50 30 58 38 52C46 46 54 54 62 50C70 46 78 52 82 48" stroke="#059669" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
        <path d="M22 68C28 64 34 68 38 64C42 60 50 64 62 60" stroke="#D97706" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
      </g>
      <g transform="translate(42, 14)" filter="url(#ss3dShadow)">
        <path d="M16 0C7.2 0 0 7.2 0 16C0 27.5 16 40 16 40C16 40 32 27.5 32 16C32 7.2 24.8 0 16 0Z" fill="#DC2626" stroke="#FFFFFF" strokeWidth="2" />
        <circle cx="16" cy="16" r="6" fill="#FFFFFF" />
        <circle cx="16" cy="16" r="3" fill="#DC2626" />
      </g>
      <ellipse cx="58" cy="62" rx="8" ry="4" fill="none" stroke="#DC2626" strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

// 8. Wedding & Events — 3D Interlocking Diamond Rings
export function WeddingIllustration({ className, size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="wedGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FB7185" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FB7185" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="wedGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="40%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <filter id="wed3dShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#881337" floodOpacity="0.25" />
        </filter>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#wedGlow)" />
      <g opacity="0.3" transform="translate(18, 56)">
        <path d="M6 14L14 6H50L58 14H62C64 14 64 18 62 19H2C0 19 0 14 2 14H6Z" fill="#E11D48" />
        <circle cx="14" cy="19" r="4" fill="#881337" />
        <circle cx="50" cy="19" r="4" fill="#881337" />
      </g>
      <g filter="url(#wed3dShadow)">
        <ellipse cx="38" cy="46" rx="20" ry="20" fill="none" stroke="url(#wedGold)" strokeWidth="6" />
        <ellipse cx="38" cy="45" rx="19" ry="19" fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.6" />
        <ellipse cx="60" cy="46" rx="20" ry="20" fill="none" stroke="url(#wedGold)" strokeWidth="6" />
        <ellipse cx="60" cy="45" rx="19" ry="19" fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.6" />
        <g transform="translate(38, 26)">
          <polygon points="0,-10 6,-3 0,5 -6,-3" fill="#FFFFFF" stroke="#93C5FD" strokeWidth="1" />
          <polygon points="0,-10 3,-3 0,5 -3,-3" fill="#E0F2FE" />
          <polygon points="0,-10 6,-3 0,-3" fill="#BAE6FD" />
        </g>
        <line x1="38" y1="12" x2="38" y2="16" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="32" y1="14" x2="35" y2="17" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="44" y1="14" x2="41" y2="17" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
      </g>
      <path d="M22 68C34 76 66 76 78 68" stroke="#E11D48" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 6" />
      <circle cx="50" cy="73" r="3.5" fill="#FB7185" />
      <circle cx="42" cy="71" r="3" fill="#F43F5E" />
      <circle cx="58" cy="71" r="3" fill="#F43F5E" />
    </svg>
  );
}

// 9. Self Drive — 3D Gold Steering Wheel & Smart Key Fob
export function SelfDriveIllustration({ className, size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="sdGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sdSteerRing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="50%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
        <linearGradient id="sdKeyBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="50%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="sdKeyBlade" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#64748B" />
        </linearGradient>
        <filter id="sd3dShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.3" />
        </filter>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#sdGlow)" />
      <g filter="url(#sd3dShadow)">
        <ellipse cx="48" cy="46" rx="34" ry="24" fill="none" stroke="url(#sdSteerRing)" strokeWidth="6" />
        <ellipse cx="48" cy="45" rx="33" ry="23" fill="none" stroke="#FEF3C7" strokeWidth="1.5" opacity="0.6" />
        <ellipse cx="48" cy="46" rx="14" ry="10" fill="#0F172A" stroke="url(#sdSteerRing)" strokeWidth="2.5" />
        <polygon points="48,40 52,48 48,46 44,48" fill="#F59E0B" />
        <path d="M14 46H34M62 46H82M48 56V70" stroke="url(#sdSteerRing)" strokeWidth="4" strokeLinecap="round" />
      </g>
      <g transform="translate(48, 30) rotate(-18)" filter="url(#sd3dShadow)">
        <rect x="0" y="0" width="22" height="34" rx="8" fill="url(#sdKeyBody)" stroke="#F59E0B" strokeWidth="1.5" />
        <rect x="2" y="2" width="18" height="30" rx="6" fill="none" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.25" />
        <circle cx="11" cy="11" r="4.5" fill="#10B981" />
        <path d="M9.5 11L10.5 12L12.5 10" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="11" cy="22" r="4" fill="#334155" />
        <circle cx="11" cy="22" r="1.5" fill="#F59E0B" />
        <path d="M8 34V46L11 48L14 46V34H8Z" fill="url(#sdKeyBlade)" stroke="#475569" strokeWidth="0.8" />
        <rect x="9" y="38" width="2" height="2" fill="#334155" />
        <rect x="11" y="42" width="2" height="2" fill="#334155" />
      </g>
      <circle cx="24" cy="28" r="2" fill="#FDE68A" />
      <polygon points="76,22 78,25 81,22 78,19" fill="#FDE68A" />
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
