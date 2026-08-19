'use client';
import { BUSINESS } from '@/lib/constants';
import styles from './MobileBottomBar.module.css';

export default function MobileBottomBar() {
  const handleBookNow = (e) => {
    e.preventDefault();
    // Try scrolling to the booking form on this page first
    const localForm = document.getElementById('booking-form') || document.getElementById('book');
    if (localForm) {
      localForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const firstInput = localForm.querySelector('select, input');
      if (firstInput) setTimeout(() => firstInput.focus(), 600);
    } else {
      // Navigate to homepage booking section
      window.location.href = '/#booking-form';
    }
  };

  return (
    <aside className={styles.mobileBar} aria-label="Quick Mobile Booking Actions">
      <div className={styles.barInner}>
        <a href={`tel:${BUSINESS.phone.pavan}`} className={styles.callBtn} id="mobile-bar-call">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--brand-red)">
            <path d="M6.62 10.79a15.1 15.1 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.45 2.33.7 3.58.7a1 1 0 011 1V20a1 1 0 01-1 1C10.49 21 3 13.51 3 4.5A1 1 0 014 3.5h3.5a1 1 0 011 1c0 1.26.25 2.46.7 3.58a1 1 0 01-.24 1.01l-2.34 2.2z" />
          </svg>
          Call
        </a>

        <a
          href="/#booking-form"
          className={styles.bookBtn}
          id="mobile-bar-book"
          onClick={handleBookNow}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
          Book Now
        </a>

        <a
          href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent('Hi, I want to book a cab with MANA Tours.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.waBtn}
          id="mobile-bar-wa"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.116.553 4.103 1.522 5.831L.057 23.428l5.763-1.51A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.922 0-3.71-.522-5.241-1.428l-.376-.223-3.892 1.02 1.038-3.79-.246-.39A9.818 9.818 0 012.182 12C2.182 6.575 6.575 2.182 12 2.182S21.818 6.575 21.818 12 17.425 21.818 12 21.818z" />
          </svg>
          WhatsApp
        </a>
      </div>
    </aside>
  );
}
