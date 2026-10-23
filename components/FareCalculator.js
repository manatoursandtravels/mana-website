'use client';

import { useState } from 'react';
import { BUSINESS } from '@/lib/constants';
import styles from './FareCalculator.module.css';

const ROUTES = [
  { id: 'tirupati', name: 'Tirupati (Temple & Airport)', distance: '~250 km' },
  { id: 'bangalore', name: 'Bangalore (City / Airport)', distance: '~280 km' },
  { id: 'hyderabad', name: 'Hyderabad (City / Airport)', distance: '~420 km' },
  { id: 'chennai', name: 'Chennai (City / Central)', distance: '~260 km' },
  { id: 'gandikota', name: 'Gandikota (Grand Canyon of India)', distance: '~120 km' },
  { id: 'srisailam', name: 'Srisailam (Mallikarjuna Swamy)', distance: '~220 km' },
  { id: 'belum', name: 'Belum Caves (Historic Caves)', distance: '~110 km' },
  { id: 'local-4hr', name: 'Kadapa Local (4 Hrs / 40 km)', distance: '40 km' },
  { id: 'local-8hr', name: 'Kadapa Local (8 Hrs / 80 km)', distance: '80 km' },
];

const VEHICLES = [
  { id: 'sedan', name: 'Executive Sedan', models: 'Toyota Etios / Dzire', capacity: '4+1 Seats' },
  { id: 'mpv', name: 'Comfort MPV', models: 'Maruti Ertiga / Carens', capacity: '6+1 Seats' },
  { id: 'luxury', name: 'Luxury Crysta', models: 'Toyota Innova Crysta', capacity: '7+1 Seats' },
];

export default function FareCalculator() {
  const [routeId, setRouteId] = useState('tirupati');
  const [tripType, setTripType] = useState('oneWay');
  const [vehicleId, setVehicleId] = useState('sedan');

  const selectedRoute = ROUTES.find((r) => r.id === routeId) || ROUTES[0];
  const selectedVehicle = VEHICLES.find((v) => v.id === vehicleId) || VEHICLES[0];

  const handleWhatsAppBooking = () => {
    const lines = [
      '*Custom Trip Estimation Request — MANA Tours & Travels*',
      '',
      `*Destination Route:* Kadapa ↔ ${selectedRoute.name}`,
      `*Trip Type:* ${tripType === 'oneWay' ? 'One Way Drop' : 'Round Trip'}`,
      `*Vehicle Required:* ${selectedVehicle.name} (${selectedVehicle.models} · ${selectedVehicle.capacity})`,
      `*Estimated Distance:* ${selectedRoute.distance}`,
      '',
      'Namaskaram Pavan garu, I have selected my trip requirements above. Please share your best discounted fare estimate and confirm vehicle availability.',
    ].join('\n');

    window.open(`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(lines)}`, '_blank');
  };

  return (
    <div className={styles.calcContainer} id="fare-calculator">
      <div className={styles.calcHeader}>
        <div className={styles.calcTitleWrap}>
          <div className={styles.calcIcon}>⚡</div>
          <div>
            <h3 className={styles.calcTitle}>Instant Route &amp; Travel Estimator</h3>
            <p className={styles.calcSubtitle}>Select your destination and vehicle to get our best custom rate estimate</p>
          </div>
        </div>
        <span className={styles.calcBadge}>Guaranteed Best Rates</span>
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

      {/* Summary Box & Action Triggers (No Price Shown - Contact for Custom Estimation) */}
      <div className={styles.resultBox}>
        <div className={styles.resultLeft}>
          <div className={styles.routeBadge}>
            <span className={styles.pulseDot} />
            <span>SELECTED ROUTE &amp; VEHICLE</span>
          </div>

          <div className={styles.selectedRouteTitle}>
            Kadapa ↔ {selectedRoute.name}
          </div>

          <div className={styles.selectedDetailsRow}>
            <span className={styles.detailPill}>
              {tripType === 'oneWay' ? '📍 One Way Drop' : '🔄 Round Trip'}
            </span>
            <span className={styles.detailPill}>
              📏 {selectedRoute.distance}
            </span>
            <span className={styles.detailPill}>
              🚘 {selectedVehicle.name} ({selectedVehicle.capacity})
            </span>
          </div>

          <div className={styles.fareIncludes}>
            <span>Fuel &amp; Chauffeur Included</span>
            <span>Chilled AC Vehicle</span>
            <span>Zero Hidden Charges</span>
            <span>Doorstep Pickup in Kadapa</span>
          </div>
        </div>

        <div className={styles.actionButtonsCol}>
          <div className={styles.actionHint}>
            ⚡ Contact Us for Instant Best Rate Estimation
          </div>

          <a
            href={`tel:${BUSINESS.phone.pavan}`}
            className={styles.callBtn}
            id="cta-calc-call-best-rate"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            <span>Call for Best Rate: {BUSINESS.phone.pavanDisplay}</span>
          </a>

          <button
            type="button"
            onClick={handleWhatsAppBooking}
            className={styles.whatsappBtn}
            id="cta-calc-whatsapp-quote"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.116.553 4.103 1.522 5.831L.057 23.428l5.763-1.51A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.922 0-3.71-.522-5.241-1.428l-.376-.223-3.892 1.02 1.038-3.79-.246-.39A9.818 9.818 0 012.182 12C2.182 6.575 6.575 2.182 12 2.182S21.818 6.575 21.818 12 17.425 21.818 12 21.818z" />
            </svg>
            <span>Ask for Best Rate on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}
