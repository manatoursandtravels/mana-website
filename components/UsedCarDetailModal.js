'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { buildUsedCarWhatsAppMessage } from '@/lib/constants';
import styles from './UsedCarDetailModal.module.css';

export default function UsedCarDetailModal({ car, onClose, defaultTestDrive = false }) {
  const [activePhoto, setActivePhoto] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    location: 'Kadapa (Doorstep / Hub)',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!car) return null;

  const images = car.images && car.images.length > 0 ? car.images : [car.image];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        phone: formData.phone,
        service: 'Certified Used Cars',
        tripType: 'Test Drive Booking',
        vehicleChoice: `${car.name} (${car.year}) - ${car.priceDisplay}`,
        pickup: formData.location,
        destination: `RTO: ${car.rto} | ${car.kmDisplay}`,
        date: formData.date || 'Immediate / Flexible',
        notes: formData.notes,
        estimatedPrice: car.priceDisplay,
        sourceUrl: window.location.href,
      };

      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      setIsSuccess(true);
    } catch (err) {
      console.error('Lead submission failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const waTestDriveUrl = buildUsedCarWhatsAppMessage(car, 'test-drive', {
    name: formData.name,
    phone: formData.phone,
    preferredDate: formData.date,
    message: formData.notes,
  });

  return (
    <div className={styles.modalBackdrop} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modalContent} role="dialog" aria-modal="true">
        {/* Close button */}
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        {/* ── Modal Header ── */}
        <div className={styles.modalHeader}>
          <div className={styles.headerPills}>
            <span className="badge badge--gold">{car.badge}</span>
            <span className="badge badge--blue">{car.rto}</span>
            <span className="badge badge--green">{car.owner}</span>
            <span className="badge badge--purple">{car.fuel} · {car.transmission}</span>
          </div>
          <h2 className={styles.modalTitle}>{car.name} ({car.year})</h2>
          <p className={styles.modalSubtitle}>{car.tagline}</p>
        </div>

        {/* ── Photo Gallery ── */}
        <div className={styles.gallerySection}>
          <div className={styles.mainPhotoWrap}>
            <Image
              src={images[activePhoto] || car.image}
              alt={`${car.name} view`}
              fill
              className={styles.mainPhoto}
            />
          </div>
          {images.length > 1 && (
            <div className={styles.thumbnails}>
              {images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  className={`${styles.thumbBtn} ${activePhoto === i ? styles.thumbBtnActive : ''}`}
                  onClick={() => setActivePhoto(i)}
                >
                  <Image src={img} alt="" fill style={{ objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Modal Body ── */}
        <div className={styles.modalBody}>
          {/* Section 1: 150-Point Certified Inspection */}
          <div>
            <h3 className={styles.sectionHeading}>
              <span>🔍 150-Point Certified Inspection Report</span>
            </h3>
            <div className={styles.inspectionGrid}>
              <div className={styles.inspectionCard}>
                <div className={styles.inspectTop}>
                  <span className={styles.inspectLabel}>⚙️ Engine & Transmission</span>
                  <span className={styles.inspectPassed}>✓ PASSED</span>
                </div>
                <p className={styles.inspectDetail}>{car.inspectionSummary.engineTransmission}</p>
              </div>

              <div className={styles.inspectionCard}>
                <div className={styles.inspectTop}>
                  <span className={styles.inspectLabel}>❄️ Chilled Air Conditioning</span>
                  <span className={styles.inspectPassed}>✓ PASSED</span>
                </div>
                <p className={styles.inspectDetail}>{car.inspectionSummary.airConditioning}</p>
              </div>

              <div className={styles.inspectionCard}>
                <div className={styles.inspectTop}>
                  <span className={styles.inspectLabel}>🛑 Suspension & Braking System</span>
                  <span className={styles.inspectPassed}>✓ PASSED</span>
                </div>
                <p className={styles.inspectDetail}>{car.inspectionSummary.suspensionBrakes}</p>
              </div>

              <div className={styles.inspectionCard}>
                <div className={styles.inspectTop}>
                  <span className={styles.inspectLabel}>⚡ Electricals, Battery & Audio</span>
                  <span className={styles.inspectPassed}>✓ PASSED</span>
                </div>
                <p className={styles.inspectDetail}>{car.inspectionSummary.electricals}</p>
              </div>

              <div className={styles.inspectionCard}>
                <div className={styles.inspectTop}>
                  <span className={styles.inspectLabel}>🛞 Tyres Condition & Tread Life</span>
                  <span className={styles.inspectPassed}>✓ {car.inspectionSummary.tyresLife}</span>
                </div>
                <p className={styles.inspectDetail}>Wheel balancing and alignment verified.</p>
              </div>

              <div className={styles.inspectionCard}>
                <div className={styles.inspectTop}>
                  <span className={styles.inspectLabel}>🛡️ Body Structure & Paint</span>
                  <span className={styles.inspectPassed}>✓ 100% CLEAN</span>
                </div>
                <p className={styles.inspectDetail}>{car.inspectionSummary.bodyCondition}</p>
              </div>
            </div>
          </div>

          {/* Section 2: Technical Specifications & Documentation */}
          <div>
            <h3 className={styles.sectionHeading}>
              <span>📄 Technical Specifications & RC Title</span>
            </h3>
            <div className={styles.specsTable}>
              <div className={styles.specRow}>
                <span className={styles.specRowTitle}>Engine Displacement</span>
                <span className={styles.specRowValue}>{car.specs.engine}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specRowTitle}>Certified Mileage</span>
                <span className={styles.specRowValue}>{car.specs.mileage}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specRowTitle}>Seating & Cabin</span>
                <span className={styles.specRowValue}>{car.specs.seating}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specRowTitle}>Boot Space</span>
                <span className={styles.specRowValue}>{car.specs.bootSpace}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specRowTitle}>Insurance Validity</span>
                <span className={styles.specRowValue}>{car.specs.insurance}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specRowTitle}>RC & Title Status</span>
                <span className={styles.specRowValue}>{car.specs.rcStatus}</span>
              </div>
            </div>
          </div>

          {/* Section 3: Test Drive Booking / Purchase Lead Box */}
          <div className={styles.bookingBox} id="modal-test-drive-section">
            <div className={styles.bookingBoxHeader}>
              <h3 className={styles.bookingBoxTitle}>Book a Free Doorstep Test Drive</h3>
              <p className={styles.bookingBoxSub}>
                We bring this {car.name} to your home or office in Kadapa for a zero-obligation test drive.
              </p>
            </div>

            {isSuccess ? (
              <div className={styles.successBanner}>
                <div style={{ fontSize: '1.2rem', fontWeight: '800' }}>
                  🎉 Test Drive Request Confirmed!
                </div>
                <p>Our executive will contact you in &lt; 10 minutes to coordinate the vehicle handover.</p>
                <a
                  href={waTestDriveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--sm"
                  style={{ background: '#25D366', color: '#FFF', marginTop: '6px' }}
                >
                  💬 Confirm Instantly on WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Reddy"
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

                <div className={styles.formGroup}>
                  <label className={styles.label}>Preferred Date</label>
                  <input
                    type="date"
                    className={styles.input}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Location / Area</label>
                  <input
                    type="text"
                    placeholder="e.g. Nagarajupalli, Kadapa"
                    className={styles.input}
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>

                <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                  <label className={styles.label}>Special Notes / Questions</label>
                  <input
                    type="text"
                    placeholder="e.g. Would like to inspect battery and tyres"
                    className={styles.input}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>

                <div className={styles.formGroupFull}>
                  <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
                    {isSubmitting ? 'Scheduling Test Drive...' : `Schedule Free Test Drive for ${car.name}`}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
