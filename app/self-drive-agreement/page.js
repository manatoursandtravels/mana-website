'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { BUSINESS } from '@/lib/constants';
import styles from './agreement.module.css';

function AgreementContent() {
  const searchParams = useSearchParams();

  // Pre-fillable parameters from URL (e.g., from KYC ledger or admin)
  const [formData, setFormData] = useState({
    refNo: searchParams.get('ref') || '',
    date: searchParams.get('date') || new Date().toLocaleDateString('en-GB'),
    customerName: searchParams.get('name') || '',
    customerPhone: searchParams.get('phone') || '',
    dlNumber: searchParams.get('dl') || '',
    aadhaarNumber: searchParams.get('aadhaar') || '',
    carModel: searchParams.get('car') || '',
    regNumber: searchParams.get('reg') || '',
    handoverKm: searchParams.get('km') || '',
    fuelLevel: searchParams.get('fuel') || '100% (Full)',
    depositAmount: searchParams.get('deposit') || '10,000',
    tariffAmount: searchParams.get('tariff') || '2,199',
    durationDays: searchParams.get('days') || '1',
  });

  const [isEditable, setIsEditable] = useState(false);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleShare = () => {
    const text = encodeURIComponent(
      `*MANA Tours & Travels — Self-Drive Rental Agreement*\n` +
      `Official printable rental agreement & safety guidelines for Kadapa:\n` +
      `https://www.manatoursandtravels.com/self-drive-agreement`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className={styles.pageWrapper}>
      {/* ═══════════════════════════════════════════════════════════════════
          1. TOP ACTION CONTROLS (HIDDEN ON PRINT)
          ═══════════════════════════════════════════════════════════════════ */}
      <div className={`${styles.topBar} ${styles.noPrint}`}>
        <div className={styles.topBarInfo}>
          <div className={styles.topTitle}>
            📄 Self-Drive Rental Agreement &amp; Handover Manifest
          </div>
          <div className={styles.topSubtitle}>
            Official legal contract for MANA Tours &amp; Travels Kadapa · Formatted for standard A4 physical printing
          </div>
        </div>

        <div className={styles.topActions}>
          <button
            className={styles.btnActionSecondary}
            onClick={() => setIsEditable(!isEditable)}
          >
            {isEditable ? '🔒 Lock & Preview' : '✍️ Quick Pre-Fill Form'}
          </button>

          <button className={styles.btnPrint} onClick={handlePrint}>
            🖨️ Print A4 / Save PDF
          </button>

          <button className={styles.btnActionSecondary} onClick={handleShare}>
            💬 Share Agreement Link
          </button>

          <Link href="/services/self-drive" className={styles.btnActionSecondary}>
            ← Fleet Showcase
          </Link>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          2. PRINTABLE A4 PAPER SHEET CONTAINER
          ═══════════════════════════════════════════════════════════════════ */}
      <main className={styles.paperSheet}>
        {/* Document Header */}
        <header className={styles.docHeader}>
          <div className={styles.brandColumn}>
            <h1 className={styles.companyName}>{BUSINESS.name}</h1>
            <p className={styles.companyTagline}>{BUSINESS.tagline}</p>
            <div className={styles.companyMeta}>
              <strong>Head Office:</strong> {BUSINESS.address}<br />
              <strong>Fleet &amp; Outstation Desk:</strong> {BUSINESS.phone.pavanDisplay} · <strong>24/7 Concierge:</strong> {BUSINESS.phone.helpdeskDisplay}<br />
              <strong>Website:</strong> www.manatoursandtravels.com · <strong>Email:</strong> {BUSINESS.email}
            </div>
          </div>

          <div className={styles.docIdColumn}>
            <span className={styles.docBadge}>OFFICIAL CONTRACT</span>
            <div className={styles.docRefText}>
              REF: {formData.refNo || 'MANA/SD/2026/______'}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#475569' }}>
              Date: {formData.date}
            </div>
          </div>
        </header>

        <div className={styles.docTitleBar}>
          <h2 className={styles.docTitle}>SELF-DRIVE VEHICLE RENTAL AGREEMENT &amp; HANDOVER MANIFEST</h2>
        </div>

        {/* 1. PARTIES */}
        <section>
          <div className={styles.sectionTitle}>1. PARTIES TO THE AGREEMENT</div>
          <p className={styles.clauseText}>
            This Self-Drive Rental Agreement is executed between <strong>MANA TOURS AND TRAVELS</strong> (hereinafter called the <strong>"Company"</strong>) and the verified customer specified below (hereinafter called the <strong>"Customer"</strong>).
          </p>

          <table className={styles.table}>
            <tbody>
              <tr>
                <td style={{ width: '22%' }}><strong>Customer Full Name:</strong></td>
                <td style={{ width: '45%' }}>
                  {isEditable ? (
                    <input
                      type="text"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      placeholder="Enter Customer Name"
                      style={{ width: '100%', border: 'none', background: '#F1F5F9', padding: '4px' }}
                    />
                  ) : (
                    formData.customerName || '________________________________________________'
                  )}
                </td>
                <td style={{ width: '15%' }}><strong>Mobile No:</strong></td>
                <td>
                  {isEditable ? (
                    <input
                      type="text"
                      value={formData.customerPhone}
                      onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                      placeholder="+91 Phone"
                      style={{ width: '100%', border: 'none', background: '#F1F5F9', padding: '4px' }}
                    />
                  ) : (
                    formData.customerPhone || '+91 ____________________'
                  )}
                </td>
              </tr>
              <tr>
                <td><strong>Driving Licence (DL):</strong></td>
                <td>
                  {isEditable ? (
                    <input
                      type="text"
                      value={formData.dlNumber}
                      onChange={(e) => setFormData({ ...formData, dlNumber: e.target.value })}
                      placeholder="DL Number"
                      style={{ width: '100%', border: 'none', background: '#F1F5F9', padding: '4px' }}
                    />
                  ) : (
                    formData.dlNumber || '________________________________'
                  )}
                </td>
                <td><strong>DL Validity:</strong></td>
                <td>____ / ____ / ________</td>
              </tr>
              <tr>
                <td><strong>Aadhaar / Passport:</strong></td>
                <td>
                  {isEditable ? (
                    <input
                      type="text"
                      value={formData.aadhaarNumber}
                      onChange={(e) => setFormData({ ...formData, aadhaarNumber: e.target.value })}
                      placeholder="Aadhaar / ID"
                      style={{ width: '100%', border: 'none', background: '#F1F5F9', padding: '4px' }}
                    />
                  ) : (
                    formData.aadhaarNumber || '________________________________'
                  )}
                </td>
                <td><strong>Emergency Contact:</strong></td>
                <td>+91 ____________________</td>
              </tr>
              <tr>
                <td><strong>Residential Address:</strong></td>
                <td colSpan={3}>________________________________________________________________________________ City: ________________</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 2. VEHICLE SPECIFICATIONS */}
        <section>
          <div className={styles.sectionTitle}>2. VEHICLE SPECIFICATIONS &amp; HANDOVER TELEMETRY</div>
          <table className={styles.table}>
            <tbody>
              <tr>
                <td style={{ width: '22%' }}><strong>Vehicle Make &amp; Model:</strong></td>
                <td style={{ width: '38%' }}>
                  {isEditable ? (
                    <input
                      type="text"
                      value={formData.carModel}
                      onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
                      placeholder="e.g. Mahindra XUV 3XO"
                      style={{ width: '100%', border: 'none', background: '#F1F5F9', padding: '4px' }}
                    />
                  ) : (
                    formData.carModel || '____________________________________'
                  )}
                </td>
                <td style={{ width: '18%' }}><strong>Registration No:</strong></td>
                <td>
                  {isEditable ? (
                    <input
                      type="text"
                      value={formData.regNumber}
                      onChange={(e) => setFormData({ ...formData, regNumber: e.target.value })}
                      placeholder="AP ____ ____ ____"
                      style={{ width: '100%', border: 'none', background: '#F1F5F9', padding: '4px' }}
                    />
                  ) : (
                    formData.regNumber || 'AP ____ ____ ________'
                  )}
                </td>
              </tr>
              <tr>
                <td><strong>Handover Odometer:</strong></td>
                <td>
                  <strong>{formData.handoverKm ? `${formData.handoverKm} km` : '________________ km'}</strong>
                </td>
                <td><strong>Fuel at Handover:</strong></td>
                <td>{formData.fuelLevel} [ ] Full [ ] 75% [ ] 50%</td>
              </tr>
              <tr>
                <td><strong>GPS Telematics Tracker:</strong></td>
                <td><span style={{ color: '#059669', fontWeight: 800 }}>✓ ACTIVE (MANA-TEL-SECURE)</span></td>
                <td><strong>FASTag Wallet ID:</strong></td>
                <td>Linked &amp; Active [✓]</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 3. TARIFF & SECURITY DEPOSIT */}
        <section>
          <div className={styles.sectionTitle}>3. RENTAL TARIFF, PAYMENT &amp; SECURITY DEPOSIT</div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Rental Duration</th>
                <th>Daily Tariff (₹)</th>
                <th>Security Deposit (100% Refundable)</th>
                <th>Advance Paid</th>
                <th>Balance Due at Handover</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{formData.durationDays} Day(s) (24-Hour Blocks)</td>
                <td>₹ {formData.tariffAmount} / day</td>
                <td><strong>₹ {formData.depositAmount}</strong></td>
                <td>₹ ________________</td>
                <td>₹ ________________</td>
              </tr>
            </tbody>
          </table>
          <p className={styles.clauseText}>
            <strong>3.1. Deposit Nature &amp; Immediate Refund:</strong> The Security Deposit is held as a non-interest-bearing fiduciary guarantee against physical damage, fuel deficit, and tolls. Physical vehicle inspection and initial deposit settlement will be completed within <strong>2 hours</strong> of vehicle return.
          </p>
        </section>

        {/* 4. FUEL & KILOMETRES */}
        <section>
          <div className={styles.sectionTitle}>4. CUSTOMER-MANAGED FUEL (0% MARKUP) &amp; KILOMETRE POLICY</div>
          <p className={styles.clauseText}>
            <strong>4.1. Same-to-Same Fuel Policy:</strong> The vehicle must be returned with the exact fuel level recorded at handover. Shortfall will be billed at prevailing pump rates plus a nominal ₹150 refueling fee. No refunds are provided for surplus fuel.
          </p>
          <p className={styles.clauseText}>
            <strong>4.2. Kilometre Allowance:</strong> Standard daily allowance is <strong>300 km / 24 hours</strong>. Extra usage beyond allowance is charged at <strong>₹11/km (Sedans)</strong> or <strong>₹14/km (Mahindra XUV 3XO SUV / MPVs)</strong>.
          </p>
        </section>

        {/* 5. CRITICAL OPERATIONAL PROTECTIONS */}
        <section>
          <div className={styles.sectionTitle}>5. CRITICAL SAFETY RESTRICTIONS &amp; LEGAL SHIELDS</div>

          <div className={styles.warningBox}>
            <strong>⚠️ 5.1. SUNROOF SAFETY &amp; PROHIBITION (MVA Section 184):</strong><br />
            For vehicles equipped with an electric sunroof (Mahindra XUV 3XO), <strong>standing, sitting, or poking body parts through the sunroof while the car is moving is strictly illegal under Indian law</strong>. Any police e-challan, physical accident, or third-party injury resulting from sunroof standing is the <strong>100% exclusive civil and criminal liability of the Customer</strong>.
          </div>

          <p className={styles.clauseText}>
            <strong>5.2. Off-Roading &amp; Hydrostatic Lock Exclusion:</strong> The vehicle must be operated solely on metalled, paved public roads. Driving into rocky canyon edges (Gandikota), riverbeds (Chitravathi/Pennar), or flooded causeways is strictly prohibited. <strong>Engine water seizure (Hydrostatic Lock) and underbody oil-sump damage are not covered by motor insurance</strong> and shall be repaired entirely at the Customer&apos;s expense.
          </p>

          <p className={styles.clauseText}>
            <strong>5.3. Highway Speed Governor:</strong> Vehicle speed is electronically monitored and capped at <strong>90 km/h</strong> (100 km/h on expressways). Persistent reckless driving exceeding 105 km/h triggers automated siren alerts and incurs a ₹500 safety penalty per incident.
          </p>

          <p className={styles.clauseText}>
            <strong>5.4. Delayed Traffic E-Challans:</strong> The Customer is solely liable for all traffic speed camera fines and signal violations during the rental period. If an automated e-challan appears on the Parivahan portal post-return matching the rental timestamps, the Customer explicitly agrees to reimburse the Company via UPI within <strong>48 hours</strong> of digital notice.
          </p>

          <p className={styles.clauseText}>
            <strong>5.5. Interior Hygiene &amp; No-Smoking Policy:</strong> Smoking cigarettes, beedis, or vapes inside the car, or returning the vehicle with alcohol spills, chewing tobacco marks, or pet hair incurs a mandatory <strong>₹1,500 deep-clean sanitization fee</strong>.
          </p>

          <p className={styles.clauseText}>
            <strong>5.6. 24/7 GPS Tracking Consent:</strong> The Customer expressly consents to active telematics tracking and emergency remote engine immobilization in the event of theft, boundary breaches, or criminal investigation.
          </p>
        </section>

        {/* 6. SIGNATURES & DECLARATION */}
        <section style={{ pageBreakInside: 'avoid' }}>
          <div className={styles.sectionTitle}>6. CUSTOMER DECLARATION &amp; BINDING SIGN-OFF</div>
          <p className={styles.clauseText} style={{ fontSize: '0.80rem' }}>
            I confirm that I have inspected the vehicle, hold a valid permanent driving licence, accept the recorded condition, agree to the speed and sunroof safety regulations, and authorize the Company to reconcile valid traffic e-challans and tolls incurred during my journey.
          </p>

          <div className={styles.sigGrid}>
            <div className={styles.sigBox}>
              <div className={styles.sigTitle}>CUSTOMER / PRIMARY RENTER</div>
              <div className={styles.sigSpace}></div>
              <div style={{ fontSize: '0.78rem' }}>
                Signature: ________________________________<br />
                Name: {formData.customerName || '________________________________'}<br />
                Date: {formData.date}
              </div>
            </div>

            <div className={styles.sigBox}>
              <div className={styles.sigTitle}>FOR MANA TOURS &amp; TRAVELS</div>
              <div className={styles.sigSpace}></div>
              <div style={{ fontSize: '0.78rem' }}>
                Authorized Rep: __________________________<br />
                Fleet Concierge Desk (Kadapa)<br />
                Seal:
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SCHEDULE A: HANDOVER INSPECTION CHECKLIST
            ═══════════════════════════════════════════════════════════════════ */}
        <div className={styles.pageBreak}></div>
        <div className={styles.scheduleHeader}>
          SCHEDULE A: VEHICLE HANDOVER INSPECTION CHECKLIST (PRE-DEPARTURE)
        </div>

        <table className={styles.table} style={{ marginTop: '12px' }}>
          <thead>
            <tr>
              <th style={{ width: '30%' }}>Inspection Item</th>
              <th style={{ width: '15%' }}>Condition</th>
              <th>Pre-Existing Notes / Scratches Recorded</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Front Bumper, Grille &amp; Headlights</td>
              <td>[ ] OK [ ] Marked</td>
              <td>________________________________________________</td>
            </tr>
            <tr>
              <td>Windshield, Wipers &amp; Mirrors</td>
              <td>[ ] OK [ ] Marked</td>
              <td>________________________________________________</td>
            </tr>
            <tr>
              <td>Right Side Panels &amp; Doors</td>
              <td>[ ] OK [ ] Marked</td>
              <td>________________________________________________</td>
            </tr>
            <tr>
              <td>Left Side Panels &amp; Doors</td>
              <td>[ ] OK [ ] Marked</td>
              <td>________________________________________________</td>
            </tr>
            <tr>
              <td>Rear Bumper, Bootlid &amp; Tail Lamps</td>
              <td>[ ] OK [ ] Marked</td>
              <td>________________________________________________</td>
            </tr>
            <tr>
              <td>Sunroof Mechanism &amp; Roof Rails</td>
              <td>[ ] OK [ ] Marked</td>
              <td>Tested Functional [✓]</td>
            </tr>
            <tr>
              <td>All 4 Tyres &amp; Alloy Wheels</td>
              <td>[ ] OK [ ] Marked</td>
              <td>No sidewall cuts / Tread OK [✓]</td>
            </tr>
            <tr>
              <td>Spare Wheel (Stepney) &amp; Jack / Tool Kit</td>
              <td>[ ] Verified</td>
              <td>Located in boot, inflated [✓]</td>
            </tr>
            <tr>
              <td>Cabin Upholstery &amp; AC Cooling</td>
              <td>[ ] Spotless</td>
              <td>Sanitized, zero smoking odour [✓]</td>
            </tr>
            <tr>
              <td>360° Inspection Video Recorded</td>
              <td>[ ] YES [ ] NO</td>
              <td>Saved to MANA Digital Archive [✓]</td>
            </tr>
          </tbody>
        </table>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '0.80rem' }}>
          <span>Customer Handover Sign: ___________________________</span>
          <span>Company Inspector: ___________________________</span>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            SCHEDULE B: RETURN & DEPOSIT SETTLEMENT SHEET
            ═══════════════════════════════════════════════════════════════════ */}
        <div className={styles.scheduleHeader} style={{ marginTop: '24px' }}>
          SCHEDULE B: VEHICLE RETURN &amp; DEPOSIT RECONCILIATION SHEET
        </div>

        <table className={styles.table} style={{ marginTop: '12px' }}>
          <tbody>
            <tr>
              <td style={{ width: '30%' }}><strong>Return Date &amp; Time:</strong></td>
              <td style={{ width: '30%' }}>____ / ____ / 2026 at ____:____</td>
              <td style={{ width: '20%' }}><strong>Return Odometer:</strong></td>
              <td>____________ km</td>
            </tr>
            <tr>
              <td><strong>Initial Security Deposit:</strong></td>
              <td colSpan={3}><strong>₹ {formData.depositAmount}</strong></td>
            </tr>
            <tr>
              <td><em>Less:</em> Extra Km Surcharge:</td>
              <td colSpan={3}>(-) ₹ _________ (______ km @ ₹ ____/km)</td>
            </tr>
            <tr>
              <td><em>Less:</em> Fuel Deficit Adjustment:</td>
              <td colSpan={3}>(-) ₹ _________ (Return Fuel Level: ____%)</td>
            </tr>
            <tr>
              <td><em>Less:</em> FASTag Toll Deductions:</td>
              <td colSpan={3}>(-) ₹ _________ (FASTag statement reconciled)</td>
            </tr>
            <tr>
              <td><em>Less:</em> Cleaning / Smoking Fee:</td>
              <td colSpan={3}>(-) ₹ _________ (Clause 5.5 Sanitization Charge)</td>
            </tr>
            <tr>
              <td><em>Less:</em> Documented Damage:</td>
              <td colSpan={3}>(-) ₹ _________</td>
            </tr>
            <tr style={{ background: '#F8FAFC' }}>
              <td><strong>NET REFUNDABLE DEPOSIT:</strong></td>
              <td colSpan={3}><strong>₹ __________________</strong> (Processed via Instant UPI)</td>
            </tr>
          </tbody>
        </table>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '14px', fontSize: '0.80rem' }}>
          <span>Customer Settlement Acknowledgment: ___________________________</span>
          <span>Refund UPI Ref (UTR): ___________________________</span>
        </div>

        <footer style={{ marginTop: '28px', paddingTop: '12px', borderTop: '1px solid #CBD5E1', textAlign: 'center', fontSize: '0.74rem', color: '#64748B' }}>
          MANA TOURS AND TRAVELS · KADAPA, ANDHRA PRADESH · EVERY JOURNEY, A NEW EXPERIENCE · WWW.MANATOURSANDTRAVELS.COM
        </footer>
      </main>
    </div>
  );
}

export default function SelfDriveAgreementPage() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', color: '#fff', textAlign: 'center' }}>Loading Agreement Form...</div>}>
      <AgreementContent />
    </Suspense>
  );
}
