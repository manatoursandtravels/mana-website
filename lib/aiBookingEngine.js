// lib/aiBookingEngine.js — MANA Tours & Travels Comprehensive Multilingual AI Booking & Enquiry Concierge
// Supports Telugu, English, and Romanized Telugu (Telugu written in English letters)
// Integrates with official RATES from lib/constants.js and live Promo from lib/offerTracker.js

import { BUSINESS, RATES, SERVICES } from './constants.js';
import { getNewCustomerOfferStatus } from './offerTracker.js';

// 1. Regional Destination and City Vocabulary Map
export const DESTINATION_MAP = {
  // Tirupati & Tirumala
  tirupati: { name: 'Tirupati', canonical: 'Tirupati', distKm: 250, oneWay: 2099, roundTrip: 3499, airportFare: 2499, category: 'pilgrimage', info: 'Sri Venkateswara Swamy Temple Darshan & Alipiri Checkpost' },
  tirumala: { name: 'Tirumala Tirupati', canonical: 'Tirupati', distKm: 270, oneWay: 2399, roundTrip: 3899, category: 'pilgrimage', info: 'Seven Hills Hill Road & Temple Darshan with flexible darshan wait buffer' },
  తిరుపతి: { name: 'Tirupati', canonical: 'Tirupati', distKm: 250, oneWay: 2099, roundTrip: 3499, category: 'pilgrimage' },
  తిరుమల: { name: 'Tirumala', canonical: 'Tirupati', distKm: 270, oneWay: 2399, roundTrip: 3899, category: 'pilgrimage' },

  // Hyderabad & RGIA
  hyderabad: { name: 'Hyderabad', canonical: 'Hyderabad', distKm: 360, oneWay: 4999, roundTrip: 8499, airportFare: 5499, category: 'intercity', info: 'Direct City Drop & RGIA Shamshabad Airport' },
  secunderabad: { name: 'Secunderabad', canonical: 'Hyderabad', distKm: 375, oneWay: 5199, roundTrip: 8699, category: 'intercity' },
  rgia: { name: 'Hyderabad Airport (RGIA)', canonical: 'Hyderabad', distKm: 340, oneWay: 5499, roundTrip: 8999, isAirport: true, category: 'airport' },
  హైదరాబాద్: { name: 'Hyderabad', canonical: 'Hyderabad', distKm: 360, oneWay: 4999, roundTrip: 8499, category: 'intercity' },

  // Bangalore & BLR Airport
  bangalore: { name: 'Bangalore (Bengaluru)', canonical: 'Bangalore', distKm: 330, oneWay: 5499, roundTrip: 9499, airportFare: 5999, category: 'intercity', info: 'Electronic City, Majestic & Kempegowda Airport' },
  bengaluru: { name: 'Bangalore (Bengaluru)', canonical: 'Bangalore', distKm: 330, oneWay: 5499, roundTrip: 9499, category: 'intercity' },
  kial: { name: 'Bangalore Airport (BLR)', canonical: 'Bangalore', distKm: 350, oneWay: 5999, roundTrip: 9999, isAirport: true, category: 'airport' },
  బెంగళూరు: { name: 'Bangalore', canonical: 'Bangalore', distKm: 330, oneWay: 5499, roundTrip: 9499, category: 'intercity' },

  // Chennai
  chennai: { name: 'Chennai', canonical: 'Chennai', distKm: 380, oneWay: 5299, roundTrip: 9299, airportFare: 5799, category: 'intercity', info: 'Chennai Central, T Nagar & International Airport' },
  మద్రాస్: { name: 'Chennai', canonical: 'Chennai', distKm: 380, oneWay: 5299, roundTrip: 9299, category: 'intercity' },
  చెన్నై: { name: 'Chennai', canonical: 'Chennai', distKm: 380, oneWay: 5299, roundTrip: 9299, category: 'intercity' },

  // Srisailam
  srisailam: { name: 'Srisailam', canonical: 'Srisailam', distKm: 240, oneWay: 2299, roundTrip: 3799, category: 'pilgrimage', info: 'Mallikarjuna Swamy Jyotirlinga & Dam Viewpoint' },
  శ్రీశైలం: { name: 'Srisailam', canonical: 'Srisailam', distKm: 240, oneWay: 2299, roundTrip: 3799, category: 'pilgrimage' },

  // Gandikota & Belum Caves
  gandikota: { name: 'Gandikota (Grand Canyon of India)', canonical: 'Gandikota', distKm: 120, packageFare: 2799, roundTrip: 2799, category: 'sightseeing', info: 'Pennar River Gorge & Historic Fort' },
  గండికోట: { name: 'Gandikota', canonical: 'Gandikota', distKm: 120, packageFare: 2799, roundTrip: 2799, category: 'sightseeing' },
  belum: { name: 'Belum Caves', canonical: 'Belum Caves', distKm: 200, packageFare: 2499, roundTrip: 2499, category: 'sightseeing', info: 'Longest natural cave in India with underground formations' },
  బెలూం: { name: 'Belum Caves', canonical: 'Belum Caves', distKm: 200, packageFare: 2499, roundTrip: 2499, category: 'sightseeing' },
  'gandikota+belum': { name: 'Gandikota + Belum Caves Combo', canonical: 'Gandikota Combo', distKm: 280, packageFare: 3299, roundTrip: 3299, category: 'sightseeing' },

  // Rayalaseema Towns
  proddatur: { name: 'Proddatur', canonical: 'Proddatur', distKm: 70, oneWay: 999, roundTrip: 1799, category: 'local_outstation' },
  ప్రొద్దుటూరు: { name: 'Proddatur', canonical: 'Proddatur', distKm: 70, oneWay: 999, roundTrip: 1799, category: 'local_outstation' },
  pulivendula: { name: 'Pulivendula', canonical: 'Pulivendula', distKm: 90, oneWay: 1199, roundTrip: 2199, category: 'local_outstation' },
  పులివెందుల: { name: 'Pulivendula', canonical: 'Pulivendula', distKm: 90, oneWay: 1199, roundTrip: 2199, category: 'local_outstation' },
  rayachoty: { name: 'Rayachoty', canonical: 'Rayachoty', distKm: 100, oneWay: 1299, roundTrip: 2399, category: 'local_outstation' },
  రాయచోటి: { name: 'Rayachoty', canonical: 'Rayachoty', distKm: 100, oneWay: 1299, roundTrip: 2399, category: 'local_outstation' },
  ahobilam: { name: 'Ahobilam', canonical: 'Ahobilam', distKm: 185, oneWay: 1799, roundTrip: 2999, category: 'pilgrimage', info: 'Nava Narasimha Swamy Kshetras & Upper Ahobilam' },
  అహోబిలం: { name: 'Ahobilam', canonical: 'Ahobilam', distKm: 185, oneWay: 1799, roundTrip: 2999, category: 'pilgrimage' },
  kalahasti: { name: 'Srikalahasti', canonical: 'Srikalahasti', distKm: 230, oneWay: 2199, roundTrip: 3699, category: 'pilgrimage', info: 'Rahu-Ketu Sarpa Dosha Nivarana Temple' },
  శ్రీకాళహస్తి: { name: 'Srikalahasti', canonical: 'Srikalahasti', distKm: 230, oneWay: 2199, roundTrip: 3699, category: 'pilgrimage' },
  ooty: { name: 'Ooty (Nilgiris 3D/2N)', canonical: 'Ooty', distKm: 1200, packageFare: 12499, category: 'holiday' },
  goa: { name: 'Goa Holiday (4D/3N)', canonical: 'Goa', distKm: 1500, packageFare: 15999, category: 'holiday' },
};

// 2. Vehicle map with capacity and specifications
export const VEHICLE_MAP = {
  sedan: { name: 'Executive AC Sedan', models: 'Toyota Etios / Maruti Dzire', seats: '4+1 Seats', multiplier: 1.0, icon: '🚗', luggage: '2 Large Bags' },
  etios: { name: 'Toyota Etios AC Sedan', models: 'Toyota Etios Platinum', seats: '4+1 Seats', multiplier: 1.0, icon: '🚗', luggage: '2 Large Bags' },
  dzire: { name: 'Swift Dzire AC Sedan', models: 'Maruti Suzuki Dzire', seats: '4+1 Seats', multiplier: 1.0, icon: '🚗', luggage: '2 Large Bags' },
  ertiga: { name: 'Maruti Ertiga / Carens (7-Seater MPV)', models: 'Maruti Ertiga / Carens', seats: '6+1 Seats', multiplier: 1.35, icon: '🚐', luggage: '3-4 Bags' },
  mpv: { name: 'Maruti Ertiga / Carens (7-Seater MPV)', models: 'Maruti Ertiga / Carens', seats: '6+1 Seats', multiplier: 1.35, icon: '🚐', luggage: '3-4 Bags' },
  innova: { name: 'Toyota Innova Crysta (Luxury MPV)', models: 'Innova Crysta Luxury', seats: '7+1 Seats', multiplier: 1.7, icon: '👑', luggage: '4-5 Bags' },
  crysta: { name: 'Toyota Innova Crysta (Luxury MPV)', models: 'Innova Crysta Luxury', seats: '7+1 Seats', multiplier: 1.7, icon: '👑', luggage: '4-5 Bags' },
  traveller: { name: 'Force Urbania / Tempo Traveller (12-26 Seater)', models: 'Force Urbania / Luxury Tempo', seats: '12–26 Seats', multiplier: 2.3, icon: '🚌', luggage: '10+ Bags' },
  urbania: { name: 'Force Urbania Executive (12-16 Seater)', models: 'Force Urbania', seats: '12–16 Seats', multiplier: 2.5, icon: '🚌', luggage: '10+ Bags' },
  selfdrive: { name: 'Self-Drive Car (Customer Managed Fuel)', models: 'Toyota Etios / Swift Dzire / Baleno', seats: '5 Seater', isSelfDrive: true, icon: '🔑', dailyRate: 1499 },
};

/**
 * Parses freeform natural language query in Telugu, English, or Romanized Telugu
 * @param {string} prompt - Raw query string from voice or text
 * @returns {object} Parsed booking intent and structured parameters
 */
export function parseBookingQuery(prompt = '') {
  const text = prompt.toLowerCase().trim();
  const teluguText = prompt.trim();

  // Detect Language
  const hasTeluguChars = /[\u0C00-\u0C7F]/.test(prompt);
  const hasHindiChars = /[\u0900-\u097F]/.test(prompt);
  const detectedLang = hasTeluguChars ? 'te' : hasHindiChars ? 'hi' : 'en';

  // 1. Broad Intent Detection
  let serviceCategory = 'cab_booking'; // 'self_drive' | 'pilgrimage' | 'airport' | 'outstation' | 'local_cabs' | 'tour' | 'used_cars' | 'partner' | 'faq'

  if (
    text.includes('self drive') ||
    text.includes('self-drive') ||
    text.includes('rent car') ||
    text.includes('rent a car') ||
    text.includes('without driver') ||
    text.includes('సెల్ఫ్ డ్రైవ్') ||
    text.includes('సొంతంగా నడపడం') ||
    text.includes('డ్రైవర్ లేకుండా')
  ) {
    serviceCategory = 'self_drive';
  } else if (
    text.includes('partner') ||
    text.includes('attach') ||
    text.includes('attach car') ||
    text.includes('own vehicle') ||
    text.includes('earn') ||
    text.includes('కారు అటాచ్') ||
    text.includes('వాహనం అటాచ్')
  ) {
    serviceCategory = 'partner';
  } else if (
    text.includes('used car') ||
    text.includes('second hand') ||
    text.includes('buy car') ||
    text.includes('sell car') ||
    text.includes('పాత కారు') ||
    text.includes('సెకండ్ హ్యాండ్')
  ) {
    serviceCategory = 'used_cars';
  } else if (
    text.includes('tirupati') ||
    text.includes('tirumala') ||
    text.includes('srisailam') ||
    text.includes('ahobilam') ||
    text.includes('kalahasti') ||
    text.includes('darshan') ||
    text.includes('దర్శనం') ||
    text.includes('తిరుపతి') ||
    text.includes('శ్రీశైలం')
  ) {
    serviceCategory = 'pilgrimage';
  } else if (
    text.includes('airport') ||
    text.includes('flight') ||
    text.includes('rgia') ||
    text.includes('kial') ||
    text.includes('విమానాశ్రయం') ||
    text.includes('ఎయిర్‌పోర్ట్')
  ) {
    serviceCategory = 'airport';
  } else if (
    text.includes('gandikota') ||
    text.includes('belum') ||
    text.includes('ooty') ||
    text.includes('goa') ||
    text.includes('టూర్') ||
    text.includes('గండికోట')
  ) {
    serviceCategory = 'tour';
  } else if (
    text.includes('local') ||
    text.includes('4hr') ||
    text.includes('8hr') ||
    text.includes('city') ||
    text.includes('లోకల్')
  ) {
    serviceCategory = 'local_cabs';
  }

  // 2. Destination match
  let matchedDest = null;
  for (const [key, dest] of Object.entries(DESTINATION_MAP)) {
    if (text.includes(key) || teluguText.includes(key)) {
      matchedDest = dest;
      break;
    }
  }

  // 3. Vehicle match
  let matchedVehicle = VEHICLE_MAP.sedan;
  let isSelfDrive = serviceCategory === 'self_drive';

  if (isSelfDrive) {
    matchedVehicle = VEHICLE_MAP.selfdrive;
  } else if (text.includes('innova') || text.includes('crysta') || text.includes('ఇన్నోవా')) {
    matchedVehicle = VEHICLE_MAP.innova;
  } else if (text.includes('ertiga') || text.includes('carens') || text.includes('7 seater') || text.includes('7-seater') || text.includes('ఎర్టిగా')) {
    matchedVehicle = VEHICLE_MAP.ertiga;
  } else if (text.includes('traveller') || text.includes('urbania') || text.includes('tempo') || text.includes('ట్రావెలర్') || text.includes('బస్సు')) {
    matchedVehicle = VEHICLE_MAP.traveller;
  }

  // 4. Trip Type
  let tripType = 'oneWay';
  if (
    text.includes('round trip') ||
    text.includes('round-trip') ||
    text.includes('two way') ||
    text.includes('return') ||
    text.includes('రానూ పోనూ') ||
    text.includes('వెళ్లి రావడం') ||
    text.includes('రౌండ్ ట్రిప్')
  ) {
    tripType = 'roundTrip';
  } else if (serviceCategory === 'airport' || (matchedDest && matchedDest.isAirport)) {
    tripType = 'airport';
  } else if (serviceCategory === 'local_cabs' || text.includes('4hr') || text.includes('8hr')) {
    tripType = 'local';
  } else if (serviceCategory === 'tour' || text.includes('package') || text.includes('tour')) {
    tripType = 'tour';
  }

  // 5. Check for Passengers count
  let passengers = 4;
  const paxMatch = text.match(/(\d+)\s*(pax|passengers|persons|people|members|మంది|జనాలు)/);
  if (paxMatch && paxMatch[1]) {
    passengers = parseInt(paxMatch[1], 10);
    if (passengers > 4 && matchedVehicle === VEHICLE_MAP.sedan) {
      matchedVehicle = passengers <= 7 ? VEHICLE_MAP.ertiga : VEHICLE_MAP.traveller;
    }
  }

  // 6. Check for Date / Time mentions
  let timeNote = '';
  if (text.includes('morning') || text.includes('ఉదయం') || text.includes('పొద్దున')) {
    timeNote = 'Early Morning (2 AM – 6 AM Recommended for Darshan)';
  } else if (text.includes('night') || text.includes('రాత్రి')) {
    timeNote = 'Night Departure (Available 24/7)';
  } else if (text.includes('today') || text.includes('ఈరోజు') || text.includes('ఇవాళ')) {
    timeNote = 'Today (Immediate 15-min Dispatch)';
  } else if (text.includes('tomorrow') || text.includes('రేపు')) {
    timeNote = 'Tomorrow';
  }

  // 7. Check for Promo query
  const isAskingPromo =
    text.includes('offer') ||
    text.includes('discount') ||
    text.includes('2 for 1') ||
    text.includes('ఆఫర్') ||
    text.includes('తగ్గింపు');

  return {
    rawPrompt: prompt,
    detectedLang,
    serviceCategory,
    matchedDest,
    matchedVehicle,
    isSelfDrive,
    tripType,
    passengers,
    timeNote,
    isAskingPromo,
  };
}

/**
 * Calculates exact transparent fare, promotional discounts, and generates multilingual AI quotation response
 * @param {object} parsed - Result of parseBookingQuery
 * @returns {object} Structured quote card + Telugu/English response text
 */
export function generateAiQuote(parsed) {
  const { detectedLang, serviceCategory, matchedDest, matchedVehicle, isSelfDrive, tripType, passengers, timeNote, isAskingPromo } = parsed;
  const promoStatus = getNewCustomerOfferStatus();

  let estimatedFare = 0;
  let basePrice = 0;
  let tripTypeDisplay = 'One Way Drop';
  let routeLabel = 'Kadapa to Your Destination';
  let inclusions = ['Commercial AC Vehicle', 'Professional Chauffeur', 'Fuel & AC Included', 'Zero Hidden Fees'];
  let promoApplicable = false;
  let promoMessage = '';
  let specialGuidance = null;

  // 1. Calculate fare and tailor guidance based on service category
  if (serviceCategory === 'partner') {
    routeLabel = 'MANA Vehicle Partner Program';
    tripTypeDisplay = 'Attach Your Commercial Vehicle';
    estimatedFare = 35000;
    inclusions = ['70% Revenue Share', 'Guaranteed Monthly Quotas', 'Weekly Digital UPI Payouts', 'Zero Registration Fee'];
    specialGuidance = {
      type: 'partner',
      title: 'Earn ₹35,000–₹55,000/month with your vehicle in Kadapa',
      points: ['Attach your Sedan / Ertiga / Crysta', 'Formal written agreement', 'Dedicated dispatch support'],
      actionUrl: '/partner',
      actionLabel: 'Attach Your Car Online',
    };
  } else if (serviceCategory === 'used_cars') {
    routeLabel = 'MANA Certified Pre-Owned Cars Kadapa';
    tripTypeDisplay = 'Buy or Sell Verified Cars';
    estimatedFare = 0;
    inclusions = ['150-Point Diagnostic Inspection', '6-Month Comprehensive Warranty', 'Zero RC Transfer Fees', 'Free Doorstep Test Drive'];
    specialGuidance = {
      type: 'used_cars',
      title: 'Certified Pre-Owned Cars in Kadapa',
      points: ['Top 5% quality inspected vehicles', 'Instant valuation for car sellers', 'Transparent AP RTO ownership transfer'],
      actionUrl: '/used-cars',
      actionLabel: 'Browse Used Car Inventory',
    };
  } else if (isSelfDrive) {
    basePrice = 1499;
    routeLabel = 'Self-Drive Car Handover in Kadapa';
    tripTypeDisplay = 'Daily Self-Drive Rental (24 Hours)';
    inclusions = ['Sanitized Premium Sedan/Hatchback', 'FASTag Enabled', '100% Refundable Deposit (₹10,000)', 'Customer-Managed Fuel (0% markup)'];

    if (promoStatus.isValid) {
      promoApplicable = true;
      promoMessage = `🎁 Active Deal: Pay 1 Day (₹1,499) for 2 Full Days of Self-Drive! (Slot #${promoStatus.totalClaimed + 1}/50)`;
    }
    estimatedFare = 1499;
    specialGuidance = {
      type: 'self_drive',
      title: 'Self-Drive in Kadapa — Instant 2-Min KYC',
      points: ['₹1,499/day · ₹800 OFF on 7-day bookings', 'Customer-managed fuel (0% fuel markup)', 'Original DL & Aadhaar required'],
      actionUrl: '/services/self-drive',
      actionLabel: 'View Self-Drive Fleet',
    };
  } else if (matchedDest) {
    routeLabel = `Kadapa → ${matchedDest.name}`;

    if (tripType === 'roundTrip' && matchedDest.roundTrip) {
      basePrice = matchedDest.roundTrip;
      tripTypeDisplay = 'Same-Day Round Trip (with wait time)';
    } else if (tripType === 'airport' && matchedDest.airportFare) {
      basePrice = matchedDest.airportFare;
      tripTypeDisplay = 'Fixed Airport Drop';
    } else if (matchedDest.packageFare) {
      basePrice = matchedDest.packageFare;
      tripTypeDisplay = 'Full-Day Sightseeing Tour Package';
    } else {
      basePrice = matchedDest.oneWay || 2099;
      tripTypeDisplay = 'One Way Intercity Drop';
    }

    // Apply vehicle multiplier for MPVs / Crysta
    estimatedFare = Math.round(basePrice * matchedVehicle.multiplier);
  } else {
    // General city package or custom outstation fallback
    basePrice = 1799;
    routeLabel = 'Kadapa City / Custom Outstation';
    tripTypeDisplay = '8 Hours / 80 km City Package or Custom Drop';
    estimatedFare = 1799;
  }

  // 2. Generate WhatsApp Pre-filled payload
  const waLines = [
    `*MANA Tours & Travels — AI Instant Booking Quote*`,
    `----------------------------------------`,
    `📍 *Route/Service:* ${routeLabel}`,
    `🚗 *Vehicle:* ${matchedVehicle.name} (${matchedVehicle.seats})`,
    `📋 *Trip Type:* ${tripTypeDisplay}`,
    `👥 *Passengers:* ${passengers} Persons`,
    timeNote ? `⏰ *Timing:* ${timeNote}` : null,
    estimatedFare > 0 ? `💰 *Estimated Fare:* ₹${estimatedFare.toLocaleString('en-IN')}` : null,
    promoApplicable ? `🎁 *Special Deal Applied:* ${promoMessage}` : null,
    `----------------------------------------`,
    `*Inclusions:* ${inclusions.slice(0, 2).join(', ')}`,
    `*Customer Call/WhatsApp:* Please confirm my trip details with Jyothi & Pavan!`,
  ].filter(Boolean);

  const whatsappMessage = encodeURIComponent(waLines.join('\n'));
  const whatsappUrl = `https://wa.me/${BUSINESS.whatsapp}?text=${whatsappMessage}`;

  // 3. Multilingual Speech & Text response synthesis
  let responseTextTelugu = '';
  let responseTextEnglish = '';
  let responseTextHindi = '';

  if (serviceCategory === 'partner') {
    responseTextTelugu = `నమస్కారం! మీ వాహనాన్ని MANA టూర్స్ & ట్రావెల్స్‌కు అటాచ్ చేసి నెలకు ₹35,000 నుండి ₹55,000 వరకు సంపాదించవచ్చు. 70% రెవెన్యూ షేర్, వారపు UPI సెటిల్‌మెంట్స్ ఉంటాయి. వివరాల కోసం క్రింద ఉన్న బటన్ క్లిక్ చేయండి.`;
    responseTextEnglish = `Namaste! Attach your commercial car to MANA Tours & Travels to earn ₹35,000–₹55,000/month with 70% revenue share and guaranteed weekly UPI settlements. Tap below to learn more!`;
  } else if (serviceCategory === 'used_cars') {
    responseTextTelugu = `నమస్కారం! MANA సర్టిఫైడ్ యూజ్డ్ కార్లు 150-పాయింట్ తనిఖీ మరియు 6 నెలల వారంటీతో లభిస్తాయి. ఉచిత డోర్‌స్టెప్ టెస్ట్ డ్రైవ్ లేదా మీ కారు వాల్యుయేషన్ కోసం క్రింద ఉన్న లింక్ చూడండి.`;
    responseTextEnglish = `Namaste! MANA Certified used cars in Kadapa come with a 150-point diagnostic inspection and 6-month warranty. Tap below to browse certified pre-owned cars or get an instant valuation for selling your car.`;
  } else if (isSelfDrive) {
    responseTextTelugu = `నమస్కారం! MANA సెల్ఫ్ డ్రైవ్ కార్లు రోజుకు ₹${estimatedFare.toLocaleString('en-IN')} నుండి ప్రారంభమవుతాయి. ${
      promoApplicable ? 'కొత్త కస్టమర్ల కోసం 1 రోజు ధరతో 2 రోజులు డ్రైవ్ చేసుకునే బంపర్ ఆఫర్ అందుబాటులో ఉంది!' : ''
    } కడప లో డోర్‌స్టెప్ హ్యాండోవర్ ఉంటుంది. వాట్సాప్ లో బుక్ చేసుకోవడానికి కింద ఉన్న బటన్ క్లిక్ చేయండి.`;

    responseTextEnglish = `Namaste! MANA Self-Drive cars in Kadapa start at ₹${estimatedFare.toLocaleString('en-IN')}/day. ${
      promoApplicable ? 'Our First-Time Customer Offer (Pay 1 Day for 2 Days) is currently active!' : ''
    } Clean sanitized vehicle with doorstep delivery in Kadapa. Click below to book instantly on WhatsApp!`;
  } else if (matchedDest) {
    responseTextTelugu = `నమస్కారం! కడప నుండి ${matchedDest.name} కి ${matchedVehicle.name} లో ${tripTypeDisplay} చార్జీ దాదాపు ₹${estimatedFare.toLocaleString('en-IN')}. ఇందులో ఏసీ, ఇంధనం, మరియు అనుభవజ్ఞుడైన డ్రైవర్ చార్జీలు ఉంటాయి. వెంటనే కన్ఫర్మ్ చేసుకోవడానికి కింద ఉన్న బటన్ నొక్కండి.`;

    responseTextEnglish = `Namaste! For Kadapa to ${matchedDest.name} in a ${matchedVehicle.name} (${tripTypeDisplay}), the upfront fare is approximately ₹${estimatedFare.toLocaleString('en-IN')}. Includes AC, fuel, and experienced chauffeur. Tap below to confirm on WhatsApp!`;

    responseTextHindi = `नमस्ते! कडपा से ${matchedDest.name} के लिए ${matchedVehicle.name} का किराया ₹${estimatedFare.toLocaleString('en-IN')} है। इसमें एसी, फ्यूल और ड्राइवर शामिल है। अभी व्हाट्सएप पर बुक करें।`;
  } else {
    responseTextTelugu = `నమస్కారం! MANA టూర్స్ & ట్రావెల్స్ కడప కి స్వాగతం. తిరుపతి దర్శనం, హైదరాబాద్/బెంగళూరు ఎయిర్‌పోర్ట్ డ్రాప్స్, గండికోట టూర్స్, మరియు సెల్ఫ్ డ్రైవ్ కార్ల వివరాల కోసం మాట్లాడండి లేదా టైప్ చేయండి.`;

    responseTextEnglish = `Hello! Welcome to MANA Tours & Travels Kadapa. We provide 24/7 AC cabs for Tirupati darshan, Bangalore/Hyderabad airports, Gandikota tours, and self-drive car rentals. How can we assist your travel today?`;
  }

  const primaryResponse =
    detectedLang === 'te' ? responseTextTelugu : detectedLang === 'hi' ? responseTextHindi || responseTextEnglish : responseTextEnglish;

  return {
    success: true,
    serviceCategory,
    routeLabel,
    destination: matchedDest?.name || 'Custom Route',
    vehicle: matchedVehicle,
    tripType: tripTypeDisplay,
    passengers,
    estimatedFare,
    basePrice,
    inclusions,
    timeNote,
    specialGuidance,
    promoApplicable,
    promoMessage,
    promoStatus: {
      slotsRemaining: promoStatus.slotsRemaining,
      totalClaimed: promoStatus.totalClaimed,
      isValid: promoStatus.isValid,
    },
    primaryResponse,
    translations: {
      te: responseTextTelugu,
      en: responseTextEnglish,
      hi: responseTextHindi,
    },
    whatsappUrl,
    whatsappRawMessage: waLines.join('\n'),
    contactPhone: BUSINESS.phone.pavanDisplay,
    deskPhone: BUSINESS.phone.jyothiDisplay,
  };
}
