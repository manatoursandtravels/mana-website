'use client';
import { useState } from 'react';
import { buildSellCarWhatsAppMessage } from '@/lib/constants';
import styles from './SellCarValuationCard.module.css';

export default function SellCarValuationCard() {
  const [formData, setFormData] = useState({
    makeModel: '',
    year: '2020',
    km: '',
    fuel: 'Petrol',
    expectedPrice: '',
    location: 'Kadapa',
    name: '',
    phone: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.makeModel || !formData.phone) return;

    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name || 'Car Seller',
        phone: formData.phone,
        service: 'Used Car Valuation & Purchase',
        tripType: 'Sell Your Car Lead',
        vehicleChoice: `${formData.year} ${formData.makeModel} (${formData.fuel})`,
        pickup: formData.location || 'Kadapa',
        destination: `KM: ${formData.km || 'N/A'} | Expected: ${formData.expectedPrice || 'Best Offer'}`,
        date: 'Immediate Valuation',
        notes: formData.notes,
        estimatedPrice: formData.expectedPrice,
        sourceUrl: window.location.href,
      };

      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      setIsSubmitted(true);
    } catch (err) {
      console.error('Failed to submit car seller lead:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const waSellUrl = buildSellCarWhatsAppMessage(formData);

  return (
    <div className={styles.sellContainer} id="sell-car-section">
      <div className={styles.sellBgMesh} />

      <div className={styles.sellGrid}>
        {/* ── Left Column: Value Prop ── */}
        <div className={styles.valuePropCol}>
          <span className={styles.badgePill}>
            ✦ Zero Commission · Instant Payment ✦
          </span>

          <h2 className={styles.heading}>
            Want to Sell Your Car in Kadapa at the Best Market Price?
          </h2>

          <p className={styles.desc}>
            Skip random buyers, endless negotiation calls, and delayed RC transfers. Sell your vehicle directly to MANA Tours & Travels with transparent doorstep inspection and same-day instant bank transfer.
          </p>

          <div className={styles.stepsList}>
            <div className={styles.stepItem}>
              <div className={styles.stepNum}>1</div>
              <div className={styles.stepBody}>
                <div className={styles.stepTitle}>Instant 15-Minute Online Quote</div>
                <div className={styles.stepText}>Share vehicle details & get an upfront guaranteed valuation.</div>
              </div>
            </div>

            <div className={styles.stepItem}>
              <div className={styles.stepNum}>2</div>
              <div className={styles.stepBody}>
                <div className={styles.stepTitle}>Free Doorstep Inspection in Kadapa</div>
                <div className={styles.stepText}>Our mechanic visits your home/office at your preferred time.</div>
              </div>
            </div>

            <div className={styles.stepItem}>
              <div className={styles.stepNum}>3</div>
              <div className={styles.stepBody}>
                <div className={styles.stepTitle}>Same-Day Payment & RC Transfer Guarantee</div>
                <div className={styles.stepText}>Instant full settlement via IMPS/NEFT + free legal RTO title transfer.</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Column: Valuation Form ── */}
        <div className={styles.formCard}>
          <h3 className={styles.formTitle}>Get Free Valuation in 60 Seconds</h3>

          {isSubmitted ? (
            <div className={styles.successBox}>
              <div style={{ fontSize: '1.25rem', fontWeight: '900', color: '#FFFFFF' }}>
                🎉 Valuation Request Received!
              </div>
              <p style={{ fontSize: '0.9rem', color: '#CBD5E1', lineHeight: '1.5' }}>
                Our vehicle purchase manager is reviewing your {formData.year} {formData.makeModel} details and will call you with a guaranteed cash offer.
              </p>
              <a
                href={waSellUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--sm"
                style={{ background: '#25D366', color: '#FFF', width: '100%', justifyContent: 'center' }}
              >
                💬 Get Instant Cash Offer on WhatsApp
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.formGrid}>
              <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                <label className={styles.label}>Car Make & Model *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2021 Swift Dzire VXi / Toyota Etios"
                  className={styles.input}
                  value={formData.makeModel}
                  onChange={(e) => setFormData({ ...formData, makeModel: e.target.value })}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Year of Manufacture</label>
                <select
                  className={styles.select}
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                >
                  {['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015 & older'].map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Fuel Type</label>
                <select
                  className={styles.select}
                  value={formData.fuel}
                  onChange={(e) => setFormData({ ...formData, fuel: e.target.value })}
                >
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="CNG">CNG / Hybrid</option>
                  <option value="Electric">Electric (EV)</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>KM Driven</label>
                <input
                  type="text"
                  placeholder="e.g. 45,000 km"
                  className={styles.input}
                  value={formData.km}
                  onChange={(e) => setFormData({ ...formData, km: e.target.value })}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Expected Price (₹)</label>
                <input
                  type="text"
                  placeholder="e.g. ₹5,20,000"
                  className={styles.input}
                  value={formData.expectedPrice}
                  onChange={(e) => setFormData({ ...formData, expectedPrice: e.target.value })}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Venkat Rao"
                  className={styles.input}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 99083 00718"
                  className={styles.input}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className={styles.formGroupFull}>
                <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
                  {isSubmitting ? 'Submitting Valuation Request...' : 'Get Instant Cash Valuation Quote'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
