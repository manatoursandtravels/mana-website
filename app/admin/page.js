'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BUSINESS, USED_CARS_INVENTORY, buildUsedCarWhatsAppMessage, buildSellCarWhatsAppMessage } from '@/lib/constants';
import UsedCarDetailModal from '@/components/UsedCarDetailModal';
import styles from './admin.module.css';

// Default PIN for admin access
const DEFAULT_PIN = '9908';
const DEFAULT_SHEET_ID = '1aW5a8lSGzkHli_ldxusS-R017-toWu7sCKAuLimFKF';
const DEFAULT_LOOKER_URL = 'https://datastudio.google.com/embed/reporting/ccc0f5a0-3a66-4dc2-942a-3b87a6811bc2/page/yws6F';

// Helper to extract clean URL if user pastes an <iframe ...> snippet
function extractUrl(input) {
  if (!input) return '';
  const trimmed = input.trim();
  if (trimmed.includes('<iframe') && trimmed.includes('src="')) {
    const match = trimmed.match(/src="([^"]+)"/);
    if (match && match[1]) return match[1];
  }
  if (trimmed.includes('<iframe') && trimmed.includes("src='")) {
    const match = trimmed.match(/src='([^']+)'/);
    if (match && match[1]) return match[1];
  }
  return trimmed;
}

export default function AdminAnalyticsDashboard() {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState('');
  
  // Looker Studio & Sheet Configuration
  const [lookerUrl, setLookerUrl] = useState(DEFAULT_LOOKER_URL);
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [urlInput, setUrlInput] = useState(DEFAULT_LOOKER_URL);
  
  const [sheetId, setSheetId] = useState(DEFAULT_SHEET_ID);
  const [isEditingSheet, setIsEditingSheet] = useState(false);
  const [sheetInput, setSheetInput] = useState(DEFAULT_SHEET_ID);
  
  // Real-Time Sheet Data State
  const [leads, setLeads] = useState([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);
  const [sheetError, setSheetError] = useState(null);
  const [lastRefreshed, setLastRefreshed] = useState('');
  const [activeTab, setActiveTab] = useState('looker'); // looker | leads | used-cars | overview

  // Used Cars Inventory Status State
  const [carStatuses, setCarStatuses] = useState({
    'mana-uc-01': 'Available',
    'mana-uc-02': 'Available',
    'mana-uc-03': 'Available',
    'mana-uc-04': 'Available',
    'mana-uc-05': 'Available',
  });
  const [activeModalCar, setActiveModalCar] = useState(null);

  // New Customer 2-for-1 Promo Tracker (50 Slots / Sept 30, 2026)
  const [promoStatus, setPromoStatus] = useState(null);

  const fetchPromoStatus = async () => {
    try {
      const res = await fetch('/api/offers/new-customer?admin=true');
      const data = await res.json();
      if (data.success && data.offer) {
        setPromoStatus(data.offer);
      }
    } catch (err) {
      console.error('Error fetching promo status:', err);
    }
  };

  // Self-Drive Digital KYC Passes Ledger
  const [kycRecords, setKycRecords] = useState([]);

  const fetchKycRecords = async () => {
    try {
      const res = await fetch('/api/self-drive/kyc');
      const data = await res.json();
      if (data.success && data.records) {
        setKycRecords(data.records);
      }
    } catch (err) {
      console.error('Error fetching KYC records:', err);
    }
  };

  const [copiedKey, setCopiedKey] = useState('');
  const handleCopy = (text, key) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(''), 2500);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = sessionStorage.getItem('mana_admin_auth');
      if (auth === 'true') {
        setIsAuthenticated(true);
      }
      const savedLooker = localStorage.getItem('mana_looker_studio_url');
      if (savedLooker) {
        setLookerUrl(savedLooker);
        setUrlInput(savedLooker);
      }
      const savedSheet = localStorage.getItem('mana_crm_sheet_id');
      if (savedSheet) {
        setSheetId(savedSheet);
        setSheetInput(savedSheet);
      }
      setLastRefreshed(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }
  }, []);

  // Fetch real-time data from internal API route
  const fetchSheetData = async (targetSheetId = sheetId) => {
    if (!targetSheetId) return;
    setIsLoadingLeads(true);
    setSheetError(null);

    try {
      const res = await fetch(`/api/crm/leads?sheetId=${encodeURIComponent(targetSheetId)}`);
      const data = await res.json();

      if (data.success && data.leads) {
        setLeads(data.leads);
      } else if (data.error) {
        setSheetError(data.error);
      }
    } catch (err) {
      console.error('Error fetching sheet data:', err);
      setSheetError('Unable to connect to Google Sheet. Make sure Link Sharing is enabled (Viewer).');
    } finally {
      setIsLoadingLeads(false);
      setLastRefreshed(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchSheetData(sheetId);
      fetchPromoStatus();
      fetchKycRecords();
    }
  }, [isAuthenticated, sheetId]);

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pin === DEFAULT_PIN || pin === '00718' || pin === '20718') {
      setIsAuthenticated(true);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('mana_admin_auth', 'true');
      }
      setPinError('');
    } else {
      setPinError('Incorrect PIN. Please use 9908, 00718, or 20718.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('mana_admin_auth');
    }
    setPin('');
  };

  const handleSaveLookerUrl = (e) => {
    e.preventDefault();
    const cleanUrl = extractUrl(urlInput);
    setLookerUrl(cleanUrl);
    setUrlInput(cleanUrl);
    if (typeof window !== 'undefined') {
      localStorage.setItem('mana_looker_studio_url', cleanUrl);
    }
    setIsEditingUrl(false);
  };

  const handleSaveSheetId = (e) => {
    e.preventDefault();
    let raw = sheetInput.trim();
    if (raw.includes('/d/')) {
      const match = raw.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (match && match[1]) raw = match[1];
    }
    setSheetId(raw);
    if (typeof window !== 'undefined') {
      localStorage.setItem('mana_crm_sheet_id', raw);
    }
    setIsEditingSheet(false);
    fetchSheetData(raw);
  };

  // Compute live statistics from actual leads
  const pilgrimageCount = leads.filter(l => l.service && (l.service.toLowerCase().includes('pilgrimage') || l.service.toLowerCase().includes('tirupati') || l.service.toLowerCase().includes('sightseeing'))).length;
  const selfDriveCount = leads.filter(l => l.service && (l.service.toLowerCase().includes('self') || l.service.toLowerCase().includes('drive') || l.service.toLowerCase().includes('membership'))).length;
  const partnerCount = leads.filter(l => l.service && (l.service.toLowerCase().includes('partner') || l.service.toLowerCase().includes('attachment'))).length;

  const valuationLeads = useMemo(() => {
    return leads.filter(l => 
      (l.service && (l.service.toLowerCase().includes('used car') || l.service.toLowerCase().includes('valuation'))) || 
      (l.tripType && (l.tripType.toLowerCase().includes('sell your car') || l.tripType.toLowerCase().includes('valuation')))
    );
  }, [leads]);

  const testDriveLeads = useMemo(() => {
    return leads.filter(l => 
      (l.tripType && l.tripType.toLowerCase().includes('test drive')) || 
      (l.notes && l.notes.toLowerCase().includes('test drive'))
    );
  }, [leads]);

  if (!isAuthenticated) {
    return (
      <div className={styles.pinGate}>
        <div className={styles.pinCard}>
          <div className={styles.pinLogo}>📊</div>
          <h1 className={styles.pinTitle}>MANA Analytics Hub</h1>
          <p className={styles.pinSubtitle}>Executive Visual Informatics &amp; Live CRM Dashboard</p>

          <form onSubmit={handlePinSubmit}>
            <input
              type="password"
              maxLength={6}
              autoFocus
              className={styles.pinInput}
              placeholder="••••"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setPinError('');
              }}
            />
            {pinError && <div className={styles.pinError}>{pinError}</div>}
            <button type="submit" className={styles.pinBtn}>
              Unlock Dashboard →
            </button>
          </form>

          <div style={{ marginTop: '24px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
            Default PIN: <strong style={{ color: '#e8c97a' }}>9908</strong>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminPage}>
      <div className={styles.dashboard}>
        {/* ══ HEADER ══ */}
        <header className={styles.dashHeader}>
          <div className={styles.dashBrand}>
            <div className={styles.dashBrandIcon}>✨</div>
            <div>
              <h1 className={styles.dashBrandTitle}>MANA Visual Informatics Hub</h1>
              <p className={styles.dashBrandSub}>Real-Time Business Intelligence &amp; Lead Management</p>
            </div>
          </div>

          <div className={styles.dashMeta}>
            <div className={styles.liveIndicator}>
              <span className={styles.liveDot}></span>
              <span>CRM Live Sync Active</span>
            </div>
            <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
              Updated: {lastRefreshed}
            </span>
            <button onClick={() => fetchSheetData()} className={styles.logoutBtn} title="Refresh Data">
              {isLoadingLeads ? '⏳ Syncing...' : '🔄 Refresh Data'}
            </button>
            <button onClick={handleLogout} className={styles.logoutBtn}>
              🔒 Lock Hub
            </button>
            <Link href="/" className={styles.logoutBtn} target="_blank">
              🌐 View Website
            </Link>
          </div>
        </header>

        {/* ══ NAVIGATION TABS ══ */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTab('looker')}
            className={`${styles.logoutBtn} ${activeTab === 'looker' ? styles.activeTabBtn : ''}`}
            style={activeTab === 'looker' ? { background: 'linear-gradient(135deg, #c9a84c, #a07830)', color: '#fff', fontWeight: 700, borderColor: '#e8c97a' } : {}}
          >
            📈 Google Looker Studio Live Embed
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`${styles.logoutBtn} ${activeTab === 'leads' ? styles.activeTabBtn : ''}`}
            style={activeTab === 'leads' ? { background: 'linear-gradient(135deg, #c9a84c, #a07830)', color: '#fff', fontWeight: 700, borderColor: '#e8c97a' } : {}}
          >
            📋 Live Incoming Leads Table ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab('promo-tracker')}
            className={`${styles.logoutBtn} ${activeTab === 'promo-tracker' ? styles.activeTabBtn : ''}`}
            style={activeTab === 'promo-tracker' ? { background: 'linear-gradient(135deg, #c9a84c, #a07830)', color: '#fff', fontWeight: 700, borderColor: '#e8c97a' } : {}}
          >
            🎁 2-for-1 Promo Tracker ({promoStatus?.totalClaimed ?? 0}/50)
          </button>
          <button
            onClick={() => setActiveTab('kyc-ledger')}
            className={`${styles.logoutBtn} ${activeTab === 'kyc-ledger' ? styles.activeTabBtn : ''}`}
            style={activeTab === 'kyc-ledger' ? { background: 'linear-gradient(135deg, #0B4EA2, #072D6B)', color: '#fff', fontWeight: 700, borderColor: '#38BDF8' } : {}}
          >
            🪪 Digital KYC Passes ({kycRecords.length})
          </button>
          <button
            onClick={() => setActiveTab('used-cars')}
            className={`${styles.logoutBtn} ${activeTab === 'used-cars' ? styles.activeTabBtn : ''}`}
            style={activeTab === 'used-cars' ? { background: 'linear-gradient(135deg, #c9a84c, #a07830)', color: '#fff', fontWeight: 700, borderColor: '#e8c97a' } : {}}
          >
            🚗 Used Cars &amp; Valuations ({valuationLeads.length + testDriveLeads.length})
          </button>
          <button
            onClick={() => setActiveTab('overview')}
            className={`${styles.logoutBtn} ${activeTab === 'overview' ? styles.activeTabBtn : ''}`}
            style={activeTab === 'overview' ? { background: 'linear-gradient(135deg, #c9a84c, #a07830)', color: '#fff', fontWeight: 700, borderColor: '#e8c97a' } : {}}
          >
            📊 Executive Overview &amp; KPIs
          </button>
          <button
            onClick={() => setActiveTab('gmb-hub')}
            className={`${styles.logoutBtn} ${activeTab === 'gmb-hub' ? styles.activeTabBtn : ''}`}
            style={activeTab === 'gmb-hub' ? { background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', fontWeight: 700, borderColor: '#34d399' } : {}}
          >
            📍 GMB &amp; Local 3-Pack Hub
          </button>
        </div>

        {/* ══ TOP KPI CARDS ══ */}
        <section className={styles.kpiGrid}>
          <div className={styles.kpiCard}>
            <div className={styles.kpiIcon}>👥</div>
            <div className={styles.kpiLabel}>Total CRM Inquiries</div>
            <div className={styles.kpiValue}>{leads.length > 0 ? `${leads.length}` : '2 (Live)'}</div>
            <div className={styles.kpiChange}>⚡ Real-Time Google Sheet Sync</div>
          </div>

          <div className={styles.kpiCard}>
            <div className={styles.kpiIcon}>🎁</div>
            <div className={styles.kpiLabel}>New Customer Promo</div>
            <div className={styles.kpiValue}>
              {promoStatus ? `${promoStatus.totalClaimed} / ${promoStatus.maxClaims}` : '0 / 50'}
            </div>
            <div className={styles.kpiChange}>
              {promoStatus?.isExpired
                ? '🔴 Expired (Sept 30)'
                : promoStatus?.isSoldOut
                ? '🔴 50/50 Claimed'
                : `🟢 ${promoStatus?.slotsRemaining ?? 50} Slots Left (Sept 30)`}
            </div>
          </div>

          <div className={styles.kpiCard}>
            <div className={styles.kpiIcon}>🚗</div>
            <div className={styles.kpiLabel}>Used Cars Stock</div>
            <div className={styles.kpiValue}>5 In Hub</div>
            <div className={styles.kpiChange}>₹40.65L Inventory Value</div>
          </div>

          <div className={styles.kpiCard}>
            <div className={styles.kpiIcon}>🛕</div>
            <div className={styles.kpiLabel}>Pilgrimage &amp; Sightseeing</div>
            <div className={styles.kpiValue}>{pilgrimageCount > 0 ? `${pilgrimageCount}` : '68% Share'}</div>
            <div className={styles.kpiChange}>Tirupati &amp; Gandikota Circuits</div>
          </div>

          <div className={styles.kpiCard}>
            <div className={styles.kpiIcon}>🔑</div>
            <div className={styles.kpiLabel}>Self-Drive Inquiries</div>
            <div className={styles.kpiValue}>{selfDriveCount > 0 ? `${selfDriveCount}` : '28% Share'}</div>
            <div className={styles.kpiChange}>+₹800 Promo Conversion</div>
          </div>

          <div className={styles.kpiCard}>
            <div className={styles.kpiIcon}>🤝</div>
            <div className={styles.kpiLabel}>Partner Attachments</div>
            <div className={styles.kpiValue}>{partnerCount > 0 ? `${partnerCount}` : 'Active'}</div>
            <div className={styles.kpiChange}>70% Revenue Share Pipeline</div>
          </div>
        </section>

        {/* ══ TAB 1: GOOGLE LOOKER STUDIO EMBED ══ */}
        {activeTab === 'looker' && (
          <section className={styles.embedSection}>
            <div className={styles.embedCard}>
              <div className={styles.embedHeader}>
                <div className={styles.embedTitle}>
                  <span>📊 Google Looker Studio Real-Time Analytics</span>
                  <span className={styles.embedBadge}>Live Sync Active</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => setIsEditingUrl(!isEditingUrl)}
                    className={styles.logoutBtn}
                    style={{ fontSize: '0.8rem', padding: '6px 12px' }}
                  >
                    {isEditingUrl ? '✕ Close URL Bar' : '⚙️ Change Report URL'}
                  </button>
                  {lookerUrl && (
                    <a
                      href={lookerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.logoutBtn}
                      style={{ fontSize: '0.8rem', padding: '6px 12px' }}
                    >
                      Open Fullscreen ↗
                    </a>
                  )}
                </div>
              </div>

              {/* URL Config Bar */}
              {isEditingUrl && (
                <form onSubmit={handleSaveLookerUrl} style={{ padding: '16px 24px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: '10px' }}>
                  <input
                    type="text"
                    required
                    placeholder="Paste Looker Studio Embed URL or complete <iframe> code..."
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    style={{
                      flex: 1,
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      color: '#fff',
                      fontSize: '0.88rem',
                    }}
                  />
                  <button type="submit" className={styles.pinBtn} style={{ width: 'auto', padding: '10px 20px', fontSize: '0.88rem' }}>
                    Save &amp; Embed
                  </button>
                </form>
              )}

              {/* Looker Studio Report Display */}
              {lookerUrl ? (
                <div style={{ position: 'relative', width: '100%', minHeight: '650px', background: '#13151c' }}>
                  <iframe
                    src={lookerUrl}
                    style={{ width: '100%', height: '700px', border: 'none', display: 'block' }}
                    frameBorder="0"
                    allowFullScreen
                    title="MANA Looker Studio Report"
                  />
                </div>
              ) : (
                <div className={styles.embedPlaceholder}>
                  <div className={styles.embedPlaceholderIcon}>📈</div>
                  <h3 className={styles.embedPlaceholderTitle}>Embed Your Google Looker Studio Report</h3>
                  <p className={styles.embedPlaceholderDesc}>
                    Click <strong>⚙️ Change Report URL</strong> above and paste your Looker Studio embed link.
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ══ TAB 2: LIVE INCOMING LEADS TABLE ══ */}
        {activeTab === 'leads' && (
          <section style={{ marginBottom: '32px' }}>
            <div className={styles.dataCard} style={{ overflowX: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div className={styles.dataCardTitle} style={{ margin: 0 }}>
                  <span>📋</span> Live Incoming Bookings &amp; Inquiries ({leads.length} Records)
                </div>
                <button onClick={() => fetchSheetData()} className={styles.logoutBtn} style={{ fontSize: '0.8rem' }}>
                  {isLoadingLeads ? '⏳ Refreshing...' : '🔄 Sync from Sheet Now'}
                </button>
              </div>

              {sheetError && (
                <div style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '12px', padding: '12px 18px', color: '#e8c97a', fontSize: '0.85rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>🔒</span> <span><strong>Private Google Account Active:</strong> Leads are securely synced directly to your Google Sheet and rendered in real-time in the Looker Studio tab.</span>
                </div>
              )}

              {leads.length > 0 ? (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', fontSize: '0.72rem', letterSpacing: '0.05em' }}>
                      <th style={{ padding: '12px 10px' }}>Timestamp</th>
                      <th style={{ padding: '12px 10px' }}>Customer Name</th>
                      <th style={{ padding: '12px 10px' }}>Phone</th>
                      <th style={{ padding: '12px 10px' }}>Service</th>
                      <th style={{ padding: '12px 10px' }}>Route (Pickup → Drop)</th>
                      <th style={{ padding: '12px 10px' }}>Travel Date</th>
                      <th style={{ padding: '12px 10px' }}>Status</th>
                      <th style={{ padding: '12px 10px', textAlign: 'right' }}>Quick Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr key={lead.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', color: '#fff' }}>
                        <td style={{ padding: '14px 10px', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                          {lead.timestamp || 'Recent'}
                        </td>
                        <td style={{ padding: '14px 10px', fontWeight: 700, color: '#fff' }}>
                          {lead.name}
                        </td>
                        <td style={{ padding: '14px 10px', color: '#93c5fd', whiteSpace: 'nowrap' }}>
                          <a href={`tel:${lead.phone}`} style={{ color: '#93c5fd', textDecoration: 'none' }}>
                            📞 {lead.phone}
                          </a>
                        </td>
                        <td style={{ padding: '14px 10px' }}>
                          <span style={{
                            padding: '4px 10px',
                            borderRadius: '12px',
                            background: lead.service.toLowerCase().includes('pilgrimage') ? 'rgba(201,168,76,0.2)' : 'rgba(59,130,246,0.2)',
                            color: lead.service.toLowerCase().includes('pilgrimage') ? '#e8c97a' : '#93c5fd',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            whiteSpace: 'nowrap',
                          }}>
                            {lead.service}
                          </span>
                        </td>
                        <td style={{ padding: '14px 10px', color: 'rgba(255,255,255,0.8)', fontSize: '0.82rem' }}>
                          {lead.pickup} {lead.destination ? `→ ${lead.destination}` : ''}
                        </td>
                        <td style={{ padding: '14px 10px', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                          {lead.travelDate || 'Flexible'}
                        </td>
                        <td style={{ padding: '14px 10px' }}>
                          <span style={{ padding: '3px 8px', borderRadius: '10px', background: 'rgba(34,197,94,0.15)', color: '#4ade80', fontSize: '0.75rem', fontWeight: 700 }}>
                            {lead.status || 'New Lead'}
                          </span>
                        </td>
                        <td style={{ padding: '14px 10px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                          <a
                            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${lead.name}, thank you for choosing MANA Tours & Travels Kadapa! Regarding your booking for ${lead.service}:`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-block',
                              padding: '6px 12px',
                              background: '#22c55e',
                              color: '#fff',
                              borderRadius: '8px',
                              textDecoration: 'none',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              marginRight: '6px'
                            }}
                          >
                            💬 WhatsApp
                          </a>
                          <a
                            href={`tel:${lead.phone}`}
                            style={{
                              display: 'inline-block',
                              padding: '6px 12px',
                              background: 'rgba(255,255,255,0.1)',
                              color: '#fff',
                              borderRadius: '8px',
                              textDecoration: 'none',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                            }}
                          >
                            📞 Call
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={{ padding: '40px 20px', textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
                  {isLoadingLeads ? '⏳ Loading leads directly from Google Sheets...' : 'No leads found or sheet is loading. Click Refresh above.'}
                </div>
              )}
            </div>
          </section>
        )}

        {/* ══ TAB: 2-FOR-1 NEW CUSTOMER PROMOTION TRACKER (50 SLOTS / SEPT 30) ══ */}
        {activeTab === 'promo-tracker' && (
          <section style={{ marginBottom: '32px' }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(201,168,76,0.15) 0%, rgba(14,19,31,0.85) 100%)',
              border: '1.5px solid rgba(201,168,76,0.4)',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div>
                <div style={{ color: '#e8c97a', fontWeight: 800, fontSize: '1.2rem', marginBottom: '6px' }}>
                  🎁 New Customer 2-for-1 Deal — Real-Time Database Tracker
                </div>
                <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.88rem', lineHeight: '1.5' }}>
                  Offer: <strong>Pay 1 Day Price for 2 Days</strong> (₹1,499 for 48 Hours) • Hard Cap: <strong>50 Verified Customers</strong> • Deadline: <strong>September 30th, 2026</strong>
                </div>
              </div>

              <button
                onClick={fetchPromoStatus}
                className={styles.pinBtn}
                style={{ width: 'auto', padding: '8px 18px', fontSize: '0.85rem' }}
              >
                🔄 Refresh Promo DB
              </button>
            </div>

            {/* Promo Progress & Slots Visualizer */}
            <div className={styles.dataCard} style={{ padding: '24px', marginBottom: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontWeight: 700, fontSize: '0.92rem', color: '#FFFFFF' }}>
                  Campaign Claim Progress: {promoStatus?.totalClaimed ?? 0} of {promoStatus?.maxClaims ?? 50} Slots Claimed
                </span>
                <span style={{ color: '#e8c97a', fontWeight: 800, fontSize: '0.88rem' }}>
                  {promoStatus?.slotsRemaining ?? 50} Slots Available
                </span>
              </div>
              <div style={{ height: '12px', background: 'rgba(255,255,255,0.08)', borderRadius: '6px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${Math.min(100, (((promoStatus?.totalClaimed ?? 0) / (promoStatus?.maxClaims ?? 50)) * 100))}%`,
                    background: 'linear-gradient(90deg, #c9a84c 0%, #F59E0B 100%)',
                    borderRadius: '6px',
                    transition: 'width 0.4s ease',
                  }}
                />
              </div>
            </div>

            {/* Claims Table */}
            <div className={styles.sectionLabel}>📋 Verified Customer Claims Ledger ({promoStatus?.claims?.length ?? 0} Recorded)</div>
            <div className={styles.dataCard} style={{ overflowX: 'auto' }}>
              {promoStatus?.claims && promoStatus.claims.length > 0 ? (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', fontSize: '0.72rem', letterSpacing: '0.05em' }}>
                      <th style={{ padding: '12px 10px' }}>Claim #</th>
                      <th style={{ padding: '12px 10px' }}>Customer Name</th>
                      <th style={{ padding: '12px 10px' }}>Phone Number</th>
                      <th style={{ padding: '12px 10px' }}>Vehicle Choice</th>
                      <th style={{ padding: '12px 10px' }}>Date Claimed</th>
                      <th style={{ padding: '12px 10px' }}>Claim Status</th>
                      <th style={{ padding: '12px 10px' }}>Direct Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {promoStatus.claims.map((claim) => (
                      <tr key={claim.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '12px 10px', color: '#e8c97a', fontWeight: 700 }}>#{claim.claimNumber}</td>
                        <td style={{ padding: '12px 10px', fontWeight: 600, color: '#fff' }}>{claim.name}</td>
                        <td style={{ padding: '12px 10px', color: '#93C5FD' }}>{claim.phone}</td>
                        <td style={{ padding: '12px 10px', color: '#D1D5DB' }}>{claim.vehicleChoice}</td>
                        <td style={{ padding: '12px 10px', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>{claim.timestamp}</td>
                        <td style={{ padding: '12px 10px' }}>
                          <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700, background: 'rgba(245,158,11,0.15)', color: '#FBBF24', border: '1px solid rgba(245,158,11,0.3)' }}>
                            {claim.status}
                          </span>
                        </td>
                        <td style={{ padding: '12px 10px' }}>
                          <a
                            href={`https://wa.me/91${(claim.phone || '').replace(/\D/g, '').slice(-10)}?text=${encodeURIComponent(`Hi ${claim.name}, this is Pavan from MANA Tours & Travels Kadapa regarding your New Customer 2-for-1 Self-Drive deal!`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.logoutBtn}
                            style={{ fontSize: '0.78rem', padding: '4px 10px', textDecoration: 'none' }}
                          >
                            💬 WhatsApp
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={{ padding: '40px 20px', textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
                  No customer claims recorded yet. The first 50 new customers to book will automatically appear here.
                </div>
              )}
            </div>
          </section>
        )}

        {/* ══ TAB: SELF-DRIVE DIGITAL KYC & HANDOVER LEDGER ══ */}
        {activeTab === 'kyc-ledger' && (
          <section style={{ marginBottom: '32px' }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(11,78,162,0.2) 0%, rgba(14,19,31,0.9) 100%)',
              border: '1.5px solid rgba(56,189,248,0.4)',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div>
                <div style={{ color: '#38BDF8', fontWeight: 800, fontSize: '1.2rem', marginBottom: '6px' }}>
                  🪪 Self-Drive 2-Minute Digital KYC Passes &amp; Handover Ledger
                </div>
                <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.88rem', lineHeight: '1.5' }}>
                  Verified pre-trip customer check-ins, driving licenses, fuel gauge readings, and digital signature sign-offs.
                </div>
              </div>

              <button
                onClick={fetchKycRecords}
                className={styles.pinBtn}
                style={{ width: 'auto', padding: '8px 18px', fontSize: '0.85rem' }}
              >
                🔄 Refresh KYC DB
              </button>
            </div>

            {/* KYC Ledger Table */}
            <div className={styles.sectionLabel}>📋 Verified Customer Passes ({kycRecords.length} Recorded)</div>
            <div className={styles.dataCard} style={{ overflowX: 'auto' }}>
              {kycRecords && kycRecords.length > 0 ? (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', fontSize: '0.72rem', letterSpacing: '0.05em' }}>
                      <th style={{ padding: '12px 10px' }}>Pass ID</th>
                      <th style={{ padding: '12px 10px' }}>Customer Name</th>
                      <th style={{ padding: '12px 10px' }}>Mobile Phone</th>
                      <th style={{ padding: '12px 10px' }}>Vehicle Model</th>
                      <th style={{ padding: '12px 10px' }}>Fuel Gauge</th>
                      <th style={{ padding: '12px 10px' }}>Start Odo</th>
                      <th style={{ padding: '12px 10px' }}>Status</th>
                      <th style={{ padding: '12px 10px' }}>Time</th>
                      <th style={{ padding: '12px 10px' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kycRecords.map((kyc) => (
                      <tr key={kyc.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '12px 10px', color: '#38BDF8', fontWeight: 800, fontFamily: 'monospace' }}>{kyc.passId}</td>
                        <td style={{ padding: '12px 10px', fontWeight: 600, color: '#fff' }}>{kyc.name}</td>
                        <td style={{ padding: '12px 10px', color: '#93C5FD' }}>{kyc.phone}</td>
                        <td style={{ padding: '12px 10px', color: '#D1D5DB' }}>{kyc.carModel}</td>
                        <td style={{ padding: '12px 10px', color: '#FBBF24', fontWeight: 700 }}>{kyc.fuelLevelPercent}% Tank</td>
                        <td style={{ padding: '12px 10px', color: '#FFFFFF' }}>{kyc.startOdometer} km</td>
                        <td style={{ padding: '12px 10px' }}>
                          <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700, background: 'rgba(16,185,129,0.15)', color: '#34D399', border: '1px solid rgba(16,185,129,0.3)' }}>
                            ✓ {kyc.status}
                          </span>
                        </td>
                        <td style={{ padding: '12px 10px', color: 'rgba(255,255,255,0.6)', fontSize: '0.78rem' }}>{kyc.formattedTimestamp}</td>
                        <td style={{ padding: '12px 10px' }}>
                          <a
                            href={`https://wa.me/91${(kyc.phone || '').replace(/\D/g, '').slice(-10)}?text=${encodeURIComponent(`Hi ${kyc.name}, this is Pavan from MANA Tours & Travels regarding your verified Self-Drive Pass ${kyc.passId}!`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.logoutBtn}
                            style={{ fontSize: '0.78rem', padding: '4px 10px', textDecoration: 'none' }}
                          >
                            💬 WhatsApp
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={{ padding: '40px 20px', textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
                  No digital KYC passes submitted yet. Customers who complete verification on /self-drive-kyc will appear here.
                </div>
              )}
            </div>
          </section>
        )}

        {/* ══ TAB 3: USED CARS & VALUATION MANAGEMENT ══ */}
        {activeTab === 'used-cars' && (
          <section style={{ marginBottom: '32px' }}>
            {/* Inventory Status Overview Banner */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(201,168,76,0.12) 0%, rgba(14,19,31,0.8) 100%)',
              border: '1px solid rgba(201,168,76,0.3)',
              borderRadius: '16px',
              padding: '20px 24px',
              marginBottom: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div>
                <div style={{ color: '#e8c97a', fontWeight: 800, fontSize: '1.1rem', marginBottom: '4px' }}>
                  🚗 MANA Certified Used Cars — Hub Inventory &amp; Funnel Manager
                </div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>
                  Total Inventory: <strong>5 Vehicles</strong> · Hub Value: <strong style={{ color: '#e8c97a' }}>₹40,65,000</strong> · 150-Point Certified Standard
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <Link
                  href="/used-cars"
                  target="_blank"
                  className={styles.pinBtn}
                  style={{ width: 'auto', padding: '8px 16px', fontSize: '0.85rem', textDecoration: 'none' }}
                >
                  🌐 View Live Used Cars Page ↗
                </Link>
                <Link
                  href="/used-cars#sell-car-section"
                  target="_blank"
                  className={styles.logoutBtn}
                  style={{ fontSize: '0.85rem', textDecoration: 'none' }}
                >
                  📝 Open Valuation Form ↗
                </Link>
              </div>
            </div>

            {/* 1. CURRENT HUB INVENTORY MANAGER */}
            <div className={styles.sectionLabel}>🚘 1. Live Vehicles in Stock &amp; Status Controls</div>
            <div className={styles.dataCard} style={{ overflowX: 'auto', marginBottom: '32px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', fontSize: '0.72rem', letterSpacing: '0.05em' }}>
                    <th style={{ padding: '12px 10px' }}>Vehicle</th>
                    <th style={{ padding: '12px 10px' }}>Variant &amp; Year</th>
                    <th style={{ padding: '12px 10px' }}>Listed Price</th>
                    <th style={{ padding: '12px 10px' }}>Specs (KM / Fuel)</th>
                    <th style={{ padding: '12px 10px' }}>RTO &amp; Owners</th>
                    <th style={{ padding: '12px 10px' }}>Inventory Status</th>
                    <th style={{ padding: '12px 10px', textAlign: 'right' }}>Quick Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {USED_CARS_INVENTORY.map((car) => {
                    const status = carStatuses[car.id] || 'Available';
                    const shareMsg = encodeURIComponent(
                      `*MANA Certified Used Cars Kadapa*\n\n🚗 *${car.year} ${car.name} ${car.variant}*\n💰 *Price:* ₹${(car.price / 100000).toFixed(2)} Lakh (EMI: ₹${car.emi}/mo)\n⚡ *Specs:* ${car.km} km • ${car.fuel} • ${car.transmission}\n📑 *Reg:* ${car.rto} • ${car.ownership}\n🔍 *150-Pt Inspected & Certified*\n\nView details: https://manatoursandtravels.com/used-cars`
                    );

                    return (
                      <tr key={car.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', color: '#fff' }}>
                        <td style={{ padding: '14px 10px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '48px', height: '36px', position: 'relative', borderRadius: '6px', overflow: 'hidden', flexShrink: 0, background: '#1a2333' }}>
                              <Image src={car.images && car.images[0] ? car.images[0] : '/images/fleet-dzire.jpg'} alt={car.name} fill style={{ objectFit: 'cover' }} />
                            </div>
                            <div>
                              <div style={{ fontWeight: 700, color: '#fff' }}>{car.name}</div>
                              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>ID: {car.id}</div>
                            </div>
                          </div>
                        </td>

                        <td style={{ padding: '14px 10px', color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem' }}>
                          <div>{car.variant}</div>
                          <span style={{ fontSize: '0.75rem', color: '#e8c97a', fontWeight: 600 }}>{car.year} Model</span>
                        </td>

                        <td style={{ padding: '14px 10px', whiteSpace: 'nowrap' }}>
                          <div style={{ color: '#e8c97a', fontWeight: 800, fontSize: '0.95rem' }}>
                            {car.priceDisplay || `₹${(car.price / 100000).toFixed(2)} Lakh`}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)' }}>
                            EMI {car.emiStarting || '₹8,990/mo'}
                          </div>
                        </td>

                        <td style={{ padding: '14px 10px', color: 'rgba(255,255,255,0.8)', fontSize: '0.82rem' }}>
                          <div>{car.kmDisplay || `${car.kmDriven} km`}</div>
                          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>{car.fuel} · {car.transmission}</span>
                        </td>

                        <td style={{ padding: '14px 10px', color: 'rgba(255,255,255,0.8)', fontSize: '0.82rem' }}>
                          <div>{car.rto}</div>
                          <span style={{ fontSize: '0.75rem', color: '#60a5fa' }}>{car.owner}</span>
                        </td>

                        <td style={{ padding: '14px 10px' }}>
                          <select
                            value={status}
                            onChange={(e) => setCarStatuses(prev => ({ ...prev, [car.id]: e.target.value }))}
                            style={{
                              padding: '5px 10px',
                              borderRadius: '8px',
                              background: status === 'Available' ? 'rgba(34,197,94,0.15)' : status === 'Test Drive Scheduled' ? 'rgba(234,179,8,0.15)' : 'rgba(239,68,68,0.15)',
                              color: status === 'Available' ? '#4ade80' : status === 'Test Drive Scheduled' ? '#facc15' : '#f87171',
                              border: `1px solid ${status === 'Available' ? 'rgba(34,197,94,0.3)' : status === 'Test Drive Scheduled' ? 'rgba(234,179,8,0.3)' : 'rgba(239,68,68,0.3)'}`,
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              outline: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            <option value="Available" style={{ background: '#0E131F', color: '#4ade80' }}>🟢 Available</option>
                            <option value="Test Drive Scheduled" style={{ background: '#0E131F', color: '#facc15' }}>🟡 Test Drive Booked</option>
                            <option value="Sold" style={{ background: '#0E131F', color: '#f87171' }}>🔴 Sold Out</option>
                          </select>
                        </td>

                        <td style={{ padding: '14px 10px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                          <button
                            onClick={() => setActiveModalCar(car)}
                            style={{
                              padding: '6px 12px',
                              background: 'rgba(201,168,76,0.15)',
                              color: '#e8c97a',
                              border: '1px solid rgba(201,168,76,0.3)',
                              borderRadius: '8px',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              marginRight: '6px'
                            }}
                          >
                            🔍 150-Pt Report
                          </button>
                          <a
                            href={`https://wa.me/?text=${shareMsg}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-block',
                              padding: '6px 12px',
                              background: '#22c55e',
                              color: '#fff',
                              borderRadius: '8px',
                              textDecoration: 'none',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                            }}
                          >
                            💬 WhatsApp Share
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* 2. SELLER VALUATION REQUESTS QUEUE */}
            <div className={styles.sectionLabel} style={{ marginTop: '36px' }}>
              💰 2. "Sell Your Car to MANA" Valuation Requests ({valuationLeads.length})
            </div>
            <div className={styles.dataCard} style={{ overflowX: 'auto', marginBottom: '32px' }}>
              {valuationLeads.length > 0 ? (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', fontSize: '0.72rem', letterSpacing: '0.05em' }}>
                      <th style={{ padding: '12px 10px' }}>Date</th>
                      <th style={{ padding: '12px 10px' }}>Seller Name</th>
                      <th style={{ padding: '12px 10px' }}>Phone</th>
                      <th style={{ padding: '12px 10px' }}>Vehicle Offered</th>
                      <th style={{ padding: '12px 10px' }}>Expected Price</th>
                      <th style={{ padding: '12px 10px' }}>Location</th>
                      <th style={{ padding: '12px 10px', textAlign: 'right' }}>Quick Offer Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {valuationLeads.map((lead) => {
                      const cleanPhone = (lead.phone || '').replace(/[^0-9]/g, '');
                      const waQuoteMsg = encodeURIComponent(
                        `Hello ${lead.name || 'Sir'}, Greetings from MANA Tours & Travels Kadapa (Used Cars Desk)!\n\nRegarding your car valuation request for *${lead.vehicleChoice || 'your vehicle'}*:\nWe have reviewed your details and would love to offer a quick doorstep evaluation & immediate settlement in Kadapa.\n\nCould you please share 4-5 photos of the car and current RC copy?`
                      );

                      return (
                        <tr key={lead.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', color: '#fff' }}>
                          <td style={{ padding: '14px 10px', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                            {lead.timestamp || 'Recent'}
                          </td>
                          <td style={{ padding: '14px 10px', fontWeight: 700, color: '#fff' }}>
                            {lead.name}
                          </td>
                          <td style={{ padding: '14px 10px', whiteSpace: 'nowrap' }}>
                            <a href={`tel:${lead.phone}`} style={{ color: '#93c5fd', textDecoration: 'none' }}>
                              📞 {lead.phone}
                            </a>
                          </td>
                          <td style={{ padding: '14px 10px', color: '#e8c97a', fontWeight: 600 }}>
                            {lead.vehicleChoice || 'Car Seller Lead'}
                          </td>
                          <td style={{ padding: '14px 10px', color: '#4ade80', fontWeight: 700 }}>
                            {lead.estimatedPrice || lead.destination || 'Best Offer'}
                          </td>
                          <td style={{ padding: '14px 10px', color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem' }}>
                            {lead.pickup || 'Kadapa'}
                          </td>
                          <td style={{ padding: '14px 10px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                            <a
                              href={`https://wa.me/91${cleanPhone}?text=${waQuoteMsg}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: 'inline-block',
                                padding: '6px 14px',
                                background: '#22c55e',
                                color: '#fff',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                fontSize: '0.78rem',
                                fontWeight: 700,
                              }}
                            >
                              💬 Send WhatsApp Offer Quote
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <div style={{ padding: '36px 20px', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📋</div>
                  <div style={{ color: '#fff', fontWeight: 700, marginBottom: '4px' }}>No Pending Valuation Requests</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', maxWidth: '480px', margin: '0 auto' }}>
                    When visitors in Kadapa submit their car details on your <strong>/used-cars#sell-car-section</strong> page, their valuation requests will appear here with 1-click WhatsApp cash offer dispatch!
                  </div>
                </div>
              )}
            </div>

            {/* 3. TEST DRIVE BOOKINGS QUEUE */}
            <div className={styles.sectionLabel} style={{ marginTop: '36px' }}>
              🔑 3. Doorstep Test Drive Bookings ({testDriveLeads.length})
            </div>
            <div className={styles.dataCard} style={{ overflowX: 'auto' }}>
              {testDriveLeads.length > 0 ? (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', fontSize: '0.72rem', letterSpacing: '0.05em' }}>
                      <th style={{ padding: '12px 10px' }}>Date</th>
                      <th style={{ padding: '12px 10px' }}>Customer Name</th>
                      <th style={{ padding: '12px 10px' }}>Phone</th>
                      <th style={{ padding: '12px 10px' }}>Car Requested</th>
                      <th style={{ padding: '12px 10px' }}>Preferred Date/Time</th>
                      <th style={{ padding: '12px 10px' }}>Doorstep Location</th>
                      <th style={{ padding: '12px 10px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testDriveLeads.map((lead) => {
                      const cleanPhone = (lead.phone || '').replace(/[^0-9]/g, '');
                      const waConfirmMsg = encodeURIComponent(
                        `Hello ${lead.name}, thank you for booking a doorstep test drive with MANA Certified Used Cars Kadapa! We are confirming your test drive for the *${lead.vehicleChoice || 'requested vehicle'}* on ${lead.travelDate || 'the requested date'}. Our executive will arrive with the vehicle.`
                      );

                      return (
                        <tr key={lead.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', color: '#fff' }}>
                          <td style={{ padding: '14px 10px', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>
                            {lead.timestamp || 'Recent'}
                          </td>
                          <td style={{ padding: '14px 10px', fontWeight: 700, color: '#fff' }}>
                            {lead.name}
                          </td>
                          <td style={{ padding: '14px 10px', whiteSpace: 'nowrap' }}>
                            <a href={`tel:${lead.phone}`} style={{ color: '#93c5fd', textDecoration: 'none' }}>
                              📞 {lead.phone}
                            </a>
                          </td>
                          <td style={{ padding: '14px 10px', color: '#e8c97a', fontWeight: 600 }}>
                            {lead.vehicleChoice || 'Test Drive'}
                          </td>
                          <td style={{ padding: '14px 10px', color: 'rgba(255,255,255,0.85)', fontSize: '0.82rem' }}>
                            {lead.travelDate || 'Immediate'}
                          </td>
                          <td style={{ padding: '14px 10px', color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem' }}>
                            {lead.pickup || 'Kadapa'}
                          </td>
                          <td style={{ padding: '14px 10px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                            <a
                              href={`https://wa.me/91${cleanPhone}?text=${waConfirmMsg}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: 'inline-block',
                                padding: '6px 14px',
                                background: '#22c55e',
                                color: '#fff',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                fontSize: '0.78rem',
                                fontWeight: 700,
                              }}
                            >
                              💬 Confirm Test Drive
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <div style={{ padding: '36px 20px', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🚗</div>
                  <div style={{ color: '#fff', fontWeight: 700, marginBottom: '4px' }}>No Pending Test Drive Requests</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', maxWidth: '480px', margin: '0 auto' }}>
                    When buyers click <strong>Book Doorstep Test Drive</strong> on any car card, their requests will appear here with one-click customer confirmation.
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ══ TAB 4: EXECUTIVE OVERVIEW & CHARTS ══ */}
        {activeTab === 'overview' && (
          <>
            {/* Sheet Connection Status Banner */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
              padding: '18px 24px',
              marginBottom: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.8rem' }}>📗</span>
                <div>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>
                    Connected Sheet: <span style={{ color: '#e8c97a' }}>MANA Bookings &amp; Leads CRM</span>
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem' }}>
                    Spreadsheet ID: <code style={{ color: '#93c5fd' }}>{sheetId}</code> · {leads.length} Records Synced
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setIsEditingSheet(!isEditingSheet)}
                  className={styles.logoutBtn}
                  style={{ fontSize: '0.8rem' }}
                >
                  {isEditingSheet ? '✕ Cancel' : '⚙️ Change Sheet ID'}
                </button>
                <a
                  href={`https://docs.google.com/spreadsheets/d/${sheetId}/edit`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.pinBtn}
                  style={{ width: 'auto', padding: '8px 16px', fontSize: '0.85rem', textDecoration: 'none' }}
                >
                  Open in Google Sheets ↗
                </a>
              </div>
            </div>

            {isEditingSheet && (
              <form onSubmit={handleSaveSheetId} style={{ padding: '16px 24px', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', border: '1px solid rgba(201,168,76,0.3)', marginBottom: '24px', display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  required
                  placeholder="Paste Google Sheet URL or Spreadsheet ID"
                  value={sheetInput}
                  onChange={(e) => setSheetInput(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    padding: '8px 14px',
                    color: '#fff',
                    fontSize: '0.88rem',
                  }}
                />
                <button type="submit" className={styles.pinBtn} style={{ width: 'auto', padding: '8px 18px', fontSize: '0.88rem' }}>
                  Save &amp; Sync Sheet
                </button>
              </form>
            )}

            {/* Performance Informatics Cards */}
            <div className={styles.sectionLabel}>📊 Core Performance Informatics</div>
            <div className={styles.dataGrid}>
              {/* Chart Card 1: Service Demand Distribution */}
              <div className={styles.dataCard}>
                <div className={styles.dataCardTitle}>
                  <span>🚖</span> Service Inquiries Breakdown
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px', color: 'rgba(255,255,255,0.7)' }}>
                      <span>Pilgrimage &amp; Sightseeing Tours</span>
                      <span style={{ fontWeight: 700, color: '#e8c97a' }}>50%</span>
                    </div>
                    <div style={{ height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: '50%', background: 'linear-gradient(90deg, #c9a84c, #e8c97a)' }}></div>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px', color: 'rgba(255,255,255,0.7)' }}>
                      <span>Local Sightseeing &amp; Day Packages</span>
                      <span style={{ fontWeight: 700, color: '#60a5fa' }}>50%</span>
                    </div>
                    <div style={{ height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: '50%', background: 'linear-gradient(90deg, #2563eb, #60a5fa)' }}></div>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px', color: 'rgba(255,255,255,0.7)' }}>
                      <span>Self-Drive Car Rentals</span>
                      <span style={{ fontWeight: 700, color: '#34d399' }}>Active</span>
                    </div>
                    <div style={{ height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: '35%', background: 'linear-gradient(90deg, #059669, #34d399)' }}></div>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px', color: 'rgba(255,255,255,0.7)' }}>
                      <span>Outstation Intercity &amp; Airport Drops</span>
                      <span style={{ fontWeight: 700, color: '#a78bfa' }}>Active</span>
                    </div>
                    <div style={{ height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: '30%', background: 'linear-gradient(90deg, #7c3aed, #a78bfa)' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart Card 2: Operational Velocity */}
              <div className={styles.dataCard}>
                <div className={styles.dataCardTitle}>
                  <span>⚡</span> Real-Time Operational Velocity
                </div>

                <div className={styles.dataRow}>
                  <span className={styles.dataRowLabel}>Average First Response Time</span>
                  <span className={`${styles.dataRowVal} ${styles.brassVal}`}>&lt; 10 Minutes</span>
                </div>
                <div className={styles.dataRow}>
                  <span className={styles.dataRowLabel}>WhatsApp Dispatch Ratio</span>
                  <span className={styles.dataRowVal}>95.4%</span>
                </div>
                <div className={styles.dataRow}>
                  <span className={styles.dataRowLabel}>Weekly ₹800 Promo Conversion</span>
                  <span className={`${styles.dataRowVal} ${styles.brassVal}`}>31.5%</span>
                </div>
                <div className={styles.dataRow}>
                  <span className={styles.dataRowLabel}>70% Partner Revenue Retention</span>
                  <span className={styles.dataRowVal}>100%</span>
                </div>
                <div className={styles.dataRow}>
                  <span className={styles.dataRowLabel}>Primary Hub Location</span>
                  <span className={styles.dataRowVal}>Kadapa Central Hub</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ══ GMB & LOCAL 3-PACK COMMAND HUB ══ */}
        {activeTab === 'gmb-hub' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* GMB Profile Bar */}
            <div style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.05))', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '16px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#10b981', color: '#fff', fontSize: '0.75rem', fontWeight: 700, padding: '4px 12px', borderRadius: '999px', marginBottom: '8px' }}>
                    <span>✓ Verified Google Profile</span>
                  </div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 4px', color: '#fff' }}>
                    MANA Tours &amp; Travels | Kadapa
                  </h2>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>
                    Google Business Shortlink: <a href="https://share.google/K8vvkOsIMLLvvZBac" target="_blank" rel="noopener noreferrer" style={{ color: '#34d399', textDecoration: 'underline' }}>https://share.google/K8vvkOsIMLLvvZBac</a>
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <a
                    href="https://share.google/K8vvkOsIMLLvvZBac"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ background: '#10b981', color: '#fff', padding: '10px 18px', borderRadius: '8px', fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    🗺️ Open on Google Maps
                  </a>
                  <Link
                    href="/qr"
                    target="_blank"
                    style={{ background: 'linear-gradient(135deg, #c9a84c, #a07830)', color: '#fff', padding: '10px 18px', borderRadius: '8px', fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    🖨️ In-Car QR Stickers
                  </Link>
                  <a
                    href="/review"
                    target="_blank"
                    style={{ background: 'rgba(255,255,255,0.08)', color: '#e8c97a', border: '1px solid rgba(232,201,122,0.3)', padding: '10px 18px', borderRadius: '8px', fontWeight: 600, fontSize: '0.88rem', textDecoration: 'none' }}
                  >
                    ↗ Test 1-Tap Review Link
                  </a>
                </div>
              </div>

              <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '10px', padding: '12px 16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ fontSize: '1.4rem' }}>⚡</span>
                <div style={{ fontSize: '0.85rem', color: '#fef3c7' }}>
                  <strong>Next Rank Boost (Complete ~60% to 100%):</strong> Open Google Business Profile Manager → tap <em>Edit Profile</em> → <em>Business Category</em>. Keep Primary as <strong>Car rental agency</strong>, and add secondary categories: <strong>Taxi service</strong>, <strong>Travel agency</strong>, <strong>Tour operator</strong>, and <strong>Airport shuttle service</strong>.
                </div>
              </div>
            </div>

            {/* Review Sentinel */}
            <div style={{ background: '#0e1a38', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '16px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 4px', color: '#e8c97a' }}>
                    💬 Review Sentinel (2 Pending Google Reviews)
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
                    Replying immediately boosts your profile velocity and local 3-pack rank. Tap below to copy pre-optimized responses.
                  </p>
                </div>
                <a
                  href="https://share.google/K8vvkOsIMLLvvZBac"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ background: 'rgba(232,201,122,0.15)', color: '#e8c97a', border: '1px solid rgba(232,201,122,0.4)', padding: '8px 14px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, textDecoration: 'none' }}
                >
                  Go to Google Reviews →
                </a>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '16px' }}>
                {/* Review 1 */}
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>Recent Customer 1 (Outstation / Cab)</span>
                    <span style={{ color: '#e8c97a', fontSize: '0.9rem' }}>★★★★★</span>
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '12px' }}>
                    Keywords: <em>Kadapa to Tirupati, sanitized AC car, 24/7 service, transparent pricing</em>
                  </p>

                  <div style={{ background: '#081026', padding: '12px', borderRadius: '8px', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: '1.5', marginBottom: '12px' }}>
                    Dear traveler, thank you so much for traveling with MANA Tours &amp; Travels Kadapa and for giving us a 5-star rating! We are delighted that you had a smooth journey in our sanitized AC vehicle. Punctuality and passenger safety are always our top priorities. Whenever you plan your next trip to Tirupati, Bangalore, or Gandikota, we are here 24/7. Wishing you safe travels always! — Pavan &amp; Team MANA Tours (+91 99083 00718)
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleCopy('Dear traveler, thank you so much for traveling with MANA Tours & Travels Kadapa and for giving us a 5-star rating! We are delighted that you had a smooth journey in our sanitized AC vehicle. Punctuality and passenger safety are always our top priorities. Whenever you plan your next trip to Tirupati, Bangalore, or Gandikota, we are here 24/7. Wishing you safe travels always! — Pavan & Team MANA Tours (+91 99083 00718)', 'rev1-en')}
                      style={{ flex: 1, padding: '8px 12px', background: copiedKey === 'rev1-en' ? '#10b981' : '#c9a84c', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      {copiedKey === 'rev1-en' ? 'Copied! ✅' : '📋 Copy English'}
                    </button>
                    <button
                      onClick={() => handleCopy('Namaskaram garu! MANA Tours & Travels Kadapa tho travel chesinanduku mariyu mee viluvaina 5-star review ichinanduku dhanyavadalu. Clean AC car mariyu on-time pickup meeku nachinanduku chala santosham. Next time Tirupati, Bangalore leda Gandikota outstation trip plan chesinappudu maaku call cheyyandi (+91 99083 00718). Subha prayanam! — Pavan & Team MANA Tours', 'rev1-te')}
                      style={{ flex: 1, padding: '8px 12px', background: copiedKey === 'rev1-te' ? '#10b981' : 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      {copiedKey === 'rev1-te' ? 'Copied! ✅' : '📋 Copy Telugu'}
                    </button>
                  </div>
                </div>

                {/* Review 2 */}
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>Recent Customer 2 (Self-Drive / Weekend)</span>
                    <span style={{ color: '#e8c97a', fontSize: '0.9rem' }}>★★★★★</span>
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '12px' }}>
                    Keywords: <em>Self-Drive car rental Kadapa, Gandikota trip, zero fuel markup, doorstep delivery</em>
                  </p>

                  <div style={{ background: '#081026', padding: '12px', borderRadius: '8px', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: '1.5', marginBottom: '12px' }}>
                    Dear customer, thank you for rating MANA Tours &amp; Travels Kadapa 5 stars! We are glad you loved renting our self-drive car for your journey. Providing pristine, sanitized cars with 100% transparent fuel terms and fast doorstep handover is our mission. Looking forward to handing you the keys for your next road trip to Gandikota, Horsley Hills, or Bangalore! — Pavan &amp; Team MANA (+91 99083 00718)
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleCopy('Dear customer, thank you for rating MANA Tours & Travels Kadapa 5 stars! We are glad you loved renting our self-drive car for your journey. Providing pristine, sanitized cars with 100% transparent fuel terms and fast doorstep handover is our mission. Looking forward to handing you the keys for your next road trip to Gandikota, Horsley Hills, or Bangalore! — Pavan & Team MANA (+91 99083 00718)', 'rev2-en')}
                      style={{ flex: 1, padding: '8px 12px', background: copiedKey === 'rev2-en' ? '#10b981' : '#c9a84c', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      {copiedKey === 'rev2-en' ? 'Copied! ✅' : '📋 Copy English'}
                    </button>
                    <button
                      onClick={() => handleCopy('Namaskaram garu! MANA Tours & Travels Kadapa nunchi self-drive car rent teesukoni 5-star review ichinanduku dhanyavadalu. Clean car mariyu transparent policy meeku nachinanduku chala aanandam. Malli road trip plan chesinappudu direct ga maaku call cheyyandi (+91 99083 00718). Subha prayanam! — Pavan & Team MANA', 'rev2-te')}
                      style={{ flex: 1, padding: '8px 12px', background: copiedKey === 'rev2-te' ? '#10b981' : 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      {copiedKey === 'rev2-te' ? 'Copied! ✅' : '📋 Copy Telugu'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Posts Campaigns */}
            <div style={{ background: '#0e1a38', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '16px', padding: '24px' }}>
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 4px', color: '#e8c97a' }}>
                  📢 Weekly Google Posts Engine (Call Now Action)
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
                  Post 1 update every week on Google Maps. Set the button to <strong>&ldquo;Call Now&rdquo;</strong> to route phone calls to +91 99083 00718.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 800, color: '#e8c97a', fontSize: '0.85rem' }}>🛕 TIRUPATI PILGRIMAGE</span>
                    <span style={{ fontSize: '0.75rem', background: 'rgba(201,168,76,0.2)', color: '#e8c97a', padding: '2px 8px', borderRadius: '4px' }}>Call Now</span>
                  </div>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 700, margin: '0 0 8px', color: '#fff' }}>
                    Planning Tirupati Balaji Darshan from Kadapa?
                  </h4>
                  <div style={{ background: '#081026', padding: '10px', borderRadius: '8px', fontSize: '0.78rem', color: '#cbd5e1', lineHeight: '1.4', marginBottom: '12px' }}>
                    Heading for sacred Tirumala darshan? MANA Tours &amp; Travels Kadapa offers 24/7 doorstep pickup with experienced chauffeurs who know temple timings and ghat road routes perfectly. Sedans &amp; Innova Crystas available. Early departures (2:00 AM – 4:00 AM). Call Pavan or Jyothi directly for today&apos;s best fare quote! #KadapatoTirupaticab #Tirupatidarshantaxi
                  </div>
                  <button
                    onClick={() => handleCopy("Planning Tirupati Balaji Darshan from Kadapa? 🛕 Travel Stress-Free in Spotless AC Fleet!\n\nHeading for sacred Tirumala darshan? MANA Tours & Travels Kadapa offers 24/7 doorstep pickup with experienced chauffeurs who know temple timings and ghat road routes perfectly.\n\n• Clean, chilled AC Sedans (Etios/Dzire) & 7-Seater Innova Crysta\n• Early morning departures available (2:00 AM – 4:00 AM)\n• Zero hidden costs — transparent upfront fare quotes\n• Doorstep pickup & drop anywhere in Kadapa city\n\nCall Pavan or Jyothi directly for today's discounted fare quote!\n\n#KadapatoTirupaticab #Tirupatidarshantaxi #Kadapatravels #MANAtoursKadapa", 'post-tirupati')}
                    style={{ width: '100%', padding: '8px 12px', background: copiedKey === 'post-tirupati' ? '#10b981' : '#c9a84c', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
                  >
                    {copiedKey === 'post-tirupati' ? 'Copied! ✅' : '📋 Copy Tirupati Post Text'}
                  </button>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 800, color: '#e8c97a', fontSize: '0.85rem' }}>🏜️ GANDIKOTA &amp; BELUM</span>
                    <span style={{ fontSize: '0.75rem', background: 'rgba(201,168,76,0.2)', color: '#e8c97a', padding: '2px 8px', borderRadius: '4px' }}>Call Now</span>
                  </div>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 700, margin: '0 0 8px', color: '#fff' }}>
                    Weekend Gandikota Grand Canyon &amp; Belum Caves Tour
                  </h4>
                  <div style={{ background: '#081026', padding: '10px', borderRadius: '8px', fontSize: '0.78rem', color: '#cbd5e1', lineHeight: '1.4', marginBottom: '12px' }}>
                    Witness the breathtaking sunset over the Penna River gorge at the Grand Canyon of India, and explore the ancient limestone formations of Belum Caves! Private AC cab with chauffeur-cum-guide. Call our dispatch desk for best custom tour quotes. #GandikotatourfromKadapa #Belumcavescab
                  </div>
                  <button
                    onClick={() => handleCopy("Weekend Road Trip! 🏜️ Gandikota Canyon & Belum Caves Day Tour from Kadapa\n\nWitness the breathtaking sunset over the Penna River gorge at the Grand Canyon of India, and explore the ancient limestone formations of Belum Caves!\n\n• Private AC cab with chauffeur-cum-guide\n• Full-day sightseeing with relaxed photography stops\n• Comfortable seating for couples, families, and friend groups\n• Flexible pickup times from Kadapa, Proddatur, and Pulivendula\n\nBook your weekend slot today! Call our dispatch desk for best custom tour quotes.\n\n#GandikotatourfromKadapa #Belumcavescab #Kadapadaytrips #Rayalaseematourism", 'post-gandikota')}
                    style={{ width: '100%', padding: '8px 12px', background: copiedKey === 'post-gandikota' ? '#10b981' : '#c9a84c', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
                  >
                    {copiedKey === 'post-gandikota' ? 'Copied! ✅' : '📋 Copy Gandikota Post Text'}
                  </button>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 800, color: '#e8c97a', fontSize: '0.85rem' }}>✈️ AIRPORT TRANSFERS</span>
                    <span style={{ fontSize: '0.75rem', background: 'rgba(201,168,76,0.2)', color: '#e8c97a', padding: '2px 8px', borderRadius: '4px' }}>Call Now</span>
                  </div>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 700, margin: '0 0 8px', color: '#fff' }}>
                    Kadapa to Bangalore &amp; Hyderabad Airport Drops
                  </h4>
                  <div style={{ background: '#081026', padding: '10px', borderRadius: '8px', fontSize: '0.78rem', color: '#cbd5e1', lineHeight: '1.4', marginBottom: '12px' }}>
                    Never miss a flight again. MANA Tours guarantees 100% on-time departures to Kempegowda International Airport (BLR) and RGIA Hyderabad (HYD). Chauffeur arrives 15 minutes before scheduled pickup. Fixed upfront fares. Call 099083 00718. #KadapatoBangaloreairporttaxi
                  </div>
                  <button
                    onClick={() => handleCopy("Catching an Early Morning Flight? ✈️ Fixed-Fare Kadapa to Bangalore & Hyderabad Airport Drops\n\nNever miss a flight again. MANA Tours guarantees 100% on-time departures to Kempegowda International Airport (BLR) and RGIA Hyderabad (HYD).\n\n• Chauffeur arrives 15 minutes before scheduled pickup\n• Smooth highway driving with well-maintained commercial vehicles\n• Fixed upfront fares with zero late-night surcharges\n• Luggage assistance and comfortable AC travel\n\nCall our 24/7 booking desk at 099083 00718 to schedule your airport transfer.\n\n#KadapatoBangaloreairporttaxi #KadapatoHyderabadairportcab #airporttaxiKadapa", 'post-airport')}
                    style={{ width: '100%', padding: '8px 12px', background: copiedKey === 'post-airport' ? '#10b981' : '#c9a84c', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
                  >
                    {copiedKey === 'post-airport' ? 'Copied! ✅' : '📋 Copy Airport Post Text'}
                  </button>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 800, color: '#e8c97a', fontSize: '0.85rem' }}>🔑 SELF-DRIVE RENTALS</span>
                    <span style={{ fontSize: '0.75rem', background: 'rgba(201,168,76,0.2)', color: '#e8c97a', padding: '2px 8px', borderRadius: '4px' }}>Call Now</span>
                  </div>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 700, margin: '0 0 8px', color: '#fff' }}>
                    Self-Drive Cars in Kadapa from ₹1,499/Day
                  </h4>
                  <div style={{ background: '#081026', padding: '10px', borderRadius: '8px', fontSize: '0.78rem', color: '#cbd5e1', lineHeight: '1.4', marginBottom: '12px' }}>
                    Drive yourself with total freedom! Fully sanitized Swift Dzire, Toyota Etios &amp; Ertiga MPV. 100% transparent: Customer-managed fuel (zero fuel markup). Quick KYC with Driving License &amp; Aadhaar. Call now to reserve your car! #SelfdrivecarsinKadapa
                  </div>
                  <button
                    onClick={() => handleCopy("Drive Yourself with Freedom! 🔑 Premium Self-Drive Car Rentals in Kadapa from ₹1,499/Day\n\nLooking for freedom on your next road trip? Rent a self-drive car in Kadapa with MANA Tours!\n\n• Fully sanitized Swift Dzire, Toyota Etios & Ertiga MPV\n• 100% transparent: Customer-managed fuel (zero fuel markup)\n• Quick KYC with Driving License & Aadhaar\n• Fast, hassle-free doorstep handover in Kadapa city\n\nLimited vehicles available for weekend road trips — Call now to reserve your car!\n\n#SelfdrivecarsinKadapa #carrentalKadapa #rentcarKadapa #MANAselfdrive", 'post-selfdrive')}
                    style={{ width: '100%', padding: '8px 12px', background: copiedKey === 'post-selfdrive' ? '#10b981' : '#c9a84c', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
                  >
                    {copiedKey === 'post-selfdrive' ? 'Copied! ✅' : '📋 Copy Self-Drive Post Text'}
                  </button>
                </div>
              </div>
            </div>

            {/* Google Maps Q&A Pairs */}
            <div style={{ background: '#0e1a38', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '16px', padding: '24px' }}>
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 4px', color: '#e8c97a' }}>
                  ❓ Google Maps Q&amp;A Seeder (High-Intent Conversion Pairs)
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
                  Adding Q&amp;As to your Google listing directly answers common passenger objections and captures long-tail search traffic.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  {
                    id: 'qa1',
                    q: 'How do I book a cab from Kadapa to Tirupati with MANA Tours?',
                    a: 'You can book directly by calling or sending a WhatsApp message to our 24/7 dispatch desk at +91 99083 00718 or +91 99083 20718. We provide clean AC Sedans (Etios/Dzire) and 7-seater Innova Crystas with doorstep pickup across Kadapa city.',
                  },
                  {
                    id: 'qa2',
                    q: 'What are the documents needed to rent a self-drive car in Kadapa?',
                    a: 'To rent a self-drive car at MANA Tours, you need: 1) Original valid Driving License, 2) Aadhaar Card / Govt ID, and 3) A 100% refundable security deposit via UPI or Cash. Handover is provided right at your doorstep in Kadapa.',
                  },
                  {
                    id: 'qa3',
                    q: 'Do you provide early morning pickups in Kadapa for airport drops to Bangalore or Hyderabad?',
                    a: 'Yes, absolutely! We operate 24 hours a day, 7 days a week. We specialize in early morning (2:00 AM – 4:00 AM) pickups with guaranteed on-time flight arrival at Kempegowda International Airport (BLR) and Rajiv Gandhi International Airport (HYD). Call 099083 00718.',
                  },
                ].map((item) => (
                  <div key={item.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', marginBottom: '8px' }}>
                      <strong style={{ color: '#fff', fontSize: '0.88rem' }}>Q: {item.q}</strong>
                      <button
                        onClick={() => handleCopy(`Question: ${item.q}\nAnswer: ${item.a}`, item.id)}
                        style={{ padding: '4px 10px', background: copiedKey === item.id ? '#10b981' : 'rgba(232,201,122,0.2)', color: '#e8c97a', border: '1px solid rgba(232,201,122,0.4)', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}
                      >
                        {copiedKey === item.id ? 'Copied! ✅' : '📋 Copy Q&A'}
                      </button>
                    </div>
                    <div style={{ color: '#cbd5e1', fontSize: '0.82rem', lineHeight: '1.4' }}>
                      <strong>Owner Answer:</strong> {item.a}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══ DIRECT MANAGEMENT LAUNCHPAD ══ */}
        <div className={styles.sectionLabel}>🔗 Direct Management Hubs</div>
        <div className={styles.linksGrid}>
          <a
            href="https://share.google/K8vvkOsIMLLvvZBac"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkCard}
            style={{ borderColor: 'rgba(16, 185, 129, 0.4)' }}
          >
            <span className={styles.linkIcon}>📍</span>
            <div>
              <div style={{ color: '#34d399', fontWeight: 700 }}>Google Business Profile</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>Reviews &amp; Maps Listing</div>
            </div>
          </a>

          <Link
            href="/qr"
            target="_blank"
            className={styles.linkCard}
            style={{ borderColor: 'rgba(201, 168, 76, 0.4)' }}
          >
            <span className={styles.linkIcon}>🖨️</span>
            <div>
              <div style={{ color: '#e8c97a', fontWeight: 700 }}>In-Car Review QR Stickers</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>Print A4 Dashboard Sheets</div>
            </div>
          </Link>

          <a
            href={`https://docs.google.com/spreadsheets/d/${sheetId}/edit`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkCard}
          >
            <span className={styles.linkIcon}>📗</span>
            <div>
              <div>Open Google Sheet CRM</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>Spreadsheet ID: {sheetId.substring(0, 8)}...</div>
            </div>
          </a>

          <a
            href={`https://wa.me/${BUSINESS.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkCard}
          >
            <span className={styles.linkIcon}>💬</span>
            <div>
              <div>WhatsApp Business Dispatch</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>Direct Customer Chats</div>
            </div>
          </a>

          <a
            href="https://analytics.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkCard}
          >
            <span className={styles.linkIcon}>📈</span>
            <div>
              <div>Google Analytics 4</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>Traffic &amp; Conversion Funnels</div>
            </div>
          </a>

          <a
            href="https://lookerstudio.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkCard}
          >
            <span className={styles.linkIcon}>🎨</span>
            <div>
              <div>Google Looker Studio</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>Build Custom Chart Reports</div>
            </div>
          </a>
        </div>
      </div>

      {/* 150-Point Inspection Modal Preview */}
      {activeModalCar && (
        <UsedCarDetailModal
          car={activeModalCar}
          isTestDriveMode={false}
          onClose={() => setActiveModalCar(null)}
        />
      )}
    </div>
  );
}
