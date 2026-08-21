'use client';
import { useState, useMemo } from 'react';
import { BUSINESS } from '@/lib/constants';
import styles from './CarEmiCalculator.module.css';

export default function CarEmiCalculator() {
  const [carPrice, setCarPrice] = useState(650000);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [tenureYears, setTenureYears] = useState(4);
  const [interestRate, setInterestRate] = useState(9.5);

  const calculations = useMemo(() => {
    const downPayment = Math.round((carPrice * downPaymentPct) / 100);
    const principal = carPrice - downPayment;
    const monthlyRate = interestRate / 12 / 100;
    const totalMonths = tenureYears * 12;

    let emi = 0;
    if (monthlyRate > 0) {
      emi = Math.round(
        (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
          (Math.pow(1 + monthlyRate, totalMonths) - 1)
      );
    } else {
      emi = Math.round(principal / totalMonths);
    }

    const totalPayment = emi * totalMonths;
    const totalInterest = totalPayment - principal;

    return {
      downPayment,
      principal,
      emi,
      totalMonths,
      totalPayment,
      totalInterest,
    };
  }, [carPrice, downPaymentPct, tenureYears, interestRate]);

  const formatINR = (val) => {
    return '₹' + Number(val).toLocaleString('en-IN');
  };

  const financeWhatsAppUrl = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(
    `*MANA Used Car Finance Enquiry* 💳\n\n` +
      `*Vehicle Budget:* ${formatINR(carPrice)}\n` +
      `*Down Payment:* ${formatINR(calculations.downPayment)} (${downPaymentPct}%)\n` +
      `*Loan Amount:* ${formatINR(calculations.principal)}\n` +
      `*Loan Tenure:* ${tenureYears} Years (${calculations.totalMonths} Months)\n` +
      `*Estimated Monthly EMI:* ${formatINR(calculations.emi)} / mo\n\n` +
      `_I would like to check my loan eligibility with MANA Tours partner banks._`
  )}`;

  return (
    <div className={styles.calcContainer} id="emi-calculator">
      <div className={styles.calcGrid}>
        {/* ── Left Column: Interactive Controls ── */}
        <div className={styles.controlsCol}>
          {/* Car Price */}
          <div className={styles.controlGroup}>
            <div className={styles.controlHeader}>
              <span className={styles.controlLabel}>Vehicle Value / Price</span>
              <span className={styles.controlValue}>{formatINR(carPrice)}</span>
            </div>
            <input
              type="range"
              min="300000"
              max="2500000"
              step="25000"
              value={carPrice}
              onChange={(e) => setCarPrice(Number(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.rangeLimits}>
              <span>₹3 Lakh</span>
              <span>₹10 Lakh</span>
              <span>₹25 Lakh</span>
            </div>
          </div>

          {/* Down Payment */}
          <div className={styles.controlGroup}>
            <div className={styles.controlHeader}>
              <span className={styles.controlLabel}>
                Down Payment ({downPaymentPct}%)
              </span>
              <span className={styles.controlValue}>{formatINR(calculations.downPayment)}</span>
            </div>
            <input
              type="range"
              min="10"
              max="50"
              step="5"
              value={downPaymentPct}
              onChange={(e) => setDownPaymentPct(Number(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.rangeLimits}>
              <span>10% (Min)</span>
              <span>30% (Recommended)</span>
              <span>50%</span>
            </div>
          </div>

          {/* Loan Tenure */}
          <div className={styles.controlGroup}>
            <div className={styles.controlHeader}>
              <span className={styles.controlLabel}>Loan Tenure</span>
              <span className={styles.controlValue}>{tenureYears} Years</span>
            </div>
            <div className={styles.tenureGroup}>
              {[1, 2, 3, 4, 5].map((y) => (
                <button
                  key={y}
                  type="button"
                  className={`${styles.tenureBtn} ${tenureYears === y ? styles.tenureBtnActive : ''}`}
                  onClick={() => setTenureYears(y)}
                >
                  {y} {y === 1 ? 'Year' : 'Years'}
                </button>
              ))}
            </div>
          </div>

          {/* Interest Rate */}
          <div className={styles.controlGroup}>
            <div className={styles.controlHeader}>
              <span className={styles.controlLabel}>Interest Rate (% p.a.)</span>
              <span className={styles.controlValue}>{interestRate}%</span>
            </div>
            <input
              type="range"
              min="8.5"
              max="15.0"
              step="0.25"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.rangeLimits}>
              <span>8.5%</span>
              <span>11.5%</span>
              <span>15.0%</span>
            </div>
          </div>
        </div>

        {/* ── Right Column: Result Box ── */}
        <div className={styles.resultCard}>
          <div className={styles.emiHeader}>
            <span className={styles.emiLabel}>Estimated Monthly EMI</span>
            <div className={styles.emiFigure}>{formatINR(calculations.emi)}</div>
            <span className={styles.emiPerMonth}>Per Month for {calculations.totalMonths} Months</span>
          </div>

          <div className={styles.breakdownList}>
            <div className={styles.breakdownRow}>
              <span className={styles.breakdownLabel}>Principal Loan Amount</span>
              <span className={styles.breakdownVal}>{formatINR(calculations.principal)}</span>
            </div>
            <div className={styles.breakdownRow}>
              <span className={styles.breakdownLabel}>Upfront Down Payment</span>
              <span className={styles.breakdownVal}>{formatINR(calculations.downPayment)}</span>
            </div>
            <div className={styles.breakdownRow}>
              <span className={styles.breakdownLabel}>Total Interest Payable</span>
              <span className={styles.breakdownVal}>{formatINR(calculations.totalInterest)}</span>
            </div>
            <div className={styles.breakdownRow}>
              <span className={styles.breakdownLabel}>Total Loan Cost</span>
              <span className={styles.breakdownVal}>{formatINR(calculations.totalPayment)}</span>
            </div>
          </div>

          <a
            href={financeWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.financeBtn}
            id="btn-apply-finance"
          >
            <span>🏦 Get Instant Loan Approval</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
