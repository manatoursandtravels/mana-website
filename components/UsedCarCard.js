'use client';
import Image from 'next/image';
import { buildUsedCarWhatsAppMessage } from '@/lib/constants';
import styles from './UsedCarCard.module.css';

export default function UsedCarCard({ car, onOpenDetails, onBookTestDrive }) {
  const waUrl = buildUsedCarWhatsAppMessage(car, 'purchase-inquiry');

  return (
    <div className={styles.card} id={`car-${car.id}`}>
      {/* ── Image & Badges ── */}
      <div className={styles.imageContainer}>
        <Image
          src={car.image}
          alt={`${car.year} ${car.name} in Kadapa`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.carImage}
          priority={car.id === 'mana-uc-01'}
        />
        <div className={styles.imageOverlay} />

        {/* Top Badges */}
        <div className={styles.topBadges}>
          <span className={`${styles.certBadge} ${styles[`certBadge--${car.badgeType || 'gold'}`]}`}>
            {car.badge}
          </span>
          <span className={styles.rtoBadge}>{car.rto}</span>
        </div>

        {/* Bottom Image Badges */}
        {car.savings && <span className={styles.savingsTag}>{car.savings}</span>}
        <span className={styles.scoreBadge}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          {car.inspectionSummary?.overallScore || '95/100'}
        </span>
      </div>

      {/* ── Body ── */}
      <div className={styles.body}>
        <div className={styles.titleArea}>
          <h3 className={styles.carName}>{car.name}</h3>
          <p className={styles.carTagline}>{car.tagline}</p>
        </div>

        {/* Spec Grid */}
        <div className={styles.specGrid}>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>Year</span>
            <span className={styles.specVal}>{car.year}</span>
          </div>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>Fuel</span>
            <span className={styles.specVal}>{car.fuel}</span>
          </div>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>Driven</span>
            <span className={styles.specVal}>{car.kmDisplay}</span>
          </div>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>Owner</span>
            <span className={styles.specVal}>{car.owner}</span>
          </div>
        </div>

        {/* Highlights List */}
        <div className={styles.highlightsList}>
          {car.highlights.slice(0, 3).map((item, idx) => (
            <div key={idx} className={styles.highlightItem}>
              <span className={styles.checkIcon}>✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Price & EMI */}
        <div className={styles.priceBlock}>
          <div className={styles.priceCol}>
            <span className={styles.priceLabel}>Guaranteed Price</span>
            <span className={styles.priceMain}>{car.priceDisplay}</span>
          </div>
          {car.emiStarting && (
            <div className={styles.emiChip}>
              EMI {car.emiStarting}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.viewDetailsBtn}
            onClick={() => onOpenDetails(car)}
            id={`btn-details-${car.id}`}
          >
            <span>📋 150-Pt Report</span>
          </button>
          <button
            type="button"
            className={styles.testDriveBtn}
            onClick={() => onBookTestDrive(car)}
            id={`btn-testdrive-${car.id}`}
          >
            <span>🚗 Test Drive</span>
          </button>
        </div>

        <div className={styles.waRow}>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.waBtn}
            id={`btn-wa-${car.id}`}
          >
            <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.116.553 4.103 1.522 5.831L.057 23.428l5.763-1.51A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.922 0-3.71-.522-5.241-1.428l-.376-.223-3.892 1.02 1.038-3.79-.246-.39A9.818 9.818 0 012.182 12C2.182 6.575 6.575 2.182 12 2.182S21.818 6.575 21.818 12 17.425 21.818 12 21.818z"/>
            </svg>
            <span>WhatsApp Enquiry & Best Offer</span>
          </a>
        </div>
      </div>
    </div>
  );
}
