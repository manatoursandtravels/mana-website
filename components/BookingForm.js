'use client';
import { useState } from 'react';
import { SERVICES, buildWhatsAppMessage } from '@/lib/constants';
import { trackFormSubmission } from '@/lib/analytics';
import styles from './BookingForm.module.css';

const TRIP_TYPES = ['One Way', 'Round Trip', 'Local Package', 'Day Trip', 'Multi-Day Tour', 'Self Drive (Daily / Weekly)'];

export default function BookingForm({ compact = false }) {
  const [form, setForm] = useState({
    service: '', tripType: '', pickup: '', destination: '',
    date: '', returnDate: '', passengers: '1', name: '', phone: '', notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (field, val) => setForm(prev => ({ ...prev, [field]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.pickup) return;

    // 1. Fire Google Analytics Event
    trackFormSubmission(form.service || 'General Booking', `${form.pickup} -> ${form.destination || 'N/A'}`);

    // 2. Silently sync lead to API / Google Sheets CRM in background
    try {
      fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          sourceUrl: typeof window !== 'undefined' ? window.location.pathname : '',
        }),
      }).catch(() => {});
    } catch {}

    // 3. Build & Open WhatsApp Message
    const url = buildWhatsAppMessage({
      service: form.service || 'Not specified',
      pickup: form.pickup,
      destination: form.destination,
      date: form.date,
      returnDate: form.returnDate,
      passengers: form.passengers,
      name: form.name,
      phone: form.phone,
      notes: form.notes,
    });
    window.open(url, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <form className={`${styles.form} ${compact ? styles.compact : ''}`} onSubmit={handleSubmit} id="booking-form">
      {!compact && (
        <div className={styles.formHeader}>
          <h3 className={styles.formTitle}>Book a Journey</h3>
          <p className={styles.formSubtitle}>Fill in your details — we'll confirm via WhatsApp</p>
        </div>
      )}

      <div className={styles.row2}>
        <div className="form-group">
          <label className="form-label">Service Type</label>
          <select className="form-input" value={form.service} onChange={e => set('service', e.target.value)}>
            <option value="">Select service...</option>
            {SERVICES.map(s => (
              <option key={s.id} value={s.label}>{s.icon} {s.label}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Trip Type</label>
          <select className="form-input" value={form.tripType} onChange={e => set('tripType', e.target.value)}>
            <option value="">Select type...</option>
            {TRIP_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div className={styles.row2}>
        <div className="form-group">
          <label className="form-label">Pickup Location *</label>
          <input
            className="form-input" type="text" required
            placeholder="e.g. Kadapa Bus Stand / Home"
            value={form.pickup} onChange={e => set('pickup', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Destination</label>
          <input
            className="form-input" type="text"
            placeholder="e.g. Tirupati / Hyderabad"
            value={form.destination} onChange={e => set('destination', e.target.value)}
          />
        </div>
      </div>

      <div className={styles.row3}>
        <div className="form-group">
          <label className="form-label">Travel Date</label>
          <input
            className="form-input" type="date" min={today}
            value={form.date} onChange={e => set('date', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Return Date (Optional)</label>
          <input
            className="form-input" type="date" min={form.date || today}
            value={form.returnDate} onChange={e => set('returnDate', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Passengers</label>
          <select className="form-input" value={form.passengers} onChange={e => set('passengers', e.target.value)}>
            {[1,2,3,4,5,6,7].map(n => <option key={n} value={n}>{n} passenger{n > 1 ? 's' : ''}</option>)}
          </select>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.row2}>
        <div className="form-group">
          <label className="form-label">Your Name *</label>
          <input
            className="form-input" type="text" required
            placeholder="Full name"
            value={form.name} onChange={e => set('name', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Phone Number *</label>
          <input
            className="form-input" type="tel" required
            placeholder="+91 99083 00718"
            value={form.phone} onChange={e => set('phone', e.target.value)}
          />
        </div>
      </div>

      {!compact && (
        <div className="form-group">
          <label className="form-label">Special Requirements (optional)</label>
          <textarea
            className="form-input" rows="2"
            placeholder="e.g. Early morning 4 AM pickup, infant car seat, AC Crysta preference..."
            value={form.notes} onChange={e => set('notes', e.target.value)}
            style={{ resize: 'vertical' }}
          />
        </div>
      )}

      <button type="submit" className={`btn btn--primary btn--lg ${styles.submitBtn}`} id="submit-booking">
        {submitted ? '✅ Opening WhatsApp...' : '💬 Request Instant WhatsApp Quote'}
      </button>
      <p className={styles.submitNote}>
        Direct confirmation with Pavan &amp; Jyothi • 24/7 Fast Support
      </p>
    </form>
  );
}
