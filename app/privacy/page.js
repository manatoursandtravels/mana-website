import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from '../legal.module.css';
import { BUSINESS } from '@/lib/constants';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for MANA Tours & Travels. How we collect, use, and protect your personal information.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <div className={styles.hero}><div className="container"><h1>Privacy Policy</h1><p>Last updated: August 2026</p></div></div>
      <section className="section">
        <div className={`container ${styles.content}`}>
          <h2>1. Information We Collect</h2>
          <p>When you book a trip or contact us, we collect: name, phone number, email (if provided), pickup location, destination, and trip details. This information is used solely to fulfill your booking.</p>

          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>To confirm and manage your booking</li>
            <li>To send booking confirmations via WhatsApp or SMS</li>
            <li>To contact you about changes to your trip</li>
            <li>To improve our services</li>
          </ul>
          <p>We do not use your information for marketing without your consent.</p>

          <h2>3. Data Sharing</h2>
          <p>We do not sell or share your personal data with third parties, except with the assigned driver (who receives only your name, pickup point, and contact number for trip coordination).</p>

          <h2>4. Data Retention</h2>
          <p>We retain booking records for accounting and service improvement purposes. Contact us to request deletion of your data.</p>

          <h2>5. WhatsApp Communications</h2>
          <p>When you contact us via WhatsApp, your messages are subject to WhatsApp&apos;s own privacy policy in addition to ours. We use WhatsApp only for booking coordination and support.</p>

          <h2>6. Cookies</h2>
          <p>Our website may use Google Analytics cookies to understand traffic and improve the site. No personally identifiable information is collected via cookies.</p>

          <h2>7. Your Rights</h2>
          <p>You may request access to, correction of, or deletion of your personal data at any time by contacting us at <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>.</p>

          <h2>8. Contact</h2>
          <p>For privacy-related queries, contact <a href={`tel:${BUSINESS.phone.pavan}`}>{BUSINESS.phone.pavanDisplay}</a> or <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>.</p>
        </div>
      </section>
      <Footer />
    </>
  );
}
