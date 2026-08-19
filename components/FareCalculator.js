'use client';
import { useState } from 'react';
import { BUSINESS } from '@/lib/constants';
import styles from './FareCalculator.module.css';

const ROUTES = [
  { id: 'tirupati', name: 'Tirupati (Temple & Airport)', distance: '~250 km', oneWay: 2099, roundTrip: 3699 },
  { id: 'bangalore', name: 'Bangalore (City / Airport)', distance: '~280 km', oneWay: 5499, roundTrip: 9299 },
  { id: 'hyderabad', name: 'Hyderabad (City / Airport)', distance: '~420 km', oneWay: 5299, roundTrip: 9499 },
  { id: 'chennai', name: 'Chennai (City / Central)', distance: '~260 km', oneWay: 5299, roundTrip: 8999 },
  { id: 'gandikota', name: 'Gandikota (Grand Canyon of India)', distance: '~120 km', oneWay: 1899, roundTrip: 2799 },
  { id: 'srisailam', name: 'Srisailam (Mallikarjuna Swamy)', distance: '~220 km', oneWay: 2999, roundTrip: 4499 },
  { id: 'belum', name: 'Belum Caves (Historic Caves)', distance: '~110 km', oneWay: 1799, roundTrip: 2699 },
  { id: 'local-4hr', name: 'Kadapa Local (4 Hrs / 40 km)', distance: '40 km', oneWay: 1499, roundTrip: 1499 },
  { id: 'local-8hr', name: 'Kadapa Local (8 Hrs / 80 km)', distance: '80 km', oneWay: 2499, roundTrip: 2499 },
];

const VEHICLES = [
  { id: 'sedan', name: 'Executive Sedan', models: 'Toyota Etios / Dzire', mult: 1.0, capacity: '4+1 Seats' },
  { id: 'mpv', name: 'Comfort MPV', models: 'Maruti Ertiga / Carens', mult: 1.35, capacity: '6+1 Seats' },
  { id: 'luxury', name: 'Luxury Crysta', models: 'Toyota Innova Crysta', mult: 1.75, capacity: '7+1 Seats' },
];

export default function FareCalculator() {
  const [routeId, setRouteId] = useState('tirupati');
  const [tripType, setTripType] = useState('oneWay');
  const [vehicleId, setVehicleId] = useState('sedan');

  const selectedRoute = ROUTES.find((r) => r.id === routeId) || ROUTES[0];
  const selectedVehicle = VEHICLES.find((v) => v.id === vehicleId) || VEHICLES[0];

  const basePrice = tripType === 'oneWay' ? selectedRoute.oneWay : selectedRoute.roundTrip;
  const calculatedFare = Math.round(basePrice * selectedVehicle.mult);

  const formattedFare = `₹${calculatedFare.toLocaleString('en-IN')}`;

  const handleWhatsAppBooking = () => {
    const lines = [
      '*Instant Fare Quote Booking — MANA Tours & Travels*',
      '',
      `*Route:* Kadapa ↔ ${selectedRoute.name}`,
      `*Trip Type:* ${tripType === 'oneWay' ? 'One Way Drop' : 'Round Trip'}`,
      `*Vehicle:* ${selectedVehicle.name} (${selectedVehicle.models})`,
      `*Estimated Fare:* ${formattedFare}`,
      `*Distance:* ${selectedRoute.distance}`,
      '',
      'Hi Pavan, I would like to book this trip. Please confirm vehicle availability.',
    ].join('\n');

    window.open(`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(lines)}`, '_blank');
  };

  return (
    <div className={styles.calcContainer} id="fare-calculator">
      <div className={styles.calcHeader}>
        <div className={styles.calcTitleWrap}>
          <div className={styles.calcIcon}>⚡</div>
          <div>
            <h3 className={styles.calcTitle}>Instant Route &amp; Fare Estimator</h3>
            <p className={styles.calcSubtitle}>Select your destination and vehicle for upfront, transparent pricing</p>
          </div>
        </div>
        <span className={styles.calcBadge}>Guaranteed Transparent Rates</span>
      </div>

      {/* Selectors Grid */}
      <div className={styles.calcGrid}>
        <div className="form-group">
          <label className="form-label">Destination Route</label>
          <select
            className="form-input"
            value={routeId}
            onChange={(e) => setRouteId(e.target.value)}
          >
            {ROUTES.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name} ({r.distance})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Trip Type</label>
          <select
            className="form-input"
            value={tripType}
            onChange={(e) => setTripType(e.target.value)}
          >
            <option value="oneWay">One Way Drop</option>
            <option value="roundTrip">Round Trip (Best Value)</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Seating Requirement</label>
          <select
            className="form-input"
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
          >
            {VEHICLES.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name} — {v.capacity}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Vehicle Cards Selector */}
      <div className={styles.vehicleGrid}>
        {VEHICLES.map((v) => (
          <button
            key={v.id}
            type="button"
            className={`${styles.vehicleBtn} ${vehicleId === v.id ? styles.vehicleBtnActive : ''}`}
            onClick={() => setVehicleId(v.id)}
          >
            <div className={styles.vehicleName}>
              {v.name} {vehicleId === v.id && '✓'}
            </div>
            <div className={styles.vehicleDesc}>
              {v.models} · {v.capacity}
            </div>
          </button>
        ))}
      </div>

      {/* Result Breakdown & WhatsApp Trigger */}
      <div className={styles.resultBox}>
        <div className={styles.resultLeft}>
          <span className={styles.resultLabel}>Estimated All-Inclusive Fare</span>
          <div className={styles.farePriceWrap}>
            <span className={styles.farePrice}>{formattedFare}</span>
            <span className={styles.fareNote}>
              ({tripType === 'oneWay' ? 'One Way' : 'Round Trip'} · {selectedRoute.distance})
            </span>
          </div>
          <div className={styles.fareIncludes}>
            <span>Fuel &amp; Chauffeur Included</span>
            <span>Chilled AC</span>
            <span>Zero Hidden Surcharges</span>
            <span>Tolls &amp; Parking at Actuals</span>
          </div>
        </div>

        <button type="button" onClick={handleWhatsAppBooking} className={styles.bookBtn}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.116.553 4.103 1.522 5.831L.057 23.428l5.763-1.51A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.922 0-3.71-.522-5.241-1.428l-.376-.223-3.892 1.02 1.038-3.79-.246-.39A9.818 9.818 0 012.182 12C2.182 6.575 6.575 2.182 12 2.182S21.818 6.575 21.818 12 17.425 21.818 12 21.818z" />
          </svg>
          Book This Fare on WhatsApp
        </button>
      </div>
    </div>
  );
}
