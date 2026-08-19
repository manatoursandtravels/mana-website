import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from '../legal.module.css';
import { BUSINESS } from '@/lib/constants';

export const metadata = { title: 'Terms & Conditions | MANA Tours & Travels', description: 'Terms and conditions for using MANA Tours & Travels cab and travel services.' };

export default function TermsPage() {
  return (
    <>
      <Header />
      <div className={styles.hero}><div className="container"><h1>Terms & Conditions</h1><p>Last updated: August 2026</p></div></div>
      <section className="section">
        <div className={`container ${styles.content}`}>
          <h2>1. Service Agreement</h2>
          <p>By booking a trip with MANA Tours & Travels, you agree to these terms. MANA Tours & Travels ("MANA", "we", "us") provides cab, tour, and travel services from Kadapa, Andhra Pradesh.</p>

          <h2>2. Booking & Confirmation</h2>
          <p>A booking is confirmed only after verbal/WhatsApp confirmation from MANA. Availability is subject to vehicle and driver availability at the time of booking.</p>

          <h2>3. Pricing & Payment</h2>
          <ul>
            <li>All quoted prices include driver, AC, and fuel unless stated otherwise.</li>
            <li>Toll and parking charges are additional and paid at actual rates by the customer.</li>
            <li>Driver allowance of ₹300/night applies for overnight outstation trips.</li>
            <li>Payment is accepted via UPI, cash, or bank transfer — at the end of the trip unless otherwise agreed.</li>
            <li>Prices may change based on fuel price revisions; the rate quoted at booking is honored.</li>
          </ul>

          <h2>4. Cancellations</h2>
          <p>Please refer to our <a href="/cancellation">Cancellation Policy</a> page for full details.</p>

          <h2>5. Passenger Conduct</h2>
          <ul>
            <li>Passengers must not engage in behavior that endangers safety or disrupts the driver.</li>
            <li>Smoking is not permitted inside MANA vehicles.</li>
            <li>Consumption of alcohol or illegal substances inside the vehicle is prohibited.</li>
            <li>MANA is not responsible for valuables left in the vehicle.</li>
          </ul>

          <h2>6. Delays & Waiting</h2>
          <p>MANA strives to be on time. In cases of unforeseen delays (traffic, weather), the driver will communicate proactively. Waiting time beyond 30 minutes at a pickup point may be charged at ₹100/hour.</p>

          <h2>7. Limitation of Liability</h2>
          <p>MANA is not liable for delays, losses, or inconveniences caused by events beyond our control including road closures, natural disasters, or vehicle breakdowns. In case of a breakdown, MANA will arrange an alternate vehicle at the earliest.</p>

          <h2>8. Contact</h2>
          <p>For queries about these terms, contact us at <a href={`tel:${BUSINESS.phone.pavan}`}>{BUSINESS.phone.pavanDisplay}</a> or <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>.</p>
        </div>
      </section>
      <Footer />
    </>
  );
}
