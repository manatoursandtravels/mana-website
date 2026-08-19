// Shared route page generator for remaining 6 routes
// Each route page follows the same structure as Tirupati

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import BookingForm from '@/components/BookingForm';
import Link from 'next/link';
import styles from '../../services/service.module.css';
import { BUSINESS } from '@/lib/constants';

export const metadata = {
  title: 'Kadapa to Hyderabad Cab | ₹4,999 One Way | ₹8,499 Round Trip | MANA Tours',
  description: 'Book a cab from Kadapa to Hyderabad. ₹4,999 one way, ₹8,499 round trip. AC sedan, experienced driver. MANA Tours & Travels. Call +91 99083 00718.',
};

export default function KadapaToHyderabadPage() {
  return (
    <>
      <Header />
      <div className={styles.serviceHero}>
        <div className="container">
          <div className={styles.heroBreadcrumb}><Link href="/">Home</Link> › Routes › Kadapa to Hyderabad</div>
          <div className={styles.heroIcon}>🌆</div>
          <h1 className={styles.heroTitle}>Kadapa to Hyderabad Cab Service</h1>
          <p className={styles.heroSubtitle}>Comfortable AC cab from Kadapa to Hyderabad. Transparent pricing. Experienced drivers. Available 24/7.</p>
          <div className={styles.routeInfo}>
            <div className={styles.routeInfoItem}><div className={styles.routeInfoValue}>~360 km</div><div className={styles.routeInfoLabel}>Distance</div></div>
            <div className={styles.routeInfoItem}><div className={styles.routeInfoValue}>~6–7 hrs</div><div className={styles.routeInfoLabel}>Drive Time</div></div>
            <div className={styles.routeInfoItem}><div className={styles.routeInfoValue}>₹4,999</div><div className={styles.routeInfoLabel}>One Way</div></div>
            <div className={styles.routeInfoItem}><div className={styles.routeInfoValue}>₹8,499</div><div className={styles.routeInfoLabel}>Round Trip</div></div>
          </div>
          <div className={styles.heroCtas} style={{marginTop:'24px'}}>
            <a href="#book" className="btn btn--primary btn--lg">📅 Book This Cab</a>
            <a href={`tel:${BUSINESS.phone.pavan}`} className="btn btn--white btn--lg">📞 Call Now</a>
          </div>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className={styles.contentGrid}>
            <div className={styles.mainCol}>
              <div className={styles.priceSection}>
                <h2>Kadapa to Hyderabad Cab Fare</h2>
                <div className="divider divider--left" style={{marginBottom:'20px'}} />
                <table className="rate-table">
                  <thead><tr><th>Trip Type</th><th>Price</th><th>Includes</th></tr></thead>
                  <tbody>
                    <tr><td>One Way Drop</td><td className="price">₹4,999</td><td>Driver + AC + Fuel</td></tr>
                    <tr><td>Round Trip (same day)</td><td className="price">₹8,499</td><td>Driver + AC + Fuel + Wait</td></tr>
                    <tr><td>Hyderabad Airport (RGIA)</td><td className="price">₹5,499</td><td>Fixed all-inclusive</td></tr>
                  </tbody>
                </table>
                <p style={{fontSize:'0.82rem',color:'var(--text-muted)',marginTop:'12px'}}>Toll and parking at actual. Driver allowance ₹300 for overnight stays.</p>
              </div>
            </div>
            <div className={styles.sideCol}>
              <div id="book" className={styles.stickyForm}><BookingForm compact /></div>
              <div className={styles.contactCard}>
                <p>Quick booking or questions?</p>
                <a href={`tel:${BUSINESS.phone.pavan}`} className="btn btn--primary" style={{width:'100%',justifyContent:'center'}}>📞 {BUSINESS.phone.pavanDisplay}</a>
                <a href={`https://wa.me/${BUSINESS.whatsapp}`} target="_blank" rel="noopener noreferrer" className={`btn ${styles.waBtn}`} style={{width:'100%',justifyContent:'center'}}>💬 WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer /><WhatsAppButton />
    </>
  );
}
