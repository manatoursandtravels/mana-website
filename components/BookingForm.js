'use client';

import { useState, useEffect } from 'react';
import { SERVICES, RATES, buildWhatsAppMessage } from '@/lib/constants';
import { trackFormSubmission } from '@/lib/analytics';
import styles from './BookingForm.module.css';

// Master Dynamic Service Configurations with Pricing & Context Add-ons
const DYNAMIC_SERVICES = {
  'Self Drive': {
    icon: '🔑',
    label: 'Self Drive',
    badge: '₹800 OFF on 7 Days',
    estimateFormula: (plan, veh) => {
      if (plan.includes('Monthly')) return '₹24,999 / mo (₹833/day)';
      if (plan.includes('Weekly')) return '₹9,693 (Save ₹800)';
      if (plan.includes('3-Day')) return '₹4,199 (Save ₹300)';
      if (veh.includes('Innova')) return '₹2,999 / day';
      if (veh.includes('Ertiga')) return '₹2,199 / day';
      return '₹1,499 / day';
    },
    tripTypes: [
      { label: 'Daily Rental (24 Hours)', price: 'From ₹1,499' },
      { label: '3-Day Weekend Trip', price: '₹4,199' },
      { label: 'Weekly Plan (7 Days)', price: '₹9,693 (Save ₹800)' },
      { label: 'Monthly Membership (30 Days)', price: '₹24,999 (₹833/day)' },
    ],
    vehicles: [
      { name: 'Executive Sedan (Etios / Dzire)', desc: '5 Seats · 592L Boot · Chilled AC' },
      { name: 'Family MPV (Maruti Ertiga)', desc: '7 Seats · Flexible Luggage · Dual AC' },
      { name: 'VIP Luxury MPV (Innova Crysta)', desc: '7 Captain Seats · Rear AC · Luxury' },
    ],
    pickupLabel: 'Handover / Delivery Address in Kadapa *',
    pickupPlaceholder: 'e.g. Kadapa Hub Pickup or Doorstep Address',
    hideDestination: true,
    destinationDefault: 'Return to Kadapa Hub (Self-Drive)',
    hideReturnDate: false,
    returnDateLabel: 'Vehicle Return / Drop-off Date *',
    hidePassengers: true,
    timeSlots: ['Morning (8:00 AM - 10:00 AM)', 'Noon (12:00 PM - 2:00 PM)', 'Evening (5:00 PM - 7:00 PM)', 'Night (8:00 PM - 10:00 PM)'],
    addOns: [
      'Doorstep Delivery & Pickup in Kadapa',
      'Interstate Permit & Active FASTag',
      'Need Extra Driver Authorization',
      'Baby / Child Safety Seat',
    ],
    infoBanner: '⛽ 100% Customer-Managed Fuel policy. Return car at Kadapa hub at same fuel level. ₹10,000 refundable security deposit on handover.',
  },

  'Pilgrimage Tours': {
    icon: '🛕',
    label: 'Pilgrimage Tours',
    badge: 'Darshan Timed',
    estimateFormula: (plan) => {
      if (plan.includes('Tirupati')) return '₹2,099 One-Way / ₹3,499 Round-Trip';
      if (plan.includes('Srisailam')) return '₹2,299 One-Way / ₹3,799 Round-Trip';
      if (plan.includes('Ahobilam')) return '₹1,799 One-Way / ₹2,999 Round-Trip';
      return 'Fixed Pilgrimage Fares';
    },
    tripTypes: [
      { label: 'Kadapa ↔ Tirumala Tirupati Darshan', price: '₹3,499 Round-Trip' },
      { label: 'Kadapa ↔ Srisailam Jyotirlinga (2 Days)', price: '₹3,799 Round-Trip' },
      { label: 'Kadapa ↔ Ahobilam Nava Narasimha', price: '₹2,999 Round-Trip' },
      { label: 'Kadapa ↔ Mahanandi & Yaganti Circuit', price: '₹3,299 Round-Trip' },
      { label: 'Kadapa ↔ Srikalahasti & Kanipakam', price: '₹3,699 Round-Trip' },
    ],
    vehicles: [
      { name: 'Comfort Sedan (Etios / Dzire)', desc: 'Up to 4 Passengers · 2 Bags' },
      { name: 'Maruti Ertiga (7 Seater)', desc: 'Up to 6 Passengers · Good Luggage' },
      { name: 'Toyota Innova Crysta (VIP)', desc: 'Up to 7 Passengers · Luxury Recliners' },
      { name: 'Tempo Traveller (12–26 Seats)', desc: 'Large Family & Group Pilgrimages' },
    ],
    pickupLabel: 'Pickup Address in Kadapa *',
    pickupPlaceholder: 'e.g. Home / Hotel / Kadapa Rly Station',
    hideDestination: false,
    destinationLabel: 'Sacred Temples & Darshan Points *',
    destinationPlaceholder: 'e.g. Tirumala Balaji + Padmavathi Temple',
    hideReturnDate: false,
    returnDateLabel: 'Darshan Return Date',
    hidePassengers: false,
    timeSlots: ['Early Morning (3:30 AM - 5:00 AM)', 'Morning (6:00 AM - 8:00 AM)', 'Afternoon (1:00 PM - 3:00 PM)', 'Night (9:00 PM - 11:00 PM)'],
    addOns: [
      'Early Morning 4 AM Departure for Darshan',
      'Senior Citizen / Wheelchair Friendly Chauffeur',
      'Telugu & English Speaking Driver',
      'Multiple Temple Stops on Route',
    ],
    infoBanner: '🛕 Experienced chauffeurs familiar with temple hill ghats, darshan dress codes, and token timings.',
  },

  'Outstation Cabs': {
    icon: '🛣️',
    label: 'Outstation Cabs',
    badge: 'From ₹14/km',
    estimateFormula: (plan, veh, dest) => {
      if (dest.toLowerCase().includes('bangalore')) return '₹5,499 One-Way / ₹9,499 Round-Trip';
      if (dest.toLowerCase().includes('hyderabad')) return '₹4,999 One-Way / ₹8,499 Round-Trip';
      if (dest.toLowerCase().includes('chennai')) return '₹5,299 One-Way / ₹9,299 Round-Trip';
      if (veh.includes('Innova')) return '₹16 / km (Min 250 km/day)';
      return '₹14 / km (Min 250 km/day)';
    },
    tripTypes: [
      { label: 'One Way Intercity Drop', price: 'Fixed Upfront Fares' },
      { label: 'Round Trip Outstation Journey', price: 'From ₹14/km' },
      { label: 'Multi-Day Multi-City Tour', price: 'Custom Itinerary' },
    ],
    vehicles: [
      { name: 'Executive Sedan (Etios / Dzire)', desc: '1-4 Passengers · ₹14/km' },
      { name: 'Maruti Ertiga (7 Seater)', desc: '5-6 Passengers · ₹15/km' },
      { name: 'Toyota Innova Crysta (Luxury)', desc: 'VIP Comfort · ₹16/km' },
      { name: 'Tempo Traveller (12+ Seater)', desc: 'Large Groups · ₹22/km' },
    ],
    pickupLabel: 'Pickup Location in Kadapa *',
    pickupPlaceholder: 'e.g. Home address / Kadapa Bus Stand',
    hideDestination: false,
    destinationLabel: 'Destination City / Address *',
    destinationPlaceholder: 'e.g. Bangalore (Whitefield) / Hyderabad (Gachibowli)',
    hideReturnDate: false,
    returnDateLabel: 'Return Date (If Round Trip)',
    hidePassengers: false,
    timeSlots: ['Early Morning (4:00 AM - 6:00 AM)', 'Morning (7:00 AM - 10:00 AM)', 'Afternoon (1:00 PM - 4:00 PM)', 'Night (8:00 PM - 11:00 PM)'],
    addOns: [
      'Dual Chauffeur for Overnight Journey',
      'Roof Luggage Carrier Carrier Needed',
      'Pet Friendly Vehicle',
      'Multiple City Drop-offs',
    ],
    infoBanner: '🛣️ Complete upfront pricing. Commercial yellow plate vehicles with active National FASTag.',
  },

  'Airport Transfers': {
    icon: '✈️',
    label: 'Airport Transfers',
    badge: 'Fixed Fare',
    estimateFormula: (plan) => {
      if (plan.includes('Tirupati')) return '₹2,499 (Fixed Price)';
      if (plan.includes('Hyderabad')) return '₹5,499 (Fixed Price)';
      if (plan.includes('Bangalore')) return '₹5,999 (Fixed Price)';
      if (plan.includes('Chennai')) return '₹5,799 (Fixed Price)';
      return 'Fixed Airport Transfer Rates';
    },
    tripTypes: [
      { label: 'Kadapa ↔ Tirupati Airport (TIR)', price: '₹2,499' },
      { label: 'Kadapa → Bangalore Airport (BLR / KIAL)', price: '₹5,999' },
      { label: 'Kadapa → Hyderabad Airport (HYD / RGIA)', price: '₹5,499' },
      { label: 'Kadapa → Chennai Airport (MAA)', price: '₹5,799' },
    ],
    vehicles: [
      { name: 'Executive AC Sedan', desc: '1-4 Pax · Fits 2 Large Suitcases' },
      { name: 'Maruti Ertiga 7-Seater', desc: 'Fits 4-5 Pax + 4 Large Suitcases' },
      { name: 'Toyota Innova Crysta VIP', desc: 'VIP Chauffeur + Heavy Luggage Space' },
    ],
    pickupLabel: 'Pickup Address in Kadapa / Flight Terminal *',
    pickupPlaceholder: 'e.g. Home address in Kadapa / Airport Terminal',
    hideDestination: false,
    destinationLabel: 'Airport / Final Drop Location *',
    destinationPlaceholder: 'e.g. Bangalore Airport Terminal 1 / 2',
    hideReturnDate: false,
    returnDateLabel: 'Return Flight Pickup Date',
    hidePassengers: false,
    timeSlots: ['Early Morning (1:00 AM - 4:00 AM)', 'Morning (5:00 AM - 9:00 AM)', 'Afternoon (12:00 PM - 4:00 PM)', 'Night (7:00 PM - 11:00 PM)'],
    addOns: [
      'Live Flight Number Tracking & Delay Protection',
      'Nameboard Meet & Greet at Arrivals',
      'Extra Luggage Space / Boot Space Assistance',
    ],
    infoBanner: '✈️ 24/7 on-time flight arrival & drop guarantee. Chauffeur tracks your flight number in real time.',
  },

  'Local Cabs': {
    icon: '🚗',
    label: 'Local Cabs',
    badge: 'From ₹999',
    estimateFormula: (plan) => {
      if (plan.includes('4 Hours')) return '₹999 (4 hrs / 40 km)';
      if (plan.includes('8 Hours')) return '₹1,799 (8 hrs / 80 km)';
      return '₹1,499 / Package';
    },
    tripTypes: [
      { label: '4 Hours / 40 km Package', price: '₹999' },
      { label: '8 Hours / 80 km Package', price: '₹1,799' },
      { label: 'Full Day City Package (12 hrs / 120 km)', price: '₹2,499' },
    ],
    vehicles: [
      { name: 'Executive Sedan', desc: 'Driver + AC + Fuel included' },
      { name: 'Ertiga 7-Seater MPV', desc: 'Spacious city travel for family' },
      { name: 'Innova Crysta Luxury', desc: 'VIP city appointments' },
    ],
    pickupLabel: 'Pickup Point in Kadapa *',
    pickupPlaceholder: 'e.g. RIMS Hospital / Railway Station / Home',
    hideDestination: false,
    destinationLabel: 'Local Drop / Places to Visit (Optional)',
    destinationPlaceholder: 'e.g. Ameen Peer Dargah, Devuni Kadapa, Shopping',
    hideReturnDate: true,
    hidePassengers: false,
    timeSlots: ['Morning (8:00 AM - 11:00 AM)', 'Afternoon (1:00 PM - 4:00 PM)', 'Evening (5:00 PM - 9:00 PM)'],
    addOns: [
      'Multiple Pickup Points for Family',
      'Wait & Return Chauffeur Service',
    ],
    infoBanner: '🚗 Chauffeur + AC + Fuel included. Extra km @ ₹13/km, extra hour @ ₹150/hr.',
  },

  'Tour Packages': {
    icon: '🏔️',
    label: 'Tour Packages',
    badge: 'Guided Tours',
    estimateFormula: (plan) => {
      if (plan.includes('Gandikota + Belum')) return '₹3,299 Combo';
      if (plan.includes('Gandikota')) return '₹2,799 Full Day';
      if (plan.includes('Belum')) return '₹2,499 Full Day';
      if (plan.includes('Ooty')) return '₹12,499 (3D/2N)';
      if (plan.includes('Goa')) return '₹15,999 (4D/3N)';
      return 'All-Inclusive Packages';
    },
    tripTypes: [
      { label: 'Gandikota Canyon & Fort Day Tour', price: '₹2,799' },
      { label: 'Belum Caves Day Tour', price: '₹2,499' },
      { label: 'Gandikota + Belum Combo Tour', price: '₹3,299' },
      { label: 'Ooty Nilgiris Tour (3D/2N)', price: '₹12,499' },
      { label: 'Goa Vacation Package (4D/3N)', price: '₹15,999' },
    ],
    vehicles: [
      { name: 'Sedan (Etios / Dzire)', desc: '1-4 Passengers · Fuel & Waiting included' },
      { name: 'Maruti Ertiga (7 Seater)', desc: 'Family Vacation Package' },
      { name: 'Innova Crysta (Luxury)', desc: 'VIP Holiday Comfort' },
      { name: 'Tempo Traveller / Urbania', desc: '12-26 Pax Holiday Group' },
    ],
    pickupLabel: 'Pickup Location in Kadapa *',
    pickupPlaceholder: 'e.g. Hotel / Home in Kadapa',
    hideDestination: true,
    destinationDefault: 'Tour Package Itinerary',
    hideReturnDate: false,
    returnDateLabel: 'Tour Completion Date',
    hidePassengers: false,
    timeSlots: ['Early Morning (6:00 AM - 7:30 AM)', 'Morning (8:00 AM - 9:30 AM)'],
    addOns: [
      'Sightseeing Guide & Viewpoint Assistance',
      'Sunrise / Sunset Gorge Waiting Time',
      'Hotel Booking Assistance',
    ],
    infoBanner: '🏔️ Full day tourist itinerary with all waiting charges and sight-hopping included.',
  },

  'Wedding & Corporate': {
    icon: '💒',
    label: 'Wedding & Corporate',
    badge: 'Executive Fleet',
    estimateFormula: (plan) => {
      if (plan.includes('Wedding')) return '₹2,499 / Day + Decoration';
      return 'GST Corporate Invoicing';
    },
    tripTypes: [
      { label: 'Decorated Bride & Groom VIP Car', price: 'Full Day' },
      { label: 'Multi-Car Baraat Fleet (Sedans + MPVs)', price: 'Custom Fleet' },
      { label: 'Corporate Executive Intercity / Plant Visit', price: 'GST Invoicing' },
      { label: 'Monthly Corporate Retainer', price: 'Credit Account' },
    ],
    vehicles: [
      { name: 'White Innova Crysta (Floral Decorated)', desc: 'VIP Wedding Car' },
      { name: 'Executive White Sedan Fleet', desc: 'Corporate / VIP Escort' },
      { name: 'Force Urbania Luxury (12 Seater)', desc: 'VIP Delegation Shuttle' },
    ],
    pickupLabel: 'Event Venue / Company Office *',
    pickupPlaceholder: 'e.g. Function Hall / Industrial Area / Office',
    hideDestination: false,
    destinationLabel: 'Reception Venue / Plant Location (Optional)',
    destinationPlaceholder: 'e.g. Convention Center / Plant Site',
    hideReturnDate: false,
    returnDateLabel: 'Event / Assignment End Date',
    hidePassengers: false,
    timeSlots: ['Full Day Dedication (24 Hours)', 'Morning Muhurtham (4:00 AM - 12:00 PM)', 'Evening Reception (4:00 PM - 12:00 AM)'],
    addOns: [
      'Fresh Floral Front Bonnet Decoration',
      'Official GST Tax Invoice for Corporate Claim',
      'Chauffeurs in Formal Uniform',
      'Multi-Car Synchronized Coordination',
    ],
    infoBanner: '💒 Pristine, spotless vehicles with disciplined chauffeurs dedicated to your special event.',
  },
};

export default function BookingForm({ compact = false, defaultService = 'Self Drive' }) {
  const [selectedService, setSelectedService] = useState(defaultService);
  const config = DYNAMIC_SERVICES[selectedService] || DYNAMIC_SERVICES['Self Drive'];

  const [form, setForm] = useState({
    service: selectedService,
    tripType: config.tripTypes[0].label,
    vehicleChoice: config.vehicles[0].name,
    pickup: '',
    destination: config.hideDestination ? config.destinationDefault : '',
    date: '',
    timeSlot: config.timeSlots[0],
    returnDate: '',
    passengers: '4',
    selectedAddOns: [],
    name: '',
    phone: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  // When user clicks a service pill, auto-update all dynamic defaults
  const handleServiceChange = (serviceName) => {
    setSelectedService(serviceName);
    const newConfig = DYNAMIC_SERVICES[serviceName] || DYNAMIC_SERVICES['Self Drive'];
    setForm((prev) => ({
      ...prev,
      service: serviceName,
      tripType: newConfig.tripTypes[0].label,
      vehicleChoice: newConfig.vehicles[0].name,
      destination: newConfig.hideDestination ? newConfig.destinationDefault : '',
      timeSlot: newConfig.timeSlots[0],
      selectedAddOns: [],
    }));
  };

  const toggleAddOn = (addon) => {
    setForm((prev) => {
      const exists = prev.selectedAddOns.includes(addon);
      return {
        ...prev,
        selectedAddOns: exists
          ? prev.selectedAddOns.filter((a) => a !== addon)
          : [...prev.selectedAddOns, addon],
      };
    });
  };

  const set = (field, val) => setForm((prev) => ({ ...prev, [field]: val }));

  const currentPriceEstimate = config.estimateFormula(form.tripType, form.vehicleChoice, form.destination);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.pickup) return;

    const finalDestination = config.hideDestination ? config.destinationDefault : form.destination;
    const addOnsText = form.selectedAddOns.length > 0 ? form.selectedAddOns.join(', ') : 'None';

    // 1. Fire Google Analytics Event
    trackFormSubmission(form.service, `${form.pickup} -> ${finalDestination}`);

    // 2. Silently sync comprehensive lead payload to API / Google Sheets CRM
    try {
      fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          destination: finalDestination,
          addOns: addOnsText,
          estimatedPrice: currentPriceEstimate,
          sourceUrl: typeof window !== 'undefined' ? window.location.pathname : '',
        }),
      }).catch(() => {});
    } catch {}

    // 3. Build & Open WhatsApp Message
    const url = buildWhatsAppMessage({
      service: form.service,
      tripType: form.tripType,
      vehicleChoice: form.vehicleChoice,
      pickup: `${form.pickup} (${form.timeSlot})`,
      destination: finalDestination,
      date: form.date,
      returnDate: form.returnDate,
      passengers: config.hidePassengers ? form.vehicleChoice : `${form.passengers} Passengers`,
      notes: [
        form.notes ? `Requirements: ${form.notes}` : null,
        form.selectedAddOns.length > 0 ? `Selected Add-ons: ${addOnsText}` : null,
        `Estimated Package: ${currentPriceEstimate}`,
      ].filter(Boolean).join(' | '),
      name: form.name,
      phone: form.phone,
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <h3 className={styles.formTitle}>Book a Premium Journey</h3>
            <span className="badge badge--brass">{config.badge}</span>
          </div>
          <p className={styles.formSubtitle}>Select your service to load tailored pricing, fleet options &amp; instant quote</p>
        </div>
      )}

      {/* ══ 1. INTERACTIVE SERVICE PILL SELECTOR ══ */}
      <div className={styles.servicePillContainer}>
        {Object.keys(DYNAMIC_SERVICES).map((sKey) => {
          const s = DYNAMIC_SERVICES[sKey];
          const isSelected = selectedService === sKey;
          return (
            <button
              key={sKey}
              type="button"
              onClick={() => handleServiceChange(sKey)}
              className={`${styles.servicePill} ${isSelected ? styles.servicePillActive : ''}`}
            >
              <span>{s.icon}</span>
              <span>{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* ══ 2. DYNAMIC LIVE PRICE ESTIMATE BAR ══ */}
      <div className={styles.priceEstimateBanner}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.2rem' }}>🏷️</span>
          <div>
            <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--charcoal-600)', fontWeight: 700 }}>
              Estimated Starting Fare
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--charcoal-900)', fontFamily: 'var(--font-display)' }}>
              {currentPriceEstimate}
            </div>
          </div>
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--brass-dark)', fontWeight: 700 }}>
          ✓ Fixed Upfront Pricing
        </div>
      </div>

      {/* ══ 3. DYNAMIC TRIP DURATION & VEHICLE CHOICE ══ */}
      <div className={styles.row2}>
        <div className="form-group">
          <label className="form-label">
            {selectedService === 'Self Drive' ? 'Rental Duration *' : 'Package / Route Type *'}
          </label>
          <select
            className="form-input"
            required
            value={form.tripType}
            onChange={(e) => set('tripType', e.target.value)}
          >
            {config.tripTypes.map((t) => (
              <option key={t.label} value={t.label}>
                {t.label} ({t.price})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Vehicle Category *</label>
          <select
            className="form-input"
            required
            value={form.vehicleChoice}
            onChange={(e) => set('vehicleChoice', e.target.value)}
          >
            {config.vehicles.map((v) => (
              <option key={v.name} value={v.name}>
                🚗 {v.name} — {v.desc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ══ 4. PICKUP & DESTINATION (CONTEXT-AWARE) ══ */}
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

      {/* ══ 5. DATES & TIME WINDOW & PASSENGERS ══ */}
      <div className={config.hideReturnDate && config.hidePassengers ? styles.row2 : styles.row3}>
        <div className="form-group">
          <label className="form-label">
            {selectedService === 'Self Drive' ? 'Handover Date *' : 'Travel Date *'}
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

        <div className="form-group">
          <label className="form-label">Preferred Time Window</label>
          <select
            className="form-input"
            value={form.timeSlot}
            onChange={(e) => set('timeSlot', e.target.value)}
          >
            {config.timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                🕒 {slot}
              </option>
            ))}
          </select>
        </div>

        {!config.hideReturnDate && (
          <div className="form-group">
            <label className="form-label">{config.returnDateLabel || 'Return Date'}</label>
            <input
              className="form-input"
              type="date"
              min={form.date || today}
              value={form.returnDate}
              onChange={(e) => set('returnDate', e.target.value)}
            />
          </div>
        )}

        {!config.hidePassengers && (
          <div className="form-group">
            <label className="form-label">Passengers</label>
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

      {/* ══ 6. CONTEXT-AWARE CUSTOM ADD-ONS ══ */}
      {config.addOns && config.addOns.length > 0 && (
        <div className={styles.addOnSection}>
          <div className={styles.addOnTitle}>Custom Preferences &amp; Add-ons (Optional):</div>
          <div className={styles.addOnGrid}>
            {config.addOns.map((addon) => {
              const isChecked = form.selectedAddOns.includes(addon);
              return (
                <button
                  key={addon}
                  type="button"
                  onClick={() => toggleAddOn(addon)}
                  className={`${styles.addOnChip} ${isChecked ? styles.addOnChipActive : ''}`}
                >
                  <span>{isChecked ? '✓' : '+'}</span>
                  <span>{addon}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Service Context Info Banner */}
      {config.infoBanner && (
        <div className={styles.infoBanner}>
          <span>💡</span> <span>{config.infoBanner}</span>
        </div>
      )}

      <div className={styles.divider} />

      {/* ══ 7. CUSTOMER CONTACT DETAILS ══ */}
      <div className={styles.row2}>
        <div className="form-group">
          <label className="form-label">Your Name *</label>
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
          <label className="form-label">Special Notes / Requests</label>
          <textarea
            className="form-input"
            rows="2"
            placeholder="e.g. Flight number, infant car seat, specific pickup landmark..."
            value={form.notes}
            onChange={(e) => set('notes', e.target.value)}
            style={{ resize: 'vertical' }}
          />
        </div>
      )}

      <button type="submit" className={`btn btn--primary btn--lg ${styles.submitBtn}`} id="submit-booking">
        {submitted ? '✅ Opening WhatsApp...' : `💬 Confirm ${selectedService} on WhatsApp`}
      </button>

      <p className={styles.submitNote}>
        Direct confirmation with Pavan &amp; Jyothi • Response in &lt; 15 Minutes
      </p>
    </form>
  );
}
