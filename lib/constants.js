// MANA Tours & Travels — Central constants
// All business data lives here — update once, reflects everywhere

export const BUSINESS = {
  name: 'MANA Tours & Travels',
  tagline: 'Every Journey, A New Experience',
  tagline2: 'Comfortable Rides, Memorable Journeys',
  trustLine: 'Transparent Pricing. Reliable Travel. Professional Service.',
  email: 'manatourandtravels@gmail.com',
  website: 'www.manatourtravels.in',
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
  { id: 'local-cabs', label: 'Local Cabs', icon: '🚗', desc: 'Hourly packages within Kadapa city', href: '/services/local-cabs' },
  { id: 'outstation-cabs', label: 'Outstation Cabs', icon: '🛣️', desc: 'One-way & round-trip intercity travel', href: '/services/outstation-cabs' },
  { id: 'airport-transfers', label: 'Airport Transfers', icon: '✈️', desc: 'On-time airport pickup and drop', href: '/services/airport-transfers' },
  { id: 'pilgrimage-tours', label: 'Pilgrimage Tours', icon: '🛕', desc: 'Tirupati, Srisailam & more', href: '/services/pilgrimage-tours' },
  { id: 'tour-packages', label: 'Tour Packages', icon: '🏔️', desc: 'Gandikota, Belum & destination tours', href: '/services/tour-packages' },
  { id: 'corporate-travel', label: 'Corporate Travel', icon: '🏢', desc: 'Reliable travel for businesses', href: '/services/corporate-travel' },
  { id: 'local-sightseeing', label: 'Local Sightseeing', icon: '🗺️', desc: 'Explore Kadapa & nearby attractions', href: '/services/local-sightseeing' },
  { id: 'wedding-travel', label: 'Wedding & Events', icon: '💒', desc: 'Vehicle service for special occasions', href: '/services/wedding-travel' },
  { id: 'self-drive', label: 'Self Drive', icon: '🔑', desc: 'Drive yourself, on request', href: '/services/self-drive' },
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
    { label: '24 Hours', price: '₹1,299 + fuel' },
    { label: '48 Hours', price: '₹2,399 + fuel' },
    { label: 'Weekly (7 days)', price: '₹7,999 + fuel' },
  ],
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
