'use client';

import { useState, useEffect } from 'react';
import { SERVICES, buildWhatsAppMessage } from '@/lib/constants';
import { trackFormSubmission } from '@/lib/analytics';
import styles from './BookingForm.module.css';

// Context-aware options per service
const SERVICE_OPTIONS = {
  'Self Drive': {
    tripTypes: [
      '🎁 New Customer Deal: Pay 1 Day, Drive 2 Days! — ₹1,499',
      'Daily Rental (24 Hours) — ₹1,499',
      '3-Day Weekend — ₹4,199',
      'Weekly Plan (7 Days) + Free MANA T-Shirt! — ₹9,693 (Save ₹800)',
      'Monthly Plan (30 Days) + Free MANA T-Shirt! — ₹24,999',
    ],
    vehicles: [
      'Executive Sedan (5 Seats)',
      'Maruti Ertiga MPV (7 Seats)',
      'Toyota Innova Crysta (7 Seats)',
    ],
    isSelfDrive: true,
    pickupLabel: 'Handover Location in Kadapa *',
    pickupPlaceholder: 'Kadapa Hub / Doorstep Address',
  },
  'Outstation Cabs': {
    tripTypes: ['One Way Intercity Drop', 'Round Trip Journey', 'Multi-City Tour'],
    vehicles: ['Executive Sedan', 'Ertiga (7 Seater)', 'Innova Crysta VIP', 'Tempo Traveller'],
    isSelfDrive: false,
    pickupLabel: 'Pickup Location *',
    pickupPlaceholder: 'Kadapa area / Bus Stand / Home',
    destinationLabel: 'Destination City *',
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
    pickupLabel: 'Pickup Location *',
    pickupPlaceholder: 'Home / Hotel in Kadapa',
    destinationLabel: 'Sacred Temples *',
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
    pickupLabel: 'Pickup Address / Terminal *',
    pickupPlaceholder: 'Kadapa address / Airport Terminal',
    destinationLabel: 'Drop Airport / City *',
    destinationPlaceholder: 'e.g. Bangalore Airport KIAL',
  },
  'Local Cabs': {
    tripTypes: ['4 Hours / 40 km (₹999)', '8 Hours / 80 km (₹1,799)', 'Full Day City Package (12 hrs)'],
    vehicles: ['Executive Sedan', 'Ertiga (7 Seater)', 'Innova Crysta'],
    isSelfDrive: false,
    pickupLabel: 'Pickup Point *',
    pickupPlaceholder: 'Kadapa city area / Railway Station',
    destinationLabel: 'Places to Visit (Optional)',
    destinationPlaceholder: 'Local Kadapa city & heritage stops',
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
    pickupLabel: 'Pickup Location *',
    pickupPlaceholder: 'Hotel / Home in Kadapa',
    destinationLabel: 'Tour Destination',
    destinationPlaceholder: 'Sightseeing as per package',
    hideDestination: true,
  },
  'Corporate Travel': {
    tripTypes: ['Executive Airport / Intercity Drop', 'Full Day Plant Visit (8 hrs)', 'Monthly Corporate Retainer'],
    vehicles: ['Toyota Innova Crysta (VIP)', 'Executive Sedan', 'Luxury Urbania'],
    isSelfDrive: false,
    pickupLabel: 'Company / Pickup Location *',
    pickupPlaceholder: 'Office / Industrial Area / Hotel',
    destinationLabel: 'Plant / Destination *',
    destinationPlaceholder: 'e.g. Hyderabad / Bangalore / Plant',
  },
  'Wedding & Events': {
    tripTypes: ['Decorated VIP Wedding Car (Full Day)', 'Multi-Car Baraat Fleet', 'Guest Shuttle Service'],
    vehicles: ['Decorated Innova Crysta (Luxury)', 'White Sedan Fleet', 'Tempo Traveller'],
    isSelfDrive: false,
    pickupLabel: 'Function Hall / Home *',
    pickupPlaceholder: 'Function Hall name / Kadapa address',
    destinationLabel: 'Reception Venue (Optional)',
    destinationPlaceholder: 'Reception / Convention Center',
  },
};

export default function BookingForm({ compact = false, defaultService = '' }) {
  const [form, setForm] = useState({
    service: defaultService || 'Outstation Cabs',
    tripType: 'Round Trip Journey',
    vehicleChoice: 'Executive Sedan',
    pickup: '',
    destination: '',
    date: '',
    returnDate: '',
    passengers: '4',
    name: '',
    phone: '',
    notes: '',
    tshirtSize: 'L',
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

    let promoOffer = null;
    let tshirtSizeToSend = null;
    if (opts.isSelfDrive) {
      if (form.tripType.includes('Pay 1 Day, Drive 2 Days')) {
        promoOffer = 'Pay 1 Day for 2 Days (New Customer Welcome Deal)';
      } else if (form.tripType.includes('Weekly') || form.tripType.includes('Monthly') || form.tripType.includes('T-Shirt')) {
        promoOffer = 'Weekly VIP Deal (Free Branded T-Shirt)';
        tshirtSizeToSend = `Size ${form.tshirtSize}`;
      }
    }

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
          promoOffer,
          tshirtSize: tshirtSizeToSend,
          sourceUrl: typeof window !== 'undefined' ? window.location.pathname : '',
        }),
      }).catch(() => {});
    } catch {}

    // 3. Build & Open WhatsApp Message
    const url = buildWhatsAppMessage({
      service: form.service,
      tripType: form.tripType,
      promoOffer,
      tshirtSize: tshirtSizeToSend,
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

      {/* 🎁 Promo Dynamic Highlights */}
      {opts.isSelfDrive && form.tripType.includes('Pay 1 Day, Drive 2 Days') && (
        <div className={styles.promoAlertBox}>
          <span className={styles.pabIcon}>🎁</span>
          <div>
            <strong className={styles.pabTitle}>First-Time Customer Special Applied!</strong>
            <p className={styles.pabText}>
              Pay just 1-day rate (₹1,499) and drive for 2 full days (48 hours)! Verified on DL handover in Kadapa.
            </p>
          </div>
        </div>
      )}

      {opts.isSelfDrive && (form.tripType.includes('Weekly') || form.tripType.includes('Monthly') || form.tripType.includes('T-Shirt')) && (
        <div className={styles.tshirtBox}>
          <div className={styles.tshirtHeader}>
            <span className={styles.tshirtIcon}>👕</span>
            <div>
              <strong className={styles.tshirtTitle}>Bonus Unlocked: Free MANA Branded Logo T-Shirt!</strong>
              <p className={styles.tshirtText}>Complimentary 100% premium cotton MANA Tours logo T-Shirt on 7+ day rentals.</p>
            </div>
          </div>
          <div className={styles.tshirtSizePicker}>
            <label className={styles.tshirtSizeLabel}>Choose Your T-Shirt Size:</label>
            <div className={styles.sizeOptions}>
              {['M', 'L', 'XL'].map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`${styles.sizeBtn} ${form.tshirtSize === size ? styles.sizeBtnActive : ''}`}
                  onClick={() => set('tshirtSize', size)}
                >
                  Size {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Row 2: Pickup & (Destination OR Vehicle Choice for Self Drive) */}
      <div className={styles.row2}>
        <div className="form-group">
          <label className="form-label">{opts.pickupLabel || 'Pickup Location *'}</label>
          <input
            className="form-input"
            type="text"
            required
            placeholder={opts.pickupPlaceholder || 'Kadapa area / Bus Stand'}
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
            <label className="form-label">{opts.destinationLabel || 'Destination'}</label>
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

      {/* Row 3: Travel Date & Return Date (Clean 2-Col for Self Drive, 3-Col for Chauffeur) */}
      {opts.isSelfDrive ? (
        <div>
          <div className={styles.row2}>
            <div className="form-group">
              <label className="form-label">Start / Handover Date *</label>
              <input
                className="form-input"
                type="date"
                required
                min={today}
                value={form.date}
                onChange={(e) => set('date', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Return / Drop-off Date *</label>
              <input
                className="form-input"
                type="date"
                required
                min={form.date || today}
                value={form.returnDate}
                onChange={(e) => set('returnDate', e.target.value)}
              />
            </div>
          </div>
          <div className={styles.fuelBadge}>
            <span>⛽ 100% Customer-Managed Fuel Policy</span>
            <span>•</span>
            <span>₹10k Refundable Deposit on Handover</span>
          </div>
        </div>
      ) : (
        <div className={opts.hideReturn ? styles.row2 : styles.row3}>
          <div className="form-group">
            <label className="form-label">Travel Date *</label>
            <input
              className="form-input"
              type="date"
              required
              min={today}
              value={form.date}
              onChange={(e) => set('date', e.target.value)}
            />
          </div>

          {!opts.hideReturn && (
            <div className="form-group">
              <label className="form-label">Return Date</label>
              <input
                className="form-input"
                type="date"
                min={form.date || today}
                value={form.returnDate}
                onChange={(e) => set('returnDate', e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Passengers</label>
            <select
              className="form-input"
              value={form.passengers}
              onChange={(e) => set('passengers', e.target.value)}
            >
              {[1, 2, 3, 4, 5, 6, 7, '8+ Group'].map((n) => (
                <option key={n} value={n}>
                  {n} {typeof n === 'number' ? `Passenger${n > 1 ? 's' : ''}` : ''}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

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
          <input
            className="form-input"
            type="text"
            placeholder={
              opts.isSelfDrive
                ? 'e.g. Doorstep delivery address, preferred 9 AM pickup...'
                : 'e.g. Early morning 4 AM pickup, infant car seat, AC Crysta...'
            }
            value={form.notes}
            onChange={(e) => set('notes', e.target.value)}
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
