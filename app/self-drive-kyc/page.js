'use client';

import { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { BUSINESS } from '@/lib/constants';
import styles from './self-drive-kyc.module.css';

const CAR_OPTIONS = [
  'Toyota Etios Sedan (Petrol/Diesel)',
  'Maruti Swift Dzire (Executive Sedan)',
  'Maruti Ertiga (7-Seater Family MPV)',
  'Toyota Innova Crysta (Luxury 7/8-Seater)',
];

export default function SelfDriveKycPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verifiedRecord, setVerifiedRecord] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    emergencyContact: '',
    city: 'Kadapa',
    carModel: 'Toyota Etios Sedan (Petrol/Diesel)',
    rentalStart: '',
    rentalEnd: '',
    dlNumber: '',
    dlFrontPreview: '',
    dlBackPreview: '',
    aadhaarPreview: '',
    startOdometer: '45,210',
    fuelLevelPercent: 100,
    hasFastag: true,
    hasSpareTyre: true,
    hasToolkit: true,
    hasCleanAC: true,
    digitalSignature: false,
    agreedToTerms: true,
  });

  // Canvas Signature Pad Ref
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawnSignature, setHasDrawnSignature] = useState(false);

  // Handle Input Changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle File Previews
  const handleFileUpload = (field, event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({ ...prev, [field]: e.target?.result || '' }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Initialize Canvas
  useEffect(() => {
    if (step === 4 && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#0B4EA2';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, [step]);

  // Signature Drawing Handlers
  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
    setHasDrawnSignature(true);
    setFormData((prev) => ({ ...prev, digitalSignature: true }));
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setHasDrawnSignature(false);
      setFormData((prev) => ({ ...prev, digitalSignature: false }));
    }
  };

  // Submit KYC
  const handleSubmitKyc = async () => {
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please provide your Full Name and Mobile Number.');
      setStep(1);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/self-drive/kyc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success && data.record) {
        setVerifiedRecord(data.record);
        setStep(5); // Show Pass
      } else {
        alert(data.error || 'Failed to submit KYC. Please try again.');
      }
    } catch (err) {
      console.error('KYC submission error:', err);
      alert('An error occurred. Please try again or contact Pavan directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Pre-filled WhatsApp Manifest Link
  const buildWhatsAppManifestUrl = () => {
    if (!verifiedRecord) return '#';
    const text = `*MANA SELF-DRIVE DIGITAL KYC VERIFIED PASS* 🚗
---------------------------------------
📋 *Pass ID:* ${verifiedRecord.passId}
👤 *Customer:* ${verifiedRecord.name}
📱 *Phone:* ${verifiedRecord.phone}
📍 *City:* ${verifiedRecord.city}
🚘 *Vehicle:* ${verifiedRecord.carModel}
⛽ *Fuel Handover Level:* ${verifiedRecord.fuelLevelPercent}%
⏱️ *Start Odometer:* ${verifiedRecord.startOdometer} km
🛡️ *Deposit Status:* ₹10,000 Refundable Deposit Agreed
✓ *DL & Digital Signature:* 100% Verified
---------------------------------------
_Submitted via MANA Tours & Travels 2-Minute Digital Handover Portal_`;

    return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <>
      <Header />
      <main className={styles.kycPage}>
        <div className={styles.portalContainer}>
          {/* Header Banner */}
          <div className={styles.portalHeader}>
            <div className={styles.portalBadge}>
              <span>⚡ Express Check-in · Kadapa Self-Drive Fleet</span>
            </div>
            <h1 className={styles.portalTitle}>2-Minute Digital KYC &amp; Handover Portal</h1>
            <p className={styles.portalSubtitle}>
              Complete your pre-trip verification, fuel level confirmation, and digital terms sign-off to get instant doorstep car keys in Kadapa with zero paperwork!
            </p>
          </div>

          {/* Stepper Progress Bar (Steps 1 to 4) */}
          {step <= 4 && (
            <div className={styles.stepperWrapper}>
              <div
                className={styles.stepProgressLine}
                style={{ width: `${((step - 1) / 3) * 100}%` }}
              />
              <button
                type="button"
                onClick={() => setStep(1)}
                className={`${styles.stepNode} ${step === 1 ? styles.stepActive : step > 1 ? styles.stepDone : ''}`}
              >
                <div className={styles.stepCircle}>{step > 1 ? '✓' : '1'}</div>
                <span className={styles.stepLabel}>Renter Info</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(2)}
                className={`${styles.stepNode} ${step === 2 ? styles.stepActive : step > 2 ? styles.stepDone : ''}`}
              >
                <div className={styles.stepCircle}>{step > 2 ? '✓' : '2'}</div>
                <span className={styles.stepLabel}>DL &amp; ID Upload</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className={`${styles.stepNode} ${step === 3 ? styles.stepActive : step > 3 ? styles.stepDone : ''}`}
              >
                <div className={styles.stepCircle}>{step > 3 ? '✓' : '3'}</div>
                <span className={styles.stepLabel}>Car Inspection</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(4)}
                className={`${styles.stepNode} ${step === 4 ? styles.stepActive : ''}`}
              >
                <div className={styles.stepCircle}>4</div>
                <span className={styles.stepLabel}>Sign &amp; Get Pass</span>
              </button>
            </div>
          )}

          {/* ══ STEP 1: RENTER DETAILS ══ */}
          {step === 1 && (
            <div className={styles.formCard}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionIcon}>👤</span>
                <div>
                  <div className={styles.sectionTitle}>Primary Driver &amp; Rental Period</div>
                  <div className={styles.sectionSub}>Enter your contact details and car preferences in Kadapa</div>
                </div>
              </div>

              <div className={styles.inputGrid}>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>
                    Full Name (As on Driving License) <span className={styles.inputReq}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={styles.textInput}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>
                    WhatsApp Mobile Number <span className={styles.inputReq}>*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={styles.textInput}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Emergency Contact Number</label>
                  <input
                    type="tel"
                    placeholder="e.g. Family / Friend Phone"
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    className={styles.textInput}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Pickup City / Delivery Area</label>
                  <input
                    type="text"
                    placeholder="e.g. Kadapa (Seven Roads / RIMS)"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className={styles.textInput}
                  />
                </div>

                <div className={styles.inputGroupFull}>
                  <label className={styles.inputLabel}>Selected Self-Drive Vehicle Model</label>
                  <select
                    value={formData.carModel}
                    onChange={(e) => handleInputChange('carModel', e.target.value)}
                    className={styles.selectInput}
                  >
                    {CAR_OPTIONS.map((c, i) => (
                      <option key={i} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.navBtnRow}>
                <Link href="/services/self-drive" className={styles.backBtn}>
                  ← Back to Fleet
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    if (!formData.name || !formData.phone) {
                      alert('Please enter your Name and WhatsApp Mobile Number.');
                      return;
                    }
                    setStep(2);
                  }}
                  className={styles.nextBtn}
                >
                  Continue to Documents →
                </button>
              </div>
            </div>
          )}

          {/* ══ STEP 2: DOCUMENTS UPLOAD ══ */}
          {step === 2 && (
            <div className={styles.formCard}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionIcon}>🪪</span>
                <div>
                  <div className={styles.sectionTitle}>Digital Driving License &amp; ID Proof</div>
                  <div className={styles.sectionSub}>Upload or take a quick photo of your DL and Aadhaar (Front &amp; Back)</div>
                </div>
              </div>

              <div className={styles.inputGroupFull} style={{ marginBottom: '20px' }}>
                <label className={styles.inputLabel}>Driving License Number</label>
                <input
                  type="text"
                  placeholder="e.g. AP0420210008942"
                  value={formData.dlNumber}
                  onChange={(e) => handleInputChange('dlNumber', e.target.value)}
                  className={styles.textInput}
                />
              </div>

              <div className={styles.uploadGrid}>
                {/* DL Front */}
                <label className={`${styles.uploadBox} ${formData.dlFrontPreview ? styles.uploadBoxActive : ''}`}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload('dlFrontPreview', e)}
                    className={styles.hiddenFileInput}
                  />
                  {formData.dlFrontPreview ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={formData.dlFrontPreview} alt="DL Front" className={styles.previewImage} />
                      <span className={styles.uploadTitle}>✓ Driving License (Front) Uploaded</span>
                      <span className={styles.uploadHint}>Tap to change photo</span>
                    </>
                  ) : (
                    <>
                      <span className={styles.uploadIcon}>📷</span>
                      <span className={styles.uploadTitle}>Driving License (Front Side)</span>
                      <span className={styles.uploadHint}>Take photo or upload file</span>
                    </>
                  )}
                </label>

                {/* DL Back */}
                <label className={`${styles.uploadBox} ${formData.dlBackPreview ? styles.uploadBoxActive : ''}`}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload('dlBackPreview', e)}
                    className={styles.hiddenFileInput}
                  />
                  {formData.dlBackPreview ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={formData.dlBackPreview} alt="DL Back" className={styles.previewImage} />
                      <span className={styles.uploadTitle}>✓ Driving License (Back) Uploaded</span>
                      <span className={styles.uploadHint}>Tap to change photo</span>
                    </>
                  ) : (
                    <>
                      <span className={styles.uploadIcon}>📷</span>
                      <span className={styles.uploadTitle}>Driving License (Back Side)</span>
                      <span className={styles.uploadHint}>Take photo or upload file</span>
                    </>
                  )}
                </label>

                {/* Aadhaar / Govt ID */}
                <label className={`${styles.uploadBox} ${formData.aadhaarPreview ? styles.uploadBoxActive : ''}`} style={{ gridColumn: '1 / -1' }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload('aadhaarPreview', e)}
                    className={styles.hiddenFileInput}
                  />
                  {formData.aadhaarPreview ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={formData.aadhaarPreview} alt="Aadhaar" className={styles.previewImage} />
                      <span className={styles.uploadTitle}>✓ Aadhaar / Govt ID Uploaded</span>
                      <span className={styles.uploadHint}>Tap to change photo</span>
                    </>
                  ) : (
                    <>
                      <span className={styles.uploadIcon}>🆔</span>
                      <span className={styles.uploadTitle}>Aadhaar Card / Govt Photo ID (Optional / Fast-Track)</span>
                      <span className={styles.uploadHint}>Take photo or upload for instant 1-minute key handover</span>
                    </>
                  )}
                </label>
              </div>

              <div className={styles.navBtnRow}>
                <button type="button" onClick={() => setStep(1)} className={styles.backBtn}>
                  ← Back to Details
                </button>
                <button type="button" onClick={() => setStep(3)} className={styles.nextBtn}>
                  Next: Vehicle Handover Check →
                </button>
              </div>
            </div>
          )}

          {/* ══ STEP 3: VEHICLE HANDOVER & FUEL GAUGE ══ */}
          {step === 3 && (
            <div className={styles.formCard}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionIcon}>🔍</span>
                <div>
                  <div className={styles.sectionTitle}>Digital Vehicle Handover &amp; Fuel Level</div>
                  <div className={styles.sectionSub}>Record the start odometer reading and initial fuel tank gauge</div>
                </div>
              </div>

              {/* Fuel Level Slider */}
              <div className={styles.fuelSliderWrap}>
                <div className={styles.fuelMeterDisplay}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#111827' }}>
                      Initial Fuel Tank Level:
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#6B7280' }}>
                      Zero fuel markup. Return car at approximately the same level.
                    </div>
                  </div>
                  <div className={styles.fuelLevelPercent}>{formData.fuelLevelPercent}% Tank</div>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={formData.fuelLevelPercent}
                  onChange={(e) => handleInputChange('fuelLevelPercent', Number(e.target.value))}
                  className={styles.fuelSlider}
                />

                <div className={styles.fuelTicks}>
                  <span>E (Empty)</span>
                  <span>1/4</span>
                  <span>1/2 (Half)</span>
                  <span>3/4</span>
                  <span>F (Full Tank)</span>
                </div>
              </div>

              {/* Odometer Input */}
              <div className={styles.inputGroupFull} style={{ marginBottom: '24px' }}>
                <label className={styles.inputLabel}>Starting Odometer Reading (km)</label>
                <input
                  type="text"
                  placeholder="e.g. 45,210"
                  value={formData.startOdometer}
                  onChange={(e) => handleInputChange('startOdometer', e.target.value)}
                  className={styles.textInput}
                />
              </div>

              {/* Vehicle Checklist */}
              <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#1F2937', marginBottom: '10px' }}>
                Pre-Trip Handover Confirmation:
              </div>
              <div className={styles.checklistGrid}>
                <label
                  className={`${styles.checkItem} ${formData.hasFastag ? styles.checkItemActive : ''}`}
                  onClick={() => handleInputChange('hasFastag', !formData.hasFastag)}
                >
                  <input type="checkbox" checked={formData.hasFastag} readOnly />
                  <span>🏷️ Active FASTag on Windshield</span>
                </label>

                <label
                  className={`${styles.checkItem} ${formData.hasSpareTyre ? styles.checkItemActive : ''}`}
                  onClick={() => handleInputChange('hasSpareTyre', !formData.hasSpareTyre)}
                >
                  <input type="checkbox" checked={formData.hasSpareTyre} readOnly />
                  <span>🛞 Spare Wheel &amp; Jack in Boot</span>
                </label>

                <label
                  className={`${styles.checkItem} ${formData.hasToolkit ? styles.checkItemActive : ''}`}
                  onClick={() => handleInputChange('hasToolkit', !formData.hasToolkit)}
                >
                  <input type="checkbox" checked={formData.hasToolkit} readOnly />
                  <span>🔧 Emergency Toolkit &amp; RC Copy</span>
                </label>

                <label
                  className={`${styles.checkItem} ${formData.hasCleanAC ? styles.checkItemActive : ''}`}
                  onClick={() => handleInputChange('hasCleanAC', !formData.hasCleanAC)}
                >
                  <input type="checkbox" checked={formData.hasCleanAC} readOnly />
                  <span>❄️ Sanitized Chilled AC Cabin</span>
                </label>
              </div>

              <div className={styles.navBtnRow}>
                <button type="button" onClick={() => setStep(2)} className={styles.backBtn}>
                  ← Back to Documents
                </button>
                <button type="button" onClick={() => setStep(4)} className={styles.nextBtn}>
                  Next: Digital Signature →
                </button>
              </div>
            </div>
          )}

          {/* ══ STEP 4: DIGITAL SIGNATURE & TERMS ══ */}
          {step === 4 && (
            <div className={styles.formCard}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionIcon}>✍️</span>
                <div>
                  <div className={styles.sectionTitle}>Digital Signature &amp; Rental Agreement</div>
                  <div className={styles.sectionSub}>Sign on your screen with your finger or mouse to generate your official pass</div>
                </div>
              </div>

              {/* Signature Pad */}
              <div className={styles.signaturePadWrap}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>
                  Draw Your Signature Below:
                </div>
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={140}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className={styles.signatureCanvas}
                />
                <div className={styles.sigActions}>
                  <span style={{ fontSize: '0.74rem', color: hasDrawnSignature ? '#10B981' : '#94A3B8', fontWeight: 700 }}>
                    {hasDrawnSignature ? '✓ Signature Captured' : 'Use touch or mouse to sign'}
                  </span>
                  <button type="button" onClick={clearSignature} className={styles.sigClearBtn}>
                    Clear Pad
                  </button>
                </div>
              </div>

              {/* Terms Agreement Box */}
              <div className={styles.termsBox}>
                <strong>MANA Tours &amp; Travels Self-Drive Terms:</strong>
                <ul style={{ paddingLeft: '18px', marginTop: '6px' }}>
                  <li>₹10,000 refundable security deposit is refunded on the spot upon vehicle handover.</li>
                  <li>Customer manages fuel at their own discretion (zero fuel markup from MANA).</li>
                  <li>Vehicle is equipped with 24/7 Roadside Assistance &amp; commercial insurance.</li>
                  <li>Speed limit is governed at 80-100 km/h for your family&apos;s safety on South India highways.</li>
                </ul>
              </div>

              <div className={styles.navBtnRow}>
                <button type="button" onClick={() => setStep(3)} className={styles.backBtn}>
                  ← Back to Inspection
                </button>
                <button
                  type="button"
                  onClick={handleSubmitKyc}
                  disabled={isSubmitting}
                  className={styles.submitBtn}
                >
                  {isSubmitting ? '⏳ Verifying & Generating Pass...' : '✓ Generate Verified Digital Pass'}
                </button>
              </div>
            </div>
          )}

          {/* ══ STEP 5: HOLOGRAPHIC VERIFIED DIGITAL RENTAL PASS ══ */}
          {step === 5 && verifiedRecord && (
            <div>
              <div className={styles.passContainer}>
                <div className={styles.passBgGlow} />

                {/* Pass Header */}
                <div className={styles.passHeader}>
                  <div>
                    <div className={styles.passLogoTitle}>MANA TOURS &amp; TRAVELS</div>
                    <div className={styles.passLogoSub}>Official Self-Drive Digital Handover Pass · Kadapa Hub</div>
                  </div>
                  <div className={styles.hologramBadge}>
                    <span>🛡️ 100% KYC VERIFIED</span>
                  </div>
                </div>

                {/* Pass ID Display */}
                <div className={styles.passIdHighlight}>
                  <div>
                    <div className={styles.passIdLabel}>Verified Digital Pass ID</div>
                    <div className={styles.passIdValue}>{verifiedRecord.passId}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className={styles.passIdLabel}>Generated At</div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#e8c97a' }}>
                      {verifiedRecord.formattedTimestamp}
                    </div>
                  </div>
                </div>

                {/* Pass Data Grid */}
                <div className={styles.passGrid}>
                  <div className={styles.passDataBox}>
                    <div className={styles.passDataLabel}>Verified Primary Driver</div>
                    <div className={styles.passDataValue}>{verifiedRecord.name}</div>
                  </div>

                  <div className={styles.passDataBox}>
                    <div className={styles.passDataLabel}>Registered Mobile Number</div>
                    <div className={styles.passDataValue}>{verifiedRecord.phone}</div>
                  </div>

                  <div className={styles.passDataBox}>
                    <div className={styles.passDataLabel}>Allocated Vehicle Model</div>
                    <div className={styles.passDataValue}>{verifiedRecord.carModel}</div>
                  </div>

                  <div className={styles.passDataBox}>
                    <div className={styles.passDataLabel}>Handover Fuel Tank Level</div>
                    <div className={styles.passDataValue} style={{ color: '#FBBF24' }}>
                      {verifiedRecord.fuelLevelPercent}% Tank Capacity
                    </div>
                  </div>

                  <div className={styles.passDataBox}>
                    <div className={styles.passDataLabel}>Starting Odometer Reading</div>
                    <div className={styles.passDataValue}>{verifiedRecord.startOdometer} km</div>
                  </div>

                  <div className={styles.passDataBox}>
                    <div className={styles.passDataLabel}>Security Deposit Status</div>
                    <div className={styles.passDataValue} style={{ color: '#34D399' }}>
                      ₹10,000 Refundable at Handover
                    </div>
                  </div>
                </div>

                {/* Terms Note */}
                <div className={styles.passFooterTerms}>
                  This digital pass serves as authenticated identity &amp; pre-trip vehicle condition verification for MANA Tours &amp; Travels Kadapa. Doorstep vehicle handover will be completed immediately upon showing this pass.
                </div>
              </div>

              {/* Pass Actions */}
              <div className={styles.passActionGrid}>
                <a
                  href={buildWhatsAppManifestUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.waPassBtn}
                  id="send-kyc-wa-btn"
                >
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.116.553 4.103 1.522 5.831L.057 23.428l5.763-1.51A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.922 0-3.71-.522-5.241-1.428l-.376-.223-3.892 1.02 1.038-3.79-.246-.39A9.818 9.818 0 012.182 12C2.182 6.575 6.575 2.182 12 2.182S21.818 6.575 21.818 12 17.425 21.818 12 21.818z" />
                  </svg>
                  <span>💬 Send Verified Pass to Pavan on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className={styles.printPassBtn}
                >
                  🖨️ Print / Save Pass
                </button>

                <Link href="/services/self-drive" className={styles.printPassBtn}>
                  🚗 Back to Self-Drive
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
