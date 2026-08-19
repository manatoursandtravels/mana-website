'use client';

import { useState, useEffect } from 'react';
import { SERVICES, buildWhatsAppMessage } from '@/lib/constants';
import { trackFormSubmission } from '@/lib/analytics';
import styles from './BookingForm.module.css';

// Clean, context-aware options per service
const SERVICE_OPTIONS = {
  'Self Drive': {
    tripTypes: [
      'Daily Rental (24 Hours) — ₹1,499/day',
      '3-Day Weekend Trip — ₹4,199',
      'Weekly Plan (7 Days) — ₹9,693 (Save ₹800)',
      'Monthly Membership (30 Days) — ₹24,999',
    ],
    vehicles: ['Executive Sedan (Etios / Dzire) — 5 Seats', 'Maruti Ertiga MPV — 7 Seats', 'Toyota Innova Crysta — 7 Seats'],
    isSelfDrive: true,
    pickupPlaceholder: 'Kadapa Hub / Doorstep Address in Kadapa',
  },
  'Outstation Cabs': {
    tripTypes: ['One Way Intercity Drop', 'Round Trip Outstation Journey', 'Multi-City Tour'],
    vehicles: ['Executive Sedan', 'Ertiga (7 Seater)', 'Innova Crysta VIP', 'Tempo Traveller'],
    isSelfDrive: false,
    pickupPlaceholder: 'Kadapa Bus Stand / Home',
    destinationPlaceholder: 'e.g. Bangalore / Hyderabad / Chennai',
  },
  'Pilgrimage Tours': {
    tripTypes: [
      'Kadapa ↔ Tirumala Tirupati Darshan',
      'Kadapa ↔ Srisailam Jyotirlinga (2 Days)',
      'Kadapa ↔ Ahobilam Nava Narasimha',
      'Kadapa ↔ Mahanandi & Yaganti Circuit',
      'Custom Temple Circuit',
    ],
    vehicles: ['Executive Sedan', 'Ertiga (7 Seater)', 'Innova Crysta VIP', 'Tempo Traveller'],
    isSelfDrive: false,
    pickupPlaceholder: 'Kadapa Home / Hotel',
    destinationPlaceholder: 'e.g. Tirumala / Srisailam / Ahobilam',
  },
  'Airport Transfers': {
    tripTypes: [
      'Kadapa ↔ Tirupati Airport (TIR) — ₹2,499',
      'Kadapa → Bangalore Airport (BLR) — ₹5,999',
      'Kadapa → Hyderabad Airport (HYD) — ₹5,499',
      'Kadapa → Chennai Airport (MAA) — ₹5,799',
    ],
    vehicles: ['Executive Sedan', 'Ertiga (7 Seater)', 'Innova Crysta VIP'],
    isSelfDrive: false,
    pickupPlaceholder: 'Kadapa Address / Flight Terminal',
    destinationPlaceholder: 'e.g. Bangalore Airport KIAL Terminal',
  },
  'Local Cabs': {
    tripTypes: ['4 Hours / 40 km (₹999)', '8 Hours / 80 km (₹1,799)', 'Full Day City Package (12 hrs)'],
    vehicles: ['Executive Sedan', 'Ertiga (7 Seater)', 'Innova Crysta'],
    isSelfDrive: false,
    pickupPlaceholder: 'Kadapa Area / Railway Station',
    destinationPlaceholder: 'Local Kadapa City (Optional)',
    hideReturn: true,
  },
  'Tour Packages': {
    tripTypes: [
      'Gandikota Grand Canyon Day Tour (₹2,799)',
      'Belum Caves Day Tour (₹2,499)',
      'Gandikota + Belum Caves Combo (₹3,299)',
      'Ooty Holiday Tour (3D/2N) — ₹12,499',
      'Goa Vacation Package (4D/3N) — ₹15,999',
    ],
    vehicles: ['Executive Sedan', 'Ertiga (7 Seater)', 'Innova Crysta', 'Tempo Traveller'],
    isSelfDrive: false,
    pickupPlaceholder: 'Hotel / Home in Kadapa',
    destinationPlaceholder: 'Sightseeing as per package',
    hideDestination: true,
  },
  'Corporate Travel': {
    tripTypes: ['Executive Airport / Intercity Drop', 'Full Day Plant Visit (8 hrs)', 'Monthly Corporate Retainer'],
    vehicles: ['Toyota Innova Crysta (VIP)', 'Executive Sedan', 'Luxury Urbania'],
    isSelfDrive: false,
    pickupPlaceholder: 'Office / Industrial Area / Hotel',
    destinationPlaceholder: 'e.g. Hyderabad / Bangalore / Plant',
  },
  'Wedding & Events': {
    tripTypes: ['Decorated VIP Wedding Car (Full Day)', 'Multi-Car Baraat Fleet', 'Guest Shuttle Service'],
    vehicles: ['Decorated Innova Crysta (Luxury)', 'White Sedan Fleet', 'Tempo Traveller'],
    isSelfDrive: false,
    pickupPlaceholder: 'Function Hall / Home in Kadapa',
    destinationPlaceholder: 'Reception Venue / Convention Center',
  },
};

export default function BookingForm({ compact = false, defaultService = '' }) {
  const [form, setForm] = useState({
    service: defaultService || 'Outstation Cabs',
    tripType: 'Round Trip Outstation Journey',
    vehicleChoice: 'Executive Sedan',
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
  const opts = SERVICE_OPTIONS[form.service] || SERVICE_OPTIONS['Outstation Cabs'];

  // Keep tripType and vehicleChoice in sync when service changes
  useEffect(() => {
    if (opts) {
      setForm((prev) => ({
        ...prev,
        tripType: opts.tripTypes[0] || '',
        vehicleChoice: opts.vehicles[0] || '',
        destination: opts.isSelfDrive ? 'Return to Kadapa Hub (Self-Drive)' : (prev.destination === 'Return to Kadapa Hub (Self-Drive)' ? '' : prev.destination),
      }));
    }
  }, [form.service]);

  const set = (field, val) => setForm((prev) => ({ ...prev, [field]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.pickup) return;

    const finalDestination = opts.isSelfDrive ? 'Return to Kadapa Hub (Self-Drive)' : (form.destination || 'N/A');

    // 1. Analytics
    trackFormSubmission(form.service || 'General Booking', `${form.pickup} -> ${finalDestination}`);

    // 2. Silently sync lead to API / Google Sheet
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
      passengers: opts.isSelfDrive ? form.vehicleChoice : `${form.passengers} Passengers`,
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
          <p className={styles.formSubtitle}>Instant WhatsApp quote • Reliable travel with zero hidden costs</p>
        </div>
      )}

      {/* Row 1: Service Type & Dynamic Trip / Duration */}
      <div className={styles.row2}>
        <div className="form-group">
          <label className="form-label">Service Type</label>
          <select
            className="form-input"
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
            {opts.isSelfDrive ? 'Rental Duration' : 'Trip / Package Type'}
          </label>
          <select
            className="form-input"
            value={form.tripType}
            onChange={(e) => set('tripType', e.target.value)}
          >
            {opts.tripTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 2: Pickup & (Destination OR Vehicle Choice for Self Drive) */}
      <div className={styles.row2}>
        <div className="form-group">
          <label className="form-label">
            {opts.isSelfDrive ? 'Handover Location in Kadapa *' : 'Pickup Location *'}
          </label>
          <input
            className="form-input"
            type="text"
            required
            placeholder={opts.pickupPlaceholder || 'e.g. Kadapa Bus Stand / Home'}
            value={form.pickup}
            onChange={(e) => set('pickup', e.target.value)}
          />
        </div>

        {opts.isSelfDrive ? (
          <div className="form-group">
            <label className="form-label">Vehicle Category</label>
            <select
              className="form-input"
              value={form.vehicleChoice}
              onChange={(e) => set('vehicleChoice', e.target.value)}
            >
              {opts.vehicles.map((v) => (
                <option key={v} value={v}>
                  🚗 {v}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="form-group">
            <label className="form-label">Destination</label>
            <input
              className="form-input"
              type="text"
              placeholder={opts.destinationPlaceholder || 'e.g. Tirupati / Hyderabad'}
              value={form.destination}
              onChange={(e) => set('destination', e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Row 3: Travel Date & Return Date & Vehicle/Passengers */}
      <div className={styles.row3}>
        <div className="form-group">
          <label className="form-label">
            {opts.isSelfDrive ? 'Start Date' : 'Travel Date'}
          </label>
          <input
            className="form-input"
            type="date"
            min={today}
            value={form.date}
            onChange={(e) => set('date', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            {opts.isSelfDrive ? 'Return Date *' : (opts.hideReturn ? 'Return (Same Day)' : 'Return Date')}
          </label>
          <input
            className="form-input"
            type="date"
            disabled={opts.hideReturn}
            min={form.date || today}
            value={opts.hideReturn ? '' : form.returnDate}
            onChange={(e) => set('returnDate', e.target.value)}
            placeholder={opts.hideReturn ? 'Same Day' : ''}
          />
        </div>

        {!opts.isSelfDrive ? (
          <div className="form-group">
            <label className="form-label">Passengers</label>
            <select
              className="form-input"
              value={form.passengers}
              onChange={(e) => set('passengers', e.target.value)}
            >
              {[1, 2, 3, 4, 5, 6, 7, '8+ (Group)'].map((n) => (
                <option key={n} value={n}>
                  {n} {typeof n === 'number' ? `passenger${n > 1 ? 's' : ''}` : ''}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="form-group">
            <label className="form-label">Fuel Policy</label>
            <input
              className="form-input"
              type="text"
              readOnly
              value="⛽ Customer-Managed"
              style={{ background: 'var(--pearl-bg)', color: 'var(--charcoal-600)', fontSize: '0.82rem' }}
            />
          </div>
        )}
      </div>

      <div className={styles.divider} />

      {/* Row 4: Name & Phone */}
      <div className={styles.row2}>
        <div className="form-group">
          <label className="form-label">Your Name *</label>
          <input
            className="form-input"
            type="text"
            required
            placeholder="Full name"
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
          <label className="form-label">Special Requirements (optional)</label>
          <textarea
            className="form-input"
            rows="2"
            placeholder={
              opts.isSelfDrive
                ? 'e.g. Doorstep delivery address, preferred pickup time (e.g. 9 AM)...'
                : 'e.g. Early morning 4 AM departure, infant car seat, AC Crysta preference...'
            }
            value={form.notes}
            onChange={(e) => set('notes', e.target.value)}
            style={{ resize: 'vertical' }}
          />
        </div>
      )}

      <button type="submit" className={`btn btn--primary btn--lg ${styles.submitBtn}`} id="submit-booking">
        {submitted ? '✅ Opening WhatsApp...' : '💬 Request Instant WhatsApp Quote'}
      </button>

      <p className={styles.submitNote}>
        Direct confirmation with Pavan &amp; Jyothi • 24/7 Fast Support
      </p>
    </form>
  );
}
