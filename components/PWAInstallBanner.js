'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './PWAInstallBanner.module.css';

export default function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);

  useEffect(() => {
    // 1. Check if already running in standalone PWA mode
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;

    if (isStandalone) {
      return;
    }

    // 2. Check if user dismissed recently (7 days snooze)
    const dismissedTime = localStorage.getItem('mana_pwa_dismissed');
    if (dismissedTime) {
      const daysSinceDismiss = (Date.now() - parseInt(dismissedTime, 10)) / (1000 * 60 * 60 * 24);
      if (daysSinceDismiss < 7) {
        return;
      }
    }

    // 3. Detect iOS device
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // 4. Handle Android / Chromium beforeinstallprompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Show banner after 3 seconds for natural UX
      setTimeout(() => setShowBanner(true), 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // If iOS and not standalone, show after 4 seconds
    if (isIosDevice) {
      const timer = setTimeout(() => setShowBanner(true), 4000);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSModal(true);
      return;
    }

    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    setShowIOSModal(false);
    localStorage.setItem('mana_pwa_dismissed', Date.now().toString());
  };

  if (!showBanner) return null;

  return (
    <>
      {/* ── Mobile Floating Install Banner ── */}
      <aside className={styles.installBanner} aria-label="Install MANA Tours Progressive Web App">
        <div className={styles.bannerContent}>
          <div className={styles.appIconWrap}>
            <Image
              src="/icons/icon-192x192.png"
              alt="MANA Tours App Icon"
              width={42}
              height={42}
              className={styles.appIcon}
            />
          </div>

          <div className={styles.appInfo}>
            <div className={styles.appTitle}>Install MANA App</div>
            <div className={styles.appSub}>1-Tap Booking & Offline Fares</div>
          </div>

          <div className={styles.bannerActions}>
            <button onClick={handleInstallClick} className={styles.installBtn} id="pwa-install-btn">
              📲 Install
            </button>
            <button onClick={handleDismiss} className={styles.closeBtn} aria-label="Dismiss install prompt">
              ✕
            </button>
          </div>
        </div>
      </aside>

      {/* ── iOS 2-Step Installation Modal ── */}
      {showIOSModal && (
        <div className={styles.modalOverlay} onClick={handleDismiss}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={handleDismiss} aria-label="Close modal">
              ✕
            </button>
            <div className={styles.modalIcon}>📲</div>
            <h3 className={styles.modalTitle}>Install MANA on iPhone / iPad</h3>
            <p className={styles.modalDesc}>
              Install our web app to your home screen for instant 1-tap cab booking and offline driver contact:
            </p>

            <ol className={styles.stepList}>
              <li>
                Tap the <strong>Share</strong> button <span className={styles.shareIcon}>⎋</span> at the bottom of Safari.
              </li>
              <li>
                Scroll down and tap <strong>&ldquo;Add to Home Screen&rdquo;</strong> <span className={styles.addIcon}>⊞</span>.
              </li>
              <li>
                Tap <strong>&ldquo;Add&rdquo;</strong> in the top-right corner.
              </li>
            </ol>

            <button onClick={handleDismiss} className={styles.modalConfirmBtn}>
              Got It!
            </button>
          </div>
        </div>
      )}
    </>
  );
}
