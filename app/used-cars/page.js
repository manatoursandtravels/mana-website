'use client';
import { useState, useMemo, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import UsedCarCard from '@/components/UsedCarCard';
import UsedCarDetailModal from '@/components/UsedCarDetailModal';
import CarEmiCalculator from '@/components/CarEmiCalculator';
import SellCarValuationCard from '@/components/SellCarValuationCard';
import { USED_CARS_INVENTORY, BUSINESS } from '@/lib/constants';
import styles from './used-cars.module.css';

const USED_CAR_FAQS = [
  {
    q: 'How does MANA Certified 150-Point Quality Inspection work?',
    a: 'Every vehicle undergoes rigorous diagnostics covering 150 critical checkpoints including engine compression, transmission shifting, computerized scanner diagnostic, chilled AC cooling cycle, brake pad thickness, suspension play, and non-accidental structural chassis inspection. We only list top 5% qualifying cars.',
  },
  {
    q: 'Do you handle the RTO and RC Ownership transfer in Kadapa / AP?',
    a: 'Yes, 100% complete hassle-free ownership transfer is included! Our dedicated documentation team manages the RTO paperwork, AP clearance certificate, and delivery of the newly transferred RC book directly to your address.',
  },
  {
    q: 'Can I test drive the car at my home or office in Kadapa?',
    a: 'Absolutely! We offer free doorstep test drives across Kadapa city and nearby Rayalaseema mandals. Simply click "Book Test Drive" on any car listing or message us on WhatsApp, and our executive will bring the sanitized car to your doorstep.',
  },
  {
    q: 'Do you provide used car loan and finance options?',
    a: 'Yes, we have tie-ups with leading private & PSU banks (HDFC, ICICI, SBI, Axis, Kotak, Mahindra Finance) providing up to 90% on-road funding with attractive interest rates starting from 9.5% p.a. Instant loan in-principle sanction is done within 2 hours.',
  },
  {
    q: 'What if I want to exchange or sell my existing car to MANA?',
    a: 'You can easily exchange your current vehicle! We offer top market value with transparent evaluation in under 15 minutes, instant cash/bank settlement, and zero middleman commission. Use our "Sell Your Car" tool below for a free quote.',
  },
];

export default function UsedCarsPage() {
  const [selectedBudget, setSelectedBudget] = useState('all');
  const [selectedBodyType, setSelectedBodyType] = useState('all');
  const [selectedFuel, setSelectedFuel] = useState('all');
  const [activeModalCar, setActiveModalCar] = useState(null);
  const [isTestDriveMode, setIsTestDriveMode] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  // Auto-scroll to #sell-car-section if requested
  useEffect(() => {
    const handleHash = () => {
      if (typeof window !== 'undefined' && window.location.hash === '#sell-car-section') {
        setTimeout(() => {
          const el = document.getElementById('sell-car-section');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            const firstInput = el.querySelector('input');
            if (firstInput) firstInput.focus({ preventScroll: true });
          }
        }, 300);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Filter Logic
  const filteredCars = useMemo(() => {
    return USED_CARS_INVENTORY.filter((car) => {
      // Budget Filter
      if (selectedBudget === 'under-5l' && car.price > 500000) return false;
      if (selectedBudget === '5l-10l' && (car.price <= 500000 || car.price > 1000000)) return false;
      if (selectedBudget === 'above-10l' && car.price <= 1000000) return false;

      // Body Type Filter
      if (selectedBodyType !== 'all' && car.bodyType !== selectedBodyType) return false;

      // Fuel Type Filter
      if (selectedFuel !== 'all' && car.fuel !== selectedFuel) return false;

      return true;
    });
  }, [selectedBudget, selectedBodyType, selectedFuel]);

  const handleOpenDetails = (car) => {
    setActiveModalCar(car);
    setIsTestDriveMode(false);
  };

  const handleBookTestDrive = (car) => {
    setActiveModalCar(car);
    setIsTestDriveMode(true);
  };

  return (
    <>
      <Header />

      <main>
        {/* ══ 1. HERO SECTION ══ */}
        <section className={styles.hero}>
          <div className={styles.heroBgGlow} />
          <div className="container">
            <div className={styles.heroInner}>
              <div className={styles.heroEyebrow}>
                <span>🚗 MANA Certified Used Cars · Kadapa & Rayalaseema</span>
              </div>

              <h1 className={styles.heroH1}>
                Drive Home Quality You Can Trust. <br />
                <span>100% Certified Used Cars in Kadapa.</span>
              </h1>

              <p className={styles.heroP}>
                Ex-fleet & single-owner verified vehicles with 150-point inspection, complete authorized service history, clean AP titles, doorstep test drives & same-day bank loan approvals.
              </p>

              <div className={styles.heroCtas}>
                <a href="#inventory" className="btn btn--primary btn--lg">
                  Explore {USED_CARS_INVENTORY.length} Available Cars →
                </a>
                <a href="#sell-car-section" className="btn btn--secondary btn--lg">
                  Sell Your Car to MANA
                </a>
                <a href="#emi-calculator" className="btn btn--navy btn--lg">
                  Calculate Loan EMI
                </a>
              </div>

              {/* 4-Pillar Trust Strip */}
              <div className={styles.trustStrip}>
                <div className={styles.trustPillar}>
                  <span className={styles.trustIcon}>🔍</span>
                  <div>
                    <div className={styles.trustTitle}>150-Pt Inspection</div>
                    <div className={styles.trustSub}>Engine, AC, electricals & tyres</div>
                  </div>
                </div>

                <div className={styles.trustPillar}>
                  <span className={styles.trustIcon}>📑</span>
                  <div>
                    <div className={styles.trustTitle}>Free RC Transfer</div>
                    <div className={styles.trustSub}>100% legal AP RTO support</div>
                  </div>
                </div>

                <div className={styles.trustPillar}>
                  <span className={styles.trustIcon}>🛡️</span>
                  <div>
                    <div className={styles.trustTitle}>Non-Accidental</div>
                    <div className={styles.trustSub}>Flood-free & verified title</div>
                  </div>
                </div>

                <div className={styles.trustPillar}>
                  <span className={styles.trustIcon}>🏦</span>
                  <div>
                    <div className={styles.trustTitle}>Instant 90% Finance</div>
                    <div className={styles.trustSub}>Starting @ 9.5% with top banks</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 2. INTERACTIVE FILTER BAR ══ */}
        <section className={styles.filterSection} id="inventory">
          <div className="container">
            <div className={styles.filterInner}>
              <div className={styles.filterGroups}>
                <span className={styles.filterLabel}>Budget:</span>
                <button
                  type="button"
                  className={`${styles.filterBtn} ${selectedBudget === 'all' ? styles.filterBtnActive : ''}`}
                  onClick={() => setSelectedBudget('all')}
                >
                  All Prices
                </button>
                <button
                  type="button"
                  className={`${styles.filterBtn} ${selectedBudget === 'under-5l' ? styles.filterBtnActive : ''}`}
                  onClick={() => setSelectedBudget('under-5l')}
                >
                  Under ₹5 Lakh
                </button>
                <button
                  type="button"
                  className={`${styles.filterBtn} ${selectedBudget === '5l-10l' ? styles.filterBtnActive : ''}`}
                  onClick={() => setSelectedBudget('5l-10l')}
                >
                  ₹5L - ₹10 Lakh
                </button>
                <button
                  type="button"
                  className={`${styles.filterBtn} ${selectedBudget === 'above-10l' ? styles.filterBtnActive : ''}`}
                  onClick={() => setSelectedBudget('above-10l')}
                >
                  ₹10 Lakh+
                </button>
              </div>

              <div className={styles.filterGroups}>
                <span className={styles.filterLabel}>Type:</span>
                <button
                  type="button"
                  className={`${styles.filterBtn} ${selectedBodyType === 'all' ? styles.filterBtnActive : ''}`}
                  onClick={() => setSelectedBodyType('all')}
                >
                  All
                </button>
                <button
                  type="button"
                  className={`${styles.filterBtn} ${selectedBodyType === 'Sedan' ? styles.filterBtnActive : ''}`}
                  onClick={() => setSelectedBodyType('Sedan')}
                >
                  Sedans
                </button>
                <button
                  type="button"
                  className={`${styles.filterBtn} ${selectedBodyType === '7-Seater MPV' ? styles.filterBtnActive : ''}`}
                  onClick={() => setSelectedBodyType('7-Seater MPV')}
                >
                  7-Seater MPVs
                </button>
                <button
                  type="button"
                  className={`${styles.filterBtn} ${selectedBodyType === 'Hatchback' ? styles.filterBtnActive : ''}`}
                  onClick={() => setSelectedBodyType('Hatchback')}
                >
                  Hatchback
                </button>
              </div>

              <div className={styles.resultCountBadge}>
                Showing {filteredCars.length} of {USED_CARS_INVENTORY.length} Verified Cars
              </div>
            </div>
          </div>
        </section>

        {/* ══ 3. INVENTORY SHOWCASE GRID ══ */}
        <section className={styles.inventorySection}>
          <div className="container">
            <div className="section-header">
              <span className="eyebrow">✦ Certified Pre-Owned Fleet ✦</span>
              <h2>Handpicked Certified Vehicles Ready for Handover</h2>
              <div className="divider" />
              <p>
                Every car is physically parked at our Kadapa hub and ready for instant inspection, free doorstep test drive, and immediate delivery with transparent paperwork.
              </p>
            </div>

            <div className={styles.inventoryGrid}>
              {filteredCars.length > 0 ? (
                filteredCars.map((car) => (
                  <UsedCarCard
                    key={car.id}
                    car={car}
                    onOpenDetails={handleOpenDetails}
                    onBookTestDrive={handleBookTestDrive}
                  />
                ))
              ) : (
                <div className={styles.noResultsBox}>
                  <div style={{ fontSize: '2.5rem' }}>🚗🔍</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--charcoal-900)' }}>
                    No Vehicles Found Matching Selected Filter
                  </h3>
                  <p style={{ color: 'var(--charcoal-500)', fontSize: '0.9rem' }}>
                    Try clearing your filter selection or contact our team to source your desired vehicle model directly.
                  </p>
                  <button
                    type="button"
                    className="btn btn--primary btn--sm"
                    onClick={() => {
                      setSelectedBudget('all');
                      setSelectedBodyType('all');
                      setSelectedFuel('all');
                    }}
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ══ 4. MANA QUALITY PROMISE ══ */}
        <section className={styles.promiseSection}>
          <div className="container">
            <div className="section-header">
              <span className="eyebrow">Why Buy From MANA?</span>
              <h2>The MANA Certified Assurance Standard</h2>
              <div className="divider" />
              <p>Buying a pre-owned car should feel as exciting and stress-free as driving out of a brand new showroom.</p>
            </div>

            <div className={styles.promiseGrid}>
              <div className={styles.promiseCard}>
                <div className={styles.promiseIcon}>🔬</div>
                <h3 className={styles.promiseTitle}>150-Point Diagnostic Check</h3>
                <p className={styles.promiseDesc}>
                  From engine compression to digital OBD scan, clutch wear, and AC performance — zero defects go unnoticed.
                </p>
              </div>

              <div className={styles.promiseCard}>
                <div className={styles.promiseIcon}>📜</div>
                <h3 className={styles.promiseTitle}>100% Genuine Odometer</h3>
                <p className={styles.promiseDesc}>
                  Every car comes with verified authorized service history logs. Zero odometer tampering guaranteed.
                </p>
              </div>

              <div className={styles.promiseCard}>
                <div className={styles.promiseIcon}>🏛️</div>
                <h3 className={styles.promiseTitle}>End-to-End RTO Transfer</h3>
                <p className={styles.promiseDesc}>
                  We handle all paperwork, NOC, hypothecation clearance, and name transfer at the Kadapa RTO at zero stress.
                </p>
              </div>

              <div className={styles.promiseCard}>
                <div className={styles.promiseIcon}>💳</div>
                <h3 className={styles.promiseTitle}>Flexible Bank EMI Options</h3>
                <p className={styles.promiseDesc}>
                  Up to 90% loan financing with SBI, HDFC, ICICI, and Kotak. Low down payment schemes customized for you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 5. EMI CALCULATOR SECTION ══ */}
        <section className={styles.calcSection}>
          <div className="container">
            <div className="section-header">
              <span className="eyebrow">Plan Your Budget</span>
              <h2>Interactive Used Car Loan EMI Estimator</h2>
              <div className="divider" />
              <p>Calculate your estimated monthly installment with customizable down payments and loan tenures.</p>
            </div>

            <CarEmiCalculator />
          </div>
        </section>

        {/* ══ 6. SELL YOUR CAR SECTION ══ */}
        <section className={styles.sellSection}>
          <div className="container">
            <SellCarValuationCard />
          </div>
        </section>

        {/* ══ 7. BUYER FAQS ACCORDION ══ */}
        <section className={styles.faqSection}>
          <div className="container">
            <div className="section-header">
              <span className="eyebrow">Frequently Asked Questions</span>
              <h2>Got Questions About Buying Used Cars in Kadapa?</h2>
              <div className="divider" />
              <p>Everything you need to know about testing, financing, and purchasing with MANA Tours & Travels.</p>
            </div>

            <div className={styles.faqGrid}>
              {USED_CAR_FAQS.map((faq, index) => (
                <div
                  key={index}
                  className={`${styles.faqItem} ${openFaq === index ? styles.faqItemOpen : ''}`}
                >
                  <button
                    type="button"
                    className={styles.faqQuestion}
                    onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                    aria-expanded={openFaq === index}
                  >
                    <span>{faq.q}</span>
                    <span className={`${styles.faqChevron} ${openFaq === index ? styles.faqChevronRotated : ''}`}>
                      ▼
                    </span>
                  </button>
                  {openFaq === index && (
                    <div className={styles.faqAnswer}>
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── Detail / Test Drive Modal ── */}
      {activeModalCar && (
        <UsedCarDetailModal
          car={activeModalCar}
          onClose={() => setActiveModalCar(null)}
          defaultTestDrive={isTestDriveMode}
        />
      )}

      <Footer />
      <WhatsAppButton />
    </>
  );
}
