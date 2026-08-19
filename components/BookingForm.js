'use client';

import { useState, useEffect } from 'react';
import { SERVICES, RATES, buildWhatsAppMessage } from '@/lib/constants';
import { trackFormSubmission } from '@/lib/analytics';
import styles from './BookingForm.module.css';

// Dynamic Service Configurations
const SERVICE_CONFIGS = {
  'Self Drive': {
    tripTypes: [
      'Daily Rental (24 Hours) — ₹1,499/day',
      '3-Day Weekend Escape — ₹4,199',
      'Weekly Plan (7 Days) — ₹9,693 (Save ₹800)',
      'Monthly Membership (30 Days) — ₹24,999 (₹833/day)',
    ],
    defaultTripType: 'Daily Rental (24 Hours) — ₹1,499/day',
    vehicles: [
      'Executive Sedan (Toyota Etios / Dzire) — 5 Seats',
      'Family MPV (Maruti Suzuki Ertiga) — 7 Seats',
      'VIP Luxury MPV (Toyota Innova Crysta) — 7 Captain Seats',
    ],
    pickupLabel: 'Pickup / Delivery Location in Kadapa *',
    pickupPlaceholder: 'e.g. Kadapa Hub / Doorstep Delivery address',
    hideDestination: true,
    destinationDefault: 'Return to Kadapa Hub (Self-Drive)',
    hideReturnDate: false,
    returnDateLabel: 'Return Date (Drop-off) *',
    hidePassengers: true,
    showVehicleSelect: true,
    notesPlaceholder: 'e.g. Driving license details, preferred pickup time (e.g. 9 AM)...',
    infoBanner: '⛽ 100% Customer-Managed Fuel policy. Return car at Kadapa hub with same fuel level. ₹10,000 refundable deposit on handover.',
  },

  'Local Cabs': {
    tripTypes: [
      '4 Hours / 40 km Package (₹999)',
      '8 Hours / 80 km Package (₹1,799)',
      'Full Day City Package (12 hrs / 120 km)',
    ],
    defaultTripType: '4 Hours / 40 km Package (₹999)',
    vehicles: ['Sedan (Etios / Dzire)', '7-Seater MPV (Ertiga)', 'Innova Crysta'],
    pickupLabel: 'Pickup Location in Kadapa *',
    pickupPlaceholder: 'e.g. Rims Hospital / Railway Station / Home',
    hideDestination: false,
    destinationLabel: 'Local Drop / Areas to Visit (Optional)',
    destinationPlaceholder: 'e.g. City market, Ameen Peer Dargah, Devuni Kadapa',
    hideReturnDate: true,
    hidePassengers: false,
    showVehicleSelect: true,
    notesPlaceholder: 'e.g. Chilled AC, luggage space required...',
    infoBanner: '🚗 Chauffeur + AC + Fuel included in all local city packages.',
  },

  'Local Sightseeing': {
    tripTypes: [
      'Kadapa Heritage City Tour (4 hrs / 40 km) — ₹1,499',
      'Gandikota Grand Canyon Day Tour — ₹2,799',
      'Belum Caves Day Tour — ₹2,499',
      'Gandikota + Belum Caves Combo Tour — ₹3,299',
    ],
    defaultTripType: 'Gandikota Grand Canyon Day Tour — ₹2,799',
    vehicles: ['Sedan (4 Seats)', 'Ertiga (6-7 Seats)', 'Innova Crysta (7 Seats)', 'Tempo Traveller (12+ Seats)'],
    pickupLabel: 'Pickup Location in Kadapa *',
    pickupPlaceholder: 'e.g. Hotel / Railway Station / Home in Kadapa',
    hideDestination: true,
    destinationDefault: 'Sightseeing Circuit as per Package',
    hideReturnDate: true,
    hidePassengers: false,
    showVehicleSelect: true,
    notesPlaceholder: 'e.g. Telugu/English speaking chauffeur, senior citizens travelling...',
    infoBanner: '🗺️ Complete sightseeing tour with waiting time & tourist spot guidance included.',
  },

  'Airport Transfers': {
    tripTypes: [
      'Kadapa ↔ Tirupati Airport (TIR) — ₹2,499',
      'Kadapa → Bangalore Airport (BLR) — ₹5,999',
      'Kadapa → Hyderabad Airport (HYD) — ₹5,499',
      'Kadapa → Chennai Airport (MAA) — ₹5,799',
      'Custom Airport Drop / Pickup',
    ],
    defaultTripType: 'Kadapa ↔ Tirupati Airport (TIR) — ₹2,499',
    vehicles: ['Executive Sedan', 'Ertiga 7-Seater', 'Innova Crysta VIP'],
    pickupLabel: 'Pickup Point / Flight Arrival Terminal *',
    pickupPlaceholder: 'e.g. Kadapa Home Address / Airport Terminal',
    hideDestination: false,
    destinationLabel: 'Drop Airport / Destination *',
    destinationPlaceholder: 'e.g. Bangalore Airport KIAL Terminal 1 / 2',
    hideReturnDate: false,
    returnDateLabel: 'Return Pickup Date (If Round Trip)',
    hidePassengers: false,
    showVehicleSelect: true,
    notesPlaceholder: 'e.g. Flight number (e.g. 6E-123), landing time, extra luggage bags...',
    infoBanner: '✈️ 24/7 on-time flight guarantee with live flight tracking & zero late charges.',
  },

  'Pilgrimage Tours': {
    tripTypes: [
      'Kadapa ↔ Tirumala Tirupati Darshan (Round Trip)',
      'Kadapa ↔ Srisailam Mallikarjuna Jyotirlinga (2 Days)',
      'Kadapa ↔ Ahobilam Nava Narasimha Tour (Round Trip)',
      'Kadapa ↔ Mahanandi, Yaganti & Belum Circuit',
      'Kadapa ↔ Srikalahasti & Kanipakam Darshan',
      'Custom Multi-Temple Sacred Circuit',
    ],
    defaultTripType: 'Kadapa ↔ Tirumala Tirupati Darshan (Round Trip)',
    vehicles: ['Sedan (Etios/Dzire)', 'Ertiga MPV (7 Seats)', 'Innova Crysta VIP', 'Tempo Traveller (12-26 Seats)'],
    pickupLabel: 'Pickup Location in Kadapa *',
    pickupPlaceholder: 'e.g. Home / Hotel in Kadapa',
    hideDestination: false,
    destinationLabel: 'Sacred Temples to Visit *',
    destinationPlaceholder: 'e.g. Tirumala + Padmavathi Temple + Alipiri',
    hideReturnDate: false,
    returnDateLabel: 'Return / Darshan Completion Date',
    hidePassengers: false,
    showVehicleSelect: true,
    notesPlaceholder: 'e.g. Special entry darshan time slot, elderly family members, vegetarian driver preference...',
    infoBanner: '🛕 Darshan-timed departures with courteous drivers familiar with temple customs.',
  },

  'Outstation Cabs': {
    tripTypes: [
      'One Way Intercity Drop',
      'Round Trip Outstation Journey',
      'Multi-Day Multi-City Circuit',
    ],
    defaultTripType: 'Round Trip Outstation Journey',
    vehicles: ['Executive Sedan', 'Ertiga MPV (7 Seats)', 'Innova Crysta (7 Seats)', 'Tempo Traveller'],
    pickupLabel: 'Pickup Location in Kadapa *',
    pickupPlaceholder: 'e.g. Kadapa City / Railway Station',
    hideDestination: false,
    destinationLabel: 'Destination City *',
    destinationPlaceholder: 'e.g. Bangalore, Hyderabad, Chennai, Nellore, Kurnool...',
    hideReturnDate: false,
    returnDateLabel: 'Return Date (For Round Trips)',
    hidePassengers: false,
    showVehicleSelect: true,
    notesPlaceholder: 'e.g. Number of bags, preferred departure time (e.g. 5:00 AM)...',
    infoBanner: '🛣️ Flat upfront per-km pricing with clean AC commercial vehicles and national FASTag.',
  },

  'Tour Packages': {
    tripTypes: [
      'Gandikota Canyon & Fort Day Tour (₹2,799)',
      'Belum Caves Day Tour (₹2,499)',
      'Gandikota + Belum Caves Combo (₹3,299)',
      'Ooty Nilgiris Holiday Package (3D/2N) — ₹12,499',
      'Goa Beach Vacation Tour (4D/3N) — ₹15,999',
      'Horsley Hills Weekend Getaway (2D/1N)',
    ],
    defaultTripType: 'Gandikota Canyon & Fort Day Tour (₹2,799)',
    vehicles: ['Sedan', 'Ertiga 7-Seater', 'Innova Crysta Luxury', 'Force Urbania / Traveller'],
    pickupLabel: 'Pickup Location in Kadapa *',
    pickupPlaceholder: 'e.g. Home / Hotel in Kadapa',
    hideDestination: true,
    destinationDefault: 'Tour Package Destination',
    hideReturnDate: false,
    returnDateLabel: 'Tour End Date',
    hidePassengers: false,
    showVehicleSelect: true,
    notesPlaceholder: 'e.g. Family holiday, hotel assistance required, photo stops...',
    infoBanner: '🏔️ Complete guided vacation tours with transparent all-inclusive package pricing.',
  },

  'Corporate Travel': {
    tripTypes: [
      'Executive Airport & Intercity Drop',
      'Full Day Plant / Office Visit (8 hrs)',
      'Monthly Corporate Retainer Account',
      'VIP Delegation Fleet Coordination',
    ],
    defaultTripType: 'Executive Airport & Intercity Drop',
    vehicles: ['Toyota Innova Crysta (VIP)', 'Toyota Etios Executive', 'Force Urbania (Luxury 12 Seater)'],
    pickupLabel: 'Company / Pickup Location *',
    pickupPlaceholder: 'e.g. Kadapa Industrial Area / Hotel / Corporate Office',
    hideDestination: false,
    destinationLabel: 'Destination / Plant Location *',
    destinationPlaceholder: 'e.g. Hyderabad Hitec City / Bangalore Tech Park / Chennai',
    hideReturnDate: false,
    returnDateLabel: 'Return Departure Date',
    hidePassengers: false,
    showVehicleSelect: true,
    notesPlaceholder: 'e.g. GST invoice details, monthly credit account, executive name...',
    infoBanner: '🏢 Formal GST tax invoices, chauffeur in executive attire & corporate billing.',
  },

  'Wedding & Events': {
    tripTypes: [
      'Decorated Bride & Groom VIP Car (Full Day)',
      'Multi-Vehicle Baraat Fleet (Sedans + MPVs)',
      'Guest Shuttle Service (Tempo Travellers)',
      'Engagement / Pre-Wedding Photography Escort',
    ],
    defaultTripType: 'Decorated Bride & Groom VIP Car (Full Day)',
    vehicles: ['Decorated Innova Crysta (Luxury)', 'White Executive Sedan Fleet', 'Force Traveller (17-26 Seater)'],
    pickupLabel: 'Wedding Hall / Home Address in Kadapa *',
    pickupPlaceholder: 'e.g. Kalyana Mandapam name / Kadapa address',
    hideDestination: false,
    destinationLabel: 'Event Destination / Reception Venue (Optional)',
    destinationPlaceholder: 'e.g. Tirupati / Local Kadapa Convention Centre',
    hideReturnDate: false,
    returnDateLabel: 'Event End Date',
    hidePassengers: false,
    showVehicleSelect: true,
    notesPlaceholder: 'e.g. Number of cars needed, floral decoration style, muhurtham timing...',
    infoBanner: '💒 Spotless, pristine vehicles with punctual chauffeurs dedicated for wedding events.',
  },
};

export default function BookingForm({ compact = false, defaultService = '' }) {
  const [form, setForm] = useState({
    service: defaultService || 'Self Drive',
    tripType: '',
    vehicleChoice: 'Executive Sedan (Toyota Etios / Dzire) — 5 Seats',
    pickup: '',
    destination: '',
    date: '',
    returnDate: '',
    passengers: '4',
    name: '',
    phone: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  // Active configuration based on selected service
  const config = SERVICE_CONFIGS[form.service] || SERVICE_CONFIGS['Outstation Cabs'];

  // Automatically update tripType and defaults when service changes
  useEffect(() => {
    if (config) {
      setForm((prev) => ({
        ...prev,
        tripType: config.defaultTripType || config.tripTypes[0] || '',
        destination: config.hideDestination ? config.destinationDefault : (prev.destination === 'Return to Kadapa Hub (Self-Drive)' ? '' : prev.destination),
        vehicleChoice: config.vehicles ? config.vehicles[0] : prev.vehicleChoice,
      }));
    }
  }, [form.service]);

  const set = (field, val) => setForm((prev) => ({ ...prev, [field]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.pickup) return;

    const finalDestination = config.hideDestination ? config.destinationDefault : form.destination;

    // 1. Fire Google Analytics Event
    trackFormSubmission(form.service, `${form.pickup} -> ${finalDestination}`);

    // 2. Silently sync lead to API / Google Sheets CRM in background
    try {
      fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          destination: finalDestination,
          sourceUrl: typeof window !== 'undefined' ? window.location.pathname : '',
        }),
      }).catch(() => {});
    } catch {}

    // 3. Build & Open WhatsApp Message
    const url = buildWhatsAppMessage({
      service: form.service,
      tripType: form.tripType,
      vehicleChoice: form.vehicleChoice,
      pickup: form.pickup,
      destination: finalDestination,
      date: form.date,
      returnDate: form.returnDate,
      passengers: config.hidePassengers ? form.vehicleChoice : `${form.passengers} Passengers`,
      name: form.name,
      phone: form.phone,
      notes: form.notes,
    });

    window.open(url, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <form className={`${styles.form} ${compact ? styles.compact : ''}`} onSubmit={handleSubmit} id="booking-form">
      {!compact && (
        <div className={styles.formHeader}>
          <h3 className={styles.formTitle}>Book a Journey</h3>
          <p className={styles.formSubtitle}>Instant WhatsApp quote · Transparent pricing with zero hidden costs</p>
        </div>
      )}

      {/* ══ 1. SERVICE TYPE & TRIP TYPE (DYNAMICALLY LINKED) ══ */}
      <div className={styles.row2}>
        <div className="form-group">
          <label className="form-label">Service Type *</label>
          <select
            className="form-input"
            required
            value={form.service}
            onChange={(e) => set('service', e.target.value)}
          >
            {SERVICES.map((s) => (
              <option key={s.id} value={s.label}>
                {s.icon} {s.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">
            {form.service === 'Self Drive' ? 'Rental Duration *' : 'Trip / Package Type *'}
          </label>
          <select
            className="form-input"
            required
            value={form.tripType}
            onChange={(e) => set('tripType', e.target.value)}
          >
            {config.tripTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ══ 2. VEHICLE CHOICE & PASSENGERS ══ */}
      <div className={config.hidePassengers ? styles.row1 : styles.row2}>
        <div className="form-group">
          <label className="form-label">Vehicle Category *</label>
          <select
            className="form-input"
            value={form.vehicleChoice}
            onChange={(e) => set('vehicleChoice', e.target.value)}
          >
            {config.vehicles.map((v) => (
              <option key={v} value={v}>
                🚗 {v}
              </option>
            ))}
          </select>
        </div>

        {!config.hidePassengers && (
          <div className="form-group">
            <label className="form-label">Passengers Count</label>
            <select
              className="form-input"
              value={form.passengers}
              onChange={(e) => set('passengers', e.target.value)}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, '9-12 (Group)', '13-20 (Bus)'].map((n) => (
                <option key={n} value={n}>
                  👤 {n} {typeof n === 'number' ? `Passenger${n > 1 ? 's' : ''}` : ''}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* ══ 3. PICKUP & DESTINATION (CONTEXT-AWARE) ══ */}
      <div className={config.hideDestination ? styles.row1 : styles.row2}>
        <div className="form-group">
          <label className="form-label">{config.pickupLabel}</label>
          <input
            className="form-input"
            type="text"
            required
            placeholder={config.pickupPlaceholder}
            value={form.pickup}
            onChange={(e) => set('pickup', e.target.value)}
          />
        </div>

        {!config.hideDestination && (
          <div className="form-group">
            <label className="form-label">{config.destinationLabel}</label>
            <input
              className="form-input"
              type="text"
              required={!config.destinationLabel?.includes('Optional')}
              placeholder={config.destinationPlaceholder}
              value={form.destination}
              onChange={(e) => set('destination', e.target.value)}
            />
          </div>
        )}
      </div>

      {/* ══ 4. TRAVEL DATES ══ */}
      <div className={config.hideReturnDate ? styles.row1 : styles.row2}>
        <div className="form-group">
          <label className="form-label">
            {form.service === 'Self Drive' ? 'Handover / Start Date *' : 'Travel Departure Date *'}
          </label>
          <input
            className="form-input"
            type="date"
            required
            min={today}
            value={form.date}
            onChange={(e) => set('date', e.target.value)}
          />
        </div>

        {!config.hideReturnDate && (
          <div className="form-group">
            <label className="form-label">{config.returnDateLabel || 'Return Date (Optional)'}</label>
            <input
              className="form-input"
              type="date"
              min={form.date || today}
              value={form.returnDate}
              onChange={(e) => set('returnDate', e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Service Context Info Banner */}
      {config.infoBanner && (
        <div className={styles.infoBanner}>
          <span>💡</span> <span>{config.infoBanner}</span>
        </div>
      )}

      <div className={styles.divider} />

      {/* ══ 5. CUSTOMER CONTACT DETAILS ══ */}
      <div className={styles.row2}>
        <div className="form-group">
          <label className="form-label">Your Full Name *</label>
          <input
            className="form-input"
            type="text"
            required
            placeholder="e.g. Ramesh Reddy"
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Phone Number (WhatsApp) *</label>
          <input
            className="form-input"
            type="tel"
            required
            placeholder="+91 99083 00718"
            value={form.phone}
            onChange={(e) => set('phone', e.target.value)}
          />
        </div>
      </div>

      {!compact && (
        <div className="form-group">
          <label className="form-label">Special Requirements / Notes (Optional)</label>
          <textarea
            className="form-input"
            rows="2"
            placeholder={config.notesPlaceholder}
            value={form.notes}
            onChange={(e) => set('notes', e.target.value)}
            style={{ resize: 'vertical' }}
          />
        </div>
      )}

      <button type="submit" className={`btn btn--primary btn--lg ${styles.submitBtn}`} id="submit-booking">
        {submitted ? '✅ Opening WhatsApp...' : '💬 Request Confirmed WhatsApp Quote'}
      </button>

      <p className={styles.submitNote}>
        Direct confirmation with Pavan &amp; Jyothi • Response in &lt; 15 Minutes
      </p>
    </form>
  );
}
