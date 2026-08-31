'use client';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { BUSINESS } from '@/lib/constants';
import styles from './faq.module.css';

const allFaqs = [
  // Category: Booking & Payments
  {
    category: 'Booking & Payments',
    q: 'How do I book a cab with MANA?',
    a: 'You can book instantly by calling us at +91 99083 00718, chatting on WhatsApp, or using our interactive Booking & Fare Estimator on the website. We confirm all bookings within 15 to 30 minutes with driver details.',
  },
  {
    category: 'Booking & Payments',
    q: 'Are there any hidden fuel or night surcharges?',
    a: 'Never. MANA provides 100% transparent pricing. Your quoted rate includes the commercial vehicle, licensed chauffeur, fuel, and air conditioning. Tolls and state parking permits are charged at actual government receipts.',
  },
  {
    category: 'Booking & Payments',
    q: 'What payment methods do you accept?',
    a: 'We accept digital UPI (PhonePe, Google Pay, Paytm), direct bank transfers, and cash. Payments are made post-trip after reaching your destination comfortably.',
  },
  {
    category: 'Booking & Payments',
    q: 'How much advance notice is required for airport or early morning trips?',
    a: 'For outstation trips, airport transfers, and 2 AM–4 AM pilgrimage departures, we recommend booking at least 12–24 hours in advance so we can allocate and sanitize your preferred vehicle.',
  },

  // Category: Pilgrimage & Routes
  {
    category: 'Pilgrimage & Routes',
    q: 'Do you offer same-day round trips to Tirumala Tirupati?',
    a: 'Yes! Our Kadapa to Tirupati package (starts at ₹3,699 RT in an AC Sedan) includes early morning pickup, temple darshan waiting time, Alipiri check assistance, and comfortable return drop in Kadapa by evening.',
  },
  {
    category: 'Pilgrimage & Routes',
    q: 'Can you arrange custom multi-day temple tours (Srisailam, Mahanandi, Ahobilam)?',
    a: 'Absolutely. We specialize in custom Rayalaseema spiritual circuits. Our drivers know temple timings, ghat road navigation, and reputable vegetarian dining spots.',
  },
  {
    category: 'Pilgrimage & Routes',
    q: 'Do you provide Gandikota and Belum Caves day tour packages?',
    a: 'Yes! We offer a full-day sightseeing tour covering the Grand Canyon of India (Gandikota Fort & Gorge) and the historic Belum Caves with flexible photo stops.',
  },

  // Category: Self-Drive Rentals
  {
    category: 'Self-Drive Rentals',
    q: 'What is the daily rate and security deposit for Self-Drive cars?',
    a: 'Our self-drive sedan rentals start at ₹1,499 per day, with an irresistible flat ₹800 discount on weekly bookings. We require a 100% refundable security deposit of ₹10,000 returned immediately upon vehicle handback after inspection.',
  },
  {
    category: 'Self-Drive Rentals',
    q: 'Is fuel included in Self-Drive rentals?',
    a: 'No, fuel is 100% customer-managed with 0% markup. You receive the vehicle at the recorded fuel gauge level, fuel up as needed during your trip, and return it at the exact same level.',
  },
  {
    category: 'Self-Drive Rentals',
    q: 'What documents are required for Self-Drive?',
    a: 'Valid original Indian Driving License (minimum 2 years old), Aadhaar Card or Passport, and refundable security deposit.',
  },

  // Category: Safety & Fleet
  {
    category: 'Safety & Fleet',
    q: 'What vehicles are available in the MANA fleet?',
    a: 'We operate Toyota Etios & Maruti Dzire (5-seater executive sedans), Maruti Ertiga & Kia Carens (7-seater MPVs), Toyota Innova Crysta (luxury MPV), and Force Urbania/Travellers (12–26 seaters) for large groups.',
  },
  {
    category: 'Safety & Fleet',
    q: 'Are your drivers verified and experienced?',
    a: 'Yes. All MANA chauffeurs hold valid commercial badges, undergo background checks, and possess extensive experience navigating Rayalaseema highways, ghat sections, and metro city traffic.',
  },

  // Category: Partner Program
  {
    category: 'Partner Program',
    q: 'How does the 70% Partner Revenue Share work?',
    a: 'Vehicle owners who attach their cars to MANA receive 70% of every trip fare, while 30% goes towards customer acquisition, technology, customer support, and dispatch operations. Settlements are made on-time digitally.',
  },
  {
    category: 'Partner Program',
    q: 'Is there any joining fee to attach a vehicle?',
    a: 'Zero! Joining MANA Tours & Travels as a fleet partner is 100% free with zero upfront fees, zero deposit, and a formal written contract protecting your rights.',
  },
];

const categories = ['All', 'Booking & Payments', 'Pilgrimage & Routes', 'Self-Drive Rentals', 'Safety & Fleet', 'Partner Program'];

export default function FaqPage() {
  const [selectedCat, setSelectedCat] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaqs = allFaqs.filter((item) => {
    const matchesCat = selectedCat === 'All' || item.category === selectedCat;
    const matchesSearch =
      item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.a.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <>
      <Header />

      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>Frequently Asked Questions</h1>
          <p className={styles.heroSubtitle}>
            Have questions about booking, pilgrimage trips, self-drive rentals, or fleet partnerships? Find instant answers below.
          </p>

          {/* Search Input */}
          <div className={styles.searchBox}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search topics (e.g. Tirupati, deposit, payment, self-drive)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          {/* Category Filter Pills */}
          <div className={styles.categoryPills}>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`${styles.catPill} ${selectedCat === cat ? styles.catPillActive : ''}`}
                onClick={() => setSelectedCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ACCORDION LIST ══ */}
      <section className="section" style={{ background: '#FFFFFF' }}>
        <div className="container">
          {filteredFaqs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--charcoal-500)' }}>
              <h3>No questions matched your search &quot;{searchTerm}&quot;</h3>
              <p style={{ marginTop: '8px' }}>
                Need immediate help? Call Pavan directly at{' '}
                <a href={`tel:${BUSINESS.phone.pavan}`} style={{ color: 'var(--brand-red)', fontWeight: 800 }}>
                  {BUSINESS.phone.pavanDisplay}
                </a>
              </p>
            </div>
          ) : (
            <div className={styles.faqGrid}>
              {filteredFaqs.map((faq, i) => (
                <details key={i} className={styles.faqItem} open={i === 0}>
                  <summary className={styles.faqSummary}>
                    <span>{faq.q}</span>
                    <span className={styles.faqArrow}>▼</span>
                  </summary>
                  <p className={styles.faqAnswer}>{faq.a}</p>
                </details>
              ))}
            </div>
          )}

          {/* Bottom Help Box */}
          <div
            style={{
              marginTop: '56px',
              textAlign: 'center',
              background: 'var(--pearl-bg)',
              border: '1.5px solid var(--brass-border)',
              borderRadius: 'var(--r-2xl)',
              padding: '36px',
              maxWidth: '720px',
              margin: '56px auto 0',
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--charcoal-900)' }}>
              Still Have Questions?
            </h3>
            <p style={{ color: 'var(--charcoal-600)', marginTop: '6px', fontSize: '0.96rem' }}>
              Our 24/7 Kadapa help desk is always ready to assist you on WhatsApp or Phone.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', marginTop: '20px', flexWrap: 'wrap' }}>
              <a
                href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent('Hi Pavan, I have a question about MANA Tours.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
              >
                💬 Chat on WhatsApp
              </a>
              <a href={`tel:${BUSINESS.phone.pavan}`} className="btn btn--charcoal">
                📞 Call Pavan: {BUSINESS.phone.pavanDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
