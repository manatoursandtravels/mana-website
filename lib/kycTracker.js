import fs from 'fs';
import path from 'path';

// Primary and fallback filepaths for Vercel/serverless environments
const PRIMARY_FILE = path.join(process.cwd(), 'data', 'kyc_records.json');
const TMP_FILE = path.join('/tmp', 'kyc_records.json');

// In-memory cache
let inMemoryKycRecords = [];

function ensureDataDir(filePath) {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  } catch (err) {
    console.warn('[KYC Tracker] Could not create directory:', err.message);
  }
}

function loadKycRecords() {
  // 1. Try primary file
  try {
    if (fs.existsSync(PRIMARY_FILE)) {
      const data = fs.readFileSync(PRIMARY_FILE, 'utf8');
      inMemoryKycRecords = JSON.parse(data);
      return inMemoryKycRecords;
    }
  } catch (e) {
    console.warn('[KYC Tracker] Primary file read error:', e.message);
  }

  // 2. Try tmp file
  try {
    if (fs.existsSync(TMP_FILE)) {
      const data = fs.readFileSync(TMP_FILE, 'utf8');
      inMemoryKycRecords = JSON.parse(data);
      return inMemoryKycRecords;
    }
  } catch (e) {
    console.warn('[KYC Tracker] Tmp file read error:', e.message);
  }

  // 3. Fallback to in-memory
  return inMemoryKycRecords;
}

function persistKycRecords(records) {
  inMemoryKycRecords = records;
  const jsonStr = JSON.stringify(records, null, 2);

  // Try writing to primary path
  try {
    ensureDataDir(PRIMARY_FILE);
    fs.writeFileSync(PRIMARY_FILE, jsonStr, 'utf8');
    return true;
  } catch (e) {
    console.warn('[KYC Tracker] Primary write failed, trying /tmp:', e.message);
  }

  // Fallback writing to /tmp
  try {
    ensureDataDir(TMP_FILE);
    fs.writeFileSync(TMP_FILE, jsonStr, 'utf8');
    return true;
  } catch (e) {
    console.warn('[KYC Tracker] /tmp write failed:', e.message);
  }

  return false;
}

/**
 * Record a new KYC verification submission
 */
export function recordKycSubmission(submission) {
  const records = loadKycRecords();
  
  // Generate unique pass ID: MANA-SD-KYC-XXXX
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const passId = `MANA-SD-KYC-${randomSuffix}`;

  const newRecord = {
    id: `kyc_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    passId,
    name: submission.name?.trim() || 'Valued Customer',
    phone: submission.phone?.trim() || '',
    emergencyContact: submission.emergencyContact?.trim() || '',
    city: submission.city?.trim() || 'Kadapa',
    carModel: submission.carModel || 'Toyota Etios Sedan',
    rentalStart: submission.rentalStart || new Date().toISOString(),
    rentalEnd: submission.rentalEnd || '',
    dlNumber: submission.dlNumber?.trim() || 'VERIFIED-ON-FILE',
    dlFrontPreview: submission.dlFrontPreview ? 'Uploaded' : 'Pending',
    dlBackPreview: submission.dlBackPreview ? 'Uploaded' : 'Pending',
    aadhaarPreview: submission.aadhaarPreview ? 'Uploaded' : 'Pending',
    startOdometer: submission.startOdometer || '0',
    fuelLevelPercent: submission.fuelLevelPercent !== undefined ? submission.fuelLevelPercent : 100,
    hasFastag: !!submission.hasFastag,
    hasSpareTyre: !!submission.hasSpareTyre,
    hasToolkit: !!submission.hasToolkit,
    hasCleanAC: !!submission.hasCleanAC,
    digitalSignature: !!submission.digitalSignature,
    status: 'VERIFIED',
    createdAt: new Date().toISOString(),
    formattedTimestamp: new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
  };

  records.unshift(newRecord);
  persistKycRecords(records);

  return newRecord;
}

/**
 * Get all KYC records for Admin inspection
 */
export function getAllKycRecords() {
  return loadKycRecords();
}

/**
 * Lookup KYC by Pass ID
 */
export function getKycByPassId(passId) {
  const records = loadKycRecords();
  return records.find((r) => r.passId?.toLowerCase() === passId?.toLowerCase()) || null;
}
