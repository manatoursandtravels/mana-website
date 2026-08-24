import fs from 'fs';
import path from 'path';

export const NEW_CUSTOMER_OFFER_CONFIG = {
  id: 'new_customer_2for1',
  name: 'First-Time Customer 2-for-1 Deal (Pay 1 Day, Drive 2 Days)',
  expiryDate: '2026-09-30T23:59:59+05:30', // September 30th, 2026 IST
  expiryDateDisplay: 'September 30, 2026',
  maxClaims: 50,
  terms: 'Valid on first self-drive booking per verified customer with DL in Kadapa.',
};

// Storage file location (workspace data dir or /tmp for serverless Vercel fallback)
const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'promo_claims.json');
const TMP_DATA_FILE = path.join('/tmp', 'mana_promo_claims.json');

// In-memory fallback / cache
let memoryClaims = [];

function getFilePath() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    return DATA_FILE;
  } catch {
    return TMP_DATA_FILE;
  }
}

function loadClaims() {
  const filePath = getFilePath();
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        memoryClaims = parsed;
        return memoryClaims;
      }
    }
  } catch (err) {
    console.warn('[OfferTracker] Read file error, using in-memory cache:', err.message);
  }
  return memoryClaims;
}

function saveClaims(claims) {
  memoryClaims = claims;
  const filePath = getFilePath();
  try {
    fs.writeFileSync(filePath, JSON.stringify(claims, null, 2), 'utf-8');
  } catch (err) {
    console.warn('[OfferTracker] Write file error:', err.message);
  }
}

/**
 * Get the live status of the New Customer promotion
 */
export function getNewCustomerOfferStatus() {
  const claims = loadClaims();
  const now = new Date();
  const expiry = new Date(NEW_CUSTOMER_OFFER_CONFIG.expiryDate);
  const isExpired = now > expiry;
  const totalClaimed = claims.length;
  const maxClaims = NEW_CUSTOMER_OFFER_CONFIG.maxClaims;
  const slotsRemaining = Math.max(0, maxClaims - totalClaimed);
  const isSoldOut = totalClaimed >= maxClaims;
  const isValid = !isExpired && !isSoldOut;

  return {
    offerId: NEW_CUSTOMER_OFFER_CONFIG.id,
    offerName: NEW_CUSTOMER_OFFER_CONFIG.name,
    isValid,
    isExpired,
    isSoldOut,
    expiryDate: NEW_CUSTOMER_OFFER_CONFIG.expiryDate,
    expiryDateDisplay: NEW_CUSTOMER_OFFER_CONFIG.expiryDateDisplay,
    maxClaims,
    totalClaimed,
    slotsRemaining,
    claims,
  };
}

/**
 * Record a new customer claim in the database
 */
export function recordOfferClaim(customerData) {
  const status = getNewCustomerOfferStatus();
  if (status.isExpired) {
    return { success: false, reason: 'EXPIRED', message: 'Offer expired on September 30, 2026' };
  }
  if (status.isSoldOut) {
    return { success: false, reason: 'CAP_REACHED', message: 'All 50 promo slots have been claimed' };
  }

  const claims = loadClaims();
  const normalizedPhone = (customerData.phone || '').replace(/\D/g, '').slice(-10);

  // Check if this phone number already claimed this offer
  const existingClaim = claims.find((c) => {
    const cPhone = (c.phone || '').replace(/\D/g, '').slice(-10);
    return cPhone && cPhone === normalizedPhone;
  });

  if (existingClaim) {
    return {
      success: true,
      alreadyClaimed: true,
      claimId: existingClaim.id,
      claimNumber: existingClaim.claimNumber,
      message: 'Customer already has a recorded claim for this offer.',
      status: getNewCustomerOfferStatus(),
    };
  }

  const newClaim = {
    id: `claim-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    claimNumber: claims.length + 1,
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    isoDate: new Date().toISOString(),
    name: customerData.name || 'New Customer',
    phone: customerData.phone || 'Not provided',
    vehicleChoice: customerData.vehicleChoice || 'Executive Sedan',
    tripType: customerData.tripType || 'Pay 1 Day, Drive 2 Days',
    travelDate: customerData.date || customerData.travelDate || 'Pending',
    pickup: customerData.pickup || 'Kadapa Hub',
    status: '🟡 Verified New Customer — Active',
  };

  claims.push(newClaim);
  saveClaims(claims);

  const updatedStatus = getNewCustomerOfferStatus();

  return {
    success: true,
    claim: newClaim,
    claimNumber: newClaim.claimNumber,
    slotsRemaining: updatedStatus.slotsRemaining,
    totalClaimed: updatedStatus.totalClaimed,
    status: updatedStatus,
  };
}
