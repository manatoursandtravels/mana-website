import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from '../legal.module.css';
import { BUSINESS } from '@/lib/constants';

export const metadata = {
  title: 'Cancellation Policy',
  description: 'Cancellation policy for MANA Tours & Travels. Free cancellation 12+ hours before trip. Read our full policy.',
  alternates: { canonical: '/cancellation' },
};

export default function CancellationPage() {
  return (
    <>
      <Header />
      <div className={styles.hero}><div className="container"><h1>Cancellation Policy</h1><p>Last updated: August 2026</p></div></div>
      <section className="section">
        <div className={`container ${styles.content}`}>
          <h2>Customer-Initiated Cancellations</h2>
          <table className="rate-table" style={{marginBottom:'24px'}}>
            <thead><tr><th>Notice Given</th><th>Cancellation Charge</th></tr></thead>
            <tbody>
              <tr><td>More than 24 hours before trip</td><td style={{color:'var(--green)',fontWeight:'700'}}>FREE — No charge</td></tr>
              <tr><td>12–24 hours before trip</td><td style={{color:'var(--gold)',fontWeight:'700'}}>No charge (goodwill)</td></tr>
              <tr><td>Less than 12 hours before trip</td><td style={{color:'var(--red)',fontWeight:'700'}}>₹300 cancellation fee</td></tr>
              <tr><td>No-show (driver arrived, customer unavailable)</td><td style={{color:'var(--red)',fontWeight:'700'}}>₹500 or 20% of fare (whichever is lower)</td></tr>
            </tbody>
          </table>

          <h2>How to Cancel</h2>
          <p>To cancel a booking, call or WhatsApp us at <a href={`tel:${BUSINESS.phone.pavan}`}>{BUSINESS.phone.pavanDisplay}</a>. Please have your name and trip date handy. We process cancellations immediately and confirm via WhatsApp.</p>

          <h2>MANA-Initiated Cancellations</h2>
          <p>In rare cases where MANA needs to cancel a confirmed booking (vehicle breakdown, driver emergency), we will:</p>
          <ul>
            <li>Notify you as soon as possible via call and WhatsApp</li>
            <li>Arrange an alternate vehicle wherever possible</li>
            <li>Offer a full refund with no cancellation fee if alternate vehicle is not available</li>
          </ul>

          <h2>Special Circumstances</h2>
          <p>Cancellations due to natural disasters, extreme weather, government-declared emergencies, or road closures are not subject to cancellation charges. We will reschedule or refund as per customer preference.</p>

          <h2>Refunds</h2>
          <p>Since we operate on a pay-after-trip model (no advance payments in most cases), refunds typically apply only to pre-paid corporate accounts. Refunds are processed within 5 business days via the original payment method.</p>

          <h2>Rescheduling</h2>
          <p>Rescheduling is free of charge with at least 12 hours notice, subject to vehicle availability on the new date.</p>
        </div>
      </section>
      <Footer />
    </>
  );
}
