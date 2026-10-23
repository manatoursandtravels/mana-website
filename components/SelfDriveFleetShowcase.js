'use client';

import { useState } from 'react';
import Image from 'next/image';
import { BUSINESS } from '@/lib/constants';
import styles from './SelfDriveFleetShowcase.module.css';

const FLEET_VEHICLES = [
  {
    id: 'xuv3xo',
    name: 'Mahindra XUV 3XO (Black Edition)',
    subtitle: 'Turbocharged Compact SUV with Panoramic Skyroof',
    category: '🔥 Flagship Turbo SUV',
    badge: '🔥 2024 New Arrival',
    badgeType: 'vip',
    rating: '5.0 ★ (Brand New 2024 Fleet)',
    img: '/images/fleet-xuv-3xo.png',
    dailyRate: '₹1,999',
    weeklyRate: '₹13,193 (Save ₹800)',
    monthlyRate: '₹32,999 (Save ₹27k)',
    deposit: '₹10,000 Refundable',
    highlightPills: [
      '✦ Panoramic Skyroof',
      '✦ Level 2 ADAS Safety',
      '✦ Turbocharged Power',
      '✦ 100% Customer Fuel',
      '✦ 2-Minute Digital KYC',
      '✦ Free Kadapa Handover',
    ],
    specs: [
      { icon: '👥', label: 'Capacity', val: '5 Passengers' },
      { icon: '🧳', label: 'Boot Space', val: '364 Litres' },
      { icon: '❄️', label: 'AC', val: 'Dual-Zone Climate' },
      { icon: '⛽', label: 'Engine', val: 'Turbocharged Power' },
      { icon: '🕹️', label: 'Gearbox', val: '6-Speed Dynamic' },
      { icon: '⚡', label: 'Tech', val: 'Skyroof & Level 2 ADAS' },
    ],
    bestFor: 'Youth road trips, couples, Gandikota canyon drives & highway escapes with sporty SUV thrill.',
    waMsg: 'Hi Pavan, I want to book the New Black Mahindra XUV 3XO Self-Drive SUV (₹1,999/day).',
  },
  {
    id: 'innova',
    name: 'Toyota Innova Crysta',
    subtitle: 'King of Indian Highways · Executive Luxury',
    category: '👑 Luxury Executive MPV',
    badge: '👑 Executive Class',
    badgeType: 'vip',
    rating: '5.0 ★ (95+ Trips)',
    img: '/images/fleet-innova-crysta.jpg',
    dailyRate: '₹2,999',
    weeklyRate: '₹20,193 (Save ₹800)',
    monthlyRate: '₹44,999 (Save ₹45k)',
    deposit: '₹15,000 Refundable',
    highlightPills: [
      '✦ 7 Captain Seats',
      '✦ Auto Climate Dual AC',
      '✦ High-Torque Diesel',
      '✦ Heavy Tour Luggage',
      '✦ 100% Customer Fuel',
      '✦ Inter-State Permits',
    ],
    specs: [
      { icon: '👥', label: 'Capacity', val: '7 Captain Seats' },
      { icon: '🧳', label: 'Luggage', val: 'Heavy Tour Capacity' },
      { icon: '❄️', label: 'Climate', val: 'Auto Climate Control' },
      { icon: '⛽', label: 'Fuel', val: 'Customer-Managed' },
      { icon: '🕹️', label: 'Engine', val: 'High-Torque Diesel' },
      { icon: '⚡', label: 'Safety', val: 'Airbags & ABS EBD' },
    ],
    bestFor: 'VIP family road trips, wedding entourage, corporate outstations, and Ooty / Goa long drives.',
    waMsg: 'Hi Pavan, I want to book the Toyota Innova Crysta Luxury Self-Drive MPV (₹2,999/day).',
  },
  {
    id: 'ertiga',
    name: 'Maruti Suzuki Ertiga',
    subtitle: 'Smart Hybrid 7-Seater MPV for Family Trips',
    category: '👨‍👩‍👧‍👦 Family Favorite',
    badge: '👨‍👩‍👧‍👦 Best For Families',
    badgeType: 'family',
    rating: '4.9 ★ (85+ Trips)',
    img: '/images/fleet-ertiga-mpv.jpg',
    dailyRate: '₹2,199',
    weeklyRate: '₹14,593 (Save ₹800)',
    monthlyRate: '₹34,999 (Save ₹30k)',
    deposit: '₹15,000 Refundable',
    highlightPills: [
      '✦ 7 Comfortable Seats',
      '✦ Roof AC Blower Vents',
      '✦ Smart Hybrid Fuel Economy',
      '✦ Foldable 3rd Row',
      '✦ 100% Customer Fuel',
      '✦ All-South India Permits',
    ],
    specs: [
      { icon: '👥', label: 'Capacity', val: '7 Passengers' },
      { icon: '🧳', label: 'Luggage', val: 'Foldable 3rd Row' },
      { icon: '❄️', label: 'Dual AC', val: 'Roof Blower Vents' },
      { icon: '⛽', label: 'Fuel', val: 'Customer-Managed' },
      { icon: '🕹️', label: 'Gearbox', val: 'Smooth Manual' },
      { icon: '⚡', label: 'Permits', val: 'AP & All-South India' },
    ],
    bestFor: 'Joint family pilgrimages to Srisailam & Tirumala, holiday tours, and group vacations.',
    waMsg: 'Hi Pavan, I want to book the Maruti Suzuki Ertiga 7-Seater Self-Drive MPV (₹2,199/day).',
  },
  {
    id: 'sedan',
    name: 'Toyota Etios / Swift Dzire',
    subtitle: 'Executive Economy Sedan for City & Commutes',
    category: '⚡ Most Economical',
    badge: '⚡ Most Popular Value',
    badgeType: 'popular',
    rating: '5.0 ★ (120+ Trips)',
    img: '/images/fleet-etios-sedan.jpg',
    dailyRate: '₹1,499',
    weeklyRate: '₹9,693 (Save ₹800)',
    monthlyRate: '₹24,999 (Save ₹20k)',
    deposit: '₹10,000 Refundable',
    highlightPills: [
      '✦ High Fuel Mileage',
      '✦ 592L Deep Boot Space',
      '✦ Chilled AC Cabin',
      '✦ Pre-loaded FASTag',
      '✦ 100% Customer Fuel',
      '✦ 2-Min KYC Handover',
    ],
    specs: [
      { icon: '👥', label: 'Capacity', val: '5 Passengers' },
      { icon: '🧳', label: 'Boot Space', val: '592 Litres' },
      { icon: '❄️', label: 'AC', val: 'Chilled Air Con' },
      { icon: '⛽', label: 'Fuel', val: 'Customer-Managed' },
      { icon: '🕹️', label: 'Gearbox', val: '5-Speed Manual' },
      { icon: '⚡', label: 'FASTag', val: 'Active & Pre-loaded' },
    ],
    bestFor: 'City commutes, family temple visits & weekend trips to Tirupati & Gandikota.',
    waMsg: 'Hi Pavan, I want to book the Toyota Etios / Swift Dzire Self-Drive car (₹1,499/day).',
  },
];

export default function SelfDriveFleetShowcase() {
  const [activeId, setActiveId] = useState('xuv3xo');

  const activeCar = FLEET_VEHICLES.find((c) => c.id === activeId) || FLEET_VEHICLES[0];

  const handleScrollToForm = () => {
    const target =
      document.getElementById('booking') ||
      document.getElementById('booking-section') ||
      document.getElementById('booking-form');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        const select = target.querySelector('select');
        if (select) select.focus({ preventScroll: true });
      }, 700);
    }
  };

  return (
    <div className={styles.fleetWrapper}>
      {/* ══ 1. INTERACTIVE DARK VIRTUAL SHOWROOM ══ */}
      <div className={styles.showroomConsole}>
        {/* Tab Switcher Header */}
        <div className={styles.showroomTabs} role="tablist" aria-label="Select vehicle to inspect">
          {FLEET_VEHICLES.map((car) => {
            const isActive = car.id === activeId;
            return (
              <button
                key={car.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(car.id)}
                className={`${styles.tabBtn} ${isActive ? styles.tabBtnActive : ''}`}
              >
                <span className={styles.tabDot} />
                <span className={styles.tabTitle}>{car.name.split(' (')[0]}</span>
                <span className={styles.tabRate}>{car.dailyRate}/d</span>
              </button>
            );
          })}
        </div>

        {/* Center Stage Presentation */}
        <div className={styles.showroomStage}>
          <div className={styles.stageLeft}>
            <div className={styles.stageEyebrowRow}>
              <span className={styles.stageBadge}>{activeCar.badge}</span>
              <span className={styles.stageRating}>{activeCar.rating}</span>
            </div>

            <h3 className={styles.stageTitle}>{activeCar.name}</h3>
            <p className={styles.stageSubtitle}>{activeCar.subtitle}</p>

            {/* Glowing Key Feature Pills */}
            <div className={styles.stageFeatureGrid}>
              {activeCar.highlightPills.map((pill, idx) => (
                <div key={idx} className={styles.featurePill}>
                  {pill}
                </div>
              ))}
            </div>

            {/* Stage Rate Strip */}
            <div className={styles.stagePricingBox}>
              <div className={styles.stagePriceMain}>
                <span className={styles.stageRateSub}>Base Daily Rate</span>
                <div className={styles.stageRateNumRow}>
                  <span className={styles.stageCurrency}>₹</span>
                  <span className={styles.stageRateNum}>{activeCar.dailyRate.replace('₹', '')}</span>
                  <span className={styles.stageRateUnit}>/ 24 Hours</span>
                </div>
                <span className={styles.stageFuelNote}>⛽ 100% Customer-Managed Fuel · Zero Markup</span>
              </div>

              <div className={styles.stageDepositBox}>
                <span className={styles.stageDepLabel}>Security Deposit</span>
                <span className={styles.stageDepVal}>{activeCar.deposit}</span>
                <span className={styles.stageSavingsNote}>{activeCar.weeklyRate}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className={styles.stageCtas}>
              <a
                href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(activeCar.waMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn--primary ${styles.stageWaBtn}`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.116.553 4.103 1.522 5.831L.057 23.428l5.763-1.51A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.922 0-3.71-.522-5.241-1.428l-.376-.223-3.892 1.02 1.038-3.79-.246-.39A9.818 9.818 0 012.182 12C2.182 6.575 6.575 2.182 12 2.182S21.818 6.575 21.818 12 17.425 21.818 12 21.818z" />
                </svg>
                Reserve on WhatsApp
              </a>
              <a
                href={`tel:${BUSINESS.phone.pavan}`}
                className={styles.stageCallBtn}
                title="Call Pavan for car keys"
              >
                📞 Call Pavan: {BUSINESS.phone.pavanDisplay}
              </a>
            </div>
          </div>

          {/* Right Turntable Display */}
          <div className={styles.stageRight}>
            <div className={styles.turntableStage}>
              <div className={styles.stageAura} />
              <div className={styles.stageImageWrap}>
                <Image
                  src={activeCar.img}
                  alt={activeCar.name}
                  fill
                  priority
                  quality={95}
                  className={styles.stageCarImg}
                  sizes="(max-width: 992px) 100vw, 55vw"
                />
              </div>
              <div className={styles.stagePedestal} />
              <div className={styles.stageTurntableRing} />
            </div>
          </div>
        </div>
      </div>

      {/* ══ 2. SIDE-BY-SIDE ALL VEHICLES COMPARISON GRID ══ */}
      <div className={styles.gridHeader}>
        <span className={styles.gridEyebrow}>✦ ALL AVAILABLE SELF-DRIVE VEHICLES ✦</span>
        <h4 className={styles.gridTitle}>Compare Fleet Specifications &amp; Rates</h4>
      </div>

      <div className={styles.grid}>
        {FLEET_VEHICLES.map((car) => {
          const isSelected = car.id === activeId;
          return (
            <div
              key={car.id}
              className={`${styles.card} ${isSelected ? styles.cardSelected : ''}`}
              onClick={() => setActiveId(car.id)}
            >
              {/* Image Wrap with Floating Badges */}
              <div className={styles.imgContainer}>
                <Image
                  src={car.img}
                  alt={car.name}
                  fill
                  quality={85}
                  className={styles.carImg}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className={styles.imgOverlay} />

                <div className={styles.floatingTop}>
                  <span className={`${styles.badge} ${styles.badgeVip}`}>{car.badge}</span>
                  <span className={styles.ratingBadge}>{car.rating}</span>
                </div>

                <div className={styles.floatingBottom}>
                  <span className={styles.categoryPill}>{car.category}</span>
                </div>
              </div>

              {/* Content Body */}
              <div className={styles.body}>
                <div className={styles.titleGroup}>
                  <h3 className={styles.carName}>{car.name}</h3>
                  <p className={styles.carSubtitle}>{car.subtitle}</p>
                </div>

                {/* 2x3 Visual Specs Grid */}
                <div className={styles.specsGrid}>
                  {car.specs.map((s, idx) => (
                    <div key={idx} className={styles.specItem}>
                      <span className={styles.specIcon}>{s.icon}</span>
                      <div className={styles.specContent}>
                        <span className={styles.specLabel}>{s.label}</span>
                        <span className={styles.specValue}>{s.val}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Best For Description */}
                <p className={styles.bestFor}>
                  <strong>Best For:</strong> {car.bestFor}
                </p>

                {/* Pricing & Deposit Card Strip */}
                <div className={styles.pricingStrip}>
                  <div className={styles.priceCol}>
                    <span className={styles.priceSubLabel}>Daily Base Rate</span>
                    <div className={styles.priceMain}>
                      <span className={styles.currency}>₹</span>
                      <span className={styles.priceNum}>{car.dailyRate.replace('₹', '')}</span>
                      <span className={styles.pricePer}>/ 24 Hours</span>
                    </div>
                    <span className={styles.fuelTag}>⛽ Customer-Managed Fuel</span>
                  </div>

                  <div className={styles.depositCol}>
                    <span className={styles.depositLabel}>Deposit:</span>
                    <span className={styles.depositVal}>{car.deposit}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className={styles.actions}>
                  <a
                    href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(car.waMsg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn btn--primary ${styles.waBtn}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.116.553 4.103 1.522 5.831L.057 23.428l5.763-1.51A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.922 0-3.71-.522-5.241-1.428l-.376-.223-3.892 1.02 1.038-3.79-.246-.39A9.818 9.818 0 012.182 12C2.182 6.575 6.575 2.182 12 2.182S21.818 6.575 21.818 12 17.425 21.818 12 21.818z" />
                    </svg>
                    Book on WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleScrollToForm();
                    }}
                    className={styles.secondaryBtn}
                  >
                    Reserve Online ↓
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Fleet Hygiene & Safety Guarantees ── */}
      <div className={styles.safetyStrip}>
        <div className={styles.safetyItem}>
          <span className={styles.safetyIcon}>✨</span>
          <span><strong>Hospital-Grade Sanitisation:</strong> Full chemical cabin wash before every handover</span>
        </div>
        <div className={styles.safetyItem}>
          <span className={styles.safetyIcon}>🔧</span>
          <span><strong>100-Point Inspection:</strong> Brake fluid, tyres, AC cooling, and engine health checked</span>
        </div>
        <div className={styles.safetyItem}>
          <span className={styles.safetyIcon}>📍</span>
          <span><strong>Kadapa Doorstep Handover:</strong> Delivery &amp; pickup available anywhere in town</span>
        </div>
      </div>
    </div>
  );
}
