'use client';

import Link from 'next/link';
import { BUSINESS } from '@/lib/constants';
import styles from './offline.module.css';

export default function OfflinePage() {
  return (
    <main className={styles.offlineMain}>
      <div className={`container ${styles.offlineContainer}`}>
        {/* Radar Icon / Status */}
        <div className={styles.iconWrap}>
          <div className={styles.radarWave} />
          <span className={styles.icon}>📡</span>
        </div>

        <div className={styles.statusBadge}>
          <span className={styles.statusDot} />
          Highway Low-Connectivity Mode
        </div>

        <h1 className={styles.title}>You&apos;re Offline, But We&apos;re Still Here</h1>
        <p className={styles.subtitle}>
          Traveling through a highway network blindspot or remote ghat road? Don&apos;t worry — you can still reach our dispatch desk directly via phone call.
        </p>

        {/* 1-Tap Emergency Phone Callers */}
        <div className={styles.callCards}>
          <a href={`tel:${BUSINESS.phone.pavan}`} className={styles.callCard}>
            <div className={styles.callIcon}>📞</div>
            <div className={styles.callDetails}>
              <div className={styles.callRole}>MANA Operations Desk</div>
              <div className={styles.callName}>Call Pavan</div>
              <div className={styles.callNum}>{BUSINESS.phone.pavanDisplay}</div>
            </div>
            <span className={styles.tapCallBadge}>Tap to Call</span>
          </a>

          <a href={`tel:${BUSINESS.phone.jyothi}`} className={styles.callCard}>
            <div className={styles.callIcon}>📞</div>
            <div className={styles.callDetails}>
              <div className={styles.callRole}>Customer Support & Booking</div>
              <div className={styles.callName}>Call Jyothi</div>
              <div className={styles.callNum}>{BUSINESS.phone.jyothiDisplay}</div>
            </div>
            <span className={styles.tapCallBadge}>Tap to Call</span>
          </a>
        </div>

        {/* Offline Popular Tariffs Snapshot */}
        <div className={styles.tariffSnapshot}>
          <h2 className={styles.tariffTitle}>⚡ Popular Fixed Fares (Snapshot)</h2>
          <div className={styles.tariffGrid}>
            <div className={styles.tariffItem}>
              <span className={styles.tariffRoute}>🛕 Kadapa ↔ Tirupati Balaji</span>
              <span className={styles.tariffPrice}>₹2,099</span>
            </div>
            <div className={styles.tariffItem}>
              <span className={styles.tariffRoute}>✈️ Kadapa ↔ Bangalore Airport</span>
              <span className={styles.tariffPrice}>₹5,499</span>
            </div>
            <div className={styles.tariffItem}>
              <span className={styles.tariffRoute}>🏜️ Kadapa ↔ Gandikota Full Day</span>
              <span className={styles.tariffPrice}>₹2,799</span>
            </div>
            <div className={styles.tariffItem}>
              <span className={styles.tariffRoute}>🔑 Self-Drive Luxury Car (Day)</span>
              <span className={styles.tariffPrice}>₹1,499/day</span>
            </div>
          </div>
        </div>

        {/* Reconnect Trigger */}
        <div className={styles.actions}>
          <button
            onClick={() => window.location.reload()}
            className="btn btn--primary btn--lg"
          >
            🔄 Check Connection & Refresh
          </button>
          <Link href="/" className={styles.homeLink}>
            Return to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
