import fs from 'fs';
import path from 'path';
import { parseBookingQuery, generateAiQuote } from './aiBookingEngine.js';
import { BUSINESS } from './constants.js';

// Paths for persistence
const DATA_DIR = path.join(process.cwd(), 'data');
const STATE_FILE = path.join(DATA_DIR, 'whatsapp_state.json');
const CHATS_FILE = path.join(DATA_DIR, 'whatsapp_chats.json');
const LEADS_FILE = path.join(DATA_DIR, 'whatsapp_leads.json');
const OUTBOX_FILE = path.join(DATA_DIR, 'whatsapp_outbox.json');

function ensureDataDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (err) {
    console.warn('[WA Automation] Could not create data dir:', err.message);
  }
}

// ═════════════════════════════════════════════════════════════════════
// 1. STATE MANAGEMENT
// ═════════════════════════════════════════════════════════════════════
const DEFAULT_STATE = {
  status: 'DISCONNECTED', // 'DISCONNECTED' | 'WAITING_FOR_QR' | 'CONNECTING' | 'CONNECTED'
  pairedPhone: '+91 99083 00718',
  businessName: 'MANA Tours & Travels',
  autoPilot: true,
  autoReplyDelayMs: 1800,
  defaultAdvanceCab: 500,
  defaultAdvanceOutstation: 1000,
  defaultAdvanceTour: 2000,
  upiId: '9908300718@upi',
  upiPayeeName: 'MANA Tours and Travels',
  qrDataUrl: null,
  pairingCode: null,
  pairingMethod: 'code',
  lastUpdated: new Date().toISOString(),
  stats: {
    totalChats: 28,
    autoQuotesSent: 46,
    leadsCaptured: 19,
    paymentRequestsSent: 12,
    activeBookings: 7,
  },
};

export function getWhatsAppState() {
  ensureDataDir();
  try {
    if (fs.existsSync(STATE_FILE)) {
      const data = fs.readFileSync(STATE_FILE, 'utf8');
      return { ...DEFAULT_STATE, ...JSON.parse(data) };
    }
  } catch (err) {
    console.warn('[WA Automation] Read state error:', err.message);
  }
  return DEFAULT_STATE;
}

export function updateWhatsAppState(updates = {}) {
  ensureDataDir();
  try {
    const current = getWhatsAppState();
    const updated = {
      ...current,
      ...updates,
      lastUpdated: new Date().toISOString(),
      stats: {
        ...current.stats,
        ...(updates.stats || {}),
      },
    };
    fs.writeFileSync(STATE_FILE, JSON.stringify(updated, null, 2), 'utf8');
    return updated;
  } catch (err) {
    console.warn('[WA Automation] Write state error:', err.message);
    return DEFAULT_STATE;
  }
}

// ═════════════════════════════════════════════════════════════════════
// 2. CHAT CONVERSATIONS MANAGEMENT
// ═════════════════════════════════════════════════════════════════════
const SEED_CHATS = [
  {
    id: 'chat-919848012345',
    phone: '+91 98480 12345',
    name: 'Suresh Kumar',
    category: 'pilgrimage',
    route: 'Kadapa → Tirupati',
    vehicle: 'Toyota Innova Crysta',
    language: 'Telugu',
    lastMessage: 'కడప నుండి తిరుపతి క్రిస్టా రేట్ ఎంతండి? రేపు మార్నింగ్ 5 AM కి కావాలి.',
    lastMessageTime: '10 mins ago',
    unread: false,
    status: 'Quote Sent',
    estimatedFare: 3499,
    messages: [
      {
        id: 'm1',
        sender: 'customer',
        text: 'కడప నుండి తిరుపతి క్రిస్టా రేట్ ఎంతండి? రేపు మార్నింగ్ 5 AM కి కావాలి.',
        time: '07:22 AM',
        timestamp: Date.now() - 600000,
      },
      {
        id: 'm2',
        sender: 'bot',
        text: 'నమస్కారం సురేష్ గారు! MANA Tours & Travels Kadapa కు స్వాగతం.\n\n📍 రూట్: Kadapa → Tirupati\n🚗 వాహనం: Toyota Innova Crysta (7+1 Luxury)\n💰 బేస్ ఫేర్: ₹3,499 (Same-Day Round Trip Base)\n✨ ఫీచర్లు: డ్రైవర్ బాటా & AC ఇంక్లూడెడ్, క్లీన్ వెహికల్.\n\nమీ బుకింగ్ కన్ఫర్మ్ చేయడానికి ₹500 అడ్వాన్స్ పే చేయవచ్చు. పేమెంట్ లింక్ కావాలా?',
        time: '07:22 AM',
        timestamp: Date.now() - 590000,
      },
    ],
  },
  {
    id: 'chat-919440156789',
    phone: '+91 94401 56789',
    name: 'Anand Reddy',
    category: 'self-drive',
    route: 'Self-Drive Car in Kadapa',
    vehicle: 'Mahindra XUV 3XO SUV',
    language: 'English',
    lastMessage: 'Is the Stealth Black XUV 3XO available for this weekend? What is the deposit?',
    lastMessageTime: '45 mins ago',
    unread: true,
    status: 'Follow-up Due',
    estimatedFare: 2199,
    messages: [
      {
        id: 'm3',
        sender: 'customer',
        text: 'Is the Stealth Black XUV 3XO available for this weekend? What is the deposit?',
        time: '06:50 AM',
        timestamp: Date.now() - 2700000,
      },
      {
        id: 'm4',
        sender: 'bot',
        text: 'Hello Anand! Welcome to MANA Tours & Travels Kadapa.\n\n🔑 *Mahindra XUV 3XO (Stealth Black Sunroof SUV)* is available!\n💰 Tariff: ₹2,199/day (24 Hours)\n🛡️ Security Deposit: ₹10,000 (100% Refundable within 2 hours of return) or Zero-Deposit VIP scheme with approved KYC.\n🚀 Inclusions: Doorstep delivery in Kadapa, FASTag enabled, sanitized cabin.\n\nWould you like us to reserve this vehicle for Saturday?',
        time: '06:51 AM',
        timestamp: Date.now() - 2640000,
      },
    ],
  },
  {
    id: 'chat-919701234567',
    phone: '+91 97012 34567',
    name: 'Pooja Sharma',
    category: 'tour-packages',
    route: 'Kadapa → Gandikota & Belum Caves',
    vehicle: 'Swift Dzire Sedan',
    language: 'English',
    lastMessage: 'Can you please share Gandikota 1-day itinerary with sunrise gorge view?',
    lastMessageTime: '2 hours ago',
    unread: false,
    status: 'Advance Paid',
    estimatedFare: 3299,
    messages: [
      {
        id: 'm5',
        sender: 'customer',
        text: 'Can you please share Gandikota 1-day itinerary with sunrise gorge view?',
        time: '05:30 AM',
        timestamp: Date.now() - 7200000,
      },
      {
        id: 'm6',
        sender: 'bot',
        text: 'Hello Pooja! Here is our curated Gandikota + Belum Caves 1-Day Itinerary:\n\n06:00 AM: Pickup from Kadapa\n07:30 AM: Gandikota Fort, Pennar Gorge viewpoint & Mylavaram Dam\n01:00 PM: Traditional lunch break\n02:30 PM: Belum Caves underground exploration\n07:00 PM: Return drop to Kadapa\n\nPackage: ₹3,299 all-inclusive (Sedan AC + Chauffeur + Fuel). Advance received: ₹1,000. Booking Confirmed!',
        time: '05:32 AM',
        timestamp: Date.now() - 7100000,
      },
    ],
  },
  {
    id: 'chat-919123456780',
    phone: '+91 91234 56780',
    name: 'Kiran Varma',
    category: 'airport-transfers',
    route: 'Kadapa → Bangalore Airport (BLR)',
    vehicle: 'Toyota Etios Sedan',
    language: 'English',
    lastMessage: 'Need flight pickup tomorrow midnight from Kempegowda Airport to Kadapa.',
    lastMessageTime: '3 hours ago',
    unread: false,
    status: 'Confirmed',
    estimatedFare: 5999,
    messages: [
      {
        id: 'm7',
        sender: 'customer',
        text: 'Need flight pickup tomorrow midnight from Kempegowda Airport to Kadapa.',
        time: '04:15 AM',
        timestamp: Date.now() - 10800000,
      },
      {
        id: 'm8',
        sender: 'bot',
        text: 'Namaste Kiran! Kempegowda International Airport (BLR) to Kadapa door pickup:\n\n🚗 Vehicle: Dedicated AC Sedan (Etios)\n💰 Fixed Airport Fare: ₹5,999 (Including Toll & Parking Buffer)\n✈️ Driver tracks flight number for zero wait hassle.\n\nBooking assigned to Chauffeur Desk. Have a pleasant flight!',
        time: '04:16 AM',
        timestamp: Date.now() - 10740000,
      },
    ],
  },
];

export function getWhatsAppChats() {
  ensureDataDir();
  try {
    if (fs.existsSync(CHATS_FILE)) {
      const data = fs.readFileSync(CHATS_FILE, 'utf8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (err) {
    console.warn('[WA Automation] Read chats error:', err.message);
  }
  // Initialize with seed data
  try {
    fs.writeFileSync(CHATS_FILE, JSON.stringify(SEED_CHATS, null, 2), 'utf8');
  } catch (e) {}
  return SEED_CHATS;
}

export function saveWhatsAppChats(chats) {
  ensureDataDir();
  try {
    fs.writeFileSync(CHATS_FILE, JSON.stringify(chats, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.warn('[WA Automation] Save chats error:', err.message);
    return false;
  }
}

export function getChatByPhone(phone) {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const chats = getWhatsAppChats();
  return chats.find((c) => c.phone.replace(/[^0-9]/g, '').endsWith(cleanPhone.slice(-10)));
}

// ═════════════════════════════════════════════════════════════════════
// 3. CRM LEADS MANAGEMENT
// ═════════════════════════════════════════════════════════════════════
export function getWhatsAppLeads() {
  ensureDataDir();
  try {
    if (fs.existsSync(LEADS_FILE)) {
      const data = fs.readFileSync(LEADS_FILE, 'utf8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (err) {
    console.warn('[WA Automation] Read leads error:', err.message);
  }

  // Derive initial leads from chats
  const initialLeads = SEED_CHATS.map((c, i) => ({
    id: `lead-wa-${i + 1}`,
    phone: c.phone,
    name: c.name,
    route: c.route,
    vehicle: c.vehicle,
    category: c.category,
    status: c.status,
    estimatedFare: c.estimatedFare,
    createdTime: c.lastMessageTime,
    notes: `WhatsApp auto-inquiry recorded for ${c.route}`,
    lastUpdated: new Date().toISOString(),
  }));

  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(initialLeads, null, 2), 'utf8');
  } catch (e) {}
  return initialLeads;
}

export function updateWhatsAppLead(leadId, updates = {}) {
  const leads = getWhatsAppLeads();
  const idx = leads.findIndex((l) => l.id === leadId || l.phone === leadId);
  if (idx !== -1) {
    leads[idx] = {
      ...leads[idx],
      ...updates,
      lastUpdated: new Date().toISOString(),
    };
    try {
      fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf8');
      return leads[idx];
    } catch (e) {}
  }
  return null;
}

// ═════════════════════════════════════════════════════════════════════
// 4. OUTBOX QUEUE (From Web Dashboard to WhatsApp Gateway)
// ═════════════════════════════════════════════════════════════════════
export function queueOutboxMessage({ toPhone, text, type = 'text', metadata = {} }) {
  ensureDataDir();
  try {
    let outbox = [];
    if (fs.existsSync(OUTBOX_FILE)) {
      outbox = JSON.parse(fs.readFileSync(OUTBOX_FILE, 'utf8'));
    }
    const item = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      toPhone,
      text,
      type,
      metadata,
      createdAt: new Date().toISOString(),
      status: 'PENDING',
    };
    outbox.push(item);
    fs.writeFileSync(OUTBOX_FILE, JSON.stringify(outbox, null, 2), 'utf8');
    return item;
  } catch (err) {
    console.warn('[WA Automation] Queue outbox error:', err.message);
    return null;
  }
}

export function popPendingOutboxMessages() {
  ensureDataDir();
  try {
    if (!fs.existsSync(OUTBOX_FILE)) return [];
    const outbox = JSON.parse(fs.readFileSync(OUTBOX_FILE, 'utf8'));
    const pending = outbox.filter((m) => m.status === 'PENDING');
    if (pending.length > 0) {
      // Mark as processed
      const remaining = outbox.filter((m) => m.status !== 'PENDING');
      fs.writeFileSync(OUTBOX_FILE, JSON.stringify(remaining, null, 2), 'utf8');
    }
    return pending;
  } catch (err) {
    return [];
  }
}


async function forwardLeadToSheetWebhook(leadData) {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!webhookUrl || !webhookUrl.startsWith('http')) return;
  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        name: leadData.name || 'Direct WhatsApp Guest',
        phone: leadData.phone,
        service: leadData.category || 'WhatsApp Inbound',
        tripType: leadData.route || 'Local/Outstation',
        vehicleChoice: leadData.vehicle || 'Executive Sedan',
        pickup: 'Kadapa (WhatsApp)',
        destination: leadData.route || '',
        travelDate: 'Flexible / WhatsApp Chat',
        returnDate: 'N/A',
        passengers: '1-4',
        notes: leadData.notes || 'Inquired on WhatsApp',
        estimatedPrice: leadData.estimatedFare ? `₹${leadData.estimatedFare}` : '',
        sourceUrl: 'WhatsApp (+91 99083 00718)',
        status: '🟡 WhatsApp Lead',
      }),
      signal: AbortSignal.timeout(5000),
    });
  } catch (err) {
    // Non-blocking
  }
}

// ═════════════════════════════════════════════════════════════════════
// 5. INCOMING MESSAGE PROCESSOR & AI AUTO-REPLY ENGINE
// ═════════════════════════════════════════════════════════════════════
export function processCustomerInbound({ phone, name = 'Customer', messageText }) {
  const cleanPhone = phone.startsWith('+') ? phone : `+${phone}`;
  const rawText = (messageText || '').trim();

  // 1. Run AI Booking Engine parser
  const parsed = parseBookingQuery(rawText);
  const quote = generateAiQuote(parsed);

  const isTelugu = parsed.hasTeluguChars || quote.primaryResponse.includes('నమస్కారం');
  const greeting = isTelugu ? `నమస్కారం ${name !== 'Customer' ? name + ' గారు' : ''}!` : `Namaste ${name !== 'Customer' ? name : ''}!`;

  // 2. Synthesize WhatsApp Response
  let replyText = '';
  const state = getWhatsAppState();

  // Check if customer asked for payment / UPI
  const lower = rawText.toLowerCase();
  const isAskingPayment =
    lower.includes('payment') ||
    lower.includes('pay') ||
    lower.includes('upi') ||
    lower.includes('advance') ||
    lower.includes('qr') ||
    lower.includes('gpay') ||
    lower.includes('phonepe') ||
    lower.includes('పేమెంట్') ||
    lower.includes('అడ్వాన్స్');

  if (isAskingPayment) {
    const advanceAmount = quote.serviceCategory === 'self_drive' ? state.defaultAdvanceTour : quote.isFixedTariff ? state.defaultAdvanceCab : state.defaultAdvanceOutstation;
    const upiLink = `upi://pay?pa=${state.upiId}&pn=${encodeURIComponent(state.upiPayeeName)}&am=${advanceAmount}&cu=INR&tn=${encodeURIComponent(`Booking Advance for ${quote.routeLabel}`)}`;

    replyText = isTelugu
      ? `${greeting} మీ బుకింగ్ అడ్వాన్స్ వివరాలు:\n\n` +
        `📍 రూట్ / సర్వీస్: ${quote.routeLabel}\n` +
        `💰 అడ్వాన్స్ మొత్తం: ₹${advanceAmount.toLocaleString('en-IN')}\n` +
        `💳 UPI ID: ${state.upiId}\n` +
        `👤 పేరు: ${state.upiPayeeName}\n\n` +
        `Google Pay, PhonePe లేదా Paytm ద్వారా నేరుగా చెల్లించడానికి కింద ఉన్న లింక్ నొక్కండి:\n${upiLink}\n\n` +
        `చెల్లింపు పూర్తయ్యాక స్క్రీన్‌షాట్ పంపండి. మేము వెంటనే కన్ఫర్మేషన్ రశీదు పంపిస్తాము!`
      : `${greeting} Here are your booking advance payment details:\n\n` +
        `📍 Route / Service: ${quote.routeLabel}\n` +
        `💰 Advance Payable: ₹${advanceAmount.toLocaleString('en-IN')}\n` +
        `💳 UPI ID: ${state.upiId}\n` +
        `👤 Payee: ${state.upiPayeeName}\n\n` +
        `Pay directly via GPay / PhonePe / Paytm:\n${upiLink}\n\n` +
        `Please share a screenshot after payment for immediate trip confirmation!`;
  } else if (quote.isFixedTariff || quote.serviceCategory === 'self_drive') {
    replyText = isTelugu
      ? `${greeting} MANA సెల్ఫ్ డ్రైవ్ కార్ల వివరాలు:\n\n` +
        `🔑 వాహనం: ${quote.vehicle.name}\n` +
        `💰 రోజువారీ అద్దె: ₹${quote.estimatedFare.toLocaleString('en-IN')}/day (24 గంటలు)\n` +
        `🛡️ డిపాజిట్: ₹10,000 (కారు తిరిగి ఇచ్చిన 2 గంటల్లో రీఫండ్ అవుతుంది) లేదా జీరో-డిపాజిట్ ఆప్షన్\n` +
        `✨ ఫీచర్లు: కస్టమర్-మేనేజ్డ్ ఫ్యూయల్, ఫ్రీ డోర్‌స్టెప్ డెలివరీ, ఫాస్టాగ్ ఎనేబుల్డ్.\n\n` +
        `కారు బుకింగ్ లేదా డ్రైవింగ్ లైసెన్స్ ధృవీకరణ కోసం మాకు మెసేజ్ చేయండి.`
      : `${greeting} Welcome to MANA Self-Drive Cars Kadapa:\n\n` +
        `🔑 Vehicle: ${quote.vehicle.name}\n` +
        `💰 Daily Tariff: ₹${quote.estimatedFare.toLocaleString('en-IN')}/day (24 Hours)\n` +
        `🛡️ Deposit: ₹10,000 (100% Refundable within 2 hours of return) or Zero-Deposit VIP Scheme with verified KYC\n` +
        `✨ Highlights: Customer-managed fuel (0% fuel markup), doorstep delivery in Kadapa, sanitized cabin.\n\n` +
        `Would you like to reserve your car today?`;
  } else if (quote.destination && quote.destination !== 'Custom Route') {
    replyText = isTelugu
      ? `${greeting} మీ ప్రయాణ అంచనా కోట్:\n\n` +
        `📍 రూట్: ${quote.routeLabel}\n` +
        `🚗 వెహికల్: ${quote.vehicle.name} (${quote.vehicle.seats})\n` +
        `📋 ట్రిప్ రకం: ${quote.tripType}\n` +
        `💰 అంచనా బేస్ ఫేర్: ₹${quote.estimatedFare.toLocaleString('en-IN')} నుండి ప్రారంభం\n` +
        `✨ చేర్చబడినవి: ${quote.inclusions.slice(0, 2).join(', ')}\n\n` +
        `మీ ప్రయాణ సమయం లేదా పిక్-అప్ లొకేషన్ పంపితే ఖచ్చితమైన పూర్తి కొటేషన్ మరియు డ్రైవర్ వివరాలు పంపిస్తాము.`
      : `${greeting} Here is your estimated trip quotation:\n\n` +
        `📍 Route: ${quote.routeLabel}\n` +
        `🚗 Vehicle: ${quote.vehicle.name} (${quote.vehicle.seats})\n` +
        `📋 Trip Plan: ${quote.tripType}\n` +
        `💰 Est. Base Fare: Starts from ₹${quote.estimatedFare.toLocaleString('en-IN')}\n` +
        `✨ Inclusions: ${quote.inclusions.slice(0, 2).join(', ')}\n\n` +
        `Please share your preferred departure time and pickup location to confirm your booking!`;
  } else {
    replyText = isTelugu
      ? `${greeting} MANA టూర్స్ & ట్రావెల్స్ కడపకు స్వాగతం!\n\n` +
        `మేము తిరుపతి దర్శనం, హైదరాబాద్/బెంగళూరు ఎయిర్‌పోర్ట్ డ్రాప్స్, గండికోట టూర్ ప్యాకేజీలు మరియు సెల్ఫ్-డ్రైవ్ కార్ల సేవలు అందిస్తున్నాము.\n\n` +
        `మీరు ఎక్కడికి ప్రయాణించాలనుకుంటున్నారు? వాహనం లేదా రూట్ వివరాలు పంపండి, క్షణాల్లో బెస్ట్ ప్రైస్ ఇస్తాము.`
      : `${greeting} Welcome to MANA Tours & Travels Kadapa!\n\n` +
        `We provide premium Chauffeur Cabs (Tirupati, Bangalore, Hyderabad), Gandikota Tour Packages, and Self-Drive SUVs in Kadapa.\n\n` +
        `How can we assist your journey today? Please share your destination and travel date for an instant quote.`;
  }

  // 3. Update Conversation History
  const chats = getWhatsAppChats();
  let chat = chats.find((c) => c.phone.replace(/[^0-9]/g, '').endsWith(cleanPhone.replace(/[^0-9]/g, '').slice(-10)));

  const nowTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const customerMsg = {
    id: `m-cust-${Date.now()}`,
    sender: 'customer',
    text: rawText,
    time: nowTime,
    timestamp: Date.now(),
  };

  const botMsg = {
    id: `m-bot-${Date.now() + 1}`,
    sender: 'bot',
    text: replyText,
    time: nowTime,
    timestamp: Date.now() + 1000,
  };

  if (chat) {
    chat.lastMessage = rawText;
    chat.lastMessageTime = 'Just now';
    chat.unread = false;
    chat.messages.push(customerMsg);
    if (state.autoPilot) {
      chat.messages.push(botMsg);
    }
    chat.estimatedFare = quote.estimatedFare || chat.estimatedFare;
    chat.route = quote.routeLabel || chat.route;
    chat.vehicle = quote.vehicle?.name || chat.vehicle;
  } else {
    chat = {
      id: `chat-${cleanPhone.replace(/[^0-9]/g, '')}`,
      phone: cleanPhone,
      name: name,
      category: quote.serviceCategory,
      route: quote.routeLabel,
      vehicle: quote.vehicle?.name || 'Executive Sedan',
      language: isTelugu ? 'Telugu' : 'English',
      lastMessage: rawText,
      lastMessageTime: 'Just now',
      unread: false,
      status: 'Quote Sent',
      estimatedFare: quote.estimatedFare,
      messages: state.autoPilot ? [customerMsg, botMsg] : [customerMsg],
    };
    chats.unshift(chat);
  }

  saveWhatsAppChats(chats);

  // 4. Update Leads CRM
  const leads = getWhatsAppLeads();
  let lead = leads.find((l) => l.phone.replace(/[^0-9]/g, '').endsWith(cleanPhone.replace(/[^0-9]/g, '').slice(-10)));
  if (lead) {
    lead.status = isAskingPayment ? 'Advance Pending' : 'Quote Sent';
    lead.route = quote.routeLabel;
    lead.vehicle = quote.vehicle?.name || lead.vehicle;
    lead.estimatedFare = quote.estimatedFare;
    lead.lastUpdated = new Date().toISOString();
  } else {
    const createdLead = {
      id: `lead-wa-${Date.now()}`,
      phone: cleanPhone,
      name: name,
      route: quote.routeLabel,
      vehicle: quote.vehicle?.name || 'Executive Sedan',
      category: quote.serviceCategory,
      status: isAskingPayment ? 'Advance Pending' : 'New Enquiry',
      estimatedFare: quote.estimatedFare,
      createdTime: 'Just now',
      notes: `Inquiry: "${rawText.slice(0, 60)}..."`,
      lastUpdated: new Date().toISOString(),
    };
    leads.unshift(createdLead);
    forwardLeadToSheetWebhook(createdLead);
  }

  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf8');
  } catch (e) {}

  // 5. Update overall stats
  updateWhatsAppState({
    stats: {
      totalChats: chats.length,
      autoQuotesSent: (state.stats?.autoQuotesSent || 0) + 1,
      leadsCaptured: leads.length,
    },
  });

  return {
    shouldReply: state.autoPilot,
    replyText,
    quote,
    chat,
  };
}

// ═════════════════════════════════════════════════════════════════════
// 6. UPI PAYMENT DETAILS GENERATOR
// ═════════════════════════════════════════════════════════════════════
export function generateUpiDetails({ amount = 500, customerPhone = '', tripNote = 'Trip Advance' }) {
  const state = getWhatsAppState();
  const safeAmount = Math.max(1, Number(amount) || 500);
  const upiId = state.upiId || '9908300718@upi';
  const payee = state.upiPayeeName || 'MANA Tours and Travels';
  const note = `${payee} - ${tripNote} (${customerPhone.slice(-4)})`;
  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payee)}&am=${safeAmount}&cu=INR&tn=${encodeURIComponent(note)}`;

  return {
    upiId,
    payee,
    amount: safeAmount,
    note,
    upiLink,
  };
}
