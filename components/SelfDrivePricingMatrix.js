'use client';

import { useState } from 'react';
import { BUSINESS } from '@/lib/constants';
import styles from './SelfDrivePricingMatrix.module.css';

const PRICING_DATA = {
  sedan: {
    name: 'Executive Sedan',
    models: 'Toyota Etios & Swift Dzire (5-Seater)',
    icon: '🚗',
    deposit: '₹10,000',
    plans: [
      {
        id: '24h',
        name: '24 Hours',
        tag: 'Flexible Daily',
        tagType: 'neutral',
        price: '₹1,499',
        ratePerDay: '₹1,499 / day',
        period: '/ 24 Hours',
        km: '250 km included',
        extraKm: '₹10/km extra',
        popular: false,
        features: [
          '250 km included allowance',
          '₹10/km for extra distance',
          '100% Customer-Managed Fuel',
          '₹10,000 Refundable Deposit',
          'Comprehensive Insurance Covered',
        ],
        waMsg: 'Hi Pavan, I want to book the 24-Hour Self Drive Sedan rental (₹1,499).',
      },
      {
        id: 'weekend',
        name: '3-Day Weekend',
        tag: 'Save ₹300',
        tagType: 'green',
        price: '₹4,199',
        ratePerDay: '₹1,399 / day',
        period: '/ 72 Hours',
        km: '750 km included',
        extraKm: '₹10/km extra',
        popular: false,
        features: [
          '750 km included travel allowance',
          'Ideal for Tirupati, Srisailam & Gandikota',
          '100% Customer-Managed Fuel',
          'Active FASTag & Inter-State Permits',
          'Free Hub Handover in Kadapa',
        ],
        waMsg: 'Hi Pavan, I want to book the 3-Day Weekend Self Drive Sedan plan (₹4,199).',
      },
      {
        id: 'weekly',
        name: 'Weekly (7 Days)',
        tag: '🔥 Flat ₹800 OFF • Most Popular',
        tagType: 'featured',
        price: '₹9,693',
        originalPrice: '₹10,493',
        ratePerDay: '₹1,385 / day',
        period: '/ 7 Full Days',
        km: '1,750 km included',
        extraKm: '₹10/km extra',
        popular: true,
        features: [
          '1,750 km generous travel allowance',
          'Instant ₹800 Promo Discount applied',
          '100% Customer-Managed Fuel',
          'Priority Doorstep Handover in Kadapa',
          'Spotless Sanitisation & Vehicle Checkup',
        ],
        waMsg: 'Hi Pavan, I want to book the 7-Day Weekly Self Drive Sedan plan (₹9,693 with ₹800 OFF).',
      },
      {
        id: 'monthly',
        name: 'Monthly (30 Days)',
        tag: '💎 44% OFF • Ultra-Saver',
        tagType: 'vip',
        price: '₹24,999',
        originalPrice: '₹44,970',
        ratePerDay: 'Effective ₹833 / day',
        period: '/ 30 Days',
        km: '3,000 km included',
        extraKm: '₹9/km extra',
        popular: false,
        vip: true,
        features: [
          'Effective ₹833 / day — Cheaper than EMI',
          '3,000 km generous monthly allowance',
          'Zero Maintenance & Servicing charges',
          '1 Free Weekend 7-Seater MPV Swap',
          '5% Loyalty Renewal Discount on M2',
        ],
        waMsg: 'Hi Pavan, I want to inquire about the 30-Day Executive Sedan Monthly Subscription (₹24,999).',
      },
    ],
  },
  mpv: {
    name: '7-Seater Luxury MPV',
    models: 'Maruti Ertiga & Toyota Innova (7-Seater)',
    icon: '🚙',
    deposit: '₹15,000',
    plans: [
      {
        id: '24h',
        name: '24 Hours',
        tag: 'Family Daily',
        tagType: 'neutral',
        price: '₹2,499',
        ratePerDay: '₹2,499 / day',
        period: '/ 24 Hours',
        km: '250 km included',
        extraKm: '₹13/km extra',
        popular: false,
        features: [
          '7 Adults Comfortable Seating',
          '250 km included daily allowance',
          'Dual AC with Chilled Rear Vents',
          '100% Customer-Managed Fuel',
          '₹15,000 Refundable Deposit',
        ],
        waMsg: 'Hi Pavan, I want to book the 24-Hour Self Drive 7-Seater MPV rental (₹2,499).',
      },
      {
        id: 'weekend',
        name: '3-Day Weekend',
        tag: 'Save ₹500',
        tagType: 'green',
        price: '₹6,999',
        ratePerDay: '₹2,333 / day',
        period: '/ 72 Hours',
        km: '750 km included',
        extraKm: '₹13/km extra',
        popular: false,
        features: [
          '750 km family travel allowance',
          'Perfect for Tirumala, Goa & Ooty',
          'Massive Luggage Space with Foldable 3rd Row',
          'Active FASTag & Interstate Permits',
          '100% Customer-Managed Fuel',
        ],
        waMsg: 'Hi Pavan, I want to book the 3-Day Weekend Self Drive 7-Seater MPV plan (₹6,999).',
      },
      {
        id: 'weekly',
        name: 'Weekly (7 Days)',
        tag: '🔥 Flat ₹1,500 OFF • Family Choice',
        tagType: 'featured',
        price: '₹15,993',
        originalPrice: '₹17,493',
        ratePerDay: '₹2,284 / day',
        period: '/ 7 Full Days',
        km: '1,750 km included',
        extraKm: '₹13/km extra',
        popular: true,
        features: [
          '1,750 km long-haul allowance',
          'Instant ₹1,500 Group Promo applied',
          '100% Customer-Managed Fuel',
          'Priority Doorstep Handover in Kadapa',
          'Full Highway Safety & Tire Inspection',
        ],
        waMsg: 'Hi Pavan, I want to book the 7-Day Weekly Self Drive 7-Seater MPV plan (₹15,993).',
      },
      {
        id: 'monthly',
        name: 'Monthly (30 Days)',
        tag: '💎 47% OFF • Corporate / NRI',
        tagType: 'vip',
        price: '₹39,999',
        originalPrice: '₹74,970',
        ratePerDay: 'Effective ₹1,333 / day',
        period: '/ 30 Days',
        km: '3,500 km included',
        extraKm: '₹12/km extra',
        popular: false,
        vip: true,
        features: [
          'Effective ₹1,333 / day for 7 Seats',
          '3,500 km massive monthly allowance',
          'Zero Maintenance & Periodic Servicing',
          'Free Doorstep Maintenance Pickup',
          'Ideal for Corporate & NRI Vacations',
        ],
        waMsg: 'Hi Pavan, I want to inquire about the 30-Day 7-Seater MPV Monthly Subscription (₹39,999).',
      },
    ],
  },
};

export default function SelfDrivePricingMatrix() {
  const [vehicleType, setVehicleType] = useState('sedan');
  const activeData = PRICING_DATA[vehicleType];

  const handleScrollToForm = (planName) => {
    const target =
      document.getElementById('booking') ||
      document.getElementById('booking-section') ||
      document.getElementById('booking-form');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Focus after scroll
      setTimeout(() => {
        const select = target.querySelector('select');
        if (select) select.focus({ preventScroll: true });
      }, 700);
    }
  };

  return (
    <div className={styles.matrixWrapper}>
      {/* ── Vehicle Category Segmented Toggle ── */}
      <div className={styles.toggleContainer}>
        <div className={styles.togglePill}>
          <button
            type="button"
            className={`${styles.toggleBtn} ${vehicleType === 'sedan' ? styles.toggleBtnActive : ''}`}
            onClick={() => setVehicleType('sedan')}
          >
            <span className={styles.toggleIcon}>🚗</span>
            <div className={styles.toggleText}>
              <span className={styles.toggleTitle}>Executive Sedans</span>
              <span className={styles.toggleSub}>Etios / Dzire • 5 Seats</span>
            </div>
          </button>

          <button
            type="button"
            className={`${styles.toggleBtn} ${vehicleType === 'mpv' ? styles.toggleBtnActive : ''}`}
            onClick={() => setVehicleType('mpv')}
          >
            <span className={styles.toggleIcon}>🚙</span>
            <div className={styles.toggleText}>
              <span className={styles.toggleTitle}>7-Seater MPVs</span>
              <span className={styles.toggleSub}>Ertiga / Innova • 7 Seats</span>
            </div>
          </button>
        </div>

        <div className={styles.vehicleContextBanner}>
          <span>Showing guaranteed pricing for: <strong>{activeData.models}</strong></span>
          <span className={styles.depositNote}>• Refundable Deposit: <strong>{activeData.deposit}</strong></span>
        </div>
      </div>

      {/* ── 4-Tier Luxury Pricing Grid ── */}
      <div className={styles.pricingGrid}>
        {activeData.plans.map((plan) => {
          const isFeatured = plan.popular;
          const isVip = plan.vip;

          return (
            <div
              key={plan.id}
              className={`
                ${styles.card}
                ${isFeatured ? styles.cardFeatured : ''}
                ${isVip ? styles.cardVip : ''}
              `}
            >
              {/* Badge */}
              <div
                className={`
                  ${styles.badge}
                  ${plan.tagType === 'featured' ? styles.badgeFeatured : ''}
                  ${plan.tagType === 'green' ? styles.badgeGreen : ''}
                  ${plan.tagType === 'vip' ? styles.badgeVip : ''}
                  ${plan.tagType === 'neutral' ? styles.badgeNeutral : ''}
                `}
              >
                {plan.tag}
              </div>

              {/* Plan Header */}
              <div className={styles.cardHeader}>
                <h3 className={styles.planName}>{plan.name}</h3>
                <div className={styles.ratePill}>{plan.ratePerDay}</div>
              </div>

              {/* Price Display */}
              <div className={styles.priceRow}>
                <div className={styles.priceWrap}>
                  <span className={styles.currency}>₹</span>
                  <span className={styles.amount}>{plan.price.replace('₹', '')}</span>
                </div>
                {plan.originalPrice && (
                  <span className={styles.originalPrice}>{plan.originalPrice}</span>
                )}
                <span className={styles.period}>{plan.period}</span>
              </div>

              {/* Km Allowance Callout */}
              <div className={styles.kmBanner}>
                <span className={styles.kmIcon}>🛣️</span>
                <span><strong>{plan.km}</strong> ({plan.extraKm})</span>
              </div>

              {/* Features List */}
              <ul className={styles.featureList}>
                {plan.features.map((feat, idx) => (
                  <li key={idx} className={styles.featureItem}>
                    <span className={styles.checkIcon}>✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* Action Buttons */}
              <div className={styles.cardActions}>
                <a
                  href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(plan.waMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn ${isVip ? 'btn--primary' : isFeatured ? 'btn--brass' : 'btn--charcoal'} ${styles.mainBtn}`}
                >
                  💬 Book {plan.name}
                </a>
                <button
                  type="button"
                  onClick={() => handleScrollToForm(plan.name)}
                  className={styles.secondaryLink}
                >
                  Or fill booking form ↓
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── 4 Pillar Guarantee Strip ── */}
      <div className={styles.guaranteeStrip}>
        <div className={styles.guaranteeItem}>
          <div className={styles.guaranteeIcon}>🛡️</div>
          <div>
            <div className={styles.guaranteeTitle}>Comprehensive Insurance</div>
            <div className={styles.guaranteeSub}>100% collision &amp; zero hassle coverage</div>
          </div>
        </div>

        <div className={styles.guaranteeItem}>
          <div className={styles.guaranteeIcon}>⛽</div>
          <div>
            <div className={styles.guaranteeTitle}>Customer-Managed Fuel</div>
            <div className={styles.guaranteeSub}>Pick up full, return full · 0% fuel markup</div>
          </div>
        </div>

        <div className={styles.guaranteeItem}>
          <div className={styles.guaranteeIcon}>⚡</div>
          <div>
            <div className={styles.guaranteeTitle}>2-Min Digital KYC</div>
            <div className={styles.guaranteeSub}>Aadhaar &amp; Driving License online verification</div>
          </div>
        </div>

        <div className={styles.guaranteeItem}>
          <div className={styles.guaranteeIcon}>💸</div>
          <div>
            <div className={styles.guaranteeTitle}>Instant Deposit Return</div>
            <div className={styles.guaranteeSub}>Refunded on vehicle handover spot</div>
          </div>
        </div>
      </div>
    </div>
  );
}
