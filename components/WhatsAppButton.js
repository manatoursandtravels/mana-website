'use client';
import { BUSINESS } from '@/lib/constants';
import styles from './WhatsAppButton.module.css';

export default function WhatsAppButton() {
  const message = encodeURIComponent('Hello! I would like to book a trip with MANA Tours & Travels. Please help me.');
  return (
    <a
      href={`https://wa.me/${BUSINESS.whatsapp}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.btn}
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 24 24" className={styles.icon} fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12.004 2C6.477 2 2 6.477 2 12.004c0 1.771.466 3.436 1.276 4.876L2 22l5.277-1.386A9.947 9.947 0 0012.004 22C17.527 22 22 17.527 22 12.004 22 6.477 17.527 2 12.004 2zm0 18.155a8.12 8.12 0 01-4.147-1.135l-.297-.177-3.133.823.835-3.046-.194-.313A8.12 8.12 0 013.845 12.004c0-4.504 3.655-8.16 8.159-8.16 4.504 0 8.16 3.656 8.16 8.16 0 4.504-3.656 8.151-8.16 8.151z"/>
      </svg>
      <span className={styles.tooltip}>Chat with us!</span>
      <span className={styles.pulse} />
    </a>
  );
}
