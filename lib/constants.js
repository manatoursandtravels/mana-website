// MANA Tours & Travels — Central constants
// All business data lives here — update once, reflects everywhere

export const BUSINESS = {
  name: 'MANA Tours & Travels',
  tagline: 'Every Journey, A New Experience',
  tagline2: 'Comfortable Rides, Memorable Journeys',
  trustLine: 'Transparent Pricing. Reliable Travel. Professional Service.',
  email: 'manatoursandtravels@gmail.com',
  website: 'www.manatoursandtravels.com',
  domain: 'manatoursandtravels.com',
  address: 'Kadapa, Andhra Pradesh – 516001',
  googleRating: '5.0',
  phone: {
    pavan: '+919908300718',
    jyothi: '+919908320718',
    pavanDisplay: '+91 99083 00718',
    jyothiDisplay: '+91 99083 20718',
  },
  whatsapp: '+919908300718',
};

export const SERVICES = [
  { id: 'local-cabs', label: 'Local Cabs', icon: '🚗', desc: '4hr/40km & 8hr/80km city packages. Driver + AC + Fuel included.', href: '/services/local-cabs' },
  { id: 'outstation-cabs', label: 'Outstation Cabs', icon: '🛣️', desc: 'One-way & round-trip intercity travel from ₹2,099. Fixed upfront fares.', href: '/services/outstation-cabs' },
  { id: 'airport-transfers', label: 'Airport Transfers', icon: '✈️', desc: 'Fixed-price pickup & drop to Tirupati, Hyderabad & Bangalore airports.', href: '/services/airport-transfers' },
  { id: 'pilgrimage-tours', label: 'Pilgrimage Tours', icon: '🛕', desc: 'Tirupati, Srisailam, Ahobilam & more. Darshan-timed departures.', href: '/services/pilgrimage-tours' },
  { id: 'tour-packages', label: 'Tour Packages', icon: '🏔️', desc: 'Gandikota, Belum, Ooty & Goa. Full-day guided packages from ₹2,799.', href: '/services/tour-packages' },
  { id: 'corporate-travel', label: 'Corporate Travel', icon: '🏢', desc: 'GST invoices, flexible monthly accounts, and premium executive vehicles.', href: '/services/corporate-travel' },
  { id: 'local-sightseeing', label: 'Local Sightseeing', icon: '🗺️', desc: 'Curated Kadapa city heritage & sightseeing tours from ₹1,499.', href: '/services/local-sightseeing' },
  { id: 'wedding-travel', label: 'Wedding & Events', icon: '💒', desc: 'Decorated premium fleet for weddings, engagements & VIP events.', href: '/services/wedding-travel' },
  { id: 'self-drive', label: 'Self Drive', icon: '🔑', desc: 'Drive yourself in premium cars from ₹1,499/day. Doorstep handover.', href: '/services/self-drive' },
];

export const RATES = {
  local: [
    { label: '4 Hours / 40 km', price: '₹999', extras: 'Extra hour: ₹150 | Extra km: ₹13' },
    { label: '8 Hours / 80 km', price: '₹1,799', extras: 'Extra hour: ₹150 | Extra km: ₹13' },
  ],
  outstation: {
    standard: '₹14/km',
    premium: '₹16/km',
    minKm: '250 km/day',
    driverAllowance: '₹300/day',
  },
  routes: [
    { from: 'Kadapa', to: 'Tirupati', oneWay: '₹2,099', roundTrip: '₹3,499', km: '~250 km' },
    { from: 'Kadapa', to: 'Hyderabad', oneWay: '₹4,999', roundTrip: '₹8,499', km: '~360 km' },
    { from: 'Kadapa', to: 'Bangalore', oneWay: '₹5,499', roundTrip: '₹9,499', km: '~330 km' },
    { from: 'Kadapa', to: 'Chennai', oneWay: '₹5,299', roundTrip: '₹9,299', km: '~380 km' },
    { from: 'Kadapa', to: 'Vijayawada', oneWay: '₹3,299', roundTrip: '₹5,799', km: '~270 km' },
    { from: 'Kadapa', to: 'Nellore', oneWay: '₹2,699', roundTrip: '₹4,799', km: '~210 km' },
    { from: 'Kadapa', to: 'Kurnool', oneWay: '₹1,799', roundTrip: '₹2,999', km: '~145 km' },
    { from: 'Kadapa', to: 'Srisailam', oneWay: '₹2,299', roundTrip: '₹3,799', km: '~240 km' },
    { from: 'Kadapa', to: 'Ahobilam', oneWay: '₹1,799', roundTrip: '₹2,999', km: '~185 km' },
    { from: 'Kadapa', to: 'Kalahasti', oneWay: '₹2,199', roundTrip: '₹3,699', km: '~230 km' },
  ],
  dayTrips: [
    { label: 'Gandikota Day Trip', price: '₹2,799', includes: '~240 km, 2hr wait' },
    { label: 'Belum Caves Day Trip', price: '₹2,499', includes: '~200 km' },
    { label: 'Gandikota + Belum Combo', price: '₹3,299', includes: '~280 km, full day' },
    { label: 'Ooty Nilgiris Tour (3D/2N)', price: '₹12,499', includes: '~1,200 km, 3 Days / 2 Nights' },
    { label: 'Goa Holiday Package (4D/3N)', price: '₹15,999', includes: '~1,500 km, 4 Days / 3 Nights' },
    { label: 'Local Sightseeing', price: '₹1,499', includes: '4 hrs / 40 km' },
  ],
  airports: [
    { route: 'Kadapa ↔ Tirupati Airport', price: '₹2,499' },
    { route: 'Kadapa → Hyderabad Airport (RGIA)', price: '₹5,499' },
    { route: 'Kadapa → Bangalore Airport (KIAL)', price: '₹5,999' },
    { route: 'Kadapa → Chennai Airport', price: '₹5,799' },
  ],
  wedding: [
    { label: 'Half Day (4 hrs)', price: '₹1,499' },
    { label: 'Full Day (8 hrs)', price: '₹2,499' },
  ],
  selfDrive: [
    { label: 'Daily (24 Hours)', price: '₹1,499', period: 'Per Day', badge: 'Popular', desc: 'Zero fuel included — customer managed fuel' },
    { label: '3-Day Weekend', price: '₹4,199', period: '72 Hours', badge: 'Save ₹300', desc: 'Perfect for long weekend road trips' },
    { label: 'Weekly (7 Days)', price: '₹9,693', originalPrice: '₹10,493', period: '7 Full Days', badge: 'Flat ₹800 OFF', desc: 'Best value for extended family visits' },
    { label: 'Monthly (30 Days)', price: '₹24,999', originalPrice: '₹44,970', period: '30 Full Days', badge: '🔥 44% OFF (Save ₹20k)', desc: '3,000 km included · Free doorstep maintenance & vehicle swap' },
  ],
  monthlySubscriptions: [
    {
      id: 'sedan-monthly',
      name: 'Executive AC Sedan',
      models: 'Toyota Etios Platinum / Swift Dzire',
      monthlyRate: '₹24,999 / mo',
      effectiveDaily: '₹833 / day',
      savings: 'Save ₹19,971 vs daily',
      badge: '👑 Most Popular',
      kmAllowance: '3,000 km / month (Extra: ₹6/km)',
      perks: ['Zero maintenance & service costs', 'Free doorstep servicing & pickup', '1 Weekend MPV upgrade privilege', '5% renewal discount on Month 2'],
    },
    {
      id: 'ertiga-monthly',
      name: '7-Seater Family MPV',
      models: 'Maruti Suzuki Ertiga Smart Hybrid',
      monthlyRate: '₹32,999 / mo',
      effectiveDaily: '₹1,100 / day',
      savings: 'Save ₹21,000 vs daily',
      badge: '👨‍👩‍👧‍👦 Family & Plant Choice',
      kmAllowance: '3,000 km / month (Extra: ₹7/km)',
      perks: ['Zero maintenance & insurance costs', 'Dual AC with 7 comfortable seats', 'Free standby replacement guarantee', '5% renewal discount on Month 2'],
    },
    {
      id: 'innova-monthly',
      name: 'VIP Luxury MPV',
      models: 'Toyota Innova Crysta (Captain Seats)',
      monthlyRate: '₹48,999 / mo',
      effectiveDaily: '₹1,633 / day',
      savings: 'Save ₹26,000 vs daily',
      badge: '⭐ VIP Executive',
      kmAllowance: '3,500 km / month (Extra: ₹9/km)',
      perks: ['Full comprehensive VIP coverage', 'Priority 24/7 dedicated concierge', 'Immediate doorstep replacement', '10% long-term corporate renewal'],
    },
  ],
  selfDrivePolicy: {
    dailyRate: '₹1,499',
    weeklyDiscount: '₹800 OFF',
    monthlyDiscount: '44% OFF',
    fuelPolicy: 'Exclusively customer-managed. Zero fuel provided by our side. Pick up with current fuel level and return at the exact same level.',
    securityDeposit: '₹10,000 (100% Refundable upon vehicle return)',
    minAge: '21 Years',
    docsRequired: ['Original Valid Driving License', 'Aadhaar Card / Govt Photo ID', 'Local / Permanent Address Proof'],
  },
};

// WhatsApp message builder
export function buildWhatsAppMessage(data) {
  const lines = [
    `*New Booking Enquiry — MANA Tours & Travels*`,
    ``,
    `*Service:* ${data.service || 'Not specified'}`,
    `*Pickup:* ${data.pickup || 'Not specified'}`,
    `*Destination:* ${data.destination || 'Not specified'}`,
    `*Date:* ${data.date || 'Not specified'}`,
    `*Return Date:* ${data.returnDate || 'N/A'}`,
    `*Passengers:* ${data.passengers || 'Not specified'}`,
    ``,
    `*Name:* ${data.name || 'Not specified'}`,
    `*Phone:* ${data.phone || 'Not specified'}`,
    data.notes ? `*Notes:* ${data.notes}` : null,
  ].filter(Boolean).join('\n');

  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(lines)}`;
}
