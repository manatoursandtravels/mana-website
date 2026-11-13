'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { BUSINESS } from '@/lib/constants';
import styles from './agreement.module.css';

function PartnerAgreementContent() {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    refNo: searchParams.get('ref') || 'MANA/VAP/2026-27/001',
    date: searchParams.get('date') || '14/11/2026',
    effectiveDate: searchParams.get('effective') || '14/11/2026',
    ownerName: searchParams.get('owner') || 'TIRUVAYIPATI SRI LAKSHMI DEVI',
    ownerAddress: searchParams.get('address') || 'Kadapa, YSR District, Andhra Pradesh',
    ownerPhone: searchParams.get('phone') || '',
    ownerAadhaar: searchParams.get('aadhaar') || '',
    ownerPan: searchParams.get('pan') || '',
    bankAccount: searchParams.get('account') || '',
    bankName: searchParams.get('bank') || '',
    ifscCode: searchParams.get('ifsc') || '',
    vehicleMake: 'Maruti Suzuki',
    vehicleModel: 'Ertiga VXi (SHVS Smart Hybrid)',
    seatingCapacity: '7 Seater (2 + 3 + 2)',
    regNumber: searchParams.get('reg') || 'AP 04 Temporary / In Process',
    chassisNumber: searchParams.get('chassis') || '',
    engineNumber: searchParams.get('engine') || '',
    dealerInvoice: 'M.S.A. Motors Ref #224 (05/10/2026)',
    invoiceAmount: '₹12,06,000',
    extendedWarranty: '6 Years / 1,60,000 Kilometres',
    insurancePolicy: 'Comprehensive Bumper-to-Bumper (1+3 Years Zero Dep)',
    handoverKm: searchParams.get('km') || '45 km (Showroom Delivery)',
    fuelLevel: '100% (Full Tank)',
    payoutModel: 'modelA', // modelA (70/30) | modelB (Per Day) | modelC (Monthly)
    perDayAmount: '1,800',
    monthlyAmount: '42,000',
    settlementCycle: 'Weekly (Every Monday via UPI / NEFT)',
  });

  const [isEditable, setIsEditable] = useState(false);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleShare = () => {
    const text = encodeURIComponent(
      `*MANA Tours & Travels — Commercial Vehicle Attachment Agreement*\n` +
      `Owner: ${formData.ownerName}\n` +
      `Vehicle: Maruti Suzuki Ertiga VXi (7-Seater)\n` +
      `View & Print Official Agreement:\n` +
      `https://www.manatoursandtravels.com/partner-agreement`
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
            🤝 Commercial Vehicle Attachment &amp; Fleet Operations Agreement
          </div>
          <div className={styles.topSubtitle}>
            Partner: Smt. Tiruvayipati Sri Lakshmi Devi · Maruti Suzuki Ertiga VXi (7-Seater) · Effective 14 Nov 2026
          </div>
        </div>

        <div className={styles.topActions}>
          <button
            onClick={() => setIsEditable(!isEditable)}
            className={styles.btnSecondary}
            title="Toggle inline editing for blank fields"
          >
            {isEditable ? '💾 Lock Edit Mode' : '✏️ Edit / Fill Details'}
          </button>

          <button
            onClick={handleShare}
            className={styles.btnSecondary}
            title="Share agreement via WhatsApp"
          >
            💬 Share WhatsApp
          </button>

          <button
            onClick={handlePrint}
            className={styles.btnPrint}
            title="Print A4 / Save as PDF"
          >
            🖨️ Print A4 / Save PDF
          </button>

          <Link href="/admin" className={styles.btnSecondary}>
            ⚙️ Admin Hub
          </Link>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          2. MAIN LEGAL DOCUMENT CONTAINER (A4 FORMATTED)
          ═══════════════════════════════════════════════════════════════════ */}
      <main className={styles.documentSheet} id="printable-agreement">
        {/* Document Header */}
        <header className={styles.docHeader}>
          <div className={styles.brandRow}>
            <div>
              <h1 className={styles.brandTitle}>MANA TOURS AND TRAVELS</h1>
              <p className={styles.brandTagline}>
                Premier Fleet Operations &amp; Commercial Vehicle Management · Kadapa, Andhra Pradesh
              </p>
            </div>
            <div className={styles.badgeOfficial}>
              OFFICIAL PARTNERSHIP CONTRACT
            </div>
          </div>

          <div className={styles.headerMetaGrid}>
            <div>
              <strong>Agreement Reference:</strong> {formData.refNo}
            </div>
            <div>
              <strong>Execution Date:</strong> {formData.date}
            </div>
            <div>
              <strong>Effective Handover Date:</strong> {formData.effectiveDate}
            </div>
            <div>
              <strong>Jurisdiction:</strong> Kadapa, YSR District (A.P.)
            </div>
          </div>
        </header>

        <h2 className={styles.agreementTitle}>
          COMMERCIAL VEHICLE ATTACHMENT &amp; FLEET OPERATIONS PARTNERSHIP AGREEMENT
        </h2>
        <div className={styles.agreementNotice}>
          (Executed in Kadapa on 14th November 2026 · Suitable for execution on Non-Judicial Stamp Paper)
        </div>

        {/* ══ SECTION 1: PARTIES ══ */}
        <section className={styles.sectionBlock}>
          <h3 className={styles.sectionHeading}>1. PARTIES TO THE AGREEMENT</h3>
          <p className={styles.clausePara}>
            This Commercial Vehicle Attachment &amp; Fleet Operations Partnership Agreement is made and entered into on this <strong>14th day of November, 2026</strong>, by and between:
          </p>

          <div className={styles.partyGrid}>
            {/* Operator Box */}
            <div className={styles.partyBox}>
              <div className={styles.partyRole}>PARTY OF THE FIRST PART (THE &ldquo;OPERATOR&rdquo; / &ldquo;COMPANY&rdquo;)</div>
              <div className={styles.partyName}>MANA TOURS AND TRAVELS</div>
              <div className={styles.partyDetails}>
                <div><strong>Office:</strong> Kadapa, YSR District, Andhra Pradesh – 516001</div>
                <div><strong>Represented By:</strong> Pavan / Fleet Operations Desk</div>
                <div><strong>Helpline:</strong> +91 99083 00718</div>
                <div><strong>Portal:</strong> https://www.manatoursandtravels.com</div>
              </div>
            </div>

            {/* Owner Box */}
            <div className={styles.partyBox}>
              <div className={styles.partyRole}>PARTY OF THE SECOND PART (THE &ldquo;VEHICLE OWNER&rdquo; / &ldquo;PARTNER&rdquo;)</div>
              <div className={styles.partyName}>
                {isEditable ? (
                  <input
                    type="text"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    className={styles.inlineInput}
                  />
                ) : (
                  formData.ownerName
                )}
              </div>
              <div className={styles.partyDetails}>
                <div>
                  <strong>Address:</strong>{' '}
                  {isEditable ? (
                    <input
                      type="text"
                      value={formData.ownerAddress}
                      onChange={(e) => setFormData({ ...formData, ownerAddress: e.target.value })}
                      className={styles.inlineInput}
                    />
                  ) : (
                    formData.ownerAddress
                  )}
                </div>
                <div>
                  <strong>Mobile:</strong>{' '}
                  {isEditable ? (
                    <input
                      type="text"
                      value={formData.ownerPhone}
                      placeholder="e.g. +91 98480 XXXXX"
                      onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
                      className={styles.inlineInput}
                    />
                  ) : (
                    formData.ownerPhone || '___________________________'
                  )}
                </div>
                <div>
                  <strong>Aadhaar / PAN:</strong>{' '}
                  {isEditable ? (
                    <input
                      type="text"
                      value={formData.ownerAadhaar}
                      placeholder="Aadhaar / PAN No."
                      onChange={(e) => setFormData({ ...formData, ownerAadhaar: e.target.value })}
                      className={styles.inlineInput}
                    />
                  ) : (
                    formData.ownerAadhaar || '___________________________'
                  )}
                </div>
                <div>
                  <strong>Bank A/c &amp; IFSC:</strong>{' '}
                  {isEditable ? (
                    <input
                      type="text"
                      value={formData.bankAccount}
                      placeholder="A/c No. & IFSC for weekly payouts"
                      onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                      className={styles.inlineInput}
                    />
                  ) : (
                    formData.bankAccount || '___________________________'
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ SECTION 2: VEHICLE PARTICULARS ══ */}
        <section className={styles.sectionBlock}>
          <h3 className={styles.sectionHeading}>2. VEHICLE PARTICULARS &amp; PROVENANCE</h3>
          <p className={styles.clausePara}>
            The Vehicle Owner confirms absolute ownership of the brand new 7-seater MPV purchased from <strong>M.S.A. MOTORS</strong> (Authorised Maruti Suzuki Dealers) under Proforma Ref <strong>#224 dated 05/10/2026</strong> for an on-road invoice sum of <strong>₹12,06,000 / ₹12,38,548</strong>.
          </p>

          <table className={styles.dataTable}>
            <tbody>
              <tr>
                <td className={styles.tdLabel}>Make &amp; Model</td>
                <td className={styles.tdVal}><strong>Maruti Suzuki Ertiga VXi (SHVS Smart Hybrid)</strong></td>
                <td className={styles.tdLabel}>Seating Capacity</td>
                <td className={styles.tdVal}><strong>7 Persons (2 + 3 + 2)</strong></td>
              </tr>
              <tr>
                <td className={styles.tdLabel}>Registration No.</td>
                <td className={styles.tdVal}>
                  {isEditable ? (
                    <input
                      type="text"
                      value={formData.regNumber}
                      onChange={(e) => setFormData({ ...formData, regNumber: e.target.value })}
                      className={styles.inlineInput}
                    />
                  ) : (
                    formData.regNumber
                  )}
                </td>
                <td className={styles.tdLabel}>Dealer Invoice Ref</td>
                <td className={styles.tdVal}>{formData.dealerInvoice}</td>
              </tr>
              <tr>
                <td className={styles.tdLabel}>Engine No.</td>
                <td className={styles.tdVal}>
                  {isEditable ? (
                    <input
                      type="text"
                      value={formData.engineNumber}
                      placeholder="As per R.C."
                      onChange={(e) => setFormData({ ...formData, engineNumber: e.target.value })}
                      className={styles.inlineInput}
                    />
                  ) : (
                    formData.engineNumber || 'As per R.C. Book'
                  )}
                </td>
                <td className={styles.tdLabel}>Chassis (VIN) No.</td>
                <td className={styles.tdVal}>
                  {isEditable ? (
                    <input
                      type="text"
                      value={formData.chassisNumber}
                      placeholder="As per R.C."
                      onChange={(e) => setFormData({ ...formData, chassisNumber: e.target.value })}
                      className={styles.inlineInput}
                    />
                  ) : (
                    formData.chassisNumber || 'As per R.C. Book'
                  )}
                </td>
              </tr>
              <tr>
                <td className={styles.tdLabel}>Extended Warranty</td>
                <td className={styles.tdVal}><strong>6 Years / 1,60,000 KM Covered</strong></td>
                <td className={styles.tdLabel}>Insurance Coverage</td>
                <td className={styles.tdVal}><strong>1+3 Yrs Zero Dep / Bumper-to-Bumper</strong></td>
              </tr>
              <tr>
                <td className={styles.tdLabel}>Handover Odometer</td>
                <td className={styles.tdVal}>
                  {isEditable ? (
                    <input
                      type="text"
                      value={formData.handoverKm}
                      onChange={(e) => setFormData({ ...formData, handoverKm: e.target.value })}
                      className={styles.inlineInput}
                    />
                  ) : (
                    formData.handoverKm
                  )}
                </td>
                <td className={styles.tdLabel}>Handover Fuel Level</td>
                <td className={styles.tdVal}>{formData.fuelLevel}</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* ══ SECTION 3: SCOPE OF COMMERCIAL DEPLOYMENT ══ */}
        <section className={styles.sectionBlock}>
          <h3 className={styles.sectionHeading}>3. SCOPE OF COMMERCIAL OPERATIONS</h3>
          <p className={styles.clausePara}>
            3.1. <strong>Authorized Deployment:</strong> The Operator is authorized to deploy the vehicle in:
          </p>
          <ul className={styles.bulletList}>
            <li>
              <strong>Self-Drive Rentals:</strong> For identity-verified customers who have completed 2-minute digital KYC (Driving License, Aadhaar, address verification) and deposited ₹15,000 security deposit or two-wheeler collateral.
            </li>
            <li>
              <strong>Chauffeur-Driven Tourist &amp; Corporate Cabs:</strong> Intercity trips, airport transfers (Tirupati, Bangalore, Hyderabad), and temple pilgrimage tours (Gandikota, Srisailam, Tirumala).
            </li>
          </ul>
          <p className={styles.clausePara}>
            3.2. <strong>Strictly Prohibited Uses:</strong> The Operator covenants that the vehicle shall <strong>NEVER</strong> be utilized for:
          </p>
          <ul className={styles.bulletList}>
            <li>Transport of contraband, illegal liquor, smuggling, or unlawful activities under Indian laws.</li>
            <li>Overloading beyond 7 passengers, industrial haulage, or towing other vehicles.</li>
            <li>Off-roading, riverbeds, motor rallying, or sub-leasing to unauthorized third parties.</li>
          </ul>
        </section>

        {/* ══ SECTION 4: REVENUE MODEL & PAYOUTS ══ */}
        <section className={styles.sectionBlock}>
          <h3 className={styles.sectionHeading}>4. COMMERCIAL REVENUE SHARING &amp; SETTLEMENT</h3>
          <p className={styles.clausePara}>
            The Parties mutually agree upon the following commercial earning structure:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', margin: '14px 0 20px' }}>
            <div style={{
              border: formData.payoutModel === 'modelA' ? '2px solid #C9A84C' : '1px solid #CBD5E1',
              borderRadius: '10px',
              padding: '14px',
              background: formData.payoutModel === 'modelA' ? '#FFFBEB' : '#FFFFFF'
            }}>
              <div style={{ fontWeight: 800, color: '#1E293B', marginBottom: '4px' }}>
                ⭐ MODEL A: 70% NET REVENUE SHARE (STANDARD)
              </div>
              <div style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.5 }}>
                • <strong>70% of Net Rental Revenue</strong> credited to Vehicle Owner.<br />
                • <strong>30% Management Share</strong> to MANA Travels for marketing, customer KYC, and dispatch.<br />
                • Tolls &amp; Fuel billed directly to customers at 100% actuals.
              </div>
            </div>

            <div style={{
              border: formData.payoutModel === 'modelB' ? '2px solid #C9A84C' : '1px solid #CBD5E1',
              borderRadius: '10px',
              padding: '14px',
              background: formData.payoutModel === 'modelB' ? '#FFFBEB' : '#FFFFFF'
            }}>
              <div style={{ fontWeight: 800, color: '#1E293B', marginBottom: '4px' }}>
                🚗 MODEL B: PER-DAY DEPLOYMENT PAYOUT
              </div>
              <div style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.5 }}>
                • Fixed <strong>₹{formData.perDayAmount} per active rental day</strong> credited to Owner.<br />
                • Customer pays ₹2,500/day; Operator manages operational overhead and customer service.
              </div>
            </div>
          </div>

          <p className={styles.clausePara}>
            4.3. <strong>Settlement Cycle:</strong> Earnings settlements shall be disbursed <strong>weekly (every Monday)</strong> via direct Bank NEFT/RTGS or UPI to the Vehicle Owner&rsquo;s bank account, accompanied by a transparent digital trip statement.
          </p>
        </section>

        {/* ══ SECTION 5: OBLIGATIONS & COST DIVISION ══ */}
        <section className={styles.sectionBlock}>
          <h3 className={styles.sectionHeading}>5. DIVISION OF OPERATIONAL COSTS</h3>
          <table className={styles.dataTable}>
            <thead>
              <tr style={{ background: '#F1F5F9' }}>
                <th style={{ padding: '8px 10px', width: '35%', textAlign: 'left' }}>Cost Head</th>
                <th style={{ padding: '8px 10px', width: '25%', textAlign: 'left' }}>Responsible Party</th>
                <th style={{ padding: '8px 10px', width: '40%', textAlign: 'left' }}>Operational Guidelines</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.tdVal}><strong>Bank EMI / Hypothecation</strong></td>
                <td className={styles.tdVal}>Vehicle Owner</td>
                <td className={styles.tdVal}>Owner pays monthly EMI to bank directly.</td>
              </tr>
              <tr>
                <td className={styles.tdVal}><strong>Insurance Policy Renewal</strong></td>
                <td className={styles.tdVal}>Vehicle Owner</td>
                <td className={styles.tdVal}>Maintains active Bumper-to-Bumper policy annually.</td>
              </tr>
              <tr>
                <td className={styles.tdVal}><strong>Washing, Sanitization &amp; Vacuuming</strong></td>
                <td className={styles.tdVal}>MANA Tours &amp; Travels</td>
                <td className={styles.tdVal}>Performed before every customer handover.</td>
              </tr>
              <tr>
                <td className={styles.tdVal}><strong>Scheduled Periodic Servicing</strong></td>
                <td className={styles.tdVal}>Joint / Vehicle Pool</td>
                <td className={styles.tdVal}>Every 10,000 km exclusively at Maruti M.S.A. Motors.</td>
              </tr>
              <tr>
                <td className={styles.tdVal}><strong>24/7 GPS Telematics Unit</strong></td>
                <td className={styles.tdVal}>MANA Tours &amp; Travels</td>
                <td className={styles.tdVal}>Installed with live tracking login shared with Owner.</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* ══ SECTION 6: ACCIDENTS & INSURANCE PROTOCOL ══ */}
        <section className={styles.sectionBlock}>
          <h3 className={styles.sectionHeading}>6. ACCIDENT CLAIMS, DAMAGE RECOVERY &amp; INDEMNITY</h3>
          <p className={styles.clausePara}>
            6.1. <strong>Zero Personal Liability for Owner:</strong> The Vehicle Owner shall not be personally liable for road incidents, collisions, or third-party liabilities occurring during customer rentals managed by the Operator.
          </p>
          <p className={styles.clausePara}>
            6.2. <strong>Insurance Claims Protocol:</strong> In the event of any collision or major damage during commercial operations:
          </p>
          <ul className={styles.bulletList}>
            <li>The Operator immediately files the police report/FIR (if required) and informs the Vehicle Owner.</li>
            <li>The vehicle is serviced and repaired strictly at the authorized <strong>Maruti Suzuki / M.S.A. Motors Workshop</strong>.</li>
            <li>All insurance claims, surveys, and documentation are coordinated completely by the Operator.</li>
            <li>Any insurance deductible, file charge, or depreciation excess is recovered directly by the Operator from the customer&rsquo;s <strong>₹15,000 security deposit</strong> or legal undertaking. The Owner incurs zero out-of-pocket loss.</li>
          </ul>
        </section>

        {/* ══ SECTION 7: TRAFFIC E-CHALLANS & TRANSPARENCY ══ */}
        <section className={styles.sectionBlock}>
          <h3 className={styles.sectionHeading}>7. TRAFFIC FINES, E-CHALLANS &amp; ASSET SECURITY</h3>
          <p className={styles.clausePara}>
            7.1. <strong>Traffic e-Challan Indemnity:</strong> Any Parivahan / AP Police traffic violations (speeding, signal jumps, helmet/parking fines) incurred during customer trips shall be recovered from the respective customer. The Operator holds the Owner fully indemnified against all traffic fines.
          </p>
          <p className={styles.clausePara}>
            7.2. <strong>24/7 GPS Tracking:</strong> The Operator shall provide mobile app login credentials to the Vehicle Owner, enabling real-time GPS tracking, speed monitoring, and trip history 24 hours a day, 7 days a week.
          </p>
        </section>

        {/* ══ SECTION 8: TERM, LOCK-IN & TERMINATION ══ */}
        <section className={styles.sectionBlock}>
          <h3 className={styles.sectionHeading}>8. TERM, LOCK-IN &amp; HANDBACK</h3>
          <p className={styles.clausePara}>
            8.1. <strong>Term:</strong> This Agreement is valid for an initial term of <strong>11 (Eleven) Months</strong> from <strong>14th November, 2026 to 13th October, 2027</strong>, renewable upon mutual written agreement.
          </p>
          <p className={styles.clausePara}>
            8.2. <strong>Notice Period:</strong> Following an initial 3-month operational lock-in, either Party may terminate the agreement by providing <strong>30 (Thirty) Days prior written notice</strong>.
          </p>
          <p className={styles.clausePara}>
            8.3. <strong>Handback:</strong> Upon termination, the vehicle shall be returned to the Owner in clean, roadworthy condition along with original keys, accessories, and a reconciled closing settlement.
          </p>
          <p className={styles.clausePara}>
            8.4. <strong>Jurisdiction:</strong> The Courts of <strong>Kadapa, YSR District, Andhra Pradesh</strong> shall have exclusive jurisdiction over any disputes arising hereunder.
          </p>
        </section>

        {/* ══ SECTION 9: SIGNATURES ══ */}
        <section className={styles.sectionBlock} style={{ marginTop: '36px', pageBreakInside: 'avoid' }}>
          <h3 className={styles.sectionHeading}>9. EXECUTION &amp; SIGNATURES</h3>
          <p className={styles.clausePara}>
            IN WITNESS WHEREOF, the Parties hereto have signed and executed this Agreement on the day, month, and year first above written at Kadapa.
          </p>

          <div className={styles.sigGrid} style={{ marginTop: '32px' }}>
            <div className={styles.sigBox}>
              <div className={styles.sigLine}>___________________________________</div>
              <div className={styles.sigRole}>PARTY OF THE FIRST PART (OPERATOR)</div>
              <div className={styles.sigName}><strong>For MANA TOURS AND TRAVELS</strong></div>
              <div style={{ fontSize: '0.80rem', color: '#64748B', marginTop: '4px' }}>Authorized Signatory / Fleet Manager</div>
              <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Date: 14 / 11 / 2026 · Kadapa</div>
            </div>

            <div className={styles.sigBox}>
              <div className={styles.sigLine}>___________________________________</div>
              <div className={styles.sigRole}>PARTY OF THE SECOND PART (OWNER)</div>
              <div className={styles.sigName}><strong>{formData.ownerName}</strong></div>
              <div style={{ fontSize: '0.80rem', color: '#64748B', marginTop: '4px' }}>Vehicle Owner / Fleet Partner</div>
              <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Date: 14 / 11 / 2026 · Kadapa</div>
            </div>
          </div>

          <div style={{ marginTop: '28px', borderTop: '1px dashed #CBD5E1', paddingTop: '20px' }}>
            <div style={{ fontWeight: 800, fontSize: '0.90rem', color: '#1E293B', marginBottom: '12px' }}>
              WITNESSES:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.8 }}>
                <strong>1. Witness 1:</strong><br />
                Signature: ___________________________<br />
                Name: ______________________________<br />
                Phone: _____________________________
              </div>
              <div style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.8 }}>
                <strong>2. Witness 2:</strong><br />
                Signature: ___________________________<br />
                Name: ______________________________<br />
                Phone: _____________________________
              </div>
            </div>
          </div>
        </section>

        {/* ══ SCHEDULE A: HANDOVER CHECKLIST ══ */}
        <section className={styles.sectionBlock} style={{ marginTop: '32px', pageBreakBefore: 'always' }}>
          <h3 className={styles.sectionHeading}>SCHEDULE A: COMMENCEMENT HANDOVER CHECKLIST</h3>
          <p className={styles.clausePara}>
            Executed on <strong>14th November 2026</strong> at the time of physical vehicle custody handover:
          </p>

          <table className={styles.dataTable}>
            <tbody>
              <tr>
                <td className={styles.tdLabel}>Showroom Condition</td>
                <td className={styles.tdVal}>✓ Brand New / Zero Scratches / Zero Dents</td>
                <td className={styles.tdLabel}>Handover Odometer</td>
                <td className={styles.tdVal}>{formData.handoverKm}</td>
              </tr>
              <tr>
                <td className={styles.tdLabel}>Original Remote Keys</td>
                <td className={styles.tdVal}>✓ 2 Smart Keys Delivered</td>
                <td className={styles.tdLabel}>Fuel Gauge Reading</td>
                <td className={styles.tdVal}>{formData.fuelLevel}</td>
              </tr>
              <tr>
                <td className={styles.tdLabel}>M.S.A. Motors Invoice</td>
                <td className={styles.tdVal}>✓ Ref #224 Verified</td>
                <td className={styles.tdLabel}>Toolkit &amp; Stepney</td>
                <td className={styles.tdVal}>✓ Complete Original Kit Delivered</td>
              </tr>
              <tr>
                <td className={styles.tdLabel}>Warranty Book</td>
                <td className={styles.tdVal}>✓ 6-Year Extended Warranty Verified</td>
                <td className={styles.tdLabel}>GPS Telematics Unit</td>
                <td className={styles.tdVal}>✓ Activated &amp; Shared on Owner Mobile</td>
              </tr>
            </tbody>
          </table>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '36px', paddingTop: '20px', borderTop: '1px solid #CBD5E1' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ height: '40px' }}></div>
              <div>__________________________________</div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Vehicle Handed Over By (Owner)</div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ height: '40px' }}></div>
              <div>__________________________________</div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Vehicle Received By (MANA Travels)</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function PartnerAgreementPage() {
  return (
    <Suspense fallback={<div style={{ padding: '60px', textAlign: 'center', color: '#fff' }}>Loading Agreement...</div>}>
      <PartnerAgreementContent />
    </Suspense>
  );
}
